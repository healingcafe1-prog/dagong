-- ============================================
-- 다공(Dagong) 통합 데이터 관리 SQL
-- ============================================
-- 작성일: 2026-02-20
-- 목적: 모든 데이터를 한 곳에서 관리
-- 사용법: 
--   1. 새 데이터 추가시 이 파일에 추가
--   2. Cloudflare D1 콘솔에서 실행
--   3. GitHub에 커밋하여 버전 관리
-- ============================================

-- ============================================
-- 1. 체험 프로그램 (experiences)
-- ============================================
-- 현재: 4개 → 목표: 5개

-- 기존 데이터 (ID 1-4)는 이미 존재
-- 새로 추가할 데이터

INSERT OR IGNORE INTO experiences (
  id, 
  title, 
  region_id, 
  producer_id, 
  experience_type, 
  description, 
  duration, 
  price, 
  max_participants, 
  main_image, 
  is_available, 
  original_price, 
  discount_rate, 
  commission_rate, 
  created_at
) VALUES
-- ID 5: 하동 야생차 체험
(
  5,
  '하동 야생차 체험',
  2,  -- 하동
  2,  -- 하동 야생차
  'tea_experience',
  '천년 야생차밭에서 직접 차를 따고 전통 제다 과정을 체험합니다. 차 시음과 함께 야생차의 역사를 배울 수 있습니다.',
  '3시간',
  45000,
  15,
  '/images/experiences/hadong-wildtea.jpg',
  1,
  45000,
  0,
  9.9,
  '2024-01-01 00:00:00'
);

-- ============================================
-- 2. 교육과정 (education_curriculum)
-- ============================================
-- 현재: 16개 → 목표: 30개

-- 기존 데이터 (ID 1-16)는 이미 존재
-- 새로 추가할 데이터 (ID 17-30)

INSERT OR IGNORE INTO education_curriculum (
  id,
  category_id,
  title,
  description,
  content,
  duration,
  difficulty,
  display_order,
  thumbnail_image,
  created_at
) VALUES

-- ID 17: 차 힐링 테라피스트 전문가
(
  17,
  1,  -- 차 소믈리에
  '차 힐링 테라피스트 전문가',
  '차를 활용한 힐링 테라피 전문가 양성 과정입니다.',
  '차의 이해, 테라피 기법, 상담 기술, 실습 등을 배웁니다. 교재, 차 세트, 수료증이 제공됩니다. 차 소믈리에 2급 이상 필수. 완료시 차 테라피스트 자격증 취득.',
  '60시간',
  'advanced',
  17,
  '/images/education/tea-therapist.jpg',
  '2024-01-01 00:00:00'
),

-- ID 18: 말차 제조와 활용 전문
(
  18,
  2,  -- 제다법
  '말차 제조와 활용 전문',
  '전통 말차 제조 기법과 현대적 활용법을 배웁니다.',
  '말차 역사, 제조 실습, 품질 관리, 요리 활용 등을 배웁니다. 교재, 말차 도구, 실습 재료 제공. 기초 제다법 이수 필수. 완료시 말차 제조 수료증 취득.',
  '24시간',
  'intermediate',
  18,
  '/images/education/matcha-making.jpg',
  '2024-01-01 00:00:00'
),

-- ID 19: 차 가공식품 개발
(
  19,
  1,  -- 차 소믈리에
  '차 가공식품 개발',
  '차를 활용한 가공식품 개발 실무 과정입니다.',
  '식품 이론, 레시피 개발, 제조 실습, 품질 관리 등을 배웁니다. 교재, 실습 재료, 레시피북 제공. 식품위생 교육 이수 필수. 완료시 가공식품 개발 수료증 취득.',
  '40시간',
  'intermediate',
  19,
  '/images/education/tea-food.jpg',
  '2024-01-01 00:00:00'
),

-- ID 20: 목공예 다기 만들기
(
  20,
  3,  -- 공예
  '목공예 다기 만들기',
  '전통 목공예 기법으로 다기를 제작합니다.',
  '목재 선택, 가공 기법, 조립, 마감 등을 배웁니다. 교재, 공구, 목재 제공. 사전 지식 불필요. 완료시 목공예 기초 수료증 취득.',
  '32시간',
  'beginner',
  20,
  '/images/education/wood-teaware.jpg',
  '2024-01-01 00:00:00'
),

