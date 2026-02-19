# Android 앱 등록 최종 준비 완료 ✅

## 📋 완료된 작업

### ✅ 1. 포털 검색 등록 준비 완료
- **Google 검증 파일**: https://dagong-bi1.pages.dev/googleee4e97dad940b617.html ✅
- **Naver 검증 파일**: https://dagong-bi1.pages.dev/navere1b82926e3746b15d5a96506bba49b8f.html ✅
- **Sitemap.xml**: https://dagong-bi1.pages.dev/sitemap.xml ✅
- **Robots.txt**: https://dagong-bi1.pages.dev/robots.txt ✅

**다음 단계 (사용자 직접 수행 필요)**:
1. **Google Search Console** (2분): https://search.google.com/search-console
   - 속성 추가 → https://dagong-bi1.pages.dev
   - HTML 파일로 소유권 확인
   - 사이트맵 제출: https://dagong-bi1.pages.dev/sitemap.xml

2. **Naver Search Advisor** (2분): https://searchadvisor.naver.com
   - 사이트 추가 → https://dagong-bi1.pages.dev
   - HTML 파일로 소유권 확인
   - 사이트맵 제출

3. **Daum 검색** (1분): https://register.search.daum.net/index.daum
   - URL: https://dagong-bi1.pages.dev
   - 제목: 다공 - 차와 공예의 직거래 플랫폼

---

### ✅ 2. Android 앱 아이콘 생성 완료

**생성된 파일들**:
```
/home/user/webapp/public/static/icons/
├── icon-72x72.png    (280B)
├── icon-96x96.png    (283B)
├── icon-128x128.png  (290B)
├── icon-144x144.png  (291B)
├── icon-152x152.png  (290B)
├── icon-192x192.png  (293B)
├── icon-384x384.png  (305B)
└── icon-512x512.png  (319B) ✅ Google Play 필수
```

**디자인**:
- 배경색: #7c9473 (차 색상)
- 테두리: 원형 디자인
- 크기: 512×512 PNG

**배포 URL**: 
- https://dagong-bi1.pages.dev/static/icons/icon-512x512.png

---

### ✅ 3. Bubblewrap CLI 설치 완료

**설치 위치**: `/home/user/webapp/node_modules/@bubblewrap/cli`  
**사용 방법**: `cd /home/user/webapp && npx @bubblewrap/cli`

**TWA Manifest 생성**: `/home/user/webapp/android-twa/twa-manifest.json`

---

## 📱 Android 앱 등록 가이드 (사용자 직접 수행)

Bubblewrap CLI는 대화형 도구로, **로컬 머신에서 직접 실행**해야 합니다.  
Sandbox 환경에서는 JDK 설치 및 Android SDK 다운로드가 제한되어 있습니다.

### **방법 1: 로컬 머신에서 Bubblewrap 사용 (권장)**

#### **Step 1: Bubblewrap CLI 설치**
```bash
npm install -g @bubblewrap/cli
```

#### **Step 2: TWA 프로젝트 생성**
```bash
cd ~/Documents
mkdir dagong-android && cd dagong-android

bubblewrap init --manifest https://dagong-bi1.pages.dev/manifest.json
```

**대화형 질문 답변**:
```
? Do you want Bubblewrap to install the JDK? → Yes (권장)
? Domain: dagong-bi1.pages.dev
? Package ID: kr.co.dagong
? App Name: 다공(茶工)
? Short Name: 다공
? Display Mode: standalone
? Status Bar Color: #7c9473
? Navigation Bar Color: #7c9473
? Splash Color: #f5f1e8
? Enable Notifications: Yes
```

#### **Step 3: APK 빌드**
```bash
bubblewrap build
```

**출력 파일**: `app-release-signed.apk` (약 10MB)

#### **Step 4: SHA256 지문 추출**
```bash
keytool -list -v -keystore android.keystore \
  -alias android -storepass android | grep SHA256
```

