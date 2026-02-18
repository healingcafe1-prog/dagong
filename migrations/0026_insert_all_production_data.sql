-- 프로덕션 데이터 전체 삽입 마이그레이션

-- 외래 키 제약 조건 비활성화
PRAGMA foreign_keys = OFF;

-- 기존 데이터 삭제
DELETE FROM categories;
DELETE FROM regions;
DELETE FROM events;

-- 카테고리 데이터 (27개)
INSERT INTO categories (id, name, parent_id, type, description, display_order) VALUES
(1, '녹차', NULL, 'tea', '한국 전통 녹차', 1),
(21, '백차', NULL, 'tea', '은은한 향의 백차', 2),
(22, '청차', NULL, 'tea', '반발효 청차', 3),
(2, '황차', NULL, 'tea', '특별한 황차', 4),
(3, '홍차', NULL, 'tea', '완전 발효 홍차', 5),
(4, '발효차', NULL, 'tea', '전통 발효차', 6),
(6, '블렌딩차', NULL, 'tea', '다양한 블렌딩 차', 7),
(9, '다관', NULL, 'craft', '전통 다관', 1),
(8, '찻잔', NULL, 'craft', '다양한 찻잔', 2),
(23, '다기세트', NULL, 'craft', '다기 세트', 3),
(24, '도자기', NULL, 'craft', '전통 도자기', 4),
(25, '목공예', NULL, 'craft', '목공예품', 5),
(26, '금속공예', NULL, 'craft', '금속 공예품', 6),
(27, '한복공예', NULL, 'craft', '한복 관련 공예', 7),
(28, '가죽공예', NULL, 'craft', '가죽 공예품', 8),
(11, '장식품', NULL, 'craft', '인테리어 장식품', 9),
(29, '서예', NULL, 'craft', '서예 작품', 10),
(30, '그림', NULL, 'craft', '전통 그림', 11),
(12, '명절 선물세트', NULL, 'gift', '명절 특별 선물', 1),
(13, '기념일 선물세트', NULL, 'gift', '기념일용 선물', 2),
(14, '기업 선물세트', NULL, 'gift', '기업용 선물', 3),
(15, '맞춤 선물세트', NULL, 'gift', '맞춤형 선물', 4),
(17, '농산물', NULL, 'local', '지역 농산물', 1),
(19, '수산물', NULL, 'local', '지역 수산물', 2),
(20, '축산물', NULL, 'local', '지역 축산물', 3),
(31, '특산품', NULL, 'local', '지역 특산품', 4),
(18, '가공식품', NULL, 'local', '지역 가공식품', 5);

-- 지역 데이터 (17개)
INSERT INTO regions (id, name, type, description) VALUES
(1, '제주도', 'tea', '제주 녹차의 고장'),
(2, '하동', 'tea', '전통 하동 녹차'),
(3, '김해', 'tea', '김해 차 문화'),
(4, '광양', 'tea', '광양 녹차'),
(5, '보성', 'tea', '보성 녹차'),
(6, '강진', 'tea', '강진 차 문화'),
(7, '장흥', 'tea', '장흥 차'),
(8, '부안', 'tea', '부안 차'),
(9, '경기 광주', 'craft', '경기 광주 공예'),
(11, '여주', 'craft', '여주 도자기'),
(10, '이천', 'craft', '이천 도자기'),
(17, '진천', 'craft', '진천 공예'),
(12, '청주', 'craft', '청주 공예'),
(15, '문경', 'craft', '문경 도자기'),
(16, '김해', 'craft', '김해 공예'),
(14, '강진', 'craft', '강진 도자기'),
(13, '부안', 'craft', '부안 공예');

