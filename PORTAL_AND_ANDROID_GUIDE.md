# 포털 검색 등록 및 Android 앱 등록 완벽 가이드

## 📋 목차
1. [포털 검색 등록 상태 확인](#포털-검색-등록-상태-확인)
2. [포털별 등록 방법](#포털별-등록-방법)
3. [Android 앱 등록 방법](#android-앱-등록-방법)

---

## 🔍 포털 검색 등록 상태 확인

### ✅ 현재 구현 완료 사항

#### 1. **Google (구글)**
**상태**: ✅ 검증 파일 및 메타태그 설치 완료

**설치된 항목**:
- ✅ 메타태그: `<meta name="google-site-verification" content="IzmnLr0Ef5YPLCDrk8fFiJQvvbAqx11JgpvLb5cqaU0"/>`
- ✅ 검증 파일: `https://dagong.co.kr/googleee4e97dad940b617.html`
- ✅ `robots.txt`: `https://dagong.co.kr/robots.txt`
- ✅ `sitemap.xml`: `https://dagong.co.kr/sitemap.xml`
- ✅ Googlebot 크롤링 허용 설정

**다음 단계**:
- ⚠️ Google Search Console에서 소유권 확인 필요
- ⚠️ 사이트맵 제출 필요

#### 2. **Naver (네이버)**
**상태**: ✅ 검증 파일 및 메타태그 설치 완료

**설치된 항목**:
- ✅ 메타태그: `<meta name="naver-site-verification" content="9c90fe377c9fe65ae90b436292e98991ac6251b2"/>`
- ✅ 검증 파일 (구버전): `https://dagong.co.kr/naverf3735d7a56c13e617b246ff2b6e0da46.html`
- ✅ 검증 파일 (신규): `https://dagong.co.kr/navere1b82926e3746b15d5a96506bba49b8f.html`
- ✅ NaverBot, Yeti 크롤링 허용 설정

**다음 단계**:
- ⚠️ Naver Search Advisor에서 소유권 확인 필요

#### 3. **Daum (다음/카카오)**
**상태**: ❌ 등록 안 됨

**필요 작업**:
- ❌ Daum 검색 등록 필요

---

## 🚀 포털별 등록 방법

### 1️⃣ Google Search Console 등록

#### **Step 1: Google Search Console 접속**
```
https://search.google.com/search-console
```

#### **Step 2: 속성 추가**
1. 좌측 상단 "속성 추가" 클릭
2. "URL 접두어" 선택
3. `https://dagong.co.kr` 입력
4. "계속" 클릭

#### **Step 3: 소유권 확인**
**방법 A: HTML 파일 (이미 설치됨)**
- ✅ 파일이 이미 서버에 있음: `googleee4e97dad940b617.html`
- "확인" 버튼만 클릭하면 됨

**방법 B: HTML 태그 (이미 설치됨)**
- ✅ 메타태그가 이미 `<head>`에 있음
- "확인" 버튼만 클릭하면 됨

#### **Step 4: 사이트맵 제출**
1. 좌측 메뉴 "Sitemaps" 클릭
2. `https://dagong.co.kr/sitemap.xml` 입력
3. "제출" 클릭

#### **Step 5: URL 검사 (선택)**
```
https://dagong.co.kr
https://dagong.co.kr/products
https://dagong.co.kr/products?type=tea
https://dagong.co.kr/products?type=craft
```

**예상 소요 시간**: 5-10분  
**검색 노출 시작**: 1-7일 후

---

### 2️⃣ Naver Search Advisor 등록

#### **Step 1: Naver Search Advisor 접속**
```
https://searchadvisor.naver.com
```

#### **Step 2: 사이트 등록**
1. 네이버 로그인
2. "웹마스터 도구" 클릭
3. "사이트 추가" 클릭
4. `https://dagong.co.kr` 입력

#### **Step 3: 소유권 확인**
**방법 A: HTML 파일 업로드 (이미 설치됨)**
- ✅ 파일이 이미 서버에 있음
- "소유확인" 버튼만 클릭

**방법 B: HTML 태그 (이미 설치됨)**
- ✅ 메타태그가 이미 `<head>`에 있음
- "소유확인" 버튼만 클릭

#### **Step 4: 사이트 정보 입력**
1. 사이트 이름: `다공 - 차와 공예의 직거래 플랫폼`
2. 카테고리: `쇼핑 > 농수산물`
3. 대표 URL: `https://dagong.co.kr`

#### **Step 5: 사이트맵 제출**
1. 좌측 메뉴 "요청" > "사이트맵 제출"
2. `https://dagong.co.kr/sitemap.xml` 입력
3. "확인" 클릭

#### **Step 6: RSS 제출 (선택)**
1. "요청" > "RSS 제출"
2. RSS URL 입력 (있는 경우)

**예상 소요 시간**: 5-10분  
**검색 노출 시작**: 1-3일 후

---

### 3️⃣ Daum (카카오) 검색 등록

#### **Step 1: Daum 검색등록 페이지 접속**
```
https://register.search.daum.net/index.daum
```

#### **Step 2: 사이트 등록**
1. "URL 등록" 탭 클릭
2. 사이트 URL: `https://dagong.co.kr`
3. 사이트 제목: `다공 - 차와 공예의 직거래 플랫폼`
4. 사이트 설명: 
   ```
   전통 차와 공예품을 생산자와 직거래하는 플랫폼입니다. 
   보성녹차, 하동녹차, 제주녹차부터 전통 도자기, 목공예까지 
   중간마진 없이 합리적 가격으로 구매할 수 있습니다.
   ```
5. 카테고리: `쇼핑 > 특산물/농수산`
6. "등록" 클릭

#### **Step 3: 검증 (자동)**
- Daum은 별도 검증 없이 자동으로 크롤링
- `robots.txt`와 `sitemap.xml`이 있으면 자동 수집

**예상 소요 시간**: 2분  
**검색 노출 시작**: 3-7일 후

---

## 📱 Android 앱 등록 방법 (완벽 가이드)

### 🎯 개요

**다공(茶工)** 웹사이트를 Android 앱으로 변환하여 Google Play Store에 등록하는 전체 과정입니다.

**사용 기술**:
- ✅ PWA (Progressive Web App) - 이미 구현됨
- ✅ TWA (Trusted Web Activity) - Android 네이티브 앱처럼 동작
- ✅ Bubblewrap CLI - 간단한 명령어로 APK 생성

**장점**:
- 🚀 빠른 개발 (1-2시간)
- 💰 낮은 비용 (코드 재사용)
- 🔄 자동 업데이트 (웹사이트 변경 시 앱도 자동 반영)
- 📦 작은 용량 (10MB 이하)

---

### 📋 사전 준비사항

#### 1. **필수 도구 설치**

##### **Node.js 설치** (이미 설치되어 있을 것)
```bash
node --version  # v18 이상 권장
npm --version   # v9 이상 권장
```

##### **Java JDK 설치** (Android 빌드 필수)
```bash
# macOS
brew install openjdk@17

# Ubuntu/Debian
sudo apt-get install openjdk-17-jdk

# 확인
java -version
```

##### **Android SDK 설치** (선택 - Bubblewrap이 자동 설치)
```bash
# Bubblewrap이 필요시 자동으로 설치합니다
```

#### 2. **Google Play Developer 계정**
- **비용**: $25 (일회성, 평생 사용)
- **등록**: https://play.google.com/console
- **필요 서류**: 신용카드, 신분증 (개인) 또는 사업자등록증 (법인)

#### 3. **앱 아이콘 준비**
- **필수 크기**: 512x512 PNG (최소)
- **권장**: 다양한 크기 (192x192, 512x512)
- **현재 상태**: ⚠️ SVG 임시 아이콘만 있음 → PNG 생성 필요

---

### 🛠️ Android 앱 생성 (Bubblewrap CLI 사용)

#### **Step 1: Bubblewrap CLI 설치**
```bash
npm install -g @bubblewrap/cli
```

**설치 확인**:
```bash
bubblewrap --version
```

#### **Step 2: TWA 프로젝트 생성**

##### **방법 A: 대화형 생성 (권장)**
```bash
cd /home/user/webapp
mkdir android-twa
cd android-twa

bubblewrap init --manifest https://dagong.co.kr/manifest.json
```

**대화형 질문에 답변**:
```
? Domain being opened in the TWA: dagong.co.kr
? Application Package ID: kr.co.dagong
? Application Name: 다공
? Short Application Name: 다공
? Application Display Mode: standalone
? Status Bar Color: #059669
? Navigation Bar Color: #059669
? Splash Screen Color: #ffffff
? Enable Site Settings Shortcut: No
? Enable Notifications: Yes
```

##### **방법 B: 명령어 한 줄로 생성**
```bash
cd /home/user/webapp
mkdir android-twa
cd android-twa

bubblewrap init \
  --manifest https://dagong.co.kr/manifest.json \
  --packageId kr.co.dagong \
  --name "다공" \
  --launcherName "다공" \
  --display standalone \
  --statusBarColor "#059669" \
  --navigationBarColor "#059669" \
  --backgroundColor "#ffffff" \
  --startUrl "https://dagong.co.kr" \
  --iconUrl "https://dagong.co.kr/static/icons/icon-512x512.png" \
  --maskableIconUrl "https://dagong.co.kr/static/icons/icon-512x512.png"
```

#### **Step 3: Keystore 생성 (앱 서명용)**

Bubblewrap이 자동으로 생성하거나, 수동으로 생성:

##### **자동 생성 (권장)**
```bash
bubblewrap doctor
```
- 첫 실행 시 자동으로 `android.keystore` 생성
- 비밀번호는 자동으로 `android`로 설정됨

##### **수동 생성 (보안 강화)**
```bash
keytool -genkey -v -keystore dagong-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias dagong-key

# 정보 입력:
# - 비밀번호: [안전한 비밀번호]
# - 이름: 다공
# - 조직 단위: 개발팀
# - 조직: 다공
# - 도시: 서울
# - 시/도: 서울
# - 국가 코드: KR
```

#### **Step 4: APK 빌드**

##### **개발용 APK (테스트)**
```bash
bubblewrap build
```

**출력 파일**: `app-release-signed.apk`

##### **프로덕션 AAB (Play Store 업로드용)**
```bash
bubblewrap build --bundleMode
```

**출력 파일**: `app-release-bundle.aab`

**빌드 소요 시간**: 2-5분

#### **Step 5: SHA256 지문 추출**

앱과 웹사이트 연결을 위한 디지털 지문 추출:

```bash
# Bubblewrap이 생성한 keystore 사용
keytool -list -v -keystore android.keystore \
  -alias android -storepass android -keypass android | grep "SHA256"

# 또는 수동 생성한 keystore 사용
keytool -list -v -keystore dagong-release-key.jks \
  -alias dagong-key | grep "SHA256"
```

**출력 예시**:
```
SHA256: AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90
```

**이 SHA256 지문을 복사하세요!** (다음 단계에서 사용)

---

### 🔗 Digital Asset Links 설정

웹사이트와 Android 앱을 연결하여 브라우저 없이 네이티브처럼 동작하도록 설정:

#### **Step 1: assetlinks.json 파일 업데이트**

**현재 파일 위치**: `src/index.tsx` (이미 엔드포인트 구현됨)

**수정 방법**:
```bash
cd /home/user/webapp
nano src/index.tsx
```

**찾아서 수정할 부분**:
```typescript
// Digital Asset Links for Android TWA
app.get('/.well-known/assetlinks.json', (c) => {
  return c.json([{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'kr.co.dagong',
      sha256_cert_fingerprints: [
        '여기에_실제_SHA256_지문을_입력하세요'  // ← 이 부분 수정
      ]
    }
  }])
})
```

**예시**:
```typescript
sha256_cert_fingerprints: [
  'AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90:AB:CD:EF:12:34:56:78:90'
]
```

#### **Step 2: 웹사이트 재배포**
```bash
cd /home/user/webapp
npm run build
# Cloudflare Pages에 배포
npm run deploy
```

#### **Step 3: 검증**
```bash
curl https://dagong.co.kr/.well-known/assetlinks.json
```

**올바른 출력**:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "kr.co.dagong",
    "sha256_cert_fingerprints": ["AB:CD:EF:..."]
  }
}]
```

---

### 📦 Google Play Console 등록

#### **Step 1: Google Play Console 접속**
```
https://play.google.com/console
```

#### **Step 2: 개발자 계정 생성**
1. Google 계정으로 로그인
2. "계정 만들기" 클릭
3. **$25 일회성 등록비 결제**
4. 개발자 정보 입력:
   - 이름: [귀하의 이름 또는 회사명]
   - 이메일: [연락 가능한 이메일]
   - 전화번호: [연락처]
   - 주소: [실제 주소]

#### **Step 3: 앱 만들기**
1. "모든 앱" > "앱 만들기" 클릭
2. **앱 세부정보**:
   - 앱 이름: `다공(茶工) - 차와 공예의 직거래 플랫폼`
   - 기본 언어: `한국어 (대한민국)`
   - 앱 또는 게임: `앱`
   - 무료 또는 유료: `무료`

3. **선언**:
   - ✅ 개발자 프로그램 정책 준수
   - ✅ 미국 수출법 준수

4. "앱 만들기" 클릭

#### **Step 4: 앱 콘텐츠 설정**

##### **4-1. 앱 액세스 권한**
```
모든 사용자가 앱의 모든 기능에 액세스할 수 있습니다
```

##### **4-2. 광고**
```
아니요, 내 앱에는 광고가 포함되어 있지 않습니다
```

##### **4-3. 콘텐츠 등급**
1. "설문지 시작" 클릭
2. 카테고리: `유틸리티, 생산성, 커뮤니케이션 또는 기타`
3. 모든 질문에 "아니요" 답변
4. "등급 계산" 클릭
5. **결과**: `만 3세 이상` (All Ages)

##### **4-4. 타겟층 및 콘텐츠**
```
타겟 연령층: 만 18세 이상
어린이를 대상으로 하지 않음
```

##### **4-5. 개인정보처리방침**
```
URL: https://dagong.co.kr/privacy
```
⚠️ **개인정보처리방침 페이지를 먼저 만들어야 합니다!**

##### **4-6. 데이터 보안**
1. "데이터 수집 및 보안 관행 입력"
2. 수집하는 데이터 유형 선택:
   - ✅ 이메일 주소 (로그인용)
   - ✅ 이름 (주문 배송용)
   - ✅ 전화번호 (주문 배송용)
   - ✅ 주소 (주문 배송용)
3. 데이터 사용 목적:
   - ✅ 계정 관리
   - ✅ 주문 처리
4. 암호화 여부: `예, 전송 중 암호화됨`

#### **Step 5: 앱 출시 준비**

##### **5-1. 프로덕션 트랙 (본 출시)**
1. 좌측 메뉴 "출시" > "프로덕션"
2. "새 출시 만들기" 클릭

##### **5-2. APK/AAB 업로드**
```bash
# AAB 파일 업로드 (권장)
app-release-bundle.aab

