-- 공예품 카테고리 추가: 금속공예, 한복공예

-- 1. 금속공예 카테고리 추가
INSERT OR IGNORE INTO categories (name, type, description) 
VALUES ('금속공예', 'craft', '전통 금속 공예품 - 유기, 방짜, 은공예 등');

-- 2. 한복공예 카테고리 추가
INSERT OR IGNORE INTO categories (name, type, description) 
VALUES ('한복공예', 'craft', '전통 한복 및 섬유 공예품 - 한복, 조각보, 자수 등');

-- 3. 목공예 설명 추가 (기존 카테고리 업데이트)
UPDATE categories 
SET description = '전통 목공예품 - 목기, 가구, 소품 등'
WHERE name = '목공예' AND type = 'craft';

-- 4. 확인: 모든 공예 카테고리 조회
-- SELECT id, name, type, description FROM categories WHERE type='craft' ORDER BY id;
