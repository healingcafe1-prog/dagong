# 🚨 긴급 전체 복구 시스템 (최종판)

## ⚠️ 현재 상황
- **이벤트 제외 모든 데이터 손실**
- 제품 17개만 남음 (목표: 78개)
- 체험 4개 (목표: 14개)
- 교육과정 30개 유지 ✅

---

## 🎯 복구 목표

| 항목 | 현재 | 목표 | 상태 |
|------|------|------|------|
| 지역 | ? | 17 | ⚠️ |
| 카테고리 | ? | 27 | ⚠️ |
| 생산자 | ? | 13 | ⚠️ |
| 제품 | 17 | 78 | ⚠️ |
| 체험 | 4 | 14 | ⚠️ |
| 교육 | 30 | 30 | ✅ |

---

## ⚡ 즉시 복구 방법 (5분)

### 방법 1: CLI 복구 (가장 빠름, 권장)

```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=MASTER_SEED_FINAL.sql
```

**장점**:
- 한 번에 전체 복구
- 타임아웃 없음
- 오류 처리 자동

---

### 방법 2: Cloudflare D1 콘솔 (수동)

**문제점**: 
- 긴 SQL은 타임아웃 발생
- 여러 번 나눠서 실행 필요

**해결책**:
아래 파일들을 **순서대로** 실행:

1. **FIX_EXPERIENCES_CORRECT_SCHEMA.sql** (체험 10개)
   - 올바른 스키마 사용 (`main_image`)
   - 5분 소요

2. **MASTER_SEED_FINAL.sql** (전체 복구)
   - 지역, 카테고리, 생산자, 제품 78개
   - 10분 소요

---

## 🔧 스키마 문제 해결

### ❌ 이전 오류
```
table experiences has no column named image: SQLITE_ERROR
```

### ✅ 해결
```sql
-- 잘못된 컬럼명
image → main_image

-- 올바른 SQL
INSERT INTO experiences (..., main_image, ...) VALUES (...);
```

---

## 📋 복구 파일 목록

### 1. FIX_EXPERIENCES_CORRECT_SCHEMA.sql
**용도**: 체험 프로그램 10개 추가 (4 → 14)  
**특징**: 
- 올바른 스키마 사용
- `main_image` 컬럼 사용
- `experience_type` 올바른 값

**실행**:
```sql
-- Cloudflare D1 콘솔에서 복사 붙여넣기
-- 또는
npx wrangler d1 execute webapp-production --remote --file=FIX_EXPERIENCES_CORRECT_SCHEMA.sql
```

### 2. MASTER_SEED_FINAL.sql
**용도**: 전체 데이터베이스 복구  
**포함**:
- 지역 17개
- 카테고리 27개
- 생산자 13개
- 제품 78개 (차 20, 공예 23, 선물 2, 특산 33)
- 체험 5개
- 교육과정 30개

**실행**:
```bash
npx wrangler d1 execute webapp-production --remote --file=MASTER_SEED_FINAL.sql
```

---

## ✅ 복구 후 확인

```sql
-- 지역
SELECT COUNT(*) FROM regions;  -- 17

-- 카테고리
SELECT COUNT(*) FROM categories;  -- 27

-- 생산자
SELECT COUNT(*) FROM producers;  -- 13

-- 제품
SELECT COUNT(*) FROM products;  -- 78

-- 체험
SELECT COUNT(*) FROM experiences;  -- 14

-- 교육
SELECT COUNT(*) FROM education_curriculum;  -- 30
```

---

## 🔄 반복 방지 대책

### 1. 자동 백업 시스템
```bash
# 매일 자동 백업
0 9 * * * cd /home/user/webapp && bash backup_db.sh
```

### 2. 스키마 검증
```bash
# 스키마 확인 스크립트
bash check_schema.sh
```

### 3. 데이터 확인
```bash
# 일일 데이터 확인
bash check_data.sh
```

---

## 🎯 핵심 교훈

### ❌ 실패 원인
1. **스키마 불일치**: `image` vs `main_image`
2. **대량 SQL 타임아웃**: Cloudflare 콘솔 제한
3. **백업 부족**: 자동 백업 시스템 없음

### ✅ 해결책
1. **정확한 스키마 사용**: migrations/ 폴더 참조
2. **CLI 사용**: wrangler d1 execute
3. **자동 백업**: GitHub + 로컬 백업
4. **정기 확인**: check_data.sh

---

## 🔗 관련 파일

- **체험 복구**: FIX_EXPERIENCES_CORRECT_SCHEMA.sql
- **전체 복구**: MASTER_SEED_FINAL.sql
- **스키마**: migrations/0001_initial_schema.sql
- **확인 스크립트**: check_data.sh

---

## 💡 즉시 실행 (1분)

```bash
# 1단계: 체험 복구
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=FIX_EXPERIENCES_CORRECT_SCHEMA.sql

# 2단계: 전체 복구 (선택)
npx wrangler d1 execute webapp-production --remote --file=MASTER_SEED_FINAL.sql

# 3단계: 확인
npx wrangler d1 execute webapp-production --remote --command="SELECT COUNT(*) FROM experiences;"
```

---

## 🚀 최종 권장 사항

**CLI 사용**이 가장 안전하고 빠릅니다:
- ✅ 타임아웃 없음
- ✅ 한 번에 전체 복구
- ✅ 오류 처리 자동
- ✅ 5분 이내 완료

Cloudflare D1 콘솔은 **작은 SQL만 사용**하세요.
