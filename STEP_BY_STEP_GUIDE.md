# 🚀 단계별 데이터 복구 가이드

## 📊 현재 상태
- 체험 프로그램: 4개 → 5개 (1개 추가)
- 교육과정: 16개 → 30개 (14개 추가)

---

## ✅ 단계별 SQL 파일

### 📁 준비된 파일 (4개)
1. **step1_add_experience.sql** - 체험 프로그램 1개
2. **step2_add_education_1.sql** - 교육과정 5개 (ID 17-21)
3. **step3_add_education_2.sql** - 교육과정 5개 (ID 22-26)
4. **step4_add_education_3.sql** - 교육과정 4개 (ID 27-30)

---

## 🔧 실행 방법

### 1단계: Cloudflare 대시보드 접속
```
https://dash.cloudflare.com/
```

### 2단계: D1 콘솔로 이동
```
Workers & Pages → D1 → webapp-production → Console
```

### 3단계: SQL 순서대로 실행

#### ✅ 1. 체험 프로그램 추가
```sql
INSERT OR IGNORE INTO experiences (
  id, title, region_id, producer_id, experience_type, 
  description, duration, price, max_participants, 
  main_image, is_available, original_price, 
  discount_rate, commission_rate, created_at
) VALUES (
  5, '하동 야생차 체험', 2, 2, 'tea_experience',
  '천년 야생차밭에서 직접 차를 따고 전통 제다 과정을 체험합니다. 차 시음과 함께 야생차의 역사를 배울 수 있습니다.',
  '3시간', 45000, 15,
  '/images/experiences/hadong-wildtea.jpg', 1, 45000,
  0, 9.9, '2024-01-01 00:00:00'
);
```

**확인**:
```sql
SELECT COUNT(*) FROM experiences;  -- 결과: 5
```

---

#### ✅ 2. 교육과정 1-5 추가 (ID 17-21)
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, thumbnail_image, created_at) VALUES
(17, 1, '차 힐링 테라피스트 전문가', '차를 활용한 힐링 테라피 전문가 양성 과정입니다.', '차의 이해, 테라피 기법, 상담 기술, 실습 등을 배웁니다. 교재, 차 세트, 수료증이 제공됩니다. 차 소믈리에 2급 이상 필수. 완료시 차 테라피스트 자격증 취득.', '60시간', 'advanced', 17, '/images/education/tea-therapist.jpg', '2024-01-01 00:00:00'),
(18, 2, '말차 제조와 활용 전문', '전통 말차 제조 기법과 현대적 활용법을 배웁니다.', '말차 역사, 제조 실습, 품질 관리, 요리 활용 등을 배웁니다. 교재, 말차 도구, 실습 재료 제공. 기초 제다법 이수 필수. 완료시 말차 제조 수료증 취득.', '24시간', 'intermediate', 18, '/images/education/matcha-making.jpg', '2024-01-01 00:00:00'),
(19, 1, '차 가공식품 개발', '차를 활용한 가공식품 개발 실무 과정입니다.', '식품 이론, 레시피 개발, 제조 실습, 품질 관리 등을 배웁니다. 교재, 실습 재료, 레시피북 제공. 식품위생 교육 이수 필수. 완료시 가공식품 개발 수료증 취득.', '40시간', 'intermediate', 19, '/images/education/tea-food.jpg', '2024-01-01 00:00:00'),
(20, 3, '목공예 다기 만들기', '전통 목공예 기법으로 다기를 제작합니다.', '목재 선택, 가공 기법, 조립, 마감 등을 배웁니다. 교재, 공구, 목재 제공. 사전 지식 불필요. 완료시 목공예 기초 수료증 취득.', '32시간', 'beginner', 20, '/images/education/wood-teaware.jpg', '2024-01-01 00:00:00'),
(21, 1, '차 마케팅 전문가', '차 산업 마케팅 전략 및 실무를 배웁니다.', '시장 분석, 브랜딩, 온라인 마케팅, 사례 연구 등을 배웁니다. 교재, 마케팅 도구, 프로젝트 가이드 제공. 마케팅 기초 지식 필수. 완료시 차 마케팅 전문가 인증 취득.', '36시간', 'advanced', 21, '/images/education/tea-marketing.jpg', '2024-01-01 00:00:00');
```

**확인**:
```sql
SELECT COUNT(*) FROM education_curriculum;  -- 결과: 21
```

---

#### ✅ 3. 교육과정 6-10 추가 (ID 22-26)
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, thumbnail_image, created_at) VALUES
(22, 2, '녹차 블렌딩 마스터', '녹차 블렌딩 기술과 맛의 조화를 배웁니다.', '차 감별, 블렌딩 이론, 실습, 품평 등을 배웁니다. 교재, 다양한 차 샘플, 블렌딩 도구 제공. 차 소믈리에 3급 이상 필수. 완료시 블렌딩 마스터 자격증 취득.', '28시간', 'advanced', 22, '/images/education/tea-blending.jpg', '2024-01-01 00:00:00'),
(23, 1, '차 카페 창업 실무', '차 전문 카페 창업 준비 과정입니다.', '사업계획, 메뉴 개발, 운영 관리, 마케팅 등을 배웁니다. 교재, 사업계획서 템플릿, 멘토링 제공. 사전 지식 불필요. 완료시 창업 실무 수료증 취득.', '48시간', 'intermediate', 23, '/images/education/tea-cafe.jpg', '2024-01-01 00:00:00'),
(24, 3, '다도구 디자인', '현대적 감각의 다도구 디자인을 배웁니다.', '디자인 이론, 스케치, 3D 모델링, 프로토타입 제작 등을 배웁니다. 교재, 디자인 도구, 소프트웨어 제공. 디자인 기초 지식 필수. 완료시 다도구 디자인 수료증 취득.', '40시간', 'intermediate', 24, '/images/education/teaware-design.jpg', '2024-01-01 00:00:00'),
(25, 1, '차 수출입 실무', '차 수출입 무역 실무 과정입니다.', '무역 이론, 통관 절차, 계약, 클레임 처리 등을 배웁니다. 교재, 무역 서류 양식, 사례집 제공. 무역 기초 지식 필수. 완료시 수출입 실무 인증 취득.', '32시간', 'advanced', 25, '/images/education/tea-export.jpg', '2024-01-01 00:00:00'),
(26, 2, '발효차 제조 전문', '전통 발효차 제조 기술을 배웁니다.', '발효 이론, 제조 실습, 품질 관리, 저장법 등을 배웁니다. 교재, 발효 도구, 실습 재료 제공. 제다법 기초 필수. 완료시 발효차 제조 자격증 취득.', '36시간', 'advanced', 26, '/images/education/fermented-tea.jpg', '2024-01-01 00:00:00');
```

