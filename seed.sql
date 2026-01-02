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
('기업 선물세트', NULL, 'gift', '비즈니스 선물을 위한 세트');

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

-- 상품 데이터 (차)
INSERT INTO products (name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured) VALUES
('제주 유기농 첫물차', 1, 1, '봄에 첫 수확한 어린 찻잎으로 만든 프리미엄 녹차', 35000, 50, '/images/products/jeju-first-tea.jpg', 'tea', '50g', '제주도', 1),
('하동 야생 녹차', 1, 2, '지리산 자락의 야생 차나무에서 채취한 귀한 녹차', 45000, 30, '/images/products/hadong-wild-tea.jpg', 'tea', '40g', '하동', 1),
('보성 우전차', 1, 3, '곡우 전에 딴 어린 잎으로 만든 최상급 녹차', 28000, 100, '/images/products/boseong-ujeon.jpg', 'tea', '50g', '보성', 0),
('강진 백모단차', 1, 4, '은은한 향과 깊은 맛의 전통 덖음차', 32000, 60, '/images/products/gangjin-tea.jpg', 'tea', '50g', '강진', 0),
('제주 발효 홍차', 2, 1, '제주 녹차를 발효시켜 만든 깊은 맛의 홍차', 38000, 40, '/images/products/jeju-black-tea.jpg', 'tea', '50g', '제주도', 1),
('보성 말차', 4, 3, '고급 녹차를 분말로 만든 프리미엄 말차', 42000, 35, '/images/products/boseong-matcha.jpg', 'tea', '30g', '보성', 0);

-- 상품 데이터 (공예)
INSERT INTO products (name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured) VALUES
('백자 찻잔 세트', 6, 6, '순백의 아름다움이 돋보이는 전통 백자 찻잔 5개 세트', 85000, 20, '/images/products/white-teacup-set.jpg', 'craft', '500g', '이천', 1),
('분청사기 다관', 7, 5, '소박한 아름다움의 분청사기 찻주전자', 120000, 15, '/images/products/buncheong-teapot.jpg', 'craft', '400g', '경기 광주', 1),
('청자 찻잔', 6, 7, '은은한 청록색이 아름다운 청자 찻잔', 45000, 30, '/images/products/celadon-teacup.jpg', 'craft', '150g', '여주', 0),
('프리미엄 다기세트', 8, 6, '찻잔, 다관, 찻받침이 포함된 완벽한 다기세트', 250000, 10, '/images/products/premium-tea-set.jpg', 'craft', '2kg', '이천', 1),
('목재 차판', 10, 7, '원목으로 만든 전통 차 우림판', 65000, 25, '/images/products/wooden-tea-tray.jpg', 'craft', '1.5kg', '여주', 0),
('부안 전통 옹기항아리', 7, 8, '숨쉬는 옹기의 특성을 살린 전통 항아리', 95000, 15, '/images/products/buan-onggi.jpg', 'craft', '3kg', '부안', 0),
('강진 고려청자 다완', 6, 9, '천년의 역사를 지닌 고려청자 찻잔', 180000, 8, '/images/products/gangjin-celadon-bowl.jpg', 'craft', '200g', '강진', 1),
('부안 옹기 다관', 7, 8, '옹기로 만든 독특한 찻주전자', 75000, 12, '/images/products/buan-onggi-teapot.jpg', 'craft', '500g', '부안', 0),
('문경 전통 사기 찻잔', 6, 10, '소박하면서도 단단한 문경 전통 사기 찻잔', 55000, 25, '/images/products/mungyeong-teacup.jpg', 'craft', '180g', '문경', 0),
('문경 사기 다기세트', 8, 10, '문경 사기로 만든 실용적인 다기세트', 150000, 12, '/images/products/mungyeong-tea-set.jpg', 'craft', '1.8kg', '문경', 1);

