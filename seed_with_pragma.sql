-- Foreign key 제약 임시 비활성화
PRAGMA foreign_keys = OFF;

-- 기존 데이터 삭제
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

-- 차산지 지역 데이터
INSERT INTO regions (name, type, description, featured_image) VALUES
('제주도', 'tea', '청정 자연환경에서 자라는 제주 녹차의 고향', '/images/regions/jeju.jpg'),
('하동', 'tea', '천년의 역사를 지닌 한국 차문화의 중심지', '/images/regions/hadong.jpg'),
('김해', 'tea', '가야의 전통을 이어받은 차의 명산지', '/images/regions/gimhae.jpg'),
('광양', 'tea', '섬진강이 흐르는 청정 차밭의 고장', '/images/regions/gwangyang.jpg'),
('보성', 'tea', '아름다운 차밭 경관으로 유명한 녹차의 수도', '/images/regions/boseong.jpg'),
('강진', 'tea', '다산 정약용의 차문화가 살아있는 곳', '/images/regions/gangjin.jpg'),
('장흥', 'tea', '청정 남해안의 차밭이 펼쳐진 지역', '/images/regions/jangheung.jpg'),
('부안', 'tea', '변산반도의 맑은 공기 속에서 자라는 차', '/images/regions/buan.jpg');

-- 공예산지 지역 데이터
INSERT INTO regions (name, type, description, featured_image) VALUES
('경기 광주', 'craft', '500년 전통의 도자기 명가', '/images/regions/gwangju-craft.jpg'),
('이천', 'craft', '세계적으로 유명한 도자기 예술의 본고장', '/images/regions/icheon.jpg'),
('여주', 'craft', '우아한 백자의 전통을 계승하는 도자기 마을', '/images/regions/yeoju.jpg'),
('청주', 'craft', '청화백자의 명성을 이어가는 공예의 도시', '/images/regions/cheongju.jpg'),
('부안', 'craft', '변산반도의 전통 옹기와 도자 공예의 고장', '/images/regions/buan-craft.jpg'),
('강진', 'craft', '고려청자의 발상지, 천년 도자 예술의 본향', '/images/regions/gangjin-craft.jpg'),
('문경', 'craft', '전통 사기와 도자기의 명맥을 잇는 공예의 고장', '/images/regions/mungyeong.jpg');

-- 카테고리 데이터
INSERT INTO categories (name, parent_id, type, description) VALUES
-- 차 카테고리
('녹차', NULL, 'tea', '신선하고 상쾌한 한국 전통 녹차'),
('황차', NULL, 'tea', '은은한 향과 부드러운 맛의 황차'),
('홍차', NULL, 'tea', '깊고 풍부한 향의 발효 홍차'),
('발효차', NULL, 'tea', '숙성된 맛과 향의 발효차'),
('말차', NULL, 'tea', '고급 녹차를 분말로 만든 말차'),
('블렌딩차', NULL, 'tea', '여러 차를 조화롭게 블렌딩한 차'),
('허브차', NULL, 'tea', '건강과 힐링을 위한 허브 블렌딩 차'),

-- 공예 카테고리
('찻잔', NULL, 'craft', '차를 마시기 위한 전통 도자기'),
('다관', NULL, 'craft', '차를 우리는 전통 찻주전자'),
('다기세트', NULL, 'craft', '차를 즐기기 위한 완벽한 다기 세트'),
('장식 도자기', NULL, 'craft', '인테리어를 위한 예술 도자기'),
('목공예', NULL, 'craft', '나무로 만든 전통 공예품'),

-- 선물세트 카테고리
('명절 선물세트', NULL, 'gift', '명절을 위한 특별한 선물'),
('프리미엄 선물세트', NULL, 'gift', '고급스러운 차와 공예품 조합'),
('입문자 선물세트', NULL, 'gift', '차문화를 시작하는 분들을 위한 세트'),
('기업 선물세트', NULL, 'gift', '비즈니스 선물을 위한 세트'),

-- 지역 특산품 카테고리
('농산물', NULL, 'local', '신선한 지역 농산물'),
('가공식품', NULL, 'local', '전통 방식으로 만든 가공식품'),
('수산물', NULL, 'local', '신선한 지역 수산물'),
('축산물', NULL, 'local', '건강하게 키운 축산물'),
('기타 특산품', NULL, 'local', '지역의 독특한 특산품');

