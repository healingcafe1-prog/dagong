-- Disable foreign key checks temporarily
PRAGMA foreign_keys = OFF;

-- Clear existing data
DELETE FROM settlement_batches;
DELETE FROM settlements;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM cart_items;
DELETE FROM education_applications;
DELETE FROM experience_schedules;
DELETE FROM experiences;
DELETE FROM attractions;
DELETE FROM event_products;
DELETE FROM events;
DELETE FROM gift_set_items;
DELETE FROM products;
DELETE FROM producers;
DELETE FROM categories;
DELETE FROM regions;
DELETE FROM users;

-- Reset autoincrement counters
DELETE FROM sqlite_sequence WHERE name='regions';
DELETE FROM sqlite_sequence WHERE name='categories';
DELETE FROM sqlite_sequence WHERE name='producers';
DELETE FROM sqlite_sequence WHERE name='products';
DELETE FROM sqlite_sequence WHERE name='gift_set_items';
DELETE FROM sqlite_sequence WHERE name='events';
DELETE FROM sqlite_sequence WHERE name='event_products';
DELETE FROM sqlite_sequence WHERE name='attractions';
DELETE FROM sqlite_sequence WHERE name='experiences';
DELETE FROM sqlite_sequence WHERE name='experience_schedules';
DELETE FROM sqlite_sequence WHERE name='education_applications';
DELETE FROM sqlite_sequence WHERE name='users';
DELETE FROM sqlite_sequence WHERE name='cart_items';
DELETE FROM sqlite_sequence WHERE name='orders';
DELETE FROM sqlite_sequence WHERE name='order_items';
DELETE FROM sqlite_sequence WHERE name='settlements';
DELETE FROM sqlite_sequence WHERE name='settlement_batches';

-- === 지역 데이터 (Regions) ===
-- 차 산지
INSERT INTO regions (id, name, type, description, main_image, created_at, updated_at) VALUES
(1, '제주도', 'tea', '청정 자연이 만든 프리미엄 차', '/images/regions/jeju.jpg', datetime('now'), datetime('now')),
(2, '하동', 'tea', '천년의 차 역사가 살아있는 곳', '/images/regions/hadong.jpg', datetime('now'), datetime('now')),
(3, '김해', 'tea', '신선한 차의 맛과 향', '/images/regions/gimhae.jpg', datetime('now'), datetime('now')),
(4, '광양', 'tea', '백운산 자락의 청정 차밭', '/images/regions/gwangyang.jpg', datetime('now'), datetime('now')),
(5, '보성', 'tea', '한국의 대표 녹차 생산지', '/images/regions/boseong.jpg', datetime('now'), datetime('now')),
(6, '강진', 'tea', '다산 정약용의 차 문화', '/images/regions/gangjin.jpg', datetime('now'), datetime('now')),
(7, '장흥', 'tea', '청태전의 고장', '/images/regions/jangheung.jpg', datetime('now'), datetime('now')),
(8, '부안', 'tea', '서해안의 차 향기', '/images/regions/buan.jpg', datetime('now'), datetime('now'));

-- 공예 산지
INSERT INTO regions (id, name, type, description, main_image, created_at, updated_at) VALUES
(9, '경기 광주', 'craft', '전통 도자기의 본고장', '/images/regions/gwangju-craft.jpg', datetime('now'), datetime('now')),
(10, '이천', 'craft', '도예의 도시, 현대적 감각', '/images/regions/icheon.jpg', datetime('now'), datetime('now')),
(11, '여주', 'craft', '천년 역사의 도자기', '/images/regions/yeoju.jpg', datetime('now'), datetime('now')),
(12, '청주', 'craft', '현대와 전통의 조화', '/images/regions/cheongju.jpg', datetime('now'), datetime('now')),
(13, '부안(공예)', 'craft', '전통 옹기의 명맥', '/images/regions/buan-craft.jpg', datetime('now'), datetime('now')),
(14, '강진(공예)', 'craft', '고려청자의 부활', '/images/regions/gangjin-craft.jpg', datetime('now'), datetime('now')),
(15, '문경', 'craft', '사기장의 혼이 깃든 곳', '/images/regions/mungyeong.jpg', datetime('now'), datetime('now'));

-- === 카테고리 데이터 (Categories) ===
-- 차 카테고리
INSERT INTO categories (id, name, type, parent_id, display_order, created_at, updated_at) VALUES
(1, '녹차', 'tea', NULL, 1, datetime('now'), datetime('now')),
(2, '황차', 'tea', NULL, 2, datetime('now'), datetime('now')),
(3, '홍차', 'tea', NULL, 3, datetime('now'), datetime('now')),
(4, '발효차', 'tea', NULL, 4, datetime('now'), datetime('now')),
(5, '말차', 'tea', NULL, 5, datetime('now'), datetime('now')),
(6, '블렌딩차', 'tea', NULL, 6, datetime('now'), datetime('now')),
(7, '허브차', 'tea', NULL, 7, datetime('now'), datetime('now'));

