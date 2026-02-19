# Cloudflare Pages D1 데이터베이스 바인딩 가이드

## 문제 상황
프로덕션 사이트 https://dagong-bi1.pages.dev/ 에서 다음 오류 발생:
```
D1_TYPE_ERROR: Type 'undefined' not supported for value 'undefined'
```

**원인**: Cloudflare Pages 프로젝트에 D1 데이터베이스 바인딩이 설정되지 않음

## 해결 방법

### 방법 1: Cloudflare Dashboard 사용 (추천, 약 5분)

1. **Cloudflare Dashboard 로그인**
   - URL: https://dash.cloudflare.com/
   - 계정으로 로그인

2. **Pages 프로젝트 선택**
   - Workers & Pages 메뉴 클릭
   - `dagong-bi1` 프로젝트 선택

3. **D1 바인딩 추가**
   - Settings 탭 클릭
   - Functions 섹션으로 스크롤
   - "D1 Database Bindings" 찾기
   - **Add binding** 버튼 클릭
   - Variable name: `DB` (반드시 대문자)
   - D1 database: `webapp-production` 선택
   - **Save** 버튼 클릭

4. **재배포**
   - Deployments 탭으로 이동
   - 최신 배포 옆 "⋯" 메뉴 클릭
   - **Retry deployment** 선택
   - 배포 완료 대기 (약 1-2분)

5. **확인**
   ```bash
   curl https://dagong-bi1.pages.dev/api/products
   ```

### 방법 2: CLI 사용 (약 10분)

⚠️ **주의**: 이 방법은 Cloudflare API 키가 필요합니다.

1. **Cloudflare API 키 설정**
   - Deploy 탭에서 API 키 설정
   - 또는 `setup_cloudflare_api_key` 도구 실행

2. **마이그레이션 적용 (프로덕션)**
   ```bash
   cd /home/user/webapp
   npx wrangler d1 migrations apply webapp-production
   ```

3. **재빌드 및 배포**
   ```bash
   npm run build
   npm run deploy
   ```

4. **확인**
   ```bash
   curl https://dagong-bi1.pages.dev/api/products
   ```

## 현재 상태

### ✅ 완료된 것
- D1 데이터베이스 생성 (`webapp-production`)
- `wrangler.jsonc`에 D1 설정 추가
- 로컬 환경에서 D1 정상 작동 확인
- 마이그레이션 파일 생성 (28개)
- 사이트 배포 (HTML, CSS, JS 정상)

### ❌ 문제
- **프로덕션 환경에 D1 바인딩 누락**
- API 요청 시 `env.DB === undefined` → 500 에러

### 📊 데이터베이스 정보
- **Database Name**: `webapp-production`
- **Database ID**: `ef76dccd-be5f-476b-851c-f9503f18dd53`
- **Binding Name**: `DB`
- **Environment**: Production (Cloudflare Pages)

## 참고 자료

- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **D1 문서**: https://developers.cloudflare.com/d1/
- **Pages 바인딩 가이드**: https://developers.cloudflare.com/pages/functions/bindings/
- **D1 바인딩 설정**: https://developers.cloudflare.com/pages/functions/bindings/#d1-databases

## 추가 도움말

### D1 바인딩 확인 방법
```bash
# 로컬 환경 (정상 작동)
npx wrangler pages dev dist --d1=webapp-production --local

# 프로덕션 확인
curl https://dagong-bi1.pages.dev/api/products
```

### 일반적인 오류
1. **Variable name 오타**: 반드시 `DB` (대문자)
2. **Database 선택 오류**: `webapp-production` 선택 필요
3. **재배포 누락**: 바인딩 추가 후 반드시 재배포 필요

### 문제 해결
바인딩 추가 후에도 오류가 지속되면:
1. 브라우저 캐시 삭제
2. 다른 브라우저/시크릿 모드에서 테스트
3. Cloudflare 배포 로그 확인
4. D1 데이터베이스 상태 확인:
   ```bash
   npx wrangler d1 info webapp-production
   ```

## 다음 단계

1. ✅ **즉시**: Dashboard에서 D1 바인딩 추가 (5분)
2. ⏳ **이후**: API 정상 작동 확인
3. 📱 **선택**: Android 앱 등록 계속 진행
