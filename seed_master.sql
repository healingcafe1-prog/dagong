-- ============================================
-- 다공 (DAGONG) 마스터 시드 데이터
-- 모든 샘플 데이터를 통합 관리
-- ============================================

-- 외래키 제약 조건 일시 비활성화
PRAGMA foreign_keys = OFF;

-- ============================================
-- 1. 생산자 데이터 (13개)
-- ============================================
INSERT INTO producers (name, region_id, producer_type, description, contact_phone) VALUES 
-- 차 생산자 (3개)
('박수공', 1, 'tea', '제주 한라산 유기농 차 농원', '064-123-4567'),
('제주 한라산 차농원', 1, 'tea', '3대째 이어온 전통 차 농원', '064-456-7890'),
('보성 농산', 5, 'tea', '보성 유기농 농산물', '061-123-4567'),
-- 공예 생산자 (10개)
('이천 도예가', 6, 'craft', '전통 도자기 장인', '031-123-4567'),
('광주 분청도예', 9, 'craft', '경기 광주 전통 분청사기 명장', '031-234-5678'),
('담양 죽제품', 6, 'craft', '담양 대나무 공예 전문', '061-345-6789'),
('전주 나전칠기', 6, 'craft', '전주 전통 나전칠기 공방', '063-456-7890'),
('안동 한지공예', 6, 'craft', '안동 전통 한지 제작소', '054-567-8901'),
('강진 청자도예', 14, 'craft', '강진 고려청자 복원 명장', '061-678-9012'),
('남원 목공예', 6, 'craft', '남원 전통 목공예 공방', '063-789-0123'),
('부산 수산', 1, 'tea', '부산 앞바다 수산물', '051-890-1234'),
('울산 특산', 1, 'tea', '울산 동해안 특산품', '052-901-2345'),
('제주 특산', 1, 'tea', '제주 청정 특산물', '064-012-3456');

