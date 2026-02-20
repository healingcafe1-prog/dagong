-- ========================================
-- 다공(dagong) 마스터 시드 파일
-- 이 파일은 전체 샘플 데이터를 포함합니다
-- 작성일: 2026-02-20
-- ========================================

-- 외래키 제약 조건 비활성화
PRAGMA foreign_keys = OFF;

-- 기존 데이터 삭제 (순서 중요)
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM education_applications;
DELETE FROM education_curriculum;
DELETE FROM education_categories;
DELETE FROM reviews;
DELETE FROM cart_items;
DELETE FROM wishlists;
DELETE FROM product_images;
DELETE FROM experiences;
DELETE FROM products;
DELETE FROM producers;
DELETE FROM events;
DELETE FROM categories;
DELETE FROM regions;
DELETE FROM users;

-- ========================================
-- 1. 지역 데이터 (17개)
-- ========================================
INSERT INTO regions (id, name, type, description, featured_image, created_at) VALUES
(1, '제주도', 'tea', '한라산 청정 자연에서 자라는 고품질 차의 고장', '/images/regions/jeju.jpg', CURRENT_TIMESTAMP),
(2, '하동', 'tea', '천년 차문화의 역사를 간직한 전통 차 산지', '/images/regions/hadong.jpg', CURRENT_TIMESTAMP),
(3, '김해', 'tea', '황차의 명산지로 유명한 차 재배지', '/images/regions/gimhae.jpg', CURRENT_TIMESTAMP),
(4, '광양', 'tea', '매화와 함께 재배되는 품질 좋은 차의 산지', '/images/regions/gwangyang.jpg', CURRENT_TIMESTAMP),
(5, '보성', 'tea', '푸른 녹차밭으로 유명한 대한민국 대표 차 산지', '/images/regions/boseong.jpg', CURRENT_TIMESTAMP),
(6, '강진', 'craft', '고려청자의 본향, 전통 도자기 공예의 중심지', '/images/regions/gangjin.jpg', CURRENT_TIMESTAMP),
(7, '장흥', 'tea', '정남진 청태전으로 유명한 발효차의 본고장', '/images/regions/jangheung.jpg', CURRENT_TIMESTAMP),
(8, '부안', 'craft', '청자와 백자의 전통을 이어가는 도자기 마을', '/images/regions/buan.jpg', CURRENT_TIMESTAMP),
(9, '광주', 'craft', '분청사기와 현대 도예의 중심지', '/images/regions/gwangju.jpg', CURRENT_TIMESTAMP),
(10, '전주', 'craft', '한지와 전통 칠기 공예의 본향', '/images/regions/jeonju.jpg', CURRENT_TIMESTAMP),
(11, '담양', 'craft', '대나무 공예의 메카, 죽세공예의 고장', '/images/regions/damyang.jpg', CURRENT_TIMESTAMP),
(12, '이천', 'craft', '도자기 예술의 중심지, 이천 도자기 축제의 고장', '/images/regions/icheon.jpg', CURRENT_TIMESTAMP),
(13, '남원', 'craft', '목공예와 한지 공예의 전통이 살아있는 지역', '/images/regions/namwon.jpg', CURRENT_TIMESTAMP),
(14, '안동', 'craft', '전통 한복과 목공예의 명맥을 이어가는 고장', '/images/regions/andong.jpg', CURRENT_TIMESTAMP),
(15, '통영', 'craft', '나전칠기 공예의 본향, 전통 칠기 예술의 중심지', '/images/regions/tongyeong.jpg', CURRENT_TIMESTAMP),
(16, '전남', 'craft', '다양한 전통 공예와 예술이 어우러진 지역', '/images/regions/jeonnam.jpg', CURRENT_TIMESTAMP),
(17, '경남', 'craft', '해양 문화와 전통 공예가 조화를 이루는 지역', '/images/regions/gyeongnam.jpg', CURRENT_TIMESTAMP);

-- ========================================
-- 2. 카테고리 데이터 (27개)
-- ========================================
INSERT INTO categories (id, name, parent_id, type, description, display_order, created_at) VALUES
-- 차 카테고리
(1, '녹차', NULL, 'tea', '발효하지 않은 신선한 차', 1, CURRENT_TIMESTAMP),
(2, '황차', NULL, 'tea', '살짝 발효시킨 노란빛 차', 2, CURRENT_TIMESTAMP),
(3, '홍차', NULL, 'tea', '완전 발효시킨 붉은 차', 3, CURRENT_TIMESTAMP),
(4, '발효차', NULL, 'tea', '발효 과정을 거친 전통 차', 4, CURRENT_TIMESTAMP),
(6, '블렌딩차', NULL, 'tea', '여러 재료를 혼합한 차', 5, CURRENT_TIMESTAMP),
(21, '백차', NULL, 'tea', '가장 순수한 형태의 차', 6, CURRENT_TIMESTAMP),
(22, '청차', NULL, 'tea', '반발효차, 우롱차', 7, CURRENT_TIMESTAMP),

-- 공예 카테고리
(8, '찻잔', NULL, 'craft', '차를 마시는 잔', 8, CURRENT_TIMESTAMP),
(9, '다관', NULL, 'craft', '차를 우려내는 도구', 9, CURRENT_TIMESTAMP),
(10, '찻상', NULL, 'craft', '차를 마시는 상', 10, CURRENT_TIMESTAMP),
(11, '장식품', NULL, 'craft', '전통 공예 장식품', 11, CURRENT_TIMESTAMP),
(23, '도자기', NULL, 'craft', '도자기 공예품', 12, CURRENT_TIMESTAMP),
(24, '목공예', NULL, 'craft', '나무 공예품', 13, CURRENT_TIMESTAMP),
(25, '금속공예', NULL, 'craft', '금속 공예품', 14, CURRENT_TIMESTAMP),
(26, '한복', NULL, 'craft', '전통 한복', 15, CURRENT_TIMESTAMP),
(27, '가죽공예', NULL, 'craft', '가죽 공예품', 16, CURRENT_TIMESTAMP),
(28, '칠기공예', NULL, 'craft', '칠기 공예품', 17, CURRENT_TIMESTAMP),
(29, '서예용품', NULL, 'craft', '서예 도구', 18, CURRENT_TIMESTAMP),
(30, '그림', NULL, 'craft', '전통 그림', 19, CURRENT_TIMESTAMP),