-- 생산자 데이터 (차)
INSERT INTO producers (name, region_id, producer_type, description, story, profile_image, contact_email, contact_phone, address) VALUES
('제주 설록다원', 1, 'tea', '제주의 청정 자연에서 자란 유기농 녹차를 생산합니다', '1983년부터 제주의 맑은 공기와 화산토에서 건강한 차를 키워왔습니다', '/images/producers/seolrok.jpg', 'seolrok@example.com', '064-123-4567', '제주시 한림읍'),
('하동 야생차 농원', 2, 'tea', '지리산 자락의 천년 야생차를 전통 방식으로 만듭니다', '조상 대대로 내려온 야생 차나무를 정성껏 가꿔왔습니다', '/images/producers/hadong.jpg', 'hadong@example.com', '055-880-1234', '하동군 화개면'),
('보성 대한다원', 5, 'tea', '국내 최대 규모의 차밭에서 품질 좋은 녹차를 생산합니다', '1957년 설립 이후 한국 녹차 산업을 선도해왔습니다', '/images/producers/boseong.jpg', 'boseong@example.com', '061-852-1234', '보성군 보성읍'),
('강진 백운옥판차', 6, 'tea', '다산 선생의 차문화를 현대에 계승합니다', '전통 제차법으로 만든 고품질 녹차를 생산합니다', '/images/producers/gangjin.jpg', 'gangjin@example.com', '061-432-1234', '강진군 성전면');

-- 생산자 데이터 (공예)
INSERT INTO producers (name, region_id, producer_type, description, story, profile_image, contact_email, contact_phone, address) VALUES
('광주 사기장', 9, 'craft', '500년 전통의 분청사기를 현대적으로 재해석합니다', '조선시대부터 내려온 도자기 제작 기법을 보존하고 있습니다', '/images/producers/gwangju-pottery.jpg', 'gwangju@example.com', '031-762-1234', '광주시 남한산성면'),
('이천 백자공방', 10, 'craft', '세계적 수준의 백자를 만드는 명인의 공방', '대를 이어 백자만을 고집하며 작품을 만들고 있습니다', '/images/producers/icheon-pottery.jpg', 'icheon@example.com', '031-634-1234', '이천시 신둔면'),
('여주 도예촌', 11, 'craft', '현대적 감각의 다기를 제작하는 젊은 도예가들의 공방', '전통과 현대를 조화시킨 실용적인 다기를 만듭니다', '/images/producers/yeoju-pottery.jpg', 'yeoju@example.com', '031-884-1234', '여주시 점동면'),
('부안 옹기마을', 13, 'craft', '변산반도의 전통 옹기를 만드는 장인들의 협동 작업장', '300년 전통의 옹기 제작 기법을 이어가고 있습니다', '/images/producers/buan-pottery.jpg', 'buan@example.com', '063-582-1234', '부안군 보안면'),
('강진 청자촌', 14, 'craft', '고려청자를 복원하고 현대적으로 재해석하는 명장', '천년 전통의 고려청자 기법을 계승하고 발전시키고 있습니다', '/images/producers/gangjin-celadon.jpg', 'gangjin-craft@example.com', '061-430-3755', '강진군 대구면'),
('문경 사기장', 15, 'craft', '문경 전통 사기의 맥을 잇는 도예 명장', '400년 넘게 이어온 문경 사기의 전통을 현대에 계승하고 있습니다', '/images/producers/mungyeong-pottery.jpg', 'mungyeong@example.com', '054-571-1234', '문경시 가은읍');