-- ============================================
-- 2. 차 제품 (20개)
-- ============================================
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count) VALUES 
-- 녹차 (4개)
('제주 한라산 유기농 녹차', 1, 1, '청정 제주에서 자란 프리미엄 유기농 녹차', 28000, 100, '/images/products/tea1.jpg', 'tea', '100g', '제주도', 1, 1, 150),
('제주 유기농 우전', 1, 1, '제주 한라산 첫물차 우전', 42000, 80, '/images/products/tea6.jpg', 'tea', '100g', '제주도', 1, 1, 165),
('하동 야생차', 1, 2, '지리산 야생차밭에서 채취한 녹차', 65000, 40, '/images/products/tea7.jpg', 'tea', '100g', '경남 하동', 1, 1, 130),
('보성 유기농 녹차', 1, 3, '보성 유기농 인증 녹차', 32000, 120, '/images/products/tea8.jpg', 'tea', '100g', '전남 보성', 0, 1, 145),
-- 백차 (3개)
('제주 백모단', 21, 1, '제주산 백모단 백차', 58000, 50, '/images/products/tea9.jpg', 'tea', '100g', '제주도', 1, 1, 88),
('김해 은침백호', 21, 2, '김해 전통 은침백호', 68000, 35, '/images/products/tea10.jpg', 'tea', '100g', '경남 김해', 1, 1, 75),
('하동 백차', 21, 2, '하동 전통 백차', 52000, 45, '/images/products/tea11.jpg', 'tea', '100g', '경남 하동', 0, 1, 82),
-- 청차 (3개)
('제주 청차', 22, 1, '제주 반발효 청차', 48000, 60, '/images/products/tea12.jpg', 'tea', '100g', '제주도', 1, 1, 92),
('보성 동정오룡', 22, 3, '보성 전통 오룡차', 55000, 40, '/images/products/tea13.jpg', 'tea', '100g', '전남 보성', 1, 1, 85),
('광양 청차', 22, 1, '광양 산지 청차', 45000, 50, '/images/products/tea14.jpg', 'tea', '100g', '전남 광양', 0, 1, 78),
-- 황차 (1개)
('김해 황차', 2, 2, '김해의 특별한 황차', 33600, 60, '/images/products/tea4.jpg', 'tea', '100g', '경남 김해', 0, 1, 80),
-- 홍차 (3개)
('제주 홍차', 3, 1, '제주산 완전 발효 홍차', 38000, 70, '/images/products/tea15.jpg', 'tea', '100g', '제주도', 1, 1, 125),
('하동 홍차', 3, 2, '하동 전통 홍차', 42000, 55, '/images/products/tea16.jpg', 'tea', '100g', '경남 하동', 1, 1, 110),
('보성 홍차', 3, 3, '보성 유기농 홍차', 36000, 65, '/images/products/tea17.jpg', 'tea', '100g', '전남 보성', 0, 1, 98),
-- 발효차 (3개)
('하동 전통 발효차', 4, 2, '지리산 자락의 전통 방식 발효차', 36000, 50, '/images/products/tea2.jpg', 'tea', '100g', '경남 하동', 1, 1, 120),
('보성 청태전', 4, 3, '보성의 전통 떡차', 30400, 80, '/images/products/tea3.jpg', 'tea', '150g', '전남 보성', 1, 1, 200),
('광양 후발효차', 4, 1, '광양 전통 후발효차', 48000, 45, '/images/products/tea20.jpg', 'tea', '100g', '전남 광양', 1, 1, 105),
-- 블렌딩차 (3개)
('광양 매화차', 6, 1, '광양 백운산 매화로 만든 블렌딩차', 25600, 90, '/images/products/tea5.jpg', 'tea', '80g', '전남 광양', 1, 1, 180),
('제주 삼다수 녹차', 6, 1, '제주 삼다수로 우린 녹차 블렌드', 35000, 85, '/images/products/tea18.jpg', 'tea', '80g', '제주도', 1, 1, 155),
('한라봉 블렌딩차', 6, 1, '제주 한라봉과 녹차의 조화', 32000, 90, '/images/products/tea19.jpg', 'tea', '80g', '제주도', 0, 1, 142);

