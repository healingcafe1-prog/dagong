-- ===================================================
-- Migration: 차 카테고리 순서 정리 및 말차·허브차 삭제
-- Created: 2026-01-26
-- Description: 
--   1. 말차(ID: 10)와 허브차(ID: 12) 카테고리 삭제
--   2. 해당 카테고리의 상품을 블렌딩차(ID: 11)로 이동
--   3. 최종 차 카테고리 순서: 녹차→백차→청차→황차→홍차→발효차→블렌딩차
-- ===================================================

-- Step 1: 말차와 허브차 카테고리의 상품을 블렌딩차로 이동
UPDATE products SET category_id = 11 WHERE category_id = 10;  -- 말차 상품 → 블렌딩차
UPDATE products SET category_id = 11 WHERE category_id = 12;  -- 허브차 상품 → 블렌딩차

-- Step 2: 말차와 허브차 카테고리 삭제
DELETE FROM categories WHERE id IN (10, 12);

-- 참고: 최종 차 카테고리 (7개, ID 순서대로)
-- ID 6:  녹차
-- ID 30: 백차
-- ID 31: 청차
-- ID 7:  황차
-- ID 8:  홍차
-- ID 9:  발효차
-- ID 11: 블렌딩차