-- 선물세트 카테고리
(12, '명절 선물세트', NULL, 'gift', '명절용 고급 선물세트', 20, CURRENT_TIMESTAMP),
(13, '기념일 선물세트', NULL, 'gift', '기념일용 선물세트', 21, CURRENT_TIMESTAMP),

-- 지역특산품 카테고리
(17, '농산물', NULL, 'local', '지역 농산물', 22, CURRENT_TIMESTAMP),
(18, '가공식품', NULL, 'local', '지역 가공식품', 23, CURRENT_TIMESTAMP),
(19, '수산물', NULL, 'local', '지역 수산물', 24, CURRENT_TIMESTAMP),
(20, '축산물', NULL, 'local', '지역 축산물', 25, CURRENT_TIMESTAMP),
(31, '특산품', NULL, 'local', '지역 특산품', 26, CURRENT_TIMESTAMP);

-- ========================================
-- 3. 생산자 데이터 (13개)
-- ========================================
INSERT INTO producers (name, region_id, producer_type, description, story, profile_image, contact_email, contact_phone, address, created_at) VALUES
('박수공', 1, 'tea', '제주 한라산 유기농 차 전문가', '20년 경력의 차 재배 장인', '/images/producers/park.jpg', 'park@example.com', '010-1234-5678', '제주특별자치도 서귀포시', CURRENT_TIMESTAMP),
('제주 한라산 차농원', 1, 'tea', '제주도 대표 차 농원', '3대째 이어온 전통 차 농원', '/images/producers/hallasan.jpg', 'hallasan@example.com', '010-2345-6789', '제주특별자치도 제주시', CURRENT_TIMESTAMP),
('이천 도예가', 6, 'craft', '강진 전통 도예가', '전통 방식의 도자기 제작', '/images/producers/icheon.jpg', 'icheon@example.com', '010-3456-7890', '전라남도 강진군', CURRENT_TIMESTAMP),
('광주 분청사기', 9, 'craft', '분청사기 전문 작가', '현대적 감각의 분청사기', '/images/producers/gwangju.jpg', 'gwangju@example.com', '010-4567-8901', '광주광역시', CURRENT_TIMESTAMP),
('강진 청자공방', 6, 'craft', '고려청자 재현 전문가', '전통 청자 기법 복원', '/images/producers/gangjin.jpg', 'gangjin@example.com', '010-5678-9012', '전라남도 강진군', CURRENT_TIMESTAMP),
('전주 칠기공방', 10, 'craft', '전통 칠기 장인', '자개를 활용한 칠기 공예', '/images/producers/jeonju.jpg', 'jeonju@example.com', '010-6789-0123', '전라북도 전주시', CURRENT_TIMESTAMP),
('담양 죽세공예', 11, 'craft', '대나무 공예 전문가', '다양한 대나무 제품 제작', '/images/producers/damyang.jpg', 'damyang@example.com', '010-7890-1234', '전라남도 담양군', CURRENT_TIMESTAMP),
('전남농협', 16, 'local', '전남 지역 농산물 생산자 연합', '지역 농가와 직거래', '/images/producers/jeonnam.jpg', 'jeonnam@example.com', '061-1234-5678', '전라남도', CURRENT_TIMESTAMP),
('경남수협', 17, 'local', '경남 지역 수산물 생산자 연합', '신선한 수산물 직송', '/images/producers/gyeongnam.jpg', 'gyeongnam@example.com', '055-1234-5678', '경상남도', CURRENT_TIMESTAMP),
('남원 목공예', 13, 'craft', '전통 목공예 장인', '손으로 깎아 만드는 목제품', '/images/producers/namwon.jpg', 'namwon@example.com', '063-1234-5678', '전라북도 남원시', CURRENT_TIMESTAMP),
('안동 한복집', 14, 'craft', '전통 한복 제작소', '맞춤 한복과 생활한복', '/images/producers/andong.jpg', 'andong@example.com', '054-1234-5678', '경상북도 안동시', CURRENT_TIMESTAMP),
('통영 나전칠기', 15, 'craft', '나전칠기 명장', '전통 자개 기법 전승', '/images/producers/tongyeong.jpg', 'tongyeong@example.com', '055-2345-6789', '경상남도 통영시', CURRENT_TIMESTAMP),
('보성 찻잎', 5, 'tea', '보성 녹차 전문 농원', '유기농 녹차 재배', '/images/producers/boseong.jpg', 'boseong@example.com', '061-3456-7890', '전라남도 보성군', CURRENT_TIMESTAMP);

-- ========================================
-- 4. 제품 데이터 (78개)
-- ========================================

