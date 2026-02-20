# 🚀 체험교육 데이터 복구 - 최종 가이드

## 📊 오류 원인 분석

### 이전 SQL의 문제점
1. **experiences 테이블**: `min_participants` 컬럼이 존재하지 않음
2. **education_curriculum 테이블**: `level` 컬럼이 존재하지 않음 (정확한 컬럼명은 `difficulty`)

### 프로덕션 DB 정확한 스키마
```sql
-- experiences 테이블
CREATE TABLE experiences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  region_id INTEGER,
  producer_id INTEGER,
  experience_type TEXT NOT NULL,  -- tea_ceremony, tea_experience, craft_workshop, farm_tour, workshop_visit
  description TEXT,
  duration TEXT,
  price INTEGER NOT NULL,
  max_participants INTEGER,  -- min_participants는 없음!
  main_image TEXT,
  is_available BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  original_price INTEGER,
  discount_rate REAL DEFAULT 30,
  commission_rate REAL DEFAULT 9.9,
  commission_amount INTEGER,
  producer_revenue INTEGER,
  consumer_price INTEGER,
  direct_price INTEGER
);

-- education_curriculum 테이블
CREATE TABLE education_curriculum (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  duration TEXT,
  difficulty TEXT CHECK(difficulty IN ('beginner', 'intermediate', 'advanced')),  -- level이 아님!
  display_order INTEGER DEFAULT 0,
  thumbnail_image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## ✅ 해결 방법

### 📁 새로 만든 파일: `MASTER_DATA.sql`

**특징:**
- ✅ 정확한 프로덕션 스키마에 맞춤
- ✅ `INSERT OR IGNORE` 사용으로 중복 방지
- ✅ 모든 데이터를 한 곳에서 관리
- ✅ 추가 데이터 템플릿 포함
- ✅ GitHub 버전 관리 가능

**포함 내용:**
- 체험 프로그램 1개 추가 (ID 5)
- 교육과정 14개 추가 (ID 17-30)
- 데이터 확인 쿼리
- 새 데이터 추가 템플릿

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

### 3단계: SQL 실행

#### 옵션 A: 전체 실행 (추천)
`MASTER_DATA.sql` 파일의 전체 내용을 복사하여 실행

#### 옵션 B: 부분 실행
필요한 부분만 복사하여 실행:

**체험 프로그램만 추가 (ID 5)**
```sql
INSERT OR IGNORE INTO experiences (
  id, title, region_id, producer_id, experience_type, 
  description, duration, price, max_participants, 
  main_image, is_available, original_price, 
  discount_rate, commission_rate, created_at
) VALUES
(
  5, '하동 야생차 체험', 2, 2, 'tea_experience',
  '천년 야생차밭에서 직접 차를 따고 전통 제다 과정을 체험합니다. 차 시음과 함께 야생차의 역사를 배울 수 있습니다.',
  '3시간', 45000, 15,
  '/images/experiences/hadong-wildtea.jpg', 1, 45000,
  0, 9.9, '2024-01-01 00:00:00'
);
```

**교육과정만 추가 (ID 17-30)**
`MASTER_DATA.sql` 파일의 ID 17-30 부분 복사

### 4단계: 확인
```sql
-- 체험 프로그램 확인 (목표: 5개)
SELECT COUNT(*) as total FROM experiences;

-- 교육과정 확인 (목표: 30개)
SELECT COUNT(*) as total FROM education_curriculum;

-- 체험 프로그램 목록
SELECT id, title, region_id, experience_type, price 
FROM experiences 
ORDER BY id;

-- 교육과정 목록
SELECT id, category_id, title, duration, difficulty 
FROM education_curriculum 
ORDER BY id;
```

---

## 📋 데이터 목록

### 체험 프로그램 (5개)
1. 보성 녹차밭 체험 (기존)
2. 제주 차밭 투어 (기존)
3. 전통 도자기 만들기 (기존)
4. 목공예 체험 (기존)
5. **하동 야생차 체험** ⭐ (신규)

### 교육과정 (30개)
기존 16개 + 신규 14개

**신규 추가 (ID 17-30):**
17. 차 힐링 테라피스트 전문가
18. 말차 제조와 활용 전문
19. 차 가공식품 개발
20. 목공예 다기 만들기
21. 차 마케팅 전문가
22. 녹차 블렌딩 마스터
23. 차 카페 창업 실무
24. 다도구 디자인
25. 차 수출입 실무
26. 발효차 제조 전문
27. 차 관광 해설사
28. 전통 죽세공예
29. 차 품평 전문가
30. 약용차 블렌딩

---

## 🎯 향후 데이터 추가 방법

### 1. `MASTER_DATA.sql` 파일 열기
```bash
vi /home/user/webapp/MASTER_DATA.sql
```

### 2. 템플릿 복사
파일 하단의 템플릿 부분 참조:
- 체험 프로그램 템플릿
- 교육과정 템플릿

### 3. 데이터 수정
- ID 번호 증가 (다음 번호)
- 내용 수정

### 4. Cloudflare 콘솔에서 실행

### 5. GitHub 커밋
```bash
git add MASTER_DATA.sql
git commit -m "데이터 추가: [항목명]"
git push origin main
```

---

## ✅ 예상 결과

복구 완료 후:
- ✅ 체험 프로그램: **5개**
- ✅ 교육과정: **30개**
- ✅ 지역특산품: **정상 표시**
- ✅ 이벤트: **27개 (완료)**

---

## 🔗 관련 파일

- **통합 데이터 관리**: `/home/user/webapp/MASTER_DATA.sql`
- **프로덕션 사이트**: https://dagong-bi1.pages.dev
- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong

---

## 💡 핵심 차이점

### 이전 SQL (오류 발생)
```sql
-- ❌ 존재하지 않는 컬럼 사용
min_participants  -- experiences 테이블에 없음
level            -- education_curriculum 테이블에 없음 (difficulty가 맞음)
```

### 새 SQL (정상 작동)
```sql
-- ✅ 정확한 컬럼 사용
max_participants  -- experiences 테이블에 존재
difficulty       -- education_curriculum 테이블의 정확한 컬럼명
```

---

**준비 완료!** 🎉

`MASTER_DATA.sql` 파일을 Cloudflare D1 콘솔에서 실행하면 모든 데이터가 정상적으로 추가됩니다.