-- 선물세트 데이터
INSERT INTO products (name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured) VALUES
('프리미엄 차茶 선물세트', 12, 1, '최상급 녹차와 백자 찻잔이 어우러진 명품 선물세트', 180000, 30, '/images/products/premium-gift-set.jpg', 'gift_set', '1kg', '제주도/이천', 1),
('전통 다례 입문 세트', 13, 2, '차 입문자를 위한 녹차와 다기 기본 세트', 95000, 50, '/images/products/starter-tea-set.jpg', 'gift_set', '800g', '하동/여주', 0),
('명절 감사 선물세트', 11, 3, '추석, 설날을 위한 전통차 모음 선물세트', 120000, 40, '/images/products/holiday-gift-set.jpg', 'gift_set', '600g', '보성', 0);

-- 선물세트 구성품
INSERT INTO gift_set_items (gift_set_id, product_id, quantity) VALUES
(12, 1, 2),  -- 프리미엄 선물세트: 제주 첫물차 2개
(12, 7, 1),  -- 프리미엄 선물세트: 백자 찻잔 세트 1개
(13, 3, 1),  -- 입문 세트: 보성 우전차 1개
(13, 9, 1),  -- 입문 세트: 청자 찻잔 1개
(14, 1, 1),  -- 명절 선물세트: 제주 첫물차 1개
(14, 4, 1),  -- 명절 선물세트: 강진 백모단차 1개
(14, 5, 1);  -- 명절 선물세트: 제주 발효 홍차 1개

-- 이벤트 데이터
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active) VALUES
('신년 맞이 특별 할인', '새해를 맞아 모든 차 제품 20% 할인', 'discount', 20, '/images/events/new-year.jpg', '2024-01-01', '2024-01-31', 1),
('봄 햇차 시즌 이벤트', '올해 첫 수확 햇차 예약 판매 시작', 'season', 0, '/images/events/spring-tea.jpg', '2024-04-01', '2024-04-30', 1),
('장인 초대전', '이천 도예 명인들의 특별 작품 전시', 'new_product', 0, '/images/events/master-exhibition.jpg', '2024-03-01', '2024-03-31', 1);

