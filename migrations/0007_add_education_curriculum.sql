-- 교육 커리큘럼 테이블 생성

-- 교육 카테고리 테이블
CREATE TABLE IF NOT EXISTS education_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  parent_id INTEGER,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  icon TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES education_categories(id)
);

-- 교육 커리큘럼 테이블
CREATE TABLE IF NOT EXISTS education_curriculum (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  duration TEXT,
  difficulty TEXT CHECK(difficulty IN ('beginner', 'intermediate', 'advanced')),
  display_order INTEGER DEFAULT 0,
  thumbnail_image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES education_categories(id)
);

-- 교육 카테고리 데이터 삽입
-- 최상위 카테고리: 다도교육
INSERT INTO education_categories (id, name, parent_id, description, display_order, icon) VALUES
(1, '다도교육', NULL, '차와 공예에 대한 체계적인 교육 프로그램', 1, 'fa-graduation-cap');

-- 차공부 카테고리 (parent_id = 1)
INSERT INTO education_categories (id, name, parent_id, description, display_order, icon) VALUES
(2, '차공부', 1, '차의 역사와 문화, 종류와 우리는 방법을 배웁니다', 1, 'fa-mug-hot');

-- 공예공부 카테고리 (parent_id = 1)
INSERT INTO education_categories (id, name, parent_id, description, display_order, icon) VALUES
(3, '공예공부', 1, '한국 전통 공예의 역사와 제작 기법을 배웁니다', 2, 'fa-palette');

-- 차공부 커리큘럼
INSERT INTO education_curriculum (category_id, title, description, content, duration, difficulty, display_order) VALUES
-- 차의 역사
(2, '차의 역사', '차가 어떻게 시작되었고 세계로 퍼져나갔는지 배웁니다', 
'차의 기원은 중국에서 시작되어 실크로드를 통해 전 세계로 퍼져나갔습니다. 차는 단순한 음료를 넘어 문화와 예술의 영역으로 발전했으며, 각 나라마다 독특한 차 문화를 형성했습니다.',
'60분', 'beginner', 1),

-- 한국차의 역사
(2, '한국차의 역사', '삼국시대부터 현대까지 한국차 문화의 발전 과정을 살펴봅니다',
'한국의 차 문화는 삼국시대에 불교와 함께 전래되어 고려시대에 전성기를 맞이했습니다. 조선시대 유교문화 속에서도 선비들의 차 문화가 꽃피웠고, 현대에는 전통차의 부활과 함께 새로운 차 문화가 형성되고 있습니다.',
'90분', 'beginner', 2),

-- 6대 차류
(2, '6대 차류', '녹차, 백차, 황차, 청차, 홍차, 흑차의 특징과 차이를 배웁니다',
'차는 발효 정도에 따라 6가지 종류로 분류됩니다. 녹차(불발효차), 백차(약발효차), 황차(미발효차), 청차(반발효차), 홍차(완전발효차), 흑차(후발효차)는 각각 독특한 색, 향, 맛을 지니고 있습니다.',
'120분', 'intermediate', 3),

-- 한국차의 종류
(2, '한국차의 종류', '한국에서 생산되는 다양한 차의 종류와 특징을 배웁니다',
'한국차는 녹차, 발효차, 말차를 중심으로 다양하게 발전했습니다. 지역별로 제주 녹차, 하동 야생차, 보성 녹차 등 특색있는 차가 생산되며, 전통 제다법으로 만든 덖음차와 증제차가 대표적입니다.',
'90분', 'intermediate', 4),

-- 차의 이로운 점
(2, '차의 이로운 점', '차가 건강에 미치는 긍정적인 영향을 과학적으로 배웁니다',
'차에는 카테킨, 테아닌, 비타민 등 다양한 유익 성분이 들어있습니다. 항산화 효과, 면역력 증진, 스트레스 완화, 집중력 향상 등 차가 우리 몸과 마음에 미치는 긍정적인 영향을 이해합니다.',
'60분', 'beginner', 5),

-- 6대 차류 우리는 방법
(2, '6대 차류 우리는 방법', '각 차 종류에 맞는 올바른 우림 방법을 실습합니다',
'차의 종류에 따라 적절한 물 온도, 우림 시간, 찻잎의 양이 다릅니다. 녹차는 70-80도, 홍차는 95-100도의 물로 우리며, 각 차의 특성을 최대한 살리는 우림법을 실습을 통해 익힙니다.',
'120분', 'intermediate', 6);

-- 공예공부 커리큘럼
INSERT INTO education_curriculum (category_id, title, description, content, duration, difficulty, display_order) VALUES
-- 공예의 역사
(3, '공예의 역사', '인류 문명과 함께 발전해온 공예의 역사를 배웁니다',
'공예는 인류가 도구를 만들기 시작하면서 함께 발전했습니다. 실용성과 예술성을 겸비한 공예품은 각 시대와 문화를 반영하며, 장인정신을 통해 오늘날까지 이어져오고 있습니다.',
'60분', 'beginner', 1),

-- 한국공예의 시대별 변천사
(3, '한국공예의 시대별 변천사', '삼국시대부터 현대까지 한국 공예의 발전 과정을 살펴봅니다',
'한국 공예는 삼국시대의 금속공예와 토기, 고려시대의 청자, 조선시대의 백자와 목공예로 발전했습니다. 각 시대마다 독특한 미의식과 기술이 발전했으며, 현대에는 전통 기법과 현대 디자인이 조화를 이루고 있습니다.',
'90분', 'intermediate', 2),

-- 도자기의 제작 기법
(3, '도자기의 제작 기법', '흙 빚기부터 가마 굽기까지 도자기 제작 전 과정을 배웁니다',
'도자기는 흙 선택, 물레 성형, 건조, 초벌구이, 유약 바르기, 재벌구이 등의 과정을 거쳐 만들어집니다. 각 단계마다 숙련된 기술과 세심한 주의가 필요하며, 특히 가마의 온도와 시간 조절이 작품의 완성도를 좌우합니다.',
'150분', 'advanced', 3),

-- 도자기의 활용법
(3, '도자기의 활용법', '일상생활에서 도자기를 올바르게 사용하고 관리하는 방법을 배웁니다',
'도자기는 찻잔, 그릇, 화병 등 다양한 용도로 사용됩니다. 각 도자기의 특성에 맞는 사용법을 알고, 세척과 보관 방법을 올바르게 이해하면 오랫동안 아름다운 상태를 유지할 수 있습니다.',
'60분', 'beginner', 4),

-- 도자기의 이로운 점
(3, '도자기의 이로운 점', '도자기가 우리 생활에 주는 가치와 이점을 배웁니다',
'도자기는 화학물질이 없는 친환경 소재이며, 음식의 맛을 더욱 좋게 합니다. 또한 예술적 가치와 실용성을 겸비하여 일상에 품격을 더하고, 정서적 안정감을 주며, 전통문화를 계승하는 의미도 지니고 있습니다.',
'60분', 'beginner', 5);

-- 체험 타입 업데이트 (tea_tasting -> tea_experience)
-- 기존 experiences 테이블의 타입 제약 조건은 그대로 두고, 데이터만 업데이트
-- 새로운 마이그레이션에서 제약 조건을 수정할 예정
