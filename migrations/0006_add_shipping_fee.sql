-- 배송비 설정 추가

-- 시스템 설정에 기본 배송비 추가
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('default_shipping_fee', '3000', '기본 배송비 (원)'),
('shipping_fee_range_min', '3000', '최소 배송비 (원)'),
('shipping_fee_range_max', '5000', '최대 배송비 (원)');

-- 상품 테이블에 배송비 필드 추가
ALTER TABLE products ADD COLUMN shipping_fee INTEGER DEFAULT 3000;

-- 기존 상품에 기본 배송비 설정
UPDATE products 
SET shipping_fee = 3000
WHERE shipping_fee IS NULL;