-- 이벤트 상품 연결
INSERT INTO event_products (event_id, product_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
(2, 1), (2, 2),
(3, 7), (3, 8), (3, 10);

-- 관광지 데이터
INSERT INTO attractions (region_id, name, attraction_type, description, address, phone, opening_hours, main_image) VALUES
-- 제주도
(1, '오설록 티뮤지엄', 'tourist_spot', '차 문화를 체험할 수 있는 복합 문화 공간', '제주시 한림읍 신엄리', '064-794-5312', '09:00-18:00', '/images/attractions/osulloc.jpg'),
(1, '제주 흑돼지 맛집', 'restaurant', '제주 특산 흑돼지 전문점', '제주시 중앙로', '064-123-4567', '11:00-22:00', '/images/attractions/jeju-restaurant.jpg'),

-- 하동
(2, '쌍계사', 'tourist_spot', '지리산 자락의 천년 고찰', '하동군 화개면', '055-883-1901', '일출~일몰', '/images/attractions/ssanggyesa.jpg'),
(2, '화개장터', 'tourist_spot', '전통시장과 벚꽃 명소', '하동군 화개면', '055-880-2371', '상시 개방', '/images/attractions/hwagae.jpg'),
(2, '하동 재첩국 거리', 'restaurant', '섬진강 재첩으로 만든 시원한 국물 요리', '하동군 하동읍', '055-880-1234', '07:00-21:00', '/images/attractions/jaecheop.jpg'),

-- 보성
(5, '보성 녹차밭', 'tourist_spot', '아름다운 차밭 경관이 펼쳐진 대한민국 대표 관광지', '보성군 보성읍', '061-850-5211', '09:00-18:00', '/images/attractions/boseong-tea-field.jpg'),
(5, '율포 해수욕장', 'tourist_spot', '고운 모래와 맑은 바다의 해변', '보성군 회천면', '061-850-5224', '상시 개방', '/images/attractions/yulpo-beach.jpg'),
(5, '보성 벌교 꼬막 정식', 'restaurant', '보성 특산 꼬막 요리 전문점', '보성군 벌교읍', '061-857-1234', '10:00-21:00', '/images/attractions/kkormak.jpg'),

-- 강진
(6, '다산초당', 'tourist_spot', '정약용 선생이 유배 생활을 한 곳', '강진군 도암면', '061-430-3312', '09:00-18:00', '/images/attractions/dasan.jpg'),
(6, '강진 백련사', 'tourist_spot', '차문화와 불교문화가 어우러진 천년 고찰', '강진군 도암면', '061-432-0837', '일출~일몰', '/images/attractions/baengnyeonsa.jpg'),
(6, '한정식 맛집', 'restaurant', '강진 특산물로 만든 전통 한정식', '강진군 강진읍', '061-433-1234', '11:00-21:00', '/images/attractions/gangjin-restaurant.jpg'),

-- 이천
(10, '이천 도자기마을', 'tourist_spot', '전통 도자기를 보고 체험할 수 있는 공간', '이천시 신둔면', '031-644-2266', '09:00-18:00', '/images/attractions/icheon-pottery.jpg'),
(10, '이천 쌀밥 거리', 'restaurant', '이천 쌀로 지은 맛있는 밥상', '이천시 증포동', '031-644-1234', '11:00-21:00', '/images/attractions/icheon-rice.jpg'),

-- 경기 광주
(9, '남한산성', 'tourist_spot', '유네스코 세계문화유산 조선시대 산성', '광주시 남한산성면', '031-777-7500', '상시 개방', '/images/attractions/namhansanseong.jpg'),
(9, '광주 도자기공방 거리', 'workshop', '전통 도자기 제작 공방들이 모여있는 거리', '광주시 남한산성면', '031-762-2109', '10:00-18:00', '/images/attractions/gwangju-workshop.jpg'),

-- 부안
(13, '변산반도 국립공원', 'tourist_spot', '서해안의 아름다운 해안 절경과 산림이 어우러진 국립공원', '부안군 변산면', '063-582-7808', '상시 개방', '/images/attractions/byeonsan.jpg'),
(13, '부안 옹기박물관', 'workshop', '전통 옹기 제작 과정을 체험할 수 있는 박물관', '부안군 보안면', '063-580-4463', '09:00-18:00', '/images/attractions/buan-pottery-museum.jpg'),
(13, '부안 백합정식', 'restaurant', '서해안 백합으로 만든 백합정식 전문점', '부안군 변산면', '063-583-1234', '10:00-21:00', '/images/attractions/buan-clam.jpg'),

-- 강진 (공예)
(14, '강진 고려청자박물관', 'workshop', '고려청자의 역사와 제작 과정을 체험하는 박물관', '강진군 대구면', '061-430-3755', '09:00-18:00', '/images/attractions/gangjin-celadon-museum.jpg'),
(14, '강진 청자촌', 'workshop', '실제 청자를 만드는 공방들이 모여있는 마을', '강진군 대구면', '061-432-0918', '10:00-18:00', '/images/attractions/gangjin-celadon-village.jpg'),
(14, '강진만 생태공원', 'tourist_spot', '철새 관찰과 갯벌 체험이 가능한 생태공원', '강진군 강진읍', '061-430-3527', '상시 개방', '/images/attractions/gangjin-eco-park.jpg'),
(15, '문경 도자기 전시관', 'workshop', '문경 사기의 역사와 전통 제작 기법을 전시하는 박물관', '문경시 가은읍', '054-550-6393', '09:00-18:00', '/images/attractions/mungyeong-pottery-museum.jpg'),
(15, '문경새재 도립공원', 'tourist_spot', '조선시대 3대 관문과 아름다운 자연을 감상할 수 있는 명소', '문경시 문경읍', '054-571-0709', '상시 개방', '/images/attractions/mungyeongsaejae.jpg'),
(15, '문경 전통찻집', 'restaurant', '전통 한옥에서 즐기는 차와 한정식', '문경시 가은읍', '054-571-1234', '11:00-20:00', '/images/attractions/mungyeong-teahouse.jpg');

-- 체험 프로그램 데이터
INSERT INTO experiences (title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image) VALUES
('전통 다도교육', 6, 4, 'tea_ceremony', '다산 선생의 차문화를 직접 배우는 다도 교실', '2시간', 30000, 15, '/images/experiences/tea-ceremony.jpg'),
('차밭 투어 & 차 만들기', 5, 3, 'farm_tour', '보성 녹차밭을 거닐고 직접 차를 만들어보는 체험', '3시간', 45000, 20, '/images/experiences/tea-farm-tour.jpg'),
('찻잔 만들기 원데이 클래스', 10, 6, 'craft_workshop', '물레를 돌려 나만의 찻잔을 만드는 도예 체험', '3시간', 60000, 8, '/images/experiences/pottery-class.jpg'),
('제주 차 시음회', 1, 1, 'tea_tasting', '제주에서 자란 다양한 차를 맛보고 배우는 시간', '1.5시간', 25000, 12, '/images/experiences/tea-tasting.jpg'),
('이천 백자공방 견학', 10, 6, 'workshop_visit', '명인의 작업실을 방문하여 백자 제작 과정을 관람', '1시간', 15000, 10, '/images/experiences/workshop-visit.jpg'),
('하동 야생차 수확 체험', 2, 2, 'farm_tour', '지리산 자락에서 직접 차잎을 따고 덖는 체험', '4시간', 50000, 15, '/images/experiences/tea-harvest.jpg'),
('부안 옹기 만들기 체험', 13, 8, 'craft_workshop', '전통 옹기를 직접 만들어보는 체험', '2.5시간', 40000, 12, '/images/experiences/buan-pottery.jpg'),
('강진 청자 빚기 체험', 14, 9, 'craft_workshop', '고려청자 기법으로 청자를 만드는 특별한 체험', '3시간', 70000, 10, '/images/experiences/gangjin-celadon.jpg'),
('문경 사기 체험', 15, 10, 'craft_workshop', '문경 전통 사기를 직접 만들어보는 도예 체험', '3시간', 55000, 10, '/images/experiences/mungyeong-pottery.jpg');

-- 체험 일정 데이터
INSERT INTO experience_schedules (experience_id, schedule_date, start_time, available_slots, booked_slots) VALUES
(1, '2024-03-15', '10:00', 15, 0),
(1, '2024-03-15', '14:00', 15, 0),
(1, '2024-03-22', '10:00', 15, 0),
(2, '2024-04-05', '09:00', 20, 0),
(2, '2024-04-12', '09:00', 20, 0),
(3, '2024-03-10', '13:00', 8, 0),
(3, '2024-03-17', '13:00', 8, 0),
(3, '2024-03-24', '13:00', 8, 0),
(4, '2024-03-08', '15:00', 12, 0),
(4, '2024-03-15', '15:00', 12, 0),
(5, '2024-03-20', '11:00', 10, 0),
(6, '2024-04-20', '10:00', 15, 0),
(6, '2024-04-27', '10:00', 15, 0),
(7, '2024-03-16', '10:00', 12, 0),
(7, '2024-03-23', '10:00', 12, 0),
(7, '2024-03-30', '14:00', 12, 0),
(8, '2024-03-18', '13:00', 10, 0),
(8, '2024-03-25', '13:00', 10, 0),
(9, '2024-03-20', '14:00', 10, 0),
(9, '2024-03-27', '14:00', 10, 0),
(9, '2024-04-03', '14:00', 10, 0);

-- 교육 신청 샘플 데이터
INSERT INTO education_applications (organization_type, organization_name, contact_person, contact_phone, contact_email, address, participant_count, preferred_date, preferred_time, education_type, message, status, approved_date, education_start_date, education_end_date, instructor_name) VALUES
-- 진행 중인 교육
('kindergarten', '햇살 어린이집', '김미영', '02-123-4567', 'sunshine@example.com', '서울시 강남구 테헤란로 123', 25, '2024-03-15', '10:00', 'tea_ceremony', '5-7세 아이들을 위한 다도 체험 수업을 희망합니다.', 'in_progress', '2024-02-15', '2024-03-15', '2024-03-29', '강진 백운옥판차'),
('school', '서울초등학교', '이선생', '02-234-5678', 'seoul-elem@example.com', '서울시 종로구 율곡로 234', 30, '2024-03-20', '14:00', 'tea_ceremony', '5학년 학생들 대상 전통 차 문화 교육', 'in_progress', '2024-02-20', '2024-03-20', '2024-04-03', '강진 백운옥판차'),
('company', '한국문화재단', '박과장', '02-345-6789', 'culture@example.com', '서울시 중구 세종대로 345', 20, '2024-03-25', '15:00', 'tea_ceremony', '직원 힐링 프로그램으로 다도 교육을 진행하고 싶습니다.', 'in_progress', '2024-02-25', '2024-03-25', '2024-04-08', '제주 설록다원'),
('government', '문화체육관광부', '최주무관', '044-456-7890', 'mcst@example.com', '세종특별자치시 도움6로 11', 15, '2024-04-01', '10:00', 'tea_ceremony', '공무원 문화 향유 프로그램', 'in_progress', '2024-03-01', '2024-04-01', '2024-04-15', '하동 야생차 농원'),

-- 승인 대기 중
('kindergarten', '푸른숲 어린이집', '정원장', '031-567-8901', 'greenforest@example.com', '경기도 성남시 분당구 판교로 456', 20, '2024-04-10', '11:00', 'tea_tasting', '차 시음 체험을 통한 미각 교육', 'pending', NULL, NULL, NULL, NULL),
('school', '보성중학교', '박교사', '061-852-2345', 'boseong-mid@example.com', '전남 보성군 보성읍 녹차로 567', 35, '2024-04-15', '13:00', 'tea_ceremony', '지역 특산물인 녹차에 대한 이해 교육', 'pending', NULL, NULL, NULL, NULL),
('company', 'SK하이닉스', '김차장', '031-678-9012', 'sk@example.com', '경기도 이천시 부발읍 경충대로 678', 40, '2024-04-20', '14:00', 'craft_workshop', '찻잔 만들기 체험 (팀 빌딩 행사)', 'pending', NULL, NULL, NULL, NULL),

-- 완료된 교육
('kindergarten', '사랑 어린이집', '홍원장', '02-789-0123', 'love@example.com', '서울시 송파구 올림픽로 789', 22, '2024-02-20', '10:00', 'tea_ceremony', '돌봄교육 프로그램의 일환', 'completed', '2024-01-20', '2024-02-20', '2024-03-05', '강진 백운옥판차'),
('school', '하동초등학교', '윤선생', '055-880-3456', 'hadong-elem@example.com', '경남 하동군 화개면 섬진강대로 890', 28, '2024-02-25', '09:00', 'tea_ceremony', '지역 차문화 체험학습', 'completed', '2024-01-25', '2024-02-25', '2024-03-10', '하동 야생차 농원'),
('company', '현대자동차', '신대리', '02-890-1234', 'hyundai@example.com', '서울시 서초구 헌릉로 901', 25, '2024-03-01', '15:00', 'tea_ceremony', '직원 복지 프로그램', 'completed', '2024-02-01', '2024-03-01', '2024-03-08', '제주 설록다원'),
('government', '강진군청', '이주사', '061-430-4567', 'gangjin-gov@example.com', '전남 강진군 강진읍 군청로 012', 18, '2024-03-05', '14:00', 'tea_ceremony', '지역 문화 이해 교육', 'completed', '2024-02-05', '2024-03-05', '2024-03-12', '강진 백운옥판차');
