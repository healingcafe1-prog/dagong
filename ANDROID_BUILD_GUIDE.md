# Android 앱 빌드 및 배포 완벽 가이드

## ✅ 준비 완료된 것들

1. ✅ PWA Manifest: https://dagong-bi1.pages.dev/manifest.json
2. ✅ Service Worker: https://dagong-bi1.pages.dev/sw.js
3. ✅ 앱 아이콘 (8개): https://dagong-bi1.pages.dev/static/icons/
4. ✅ Asset Links: https://dagong-bi1.pages.dev/.well-known/assetlinks.json
5. ✅ TWA Manifest: `/home/user/webapp/android-twa/twa-manifest.json`
6. ✅ Bubblewrap CLI: 설치 완료

---

## 🚀 Android 앱 빌드 방법 (로컬 머신에서)

### 사전 준비:

1. **Node.js** (v18 이상)
2. **Java JDK 17**
3. **Android SDK** (선택사항 - Bubblewrap이 자동 설치 가능)

---

## 📋 빌드 단계

### 1단계: 프로젝트 다운로드

```bash
# GitHub에서 클론 (나중에 push 후)
git clone https://github.com/YOUR_USERNAME/webapp.git
cd webapp/android-twa

# 또는 파일 직접 다운로드
# twa-manifest.json을 포함한 android-twa 폴더
```

### 2단계: Bubblewrap 설치

```bash
npm install -g @bubblewrap/cli
```

### 3단계: APK 빌드

```bash
cd android-twa

# APK 빌드 (디버그)
npx @bubblewrap/cli build

# 또는 AAB 빌드 (Google Play 배포용)
npx @bubblewrap/cli build --bundleMode
```

**빌드 과정에서 질문:**
- "Do you want Bubblewrap to install the JDK?" → **Yes** (권장)
- 키스토어 비밀번호 설정 (안전하게 보관!)

### 4단계: APK 파일 위치

빌드 완료 후:
```
android-twa/
├── app-release-signed.apk    # APK 파일 (디버그/테스트용)
├── app-release-bundle.aab     # AAB 파일 (Play Store 배포용)
└── android.keystore           # 키스토어 (보관 필수!)
```

---

## 🔐 SHA-256 지문 추출

### APK 서명 후 SHA-256 추출:

```bash
# 키스토어에서 SHA-256 추출
keytool -list -v -keystore android-twa/android.keystore -alias android

# 출력 예시:
# SHA256: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99
```

### SHA-256를 assetlinks.json에 추가:

1. SHA-256 지문을 복사 (콜론 제거 또는 유지)
2. Cloudflare Dashboard 또는 소스 코드에서 업데이트:

```json
{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "kr.co.dagong",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
    ]
  }
}
```

3. 사이트 재배포:
```bash
npm run build && npm run deploy
```

4. 확인:
```bash
curl https://dagong-bi1.pages.dev/.well-known/assetlinks.json
```

---

## 📱 Google Play Console 업로드

### 1. 개발자 계정 생성 ($25)

- https://play.google.com/console
- "Create app" 클릭
- 앱 이름: **다공(茶工)**
- 언어: **한국어**
- 유형: **무료**

### 2. 스토어 페이지 설정

**필수 정보:**
- **앱 이름**: 다공(茶工) - 차 생산자 직거래 플랫폼
- **짧은 설명** (80자):
  ```
  한국 전통 차와 공예품을 생산자에게 직접 구매하세요
  ```
- **전체 설명** (4000자):
  ```
  다공(茶工)은 한국의 전통 차와 공예품을 생산자에게서 직접 구매할 수 있는 플랫폼입니다.
  
  ✨ 주요 기능:
  • 전국 차 산지의 프리미엄 녹차, 홍차, 발효차
  • 전통 도자기, 다기, 목공예품
  • 생산자 직거래로 합리적인 가격
  • 체험 프로그램 및 교육 신청
  • 지역별, 카테고리별 상품 검색
  
  🍵 차(茶) 카테고리:
  • 녹차, 백차, 청차, 황차, 홍차, 발효차
  • 보성, 하동, 제주, 강진 등 주요 산지
  
  🏺 공(工) 카테고리:
  • 다관, 찻잔, 다기세트
  • 이천, 여주, 강진 등 도자기 명가
  
  📍 생산지 직거래:
  • 생산자 정보 및 연락처
  • 지역별 특산품 탐색
  • 투명한 가격과 품질 보장
  
  🎓 문화 체험:
  • 차 체험 프로그램
  • 다도 교육 신청
  • 공예 체험 워크숍
  ```

