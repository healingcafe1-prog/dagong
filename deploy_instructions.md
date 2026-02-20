# 🚀 프로덕션 D1 데이터베이스 업데이트 방법

## ⚠️ Cloudflare Dashboard Console 크기 제한 문제

Cloudflare Dashboard Console은 약 32KB 입력 크기 제한이 있어서 MASTER_SEED.sql (45KB)을 직접 실행할 수 없습니다.

---

## ✅ 해결 방법: SQL을 여러 파일로 분할

### 방법 1: GitHub에서 분할된 파일 사용

다음 5개 파일을 순서대로 실행하세요:

#### 파일 1: 기본 데이터 삭제 및 지역/카테고리
```
https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/deploy/step1_regions_categories.sql
```

#### 파일 2: 생산자
```
https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/deploy/step2_producers.sql
```

#### 파일 3: 제품 (차 + 공예)
```
https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/deploy/step3_products_tea_craft.sql
```

#### 파일 4: 제품 (지역특산품)
```
https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/deploy/step4_products_local.sql
```

#### 파일 5: 체험, 교육, 이벤트
```
https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/deploy/step5_experiences_education_events.sql
```

---

### 실행 방법 (Cloudflare Dashboard Console)

각 파일마다:
1. URL을 브라우저에서 열기
2. 전체 내용 복사
3. Cloudflare Dashboard → D1 → webapp-production → Console
4. 붙여넣기 후 Execute
5. 완료 후 다음 파일 진행

---

## 📝 또는 로컬에서 wrangler 사용 (권장)

로컬에서 분할된 파일을 순서대로 실행:

```bash
cd /home/user/webapp/deploy

# Step 1
npx wrangler d1 execute webapp-production --file=step1_regions_categories.sql --remote

# Step 2
npx wrangler d1 execute webapp-production --file=step2_producers.sql --remote

# Step 3
npx wrangler d1 execute webapp-production --file=step3_products_tea_craft.sql --remote

# Step 4
npx wrangler d1 execute webapp-production --file=step4_products_local.sql --remote

# Step 5
npx wrangler d1 execute webapp-production --file=step5_experiences_education_events.sql --remote
```

---

## ✅ 확인

모든 파일 실행 후:

```bash
curl https://dagong-bi1.pages.dev/api/products?limit=100 | jq '.products | length'
# 예상: 78

curl https://dagong-bi1.pages.dev/api/events?limit=50 | jq '.events | length'
# 예상: 27
```
