# Android TWA (Trusted Web Activity) 앱 생성 가이드

## 📱 TWA란?
Trusted Web Activity는 웹사이트를 Android 앱으로 패키징하여 Google Play에 등록할 수 있는 기술입니다.

## ✅ 사전 준비사항
1. ✅ 웹사이트가 HTTPS로 서비스 중이어야 함: https://dagong.co.kr
2. ✅ PWA manifest.json 파일 존재
3. ✅ Service Worker 등록
4. ⚠️ Digital Asset Links 설정 필요 (도메인 소유권 증명)

---

## 🚀 1단계: Android Studio 프로젝트 생성

### Option A: Bubblewrap CLI 사용 (추천 - 가장 간단)
```bash
# Node.js 설치 후
npm install -g @bubblewrap/cli

# TWA 프로젝트 생성
bubblewrap init --manifest https://dagong.co.kr/static/manifest.json

# 앱 빌드
bubblewrap build

# APK 생성 완료: app-release-signed.apk
```

### Option B: Android Studio에서 수동 생성
1. Android Studio 설치: https://developer.android.com/studio
2. New Project → "Empty Activity" 선택
3. 아래 파일들을 프로젝트에 추가

---

## 📄 2단계: 필수 파일 설정

### `app/build.gradle` (앱 설정)
```gradle
plugins {
    id 'com.android.application'
}

android {
    namespace 'kr.co.dagong'
    compileSdk 34

    defaultConfig {
        applicationId "kr.co.dagong"
        minSdk 21
        targetSdk 34
        versionCode 1
        versionName "1.0.0"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation 'com.google.androidbrowserhelper:androidbrowserhelper:2.5.0'
    implementation 'androidx.browser:browser:1.7.0'
}
```

### `AndroidManifest.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="kr.co.dagong">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="다공"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar">
        
        <activity
            android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
            android:exported="true">
            
            <meta-data
                android:name="android.support.customtabs.trusted.DEFAULT_URL"
                android:value="https://dagong.co.kr" />
            
            <meta-data
                android:name="android.support.customtabs.trusted.STATUS_BAR_COLOR"
                android:resource="@color/colorPrimary" />
            
            <meta-data
                android:name="android.support.customtabs.trusted.NAVIGATION_BAR_COLOR"
                android:resource="@color/colorPrimary" />

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data
                    android:scheme="https"
                    android:host="dagong.co.kr" />
            </intent-filter>
        </activity>

        <activity android:name="com.google.androidbrowserhelper.trusted.WebViewFallbackActivity"
            android:exported="true" />

    </application>

</manifest>
```

### `res/values/colors.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#059669</color>
    <color name="colorPrimaryDark">#047857</color>
    <color name="colorAccent">#10b981</color>
</resources>
```

---

## 🔐 3단계: Digital Asset Links 설정

### 앱 서명 키 생성
```bash
# Keystore 생성
keytool -genkey -v -keystore dagong-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias dagong-key

# SHA256 지문 추출
keytool -list -v -keystore dagong-release-key.jks \
  -alias dagong-key | grep "SHA256"
```

### 웹사이트에 assetlinks.json 추가
**파일 위치**: `https://dagong.co.kr/.well-known/assetlinks.json`

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

---

## 🏗️ 4단계: 앱 빌드 및 서명

```bash
# Debug APK 생성 (테스트용)
./gradlew assembleDebug

# Release APK 생성
./gradlew assembleRelease

# APK 서명 (수동)
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore dagong-release-key.jks \
  app/build/outputs/apk/release/app-release-unsigned.apk \
  dagong-key

# Zipalign 최적화
zipalign -v 4 app-release-unsigned.apk dagong-release-signed.apk
```

---

## 📦 5단계: Google Play Console 등록

### 준비물
- ✅ Google Play Developer 계정 ($25 일회성 등록비)
- ✅ 서명된 APK 또는 AAB 파일
- ✅ 앱 아이콘 (512x512 PNG)
- ✅ 스크린샷 (최소 2장, 휴대폰용)
- ✅ 개인정보처리방침 URL
- ✅ 앱 설명 및 짧은 설명

