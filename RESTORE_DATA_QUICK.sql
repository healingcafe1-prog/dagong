-- ============================================
-- 빠른 데이터 복원 SQL
-- Cloudflare D1 Console에서 실행하세요
-- https://dash.cloudflare.com/.../workers/d1/ef76dccd-be5f-476b-851c-f9503f18dd53
-- ============================================

-- Step 1: 기존 데이터 삭제
DELETE FROM education_applications;
DELETE FROM experience_schedules;
DELETE FROM experiences;
DELETE FROM attractions;
DELETE FROM event_products;
DELETE FROM events;
DELETE FROM gift_set_items;
DELETE FROM product_images;
DELETE FROM products;
DELETE FROM producers;
DELETE FROM categories;
DELETE FROM regions;

-- Step 2: 지역 데이터 삽입 (Regions)
INSERT INTO regions (name, type, description, featured_image) VALUES
('제주도', 'tea', '청정 자연환경에서 자라는 제주 녹차의 고향', '/images/regions/jeju.jpg'),
('하동', 'tea', '천년의 역사를 지닌 한국 차문화의 중심지', '/images/regions/hadong.jpg'),
('김해', 'tea', '가야의 전통을 이어받은 차의 명산지', '/images/regions/gimhae.jpg'),
('광양', 'tea', '섬진강이 흐르는 청정 차밭의 고장', '/images/regions/gwangyang.jpg'),
('보성', 'tea', '아름다운 차밭 경관으로 유명한 녹차의 수도', '/images/regions/boseong.jpg'),
('강진', 'tea', '다산 정약용의 차문화가 살아있는 곳', '/images/regions/gangjin.jpg'),
('장흥', 'tea', '청정 남해안의 차밭이 펼쳐진 지역', '/images/regions/jangheung.jpg'),
('부안', 'tea', '변산반도의 맑은 공기 속에서 자라는 차', '/images/regions/buan.jpg'),
('경기 광주', 'craft', '500년 전통의 도자기 명가', '/images/regions/gwangju-craft.jpg'),
('이천', 'craft', '세계적으로 유명한 도자기 예술의 본고장', '/images/regions/icheon.jpg'),
('여주', 'craft', '우아한 백자의 전통을 계승하는 도자기 마을', '/images/regions/yeoju.jpg'),
('청주', 'craft', '청화백자의 명성을 이어가는 공예의 도시', '/images/regions/cheongju.jpg'),
('부안', 'craft', '변산반도의 전통 옹기와 도자 공예의 고장', '/images/regions/buan-craft.jpg'),
('강진', 'craft', '고려청자의 발상지, 천년 도자 예술의 본향', '/images/regions/gangjin-craft.jpg'),
('문경', 'craft', '전통 사기와 도자기의 명맥을 잇는 공예의 고장', '/images/regions/mungyeong.jpg');

-- Step 3: 카테고리 데이터 삽입 (Categories)
INSERT INTO categories (name, parent_id, type, description, display_order) VALUES
-- 차 카테고리
('녹차', NULL, 'tea', '신선하고 상쾌한 한국 전통 녹차', 1),
('황차', NULL, 'tea', '은은한 향과 부드러운 맛의 황차', 2),
('홍차', NULL, 'tea', '깊고 풍부한 향의 발효 홍차', 3),
('발효차', NULL, 'tea', '숙성된 맛과 향의 발효차', 4),
('말차', NULL, 'tea', '고급 녹차를 분말로 만든 말차', 5),
('블렌딩차', NULL, 'tea', '여러 차를 조화롭게 블렌딩한 차', 6),
('허브차', NULL, 'tea', '건강과 힐링을 위한 허브 블렌딩 차', 7),
-- 공예 카테고리
('찻잔', NULL, 'craft', '차를 마시기 위한 전통 도자기', 1),
('다관', NULL, 'craft', '차를 우리는 전통 찻주전자', 2),
('다기세트', NULL, 'craft', '차를 즐기기 위한 완벽한 다기 세트', 3),
('장식 도자기', NULL, 'craft', '인테리어를 위한 예술 도자기', 4),
('목공예', NULL, 'craft', '나무로 만든 전통 공예품', 5),
-- 선물세트 카테고리
('명절 선물세트', NULL, 'gift', '명절을 위한 특별한 선물', 1),
('프리미엄 선물세트', NULL, 'gift', '고급스러운 차와 공예품 조합', 2),
('입문자 선물세트', NULL, 'gift', '차문화를 시작하는 분들을 위한 세트', 3),
('기업 선물세트', NULL, 'gift', '비즈니스 선물을 위한 세트', 4),
-- 지역 특산품 카테고리
('농산물', NULL, 'local', '신선한 지역 농산물', 1),
('가공식품', NULL, 'local', '전통 방식으로 만든 가공식품', 2),
('수산물', NULL, 'local', '신선한 지역 수산물', 3),
('축산물', NULL, 'local', '건강하게 키운 축산물', 4);

