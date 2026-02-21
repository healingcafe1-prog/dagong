-- 다도교육 콘텐츠 길이 확인
SELECT 
  id,
  title,
  LENGTH(content) as content_length,
  duration,
  difficulty
FROM education_curriculum 
WHERE category_id = 1 
  AND id IN (17, 19, 23, 25, 27, 29)
ORDER BY id;