-- 공예 카테고리
INSERT INTO categories (id, name, type, parent_id, display_order, created_at, updated_at) VALUES
(8, '찻잔', 'craft', NULL, 1, datetime('now'), datetime('now')),
(9, '다관', 'craft', NULL, 2, datetime('now'), datetime('now')),
(10, '다기세트', 'craft', NULL, 3, datetime('now'), datetime('now')),
(11, '장식 도자기', 'craft', NULL, 4, datetime('now'), datetime('now')),
(12, '목공예', 'craft', NULL, 5, datetime('now'), datetime('now'));

-- 선물세트 카테고리
INSERT INTO categories (id, name, type, parent_id, display_order, created_at, updated_at) VALUES
(13, '명절 선물세트', 'gift', NULL, 1, datetime('now'), datetime('now')),
(14, '프리미엄 선물세트', 'gift', NULL, 2, datetime('now'), datetime('now')),
(15, '입문자 선물세트', 'gift', NULL, 3, datetime('now'), datetime('now')),
(16, '기업 선물세트', 'gift', NULL, 4, datetime('now'), datetime('now'));

-- 지역 특산품 카테고리
INSERT INTO categories (id, name, type, parent_id, display_order, created_at, updated_at) VALUES
(17, '농산물', 'local', NULL, 1, datetime('now'), datetime('now')),
(18, '가공식품', 'local', NULL, 2, datetime('now'), datetime('now')),
(19, '수산물', 'local', NULL, 3, datetime('now'), datetime('now')),
(20, '축산물', 'local', NULL, 4, datetime('now'), datetime('now'));

-- === 생산자 데이터 (Producers) ===
-- 차 생산자
INSERT INTO producers (id, name, region_id, type, description, main_image, created_at, updated_at) VALUES
(1, '제주 첫차원', 1, 'tea', '제주도의 청정 자연에서 자란 프리미엄 차', '/images/producers/jeju-first-tea.jpg', datetime('now'), datetime('now')),
(2, '하동야생차', 2, 'tea', '지리산 자락의 야생차', '/images/producers/hadong-wild-tea.jpg', datetime('now'), datetime('now')),
(3, '보성녹차연구소', 5, 'tea', '전통과 현대가 만나는 차', '/images/producers/boseong-tea-lab.jpg', datetime('now'), datetime('now')),
(4, '강진청자다원', 6, 'tea', '다산의 차 정신을 계승하다', '/images/producers/gangjin-tea-garden.jpg', datetime('now'), datetime('now'));

-- 공예 생산자
INSERT INTO producers (id, name, region_id, type, description, main_image, created_at, updated_at) VALUES
(5, '이천도예명가', 10, 'craft', '현대와 전통이 조화된 도예작품', '/images/producers/icheon-pottery.jpg', datetime('now'), datetime('now')),
(6, '광주분청사기', 9, 'craft', '전통 분청사기의 아름다움', '/images/producers/gwangju-buncheong.jpg', datetime('now'), datetime('now')),
(7, '여주백자공방', 11, 'craft', '정갈한 백자의 품격', '/images/producers/yeoju-white-porcelain.jpg', datetime('now'), datetime('now')),
(8, '강진청자', 14, 'craft', '고려청자 재현 명인', '/images/producers/gangjin-celadon.jpg', datetime('now'), datetime('now')),
(9, '문경전통사기', 15, 'craft', '투박하지만 따뜻한 사기', '/images/producers/mungyeong-pottery.jpg', datetime('now'), datetime('now')),
(10, '부안옹기마을', 13, 'craft', '옹기의 숨결을 이어가다', '/images/producers/buan-onggi.jpg', datetime('now'), datetime('now'));

-- 지역 농민
INSERT INTO producers (id, name, region_id, type, description, main_image, created_at, updated_at) VALUES
(11, '제주유기농협동조합', 1, 'local', '제주의 청정 유기농산물', '/images/producers/jeju-organic.jpg', datetime('now'), datetime('now')),
(12, '하동지리산농협', 2, 'local', '지리산의 청정 농산물', '/images/producers/hadong-jirisan.jpg', datetime('now'), datetime('now')),
(13, '보성녹차농협', 5, 'local', '녹차와 함께하는 특산물', '/images/producers/boseong-coop.jpg', datetime('now'), datetime('now')),
(14, '강진고구마작목반', 6, 'local', '달콤한 강진 고구마', '/images/producers/gangjin-sweet-potato.jpg', datetime('now'), datetime('now')),
(15, '이천쌀조합', 10, 'local', '임금님표 이천쌀', '/images/producers/icheon-rice.jpg', datetime('now'), datetime('now'));

