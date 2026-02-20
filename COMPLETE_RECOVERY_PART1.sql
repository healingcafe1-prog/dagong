-- =============================================
-- 완전 복구 SQL - 정확한 목표
-- 생성일: 2026-02-20
-- 목표: 원래 계획대로 78개 상품 + 13명 생산자 + 5개 체험
-- =============================================

-- 현재: 생산자 5, 체험 4, 교육 30, 상품 17 (차7 공예4 선물3 지역3)
-- 목표: 생산자 13, 체험 5, 교육 30, 상품 78 (차20 공예23 선물2 지역33)

-- =============================================
-- 1. 생산자 추가 (5 → 13, 8명 추가)
-- =============================================

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (6, '제주 다원명가', 1, 'tea', '제주 화산토 유기농 녹차', '3대째 이어온 차 농가', 'jejutea@example.com', '064-123-4567', '제주특별자치도 서귀포시', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (7, '제주 차향', 1, 'tea', '제주 전통 발효차 전문', '자연 발효 전통 방식', 'chahyang@example.com', '064-234-5678', '제주특별자치도 제주시', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (8, '경기 광주 도예공방', 10, 'craft', '전통 백자 명인', '30년 경력의 도예가', 'gwangjupot@example.com', '031-123-4567', '경기도 광주시', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (9, '이천 도자예술촌', 10, 'craft', '청자와 백자 전문', '이천 도자기 전통', 'icheon@example.com', '031-234-5678', '경기도 이천시', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (10, '담양 죽세공예', 11, 'craft', '대나무 공예 전문', '전통 죽세 기법', 'damyang@example.com', '061-123-4567', '전남 담양군', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (11, '통영 나전칠기', 12, 'craft', '나전칠기 명장', '전통 나전 기법', 'tongyeong@example.com', '055-123-4567', '경남 통영시', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (12, '강원 평창 농특산', 13, 'tea', '고랭지 특산물', '청정 고랭지 재배', 'pyeongchang@example.com', '033-123-4567', '강원도 평창군', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (13, '장흥 정남진차', 14, 'tea', '정남진 청태전', '전통 발효차', 'jangheung@example.com', '061-234-5678', '전남 장흥군', '2024-01-01 00:00:00');

-- 확인: SELECT COUNT(*) FROM producers; -- 결과: 13

-- =============================================
-- 2. 체험 프로그램 추가 (4 → 5, 1개 추가)
-- =============================================

INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, is_available, created_at) VALUES (5, '하동 야생차 체험', 2, 2, 'tea_experience', '천년 야생차밭 체험', '3시간', 45000, 15, 1, '2024-01-01 00:00:00');

-- 확인: SELECT COUNT(*) FROM experiences; -- 결과: 5

-- =============================================
-- 3. 차(tea) 상품 추가 (7 → 20, 13개 추가)
-- =============================================

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (18, '제주 유기농 첫물차', 1, 6, '제주 첫물차', 35000, 100, '/images/products/jeju-first.jpg', 'tea', '100g', '제주', 1, 1, 50000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (19, '하동 야생 녹차', 1, 2, '하동 야생녹차', 42000, 80, '/images/products/hadong-wild.jpg', 'tea', '100g', '하동', 1, 1, 60000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (20, '보성 우전', 2, 1, '보성 우전차', 38000, 90, '/images/products/boseong-ujeon.jpg', 'tea', '100g', '보성', 0, 1, 55000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (21, '제주 말차', 3, 7, '제주 말차', 28000, 120, '/images/products/jeju-matcha.jpg', 'tea', '50g', '제주', 1, 1, 40000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (22, '하동 작설차', 2, 2, '하동 작설차', 45000, 70, '/images/products/hadong-jakseol.jpg', 'tea', '100g', '하동', 0, 1, 65000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (23, '제주 발효차', 4, 7, '제주 발효차', 32000, 85, '/images/products/jeju-fermented.jpg', 'tea', '100g', '제주', 0, 1, 45000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (24, '보성 세작', 2, 1, '보성 세작차', 40000, 75, '/images/products/boseong-sejak.jpg', 'tea', '100g', '보성', 1, 1, 57000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (25, '장흥 청태전', 5, 13, '장흥 청태전', 35000, 65, '/images/products/jangheung-cheongtaejeon.jpg', 'tea', '100g', '장흥', 0, 1, 50000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (26, '제주 백차', 6, 6, '제주 백차', 48000, 55, '/images/products/jeju-white.jpg', 'tea', '50g', '제주', 1, 1, 70000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (27, '하동 홍차', 7, 2, '하동 홍차', 36000, 80, '/images/products/hadong-black.jpg', 'tea', '100g', '하동', 0, 1, 52000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (28, '보성 녹차 티백', 1, 1, '보성 녹차 티백', 12000, 150, '/images/products/boseong-teabag.jpg', 'tea', '30개입', '보성', 0, 1, 17000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (29, '제주 황차', 6, 7, '제주 황차', 52000, 45, '/images/products/jeju-yellow.jpg', 'tea', '50g', '제주', 1, 1, 75000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (30, '평창 산야초차', 1, 12, '평창 산야초차', 18000, 100, '/images/products/pyeongchang-herb.jpg', 'tea', '100g', '평창', 0, 1, 25000, 30, 9.9, '2024-01-01 00:00:00');

-- 확인: SELECT COUNT(*) FROM products WHERE product_type='tea'; -- 결과: 20

-- =============================================
-- 다음: 공예품 19개, 지역특산 30개 추가 필요
-- (파일이 너무 길어져서 분할 필요)
-- =============================================
