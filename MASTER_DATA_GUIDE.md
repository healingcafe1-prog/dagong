# 다공(dagong) 마스터 데이터 가이드

## 📋 개요
이 문서는 다공 프로젝트의 **마스터 데이터 관리 가이드**입니다.  
앞으로 **데이터 유실 없이** 안전하게 데이터를 관리하기 위해 통합 마스터 시드 파일을 사용합니다.

---

## 📦 마스터 시드 파일

### MASTER_SEED.sql
**전체 샘플 데이터를 포함한 통합 시드 파일**

#### 포함된 데이터
- **지역**: 17개 (제주도, 하동, 김해, 광양, 보성, 강진, 장흥, 부안, 광주, 전주, 담양, 이천, 남원, 안동, 통영, 전남, 경남)
- **카테고리**: 27개
  - 차: 7개 (녹차, 백차, 청차, 홍차, 황차, 발효차, 블렌딩차)
  - 공예: 13개 (찻잔, 다관, 찻상, 장식품, 도자기, 목공예, 금속공예, 한복, 가죽공예, 칠기공예, 서예용품, 그림)
  - 선물세트: 2개 (명절, 기념일)
  - 지역특산품: 5개 (농산물, 가공식품, 수산물, 축산물, 특산품)
- **생산자**: 13개 (차 3개, 공예 9개, 지역특산품 1개)
- **제품**: 78개
  - 차: 20개 (녹차 4, 백차 3, 청차 3, 홍차 3, 발효차 3, 황차 1, 블렌딩차 3)
  - 공예품: 23개 (다기 6, 도자기 4, 목공예 3, 금속공예 2, 한복 2, 가죽공예 1, 칠기공예 1, 서예용품 2, 그림 1, 장식품 1)
  - 선물세트: 2개
  - 지역특산품: 33개 (농산물 8, 수산물 8, 축산물 2, 특산품 4, 가공식품 11)
- **체험 프로그램**: 5개 (차밭 트레킹, 차 만들기, 도자기 클래스, 차 명상, 다도 예절)
- **교육 프로그램**: 30개
  - 교육 카테고리: 4개 (다도교육, 차공부, 공예공부, 명상교육)
  - 커리큘럼: 30개 (명상 10, 다도 10, 차 공부 5, 공예 5)
- **이벤트**: 30개 (1월~12월, 연중 행사)

#### 특징
- **완전한 데이터**: 모든 샘플 데이터가 하나의 파일에 통합
- **의존성 관리**: 외래키 순서를 올바르게 유지
- **재실행 가능**: 기존 데이터를 삭제하고 새로 삽입
- **주석 포함**: 각 섹션별로 명확한 주석

---

## 🔄 데이터 복원 방법

### 1. 로컬 개발 환경 (Sandbox)

```bash
# 1. 로컬 데이터베이스 초기화 및 복원
cd /home/user/webapp
npx wrangler d1 execute webapp-production --local --file=MASTER_SEED.sql

# 2. 서버 재시작
pm2 restart webapp

# 3. 확인
curl http://localhost:3000/api/products | jq '. | length'
curl http://localhost:3000/api/experiences | jq '. | length'
curl http://localhost:3000/api/events | jq '. | length'
curl http://localhost:3000/api/education/curriculum | jq '. | length'
```

### 2. 프로덕션 환경 (Cloudflare Pages)

#### 방법 1: Cloudflare Dashboard (권장)
1. Cloudflare Dashboard 접속
2. **Workers & Pages** → **D1** → **webapp-production** 선택
3. **Console** 탭 클릭
4. GitHub에서 SQL 내용 복사:
   ```
   https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/MASTER_SEED.sql
   ```
5. Console에 붙여넣기 후 **Execute** 버튼 클릭

#### 방법 2: Wrangler CLI
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --file=MASTER_SEED.sql --remote
```

---

## 📝 기존 시드 파일 (레거시)

### seed_simple.sql
- **목적**: 초기 기본 데이터
- **포함**: 생산자 3명, 제품 10개, 체험 5개, 교육 30개

### seed_additional.sql
- **목적**: 공예품 및 지역특산품 추가
- **포함**: 공예품 23개, 지역특산품 35개, 생산자 10명

### seed_tea_restore.sql
- **목적**: 차 제품 복원
- **포함**: 차 제품 15개 (백차 3, 청차 3, 홍차 3, 발효차 3, 블렌딩차 3)

> **⚠️ 주의**: 위 3개 파일은 더 이상 사용하지 않습니다.  
> **MASTER_SEED.sql 하나로 모든 데이터를 관리**합니다.

---

## ✅ 데이터 관리 원칙

### 1. 단일 소스 원칙
- **MASTER_SEED.sql**이 유일한 진실의 원천(Single Source of Truth)
- 데이터 추가/수정 시 이 파일만 업데이트

### 2. 버전 관리
- MASTER_SEED.sql은 항상 Git으로 관리
- 변경 사항은 명확한 커밋 메시지와 함께 기록

### 3. 프로덕션 동기화
- 로컬 개발 → 테스트 → MASTER_SEED.sql 업데이트 → Git 푸시 → 프로덕션 적용

### 4. 백업
- 중요한 변경 전에는 기존 데이터를 백업
- Cloudflare D1 Console에서 데이터를 Export 가능

---

## 🔍 데이터 확인 쿼리

### 로컬 환경
```bash
# 전체 데이터 개수 확인
cd /home/user/webapp
npx wrangler d1 execute webapp-production --local --command="
SELECT 
  'producers' as table_name, COUNT(*) as count FROM producers
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'experiences', COUNT(*) FROM experiences
UNION ALL
SELECT 'education_curriculum', COUNT(*) FROM education_curriculum
UNION ALL
SELECT 'events', COUNT(*) FROM events
UNION ALL
SELECT 'regions', COUNT(*) FROM regions
UNION ALL
SELECT 'categories', COUNT(*) FROM categories
"

