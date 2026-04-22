-- 지역 특산품 샘플 데이터 10개

-- 1. 제주 감귤 (농산물)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, commission_rate)
VALUES ('제주 한라봉 프리미엄', 17, 1, '제주 청정지역에서 재배한 당도 높은 프리미엄 한라봉입니다. 비타민C가 풍부하고 향이 진합니다.', 35000, 24500, 3000, 100, 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=800', 'local', '3kg (10~12입)', '제주도', 0, 1, 9.9);

-- 2. 보성 녹차 분말 (가공식품)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, commission_rate)
VALUES ('보성 유기농 녹차 분말', 18, 2, '보성 녹차밭에서 재배한 유기농 녹차를 곱게 갈아 만든 프리미엄 녹차 분말입니다.', 28000, 19600, 3000, 80, 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800', 'local', '100g', '보성', 0, 1, 9.9);

-- 3. 완도 전복 (수산물)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, commission_rate)
VALUES ('완도 활전복 특대', 19, 3, '완도 청정해역에서 양식한 싱싱한 활전복입니다. 영양가 높고 쫄깃한 식감이 일품입니다.', 45000, 31500, 5000, 50, 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800', 'local', '1kg (8~10마리)', '완도', 1, 1, 9.9);

-- 4. 횡성 한우 (축산물)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, commission_rate)
VALUES ('횡성 한우 1++ 등심', 20, 4, '횡성에서 정성껏 키운 최고등급 1++ 한우 등심입니다. 마블링이 우수하고 육질이 부드럽습니다.', 120000, 84000, 5000, 30, 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800', 'local', '600g', '횡성', 1, 1, 9.9);

-- 5. 담양 대나무 죽순 (농산물)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, commission_rate)
VALUES ('담양 햇죽순', 17, 5, '담양 죽녹원에서 봄에 채취한 신선한 햇죽순입니다. 식이섬유가 풍부하고 아삭한 식감이 좋습니다.', 25000, 17500, 3000, 60, 'https://images.unsplash.com/photo-1587411768839-39b90e1f00ff?w=800', 'local', '1kg', '담양', 0, 1, 9.9);

-- 6. 영광 굴비 (수산물)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, commission_rate)
VALUES ('영광 법성포 굴비 명품', 19, 1, '영광 법성포 전통방식으로 말린 최상급 굴비입니다. 선물용으로도 인기가 높습니다.', 80000, 56000, 5000, 40, 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800', 'local', '10마리 (특대)', '영광', 1, 1, 9.9);

-- 7. 안동 간고등어 (가공식품)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, commission_rate)
VALUES ('안동 전통 간고등어', 18, 2, '안동 전통 방식으로 간을 맞춘 고등어입니다. 밥도둑으로 유명한 안동의 별미입니다.', 32000, 22400, 3000, 70, 'https://images.unsplash.com/photo-1560717845-968905f761f6?w=800', 'local', '5마리', '안동', 0, 1, 9.9);

-- 8. 이천 쌀 (농산물)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, commission_rate)
VALUES ('이천 임금님표 쌀', 17, 3, '이천 특산 고품질 쌀입니다. 밥맛이 좋고 윤기가 나는 프리미엄 쌀입니다.', 50000, 35000, 3000, 90, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800', 'local', '10kg', '이천', 0, 1, 9.9);

-- 9. 의성 마늘 (농산물)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, commission_rate)
VALUES ('의성 햇마늘 특품', 17, 4, '의성 특산 햇마늘입니다. 알이 굵고 매운맛이 강해 요리에 최고입니다.', 38000, 26600, 3000, 85, 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800', 'local', '3kg (대)', '의성', 0, 1, 9.9);

-- 10. 정읍 장류 세트 (가공식품)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, commission_rate)
VALUES ('정읍 전통 장류 세트', 18, 5, '정읍에서 전통 방식으로 담근 된장, 고추장, 간장 세트입니다. 깊은 맛과 향이 일품입니다.', 65000, 45500, 3000, 55, 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=800', 'local', '된장 1kg + 고추장 1kg + 간장 500ml', '정읍', 1, 1, 9.9);
