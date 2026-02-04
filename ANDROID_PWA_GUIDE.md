# 다공(dagong.co.kr) Android Play Store 배포 가이드

## 📱 개요

이 가이드는 다공 PWA를 **TWA(Trusted Web Activity)**를 사용하여 Android 앱으로 변환하고 Google Play Store에 등록하는 방법을 안내합니다.

---

## ✨ PWA 기능

다공은 다음과 같은 PWA 기능을 지원합니다:

### 설치 가능
- ✅ 홈 화면에 설치
- ✅ 전체 화면 모드 (standalone)
- ✅ 스플래시 화면
- ✅ 앱 아이콘 (72x72 ~ 512x512)

### 오프라인 지원
- ✅ Service Worker로 정적 파일 캐싱
- ✅ API 응답 캐싱
- ✅ 오프라인 상태 감지
- ✅ 네트워크 복구 알림

### 모바일 최적화
- ✅ 모바일 하단 네비게이션
- ✅ 터치 제스처 (스와이프)
- ✅ Pull to Refresh
- ✅ 햅틱 피드백 (진동)
- ✅ iOS Safe Area 지원
- ✅ 최소 터치 영역 44x44px

### 네이티브 앱 느낌
- ✅ 페이지 전환 애니메이션
- ✅ 로딩 스켈레톤
- ✅ 푸시 알림 준비 완료
- ✅ 백그라운드 동기화 준비 완료

---

## 🎯 TWA vs 네이티브 앱

| 기능 | TWA | 네이티브 앱 |
|------|-----|-----------|
| 개발 시간 | ✅ 1-2일 | ❌ 2-4주 |
| 코드 유지보수 | ✅ 하나의 코드베이스 | ❌ 별도 유지보수 |
| 자동 업데이트 | ✅ 웹 업데이트로 즉시 반영 | ❌ 앱 스토어 심사 필요 |
| 파일 크기 | ✅ ~2MB | ❌ 10-50MB |
| Play Store 등록 | ✅ 가능 | ✅ 가능 |
| 오프라인 지원 | ✅ Service Worker | ✅ 네이티브 저장소 |
| 네이티브 기능 | ⚠️ 제한적 | ✅ 전체 접근 |

**권장**: 다공은 PWA 기능이 충분하므로 **TWA 방식을 권장**합니다.

---

## 🚀 TWA 배포 방법

### 방법 1: Bubblewrap CLI 사용 (권장)

#### Step 1: Bubblewrap 설치

```bash
# Node.js 필요 (이미 설치됨)
npm install -g @bubblewrap/cli

# Android SDK 필요
# Android Studio 설치: https://developer.android.com/studio
```

#### Step 2: TWA 프로젝트 생성

```bash
cd /home/user
mkdir dagong-twa
cd dagong-twa

# TWA 초기화
bubblewrap init --manifest https://dagong.co.kr/manifest.json
```

**프롬프트 질문에 대한 답변:**

```
? Package name: kr.co.dagong.twa
? App name: 다공
? Launcher name: 다공
? Display mode: standalone
? Orientation: portrait
? Status bar color: #7c9473
? Icon URL: https://dagong.co.kr/static/icons/icon-512x512.png
? Maskable icon URL: https://dagong.co.kr/static/icons/icon-512x512.png
? Start URL: https://dagong.co.kr/
? Shortcut name (optional):
? Shortcut short name (optional):
? Shortcut URL (optional):
? Fallback strategy: custom-tabs
? Enable site settings shortcut: No
? Enable notifications: Yes
```

#### Step 3: Digital Asset Links 설정

TWA는 웹사이트와 앱의 연결을 검증하기 위해 Digital Asset Links가 필요합니다.

**1) Keystore 생성**

```bash
keytool -genkey -v -keystore dagong-release.keystore \
  -alias dagong-key -keyalg RSA -keysize 2048 -validity 10000
```

**정보 입력:**
- 비밀번호: (안전한 비밀번호 입력 - 잊지 마세요!)
- 이름: 다공
- 조직: 다공
- 조직 단위: Development
- 도시: Seoul
- 주/도: Seoul
- 국가 코드: KR

**2) SHA-256 지문 추출**

```bash
keytool -list -v -keystore dagong-release.keystore \
  -alias dagong-key | grep "SHA256:"
```

**출력 예시:**
```
SHA256: AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56
```

**3) assetlinks.json 생성**

