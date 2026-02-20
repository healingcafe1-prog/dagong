# 🚨 긴급 완전 복구 가이드 (5분 소요)

## 📊 현재 상태 (2026-02-20)

| 항목 | 현재 | 목표 | 상태 |
|------|------|------|------|
| 생산자 | 6 | 13 | ⚠️ 7개 부족 |
| 체험 프로그램 | 4 | 5 | ⚠️ 1개 부족 |
| 차(tea) | 5 | 20 | ⚠️ 15개 부족 |
| 공예품(craft) | 7 | 23 | ⚠️ 16개 부족 |
| 선물세트(gift) | 2 | 2 | ✅ 완료 |
| 지역특산(local) | 3 | 33 | ⚠️ 30개 부족 |
| 교육과정 | 30 | 30 | ✅ 완료 |

---

## ⚡ 즉시 복구 방법

### 1단계: Cloudflare D1 콘솔 접속 (30초)
```
https://dash.cloudflare.com/
→ Workers & Pages  
→ D1
→ webapp-production
→ Console 탭 클릭
```

### 2단계: 완전 복구 SQL 실행 (4분)

**중요**: 아래 GitHub 파일을 **직접 열어서** SQL 내용을 복사하세요. URL을 붙여넣으면 안 됩니다!

📁 **전체 복구 SQL 파일**:  
```
https://github.com/healingcafe1-prog/dagong/blob/main/MASTER_SEED_FINAL.sql
```

이 파일은 **완전한 데이터베이스**를 재구축합니다:
- 생산자 13개
- 체험 프로그램 5개
- 차 제품 20개
- 공예품 23개
- 선물세트 2개
- 지역특산품 33개
- 교육과정 30개

### 3단계: 실행 순서

#### 3-1. 기존 데이터 삭제 (있다면)
```sql
DELETE FROM products WHERE id >= 1;
DELETE FROM producers WHERE id >= 7;
DELETE FROM experiences WHERE id >= 5;
```

#### 3-2. 생산자 7개 추가
`MASTER_SEED_FINAL.sql`의 `-- 4. producers` 섹션 복사 → 실행

#### 3-3. 제품 추가
`MASTER_SEED_FINAL.sql`의 `-- 5. products` 섹션 복사 → 실행  
(차 20개 + 공예 23개 + 지역특산 33개 = 78개)

#### 3-4. 체험 1개 추가
`MASTER_SEED_FINAL.sql`의 `-- 6. experiences` 섹션에서 ID 5번 복사 → 실행

### 4단계: 최종 확인 (30초)
```sql
SELECT COUNT(*) FROM producers;          -- 13
SELECT COUNT(*) FROM experiences;        -- 5
SELECT COUNT(*) FROM products WHERE category_id <= 7;  -- 차: 20
SELECT COUNT(*) FROM products WHERE category_id IN (8,9,10,11,12);  -- 공예: 23
SELECT COUNT(*) FROM products WHERE category_id >= 13;  -- 선물+특산: 35
SELECT COUNT(*) FROM education_curriculum;  -- 30
```

---

## 🎯 더 빠른 방법 (권장)

**로컬 백업에서 복원** (CLI 사용 가능한 경우):
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=MASTER_SEED_FINAL.sql
```

---

## 📋 복구 후 확인사항

### API 테스트
```bash
# 차 제품 확인
curl "https://dagong-bi1.pages.dev/api/products?type=tea&limit=20"

# 공예품 확인
curl "https://dagong-bi1.pages.dev/api/products?type=craft&limit=25"

# 지역특산품 확인
curl "https://dagong-bi1.pages.dev/api/products?type=local&limit=35"

# 체험 프로그램 확인
curl "https://dagong-bi1.pages.dev/api/experiences?limit=10"

# 교육과정 확인
curl "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50"
```

---

## 🔄 데이터 유지 관리

### 일일 백업 (자동화 추천)
```bash
# 매일 오전 9시 자동 백업
0 9 * * * cd /home/user/webapp && bash backup_db.sh
```

### 주간 상태 점검
```bash
# 매주 월요일 상태 확인
bash check_data.sh
```

---

## ⚠️ 문제 발생 시

1. **SQL 에러**: 한 줄씩 천천히 복사
2. **타임아웃**: 브라우저 새로고침 후 재시도
3. **중복 키 에러**: `INSERT OR IGNORE` 사용 확인

---

## 🔗 관련 파일

- 전체 마스터 데이터: `MASTER_SEED_FINAL.sql`
- 간단 가이드: `CLOUDFLARE_CONSOLE_GUIDE.md`
- 상태 확인 스크립트: `check_data.sh`
- 자동 복구 스크립트: `auto_recovery.sh`

---

## 💡 핵심 포인트

✅ **MASTER_SEED_FINAL.sql 하나로 모든 것 복구**  
✅ **INSERT OR IGNORE로 중복 방지**  
✅ **GitHub에 백업되어 있음**  
✅ **복구 시간: 약 5분**  

이 가이드대로 하시면 **모든 샘플 데이터**가 정확히 복구됩니다! 🚀