# 제품 타입별 개수
npx wrangler d1 execute webapp-production --local --command="
SELECT product_type, COUNT(*) as count 
FROM products 
GROUP BY product_type
"

# 이벤트 월별 개수
npx wrangler d1 execute webapp-production --local --command="
SELECT month, COUNT(*) as count 
FROM events 
GROUP BY month 
ORDER BY month
"
```

---

## 📊 현재 데이터 상태 (2026-02-20 기준)

| 테이블 | 개수 | 비고 |
|--------|------|------|
| regions | 17 | 차 산지 7개, 공예 지역 10개 |
| categories | 27 | 차 7, 공예 13, 선물 2, 지역특산품 5 |
| producers | 13 | 차 3, 공예 9, 지역특산품 1 |
| products | 78 | 차 20, 공예 23, 선물 2, 특산품 33 |
| experiences | 5 | 체험 프로그램 |
| education_categories | 4 | 교육 카테고리 |
| education_curriculum | 30 | 명상 10, 다도 10, 차 공부 5, 공예 5 |
| events | 30 | 1월~12월 연중 행사 |

---

## 🚀 데이터 추가 가이드

### 새로운 제품 추가 시

1. **로컬에서 테스트**
```sql
INSERT INTO products (...) VALUES (...);
```

2. **MASTER_SEED.sql에 추가**
```bash
# 해당 섹션에 INSERT 문 추가
# 예: 4-1. 차 제품, 4-2. 공예품, 4-4. 지역특산품
```

3. **Git 커밋**
```bash
git add MASTER_SEED.sql
git commit -m "신제품 추가: [제품명]"
git push origin main
```

4. **프로덕션 적용**
```bash
# Cloudflare Dashboard에서 MASTER_SEED.sql 전체 실행
# 또는
npx wrangler d1 execute webapp-production --file=MASTER_SEED.sql --remote
```

---

## 📚 유용한 링크

- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong
- **마스터 시드 파일**: https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/MASTER_SEED.sql
- **프로덕션 사이트**: https://dagong-bi1.pages.dev
- **로컬 서버**: http://localhost:3000

---

## ⚠️ 중요 주의사항

1. **절대 프로덕션 데이터를 직접 수정하지 마세요**
   - 항상 로컬에서 테스트 후 MASTER_SEED.sql 업데이트

2. **외래키 순서를 지키세요**
   - regions → categories → producers → products 순서 유지
   - experiences는 regions와 producers 이후
   - education_curriculum은 education_categories 이후

3. **ID 충돌 방지**
   - 명시적 ID를 사용하는 테이블(regions, categories 등)은 ID 중복 주의
   - AUTO_INCREMENT 테이블(products, experiences 등)은 ID 생략 가능

4. **데이터 백업**
   - 중요한 변경 전에는 반드시 백업
   - Cloudflare D1 Console에서 Export 기능 활용

---

## 📞 문제 해결

### 외래키 오류 발생 시
```sql
-- 외래키 비활성화 확인
PRAGMA foreign_keys = OFF;

-- 데이터 삽입 후 활성화
PRAGMA foreign_keys = ON;
```

### 데이터 초기화 필요 시
```bash
# 로컬 데이터베이스 완전 초기화
cd /home/user/webapp
rm -rf .wrangler/state/v3/d1
npm run db:migrate:local
npx wrangler d1 execute webapp-production --local --file=MASTER_SEED.sql
```

---

## ✨ 최종 확인 사항

- ✅ **MASTER_SEED.sql** 파일이 GitHub에 저장됨
- ✅ **모든 샘플 데이터**가 하나의 파일에 통합됨
- ✅ **로컬 테스트** 완료 (78개 제품, 30개 교육, 30개 이벤트)
- ✅ **프로덕션 복원** 방법 문서화됨
- ✅ **데이터 관리 원칙** 수립됨

---

**작성일**: 2026-02-20  
**버전**: 1.0.0  
**작성자**: AI Assistant