-- 생산자 데이터 (지역 농민)
INSERT INTO producers (name, region_id, producer_type, description, story, profile_image, contact_email, contact_phone, address) VALUES
('제주 한라산 감귤농장', 1, 'local', '제주 청정 자연에서 자란 달콤한 감귤을 재배합니다', '3대째 이어온 감귤 농사로 품질 좋은 감귤만을 생산합니다', '/images/producers/jeju-citrus.jpg', 'citrus@example.com', '064-756-1234', '제주시 애월읍'),
('하동 섬진강 재첩마을', 2, 'local', '맑은 섬진강에서 자란 싱싱한 재첩을 생산합니다', '청정 섬진강의 재첩으로 건강을 전합니다', '/images/producers/hadong-jaechup.jpg', 'jaechup@example.com', '055-880-5678', '하동군 하동읍'),
('보성 녹차쌀 농가', 5, 'local', '녹차를 먹여 키운 친환경 녹차쌀을 재배합니다', '녹차밭 주변에서 재배한 향긋한 쌀입니다', '/images/producers/boseong-rice.jpg', 'rice@example.com', '061-852-5678', '보성군 회천면'),
('강진 한우목장', 6, 'local', '청정 지역에서 정성껏 키운 한우를 생산합니다', '좋은 사료와 깨끗한 환경에서 건강하게 키운 한우', '/images/producers/gangjin-beef.jpg', 'beef@example.com', '061-432-5678', '강진군 칠량면'),
('부안 천일염 생산', 8, 'local', '변산반도 갯벌에서 만든 천일염을 생산합니다', '미네랄이 풍부한 청정 갯벌 천일염', '/images/producers/buan-salt.jpg', 'salt@example.com', '063-582-5678', '부안군 진서면');

-- 상품 데이터 (차) - is_featured = 1로 설정
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured) VALUES
('제주 유기농 첫물차', 1, 1, '봄에 첫 수확한 어린 찻잎으로 만든 프리미엄 녹차', 35000, 50, '/images/products/jeju-first-tea.jpg', 'tea', '50g', '제주도', 1),
('하동 야생 녹차', 1, 2, '지리산 자락의 야생 차나무에서 채취한 귀한 녹차', 45000, 30, '/images/products/hadong-wild-tea.jpg', 'tea', '40g', '하동', 1),
('보성 우전차', 1, 3, '곡우 전에 딴 어린 잎으로 만든 최상급 녹차', 28000, 100, '/images/products/boseong-ujeon.jpg', 'tea', '50g', '보성', 1),
('강진 백모단차', 1, 4, '은은한 향과 깊은 맛의 전통 덖음차', 32000, 60, '/images/products/gangjin-tea.jpg', 'tea', '50g', '강진', 1),
('제주 발효 홍차', 3, 1, '제주 녹차를 발효시켜 만든 깊은 맛의 홍차', 38000, 40, '/images/products/jeju-black-tea.jpg', 'tea', '50g', '제주도', 1),
('보성 말차', 5, 3, '고급 녹차를 분말로 만든 프리미엄 말차', 42000, 35, '/images/products/boseong-matcha.jpg', 'tea', '30g', '보성', 1);

-- 상품 데이터 (공예) - is_featured = 1로 설정
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured) VALUES
('백자 찻잔 세트', 8, 6, '순백의 아름다움이 돋보이는 전통 백자 찻잔 5개 세트', 85000, 20, '/images/products/white-teacup-set.jpg', 'craft', '500g', '이천', 1),
('분청사기 다관', 9, 5, '소박한 아름다움의 분청사기 찻주전자', 120000, 15, '/images/products/buncheong-teapot.jpg', 'craft', '400g', '경기 광주', 1),
('청자 찻잔', 8, 7, '은은한 청록색이 아름다운 청자 찻잔', 45000, 30, '/images/products/celadon-teacup.jpg', 'craft', '150g', '여주', 1),
('프리미엄 다기세트', 10, 6, '찻잔, 다관, 찻받침이 포함된 완벽한 다기세트', 250000, 10, '/images/products/premium-tea-set.jpg', 'craft', '2kg', '이천', 1),
('목재 차판', 12, 7, '원목으로 만든 전통 차 우림판', 65000, 25, '/images/products/wooden-tea-tray.jpg', 'craft', '1.5kg', '여주', 0),
('부안 전통 옹기항아리', 9, 8, '숨쉬는 옹기의 특성을 살린 전통 항아리', 95000, 15, '/images/products/buan-onggi.jpg', 'craft', '3kg', '부안', 0),
('강진 고려청자 다완', 8, 9, '천년의 역사를 지닌 고려청자 찻잔', 180000, 8, '/images/products/gangjin-celadon-bowl.jpg', 'craft', '200g', '강진', 1),
('부안 옹기 다관', 9, 8, '옹기로 만든 독특한 찻주전자', 75000, 12, '/images/products/buan-onggi-teapot.jpg', 'craft', '500g', '부안', 0),
('문경 전통 사기 찻잔', 8, 10, '소박하면서도 단단한 문경 전통 사기 찻잔', 55000, 25, '/images/products/mungyeong-teacup.jpg', 'craft', '180g', '문경', 0),
('문경 사기 다기세트', 10, 10, '문경 사기로 만든 실용적인 다기세트', 150000, 12, '/images/products/mungyeong-tea-set.jpg', 'craft', '1.8kg', '문경', 1);

