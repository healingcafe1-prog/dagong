-- ========================================
-- 다공(dagong) 안전 복구 파일
-- DELETE 없이 INSERT OR IGNORE만 사용 (기존 데이터 보존)
-- ========================================

PRAGMA foreign_keys = OFF;

-- 1. regions 테이블 데이터 삽입 (17개 지역)
INSERT OR IGNORE INTO regions (id, name, type, image, description, created_at) VALUES
(1, '제주도', 'tea', '/images/regions/jeju.jpg', '한국 최대 차 생산지', '2024-01-01 00:00:00'),
(2, '하동', 'tea', '/images/regions/hadong.jpg', '지리산 자락의 전통 차 재배지', '2024-01-01 00:00:00'),
(3, '김해', 'tea', '/images/regions/gimhae.jpg', '낙동강 하류의 차 재배지', '2024-01-01 00:00:00'),
(4, '보성', 'tea', '/images/regions/boseong.jpg', '한국을 대표하는 녹차 명소', '2024-01-01 00:00:00'),
(5, '장흥', 'tea', '/images/regions/jangheung.jpg', '남도의 차 향기가 가득한 곳', '2024-01-01 00:00:00'),
(6, '강진', 'tea', '/images/regions/gangjin.jpg', '다산 정약용의 차 문화가 살아있는 곳', '2024-01-01 00:00:00'),
(7, '고흥', 'tea', '/images/regions/goheung.jpg', '남해안의 차밭', '2024-01-01 00:00:00'),
(8, '순천', 'tea', '/images/regions/suncheon.jpg', '생태 도시의 유기농 차', '2024-01-01 00:00:00'),
(9, '경기 광주', 'craft', '/images/regions/gwangju.jpg', '전통 도자기와 수공예의 고장', '2024-01-01 00:00:00'),
(10, '여주', 'craft', '/images/regions/yeoju.jpg', '조선 왕실 도자기의 전통', '2024-01-01 00:00:00'),
(11, '이천', 'craft', '/images/regions/icheon.jpg', '한국 도자기의 메카', '2024-01-01 00:00:00'),
(12, '충북 단양', 'craft', '/images/regions/danyang.jpg', '마늘과 수공예의 고장', '2024-01-01 00:00:00'),
(13, '전남 담양', 'craft', '/images/regions/damyang.jpg', '대나무와 죽세공의 본고장', '2024-01-01 00:00:00'),
(14, '전북 남원', 'craft', '/images/regions/namwon.jpg', '목공예와 전통 악기의 고장', '2024-01-01 00:00:00'),
(15, '경남 통영', 'craft', '/images/regions/tongyeong.jpg', '나전칠기의 본고장', '2024-01-01 00:00:00'),
(16, '경북 안동', 'craft', '/images/regions/andong.jpg', '전통 한지와 목공예', '2024-01-01 00:00:00'),
(17, '강원 평창', 'local', '/images/regions/pyeongchang.jpg', '고랭지 농산물의 고장', '2024-01-01 00:00:00');

