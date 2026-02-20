# ⚠️ 프로덕션 데이터 업데이트 필요

## 📊 현재 상황

### ✅ 로컬 환경 (완료)
- **제품**: 78개 (차 20, 공예 23, 선물 2, 지역특산품 33)
- **체험**: 5개
- **이벤트**: 27개 (1월~12월)
- **교육**: 30개

### ❌ 프로덕션 환경 (업데이트 필요)
- **제품**: 17개 (61개 부족)
- **지역특산품**: 3개 (30개 부족)
- **체험**: 4개 (1개 부족)
- **이벤트**: 0개 (27개 부족)

---

## 🚀 프로덕션 업데이트 방법

### 방법 1: Cloudflare Dashboard (추천) ⭐

이 방법이 **가장 쉽고 확실**합니다!

#### Step 1: SQL 파일 내용 복사
브라우저에서 다음 URL을 열고 **전체 내용을 복사**하세요:
```
https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/MASTER_SEED.sql
```

#### Step 2: Cloudflare Dashboard 접속
1. https://dash.cloudflare.com/ 접속 및 로그인
2. 좌측 메뉴 **Workers & Pages** 클릭
3. 상단 탭 **D1** 클릭
4. **webapp-production** 클릭
5. 상단 탭 **Console** 클릭

#### Step 3: SQL 실행
1. Console 입력창에 복사한 내용 전체를 붙여넣기
2. **Execute** 버튼 클릭
3. 완료까지 약 5-10초 대기

#### Step 4: 확인
다음 쿼리를 Console에서 실행하여 확인:
```sql
SELECT COUNT(*) FROM products;
-- 예상: 78

SELECT COUNT(*) FROM experiences;  
-- 예상: 5

SELECT COUNT(*) FROM events;
-- 예상: 27
```

---

### 방법 2: Wrangler CLI (Cloudflare API 토큰 필요)

이 방법은 Cloudflare API 토큰이 설정되어 있어야 합니다.

#### Step 1: API 토큰 설정
1. 사이드바의 **Deploy** 탭 클릭
2. Cloudflare API 토큰 생성 및 입력
3. 저장

#### Step 2: 터미널 명령 실행
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --file=MASTER_SEED.sql --remote
```

---

## ✅ 업데이트 후 확인

### 브라우저에서 API 확인
다음 URL들을 브라우저에서 직접 열어보세요:

**제품 API (78개 예상)**
```
https://dagong-bi1.pages.dev/api/products?limit=100
```

**지역특산품 확인**
- 카테고리 17: 농산물
- 카테고리 18: 가공식품  
- 카테고리 19: 수산물
- 카테고리 20: 축산물
- 카테고리 31: 특산품

```
https://dagong-bi1.pages.dev/api/products?category_id=17&limit=100
https://dagong-bi1.pages.dev/api/products?category_id=18&limit=100
https://dagong-bi1.pages.dev/api/products?category_id=19&limit=100
```

**체험 프로그램 (5개 예상)**
```
https://dagong-bi1.pages.dev/api/experiences?limit=100
```

**이벤트 (27개 예상)**
```
https://dagong-bi1.pages.dev/api/events?limit=50
```

**월별 이벤트**
```
https://dagong-bi1.pages.dev/api/events?month=1
https://dagong-bi1.pages.dev/api/events?month=5
https://dagong-bi1.pages.dev/api/events?month=12
```

**교육 커리큘럼 (30개 예상)**
```
https://dagong-bi1.pages.dev/api/education/curriculum?limit=50
```

---

## 📝 업데이트 체크리스트

- [ ] Cloudflare Dashboard에서 MASTER_SEED.sql 실행
- [ ] 제품 수 확인: 78개
- [ ] 지역특산품 확인: 33개
- [ ] 체험 프로그램 확인: 5개
- [ ] 이벤트 확인: 27개
- [ ] 교육 커리큘럼 확인: 30개
- [ ] 프론트엔드에서 실제 데이터 표시 확인

---

## 🔗 관련 링크

- **MASTER_SEED.sql**: https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/MASTER_SEED.sql
- **데이터 관리 가이드**: https://github.com/healingcafe1-prog/dagong/blob/main/MASTER_DATA_GUIDE.md
- **프로덕션 사이트**: https://dagong-bi1.pages.dev
- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong

---

## 💡 왜 프로덕션이 비어있나요?

프로덕션 D1 데이터베이스와 로컬 D1 데이터베이스는 **완전히 분리**되어 있습니다.
- 로컬에서 `--local` 플래그로 실행한 데이터는 로컬에만 저장
- 프로덕션 데이터베이스는 Cloudflare 클라우드에 별도 저장
- 따라서 프로덕션 환경에 직접 데이터를 삽입해야 함

---

## 🆘 문제가 있으신가요?

### 오류 1: "외래키 제약 조건 오류"
Console에서 먼저 실행:
```sql
PRAGMA foreign_keys = OFF;
```
그 다음 MASTER_SEED.sql 실행

### 오류 2: "일부 데이터만 삽입됨"
- SQL 전체가 붙여넣어졌는지 확인
- Console 창 크기 제한이 있을 수 있음
- → Wrangler CLI 방법 사용 권장

### 오류 3: "CLOUDFLARE_API_TOKEN 필요"
- Deploy 탭에서 API 토큰 설정 필요
- 또는 방법 1 (Dashboard) 사용

---

**지금 바로 업데이트하세요!** 🚀

Cloudflare Dashboard 접속: https://dash.cloudflare.com/

---

**작성일**: 2026-02-20  
**작성자**: AI Assistant
