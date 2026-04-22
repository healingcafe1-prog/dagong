-- 상품에 포인트 적립률 컬럼 추가
ALTER TABLE products ADD COLUMN point_rate INTEGER DEFAULT 35 CHECK(point_rate >= 25 AND point_rate <= 35);

-- 샘플 상품 모두 35%로 설정
UPDATE products SET point_rate = 35;