-- Step 4: 생산자 데이터 삽입 (Producers)
INSERT INTO producers (name, region_id, producer_type, description, profile_image) VALUES
-- 차 생산자
('화계제다', 2, 'tea', '지리산 자락에서 전통 제다법을 고수하는 명가', '/images/producers/hwagye.jpg'),
('보성차농원', 5, 'tea', '보성 녹차의 우수성을 세계에 알리는 선두주자', '/images/producers/boseong-tea.jpg'),
('제주첫차', 1, 'tea', '제주도의 청정함을 담은 프리미엄 차', '/images/producers/jeju-first-tea.jpg'),
('강진다원', 6, 'tea', '다산 정약용의 차 정신을 계승하는 다원', '/images/producers/gangjin-tea.jpg'),
('광양차밭', 4, 'tea', '섬진강변의 청정 차밭에서 정성스럽게 기른 차', '/images/producers/gwangyang-tea.jpg'),
-- 공예 생산자
('이천도예명가', 10, 'craft', '전통과 현대의 조화를 추구하는 도예 명가', '/images/producers/icheon-pottery.jpg'),
('광주분청사기', 9, 'craft', '500년 전통의 분청사기 기법을 계승', '/images/producers/gwangju-buncheong.jpg'),
('여주백자공방', 11, 'craft', '순백의 아름다움을 담은 전통 백자', '/images/producers/yeoju-white.jpg'),
('강진청자', 14, 'craft', '고려청자의 비색을 재현하는 명인', '/images/producers/gangjin-celadon.jpg'),
('문경전통사기', 15, 'craft', '서민의 정감이 담긴 전통 사기', '/images/producers/mungyeong-pottery.jpg');

-- Step 5: Featured 상품 데이터 삽입 (최소한의 데이터)
INSERT INTO products (name, category_id, producer_id, product_type, description, original_price, price, discount_rate, stock_quantity, main_image, is_featured, is_available) VALUES
-- 차 상품 (Featured)
('제주 첫차 우전 50g', 1, 3, 'tea', '제주도의 청정 자연에서 자란 올해 첫 차의 어린 잎만을 정성스럽게 따서 만든 프리미엄 우전. 깊은 향과 부드러운 맛이 특징입니다.', 30000, 28000, 7, 50, '/images/products/jeju-first-tea.jpg', 1, 1),
('하동 야생차 100g', 1, 1, 'tea', '지리산 자락의 야생차나무에서 채취한 귀한 차. 천년의 자연이 빚어낸 깊은 맛과 향이 일품입니다.', 50000, 45000, 10, 30, '/images/products/hadong-wild-tea.jpg', 1, 1),
('보성 유기농 녹차 100g', 1, 2, 'tea', '보성의 청정 차밭에서 유기농으로 재배한 녹차. 신선하고 깊은 맛이 특징입니다.', 35000, 32000, 9, 100, '/images/products/boseong-organic-tea.jpg', 1, 1),
-- 공예 상품 (Featured)
('이천 백자 찻잔 세트 (4p)', 8, 6, 'craft', '정갈한 백자의 아름다움을 담은 찻잔 세트. 현대적 감각과 전통미가 조화를 이룬 작품입니다.', 80000, 75000, 6, 15, '/images/products/icheon-teacup-set.jpg', 1, 1),
('광주 분청 다관', 9, 7, 'craft', '500년 전통의 분청사기 기법으로 제작한 다관. 투박하면서도 세련된 멋이 살아있습니다.', 120000, 110000, 8, 10, '/images/products/gwangju-teapot.jpg', 1, 1),
('강진 청자 다기세트', 10, 9, 'craft', '고려청자의 비색을 재현한 프리미엄 다기세트. 전통의 품격을 현대에 되살린 명품입니다.', 300000, 280000, 7, 5, '/images/products/gangjin-tea-set.jpg', 1, 1);

-- Step 6: 이벤트 데이터 삽입 (Events)
INSERT INTO events (title, description, event_type, discount_rate, start_date, end_date, is_active) VALUES
('신규 회원 가입 혜택', '신규 가입 시 첫 구매 15% 할인', 'discount', 15, '2026-02-01', '2026-02-28', 1),
('봄맞이 특가', '봄맞이 특가 상품 모음', 'season', 20, '2026-02-01', '2026-03-31', 1),
('생산자 직거래 페스티벌', '생산자와 직접 만나는 기회', 'festival', 0, '2026-02-15', '2026-02-28', 1);

-- Step 7: 이벤트-상품 연결 (Event Products)
INSERT INTO event_products (event_id, product_id) VALUES
-- 봄맞이 특가 이벤트 (모든 Featured 상품)
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6),
-- 생산자 직거래 페스티벌 (차 상품만)
(3, 1), (3, 2), (3, 3);

-- 확인 쿼리
SELECT 'Data restored successfully!' as status;
SELECT COUNT(*) as regions_count FROM regions;
SELECT COUNT(*) as categories_count FROM categories;
SELECT COUNT(*) as producers_count FROM producers;
SELECT COUNT(*) as products_count FROM products;
SELECT COUNT(*) as featured_products FROM products WHERE is_featured = 1;
SELECT COUNT(*) as events_count FROM events WHERE is_active = 1;
