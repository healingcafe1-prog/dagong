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
  TOSS_PAYMENTS_CLIENT_KEY?: string
  TOSS_PAYMENTS_SECRET_KEY?: string
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS 설정
app.use('/api/*', cors())

// 정적 파일 서빙
app.use('/static/*', serveStatic({ root: './' }))

// 네이버 사이트 소유 확인 파일
app.get('/naverf3735d7a56c13e617b246ff2b6e0da46.html', (c) => {
  return c.text('naver-site-verification: naverf3735d7a56c13e617b246ff2b6e0da46.html', 200, {
    'Content-Type': 'text/html; charset=utf-8'
  })
})

// robots.txt 서빙
app.get('/robots.txt', (c) => {
  return c.text(`User-agent: *
Allow: /

Sitemap: https://dagong.co.kr/sitemap.xml`, 200, {
    'Content-Type': 'text/plain; charset=utf-8'
  })
})

// sitemap.xml 서빙 (간단 버전)
app.get('/sitemap.xml', (c) => {
  const baseUrl = 'https://dagong.co.kr'
  const today = new Date().toISOString().split('T')[0]
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/products</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/products?type=tea</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/products?type=craft</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/regions</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/producers</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/experiences</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/education/apply</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/education/curriculum</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/events</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`

  return c.text(xml, 200, {
    'Content-Type': 'application/xml; charset=utf-8'
  })
})

// PWA 파일 서빙
app.get('/manifest.json', async (c) => {
  const manifestData = {
    name: "다공 - 차와 공예의 직거래 플랫폼",
    short_name: "다공",
    description: "전통 차와 공예품을 생산자와 직거래하는 모바일 플랫폼. 소비자가와 직거래가로 최대 50% 절약하세요.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1e8",
    theme_color: "#7c9473",
    orientation: "portrait-primary",
    scope: "/",
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
      { src: "/static/screenshots/screenshot-mobile.png", sizes: "540x720", type: "image/png", form_factor: "narrow", label: "홈 화면" },
      { src: "/static/screenshots/screenshot-products.png", sizes: "540x720", type: "image/png", form_factor: "narrow", label: "상품 목록" }
    ],
    categories: ["shopping", "food", "lifestyle"],
    lang: "ko-KR",
    dir: "ltr",
    prefer_related_applications: false,
    related_applications: [
      {
        platform: "play",
        url: "https://play.google.com/store/apps/details?id=kr.co.dagong.twa",
        id: "kr.co.dagong.twa"
      }
    ],
    share_target: {
      action: "/share",
      method: "POST",
      enctype: "multipart/form-data",
      params: {
        title: "title",
        text: "text",
        url: "url"
      }
    }
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
  
  // display_order 컬럼으로 정렬 (없으면 id로 정렬)
  query += ' ORDER BY display_order, id'
  
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
  
  // 새로운 가격 필드 사용: consumer_price, direct_price
  // 하위 호환성을 위해 original_price, price도 유지
  const consumerPrice = data.consumer_price || data.original_price
  const directPrice = data.direct_price || data.price
  const discountRate = data.discount_rate || 30
  const commissionRate = 5.5
  const commissionAmount = Math.round(directPrice * (commissionRate / 100))
  const producerRevenue = directPrice - commissionAmount
  
  const result = await c.env.DB.prepare(`
    INSERT INTO products (
      name, category_id, producer_id, description, 
      consumer_price, direct_price, original_price, price, discount_rate, 
      shipping_fee, stock_quantity, commission_rate, commission_amount, producer_revenue,
      main_image, product_type, weight, origin, is_featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.name,
    data.category_id,
    data.producer_id,
    data.description,
    consumerPrice,
    directPrice,
    consumerPrice, // 하위 호환성
    directPrice, // 하위 호환성
    discountRate,
    data.shipping_fee || 3000,
    data.stock_quantity,
    commissionRate,
    commissionAmount,
    producerRevenue,
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
  
  const consumerPrice = data.consumer_price || data.original_price
  const directPrice = data.direct_price || data.price
  const discountRate = data.discount_rate || 30
  const commissionRate = 5.5
  const commissionAmount = Math.round(directPrice * (commissionRate / 100))
  const producerRevenue = directPrice - commissionAmount
  
  await c.env.DB.prepare(`
    UPDATE products 
    SET name = ?, category_id = ?, description = ?,
        consumer_price = ?, direct_price = ?, original_price = ?, price = ?,
        discount_rate = ?, shipping_fee = ?, stock_quantity = ?,
        commission_rate = ?, commission_amount = ?, producer_revenue = ?,
        main_image = ?, weight = ?, origin = ?
    WHERE id = ?
  `).bind(
    data.name,
    data.category_id,
    data.description,
    consumerPrice,
    directPrice,
    consumerPrice, // 하위 호환성
    directPrice, // 하위 호환성
    discountRate,
    data.shipping_fee || 3000,
    data.stock_quantity,
    commissionRate,
    commissionAmount,
    producerRevenue,
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

// 장바구니 개수 조회 (로그인 없이도 작동)
app.get('/api/cart/count', async (c) => {
  const userId = c.req.query('user_id')
  const sessionId = c.req.query('session_id')
  
  // 로그인하지 않은 사용자는 count 0 반환
  if (!userId && !sessionId) {
    return c.json({ count: 0 })
  }
  
  try {
    const query = userId 
      ? 'SELECT COUNT(*) as count FROM cart_items WHERE user_id = ?'
      : 'SELECT COUNT(*) as count FROM cart_items WHERE session_id = ?'
    
    const result = await c.env.DB.prepare(query)
      .bind(userId || sessionId)
      .first()
    
    return c.json({ count: result?.count || 0 })
  } catch (error) {
    console.error('Cart count error:', error)
    return c.json({ count: 0 })
  }
})

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

// ===== 결제 및 정산 시스템 API =====

// 사업자 계좌 등록
app.post('/api/producers/:id/business-account', async (c) => {
  const producerId = c.req.param('id')
  const data = await c.req.json()
  
  try {
    const result = await c.env.DB.prepare(`
      INSERT INTO business_accounts (
        producer_id, business_registration_number, business_name, representative_name,
        business_type, business_category, bank_name, account_number, account_holder,
        commission_rate, settlement_cycle, minimum_settlement_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      producerId,
      data.business_registration_number,
      data.business_name,
      data.representative_name,
      data.business_type || null,
      data.business_category || null,
      data.bank_name,
      data.account_number,
      data.account_holder,
      data.commission_rate || 9.9,
      data.settlement_cycle || 'weekly',
      data.minimum_settlement_amount || 10000
    ).run()
    
    return c.json({ 
      success: true, 
      accountId: result.meta.last_row_id,
      message: '사업자 계좌가 등록되었습니다. 관리자 승인 후 사용 가능합니다.'
    })
  } catch (error: any) {
    return c.json({ error: '계좌 등록 실패: ' + error.message }, 500)
  }
})

// 사업자 계좌 조회
app.get('/api/producers/:id/business-account', async (c) => {
  const producerId = c.req.param('id')
  
  const account = await c.env.DB.prepare(`
    SELECT 
      id, producer_id, business_registration_number, business_name, representative_name,
      business_type, business_category, bank_name, 
      SUBSTR(account_number, 1, 3) || '-****-' || SUBSTR(account_number, -4) as account_number_masked,
      account_holder, commission_rate, settlement_cycle, minimum_settlement_amount,
      verification_status, verified_at, is_active, created_at
    FROM business_accounts
    WHERE producer_id = ?
  `).bind(producerId).first()
  
  if (!account) {
    return c.json({ error: '등록된 계좌 정보가 없습니다' }, 404)
  }
  
  return c.json({ account })
})

// 사업자 계좌 수정
app.put('/api/producers/:id/business-account', async (c) => {
  const producerId = c.req.param('id')
  const data = await c.req.json()
  
  try {
    await c.env.DB.prepare(`
      UPDATE business_accounts SET
        bank_name = ?, account_number = ?, account_holder = ?,
        settlement_cycle = ?, updated_at = CURRENT_TIMESTAMP
      WHERE producer_id = ?
    `).bind(
      data.bank_name,
      data.account_number,
      data.account_holder,
      data.settlement_cycle || 'weekly',
      producerId
    ).run()
    
    return c.json({ success: true, message: '계좌 정보가 수정되었습니다.' })
  } catch (error: any) {
    return c.json({ error: '계좌 수정 실패: ' + error.message }, 500)
  }
})

// 결제 승인 검증 (토스페이먼츠)
app.post('/api/payment/confirm', async (c) => {
  const { orderId, amount, paymentKey } = await c.req.json()
  
  // 토스페이먼츠 API 키 확인
  const SECRET_KEY = c.env.TOSS_PAYMENTS_SECRET_KEY
  if (!SECRET_KEY) {
    return c.json({ error: '결제 시스템 설정 오류' }, 500)
  }
  
  try {
    // 토스페이먼츠 승인 API 호출
    const authString = btoa(SECRET_KEY + ':')
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderId, amount, paymentKey })
    })
    
    const payment = await response.json()
    
    if (!response.ok) {
      throw new Error(payment.message || '결제 승인 실패')
    }
    
    // 주문 정보 조회
    const order = await c.env.DB.prepare(
      'SELECT id FROM orders WHERE order_number = ?'
    ).bind(orderId).first()
    
    if (!order) {
      return c.json({ error: '주문을 찾을 수 없습니다' }, 404)
    }
    
    // 결제 트랜잭션 저장
    await c.env.DB.prepare(`
      INSERT INTO payment_transactions (
        order_id, pg_provider, pg_transaction_id, payment_method, payment_amount,
        card_company, card_number_masked, installment_months,
        transaction_status, approved_at, approval_number, pg_response_data
      ) VALUES (?, 'tosspayments', ?, ?, ?, ?, ?, ?, 'completed', CURRENT_TIMESTAMP, ?, ?)
    `).bind(
      order.id,
      paymentKey,
      payment.method,
      payment.totalAmount,
      payment.card?.company || null,
      payment.card?.number || null,
      payment.card?.installmentPlanMonths || 0,
      payment.approvedAt,
      JSON.stringify(payment)
    ).run()
    
    // 주문 상태 업데이트
    await c.env.DB.prepare(`
      UPDATE orders SET 
        payment_status = 'completed',
        payment_method = ?,
        payment_date = CURRENT_TIMESTAMP,
        payment_transaction_id = ?,
        order_status = 'paid',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(payment.method, paymentKey, order.id).run()
    
    return c.json({ 
      success: true, 
      payment,
      message: '결제가 완료되었습니다.'
    })
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
})

// 결제 취소
app.post('/api/payment/cancel', async (c) => {
  const { paymentKey, cancelReason } = await c.req.json()
  
  const SECRET_KEY = c.env.TOSS_PAYMENTS_SECRET_KEY
  if (!SECRET_KEY) {
    return c.json({ error: '결제 시스템 설정 오류' }, 500)
  }
  
  try {
    const authString = btoa(SECRET_KEY + ':')
    const response = await fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cancelReason })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.message || '결제 취소 실패')
    }
    
    // 트랜잭션 상태 업데이트
    await c.env.DB.prepare(`
      UPDATE payment_transactions SET
        transaction_status = 'cancelled',
        cancelled_at = CURRENT_TIMESTAMP,
        cancel_reason = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE pg_transaction_id = ?
    `).bind(cancelReason, paymentKey).run()
    
    // 주문 상태 업데이트
    await c.env.DB.prepare(`
      UPDATE orders SET
        payment_status = 'refunded',
        order_status = 'cancelled',
        updated_at = CURRENT_TIMESTAMP
      WHERE payment_transaction_id = ?
    `).bind(paymentKey).run()
    
    return c.json({ success: true, message: '결제가 취소되었습니다.' })
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
})

// 정산 내역 조회 (생산자용)
app.get('/api/producers/:id/settlements', async (c) => {
  const producerId = c.req.param('id')
  
  const settlements = await c.env.DB.prepare(`
    SELECT 
      ps.*,
      sb.settlement_period_start,
      sb.settlement_period_end,
      sb.settlement_status as batch_status
    FROM producer_settlements ps
    JOIN settlement_batches sb ON ps.settlement_batch_id = sb.id
    WHERE ps.producer_id = ?
    ORDER BY sb.settlement_period_end DESC
    LIMIT 50
  `).bind(producerId).all()
  
  return c.json({ settlements: settlements.results })
})

// 정산 상세 내역 (주문 목록)
app.get('/api/settlements/:id/items', async (c) => {
  const settlementId = c.req.param('id')
  
  const items = await c.env.DB.prepare(`
    SELECT * FROM settlement_items
    WHERE settlement_id = ?
    ORDER BY order_date DESC
  `).bind(settlementId).all()
  
  return c.json({ items: items.results })
})

// 정산 배치 생성 (관리자용)
app.post('/api/admin/settlements/create-batch', async (c) => {
  const { periodStart, periodEnd } = await c.req.json()
  
  try {
    // 1. 정산 배치 생성
    const batchResult = await c.env.DB.prepare(`
      INSERT INTO settlement_batches (
        settlement_period_start, settlement_period_end, settlement_status
      ) VALUES (?, ?, 'calculating')
    `).bind(periodStart, periodEnd).run()
    
    const batchId = batchResult.meta.last_row_id
    
    // 2. 생산자별 정산 계산
    const producers = await c.env.DB.prepare(`
      SELECT 
        p.id as producer_id,
        ba.id as account_id,
        ba.bank_name,
        ba.account_number,
        ba.account_holder,
        ba.commission_rate,
        COUNT(DISTINCT oi.order_id) as order_count,
        SUM(oi.item_total) as total_sales,
        SUM(oi.commission_amount) as total_commission
      FROM producers p
      JOIN business_accounts ba ON p.id = ba.producer_id
      JOIN order_items oi ON p.id = oi.producer_id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.payment_status = 'completed'
        AND o.order_status NOT IN ('cancelled', 'refunded')
        AND o.payment_date BETWEEN ? AND ?
        AND ba.verification_status = 'verified'
        AND ba.is_active = 1
      GROUP BY p.id
    `).bind(periodStart, periodEnd).all()
    
    let totalOrderAmount = 0
    let totalCommission = 0
    let totalSettlement = 0
    
    // 3. 생산자별 정산 레코드 생성
    for (const producer of producers.results as any[]) {
      const settlementAmount = producer.total_sales - producer.total_commission
      
      await c.env.DB.prepare(`
        INSERT INTO producer_settlements (
          settlement_batch_id, producer_id, account_id,
          settlement_period_start, settlement_period_end,
          order_count, total_sales_amount, total_commission_amount, settlement_amount,
          bank_name, account_number, account_holder, settlement_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `).bind(
        batchId, producer.producer_id, producer.account_id,
        periodStart, periodEnd,
        producer.order_count, producer.total_sales,
        producer.total_commission, settlementAmount,
        producer.bank_name, producer.account_number, producer.account_holder
      ).run()
      
      totalOrderAmount += producer.total_sales
      totalCommission += producer.total_commission
      totalSettlement += settlementAmount
    }
    
    // 4. 배치 통계 업데이트
    await c.env.DB.prepare(`
      UPDATE settlement_batches SET
        settlement_status = 'ready',
        total_order_amount = ?,
        total_commission_amount = ?,
        total_settlement_amount = ?,
        producer_count = ?,
        calculated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(totalOrderAmount, totalCommission, totalSettlement, producers.results.length, batchId).run()
    
    // 5. 플랫폼 수익 기록
    await c.env.DB.prepare(`
      INSERT INTO platform_revenues (
        settlement_batch_id, revenue_period_start, revenue_period_end,
        total_commission_amount, total_order_count, total_order_amount
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).bind(batchId, periodStart, periodEnd, totalCommission, producers.results.length, totalOrderAmount).run()
    
    return c.json({ 
      success: true,
      batchId,
      producerCount: producers.results.length,
      totalOrderAmount,
      totalCommission,
      totalSettlement
    })
  } catch (error: any) {
    return c.json({ error: '정산 배치 생성 실패: ' + error.message }, 500)
  }
})

// 정산 배치 목록 (관리자용)
app.get('/api/admin/settlements/batches', async (c) => {
  const batches = await c.env.DB.prepare(`
    SELECT * FROM settlement_batches
    ORDER BY settlement_period_end DESC
    LIMIT 50
  `).all()
  
  return c.json({ batches: batches.results })
})

// ===== JSX Renderer =====
import { jsxRenderer } from 'hono/jsx-renderer'

app.use('*', jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <title>다공 - 차와 공예의 직거래 플랫폼</title>
        <meta name="description" content="다공 - 전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진을 줄여 합리적 가격으로 좋은 품질을 만나보세요." />
        
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#7c9473" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="다공" />
        
        {/* SEO Keywords */}
        <meta name="keywords" content="다공, 한국차, 전통차, 공예품, 차 직거래, 공예품 직거래, 차산지, 공예산지, 다도, 지역특산품, 보성녹차, 하동녹차, 제주녹차, 전통공예, 도자기, 목공예, 금속공예, Korean tea, Korean craft, traditional tea, handmade craft, direct trade" />
        <meta name="author" content="다공" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="NaverBot" content="index, follow" />
        <meta name="Yeti" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dagong.co.kr/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="다공" />
        <meta property="og:title" content="다공 - 차와 공예의 직거래 플랫폼 | 생산자 직거래로 합리적 가격에" />
        <meta property="og:description" content="전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진 없이 생산자에게 직접 구매하세요. 보성녹차, 하동녹차, 제주녹차부터 전통 도자기, 목공예까지 - 소비자가 대비 최대 50% 절약!" />
        <meta property="og:url" content="https://dagong.co.kr/" />
        <meta property="og:image" content="https://dagong.co.kr/static/icons/icon-512x512.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dagong_kr" />
        <meta name="twitter:title" content="다공 - 차와 공예의 직거래 플랫폼" />
        <meta name="twitter:description" content="전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진 없이 합리적 가격으로 좋은 품질을 만나보세요." />
        <meta name="twitter:image" content="https://dagong.co.kr/static/icons/icon-512x512.png" />
        
        {/* Naver Site Verification */}
        <meta name="naver-site-verification" content="51a0658e89bc8816eeb448bf53b1862b86609662" />
        
        {/* Structured Data */}
        <meta property="article:publisher" content="https://dagong.co.kr" />
        
        {/* External Resources */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* PWA Manifest */}
        <meta name="theme-color" content="#7c9473" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="다공" />
        <link rel="icon" type="image/png" sizes="512x512" href="/static/icons/icon-512x512.png" />
        
        {/* i18n Script */}
        <script src="/static/i18n.js"></script>
        
        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{__html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'tea-green': '#7c9473',
                    'tea-brown': '#8b6f47',
                    'tea-cream': '#f5f1e8',
                    'craft-blue': '#5b7c99',
                  }
                }
              }
            }
          `}} />
      </head>
      <body class="bg-tea-cream min-h-screen">
        {children}
        
        {/* Scripts */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
        <script src="/static/producer-forms.js"></script>
        <script src="/static/mobile.js"></script>
      </body>
    </html>
  )
}))

// ===== Homepage =====
app.get('/', (c) => {
  return c.render(
    <>
      {/* Navigation */}
      <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" class="flex items-center space-x-3 group">
              <i class="fas fa-leaf text-tea-green text-2xl group-hover:rotate-12 transition-transform duration-300"></i>
              <div class="flex items-center" id="logoText">
                <span class="text-2xl font-bold text-gray-800">다공</span>
              </div>
            </a>
            
            {/* Desktop Menu */}
            <div class="hidden md:flex items-center space-x-8">
              <a href="/products?type=tea" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition group">
                <i class="fas fa-mug-hot text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.teaDirect">차 직거래</span>
              </a>
              <a href="/products?type=craft" class="flex flex-col items-center text-gray-700 hover:text-craft-blue transition group">
                <i class="fas fa-palette text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.craft">공예품</span>
              </a>
              <a href="/products?type=gift_set" class="flex flex-col items-center text-gray-700 hover:text-tea-brown transition group">
                <i class="fas fa-gift text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.giftSet">선물세트</span>
              </a>
              <a href="/products?type=local" class="flex flex-col items-center text-gray-700 hover:text-green-600 transition group">
                <i class="fas fa-seedling text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.localProducts">지역특산물</span>
              </a>
              <a href="/regions" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition group">
                <i class="fas fa-map-marked-alt text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.regions">지역별 보기</span>
              </a>
              <a href="/experiences" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition group">
                <i class="fas fa-users text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.experiences">체험·교육</span>
              </a>
              <div class="relative group">
                <a href="/education/curriculum" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition">
                  <i class="fas fa-graduation-cap text-xl mb-1"></i>
                  <span class="text-sm" data-i18n="nav.education">다도교육</span>
                </a>
                <div class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <a href="/education/curriculum" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-book mr-2"></i>
                    <span data-i18n="nav.educationCurriculum">교육 커리큘럼</span>
                  </a>
                  <a href="/education/apply" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-pencil-alt mr-2"></i>
                    <span data-i18n="nav.educationApply">교육 신청</span>
                  </a>
                  <a href="/education/status" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-list-check mr-2"></i>
                    <span data-i18n="nav.educationStatus">교육 현황</span>
                  </a>
                </div>
              </div>
              <a href="/events" class="flex flex-col items-center text-gray-700 hover:text-tea-brown transition group">
                <i class="fas fa-star text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.events">이벤트</span>
              </a>
            </div>
            
            {/* Right Actions */}
            <div class="flex items-center space-x-4">
              <button id="searchBtn" class="text-gray-700 hover:text-tea-green">
                <i class="fas fa-search text-xl"></i>
              </button>
              <a href="/cart" class="relative text-gray-700 hover:text-tea-green transition">
                <i class="fas fa-shopping-cart text-xl"></i>
                <span id="cartCount" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold" style="display: none;">0</span>
              </a>
              <div class="relative hidden md:block">
                <button id="langBtn" class="flex items-center space-x-1 text-gray-700 hover:text-tea-green transition">
                  <i class="fas fa-globe text-xl"></i>
                  <span id="currentLang" class="text-sm font-medium">KO</span>
                  <i class="fas fa-chevron-down text-xs"></i>
                </button>
                <div id="langDropdown" class="hidden absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <button data-lang="ko" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                    <span class="flex items-center"><span class="mr-2">🇰🇷</span> 한국어</span>
                    <span class="text-xs text-gray-500">KO</span>
                  </button>
                  <button data-lang="en" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                    <span class="flex items-center"><span class="mr-2">🇺🇸</span> English</span>
                    <span class="text-xs text-gray-500">EN</span>
                  </button>
                  <button data-lang="zh" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                    <span class="flex items-center"><span class="mr-2">🇨🇳</span> 中文</span>
                    <span class="text-xs text-gray-500">ZH</span>
                  </button>
                  <button data-lang="ja" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                    <span class="flex items-center"><span class="mr-2">🇯🇵</span> 日本語</span>
                    <span class="text-xs text-gray-500">JA</span>
                  </button>
                </div>
              </div>
              <div id="userMenu" class="hidden md:block">
                <a href="/login" id="loginBtn" class="text-gray-700 hover:text-tea-green">
                  <i class="fas fa-user text-xl"></i>
                </a>
                <div id="userDropdown" class="hidden relative">
                  <button id="userMenuBtn" class="flex items-center space-x-2 text-gray-700 hover:text-tea-green">
                    <img id="userAvatar" src="" alt="프로필" class="w-8 h-8 rounded-full" />
                    <span id="userName"></span>
                  </button>
                  <div id="dropdownMenu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <a href="/mypage" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <i class="fas fa-user mr-2"></i>마이페이지
                    </a>
                    <button id="logoutBtn" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <i class="fas fa-sign-out-alt mr-2"></i>로그아웃
                    </button>
                  </div>
                </div>
              </div>
              <button id="mobileMenuBtn" class="md:hidden text-gray-700">
                <i class="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div id="mobileMenu" class="hidden md:hidden pb-4">
            <a href="/products?type=tea" class="block py-2 text-gray-700 hover:text-tea-green">차 직거래</a>
            <a href="/products?type=craft" class="block py-2 text-gray-700 hover:text-craft-blue">공예품</a>
            <a href="/products?type=gift_set" class="block py-2 text-gray-700 hover:text-tea-brown">선물세트</a>
            <a href="/products?type=local" class="block py-2 text-gray-700 hover:text-green-600">지역특산물</a>
            <a href="/regions" class="block py-2 text-gray-700 hover:text-tea-green">지역별 보기</a>
            <a href="/experiences" class="block py-2 text-gray-700 hover:text-tea-green">체험·교육</a>
            <div class="py-2">
              <div class="font-medium text-gray-900 mb-1">다도교육</div>
              <a href="/education/curriculum" class="block py-1 pl-4 text-gray-700 hover:text-tea-green">교육 커리큘럼</a>
              <a href="/education/apply" class="block py-1 pl-4 text-gray-700 hover:text-tea-green">교육 신청</a>
              <a href="/education/status" class="block py-1 pl-4 text-gray-700 hover:text-tea-green">교육 현황</a>
            </div>
            <a href="/events" class="block py-2 text-gray-700 hover:text-tea-brown">이벤트</a>
            <div class="py-2 border-t border-gray-200 mt-2">
              <div class="font-medium text-gray-900 mb-2 flex items-center">
                <i class="fas fa-globe mr-2"></i>언어 선택
              </div>
              <button data-lang-mobile="ko" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                <span class="mr-2">🇰🇷</span> 한국어 (Korean)
              </button>
              <button data-lang-mobile="en" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                <span class="mr-2">🇺🇸</span> English
              </button>
              <button data-lang-mobile="zh" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                <span class="mr-2">🇨🇳</span> 中文 (Chinese)
              </button>
              <button data-lang-mobile="ja" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                <span class="mr-2">🇯🇵</span> 日本語 (Japanese)
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Search Modal */}
      <div id="searchModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-800">검색</h3>
              <button id="closeSearchBtn" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
            <input type="text" id="searchInput" placeholder="상품, 생산자, 지역을 검색하세요..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green" />
            <div id="searchResults" class="mt-4"></div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main class="min-h-screen">
        <div id="app">
          <div class="loading">로딩 중...</div>
        </div>
      </main>
      
      {/* Footer */}
      <footer class="bg-gray-800 text-white mt-20">
        <div class="container mx-auto px-4 py-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 class="text-lg font-bold mb-4">다공</h4>
              <p class="text-gray-400 text-sm">전통 차와 공예품을 생산자와<br />직거래하는 플랫폼입니다.</p>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-4">상품</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="/products?type=tea" class="text-gray-400 hover:text-white">차 직거래</a></li>
                <li><a href="/products?type=craft" class="text-gray-400 hover:text-white">공예품</a></li>
                <li><a href="/products?type=gift_set" class="text-gray-400 hover:text-white">선물세트</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-4">지역</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="/regions?type=tea" class="text-gray-400 hover:text-white">차 산지</a></li>
                <li><a href="/regions?type=craft" class="text-gray-400 hover:text-white">공예 산지</a></li>
                <li><a href="/producers" class="text-gray-400 hover:text-white">생산자</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-4">체험·이벤트</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="/experiences" class="text-gray-400 hover:text-white">체험 프로그램</a></li>
                <li><a href="/events" class="text-gray-400 hover:text-white">이달의 이벤트</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 다공. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
})

export default app
