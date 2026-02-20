-- ========================================
-- STEP 2: 차 제품 (20개) + 공예품 (23개)
-- Cloudflare D1 콘솔 복사용
-- ========================================

PRAGMA foreign_keys = OFF;

-- 차 제품 20개
INSERT OR IGNORE INTO products (id, category_id, producer_id, name, description, price, stock, unit, product_type, is_featured, is_available, image, certification, origin, created_at) VALUES
(1, 1, 1, '제주 유기농 첫물차 50g', '봄의 첫 순을 따서 만든 프리미엄 녹차', 35000, 100, '50g', 'tea', 1, 1, '/images/products/jeju-first-tea.jpg', '유기농인증', '제주도', '2024-01-15 00:00:00'),
(2, 1, 1, '제주 봄차 세작 100g', '곡우 전후 채엽한 상급 녹차', 45000, 80, '100g', 'tea', 1, 1, '/images/products/jeju-sejak.jpg', '유기농인증', '제주도', '2024-01-15 00:00:00'),
(3, 1, 4, '보성 유기농 우전 50g', '청명 전 채엽한 최상급 녹차', 55000, 60, '50g', 'tea', 1, 1, '/images/products/boseong-ujeon.jpg', '유기농인증, GAP인증', '보성', '2024-01-15 00:00:00'),
(4, 1, 4, '보성 녹차 중작 100g', '입하 전후 채엽한 실속형 녹차', 25000, 150, '100g', 'tea', 0, 1, '/images/products/boseong-jungjak.jpg', 'GAP인증', '보성', '2024-01-15 00:00:00'),
(5, 1, 3, '하동 야생녹차 50g', '지리산 자락의 야생차로 만든 녹차', 65000, 40, '50g', 'tea', 1, 1, '/images/products/hadong-wild-green.jpg', '무농약인증', '하동', '2024-01-15 00:00:00'),
(6, 1, 10, '장흥 무농약 녹차 100g', '남도의 햇살을 머금은 깨끗한 녹차', 28000, 120, '100g', 'tea', 0, 1, '/images/products/jangheung-green.jpg', '무농약인증', '장흥', '2024-01-15 00:00:00'),
(7, 1, 11, '강진 다산녹차 50g', '다산 선생의 차 문화를 담은 전통 녹차', 38000, 90, '50g', 'tea', 0, 1, '/images/products/gangjin-dasan-green.jpg', '전통식품인증', '강진', '2024-01-15 00:00:00'),
(8, 1, 12, '순천 생태녹차 100g', '생태 농법으로 재배한 건강한 녹차', 32000, 110, '100g', 'tea', 0, 1, '/images/products/suncheon-eco-green.jpg', '무농약인증', '순천', '2024-01-15 00:00:00'),
(9, 7, 1, '제주 유기농 말차 30g', '곱게 갈아 만든 프리미엄 말차 가루', 28000, 70, '30g', 'tea', 1, 1, '/images/products/jeju-matcha.jpg', '유기농인증', '제주도', '2024-01-15 00:00:00'),
(10, 7, 4, '보성 말차 라떼용 100g', '라떼에 잘 어울리는 고급 말차', 42000, 85, '100g', 'tea', 0, 1, '/images/products/boseong-matcha-latte.jpg', 'GAP인증', '보성', '2024-01-15 00:00:00'),
(11, 21, 1, '제주 백차 은침 30g', '어린 순으로만 만든 희귀한 백차', 75000, 30, '30g', 'tea', 1, 1, '/images/products/jeju-white-tea.jpg', '유기농인증', '제주도', '2024-01-15 00:00:00'),
(12, 21, 3, '하동 야생백차 50g', '지리산 야생차로 만든 백차', 85000, 25, '50g', 'tea', 1, 1, '/images/products/hadong-wild-white.jpg', '무농약인증', '하동', '2024-01-15 00:00:00'),
(13, 22, 1, '제주 청차 동정오룡 50g', '반발효차의 깊은 향', 48000, 60, '50g', 'tea', 0, 1, '/images/products/jeju-oolong.jpg', '유기농인증', '제주도', '2024-01-15 00:00:00'),
(14, 23, 2, '제주 우롱차 고산 100g', '제주 고산지대에서 재배한 우롱차', 52000, 55, '100g', 'tea', 1, 1, '/images/products/jeju-gosan-oolong.jpg', '유기농인증', '제주도', '2024-01-15 00:00:00'),
(15, 3, 2, '제주 홍차 50g', '국내산 홍차의 깊고 풍부한 맛', 42000, 70, '50g', 'tea', 0, 1, '/images/products/jeju-black-tea.jpg', '유기농인증', '제주도', '2024-01-15 00:00:00'),
(16, 3, 3, '하동 야생홍차 50g', '야생차로 만든 프리미엄 홍차', 58000, 45, '50g', 'tea', 1, 1, '/images/products/hadong-wild-black.jpg', '무농약인증', '하동', '2024-01-15 00:00:00'),
(17, 4, 2, '제주 발효차 100g', '3년 숙성 발효차', 38000, 65, '100g', 'tea', 0, 1, '/images/products/jeju-fermented.jpg', '유기농인증', '제주도', '2024-01-15 00:00:00'),
(18, 4, 10, '장흥 발효차 50g', '남도 발효차의 깊은 맛', 35000, 60, '50g', 'tea', 0, 1, '/images/products/jangheung-fermented.jpg', '무농약인증', '장흥', '2024-01-15 00:00:00'),
(19, 27, 1, '제주 암차 30g', '돌틈 사이에서 자란 희귀 암차', 95000, 20, '30g', 'tea', 1, 1, '/images/products/jeju-rock-tea.jpg', '유기농인증', '제주도', '2024-01-15 00:00:00'),
(20, 2, 2, '제주 황차 50g', '후발효 공정의 독특한 황차', 68000, 35, '50g', 'tea', 1, 1, '/images/products/jeju-yellow-tea.jpg', '유기농인증', '제주도', '2024-01-15 00:00:00');

