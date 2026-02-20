-- ========================================
-- STEP 3: 선물세트 (15개) + 지역특산품 (33개)
-- Cloudflare D1 콘솔 복사용
-- ========================================

PRAGMA foreign_keys = OFF;

-- 선물세트 15개 (ID: 44, 45, 80-93)
INSERT OR IGNORE INTO products (id, category_id, producer_id, name, description, price, stock, unit, product_type, is_featured, is_available, image, certification, origin, created_at) VALUES
-- 명절 선물세트 (카테고리 13)
(44, 13, 1, '설날 프리미엄 차 선물세트', '제주 유기농차 3종 + 찻잔 세트', 120000, 50, '세트', 'gift', 1, 1, '/images/products/lunar-new-year-set.jpg', '유기농인증', '제주도', '2024-01-25 00:00:00'),
(45, 13, 4, '추석 명품 차 선물세트', '보성 우전 + 세작 + 백자 다기', 185000, 30, '세트', 'gift', 1, 1, '/images/products/chuseok-premium-set.jpg', '유기농인증, GAP인증', '보성', '2024-01-25 00:00:00'),
(80, 13, 2, '단오 전통 차 선물세트', '제주 발효차 + 홍차 + 말차 세트', 95000, 40, '세트', 'gift', 1, 1, '/images/products/dano-traditional-set.jpg', '유기농인증', '제주도', '2024-01-25 00:00:00'),
(81, 13, 3, '동지 건강 차 선물세트', '하동 야생차 3종 + 차 도구', 135000, 35, '세트', 'gift', 1, 1, '/images/products/dongji-health-set.jpg', '무농약인증', '하동', '2024-01-25 00:00:00'),
(82, 13, 10, '백중 효도 차 선물세트', '장흥 발효차 + 녹차 + 다기', 108000, 45, '세트', 'gift', 0, 1, '/images/products/baekjung-filial-set.jpg', '무농약인증', '장흥', '2024-01-25 00:00:00'),
(83, 13, 7, '담양 죽세공예 선물세트', '대나무 다기 세트 + 녹차 2종', 125000, 35, '세트', 'gift', 0, 1, '/images/products/damyang-bamboo-gift-set.jpg', '전통공예품인증', '담양', '2024-01-25 00:00:00'),
(84, 13, 9, '평창 고랭지 특산품 세트', '평창 농산물 + 차 + 지역특산물', 98000, 50, '세트', 'gift', 0, 1, '/images/products/pyeongchang-specialty-set.jpg', '무농약인증, GAP인증', '평창', '2024-01-25 00:00:00'),
(85, 13, 13, '안동 전통 한지 선물세트', '한지 다기 세트 + 녹차 2종 + 한지 공예품', 115000, 40, '세트', 'gift', 0, 1, '/images/products/andong-hanji-gift-set.jpg', '전통공예품인증', '안동', '2024-01-25 00:00:00'),
(86, 13, 11, '강진 다도 입문 선물세트', '강진 녹차 + 다례 도구 + 입문서', 88000, 45, '세트', 'gift', 0, 1, '/images/products/gangjin-tea-ceremony-starter.jpg', '전통식품인증', '강진', '2024-01-25 00:00:00'),
-- 프리미엄 선물세트 (카테고리 14)
(87, 14, 1, '제주 명품 차 선물세트', '제주 암차 + 백차 + 우롱차 + 고급 다기', 320000, 20, '세트', 'gift', 1, 1, '/images/products/jeju-luxury-set.jpg', '유기농인증', '제주도', '2024-01-25 00:00:00'),
(88, 14, 6, '이천 도자 명품 세트', '이천 백자 다관 풀세트 + 프리미엄 녹차', 520000, 15, '세트', 'gift', 1, 1, '/images/products/icheon-ceramic-luxury-set.jpg', '이천도자기명장', '이천', '2024-01-25 00:00:00'),
(89, 14, 8, '통영 나전칠기 프리미엄 세트', '나전칠기 다기 세트 + 제주 고급차 3종', 450000, 12, '세트', 'gift', 1, 1, '/images/products/tongyeong-mop-premium-set.jpg', '무형문화재', '통영', '2024-01-25 00:00:00'),
(90, 14, 4, '보성 명인 차 선물세트', '보성 우전 + 세작 + 말차 + 청자 다기', 285000, 25, '세트', 'gift', 1, 1, '/images/products/boseong-master-set.jpg', '유기농인증, GAP인증', '보성', '2024-01-25 00:00:00'),
(91, 14, 11, '강진 다산 문화 선물세트', '강진 다산녹차 3종 + 서적 + 다기', 195000, 30, '세트', 'gift', 0, 1, '/images/products/gangjin-dasan-culture-set.jpg', '전통식품인증', '강진', '2024-01-25 00:00:00'),
(92, 14, 5, '장인 다기 명품 세트', '광주 분청 다관 세트 + 프리미엄 차 3종', 380000, 18, '세트', 'gift', 1, 1, '/images/products/artisan-teaware-luxury-set.jpg', '명장지정, 전통공예품인증', '경기 광주', '2024-01-25 00:00:00'),
(93, 14, 12, '순천 생태 힐링 선물세트', '순천 생태녹차 3종 + 명상 도구', 165000, 28, '세트', 'gift', 0, 1, '/images/products/suncheon-eco-healing-set.jpg', '무농약인증', '순천', '2024-01-25 00:00:00');

