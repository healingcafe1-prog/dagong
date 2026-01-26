-- ===================================================
-- Migration: 중복 지역특산물 카테고리 제거
-- Created: 2026-01-26
-- Description: 데이터베이스에 중복 생성된 지역특산물 카테고리 
--              IDs 22-26을 제거합니다.
--              원본 카테고리 IDs 1-5만 유지합니다.
-- ===================================================

-- 중복 카테고리 삭제 (IDs 22-26)
-- 참고: 원본 카테고리는 IDs 1-5입니다
DELETE FROM categories WHERE id IN (22, 23, 24, 25, 26);

-- 중복 카테고리를 참조하는 상품이 있는지 확인하고 원본으로 변경
-- (만약 있다면 원본 카테고리로 업데이트)
UPDATE products SET category_id = 1 WHERE category_id = 22;  -- 농산물
UPDATE products SET category_id = 2 WHERE category_id = 23;  -- 가공식품
UPDATE products SET category_id = 3 WHERE category_id = 24;  -- 수산물
UPDATE products SET category_id = 4 WHERE category_id = 25;  -- 축산물
UPDATE products SET category_id = 5 WHERE category_id = 26;  -- 기타 특산품
