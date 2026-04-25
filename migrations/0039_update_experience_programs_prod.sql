-- 프로덕션용: 체험 프로그램 업데이트 (승마체험 추가, 다도교육 삭제)
-- 프로덕션 테이블 구조에 맞춤 (17개 컬럼, tea_tasting 포함)

-- 0. View 임시 삭제
DROP VIEW IF EXISTS settlements_pending;

-- 1. 임시 테이블 생성 (horse_riding 타입 추가, tea_tasting 유지)
CREATE TABLE experiences_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  region_id INTEGER,
  producer_id INTEGER,
  experience_type TEXT NOT NULL CHECK(experience_type IN ('tea_experience', 'tea_tasting', 'craft_workshop', 'farm_tour', 'workshop_visit', 'horse_riding')),
  description TEXT,
  duration TEXT,
  price INTEGER NOT NULL,
  max_participants INTEGER,
  main_image TEXT,
  is_available BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  original_price INTEGER,
  discount_rate INTEGER DEFAULT 30,
  commission_rate REAL DEFAULT 9.9,
  commission_amount INTEGER,
  producer_revenue INTEGER,
  FOREIGN KEY (region_id) REFERENCES regions(id),
  FOREIGN KEY (producer_id) REFERENCES producers(id)
);

-- 2. 기존 데이터 복사 (tea_ceremony 제외)
INSERT INTO experiences_new 
SELECT * FROM experiences WHERE experience_type != 'tea_ceremony';

-- 3. 관련 스케줄 삭제 (tea_ceremony 타입)
DELETE FROM experience_schedules WHERE experience_id IN (
  SELECT id FROM experiences WHERE experience_type = 'tea_ceremony'
);

-- 4. 기존 테이블 삭제
DROP TABLE experiences;

-- 5. 새 테이블 이름 변경
ALTER TABLE experiences_new RENAME TO experiences;

-- 6. 승마체험 추가 (괴산 네이쳐승마장 외승)
INSERT INTO experiences (
  title,
  region_id,
  producer_id,
  experience_type,
  description,
  duration,
  price,
  max_participants,
  main_image,
  is_available,
  original_price,
  discount_rate,
  commission_rate
) VALUES (
  '괴산 네이쳐승마장 외승',
  8,
  1,
  'horse_riding',
  '아름다운 자연 속에서 즐기는 승마 외승 체험. 초보자도 안전하게 참여 가능하며, 전문 강사의 1:1 지도로 진행됩니다. 승마 기초 안전 교육(30분) + 마장 내 승마 연습(30분) + 자연 속 외승 체험(60분) + 말 관리 체험(30분)으로 구성됩니다.',
  '2시간 30분',
  100000,
  10,
  'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800',
  1,
  100000,
  0,
  9.9
);

-- 7. View 재생성
CREATE VIEW IF NOT EXISTS settlements_pending AS
SELECT 
  o.id as order_id,
  o.order_number,
  o.created_at as order_date,
  p.name as producer_name,
  p.bank_name,
  p.account_number,
  p.account_holder,
  SUM(oi.producer_revenue) as total_settlement_amount,
  COUNT(oi.id) as item_count
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products pr ON oi.product_id = pr.id
JOIN producers p ON pr.producer_id = p.id
WHERE o.status = 'delivered'
  AND o.settlement_status = 'pending'
GROUP BY o.id, p.id;
