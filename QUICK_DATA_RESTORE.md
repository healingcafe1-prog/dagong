# 🚀 빠른 데이터 복구 가이드

## 📊 현재 상태
- ✅ 지역특산품: API 정상 작동 중 (데이터 존재)
- ⚠️ 체험 프로그램: 4개 → 5개로 증가 필요 (1개 추가)
- ⚠️ 교육과정: 16개 → 30개로 증가 필요 (14개 추가)

## 🔧 복구 방법

### 방법 1: Cloudflare 대시보드 사용 (추천) ⭐

1. **Cloudflare 대시보드 접속**
   ```
   https://dash.cloudflare.com/
   ```

2. **D1 데이터베이스 콘솔로 이동**
   - Workers & Pages 클릭
   - D1 클릭
   - `webapp-production` 데이터베이스 선택
   - **Console** 탭 클릭

3. **SQL 실행**
   
   #### 📝 1단계: 체험 프로그램 추가 (1개)
   ```sql
   INSERT INTO experiences (id, title, description, duration, price, max_participants, min_participants, location, region_id, producer_id, difficulty_level, category, includes, requirements, schedule_info, is_available, created_at) VALUES
   (5, '하동 야생차 체험', '야생차밭에서 직접 차를 따고 제조 과정을 체험합니다', '3시간', 45000, 15, 5, '경남 하동군 화개면', 2, 2, 'beginner', 'tea_experience', '차 시음, 점심 식사 제공, 야생차 선물', '편한 복장, 운동화', '매주 토,일 10:00-13:00', 1, '2024-01-01 00:00:00');
   ```

   #### 📚 2단계: 교육과정 추가 (14개)
   
   **2-1. 교육과정 1-5번 추가**
   ```sql
   INSERT INTO education_curriculum (id, category_id, title, description, duration, level, price, max_students, schedule_type, location, instructor, objectives, curriculum_content, materials_provided, prerequisites, certification, is_active, created_at) VALUES
   (17, 1, '차 힐링 테라피스트 전문가', '차를 활용한 힐링 테라피 전문가 양성', '60시간', 'advanced', 850000, 15, '주중/주말반', '서울 강남', '김차향 교수', '차 테라피 이론과 실습을 통한 전문가 양성', '차의 이해/테라피 기법/상담 기술/실습', '교재, 차 세트, 수료증', '차 소믈리에 2급 이상', '차 테라피스트 자격증', 1, '2024-01-01 00:00:00'),
   (18, 2, '말차 제조와 활용 전문', '전통 말차 제조 기법과 현대적 활용법', '24시간', 'intermediate', 480000, 12, '주말반', '경기 광주', '박말차 장인', '말차 제조 기술 습득 및 활용법 교육', '말차 역사/제조 실습/품질 관리/요리 활용', '교재, 말차 도구, 실습 재료', '기초 제다법 이수', '말차 제조 수료증', 1, '2024-01-01 00:00:00'),
   (19, 1, '차 가공식품 개발', '차를 활용한 가공식품 개발 실무', '40시간', 'intermediate', 650000, 10, '주중반', '서울 마포', '이가공 연구원', '차 가공식품 개발 능력 배양', '식품 이론/레시피 개발/제조 실습/품질 관리', '교재, 실습 재료, 레시피북', '식품위생 교육 이수', '가공식품 개발 수료증', 1, '2024-01-01 00:00:00'),
   (20, 3, '목공예 다기 만들기', '전통 목공예 기법으로 다기 제작', '32시간', 'beginner', 420000, 8, '주말반', '경기 이천', '최목수 장인', '목공예 다기 제작 기술 습득', '목재 선택/가공 기법/조립/마감', '교재, 공구, 목재', '없음', '목공예 기초 수료증', 1, '2024-01-01 00:00:00'),
   (21, 1, '차 마케팅 전문가', '차 산업 마케팅 전략 및 실무', '36시간', 'advanced', 580000, 20, '주중반', '서울 종로', '정마케팅 컨설턴트', '차 산업 마케팅 전문가 양성', '시장 분석/브랜딩/온라인 마케팅/사례 연구', '교재, 마케팅 도구, 프로젝트 가이드', '마케팅 기초 지식', '차 마케팅 전문가 인증', 1, '2024-01-01 00:00:00');
   ```

   **2-2. 교육과정 6-10번 추가**
   ```sql
   INSERT INTO education_curriculum (id, category_id, title, description, duration, level, price, max_students, schedule_type, location, instructor, objectives, curriculum_content, materials_provided, prerequisites, certification, is_active, created_at) VALUES
   (22, 2, '녹차 블렌딩 마스터', '녹차 블렌딩 기술과 맛의 조화', '28시간', 'advanced', 520000, 10, '주말반', '전남 보성', '한블렌딩 전문가', '녹차 블렌딩 마스터 양성', '차 감별/블렌딩 이론/실습/품평', '교재, 다양한 차 샘플, 블렌딩 도구', '차 소믈리에 3급 이상', '블렌딩 마스터 자격증', 1, '2024-01-01 00:00:00'),
   (23, 1, '차 카페 창업 실무', '차 전문 카페 창업 준비 과정', '48시간', 'intermediate', 720000, 15, '주중/주말반', '서울 홍대', '조창업 컨설턴트', '차 카페 창업 실무 능력 배양', '사업계획/메뉴 개발/운영 관리/마케팅', '교재, 사업계획서 템플릿, 멘토링', '없음', '창업 실무 수료증', 1, '2024-01-01 00:00:00'),
   (24, 3, '다도구 디자인', '현대적 감각의 다도구 디자인', '40시간', 'intermediate', 680000, 12, '주말반', '서울 성수', '김디자인 작가', '다도구 디자인 능력 개발', '디자인 이론/스케치/3D 모델링/프로토타입', '교재, 디자인 도구, 소프트웨어', '디자인 기초 지식', '다도구 디자인 수료증', 1, '2024-01-01 00:00:00'),
   (25, 1, '차 수출입 실무', '차 수출입 무역 실무 과정', '32시간', 'advanced', 600000, 15, '주중반', '서울 강남', '박무역 전문가', '차 수출입 실무 전문가 양성', '무역 이론/통관 절차/계약/클레임 처리', '교재, 무역 서류 양식, 사례집', '무역 기초 지식', '수출입 실무 인증', 1, '2024-01-01 00:00:00'),
   (26, 2, '발효차 제조 전문', '전통 발효차 제조 기술', '36시간', 'advanced', 680000, 8, '주말반', '경남 하동', '송발효 명인', '발효차 제조 전문가 양성', '발효 이론/제조 실습/품질 관리/저장법', '교재, 발효 도구, 실습 재료', '제다법 기초', '발효차 제조 자격증', 1, '2024-01-01 00:00:00');
   ```

   **2-3. 교육과정 11-14번 추가**
   ```sql
   INSERT INTO education_curriculum (id, category_id, title, description, duration, level, price, max_students, schedule_type, location, instructor, objectives, curriculum_content, materials_provided, prerequisites, certification, is_active, created_at) VALUES
   (27, 1, '차 관광 해설사', '차 산업 관광 전문 해설사', '44시간', 'intermediate', 550000, 20, '주중/주말반', '전남 보성', '이관광 해설사', '차 관광 해설사 양성', '차 역사/문화/해설 기법/현장 실습', '교재, 해설 자료, 현장 답사', '없음', '관광 해설사 자격증', 1, '2024-01-01 00:00:00'),
   (28, 3, '전통 죽세공예', '전통 대나무 세공예 기술', '40시간', 'intermediate', 560000, 10, '주말반', '전남 담양', '최죽세 장인', '전통 죽세공예 기술 습득', '대나무 가공/편조 기법/작품 제작/마감', '교재, 공구, 대나무 재료', '없음', '죽세공예 기초 수료증', 1, '2024-01-01 00:00:00'),
   (29, 1, '차 품평 전문가', '전문적인 차 품평 기술', '52시간', 'advanced', 780000, 12, '주중반', '제주', '강품평 전문가', '차 품평 전문가 양성', '감각 훈련/품평 기법/성분 분석/등급 평가', '교재, 다양한 차 샘플, 품평 도구', '차 소믈리에 2급 이상', '차 품평 전문가 인증', 1, '2024-01-01 00:00:00'),
   (30, 2, '약용차 블렌딩', '약용 효과를 고려한 차 블렌딩', '36시간', 'intermediate', 620000, 10, '주말반', '서울 강동', '한약용 한의사', '약용차 블렌딩 전문가 양성', '약재 지식/배합 원리/블렌딩 실습/효능', '교재, 약재 샘플, 블렌딩 도구', '한약 기초 지식', '약용차 블렌딩 수료증', 1, '2024-01-01 00:00:00');
   ```

