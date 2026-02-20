# 🚀 프로덕션 데이터 업데이트 가이드

## ⚠️ 현재 상황
- **로컬 환경**: 78개 제품, 5개 체험, 30개 교육, 27개 이벤트 ✅
- **프로덕션 환경**: 17개 제품, 4개 체험, 0개 이벤트 ❌

**프로덕션 D1 데이터베이스에 MASTER_SEED.sql을 실행해야 합니다.**

---

## 📝 방법 1: Cloudflare Dashboard (가장 쉬움) ⭐

### 단계별 가이드

#### 1단계: MASTER_SEED.sql 내용 복사
다음 URL을 열어서 **전체 내용을 복사**하세요:
```
https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/MASTER_SEED.sql
```

또는 로컬에서 복사:
```bash
cat /home/user/webapp/MASTER_SEED.sql
```

#### 2단계: Cloudflare Dashboard 접속
1. https://dash.cloudflare.com/ 접속
2. 로그인

#### 3단계: D1 데이터베이스 Console 열기
1. 좌측 메뉴에서 **Workers & Pages** 클릭
2. 상단 탭에서 **D1** 클릭
3. **webapp-production** 데이터베이스 클릭
4. 상단 탭에서 **Console** 클릭

#### 4단계: SQL 실행
1. Console 화면의 SQL 입력창에 MASTER_SEED.sql 내용 전체를 붙여넣기
2. **Execute** 버튼 클릭
3. 실행 완료까지 약 5-10초 대기

#### 5단계: 확인
실행이 완료되면 다음 쿼리로 확인:

```sql
SELECT COUNT(*) FROM products;
-- 결과: 78

SELECT COUNT(*) FROM experiences;
-- 결과: 5

SELECT COUNT(*) FROM events;
-- 결과: 27

SELECT COUNT(*) FROM education_curriculum;
-- 결과: 30
```

---

## 📝 방법 2: Wrangler CLI (터미널)

```bash
cd /home/user/webapp

# Cloudflare 인증 (이미 설정되어 있어야 함)
npx wrangler whoami

# 프로덕션 데이터베이스에 SQL 실행
npx wrangler d1 execute webapp-production --file=MASTER_SEED.sql --remote
```

---

## ✅ 업데이트 후 확인

### 프로덕션 API 테스트
```bash
# 제품 수 확인 (78개 예상)
curl https://dagong-bi1.pages.dev/api/products?limit=100 | jq '.products | length'

# 지역특산품 확인 (33개 예상)
curl "https://dagong-bi1.pages.dev/api/products?limit=100" | jq '[.products[] | select(.category_id == 17 or .category_id == 18 or .category_id == 19 or .category_id == 20 or .category_id == 31)] | length'

# 체험 프로그램 확인 (5개 예상)
curl https://dagong-bi1.pages.dev/api/experiences?limit=100 | jq '.experiences | length'

# 이벤트 확인 (27개 예상)
curl https://dagong-bi1.pages.dev/api/events?limit=50 | jq '.events | length'

# 교육 커리큘럼 확인 (30개 예상)
curl https://dagong-bi1.pages.dev/api/education/curriculum?limit=50 | jq '.curriculum | length'
```

### 브라우저에서 확인
```
https://dagong-bi1.pages.dev/api/products?limit=100
https://dagong-bi1.pages.dev/api/experiences
https://dagong-bi1.pages.dev/api/events?limit=50
https://dagong-bi1.pages.dev/api/education/curriculum
```

---

## 🔧 코드 배포 (이미 완료됨)

이벤트 API가 수정되었으므로 코드도 재배포해야 합니다:

```bash
cd /home/user/webapp

# 빌드
npm run build

# 프로덕션 배포
npx wrangler pages deploy dist --project-name dagong-bi1
```

배포 완료 후 URL이 표시됩니다:
```
✨ Deployment complete!
  Preview URL: https://[랜덤ID].dagong-bi1.pages.dev
  Production URL: https://dagong-bi1.pages.dev
```

---

## 📊 예상 결과

### 업데이트 전
- 제품: 17개
- 지역특산품: 3개
- 체험: 4개
- 이벤트: 0개

### 업데이트 후
- 제품: **78개** ✅
- 지역특산품: **33개** ✅
- 체험: **5개** ✅
- 이벤트: **27개** ✅
- 교육: **30개** ✅

---

## ⚠️ 주의사항

1. **MASTER_SEED.sql 실행 시 기존 데이터가 삭제됩니다**
   - 파일 내부에 `DELETE FROM` 문이 포함되어 있음
   - 백업이 필요한 경우 먼저 Export 수행

2. **외래키 제약 조건**
   - MASTER_SEED.sql이 자동으로 처리함
   - `PRAGMA foreign_keys = OFF/ON` 포함

3. **실행 시간**
   - 약 5-10초 소요
   - 네트워크 상태에 따라 다를 수 있음

---

## 🆘 문제 해결

### 문제 1: 외래키 오류 발생
**증상**: FOREIGN KEY constraint failed

**해결**:
1. Console에서 먼저 실행:
```sql
PRAGMA foreign_keys = OFF;
```
2. MASTER_SEED.sql 실행
3. 마지막에 실행:
```sql
PRAGMA foreign_keys = ON;
```

### 문제 2: Wrangler 인증 오류
**증상**: Not authenticated

**해결**:
```bash
# API 키 재설정
cd /home/user/webapp
npx wrangler login

# 또는
export CLOUDFLARE_API_TOKEN="your-api-token"
```

### 문제 3: 일부 데이터만 삽입됨
**증상**: 78개 대신 적은 수만 삽입됨

**해결**:
1. Console에서 전체 내용이 붙여넣어졌는지 확인
2. SQL 파일이 끝까지 실행되었는지 확인
3. 오류 메시지 확인 후 해당 부분 수정

---

## 📞 도움이 필요하시면

GitHub Issue에 문의하시거나, 다음 정보를 제공해주세요:
1. 실행한 SQL 명령
2. 발생한 오류 메시지
3. 현재 데이터 개수 (SELECT COUNT(*) 결과)

---

**마지막 업데이트**: 2026-02-20  
**작성자**: AI Assistant
