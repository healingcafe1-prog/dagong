-- 카테고리 추가
INSERT OR IGNORE INTO categories (id, name, type, description) VALUES
(1, '녹차', 'tea', '신선한 녹차 상품'),
(2, '발효차', 'tea', '전통 발효차 상품'),
(3, '도자기', 'craft', '전통 도자기 공예품'),
(4, '목공예', 'craft', '전통 목공예품'),
(5, '선물세트', 'gift_set', '프리미엄 선물세트');

-- 지역 추가
INSERT OR IGNORE INTO regions (id, name, type, description) VALUES
(1, '제주도', 'tea', '청정 제주의 차'),
(2, '하동', 'tea', '전통 하동 차'),
(3, '보성', 'tea', '유명한 보성 녹차'),
(4, '이천', 'craft', '전통 도자기의 고장'),
(5, '경기 광주', 'craft', '전통 목공예의 중심');

-- 생산자 추가
INSERT OR IGNORE INTO producers (id, name, region_id, description, contact_email) VALUES
(1, '제주 차농원', 1, '제주도 청정 차 생산', 'jeju@example.com'),
(2, '하동 전통차', 2, '하동 전통 발효차', 'hadong@example.com'),
(3, '보성 녹차마을', 3, '보성 유기농 녹차', 'boseong@example.com'),
(4, '이천 도예공방', 4, '전통 청자 제작', 'icheon@example.com'),
(5, '경기 목공예', 5, '전통 목공예품', 'gg@example.com');

-- 샘플 상품 추가
INSERT INTO products (name, category_id, producer_id, description, price, original_price, product_type, is_featured, stock_quantity, origin, weight) VALUES
('제주 녹차 초롱잎', 1, 1, '제주도의 맑은 공기와 깨끗한 물로 자란 프리미엄 녹차입니다.', 12600, 18000, 'tea', 1, 100, '제주도', '100g'),
('명월 특선 선물세트', 5, 3, '고급 차와 찻잔이 포함된 프리미엄 선물세트입니다.', 105000, 150000, 'gift_set', 1, 50, '명월', '세트'),
('다기 선물세트', 5, 4, '전통 다기 5종으로 구성된 선물세트입니다.', 140000, 200000, 'gift_set', 1, 30, '이천', '5종 세트'),
('프리미엄 차 선물세트', 5, 3, '최고급 차와 다구가 포함된 프리미엄 세트입니다.', 70000, 100000, 'gift_set', 1, 40, '보성', '세트'),
('청자 주전자', 3, 4, '전통 청자 기법으로 만든 아름다운 주전자입니다.', 105000, 150000, 'craft', 1, 20, '이천', '1개'),
('원목 자반', 4, 5, '천연 원목으로 제작한 전통 찻상입니다.', 84000, 120000, 'craft', 1, 15, '경기 광주', '1개'),
('전통 찻잔 세트', 3, 4, '전통 기법으로 제작한 찻잔 6개 세트입니다.', 56000, 80000, 'craft', 1, 25, '이천', '6개 세트'),
('하동 발효차 150g', 2, 2, '하동에서 정성껏 발효시킨 프리미엄 발효차입니다.', 31500, 45000, 'tea', 1, 80, '하동', '150g');
