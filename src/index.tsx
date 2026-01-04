import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

type Bindings = {
  DB: D1Database
  GOOGLE_CLIENT_ID?: string
  GOOGLE_CLIENT_SECRET?: string
  NAVER_CLIENT_ID?: string
  NAVER_CLIENT_SECRET?: string
  KAKAO_CLIENT_ID?: string
  KAKAO_CLIENT_SECRET?: string
  SESSION_SECRET?: string
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS 설정
app.use('/api/*', cors())

// 정적 파일 서빙
app.use('/static/*', serveStatic({ root: './' }))

// PWA 파일 서빙
app.get('/manifest.json', async (c) => {
  const manifestData = {
    name: "한국 차 공예 - 당신이 만드는 한국 차 문화",
    short_name: "차공예",
    description: "생산자와 소비자가 함께 만드는 한국 차 문화. 당신의 선택이 천년 전통을 이어갑니다.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1e8",
    theme_color: "#7c9473",
    orientation: "portrait-primary",
    icons: [
      { src: "/static/icons/icon-72x72.png", sizes: "72x72", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-96x96.png", sizes: "96x96", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-128x128.png", sizes: "128x128", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-144x144.png", sizes: "144x144", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-152x152.png", sizes: "152x152", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/static/icons/icon-384x384.png", sizes: "384x384", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
    ],
    screenshots: [
      { src: "/static/screenshots/screenshot-mobile.png", sizes: "540x720", type: "image/png", form_factor: "narrow" },
      { src: "/static/screenshots/screenshot-desktop.png", sizes: "1920x1080", type: "image/png", form_factor: "wide" }
    ],
    categories: ["shopping", "food", "lifestyle"],
    lang: "ko-KR",
    dir: "ltr"
  }
  return c.json(manifestData)
})

// 렌더러 미들웨어
app.use(renderer)

// ===== API 라우트 =====

// 지역 목록 조회 API
app.get('/api/regions', async (c) => {
  const type = c.req.query('type') // 'tea' 또는 'craft'
  
  let query = 'SELECT * FROM regions'
  const params: string[] = []
  
  if (type) {
    query += ' WHERE type = ?'
    params.push(type)
  }
  
  query += ' ORDER BY id'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ regions: results })
})

// 특정 지역 상세 조회 API
app.get('/api/regions/:id', async (c) => {
  const id = c.req.param('id')
  
  const region = await c.env.DB.prepare(
    'SELECT * FROM regions WHERE id = ?'
  ).bind(id).first()
  
  if (!region) {
    return c.json({ error: '지역을 찾을 수 없습니다' }, 404)
  }
  
  // 해당 지역의 생산자 목록
  const { results: producers } = await c.env.DB.prepare(
    'SELECT * FROM producers WHERE region_id = ?'
  ).bind(id).all()
  
  // 해당 지역의 관광지
  const { results: attractions } = await c.env.DB.prepare(
    'SELECT * FROM attractions WHERE region_id = ?'
  ).bind(id).all()
  
  return c.json({ 
    region, 
    producers,
    attractions
  })
})

// 생산자 목록 조회 API
app.get('/api/producers', async (c) => {
  const type = c.req.query('type')
  const regionId = c.req.query('region_id')
  
  let query = `
    SELECT p.*, r.name as region_name 
    FROM producers p 
    LEFT JOIN regions r ON p.region_id = r.id
    WHERE 1=1
  `
  const params: string[] = []
  
  if (type) {
    query += ' AND p.producer_type = ?'
    params.push(type)
  }
  
  if (regionId) {
    query += ' AND p.region_id = ?'
    params.push(regionId)
  }
  
  query += ' ORDER BY p.id'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ producers: results })
})

// 특정 생산자 상세 조회 API
app.get('/api/producers/:id', async (c) => {
  const id = c.req.param('id')
  
  const producer = await c.env.DB.prepare(`
    SELECT p.*, r.name as region_name 
    FROM producers p 
    LEFT JOIN regions r ON p.region_id = r.id
    WHERE p.id = ?
  `).bind(id).first()
  
  if (!producer) {
    return c.json({ error: '생산자를 찾을 수 없습니다' }, 404)
  }
  
  // 해당 생산자의 상품 목록
  const { results: products } = await c.env.DB.prepare(
    'SELECT * FROM products WHERE producer_id = ? AND is_available = 1'
  ).bind(id).all()
  
  return c.json({ producer, products })
})

// 상품 목록 조회 API
app.get('/api/products', async (c) => {
  const type = c.req.query('type')
  const categoryId = c.req.query('category_id')
  const featured = c.req.query('featured')
  const search = c.req.query('search')
  const limit = c.req.query('limit') || '20'
  const offset = c.req.query('offset') || '0'
  
  let query = `
    SELECT p.*, c.name as category_name, pr.name as producer_name, r.name as region_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN producers pr ON p.producer_id = pr.id
    LEFT JOIN regions r ON pr.region_id = r.id
    WHERE p.is_available = 1
  `
  const params: any[] = []
  
  if (type) {
    query += ' AND p.product_type = ?'
    params.push(type)
  }
  
  if (categoryId) {
    query += ' AND p.category_id = ?'
    params.push(categoryId)
  }
  
  if (featured === 'true') {
    query += ' AND p.is_featured = 1'
  }
  
  if (search) {
    query += ' AND (p.name LIKE ? OR p.description LIKE ?)'
    params.push(`%${search}%`, `%${search}%`)
  }
  
  query += ' ORDER BY p.is_featured DESC, p.created_at DESC LIMIT ? OFFSET ?'
  params.push(parseInt(limit), parseInt(offset))
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ products: results })
})