-- === 상품 데이터 (Products) ===
-- 차 상품 (Featured)
INSERT INTO products (id, name, category_id, producer_id, region_id, price, discount_price, stock, description, main_image, is_featured, is_available, created_at, updated_at) VALUES
(1, '제주 첫차 50g', 1, 1, 1, 28000, 25000, 50, '봄의 첫 싹만 골라 만든 프리미엄 녹차. 깊은 향과 부드러운 맛이 특징입니다.', '/images/products/jeju-first-tea.jpg', 1, 1, datetime('now'), datetime('now')),
(2, '하동 야생차 100g', 1, 2, 2, 45000, 40000, 30, '지리산 야생차나무에서 채취한 귀한 차. 깊은 산의 기운이 담겨있습니다.', '/images/products/hadong-wild-tea.jpg', 1, 1, datetime('now'), datetime('now')),
(3, '보성 우전 50g', 1, 3, 5, 32000, 28000, 40, '곡우 전에 딴 어린 잎으로 만든 우전. 섬세하고 깊은 맛이 일품입니다.', '/images/products/boseong-woojeon.jpg', 1, 1, datetime('now'), datetime('now'));

-- 추가 차 상품
INSERT INTO products (id, name, category_id, producer_id, region_id, price, discount_price, stock, description, main_image, is_featured, is_available, created_at, updated_at) VALUES
(4, '강진 황차 30g', 2, 4, 6, 38000, NULL, 20, '전통 제다법으로 만든 귀한 황차. 은은한 단맛과 깊은 향이 특징입니다.', '/images/products/gangjin-yellow-tea.jpg', 0, 1, datetime('now'), datetime('now')),
(5, '제주 발효차 100g', 4, 1, 1, 42000, 38000, 25, '제주 재래종으로 만든 발효차. 건강에 좋고 부드러운 맛입니다.', '/images/products/jeju-fermented-tea.jpg', 0, 1, datetime('now'), datetime('now')),
(6, '보성 말차 50g', 5, 3, 5, 35000, NULL, 35, '고급 녹차를 곱게 간 말차. 라떼나 베이킹에 활용하기 좋습니다.', '/images/products/boseong-matcha.jpg', 0, 1, datetime('now'), datetime('now'));

-- 공예 상품 (Featured)
INSERT INTO products (id, name, category_id, producer_id, region_id, price, discount_price, stock, description, main_image, is_featured, is_available, created_at, updated_at) VALUES
(7, '이천 백자 찻잔 세트 (4p)', 8, 5, 10, 85000, 75000, 15, '현대적 감각이 돋보이는 백자 찻잔 세트. 일상의 품격을 높여줍니다.', '/images/products/icheon-teacup-set.jpg', 1, 1, datetime('now'), datetime('now')),
(8, '광주 분청 다관', 9, 6, 9, 120000, 110000, 10, '전통 분청사기 기법으로 제작한 다관. 투박하면서도 세련된 아름다움.', '/images/products/gwangju-teapot.jpg', 1, 1, datetime('now'), datetime('now')),
(9, '강진 청자 다기세트 (6종)', 10, 8, 14, 280000, 250000, 5, '고려청자를 재현한 프리미엄 다기세트. 전통의 멋이 살아있습니다.', '/images/products/gangjin-tea-set.jpg', 1, 1, datetime('now'), datetime('now'));

-- 추가 공예 상품
INSERT INTO products (id, name, category_id, producer_id, region_id, price, discount_price, stock, description, main_image, is_featured, is_available, created_at, updated_at) VALUES
(10, '여주 백자 찻잔 (2p)', 8, 7, 11, 48000, NULL, 20, '정갈한 백자 찻잔. 차의 색과 향을 제대로 즐길 수 있습니다.', '/images/products/yeoju-teacups.jpg', 0, 1, datetime('now'), datetime('now')),
(11, '문경 사기 다관', 9, 9, 15, 68000, 62000, 12, '투박하지만 정감있는 전통 사기 다관. 실용적이면서도 멋스럽습니다.', '/images/products/mungyeong-teapot.jpg', 0, 1, datetime('now'), datetime('now')),
(12, '부안 옹기 차 보관함', 12, 10, 13, 55000, NULL, 18, '옹기의 숨 쉬는 특성으로 차를 신선하게 보관할 수 있습니다.', '/images/products/buan-tea-container.jpg', 0, 1, datetime('now'), datetime('now')),
(13, '이천 현대 다기세트', 10, 5, 10, 180000, 165000, 8, '현대적 감각의 미니멀 다기세트. 젊은 세대를 위한 디자인.', '/images/products/icheon-modern-set.jpg', 0, 1, datetime('now'), datetime('now')),
(14, '광주 분청 접시세트 (5p)', 11, 6, 9, 95000, NULL, 12, '전통 분청사기 문양의 접시세트. 다과 접대에 완벽합니다.', '/images/products/gwangju-plate-set.jpg', 0, 1, datetime('now'), datetime('now')),
(15, '강진 청자 화병', 11, 8, 14, 150000, 135000, 6, '고려청자의 아름다움을 담은 화병. 공간을 품격있게 만듭니다.', '/images/products/gangjin-vase.jpg', 0, 1, datetime('now'), datetime('now')),
(16, '여주 백자 향로', 11, 7, 11, 72000, NULL, 10, '은은한 향을 즐기기 위한 백자 향로. 명상과 차 시간에 어울립니다.', '/images/products/yeoju-incense-burner.jpg', 0, 1, datetime('now'), datetime('now'));

