# 🔧 복구 실패 문제 해결 가이드

## 🚨 현재 상황
STEP 1~4를 Cloudflare D1 콘솔에서 실행했으나 **데이터가 추가되지 않음**

### 현재 데이터 (2026-02-20 확인)
- 차 제품: 7개 / 목표 20개 ❌
- 공예품: 4개 / 목표 23개 ❌
- 선물세트: 0개 / 목표 15개 ❌
- 체험: 8개 / 목표 14개 ❌

---

## 🔍 원인 진단

### 1단계: 데이터 확인
Cloudflare D1 콘솔에서 다음 SQL 실행:
```sql
-- 생산자 수 확인
SELECT COUNT(*) FROM producers;

-- 지역 수 확인  
SELECT COUNT(*) FROM regions;

-- 제품 타입별 확인
SELECT product_type, COUNT(*) FROM products GROUP BY product_type;
```

**또는 CHECK_DATA.sql 전체 실행**:
https://github.com/healingcafe1-prog/dagong/blob/main/CHECK_DATA.sql

---

## ✅ 해결 방법

### 방법 A: 완전 복구 (권장) - SAFE_INSERT_ONLY.sql 사용

**장점**: 한 번에 모든 데이터 삽입, 안전함 (DELETE 없음)

1. **Cloudflare D1 콘솔 열기**  
   https://dash.cloudflare.com/  
   → Workers & Pages → D1 → webapp-production → Console

2. **SAFE_INSERT_ONLY.sql 전체 복사**  
   https://github.com/healingcafe1-prog/dagong/blob/main/SAFE_INSERT_ONLY.sql  
   → Raw 버튼 클릭 → Ctrl+A → Ctrl+C

3. **콘솔에 붙여넣고 Execute**  
   → 완료 메시지 확인: "=== 안전 복구 완료 ==="

4. **검증**  
   - 웹: https://dagong-bi1.pages.dev
   - API: `curl "https://dagong-bi1.pages.dev/api/products?type=tea&limit=50"`

---

### 방법 B: CLI 복구 (CLOUDFLARE_API_TOKEN 필요)

```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=SAFE_INSERT_ONLY.sql
```

---

### 방법 C: 단계별 재실행 (이전 실패 시)

#### 문제: STEP 1 실패 시
**증상**: STEP 2 실행 시 Foreign Key 오류 발생

**해결**:
1. STEP 1 다시 실행
2. 생산자 확인: `SELECT COUNT(*) FROM producers;` → 13개여야 함
3. STEP 2 재실행

#### 문제: INSERT OR IGNORE로 스킵됨
**증상**: "STEP X 완료" 메시지는 나오지만 데이터 수가 증가하지 않음

**원인**: 기존 데이터와 ID 충돌

**해결**:
1. 기존 ID 범위 확인:
```sql
SELECT MIN(id), MAX(id), product_type, COUNT(*) 
FROM products 
GROUP BY product_type;
```

2. ID가 1부터 시작하는 데이터는 이미 존재할 가능성
3. SAFE_INSERT_ONLY.sql (전체 복구) 사용 권장

---

## 🎯 가장 확실한 방법

### ⭐ SAFE_INSERT_ONLY.sql 한 번에 실행 (5분)

**이 파일의 특징**:
- ✅ DELETE 없음 (안전)
- ✅ INSERT OR IGNORE 사용 (중복 방지)
- ✅ 올바른 순서로 삽입 (Foreign Key 보장)
- ✅ 전체 데이터 91개 제품 포함

**실행 방법**:
1. https://dash.cloudflare.com/ → D1 Console
2. https://github.com/healingcafe1-prog/dagong/blob/main/SAFE_INSERT_ONLY.sql
3. Raw → 전체 복사 → 콘솔 붙여넣기 → Execute
4. "=== 안전 복구 완료 ===" 확인

---

## 🔧 에러 메시지별 해결

### "SQLITE_ERROR" at offset 0
**원인**: SQL 문법 오류 또는 파일 손상

**해결**:
1. Raw 버튼으로 복사했는지 확인
2. 주석(`--`)이 제대로 복사되었는지 확인
3. 파일 끝까지 전체 복사되었는지 확인

### "FOREIGN KEY constraint failed"
**원인**: STEP 1 (생산자, 지역, 카테고리)이 누락됨

**해결**:
1. STEP 1 먼저 실행
2. 생산자 확인: `SELECT COUNT(*) FROM producers;`
3. 13개 확인 후 다음 단계 진행

### "no such table: products"
**원인**: 테이블이 생성되지 않음

**해결**:
1. 스키마 확인: `.schema products`
2. 테이블 없으면 스키마 생성 필요 (GitHub README.md 참조)

---

## 📊 복구 후 검증

### API 확인
```bash
# 차 제품 (20개)
curl "https://dagong-bi1.pages.dev/api/products?type=tea&limit=50" | jq '.products | length'

# 공예품 (23개)
curl "https://dagong-bi1.pages.dev/api/products?type=craft&limit=50" | jq '.products | length'

# 선물세트 (15개)
curl "https://dagong-bi1.pages.dev/api/products?type=gift&limit=50" | jq '.products | length'

# 지역특산품 (33개)
curl "https://dagong-bi1.pages.dev/api/products?type=local&limit=50" | jq '.products | length'

# 체험 (14개)
curl "https://dagong-bi1.pages.dev/api/experiences?limit=50" | jq '.experiences | length'
```

### 웹 확인
- https://dagong-bi1.pages.dev/?category=tea
- https://dagong-bi1.pages.dev/?category=craft
- https://dagong-bi1.pages.dev/?category=gift
- https://dagong-bi1.pages.dev/?category=local
- https://dagong-bi1.pages.dev/?category=experiences

---

## 💡 추가 팁

### STEP 방식이 실패하는 경우
- **각 STEP을 실행한 후 결과 확인하지 않고 바로 다음 진행**
- **네트워크 타임아웃으로 일부만 실행됨**
- **콘솔 복사 시 일부 누락**

### 해결책
1. ⭐ **SAFE_INSERT_ONLY.sql 사용** (한 번에 전체 복구)
2. 각 STEP 실행 후 반드시 데이터 수 확인
3. Raw 버튼으로 원본 SQL 복사

---

## 🔗 참고 링크

- **전체 복구 SQL**: https://github.com/healingcafe1-prog/dagong/blob/main/SAFE_INSERT_ONLY.sql
- **데이터 확인 SQL**: https://github.com/healingcafe1-prog/dagong/blob/main/CHECK_DATA.sql
- **Cloudflare D1 콘솔**: https://dash.cloudflare.com/
- **프로덕션 사이트**: https://dagong-bi1.pages.dev

---

**작성일**: 2026-02-20  
**최종 업데이트**: 2026-02-20
