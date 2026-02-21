-- ============================================
-- 다공(茶工) 교육 커리큘럼 마스터 백업
-- 생성일: 2024-02-21
-- 용도: 데이터 복원 시 기본 데이터
-- ============================================

-- 기존 데이터 삭제
DELETE FROM education_curriculum;

-- ============================================
-- 1. 다도교육 (category_id = 1) - 13개 항목
-- ============================================

-- 1-1. 다도의 의미
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(12, 1, '다도의 의미', '다도가 무엇인지, 왜 배워야 하는지 이해합니다', '다도란 차를 우려내고 마시는 일련의 행위를 통해 정신을 수양하고 예절을 익히는 종합예술입니다.', 90, 'beginner', 1, datetime('now'));

-- 1-2. 다도의 역사와 시대적 변천사
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(13, 1, '다도의 역사와 시대적 변천사', '시대별로 다도가 어떻게 발전해왔는지 배웁니다', '한국 다도의 역사는 신라시대부터 시작되어 고려, 조선을 거쳐 현대에 이르기까지 각 시대의 특징을 반영하며 발전해왔습니다.', 120, 'intermediate', 2, datetime('now'));

-- 1-3. 다도의 기원과 발전
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(31, 1, '다도의 기원과 발전', '차 문화의 시작과 다도의 형성 과정을 학습합니다', '차는 중국에서 기원하여 한국과 일본으로 전파되었으며, 각 나라의 문화와 철학을 반영하며 독특한 다도 문화로 발전했습니다.', 90, 'beginner', 3, datetime('now'));

-- 1-4. 한국 전통 다도의 역사
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(32, 1, '한국 전통 다도의 역사', '신라시대부터 현대까지 한국 다도의 발전 과정을 배웁니다', '한국 다도는 신라 선덕여왕 시대부터 시작되어 고려의 불교 다도, 조선의 선비 다도를 거쳐 현대 한국 다도로 계승되고 있습니다.', 90, 'intermediate', 4, datetime('now'));

-- 1-5. 중국 다도의 역사와 문화
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(33, 1, '중국 다도의 역사와 문화', '차의 발상지 중국의 다도 문화와 철학을 이해합니다', '중국 다도는 당나라 육우의 다경을 시작으로 송대의 점다법, 명청대의 포다법으로 발전하며 중국 문화의 중심이 되었습니다.', 90, 'intermediate', 5, datetime('now'));

-- 1-6. 일본 다도의 역사와 정신
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(34, 1, '일본 다도의 역사와 정신', '일본 다도의 형성과 와비사비 정신을 학습합니다', '일본 다도는 센노리큐에 의해 체계화되었으며, 와비사비의 미학과 일기일회의 정신을 담고 있습니다.', 90, 'intermediate', 6, datetime('now'));

-- 1-7. 한중일 다도 문화 비교
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(35, 1, '한중일 다도 문화 비교', '동아시아 3국의 다도 문화를 비교 분석합니다', '한국, 중국, 일본의 다도는 공통의 뿌리를 가지고 있지만 각 나라의 철학과 미학을 반영하며 독특하게 발전했습니다.', 120, 'advanced', 7, datetime('now'));

-- 1-8. 차 힐링 테라피 전문가 과정
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(17, 1, '차 힐링 테라피 전문가 과정', '차를 활용한 심신 치유와 힐링 프로그램 운영 방법을 배웁니다', '차의 성분과 효능을 이해하고, 다양한 차 테라피 기법을 익혀 개인 맞춤형 힐링 프로그램을 기획하고 운영할 수 있는 전문가 과정입니다. 아로마테라피, 명상, 요가 등과의 융합 프로그램도 다룹니다.', 210, 'advanced', 8, datetime('now'));

-- 1-9. 차 가공식품 개발 실무
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(19, 1, '차 가공식품 개발 실무', '차를 활용한 다양한 가공식품 개발 방법을 학습합니다', '차를 주재료로 한 음료, 제과, 제빵, 요리 등 다양한 가공식품 개발 실무를 배웁니다. 레시피 개발, 식품안전, 상품화 과정을 실습합니다.', 180, 'intermediate', 9, datetime('now'));

-- 1-10. 차 카페 창업 완벽 가이드
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(23, 1, '차 카페 창업 완벽 가이드', '차 카페 창업부터 운영까지 전 과정을 배웁니다', '차 카페 컨셉 기획, 입지 선정, 인테리어, 메뉴 개발, 마케팅, 운영 노하우 등 성공적인 차 카페 창업을 위한 실전 가이드를 제공합니다.', 240, 'advanced', 10, datetime('now'));

-- 1-11. 차 수출입 무역 실무
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(25, 1, '차 수출입 무역 실무', '차 무역의 전 과정과 국제 시장 동향을 학습합니다', '차 수출입 절차, 통관, 품질 인증, 국제 차 시장 분석, 바이어 발굴, 계약서 작성 등 차 무역 실무를 배웁니다.', 180, 'advanced', 11, datetime('now'));

-- 1-12. 차 문화 관광 해설사 양성
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(27, 1, '차 문화 관광 해설사 양성', '차 문화 관광 프로그램 기획과 해설 능력을 키웁니다', '차 산지 관광, 차 박물관 해설, 차 문화 체험 프로그램 기획 및 진행 능력을 배양하여 전문 해설사로 성장합니다.', 150, 'intermediate', 12, datetime('now'));

