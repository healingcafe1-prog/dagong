-- ================================================
-- 다공(dagong) 홈페이지 데이터 복원 SQL
-- ================================================
-- 실행 위치: Cloudflare D1 Console
-- URL: https://dash.cloudflare.com/.../workers/d1/.../
-- ================================================

-- ========================================
-- 1. 추천 상품 설정 (Featured Products)
-- ========================================

-- 기존 상품을 추천 상품으로 설정
UPDATE products 
SET is_featured = 1 
WHERE id IN (1, 2, 3);

-- 확인
SELECT id, name, is_featured, price, product_type 
FROM products 
WHERE is_featured = 1;

-- ========================================
-- 2. 이벤트 추가 (Events)
-- ========================================

-- 진행 중인 이벤트 추가
INSERT INTO events (
  title, description, event_type, 
  discount_rate, banner_image,
  start_date, end_date, is_active,
  created_at
) VALUES 
  (
    '신규 회원 가입 혜택',
    '신규 가입 시 첫 구매 15% 할인! 전통 차와 공예품을 합리적인 가격에 만나보세요.',
    'discount',
    15,
    null,
    '2026-02-01',
    '2026-02-28',
    1,
    CURRENT_TIMESTAMP
  ),
  (
    '봄맞이 특가 이벤트',
    '봄을 맞아 준비한 특별한 할인! 신선한 봄차와 전통 공예품을 만나보세요.',
    'season',
    20,
    null,
    '2026-02-01',
    '2026-03-31',
    1,
    CURRENT_TIMESTAMP
  ),
  (
    '생산자 직거래 페스티벌',
    '생산자와 직접 만나는 특별한 기회! 전국 각지의 차와 공예품 생산자들과 함께합니다.',
    'festival',
    0,
    null,
    '2026-02-15',
    '2026-02-28',
    1,
    CURRENT_TIMESTAMP
  );

-- 확인
SELECT id, title, event_type, discount_rate, start_date, end_date 
FROM events 
WHERE is_active = 1;

-- ========================================
-- 3. 추가 상품 데이터 (선택적)
-- ========================================

-- 더 많은 추천 상품 추가 (기존 데이터가 부족한 경우)
-- 이미 3개 상품이 있으면 건너뛰세요

-- 보성 녹차 추가 상품
INSERT OR IGNORE INTO products (
  name, category_id, producer_id, description,
  price, stock, product_type, is_featured, is_available,
  created_at, updated_at
) VALUES 
  (
    '보성 유기농 녹차 프리미엄',
    1, 1,
    '유기농 인증을 받은 프리미엄 보성 녹차입니다. 깊은 향과 부드러운 맛이 특징입니다.',
    25000, 50,
    'tea', 1, 1,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ),
  (
    '하동 야생차 선물세트',
    1, 2,
    '하동의 청정 지역에서 자란 야생차를 엄선한 선물세트입니다.',
    35000, 30,
    'tea', 1, 1,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  );

-- 전통 공예품 추가
INSERT OR IGNORE INTO products (
  name, category_id, producer_id, description,
  price, stock, product_type, is_featured, is_available,
  created_at, updated_at
) VALUES 
  (
    '이천 백자 찻잔 세트 (5개입)',
    3, 3,
    '전통 방식으로 제작한 이천 백자 찻잔 세트입니다. 우아한 디자인이 돋보입니다.',
    55000, 15,
    'craft', 1, 1,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  ),
  (
    '수제 다관 (차 주전자)',
    3, 3,
    '숙련된 장인이 직접 만든 전통 다관입니다. 차의 향을 더욱 깊게 만들어줍니다.',
    78000, 10,
    'craft', 1, 1,
    CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  );

-- ========================================
-- 4. 이벤트-상품 연결 (Event Products)
-- ========================================

-- 이벤트에 상품 연결 (이벤트 ID와 상품 ID 확인 필요)
INSERT OR IGNORE INTO event_products (event_id, product_id)
SELECT e.id, p.id
FROM events e, products p
WHERE e.event_type = 'discount'
  AND p.is_featured = 1
  AND e.is_active = 1
LIMIT 5;

-- 확인
SELECT 
  ep.id,
  e.title as event_title,
  p.name as product_name
FROM event_products ep
JOIN events e ON ep.event_id = e.id
JOIN products p ON ep.product_id = p.id;

-- ========================================
-- 5. 최종 확인
-- ========================================

-- 추천 상품 확인
SELECT 
  p.id, p.name, p.price, p.is_featured,
  c.name as category_name,
  pr.name as producer_name,
  r.name as region_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN producers pr ON p.producer_id = pr.id
LEFT JOIN regions r ON pr.region_id = r.id
WHERE p.is_featured = 1
ORDER BY p.id;

-- 활성 이벤트 확인
SELECT 
  id, title, event_type, discount_rate,
  start_date, end_date, is_active
FROM events
WHERE is_active = 1
ORDER BY start_date DESC;

-- 지역 데이터 확인
SELECT type, COUNT(*) as count
FROM regions
GROUP BY type;

-- ========================================
-- 완료!
-- ========================================
-- 위 SQL을 모두 실행한 후:
-- 1. https://dagong-bi1.pages.dev 새로고침
-- 2. 추천 상품 섹션 확인
-- 3. 이벤트 섹션 확인
-- 4. 차 산지/공예 산지 섹션 확인
-- ========================================
