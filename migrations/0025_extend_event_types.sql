-- ===================================================
-- Migration: 이벤트 타입 확장
-- Created: 2026-02-06
-- Description: event_type에 holiday, special 추가
-- ===================================================

-- Step 1: 기존 테이블 백업
CREATE TABLE events_backup AS SELECT * FROM events;

-- Step 2: 기존 테이블 삭제
DROP TABLE events;

-- Step 3: 새로운 스키마로 테이블 재생성
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK(event_type IN ('discount', 'new_product', 'season', 'festival', 'holiday', 'special')),
  discount_rate INTEGER DEFAULT 0,
  banner_image TEXT,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  month INTEGER DEFAULT 0,
  is_recurring INTEGER DEFAULT 0,
  priority INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Step 4: 백업 데이터 복원
INSERT INTO events (id, title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority, created_at)
SELECT id, title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority, created_at
FROM events_backup;

-- Step 5: 백업 테이블 삭제
DROP TABLE events_backup;
