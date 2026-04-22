-- 주문 테이블에 포인트 관련 컬럼 추가
ALTER TABLE orders ADD COLUMN points_earned INTEGER DEFAULT 0;  -- 이 주문으로 적립된 포인트
ALTER TABLE orders ADD COLUMN points_used INTEGER DEFAULT 0;    -- 이 주문에 사용된 포인트
