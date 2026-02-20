# 🚨 프로덕션 완전 복구 가이드 (최종판)

## 📊 현재 상태 (2026-02-20)

| 항목 | 현재 | 목표 | 부족 |
|------|------|------|------|
| **이벤트** | 27 | 27 | ✅ 완료 |
| **제품 총합** | 17 | 78 | ⚠️ **61개 부족** |
| - 차(tea) | 5 | 20 | 15개 부족 |
| - 공예(craft) | 7 | 23 | 16개 부족 |
| - 선물(gift) | 2 | 2 | ✅ 완료 |
| - 지역특산(local) | 3 | 33 | 30개 부족 |
| **체험** | 8 | 14 | ⚠️ **6개 부족** |
| **교육 총합** | 30 | 30 | ✅ 완료 |

---

## ⚡ 즉시 복구 방법 (CLI 사용 - 가장 빠름)

### **방법 1: CLI로 전체 복구 (권장, 5분)**

```bash
# Cloudflare API 설정 (이미 설정되어 있으면 생략)
export CLOUDFLARE_API_TOKEN="your-token"

# 전체 데이터 복구
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=MASTER_SEED_FINAL.sql
```

**장점**:
- ✅ 한 번에 완전 복구
- ✅ 타임아웃 없음
- ✅ 자동 트랜잭션
- ✅ 5분 완료

---

### **방법 2: Cloudflare D1 콘솔 (수동, 20분)**

**문제**: 대용량 SQL은 콘솔에서 타임아웃  
**해결**: 작은 파일로 나눠서 실행

아래 파일을 **순서대로** 실행:

#### **1단계: 생산자 추가**
```
https://github.com/healingcafe1-prog/dagong/blob/main/SAFE_RECOVERY_STEP_BY_STEP.sql
```
- 생산자 5개 추가
- **반드시 먼저** 실행

#### **2단계: 체험 프로그램 추가**
```
https://github.com/healingcafe1-prog/dagong/blob/main/SAFE_RECOVERY_STEP_BY_STEP.sql
```
- 체험 5개 추가 (8 → 13)
- 1단계 후 실행

#### **3단계: 제품 대량 추가**
```
https://github.com/healingcafe1-prog/dagong/blob/main/MASTER_SEED_FINAL.sql
```
- 제품 61개 추가
- 라인 93-182 (차 20개 + 공예 23개 + 지역특산 33개)

---

## 🎯 목표 최종 상태

| 항목 | 최종 목표 |
|------|-----------|
| 지역 | 17 |
| 카테고리 | 27 |
| 생산자 | 13 |
| 제품 | 78 |
| - 차(tea) | 20 |
| - 공예(craft) | 23 |
| - 선물(gift) | 2 |
| - 지역특산(local) | 33 |
| 체험 | 14 |
| 교육 | 30 |
| - 차 문화 입문 | 다수 |
| - 전문 다인 과정 | 다수 |
| - 명상과 차 | 다수 |
| - 차 제조 실습 | 다수 |

---

## 📋 복구 후 확인 쿼리

```sql
-- 제품
SELECT COUNT(*) FROM products;  -- 78

-- 차 제품
SELECT COUNT(*) FROM products WHERE category_id <= 7;  -- 20

-- 공예품
SELECT COUNT(*) FROM products WHERE category_id >= 8 AND category_id <= 18;  -- 23

-- 지역특산품
SELECT COUNT(*) FROM products WHERE category_id >= 23;  -- 33

-- 체험
SELECT COUNT(*) FROM experiences;  -- 14

-- 교육
SELECT COUNT(*) FROM education_curriculum;  -- 30

-- 생산자
SELECT COUNT(*) FROM producers;  -- 13
```

---

## 🔄 API 확인

```bash
# 차 제품
curl "https://dagong-bi1.pages.dev/api/products?type=tea&limit=25" | jq '.products | length'

# 공예품
curl "https://dagong-bi1.pages.dev/api/products?type=craft&limit=25" | jq '.products | length'

# 지역특산품
curl "https://dagong-bi1.pages.dev/api/products?type=local&limit=35" | jq '.products | length'

# 체험
curl "https://dagong-bi1.pages.dev/api/experiences?limit=20" | jq '.experiences | length'

# 교육
curl "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50" | jq '.curriculum | length'
```

---

## 🚀 즉시 실행 (CLI 권장)

```bash
# 1. 저장소 이동
cd /home/user/webapp

# 2. 전체 복구 (한 번에)
npx wrangler d1 execute webapp-production --remote --file=MASTER_SEED_FINAL.sql

# 3. 확인
npx wrangler d1 execute webapp-production --remote --command="SELECT COUNT(*) FROM products;"
npx wrangler d1 execute webapp-production --remote --command="SELECT COUNT(*) FROM experiences;"
```

---

## 💡 핵심 파일

- **완전 복구**: MASTER_SEED_FINAL.sql (지역, 카테고리, 생산자, 제품 78개, 체험 5개, 교육 30개)
- **단계별 복구**: SAFE_RECOVERY_STEP_BY_STEP.sql (생산자 + 체험)

---

## ⚠️ 주의사항

1. **순서 중요**: 생산자 → 체험 → 제품
2. **FOREIGN KEY**: 생산자 없으면 체험/제품 추가 실패
3. **CLI 권장**: 콘솔은 대용량 SQL 타임아웃
4. **백업 필수**: 복구 전 현재 상태 백업

---

## 🔗 관련 링크

- **전체 복구 SQL**: https://github.com/healingcafe1-prog/dagong/blob/main/MASTER_SEED_FINAL.sql
- **단계별 SQL**: https://github.com/healingcafe1-prog/dagong/blob/main/SAFE_RECOVERY_STEP_BY_STEP.sql
- **프로덕션**: https://dagong-bi1.pages.dev
- **GitHub**: https://github.com/healingcafe1-prog/dagong

---

## ✅ 최종 권장

**CLI 사용이 가장 안전하고 빠릅니다:**
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=MASTER_SEED_FINAL.sql
```

**5분 안에 완전 복구** 완료됩니다! 🚀