-- ID 21: 차 마케팅 전문가
(
  21,
  1,  -- 차 소믈리에
  '차 마케팅 전문가',
  '차 산업 마케팅 전략 및 실무를 배웁니다.',
  '시장 분석, 브랜딩, 온라인 마케팅, 사례 연구 등을 배웁니다. 교재, 마케팅 도구, 프로젝트 가이드 제공. 마케팅 기초 지식 필수. 완료시 차 마케팅 전문가 인증 취득.',
  '36시간',
  'advanced',
  21,
  '/images/education/tea-marketing.jpg',
  '2024-01-01 00:00:00'
),

-- ID 22: 녹차 블렌딩 마스터
(
  22,
  2,  -- 제다법
  '녹차 블렌딩 마스터',
  '녹차 블렌딩 기술과 맛의 조화를 배웁니다.',
  '차 감별, 블렌딩 이론, 실습, 품평 등을 배웁니다. 교재, 다양한 차 샘플, 블렌딩 도구 제공. 차 소믈리에 3급 이상 필수. 완료시 블렌딩 마스터 자격증 취득.',
  '28시간',
  'advanced',
  22,
  '/images/education/tea-blending.jpg',
  '2024-01-01 00:00:00'
),

-- ID 23: 차 카페 창업 실무
(
  23,
  1,  -- 차 소믈리에
  '차 카페 창업 실무',
  '차 전문 카페 창업 준비 과정입니다.',
  '사업계획, 메뉴 개발, 운영 관리, 마케팅 등을 배웁니다. 교재, 사업계획서 템플릿, 멘토링 제공. 사전 지식 불필요. 완료시 창업 실무 수료증 취득.',
  '48시간',
  'intermediate',
  23,
  '/images/education/tea-cafe.jpg',
  '2024-01-01 00:00:00'
),

-- ID 24: 다도구 디자인
(
  24,
  3,  -- 공예
  '다도구 디자인',
  '현대적 감각의 다도구 디자인을 배웁니다.',
  '디자인 이론, 스케치, 3D 모델링, 프로토타입 제작 등을 배웁니다. 교재, 디자인 도구, 소프트웨어 제공. 디자인 기초 지식 필수. 완료시 다도구 디자인 수료증 취득.',
  '40시간',
  'intermediate',
  24,
  '/images/education/teaware-design.jpg',
  '2024-01-01 00:00:00'
),

-- ID 25: 차 수출입 실무
(
  25,
  1,  -- 차 소믈리에
  '차 수출입 실무',
  '차 수출입 무역 실무 과정입니다.',
  '무역 이론, 통관 절차, 계약, 클레임 처리 등을 배웁니다. 교재, 무역 서류 양식, 사례집 제공. 무역 기초 지식 필수. 완료시 수출입 실무 인증 취득.',
  '32시간',
  'advanced',
  25,
  '/images/education/tea-export.jpg',
  '2024-01-01 00:00:00'
),

-- ID 26: 발효차 제조 전문
(
  26,
  2,  -- 제다법
  '발효차 제조 전문',
  '전통 발효차 제조 기술을 배웁니다.',
  '발효 이론, 제조 실습, 품질 관리, 저장법 등을 배웁니다. 교재, 발효 도구, 실습 재료 제공. 제다법 기초 필수. 완료시 발효차 제조 자격증 취득.',
  '36시간',
  'advanced',
  26,
  '/images/education/fermented-tea.jpg',
  '2024-01-01 00:00:00'
),

-- ID 27: 차 관광 해설사
(
  27,
  1,  -- 차 소믈리에
  '차 관광 해설사',
  '차 산업 관광 전문 해설사 양성 과정입니다.',
  '차 역사, 문화, 해설 기법, 현장 실습 등을 배웁니다. 교재, 해설 자료, 현장 답사 제공. 사전 지식 불필요. 완료시 관광 해설사 자격증 취득.',
  '44시간',
  'intermediate',
  27,
  '/images/education/tea-guide.jpg',
  '2024-01-01 00:00:00'
),