-- 지역 특산품
INSERT INTO products (id, name, category_id, producer_id, region_id, price, discount_price, stock, description, main_image, is_featured, is_available, created_at, updated_at) VALUES
(17, '제주 한라봉 3kg', 17, 11, 1, 35000, 32000, 100, '제주의 햇살을 머금은 달콤한 한라봉. 비타민C가 풍부합니다.', '/images/products/jeju-hallabong.jpg', 0, 1, datetime('now'), datetime('now')),
(18, '하동 지리산 표고버섯', 17, 12, 2, 28000, NULL, 50, '지리산 청정 지역에서 재배한 육질 좋은 표고버섯.', '/images/products/hadong-mushroom.jpg', 0, 1, datetime('now'), datetime('now')),
(19, '보성 녹차 절편', 18, 13, 5, 18000, 16000, 80, '보성녹차를 넣어 만든 전통 떡. 은은한 차 향이 일품입니다.', '/images/products/boseong-rice-cake.jpg', 0, 1, datetime('now'), datetime('now')),
(20, '강진 고구마 5kg', 17, 14, 6, 22000, 20000, 120, '달콤하고 부드러운 강진 고구마. 영양 만점 간식입니다.', '/images/products/gangjin-sweet-potato.jpg', 0, 1, datetime('now'), datetime('now')),
(21, '이천쌀 10kg', 17, 15, 10, 48000, NULL, 60, '임금님께 진상하던 이천쌀. 윤기와 맛이 뛰어납니다.', '/images/products/icheon-rice.jpg', 0, 1, datetime('now'), datetime('now')),
(22, '제주 감귤청', 18, 11, 1, 15000, 14000, 70, '제주 감귤로 만든 천연 청. 차로 마시거나 요리에 활용하세요.', '/images/products/jeju-citrus-syrup.jpg', 0, 1, datetime('now'), datetime('now')),
(23, '하동 매실청', 18, 12, 2, 32000, 28000, 45, '지리산 청정 매실로 만든 프리미엄 매실청. 피로 회복에 좋습니다.', '/images/products/hadong-plum-syrup.jpg', 0, 1, datetime('now'), datetime('now')),
(24, '보성 녹차 쿠키', 18, 13, 5, 12000, NULL, 90, '보성녹차를 넣어 구운 쿠키. 차와 함께 즐기기 좋습니다.', '/images/products/boseong-cookie.jpg', 0, 1, datetime('now'), datetime('now')),
(25, '강진 청자골 토마토', 17, 14, 6, 18000, 16000, 55, '청정 지역에서 재배한 고당도 토마토. 신선함이 살아있습니다.', '/images/products/gangjin-tomato.jpg', 0, 1, datetime('now'), datetime('now')),
(26, '이천 쌀과자 선물세트', 18, 15, 10, 25000, 23000, 40, '이천쌀로 만든 다양한 쌀과자 세트. 건강한 간식입니다.', '/images/products/icheon-rice-snack.jpg', 0, 1, datetime('now'), datetime('now'));

-- 선물세트
INSERT INTO products (id, name, category_id, producer_id, region_id, price, discount_price, stock, description, main_image, is_featured, is_available, created_at, updated_at) VALUES
(27, '프리미엄 차&다기 세트', 14, 3, 5, 350000, 320000, 10, '최고급 차와 다기를 함께 담은 프리미엄 선물세트', '/images/products/premium-gift-set.jpg', 0, 1, datetime('now'), datetime('now')),
(28, '차 입문자 세트', 15, 3, 5, 85000, 78000, 25, '차를 처음 시작하는 분을 위한 입문 세트', '/images/products/beginner-tea-set.jpg', 0, 1, datetime('now'), datetime('now')),
(29, '명절 감사 세트', 13, 5, 10, 120000, 110000, 30, '차와 다기, 다과가 함께하는 명절 선물', '/images/products/holiday-gift-set.jpg', 0, 1, datetime('now'), datetime('now'));

