-- 추가 샘플 데이터: 공예품, 지역특산품, 이벤트

-- 외래키 제약 조건 일시 비활성화
PRAGMA foreign_keys = OFF;

-- 추가 생산자 데이터 (공예가 및 특산품 생산자)
INSERT INTO producers (name, region_id, producer_type, description, contact_phone) VALUES 
('광주 분청도예', 9, 'craft', '경기 광주 전통 분청사기 명장', '031-234-5678'),
('담양 죽제품', 6, 'craft', '담양 대나무 공예 전문', '061-345-6789'),
('전주 나전칠기', 6, 'craft', '전주 전통 나전칠기 공방', '063-456-7890'),
('안동 한지공예', 6, 'craft', '안동 전통 한지 제작소', '054-567-8901'),
('강진 청자도예', 14, 'craft', '강진 고려청자 복원 명장', '061-678-9012'),
('남원 목공예', 6, 'craft', '남원 전통 목공예 공방', '063-789-0123'),
('부산 수산', 1, 'tea', '부산 앞바다 수산물', '051-890-1234'),
('울산 특산', 1, 'tea', '울산 동해안 특산품', '052-901-2345'),
('제주 특산', 1, 'tea', '제주 청정 특산물', '064-012-3456'),
('보성 농산', 5, 'tea', '보성 유기농 농산물', '061-123-4567');

-- 추가 공예품 (craft) - categories: 9(다관), 8(찻잔), 23(다기세트), 24(도자기), 25(목공예), 26(금속공예), 27(한복공예), 28(가죽공예), 11(장식품), 29(서예), 30(그림)
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count) VALUES 
-- 다기세트
('프리미엄 다기 세트', 23, 5, '청자 다관과 찻잔이 함께하는 고급 세트', 180000, 20, '/images/products/craft4.jpg', 'craft', '2000g', '전남 강진', 1, 1, 85),
('전통 다기 세트', 23, 4, '이천 도자기 다관과 찻잔 세트', 95000, 35, '/images/products/craft5.jpg', 'craft', '1500g', '경기 이천', 1, 1, 110),

-- 도자기
('강진 청자 꽃병', 24, 8, '고려청자 기법의 현대 청자 꽃병', 150000, 15, '/images/products/craft6.jpg', 'craft', '1500g', '전남 강진', 1, 1, 65),
('이천 백자 항아리', 24, 3, '조선백자 전통 기법의 백자 항아리', 120000, 20, '/images/products/craft7.jpg', 'craft', '2000g', '경기 이천', 0, 1, 55),
('광주 분청 접시 세트', 24, 4, '분청사기 기법의 접시 6개 세트', 85000, 30, '/images/products/craft8.jpg', 'craft', '1200g', '경기 광주', 1, 1, 90),

-- 목공예
('남원 목공예 다반', 25, 9, '남원 전통 목공예 다반', 55000, 40, '/images/products/craft9.jpg', 'craft', '800g', '전북 남원', 0, 1, 70),
('담양 죽제품 찻상', 25, 5, '담양 대나무로 만든 휴대용 찻상', 68000, 25, '/images/products/craft10.jpg', 'craft', '1500g', '전남 담양', 1, 1, 80),
('전통 목공예 찻잔 받침', 25, 9, '천연 원목 찻잔 받침 세트', 32000, 50, '/images/products/craft11.jpg', 'craft', '300g', '전북 남원', 0, 1, 60),

-- 금속공예
('황동 다관', 26, 6, '전통 황동 기법의 다관', 95000, 15, '/images/products/craft12.jpg', 'craft', '1000g', '전주', 1, 1, 75),
('은제 찻잔 세트', 26, 6, '순은으로 만든 찻잔 2개 세트', 280000, 10, '/images/products/craft13.jpg', 'craft', '400g', '전주', 1, 1, 50),

-- 한복공예
('전통 보자기', 27, 7, '한복 천으로 만든 다기 보자기', 38000, 40, '/images/products/craft14.jpg', 'craft', '200g', '전주', 0, 1, 65),
('한복 인형', 27, 7, '전통 한복을 입은 인형', 45000, 30, '/images/products/craft15.jpg', 'craft', '300g', '전주', 0, 1, 55),

