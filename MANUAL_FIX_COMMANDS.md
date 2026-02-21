# 🔧 수동 프로덕션 수정 명령어

## 1️⃣ API 토큰 설정

```bash
export CLOUDFLARE_API_TOKEN='your-token-here'
```

## 2️⃣ 현재 상태 확인

```bash
npx wrangler d1 execute webapp-production --remote --command="SELECT id, title, LENGTH(content) as len FROM education_curriculum WHERE category_id = 1 AND id IN (17, 19, 23, 25, 27, 29) ORDER BY id;"
```

## 3️⃣ UPDATE 실행 (순서대로)

```bash
cd /home/user/webapp

# ID 17 업데이트
npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_17.sql

# ID 19 업데이트
npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_19.sql

# ID 23 업데이트
npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_23.sql

# ID 25 업데이트
npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_25.sql

# ID 27 업데이트
npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_27.sql

# ID 29 업데이트
npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_29.sql

# 카테고리 설명 수정
npx wrangler d1 execute webapp-production --remote --file=PRODUCTION_UPDATE_STEP2.sql
```

## 4️⃣ 업데이트 후 확인

```bash
npx wrangler d1 execute webapp-production --remote --command="SELECT id, title, LENGTH(content) as len FROM education_curriculum WHERE category_id = 1 AND id IN (17, 19, 23, 25, 27, 29) ORDER BY id;"
```

**예상 결과:**
- ID 17: len ≥ 800
- ID 19: len ≥ 500
- ID 23: len ≥ 600
- ID 25: len ≥ 600
- ID 27: len ≥ 700
- ID 29: len ≥ 1000

## 5️⃣ 카테고리 확인

```bash
npx wrangler d1 execute webapp-production --remote --command="SELECT id, name, description FROM education_categories WHERE id IN (1, 4);"
```

**예상 결과:**
- ID 1 (다도교육): "다도의 의미와 역사, 방법을 배우며 다도가 인성교육에 도움이 되는 가치를 배웁니다"
- ID 4 (명상교육): "명상의 기초와 실천, 요가와 마음챙김을 배웁니다"

## 6️⃣ 웹사이트 확인

https://dagong-bi1.pages.dev/education

---

## 💡 팁

- 각 명령어 실행 후 결과 확인
- 에러 발생 시 다시 실행
- 모든 명령어를 복사하여 순서대로 실행

---

## 🚨 문제 발생 시

스크립트 사용:
```bash
./QUICK_FIX_PRODUCTION.sh
```
