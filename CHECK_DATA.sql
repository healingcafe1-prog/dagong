-- ========================================
-- 프로덕션 DB 데이터 확인용 SQL
-- Cloudflare D1 콘솔에서 실행
-- ========================================

-- 1. 지역 수 확인
SELECT 'regions' AS table_name, COUNT(*) AS count FROM regions;

-- 2. 카테고리 수 확인
SELECT 'categories' AS table_name, COUNT(*) AS count FROM categories;

-- 3. 생산자 수 확인
SELECT 'producers' AS table_name, COUNT(*) AS count FROM producers;

-- 4. 제품 수 확인 (타입별)
SELECT 'products_tea' AS table_name, COUNT(*) AS count FROM products WHERE product_type = 'tea';
SELECT 'products_craft' AS table_name, COUNT(*) AS count FROM products WHERE product_type = 'craft';
SELECT 'products_gift' AS table_name, COUNT(*) AS count FROM products WHERE product_type = 'gift';
SELECT 'products_local' AS table_name, COUNT(*) AS count FROM products WHERE product_type = 'local';
SELECT 'products_total' AS table_name, COUNT(*) AS count FROM products;

-- 5. 체험 수 확인
SELECT 'experiences' AS table_name, COUNT(*) AS count FROM experiences;

-- 6. 교육 수 확인
SELECT 'education_curriculum' AS table_name, COUNT(*) AS count FROM education_curriculum;

-- 7. 이벤트 수 확인
SELECT 'events' AS table_name, COUNT(*) AS count FROM events;

-- 8. 생산자 목록 확인 (ID와 이름만)
SELECT id, name FROM producers ORDER BY id;

-- 9. 제품 ID 범위 확인
SELECT 
    MIN(id) AS min_id, 
    MAX(id) AS max_id,
    product_type,
    COUNT(*) AS count 
FROM products 
GROUP BY product_type;
