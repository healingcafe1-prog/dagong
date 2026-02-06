-- ===================================================
-- Migration: 월별 행사 및 할인 이벤트 시스템 추가
-- Created: 2026-02-06
-- Description: 
--   1. events 테이블에 month 컬럼 추가 (1-12월)
--   2. recurring 컬럼 추가 (매년 반복 여부)
--   3. priority 컬럼 추가 (표시 우선순위)
-- ===================================================

-- Step 1: events 테이블에 새 컬럼 추가
ALTER TABLE events ADD COLUMN month INTEGER DEFAULT 0;  -- 0=전체, 1-12=해당월
ALTER TABLE events ADD COLUMN is_recurring INTEGER DEFAULT 0;  -- 0=일회성, 1=매년반복
ALTER TABLE events ADD COLUMN priority INTEGER DEFAULT 0;  -- 높을수록 우선 표시

-- Step 2: 기존 이벤트에 month 설정
UPDATE events SET month = 1 WHERE title LIKE '%신년%';
UPDATE events SET month = 2 WHERE title LIKE '%봄%' OR title LIKE '%햇차%';
UPDATE events SET month = 5 WHERE title LIKE '%어버이날%' OR title LIKE '%가정의달%';

-- Step 3: 매년 반복되는 이벤트 설정
UPDATE events SET is_recurring = 1 WHERE event_type IN ('season', 'holiday');

-- 참고: 월별 이벤트 타입
-- - discount: 할인 이벤트
-- - season: 시즌/계절 이벤트
-- - holiday: 명절/기념일 이벤트
-- - new_product: 신상품 출시
-- - special: 특별 행사
