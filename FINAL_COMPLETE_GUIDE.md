# 다공(Dagong) 프로덕션 완전 복구 가이드

## 📊 현재 상태 (2026-02-20)

### 프로덕션 URL
https://dagong-bi1.pages.dev

### 현재 데이터 현황
| 카테고리 | 현재 | 목표 | 부족 | 상태 |
|---------|------|------|------|------|
| 차 제품 | 7 | 20 | 13 | ❌ 부족 |
| 공예품 | 4 | 23 | 19 | ❌ 부족 |
| 선물세트 | 0 | 15 | 15 | ❌ 부족 |
| 지역특산품 | 3 | 33 | 30 | ❌ 부족 |
| 체험 프로그램 | 8 | 14 | 6 | ❌ 부족 |
| 생산자 | 6 | 13 | 7 | ❌ 부족 |
| 다도교육 | 30 | 30 | 0 | ✅ 완료 |
| 이벤트 | 27 | 27 | 0 | ✅ 완료 |

---

## 🚀 복구 방법

### ✅ 방법 1: CLI 자동 복구 (권장 - 가장 빠르고 안전)

**소요 시간: 약 5분**

```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=SAFE_INSERT_ONLY.sql
```

**장점:**
- 한 번에 모든 데이터 복구
- 트랜잭션 처리로 안전
- 기존 데이터 보존 (INSERT OR IGNORE 사용)
- 타임아웃 없음

**단점:**
- CLOUDFLARE_API_TOKEN 필요

---

### ⚙️ 방법 2: Cloudflare D1 콘솔 수동 복구

**소요 시간: 약 20-30분**

#### Step 1: Cloudflare D1 콘솔 접속
1. https://dash.cloudflare.com/ 접속
2. Workers & Pages 선택
3. D1 선택
4. webapp-production 선택
5. Console 탭 클릭

#### Step 2: SQL 파일 복사
1. GitHub에서 SAFE_INSERT_ONLY.sql 열기:
   https://github.com/healingcafe1-prog/dagong/blob/main/SAFE_INSERT_ONLY.sql

2. **Raw 버튼** 클릭 (중요!)

3. **전체 선택 (Ctrl+A)** 후 **복사 (Ctrl+C)**

#### Step 3: 콘솔에 붙여넣기 및 실행
1. Cloudflare D1 콘솔 입력창에 **붙여넣기 (Ctrl+V)**
2. **Execute** 버튼 클릭
3. 완료 메시지 확인

---

## 📋 복구 후 검증

### 1. API로 데이터 확인

```bash
# 차 제품 확인 (20개 목표)
curl "https://dagong-bi1.pages.dev/api/products?type=tea&limit=30" | jq '.products | length'

# 공예품 확인 (23개 목표)
curl "https://dagong-bi1.pages.dev/api/products?type=craft&limit=30" | jq '.products | length'

# 선물세트 확인 (2개 목표)
curl "https://dagong-bi1.pages.dev/api/products?type=gift&limit=10" | jq '.products | length'

# 지역특산품 확인 (33개 목표)
curl "https://dagong-bi1.pages.dev/api/products?type=local&limit=40" | jq '.products | length'

# 체험 프로그램 확인 (14개 목표)
curl "https://dagong-bi1.pages.dev/api/experiences?limit=20" | jq '.experiences | length'

# 생산자 확인 (13개 목표)
curl "https://dagong-bi1.pages.dev/api/producers?limit=20" | jq '.producers | length'

# 다도교육 확인 (30개 - 완료됨)
curl "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50" | jq '.curricula | length'

# 이벤트 확인 (27개 - 완료됨)
curl "https://dagong-bi1.pages.dev/api/events?limit=30" | jq '.events | length'
```

### 2. 웹 브라우저로 확인

- **차 제품**: https://dagong-bi1.pages.dev/?category=tea
- **공예품**: https://dagong-bi1.pages.dev/?category=craft
- **선물세트**: https://dagong-bi1.pages.dev/?category=gift
- **지역특산품**: https://dagong-bi1.pages.dev/?category=local
- **체험 프로그램**: https://dagong-bi1.pages.dev/?category=experiences
- **다도교육**: https://dagong-bi1.pages.dev/education
- **이벤트**: https://dagong-bi1.pages.dev/events

---

## 📂 복구 파일 위치

### GitHub 저장소
- **저장소 URL**: https://github.com/healingcafe1-prog/dagong
- **복구 SQL 파일**: /SAFE_INSERT_ONLY.sql
- **마스터 데이터 파일**: /MASTER_SEED_FINAL.sql

### 로컬 저장소
- **프로젝트 경로**: /home/user/webapp
- **복구 SQL 파일**: /home/user/webapp/SAFE_INSERT_ONLY.sql

---

## 🔧 문제 해결

