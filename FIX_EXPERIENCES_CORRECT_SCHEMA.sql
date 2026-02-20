-- =============================================
-- 체험 프로그램 10개 추가 (정확한 스키마)
-- experiences 테이블: image → main_image
-- 2026-02-20
-- =============================================

-- 5. 하동 야생차 체험
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES (5, '하동 야생차 채엽과 전통 제다', 2, 2, 'tea_experience', '지리산 자락의 야생차밭에서 손으로 차를 따고 전통 덖음 방식으로 차를 만드는 본격 체험', '4시간', 75000, 8, '/images/experiences/hadong-wild-tea.jpg', 1, '2024-01-10 00:00:00');

-- 6. 이천 백자 다기
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES (6, '이천 백자 다기 만들기', 10, 6, 'craft_workshop', '왕실 도자기 기법으로 나만의 찻잔이나 주전자를 직접 제작하는 프리미엄 체험', '3시간', 85000, 8, '/images/experiences/icheon-pottery.jpg', 1, '2024-01-10 00:00:00');

-- 7. 담양 대나무 공예
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES (7, '담양 대나무 다기 만들기', 13, 7, 'craft_workshop', '대나무를 깎아 나만의 찻잔, 차통, 찻상을 만드는 전통 죽세공예 체험', '2.5시간', 48000, 12, '/images/experiences/damyang-bamboo.jpg', 1, '2024-01-10 00:00:00');

-- 8. 통영 나전칠기
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES (8, '통영 나전칠기 찻잔받침 만들기', 15, 8, 'craft_workshop', '자개를 박아 나만의 고급 찻잔받침을 만드는 무형문화재 기법 체험', '3시간', 95000, 6, '/images/experiences/tongyeong-mop.jpg', 1, '2024-01-10 00:00:00');

-- 9. 장흥 발효차
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES (9, '장흥 정남진 발효차 체험', 5, 10, 'tea_experience', '남도 전통 발효차를 직접 만들고 숙성 과정을 배우는 특별 체험', '3시간', 58000, 15, '/images/experiences/jangheung-fermented-tea.jpg', 1, '2024-01-10 00:00:00');

-- 10. 강진 다산 차 문화
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES (10, '강진 다산 차 문화 탐방', 6, 11, 'tea_ceremony', '다산 정약용 선생의 차 문화 유적지를 돌아보고 전통 다례를 배우는 문화 체험', '4시간', 65000, 20, '/images/experiences/gangjin-dasan-culture.jpg', 1, '2024-01-10 00:00:00');

-- 11. 순천 생태 차밭
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES (11, '순천 생태 차밭 명상과 요가', 8, 12, 'tea_experience', '무농약 차밭에서 진행하는 명상, 요가, 차 명상이 결합된 힐링 프로그램', '3시간', 52000, 25, '/images/experiences/suncheon-eco-healing.jpg', 1, '2024-01-10 00:00:00');

-- 12. 제주 말차
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES (12, '제주 유기농 말차 체험', 1, 1, 'tea_experience', '제주 녹차를 곱게 갈아 말차를 만들고 말차 음료와 디저트를 만드는 체험', '2.5시간', 48000, 15, '/images/experiences/jeju-matcha.jpg', 1, '2024-01-10 00:00:00');

-- 13. 안동 한지
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES (13, '안동 전통 한지로 찻상 만들기', 16, 13, 'craft_workshop', '전통 한지 공예 기법으로 접이식 찻상과 찻잔받침을 만드는 체험', '2.5시간', 42000, 12, '/images/experiences/andong-hanji-craft.jpg', 1, '2024-01-10 00:00:00');

-- 14. 평창 고랭지
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, main_image, is_available, created_at) VALUES (14, '평창 고랭지 농장 투어와 차 시음', 17, 9, 'farm_tour', '해발 700m 청정 고랭지 농장을 견학하고 신선한 농산물과 차를 시음하는 힐링 투어', '3시간', 38000, 30, '/images/experiences/pyeongchang-highland-tour.jpg', 1, '2024-01-10 00:00:00');

-- 확인
-- SELECT COUNT(*) FROM experiences;
-- SELECT id, title, price FROM experiences ORDER BY id;
