-- 카테고리 설명 확인
SELECT 
  id,
  name,
  description
FROM education_categories 
WHERE id IN (1, 4);