-- ID 28: 전통 죽세공예
(
  28,
  3,  -- 공예
  '전통 죽세공예',
  '전통 대나무 세공예 기술을 배웁니다.',
  '대나무 가공, 편조 기법, 작품 제작, 마감 등을 배웁니다. 교재, 공구, 대나무 재료 제공. 사전 지식 불필요. 완료시 죽세공예 기초 수료증 취득.',
  '40시간',
  'intermediate',
  28,
  '/images/education/bamboo-craft.jpg',
  '2024-01-01 00:00:00'
),

-- ID 29: 차 품평 전문가
(
  29,
  1,  -- 차 소믈리에
  '차 품평 전문가',
  '전문적인 차 품평 기술을 배웁니다.',
  '감각 훈련, 품평 기법, 성분 분석, 등급 평가 등을 배웁니다. 교재, 다양한 차 샘플, 품평 도구 제공. 차 소믈리에 2급 이상 필수. 완료시 차 품평 전문가 인증 취득.',
  '52시간',
  'advanced',
  29,
  '/images/education/tea-tasting.jpg',
  '2024-01-01 00:00:00'
),

-- ID 30: 약용차 블렌딩
(
  30,
  2,  -- 제다법
  '약용차 블렌딩',
  '약용 효과를 고려한 차 블렌딩을 배웁니다.',
  '약재 지식, 배합 원리, 블렌딩 실습, 효능 등을 배웁니다. 교재, 약재 샘플, 블렌딩 도구 제공. 한약 기초 지식 필수. 완료시 약용차 블렌딩 수료증 취득.',
  '36시간',
  'intermediate',
  30,
  '/images/education/herbal-tea.jpg',
  '2024-01-01 00:00:00'
);

-- ============================================
-- 3. 데이터 확인 쿼리
-- ============================================

-- 체험 프로그램 개수 확인
-- SELECT COUNT(*) as total_experiences FROM experiences;

-- 교육과정 개수 확인
-- SELECT COUNT(*) as total_curriculum FROM education_curriculum;

-- 체험 프로그램 목록
-- SELECT id, title, region_id, producer_id, experience_type, price FROM experiences ORDER BY id;

-- 교육과정 목록
-- SELECT id, category_id, title, duration, difficulty FROM education_curriculum ORDER BY id;

-- ============================================
-- 4. 추가 데이터 템플릿
-- ============================================

-- 새 체험 프로그램 추가 템플릿
/*
INSERT OR IGNORE INTO experiences (
  id, 
  title, 
  region_id, 
  producer_id, 
  experience_type, 
  description, 
  duration, 
  price, 
  max_participants, 
  main_image, 
  is_available, 
  original_price, 
  discount_rate, 
  commission_rate, 
  created_at
) VALUES
(
  6,  -- 새 ID
  '체험 이름',
  1,  -- region_id
  1,  -- producer_id
  'tea_experience',  -- experience_type: tea_ceremony, tea_experience, craft_workshop, farm_tour, workshop_visit
  '체험 설명',
  '2시간',
  30000,
  20,
  '/images/experiences/sample.jpg',
  1,
  30000,
  0,
  9.9,
  CURRENT_TIMESTAMP
);
*/

-- 새 교육과정 추가 템플릿
/*
INSERT OR IGNORE INTO education_curriculum (
  id,
  category_id,
  title,
  description,
  content,
  duration,
  difficulty,
  display_order,
  thumbnail_image,
  created_at
) VALUES
(
  31,  -- 새 ID
  1,   -- category_id
  '교육과정 이름',
  '교육과정 설명',
  '교육 내용 상세 설명',
  '20시간',
  'intermediate',  -- difficulty: beginner, intermediate, advanced
  31,
  '/images/education/sample.jpg',
  CURRENT_TIMESTAMP
);
*/

-- ============================================
-- 사용 방법
-- ============================================
-- 1. Cloudflare 대시보드 접속
--    https://dash.cloudflare.com/
--
-- 2. D1 콘솔로 이동
--    Workers & Pages → D1 → webapp-production → Console
--
-- 3. 필요한 부분만 복사하여 실행
--    - 체험 프로그램만: ID 5 부분
--    - 교육과정만: ID 17-30 부분
--    - 전체: 전체 파일
--
-- 4. 확인
--    SELECT COUNT(*) FROM experiences;
--    SELECT COUNT(*) FROM education_curriculum;
--
-- 5. GitHub에 커밋
--    git add MASTER_DATA.sql
--    git commit -m "데이터 추가"
--    git push origin main
-- ============================================