-- 4-1. 차 제품 (20개)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, discount_rate, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count, commission_rate, created_at) VALUES
-- 녹차 (4개)
('제주 한라산 유기농 녹차', 1, 1, '제주 한라산에서 자란 유기농 녹차', 40000, 28000, 30, 3000, 50, '/images/products/jeju-green-tea.jpg', 'tea', '100g', '제주도', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('하동 전통 발효차', 4, 2, '하동 지역 전통 방식의 발효차', 50000, 36000, 28, 3000, 30, '/images/products/hadong-fermented.jpg', 'tea', '100g', '하동', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('보성 녹차', 1, 13, '보성의 대표 녹차', 35000, 25000, 29, 3000, 100, '/images/products/boseong-green.jpg', 'tea', '100g', '보성', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('하동 녹차', 1, 2, '하동의 전통 녹차', 38000, 27000, 29, 3000, 80, '/images/products/hadong-green.jpg', 'tea', '100g', '하동', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 백차 (3개)
('제주 백모단', 21, 1, '제주에서만 생산되는 귀한 백차', 70000, 49000, 30, 3000, 20, '/images/products/jeju-white-tea.jpg', 'tea', '50g', '제주도', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('김해 은침백호', 21, 2, '은색 솜털이 특징인 고급 백차', 65000, 45500, 30, 3000, 15, '/images/products/gimhae-white.jpg', 'tea', '50g', '김해', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('하동 백차', 21, 2, '하동 지역 전통 백차', 60000, 42000, 30, 3000, 25, '/images/products/hadong-white.jpg', 'tea', '50g', '하동', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 청차 (3개)
('제주 청차', 22, 1, '제주산 반발효 청차', 55000, 38500, 30, 3000, 30, '/images/products/jeju-oolong.jpg', 'tea', '100g', '제주도', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('보성 동정오룡', 22, 13, '보성의 전통 우롱차', 52000, 36400, 30, 3000, 35, '/images/products/boseong-oolong.jpg', 'tea', '100g', '보성', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('광양 청차', 22, 1, '광양 매화차밭의 청차', 50000, 35000, 30, 3000, 40, '/images/products/gwangyang-oolong.jpg', 'tea', '100g', '광양', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 홍차 (3개)
('제주 홍차', 3, 1, '제주산 완전발효 홍차', 45000, 31500, 30, 3000, 45, '/images/products/jeju-black-tea.jpg', 'tea', '100g', '제주도', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('하동 홍차', 3, 2, '하동 전통 홍차', 42000, 29400, 30, 3000, 50, '/images/products/hadong-black.jpg', 'tea', '100g', '하동', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('보성 홍차', 3, 13, '보성의 깊은 맛 홍차', 40000, 28000, 30, 3000, 55, '/images/products/boseong-black.jpg', 'tea', '100g', '보성', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 발효차 (3개)
('보성 청태전', 4, 1, '장흥 지역 전통 발효차', 42000, 30400, 28, 3000, 25, '/images/products/boseong-chungtaejeon.jpg', 'tea', '100g', '보성', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('광양 발효차', 4, 1, '광양 매화차밭 발효차', 45000, 32000, 29, 3000, 30, '/images/products/gwangyang-fermented.jpg', 'tea', '100g', '광양', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('장흥 청태전', 4, 2, '장흥의 정통 청태전', 48000, 34000, 29, 3000, 20, '/images/products/jangheung-chungtaejeon.jpg', 'tea', '100g', '장흥', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 황차 (1개)
('김해 황차', 2, 2, '김해 지역 특산 황차', 47000, 33600, 29, 3000, 20, '/images/products/gimhae-yellow.jpg', 'tea', '100g', '김해', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 블렌딩차 (3개)
('광양 매화차', 6, 1, '매화 향이 가득한 블렌딩차', 35000, 25600, 27, 3000, 40, '/images/products/gwangyang-plum.jpg', 'tea', '100g', '광양', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('제주 감귤 블렌딩차', 6, 1, '제주 감귤과 녹차의 만남', 38000, 27000, 29, 3000, 35, '/images/products/jeju-citrus-blend.jpg', 'tea', '100g', '제주도', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('하동 허브 블렌딩차', 6, 2, '하동차와 허브의 조화', 36000, 25500, 29, 3000, 30, '/images/products/hadong-herb-blend.jpg', 'tea', '100g', '하동', 0, 1, 0, 9.9, CURRENT_TIMESTAMP);

-- 4-2. 공예품 (23개)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, discount_rate, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count, commission_rate, created_at) VALUES
-- 다기 (6개)
('이천 도자기 찻잔 세트', 8, 3, '이천 도예가의 정성이 담긴 찻잔 세트', 95000, 68000, 28, 3000, 15, '/images/products/icheon-tea-cups.jpg', 'craft', '500g', '이천', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('광주 분청사기 다관', 9, 4, '전통 분청사기 다관', 165000, 120000, 27, 3000, 10, '/images/products/gwangju-teapot.jpg', 'craft', '800g', '광주', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('담양 대나무 찻상', 10, 7, '대나무로 만든 전통 찻상', 105000, 76000, 28, 5000, 8, '/images/products/damyang-tea-table.jpg', 'craft', '3000g', '담양', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('강진 청자 찻잔', 8, 5, '고려청자 재현 찻잔', 120000, 84000, 30, 3000, 12, '/images/products/gangjin-celadon-cup.jpg', 'craft', '400g', '강진', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('전주 자개 다관', 9, 6, '자개 장식 칠기 다관', 250000, 175000, 30, 3000, 5, '/images/products/jeonju-mother-of-pearl.jpg', 'craft', '900g', '전주', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('부안 백자 찻잔', 8, 3, '순백의 백자 찻잔', 85000, 59500, 30, 3000, 20, '/images/products/buan-white-porcelain.jpg', 'craft', '350g', '부안', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 도자기 (4개)
('강진 청자 화병', 23, 5, '고려청자 기법의 화병', 180000, 126000, 30, 5000, 8, '/images/products/gangjin-vase.jpg', 'craft', '1200g', '강진', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('이천 백자 접시세트', 23, 3, '모던한 디자인의 백자 접시', 95000, 66500, 30, 3000, 15, '/images/products/icheon-plates.jpg', 'craft', '800g', '이천', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('광주 분청 항아리', 23, 4, '전통 분청사기 항아리', 220000, 154000, 30, 5000, 6, '/images/products/gwangju-jar.jpg', 'craft', '2000g', '광주', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('부안 청화백자', 23, 3, '청화 문양의 백자', 150000, 105000, 30, 3000, 10, '/images/products/buan-blue-white.jpg', 'craft', '900g', '부안', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 목공예 (3개)
('남원 목제 찻상', 24, 10, '전통 방식의 원목 찻상', 280000, 196000, 30, 5000, 5, '/images/products/namwon-wood-table.jpg', 'craft', '5000g', '남원', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('담양 죽세공 소반', 24, 7, '대나무로 만든 소반', 120000, 84000, 30, 3000, 12, '/images/products/damyang-bamboo-tray.jpg', 'craft', '1500g', '담양', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('남원 원목 찻잔받침', 24, 10, '나무 향이 나는 찻잔받침', 45000, 31500, 30, 3000, 25, '/images/products/namwon-coaster.jpg', 'craft', '200g', '남원', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 금속공예 (2개)
('전남 유기 다기세트', 25, 8, '전통 유기 다기', 350000, 245000, 30, 5000, 4, '/images/products/jeonnam-brassware.jpg', 'craft', '2500g', '전남', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('통영 놋그릇 세트', 25, 12, '전통 방식의 놋그릇', 280000, 196000, 30, 3000, 6, '/images/products/tongyeong-brass.jpg', 'craft', '2000g', '통영', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 한복 (2개)
('안동 전통 한복', 26, 11, '맞춤 제작 전통 한복', 500000, 350000, 30, 5000, 3, '/images/products/andong-hanbok.jpg', 'craft', '1000g', '안동', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('안동 생활한복', 26, 11, '일상에서 입는 생활한복', 180000, 126000, 30, 3000, 10, '/images/products/andong-daily-hanbok.jpg', 'craft', '500g', '안동', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 가죽공예 (1개)
('전주 가죽 찻잔받침', 27, 6, '천연가죽 찻잔받침 세트', 65000, 45500, 30, 3000, 15, '/images/products/jeonju-leather-coaster.jpg', 'craft', '150g', '전주', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 칠기공예 (1개)
('통영 나전칠기 보석함', 28, 12, '전통 자개 기법의 보석함', 420000, 294000, 30, 5000, 4, '/images/products/tongyeong-lacquerware.jpg', 'craft', '800g', '통영', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 서예용품 (2개)
('전주 전통 붓', 29, 6, '서예용 전통 붓', 85000, 59500, 30, 3000, 20, '/images/products/jeonju-brush.jpg', 'craft', '50g', '전주', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('전주 먹', 29, 6, '천연 재료로 만든 먹', 45000, 31500, 30, 3000, 30, '/images/products/jeonju-ink.jpg', 'craft', '100g', '전주', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 그림 (1개)
('전남 민화 액자', 30, 8, '전통 민화 작품', 150000, 105000, 30, 5000, 8, '/images/products/jeonnam-folk-painting.jpg', 'craft', '500g', '전남', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 기타 장식품 (1개)
('담양 대나무 장식품', 11, 7, '대나무로 만든 인테리어 소품', 55000, 39000, 29, 3000, 25, '/images/products/damyang-bamboo-deco.jpg', 'craft', '300g', '담양', 0, 1, 0, 9.9, CURRENT_TIMESTAMP);

-- 4-3. 선물세트 (2개)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, discount_rate, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count, commission_rate, created_at) VALUES
('명절 프리미엄 세트', 12, 1, '명절 선물용 고급 차 세트', 165000, 120000, 27, 5000, 30, '/images/products/holiday-premium-set.jpg', 'gift_set', '500g', '제주도', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('기념일 차 선물세트', 13, 2, '소중한 사람을 위한 차 선물', 105000, 76000, 28, 3000, 40, '/images/products/anniversary-tea-set.jpg', 'gift_set', '400g', '제주도', 1, 1, 0, 9.9, CURRENT_TIMESTAMP);

-- 4-4. 지역특산품 (33개)
INSERT INTO products (name, category_id, producer_id, description, original_price, price, discount_rate, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count, commission_rate, created_at) VALUES
-- 농산물 (8개)
('제주 한라봉', 17, 8, '제주 청정 지역 한라봉', 35000, 24500, 30, 3000, 100, '/images/products/jeju-hallabong.jpg', 'gift_set', '3kg', '제주도', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('보성 녹차 쌀', 17, 13, '녹차로 키운 쌀', 28000, 19600, 30, 3000, 80, '/images/products/boseong-rice.jpg', 'gift_set', '5kg', '보성', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('하동 밤', 17, 2, '하동 특산 밤', 32000, 22400, 30, 3000, 60, '/images/products/hadong-chestnut.jpg', 'gift_set', '2kg', '하동', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('남원 곶감', 17, 10, '남원 전통 곶감', 38000, 26600, 30, 3000, 50, '/images/products/namwon-dried-persimmon.jpg', 'gift_set', '1kg', '남원', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('장흥 표고버섯', 17, 2, '장흥 청정 표고버섯', 45000, 31500, 30, 3000, 40, '/images/products/jangheung-shiitake.jpg', 'gift_set', '500g', '장흥', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('담양 죽순', 17, 7, '담양 신선 죽순', 25000, 17500, 30, 3000, 35, '/images/products/damyang-bamboo-shoot.jpg', 'gift_set', '1kg', '담양', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('광양 매실', 17, 1, '광양 청매실', 30000, 21000, 30, 3000, 70, '/images/products/gwangyang-plum.jpg', 'gift_set', '2kg', '광양', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('김해 대추', 17, 2, '김해 특산 대추', 35000, 24500, 30, 3000, 45, '/images/products/gimhae-jujube.jpg', 'gift_set', '1kg', '김해', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 수산물 (8개)
('통영 멍게', 19, 9, '통영 신선 멍게', 42000, 29400, 30, 5000, 30, '/images/products/tongyeong-sea-squirt.jpg', 'gift_set', '1kg', '통영', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('부안 굴비', 19, 8, '부안 명품 굴비', 85000, 59500, 30, 5000, 20, '/images/products/buan-dried-corvina.jpg', 'gift_set', '10미', '부안', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('강진 전복', 19, 5, '강진 활전복', 75000, 52500, 30, 5000, 25, '/images/products/gangjin-abalone.jpg', 'gift_set', '1kg', '강진', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('남해 멸치', 19, 9, '남해 볶음 멸치', 35000, 24500, 30, 3000, 50, '/images/products/namhae-anchovy.jpg', 'gift_set', '500g', '남해', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('여수 돌산 갓김치', 19, 8, '돌산 갓으로 담근 김치', 28000, 19600, 30, 5000, 40, '/images/products/yeosu-gat-kimchi.jpg', 'gift_set', '2kg', '여수', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('완도 전복죽', 19, 8, '완도 전복으로 만든 죽', 18000, 12600, 30, 3000, 60, '/images/products/wando-abalone-porridge.jpg', 'gift_set', '500g', '완도', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('장흥 키조개', 19, 2, '장흥 신선 키조개', 38000, 26600, 30, 5000, 35, '/images/products/jangheung-pen-shell.jpg', 'gift_set', '1kg', '장흥', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('고흥 김', 19, 8, '고흥 돌김', 25000, 17500, 30, 3000, 80, '/images/products/goheung-seaweed.jpg', 'gift_set', '200g', '고흥', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 축산물 (2개)
('영광 굴비정식', 20, 8, '영광 법성포 굴비', 120000, 84000, 30, 5000, 15, '/images/products/yeonggwang-gulbi-set.jpg', 'gift_set', '20미', '영광', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('담양 한우', 20, 7, '담양 한우 선물세트', 150000, 105000, 30, 5000, 10, '/images/products/damyang-hanwoo.jpg', 'gift_set', '2kg', '담양', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 특산품 (4개)
('광양 불고기', 31, 1, '광양 전통 불고기', 48000, 33600, 30, 5000, 30, '/images/products/gwangyang-bulgogi.jpg', 'gift_set', '1kg', '광양', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('순천 꼬막', 31, 8, '순천만 꼬막', 32000, 22400, 30, 5000, 40, '/images/products/suncheon-cockles.jpg', 'gift_set', '1kg', '순천', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('부안 모시잎송편', 31, 8, '부안 모시잎으로 만든 송편', 22000, 15400, 30, 3000, 50, '/images/products/buan-mosi-songpyeon.jpg', 'gift_set', '500g', '부안', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('전주 한과', 31, 6, '전주 전통 한과', 38000, 26600, 30, 3000, 45, '/images/products/jeonju-hangwa.jpg', 'gift_set', '500g', '전주', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),

-- 가공식품 (11개)
('보성 녹차 바움쿠헨', 18, 13, '녹차 향이 가득한 바움쿠헨', 28000, 19600, 30, 3000, 60, '/images/products/boseong-baumkuchen.jpg', 'gift_set', '500g', '보성', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('하동 차 초콜릿', 18, 2, '하동차로 만든 초콜릿', 25000, 17500, 30, 3000, 70, '/images/products/hadong-chocolate.jpg', 'gift_set', '300g', '하동', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('제주 감귤청', 18, 1, '제주 감귤로 만든 청', 22000, 15400, 30, 3000, 80, '/images/products/jeju-citrus-syrup.jpg', 'gift_set', '500g', '제주도', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('광양 매실청', 18, 1, '광양 매실로 만든 청', 28000, 19600, 30, 3000, 65, '/images/products/gwangyang-plum-syrup.jpg', 'gift_set', '700g', '광양', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('장흥 표고버섯 분말', 18, 2, '장흥 표고버섯 건강 분말', 32000, 22400, 30, 3000, 50, '/images/products/jangheung-powder.jpg', 'gift_set', '200g', '장흥', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('남원 추어탕', 18, 10, '남원 전통 추어탕', 18000, 12600, 30, 3000, 55, '/images/products/namwon-loach-soup.jpg', 'gift_set', '600g', '남원', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('전주 비빔밥 키트', 18, 6, '전주 비빔밥 세트', 35000, 24500, 30, 3000, 45, '/images/products/jeonju-bibimbap-kit.jpg', 'gift_set', '1kg', '전주', 1, 1, 0, 9.9, CURRENT_TIMESTAMP),
('김해 수제 두부', 18, 2, '김해 콩으로 만든 두부', 12000, 8400, 30, 3000, 90, '/images/products/gimhae-tofu.jpg', 'gift_set', '500g', '김해', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('담양 떡갈비', 18, 7, '담양 전통 떡갈비', 42000, 29400, 30, 5000, 35, '/images/products/damyang-tteokgalbi.jpg', 'gift_set', '800g', '담양', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('부안 오디청', 18, 8, '부안 오디로 만든 청', 24000, 16800, 30, 3000, 60, '/images/products/buan-mulberry-syrup.jpg', 'gift_set', '500g', '부안', 0, 1, 0, 9.9, CURRENT_TIMESTAMP),
('고흥 유자청', 18, 8, '고흥 유자로 만든 청', 26000, 18200, 30, 3000, 70, '/images/products/goheung-yuzu-syrup.jpg', 'gift_set', '500g', '고흥', 0, 1, 0, 9.9, CURRENT_TIMESTAMP);

-- ========================================
-- 5. 체험 프로그램 데이터 (5개)
-- ========================================
INSERT INTO experiences (title, region_id, producer_id, experience_type, description, duration, original_price, price, discount_rate, max_participants, main_image, is_available, commission_rate, created_at) VALUES
('제주 차밭 트레킹', 1, 1, 'farm_tour', '제주 한라산 차밭을 걸으며 차 재배 과정을 배웁니다', '3시간', 71428, 50000, 30, 15, '/images/experiences/jeju-trek.jpg', 1, 9.9, CURRENT_TIMESTAMP),
('하동 차 만들기 체험', 2, 2, 'tea_experience', '전통 방식으로 직접 차를 만들어봅니다', '4시간', 85714, 60000, 30, 10, '/images/experiences/hadong-tea-making.jpg', 1, 9.9, CURRENT_TIMESTAMP),
('이천 도자기 원데이 클래스', 6, 3, 'craft_workshop', '전통 도예 기법으로 나만의 찻잔을 만듭니다', '3시간', 100000, 70000, 30, 8, '/images/experiences/icheon-pottery.jpg', 1, 9.9, CURRENT_TIMESTAMP),
('차 명상 힐링 프로그램', 1, 1, 'tea_ceremony', '차와 함께하는 명상과 힐링 시간', '2시간', 57142, 40000, 30, 12, '/images/experiences/tea-meditation.jpg', 1, 9.9, CURRENT_TIMESTAMP),
('다도 예절 교육', 2, 2, 'tea_ceremony', '전통 다도 예절과 차 우리는 법을 배웁니다', '2시간', 42857, 30000, 30, 15, '/images/experiences/tea-etiquette.jpg', 1, 9.9, CURRENT_TIMESTAMP);

-- ========================================
-- 6. 교육 프로그램 데이터 (30개)
-- ========================================
-- 교육 카테고리
INSERT INTO education_categories (id, name, parent_id, description, display_order, icon, created_at) VALUES
(1, '다도교육', NULL, '차와 공예에 대한 체계적인 교육 프로그램', 1, 'fa-graduation-cap', CURRENT_TIMESTAMP),
(2, '차공부', 1, '차의 역사와 문화, 종류와 우리는 방법을 배웁니다', 1, 'fa-mug-hot', CURRENT_TIMESTAMP),
(3, '공예공부', 1, '한국 전통 공예의 역사와 제작 기법을 배웁니다', 2, 'fa-palette', CURRENT_TIMESTAMP),
(4, '다도교육', 1, '다도의 의미와 역사, 명상과 인성교육을 배웁니다', 3, 'fa-spa', CURRENT_TIMESTAMP);

-- 명상 관련 교육 (10개)
INSERT INTO education_curriculum (category_id, title, description, content, duration, difficulty, display_order, thumbnail, created_at) VALUES
(4, '명상의 기초', '명상의 정의와 기본 개념을 배웁니다', '명상이란 무엇인지, 왜 필요한지, 어떤 효과가 있는지 알아봅니다.', '30분', 'beginner', 1, '/images/education/meditation-basic.jpg', CURRENT_TIMESTAMP),
(4, '차와 함께하는 명상', '차를 마시며 하는 명상 수행법', '차 한 잔을 통해 현재에 집중하는 명상 방법을 익힙니다.', '45분', 'beginner', 2, '/images/education/tea-meditation.jpg', CURRENT_TIMESTAMP),
(4, '호흡 명상', '호흡을 통한 명상 수련', '호흡에 집중하여 마음을 고요하게 만드는 방법을 배웁니다.', '40분', 'beginner', 3, '/images/education/breathing.jpg', CURRENT_TIMESTAMP),
(4, '요가와 명상', '요가 자세와 명상의 결합', '기본 요가 자세를 통해 몸과 마음을 이완시키는 명상을 배웁니다.', '60분', 'intermediate', 4, '/images/education/yoga-meditation.jpg', CURRENT_TIMESTAMP),
(4, '걷기 명상', '걸으면서 하는 명상 수행', '천천히 걸으며 각 걸음에 집중하는 명상법을 배웁니다.', '45분', 'beginner', 5, '/images/education/walking-meditation.jpg', CURRENT_TIMESTAMP),
(4, '자비 명상', '자신과 타인에 대한 자비심 기르기', '자신과 모든 존재에 대한 자비와 연민을 키우는 명상을 배웁니다.', '50분', 'intermediate', 6, '/images/education/loving-kindness.jpg', CURRENT_TIMESTAMP),
(4, '소리 명상', '소리를 통한 명상', '싱잉볼, 차임 등의 소리를 활용한 명상 방법을 배웁니다.', '40분', 'beginner', 7, '/images/education/sound-meditation.jpg', CURRENT_TIMESTAMP),
(4, '만트라 명상', '만트라를 활용한 명상', '짧은 문구나 소리를 반복하며 집중하는 명상법을 배웁니다.', '45분', 'intermediate', 8, '/images/education/mantra.jpg', CURRENT_TIMESTAMP),
(4, '몸 스캔 명상', '신체 각 부위를 느끼는 명상', '머리부터 발끝까지 신체를 천천히 관찰하는 명상을 배웁니다.', '50분', 'beginner', 9, '/images/education/body-scan.jpg', CURRENT_TIMESTAMP),
(4, '통합 명상 수련', '다양한 명상 기법의 통합', '여러 명상 기법을 결합하여 자신만의 수련법을 만듭니다.', '60분', 'advanced', 10, '/images/education/integrated-meditation.jpg', CURRENT_TIMESTAMP);

-- 다도 관련 교육 (10개)
INSERT INTO education_curriculum (category_id, title, description, content, duration, difficulty, display_order, thumbnail, created_at) VALUES
(4, '다도의 역사와 정신', '한국 다도의 역사와 철학', '한국 차 문화의 역사와 다도의 정신적 가치를 배웁니다.', '50분', 'beginner', 11, '/images/education/tea-ceremony-history.jpg', CURRENT_TIMESTAMP),
(4, '다기의 이해', '다도구의 종류와 사용법', '다완, 다관 등 다도구의 종류와 올바른 사용법을 배웁니다.', '40분', 'beginner', 12, '/images/education/tea-tools.jpg', CURRENT_TIMESTAMP),
(4, '차 우리는 법', '차의 종류별 올바른 추출법', '녹차, 홍차, 발효차 등 차 종류별 최적의 우리는 방법을 배웁니다.', '45분', 'beginner', 13, '/images/education/tea-brewing.jpg', CURRENT_TIMESTAMP),
(4, '다례의 절차', '전통 다례의 순서와 예법', '손님을 맞이하는 다례의 전통적인 절차와 예법을 배웁니다.', '60분', 'intermediate', 14, '/images/education/tea-ceremony.jpg', CURRENT_TIMESTAMP),
(4, '사계절 다법', '계절에 따른 차 마시는 법', '봄여름가을겨울 각 계절에 어울리는 차와 다법을 배웁니다.', '45분', 'intermediate', 15, '/images/education/seasonal-tea.jpg', CURRENT_TIMESTAMP),
(4, '차와 음식의 조화', '차와 어울리는 다과', '차의 특성에 맞는 다과 선택과 페어링 방법을 배웁니다.', '50분', 'intermediate', 16, '/images/education/tea-pairing.jpg', CURRENT_TIMESTAMP),
(4, '현대 다례', '현대적 감각의 차 문화', '전통과 현대가 조화된 새로운 차 문화를 배웁니다.', '45분', 'intermediate', 17, '/images/education/modern-tea.jpg', CURRENT_TIMESTAMP),
(4, '실전 다례 연습', '다례 전 과정 실습', '배운 내용을 종합하여 완전한 다례를 직접 실습합니다.', '90분', 'advanced', 18, '/images/education/tea-practice.jpg', CURRENT_TIMESTAMP),
(4, '차 명상의 실제', '다도와 명상의 결합', '차를 우리고 마시는 모든 과정을 명상으로 연결합니다.', '60분', 'advanced', 19, '/images/education/tea-zen.jpg', CURRENT_TIMESTAMP),
(4, '다도 교사 과정', '다도 교사 양성 과정', '다도를 가르칠 수 있는 전문 교사 과정입니다.', '120분', 'advanced', 20, '/images/education/tea-teacher.jpg', CURRENT_TIMESTAMP);

-- 차 공부 관련 교육 (5개)
INSERT INTO education_curriculum (category_id, title, description, content, duration, difficulty, display_order, thumbnail, created_at) VALUES
(2, '차의 기원과 역사', '차의 탄생과 전파', '중국에서 시작된 차가 한국과 세계로 전파된 역사를 배웁니다.', '45분', 'beginner', 21, '/images/education/tea-history.jpg', CURRENT_TIMESTAMP),
(2, '차의 종류와 분류', '6대 다류의 이해', '녹차, 백차, 황차, 청차, 홍차, 흑차의 특징을 배웁니다.', '50분', 'beginner', 22, '/images/education/tea-types.jpg', CURRENT_TIMESTAMP),
(2, '차의 재배와 제다', '차나무 재배부터 완성까지', '차의 재배 환경, 수확 시기, 제다 과정을 배웁니다.', '60분', 'intermediate', 23, '/images/education/tea-production.jpg', CURRENT_TIMESTAMP),
(2, '차의 품질 평가', '좋은 차를 구별하는 법', '차의 외관, 향, 맛을 평가하는 방법을 배웁니다.', '55분', 'intermediate', 24, '/images/education/tea-evaluation.jpg', CURRENT_TIMESTAMP),
(2, '차와 건강', '차의 효능과 성분', '차에 포함된 카테킨, 카페인 등 성분과 건강 효과를 배웁니다.', '40분', 'beginner', 25, '/images/education/tea-health.jpg', CURRENT_TIMESTAMP);

-- 공예 관련 교육 (5개)
INSERT INTO education_curriculum (category_id, title, description, content, duration, difficulty, display_order, thumbnail, created_at) VALUES
(3, '한국 전통 도자기', '도자기의 역사와 종류', '백자, 청자, 분청사기 등 한국 도자기의 역사를 배웁니다.', '50분', 'beginner', 26, '/images/education/ceramics-history.jpg', CURRENT_TIMESTAMP),
(3, '목공예 기초', '나무의 종류와 기본 도구', '목공예에 사용되는 나무와 기본 도구 사용법을 배웁니다.', '45분', 'beginner', 27, '/images/education/woodwork-basic.jpg', CURRENT_TIMESTAMP),
(3, '대나무 공예', '죽세공예의 전통과 기법', '담양의 대나무 공예 전통과 기본 기법을 배웁니다.', '55분', 'intermediate', 28, '/images/education/bamboo-craft.jpg', CURRENT_TIMESTAMP),
(3, '나전칠기의 세계', '자개를 이용한 칠기 공예', '통영 나전칠기의 역사와 제작 과정을 배웁니다.', '60분', 'intermediate', 29, '/images/education/lacquerware.jpg', CURRENT_TIMESTAMP),
(3, '현대 공예의 흐름', '전통과 현대의 만남', '전통 공예 기법을 현대적으로 재해석한 사례를 배웁니다.', '50분', 'intermediate', 30, '/images/education/modern-craft.jpg', CURRENT_TIMESTAMP);

-- ========================================
-- 7. 이벤트 데이터 (30개, 1월~12월)
-- ========================================
INSERT INTO events (title, description, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority, created_at) VALUES
-- 1월 (3개)
('신년 맞이 대할인', '2026년 새해를 맞아 모든 차 제품 20% 할인', 20, '/images/events/new-year-2026.jpg', '2026-01-01', '2026-01-07', 1, 1, 1, 1, CURRENT_TIMESTAMP),
('설날 선물세트 특가', '설날 선물세트 30% 할인 + 무료배송', 30, '/images/events/lunar-new-year.jpg', '2026-01-15', '2026-01-31', 1, 1, 1, 2, CURRENT_TIMESTAMP),
('겨울 차 페스티벌', '따뜻한 발효차와 홍차 특별 기획전', 15, '/images/events/winter-tea-festival.jpg', '2026-01-20', '2026-01-31', 1, 1, 1, 3, CURRENT_TIMESTAMP),

-- 2월 (3개)
('봄 햇차 예약판매', '올해 첫 봄 햇차 예약 특별가', 25, '/images/events/spring-tea-reservation.jpg', '2026-02-01', '2026-02-14', 1, 2, 1, 1, CURRENT_TIMESTAMP),
('밸런타인데이 차 선물', '사랑하는 사람에게 차 선물세트 20% 할인', 20, '/images/events/valentines-day.jpg', '2026-02-10', '2026-02-14', 1, 2, 1, 2, CURRENT_TIMESTAMP),
('겨울 공예품 전시회', '따뜻한 찻잔과 다관 기획전', 15, '/images/events/winter-craft-exhibition.jpg', '2026-02-15', '2026-02-28', 1, 2, 1, 3, CURRENT_TIMESTAMP),

-- 3월 (3개)
('봄맞이 녹차 페스티벌', '신선한 봄 녹차 20% 할인', 20, '/images/events/spring-green-tea.jpg', '2026-03-01', '2026-03-15', 1, 3, 1, 1, CURRENT_TIMESTAMP),
('화이트데이 공예품 특가', '전통 공예품 선물 30% 할인', 30, '/images/events/white-day-craft.jpg', '2026-03-10', '2026-03-14', 1, 3, 1, 2, CURRENT_TIMESTAMP),
('봄 체험 프로그램', '차밭 트레킹과 차 만들기 체험 할인', 25, '/images/events/spring-experience.jpg', '2026-03-20', '2026-03-31', 1, 3, 1, 3, CURRENT_TIMESTAMP),

-- 4월 (3개)
('봄나들이 차 세트', '나들이용 휴대용 차 세트 특가', 20, '/images/events/spring-outing-set.jpg', '2026-04-01', '2026-04-15', 1, 4, 1, 1, CURRENT_TIMESTAMP),
('햇차 시음회 이벤트', '2026년 햇차 무료 시음 행사', 0, '/images/events/tea-tasting.jpg', '2026-04-10', '2026-04-20', 1, 4, 1, 2, CURRENT_TIMESTAMP),
('어린이날 가족 선물', '가족 선물세트 25% 할인', 25, '/images/events/childrens-day.jpg', '2026-04-25', '2026-05-05', 1, 4, 1, 3, CURRENT_TIMESTAMP),

-- 5월 (3개)
('어버이날 효도 선물', '부모님 선물세트 30% 할인 + 무료배송', 30, '/images/events/parents-day.jpg', '2026-05-01', '2026-05-08', 1, 5, 1, 1, CURRENT_TIMESTAMP),
('봄 공예품 페스티벌', '신작 공예품 20% 할인', 20, '/images/events/spring-craft-festival.jpg', '2026-05-10', '2026-05-25', 1, 5, 1, 2, CURRENT_TIMESTAMP),
('가정의 달 특별 세트', '가족 선물용 특별 구성 세트', 25, '/images/events/family-month-set.jpg', '2026-05-15', '2026-05-31', 1, 5, 1, 3, CURRENT_TIMESTAMP),

-- 6월 (2개)
('초여름 블렌딩 차', '여름맞이 블렌딩차 신제품 출시', 15, '/images/events/summer-blend.jpg', '2026-06-01', '2026-06-15', 1, 6, 1, 1, CURRENT_TIMESTAMP),
('여름 체험 프로그램', '시원한 냉차 만들기 체험', 20, '/images/events/summer-experience.jpg', '2026-06-15', '2026-06-30', 1, 6, 1, 2, CURRENT_TIMESTAMP),

-- 7월 (2개)
('여름 휴가 세트', '휴가용 간편 차 세트 특가', 20, '/images/events/vacation-set.jpg', '2026-07-01', '2026-07-20', 1, 7, 1, 1, CURRENT_TIMESTAMP),
('한여름 얼음차 페스티벌', '냉차와 아이스티 재료 할인', 25, '/images/events/iced-tea-festival.jpg', '2026-07-15', '2026-07-31', 1, 7, 1, 2, CURRENT_TIMESTAMP),

-- 8월 (2개)
('광복절 특별 세트', '전통 차와 공예품 애국 세트', 30, '/images/events/liberation-day-set.jpg', '2026-08-10', '2026-08-15', 1, 8, 1, 1, CURRENT_TIMESTAMP),
('여름 방학 체험', '가족 체험 프로그램 할인', 20, '/images/events/summer-vacation-experience.jpg', '2026-08-01', '2026-08-31', 1, 8, 1, 2, CURRENT_TIMESTAMP),

-- 9월 (2개)
('추석 명절 선물', '추석 선물세트 30% 할인 + 무료배송', 30, '/images/events/chuseok-gift.jpg', '2026-09-01', '2026-09-15', 1, 9, 1, 1, CURRENT_TIMESTAMP),
('가을 햇차 예약', '가을 햇차 예약 특별가', 25, '/images/events/autumn-tea-reservation.jpg', '2026-09-15', '2026-09-30', 1, 9, 1, 2, CURRENT_TIMESTAMP),

-- 10월 (2개)
('가을 단풍 체험', '차밭 단풍 트레킹 특별 이벤트', 20, '/images/events/autumn-trekking.jpg', '2026-10-01', '2026-10-20', 1, 10, 1, 1, CURRENT_TIMESTAMP),
('한글날 전통 공예', '한국 전통 공예품 20% 할인', 20, '/images/events/hangeul-day-craft.jpg', '2026-10-05', '2026-10-15', 1, 10, 1, 2, CURRENT_TIMESTAMP),

-- 11월 (2개)
('블랙프라이데이 대축제', '모든 제품 25% 할인', 25, '/images/events/black-friday.jpg', '2026-11-20', '2026-11-30', 1, 11, 1, 1, CURRENT_TIMESTAMP),
('김장 시즌 특별 세트', '김장철 건강 차 세트', 20, '/images/events/kimchi-season-set.jpg', '2026-11-01', '2026-11-30', 1, 11, 1, 2, CURRENT_TIMESTAMP),

-- 12월 (3개)
('크리스마스 선물 박람회', '크리스마스 선물세트 30% 할인', 30, '/images/events/christmas-gift-expo.jpg', '2026-12-10', '2026-12-25', 1, 12, 1, 1, CURRENT_TIMESTAMP),
('연말 결산 세일', '모든 제품 25% 할인', 25, '/images/events/year-end-sale.jpg', '2026-12-26', '2026-12-31', 1, 12, 1, 2, CURRENT_TIMESTAMP),
('겨울 따뜻한 차', '겨울철 몸을 따뜻하게 하는 차 특가', 20, '/images/events/winter-warm-tea.jpg', '2026-12-01', '2026-12-31', 1, 12, 1, 3, CURRENT_TIMESTAMP);

-- 외래키 제약 조건 활성화
PRAGMA foreign_keys = ON;

-- ========================================
-- 데이터 삽입 완료
-- ========================================
-- 지역: 17개
-- 카테고리: 27개
-- 생산자: 13개
-- 제품: 78개 (차 20, 공예 23, 선물 2, 지역특산품 33)
-- 체험: 5개
-- 교육 카테고리: 4개
-- 교육 커리큘럼: 30개
-- 이벤트: 30개 (1월~12월)
-- ========================================