-- === 선물세트 구성품 (Gift Set Items) ===
INSERT INTO gift_set_items (gift_set_id, product_id, quantity) VALUES
-- 프리미엄 차&다기 세트 (ID: 27)
(27, 2, 1),  -- 하동 야생차 100g
(27, 3, 1),  -- 보성 우전 50g
(27, 9, 1),  -- 강진 청자 다기세트

-- 차 입문자 세트 (ID: 28)
(28, 1, 1),  -- 제주 첫차 50g
(28, 10, 1), -- 여주 백자 찻잔 (2p)

-- 명절 감사 세트 (ID: 29)
(29, 1, 1),  -- 제주 첫차 50g
(29, 7, 1),  -- 이천 백자 찻잔 세트 (4p)
(29, 24, 1); -- 보성 녹차 쿠키

-- === 이벤트 데이터 (Events) ===
INSERT INTO events (id, title, description, event_type, discount_rate, start_date, end_date, is_active, created_at, updated_at) VALUES
(1, '신규 회원 가입 혜택', '신규 가입 시 첫 구매 15% 할인', 'discount', 15, '2026-02-01', '2026-02-28', 1, datetime('now'), datetime('now')),
(2, '봄맞이 특가', '봄맞이 특가 상품 모음', 'season', 20, '2026-02-01', '2026-03-31', 1, datetime('now'), datetime('now')),
(3, '생산자 직거래 페스티벌', '생산자와 직접 만나는 기회', 'festival', 0, '2026-02-15', '2026-02-28', 1, datetime('now'), datetime('now'));

-- === 이벤트-상품 연결 (Event Products) ===
INSERT INTO event_products (event_id, product_id) VALUES
-- 봄맞이 특가 이벤트
(2, 1),   -- 제주 첫차
(2, 2),   -- 하동 야생차
(2, 3),   -- 보성 우전
(2, 7),   -- 이천 백자 찻잔 세트
(2, 8),   -- 광주 분청 다관
(2, 27),  -- 프리미엄 차&다기 세트

-- 생산자 직거래 페스티벌
(3, 1),   -- 제주 첫차
(3, 2),   -- 하동 야생차
(3, 4),   -- 강진 황차
(3, 17),  -- 제주 한라봉
(3, 20);  -- 강진 고구마

-- === 관광지 데이터 (Attractions) ===
-- 제주 관광지
INSERT INTO attractions (region_id, name, type, description, address, main_image, created_at, updated_at) VALUES
(1, '오설록 티뮤지엄', 'museum', '차의 역사와 문화를 한눈에', '제주시 안덕면 신화역사로 15', '/images/attractions/osulloc.jpg', datetime('now'), datetime('now')),
(1, '제주 차밭 트레킹 코스', 'nature', '청정 제주 차밭을 걸으며 힐링', '서귀포시 안덕면', '/images/attractions/jeju-tea-field.jpg', datetime('now'), datetime('now')),
(1, '제주 세계자연유산센터', 'museum', '제주의 자연을 만나다', '제주시 조천읍', '/images/attractions/jeju-heritage.jpg', datetime('now'), datetime('now'));

-- 하동 관광지
INSERT INTO attractions (region_id, name, type, description, address, main_image, created_at, updated_at) VALUES
(2, '화개장터', 'market', '천년의 역사를 지닌 전통 시장', '하동군 화개면', '/images/attractions/hwagae-market.jpg', datetime('now'), datetime('now')),
(2, '쌍계사', 'temple', '지리산의 천년 고찰', '하동군 화개면', '/images/attractions/ssanggyesa.jpg', datetime('now'), datetime('now')),
(2, '하동 야생차문화축제', 'festival', '5월의 차 향기가 가득한 축제', '하동군 일원', '/images/attractions/hadong-tea-festival.jpg', datetime('now'), datetime('now')),
(2, '십리벚꽃길', 'nature', '봄의 낭만이 피어나는 길', '하동군 화개면', '/images/attractions/cherry-blossom-road.jpg', datetime('now'), datetime('now'));

-- 보성 관광지
INSERT INTO attractions (region_id, name, type, description, address, main_image, created_at, updated_at) VALUES
(5, '한국차박물관', 'museum', '한국 차 문화의 모든 것', '보성군 보성읍', '/images/attractions/tea-museum.jpg', datetime('now'), datetime('now')),
(5, '대한다원', 'nature', '초록 물결이 일렁이는 차밭', '보성군 보성읍', '/images/attractions/daehan-tea-garden.jpg', datetime('now'), datetime('now')),
(5, '보성차밭 빛축제', 'festival', '가을밤을 수놓는 빛의 향연', '보성군 보성읍', '/images/attractions/boseong-light-festival.jpg', datetime('now'), datetime('now')),
(5, '율포해수욕장', 'nature', '녹차와 바다가 만나는 곳', '보성군 회천면', '/images/attractions/yulpo-beach.jpg', datetime('now'), datetime('now'));

