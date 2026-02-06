-- 공예품 카테고리 완전 복원
-- 최종 순서: 다관 → 찻잔 → 다기세트 → 도자기 → 목공예 → 금속공예 → 한복공예 → 가죽공예 → 장식품 → 서예 → 그림

-- 1. 기존 "장식 도자기"를 "장식품"으로 변경
UPDATE categories SET name = '장식품', description = '인테리어와 장식을 위한 공예품' WHERE name = '장식 도자기' AND type = 'craft';

-- 2. 없는 카테고리 추가
INSERT OR IGNORE INTO categories (name, type, description) VALUES
  ('다기세트', 'craft', '차를 즐기기 위한 완벽한 다기 세트'),
  ('도자기', 'craft', '전통 도자기 공예품 - 백자, 청자, 분청사기 등'),
  ('목공예', 'craft', '나무로 만든 전통 공예품 - 목가구, 목기, 목각 등'),
  ('금속공예', 'craft', '금속 공예품 - 놋그릇, 유기, 장신구 등'),
  ('한복공예', 'craft', '전통 한복과 의상 공예 - 한복, 노리개, 자수 등'),
  ('가죽공예', 'craft', '전통 가죽 공예품 - 가죽 지갑, 가방, 장신구 등'),
  ('서예', 'craft', '전통 서예 작품 - 족자, 액자, 병풍 등'),
  ('그림', 'craft', '전통 회화 작품 - 수묵화, 민화, 채색화 등');

-- 3. display_order 설정 (다관 → 찻잔 → 다기세트 → 도자기 → 목공예 → 금속공예 → 한복공예 → 가죽공예 → 장식품 → 서예 → 그림)
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
