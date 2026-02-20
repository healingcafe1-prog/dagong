-- =============================================
-- 단계별 완전 복구 SQL (순서 중요!)
-- 2026-02-20 최종판
-- =============================================

-- ===============================================
-- 1단계: 생산자 추가 (FOREIGN KEY 필요)
-- ===============================================

INSERT OR IGNORE INTO producers (id, name, region_id, description, contact_email, contact_phone, address, image, website, certification, created_at) VALUES 
(1, '보성 녹차마을', 4, '한국 최대 규모의 녹차 단지', 'boseong@example.com', '061-850-5555', '전라남도 보성군', '/images/producers/boseong.jpg', 'https://boseong.com', 'GAP인증', '2024-01-01 00:00:00'),
(2, '하동 야생차원', 2, '지리산 야생차 전문', 'hadong@example.com', '055-880-1234', '경상남도 하동군', '/images/producers/hadong.jpg', 'https://hadong.com', '무농약인증', '2024-01-01 00:00:00'),
(3, '제주 오설록', 1, '제주 프리미엄 차', 'osulloc@example.com', '064-123-4567', '제주 서귀포시', '/images/producers/osulloc.jpg', 'https://osulloc.com', '유기농인증', '2024-01-01 00:00:00'),
(4, '이천 도자기마을', 11, '전통 도자기', 'icheon@example.com', '031-630-2222', '경기 이천시', '/images/producers/icheon.jpg', 'https://icheon.com', '명장지정', '2024-01-01 00:00:00'),
(5, '광주 도예공방', 9, '분청사기 전문', 'gwangju@example.com', '031-760-1234', '경기 광주시', '/images/producers/gwangju.jpg', 'https://gwangju.com', '전통공예품', '2024-01-01 00:00:00');

-- ===============================================
-- 2단계: 체험 프로그램 추가 (생산자 필요)
-- ===============================================

INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES 
(5, '하동 야생차 체험', 2, 2, 'tea_experience', '야생차밭 채엽 체험', '3시간', 45000, 15, '/images/experiences/hadong.jpg', 1, '2024-01-10 00:00:00'),
(6, '보성 차밭 투어', 4, 1, 'farm_tour', '녹차밭 관람', '2시간', 30000, 20, '/images/experiences/boseong.jpg', 1, '2024-01-10 00:00:00'),
(7, '제주 다도 체험', 1, 3, 'tea_ceremony', '전통 다례', '2시간', 40000, 10, '/images/experiences/jeju.jpg', 1, '2024-01-10 00:00:00'),
(8, '이천 도자기 만들기', 11, 4, 'craft_workshop', '물레 체험', '3시간', 50000, 12, '/images/experiences/icheon.jpg', 1, '2024-01-10 00:00:00'),
(9, '광주 분청사기 체험', 9, 5, 'craft_workshop', '전통 도자기', '2시간', 35000, 15, '/images/experiences/gwangju.jpg', 1, '2024-01-10 00:00:00');

-- 확인
-- SELECT COUNT(*) FROM producers;  -- 5
-- SELECT COUNT(*) FROM experiences; -- 9 (기존 4 + 신규 5)