-- 강진 관광지
INSERT INTO attractions (region_id, name, type, description, address, main_image, created_at, updated_at) VALUES
(6, '다산초당', 'historic', '다산 정약용의 유배지', '강진군 도암면', '/images/attractions/dasan-chodang.jpg', datetime('now'), datetime('now')),
(6, '백련사', 'temple', '차와 함께하는 명상', '강진군 도암면', '/images/attractions/baengnyeonsa.jpg', datetime('now'), datetime('now')),
(6, '강진 청자박물관', 'museum', '고려청자의 아름다움', '강진군 대구면', '/images/attractions/celadon-museum.jpg', datetime('now'), datetime('now')),
(6, '강진만 생태공원', 'nature', '갯벌과 철새의 낙원', '강진군 강진읍', '/images/attractions/gangjin-eco-park.jpg', datetime('now'), datetime('now'));

-- 이천 관광지
INSERT INTO attractions (region_id, name, type, description, address, main_image, created_at, updated_at) VALUES
(10, '이천 도자기마을', 'market', '도예가들의 작품을 만나다', '이천시 신둔면', '/images/attractions/icheon-pottery-village.jpg', datetime('now'), datetime('now')),
(10, '이천 세라피아', 'museum', '현대 도자문화의 중심', '이천시 경충대로', '/images/attractions/cerapia.jpg', datetime('now'), datetime('now')),
(10, '이천 쌀 문화축제', 'festival', '임금님표 이천쌀의 향연', '이천시 일원', '/images/attractions/icheon-rice-festival.jpg', datetime('now'), datetime('now'));

-- 경기 광주 관광지
INSERT INTO attractions (region_id, name, type, description, address, main_image, created_at, updated_at) VALUES
(9, '경기도자박물관', 'museum', '한국 도자의 역사와 현재', '광주시 곤지암읍', '/images/attractions/gg-ceramic-museum.jpg', datetime('now'), datetime('now')),
(9, '남한산성', 'historic', 'UNESCO 세계문화유산', '광주시 남한산성면', '/images/attractions/namhansanseong.jpg', datetime('now'), datetime('now')),
(9, '곤지암도자공원', 'park', '도자기와 자연의 조화', '광주시 곤지암읍', '/images/attractions/gonjiam-ceramic-park.jpg', datetime('now'), datetime('now'));

-- 부안 관광지
INSERT INTO attractions (region_id, name, type, description, address, main_image, created_at, updated_at) VALUES
(8, '부안 청자박물관', 'museum', '고려청자의 맥을 잇다', '부안군 보안면', '/images/attractions/buan-celadon-museum.jpg', datetime('now'), datetime('now')),
(8, '변산반도 국립공원', 'nature', '서해의 절경을 만나다', '부안군 변산면', '/images/attractions/byeonsanbando.jpg', datetime('now'), datetime('now')),
(13, '부안 옹기종기축제', 'festival', '전통 옹기의 재발견', '부안군 보안면', '/images/attractions/buan-onggi-festival.jpg', datetime('now'), datetime('now'));

-- === 체험 프로그램 (Experiences) ===
INSERT INTO experiences (region_id, producer_id, name, type, description, duration, price, max_participants, main_image, is_available, created_at, updated_at) VALUES
-- 차 체험
(1, 1, '제주 차밭 투어 & 티 테이스팅', 'tea_experience', '청정 제주 차밭을 둘러보고 다양한 차를 시음하는 프로그램', 120, 35000, 15, '/images/experiences/jeju-tea-tour.jpg', 1, datetime('now'), datetime('now')),
(2, 2, '하동 전통 제다 체험', 'tea_experience', '전통 방식으로 차를 만들어보는 체험', 180, 45000, 10, '/images/experiences/hadong-tea-making.jpg', 1, datetime('now'), datetime('now')),
(5, 3, '보성 차밭 힐링 워크', 'tea_experience', '초록 차밭을 걸으며 차 명상과 티 세러머니 체험', 90, 28000, 20, '/images/experiences/boseong-healing-walk.jpg', 1, datetime('now'), datetime('now')),
(6, 4, '다산의 차 문화 체험', 'tea_experience', '다산 정약용의 차 문화를 배우고 체험하는 프로그램', 150, 38000, 12, '/images/experiences/gangjin-dasan-tea.jpg', 1, datetime('now'), datetime('now'));

