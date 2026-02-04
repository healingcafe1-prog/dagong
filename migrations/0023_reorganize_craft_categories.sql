-- 공예품 카테고리 재정리
-- 요청 순서: 다관 → 찻잔 → 다기세트 → 도자기 → 목공예 → 금속공예 → 한복공예 → 가죽공예 → 장식품 → 서예 → 그림

-- 1. 새로운 카테고리 추가 (가죽공예, 서예, 그림)
INSERT OR IGNORE INTO categories (name, type, description) VALUES
  ('가죽공예', 'craft', '전통 가죽 공예품 - 가죽 지갑, 가방, 장신구 등'),
  ('서예', 'craft', '전통 서예 작품 - 족자, 액자, 병풍 등'),
  ('그림', 'craft', '전통 회화 작품 - 수묵화, 민화, 채색화 등');

-- 2. display_order 컬럼이 없으면 추가 (이미 있을 수 있음)
-- ALTER TABLE categories ADD COLUMN display_order INTEGER;
-- 이미 0021 마이그레이션에서 추가되었으므로 생략

-- 3. 공예품 카테고리 순서 설정
-- 다관(14) → 찻잔(13) → 다기세트(15) → 도자기(16) → 목공예(17) → 
-- 금속공예(27) → 한복공예(28) → 가죽공예(신규) → 장식품(29) → 서예(신규) → 그림(신규)

UPDATE categories SET display_order = 1 WHERE name = '다관' AND type = 'craft';
UPDATE categories SET display_order = 2 WHERE name = '찻잔' AND type = 'craft';
UPDATE categories SET display_order = 3 WHERE name = '다기세트' AND type = 'craft';
UPDATE categories SET display_order = 4 WHERE name = '도자기' AND type = 'craft';
UPDATE categories SET display_order = 5 WHERE name = '목공예' AND type = 'craft';
UPDATE categories SET display_order = 6 WHERE name = '금속공예' AND type = 'craft';
UPDATE categories SET display_order = 7 WHERE name = '한복공예' AND type = 'craft';
UPDATE categories SET display_order = 8 WHERE name = '가죽공예' AND type = 'craft';
UPDATE categories SET display_order = 9 WHERE name = '장식품' AND type = 'craft';
UPDATE categories SET display_order = 10 WHERE name = '서예' AND type = 'craft';
UPDATE categories SET display_order = 11 WHERE name = '그림' AND type = 'craft';