**그래픽 자산:**
- **앱 아이콘** (512×512 PNG): `/home/user/webapp/public/static/icons/icon-512x512.png`
- **기능 그래픽** (1024×500 PNG): 제작 필요
- **스크린샷** (최소 2개, 1080×1920 이상):
  - 홈 화면
  - 상품 목록
  - 상품 상세
  - 체험 프로그램
  
### 3. 콘텐츠 등급

- **연령 등급**: 만 3세 이상 (모든 연령)
- **콘텐츠**: 교육, 쇼핑

### 4. 개인정보처리방침

**필수**: 개인정보처리방침 URL 제공

`/privacy` 페이지 생성 필요 또는:
```
https://dagong-bi1.pages.dev/privacy
```

### 5. AAB 업로드

- **프로덕션 트랙** 선택
- `app-release-bundle.aab` 업로드
- 버전 이름: `1.0.0`
- 버전 코드: `1`

### 6. 검토 제출

- 모든 필수 항목 완료 확인
- "검토용 제출" 클릭
- 검토 기간: 1-7일

---

## 🔧 문제 해결

### 1. assetlinks.json 검증 실패

**증상**: 앱이 브라우저로 열림

**해결**:
```bash
# 1. SHA-256 재확인
keytool -list -v -keystore android.keystore -alias android

# 2. assetlinks.json 업데이트
# 3. 사이트 재배포
# 4. 24시간 대기 (Google 캐시)
```

### 2. APK 빌드 실패

**증상**: Gradle 오류, SDK 오류

**해결**:
```bash
# Java 버전 확인
java -version  # 17 필요

# Bubblewrap 재설치
npm uninstall -g @bubblewrap/cli
npm install -g @bubblewrap/cli

# 캐시 삭제
rm -rf ~/.gradle
rm -rf android-twa/build
```

### 3. 키스토어 분실

**⚠️ 중요**: 키스토어를 잃어버리면 앱을 업데이트할 수 없습니다!

**백업**:
```bash
# 키스토어 백업
cp android-twa/android.keystore ~/safe-backup/dagong-keystore-backup.jks

# 또는 Google Drive / 안전한 장소에 보관
```

---

## 📦 배포 체크리스트

### 웹사이트:
- [x] HTTPS 활성화
- [x] PWA Manifest
- [x] Service Worker
- [x] 512×512 PNG 아이콘
- [x] Asset Links (SHA-256 필요)

### Android 앱:
- [ ] APK/AAB 빌드 완료
- [ ] SHA-256 지문 추출
- [ ] assetlinks.json 업데이트
- [ ] 키스토어 안전 보관
- [ ] 스크린샷 준비 (최소 2개)
- [ ] 개인정보처리방침 페이지 생성

### Google Play:
- [ ] 개발자 계정 생성 ($25)
- [ ] 앱 정보 입력
- [ ] 그래픽 자산 업로드
- [ ] 콘텐츠 등급 완료
- [ ] AAB 업로드
- [ ] 검토 제출

---

## 🔗 유용한 링크

- **Bubblewrap 문서**: https://github.com/GoogleChromeLabs/bubblewrap
- **TWA 가이드**: https://developer.chrome.com/docs/android/trusted-web-activity/
- **Play Console**: https://play.google.com/console
- **Asset Links Tester**: https://developers.google.com/digital-asset-links/tools/generator
- **PWA Builder**: https://www.pwabuilder.com/

---

## 💡 핵심 요약

1. **샌드박스에서는 빌드 불가** - 로컬 머신 필요
2. **모든 파일 준비 완료** - TWA manifest, 아이콘, Asset Links
3. **로컬에서 빌드** - `npx @bubblewrap/cli build`
4. **SHA-256 추출** - `keytool -list`
5. **assetlinks.json 업데이트** - SHA-256 입력 후 재배포
6. **Play Console 업로드** - AAB 파일 + 스크린샷
7. **검토 대기** - 1-7일

---

**다음 위치**: `/home/user/webapp/android-twa/`
**TWA Manifest**: `/home/user/webapp/android-twa/twa-manifest.json`
**아이콘**: `https://dagong-bi1.pages.dev/static/icons/icon-512x512.png`
