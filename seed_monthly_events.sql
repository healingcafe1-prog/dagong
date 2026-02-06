-- ===================================================
-- 월별 행사 및 할인 이벤트 데이터
-- Created: 2026-02-06
-- Description: 12개월 연중 이벤트 추가
-- ===================================================

-- 기존 이벤트 삭제
DELETE FROM events;

-- 1월: 신년 이벤트
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('신년 맞이 대할인', '새해를 맞아 전 상품 20% 할인', 'discount', 20, '/images/events/jan-newyear.jpg', '2026-01-01', '2026-01-31', 1, 1, 1, 10),
('설날 선물세트 특가', '설날 선물세트 최대 30% 할인', 'holiday', 30, '/images/events/jan-seollal.jpg', '2026-01-15', '2026-02-05', 1, 1, 1, 9);

-- 2월: 봄 시즌 이벤트
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('봄 햇차 예약판매', '올해 첫 수확 햇차 예약 시작', 'season', 15, '/images/events/feb-spring-tea.jpg', '2026-02-01', '2026-02-28', 1, 2, 1, 10),
('밸런타인데이 차 선물', '사랑하는 사람에게 차 선물', 'holiday', 15, '/images/events/feb-valentine.jpg', '2026-02-01', '2026-02-14', 1, 2, 1, 8);

-- 3월: 봄 맞이 이벤트
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('봄맞이 녹차 페스티벌', '신선한 봄 녹차 특별전', 'season', 20, '/images/events/mar-green-tea.jpg', '2026-03-01', '2026-03-31', 1, 3, 1, 10),
('화이트데이 공예품', '손수 만든 공예품 선물', 'holiday', 15, '/images/events/mar-whiteday.jpg', '2026-03-01', '2026-03-14', 1, 3, 1, 8);

-- 4월: 봄차 시즌
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('우전차 시즌 특가', '최고급 우전차 할인 판매', 'season', 15, '/images/events/apr-woojeon.jpg', '2026-04-01', '2026-04-30', 1, 4, 1, 10),
('봄나들이 차세트', '야외 나들이용 차 세트', 'special', 20, '/images/events/apr-picnic.jpg', '2026-04-01', '2026-04-30', 1, 4, 1, 7);

-- 5월: 가정의 달
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('어버이날 효도 선물', '부모님께 드리는 프리미엄 선물세트', 'holiday', 25, '/images/events/may-parents.jpg', '2026-05-01', '2026-05-08', 1, 5, 1, 10),
('가정의 달 감사 이벤트', '가족과 함께하는 차 체험', 'special', 20, '/images/events/may-family.jpg', '2026-05-01', '2026-05-31', 1, 5, 1, 9),
('스승의 날 선물', '선생님께 감사의 마음을 담아', 'holiday', 15, '/images/events/may-teacher.jpg', '2026-05-01', '2026-05-15', 1, 5, 1, 8);

-- 6월: 여름 시즌
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('여름 냉차 특집', '시원한 냉침 녹차 페스티벌', 'season', 20, '/images/events/jun-cold-tea.jpg', '2026-06-01', '2026-06-30', 1, 6, 1, 10),
('현충일 감사 할인', '나라를 위한 분들께 감사', 'holiday', 15, '/images/events/jun-memorial.jpg', '2026-06-01', '2026-06-06', 1, 6, 1, 7);

-- 7월: 여름 휴가
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('여름 휴가 선물세트', '휴가지에서 즐기는 차', 'season', 20, '/images/events/jul-vacation.jpg', '2026-07-01', '2026-07-31', 1, 7, 1, 10),
('여름 공예품 특가', '시원한 청자 찻잔 할인', 'discount', 25, '/images/events/jul-craft.jpg', '2026-07-01', '2026-07-31', 1, 7, 1, 8);

-- 8월: 여름 말 / 광복절
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('광복절 감사 세일', '대한민국 만세! 특별 할인', 'holiday', 20, '/images/events/aug-independence.jpg', '2026-08-01', '2026-08-15', 1, 8, 1, 10),
('말차 빙수 시즌', '여름철 시원한 말차 음료', 'season', 15, '/images/events/aug-matcha.jpg', '2026-08-01', '2026-08-31', 1, 8, 1, 8);

-- 9월: 추석 명절
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('추석 선물세트 대전', '명절 선물의 정석, 차와 공예', 'holiday', 30, '/images/events/sep-chuseok.jpg', '2026-09-01', '2026-09-30', 1, 9, 1, 10),
('가을 햇곡식 특산품', '햅쌀, 햇과일과 함께하는 차', 'season', 20, '/images/events/sep-harvest.jpg', '2026-09-01', '2026-09-30', 1, 9, 1, 9);

-- 10월: 가을 단풍 시즌
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('가을 단풍 차여행', '단풍 명소 차산지 투어', 'special', 20, '/images/events/oct-autumn.jpg', '2026-10-01', '2026-10-31', 1, 10, 1, 10),
('한글날 특별 할인', '우리 글, 우리 차', 'holiday', 15, '/images/events/oct-hangeul.jpg', '2026-10-01', '2026-10-09', 1, 10, 1, 8);

-- 11월: 김장 시즌 / 빼빼로데이
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('김장 후 면역차 특집', '몸을 따뜻하게 하는 차', 'season', 20, '/images/events/nov-immunity.jpg', '2026-11-01', '2026-11-30', 1, 11, 1, 10),
('수능 응원 이벤트', '수험생 힐링 차 세트', 'special', 25, '/images/events/nov-exam.jpg', '2026-11-01', '2026-11-20', 1, 11, 1, 9);

-- 12월: 겨울 / 크리스마스 / 연말
INSERT INTO events (title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
('크리스마스 선물 대전', '소중한 사람에게 차 선물', 'holiday', 30, '/images/events/dec-christmas.jpg', '2026-12-01', '2026-12-25', 1, 12, 1, 10),
('연말정산 감사세일', '한 해를 마무리하는 특가', 'discount', 25, '/images/events/dec-yearend.jpg', '2026-12-01', '2026-12-31', 1, 12, 1, 9),
('겨울 홍차 & 발효차', '따뜻한 겨울을 위한 차', 'season', 20, '/images/events/dec-winter-tea.jpg', '2026-12-01', '2026-12-31', 1, 12, 1, 8);

-- 참고: 현재 활성화할 이벤트만 is_active = 1로 설정
-- 날짜가 지난 이벤트는 자동으로 is_active = 0으로 변경하는 로직 필요