-- 이벤트 데이터 (27개)
INSERT INTO events (id, title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority) VALUES
(4, '신년 맞이 대할인', '새해를 맞아 모든 차 제품 20% 할인', 'discount', 20, '/images/events/new-year-sale.jpg', '2026-01-01', '2026-01-31', 1, 1, 1, 10),
(5, '설날 선물세트 특가', '설날 선물용 프리미엄 세트 30% 할인', 'holiday', 30, '/images/events/lunar-new-year.jpg', '2026-01-15', '2026-02-15', 1, 1, 1, 9),
(6, '봄 햇차 예약판매', '올해 첫 수확 햇차 15% 할인 예약', 'season', 15, '/images/events/spring-tea.jpg', '2026-02-01', '2026-04-30', 1, 2, 1, 10),
(7, '밸런타인데이 차 선물', '사랑하는 사람에게 차 선물 15% 할인', 'holiday', 15, '/images/events/valentine.jpg', '2026-02-01', '2026-02-14', 1, 2, 1, 8),
(8, '봄맞이 녹차 페스티벌', '봄 시즌 녹차 특가 20% 할인', 'season', 20, '/images/events/green-tea-festival.jpg', '2026-03-01', '2026-03-31', 1, 3, 1, 10),
(9, '화이트데이 공예품 특가', '화이트데이 도자기 선물 15% 할인', 'holiday', 15, '/images/events/white-day.jpg', '2026-03-01', '2026-03-14', 1, 3, 1, 8),
(10, '봄나들이 차 세트', '봄나들이용 휴대용 다기 세트 20% 할인', 'season', 20, '/images/events/spring-picnic.jpg', '2026-04-01', '2026-04-30', 1, 4, 1, 10),
(11, '햇차 시음회 이벤트', '햇차 시음회 참가자 특가 25% 할인', 'special', 25, '/images/events/tea-tasting.jpg', '2026-04-15', '2026-04-30', 1, 4, 1, 9),
(12, '어린이날 가족 선물', '어린이날 가족 선물세트 20% 할인', 'holiday', 20, '/images/events/childrens-day.jpg', '2026-04-20', '2026-05-05', 1, 4, 1, 8),
(13, '어버이날 효도 선물', '어버이날 프리미엄 차 선물 25% 할인', 'holiday', 25, '/images/events/parents-day.jpg', '2026-05-01', '2026-05-08', 1, 5, 1, 10),
(14, '가정의 달 감사 이벤트', '가족 건강 선물세트 20% 할인', 'holiday', 20, '/images/events/family-month.jpg', '2026-05-01', '2026-05-31', 1, 5, 1, 9),
(15, '스승의 날 선물', '스승님께 감사 선물 15% 할인', 'holiday', 15, '/images/events/teachers-day.jpg', '2026-05-10', '2026-05-15', 1, 5, 1, 8),
(16, '여름 냉차 시즌', '여름 냉차용 차 제품 20% 할인', 'season', 20, '/images/events/summer-cold-tea.jpg', '2026-06-01', '2026-08-31', 1, 6, 1, 10),
(17, '장마철 특선 차', '장마철 면역력 강화 차 15% 할인', 'season', 15, '/images/events/rainy-season.jpg', '2026-06-15', '2026-07-15', 1, 6, 1, 8),
(18, '여름 휴가 선물세트', '여름 휴가용 선물세트 20% 할인', 'season', 20, '/images/events/summer-vacation.jpg', '2026-07-01', '2026-08-31', 1, 7, 1, 10),
(19, '삼복 건강차 특가', '삼복 건강차 제품 25% 할인', 'special', 25, '/images/events/sambok.jpg', '2026-07-15', '2026-08-15', 1, 7, 1, 9),
(20, '광복절 애국 할인', '광복절 기념 전 제품 15% 할인', 'holiday', 15, '/images/events/liberation-day.jpg', '2026-08-10', '2026-08-15', 1, 8, 1, 10),
(21, '여름 청산 세일', '여름 시즌 재고 정리 30% 할인', 'discount', 30, '/images/events/summer-clearance.jpg', '2026-08-15', '2026-08-31', 1, 8, 1, 9),
(22, '추석 선물세트 대전', '추석 명절 선물세트 30% 할인', 'holiday', 30, '/images/events/chuseok.jpg', '2026-09-01', '2026-09-30', 1, 9, 1, 10),
(23, '가을 햇곡식 특산품', '가을 햇곡식 특산물 20% 할인', 'season', 20, '/images/events/autumn-harvest.jpg', '2026-09-15', '2026-10-31', 1, 9, 1, 9),
(24, '가을 단풍 차 여행', '가을 차산지 여행 패키지 20% 할인', 'special', 20, '/images/events/autumn-tea-tour.jpg', '2026-10-01', '2026-11-30', 1, 10, 1, 10),
(25, '한글날 전통 공예', '한글날 전통 공예품 15% 할인', 'holiday', 15, '/images/events/hangeul-day.jpg', '2026-10-01', '2026-10-09', 1, 10, 1, 8),
(26, '김장 특산품 세일', '김장철 지역 특산품 20% 할인', 'season', 20, '/images/events/kimjang.jpg', '2026-11-01', '2026-11-30', 1, 11, 1, 10),
(27, '블랙프라이데이', '연말 대비 블랙프라이데이 25% 할인', 'discount', 25, '/images/events/black-friday.jpg', '2026-11-20', '2026-11-30', 1, 11, 1, 9),
(28, '크리스마스 선물 대전', '크리스마스 선물세트 30% 할인', 'holiday', 30, '/images/events/christmas.jpg', '2026-12-01', '2026-12-25', 1, 12, 1, 10),
(29, '연말정산 감사세일', '연말 정산 기념 25% 할인', 'discount', 25, '/images/events/year-end-sale.jpg', '2026-12-15', '2026-12-31', 1, 12, 1, 9),
(30, '겨울 홍차 & 발효차', '겨울 따뜻한 홍차·발효차 20% 할인', 'season', 20, '/images/events/winter-tea.jpg', '2026-12-01', '2027-02-28', 1, 12, 1, 8);

-- 외래 키 제약 조건 활성화
PRAGMA foreign_keys = ON;
