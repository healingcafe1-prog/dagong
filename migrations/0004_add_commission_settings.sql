-- 시스템 설정 테이블 추가
CREATE TABLE IF NOT EXISTS system_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  description TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 판매 수수료 설정 (9.9%)
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('commission_rate', '9.9', '플랫폼 판매 수수료율 (%)');

-- 상품 테이블에 수수료 관련 필드 추가
ALTER TABLE products ADD COLUMN commission_rate REAL DEFAULT 9.9;
ALTER TABLE products ADD COLUMN commission_amount INTEGER;
ALTER TABLE products ADD COLUMN producer_revenue INTEGER;

-- 체험 테이블에 수수료 관련 필드 추가
ALTER TABLE experiences ADD COLUMN commission_rate REAL DEFAULT 9.9;
ALTER TABLE experiences ADD COLUMN commission_amount INTEGER;
ALTER TABLE experiences ADD COLUMN producer_revenue INTEGER;

-- 기존 데이터 업데이트: 수수료와 생산자 수익 계산
-- 수수료 금액 = 판매가 × 9.9%
-- 생산자 수익 = 판매가 - 수수료 금액

UPDATE products 
SET commission_rate = 9.9,
    commission_amount = CAST(price * 0.099 AS INTEGER),
    producer_revenue = price - CAST(price * 0.099 AS INTEGER)
WHERE commission_amount IS NULL;

UPDATE experiences 
SET commission_rate = 9.9,
    commission_amount = CAST(price * 0.099 AS INTEGER),
    producer_revenue = price - CAST(price * 0.099 AS INTEGER)
WHERE commission_amount IS NULL;
