-- Part 1: DELETE 문과 regions 데이터

DELETE FROM education_curriculum;
DELETE FROM education_categories;
DELETE FROM experiences;
DELETE FROM products;
DELETE FROM events;
DELETE FROM producers;
DELETE FROM categories;
DELETE FROM regions;

INSERT INTO regions (id, name, type, description, featured_image, created_at) VALUES 
(1, '제주도', 'tea', '제주의 청정 자연에서 자란 녹차', '/images/regions/jeju.jpg', '2026-02-18 12:18:03'),
(2, '하동', 'tea', '지리산 자락의 전통 차밭', '/images/regions/hadong.jpg', '2026-02-18 12:18:03'),
(3, '김해', 'tea', '한국 차문화의 발상지', '/images/regions/gimhae.jpg', '2026-02-18 12:18:03'),
(4, '광양', 'tea', '백운산 자락의 청정 차밭', '/images/regions/gwangyang.jpg', '2026-02-18 12:18:03'),
(5, '보성', 'tea', '대한민국 녹차의 수도', '/images/regions/boseong.jpg', '2026-02-18 12:18:03'),
(6, '이천', 'craft', '전통 도자기의 본고장', '/images/regions/icheon.jpg', '2026-02-18 12:18:03'),
(7, '광주', 'craft', '조선백자의 중심지', '/images/regions/gwangju.jpg', '2026-02-18 12:18:03'),
(8, '담양', 'craft', '대나무 공예의 메카', '/images/regions/damyang.jpg', '2026-02-18 12:18:03'),
(9, '안동', 'craft', '한국 정신문화의 수도', '/images/regions/andong.jpg', '2026-02-18 12:18:03'),
(10, '전주', 'craft', '한지와 전통공예', '/images/regions/jeonju.jpg', '2026-02-18 12:18:03'),
(11, '강진', 'craft', '고려청자의 고향', '/images/regions/gangjin.jpg', '2026-02-18 12:18:03'),
(12, '남원', 'craft', '전통 목공예의 중심', '/images/regions/namwon.jpg', '2026-02-18 12:18:03'),
(13, '공주', 'craft', '백제 문화의 보고', '/images/regions/gongju.jpg', '2026-02-18 12:18:03'),
(14, '경주', 'craft', '신라 천년의 공예', '/images/regions/gyeongju.jpg', '2026-02-18 12:18:03'),
(15, '울산', 'craft', '동해안 특산품', '/images/regions/ulsan.jpg', '2026-02-18 12:18:03'),
(16, '부산', 'craft', '해양 도시 특산품', '/images/regions/busan.jpg', '2026-02-18 12:18:03'),
(17, '서울', 'craft', '수도권 특산품', '/images/regions/seoul.jpg', '2026-02-18 12:18:03');