-- 공예품 23개
INSERT OR IGNORE INTO products (id, category_id, producer_id, name, description, price, stock, unit, product_type, is_featured, is_available, image, certification, origin, created_at) VALUES
(21, 8, 5, '광주 분청 찻잔 세트', '전통 분청사기 기법의 다기 세트 (5개)', 85000, 30, '세트', 'craft', 1, 1, '/images/products/gwangju-buncheong-cups.jpg', '전통공예품인증', '경기 광주', '2024-01-20 00:00:00'),
(22, 8, 6, '이천 백자 찻잔', '왕실 도자기 전통의 백자 찻잔', 95000, 25, '개', 'craft', 1, 1, '/images/products/icheon-white-cup.jpg', '이천도자기명장', '이천', '2024-01-20 00:00:00'),
(23, 9, 5, '광주 분청 주전자', '전통 분청사기 주전자 (500ml)', 125000, 20, '개', 'craft', 1, 1, '/images/products/gwangju-buncheong-pot.jpg', '전통공예품인증', '경기 광주', '2024-01-20 00:00:00'),
(24, 9, 6, '이천 백자 주전자', '왕실 백자 기법의 프리미엄 주전자', 155000, 15, '개', 'craft', 1, 1, '/images/products/icheon-white-pot.jpg', '이천도자기명장', '이천', '2024-01-20 00:00:00'),
(25, 12, 5, '광주 분청 다관 세트', '찻잔 6개 + 주전자 + 찻상', 320000, 10, '세트', 'craft', 1, 1, '/images/products/gwangju-tea-set.jpg', '전통공예품인증', '경기 광주', '2024-01-20 00:00:00'),
(26, 12, 6, '이천 백자 다관 세트', '왕실 백자 다기 풀세트', 450000, 8, '세트', 'craft', 1, 1, '/images/products/icheon-tea-set.jpg', '이천도자기명장', '이천', '2024-01-20 00:00:00'),
(27, 10, 7, '담양 대나무 찻상', '3단 접이식 대나무 다탁', 75000, 35, '개', 'craft', 0, 1, '/images/products/damyang-bamboo-table.jpg', '전통공예품인증', '담양', '2024-01-20 00:00:00'),
(28, 10, 7, '담양 대나무 다기세트', '대나무 찻상 + 찻잔받침 세트', 95000, 28, '세트', 'craft', 0, 1, '/images/products/damyang-bamboo-set.jpg', '전통공예품인증', '담양', '2024-01-20 00:00:00'),
(29, 11, 8, '통영 나전 향로', '자개를 박아 만든 고급 향로', 185000, 12, '개', 'craft', 1, 1, '/images/products/tongyeong-incense.jpg', '무형문화재', '통영', '2024-01-20 00:00:00'),
(30, 11, 8, '통영 나전 찻잔받침 세트', '나전칠기 기법의 찻잔받침 (5개)', 145000, 18, '세트', 'craft', 1, 1, '/images/products/tongyeong-coaster-set.jpg', '무형문화재', '통영', '2024-01-20 00:00:00'),
(31, 8, 5, '광주 분청 개인찻잔', '일상용 분청 찻잔 (단품)', 22000, 80, '개', 'craft', 0, 1, '/images/products/gwangju-single-cup.jpg', '전통공예품인증', '경기 광주', '2024-01-20 00:00:00'),
(32, 8, 6, '이천 청자 찻잔', '고려청자 기법의 모던 찻잔', 45000, 50, '개', 'craft', 0, 1, '/images/products/icheon-celadon-cup.jpg', '이천도자기명장', '이천', '2024-01-20 00:00:00'),
(33, 9, 6, '이천 청자 주전자', '고려청자 스타일의 주전자', 135000, 22, '개', 'craft', 0, 1, '/images/products/icheon-celadon-pot.jpg', '이천도자기명장', '이천', '2024-01-20 00:00:00'),
(34, 12, 7, '담양 대나무 다완', '장인이 깎아 만든 대나무 찻잔', 18000, 90, '개', 'craft', 0, 1, '/images/products/damyang-bamboo-cup.jpg', '전통공예품인증', '담양', '2024-01-20 00:00:00'),
(35, 8, 8, '통영 나전 찻잔', '자개 장식의 고급 찻잔', 95000, 15, '개', 'craft', 1, 1, '/images/products/tongyeong-mop-cup.jpg', '무형문화재', '통영', '2024-01-20 00:00:00'),
(36, 9, 8, '통영 나전 주전자', '나전칠기 기법의 프리미엄 주전자', 285000, 8, '개', 'craft', 1, 1, '/images/products/tongyeong-mop-pot.jpg', '무형문화재', '통영', '2024-01-20 00:00:00'),
(37, 10, 13, '안동 한지 찻상', '한지 공예 기법의 접이식 다탁', 55000, 40, '개', 'craft', 0, 1, '/images/products/andong-hanji-table.jpg', '전통공예품인증', '안동', '2024-01-20 00:00:00'),
(38, 12, 13, '안동 한지 다기 세트', '한지로 만든 찻잔받침 + 티코스터', 38000, 45, '세트', 'craft', 0, 1, '/images/products/andong-hanji-set.jpg', '전통공예품인증', '안동', '2024-01-20 00:00:00'),
(39, 8, 5, '광주 분청 머그컵', '일상용 분청 머그컵', 28000, 70, '개', 'craft', 0, 1, '/images/products/gwangju-mug.jpg', '전통공예품인증', '경기 광주', '2024-01-20 00:00:00'),
(40, 9, 7, '담양 대나무 차통', '차 보관용 대나무 용기 (200g)', 32000, 55, '개', 'craft', 0, 1, '/images/products/damyang-tea-container.jpg', '전통공예품인증', '담양', '2024-01-20 00:00:00'),
(41, 11, 5, '광주 도자 향로', '분청사기 기법의 향로', 65000, 25, '개', 'craft', 0, 1, '/images/products/gwangju-incense.jpg', '전통공예품인증', '경기 광주', '2024-01-20 00:00:00'),
(42, 12, 6, '이천 백자 미니 다기세트', '2인용 소형 백자 다기', 180000, 20, '세트', 'craft', 0, 1, '/images/products/icheon-mini-set.jpg', '이천도자기명장', '이천', '2024-01-20 00:00:00'),
(43, 8, 13, '안동 한지 찻잔받침 (5개)', '전통 한지 공예 찻잔받침 세트', 25000, 60, '세트', 'craft', 0, 1, '/images/products/andong-coasters.jpg', '전통공예품인증', '안동', '2024-01-20 00:00:00');

PRAGMA foreign_keys = ON;

SELECT 'STEP 2 완료: 차 제품 20개, 공예품 23개 추가됨' AS status;
