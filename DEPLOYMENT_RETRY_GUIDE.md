# 🚀 Cloudflare Pages 재배포 가이드

## 현재 상황

✅ **완료된 작업:**
- D1 데이터베이스 바인딩 추가 완료 (Variable name: `DB`, Database: `webapp-production`)
- 프로젝트 빌드 완료 (`dist/` 디렉토리 준비)

⏳ **다음 단계:**
- Cloudflare Pages 재배포 필요 (D1 바인딩 적용)

---

## 📌 재배포 방법 (2가지)

### 방법 1: Cloudflare Dashboard에서 재배포 ⭐ 추천

**소요 시간:** 약 2-3분

#### 단계별 가이드:

1. **Cloudflare Dashboard 접속**
   - URL: https://dash.cloudflare.com/
   - Cloudflare 계정으로 로그인

2. **프로젝트 선택**
   - 왼쪽 메뉴에서 **Workers & Pages** 클릭
   - 프로젝트 목록에서 **dagong** 선택

3. **Deployments 탭으로 이동**
   - 상단 탭에서 **Deployments** 클릭
   - 최신 배포(가장 위)를 찾기

4. **재배포 시작**
   - 최신 배포 오른쪽의 **⋯** (점 3개) 메뉴 클릭
   - 드롭다운에서 **"Retry deployment"** 선택
   - 확인 팝업이 나타나면 **확인** 클릭

5. **배포 완료 대기**
   - 배포 상태가 "Building" → "Deploying" → "Success"로 변경됨
   - 약 1-2분 소요

6. **확인**
   - 배포 완료 후 사이트 방문: https://dagong-bi1.pages.dev/
   - API 테스트:
     ```bash
     curl https://dagong-bi1.pages.dev/api/products
     ```

---

### 방법 2: CLI로 배포 (API 키 필요)

**소요 시간:** 약 5분 (API 키 설정 포함)

#### 사전 준비:
1. **Deploy 탭**에서 Cloudflare API 키 설정
2. 또는 Cloudflare Dashboard에서 API 토큰 생성

#### 배포 명령어:

```bash
# 1. 프로젝트 디렉토리로 이동
cd /home/user/webapp

# 2. 빌드 (이미 완료됨)
npm run build

# 3. 배포
npm run deploy

# 또는 직접 wrangler 사용
npx wrangler pages deploy dist --project-name dagong-bi1
```

#### 배포 완료 후 확인:
```bash
# API 테스트
curl https://dagong-bi1.pages.dev/api/products

# 사이트 접속 테스트
curl -I https://dagong-bi1.pages.dev/
```

---

## ✅ 배포 확인 체크리스트

재배포 완료 후 다음 항목들을 확인하세요:

- [ ] 사이트 정상 접속: https://dagong-bi1.pages.dev/
- [ ] API 응답 정상: `/api/products`, `/api/producers`, `/api/regions`
- [ ] 상품 목록 표시됨 (D1 데이터베이스 연결 확인)
- [ ] 지역별 상품 필터링 작동
- [ ] 생산자 페이지 정상 표시
- [ ] 체험 프로그램 페이지 정상 표시
- [ ] 교육 프로그램 신청 페이지 정상 표시

---

## 🔍 문제 해결

### 재배포 후에도 오류가 지속되는 경우:

1. **브라우저 캐시 삭제**
   - Ctrl+Shift+R (Windows/Linux)
   - Cmd+Shift+R (Mac)
   - 또는 시크릿/프라이빗 모드로 테스트

2. **D1 바인딩 재확인**
   - Settings → Functions → D1 Database Bindings
   - Variable name: `DB` (대문자 확인)
   - Database: `webapp-production` (철자 확인)

3. **배포 로그 확인**
   - Deployments 탭에서 최신 배포 클릭
   - "View build log" 클릭
   - 오류 메시지 확인

4. **D1 데이터베이스 상태 확인**
   ```bash
   # 데이터베이스 정보 확인
   npx wrangler d1 info webapp-production
   
   # 테이블 목록 확인
   npx wrangler d1 execute webapp-production --command="SELECT name FROM sqlite_master WHERE type='table';"
   ```

5. **마이그레이션 재실행 (프로덕션)**
   ```bash
   # 프로덕션 DB에 마이그레이션 적용
   npx wrangler d1 migrations apply webapp-production
   ```

---

## 📊 현재 프로젝트 정보

### Cloudflare Pages 설정
- **프로젝트 이름**: `dagong` (또는 `dagong-bi1`)
- **Production URL**: https://dagong-bi1.pages.dev/
- **Production Branch**: `main`

### D1 데이터베이스 설정
- **Database Name**: `webapp-production`
- **Database ID**: `ef76dccd-be5f-476b-851c-f9503f18dd53`
- **Binding Name**: `DB`
- **Tables**: 28개 (products, producers, regions, experiences, education 등)

### 환경 변수 (추가된 것)
- `DB` → D1 Database Binding (webapp-production)

---

## 🔗 유용한 링크

- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **프로젝트 페이지**: https://dash.cloudflare.com/ → Workers & Pages → dagong
- **D1 문서**: https://developers.cloudflare.com/d1/
- **Pages 바인딩 문서**: https://developers.cloudflare.com/pages/functions/bindings/
- **D1 마이그레이션 가이드**: https://developers.cloudflare.com/d1/reference/migrations/

---

## 📝 다음 단계 (재배포 후)

1. ✅ **사이트 정상 작동 확인**
2. 🔍 **검색 엔진 등록**
   - Google Search Console 사이트맵 제출
   - Naver Search Advisor 사이트맵 제출
   - Daum 검색 등록
3. 📱 **Android 앱 등록 계속 진행**
   - Bubblewrap으로 APK 빌드
   - SHA-256 지문 추출
   - Google Play Console 업로드

---

## 💡 팁

- **바인딩 변경 시 항상 재배포 필요**: 환경 변수나 바인딩을 변경하면 반드시 재배포해야 적용됨
- **Git Push로는 자동 배포 안 됨**: Cloudflare Pages는 Git 연동이 없으므로 수동 재배포 또는 CLI 배포 필요
- **로컬 테스트**: 프로덕션 배포 전 로컬에서 `npm run dev:d1`로 테스트 권장
- **배포 히스토리**: Deployments 탭에서 이전 버전으로 롤백 가능

---

**생성일**: 2026-02-19
**업데이트**: 빌드 완료, D1 바인딩 추가 완료, 재배포 대기 중
