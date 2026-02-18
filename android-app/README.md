# 다공 Android 앱

다공 웹사이트(https://dagong.co.kr)를 위한 TWA (Trusted Web Activity) Android 앱입니다.

## 🚀 빠른 시작

### 1. 필수 사항
- Android Studio Iguana (2023.2.1) 이상
- Java JDK 17 이상
- Gradle 8.1.0 이상

### 2. 프로젝트 빌드

```bash
# Android Studio에서 프로젝트 열기
# File → Open → android-app 폴더 선택

# 또는 커맨드라인에서:
cd android-app
./gradlew build
```

### 3. Release APK/AAB 생성

상세한 가이드는 [GOOGLE_PLAY_GUIDE.md](./GOOGLE_PLAY_GUIDE.md)를 참조하세요.

```bash
# AAB 빌드 (Google Play 업로드용)
./gradlew bundleRelease

# APK 빌드 (테스트용)
./gradlew assembleRelease
```

## 📦 프로젝트 구조

```
android-app/
├── app/
│   ├── src/main/
│   │   ├── AndroidManifest.xml    # 앱 설정
│   │   └── res/
│   │       ├── values/
│   │       │   ├── colors.xml     # 테마 색상
│   │       │   └── strings.xml    # 문자열 리소스
│   │       └── xml/
│   │           └── filepaths.xml  # 파일 제공자 설정
│   └── build.gradle                # 앱 빌드 설정
├── build.gradle                    # 프로젝트 빌드 설정
├── settings.gradle                 # 프로젝트 설정
└── GOOGLE_PLAY_GUIDE.md           # Play Store 등록 가이드
```

## 🔑 주요 설정

### 패키지 정보
- **패키지명**: `kr.co.dagong`
- **앱 이름**: 다공
- **웹사이트**: https://dagong.co.kr
- **최소 SDK**: 21 (Android 5.0)
- **타겟 SDK**: 34 (Android 14)

### 색상 테마
- Primary: `#7c9473` (다공 그린)
- Primary Dark: `#6a8062`

## 📱 기능

- ✅ PWA를 Android 앱으로 변환 (TWA)
- ✅ 오프라인 지원 (Service Worker)
- ✅ 푸시 알림 준비
- ✅ 앱 설치 프롬프트
- ✅ 스플래시 화면
- ✅ 상태 표시줄 및 내비게이션 바 색상 커스터마이징

## 🔐 앱 서명

Play Store에 업로드하려면 앱 서명이 필요합니다.

### Keystore 생성
```bash
keytool -genkey -v -keystore dagong-release.keystore \
  -alias dagong \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

### key.properties 생성
```properties
storePassword=YOUR_PASSWORD
keyPassword=YOUR_PASSWORD
keyAlias=dagong
storeFile=../dagong-release.keystore
```

## 🌐 Digital Asset Links

TWA가 작동하려면 웹사이트에서 앱을 신뢰해야 합니다.

### 1. SHA256 지문 확인
```bash
keytool -list -v -keystore dagong-release.keystore -alias dagong
```

### 2. assetlinks.json 업데이트
`public/.well-known/assetlinks.json` 파일에 SHA256 지문 추가

### 3. 웹사이트 배포
```bash
# Cloudflare Pages에 배포 후 다음 URL에서 확인:
https://dagong.co.kr/.well-known/assetlinks.json
```

### 4. 확인
https://developers.google.com/digital-asset-links/tools/generator

## 📋 체크리스트

### 배포 전
- [ ] manifest.json 완성
- [ ] Service Worker 구현
- [ ] assetlinks.json 배포
- [ ] 앱 서명 키 생성
- [ ] AAB 빌드 성공
- [ ] 개인정보처리방침 페이지 생성

### Google Play Console
- [ ] 개발자 계정 생성 ($25)
- [ ] 앱 정보 작성
- [ ] 스크린샷 준비 (최소 2개)
- [ ] 앱 아이콘 (512x512)
- [ ] 기능 그래픽 (1024x500)
- [ ] AAB 업로드
- [ ] 심사 제출

## 🔧 문제 해결

### TWA가 브라우저로 열림
1. Digital Asset Links 확인
2. SHA256 지문 일치 확인
3. 앱 서명 확인
4. 캐시 삭제 후 재설치

### 빌드 오류
```bash
# Gradle 캐시 삭제
./gradlew clean

# 종속성 다시 다운로드
./gradlew build --refresh-dependencies
```

## 📚 참고 자료

- [Android TWA Guide](https://developer.chrome.com/docs/android/trusted-web-activity/)
- [Google Play Console](https://play.google.com/console)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Android Developers](https://developer.android.com/)

## 📄 라이선스

Copyright © 2026 다공. All rights reserved.