-- 2. categories 테이블 데이터 삽입 (27개 카테고리)
INSERT OR IGNORE INTO categories (id, name, type, display_order, created_at) VALUES
(1, '녹차', 'tea', 1, '2024-01-01 00:00:00'),
(2, '황차', 'tea', 2, '2024-01-01 00:00:00'),
(3, '홍차', 'tea', 3, '2024-01-01 00:00:00'),
(4, '발효차', 'tea', 4, '2024-01-01 00:00:00'),
(5, '블렌딩차', 'tea', 5, '2024-01-01 00:00:00'),
(6, '허브차', 'tea', 6, '2024-01-01 00:00:00'),
(7, '말차', 'tea', 7, '2024-01-01 00:00:00'),
(8, '찻잔', 'craft', 8, '2024-01-01 00:00:00'),
(9, '주전자', 'craft', 9, '2024-01-01 00:00:00'),
(10, '찻상', 'craft', 10, '2024-01-01 00:00:00'),
(11, '향로', 'craft', 11, '2024-01-01 00:00:00'),
(12, '다관', 'craft', 12, '2024-01-01 00:00:00'),
(13, '명절 선물세트', 'gift', 13, '2024-01-01 00:00:00'),
(14, '프리미엄 선물세트', 'gift', 14, '2024-01-01 00:00:00'),
(15, '농산물', 'local', 15, '2024-01-01 00:00:00'),
(16, '수산물', 'local', 16, '2024-01-01 00:00:00'),
(17, '축산물', 'local', 17, '2024-01-01 00:00:00'),
(18, '가공식품', 'local', 18, '2024-01-01 00:00:00'),
(19, '약초/건강식품', 'local', 19, '2024-01-01 00:00:00'),
(20, '전통주', 'local', 20, '2024-01-01 00:00:00'),
(21, '백차', 'tea', 21, '2024-01-01 00:00:00'),
(22, '청차', 'tea', 22, '2024-01-01 00:00:00'),
(23, '우롱차', 'tea', 23, '2024-01-01 00:00:00'),
(24, '향차', 'tea', 24, '2024-01-01 00:00:00'),
(25, '과일차', 'tea', 25, '2024-01-01 00:00:00'),
(26, '곡물차', 'tea', 26, '2024-01-01 00:00:00'),
(27, '암차', 'tea', 27, '2024-01-01 00:00:00');

-- 3. producers 테이블 데이터 삽입 (13개 생산자)
INSERT OR IGNORE INTO producers (id, name, region_id, description, contact_email, contact_phone, address, image, website, certification, created_at) VALUES
(1, '제주 다원명가', 1, '제주 화산토에서 자란 유기농 녹차를 생산하는 40년 전통의 차밭', 'jejutea@example.com', '064-123-4567', '제주특별자치도 서귀포시 표선면', '/images/producers/jeju-dawon.jpg', 'https://jejudawon.com', '유기농인증, GAP인증', '2024-01-01 00:00:00'),
(2, '제주 차향', 1, '제주 동쪽 해안의 차밭에서 재배한 프리미엄 발효차 전문', 'chahyang@example.com', '064-234-5678', '제주특별자치도 제주시 구좌읍', '/images/producers/jeju-chahyang.jpg', 'https://chahyang.com', '유기농인증', '2024-01-01 00:00:00'),
(3, '하동 야생차원', 2, '지리산 자락의 야생차를 수확하여 전통 방식으로 제다', 'hadongwild@example.com', '055-880-1234', '경상남도 하동군 악양면', '/images/producers/hadong-wild.jpg', 'https://hadongwild.com', '무농약인증, 전통식품인증', '2024-01-01 00:00:00'),
(4, '보성 녹차마을', 4, '한국 최대 규모의 녹차 단지, 다양한 녹차 제품 생산', 'boseong@example.com', '061-850-5555', '전라남도 보성군 보성읍', '/images/producers/boseong-village.jpg', 'https://boseonggreentea.com', 'GAP인증, 지리적표시제', '2024-01-01 00:00:00'),
(5, '경기 광주 도예공방', 9, '전통 분청사기 기법으로 제작하는 현대 다기', 'gwangjuceramics@example.com', '031-760-1234', '경기도 광주시 곤지암읍', '/images/producers/gwangju-ceramics.jpg', 'https://gwangjuart.com', '명장지정, 전통공예품인증', '2024-01-01 00:00:00'),
(6, '이천 도자예술촌', 11, '왕실 도자기 전통을 잇는 프리미엄 다기 제작', 'icheonpottery@example.com', '031-630-2222', '경기도 이천시 신둔면', '/images/producers/icheon-pottery.jpg', 'https://icheonart.com', '이천도자기명장, 지리적표시제', '2024-01-01 00:00:00'),
(7, '담양 죽세공예', 13, '3대째 이어오는 대나무 다기 및 생활용품 제작', 'damyangbamboo@example.com', '061-380-3333', '전라남도 담양군 담양읍', '/images/producers/damyang-bamboo.jpg', 'https://damyangcraft.com', '전통공예품인증', '2024-01-01 00:00:00'),
(8, '통영 나전칠기', 15, '전통 나전칠기 기법으로 제작하는 고급 다기', 'tongyeongmop@example.com', '055-640-4444', '경상남도 통영시 광도면', '/images/producers/tongyeong-mop.jpg', 'https://tongyeongart.com', '무형문화재, 명장지정', '2024-01-01 00:00:00'),
(9, '강원 평창 농특산', 17, '해발 700m 고랭지에서 재배한 청정 농산물', 'pyeongchangfarm@example.com', '033-330-5555', '강원도 평창군 대관령면', '/images/producers/pyeongchang-farm.jpg', 'https://pyeongchangfarm.com', '무농약인증, GAP인증', '2024-01-01 00:00:00'),
(10, '장흥 정남진차', 5, '남도의 정기가 담긴 유기농 녹차와 발효차', 'jangheungtea@example.com', '061-860-6666', '전라남도 장흥군 관산읍', '/images/producers/jangheung-tea.jpg', 'https://jangheungtea.com', '유기농인증', '2024-01-01 00:00:00'),
(11, '강진 다산차밭', 6, '다산 정약용의 차 문화를 계승하는 전통 차밭', 'gangjindasan@example.com', '061-430-7777', '전라남도 강진군 도암면', '/images/producers/gangjin-dasan.jpg', 'https://gangjintea.com', '전통식품인증', '2024-01-01 00:00:00'),
(12, '순천 생태차밭', 8, '무농약 생태 농법으로 재배한 건강한 녹차', 'suncheoneco@example.com', '061-740-8888', '전라남도 순천시 송광면', '/images/producers/suncheon-eco.jpg', 'https://suncheongreentea.com', '무농약인증', '2024-01-01 00:00:00'),
(13, '안동 한지공예', 16, '전통 한지로 만드는 다기 및 생활용품', 'andonghanji@example.com', '054-820-9999', '경상북도 안동시 임동면', '/images/producers/andong-hanji.jpg', 'https://andonghanji.com', '전통공예품인증', '2024-01-01 00:00:00');