4. **확인**
   ```sql
   -- 체험 프로그램 확인
   SELECT COUNT(*) as total FROM experiences;
   
   -- 교육과정 확인
   SELECT COUNT(*) as total FROM education_curriculum;
   ```

---

### 방법 2: API를 통한 확인

복구 후 다음 명령어로 확인하세요:

```bash
# 체험 프로그램 확인
curl -s "https://dagong-bi1.pages.dev/api/experiences?limit=10" | jq '.experiences | length'

# 교육과정 확인
curl -s "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50" | jq '.curriculum | length'
```

---

## ✅ 예상 결과

복구 완료 후:
- ✅ 체험 프로그램: 5개
- ✅ 교육과정: 30개
- ✅ 지역특산품: 정상 표시

---

## 📝 참고사항

- SQL은 한 번에 하나씩 실행하는 것이 안전합니다
- 오류가 발생하면 이미 추가된 ID는 건너뛰세요
- 모든 데이터는 GitHub에도 백업되어 있습니다: https://github.com/healingcafe1-prog/dagong

---

## 🔗 관련 링크

- **프로덕션 사이트**: https://dagong-bi1.pages.dev
- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong
- **SQL 파일**:
  - 체험: `/home/user/webapp/add_experience.sql`
  - 교육: `/home/user/webapp/add_education.sql`
