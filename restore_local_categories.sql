-- 지역 특산품 카테고리 복원
-- 최종 순서: 농산물 → 수산물 → 축산물 → 특산품 → 가공식품

-- 1. "특산품" 카테고리 추가 (없으면)
INSERT OR IGNORE INTO categories (name, type, description) VALUES
  ('특산품', 'local', '지역의 독특한 특산품');

-- 2. display_order 설정 (농산물 → 수산물 → 축산물 → 특산품 → 가공식품)
UPDATE categories SET display_order = 1 WHERE name = '농산물' AND type = 'local';
UPDATE categories SET display_order = 2 WHERE name = '수산물' AND type = 'local';
UPDATE categories SET display_order = 3 WHERE name = '축산물' AND type = 'local';
UPDATE categories SET display_order = 4 WHERE name = '특산품' AND type = 'local';
UPDATE categories SET display_order = 5 WHERE name = '가공식품' AND type = 'local';
