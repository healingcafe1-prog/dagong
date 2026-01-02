-- 체험 프로그램 타입 업데이트
-- SQLite는 CHECK 제약 조건 수정이 불가능하므로 테이블 재생성

-- 1. 임시 테이블 생성 (새로운 experience_type 값 포함)
CREATE TABLE experiences_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  region_id INTEGER,
  producer_id INTEGER,
  experience_type TEXT NOT NULL CHECK(experience_type IN ('tea_ceremony', 'tea_experience', 'craft_workshop', 'farm_tour', 'workshop_visit')),
  description TEXT,
  duration TEXT,
  price INTEGER NOT NULL,
  max_participants INTEGER,
  main_image TEXT,
  is_available BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  original_price INTEGER,
  discount_rate REAL DEFAULT 30,
  commission_rate REAL DEFAULT 9.9,
  commission_amount INTEGER,
  producer_revenue INTEGER,
  FOREIGN KEY (region_id) REFERENCES regions(id),
  FOREIGN KEY (producer_id) REFERENCES producers(id)
);

-- 2. 기존 데이터 복사 (tea_tasting을 tea_experience로 변경)
INSERT INTO experiences_new (
  id, title, region_id, producer_id, experience_type, description, 
  duration, price, max_participants, main_image, is_available, created_at,
  original_price, discount_rate, commission_rate, commission_amount, producer_revenue
)
SELECT 
  id, title, region_id, producer_id, 
  CASE 
    WHEN experience_type = 'tea_tasting' THEN 'tea_experience'
    ELSE experience_type 
  END as experience_type,
  description, duration, price, max_participants, main_image, is_available, created_at,
  original_price, discount_rate, commission_rate, commission_amount, producer_revenue
FROM experiences;

-- 3. 기존 테이블 삭제
DROP TABLE experiences;

-- 4. 새 테이블 이름 변경
ALTER TABLE experiences_new RENAME TO experiences;
