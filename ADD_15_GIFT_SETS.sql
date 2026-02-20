-- ========================================
-- 선물세트 15개 추가 (ID 44, 45, 80-93)
-- ========================================

-- 선물세트 15개 삽입
INSERT OR IGNORE INTO products (id, category_id, producer_id, name, description, price, stock, unit, product_type, is_featured, is_available, image, certification, origin, created_at) VALUES
-- 명절 선물세트 (카테고리 13) - 9개
(44, 13, 1, '설날 프리미엄 차 선물세트', '제주 유기농차 3종 + 찻잔 세트', 120000, 50, '세트', 'gift', 1, 1, '/images/products/lunar-new-year-set.jpg', '유기농인증', '제주도', '2024-01-25 00:00:00'),
(45, 13, 4, '추석 명품 차 선물세트', '보성 우전 + 세작 + 백자 다기', 185000, 30, '세트', 'gift', 1, 1, '/images/products/chuseok-premium-set.jpg', '유기농인증, GAP인증', '보성', '2024-01-25 00:00:00'),
(80, 13, 2, '단오 전통 차 선물세트', '제주 발효차 + 홍차 + 말차 세트', 95000, 40, '세트', 'gift', 1, 1, '/images/products/dano-traditional-set.jpg', '유기농인증', '제주도', '2024-01-25 00:00:00'),
(81, 13, 3, '동지 건강 차 선물세트', '하동 야생차 3종 + 차 도구', 135000, 35, '세트', 'gift', 1, 1, '/images/products/dongji-health-set.jpg', '무농약인증', '하동', '2024-01-25 00:00:00'),
(82, 13, 10, '백중 효도 차 선물세트', '장흥 발효차 + 녹차 + 다기', 108000, 45, '세트', 'gift', 0, 1, '/images/products/baekjung-filial-set.jpg', '무농약인증', '장흥', '2024-01-25 00:00:00'),
(83, 13, 7, '담양 죽세공예 선물세트', '대나무 다기 세트 + 녹차 2종', 125000, 35, '세트', 'gift', 0, 1, '/images/products/damyang-bamboo-gift-set.jpg', '전통공예품인증', '담양', '2024-01-25 00:00:00'),
(84, 13, 9, '평창 고랭지 특산품 세트', '평창 농산물 + 차 + 지역특산물', 98000, 50, '세트', 'gift', 0, 1, '/images/products/pyeongchang-specialty-set.jpg', '무농약인증, GAP인증', '평창', '2024-01-25 00:00:00'),
(85, 13, 13, '안동 전통 한지 선물세트', '한지 다기 세트 + 녹차 2종 + 한지 공예품', 115000, 40, '세트', 'gift', 0, 1, '/images/products/andong-hanji-gift-set.jpg', '전통공예품인증', '안동', '2024-01-25 00:00:00'),
(86, 13, 11, '강진 다도 입문 선물세트', '강진 녹차 + 다례 도구 + 입문서', 88000, 45, '세트', 'gift', 0, 1, '/images/products/gangjin-tea-ceremony-starter.jpg', '전통식품인증', '강진', '2024-01-25 00:00:00'),
-- 프리미엄 선물세트 (카테고리 14) - 6개
(87, 14, 1, '제주 명품 차 선물세트', '제주 암차 + 백차 + 우롱차 + 고급 다기', 320000, 20, '세트', 'gift', 1, 1, '/images/products/jeju-luxury-set.jpg', '유기농인증', '제주도', '2024-01-25 00:00:00'),
(88, 14, 6, '이천 도자 명품 세트', '이천 백자 다관 풀세트 + 프리미엄 녹차', 520000, 15, '세트', 'gift', 1, 1, '/images/products/icheon-ceramic-luxury-set.jpg', '이천도자기명장', '이천', '2024-01-25 00:00:00'),
(89, 14, 8, '통영 나전칠기 프리미엄 세트', '나전칠기 다기 세트 + 제주 고급차 3종', 450000, 12, '세트', 'gift', 1, 1, '/images/products/tongyeong-mop-premium-set.jpg', '무형문화재', '통영', '2024-01-25 00:00:00'),
(90, 14, 4, '보성 명인 차 선물세트', '보성 우전 + 세작 + 말차 + 청자 다기', 285000, 25, '세트', 'gift', 1, 1, '/images/products/boseong-master-set.jpg', '유기농인증, GAP인증', '보성', '2024-01-25 00:00:00'),
(91, 14, 11, '강진 다산 문화 선물세트', '강진 다산녹차 3종 + 서적 + 다기', 195000, 30, '세트', 'gift', 0, 1, '/images/products/gangjin-dasan-culture-set.jpg', '전통식품인증', '강진', '2024-01-25 00:00:00'),
(92, 14, 5, '장인 다기 명품 세트', '광주 분청 다관 세트 + 프리미엄 차 3종', 380000, 18, '세트', 'gift', 1, 1, '/images/products/artisan-teaware-luxury-set.jpg', '명장지정, 전통공예품인증', '경기 광주', '2024-01-25 00:00:00'),
(93, 14, 12, '순천 생태 힐링 선물세트', '순천 생태녹차 3종 + 명상 도구', 165000, 28, '세트', 'gift', 0, 1, '/images/products/suncheon-eco-healing-set.jpg', '무농약인증', '순천', '2024-01-25 00:00:00');

-- 완료 메시지
SELECT '=== 선물세트 15개 추가 완료 ===' AS status;
SELECT 'ID 44, 45, 80-93: 총 15개 선물세트' AS info;
SELECT '명절 선물세트 (카테고리 13): 9개' AS detail;
SELECT '프리미엄 선물세트 (카테고리 14): 6개' AS detail2;