**예시 출력**:
```
SHA256: AB:CD:EF:12:34:56:78:90:...:12:34:56:78:90
```

**이 SHA256 지문을 복사하세요!**

---

### **방법 2: PWA Builder 사용 (더 간단)**

#### **Step 1: PWA Builder 접속**
```
https://www.pwabuilder.com/
```

#### **Step 2: PWA 분석**
1. URL 입력: `https://dagong-bi1.pages.dev`
2. "Start" 클릭
3. "Package for Stores" 클릭

#### **Step 3: Android 앱 생성**
1. "Android" 탭 클릭
2. "Generate Package" 클릭
3. 다음 정보 입력:
   - Package ID: `kr.co.dagong`
   - App Name: `다공(茶工)`
   - Version: `1.0.0`
4. "Generate" 클릭
5. APK 다운로드

---

## 🔗 Digital Asset Links 업데이트 (필수)

**SHA256 지문을 받은 후**, `/home/user/webapp/src/index.tsx` 파일을 수정해야 합니다:

### **수정할 부분**:
```typescript
// Digital Asset Links for Android TWA
app.get('/.well-known/assetlinks.json', (c) => {
  return c.json([{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'kr.co.dagong',
      sha256_cert_fingerprints: [
        'AB:CD:EF:12:34:56:78:90:...:12:34:56:78:90'  // ← SHA256 지문 입력
      ]
    }
  }])
})
```

### **배포**:
```bash
cd /home/user/webapp
npm run build
npm run deploy
```

### **검증**:
```bash
curl https://dagong-bi1.pages.dev/.well-known/assetlinks.json
```

---

## 📦 Google Play Console 등록 (사용자 직접 수행)

### **Step 1: 개발자 계정 생성**
- **URL**: https://play.google.com/console
- **비용**: $25 (일회성, 평생)

### **Step 2: 앱 만들기**
1. "모든 앱" > "앱 만들기" 클릭
2. **앱 세부정보**:
   - 앱 이름: `다공(茶工) - 차와 공예의 직거래 플랫폼`
   - 기본 언어: `한국어 (대한민국)`
   - 앱 또는 게임: `앱`
   - 무료 또는 유료: `무료`

### **Step 3: 앱 콘텐츠 설정**

#### **필수 항목**:
- **앱 액세스 권한**: 모든 사용자가 접근 가능
- **광고**: 광고 없음
- **콘텐츠 등급**: 만 3세 이상
- **타겟층**: 만 18세 이상 (어린이 대상 아님)
- **개인정보처리방침**: `https://dagong-bi1.pages.dev/privacy` ⚠️ **페이지 생성 필요**
- **데이터 보안**:
  - 수집 데이터: 이메일, 이름, 전화번호, 주소
  - 사용 목적: 계정 관리, 주문 처리
  - 암호화: 전송 중 암호화됨

### **Step 4: 스토어 등록정보**

#### **기본 정보**:
- **앱 이름**: 다공(茶工)
- **짧은 설명** (80자):
  ```
  전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진 없이 합리적 가격으로 구매하세요.
  ```