-- 4. products 테이블 데이터 삽입 (78개 제품)
-- 4.1 녹차류 (20개)
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

-- 4.2 수공예품 (23개)
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

-- 4.3 선물세트 (15개)
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

-- 4.4 지역 특산품 (33개)
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

-- 5. experiences 테이블 데이터 삽입 (14개 체험) - 수정된 스키마에 맞춤
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES
(1, '제주 차밭 산책과 차 만들기 체험', 1, 1, 'tea_experience', '제주 유기농 차밭을 걸으며 차나무를 관찰하고, 직접 차를 따서 덖음차를 만들어보는 체험', '3시간', 45000, 15, '/images/experiences/jeju-tea-farm.jpg', 1, '2024-01-10 00:00:00'),
(2, '보성 녹차밭 명상 힐링', 4, 4, 'tea_ceremony', '드넓은 보성 녹차밭에서 명상과 요가를 하고 차 명상을 경험하는 힐링 프로그램', '2시간', 35000, 20, '/images/experiences/boseong-meditation.jpg', 1, '2024-01-10 00:00:00'),
(3, '광주 전통 다기 만들기', 9, 5, 'craft_workshop', '물레를 이용해 찻잔이나 주전자를 직접 만들고 초벌구이까지 체험', '2.5시간', 55000, 10, '/images/experiences/gwangju-pottery.jpg', 1, '2024-01-10 00:00:00'),
(4, '담양 대나무 다기 만들기', 13, 7, 'craft_workshop', '대나무를 깎아 나만의 찻잔, 차통, 찻상을 만드는 수공예 체험', '2시간', 38000, 12, '/images/experiences/damyang-bamboo.jpg', 1, '2024-01-10 00:00:00'),
(5, '하동 야생차 채엽과 전통 제다', 2, 3, 'tea_experience', '지리산 자락의 야생차밭에서 손으로 차를 따고 전통 덖음 방식으로 차를 만드는 본격 체험', '4시간', 75000, 8, '/images/experiences/hadong-wild-tea.jpg', 1, '2024-01-10 00:00:00'),
(6, '이천 백자 다기 만들기', 11, 6, 'craft_workshop', '왕실 도자기 기법으로 나만의 찻잔이나 주전자를 직접 제작하는 프리미엄 체험', '3시간', 85000, 8, '/images/experiences/icheon-pottery.jpg', 1, '2024-01-10 00:00:00'),
(7, '담양 대나무 다기 만들기', 13, 7, 'craft_workshop', '대나무를 깎아 나만의 찻잔, 차통, 찻상을 만드는 전통 죽세공예 체험', '2.5시간', 48000, 12, '/images/experiences/damyang-bamboo.jpg', 1, '2024-01-10 00:00:00'),
(8, '통영 나전칠기 찻잔받침 만들기', 15, 8, 'craft_workshop', '자개를 박아 나만의 고급 찻잔받침을 만드는 무형문화재 기법 체험', '3시간', 95000, 6, '/images/experiences/tongyeong-mop.jpg', 1, '2024-01-10 00:00:00'),
(9, '장흥 정남진 발효차 체험', 5, 10, 'tea_experience', '남도 전통 발효차를 직접 만들고 숙성 과정을 배우는 특별 체험', '3시간', 58000, 15, '/images/experiences/jangheung-fermented-tea.jpg', 1, '2024-01-10 00:00:00'),
(10, '강진 다산 차 문화 탐방', 6, 11, 'tea_ceremony', '다산 정약용 선생의 차 문화 유적지를 돌아보고 전통 다례를 배우는 문화 체험', '4시간', 65000, 20, '/images/experiences/gangjin-dasan-culture.jpg', 1, '2024-01-10 00:00:00'),
(11, '순천 생태 차밭 명상과 요가', 8, 12, 'tea_experience', '무농약 차밭에서 진행하는 명상, 요가, 차 명상이 결합된 힐링 프로그램', '3시간', 52000, 25, '/images/experiences/suncheon-eco-healing.jpg', 1, '2024-01-10 00:00:00'),
(12, '제주 유기농 말차 체험', 1, 1, 'tea_experience', '제주 녹차를 곱게 갈아 말차를 만들고 말차 음료와 디저트를 만드는 체험', '2.5시간', 48000, 15, '/images/experiences/jeju-matcha.jpg', 1, '2024-01-10 00:00:00'),
(13, '안동 전통 한지로 찻상 만들기', 16, 13, 'craft_workshop', '전통 한지 공예 기법으로 접이식 찻상과 찻잔받침을 만드는 체험', '2.5시간', 42000, 12, '/images/experiences/andong-hanji-craft.jpg', 1, '2024-01-10 00:00:00'),
(14, '평창 고랭지 농장 투어와 차 시음', 17, 9, 'farm_tour', '해발 700m 청정 고랭지 농장을 견학하고 신선한 농산물과 차를 시음하는 힐링 투어', '3시간', 38000, 30, '/images/experiences/pyeongchang-highland-tour.jpg', 1, '2024-01-10 00:00:00');

PRAGMA foreign_keys = ON;

-- 완료 메시지
SELECT '=== 안전 복구 완료 ===' AS status;
SELECT '지역: 17개' AS info;
SELECT '카테고리: 27개' AS info;
SELECT '생산자: 13개' AS info;
SELECT '제품: 91개 (녹차 20, 수공예 23, 선물 15, 지역특산품 33)' AS info;
SELECT '체험: 14개' AS info;