-- ============================================
-- 3. 공예품 (26개)
-- ============================================
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count) VALUES 
-- 찻잔 (1개)
('이천 도자기 찻잔 세트', 8, 4, '이천 전통 도자기 장인의 수제 찻잔', 68000, 30, '/images/products/craft1.jpg', 'craft', '800g', '경기 이천', 1, 1, 95),
-- 다관 (1개)
('광주 분청사기 다관', 9, 4, '조선시대 기법으로 만든 분청 다관', 120000, 15, '/images/products/craft2.jpg', 'craft', '1200g', '경기 광주', 1, 1, 70),
-- 장식품 (4개)
('담양 대나무 찻상', 11, 4, '담양 대나무로 만든 전통 찻상', 76000, 25, '/images/products/craft3.jpg', 'craft', '2500g', '전남 담양', 0, 1, 60),
('전통 민화 액자', 11, 7, '전통 민화를 담은 인테리어 액자', 65000, 25, '/images/products/craft17.jpg', 'craft', '500g', '전주', 1, 1, 80),
('도자기 꽃병', 11, 9, '청자 기법의 인테리어 꽃병', 75000, 20, '/images/products/craft18.jpg', 'craft', '1200g', '강진', 0, 1, 60),
('대나무 장식품', 11, 6, '담양 대나무 인테리어 소품', 42000, 35, '/images/products/craft19.jpg', 'craft', '400g', '담양', 0, 1, 55),
-- 다기세트 (2개)
('프리미엄 다기 세트', 23, 9, '청자 다관과 찻잔이 함께하는 고급 세트', 180000, 20, '/images/products/craft4.jpg', 'craft', '2000g', '전남 강진', 1, 1, 85),
('전통 다기 세트', 23, 4, '이천 도자기 다관과 찻잔 세트', 95000, 35, '/images/products/craft5.jpg', 'craft', '1500g', '경기 이천', 1, 1, 110),
-- 도자기 (3개)
('강진 청자 꽃병', 24, 9, '고려청자 기법의 현대 청자 꽃병', 150000, 15, '/images/products/craft6.jpg', 'craft', '1500g', '전남 강진', 1, 1, 65),
('이천 백자 항아리', 24, 4, '조선백자 전통 기법의 백자 항아리', 120000, 20, '/images/products/craft7.jpg', 'craft', '2000g', '경기 이천', 0, 1, 55),
('광주 분청 접시 세트', 24, 5, '분청사기 기법의 접시 6개 세트', 85000, 30, '/images/products/craft8.jpg', 'craft', '1200g', '경기 광주', 1, 1, 90),
-- 목공예 (3개)
('남원 목공예 다반', 25, 10, '남원 전통 목공예 다반', 55000, 40, '/images/products/craft9.jpg', 'craft', '800g', '전북 남원', 0, 1, 70),
('담양 죽제품 찻상', 25, 6, '담양 대나무로 만든 휴대용 찻상', 68000, 25, '/images/products/craft10.jpg', 'craft', '1500g', '전남 담양', 1, 1, 80),
('전통 목공예 찻잔 받침', 25, 10, '천연 원목 찻잔 받침 세트', 32000, 50, '/images/products/craft11.jpg', 'craft', '300g', '전북 남원', 0, 1, 60),
-- 금속공예 (2개)
('황동 다관', 26, 7, '전통 황동 기법의 다관', 95000, 15, '/images/products/craft12.jpg', 'craft', '1000g', '전주', 1, 1, 75),
('은제 찻잔 세트', 26, 7, '순은으로 만든 찻잔 2개 세트', 280000, 10, '/images/products/craft13.jpg', 'craft', '400g', '전주', 1, 1, 50),
-- 한복공예 (2개)
('전통 보자기', 27, 7, '한복 천으로 만든 다기 보자기', 38000, 40, '/images/products/craft14.jpg', 'craft', '200g', '전주', 0, 1, 65),
('한복 인형', 27, 7, '전통 한복을 입은 인형', 45000, 30, '/images/products/craft15.jpg', 'craft', '300g', '전주', 0, 1, 55),
-- 가죽공예 (1개)
('가죽 다기 가방', 28, 10, '천연 가죽 다기 보관 가방', 85000, 20, '/images/products/craft16.jpg', 'craft', '800g', '서울', 1, 1, 70),
-- 서예 (2개)
('전통 서예 액자', 29, 7, '명필가의 서예 작품', 120000, 15, '/images/products/craft20.jpg', 'craft', '600g', '서울', 1, 1, 45),
('사군자 족자', 29, 7, '사군자 그림 족자', 85000, 20, '/images/products/craft21.jpg', 'craft', '400g', '서울', 0, 1, 50),
-- 그림 (2개)
('민화 십장생', 30, 7, '전통 민화 십장생도', 150000, 10, '/images/products/craft22.jpg', 'craft', '800g', '전주', 1, 1, 55),
('수묵화 산수화', 30, 7, '전통 수묵 산수화', 180000, 8, '/images/products/craft23.jpg', 'craft', '700g', '서울', 1, 1, 40);

-- ============================================
-- 4. 선물세트 (2개)
-- ============================================
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count) VALUES 
('명절 프리미엄 세트', 12, 1, '차와 다기가 함께하는 명절 선물', 120000, 50, '/images/products/gift1.jpg', 'gift_set', '2000g', '전국', 1, 1, 200),
('기념일 차 선물세트', 13, 2, '특별한 날을 위한 프리미엄 차 세트', 76000, 60, '/images/products/gift2.jpg', 'gift_set', '1200g', '전국', 1, 1, 175);