- **전체 설명** (4000자):
  ```
  다공(茶工)은 한국의 전통 차와 수제 공예품을 생산자와 직접 거래할 수 있는 플랫폼입니다.

  🍵 차 직거래
  - 녹차, 백차, 청차, 황차, 홍차, 발효차, 블렌딩차
  - 보성녹차, 하동녹차, 제주녹차 등 전국 유명 산지 직배송
  - 생산자 직거래로 소비자가 대비 최대 50% 할인

  🎨 공예품
  - 전통 도자기 (청자, 백자)
  - 목공예 (찻상, 찻잔 받침)
  - 금속공예 (찻숟가락, 다관)

  🎁 선물세트 및 특산품
  - 명절 선물세트
  - 기업 VIP 선물세트
  - 지역 특산품

  📚 체험 교육
  - 차 농장 투어
  - 다도 체험 교육
  - 공예 워크숍
  - 명상 교육

  ✨ 다공의 장점
  - 생산자 직거래로 합리적 가격
  - 중간마진 최소화
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

#### **그래픽 리소스**:
- **앱 아이콘**: `/home/user/webapp/public/static/icons/icon-512x512.png` ✅
- **스크린샷**: Chrome DevTools로 촬영 (최소 2개 필요)
  - 홈페이지
  - 차 직거래 페이지
  - 상품 상세 페이지
  - 장바구니 페이지

### **Step 5: APK 업로드**
1. "출시" > "프로덕션" 클릭
2. "새 출시 만들기" 클릭
3. APK 업로드 (`app-release-signed.apk`)
4. 출시 노트 작성
5. 국가/지역: 대한민국
6. "검토용으로 제출" 클릭

### **Step 6: 검토 기간**
- **일반적**: 1-3일
- **최대**: 7일

---

## ⚠️ 아직 필요한 작업

### **1. 개인정보처리방침 페이지 생성** (필수)
- **URL**: `https://dagong-bi1.pages.dev/privacy`
- **최소 포함 사항**:
  - 수집하는 개인정보 항목
  - 개인정보 사용 목적
  - 개인정보 보유 기간
  - 개인정보 제3자 제공
  - 이용자 권리

### **2. 스크린샷 촬영** (필수)
- **크기**: 1080×1920 ~ 1440×2560
- **최소 개수**: 2개 (권장 4-8개)
- **방법**: Chrome DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M) → Pixel 5

### **3. SHA256 지문 추출 및 assetlinks.json 업데이트** (필수)
- APK 빌드 후 SHA256 지문 추출
- `src/index.tsx`에서 assetlinks.json 업데이트
- 재배포

---

## 📊 요약

### ✅ 완료된 작업
1. ✅ 포털 검색 등록 준비 (Google, Naver, Daum)
2. ✅ 앱 아이콘 생성 (512×512 PNG)
3. ✅ Bubblewrap CLI 설치
4. ✅ TWA Manifest 생성

### ⚠️ 사용자 직접 수행 필요
1. **포털 등록** (5분):
   - Google Search Console 사이트맵 제출
   - Naver Search Advisor 사이트맵 제출
   - Daum URL 등록

2. **Android 앱 생성** (30분):
   - 로컬 머신에서 Bubblewrap 실행 또는
   - PWA Builder 사용 (더 간단)

3. **Digital Asset Links** (5분):
   - SHA256 지문 추출
   - assetlinks.json 업데이트
   - 재배포

4. **Google Play Console** (1-2시간):
   - 개발자 계정 생성 ($25)
   - 앱 만들기 및 콘텐츠 설정
   - 개인정보처리방침 페이지 생성
   - 스크린샷 촬영
   - APK 업로드
   - 검토 제출

---

## 🔗 유용한 링크

**개발 도구**:
- Bubblewrap CLI: https://github.com/GoogleChromeLabs/bubblewrap
- PWA Builder: https://www.pwabuilder.com/
- 아이콘 생성기: https://www.pwabuilder.com/imageGenerator

**콘솔**:
- Google Play Console: https://play.google.com/console
- Google Search Console: https://search.google.com/search-console
- Naver Search Advisor: https://searchadvisor.naver.com
- Daum 검색 등록: https://register.search.daum.net/index.daum

**배포 정보**:
- 프로덕션 사이트: https://dagong-bi1.pages.dev
- 앱 아이콘: https://dagong-bi1.pages.dev/static/icons/icon-512x512.png
- PWA Manifest: https://dagong-bi1.pages.dev/manifest.json
- Digital Asset Links: https://dagong-bi1.pages.dev/.well-known/assetlinks.json

---

**문서 작성일**: 2026-02-19  
**마지막 업데이트**: 2026-02-19  
**예상 소요 시간**: 2-3시간 (검토 기간 제외)  
**총 비용**: $25 USD (Google Play Developer 계정)
