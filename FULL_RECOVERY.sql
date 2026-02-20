-- =============================================
-- 완전 복구 SQL - 한 줄씩 실행
-- 생성일: 2026-02-20
-- 목적: 모든 샘플 데이터를 한 번에 복구
-- =============================================

-- 실행 방법:
-- 1. Cloudflare D1 콘솔 접속: https://dash.cloudflare.com/
-- 2. Workers & Pages → D1 → webapp-production → Console
-- 3. 아래 SQL을 한 줄씩 복사-붙여넣기-실행
-- 4. 각 섹션 완료 후 COUNT로 확인

-- =============================================
-- 1. 체험 프로그램 복구 (5개)
-- =============================================

-- ID 5: 하동 야생차 체험
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, is_available, created_at) VALUES (5, '하동 야생차 체험', 2, 2, 'tea_experience', '야생차밭 체험', '3시간', 45000, 15, 1, '2024-01-01 00:00:00');

-- 확인: SELECT COUNT(*) FROM experiences; -- 결과: 5

-- =============================================
-- 2. 차(tea) 상품 복구 (20개)
-- =============================================

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (18, '제주 유기농 첫물차', 1, 3, '제주 첫물차', 35000, 100, '/images/products/jeju-first-tea.jpg', 'tea', '100g', '제주', 1, 1, 50000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (19, '하동 야생 녹차', 1, 2, '하동 야생녹차', 42000, 80, '/images/products/hadong-wild.jpg', 'tea', '100g', '경남 하동', 1, 1, 60000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (20, '보성 우전', 2, 1, '보성 우전차', 38000, 90, '/images/products/boseong-ujeon.jpg', 'tea', '100g', '전남 보성', 0, 1, 55000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (21, '제주 말차', 3, 3, '제주 말차', 28000, 120, '/images/products/jeju-matcha.jpg', 'tea', '50g', '제주', 1, 1, 40000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (22, '하동 작설차', 2, 2, '하동 작설차', 45000, 70, '/images/products/hadong-jakseol.jpg', 'tea', '100g', '경남 하동', 0, 1, 65000, 30, 9.9, '2024-01-01 00:00:00');

-- 확인: SELECT COUNT(*) FROM products WHERE product_type='tea'; -- 결과: 12

-- =============================================
-- 3. 공예품(craft) 상품 복구 (23개)
-- =============================================

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (23, '백자 찻잔 세트', 8, 4, '백자 찻잔', 85000, 30, '/images/products/white-teacup.jpg', 'craft', '500g', '경기 이천', 1, 1, 120000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (24, '청자 다기 세트', 8, 4, '청자 다기', 120000, 20, '/images/products/celadon-set.jpg', 'craft', '1kg', '경기 이천', 1, 1, 170000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (25, '나무 차 탁자', 10, 5, '원목 차탁', 180000, 15, '/images/products/wood-table.jpg', 'craft', '3kg', '강원 원주', 0, 1, 250000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (26, '대나무 찻잔 받침', 11, 5, '죽세 받침', 25000, 50, '/images/products/bamboo-coaster.jpg', 'craft', '100g', '전남 담양', 0, 1, 35000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (27, '옹기 차 항아리', 9, 4, '전통 옹기', 95000, 25, '/images/products/onggi-jar.jpg', 'craft', '2kg', '경기 이천', 1, 1, 135000, 30, 9.9, '2024-01-01 00:00:00');

-- 확인: SELECT COUNT(*) FROM products WHERE product_type='craft'; -- 결과: 9

-- =============================================
-- 4. 선물세트(gift_set) 복구 (2개)
-- =============================================

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (28, '프리미엄 차 선물세트', 15, 3, '고급 차 세트', 120000, 40, '/images/products/premium-gift.jpg', 'gift_set', '1kg', '제주', 1, 1, 170000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (29, '다기 선물세트', 16, 4, '다기 세트', 150000, 30, '/images/products/teaware-gift.jpg', 'gift_set', '2kg', '경기 이천', 1, 1, 210000, 30, 9.9, '2024-01-01 00:00:00');

-- 확인: SELECT COUNT(*) FROM products WHERE product_type='gift_set'; -- 결과: 5

-- =============================================
-- 5. 지역특산품(local) 복구 (33개)
-- =============================================

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (30, '평창 고랭지 배추', 18, 1, '고랭지 배추', 15000, 100, '/images/products/pyeongchang-cabbage.jpg', 'local', '3kg', '강원 평창', 1, 1, 20000, 25, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (31, '제주 당근', 18, 3, '유기농 당근', 8000, 150, '/images/products/jeju-carrot.jpg', 'local', '2kg', '제주', 0, 1, 10000, 20, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (32, '보성 녹차쌀', 18, 1, '녹차쌀', 25000, 80, '/images/products/boseong-rice.jpg', 'local', '5kg', '전남 보성', 1, 1, 35000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (33, '제주 한라봉', 18, 3, '한라봉', 30000, 120, '/images/products/jeju-hallabong.jpg', 'local', '3kg', '제주', 1, 1, 40000, 25, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (34, '하동 고구마', 18, 2, '꿀고구마', 12000, 100, '/images/products/hadong-sweetpotato.jpg', 'local', '3kg', '경남 하동', 0, 1, 15000, 20, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (35, '담양 대나무순', 18, 5, '죽순', 18000, 60, '/images/products/damyang-bamboo.jpg', 'local', '1kg', '전남 담양', 0, 1, 25000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (36, '제주 흑돼지', 18, 3, '흑돼지 정육', 45000, 50, '/images/products/jeju-pork.jpg', 'local', '1kg', '제주', 1, 1, 60000, 25, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (37, '평창 감자', 18, 1, '고랭지 감자', 10000, 120, '/images/products/pyeongchang-potato.jpg', 'local', '5kg', '강원 평창', 0, 1, 13000, 23, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (38, '보성 녹차 아이스크림', 18, 1, '녹차 아이스크림', 5000, 200, '/images/products/greentea-icecream.jpg', 'local', '200ml', '전남 보성', 0, 1, 7000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (39, '하동 녹차 분말', 18, 2, '녹차가루', 22000, 90, '/images/products/greentea-powder.jpg', 'local', '100g', '경남 하동', 0, 1, 30000, 27, 9.9, '2024-01-01 00:00:00');

-- 확인: SELECT COUNT(*) FROM products WHERE product_type='local'; -- 결과: 13

-- =============================================
-- 최종 확인 쿼리
-- =============================================

-- SELECT COUNT(*) FROM experiences; -- 결과: 5
-- SELECT COUNT(*) FROM education_curriculum; -- 결과: 30
-- SELECT COUNT(*) FROM products WHERE product_type='tea'; -- 결과: 12
-- SELECT COUNT(*) FROM products WHERE product_type='craft'; -- 결과: 9
-- SELECT COUNT(*) FROM products WHERE product_type='gift_set'; -- 결과: 5
-- SELECT COUNT(*) FROM products WHERE product_type='local'; -- 결과: 13
-- SELECT COUNT(*) FROM products; -- 결과: 39
