# 다공 프로덕션 배포 가이드

## 📊 현재 상태 (2026-02-18)

### ✅ 로컬 개발 환경
- **로컬 서버**: http://localhost:3000 (PM2로 실행 중)
- **데이터베이스**: SQLite (`.wrangler/state/v3/d1/`)
- **데이터**:
  - 카테고리: 27개 (차 7, 공예 11, 선물 4, 특산물 5)
  - 지역: 17개 (차산지 8, 공예산지 9)
  - 이벤트: 27개 (12개월 연중 행사)
  - 상품: 1개

### ⚠️ 프로덕션 환경
- **URL**: https://dagong-bi1.pages.dev/
- **데이터베이스**: Cloudflare D1 (webapp-production)
- **현재 데이터**:
  - 카테고리: 1개 (구버전)
  - 지역: 1개 (구버전)
  - 이벤트: 0개 (구버전)

---

## 🚀 프로덕션 배포 단계

### 1️⃣ 코드 배포 (GitHub → Cloudflare Pages)

```bash
# 로컬에서 GitHub에 푸시
cd /home/user/webapp
git push origin main
```

**자동 배포**:
- GitHub에 푸시하면 Cloudflare Pages가 자동으로 빌드 및 배포
- 약 2-3분 소요
- 배포 완료 후 https://dagong-bi1.pages.dev/ 에서 최신 코드 확인 가능

---

### 2️⃣ 프로덕션 D1 데이터베이스 업데이트

#### **방법 A: Cloudflare D1 Console (추천)**

1. **Cloudflare Dashboard 접속**
   - URL: https://dash.cloudflare.com/
   - Workers & Pages → D1 SQL Database → `webapp-production` → **Console** 탭

2. **SQL 파일 순차 실행**

   **① 카테고리 데이터 (27개)**
   ```bash
   # 로컬에서 파일 내용 확인
   cat step1_categories.sql
   ```
   
   - 전체 SQL을 복사하여 D1 Console에 붙여넣기
   - **Execute** 버튼 클릭
   - 확인: `SELECT COUNT(*) FROM categories;` → **27**

   **② 지역 데이터 (17개)**
   ```bash
   # 로컬에서 파일 내용 확인
   cat step2_regions.sql
   ```
   
   - 전체 SQL을 복사하여 D1 Console에 붙여넣기
   - **Execute** 버튼 클릭
   - 확인: `SELECT COUNT(*) FROM regions;` → **17**

   **③ 이벤트 데이터 (27개)**
   ```bash
   # 로컬에서 파일 내용 확인
   cat step3_events.sql
   ```
   
   - 전체 SQL을 복사하여 D1 Console에 붙여넣기
   - **Execute** 버튼 클릭
   - 확인: `SELECT COUNT(*) FROM events;` → **30** (기존 3 + 신규 27)

---

#### **방법 B: Wrangler CLI (로컬에서 실행)**

**전제 조건**: Cloudflare API Token이 환경 변수로 설정되어 있어야 함

```bash
# Cloudflare 인증 확인
npx wrangler whoami

# 프로덕션 D1에 SQL 실행
npx wrangler d1 execute webapp-production --remote --file=step1_categories.sql
npx wrangler d1 execute webapp-production --remote --file=step2_regions.sql
npx wrangler d1 execute webapp-production --remote --file=step3_events.sql

# 실행 확인
npx wrangler d1 execute webapp-production --remote --command="SELECT COUNT(*) FROM categories;"
npx wrangler d1 execute webapp-production --remote --command="SELECT COUNT(*) FROM regions;"
npx wrangler d1 execute webapp-production --remote --command="SELECT COUNT(*) FROM events;"
```

---

### 3️⃣ 프로덕션 확인

```bash
# API 엔드포인트 확인
curl https://dagong-bi1.pages.dev/api/categories | jq '. | length'
# 결과: 27

curl https://dagong-bi1.pages.dev/api/regions | jq 'length'
# 결과: 17

curl "https://dagong-bi1.pages.dev/api/events?all=true" | jq '.events | length'
# 결과: 30 (기존 3 + 신규 27)
```

**홈페이지 확인**:
- URL: https://dagong-bi1.pages.dev/
- 카테고리 27개 정상 표시 확인
- 지역 17개 정상 표시 확인
- 현재 진행 중인 이벤트 확인

---

## 📝 데이터 구조

### 카테고리 (27개)