# 또는 APK 파일
app-release-signed.apk
```

**드래그 앤 드롭**으로 업로드

##### **5-3. 출시 이름 및 출시 노트**
```
출시 이름: v1.0.0 (초기 출시)

출시 노트 (한국어):
- 차 직거래: 녹차, 백차, 청차, 황차, 홍차, 발효차, 블렌딩차
- 공예품: 도자기, 목공예, 금속공예
- 선물세트 및 지역 특산품
- 체험 교육 프로그램
- 다도 교육 및 명상 교육
- 생산자 직거래로 최대 50% 할인

출시 노트 (영어):
- Direct trade for various teas
- Handcrafted products
- Gift sets and local specialties
- Experience programs
- Tea ceremony and meditation education
- Up to 50% discount through direct trade
```

##### **5-4. 국가/지역**
```
대한민국
```
**또는** 전 세계 출시:
```
사용 가능한 모든 국가 및 지역
```

#### **Step 6: 스토어 등록정보 작성**

##### **6-1. 기본 정보**
```
앱 이름: 다공(茶工)
짧은 설명 (80자):
전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진 없이 합리적 가격으로 구매하세요.

전체 설명 (4000자):
다공(茶工)은 한국의 전통 차와 수제 공예품을 생산자와 직접 거래할 수 있는 플랫폼입니다.