-- ============================================
-- 5. 지역 특산품 (35개)
-- ============================================
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count) VALUES 
-- 농산물 (8개)
('제주 한라봉', 17, 13, '제주 청정 한라봉', 35000, 100, '/images/products/local1.jpg', 'gift_set', '3000g', '제주도', 1, 1, 180),
('제주 감귤', 17, 13, '제주 노지 감귤', 28000, 150, '/images/products/local2.jpg', 'gift_set', '5000g', '제주도', 1, 1, 200),
('보성 녹차쌀', 17, 3, '녹차를 먹여 키운 특별한 쌀', 38000, 80, '/images/products/local3.jpg', 'gift_set', '10000g', '전남 보성', 1, 1, 95),
('이천 쌀', 17, 3, '임금님표 이천쌀 10kg', 45000, 100, '/images/products/local4.jpg', 'gift_set', '10000g', '경기 이천', 1, 1, 160),
('담양 죽순', 17, 3, '담양 대나무 죽순', 32000, 60, '/images/products/local5.jpg', 'gift_set', '1000g', '전남 담양', 0, 1, 78),
('공주 밤', 17, 3, '공주 알밤', 28000, 90, '/images/products/local6.jpg', 'gift_set', '2000g', '충남 공주', 0, 1, 85),
('청송 사과', 17, 3, '청송 주왕산 사과', 45000, 100, '/images/products/local7.jpg', 'gift_set', '5000g', '경북 청송', 1, 1, 170),
('나주 배', 17, 3, '나주 신고배', 38000, 80, '/images/products/local8.jpg', 'gift_set', '5000g', '전남 나주', 1, 1, 145),
-- 수산물 (8개)
('부산 멸치', 19, 11, '부산 앞바다 특산 멸치', 32000, 90, '/images/products/local9.jpg', 'gift_set', '500g', '부산', 1, 1, 110),
('울산 미역', 19, 12, '동해안 청정 해역 미역', 25000, 80, '/images/products/local10.jpg', 'gift_set', '300g', '울산', 0, 1, 85),
('보령 굴비', 19, 11, '보령 명품 굴비', 55000, 50, '/images/products/local11.jpg', 'gift_set', '1200g', '충남 보령', 1, 1, 125),
('영덕 대게', 19, 11, '영덕 특산 대게', 95000, 30, '/images/products/local12.jpg', 'gift_set', '1500g', '경북 영덕', 1, 1, 155),
('울릉도 오징어', 19, 12, '울릉도 건오징어', 48000, 50, '/images/products/local13.jpg', 'gift_set', '500g', '경북 울릉', 0, 1, 88),
('삼척 건어물', 19, 11, '삼척 특산 건어물', 32000, 60, '/images/products/local14.jpg', 'gift_set', '800g', '강원 삼척', 0, 1, 75),
('속초 오징어순대', 19, 11, '속초 명물 오징어순대', 25000, 70, '/images/products/local15.jpg', 'gift_set', '600g', '강원 속초', 0, 1, 98),
('안동 간고등어', 19, 11, '안동 전통 간고등어', 38000, 60, '/images/products/local16.jpg', 'gift_set', '800g', '경북 안동', 0, 1, 65),
-- 축산물 (2개)
('제주 흑돼지 육포', 20, 13, '제주 흑돼지로 만든 프리미엄 육포', 28000, 70, '/images/products/local17.jpg', 'gift_set', '200g', '제주도', 1, 1, 95),
('횡성 한우', 20, 3, '횡성 1++등급 한우', 120000, 40, '/images/products/local18.jpg', 'gift_set', '2000g', '강원 횡성', 1, 1, 185),
-- 특산품 (4개)
('영광 모시', 31, 3, '영광 모시 의류', 85000, 40, '/images/products/local19.jpg', 'gift_set', '500g', '전남 영광', 0, 1, 68),
('평창 송이버섯', 31, 3, '평창 자연산 송이', 150000, 20, '/images/products/local20.jpg', 'gift_set', '500g', '강원 평창', 1, 1, 210),
('영양 고추', 31, 3, '영양 청정 고추', 42000, 70, '/images/products/local21.jpg', 'gift_set', '500g', '경북 영양', 0, 1, 95),
('의성 마늘', 31, 3, '의성 육쪽마늘', 35000, 90, '/images/products/local22.jpg', 'gift_set', '1000g', '경북 의성', 1, 1, 132),
-- 가공식품 (13개)
('하동 야생화 꿀', 18, 2, '지리산 야생화 꿀', 42000, 50, '/images/products/local23.jpg', 'gift_set', '600g', '경남 하동', 1, 1, 120),
('전주 한과', 18, 7, '전통 방식으로 만든 전주 한과', 32000, 80, '/images/products/local24.jpg', 'gift_set', '400g', '전북 전주', 1, 1, 140),
('강릉 커피', 18, 3, '강릉 로스터리 원두', 22000, 90, '/images/products/local25.jpg', 'gift_set', '200g', '강원 강릉', 0, 1, 105),
('경주 빵', 18, 3, '경주 특산 빵', 18000, 100, '/images/products/local26.jpg', 'gift_set', '500g', '경북 경주', 0, 1, 88),
('남원 추어탕', 18, 10, '남원 전통 추어탕', 15000, 70, '/images/products/local27.jpg', 'gift_set', '1000g', '전북 남원', 0, 1, 72),
('서울 전통주', 18, 3, '서울 전통 막걸리', 18000, 80, '/images/products/local28.jpg', 'gift_set', '750ml', '서울', 0, 1, 92),
('정선 곤드레', 18, 3, '정선 산나물 곤드레', 28000, 80, '/images/products/local29.jpg', 'gift_set', '300g', '강원 정선', 0, 1, 82),
('양구 시래기', 18, 3, '양구 청정 시래기', 22000, 90, '/images/products/local30.jpg', 'gift_set', '500g', '강원 양구', 0, 1, 76),
('인제 산나물', 18, 3, '인제 자연산 산나물', 35000, 70, '/images/products/local31.jpg', 'gift_set', '400g', '강원 인제', 0, 1, 88),
('화천 토마토', 18, 3, '화천 방울토마토', 28000, 100, '/images/products/local32.jpg', 'gift_set', '2000g', '강원 화천', 0, 1, 95),
('철원 오대쌀', 18, 3, '철원 DMZ 오대쌀', 42000, 80, '/images/products/local33.jpg', 'gift_set', '10000g', '강원 철원', 1, 1, 165);

