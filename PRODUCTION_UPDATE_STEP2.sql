-- ================================================================
-- 프로덕션 업데이트 Step 2: 카테고리 설명 수정
-- 실행 방법: Cloudflare D1 Console에서 이 파일 내용 전체 복사/붙여넣기
-- ================================================================

-- 다도교육 설명 수정
UPDATE education_categories 
SET description = '다도의 의미와 역사, 방법을 배우며 다도가 인성교육에 도움이 되는 가치를 배웁니다'
WHERE id = 1 AND name = '다도교육';

-- 명상교육 설명 수정
UPDATE education_categories 
SET description = '명상의 기초와 실천, 요가와 마음챙김을 배웁니다'
WHERE id = 4 AND name = '명상교육';
