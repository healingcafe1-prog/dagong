# 배포 가이드 - 한국 차 공예

## 목차
1. [Cloudflare Pages 배포](#cloudflare-pages-배포)
2. [구글 플레이 스토어 (TWA)](#구글-플레이-스토어-twa)
3. [PWA 설치](#pwa-설치)
4. [환경 변수 설정](#환경-변수-설정)

---

## Cloudflare Pages 배포

### 사전 준비
1. Cloudflare 계정 생성
2. Cloudflare API 토큰 발급
3. GitHub 저장소 준비

### 1단계: Cloudflare API 키 설정
```bash
# Sandbox 환경에서
# setup_cloudflare_api_key 도구 실행하여 인증 설정
```

### 2단계: D1 데이터베이스 생성
```bash
# 프로덕션 데이터베이스 생성
npx wrangler d1 create korean-tea-craft-production

# 출력된 database_id를 wrangler.jsonc에 복사
```

### 3단계: wrangler.jsonc 설정
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "korean-tea-craft",
  "compatibility_date": "2024-01-01",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "korean-tea-craft-production",
      "database_id": "여기에-데이터베이스-ID-입력"
    }
  ]
}
```

### 4단계: 마이그레이션 실행
```bash
# 프로덕션 데이터베이스에 마이그레이션 적용
npx wrangler d1 migrations apply korean-tea-craft-production
```

### 5단계: 빌드 및 배포
```bash
# 프로젝트 빌드
npm run build

# Cloudflare Pages 프로젝트 생성
npx wrangler pages project create korean-tea-craft \
  --production-branch main \
  --compatibility-date 2024-01-01

# 배포
npx wrangler pages deploy dist --project-name korean-tea-craft
```

### 6단계: 환경 변수 설정 (선택사항)
```bash
# OAuth 설정 (소셜 로그인 사용 시)
npx wrangler pages secret put GOOGLE_CLIENT_ID --project-name korean-tea-craft
npx wrangler pages secret put GOOGLE_CLIENT_SECRET --project-name korean-tea-craft
npx wrangler pages secret put NAVER_CLIENT_ID --project-name korean-tea-craft
npx wrangler pages secret put NAVER_CLIENT_SECRET --project-name korean-tea-craft
npx wrangler pages secret put KAKAO_CLIENT_ID --project-name korean-tea-craft
npx wrangler pages secret put KAKAO_CLIENT_SECRET --project-name korean-tea-craft
npx wrangler pages secret put SESSION_SECRET --project-name korean-tea-craft
```

### 배포 URL
- 프로덕션: `https://korean-tea-craft.pages.dev`
- 브랜치 배포: `https://main.korean-tea-craft.pages.dev`

---

## 구글 플레이 스토어 (TWA)

### Trusted Web Activity 앱 생성

### 1단계: Android Studio 설치
1. [Android Studio](https://developer.android.com/studio) 다운로드 및 설치

### 2단계: Bubblewrap 사용 (추천)
```bash
# Bubblewrap CLI 설치
npm install -g @bubblewrap/cli

# TWA 프로젝트 초기화
bubblewrap init --manifest https://korean-tea-craft.pages.dev/manifest.json

# 프롬프트에 따라 입력:
# - Package name: com.koreantea.craft
# - App name: 한국 차 공예
# - Display mode: standalone
# - Status bar color: #7c9473

# Android 프로젝트 빌드
bubblewrap build

# APK 생성됨: ./app-release-signed.apk
```

### 3단계: Digital Asset Links 설정
Cloudflare Pages에 `.well-known/assetlinks.json` 파일 추가:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.koreantea.craft",
    "sha256_cert_fingerprints": ["여기에_SHA256_지문_입력"]
  }
}]
```

### 4단계: 구글 플레이 콘솔에서 앱 등록
1. [Google Play Console](https://play.google.com/console) 로그인
2. "앱 만들기" 클릭
3. APK 업로드
4. 스토어 등록정보 작성:
   - 앱 이름: 한국 차 공예
   - 간단한 설명: 한국 전통 차와 공예품 직거래 플랫폼
   - 자세한 설명: README.md의 프로젝트 설명 참고
   - 카테고리: 쇼핑
   - 스크린샷: `public/static/screenshots/` 사용

### 5단계: 앱 검토 제출
- 테스트 트랙에 먼저 배포
- 검토 완료 후 프로덕션으로 승격

---

## PWA 설치

### 데스크톱 (Chrome, Edge)
1. 웹사이트 방문
2. 주소창 오른쪽의 "설치" 버튼 클릭
3. "설치" 확인

### 모바일 (Android, iOS)
**Android (Chrome):**
1. 웹사이트 방문
2. 메뉴 (⋮) → "홈 화면에 추가"
3. "추가" 확인

**iOS (Safari):**
1. 웹사이트 방문
2. 공유 버튼 (↑) 클릭
3. "홈 화면에 추가" 선택
4. "추가" 확인

---

## 환경 변수 설정

### 로컬 개발 (.dev.vars)
```bash
# .dev.vars 파일 생성
cat > .dev.vars << 'EOF'
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Naver OAuth
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret

# Kakao OAuth
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret

# Session
SESSION_SECRET=your_random_secret_key
EOF
```

### 프로덕션 (Wrangler Secrets)
```bash
# 각 환경 변수 설정
npx wrangler pages secret put VARIABLE_NAME --project-name korean-tea-craft
```

---

## 문제 해결

### 빌드 오류
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 정리
rm -rf .wrangler dist
npm run build
```

### 데이터베이스 오류
```bash
# 로컬 D1 데이터베이스 리셋
npm run db:reset

# 프로덕션 마이그레이션 재실행
npx wrangler d1 migrations apply korean-tea-craft-production
```

### PWA 설치 버튼이 보이지 않음
- HTTPS 필수 (localhost는 예외)
- manifest.json 확인
- Service Worker 등록 확인
- 개발자 도구 → Application → Manifest 탭 확인

---

## 유용한 링크
- [Cloudflare Pages 문서](https://developers.cloudflare.com/pages/)
- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)
- [PWA 가이드](https://web.dev/progressive-web-apps/)
- [TWA 가이드](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)

---

## 지원
문제가 발생하면 GitHub Issues에 등록해주세요.