-- ============================================
-- 6. 체험 프로그램 (12개)
-- ============================================
INSERT INTO experiences (title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available) VALUES 
-- 차 체험 (4개)
('제주 차밭 트레킹', 1, 1, 'tea_experience', '제주 한라산 차밭 트레킹과 차 시음', '3시간', 45000, 20, '/images/exp/exp1.jpg', 1),
('하동 차 만들기 체험', 2, 2, 'tea_experience', '전통 방식으로 차 만들기', '4시간', 65000, 15, '/images/exp/exp2.jpg', 1),
('보성 녹차밭 투어', 5, 3, 'tea_experience', '보성 녹차밭 걷기와 차 시음', '2.5시간', 38000, 25, '/images/exp/exp13.jpg', 1),
('제주 차 블렌딩 체험', 1, 1, 'tea_experience', '나만의 블렌딩 차 만들기', '2시간', 52000, 12, '/images/exp/exp14.jpg', 1),
-- 공예 체험 (5개)
('이천 도자기 원데이 클래스', 6, 4, 'craft_workshop', '물레를 이용한 도자기 만들기', '5시간', 95000, 10, '/images/exp/exp3.jpg', 1),
('담양 죽제품 만들기', 6, 6, 'craft_workshop', '대나무를 이용한 생활용품 제작', '3시간', 48000, 12, '/images/exp/exp4.jpg', 1),
('전주 한지 공예 체험', 6, 7, 'craft_workshop', '전통 한지를 이용한 공예품 만들기', '3시간', 42000, 15, '/images/exp/exp5.jpg', 1),
('강진 청자 만들기', 14, 9, 'craft_workshop', '고려청자 도자기 만들기', '4시간', 72000, 10, '/images/exp/exp9.jpg', 1),
('나전칠기 체험', 6, 7, 'craft_workshop', '전통 나전칠기 소품 만들기', '6시간', 120000, 8, '/images/exp/exp10.jpg', 1),
-- 다도 & 명상 (3개)
('차 명상 힐링 프로그램', 1, 1, 'tea_ceremony', '차를 마시며 하는 명상 프로그램', '2시간', 55000, 12, '/images/exp/exp6.jpg', 1),
('다도 예절 교육', 1, 2, 'tea_ceremony', '전통 다도 예절 배우기', '2시간', 40000, 15, '/images/exp/exp7.jpg', 1),
('차밭 요가 명상', 5, 3, 'tea_ceremony', '차밭에서 하는 요가와 명상', '2시간', 48000, 15, '/images/exp/exp11.jpg', 1);

