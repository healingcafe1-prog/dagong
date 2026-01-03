# 배포 가이드 (Deployment Guide)

## 📱 1. 웹사이트 배포 (Cloudflare Pages)

### 준비 사항
1. **Cloudflare 계정** 필요
2. **Cloudflare API Token** 필요
3. **GitHub 저장소** 연결 필요

### Cloudflare Pages 배포 단계

#### 1단계: Cloudflare API 키 설정
```bash
# Deploy 탭에서 Cloudflare API 토큰 생성
# 권한: Account - Cloudflare Pages:Edit
```

#### 2단계: 프로젝트 빌드
```bash
cd /home/user/webapp
npm run build
```

#### 3단계: Cloudflare Pages 프로젝트 생성
```bash
# wrangler를 사용한 프로젝트 생성
npx wrangler pages project create chagongye-platform --production-branch main

# 환경 변수 설정
npx wrangler pages secret put GOOGLE_CLIENT_ID --project-name chagongye-platform
npx wrangler pages secret put GOOGLE_CLIENT_SECRET --project-name chagongye-platform
npx wrangler pages secret put NAVER_CLIENT_ID --project-name chagongye-platform
npx wrangler pages secret put NAVER_CLIENT_SECRET --project-name chagongye-platform
npx wrangler pages secret put KAKAO_CLIENT_ID --project-name chagongye-platform
npx wrangler pages secret put KAKAO_CLIENT_SECRET --project-name chagongye-platform
```

#### 4단계: 배포
```bash
# dist 폴더 배포
npx wrangler pages deploy dist --project-name chagongye-platform
```

#### 5단계: 커스텀 도메인 설정 (선택)
```bash
npx wrangler pages domain add yourdomain.com --project-name chagongye-platform
```

### 배포 URL
- **개발/미리보기**: `https://[branch].[project].pages.dev`
- **프로덕션**: `https://[project].pages.dev`
- **커스텀 도메인**: `https://yourdomain.com`

---

## 🤖 2. Android 앱 준비 (TWA - Trusted Web Activity)

### TWA(Trusted Web Activity)란?
- 웹사이트를 네이티브 앱처럼 실행하는 Android 기술
- 별도의 앱 개발 없이 웹사이트를 앱으로 변환
- Google Play에 등록 가능

### Android 앱 생성 단계

#### 1단계: PWA 준비 (이미 완료)
- ✅ manifest.json 생성 완료
- ✅ Service Worker (sw.js) 생성 완료
- ✅ 아이콘 준비 필요

#### 2단계: 앱 아이콘 생성
다음 크기의 아이콘을 `/public/static/icons/` 폴더에 추가:

**필수 아이콘 크기:**
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png` (중요!)
- `icon-384x384.png`
- `icon-512x512.png` (중요!)

**아이콘 디자인 가이드:**
- 배경색: #f5f1e8 (tea-cream)
- 주요색: #7c9473 (tea-green)
- 심볼: 차잎 아이콘 또는 "한국 차 공예" 텍스트
- 투명 배경 또는 단색 배경

**아이콘 생성 도구:**
- https://www.pwabuilder.com/imageGenerator
- https://realfavicongenerator.net/
- Figma, Adobe Illustrator 등

#### 3단계: Android Studio로 TWA 프로젝트 생성

**방법 1: Bubblewrap 사용 (추천)**
```bash
# Bubblewrap 설치
npm install -g @bubblewrap/cli

# TWA 프로젝트 초기화
bubblewrap init --manifest https://your-domain.pages.dev/manifest.json

# 앱 빌드
bubblewrap build

# APK 생성 위치: ./app-release-signed.apk
```

**방법 2: Android Studio 직접 사용**
1. Android Studio 다운로드 및 설치
2. New Project → Empty Activity
3. TWA 라이브러리 추가 (build.gradle):
```gradle
dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
}
```

4. AndroidManifest.xml 설정:
```xml
<activity
    android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
    android:label="@string/app_name"
    android:exported="true">
    <meta-data
        android:name="android.support.customtabs.trusted.DEFAULT_URL"
        android:value="https://your-domain.pages.dev" />
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

#### 4단계: Digital Asset Links 설정
웹사이트와 앱 연결을 위한 파일 생성: `.well-known/assetlinks.json`

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.chagongye.app",
    "sha256_cert_fingerprints": [
      "YOUR_APP_SHA256_FINGERPRINT"
    ]
  }
}]
```

SHA256 지문 얻기:
```bash
keytool -list -v -keystore your-keystore.jks
```

#### 5단계: 앱 서명 및 빌드
```bash
# Release 빌드 생성
./gradlew bundleRelease

