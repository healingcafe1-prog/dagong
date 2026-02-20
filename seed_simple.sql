-- 간단한 샘플 데이터 삽입

-- 외래키 제약 조건 일시 비활성화
PRAGMA foreign_keys = OFF;

-- 생산자 데이터 (region_id는 이미 regions 테이블에 있는 ID를 사용)
INSERT INTO producers (name, region_id, producer_type, description, contact_phone) VALUES 
('박수공', 1, 'tea', '제주 한라산 유기농 차 농원', '064-123-4567'),
('제주 한라산 차농원', 1, 'tea', '3대째 이어온 전통 차 농원', '064-456-7890'),
('이천 도예가', 6, 'craft', '전통 도자기 장인', '031-123-4567');

-- 제품 데이터 (스키마에 맞는 컬럼명 사용)
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count) VALUES 
-- 차 제품
('제주 한라산 유기농 녹차', 1, 1, '청정 제주에서 자란 프리미엄 유기농 녹차', 28000, 100, '/images/products/tea1.jpg', 'tea', '100g', '제주도', 1, 1, 150),
('하동 전통 발효차', 4, 2, '지리산 자락의 전통 방식 발효차', 36000, 50, '/images/products/tea2.jpg', 'tea', '100g', '경남 하동', 1, 1, 120),
('보성 청태전', 4, 1, '보성의 전통 떡차', 30400, 80, '/images/products/tea3.jpg', 'tea', '150g', '전남 보성', 1, 1, 200),
('김해 황차', 2, 2, '김해의 특별한 황차', 33600, 60, '/images/products/tea4.jpg', 'tea', '100g', '경남 김해', 0, 1, 80),
('광양 매화차', 6, 1, '광양 백운산 매화로 만든 블렌딩차', 25600, 90, '/images/products/tea5.jpg', 'tea', '80g', '전남 광양', 1, 1, 180),

-- 공예품
('이천 도자기 찻잔 세트', 8, 3, '이천 전통 도자기 장인의 수제 찻잔', 68000, 30, '/images/products/craft1.jpg', 'craft', '800g', '경기 이천', 1, 1, 95),
('광주 분청사기 다관', 9, 3, '조선시대 기법으로 만든 분청 다관', 120000, 15, '/images/products/craft2.jpg', 'craft', '1200g', '경기 광주', 1, 1, 70),
('담양 대나무 찻상', 11, 3, '담양 대나무로 만든 전통 찻상', 76000, 25, '/images/products/craft3.jpg', 'craft', '2500g', '전남 담양', 0, 1, 60),

-- 선물세트
('명절 프리미엄 세트', 12, 1, '차와 다기가 함께하는 명절 선물', 120000, 50, '/images/products/gift1.jpg', 'gift_set', '2000g', '전국', 1, 1, 200),
('기념일 차 선물세트', 13, 2, '특별한 날을 위한 프리미엄 차 세트', 76000, 60, '/images/products/gift2.jpg', 'gift_set', '1200g', '전국', 1, 1, 175);

-- 체험 프로그램 데이터 (정확한 experience_type 사용)
-- 허용되는 타입: 'tea_ceremony', 'tea_experience', 'craft_workshop', 'farm_tour', 'workshop_visit'
INSERT INTO experiences (title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available) VALUES 
('제주 차밭 트레킹', 1, 1, 'tea_experience', '제주 한라산 차밭 트레킹과 차 시음', '3시간', 45000, 20, '/images/exp/exp1.jpg', 1),
('하동 차 만들기 체험', 2, 2, 'tea_experience', '전통 방식으로 차 만들기', '4시간', 65000, 15, '/images/exp/exp2.jpg', 1),
('이천 도자기 원데이 클래스', 6, 3, 'craft_workshop', '물레를 이용한 도자기 만들기', '5시간', 95000, 10, '/images/exp/exp3.jpg', 1),
('차 명상 힐링 프로그램', 1, 1, 'tea_ceremony', '차를 마시며 하는 명상 프로그램', '2시간', 55000, 12, '/images/exp/exp6.jpg', 1),
('다도 예절 교육', 1, 2, 'tea_ceremony', '전통 다도 예절 배우기', '2시간', 40000, 15, '/images/exp/exp7.jpg', 1);

-- 교육 커리큘럼 추가 데이터 (기존 16개에 추가로 14개)
-- 사용 가능한 category_id: 1(다도교육), 2(차공부), 3(공예공부), 4(다도교육)
INSERT INTO education_curriculum (category_id, title, description, content, duration, difficulty, display_order, thumbnail_image) VALUES 
(4, '호흡 명상', '호흡을 통한 명상', '올바른 호흡법과 명상 실습', '45분', 'beginner', 0, '/images/curriculum/breathing.jpg'),
(4, '마음챙김 명상', '마음챙김 명상의 이론과 실습', '현재 순간에 집중하는 명상', '60분', 'intermediate', 0, '/images/curriculum/mindfulness.jpg'),
(4, '차 명상', '차를 마시며 하는 명상', '차를 통한 오감 명상', '90분', 'intermediate', 0, '/images/curriculum/tea_meditation.jpg'),
(4, '요가와 명상', '요가 동작과 명상의 결합', '몸과 마음을 함께 다스리는 명상', '75분', 'intermediate', 0, '/images/curriculum/yoga_meditation.jpg'),
(4, '명상의 역사', '명상의 기원과 발전', '동서양 명상의 역사와 철학', '90분', 'beginner', 1, '/images/curriculum/meditation_history.jpg'),
(4, '명상의 종류와 실천', '다양한 명상법', '호흡명상, 선명상, 위빠사나 등', '150분', 'intermediate', 2, '/images/curriculum/meditation_types.jpg'),
(4, '명상의 정의와 원리', '명상의 본질과 작용 원리', '명상이 뇌와 신체에 미치는 영향', '60분', 'beginner', 2, '/images/curriculum/meditation_principle.jpg'),
(4, '일상 속 명상 실천', '바쁜 일상 속 명상 적용', '짧은 시간으로 하는 실용적 명상법', '45분', 'beginner', 3, '/images/curriculum/daily_meditation.jpg'),
(4, '다도의 의미', '다도의 정신과 철학', '차를 통한 수양과 예절의 의미', '120분', 'beginner', 1, '/images/curriculum/dado_meaning.jpg'),
(4, '다도의 역사와 시대적 변천사', '한국 다도의 역사적 발전', '시대별 다도 문화의 변화와 특징', '150분', 'intermediate', 2, '/images/curriculum/dado_history.jpg'),
(4, '다도의 종류', '다양한 다도의 유형', '한국, 중국, 일본 다도의 특징 비교', '120분', 'intermediate', 3, '/images/curriculum/dado_types.jpg'),
(4, '다도와 명상의 효과', '다도를 통한 명상 효과', '마음의 평안과 집중력 향상', '90분', 'beginner', 4, '/images/curriculum/dado_meditation.jpg'),
(4, '인성교육으로 다도 명상을 해야하는 이유', '다도를 통한 인성 함양', '예절, 배려, 집중력 등 인성 교육', '150분', 'intermediate', 5, '/images/curriculum/dado_character.jpg'),
(4, '다도의 역사와 정신', '다도의 철학적 배경', '선禅과 차의 정신적 연결', '120분', 'intermediate', 7, '/images/curriculum/dado_spirit.jpg');


-- 외래키 제약 조건 다시 활성화
PRAGMA foreign_keys = ON;
