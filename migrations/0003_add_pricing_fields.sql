-- 상품 테이블에 정가와 할인율 필드 추가
ALTER TABLE products ADD COLUMN original_price INTEGER;
ALTER TABLE products ADD COLUMN discount_rate INTEGER DEFAULT 30;

-- 체험 테이블에 정가와 할인율 필드 추가
ALTER TABLE experiences ADD COLUMN original_price INTEGER;
ALTER TABLE experiences ADD COLUMN discount_rate INTEGER DEFAULT 30;

-- 기존 데이터 마이그레이션: 현재 price를 할인가로 간주하고 정가 역산
-- 할인가 = 정가 × (1 - 할인율/100)
-- 정가 = 할인가 / (1 - 할인율/100) = 할인가 / 0.7

-- products 테이블 업데이트
UPDATE products 
SET original_price = CAST(price / 0.7 AS INTEGER),
    discount_rate = 30
WHERE original_price IS NULL;

-- experiences 테이블 업데이트
UPDATE experiences 
SET original_price = CAST(price / 0.7 AS INTEGER),
    discount_rate = 30
WHERE original_price IS NULL;
