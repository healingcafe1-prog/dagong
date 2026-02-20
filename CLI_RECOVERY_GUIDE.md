# 🚨 복구 실패 원인 및 해결 방법

## 문제 원인

Cloudflare D1 콘솔의 제약:
- ❌ **PRAGMA 문 사용 불가**
- ❌ **여러 문장 동시 실행 제한**
- ❌ **큰 SQL 파일 타임아웃**

스크린샷 에러: "PRAGMA foreign_keys = ON; -- 완료 메시지..."
→ PRAGMA 문이 문제를 일으킴

---

## ✅ 해결 방법 (CLI 사용)

### 방법 1: Wrangler CLI로 복구 (가장 확실!)

**1. Cloudflare API 토큰 설정 확인**
```bash
cd /home/user/webapp
echo $CLOUDFLARE_API_TOKEN
```

**2. 복구 실행**
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=SAFE_INSERT_ONLY.sql
```

**만약 CLOUDFLARE_API_TOKEN이 없다면:**
1. https://dash.cloudflare.com/profile/api-tokens
2. "Create Token" → "Edit Cloudflare Workers" 템플릿 사용
3. 토큰 복사
4. 환경변수 설정:
```bash
export CLOUDFLARE_API_TOKEN="your-token-here"
```

---

## 🔧 방법 2: D1 콘솔용 단순화 파일 (수동)

**문제**: 현재 SAFE_INSERT_ONLY.sql은 PRAGMA 문 때문에 D1 콘솔에서 실행 불가

**해결**: PRAGMA 제거하고 INSERT만 남긴 파일 필요

하지만 이 방법은:
- ⚠️ 너무 많은 수동 작업 필요
- ⚠️ 순서대로 실행해야 함
- ⚠️ 에러 발생 가능성 높음

→ **CLI 사용 강력 권장**

---

## 📋 복구 순서 (CLI 사용)

### 1단계: API 토큰 확인
```bash
cd /home/user/webapp
npx wrangler whoami
```

성공하면 → 2단계로  
실패하면 → API 토큰 설정 필요

### 2단계: 복구 실행
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=SAFE_INSERT_ONLY.sql
```

### 3단계: 검증
```bash
curl "https://dagong-bi1.pages.dev/api/products?type=tea&limit=50" | jq '.products | length'
curl "https://dagong-bi1.pages.dev/api/products?type=craft&limit=50" | jq '.products | length'
curl "https://dagong-bi1.pages.dev/api/products?type=gift&limit=50" | jq '.products | length'
curl "https://dagong-bi1.pages.dev/api/experiences?limit=50" | jq '.experiences | length'
curl "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50" | jq '.curriculum | length'
```

**목표 결과:**
- 차: 20개
- 공예: 23개
- 선물: 15개
- 체험: 14개
- 교육: 30개

---

## 🆘 API 토큰이 없는 경우

### Cloudflare API 토큰 생성

1. **Cloudflare 대시보드 로그인**
   https://dash.cloudflare.com/

2. **프로필 → API Tokens**
   https://dash.cloudflare.com/profile/api-tokens

3. **"Create Token" 클릭**

4. **"Edit Cloudflare Workers" 템플릿 선택**

5. **권한 설정:**
   - Account - Cloudflare Pages: Edit
   - Account - D1: Edit
   - Zone - Workers Routes: Edit

6. **"Continue to summary" → "Create Token"**

7. **토큰 복사** (한 번만 표시됨!)

8. **환경변수 설정:**
```bash
export CLOUDFLARE_API_TOKEN="복사한토큰"
```

9. **확인:**
```bash
npx wrangler whoami
```

---

## 🎯 최종 권장 방법

**A. API 토큰이 있는 경우:**
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=SAFE_INSERT_ONLY.sql
```

**B. API 토큰이 없는 경우:**
1. 위의 "API 토큰 생성" 절차 따라 토큰 생성
2. 환경변수 설정
3. A 방법 실행

**C. 토큰 생성이 불가능한 경우:**
→ Cloudflare 계정 소유자에게 토큰 요청 필요

---

## 📊 복구 후 확인

### API로 확인
```bash
# 차 제품 (20개)
curl -s "https://dagong-bi1.pages.dev/api/products?type=tea&limit=50" | jq '{total: .total, count: (.products | length)}'

# 공예품 (23개)
curl -s "https://dagong-bi1.pages.dev/api/products?type=craft&limit=50" | jq '{total: .total, count: (.products | length)}'

# 선물세트 (15개)
curl -s "https://dagong-bi1.pages.dev/api/products?type=gift&limit=50" | jq '{total: .total, count: (.products | length)}'

# 지역특산품 (33개)
curl -s "https://dagong-bi1.pages.dev/api/products?type=local&limit=50" | jq '{total: .total, count: (.products | length)}'

# 체험 (14개)
curl -s "https://dagong-bi1.pages.dev/api/experiences?limit=50" | jq '{total: .total, count: (.experiences | length)}'

# 교육 (30개)
curl -s "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50" | jq '{total: .total, count: (.curriculum | length)}'
```

### 웹으로 확인
- https://dagong-bi1.pages.dev/?category=tea
- https://dagong-bi1.pages.dev/?category=craft
- https://dagong-bi1.pages.dev/?category=gift
- https://dagong-bi1.pages.dev/?category=local
- https://dagong-bi1.pages.dev/?category=experiences
- https://dagong-bi1.pages.dev/education

---

## 💡 왜 CLI를 사용해야 하나?

| 방법 | 장점 | 단점 |
|------|------|------|
| **D1 콘솔** | 간단함 | PRAGMA 불가, 큰 파일 타임아웃, 여러 문장 제한 |
| **Wrangler CLI** | 모든 SQL 실행 가능, 안정적, 빠름 | API 토큰 필요 |

→ **CLI가 유일하게 확실한 방법**

---

**다음 단계**: 
1. `npx wrangler whoami` 실행하여 인증 확인
2. 성공하면 `npx wrangler d1 execute webapp-production --remote --file=SAFE_INSERT_ONLY.sql` 실행
3. 실패하면 API 토큰 생성 후 재시도

**작성일**: 2026-02-20
