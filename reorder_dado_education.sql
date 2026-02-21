-- 다도교육 프로그램 순서 재배치
-- "다도의 역사와 시대적 변천사" 뒤에 역사 관련 항목들을 그룹화

-- 1. 다도의 의미
UPDATE education_curriculum SET display_order = 1 WHERE id = 12;

-- 2. 다도의 역사와 시대적 변천사
UPDATE education_curriculum SET display_order = 2 WHERE id = 13;

-- 3. 다도의 기원과 발전 (이동)
UPDATE education_curriculum SET display_order = 3 WHERE id = 31;

-- 4. 한국 전통 다도의 역사 (이동)
UPDATE education_curriculum SET display_order = 4 WHERE id = 32;

-- 5. 중국 다도의 역사와 문화 (이동)
UPDATE education_curriculum SET display_order = 5 WHERE id = 33;

-- 6. 일본 다도의 역사와 정신 (이동)
UPDATE education_curriculum SET display_order = 6 WHERE id = 34;

-- 7. 한중일 다도 문화 비교 (이동)
UPDATE education_curriculum SET display_order = 7 WHERE id = 35;

-- 8. 차 힐링 테라피 전문가 과정
UPDATE education_curriculum SET display_order = 8 WHERE id = 17;

-- 9. 차 가공식품 개발 실무
UPDATE education_curriculum SET display_order = 9 WHERE id = 19;

-- 10. 차 카페 창업 완벽 가이드
UPDATE education_curriculum SET display_order = 10 WHERE id = 23;

-- 11. 차 수출입 무역 실무
UPDATE education_curriculum SET display_order = 11 WHERE id = 25;

-- 12. 차 문화 관광 해설사 양성
UPDATE education_curriculum SET display_order = 12 WHERE id = 27;

-- 13. 차 소믈리에 (차 품평 전문가)
UPDATE education_curriculum SET display_order = 13 WHERE id = 29;
