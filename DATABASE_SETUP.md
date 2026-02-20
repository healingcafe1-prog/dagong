# 데이터베이스 시드 데이터 설정 완료 ✅

## 📊 현재 데이터 상태

로컬 개발 환경에서 **샘플 데이터가 성공적으로 삽입**되었습니다:

### 삽입된 데이터

- ✅ **3개 생산자** (producers)
- ✅ **10개 제품** (products) - 차 5개, 공예품 3개, 선물세트 2개
- ✅ **5개 체험 프로그램** (experiences)
- ✅ **14개 교육 커리큘럼** (education_curriculum) - 기존 16개 + 추가 14개 = 총 30개
- ✅ **27개 이벤트** (events) - 기존 마이그레이션에서 제공
- ✅ **17개 지역** (regions) - 기존 마이그레이션에서 제공
- ✅ **27개 카테고리** (categories) - 기존 마이그레이션에서 제공

## 🔄 프로덕션 데이터베이스 업데이트 방법

로컬에서 테스트가 완료되었으므로, **프로덕션 데이터베이스**에도 같은 데이터를 삽입해야 합니다.

### Cloudflare Dashboard에서 실행 (추천)

1. **Cloudflare Dashboard** 로그인
2. **Workers & Pages** → **D1** → **webapp-production** 선택
3. **Console** 탭으로 이동
4. 아래 파일의 내용을 복사해서 실행:

```bash
# GitHub에서 파일 다운로드
curl -O https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/seed_simple.sql

# 또는 로컬 파일 사용
# 파일 위치: /home/user/webapp/seed_simple.sql
```

5. 파일 내용을 복사해서 D1 Console에 붙여넣고 **Execute** 클릭

### Wrangler CLI로 실행 (로컬에서 가능한 경우)

Cloudflare API 토큰이 설정되어 있다면:

```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=seed_simple.sql
```

## 🧪 API 테스트

로컬 서버에서 데이터 확인:

```bash
# 제품 목록 (10개)
curl http://localhost:3000/api/products?limit=50

# 체험 프로그램 (5개)
curl http://localhost:3000/api/experiences

# 교육 커리큘럼 (30개)
curl http://localhost:3000/api/education/curriculum

# 이벤트 (27개)
curl http://localhost:3000/api/events
```

프로덕션 서버에서 확인:

```bash
# 제품 목록
curl https://dagong-bi1.pages.dev/api/products

# 체험 프로그램
curl https://dagong-bi1.pages.dev/api/experiences

# 교육 커리큘럼
curl https://dagong-bi1.pages.dev/api/education/curriculum
```

## 📝 참고사항

1. **로컬 개발 환경**에는 이미 데이터가 삽입되어 있습니다
2. **프로덕션 환경**에는 수동으로 seed_simple.sql을 실행해야 합니다
3. 파일 위치: `/home/user/webapp/seed_simple.sql` 또는 GitHub에서 다운로드
4. GitHub 저장소: https://github.com/healingcafe1-prog/dagong

## 🚀 다음 단계

1. Cloudflare Dashboard에서 프로덕션 D1 데이터베이스에 seed_simple.sql 실행
2. 프로덕션 API 엔드포인트에서 데이터 확인
3. 프론트엔드에서 실제 데이터가 표시되는지 테스트

---

**작업 완료 시간**: 2026-02-20 04:27
**Git Commit**: ca29371