🍵 차 직거래
- 녹차, 백차, 청차, 황차, 홍차, 발효차, 블렌딩차
- 보성녹차, 하동녹차, 제주녹차 등 전국 유명 산지 직배송
- 중국 명차 (백모단, 철관음, 대홍포 등)
- 생산자 직거래로 소비자가 대비 최대 50% 할인

🎨 공예품
- 전통 도자기 (청자, 백자)
- 목공예 (찻상, 찻잔 받침)
- 금속공예 (찻숟가락, 다관)

🎁 선물세트 및 특산품
- 명절 선물세트
- 기업 VIP 선물세트
- 지역 특산품 (제주 한라봉, 보성 옥수수 등)

📚 체험 교육
- 차 농장 투어
- 다도 체험 교육
- 공예 워크숍
- 명상 교육

✨ 다공의 장점
- 생산자 직거래로 합리적 가격
- 중간마진 최소화 (생산자 수익 극대화)
- 전국 유명 산지 직배송
- 신선하고 품질 좋은 상품
- 안전한 결제 시스템

💡 사용 방법
1. 원하는 차 또는 공예품 선택
2. 생산자 정보 및 상품 상세 확인
3. 장바구니 담기 및 주문
4. 생산자로부터 직접 배송

다공과 함께 한국의 전통 차 문화를 경험하세요!
```

##### **6-2. 앱 아이콘**
- **크기**: 512x512 픽셀
- **형식**: PNG (32비트)
- **파일명**: `icon-512x512.png`

⚠️ **현재 상태**: SVG 임시 아이콘만 있음 → PNG 생성 필요

**아이콘 생성 방법**:
```bash
# 온라인 도구 사용 (가장 간단)
https://www.pwabuilder.com/imageGenerator
# 512x512 이미지 업로드 → 모든 크기 자동 생성