-- 공예 체험
INSERT INTO experiences (region_id, producer_id, name, type, description, duration, price, max_participants, main_image, is_available, created_at, updated_at) VALUES
(10, 5, '이천 도자기 물레 체험', 'craft_experience', '전통 물레로 나만의 찻잔 만들기', 120, 42000, 8, '/images/experiences/icheon-pottery.jpg', 1, datetime('now'), datetime('now')),
(9, 6, '광주 분청사기 체험', 'craft_experience', '전통 분청사기 기법으로 다기 만들기', 150, 48000, 6, '/images/experiences/gwangju-buncheong.jpg', 1, datetime('now'), datetime('now')),
(14, 8, '강진 청자 빚기', 'craft_experience', '고려청자 재현 기법으로 청자 제작', 180, 55000, 8, '/images/experiences/gangjin-celadon-making.jpg', 1, datetime('now'), datetime('now')),
(13, 10, '부안 옹기 만들기', 'craft_experience', '전통 옹기 제작 체험', 150, 38000, 10, '/images/experiences/buan-onggi-making.jpg', 1, datetime('now'), datetime('now'));

-- 복합 체험
INSERT INTO experiences (region_id, producer_id, name, type, description, duration, price, max_participants, main_image, is_available, created_at, updated_at) VALUES
(1, 1, '제주 차&공예 힐링 투어', 'combined', '차 체험과 제주 도자기 공방 방문을 결합한 1일 프로그램', 360, 85000, 12, '/images/experiences/jeju-combined.jpg', 1, datetime('now'), datetime('now'));

-- === 체험 일정 (Experience Schedules) ===
-- 제주 차밭 투어 (매주 수, 토)
INSERT INTO experience_schedules (experience_id, available_date, start_time, end_time, current_participants, created_at, updated_at) VALUES
(1, '2026-02-08', '10:00', '12:00', 8, datetime('now'), datetime('now')),
(1, '2026-02-11', '14:00', '16:00', 5, datetime('now'), datetime('now')),
(1, '2026-02-15', '10:00', '12:00', 12, datetime('now'), datetime('now')),
(1, '2026-02-18', '14:00', '16:00', 3, datetime('now'), datetime('now'));

-- 하동 전통 제다 체험 (매주 토, 일)
INSERT INTO experience_schedules (experience_id, available_date, start_time, end_time, current_participants, created_at, updated_at) VALUES
(2, '2026-02-08', '09:00', '12:00', 6, datetime('now'), datetime('now')),
(2, '2026-02-09', '09:00', '12:00', 4, datetime('now'), datetime('now')),
(2, '2026-02-15', '09:00', '12:00', 8, datetime('now'), datetime('now')),
(2, '2026-02-16', '09:00', '12:00', 2, datetime('now'), datetime('now'));

-- 보성 차밭 힐링 워크 (매일)
INSERT INTO experience_schedules (experience_id, available_date, start_time, end_time, current_participants, created_at, updated_at) VALUES
(3, '2026-02-08', '10:00', '11:30', 15, datetime('now'), datetime('now')),
(3, '2026-02-08', '14:00', '15:30', 10, datetime('now'), datetime('now')),
(3, '2026-02-09', '10:00', '11:30', 8, datetime('now'), datetime('now')),
(3, '2026-02-09', '14:00', '15:30', 12, datetime('now'), datetime('now'));

-- 이천 도자기 물레 체험 (매주 목, 금, 토)
INSERT INTO experience_schedules (experience_id, available_date, start_time, end_time, current_participants, created_at, updated_at) VALUES
(5, '2026-02-06', '10:00', '12:00', 5, datetime('now'), datetime('now')),
(5, '2026-02-07', '14:00', '16:00', 3, datetime('now'), datetime('now')),
(5, '2026-02-08', '10:00', '12:00', 7, datetime('now'), datetime('now')),
(5, '2026-02-13', '14:00', '16:00', 4, datetime('now'), datetime('now'));

-- 광주 분청사기 체험 (매주 토, 일)
INSERT INTO experience_schedules (experience_id, available_date, start_time, end_time, current_participants, created_at, updated_at) VALUES
(6, '2026-02-08', '10:00', '12:30', 4, datetime('now'), datetime('now')),
(6, '2026-02-09', '14:00', '16:30', 2, datetime('now'), datetime('now')),
(6, '2026-02-15', '10:00', '12:30', 5, datetime('now'), datetime('now'));

