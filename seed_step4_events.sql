-- 이벤트 데이터
INSERT OR REPLACE INTO events (id, title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active) VALUES
(1, '신년 맞이 특별 할인', '새해를 맞아 모든 차 제품 20% 할인', 'discount', 20, '/images/events/new-year.jpg', '2026-01-01', '2026-01-31', 1),
(2, '봄 햇차 시즌 이벤트', '올해 첫 수확 햇차 예약 판매 시작', 'season', 15, '/images/events/spring-tea.jpg', '2026-02-01', '2026-04-30', 1),
(3, '장인 초대전', '이천 도예 명인들의 특별 작품 전시', 'new_product', 0, '/images/events/master-exhibition.jpg', '2026-03-01', '2026-03-31', 1);