-- 1-13. 차 소믈리에 (차 품평 전문가)
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(29, 1, '차 소믈리에 (차 품평 전문가)', '전문적인 차 감별과 품평 능력을 배양합니다', '차의 품종, 산지, 가공 방법에 따른 특성을 이해하고, 시각, 후각, 미각을 통한 전문적인 차 품평 기술을 익힙니다. 차 등급 평가, 블렌딩, 페어링 등 소믈리에 실무를 다룹니다.', 240, 'advanced', 13, datetime('now'));

-- ============================================
-- 4. 명상교육 (category_id = 4) - 12개 항목
-- ============================================

-- 4-1. 명상의 역사
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(14, 4, '명상의 역사', '명상의 역사를 통해 현대 명상의 의미를 이해합니다', '명상의 역사를 통해 현대 명상의 의미를 이해합니다. 고대 인도에서 시작된 명상이 불교와 함께 동아시아로 전파되고, 현대에는 서양의 과학적 연구와 만나 전 세계적으로 확산된 과정을 배웁니다.', 90, 'beginner', 1, datetime('now'));

-- 4-2. 명상의 정의와 원리
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(15, 4, '명상의 정의와 원리', '명상이란 무엇인지, 어떤 원리로 작동하는지 배웁니다', '명상이란 무엇인지, 어떤 원리로 작동하는지 배웁니다. 집중 명상과 통찰 명상의 차이, 명상이 뇌와 신체에 미치는 영향, 과학적 연구 결과 등을 이해합니다.', 90, 'beginner', 2, datetime('now'));

-- 4-3. 명상의 종류와 방법
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(16, 4, '명상의 종류와 방법', '호흡 명상, 만트라 명상, 걷기 명상, 자비 명상 등 다양한 명상 기법을 배우고 실습합니다', '호흡 명상, 만트라 명상, 걷기 명상, 자비 명상 등 다양한 명상 기법을 배우고 실습합니다. 각 명상법의 특징과 효과를 이해하고 자신에게 맞는 방법을 찾습니다.', 120, 'beginner', 3, datetime('now'));

-- 4-4. 명상의 기원과 고대 역사
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(38, 4, '명상의 기원과 고대 역사', '고대 인도에서 시작된 명상의 기원과 초기 발전 과정을 학습합니다', '명상은 기원전 1500년경 인도에서 시작되어 요가와 함께 발전했습니다. 우파니샤드와 베다 경전에 나타난 초기 명상 수행법을 배웁니다.', 90, 'intermediate', 4, datetime('now'));

-- 4-5. 불교 명상의 발전과 전파
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(39, 4, '불교 명상의 발전과 전파', '붓다의 명상법과 불교를 통한 명상의 동아시아 전파를 배웁니다', '붓다가 체계화한 사념처(四念處) 명상과 위빠사나 명상이 동남아시아, 중국, 한국, 일본으로 전파된 과정을 학습합니다.', 90, 'intermediate', 5, datetime('now'));

-- 4-6. 한국 전통 명상의 역사
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(40, 4, '한국 전통 명상의 역사', '한국 불교의 선 수행과 전통 명상법을 이해합니다', '신라시대부터 현대까지 한국 불교의 간화선, 묵조선 등 선 수행과 단학, 국선도 등 한국 고유의 명상 전통을 배웁니다.', 90, 'intermediate', 6, datetime('now'));

-- 4-7. 중국 도교 명상과 기공
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(41, 4, '중국 도교 명상과 기공', '도교의 내단 수행과 기공의 원리를 학습합니다', '중국 도교의 좌망(坐忘), 내단(內丹) 수행법과 기공의 철학 및 실천 방법을 배웁니다.', 90, 'intermediate', 7, datetime('now'));

-- 4-8. 일본 선(禪)과 좌선 수행
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(42, 4, '일본 선(禪)과 좌선 수행', '일본 선불교의 좌선 수행법과 정신을 이해합니다', '일본 조동종과 임제종의 좌선 수행법, 화두 참구, 일상생활 선을 배우며 일본 선의 특징을 이해합니다.', 90, 'intermediate', 8, datetime('now'));

-- 4-9. 명상의 서양 전파
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(43, 4, '명상의 서양 전파', '동양 명상이 서양으로 전파되고 현대화된 과정을 배웁니다', '19세기 말부터 시작된 동양 명상의 서양 전파와 MBSR 등 현대적 명상 프로그램의 발전 과정을 학습합니다.', 90, 'advanced', 9, datetime('now'));

-- 4-10. 한중일 명상 문화 비교
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(44, 4, '한중일 명상 문화 비교', '동아시아 3국의 명상 문화를 비교 분석합니다', '한국의 선, 중국의 선과 도교, 일본의 선이 각각 어떤 특징을 가지고 발전했는지 비교하며 동아시아 명상 문화를 종합적으로 이해합니다.', 120, 'advanced', 10, datetime('now'));

-- 4-11. 현대 명상과 마음챙김
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(45, 4, '현대 명상과 마음챙김', 'MBSR, MBCT 등 현대 명상 프로그램과 과학적 연구를 배웁니다', '존 카밧진의 MBSR을 중심으로 현대 명상 프로그램과 명상의 신경과학적 효과, 임상 적용 사례를 학습합니다.', 120, 'advanced', 11, datetime('now'));

-- 4-12. 차와 함께하는 명상
INSERT INTO education_curriculum (id, category_id, title, description, content, duration_minutes, difficulty, display_order, created_at) VALUES
(46, 4, '차와 함께하는 명상', '차를 마시는 과정을 통한 마음챙김 명상을 실천합니다', '차를 우리고 마시는 모든 과정을 마음챙김의 대상으로 삼아 일상 속 명상을 실천하는 방법을 배웁니다.', 90, 'intermediate', 12, datetime('now'));