-- 가죽공예
('가죽 다기 가방', 28, 9, '천연 가죽 다기 보관 가방', 85000, 20, '/images/products/craft16.jpg', 'craft', '800g', '서울', 1, 1, 70),

-- 장식품
('전통 민화 액자', 11, 7, '전통 민화를 담은 인테리어 액자', 65000, 25, '/images/products/craft17.jpg', 'craft', '500g', '전주', 1, 1, 80),
('도자기 꽃병', 11, 8, '청자 기법의 인테리어 꽃병', 75000, 20, '/images/products/craft18.jpg', 'craft', '1200g', '강진', 0, 1, 60),
('대나무 장식품', 11, 5, '담양 대나무 인테리어 소품', 42000, 35, '/images/products/craft19.jpg', 'craft', '400g', '담양', 0, 1, 55),

-- 서예
('전통 서예 액자', 29, 7, '명필가의 서예 작품', 120000, 15, '/images/products/craft20.jpg', 'craft', '600g', '서울', 1, 1, 45),
('사군자 족자', 29, 7, '사군자 그림 족자', 85000, 20, '/images/products/craft21.jpg', 'craft', '400g', '서울', 0, 1, 50),

-- 그림
('민화 십장생', 30, 7, '전통 민화 십장생도', 150000, 10, '/images/products/craft22.jpg', 'craft', '800g', '전주', 1, 1, 55),
('수묵화 산수화', 30, 7, '전통 수묵 산수화', 180000, 8, '/images/products/craft23.jpg', 'craft', '700g', '서울', 1, 1, 40);

-- 지역 특산품 (local) - categories: 17(농산물), 19(수산물), 20(축산물), 31(특산품), 18(가공식품)
INSERT INTO products (name, category_id, producer_id, description, price, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count) VALUES 
-- 농산물
('제주 한라봉', 17, 12, '제주 청정 한라봉', 35000, 100, '/images/products/local1.jpg', 'gift_set', '3000g', '제주도', 1, 1, 180),
('제주 감귤', 17, 12, '제주 노지 감귤', 28000, 150, '/images/products/local2.jpg', 'gift_set', '5000g', '제주도', 1, 1, 200),
('보성 녹차쌀', 17, 13, '녹차를 먹여 키운 특별한 쌀', 38000, 80, '/images/products/local3.jpg', 'gift_set', '10000g', '전남 보성', 1, 1, 95),
('이천 쌀', 17, 13, '임금님표 이천쌀 10kg', 45000, 100, '/images/products/local4.jpg', 'gift_set', '10000g', '경기 이천', 1, 1, 160),
('담양 죽순', 17, 13, '담양 대나무 죽순', 32000, 60, '/images/products/local5.jpg', 'gift_set', '1000g', '전남 담양', 0, 1, 78),
('공주 밤', 17, 13, '공주 알밤', 28000, 90, '/images/products/local6.jpg', 'gift_set', '2000g', '충남 공주', 0, 1, 85),
('청송 사과', 17, 13, '청송 주왕산 사과', 45000, 100, '/images/products/local7.jpg', 'gift_set', '5000g', '경북 청송', 1, 1, 170),
('나주 배', 17, 13, '나주 신고배', 38000, 80, '/images/products/local8.jpg', 'gift_set', '5000g', '전남 나주', 1, 1, 145),

-- 수산물
('부산 멸치', 19, 10, '부산 앞바다 특산 멸치', 32000, 90, '/images/products/local9.jpg', 'gift_set', '500g', '부산', 1, 1, 110),
('울산 미역', 19, 11, '동해안 청정 해역 미역', 25000, 80, '/images/products/local10.jpg', 'gift_set', '300g', '울산', 0, 1, 85),
('보령 굴비', 19, 10, '보령 명품 굴비', 55000, 50, '/images/products/local11.jpg', 'gift_set', '1200g', '충남 보령', 1, 1, 125),
('영덕 대게', 19, 10, '영덕 특산 대게', 95000, 30, '/images/products/local12.jpg', 'gift_set', '1500g', '경북 영덕', 1, 1, 155),
('울릉도 오징어', 19, 11, '울릉도 건오징어', 48000, 50, '/images/products/local13.jpg', 'gift_set', '500g', '경북 울릉', 0, 1, 88),
('삼척 건어물', 19, 10, '삼척 특산 건어물', 32000, 60, '/images/products/local14.jpg', 'gift_set', '800g', '강원 삼척', 0, 1, 75),
('속초 오징어순대', 19, 10, '속초 명물 오징어순대', 25000, 70, '/images/products/local15.jpg', 'gift_set', '600g', '강원 속초', 0, 1, 98),
('안동 간고등어', 19, 10, '안동 전통 간고등어', 38000, 60, '/images/products/local16.jpg', 'gift_set', '800g', '경북 안동', 0, 1, 65),

