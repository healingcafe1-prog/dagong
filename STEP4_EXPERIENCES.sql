-- ========================================
-- STEP 4: 체험 프로그램 (14개)
-- Cloudflare D1 콘솔 복사용
-- ========================================

PRAGMA foreign_keys = OFF;

-- 체험 프로그램 14개
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES
(1, '제주 차밭 산책과 차 만들기 체험', 1, 1, 'tea_experience', '제주 유기농 차밭을 걸으며 차나무를 관찰하고, 직접 차를 따서 덖음차를 만들어보는 체험', '3시간', 45000, 15, '/images/experiences/jeju-tea-farm.jpg', 1, '2024-01-10 00:00:00'),
(2, '보성 녹차밭 명상 힐링', 4, 4, 'tea_ceremony', '드넓은 보성 녹차밭에서 명상과 요가를 하고 차 명상을 경험하는 힐링 프로그램', '2시간', 35000, 20, '/images/experiences/boseong-meditation.jpg', 1, '2024-01-10 00:00:00'),
(3, '광주 전통 다기 만들기', 9, 5, 'craft_workshop', '물레를 이용해 찻잔이나 주전자를 직접 만들고 초벌구이까지 체험', '2.5시간', 55000, 10, '/images/experiences/gwangju-pottery.jpg', 1, '2024-01-10 00:00:00'),
(4, '담양 대나무 다기 만들기', 13, 7, 'craft_workshop', '대나무를 깎아 나만의 찻잔, 차통, 찻상을 만드는 수공예 체험', '2시간', 38000, 12, '/images/experiences/damyang-bamboo.jpg', 1, '2024-01-10 00:00:00'),
(5, '하동 야생차 채엽과 전통 제다', 2, 3, 'tea_experience', '지리산 자락의 야생차밭에서 손으로 차를 따고 전통 덖음 방식으로 차를 만드는 본격 체험', '4시간', 75000, 8, '/images/experiences/hadong-wild-tea.jpg', 1, '2024-01-10 00:00:00'),
(6, '이천 백자 다기 만들기', 11, 6, 'craft_workshop', '왕실 도자기 기법으로 나만의 찻잔이나 주전자를 직접 제작하는 프리미엄 체험', '3시간', 85000, 8, '/images/experiences/icheon-pottery.jpg', 1, '2024-01-10 00:00:00'),
(7, '담양 대나무 다기 만들기', 13, 7, 'craft_workshop', '대나무를 깎아 나만의 찻잔, 차통, 찻상을 만드는 전통 죽세공예 체험', '2.5시간', 48000, 12, '/images/experiences/damyang-bamboo.jpg', 1, '2024-01-10 00:00:00'),
(8, '통영 나전칠기 찻잔받침 만들기', 15, 8, 'craft_workshop', '자개를 박아 나만의 고급 찻잔받침을 만드는 무형문화재 기법 체험', '3시간', 95000, 6, '/images/experiences/tongyeong-mop.jpg', 1, '2024-01-10 00:00:00'),
(9, '장흥 정남진 발효차 체험', 5, 10, 'tea_experience', '남도 전통 발효차를 직접 만들고 숙성 과정을 배우는 특별 체험', '3시간', 58000, 15, '/images/experiences/jangheung-fermented-tea.jpg', 1, '2024-01-10 00:00:00'),
(10, '강진 다산 차 문화 탐방', 6, 11, 'tea_ceremony', '다산 정약용 선생의 차 문화 유적지를 돌아보고 전통 다례를 배우는 문화 체험', '4시간', 65000, 20, '/images/experiences/gangjin-dasan-culture.jpg', 1, '2024-01-10 00:00:00'),
(11, '순천 생태 차밭 명상과 요가', 8, 12, 'tea_experience', '무농약 차밭에서 진행하는 명상, 요가, 차 명상이 결합된 힐링 프로그램', '3시간', 52000, 25, '/images/experiences/suncheon-eco-healing.jpg', 1, '2024-01-10 00:00:00'),
(12, '제주 유기농 말차 체험', 1, 1, 'tea_experience', '제주 녹차를 곱게 갈아 말차를 만들고 말차 음료와 디저트를 만드는 체험', '2.5시간', 48000, 15, '/images/experiences/jeju-matcha.jpg', 1, '2024-01-10 00:00:00'),
(13, '안동 전통 한지로 찻상 만들기', 16, 13, 'craft_workshop', '전통 한지 공예 기법으로 접이식 찻상과 찻잔받침을 만드는 체험', '2.5시간', 42000, 12, '/images/experiences/andong-hanji-craft.jpg', 1, '2024-01-10 00:00:00'),
(14, '평창 고랭지 농장 투어와 차 시음', 17, 9, 'farm_tour', '해발 700m 청정 고랭지 농장을 견학하고 신선한 농산물과 차를 시음하는 힐링 투어', '3시간', 38000, 30, '/images/experiences/pyeongchang-highland-tour.jpg', 1, '2024-01-10 00:00:00');

PRAGMA foreign_keys = ON;

SELECT 'STEP 4 완료: 체험 프로그램 14개 추가됨' AS status;
