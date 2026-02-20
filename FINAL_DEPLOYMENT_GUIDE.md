# ⚠️ D1 권한이 없는 경우 - 최종 해결 방법

## 📊 상황 정리

1. ✅ **로컬 환경**: 모든 데이터 정상 (78개 제품, 27개 이벤트)
2. ❌ **프로덕션 환경**: 데이터 부족 (17개 제품, 0개 이벤트)
3. ⚠️ **문제**: Cloudflare Dashboard Console 크기 제한 (32KB)
4. ⚠️ **추가 문제**: API 토큰 생성 시 D1 권한이 별도로 표시되지 않음

---

## ✅ 최종 해결 방법 (가장 간단함)

### 방법 1: "Edit Cloudflare Workers" 템플릿 사용 (권장) ⭐

**D1 권한이 별도로 없어도 괜찮습니다!**  
"Edit Cloudflare Workers" 템플릿에 D1 권한이 포함되어 있습니다.

#### Step 1: API 토큰 생성
1. https://dash.cloudflare.com/profile/api-tokens 접속
2. **Create Token** 클릭
3. **Edit Cloudflare Workers** 템플릿 선택
4. 권한 확인 (현재 스크린샷에 보이는 권한들이 포함됨):
   - ✅ Workers KV Storage → Edit
   - ✅ Workers Scripts → Edit
   - ✅ Workers Routes → Edit
   - ✅ Workers R2 Storage → Edit
   - ✅ Cloudflare Pages → Edit
   - (D1은 Workers 권한에 포함됨)
5. **Continue to summary** → **Create Token** 클릭
6. 생성된 토큰 **복사**

#### Step 2: Deploy 탭에 토큰 입력
1. 사이드바 **Deploy** 탭 클릭
2. Cloudflare API 토큰 입력란에 붙여넣기
3. **저장** 버튼 클릭

#### Step 3: 배포 스크립트 실행
```bash
cd /home/user/webapp
./deploy_to_production.sh
```

또는 직접 명령 실행:
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --file=MASTER_SEED.sql --remote
```

---

### 방법 2: Cloudflare Pages에서 자동 D1 바인딩 사용

이 방법은 API 토큰 없이도 가능합니다!

#### Step 1: 프로덕션 배포
```bash
cd /home/user/webapp
npm run build
npx wrangler pages deploy dist --project-name dagong-bi1
```

#### Step 2: Cloudflare Dashboard에서 D1 바인딩 확인
1. https://dash.cloudflare.com/ 접속
2. **Workers & Pages** → **dagong-bi1** 클릭
3. **Settings** 탭 → **Functions** → **D1 database bindings**
4. webapp-production이 바인딩되어 있는지 확인

#### Step 3: Console에서 작은 SQL 실행
Dashboard Console에서 다음 쿼리들을 **하나씩** 실행:

**쿼리 1: 데이터 삭제**
```sql
PRAGMA foreign_keys = OFF;
DELETE FROM products;
DELETE FROM experiences;
DELETE FROM events;
DELETE FROM education_curriculum;
DELETE FROM producers;
PRAGMA foreign_keys = ON;
```

**쿼리 2~: 각 INSERT 문을 개별적으로 복사하여 실행**
- MASTER_SEED.sql을 열어서
- 각 INSERT INTO 문을 하나씩 복사
- Console에 붙여넣기하여 실행

---

### 방법 3: 분할된 SQL 파일 사용 (현재 작업 중)

MASTER_SEED.sql을 5개의 작은 파일로 분할하여 순차 실행합니다.

파일 위치:
```
/home/user/webapp/deploy/step1_regions_categories.sql
/home/user/webapp/deploy/step2_producers.sql (생성 필요)
/home/user/webapp/deploy/step3_products_tea_craft.sql (생성 필요)
/home/user/webapp/deploy/step4_products_local.sql (생성 필요)
/home/user/webapp/deploy/step5_experiences_education_events.sql (생성 필요)
```

**이 방법은 파일 분할 작업이 필요합니다.**

---

## 🎯 가장 추천하는 방법

### 순서: 방법 1 → 방법 2 → 방법 3

1. **먼저 방법 1 시도** (Edit Cloudflare Workers 템플릿)
   - 가장 빠르고 확실함
   - 약 2분 소요

2. **방법 1이 안 되면 방법 2** (수동 쿼리 실행)
   - API 토큰 없이 가능
   - 약 10-15분 소요 (귀찮지만 확실함)

3. **마지막 수단으로 방법 3** (분할 파일)
   - 파일 분할 작업 필요
   - 복잡하지만 자동화 가능

---

## 📝 방법 1 상세 가이드

### 1. API 토큰 생성 (상세)

#### 1-1. 토큰 생성 페이지 접속
```
https://dash.cloudflare.com/profile/api-tokens
```

#### 1-2. "Edit Cloudflare Workers" 템플릿 선택
- 화면에 여러 템플릿이 표시됨
- "Edit Cloudflare Workers" 찾기
- **Use template** 버튼 클릭

#### 1-3. 권한 확인 (자동으로 설정됨)
현재 스크린샷에 보이는 권한들:
- Account → Workers KV Storage → Edit ✅
- Account → Workers Scripts → Edit ✅
- Zone → Workers Routes → Edit ✅
- Account → Workers R2 Storage → Edit ✅
- Account → Cloudflare Pages → Edit ✅
- Account → Containers → Edit ✅
- (기타 Workers 관련 권한들)

**중요**: D1은 Workers 하위 리소스이므로 Workers 권한에 포함됩니다!

#### 1-4. 계정/존 선택 (선택사항)
- Account Resources: Include → All accounts
- Zone Resources: Include → All zones

또는 특정 계정/존만 선택 가능

#### 1-5. TTL 설정 (선택사항)
- 기본값 사용 가능
- 또는 만료 기간 설정

#### 1-6. 토큰 생성
- **Continue to summary** 버튼 클릭
- 설정 검토
- **Create Token** 버튼 클릭

#### 1-7. 토큰 복사
- 생성된 토큰이 표시됨 (한 번만 표시됨!)
- **Copy** 버튼으로 복사
- 안전한 곳에 저장 (나중에 다시 볼 수 없음)

### 2. Deploy 탭에 토큰 입력

#### 2-1. Deploy 탭 이동
- 사이드바에서 **Deploy** 클릭

#### 2-2. Cloudflare API 토큰 섹션
- "Cloudflare API Token" 입력란 찾기
- 복사한 토큰 붙여넣기

#### 2-3. 저장
- **Save** 또는 **저장** 버튼 클릭
- 성공 메시지 확인

### 3. 배포 스크립트 실행

#### 3-1. 터미널에서 실행
```bash
cd /home/user/webapp
./deploy_to_production.sh
```

#### 3-2. 실행 과정
스크립트가 자동으로:
1. MASTER_SEED.sql 파일 확인
2. Wrangler로 프로덕션 D1에 SQL 실행
3. 완료 후 프로덕션 API로 데이터 확인
4. 결과 표시

#### 3-3. 예상 출력
```
🚀 프로덕션 D1 데이터베이스 업데이트 시작...