# 또는 ImageMagick 사용
convert -size 512x512 xc:'#059669' \
  -font Arial -pointsize 300 -fill white \
  -gravity center -annotate +0+0 '茶' \
  icon-512x512.png
```

##### **6-3. 스크린샷**
- **필수**: 최소 2개 (권장 4-8개)
- **크기**: 
  - 휴대전화: 1080x1920 ~ 1440x2560
  - 7인치 태블릿: 1200x1920 (선택)
  - 10인치 태블릿: 1920x1200 (선택)

**스크린샷 촬영 방법**:
```bash
# Chrome DevTools에서
1. F12 → Toggle device toolbar (Ctrl+Shift+M)
2. 기기: Pixel 5 (1080x2340)
3. https://dagong.co.kr 접속
4. 스크린샷 촬영 (Ctrl+Shift+P → "Capture screenshot")

# 필요한 페이지:
- 홈페이지
- 차 직거래 페이지
- 상품 상세 페이지
- 장바구니 페이지
```

##### **6-4. 홍보용 이미지**
- **기능 그래픽**: 1024x500 (선택, 하지만 권장)
- **홍보 동영상**: YouTube URL (선택)

#### **Step 7: 검토 제출**
1. 모든 필수 항목 완료 확인
2. "검토용으로 제출" 클릭
3. **검토 기간**: 일반적으로 1-7일

#### **Step 8: 내부 테스트 (권장)**
검토 전 내부 테스트 진행:

1. "출시" > "내부 테스트"
2. 테스터 이메일 추가
3. APK/AAB 업로드
4. "출시" 클릭
5. 테스터에게 테스트 링크 전송
6. **최소 테스트 기간**: 14일

---

### ✅ 체크리스트

#### **웹사이트 준비**
- [x] HTTPS 서비스 (https://dagong.co.kr)
- [x] PWA manifest.json
- [x] Service Worker
- [x] 앱 아이콘 (SVG만 있음, PNG 필요)
- [ ] assetlinks.json (SHA256 지문 입력 필요)

#### **Android 앱 준비**
- [ ] Bubblewrap CLI 설치
- [ ] TWA 프로젝트 생성
- [ ] Keystore 생성
- [ ] SHA256 지문 추출
- [ ] APK/AAB 빌드
- [ ] 실기기 테스트

#### **Google Play Console**
- [ ] 개발자 계정 생성 ($25)
- [ ] 앱 만들기
- [ ] 앱 콘텐츠 설정
- [ ] 스토어 등록정보 작성
- [ ] 앱 아이콘 업로드
- [ ] 스크린샷 업로드
- [ ] APK/AAB 업로드
- [ ] 검토 제출

#### **추가 필요 사항**
- [ ] 개인정보처리방침 페이지 작성
- [ ] 이용약관 페이지 작성
- [ ] 앱 아이콘 PNG 생성
- [ ] 스크린샷 촬영

---

## 📞 도움말 및 문제 해결

### 자주 묻는 질문

#### Q1: APK 빌드 시 "Failed to build" 오류
```bash
# Java JDK 확인
java -version

