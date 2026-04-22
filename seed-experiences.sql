-- 체험·교육 프로그램 샘플 데이터 10개

-- 1. 전통 다도 입문 과정 (다도교육)
INSERT INTO experiences (title, region_id, experience_type, description, duration, price, max_participants, is_available, original_price, discount_rate, commission_rate)
VALUES ('전통 다도 입문 과정', 2, 'tea_ceremony', '한국 전통 차 문화의 기초를 배우는 입문 과정입니다. 차의 역사, 차 예절, 기본 다례를 실습합니다. 매주 월/수/금 오전 10시~12시 진행', '2시간', 35000, 10, 1, 50000, 30, 9.9);

-- 2. 왕실 다례 체험 (다도교육)
INSERT INTO experiences (title, region_id, experience_type, description, duration, price, max_participants, is_available, original_price, discount_rate, commission_rate)
VALUES ('왕실 다례 체험', 1, 'tea_ceremony', '조선시대 궁중에서 행해지던 왕실 다례를 재현하여 체험하는 특별 프로그램입니다. 매주 토/일 오후 2시~3시 30분 진행', '1.5시간', 56000, 8, 1, 80000, 30, 9.9);

-- 3. 나만의 블렌딩티 만들기 (차 체험)
INSERT INTO experiences (title, region_id, experience_type, description, duration, price, max_participants, is_available, original_price, discount_rate, commission_rate)
VALUES ('나만의 블렌딩티 만들기', 5, 'tea_experience', '다양한 차와 허브를 활용해 나만의 블렌딩티를 만드는 체험입니다. 취향에 맞는 레시피를 찾아보세요. 매주 화/목 오후 3시~5시', '2시간', 42000, 12, 1, 60000, 30, 9.9);

-- 4. 제주 차밭 트레킹 (농장 투어)
INSERT INTO experiences (title, region_id, experience_type, description, duration, price, max_participants, is_available, original_price, discount_rate, commission_rate)
VALUES ('제주 차밭 트레킹', 1, 'farm_tour', '제주 청정 차밭을 걸으며 차나무의 성장과 재배 과정을 직접 보는 체험입니다. 평일 오전 9시~11시 진행', '2시간', 24500, 20, 1, 35000, 30, 9.9);

-- 5. 하동 지리산 차 농장 투어 (농장 투어)
INSERT INTO experiences (title, region_id, experience_type, description, duration, price, max_participants, is_available, original_price, discount_rate, commission_rate)
VALUES ('하동 지리산 차 농장', 2, 'farm_tour', '지리산 자락의 전통 차밭에서 차 따기 체험과 제차 과정을 배웁니다. 매주 토/일 오전 8시~11시 진행', '3시간', 35000, 15, 1, 50000, 30, 9.9);

-- 6. 차와 함께하는 명상 (차 체험)
INSERT INTO experiences (title, region_id, experience_type, description, duration, price, max_participants, is_available, original_price, discount_rate, commission_rate)
VALUES ('차와 함께하는 명상', 5, 'tea_experience', '차를 마시며 명상과 마음챙김을 실천하는 힐링 프로그램입니다. 매주 화/목 오전 10시~12시 진행', '2시간', 42000, 12, 1, 60000, 30, 9.9);

-- 7. 전통 찻잔 만들기 (공예 체험)
INSERT INTO experiences (title, region_id, experience_type, description, duration, price, max_participants, is_available, original_price, discount_rate, commission_rate)
VALUES ('전통 찻잔 만들기', 6, 'craft_workshop', '이천 도예가와 함께 나만의 찻잔을 직접 만들어보는 도자기 체험입니다. 매주 토/일 오전 10시~오후 1시 진행', '3시간', 49000, 10, 1, 70000, 30, 9.9);

-- 8. 청자 소품 공예 (공예 체험)
INSERT INTO experiences (title, region_id, experience_type, description, duration, price, max_participants, is_available, original_price, discount_rate, commission_rate)
VALUES ('청자 소품 공예', 11, 'craft_workshop', '고려청자 기법으로 작은 소품을 만들어보는 전통 공예 체험입니다. 매주 토요일 오후 2시~4시 30분 진행', '2.5시간', 59500, 8, 1, 85000, 30, 9.9);

-- 9. 이천 도예 명인 공방 (공방 견학)
INSERT INTO experiences (title, region_id, experience_type, description, duration, price, max_participants, is_available, original_price, discount_rate, commission_rate)
VALUES ('이천 도예 명인 공방', 6, 'workshop_visit', '이천 도예 명인의 작업실을 방문하여 전통 도자기 제작 과정을 견학합니다. 매주 화/목/토 오후 2시~3시 30분 진행', '1.5시간', 31500, 15, 1, 45000, 30, 9.9);

-- 10. 강진 청자 도요지 (공방 견학)
INSERT INTO experiences (title, region_id, experience_type, description, duration, price, max_participants, is_available, original_price, discount_rate, commission_rate)
VALUES ('강진 청자 도요지', 11, 'workshop_visit', '고려청자의 본고장 강진에서 전통 가마와 제작 과정을 견학합니다. 매주 토/일 오후 1시~3시 30분 진행', '2.5시간', 35000, 20, 1, 50000, 30, 9.9);