-- 지역 특산품 33개 (ID: 46-78)
INSERT OR IGNORE INTO products (id, category_id, producer_id, name, description, price, stock, unit, product_type, is_featured, is_available, image, certification, origin, created_at) VALUES
(46, 15, 9, '평창 고랭지 배추 (10kg)', '해발 700m 청정 고랭지 배추', 25000, 100, '10kg', 'local', 0, 1, '/images/products/pyeongchang-cabbage.jpg', '무농약인증', '평창', '2024-02-01 00:00:00'),
(47, 15, 9, '평창 고랭지 무 (5kg)', '아삭한 고랭지 무', 15000, 120, '5kg', 'local', 0, 1, '/images/products/pyeongchang-radish.jpg', '무농약인증', '평창', '2024-02-01 00:00:00'),
(48, 15, 9, '평창 감자 (3kg)', '밤맛 나는 고랭지 감자', 12000, 150, '3kg', 'local', 0, 1, '/images/products/pyeongchang-potato.jpg', 'GAP인증', '평창', '2024-02-01 00:00:00'),
(49, 15, 9, '평창 찰옥수수 (10개)', '당도 높은 찰옥수수', 18000, 80, '10개', 'local', 1, 1, '/images/products/pyeongchang-corn.jpg', 'GAP인증', '평창', '2024-02-01 00:00:00'),
(50, 15, 1, '제주 당근 (3kg)', '달콤한 제주 당근', 15000, 90, '3kg', 'local', 0, 1, '/images/products/jeju-carrot.jpg', '무농약인증', '제주도', '2024-02-01 00:00:00'),
(51, 15, 1, '제주 브로콜리 (2kg)', '신선한 제주 브로콜리', 12000, 70, '2kg', 'local', 0, 1, '/images/products/jeju-broccoli.jpg', 'GAP인증', '제주도', '2024-02-01 00:00:00'),
(52, 15, 4, '보성 녹차쌀 (5kg)', '녹차밭에서 재배한 쌀', 28000, 60, '5kg', 'local', 0, 1, '/images/products/boseong-greentea-rice.jpg', '친환경인증', '보성', '2024-02-01 00:00:00'),
(53, 16, 4, '보성 녹차 김 (10매)', '녹차 가루를 입힌 김', 15000, 100, '10매', 'local', 0, 1, '/images/products/boseong-greentea-seaweed.jpg', '전통식품인증', '보성', '2024-02-01 00:00:00'),
(54, 18, 1, '제주 녹차 초콜릿 (200g)', '제주 녹차를 넣은 수제 초콜릿', 18000, 80, '200g', 'local', 0, 1, '/images/products/jeju-greentea-chocolate.jpg', '식품제조인증', '제주도', '2024-02-01 00:00:00'),
(55, 18, 1, '제주 녹차 쿠키 (300g)', '바삭한 녹차 쿠키', 12000, 90, '300g', 'local', 0, 1, '/images/products/jeju-greentea-cookie.jpg', '식품제조인증', '제주도', '2024-02-01 00:00:00'),
(56, 18, 4, '보성 녹차 카스테라', '촉촉한 녹차 카스테라', 15000, 70, '1개', 'local', 0, 1, '/images/products/boseong-greentea-cake.jpg', '식품제조인증', '보성', '2024-02-01 00:00:00'),
(57, 18, 2, '제주 녹차 잼 (250g)', '유기농 녹차로 만든 잼', 14000, 60, '250g', 'local', 0, 1, '/images/products/jeju-greentea-jam.jpg', '유기농가공식품인증', '제주도', '2024-02-01 00:00:00'),
(58, 19, 1, '제주 삼백초 (건조 100g)', '제주 자생 삼백초', 22000, 50, '100g', 'local', 0, 1, '/images/products/jeju-houttuynia.jpg', '무농약인증', '제주도', '2024-02-01 00:00:00'),
(59, 19, 2, '제주 곽향 (건조 100g)', '제주산 곽향', 18000, 55, '100g', 'local', 0, 1, '/images/products/jeju-agastache.jpg', '무농약인증', '제주도', '2024-02-01 00:00:00'),
(60, 19, 9, '평창 더덕 (1kg)', '산지 직송 더덕', 35000, 40, '1kg', 'local', 1, 1, '/images/products/pyeongchang-deodeok.jpg', '무농약인증', '평창', '2024-02-01 00:00:00'),
(61, 19, 9, '평창 도라지 (1kg)', '쌉싸름한 도라지', 32000, 45, '1kg', 'local', 0, 1, '/images/products/pyeongchang-doraji.jpg', '무농약인증', '평창', '2024-02-01 00:00:00'),
(62, 15, 1, '제주 한라봉 (3kg)', '달콤한 제주 한라봉', 35000, 100, '3kg', 'local', 1, 1, '/images/products/jeju-hallabong.jpg', 'GAP인증', '제주도', '2024-02-01 00:00:00'),
(63, 15, 1, '제주 천혜향 (3kg)', '고급 감귤 천혜향', 38000, 80, '3kg', 'local', 1, 1, '/images/products/jeju-cheonhyehyang.jpg', 'GAP인증', '제주도', '2024-02-01 00:00:00'),
(64, 15, 1, '제주 레드향 (3kg)', '새콤달콤 레드향', 32000, 90, '3kg', 'local', 0, 1, '/images/products/jeju-redhyang.jpg', 'GAP인증', '제주도', '2024-02-01 00:00:00'),
(65, 15, 9, '평창 대관령 양배추 (5kg)', '고랭지 양배추', 18000, 100, '5kg', 'local', 0, 1, '/images/products/pyeongchang-cabbage2.jpg', '무농약인증', '평창', '2024-02-01 00:00:00'),
(66, 17, 9, '평창 한우 불고기 (1kg)', '1++등급 한우 불고기', 75000, 30, '1kg', 'local', 1, 1, '/images/products/pyeongchang-hanwoo.jpg', '한우인증', '평창', '2024-02-01 00:00:00'),
(67, 17, 9, '평창 한우 등심 (500g)', '1++등급 한우 등심', 85000, 25, '500g', 'local', 1, 1, '/images/products/pyeongchang-hanwoo-sirloin.jpg', '한우인증', '평창', '2024-02-01 00:00:00'),
(68, 18, 4, '보성 녹차 국수 (500g)', '녹차를 넣은 건면', 8000, 120, '500g', 'local', 0, 1, '/images/products/boseong-greentea-noodle.jpg', '식품제조인증', '보성', '2024-02-01 00:00:00'),
(69, 18, 1, '제주 녹차 빵 (6개입)', '녹차 크림 듬뿍 빵', 12000, 80, '6개', 'local', 0, 1, '/images/products/jeju-greentea-bread.jpg', '식품제조인증', '제주도', '2024-02-01 00:00:00'),
(70, 18, 2, '제주 녹차 엿 (300g)', '전통 방식 녹차 엿', 15000, 60, '300g', 'local', 0, 1, '/images/products/jeju-greentea-yeot.jpg', '전통식품인증', '제주도', '2024-02-01 00:00:00'),
(71, 18, 10, '장흥 녹차 된장 (500g)', '녹차를 넣은 된장', 18000, 50, '500g', 'local', 0, 1, '/images/products/jangheung-greentea-doenjang.jpg', '전통식품인증', '장흥', '2024-02-01 00:00:00'),
(72, 18, 11, '강진 녹차 고추장 (500g)', '녹차를 넣은 고추장', 19000, 45, '500g', 'local', 0, 1, '/images/products/gangjin-greentea-gochujang.jpg', '전통식품인증', '강진', '2024-02-01 00:00:00'),
(73, 20, 10, '장흥 녹차주 (375ml)', '녹차를 넣은 전통 청주', 28000, 40, '375ml', 'local', 0, 1, '/images/products/jangheung-greentea-soju.jpg', '전통주인증', '장흥', '2024-02-01 00:00:00'),
(74, 20, 11, '강진 다산주 (375ml)', '다산 선생의 차 문화를 담은 청주', 32000, 35, '375ml', 'local', 0, 1, '/images/products/gangjin-dasan-soju.jpg', '전통주인증', '강진', '2024-02-01 00:00:00'),
(75, 18, 1, '제주 녹차 아이스크림 (500ml)', '진한 녹차 맛 아이스크림', 12000, 70, '500ml', 'local', 0, 1, '/images/products/jeju-greentea-icecream.jpg', '식품제조인증', '제주도', '2024-02-01 00:00:00'),
(76, 18, 4, '보성 녹차 빙수떡 (300g)', '녹차 맛 빙수떡', 9000, 90, '300g', 'local', 0, 1, '/images/products/boseong-greentea-bingsu.jpg', '식품제조인증', '보성', '2024-02-01 00:00:00'),
(77, 15, 1, '제주 귤 초콜릿 (200g)', '제주 귤 필 초콜릿', 16000, 75, '200g', 'local', 0, 1, '/images/products/jeju-citrus-chocolate.jpg', '식품제조인증', '제주도', '2024-02-01 00:00:00'),
(78, 18, 2, '제주 말차 마카롱 (6개)', '프리미엄 말차 마카롱', 18000, 55, '6개', 'local', 0, 1, '/images/products/jeju-matcha-macaron.jpg', '식품제조인증', '제주도', '2024-02-01 00:00:00');

PRAGMA foreign_keys = ON;

SELECT 'STEP 3 완료: 선물세트 15개, 지역특산품 33개 추가됨' AS status;