// 특정 상품 상세 조회 API
app.get('/api/products/:id', async (c) => {
  const id = c.req.param('id')
  
  const product = await c.env.DB.prepare(`
    SELECT p.*, c.name as category_name, pr.name as producer_name, 
           pr.description as producer_description, r.name as region_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN producers pr ON p.producer_id = pr.id
    LEFT JOIN regions r ON pr.region_id = r.id
    WHERE p.id = ?
  `).bind(id).first()
  
  if (!product) {
    return c.json({ error: '상품을 찾을 수 없습니다' }, 404)
  }
  
  // 조회수 증가
  await c.env.DB.prepare(
    'UPDATE products SET view_count = view_count + 1 WHERE id = ?'
  ).bind(id).run()
  
  // 상품 이미지 목록
  const { results: images } = await c.env.DB.prepare(
    'SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order'
  ).bind(id).all()
  
  // 선물세트인 경우 구성품 조회
  let giftSetItems = []
  if (product.product_type === 'gift_set') {
    const { results } = await c.env.DB.prepare(`
      SELECT p.*, gsi.quantity
      FROM gift_set_items gsi
      LEFT JOIN products p ON gsi.product_id = p.id
      WHERE gsi.gift_set_id = ?
    `).bind(id).all()
    giftSetItems = results
  }
  
  return c.json({ product, images, giftSetItems })
})

// 카테고리 목록 조회 API
app.get('/api/categories', async (c) => {
  const type = c.req.query('type')
  
  let query = 'SELECT * FROM categories WHERE parent_id IS NULL'
  const params: string[] = []
  
  if (type) {
    query += ' AND type = ?'
    params.push(type)
  }
  
  query += ' ORDER BY id'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ categories: results })
})

// 이벤트 목록 조회 API
app.get('/api/events', async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM events 
    WHERE is_active = 1 
    AND date('now') BETWEEN date(start_date) AND date(end_date)
    ORDER BY start_date DESC
  `).all()
  
  return c.json({ events: results })
})

// 특정 이벤트 상세 조회 API
app.get('/api/events/:id', async (c) => {
  const id = c.req.param('id')
  
  const event = await c.env.DB.prepare(
    'SELECT * FROM events WHERE id = ?'
  ).bind(id).first()
  
  if (!event) {
    return c.json({ error: '이벤트를 찾을 수 없습니다' }, 404)
  }
  
  // 이벤트 상품 목록
  const { results: products } = await c.env.DB.prepare(`
    SELECT p.* FROM event_products ep
    LEFT JOIN products p ON ep.product_id = p.id
    WHERE ep.event_id = ?
  `).bind(id).all()
  
  return c.json({ event, products })
})

// 관광지 목록 조회 API
app.get('/api/attractions', async (c) => {
  const regionId = c.req.query('region_id')
  const type = c.req.query('type')
  
  let query = `
    SELECT a.*, r.name as region_name
    FROM attractions a
    LEFT JOIN regions r ON a.region_id = r.id
    WHERE 1=1
  `
  const params: string[] = []
  
  if (regionId) {
    query += ' AND a.region_id = ?'
    params.push(regionId)
  }
  
  if (type) {
    query += ' AND a.attraction_type = ?'
    params.push(type)
  }
  
  query += ' ORDER BY a.id'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ attractions: results })
})

// 체험 프로그램 목록 조회 API
app.get('/api/experiences', async (c) => {
  const type = c.req.query('type')
  const regionId = c.req.query('region_id')
  
  let query = `
    SELECT e.*, r.name as region_name, p.name as producer_name
    FROM experiences e
    LEFT JOIN regions r ON e.region_id = r.id
    LEFT JOIN producers p ON e.producer_id = p.id
    WHERE e.is_available = 1
  `
  const params: string[] = []
  
  if (type) {
    query += ' AND e.experience_type = ?'
    params.push(type)
  }
  
  if (regionId) {
    query += ' AND e.region_id = ?'
    params.push(regionId)
  }
  
  query += ' ORDER BY e.id'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ experiences: results })
})

// 특정 체험 상세 조회 API
app.get('/api/experiences/:id', async (c) => {
  const id = c.req.param('id')
  
  const experience = await c.env.DB.prepare(`
    SELECT e.*, r.name as region_name, p.name as producer_name
    FROM experiences e
    LEFT JOIN regions r ON e.region_id = r.id
    LEFT JOIN producers p ON e.producer_id = p.id
    WHERE e.id = ?
  `).bind(id).first()
  
  if (!experience) {
    return c.json({ error: '체험 프로그램을 찾을 수 없습니다' }, 404)
  }
  
  // 예약 가능한 일정 목록
  const { results: schedules } = await c.env.DB.prepare(`
    SELECT * FROM experience_schedules 
    WHERE experience_id = ? 
    AND date(schedule_date) >= date('now')
    AND booked_slots < available_slots
    ORDER BY schedule_date, start_time
  `).bind(id).all()
  
  return c.json({ experience, schedules })
})

// 검색 API
app.get('/api/search', async (c) => {
  const q = c.req.query('q')
  
  if (!q) {
    return c.json({ error: '검색어를 입력해주세요' }, 400)
  }
  
  // 상품 검색
  const { results: products } = await c.env.DB.prepare(`
    SELECT p.*, 'product' as result_type
    FROM products p
    WHERE (p.name LIKE ? OR p.description LIKE ?)
    AND p.is_available = 1
    LIMIT 10
  `).bind(`%${q}%`, `%${q}%`).all()
  
  // 생산자 검색
  const { results: producers } = await c.env.DB.prepare(`
    SELECT pr.*, 'producer' as result_type
    FROM producers pr
    WHERE pr.name LIKE ? OR pr.description LIKE ?
    LIMIT 10
  `).bind(`%${q}%`, `%${q}%`).all()
  
  // 지역 검색
  const { results: regions } = await c.env.DB.prepare(`
    SELECT r.*, 'region' as result_type
    FROM regions r
    WHERE r.name LIKE ? OR r.description LIKE ?
    LIMIT 10
  `).bind(`%${q}%`, `%${q}%`).all()
  
  return c.json({ 
    results: {
      products,
      producers,
      regions
    }
  })
})

// ===== 생산자 관리 API =====

// 생산자별 상품 목록 조회
app.get('/api/producers/:id/products', async (c) => {
  const producerId = c.req.param('id')
  
  const { results } = await c.env.DB.prepare(`
    SELECT p.*, c.name as category_name, c.type as category_type
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.producer_id = ?
    ORDER BY p.created_at DESC
  `).bind(producerId).all()
  
  return c.json({ products: results })
})

// 생산자별 체험 목록 조회
app.get('/api/producers/:id/experiences', async (c) => {
  const producerId = c.req.param('id')
  
  const { results } = await c.env.DB.prepare(`
    SELECT e.*, r.name as region_name
    FROM experiences e
    LEFT JOIN regions r ON e.region_id = r.id
    WHERE e.producer_id = ?
    ORDER BY e.created_at DESC
  `).bind(producerId).all()
  
  return c.json({ experiences: results })
})

// 상품 등록
app.post('/api/products', async (c) => {
  const data = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO products (
      name, category_id, producer_id, description, 
      original_price, price, discount_rate, shipping_fee, stock_quantity, 
      main_image, product_type, weight, origin, is_featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.name,
    data.category_id,
    data.producer_id,
    data.description,
    data.original_price,
    data.price,
    data.discount_rate || 30,
    data.shipping_fee || 3000,
    data.stock_quantity,
    data.main_image || '/images/products/default.jpg',
    data.product_type,
    data.weight,
    data.origin,
    data.is_featured ? 1 : 0
  ).run()
  
  return c.json({ 
    success: true, 
    product_id: result.meta.last_row_id 
  })
})

// 상품 수정
app.put('/api/products/:id', async (c) => {
  const productId = c.req.param('id')
  const data = await c.req.json()
  
  await c.env.DB.prepare(`
    UPDATE products 
    SET name = ?, category_id = ?, description = ?,
        original_price = ?, price = ?, discount_rate = ?, shipping_fee = ?,
        stock_quantity = ?, main_image = ?, weight = ?, origin = ?
    WHERE id = ?
  `).bind(
    data.name,
    data.category_id,
    data.description,
    data.original_price,
    data.price,
    data.discount_rate || 30,
    data.shipping_fee || 3000,
    data.stock_quantity,
    data.main_image,
    data.weight,
    data.origin,
    productId
  ).run()
  
  return c.json({ success: true })
})

// 상품 삭제
app.delete('/api/products/:id', async (c) => {
  const productId = c.req.param('id')
  
  await c.env.DB.prepare(`
    DELETE FROM products WHERE id = ?
  `).bind(productId).run()
  
  return c.json({ success: true })
})

// 체험 등록
app.post('/api/experiences', async (c) => {
  const data = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO experiences (
      name, region_id, producer_id, type, description,
      original_price, price, discount_rate, duration_hours,
      max_participants, image_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.name,
    data.region_id,
    data.producer_id,
    data.type,
    data.description,
    data.original_price,
    data.price,
    data.discount_rate || 30,
    data.duration_hours,
    data.max_participants,
    data.image_url || '/images/experiences/default.jpg'
  ).run()
  
  return c.json({ 
    success: true, 
    experience_id: result.meta.last_row_id 
  })
})

// 체험 수정
app.put('/api/experiences/:id', async (c) => {
  const experienceId = c.req.param('id')
  const data = await c.req.json()
  
  await c.env.DB.prepare(`
    UPDATE experiences 
    SET name = ?, type = ?, description = ?,
        original_price = ?, price = ?, discount_rate = ?,
        duration_hours = ?, max_participants = ?, image_url = ?
    WHERE id = ?
  `).bind(
    data.name,
    data.type,
    data.description,
    data.original_price,
    data.price,
    data.discount_rate || 30,
    data.duration_hours,
    data.max_participants,
    data.image_url,
    experienceId
  ).run()
  
  return c.json({ success: true })
})

// 체험 삭제
app.delete('/api/experiences/:id', async (c) => {
  const experienceId = c.req.param('id')
  
  await c.env.DB.prepare(`
    DELETE FROM experiences WHERE id = ?
  `).bind(experienceId).run()
  
  return c.json({ success: true })
})

// 체험 일정 추가
app.post('/api/experience-schedules', async (c) => {
  const data = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO experience_schedules (
      experience_id, date, start_time, available_slots, booked_slots
    ) VALUES (?, ?, ?, ?, ?)
  `).bind(
    data.experience_id,
    data.date,
    data.start_time,
    data.available_slots,
    data.booked_slots || 0
  ).run()
  
  return c.json({ 
    success: true, 
    schedule_id: result.meta.last_row_id 
  })
})

