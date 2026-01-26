-- 가격 시스템 업데이트: 소비자가 + 직거래가 + 할인율 25-50%
-- 플랫폼 수수료 5.5%로 변경

-- 1. products 테이블에 새로운 가격 필드 추가
-- consumer_price: 소비자가 (정가)
-- direct_price: 직거래가 (할인가)
-- discount_rate: 이미 존재하므로 업데이트만 수행

-- consumer_price 컬럼 추가 (없을 경우만)
ALTER TABLE products ADD COLUMN consumer_price INTEGER;

-- direct_price 컬럼 추가 (없을 경우만)
ALTER TABLE products ADD COLUMN direct_price INTEGER;

-- 2. 기존 데이터 마이그레이션
-- original_price를 consumer_price로, price를 direct_price로 이동
UPDATE products 
SET consumer_price = COALESCE(original_price, CAST(price / 0.7 AS INTEGER)),
    direct_price = price,
    discount_rate = CAST((1 - CAST(price AS REAL) / COALESCE(original_price, CAST(price / 0.7 AS INTEGER))) * 100 AS INTEGER)
WHERE consumer_price IS NULL;

-- discount_rate가 범위를 벗어나면 기본값 30으로 설정
UPDATE products 
SET discount_rate = 30 
WHERE discount_rate < 25 OR discount_rate > 50;

-- 3. experiences 테이블도 동일하게 업데이트
ALTER TABLE experiences ADD COLUMN consumer_price INTEGER;
ALTER TABLE experiences ADD COLUMN direct_price INTEGER;

UPDATE experiences 
SET consumer_price = COALESCE(original_price, CAST(price / 0.7 AS INTEGER)),
    direct_price = price,
    discount_rate = CAST((1 - CAST(price AS REAL) / COALESCE(original_price, CAST(price / 0.7 AS INTEGER))) * 100 AS INTEGER)
WHERE consumer_price IS NULL;

UPDATE experiences 
SET discount_rate = 30 
WHERE discount_rate < 25 OR discount_rate > 50;

-- 4. 플랫폼 수수료 설정 업데이트 (9.9% → 5.5%)
UPDATE products SET commission_rate = 5.5 WHERE commission_rate IS NOT NULL;
UPDATE experiences SET commission_rate = 5.5 WHERE commission_rate IS NOT NULL;

-- 5. commission_amount 재계산
UPDATE products 
SET commission_amount = CAST(direct_price * 0.055 AS INTEGER),
    producer_revenue = direct_price - CAST(direct_price * 0.055 AS INTEGER)
WHERE direct_price IS NOT NULL;

UPDATE experiences 
SET commission_amount = CAST(direct_price * 0.055 AS INTEGER),
    producer_revenue = direct_price - CAST(direct_price * 0.055 AS INTEGER)
WHERE direct_price IS NOT NULL;

-- 6. 정산 테이블 추가 (배송 완료 + 3일 후 자동 정산)
CREATE TABLE IF NOT EXISTS settlements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  producer_id INTEGER NOT NULL,
  order_amount INTEGER NOT NULL, -- 주문 금액
  commission_amount INTEGER NOT NULL, -- 수수료 (5.5%)
  settlement_amount INTEGER NOT NULL, -- 정산 금액 (주문 금액 - 수수료)
  settlement_status TEXT NOT NULL DEFAULT 'pending' CHECK(settlement_status IN ('pending', 'scheduled', 'completed', 'failed')),
  delivery_confirmed_at DATETIME, -- 배송 완료 확인 시각
  settlement_scheduled_at DATETIME, -- 정산 예정일 (배송 완료 + 3일)
  settlement_completed_at DATETIME, -- 실제 정산 완료 시각
  bank_name TEXT,
  account_number TEXT,
  account_holder TEXT,
  transaction_id TEXT, -- 송금 트랜잭션 ID
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (producer_id) REFERENCES producers(id)
);

CREATE INDEX IF NOT EXISTS idx_settlements_producer_id ON settlements(producer_id);
CREATE INDEX IF NOT EXISTS idx_settlements_status ON settlements(settlement_status);
CREATE INDEX IF NOT EXISTS idx_settlements_scheduled_at ON settlements(settlement_scheduled_at);

-- 7. 정산 이력 테이블
CREATE TABLE IF NOT EXISTS settlement_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  settlement_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (settlement_id) REFERENCES settlements(id)
);

CREATE INDEX IF NOT EXISTS idx_settlement_history_settlement_id ON settlement_history(settlement_id);

-- 8. producers 테이블에 정산 계좌 정보 추가
ALTER TABLE producers ADD COLUMN bank_name TEXT;
ALTER TABLE producers ADD COLUMN account_number TEXT;
ALTER TABLE producers ADD COLUMN account_holder TEXT;

-- 9. 뷰: 정산 대기 목록 (배송 완료 + 3일 경과)
CREATE VIEW IF NOT EXISTS settlements_pending AS
SELECT 
  o.id AS order_id,
  o.order_number,
  oi.producer_id,
  p.name AS producer_name,
  p.bank_name,
  p.account_number,
  p.account_holder,
  oi.price AS order_amount,
  CAST(oi.price * 0.055 AS INTEGER) AS commission_amount,
  oi.price - CAST(oi.price * 0.055 AS INTEGER) AS settlement_amount,
  oc.confirmed_at AS delivery_confirmed_at,
  datetime(oc.confirmed_at, '+3 days') AS settlement_scheduled_at
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN producers p ON oi.producer_id = p.id
LEFT JOIN order_confirmations oc ON o.id = oc.order_id
WHERE o.order_status = 'delivered'
  AND oc.confirmed_at IS NOT NULL
  AND datetime(oc.confirmed_at, '+3 days') <= datetime('now')
  AND NOT EXISTS (
    SELECT 1 FROM settlements s 
    WHERE s.order_id = o.id 
    AND s.settlement_status = 'completed'
  );

-- 10. 예시 데이터 업데이트
-- 기존 상품들의 가격 정보 보정
UPDATE products 
SET 
  consumer_price = CASE 
    WHEN consumer_price IS NULL THEN CAST(direct_price / 0.7 AS INTEGER)
    ELSE consumer_price
  END,
  discount_rate = CASE
    WHEN discount_rate < 25 THEN 25
    WHEN discount_rate > 50 THEN 50
    ELSE discount_rate
  END;

-- NOT NULL 제약 추가 (데이터 보정 후)
-- SQLite는 ALTER TABLE로 NOT NULL을 직접 추가할 수 없으므로 새 테이블 생성 후 마이그레이션 필요
-- 현재는 애플리케이션 레벨에서 NOT NULL 검증 수행