-- 강진 청자 빚기 (매주 토)
INSERT INTO experience_schedules (experience_id, available_date, start_time, end_time, current_participants, created_at, updated_at) VALUES
(7, '2026-02-08', '09:00', '12:00', 6, datetime('now'), datetime('now')),
(7, '2026-02-15', '09:00', '12:00', 4, datetime('now'), datetime('now')),
(7, '2026-02-22', '09:00', '12:00', 3, datetime('now'), datetime('now'));

-- 부안 옹기 만들기 (매주 일)
INSERT INTO experience_schedules (experience_id, available_date, start_time, end_time, current_participants, created_at, updated_at) VALUES
(8, '2026-02-09', '10:00', '12:30', 7, datetime('now'), datetime('now')),
(8, '2026-02-16', '10:00', '12:30', 5, datetime('now'), datetime('now')),
(8, '2026-02-23', '10:00', '12:30', 2, datetime('now'), datetime('now'));

-- 제주 차&공예 힐링 투어 (매주 토)
INSERT INTO experience_schedules (experience_id, available_date, start_time, end_time, current_participants, created_at, updated_at) VALUES
(9, '2026-02-08', '09:00', '15:00', 10, datetime('now'), datetime('now')),
(9, '2026-02-15', '09:00', '15:00', 8, datetime('now'), datetime('now')),
(9, '2026-02-22', '09:00', '15:00', 6, datetime('now'), datetime('now'));

-- === 교육 신청 샘플 데이터 (Education Applications) ===
INSERT INTO education_applications (name, phone, email, preferred_date, preferred_time, participants, message, status, created_at, updated_at) VALUES
('김민수', '010-1234-5678', 'minsu@example.com', '2026-02-15', 'morning', 2, '차에 관심이 많아 신청합니다.', 'pending', datetime('now'), datetime('now')),
('이지은', '010-2345-6789', 'jieun@example.com', '2026-02-20', 'afternoon', 4, '가족과 함께 체험하고 싶습니다.', 'pending', datetime('now'), datetime('now')),
('박준호', '010-3456-7890', 'junho@example.com', '2026-02-18', 'morning', 1, '전통 제다법을 배우고 싶습니다.', 'confirmed', datetime('now'), datetime('now')),
('최수연', '010-4567-8901', 'sooyeon@example.com', '2026-02-25', 'afternoon', 3, '도자기 만들기 체험 문의합니다.', 'pending', datetime('now'), datetime('now')),
('정우진', '010-5678-9012', 'woojin@example.com', '2026-02-12', 'morning', 2, '청자 빚기에 관심있습니다.', 'confirmed', datetime('now'), datetime('now')),
('한서영', '010-6789-0123', 'seoyoung@example.com', '2026-02-22', 'afternoon', 5, '단체 체험 가능한가요?', 'pending', datetime('now'), datetime('now')),
('강동현', '010-7890-1234', 'donghyun@example.com', '2026-02-28', 'morning', 1, '차 문화에 대해 배우고 싶습니다.', 'pending', datetime('now'), datetime('now')),
('윤하나', '010-8901-2345', 'hana@example.com', '2026-02-14', 'afternoon', 2, '발렌타인데이 특별 체험 희망합니다.', 'confirmed', datetime('now'), datetime('now')),
('오준석', '010-9012-3456', 'junseok@example.com', '2026-02-19', 'morning', 3, '가족 체험 프로그램 문의', 'pending', datetime('now'), datetime('now')),
('임수빈', '010-0123-4567', 'subin@example.com', '2026-02-26', 'afternoon', 1, '초보자도 가능한가요?', 'pending', datetime('now'), datetime('now')),
('송민지', '010-1111-2222', 'minji@example.com', '2026-02-11', 'morning', 4, '회사 워크샵으로 이용하고 싶습니다.', 'confirmed', datetime('now'), datetime('now')),
('배준영', '010-2222-3333', 'junyoung@example.com', '2026-02-17', 'afternoon', 2, '제주 힐링 투어 신청합니다.', 'pending', datetime('now'), datetime('now')),
('남궁민', '010-3333-4444', 'namgung@example.com', '2026-02-24', 'morning', 1, '1:1 맞춤 교육 가능한가요?', 'pending', datetime('now'), datetime('now')),
('서지혜', '010-4444-5555', 'jihye@example.com', '2026-02-13', 'afternoon', 3, '친구들과 함께 체험하려고 합니다.', 'confirmed', datetime('now'), datetime('now')),
('황태양', '010-5555-6666', 'taeyang@example.com', '2026-02-21', 'morning', 2, '전통 옹기 체험 문의합니다.', 'pending', datetime('now'), datetime('now')),
('문가영', '010-6666-7777', 'gayoung@example.com', '2026-02-27', 'afternoon', 1, '차 명상 프로그램 신청합니다.', 'pending', datetime('now'), datetime('now'));

-- Re-enable foreign key checks
PRAGMA foreign_keys = ON;