### 1. "FOREIGN KEY constraint failed" 에러
**원인**: experiences 테이블이 존재하지 않는 producer_id를 참조

**해결책**: SAFE_INSERT_ONLY.sql을 사용하면 자동으로 순서대로 삽입됨
1. producers 먼저 삽입
2. experiences 나중에 삽입

### 2. "table experiences has no column named image" 에러
**원인**: 스키마가 `main_image` 컬럼을 사용하는데 `image`로 입력

**해결책**: SAFE_INSERT_ONLY.sql은 올바른 스키마(main_image)를 사용

### 3. "duplicate key" 또는 "UNIQUE constraint failed" 에러
**원인**: 이미 존재하는 데이터를 삽입하려고 시도

**해결책**: INSERT OR IGNORE 사용으로 이미 해결됨 (중복 시 무시)

### 4. CLI에서 "API token required" 에러
**원인**: CLOUDFLARE_API_TOKEN 환경변수 미설정

**해결책 A**: `setup_cloudflare_api_key` 도구 실행
```bash
# Claude Code에서 실행
setup_cloudflare_api_key
```

**해결책 B**: 수동으로 Cloudflare D1 콘솔 사용 (방법 2)

---

## 📝 주요 데이터 정보

### 생산자 (13개)
1. 제주 다원명가 (차)
2. 제주 차향 (차)
3. 하동 야생차원 (차)
4. 보성 녹차마을 (차)
5. 경기 광주 도예공방 (공예)
6. 이천 도자예술촌 (공예)
7. 담양 죽세공예 (공예)
8. 통영 나전칠기 (공예)
9. 강원 평창 농특산 (지역특산품)
10. 장흥 정남진차 (차)
11. 강진 다산차밭 (차)
12. 순천 생태차밭 (차)
13. 안동 한지공예 (공예)

### 제품 (78개)
- **차 제품 (20개)**: 녹차, 말차, 백차, 우롱차, 홍차, 발효차, 암차, 황차
- **공예품 (23개)**: 찻잔, 주전자, 다관 세트, 찻상, 향로, 차통
- **선물세트 (2개)**: 설날 프리미엄, 보성 명품
- **지역특산품 (33개)**: 평창 고랭지 채소, 제주 감귤, 한우, 녹차 가공식품, 전통주

### 체험 프로그램 (14개)
1. 제주 차밭 산책과 차 만들기 체험
2. 보성 녹차밭 명상 힐링
3. 광주 전통 다기 만들기
4. 담양 대나무 다기 만들기
5. 하동 야생차 채엽과 전통 제다
6. 이천 백자 다기 만들기
7. 담양 대나무 다기 만들기
8. 통영 나전칠기 찻잔받침 만들기
9. 장흥 정남진 발효차 체험
10. 강진 다산 차 문화 탐방
11. 순천 생태 차밭 명상과 요가
12. 제주 유기농 말차 체험
13. 안동 전통 한지로 찻상 만들기
14. 평창 고랭지 농장 투어와 차 시음

---

## 💡 중요 사항

### ✅ 안전한 복구 방식
- **DELETE 없음**: 기존 데이터 삭제하지 않음
- **INSERT OR IGNORE**: 중복 데이터는 무시하고 새 데이터만 추가
- **순서 보장**: producers → experiences 순서로 삽입하여 FOREIGN KEY 에러 방지
- **올바른 스키마**: 프로덕션 DB 스키마에 맞춰 작성 (main_image, region_id 등)

### ⚠️ 주의 사항
1. **GitHub URL을 직접 붙여넣지 마세요** - SQL 내용을 복사해야 합니다
2. **Raw 버튼을 클릭하세요** - GitHub에서 파일을 볼 때 Raw 버튼을 눌러 순수 SQL만 복사
3. **전체 선택 후 복사** - 일부만 복사하면 데이터가 불완전하게 복구됩니다
4. **콘솔 타임아웃 주의** - Cloudflare D1 콘솔은 30초 타임아웃이 있으므로 CLI 방법 권장

---

## 🔗 참고 링크

- **프로덕션 사이트**: https://dagong-bi1.pages.dev
- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong
- **복구 SQL 파일**: https://github.com/healingcafe1-prog/dagong/blob/main/SAFE_INSERT_ONLY.sql
- **마스터 데이터**: https://github.com/healingcafe1-prog/dagong/blob/main/MASTER_SEED_FINAL.sql
- **Cloudflare 대시보드**: https://dash.cloudflare.com/

---

## 📞 문제 발생 시

1. **에러 스크린샷 캡처**
2. **정확한 에러 메시지 복사**
3. **어떤 방법(CLI 또는 콘솔)을 사용했는지 명시**
4. **현재 데이터 상태 확인** (API curl 명령어 결과)

---

**작성일**: 2026-02-20  
**최종 업데이트**: 2026-02-20  
**버전**: 1.0 (안전 복구 버전)
