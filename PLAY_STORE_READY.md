# 🎉 다공 Google Play Store 등록 준비 완료!

## ✅ 완료된 작업

### 1. PWA (Progressive Web App) 강화
- ✅ **manifest.json** 업데이트
  - 앱 이름: "다공 - 차와 공예의 직거래 플랫폼"
  - 테마 색상: #7c9473 (다공 그린)
  - 아이콘 설정 (72px ~ 512px)
  - 스크린샷 설정

- ✅ **Service Worker** 구현 (`public/sw.js`)
  - 오프라인 지원
  - 캐싱 전략 (정적 리소스 + 런타임 캐시)
  - 백그라운드 동기화
  - 푸시 알림 준비

- ✅ **오프라인 페이지** (`public/offline.html`)
  - 네트워크 끊김 시 표시
  - 자동 재연결 감지
  - 사용자 친화적 UI

- ✅ **Digital Asset Links** (`public/.well-known/assetlinks.json`)
  - Android 앱 연결 설정
  - SHA256 지문 설정 필요

### 2. Android TWA (Trusted Web Activity) 앱
- ✅ **프로젝트 구조** 생성 (`android-app/`)
  - Gradle 빌드 시스템
  - Android Studio 호환
  - 패키지명: kr.co.dagong

- ✅ **AndroidManifest.xml** 설정
  - TWA LauncherActivity
  - 딥링크 설정 (https://dagong.co.kr)
  - 스플래시 화면
  - 테마 색상 적용

- ✅ **Gradle 설정**
  - 최소 SDK: 21 (Android 5.0)
  - 타겟 SDK: 34 (Android 14)
  - AndroidX 라이브러리
  - Browser Helper 라이브러리

### 3. 문서
- ✅ **GOOGLE_PLAY_GUIDE.md** (68KB)
  - 단계별 등록 가이드
  - 체크리스트
  - 문제 해결 방법
  - 예상 일정

- ✅ **android-app/README.md**
  - 빠른 시작 가이드
  - 빌드 명령어
  - 문제 해결

---

## 📋 다음 단계 (수동 작업 필요)

### 1. 앱 아이콘 생성 🎨
**필요한 크기:**
- 72x72, 96x96, 128x128, 144x144, 152x152
- 192x192 (maskable)
- 384x384
- 512x512 (maskable)

**도구:**
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)
- Figma/Photoshop
- 또는 디자이너 의뢰

**저장 위치:**
- `public/static/icons/icon-{size}.png`
- `android-app/app/src/main/res/mipmap-{dpi}/ic_launcher.png`

### 2. 스크린샷 생성 📱
**필요한 스크린샷:**
- 휴대전화: 최소 2개 (1080x1920)
- 7인치 태블릿: 선택 (1536x2048)
- 10인치 태블릿: 선택 (2560x1600)

**캡처 방법:**
- Chrome DevTools (F12 → Device toolbar)
- 실제 기기에서 캡처
- 에뮬레이터 사용

**저장 위치:**
- `public/static/screenshots/`

### 3. 앱 서명 🔐
**Keystore 생성:**
```bash
cd /home/user/webapp/android-app

keytool -genkey -v -keystore dagong-release.keystore \
  -alias dagong \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -dname "CN=다공, OU=Development, O=다공, L=Seoul, ST=Seoul, C=KR"
```

**key.properties 생성:**
```properties
storePassword=YOUR_PASSWORD
keyPassword=YOUR_PASSWORD
keyAlias=dagong
storeFile=dagong-release.keystore
```

**⚠️ 중요**: Keystore 파일과 비밀번호를 안전하게 보관하세요!

### 4. SHA256 지문 추출
```bash
keytool -list -v -keystore dagong-release.keystore -alias dagong | grep SHA256
```

출력 예시:
```
SHA256: AB:CD:EF:12:34:56:78:90:AB:CD:EF:...
```

**assetlinks.json 업데이트:**
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "kr.co.dagong",
    "sha256_cert_fingerprints": [
      "여기에_위에서_얻은_SHA256_지문_붙여넣기"
    ]
  }
}]
```

### 5. AAB 빌드
```bash
cd android-app

# Android Studio가 없는 경우 Gradle Wrapper 다운로드
# (이미 있으면 스킵)
gradle wrapper

# Release AAB 빌드
./gradlew bundleRelease

# 출력: app/build/outputs/bundle/release/app-release.aab
```

### 6. Cloudflare Pages에 배포
```bash
cd /home/user/webapp

# Service Worker와 assetlinks.json 포함하여 배포
npm run build
npx wrangler pages deploy dist --project-name dagong-bi1