`/home/user/webapp/public/.well-known/assetlinks.json` 파일 생성:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "kr.co.dagong.twa",
    "sha256_cert_fingerprints": [
      "위에서_추출한_SHA256_지문_입력"
    ]
  }
}]
```

**4) 웹사이트에 배포**

```bash
# 파일 위치 확인
curl https://dagong.co.kr/.well-known/assetlinks.json

# 응답 확인 (200 OK 및 JSON 내용 반환되어야 함)
```

#### Step 4: APK/AAB 빌드

```bash
cd /home/user/dagong-twa

# APK 빌드 (테스트용)
bubblewrap build

# AAB 빌드 (Play Store 업로드용)
bubblewrap build --skipPwaValidation
```

**빌드 위치:**
- APK: `app-release-unsigned.apk`
- AAB: `app-release-bundle.aab`

#### Step 5: APK 서명

```bash
# APK 서명
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore dagong-release.keystore \
  app-release-unsigned.apk dagong-key

# APK 정렬
zipalign -v 4 app-release-unsigned.apk dagong-release.apk
```

#### Step 6: 로컬 테스트

```bash
# 에뮬레이터 또는 실제 기기에 설치
adb install dagong-release.apk

# 로그 확인
adb logcat | grep "chromium"
```

#### Step 7: Play Store 업로드

1. **Google Play Console 접속**
   - https://play.google.com/console

2. **계정 등록 비용**
   - 일회성 $25 (약 33,000원)

3. **앱 생성**
   - "Create app" 클릭
   - App name: 다공
   - Default language: Korean
   - App or game: App
   - Free or paid: Free

4. **AAB 업로드**
   - Production → Create new release
   - Upload `app-release-bundle.aab`

5. **Store Listing 작성** (아래 참조)

---

### 방법 2: PWA Builder 사용 (가장 쉬움)

#### Step 1: PWA Builder 접속

https://www.pwabuilder.com

#### Step 2: URL 입력

```
https://dagong.co.kr
```

#### Step 3: "Package For Stores" 클릭

- Android: "Generate Package" 선택
- Package ID: `kr.co.dagong.twa`
- App name: `다공`
- Launcher name: `다공`

#### Step 4: 다운로드 & 서명

다운로드 받은 패키지에 서명하고 업로드

---

## 📋 Play Store 자산 준비

### 1. 앱 아이콘 (필수)

- **크기**: 512x512px
- **형식**: PNG (32비트)
- **위치**: `/home/user/webapp/public/static/icons/icon-512x512.png` ✅

### 2. Feature Graphic (필수)

- **크기**: 1024x500px
- **형식**: PNG 또는 JPG
- **내용**: 앱 소개 이미지

**Canva 템플릿 사용:**
```
https://www.canva.com/design/play-feature-graphic
크기: 1024x500px
텍스트: "한국 차와 공예의 직거래 플랫폼 다공"
배경: #f5f1e8
강조색: #7c9473
```

### 3. 스크린샷 (최소 2개, 최대 8개)

- **크기**: 
  - 폰: 1080x1920px ~ 2400x4000px
  - 태블릿: 1200x1920px ~ 2048x2732px
- **형식**: PNG 또는 JPG

**권장 스크린샷:**
1. 홈 화면
2. 차 상품 목록
3. 상품 상세 (가격 표시)
4. 장바구니
5. 공예품 목록
6. 지역특산물

### 4. 앱 설명 (필수)

**짧은 설명 (80자):**
```
한국 차와 공예품을 생산자와 직거래하세요. 소비자가 대비 최대 50% 절약!
```

**전체 설명 (4000자):**
```
🍵 다공(茶工) - 한국 차와 공예의 직거래 플랫폼

다공은 한국의 전통 차와 공예품을 생산자로부터 직접 구매할 수 있는 플랫폼입니다. 
중간 유통 마진을 없애고 소비자가 대비 25-50% 저렴한 가격으로 고품질 상품을 만나보세요.

✨ 주요 기능

📦 다양한 상품 카테고리
- 차: 녹차, 백차, 청차, 황차, 홍차, 발효차, 블렌딩차
- 공예품: 찻잔, 다관, 다기세트, 도자기, 목공예, 금속공예, 한복공예, 장식품
- 지역특산물: 농산물, 가공식품, 수산물, 축산물, 기타 특산품

💰 투명한 가격 시스템
- 소비자가와 직거래가 동시 표시
- 절약 금액 한눈에 확인
- 플랫폼 수수료 단 5.5%

🏪 생산자 직거래
- 보성, 하동, 제주 등 유명 차산지 생산자 직접 연결
- 생산자 스토리와 제품 상세 정보 제공
- 문의/소통 기능