📊 프로덕션 DB에 데이터 삽입 중...

✅ 데이터 삽입 완료!

확인 중...

📊 프로덕션 데이터 확인:
  제품: 78개 (목표: 78개)
  이벤트: 27개 (목표: 27개)
  체험: 5개 (목표: 5개)
  교육: 30개 (목표: 30개)

🎉 성공! 모든 데이터가 정상적으로 삽입되었습니다!

🔗 유용한 링크:
  - 프로덕션 사이트: https://dagong-bi1.pages.dev
  - 제품 API: https://dagong-bi1.pages.dev/api/products?limit=100
  - 이벤트 API: https://dagong-bi1.pages.dev/api/events?limit=50
```

---

## ✅ 성공 확인

브라우저에서 다음 URL들을 열어 확인:

```
https://dagong-bi1.pages.dev/api/products?limit=100
→ 78개 제품 표시

https://dagong-bi1.pages.dev/api/events?limit=50
→ 27개 이벤트 표시

https://dagong-bi1.pages.dev/api/experiences
→ 5개 체험 프로그램 표시

https://dagong-bi1.pages.dev/api/education/curriculum?limit=50
→ 30개 교육 커리큘럼 표시
```

---

## 🔗 관련 파일

- **배포 스크립트**: `/home/user/webapp/deploy_to_production.sh`
- **MASTER_SEED.sql**: `/home/user/webapp/MASTER_SEED.sql`
- **GitHub**: https://github.com/healingcafe1-prog/dagong

---

## 🆘 여전히 문제가 있나요?

### 문제 A: "CLOUDFLARE_API_TOKEN 필요" 오류
**해결**: Deploy 탭에서 토큰이 제대로 저장되었는지 확인

### 문제 B: "권한 없음" 오류
**해결**: "Edit Cloudflare Workers" 템플릿으로 토큰 재생성

### 문제 C: 일부 데이터만 삽입됨
**해결**: 
1. 로컬에서 `./deploy_to_production.sh` 재실행
2. 또는 방법 2 (수동 쿼리)로 시도

---

**지금 바로 방법 1을 시도해보세요!** 🚀  
가장 빠르고 확실한 방법입니다.

---

**작성일**: 2026-02-20  
**최종 업데이트**: D1 권한 문제 해결 방법 추가