### 등록 절차
1. https://play.google.com/console 접속
2. "앱 만들기" 클릭
3. 앱 정보 입력:
   - **앱 이름**: 다공(茶工)
   - **카테고리**: 쇼핑
   - **연락처 이메일**: support@dagong.co.kr
4. APK/AAB 업로드 (내부 테스트 트랙)
5. 콘텐츠 등급 설정
6. 타겟 고객 및 콘텐츠 설정
7. 스토어 등록정보 작성:
   - 짧은 설명 (80자 이내)
   - 전체 설명 (4000자 이내)
   - 앱 아이콘
   - 스크린샷 (2-8장)
8. 가격 및 배포 국가 설정
9. 검토 제출

---

## 📋 체크리스트

### 웹사이트 (dagong.co.kr)
- ✅ HTTPS 서비스
- ✅ manifest.json
- ✅ Service Worker
- ⚠️ assetlinks.json (추가 필요)
- ✅ 앱 아이콘 (다양한 크기)

### Android 앱
- ⚠️ Android Studio 프로젝트 생성
- ⚠️ Keystore 생성 및 SHA256 추출
- ⚠️ APK 빌드 및 서명
- ⚠️ 내부 테스트 (최소 14일)

### Google Play
- ⚠️ Google Play Developer 계정
- ⚠️ 앱 등록정보 작성
- ⚠️ 개인정보처리방침 페이지
- ⚠️ 스크린샷 및 홍보 이미지
- ⚠️ 검토 제출

---

## 🎯 간편 방법: Bubblewrap CLI (강력 추천)

Bubblewrap을 사용하면 Android Studio 없이도 TWA 앱을 생성할 수 있습니다:

```bash
# 1. Bubblewrap 설치
npm install -g @bubblewrap/cli

# 2. 프로젝트 초기화
bubblewrap init --manifest https://dagong.co.kr/static/manifest.json

# 대화형 질문에 답변:
# - Domain: dagong.co.kr
# - Application ID: kr.co.dagong
# - Name: 다공
# - Launcher name: 다공
# - Display mode: standalone
# - Status bar color: #059669

# 3. Keystore 생성 (한 번만)
bubblewrap doctor
# 자동으로 keystore가 없으면 생성

# 4. 앱 빌드
bubblewrap build
# 출력: app-release-signed.apk

# 5. Digital Asset Links 생성
bubblewrap update
# assetlinks.json 내용을 복사하여 웹사이트에 추가

# 6. 앱 설치 (테스트)
adb install app-release-signed.apk
```

---

## 🔧 트러블슈팅

### 문제: "앱이 브라우저로 열림"
→ assetlinks.json이 올바르게 설정되지 않았습니다. SHA256 지문을 다시 확인하세요.

### 문제: "앱이 설치되지 않음"
→ Keystore 서명이 올바른지 확인하세요.

### 문제: "PWA 설치 배너가 안 뜸"
→ HTTPS, manifest.json, service worker가 모두 정상 작동하는지 확인하세요.

---

## 📞 다음 단계

1. ⚠️ **Bubblewrap CLI로 APK 생성** (또는 Android Studio 프로젝트 생성)
2. ⚠️ **assetlinks.json 웹사이트에 추가**
3. ⚠️ **Google Play Developer 계정 생성**
4. ⚠️ **앱 스토어 등록정보 준비** (아이콘, 스크린샷, 설명)
5. ⚠️ **내부 테스트 진행** (최소 14일)
6. ⚠️ **프로덕션 출시**

---

## 📚 참고 자료
- Bubblewrap CLI: https://github.com/GoogleChromeLabs/bubblewrap
- TWA 가이드: https://developer.chrome.com/docs/android/trusted-web-activity/
- Google Play Console: https://play.google.com/console
- Digital Asset Links: https://developers.google.com/digital-asset-links