-- 축산물
('제주 흑돼지 육포', 20, 12, '제주 흑돼지로 만든 프리미엄 육포', 28000, 70, '/images/products/local17.jpg', 'gift_set', '200g', '제주도', 1, 1, 95),
('횡성 한우', 20, 13, '횡성 1++등급 한우', 120000, 40, '/images/products/local18.jpg', 'gift_set', '2000g', '강원 횡성', 1, 1, 185),

-- 특산품
('영광 모시', 31, 13, '영광 모시 의류', 85000, 40, '/images/products/local19.jpg', 'gift_set', '500g', '전남 영광', 0, 1, 68),
('평창 송이버섯', 31, 13, '평창 자연산 송이', 150000, 20, '/images/products/local20.jpg', 'gift_set', '500g', '강원 평창', 1, 1, 210),
('영양 고추', 31, 13, '영양 청정 고추', 42000, 70, '/images/products/local21.jpg', 'gift_set', '500g', '경북 영양', 0, 1, 95),
('의성 마늘', 31, 13, '의성 육쪽마늘', 35000, 90, '/images/products/local22.jpg', 'gift_set', '1000g', '경북 의성', 1, 1, 132),

-- 가공식품
('하동 야생화 꿀', 18, 2, '지리산 야생화 꿀', 42000, 50, '/images/products/local23.jpg', 'gift_set', '600g', '경남 하동', 1, 1, 120),
('전주 한과', 18, 6, '전통 방식으로 만든 전주 한과', 32000, 80, '/images/products/local24.jpg', 'gift_set', '400g', '전북 전주', 1, 1, 140),
('강릉 커피', 18, 13, '강릉 로스터리 원두', 22000, 90, '/images/products/local25.jpg', 'gift_set', '200g', '강원 강릉', 0, 1, 105),
('경주 빵', 18, 13, '경주 특산 빵', 18000, 100, '/images/products/local26.jpg', 'gift_set', '500g', '경북 경주', 0, 1, 88),
('남원 추어탕', 18, 9, '남원 전통 추어탕', 15000, 70, '/images/products/local27.jpg', 'gift_set', '1000g', '전북 남원', 0, 1, 72),
('서울 전통주', 18, 13, '서울 전통 막걸리', 18000, 80, '/images/products/local28.jpg', 'gift_set', '750ml', '서울', 0, 1, 92),
('정선 곤드레', 18, 13, '정선 산나물 곤드레', 28000, 80, '/images/products/local29.jpg', 'gift_set', '300g', '강원 정선', 0, 1, 82),
('양구 시래기', 18, 13, '양구 청정 시래기', 22000, 90, '/images/products/local30.jpg', 'gift_set', '500g', '강원 양구', 0, 1, 76),
('인제 산나물', 18, 13, '인제 자연산 산나물', 35000, 70, '/images/products/local31.jpg', 'gift_set', '400g', '강원 인제', 0, 1, 88),
('화천 토마토', 18, 13, '화천 방울토마토', 28000, 100, '/images/products/local32.jpg', 'gift_set', '2000g', '강원 화천', 0, 1, 95),
('철원 오대쌀', 18, 13, '철원 DMZ 오대쌀', 42000, 80, '/images/products/local33.jpg', 'gift_set', '10000g', '강원 철원', 1, 1, 165);

-- 외래키 제약 조건 다시 활성화
PRAGMA foreign_keys = ON;