-- 선물세트 데이터
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured) VALUES
('프리미엄 차茶 선물세트', 14, 1, '최상급 녹차와 백자 찻잔이 어우러진 명품 선물세트', 180000, 30, '/images/products/premium-gift-set.jpg', 'gift_set', '1kg', '제주도/이천', 1),
('전통 다례 입문 세트', 15, 2, '차 입문자를 위한 녹차와 다기 기본 세트', 95000, 50, '/images/products/starter-tea-set.jpg', 'gift_set', '800g', '하동/여주', 1),
('명절 감사 선물세트', 13, 3, '추석, 설날을 위한 전통차 모음 선물세트', 120000, 40, '/images/products/holiday-gift-set.jpg', 'gift_set', '600g', '보성', 1);

-- 지역 특산품 데이터
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured) VALUES
('제주 한라봉', 17, 11, '제주의 청정 자연에서 자란 달콤한 한라봉', 35000, 100, '/images/products/jeju-hallabong.jpg', 'local', '5kg', '제주도', 1),
('제주 천혜향', 17, 11, '향긋한 향과 달콤한 맛의 프리미엄 감귤', 32000, 80, '/images/products/jeju-cheonhyehyang.jpg', 'local', '5kg', '제주도', 0),
('보성 녹차쌀', 17, 13, '녹차를 먹여 키운 친환경 쌀', 45000, 50, '/images/products/boseong-rice.jpg', 'local', '10kg', '보성', 1),
('제주 감귤청', 18, 11, '제주 감귤로 만든 천연 청', 18000, 60, '/images/products/jeju-citrus-syrup.jpg', 'local', '500g', '제주도', 0),
('부안 천일염', 18, 15, '미네랄 풍부한 청정 갯벌 천일염', 12000, 150, '/images/products/buan-salt.jpg', 'local', '1kg', '부안', 1),
('강진 매실청', 18, 14, '강진 청매실로 만든 프리미엄 매실청', 28000, 40, '/images/products/gangjin-plum-syrup.jpg', 'local', '1L', '강진', 0),
('하동 재첩', 19, 12, '섬진강 청정 재첩', 25000, 30, '/images/products/hadong-jaechup.jpg', 'local', '1kg', '하동', 1),
('부안 바지락', 19, 15, '갯벌에서 자란 싱싱한 바지락', 15000, 50, '/images/products/buan-clam.jpg', 'local', '1kg', '부안', 0),
('강진 한우 정육세트', 20, 14, '청정 지역에서 키운 한우 1등급', 85000, 20, '/images/products/gangjin-beef-set.jpg', 'local', '2kg', '강진', 1),
('제주 흑돼지 세트', 20, 11, '제주 청정 자연에서 키운 흑돼지', 55000, 25, '/images/products/jeju-black-pork.jpg', 'local', '2kg', '제주도', 1);

-- 이벤트 데이터
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active) VALUES
('신년 맞이 특별 할인', '새해를 맞아 모든 차 제품 20% 할인', 'discount', 20, '/images/events/new-year.jpg', '2026-01-01', '2026-01-31', 1),
('봄 햇차 시즌 이벤트', '올해 첫 수확 햇차 예약 판매 시작', 'season', 15, '/images/events/spring-tea.jpg', '2026-02-01', '2026-04-30', 1),
('장인 초대전', '이천 도예 명인들의 특별 작품 전시', 'new_product', 0, '/images/events/master-exhibition.jpg', '2026-03-01', '2026-03-31', 1);

-- Foreign key 제약 다시 활성화
PRAGMA foreign_keys = ON;