🚚 빠른 배송
- 결제 완료 후 3일 이내 배송 시작
- 배송 완료 확인 후 3일 내 정산

🎁 체험 & 교육
- 다도 체험 프로그램
- 공예 체험 프로그램
- 농장/공방 투어

📱 스마트한 기능
- 오프라인에서도 상품 조회 가능
- 장바구니 자동 저장
- 맞춤형 추천 상품
- 다국어 지원 (한국어, 영어, 중국어, 일본어)

🌐 전국 배송
- 대한민국 전역 배송 지원
- 지역별 특산물 발견

다공과 함께 한국의 아름다운 차와 공예 문화를 경험하세요!
```

### 5. 카테고리 선택

- **앱 카테고리**: Shopping
- **태그**: 쇼핑, 음식, 라이프스타일, 전통, 공예

### 6. 개인정보처리방침 (필수)

**URL**: `https://dagong.co.kr/privacy-policy.html`

`/home/user/webapp/public/privacy-policy.html` 파일 생성 (이미 존재함)

### 7. 콘텐츠 등급

- **연령 등급**: 전체 이용가
- **광고 포함**: 아니오

---

## ✅ 배포 전 체크리스트

### PWA 요구사항
- [x] HTTPS 적용 (dagong.co.kr)
- [x] manifest.json 파일
- [x] Service Worker 등록
- [x] 아이콘 준비 (192x192, 512x512)
- [x] 오프라인 동작

### Digital Asset Links
- [ ] assetlinks.json 생성
- [ ] SHA-256 지문 생성
- [ ] 웹사이트에 배포 (`/.well-known/assetlinks.json`)
- [ ] 접근 가능 확인

### Play Store 자산
- [x] 앱 아이콘 512x512
- [ ] Feature Graphic 1024x500
- [ ] 스크린샷 최소 2개
- [ ] 짧은 설명
- [ ] 전체 설명
- [ ] 개인정보처리방침
- [ ] 이용약관 (선택)

### 빌드 파일
- [ ] APK 또는 AAB 파일
- [ ] 서명 완료
- [ ] 로컬 테스트 완료

---

## 💰 비용 및 일정

### 비용
- **Google Play Console 등록**: $25 (일회성, 평생 사용)
- **도메인**: dagong.co.kr (연 15,000-20,000원)
- **호스팅**: Cloudflare Pages (무료)
- **총 비용**: 약 33,000원 (1회)

### 일정
- **Day 1**: TWA 프로젝트 생성 (1-2시간)
- **Day 2**: Digital Asset Links 설정 (1-2시간)
- **Day 3**: Play Store 자산 준비 (2-3시간)
- **Day 4-7**: Play Store 심사 대기 (1-3일)

**총 소요 시간**: 약 5-7일

---

## 🔧 문제 해결

### Q1: Digital Asset Links 검증 실패

**원인**: assetlinks.json 파일에 접근할 수 없거나 SHA-256 지문이 틀림

**해결**:
```bash
# 1. 파일 접근 확인
curl https://dagong.co.kr/.well-known/assetlinks.json

# 2. SHA-256 지문 재확인
keytool -list -v -keystore dagong-release.keystore -alias dagong-key

# 3. Cloudflare Pages 재배포
```

### Q2: 앱이 브라우저로 열림

**원인**: Digital Asset Links 검증 실패

**해결**: assetlinks.json 파일 확인 및 앱 재설치

### Q3: Play Store 심사 거부

**일반적인 이유**:
- 스크린샷 부족
- 개인정보처리방침 누락
- 앱 크래시 발생

**해결**: 피드백에 따라 수정 후 재제출

---

## 📚 참고 자료

- **Bubblewrap 공식 문서**: https://github.com/GoogleChromeLabs/bubblewrap
- **PWA Builder**: https://www.pwabuilder.com
- **Digital Asset Links 가이드**: https://developers.google.com/digital-asset-links
- **Play Console 도움말**: https://support.google.com/googleplay/android-developer

---

## 🎉 배포 완료 후

배포가 완료되면:

1. ✅ Play Store에서 "다공" 검색 가능
2. ✅ 사용자 리뷰 & 평점 수집
3. ✅ 웹 업데이트 시 앱 자동 업데이트
4. ✅ 푸시 알림 전송 가능 (향후)
5. ✅ 앱 내 결제 연동 가능 (향후)

**Play Store URL**: `https://play.google.com/store/apps/details?id=kr.co.dagong.twa`

---

**배포 성공을 기원합니다!** 🚀📱
