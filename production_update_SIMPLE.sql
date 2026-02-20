-- ================================================================
-- 다공 프로덕션 데이터베이스 업데이트 (간소화 버전)
-- 생성일: 2026-02-19
-- 전체 복사 후 Cloudflare Console에 붙여넣기
-- ================================================================

-- 기존 데이터 삭제
DELETE FROM education_curriculum;
DELETE FROM education_categories;
DELETE FROM experiences;
DELETE FROM products;
DELETE FROM events;
DELETE FROM producers;
DELETE FROM categories;
DELETE FROM regions;

-- 지역 데이터 (17개)
INSERT INTO regions (id, name, type, description, image_path, created_at) VALUES
(1, '제주도', 'tea', '제주의 청정 자연에서 자란 녹차', '/images/regions/jeju.jpg', '2026-02-18 12:18:03'),
(2, '하동', 'tea', '천년의 역사를 가진 하동 야생차', '/images/regions/hadong.jpg', '2026-02-18 12:18:03'),
(3, '김해', 'tea', '부드럽고 맛 좋은 김해 차', '/images/regions/gimhae.jpg', '2026-02-18 12:18:03'),
(4, '광양', 'tea', '맑은 물에서 자란 광양 차', '/images/regions/gwangyang.jpg', '2026-02-18 12:18:03'),
(5, '보성', 'tea', '한국 최대 차 산지 보성', '/images/regions/boseong.jpg', '2026-02-18 12:18:03'),
(6, '이천', 'craft', '전통 도자기의 본고장', '/images/regions/icheon.jpg', '2026-02-18 12:18:03'),
(7, '광주', 'craft', '조선백자의 중심지', '/images/regions/gwangju.jpg', '2026-02-18 12:18:03'),
(8, '담양', 'craft', '대나무 공예의 명가', '/images/regions/damyang.jpg', '2026-02-18 12:18:03'),
(9, '안동', 'craft', '유교문화와 목공예', '/images/regions/andong.jpg', '2026-02-18 12:18:03'),
(10, '전주', 'craft', '한지와 한옥의 고장', '/images/regions/jeonju.jpg', '2026-02-18 12:18:03'),
(11, '강진', 'craft', '고려청자의 발상지', '/images/regions/gangjin.jpg', '2026-02-18 12:18:03'),
(12, '남원', 'craft', '목공예와 악기 제작', '/images/regions/namwon.jpg', '2026-02-18 12:18:03'),
(13, '공주', 'craft', '백제 문화의 중심', '/images/regions/gongju.jpg', '2026-02-18 12:18:03'),
(14, '경주', 'craft', '신라 천년의 역사', '/images/regions/gyeongju.jpg', '2026-02-18 12:18:03'),
(15, '울산', 'local', '동해안 해양문화 특산품', '/images/regions/ulsan.jpg', '2026-02-18 12:18:03'),
(16, '부산', 'local', '항구도시의 다양한 특산품', '/images/regions/busan.jpg', '2026-02-18 12:18:03'),
(17, '서울', 'local', '전통과 현대가 공존하는 서울', '/images/regions/seoul.jpg', '2026-02-18 12:18:03');