# Android SDK 재설치
bubblewrap doctor

# 캐시 삭제 후 재빌드
rm -rf build/
bubblewrap build
```

#### Q2: 앱이 브라우저로 열림
- assetlinks.json의 SHA256 지문이 올바른지 확인
- 웹사이트와 앱의 package name이 일치하는지 확인

#### Q3: Google Play 검토 거부
- 개인정보처리방침 페이지 필수
- 스크린샷과 실제 앱 내용 일치 필요
- 앱 아이콘이 512x512 PNG인지 확인

---

## 🔗 유용한 링크

### 포털 등록
- **Google Search Console**: https://search.google.com/search-console
- **Naver Search Advisor**: https://searchadvisor.naver.com
- **Daum 검색 등록**: https://register.search.daum.net/index.daum

### Android 앱 개발
- **Bubblewrap 공식 문서**: https://github.com/GoogleChromeLabs/bubblewrap
- **TWA 가이드**: https://developer.chrome.com/docs/android/trusted-web-activity/
- **Google Play Console**: https://play.google.com/console
- **Digital Asset Links 테스터**: https://developers.google.com/digital-asset-links/tools/generator

### 도구
- **PWA 아이콘 생성기**: https://www.pwabuilder.com/imageGenerator
- **스크린샷 도구**: Chrome DevTools (F12)
- **APK 분석기**: https://developer.android.com/studio/build/apk-analyzer

---

**마지막 업데이트**: 2026-02-18
**문서 버전**: 2.0
