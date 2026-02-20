-- =============================================
-- PART 2: 차(tea) 상품 13개 추가
-- 7 → 20
-- =============================================

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (18, '제주 유기농 첫물차', 1, 6, '제주 첫물차', 35000, 100, '/images/products/jeju-first.jpg', 'tea', '100g', '제주', 1, 1, 50000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (19, '하동 야생 녹차', 1, 2, '하동 야생녹차', 42000, 80, '/images/products/hadong-wild.jpg', 'tea', '100g', '하동', 1, 1, 60000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (20, '보성 우전', 2, 1, '보성 우전차', 38000, 90, '/images/products/boseong-ujeon.jpg', 'tea', '100g', '보성', 0, 1, 55000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (21, '제주 말차', 3, 7, '제주 말차', 28000, 120, '/images/products/jeju-matcha.jpg', 'tea', '50g', '제주', 1, 1, 40000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (22, '하동 작설차', 2, 2, '하동 작설차', 45000, 70, '/images/products/hadong-jakseol.jpg', 'tea', '100g', '하동', 0, 1, 65000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (23, '제주 발효차', 4, 7, '제주 발효차', 32000, 85, '/images/products/jeju-fermented.jpg', 'tea', '100g', '제주', 0, 1, 45000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (24, '보성 세작', 2, 1, '보성 세작차', 40000, 75, '/images/products/boseong-sejak.jpg', 'tea', '100g', '보성', 1, 1, 57000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (25, '장흥 청태전', 5, 13, '장흥 청태전', 35000, 65, '/images/products/jangheung-ct.jpg', 'tea', '100g', '장흥', 0, 1, 50000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (26, '제주 백차', 6, 6, '제주 백차', 48000, 55, '/images/products/jeju-white.jpg', 'tea', '50g', '제주', 1, 1, 70000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (27, '하동 홍차', 7, 2, '하동 홍차', 36000, 80, '/images/products/hadong-black.jpg', 'tea', '100g', '하동', 0, 1, 52000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (28, '보성 녹차 티백', 1, 1, '보성 티백', 12000, 150, '/images/products/boseong-teabag.jpg', 'tea', '30개', '보성', 0, 1, 17000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (29, '제주 황차', 6, 7, '제주 황차', 52000, 45, '/images/products/jeju-yellow.jpg', 'tea', '50g', '제주', 1, 1, 75000, 30, 9.9, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, original_price, discount_rate, commission_rate, created_at) VALUES (30, '평창 산야초차', 1, 12, '평창 산야초', 18000, 100, '/images/products/pyeongchang-herb.jpg', 'tea', '100g', '평창', 0, 1, 25000, 30, 9.9, '2024-01-01 00:00:00');

-- 확인: SELECT COUNT(*) FROM products WHERE product_type='tea'; -- 20