// 체험 일정 삭제
app.delete('/api/experience-schedules/:id', async (c) => {
  const scheduleId = c.req.param('id')
  
  await c.env.DB.prepare(`
    DELETE FROM experience_schedules WHERE id = ?
  `).bind(scheduleId).run()
  
  return c.json({ success: true })
})

// ===== 교육 신청 API =====

// 교육 신청 목록 조회 API
app.get('/api/education-applications', async (c) => {
  const status = c.req.query('status')
  const orgType = c.req.query('org_type')
  const limit = c.req.query('limit') || '50'
  const offset = c.req.query('offset') || '0'
  
  let query = 'SELECT * FROM education_applications WHERE 1=1'
  const params: any[] = []
  
  if (status) {
    query += ' AND status = ?'
    params.push(status)
  }
  
  if (orgType) {
    query += ' AND organization_type = ?'
    params.push(orgType)
  }
  
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
  params.push(parseInt(limit), parseInt(offset))
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ applications: results })
})

// 특정 교육 신청 상세 조회 API
app.get('/api/education-applications/:id', async (c) => {
  const id = c.req.param('id')
  
  const application = await c.env.DB.prepare(
    'SELECT * FROM education_applications WHERE id = ?'
  ).bind(id).first()
  
  if (!application) {
    return c.json({ error: '신청서를 찾을 수 없습니다' }, 404)
  }
  
  return c.json({ application })
})

// 교육 신청 등록 API
app.post('/api/education-applications', async (c) => {
  const body = await c.req.json()
  
  const {
    organization_type,
    organization_name,
    contact_person,
    contact_phone,
    contact_email,
    address,
    participant_count,
    preferred_date,
    preferred_time,
    education_type,
    message
  } = body
  
  // 필수 필드 검증
  if (!organization_type || !organization_name || !contact_person || 
      !contact_phone || !address || !participant_count || !education_type) {
    return c.json({ error: '필수 정보를 모두 입력해주세요' }, 400)
  }
  
  const result = await c.env.DB.prepare(`
    INSERT INTO education_applications (
      organization_type, organization_name, contact_person, contact_phone, 
      contact_email, address, participant_count, preferred_date, preferred_time,
      education_type, message, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `).bind(
    organization_type, organization_name, contact_person, contact_phone,
    contact_email, address, participant_count, preferred_date, preferred_time,
    education_type, message
  ).run()
  
  return c.json({ 
    success: true, 
    id: result.meta.last_row_id,
    message: '교육 신청이 접수되었습니다. 담당자 확인 후 연락드리겠습니다.'
  })
})

