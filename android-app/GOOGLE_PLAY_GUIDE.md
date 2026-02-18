# 다공 앱 Google Play Store 등록 가이드

## 📋 목차
1. [준비사항](#준비사항)
2. [PWA 배포](#pwa-배포)
3. [Digital Asset Links 설정](#digital-asset-links-설정)
4. [Android 앱 빌드](#android-앱-빌드)
5. [서명 키 생성](#서명-키-생성)
6. [APK/AAB 빌드](#apkaab-빌드)
7. [Google Play Console 등록](#google-play-console-등록)
8. [앱 심사 준비](#앱-심사-준비)

---

## 1. 준비사항

### ✅ 필수 항목
- [x] PWA manifest.json 완성
- [x] Service Worker 구현
- [ ] 프로덕션 URL: https://dagong.co.kr
- [ ] Google Play Console 계정 (개발자 등록비 $25)
- [ ] Android Studio 설치 (또는 Gradle)
- [ ] Java JDK 17 이상

### 📱 앱 정보
- **앱 이름**: 다공
- **패키지명**: kr.co.dagong
- **버전**: 1.0.0 (versionCode: 1)
- **최소 API 레벨**: 21 (Android 5.0)
- **대상 API 레벨**: 34 (Android 14)

---

## 2. PWA 배포

### 2.1. manifest.json 확인
파일 위치: `public/manifest.json`

```json
{
  "name": "다공 - 차와 공예의 직거래 플랫폼",
  "short_name": "다공",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#7c9473"
}
```

### 2.2. Service Worker 배포
파일 위치: `public/sw.js`

HTML에 Service Worker 등록 코드 추가:
```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registered', reg))
      .catch(err => console.error('SW registration failed', err));
  }
</script>
```

### 2.3. Cloudflare Pages에 배포
```bash
cd /home/user/webapp
npm run build
npx wrangler pages deploy dist --project-name dagong-bi1
```

---

## 3. Digital Asset Links 설정

TWA가 웹사이트를 신뢰하도록 Digital Asset Links를 설정해야 합니다.

### 3.1. assetlinks.json 생성

파일 위치: `public/.well-known/assetlinks.json`

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "kr.co.dagong",
    "sha256_cert_fingerprints": [
      "여기에_SHA256_지문_입력"
    ]
  }
}]
```

### 3.2. SHA256 지문 얻기

앱 서명 후 다음 명령어로 지문 확인:
```bash
keytool -list -v -keystore dagong-release.keystore -alias dagong
```

### 3.3. 배포 확인

배포 후 다음 URL에서 접근 가능해야 함:
```
https://dagong.co.kr/.well-known/assetlinks.json
```

---

## 4. Android 앱 빌드

### 4.1. Android Studio 설치

1. https://developer.android.com/studio 에서 다운로드
2. 설치 후 SDK 업데이트

### 4.2. 프로젝트 열기

```bash
cd /home/user/webapp/android-app
# Android Studio에서 열기
```

### 4.3. 종속성 다운로드

프로젝트를 열면 자동으로 Gradle이 종속성을 다운로드합니다.

---

## 5. 서명 키 생성

### 5.1. Keystore 생성

```bash
keytool -genkey -v -keystore dagong-release.keystore \
  -alias dagong \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass YOUR_STORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD \
  -dname "CN=다공, OU=Development, O=다공, L=Seoul, ST=Seoul, C=KR"
```

**중요**: 비밀번호와 keystore 파일을 안전하게 보관하세요!

### 5.2. key.properties 생성

파일 위치: `android-app/key.properties`

```properties
storePassword=YOUR_STORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=dagong
storeFile=../dagong-release.keystore
```

### 5.3. build.gradle 수정

`app/build.gradle`에 서명 설정 추가:

```gradle
def keystorePropertiesFile = rootProject.file("key.properties")
def keystoreProperties = new Properties()
keystoreProperties.load(new FileInputStream(keystorePropertiesFile))

android {
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

---

## 6. APK/AAB 빌드

### 6.1. Release AAB 빌드 (권장)

```bash
cd android-app
./gradlew bundleRelease
```

출력 위치: `app/build/outputs/bundle/release/app-release.aab`

### 6.2. Release APK 빌드 (테스트용)

```bash
./gradlew assembleRelease
```

출력 위치: `app/build/outputs/apk/release/app-release.apk`

### 6.3. 서명 확인

```bash
jarsigner -verify -verbose -certs app-release.aab
```

---

## 7. Google Play Console 등록

### 7.1. 개발자 계정 생성

1. https://play.google.com/console 접속
2. Google 계정으로 로그인
3. 개발자 등록비 $25 결제
4. 개발자 프로필 작성

### 7.2. 새 앱 만들기

1. **모든 앱** → **앱 만들기** 클릭
2. 앱 정보 입력:
   - 앱 이름: **다공**
   - 기본 언어: **한국어**
   - 앱 또는 게임: **앱**
   - 무료 또는 유료: **무료**

### 7.3. 앱 콘텐츠 작성

**개인정보처리방침**
- URL 필요: https://dagong.co.kr/privacy-policy

**앱 액세스 권한**
- 로그인 필요 여부 선택

**광고**
- 광고 포함 여부 선택

**콘텐츠 등급**
- 설문지 작성

**타겟 고객 및 콘텐츠**
- 타겟 연령: 13세 이상
- 타겟 고객: 일반 대중

### 7.4. 스토어 설정

**앱 카테고리**
- 카테고리: 쇼핑
- 태그: 차, 공예, 직거래, 한국 전통

**스토어 등록정보**
- 제목 (50자): 다공 - 차와 공예의 직거래 플랫폼
- 간단한 설명 (80자):
  ```
  전통 차와 공예품을 생산자와 직접 거래하는 플랫폼
  ```
- 자세한 설명 (4000자):
  ```
  다공은 한국 전통 차와 공예품을 생산자와 소비자가 직접 거래할 수 있는 플랫폼입니다.

  🍵 주요 기능
  • 전국 17개 지역의 차 생산지 탐색
  • 27개 카테고리의 다양한 전통 공예품
  • 생산자 직거래로 합리적인 가격
  • 월별 이벤트 및 특가 행사
  • 다도 및 명상 교육 프로그램

  🌿 특징
  • 생산지 직송으로 신선한 차
  • 작가와 직접 소통 가능
  • 안전한 결제 시스템
  • 지역별 특산물 발견

  🎯 카테고리
  • 차: 녹차, 홍차, 발효차, 블렌딩차 등
  • 공예: 도자기, 목공예, 한복, 서예 등
  • 선물세트: 명절, 기념일, 기업 선물
  • 교육: 다도교육, 명상교육, 차 공부

  전통의 가치를 지키며 생산자와 소비자를 잇는 다공과 함께하세요!
  ```

### 7.5. 그래픽 애셋

**필수 항목**:
- 앱 아이콘 (512x512 PNG)
- 스크린샷 (최소 2개):
  - 휴대전화: 1080x1920 ~ 1920x1080
  - 7인치 태블릿: 1536x2048 ~ 2048x1536
  - 10인치 태블릿: 2560x1600 ~ 1600x2560

**선택 항목**:
- 기능 그래픽 (1024x500 PNG)
- 프로모션 동영상 (YouTube URL)

### 7.6. 가격 및 배포

- **국가/지역**: 대한민국 (또는 전 세계)
- **가격**: 무료
- **배포 일정**: 앱 승인 후 즉시

### 7.7. AAB 업로드

1. **프로덕션** → **새 버전 만들기**
2. AAB 파일 업로드: `app-release.aab`
3. 버전 정보 입력:
   - 버전 이름: 1.0.0
   - 최근 변경사항:
     ```
     • 다공 앱 첫 출시
     • 차와 공예품 직거래 플랫폼
     • 생산자 탐색 및 주문 기능
     • 다도/명상 교육 프로그램
     ```

---

## 8. 앱 심사 준비

### 8.1. 테스트 계정 제공

심사자가 앱을 테스트할 수 있도록 테스트 계정 제공:
- 이메일: test@dagong.co.kr
- 비밀번호: TestPassword123!

### 8.2. 체크리스트

- [ ] 모든 앱 콘텐츠 정보 작성 완료
- [ ] 개인정보처리방침 URL 제공
- [ ] 스토어 등록정보 및 그래픽 애셋 업로드
- [ ] AAB 파일 업로드 및 서명 확인
- [ ] Digital Asset Links 설정 및 배포
- [ ] 테스트 계정 제공 (필요 시)
- [ ] 앱이 정책 준수 확인

### 8.3. 정책 준수 확인

- ✅ 저작권 침해 금지
- ✅ 개인정보 보호
- ✅ 광고 가이드라인 준수
- ✅ 콘텐츠 등급 적절
- ✅ 결제 시스템 안전

### 8.4. 심사 제출

1. **앱 심사** → **심사 제출** 클릭
2. 심사 기간: 평균 3~7일
3. 승인 후 자동 배포 (설정한 경우)

---

## 9. 배포 후 관리

### 9.1. 앱 업데이트

버전 업데이트 시:
```bash
# build.gradle에서 versionCode와 versionName 증가
versionCode 2
versionName "1.0.1"

# 새 AAB 빌드
./gradlew bundleRelease

# Play Console에 업로드
```

### 9.2. 사용자 피드백

- Google Play Console에서 리뷰 모니터링
- 평점 및 리뷰에 응답
- 크래시 리포트 확인 및 수정

### 9.3. 분석

- 설치 수, 제거 수 모니터링
- 사용자 참여도 분석
- 전환율 추적

---

## 📞 지원

### 유용한 링크
- [Android Developer Guide](https://developer.android.com/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [TWA Documentation](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

### 문제 해결
- Digital Asset Links 확인: https://developers.google.com/digital-asset-links/tools/generator
- APK Analyzer로 앱 분석
- Logcat으로 디버그 로그 확인

---

## ✅ 요약

1. **PWA 준비**: manifest.json, Service Worker
2. **Android 앱 빌드**: TWA 프로젝트 생성
3. **서명 키 생성**: keystore 및 서명 설정
4. **AAB 빌드**: Release 버전 빌드
5. **Digital Asset Links**: assetlinks.json 배포
6. **Play Console 등록**: 앱 정보 및 AAB 업로드
7. **심사 제출**: 정책 준수 확인 후 제출
8. **배포**: 승인 후 자동 배포

**예상 일정**: 준비 1~2일, 심사 3~7일, 총 1~2주

좋은 결과 있기를 바랍니다! 🎉