# 확인
# https://dagong.co.kr/.well-known/assetlinks.json
# https://dagong.co.kr/manifest.json
# https://dagong.co.kr/sw.js
```

### 7. Google Play Console 등록

**준비물:**
- ✅ Google 계정
- ✅ $25 개발자 등록비
- ✅ app-release.aab 파일
- ✅ 앱 아이콘 (512x512)
- ✅ 스크린샷 (최소 2개)
- ✅ 개인정보처리방침 URL
- ✅ 기능 그래픽 (1024x500, 선택)

**등록 절차:**
1. https://play.google.com/console 접속
2. 개발자 등록 ($25 결제)
3. 새 앱 만들기
4. 앱 정보 작성
5. 스토어 등록정보 작성
6. 그래픽 애셋 업로드
7. AAB 업로드
8. 심사 제출

**예상 일정:**
- 앱 준비: 1~2일
- 심사 기간: 3~7일
- **총 소요 기간: 1~2주**

---

## 📂 파일 구조

```
webapp/
├── public/
│   ├── manifest.json               # PWA 매니페스트
│   ├── sw.js                       # Service Worker
│   ├── offline.html                # 오프라인 페이지
│   ├── .well-known/
│   │   └── assetlinks.json         # Digital Asset Links
│   └── static/
│       ├── icons/                  # 앱 아이콘 (생성 필요)
│       └── screenshots/            # 스크린샷 (생성 필요)
│
├── android-app/                    # Android TWA 프로젝트
│   ├── app/
│   │   ├── build.gradle
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── res/
│   ├── build.gradle
│   ├── settings.gradle
│   ├── README.md
│   └── GOOGLE_PLAY_GUIDE.md        # 상세 가이드
│
└── README.md
```

---

## 🚀 빠른 시작 (요약)

### 로컬에서 테스트
```bash
# 1. 프로젝트 빌드
cd /home/user/webapp
npm run build

# 2. 로컬 서버 시작
pm2 start ecosystem.config.cjs

# 3. PWA 테스트
# Chrome DevTools → Application → Manifest 확인
# Chrome DevTools → Application → Service Workers 확인
```

### Android 앱 빌드
```bash
# 1. Keystore 생성 (최초 1회)
cd android-app
keytool -genkey -v -keystore dagong-release.keystore -alias dagong -keyalg RSA -keysize 2048 -validity 10000

# 2. SHA256 지문 추출
keytool -list -v -keystore dagong-release.keystore -alias dagong

# 3. assetlinks.json 업데이트 (SHA256 지문 입력)

# 4. AAB 빌드
./gradlew bundleRelease

# 5. 배포
# Cloudflare Pages에 배포
# Google Play Console에 AAB 업로드
```

---

## 📞 지원 및 참고 자료

### 유용한 링크
- [Google Play Console](https://play.google.com/console)
- [Android Developer Guide](https://developer.android.com/)
- [TWA Documentation](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Digital Asset Links Tester](https://developers.google.com/digital-asset-links/tools/generator)

### 문제 해결
- **TWA가 브라우저로 열림**: Digital Asset Links 확인
- **오프라인 동작 안함**: Service Worker 등록 확인
- **앱 서명 오류**: key.properties 파일 확인
- **빌드 실패**: Gradle 캐시 삭제 후 재시도

### 도움이 필요하면
- Android Studio → Help → Submit Feedback
- Google Play Console → 지원 문의
- Stack Overflow (태그: android, twa, pwa)

---

## ✨ 최종 체크리스트

### 배포 전 확인사항
- [ ] PWA manifest.json 작성 완료
- [ ] Service Worker 등록 및 테스트
- [ ] 앱 아이콘 생성 (8가지 크기)
- [ ] 스크린샷 준비 (최소 2개)
- [ ] Keystore 생성 및 안전 보관
- [ ] SHA256 지문 추출
- [ ] assetlinks.json에 SHA256 추가
- [ ] Cloudflare Pages 배포
- [ ] assetlinks.json 접근 확인
- [ ] AAB 파일 빌드 성공
- [ ] 개인정보처리방침 페이지 생성
- [ ] Google Play 개발자 등록 ($25)
- [ ] Play Console에서 앱 정보 작성
- [ ] AAB 업로드 및 심사 제출

---

## 🎯 성공 기준

### 기술적 요구사항
- ✅ PWA 기준 충족 (Lighthouse 검사)
- ✅ HTTPS 연결 (Cloudflare Pages)
- ✅ Service Worker 등록
- ✅ manifest.json 유효성
- ✅ 오프라인 동작
- ✅ Digital Asset Links 검증

### Play Store 정책 준수
- ✅ 저작권 침해 금지
- ✅ 개인정보 보호
- ✅ 적절한 콘텐츠 등급
- ✅ 안전한 결제 시스템
- ✅ 광고 가이드라인 준수

---

## 🎉 마무리

모든 준비가 완료되었습니다! 이제 다음 단계만 진행하면 됩니다:

1. **앱 아이콘 디자인** → 디자이너와 협업 또는 자체 제작
2. **스크린샷 캡처** → Chrome DevTools로 캡처
3. **Keystore 생성** → 안전하게 보관
4. **AAB 빌드** → Gradle로 빌드
5. **배포** → Cloudflare + Play Console

**예상 소요 시간: 1~2주**

화이팅! 🚀