# AAB 파일 위치: app/build/outputs/bundle/release/app-release.aab
```

#### 6단계: Google Play Console 등록

**사전 준비:**
1. Google Play Console 개발자 계정 (등록비: $25)
2. 앱 서명 키 (Keystore 파일)
3. 개인정보처리방침 URL
4. 앱 스크린샷 (스마트폰, 태블릿)

**등록 단계:**
1. [Google Play Console](https://play.google.com/console) 접속
2. "앱 만들기" 클릭
3. 앱 정보 입력:
   - 앱 이름: 한국 차 공예
   - 기본 언어: 한국어
   - 앱 유형: 앱
   - 무료/유료: 무료

4. 스토어 등록정보 작성:
   - 짧은 설명 (80자)
   - 전체 설명 (4000자)
   - 카테고리: 쇼핑
   - 앱 아이콘: 512x512px
   - 그래픽 이미지: 1024x500px
   - 스크린샷: 최소 2장 (휴대전화, 태블릿)

5. AAB 파일 업로드 (프로덕션 트랙)

6. 콘텐츠 등급 설정

7. 개인정보처리방침 URL 입력

8. 심사 제출

---

## 📸 3. 스크린샷 및 홍보 자료

### 필수 스크린샷
Google Play 등록을 위한 스크린샷:

**휴대전화 (필수):**
- 최소 2장, 최대 8장
- 크기: 320px ~ 3840px (가로/세로)
- 권장: 1080x1920px 또는 1080x2340px
- 내용: 홈 화면, 상품 목록, 상품 상세, 체험 프로그램

**7인치 태블릿 (선택):**
- 최소 1장, 최대 8장
- 크기: 1024x1800px
- 내용: 태블릿 최적화 화면

**10인치 태블릿 (선택):**
- 최소 1장, 최대 8장
- 크기: 1200x1920px

### 홍보 그래픽
**그래픽 이미지 (필수):**
- 크기: 1024x500px
- 형식: PNG 또는 JPEG
- 내용: 앱 주요 기능 시각화

---

## 🌐 4. 다국어 지원 (이미 구현 완료)

### 지원 언어
- ✅ 한국어 (ko)
- ✅ 영어 (en)
- ✅ 중국어 (zh)
- ✅ 일본어 (ja)

### 언어 전환
- 네비게이션 바의 지구본 아이콘 클릭
- localStorage에 언어 설정 저장
- 페이지 새로고침으로 언어 적용

---

## 🔧 5. 유지보수 및 업데이트

### 웹사이트 업데이트
```bash
# 코드 수정 후
npm run build
npx wrangler pages deploy dist --project-name chagongye-platform
```

### Android 앱 업데이트
1. 버전 코드 증가 (build.gradle)
```gradle
android {
    defaultConfig {
        versionCode 2  // 증가
        versionName "1.1"
    }
}
```

2. 재빌드 및 Google Play 업로드
```bash
./gradlew bundleRelease
# Google Play Console에서 새 버전 업로드
```

---

## 📊 6. 성능 최적화 체크리스트

### 웹사이트
- ✅ Service Worker 캐싱
- ✅ 이미지 최적화 (WebP 형식 권장)
- ✅ CDN 사용 (Cloudflare)
- ✅ Gzip/Brotli 압축
- ⏳ 이미지 Lazy Loading
- ⏳ CSS/JS 최소화

### Android 앱
- ✅ TWA 사용으로 네이티브 성능
- ✅ 오프라인 지원 (Service Worker)
- ⏳ 앱 크기 최소화
- ⏳ 시작 화면(Splash) 최적화

---

## 🔐 7. 보안 체크리스트

- ✅ HTTPS 사용 (Cloudflare Pages 기본)
- ✅ OAuth 환경 변수 암호화
- ✅ CORS 설정
- ✅ Content Security Policy
- ⏳ Rate Limiting
- ⏳ SQL Injection 방지

---

## 📞 8. 지원 및 문의

### 기술 지원
- Cloudflare Pages: https://developers.cloudflare.com/pages
- Android TWA: https://developers.google.com/web/android/trusted-web-activity
- Google Play Console: https://support.google.com/googleplay/android-developer

### 문서
- README.md: 프로젝트 개요
- OAUTH_SETUP_GUIDE.md: OAuth 설정 가이드
- DEPLOYMENT_GUIDE.md: 이 문서

---

## ✅ 배포 전 최종 체크리스트

### 웹사이트
- [ ] 모든 페이지 정상 작동 확인
- [ ] 다국어 지원 테스트 (4개 언어)
- [ ] 반응형 디자인 확인 (모바일, 태블릿, 데스크톱)
- [ ] OAuth 로그인 테스트
- [ ] 데이터베이스 마이그레이션 확인
- [ ] 환경 변수 설정 완료
- [ ] 도메인 설정 (선택)

### Android 앱
- [ ] 앱 아이콘 생성 (모든 크기)
- [ ] 스크린샷 준비 (최소 2장)
- [ ] 그래픽 이미지 생성 (1024x500px)
- [ ] Digital Asset Links 설정
- [ ] 앱 서명 키 생성
- [ ] 개인정보처리방침 페이지 생성
- [ ] Google Play Console 계정 준비
- [ ] 앱 설명 작성 (한/영/중/일)

---

## 🎉 배포 완료 후

1. **모니터링 설정**
   - Cloudflare Analytics 확인
   - Google Play Console 통계 확인
   - 사용자 피드백 수집

2. **마케팅**
   - SNS 홍보 (인스타그램, 페이스북, 블로그)
   - 검색엔진 등록 (Google, Naver, Daum)
   - 앱 스토어 최적화 (ASO)

3. **지속적 개선**
   - 사용자 리뷰 응답
   - 버그 수정
   - 기능 추가 및 개선
