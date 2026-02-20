-- 차 제품 샘플 복원 및 추가

-- 외래키 제약 조건 일시 비활성화
PRAGMA foreign_keys = OFF;

-- 차 제품 추가 (기존 5개 → 총 20개로 확대)
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count) VALUES 
-- 녹차 (category_id: 1) - 기존 1개 + 추가 3개
('제주 유기농 우전', 1, 1, '제주 한라산 첫물차 우전', 42000, 80, '/images/products/tea6.jpg', 'tea', '100g', '제주도', 1, 1, 165),
('하동 야생차', 1, 2, '지리산 야생차밭에서 채취한 녹차', 65000, 40, '/images/products/tea7.jpg', 'tea', '100g', '경남 하동', 1, 1, 130),
('보성 유기농 녹차', 1, 1, '보성 유기농 인증 녹차', 32000, 120, '/images/products/tea8.jpg', 'tea', '100g', '전남 보성', 0, 1, 145),

-- 백차 (category_id: 21) - 신규 3개
('제주 백모단', 21, 1, '제주산 백모단 백차', 58000, 50, '/images/products/tea9.jpg', 'tea', '100g', '제주도', 1, 1, 88),
('김해 은침백호', 21, 2, '김해 전통 은침백호', 68000, 35, '/images/products/tea10.jpg', 'tea', '100g', '경남 김해', 1, 1, 75),
('하동 백차', 21, 2, '하동 전통 백차', 52000, 45, '/images/products/tea11.jpg', 'tea', '100g', '경남 하동', 0, 1, 82),

-- 청차 (category_id: 22) - 신규 3개
('제주 청차', 22, 1, '제주 반발효 청차', 48000, 60, '/images/products/tea12.jpg', 'tea', '100g', '제주도', 1, 1, 92),
('보성 동정오룡', 22, 1, '보성 전통 오룡차', 55000, 40, '/images/products/tea13.jpg', 'tea', '100g', '전남 보성', 1, 1, 85),
('광양 청차', 22, 1, '광양 산지 청차', 45000, 50, '/images/products/tea14.jpg', 'tea', '100g', '전남 광양', 0, 1, 78),

-- 홍차 (category_id: 3) - 신규 3개
('제주 홍차', 3, 1, '제주산 완전 발효 홍차', 38000, 70, '/images/products/tea15.jpg', 'tea', '100g', '제주도', 1, 1, 125),
('하동 홍차', 3, 2, '하동 전통 홍차', 42000, 55, '/images/products/tea16.jpg', 'tea', '100g', '경남 하동', 1, 1, 110),
('보성 홍차', 3, 1, '보성 유기농 홍차', 36000, 65, '/images/products/tea17.jpg', 'tea', '100g', '전남 보성', 0, 1, 98),

-- 블렌딩차 (category_id: 6) - 기존 1개 + 추가 2개
('제주 삼다수 녹차', 6, 1, '제주 삼다수로 우린 녹차 블렌드', 35000, 85, '/images/products/tea18.jpg', 'tea', '80g', '제주도', 1, 1, 155),
('한라봉 블렌딩차', 6, 1, '제주 한라봉과 녹차의 조화', 32000, 90, '/images/products/tea19.jpg', 'tea', '80g', '제주도', 0, 1, 142),

-- 황차 (category_id: 2) - 기존 1개 유지

-- 발효차 (category_id: 4) - 기존 2개 + 추가 1개
('광양 후발효차', 4, 1, '광양 전통 후발효차', 48000, 45, '/images/products/tea20.jpg', 'tea', '100g', '전남 광양', 1, 1, 105);

-- 외래키 제약 조건 다시 활성화
PRAGMA foreign_keys = ON;
