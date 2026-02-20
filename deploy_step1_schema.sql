-- Step 1: 기본 데이터 삭제 및 지역/카테고리 삽입
PRAGMA foreign_keys = OFF;

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

-- 지역 데이터 (17개)
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

-- 카테고리 데이터 (27개)
INSERT INTO categories (id, name, parent_id, type, description, display_order, created_at) VALUES
(1, '녹차', NULL, 'tea', '발효하지 않은 신선한 차', 1, CURRENT_TIMESTAMP),
(2, '황차', NULL, 'tea', '살짝 발효시킨 노란빛 차', 2, CURRENT_TIMESTAMP),
(3, '홍차', NULL, 'tea', '완전 발효시킨 붉은 차', 3, CURRENT_TIMESTAMP),
(4, '발효차', NULL, 'tea', '발효 과정을 거친 전통 차', 4, CURRENT_TIMESTAMP),
(6, '블렌딩차', NULL, 'tea', '여러 재료를 혼합한 차', 5, CURRENT_TIMESTAMP),
(21, '백차', NULL, 'tea', '가장 순수한 형태의 차', 6, CURRENT_TIMESTAMP),
(22, '청차', NULL, 'tea', '반발효차, 우롱차', 7, CURRENT_TIMESTAMP),
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
(12, '명절 선물세트', NULL, 'gift', '명절용 고급 선물세트', 20, CURRENT_TIMESTAMP),
(13, '기념일 선물세트', NULL, 'gift', '기념일용 선물세트', 21, CURRENT_TIMESTAMP),
(17, '농산물', NULL, 'local', '지역 농산물', 22, CURRENT_TIMESTAMP),
(18, '가공식품', NULL, 'local', '지역 가공식품', 23, CURRENT_TIMESTAMP),
(19, '수산물', NULL, 'local', '지역 수산물', 24, CURRENT_TIMESTAMP),
(20, '축산물', NULL, 'local', '지역 축산물', 25, CURRENT_TIMESTAMP),
(31, '특산품', NULL, 'local', '지역 특산품', 26, CURRENT_TIMESTAMP);

PRAGMA foreign_keys = ON;
