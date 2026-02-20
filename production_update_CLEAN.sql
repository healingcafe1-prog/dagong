-- ================================================================
-- 다공 프로덕션 데이터베이스 완전 업데이트
-- 생성일: 2026-02-19
-- 파일: production_update_CLEAN.sql
-- 
-- 사용 방법:
-- 1. 이 파일 전체를 복사 (Ctrl+A, Ctrl+C)
-- 2. Cloudflare Dashboard → D1 → webapp-production → Console
-- 3. 붙여넣기 (Ctrl+V) → Execute 클릭
-- ================================================================

-- Step 1: 기존 데이터 삭제 (순서 중요)
DELETE FROM education_curriculum;
DELETE FROM education_categories;
DELETE FROM experiences;
DELETE FROM products;
DELETE FROM events;
DELETE FROM producers;
DELETE FROM categories;
DELETE FROM regions;


