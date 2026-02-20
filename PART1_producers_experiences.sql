-- =============================================
-- PART 1: 생산자 + 체험 프로그램
-- 생산자 8개 + 체험 6개 추가
-- =============================================

-- 생산자 추가 (5 → 13, 8개)
INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (6, '제주 다원명가', 1, 'tea', '제주 화산토 유기농 녹차', '3대째 차 농가', 'jejutea@example.com', '064-123-4567', '제주 서귀포시', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (7, '제주 차향', 1, 'tea', '제주 전통 발효차', '자연 발효', 'chahyang@example.com', '064-234-5678', '제주 제주시', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (8, '광주 도예공방', 10, 'craft', '전통 백자', '30년 경력', 'gwangjupot@example.com', '031-123-4567', '경기 광주시', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (9, '이천 도자예술촌', 10, 'craft', '청자 백자', '이천 전통', 'icheon@example.com', '031-234-5678', '경기 이천시', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (10, '담양 죽세공예', 11, 'craft', '대나무 공예', '전통 죽세', 'damyang@example.com', '061-123-4567', '전남 담양군', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (11, '통영 나전칠기', 12, 'craft', '나전칠기', '전통 나전', 'tongyeong@example.com', '055-123-4567', '경남 통영시', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (12, '평창 농특산', 13, 'tea', '고랭지 특산물', '청정 재배', 'pyeongchang@example.com', '033-123-4567', '강원 평창군', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, producer_type, description, story, contact_email, contact_phone, address, created_at) VALUES (13, '장흥 정남진차', 14, 'tea', '정남진 청태전', '전통 발효차', 'jangheung@example.com', '061-234-5678', '전남 장흥군', '2024-01-01 00:00:00');

-- 체험 프로그램 추가 (4 → 10, 6개)
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, is_available, created_at) VALUES (5, '하동 야생차 체험', 2, 2, 'tea_experience', '야생차밭 체험', '3시간', 45000, 15, 1, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, is_available, created_at) VALUES (6, '보성 차밭 투어', 5, 1, 'farm_tour', '보성 녹차밭 관람', '2시간', 30000, 20, 1, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, is_available, created_at) VALUES (7, '제주 다도 체험', 1, 6, 'tea_ceremony', '전통 다례 배우기', '2시간', 40000, 10, 1, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, is_available, created_at) VALUES (8, '이천 도자기 만들기', 10, 9, 'craft_workshop', '물레 체험', '3시간', 50000, 12, 1, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, is_available, created_at) VALUES (9, '담양 대나무 공예', 11, 10, 'craft_workshop', '죽세 공예', '2시간', 35000, 15, 1, '2024-01-01 00:00:00');

INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, is_available, created_at) VALUES (10, '제주 차 만들기', 1, 7, 'tea_experience', '차 제조 체험', '4시간', 60000, 10, 1, '2024-01-01 00:00:00');

-- 확인
-- SELECT COUNT(*) FROM producers; -- 13
-- SELECT COUNT(*) FROM experiences; -- 10
