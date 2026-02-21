-- ============================================
-- 다공(茶工) 교육 커리큘럼 마스터 백업 V2
-- 생성일: 2024-02-21 (업데이트)
-- 용도: 데이터 복원 시 기본 데이터
-- 변경: MBTI 티테라피 추가, 티소믈리에/무역 내용 보강
-- ============================================

-- 기존 데이터 삭제
DELETE FROM education_curriculum;

-- ============================================
-- 1. 다도교육 (category_id = 1) - 14개 항목
-- ============================================

-- 1-1. 다도의 의미
INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, created_at) VALUES
(12, 1, '다도의 의미', '다도가 무엇인지, 왜 배워야 하는지 이해합니다', '다도란 차를 우려내고 마시는 일련의 행위를 통해 정신을 수양하고 예절을 익히는 종합예술입니다.', '1.5시간', 'beginner', 1, datetime('now'));

-- 1-2. 다도의 역사와 시대적 변천사
INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, created_at) VALUES
(13, 1, '다도의 역사와 시대적 변천사', '시대별로 다도가 어떻게 발전해왔는지 배웁니다', '한국 다도의 역사는 신라시대부터 시작되어 고려, 조선을 거쳐 현대에 이르기까지 각 시대의 특징을 반영하며 발전해왔습니다.', '2시간', 'intermediate', 2, datetime('now'));

-- 1-3. 다도의 기원과 발전
INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, created_at) VALUES
(31, 1, '다도의 기원과 발전', '차 문화의 시작과 다도의 형성 과정을 학습합니다', '차는 중국에서 기원하여 한국과 일본으로 전파되었으며, 각 나라의 문화와 철학을 반영하며 독특한 다도 문화로 발전했습니다.', '1.5시간', 'beginner', 3, datetime('now'));

-- 1-4. 한국 전통 다도의 역사
INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, created_at) VALUES
(32, 1, '한국 전통 다도의 역사', '신라시대부터 현대까지 한국 다도의 발전 과정을 배웁니다', '한국 다도는 신라 선덕여왕 시대부터 시작되어 고려의 불교 다도, 조선의 선비 다도를 거쳐 현대 한국 다도로 계승되고 있습니다.', '1.5시간', 'intermediate', 4, datetime('now'));

-- 1-5. 중국 다도의 역사와 문화
INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, created_at) VALUES
(33, 1, '중국 다도의 역사와 문화', '차의 발상지 중국의 다도 문화와 철학을 이해합니다', '중국 다도는 당나라 육우의 다경을 시작으로 송대의 점다법, 명청대의 포다법으로 발전하며 중국 문화의 중심이 되었습니다.', '1.5시간', 'intermediate', 5, datetime('now'));

-- 1-6. 일본 다도의 역사와 정신
INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, created_at) VALUES
(34, 1, '일본 다도의 역사와 정신', '일본 다도의 형성과 와비사비 정신을 학습합니다', '일본 다도는 센노리큐에 의해 체계화되었으며, 와비사비의 미학과 일기일회의 정신을 담고 있습니다.', '1.5시간', 'intermediate', 6, datetime('now'));

-- 1-7. 한중일 다도 문화 비교
INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, created_at) VALUES
(35, 1, '한중일 다도 문화 비교', '동아시아 3국의 다도 문화를 비교 분석합니다', '한국, 중국, 일본의 다도는 공통의 뿌리를 가지고 있지만 각 나라의 철학과 미학을 반영하며 독특하게 발전했습니다.', '2시간', 'advanced', 7, datetime('now'));

-- 1-8. 차 힐링 테라피 전문가 과정
INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, created_at) VALUES
(17, 1, '차 힐링 테라피 전문가 과정', '차를 활용한 심신 치유와 힐링 프로그램 운영 방법을 배웁니다', '차의 성분과 효능을 이해하고, 다양한 차 테라피 기법을 익혀 개인 맞춤형 힐링 프로그램을 기획하고 운영할 수 있는 전문가 과정입니다. 아로마테라피, 명상, 요가 등과의 융합 프로그램도 다룹니다.', '3.5시간', 'advanced', 8, datetime('now'));

-- 1-9. 차 가공식품 개발 실무
INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, created_at) VALUES
(19, 1, '차 가공식품 개발 실무', '차를 활용한 다양한 가공식품 개발 방법을 학습합니다', '차를 주재료로 한 음료, 제과, 제빵, 요리 등 다양한 가공식품 개발 실무를 배웁니다. 레시피 개발, 식품안전, 상품화 과정을 실습합니다.', '3시간', 'intermediate', 9, datetime('now'));

-- 1-10. 차 카페 창업 완벽 가이드
INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, created_at) VALUES
(23, 1, '차 카페 창업 완벽 가이드', '차 카페 창업부터 운영까지 전 과정을 배웁니다', '차 카페 컨셉 기획, 입지 선정, 인테리어, 메뉴 개발, 마케팅, 운영 노하우 등 성공적인 차 카페 창업을 위한 실전 가이드를 제공합니다.', '4시간', 'advanced', 10, datetime('now'));

-- 새 항목 추가 시작 --

-- 1-11. 차와공예품 수출입 무역 실무 (업데이트됨)