**확인**:
```sql
SELECT COUNT(*) FROM education_curriculum;  -- 결과: 26
```

---

#### ✅ 4. 교육과정 11-14 추가 (ID 27-30)
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, thumbnail_image, created_at) VALUES
(27, 1, '차 관광 해설사', '차 산업 관광 전문 해설사 양성 과정입니다.', '차 역사, 문화, 해설 기법, 현장 실습 등을 배웁니다. 교재, 해설 자료, 현장 답사 제공. 사전 지식 불필요. 완료시 관광 해설사 자격증 취득.', '44시간', 'intermediate', 27, '/images/education/tea-guide.jpg', '2024-01-01 00:00:00'),
(28, 3, '전통 죽세공예', '전통 대나무 세공예 기술을 배웁니다.', '대나무 가공, 편조 기법, 작품 제작, 마감 등을 배웁니다. 교재, 공구, 대나무 재료 제공. 사전 지식 불필요. 완료시 죽세공예 기초 수료증 취득.', '40시간', 'intermediate', 28, '/images/education/bamboo-craft.jpg', '2024-01-01 00:00:00'),
(29, 1, '차 품평 전문가', '전문적인 차 품평 기술을 배웁니다.', '감각 훈련, 품평 기법, 성분 분석, 등급 평가 등을 배웁니다. 교재, 다양한 차 샘플, 품평 도구 제공. 차 소믈리에 2급 이상 필수. 완료시 차 품평 전문가 인증 취득.', '52시간', 'advanced', 29, '/images/education/tea-tasting.jpg', '2024-01-01 00:00:00'),
(30, 2, '약용차 블렌딩', '약용 효과를 고려한 차 블렌딩을 배웁니다.', '약재 지식, 배합 원리, 블렌딩 실습, 효능 등을 배웁니다. 교재, 약재 샘플, 블렌딩 도구 제공. 한약 기초 지식 필수. 완료시 약용차 블렌딩 수료증 취득.', '36시간', 'intermediate', 30, '/images/education/herbal-tea.jpg', '2024-01-01 00:00:00');
```

**최종 확인**:
```sql
SELECT COUNT(*) FROM education_curriculum;  -- 결과: 30 ✅
```

---

## 📋 추가되는 데이터

### 체험 프로그램 (1개)
- ID 5: 하동 야생차 체험

### 교육과정 (14개)
- ID 17: 차 힐링 테라피스트 전문가
- ID 18: 말차 제조와 활용 전문
- ID 19: 차 가공식품 개발
- ID 20: 목공예 다기 만들기
- ID 21: 차 마케팅 전문가
- ID 22: 녹차 블렌딩 마스터
- ID 23: 차 카페 창업 실무
- ID 24: 다도구 디자인
- ID 25: 차 수출입 실무
- ID 26: 발효차 제조 전문
- ID 27: 차 관광 해설사
- ID 28: 전통 죽세공예
- ID 29: 차 품평 전문가
- ID 30: 약용차 블렌딩

---

## ✅ 예상 결과

복구 완료 후:
- ✅ 체험 프로그램: **5개**
- ✅ 교육과정: **30개**

---

## 🔗 확인 방법

### API 테스트
```bash
# 체험 프로그램
curl "https://dagong-bi1.pages.dev/api/experiences?limit=10"

# 교육과정
curl "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50"
```

---

## 💡 팁

- 각 단계 실행 후 `SELECT COUNT(*)` 로 확인
- 오류 발생시 해당 단계만 재실행
- `INSERT OR IGNORE` 사용으로 중복 걱정 없음

---

**준비 완료!** 🎉

위의 SQL을 순서대로 실행하면 모든 데이터가 정상적으로 추가됩니다.
