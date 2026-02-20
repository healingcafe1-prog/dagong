# 🚨 API 토큰 권한 부족 - D1 Import 권한 추가 필요

## ⚠️ 발생한 문제

방금 생성한 API 토큰으로 실행했을 때:
```
Authentication error [code: 10000]
```

**원인**: "Edit Cloudflare Workers" 템플릿에 **D1 Database Import** 권한이 포함되지 않음

---

## ✅ 해결 방법: Custom Token으로 재생성

### Step 1: 기존 토큰 삭제 (선택사항)

1. https://dash.cloudflare.com/profile/api-tokens 접속
2. 방금 생성한 토큰 찾기
3. **Delete** 클릭

### Step 2: Custom Token 생성

#### 2-1. Create Token 페이지
1. https://dash.cloudflare.com/profile/api-tokens 접속
2. **Create Token** 클릭
3. **"Get started"** 버튼 클릭 (아래쪽 "Custom token" 섹션)

#### 2-2. 토큰 이름 설정
```
Token name: dagong-d1-admin
```

#### 2-3. 권한 추가 (Permissions)

**중요**: 다음 권한들을 모두 추가해야 합니다:

##### Account Permissions:
1. **D1** → **Edit** ⭐ (가장 중요!)
2. **Workers Scripts** → **Edit**
3. **Workers KV Storage** → **Edit**
4. **Workers R2 Storage** → **Edit**
5. **Cloudflare Pages** → **Edit**

**D1 권한 추가 방법**:
- "Add" 버튼 클릭
- 드롭다운에서 "Account" 선택
- 리소스 드롭다운에서 **"D1"** 찾기
- 권한을 **"Edit"**로 설정

##### Zone Permissions:
1. **Workers Routes** → **Edit**

#### 2-4. Account Resources
```
Include → All accounts
```

또는 특정 계정 선택:
```
Include → Specific account → Healingcafe1@gmail.com's Account
```

#### 2-5. Zone Resources  
```
Include → All zones
```

#### 2-6. Client IP Address Filtering (선택사항)
```
Is in → (비워두기, 모든 IP 허용)
```

#### 2-7. TTL (Time to Live)
```
기본값 사용 또는 만료 기간 설정
```

#### 2-8. 토큰 생성
1. **Continue to summary** 클릭
2. 권한 확인
3. **Create Token** 클릭
4. 생성된 토큰 **복사** (한 번만 표시됨!)

---

## 🔧 토큰 재생성 후 실행

### 방법 1: 터미널에서 직접 실행

```bash
cd /home/user/webapp

# 새 토큰으로 환경 변수 설정
export CLOUDFLARE_API_TOKEN="새로운-토큰-여기에-붙여넣기"

# 권한 확인
npx wrangler whoami

# 프로덕션 D1에 데이터 삽입
npx wrangler d1 execute webapp-production --file=MASTER_SEED.sql --remote
```

### 방법 2: 배포 스크립트 사용

```bash
cd /home/user/webapp

# 새 토큰으로 환경 변수 설정
export CLOUDFLARE_API_TOKEN="새로운-토큰-여기에-붙여넣기"

# 스크립트 실행
./deploy_to_production.sh
```

---

## 📝 D1 권한이 별도로 표시되지 않는 경우

일부 Cloudflare 계정에서는 D1이 베타 기능이거나 UI에 표시되지 않을 수 있습니다.

### 대안 방법: Cloudflare Dashboard에서 직접 SQL 실행

#### 방법 A: 작은 단위로 나누어 실행

1. Cloudflare Dashboard → D1 → webapp-production → Console
2. 다음 쿼리들을 **순서대로 하나씩** 실행:

**쿼리 1: 데이터 삭제**
```sql
PRAGMA foreign_keys = OFF;

DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM education_applications;
DELETE FROM education_curriculum;
DELETE FROM education_categories;
DELETE FROM reviews;
DELETE FROM cart_items;
DELETE FROM wishlists;
DELETE FROM product_images;
DELETE FROM experiences;
DELETE FROM products;
DELETE FROM producers;
DELETE FROM events;
DELETE FROM categories;
DELETE FROM regions;
DELETE FROM users;
```

**쿼리 2: 지역 데이터**
```
https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/deploy/step1_regions_categories.sql
```
(위 URL의 내용 중 INSERT INTO regions 부분만 복사하여 실행)

**쿼리 3: 카테고리 데이터**
(step1 파일의 INSERT INTO categories 부분 실행)

**쿼리 4~: 나머지 데이터**
- 생산자 (producers)
- 제품 (products)
- 체험 (experiences)
- 교육 (education_categories, education_curriculum)
- 이벤트 (events)

각 INSERT 문을 개별적으로 실행

---

## 🎯 권장 순서

1. **먼저**: Custom Token으로 D1 Edit 권한 추가 후 재시도
2. **안 되면**: Dashboard Console에서 수동으로 SQL 실행 (귀찮지만 확실함)

---

## ✅ 성공 확인

토큰 재생성 후 실행이 성공하면:

```bash
# 프로덕션 API 확인
curl https://dagong-bi1.pages.dev/api/products?limit=100 | jq '.products | length'
# → 78

curl https://dagong-bi1.pages.dev/api/events?limit=50 | jq '.events | length'
# → 27

curl https://dagong-bi1.pages.dev/api/experiences | jq '.experiences | length'
# → 5
```

---

## 📞 추가 지원

### D1 권한을 찾을 수 없는 경우

Cloudflare 고객 지원에 문의:
- D1 베타 기능 접근 권한 요청
- 또는 기존 방법 (Dashboard Console 수동 실행) 사용

### 토큰 생성 화면이 다른 경우

Cloudflare UI는 자주 업데이트됩니다. 핵심은:
- **D1 Database** 리소스에 대한 **Edit** 권한
- 계정 범위 (Account-level permission)

---

**다음 단계**: D1 Edit 권한이 포함된 Custom Token을 생성하여 다시 시도해주세요! 🚀

---

**작성일**: 2026-02-20  
**문제**: D1 Import 권한 부족  
**해결**: Custom Token with D1 Edit permission