// 교육 신청 상태 업데이트 API (관리자용)
app.put('/api/education-applications/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  
  const {
    status,
    approved_date,
    education_start_date,
    education_end_date,
    instructor_name,
    notes
  } = body
  
  await c.env.DB.prepare(`
    UPDATE education_applications 
    SET status = ?,
        approved_date = ?,
        education_start_date = ?,
        education_end_date = ?,
        instructor_name = ?,
        notes = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    status || 'pending',
    approved_date,
    education_start_date,
    education_end_date,
    instructor_name,
    notes,
    id
  ).run()
  
  return c.json({ success: true, message: '신청 정보가 업데이트되었습니다.' })
})

// 교육 통계 API
app.get('/api/education-statistics', async (c) => {
  // 기관별 통계
  const { results: orgStats } = await c.env.DB.prepare(`
    SELECT 
      organization_type,
      COUNT(*) as count
    FROM education_applications
    GROUP BY organization_type
  `).all()
  
  // 상태별 통계
  const { results: statusStats } = await c.env.DB.prepare(`
    SELECT 
      status,
      COUNT(*) as count
    FROM education_applications
    GROUP BY status
  `).all()
  
  // 교육 타입별 통계
  const { results: typeStats } = await c.env.DB.prepare(`
    SELECT 
      education_type,
      COUNT(*) as count
    FROM education_applications
    GROUP BY education_type
  `).all()
  
  return c.json({
    organizationStats: orgStats,
    statusStats: statusStats,
    typeStats: typeStats
  })
})

// ===== 교육 커리큘럼 API =====

// 교육 카테고리 목록 조회 (차공부, 공예공부)
app.get('/api/education/categories', async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM education_categories 
    ORDER BY display_order ASC
  `).all()
  
  return c.json({ categories: results })
})

// 교육 커리큘럼 목록 조회
app.get('/api/education/curriculum', async (c) => {
  const categoryId = c.req.query('category_id')
  const difficulty = c.req.query('difficulty')
  
  let query = `
    SELECT 
      ec.*,
      cat.name as category_name,
      cat.icon as category_icon
    FROM education_curriculum ec
    LEFT JOIN education_categories cat ON ec.category_id = cat.id
    WHERE 1=1
  `
  const params: any[] = []
  
  if (categoryId) {
    query += ' AND ec.category_id = ?'
    params.push(parseInt(categoryId))
  }
  
  if (difficulty) {
    query += ' AND ec.difficulty = ?'
    params.push(difficulty)
  }
  
  query += ' ORDER BY ec.category_id ASC, ec.display_order ASC'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ curriculum: results })
})

// 교육 커리큘럼 상세 조회
app.get('/api/education/curriculum/:id', async (c) => {
  const id = c.req.param('id')
  
  const curriculum = await c.env.DB.prepare(`
    SELECT 
      ec.*,
      cat.name as category_name,
      cat.description as category_description,
      cat.icon as category_icon
    FROM education_curriculum ec
    LEFT JOIN education_categories cat ON ec.category_id = cat.id
    WHERE ec.id = ?
  `).bind(id).first()
  
  if (!curriculum) {
    return c.json({ error: '커리큘럼을 찾을 수 없습니다' }, 404)
  }
  
  return c.json({ curriculum })
})

// ===== 프론트엔드 페이지 라우트 =====