| 타입 | 개수 | 항목 |
|------|------|------|
| 차 (tea) | 7개 | 녹차, 백차, 청차, 황차, 홍차, 발효차, 블렌딩차 |
| 공예 (craft) | 11개 | 다관, 찻잔, 다기세트, 도자기, 목공예, 금속공예, 한복공예, 가죽공예, 장식품, 서예, 그림 |
| 선물 (gift) | 4개 | 명절 선물세트, 기념일 선물세트, 기업 선물세트, 맞춤 선물세트 |
| 특산물 (local) | 5개 | 농산물, 수산물, 축산물, 특산품, 가공식품 |

### 지역 (17개)

| 타입 | 개수 | 항목 |
|------|------|------|
| 차산지 (tea) | 8개 | 제주도, 하동, 김해, 광양, 보성, 강진, 장흥, 부안 |
| 공예산지 (craft) | 9개 | 경기 광주, 여주, 이천, 진천, 청주, 문경, 김해, 강진, 부안 |

### 이벤트 (27개)

12개월 연중 이벤트 (1-12월 각 2-3개씩)

**이벤트 타입**:
- `discount`: 할인 이벤트
- `season`: 시즌/계절 이벤트
- `holiday`: 명절/기념일 이벤트
- `special`: 특별 행사

**주요 이벤트**:
- 1월: 신년 대할인, 설날 선물세트
- 2월: 봄 햇차 예약판매, 밸런타인데이
- 5월: 어버이날, 가정의 달
- 9월: 추석 선물세트
- 12월: 크리스마스, 연말정산 세일

---

## 🔧 로컬 개발 환경 관리

### 로컬 서버 시작
```bash
# 포트 3000 정리
fuser -k 3000/tcp 2>/dev/null || true

# 빌드
npm run build

# PM2로 서버 시작
pm2 start ecosystem.config.cjs

# 로그 확인
pm2 logs webapp --nostream
```

### 로컬 D1 데이터베이스 초기화
```bash
# 로컬 D1 삭제
rm -rf .wrangler/state/v3/d1

# 마이그레이션 전체 적용
echo "yes" | npx wrangler d1 migrations apply webapp-production --local

# 데이터 확인
npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) FROM categories;"
npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) FROM regions;"
npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) FROM events;"
```

---

## 🐛 문제 해결

### 문제 1: regions API에서 500 에러
**원인**: `display_order` 컬럼이 regions 테이블에 없음  
**해결**: `src/index.tsx`에서 `ORDER BY display_order, id` → `ORDER BY id` 수정 (이미 수정됨)

### 문제 2: 마이그레이션 실패 (gift_set 타입)
**원인**: categories 테이블의 CHECK constraint가 `gift`만 허용  
**해결**: `migrations/0026_insert_all_production_data.sql`에서 `gift_set` → `gift` 수정 (이미 수정됨)

### 문제 3: 이벤트가 1개만 표시됨
**원인**: API가 현재 날짜 기준으로 유효한 이벤트만 반환  
**해결**: `?all=true` 파라미터로 전체 이벤트 조회 가능
```bash
# 현재 유효한 이벤트만
curl http://localhost:3000/api/events

# 전체 이벤트 (관리자용)
curl "http://localhost:3000/api/events?all=true"
```

---

## 📚 관련 파일

- `migrations/0026_insert_all_production_data.sql` - 전체 데이터 마이그레이션
- `step1_categories.sql` - 카테고리 27개 삽입
- `step2_regions.sql` - 지역 17개 삽입
- `step3_events.sql` - 이벤트 27개 삽입
- `production_data_seed.sql` - 전체 데이터 시드 (통합 파일)
- `ecosystem.config.cjs` - PM2 설정
- `wrangler.jsonc` - Cloudflare 설정

---

## ✅ 배포 체크리스트

- [ ] 로컬 서버 정상 작동 확인 (http://localhost:3000)
- [ ] 로컬 API 데이터 확인 (카테고리 27, 지역 17, 이벤트 27)
- [ ] Git 커밋 및 푸시
- [ ] GitHub → Cloudflare Pages 자동 배포 완료 확인
- [ ] 프로덕션 D1 Console에서 SQL 실행 (3개 파일)
- [ ] 프로덕션 API 데이터 확인 (curl 테스트)
- [ ] 프로덕션 홈페이지 정상 작동 확인
- [ ] 검색엔진 sitemap 제출 (필요시)

---

**배포 완료 후 확인 사항**:
- ✅ https://dagong-bi1.pages.dev/ 접속 정상
- ✅ 카테고리 27개 표시
- ✅ 지역 17개 표시
- ✅ 이벤트 정상 표시 (현재 날짜 기준 유효 이벤트)
- ✅ 상품 목록 정상 표시