-- ============================================
-- 7. 교육 커리큘럼 (30개)
-- ============================================
INSERT INTO education_curriculum (category_id, title, description, content, duration, difficulty, display_order, thumbnail_image) VALUES 
-- 차공부 (6개)
(2, '차의 역사', '차의 기원부터 현대까지의 역사를 배웁니다', '차의 발견과 전파, 한국 차문화의 발전 과정을 학습합니다', '90분', 'beginner', 1, '/images/curriculum/tea_history.jpg'),
(2, '한국차의 역사', '한국 전통차의 역사와 문화적 배경', '삼국시대부터 조선시대까지 한국 차문화의 발전사', '120분', 'intermediate', 2, '/images/curriculum/korean_tea_history.jpg'),
(2, '6대 차류', '차의 6가지 분류와 각각의 특징', '녹차, 백차, 황차, 청차, 홍차, 흑차의 분류와 특성', '150분', 'intermediate', 3, '/images/curriculum/six_types.jpg'),
(2, '한국차의 종류', '한국 전통차의 다양한 종류', '녹차, 발효차, 가향차 등 한국 차의 분류와 특징', '120분', 'intermediate', 4, '/images/curriculum/korean_tea_types.jpg'),
(2, '차의 이로운 점', '차의 건강상 이점과 효능', '차의 성분과 건강 효능, 올바른 섭취 방법', '90분', 'beginner', 5, '/images/curriculum/tea_benefits.jpg'),
(2, '6대 차류 우리는 방법', '차 종류별 올바른 우리는 방법', '각 차류별 최적의 온도, 시간, 물의 양', '180분', 'advanced', 6, '/images/curriculum/brewing_methods.jpg'),
-- 공예공부 (9개)
(3, '공예의 역사', '한국 전통 공예의 역사', '삼국시대부터 현대까지 한국 공예의 발전사', '90분', 'beginner', 1, '/images/curriculum/craft_history.jpg'),
(3, '한국공예의 시대별 변천사', '시대별 한국 공예의 특징과 변화', '시대별 공예 기법과 양식의 변천', '150분', 'intermediate', 2, '/images/curriculum/craft_evolution.jpg'),
(3, '도자기의 제작 기법', '전통 도자기 제작 기법', '물레 성형, 유약, 소성 등 도자기 제작 과정', '180분', 'advanced', 3, '/images/curriculum/pottery_technique.jpg'),
(3, '도자기의 활용법', '도자기의 다양한 활용', '다기, 생활용기, 장식품 등 도자기 활용', '90분', 'beginner', 4, '/images/curriculum/pottery_usage.jpg'),
(3, '도자기의 이로운 점', '도자기 사용의 장점', '건강상 이점과 친환경적 가치', '90분', 'beginner', 5, '/images/curriculum/pottery_benefits.jpg'),
(3, '서예의 역사와 발전', '한국 서예의 역사', '한글과 한문 서예의 발전 과정', '120분', 'intermediate', 6, '/images/curriculum/calligraphy_history.jpg'),
(3, '한국 전통미술과 민화', '민화의 역사와 특징', '민화의 종류와 의미, 현대적 해석', '90분', 'intermediate', 7, '/images/curriculum/minhwa.jpg'),
(3, '한복의 역사와 아름다움', '한복의 역사와 미학', '한복의 구조, 색상, 문양의 의미', '90분', 'beginner', 8, '/images/curriculum/hanbok.jpg'),
(3, '한지의 역사와 제조법', '전통 한지의 역사와 제작', '한지의 제조 과정과 특성, 현대적 활용', '120분', 'intermediate', 9, '/images/curriculum/hanji.jpg'),
-- 다도교육 (7개)
(4, '다도의 의미', '다도의 정신과 철학', '차를 통한 수양과 예절의 의미', '120분', 'beginner', 1, '/images/curriculum/dado_meaning.jpg'),
(4, '다도의 역사와 시대적 변천사', '한국 다도의 역사적 발전', '시대별 다도 문화의 변화와 특징', '150분', 'intermediate', 2, '/images/curriculum/dado_history.jpg'),
(4, '다도의 종류', '다양한 다도의 유형', '한국, 중국, 일본 다도의 특징 비교', '120분', 'intermediate', 3, '/images/curriculum/dado_types.jpg'),
(4, '다도와 명상의 효과', '다도를 통한 명상 효과', '마음의 평안과 집중력 향상', '90분', 'beginner', 4, '/images/curriculum/dado_meditation.jpg'),
(4, '인성교육으로 다도 명상을 해야하는 이유', '다도를 통한 인성 함양', '예절, 배려, 집중력 등 인성 교육', '150분', 'intermediate', 5, '/images/curriculum/dado_character.jpg'),
(4, '다도의 역사와 정신', '다도의 철학적 배경', '선禅과 차의 정신적 연결', '120분', 'intermediate', 7, '/images/curriculum/dado_spirit.jpg'),
(4, '다도교육의 이론과 실제', '다도 교육 방법론', '이론 학습과 실습을 통한 다도 교육', '150분', 'advanced', 8, '/images/curriculum/dado_practice.jpg'),
-- 명상교육 (8개)
(4, '호흡 명상', '호흡을 통한 명상', '올바른 호흡법과 명상 실습', '45분', 'beginner', 0, '/images/curriculum/breathing.jpg'),
(4, '마음챙김 명상', '마음챙김 명상의 이론과 실습', '현재 순간에 집중하는 명상', '60분', 'intermediate', 0, '/images/curriculum/mindfulness.jpg'),
(4, '차 명상', '차를 마시며 하는 명상', '차를 통한 오감 명상', '90분', 'intermediate', 0, '/images/curriculum/tea_meditation.jpg'),
(4, '요가와 명상', '요가 동작과 명상의 결합', '몸과 마음을 함께 다스리는 명상', '75분', 'intermediate', 0, '/images/curriculum/yoga_meditation.jpg'),
(4, '명상의 역사', '명상의 기원과 발전', '동서양 명상의 역사와 철학', '90분', 'beginner', 1, '/images/curriculum/meditation_history.jpg'),
(4, '명상의 종류와 실천', '다양한 명상법', '호흡명상, 선명상, 위빠사나 등', '150분', 'intermediate', 2, '/images/curriculum/meditation_types.jpg'),
(4, '명상의 정의와 원리', '명상의 본질과 작용 원리', '명상이 뇌와 신체에 미치는 영향', '60분', 'beginner', 2, '/images/curriculum/meditation_principle.jpg'),
(4, '일상 속 명상 실천', '바쁜 일상 속 명상 적용', '짧은 시간으로 하는 실용적 명상법', '45분', 'beginner', 3, '/images/curriculum/daily_meditation.jpg');

-- 외래키 제약 조건 다시 활성화
PRAGMA foreign_keys = ON;