// 홈 페이지
app.get('/', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 상품 목록 페이지
app.get('/products', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 상품 상세 페이지
app.get('/products/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 지역 목록 페이지
app.get('/regions', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 지역 상세 페이지
app.get('/regions/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 생산자 목록 페이지
app.get('/producers', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 생산자 상세 페이지
app.get('/producers/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 체험 목록 페이지
app.get('/experiences', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 체험 상세 페이지
app.get('/experiences/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 이벤트 목록 페이지
app.get('/events', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 검색 페이지
app.get('/search', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 교육 신청 페이지
app.get('/education/apply', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 교육 현황 페이지
app.get('/education/status', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 교육 커리큘럼 페이지
app.get('/education/curriculum', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 교육 커리큘럼 상세 페이지
app.get('/education/curriculum/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// ===== 마이페이지 =====

// 마이페이지 메인
app.get('/mypage', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 주문 내역
app.get('/mypage/orders', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 주문 상세
app.get('/mypage/orders/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// ===== 소셜 로그인 API =====

// 로그인 페이지
app.get('/login', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 구글 로그인 시작
app.get('/auth/google', (c) => {
  const clientId = c.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'
  const redirectUri = `${new URL(c.req.url).origin}/auth/google/callback`
  const scope = 'openid email profile'
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope)}`
  
  return c.redirect(authUrl)
})

// 구글 로그인 콜백
app.get('/auth/google/callback', async (c) => {
  const code = c.req.query('code')
  if (!code) {
    return c.redirect('/login?error=no_code')
  }
  
  try {
    const clientId = c.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'
    const clientSecret = c.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET'
    const redirectUri = `${new URL(c.req.url).origin}/auth/google/callback`
    
    // Access token 교환
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    })
    
    const tokenData = await tokenResponse.json() as any
    
    // 사용자 정보 가져오기
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    })
    
    const userData = await userResponse.json() as any
    
    // 사용자 DB에 저장 또는 업데이트
    const { results: existingUser } = await c.env.DB.prepare(
      'SELECT * FROM users WHERE provider = ? AND provider_id = ?'
    ).bind('google', userData.id).all()
    
    let userId
    if (existingUser.length > 0) {
      // 기존 사용자 - 로그인 시간 업데이트
      userId = (existingUser[0] as any).id
      await c.env.DB.prepare(
        'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).bind(userId).run()
    } else {
      // 신규 사용자 생성
      const result = await c.env.DB.prepare(`
        INSERT INTO users (email, name, profile_image, provider, provider_id, last_login_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        userData.email,
        userData.name,
        userData.picture,
        'google',
        userData.id
      ).run()
      userId = result.meta.last_row_id
    }
    
    // 세션 생성
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30일
    
    await c.env.DB.prepare(`
      INSERT INTO user_sessions (user_id, session_token, expires_at)
      VALUES (?, ?, ?)
    `).bind(userId, sessionToken, expiresAt.toISOString()).run()
    
    // 쿠키 설정 및 리다이렉트
    c.header('Set-Cookie', `session=${sessionToken}; Path=/; HttpOnly; Max-Age=2592000; SameSite=Lax`)
    return c.redirect('/')
    
  } catch (error) {
    console.error('Google login error:', error)
    return c.redirect('/login?error=auth_failed')
  }
})

// 네이버 로그인 시작
app.get('/auth/naver', (c) => {
  const clientId = c.env.NAVER_CLIENT_ID || 'YOUR_NAVER_CLIENT_ID'
  const redirectUri = `${new URL(c.req.url).origin}/auth/naver/callback`
  const state = crypto.randomUUID()
  
  const authUrl = `https://nid.naver.com/oauth2.0/authorize?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `state=${state}`
  
  return c.redirect(authUrl)
})

// 네이버 로그인 콜백
app.get('/auth/naver/callback', async (c) => {
  const code = c.req.query('code')
  const state = c.req.query('state')
  
  if (!code || !state) {
    return c.redirect('/login?error=no_code')
  }
  
  try {
    const clientId = c.env.NAVER_CLIENT_ID || 'YOUR_NAVER_CLIENT_ID'
    const clientSecret = c.env.NAVER_CLIENT_SECRET || 'YOUR_NAVER_CLIENT_SECRET'
    
    // Access token 교환
    const tokenResponse = await fetch(
      `https://nid.naver.com/oauth2.0/token?` +
      `grant_type=authorization_code&` +
      `client_id=${clientId}&` +
      `client_secret=${clientSecret}&` +
      `code=${code}&` +
      `state=${state}`
    )
    
    const tokenData = await tokenResponse.json() as any
    
    // 사용자 정보 가져오기
    const userResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    })
    
    const userData = await userResponse.json() as any
    const naverUser = userData.response
    
    // 사용자 DB에 저장 또는 업데이트
    const { results: existingUser } = await c.env.DB.prepare(
      'SELECT * FROM users WHERE provider = ? AND provider_id = ?'
    ).bind('naver', naverUser.id).all()
    
    let userId
    if (existingUser.length > 0) {
      userId = (existingUser[0] as any).id
      await c.env.DB.prepare(
        'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).bind(userId).run()
    } else {
      const result = await c.env.DB.prepare(`
        INSERT INTO users (email, name, profile_image, provider, provider_id, last_login_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        naverUser.email,
        naverUser.name,
        naverUser.profile_image,
        'naver',
        naverUser.id
      ).run()
      userId = result.meta.last_row_id
    }
    
    // 세션 생성
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    
    await c.env.DB.prepare(`
      INSERT INTO user_sessions (user_id, session_token, expires_at)
      VALUES (?, ?, ?)
    `).bind(userId, sessionToken, expiresAt.toISOString()).run()
    
    c.header('Set-Cookie', `session=${sessionToken}; Path=/; HttpOnly; Max-Age=2592000; SameSite=Lax`)
    return c.redirect('/')
    
  } catch (error) {
    console.error('Naver login error:', error)
    return c.redirect('/login?error=auth_failed')
  }
})

// 카카오 로그인 시작
app.get('/auth/kakao', (c) => {
  const clientId = c.env.KAKAO_CLIENT_ID || 'YOUR_KAKAO_CLIENT_ID'
  const redirectUri = `${new URL(c.req.url).origin}/auth/kakao/callback`
  
  const authUrl = `https://kauth.kakao.com/oauth/authorize?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}`
  
  return c.redirect(authUrl)
})

// 카카오 로그인 콜백
app.get('/auth/kakao/callback', async (c) => {
  const code = c.req.query('code')
  if (!code) {
    return c.redirect('/login?error=no_code')
  }
  
  try {
    const clientId = c.env.KAKAO_CLIENT_ID || 'YOUR_KAKAO_CLIENT_ID'
    const clientSecret = c.env.KAKAO_CLIENT_SECRET || ''
    const redirectUri = `${new URL(c.req.url).origin}/auth/kakao/callback`
    
    // Access token 교환
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code
      })
    })
    
    const tokenData = await tokenResponse.json() as any
    
    // 사용자 정보 가져오기
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    })
    
    const userData = await userResponse.json() as any
    
    // 사용자 DB에 저장 또는 업데이트
    const { results: existingUser } = await c.env.DB.prepare(
      'SELECT * FROM users WHERE provider = ? AND provider_id = ?'
    ).bind('kakao', userData.id.toString()).all()
    
    let userId
    if (existingUser.length > 0) {
      userId = (existingUser[0] as any).id
      await c.env.DB.prepare(
        'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).bind(userId).run()
    } else {
      const result = await c.env.DB.prepare(`
        INSERT INTO users (email, name, profile_image, provider, provider_id, last_login_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        userData.kakao_account?.email || `kakao_${userData.id}@example.com`,
        userData.kakao_account?.profile?.nickname || '카카오사용자',
        userData.kakao_account?.profile?.profile_image_url || '',
        'kakao',
        userData.id.toString()
      ).run()
      userId = result.meta.last_row_id
    }
    
    // 세션 생성
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    
    await c.env.DB.prepare(`
      INSERT INTO user_sessions (user_id, session_token, expires_at)
      VALUES (?, ?, ?)
    `).bind(userId, sessionToken, expiresAt.toISOString()).run()
    
    c.header('Set-Cookie', `session=${sessionToken}; Path=/; HttpOnly; Max-Age=2592000; SameSite=Lax`)
    return c.redirect('/')
    
  } catch (error) {
    console.error('Kakao login error:', error)
    return c.redirect('/login?error=auth_failed')
  }
})

// 현재 로그인 사용자 정보 조회
app.get('/api/auth/me', async (c) => {
  const cookies = c.req.header('Cookie') || ''
  const sessionMatch = cookies.match(/session=([^;]+)/)
  
  if (!sessionMatch) {
    return c.json({ user: null })
  }
  
  const sessionToken = sessionMatch[1]
  
  // 세션 확인
  const { results: sessions } = await c.env.DB.prepare(`
    SELECT us.*, u.id as user_id, u.email, u.name, u.profile_image, u.role, u.provider
    FROM user_sessions us
    JOIN users u ON us.user_id = u.id
    WHERE us.session_token = ? AND us.expires_at > datetime('now')
  `).bind(sessionToken).all()
  
  if (sessions.length === 0) {
    return c.json({ user: null })
  }
  
  const session = sessions[0] as any
  return c.json({
    user: {
      id: session.user_id,
      email: session.email,
      name: session.name,
      profile_image: session.profile_image,
      role: session.role,
      provider: session.provider
    }
  })
})

// 로그아웃
app.post('/api/auth/logout', async (c) => {
  const cookies = c.req.header('Cookie') || ''
  const sessionMatch = cookies.match(/session=([^;]+)/)
  
  if (sessionMatch) {
    const sessionToken = sessionMatch[1]
    await c.env.DB.prepare(
      'DELETE FROM user_sessions WHERE session_token = ?'
    ).bind(sessionToken).run()
  }
  
  c.header('Set-Cookie', 'session=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax')
  return c.json({ success: true })
})

// ===== 장바구니 API =====

// 장바구니 목록 조회
app.get('/api/cart', async (c) => {
  const userId = c.req.query('user_id')
  const sessionId = c.req.query('session_id')
  
  if (!userId && !sessionId) {
    return c.json({ error: '사용자 ID 또는 세션 ID가 필요합니다' }, 400)
  }
  
  const query = `
    SELECT 
      c.id, c.product_id, c.quantity, c.is_selected, 
      c.price_snapshot, c.created_at,
      p.name as product_name, p.price, p.main_image, 
      p.stock_quantity, p.is_available,
      pr.name as producer_name, pr.id as producer_id
    FROM cart_items c
    JOIN products p ON c.product_id = p.id
    LEFT JOIN producers pr ON p.producer_id = pr.id
    WHERE ${userId ? 'c.user_id = ?' : 'c.session_id = ?'}
    ORDER BY c.created_at DESC
  `
  
  const { results } = await c.env.DB.prepare(query)
    .bind(userId || sessionId)
    .all()
  
  return c.json({ cart_items: results })
})

// 장바구니에 상품 추가
app.post('/api/cart', async (c) => {
  const data = await c.req.json()
  const { user_id, session_id, product_id, quantity = 1 } = data
  
  if (!user_id && !session_id) {
    return c.json({ error: '사용자 ID 또는 세션 ID가 필요합니다' }, 400)
  }
  
  if (!product_id) {
    return c.json({ error: '상품 ID가 필요합니다' }, 400)
  }
  
  // 상품 존재 및 재고 확인
  const product = await c.env.DB.prepare(
    'SELECT id, price, stock_quantity, is_available FROM products WHERE id = ?'
  ).bind(product_id).first()
  
  if (!product) {
    return c.json({ error: '상품을 찾을 수 없습니다' }, 404)
  }
  
  if (!product.is_available) {
    return c.json({ error: '판매 중단된 상품입니다' }, 400)
  }
  
  if (product.stock_quantity < quantity) {
    return c.json({ error: '재고가 부족합니다', available_stock: product.stock_quantity }, 400)
  }
  
  // 이미 장바구니에 있는지 확인
  const existingItem = await c.env.DB.prepare(`
    SELECT id, quantity FROM cart_items 
    WHERE product_id = ? AND ${user_id ? 'user_id = ?' : 'session_id = ?'}
  `).bind(product_id, user_id || session_id).first()
  
  if (existingItem) {
    // 수량 업데이트
    const newQuantity = (existingItem.quantity as number) + quantity
    
    if (product.stock_quantity < newQuantity) {
      return c.json({ 
        error: '재고가 부족합니다', 
        available_stock: product.stock_quantity,
        current_cart_quantity: existingItem.quantity
      }, 400)
    }
    
    await c.env.DB.prepare(`
      UPDATE cart_items 
      SET quantity = ?, price_snapshot = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(newQuantity, product.price, existingItem.id).run()
    
    return c.json({ 
      success: true, 
      cart_item_id: existingItem.id,
      quantity: newQuantity,
      message: '장바구니 수량이 업데이트되었습니다'
    })
  }
  
  // 새로 추가
  const result = await c.env.DB.prepare(`
    INSERT INTO cart_items (user_id, session_id, product_id, quantity, price_snapshot)
    VALUES (?, ?, ?, ?, ?)
  `).bind(user_id || null, session_id || null, product_id, quantity, product.price).run()
  
  return c.json({ 
    success: true, 
    cart_item_id: result.meta.last_row_id,
    message: '장바구니에 추가되었습니다'
  })
})

// 장바구니 수량 변경
app.put('/api/cart/:id', async (c) => {
  const cartItemId = c.req.param('id')
  const data = await c.req.json()
  const { quantity, is_selected } = data
  
  // 현재 장바구니 항목 조회
  const cartItem = await c.env.DB.prepare(
    'SELECT product_id FROM cart_items WHERE id = ?'
  ).bind(cartItemId).first()
  
  if (!cartItem) {
    return c.json({ error: '장바구니 항목을 찾을 수 없습니다' }, 404)
  }
  
  // 수량 변경인 경우 재고 확인
  if (quantity !== undefined) {
    const product = await c.env.DB.prepare(
      'SELECT stock_quantity, is_available FROM products WHERE id = ?'
    ).bind(cartItem.product_id).first()
    
    if (!product || !product.is_available) {
      return c.json({ error: '상품을 구매할 수 없습니다' }, 400)
    }
    
    if (product.stock_quantity < quantity) {
      return c.json({ 
        error: '재고가 부족합니다', 
        available_stock: product.stock_quantity 
      }, 400)
    }
    
    await c.env.DB.prepare(`
      UPDATE cart_items 
      SET quantity = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(quantity, cartItemId).run()
  }
  
  // 선택 상태 변경
  if (is_selected !== undefined) {
    await c.env.DB.prepare(`
      UPDATE cart_items 
      SET is_selected = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(is_selected ? 1 : 0, cartItemId).run()
  }
  
  return c.json({ success: true, message: '장바구니가 업데이트되었습니다' })
})

// 장바구니 항목 삭제
app.delete('/api/cart/:id', async (c) => {
  const cartItemId = c.req.param('id')
  
  await c.env.DB.prepare('DELETE FROM cart_items WHERE id = ?')
    .bind(cartItemId).run()
  
  return c.json({ success: true, message: '장바구니에서 삭제되었습니다' })
})

// 장바구니 전체 비우기
app.delete('/api/cart', async (c) => {
  const userId = c.req.query('user_id')
  const sessionId = c.req.query('session_id')
  
  if (!userId && !sessionId) {
    return c.json({ error: '사용자 ID 또는 세션 ID가 필요합니다' }, 400)
  }
  
  await c.env.DB.prepare(`
    DELETE FROM cart_items WHERE ${userId ? 'user_id = ?' : 'session_id = ?'}
  `).bind(userId || sessionId).run()
  
  return c.json({ success: true, message: '장바구니가 비워졌습니다' })
})

// 위시리스트 목록 조회
app.get('/api/wishlist', async (c) => {
  const userId = c.req.query('user_id')
  
  if (!userId) {
    return c.json({ error: '사용자 ID가 필요합니다' }, 400)
  }
  
  const { results } = await c.env.DB.prepare(`
    SELECT 
      w.id, w.product_id, w.created_at,
      p.name, p.price, p.main_image, p.is_available, p.stock_quantity,
      pr.name as producer_name
    FROM wishlist w
    JOIN products p ON w.product_id = p.id
    LEFT JOIN producers pr ON p.producer_id = pr.id
    WHERE w.user_id = ?
    ORDER BY w.created_at DESC
  `).bind(userId).all()
  
  return c.json({ wishlist: results })
})

// 위시리스트에 추가
app.post('/api/wishlist', async (c) => {
  const data = await c.req.json()
  const { user_id, product_id } = data
  
  if (!user_id || !product_id) {
    return c.json({ error: '사용자 ID와 상품 ID가 필요합니다' }, 400)
  }
  
  try {
    const result = await c.env.DB.prepare(`
      INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)
    `).bind(user_id, product_id).run()
    
    return c.json({ 
      success: true, 
      wishlist_id: result.meta.last_row_id,
      message: '찜 목록에 추가되었습니다'
    })
  } catch (error) {
    // UNIQUE 제약 위반 (이미 추가됨)
    return c.json({ error: '이미 찜 목록에 있습니다' }, 409)
  }
})

// 위시리스트에서 삭제
app.delete('/api/wishlist/:id', async (c) => {
  const wishlistId = c.req.param('id')
  
  await c.env.DB.prepare('DELETE FROM wishlist WHERE id = ?')
    .bind(wishlistId).run()
  
  return c.json({ success: true, message: '찜 목록에서 삭제되었습니다' })
})

// ===== 주문 관리 API =====

// 주문 생성
app.post('/api/orders', async (c) => {
  const data = await c.req.json()
  
  // 주문번호 생성 (ORD + YYYYMMDD + 시퀀스)
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const { results } = await c.env.DB.prepare(
    `SELECT COUNT(*) as count FROM orders WHERE order_number LIKE 'ORD${today}%'`
  ).all()
  const sequence = String((results[0].count as number) + 1).padStart(3, '0')
  const orderNumber = `ORD${today}${sequence}`
  
  // 주문 생성
  const orderResult = await c.env.DB.prepare(`
    INSERT INTO orders (
      order_number, user_id, buyer_name, buyer_email, buyer_phone,
      recipient_name, recipient_phone, delivery_address, delivery_zipcode, delivery_memo,
      total_amount, discount_amount, shipping_fee, final_amount,
      order_status, payment_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')
  `).bind(
    orderNumber,
    data.user_id || null,
    data.buyer_name,
    data.buyer_email,
    data.buyer_phone,
    data.recipient_name,
    data.recipient_phone,
    data.delivery_address,
    data.delivery_zipcode,
    data.delivery_memo || null,
    data.total_amount,
    data.discount_amount || 0,
    data.shipping_fee || 3000,
    data.final_amount
  ).run()
  
  const orderId = orderResult.meta.last_row_id
  
  // 주문 상품 추가
  for (const item of data.items) {
    await c.env.DB.prepare(`
      INSERT INTO order_items (
        order_id, product_id, product_name, product_price, quantity,
        discount_rate, item_total, producer_id, commission_rate,
        commission_amount, producer_revenue
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      orderId,
      item.product_id,
      item.product_name,
      item.product_price,
      item.quantity,
      item.discount_rate || 0,
      item.item_total,
      item.producer_id,
      item.commission_rate || 9.9,
      item.commission_amount,
      item.producer_revenue
    ).run()
  }
  
  // 상태 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, 'new', 'pending', 'system', '주문 생성')
  `).bind(orderId).run()
  
  return c.json({ 
    success: true, 
    order_id: orderId,
    order_number: orderNumber
  })
})

// 주문 목록 조회
app.get('/api/orders', async (c) => {
  const userId = c.req.query('user_id')
  const status = c.req.query('status')
  const limit = parseInt(c.req.query('limit') || '20')
  const offset = parseInt(c.req.query('offset') || '0')
  
  let query = `
    SELECT o.*, 
           COUNT(oi.id) as item_count
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE 1=1
  `
  
  const bindings: any[] = []
  
  if (userId) {
    query += ' AND o.user_id = ?'
    bindings.push(userId)
  }
  
  if (status) {
    query += ' AND o.order_status = ?'
    bindings.push(status)
  }
  
  query += ' GROUP BY o.id ORDER BY o.created_at DESC LIMIT ? OFFSET ?'
  bindings.push(limit, offset)
  
  const { results } = await c.env.DB.prepare(query).bind(...bindings).all()
  
  return c.json({ orders: results })
})

// 주문 상세 조회
app.get('/api/orders/:id', async (c) => {
  const orderId = c.req.param('id')
  
  // 주문 정보
  const orderResult = await c.env.DB.prepare(
    'SELECT * FROM orders WHERE id = ?'
  ).bind(orderId).first()
  
  if (!orderResult) {
    return c.json({ error: 'Order not found' }, 404)
  }
  
  // 주문 상품
  const itemsResult = await c.env.DB.prepare(
    'SELECT * FROM order_items WHERE order_id = ?'
  ).bind(orderId).all()
  
  // 배송 정보
  const shipmentResult = await c.env.DB.prepare(
    'SELECT * FROM order_shipments WHERE order_id = ? ORDER BY created_at DESC LIMIT 1'
  ).bind(orderId).first()
  
  // 수령 확인 정보
  const confirmationResult = await c.env.DB.prepare(
    'SELECT * FROM order_confirmations WHERE order_id = ?'
  ).bind(orderId).first()
  
  // 상태 이력
  const historyResult = await c.env.DB.prepare(
    'SELECT * FROM order_status_history WHERE order_id = ? ORDER BY created_at DESC'
  ).bind(orderId).all()
  
  return c.json({
    order: orderResult,
    items: itemsResult.results,
    shipment: shipmentResult,
    confirmation: confirmationResult,
    history: historyResult.results
  })
})

// 생산자별 주문 조회
app.get('/api/orders/producer/:producerId', async (c) => {
  const producerId = c.req.param('producerId')
  
  // 생산자의 상품을 포함한 주문들 조회
  const { results } = await c.env.DB.prepare(`
    SELECT DISTINCT
      o.id as order_id,
      o.order_number,
      o.buyer_name,
      o.buyer_phone,
      o.recipient_name,
      o.recipient_phone,
      o.delivery_address,
      o.order_status,
      o.payment_status,
      o.payment_method,
      o.total_amount,
      o.final_amount,
      o.created_at,
      COUNT(oi.id) as item_count
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    WHERE oi.producer_id = ?
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `).bind(producerId).all()
  
  return c.json({ orders: results })
})

// 주문 상태 변경
app.put('/api/orders/:id/status', async (c) => {
  const orderId = c.req.param('id')
  const data = await c.req.json()
  
  // 현재 주문 조회
  const currentOrder = await c.env.DB.prepare(
    'SELECT order_status FROM orders WHERE id = ?'
  ).bind(orderId).first()
  
  if (!currentOrder) {
    return c.json({ error: 'Order not found' }, 404)
  }
  
  // 상태 업데이트
  await c.env.DB.prepare(
    'UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind(data.new_status, orderId).run()
  
  // 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, ?, ?, ?, ?)
  `).bind(
    orderId,
    currentOrder.order_status,
    data.new_status,
    data.changed_by || 'system',
    data.change_reason || ''
  ).run()
  
  return c.json({ success: true })
})

// 결제 완료 처리
app.post('/api/orders/:id/payment', async (c) => {
  const orderId = c.req.param('id')
  const data = await c.req.json()
  
  // 주문 상태 업데이트
  await c.env.DB.prepare(`
    UPDATE orders 
    SET order_status = 'paid', 
        payment_status = 'completed',
        payment_method = ?,
        payment_date = CURRENT_TIMESTAMP,
        payment_transaction_id = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(data.payment_method, data.transaction_id, orderId).run()
  
  // 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, 'pending', 'paid', 'system', '결제 완료')
  `).bind(orderId).run()
  
  return c.json({ success: true })
})

// 배송 정보 등록
app.post('/api/orders/:id/shipment', async (c) => {
  const orderId = c.req.param('id')
  const data = await c.req.json()
  
  // 배송 정보 등록
  await c.env.DB.prepare(`
    INSERT INTO order_shipments (
      order_id, courier_company, tracking_number, shipped_date,
      estimated_delivery_date, delivery_status
    ) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, 'shipped')
  `).bind(
    orderId,
    data.courier_company,
    data.tracking_number,
    data.estimated_delivery_date
  ).run()
  
  // 주문 상태 업데이트
  await c.env.DB.prepare(
    'UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind('shipping', orderId).run()
  
  // 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, 'preparing', 'shipping', ?, '배송 시작')
  `).bind(orderId, data.changed_by || 'system').run()
  
  return c.json({ success: true })
})

// 배송 완료 처리
app.put('/api/orders/:id/delivered', async (c) => {
  const orderId = c.req.param('id')
  
  // 주문 상태 업데이트
  await c.env.DB.prepare(
    'UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind('delivered', orderId).run()
  
  // 배송 상태 업데이트
  await c.env.DB.prepare(`
    UPDATE order_shipments 
    SET delivery_status = 'delivered', 
        delivery_completed_date = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE order_id = ?
  `).bind(orderId).run()
  
  // 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, 'shipping', 'delivered', 'system', '배송 완료')
  `).bind(orderId).run()
  
  return c.json({ success: true })
})

// 수령 확인
app.post('/api/orders/:id/confirm', async (c) => {
  const orderId = c.req.param('id')
  const data = await c.req.json()
  
  // 주문 상태 확인
  const order = await c.env.DB.prepare(
    'SELECT order_status FROM orders WHERE id = ?'
  ).bind(orderId).first()
  
  if (!order || order.order_status !== 'delivered') {
    return c.json({ error: '배송 완료된 주문만 수령 확인할 수 있습니다' }, 400)
  }
  
  // 수령 확인 등록
  await c.env.DB.prepare(`
    INSERT INTO order_confirmations (
      order_id, confirmed_by, confirmed_date, rating, review_comment, is_reviewed
    ) VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?, ?)
  `).bind(
    orderId,
    data.user_id || null,
    data.rating || null,
    data.review_comment || null,
    data.rating ? 1 : 0
  ).run()
  
  return c.json({ success: true })
})

// 주문 취소
app.post('/api/orders/:id/cancel', async (c) => {
  const orderId = c.req.param('id')
  const data = await c.req.json()
  
  // 주문 상태 확인
  const order = await c.env.DB.prepare(
    'SELECT order_status FROM orders WHERE id = ?'
  ).bind(orderId).first()
  
  if (!order) {
    return c.json({ error: 'Order not found' }, 404)
  }
  
  if (order.order_status === 'shipped' || order.order_status === 'delivered') {
    return c.json({ error: '배송 시작된 주문은 취소할 수 없습니다' }, 400)
  }
  
  // 주문 상태 업데이트
  await c.env.DB.prepare(
    'UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind('cancelled', orderId).run()
  
  // 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, ?, 'cancelled', ?, ?)
  `).bind(
    orderId,
    order.order_status,
    data.changed_by || 'customer',
    data.cancel_reason || '구매자 요청'
  ).run()
  
  return c.json({ success: true })
})

export default app
