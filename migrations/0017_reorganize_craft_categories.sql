-- 카테고리 재구성: 장식 도자기 → 도자기 + 장식품

-- 1. 기존 "장식 도자기" 이름을 "도자기"로 변경
UPDATE categories 
SET name = '도자기', 
    description = '전통 도자기 - 청자, 백자, 분청사기 등'
WHERE id = 16 AND name = '장식 도자기';

-- 2. 새로운 "장식품" 카테고리 추가 (한복공예 다음에 위치)
INSERT INTO categories (name, type, description) 
VALUES ('장식품', 'craft', '전통 장식 소품 - 노리개, 장신구, 인테리어 소품 등');

-- 3. 카테고리 정렬 순서 (display_order 필드가 있다면 사용)
-- 찻잔(13) → 다관(14) → 다기세트(15) → 도자기(16) → 목공예(17) → 금속공예(27) → 한복공예(28) → 장식품(29)

-- 확인 쿼리
-- SELECT id, name, type, description FROM categories WHERE type='craft' ORDER BY id;
