# Android 앱 등록 간편 가이드 📱

## 🎯 개요

**다공(茶工)** 웹사이트를 Android 앱으로 Google Play Store에 등록하는 **5단계 완벽 가이드**입니다.

**예상 소요 시간**: 총 2-3시간
- 앱 생성: 30분
- 아이콘/스크린샷: 30분
- Play Console 설정: 1-2시간
- 검토 기간: 1-7일

---

## 📋 사전 준비물

### ✅ 이미 완료된 항목
- [x] PWA 구현 (`manifest.json`, `service-worker.js`)
- [x] HTTPS 사이트 (`https://dagong-bi1.pages.dev`)
- [x] Digital Asset Links 엔드포인트
- [x] Google/Naver 검증 파일

### ⚠️ 준비 필요
- [ ] **Google Play Developer 계정** ($25 일회성)
- [ ] **앱 아이콘 PNG** (512×512)
- [ ] **스크린샷** (최소 2개, 권장 4-8개)
- [ ] **개인정보처리방침 페이지**

---

## 🚀 5단계 등록 프로세스

### **1단계: Bubblewrap CLI 설치 및 프로젝트 생성** (10분)

```bash
# 1. Bubblewrap CLI 설치
npm install -g @bubblewrap/cli

# 2. 프로젝트 디렉토리 생성
cd /home/user/webapp
mkdir android-twa
cd android-twa

# 3. TWA 프로젝트 초기화
bubblewrap init --manifest https://dagong-bi1.pages.dev/manifest.json
```

**대화형 질문 답변**:
```
? Domain: dagong-bi1.pages.dev
? Package ID: kr.co.dagong
? App Name: 다공
? Short Name: 다공
? Display Mode: standalone
? Status Bar Color: #7c9473
? Navigation Bar Color: #7c9473
? Splash Color: #f5f1e8
? Enable Notifications: Yes
```

### **2단계: APK 빌드 및 SHA256 추출** (5분)

```bash
# 1. APK 빌드
bubblewrap build

# 출력 파일: app-release-signed.apk

# 2. SHA256 지문 추출
keytool -list -v -keystore android.keystore \
  -alias android -storepass android -keypass android | grep "SHA256"

# 예시 출력:
# SHA256: AB:CD:EF:12:34:56:78:90:...:12:34:56:78:90

# 이 SHA256 지문을 복사하세요! (3단계에서 사용)
```

### **3단계: Digital Asset Links 업데이트** (5분)

```bash
# 1. src/index.tsx 파일 수정
cd /home/user/webapp
nano src/index.tsx

# 2. 아래 부분 찾아서 수정:
```

```typescript
// Digital Asset Links for Android TWA
app.get('/.well-known/assetlinks.json', (c) => {
  return c.json([{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'kr.co.dagong',
      sha256_cert_fingerprints: [
        'AB:CD:EF:12:34:56:78:90:...:12:34:56:78:90'  // ← 2단계에서 복사한 SHA256 입력
      ]
    }
  }])
})
```

```bash
# 3. 빌드 및 배포
npm run build
npm run deploy

# 4. 검증
curl https://dagong-bi1.pages.dev/.well-known/assetlinks.json
```

### **4단계: 필수 리소스 준비** (30-60분)

#### **4-1. 앱 아이콘 생성** (⚠️ 필수)

**현재 상태**: SVG 임시 아이콘만 있음 → **PNG 생성 필요**

**방법 A: 온라인 도구 사용** (가장 간단)
```
1. https://www.pwabuilder.com/imageGenerator 접속
2. 512×512 이미지 업로드
3. 모든 크기 자동 생성 (72, 96, 128, 144, 192, 384, 512)
4. 다운로드 후 /public/static/icons/ 폴더에 저장
```

**방법 B: ImageMagick 사용**
```bash
convert -size 512x512 xc:'#7c9473' \
  -font Arial-Bold -pointsize 280 -fill white \
  -gravity center -annotate +0+0 '茶' \
  icon-512x512.png
```

**필수 크기**: 512×512 PNG (32비트)

#### **4-2. 스크린샷 촬영** (⚠️ 필수)

**필수**: 최소 2개 (권장 4-8개)  
**크기**: 1080×1920 ~ 1440×2560

**촬영 방법**:
```bash
# Chrome DevTools 사용
1. F12 → Toggle device toolbar (Ctrl+Shift+M)
2. 기기: Pixel 5 (1080×2340)
3. https://dagong-bi1.pages.dev 접속
4. Ctrl+Shift+P → "Capture screenshot"

# 필요한 페이지:
- 홈페이지
- 차 직거래 페이지
- 상품 상세 페이지
- 장바구니 페이지
```

#### **4-3. 개인정보처리방침 페이지** (⚠️ 필수)

**URL**: `https://dagong-bi1.pages.dev/privacy`

**최소 포함 사항**:
- 수집하는 개인정보 항목
- 개인정보 사용 목적
- 개인정보 보유 기간
- 개인정보 제3자 제공
- 이용자 권리

### **5단계: Google Play Console 등록** (1-2시간)

#### **5-1. 개발자 계정 생성**

```
URL: https://play.google.com/console

1. Google 계정으로 로그인
2. "계정 만들기" 클릭
3. $25 일회성 등록비 결제
4. 개발자 정보 입력
```

#### **5-2. 앱 만들기**

```
1. "모든 앱" > "앱 만들기" 클릭
2. 앱 세부정보:
   - 앱 이름: 다공(茶工) - 차와 공예의 직거래 플랫폼
   - 기본 언어: 한국어 (대한민국)
   - 앱 또는 게임: 앱
   - 무료 또는 유료: 무료
3. 선언 체크:
   ✅ 개발자 프로그램 정책 준수
   ✅ 미국 수출법 준수
4. "앱 만들기" 클릭
```

#### **5-3. 앱 콘텐츠 설정**

**필수 항목 체크리스트**:

- [ ] **앱 액세스 권한**: 모든 사용자가 접근 가능
- [ ] **광고**: 광고 없음
- [ ] **콘텐츠 등급**: 만 3세 이상
- [ ] **타겟층**: 만 18세 이상 (어린이 대상 아님)
- [ ] **개인정보처리방침**: `https://dagong-bi1.pages.dev/privacy`
- [ ] **데이터 보안**:
  - 수집 데이터: 이메일, 이름, 전화번호, 주소
  - 사용 목적: 계정 관리, 주문 처리
  - 암호화: 전송 중 암호화됨

#### **5-4. 스토어 등록정보 작성**

**기본 정보**:
```
앱 이름: 다공(茶工)

짧은 설명 (80자):
전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진 없이 합리적 가격으로 구매하세요.

전체 설명 (4000자):
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

**그래픽 리소스 업로드**:
- [ ] 앱 아이콘: `icon-512x512.png`
- [ ] 스크린샷: 최소 2개 (1080×1920)
- [ ] 기능 그래픽: 1024×500 (선택)

#### **5-5. APK/AAB 업로드**

```
1. "출시" > "프로덕션" 클릭
2. "새 출시 만들기" 클릭
3. APK/AAB 업로드:
   - app-release-signed.apk (테스트용)
   - 또는 app-release-bundle.aab (프로덕션용)
4. 출시 이름: v1.0.0 (초기 출시)
5. 출시 노트 작성 (한국어/영어)
6. 국가/지역: 대한민국
```

#### **5-6. 내부 테스트** (권장)

```
1. "출시" > "내부 테스트"
2. 테스터 이메일 추가
3. APK/AAB 업로드
4. "출시" 클릭
5. 테스터에게 테스트 링크 전송
6. 최소 테스트 기간: 14일
```

#### **5-7. 검토 제출**

```
1. 모든 필수 항목 완료 확인
2. "검토용으로 제출" 클릭
3. 검토 기간: 일반적으로 1-7일
4. 이메일로 검토 결과 수신
```

---

## ✅ 최종 체크리스트

### **웹사이트 준비**
- [x] HTTPS 사이트
- [x] PWA manifest.json
- [x] Service Worker
- [x] Digital Asset Links 엔드포인트
- [ ] assetlinks.json (SHA256 지문 입력 필요)
- [ ] 개인정보처리방침 페이지

### **Android 앱 준비**
- [ ] Bubblewrap CLI 설치
- [ ] TWA 프로젝트 생성
- [ ] APK 빌드
- [ ] SHA256 지문 추출 및 적용
- [ ] 실기기 테스트

### **리소스 준비**
- [ ] 앱 아이콘 PNG (512×512)
- [ ] 스크린샷 (최소 2개)
- [ ] 개인정보처리방침 URL
- [ ] 이용약관 URL (선택)

### **Google Play Console**
- [ ] 개발자 계정 생성 ($25)
- [ ] 앱 만들기
- [ ] 앱 콘텐츠 설정
- [ ] 스토어 등록정보 작성
- [ ] APK/AAB 업로드
- [ ] 검토 제출

---

## 💡 자주 묻는 질문

### **Q1: 비용이 얼마나 드나요?**
- **Google Play Developer 계정**: $25 (일회성, 평생)
- **개발 비용**: $0 (Bubblewrap CLI 무료)
- **총 비용**: **$25 USD**

### **Q2: 앱을 업데이트하려면?**
- 웹사이트만 업데이트하면 앱도 자동 업데이트됨
- APK 재업로드는 manifest.json 변경 시에만 필요

### **Q3: 검토 시간은 얼마나 걸리나요?**
- **일반적**: 1-3일
- **최대**: 7일
- **긴급**: 우선 검토 요청 가능 (특별한 경우)

### **Q4: 앱이 브라우저로 열려요**
- assetlinks.json의 SHA256 지문이 올바른지 확인
- package name이 일치하는지 확인
- 24시간 후 다시 시도 (Google 캐시 업데이트)

### **Q5: 커스텀 도메인 적용 후 변경사항은?**
- **현재 URL**: `dagong-bi1.pages.dev`
- **커스텀 도메인 적용 후**: `dagong.co.kr`
- **필요 작업**:
  1. TWA 프로젝트에서 도메인 변경
  2. APK 재빌드
  3. Play Console에 새 버전 업로드

---

## 🔗 유용한 링크

### **개발 도구**
- **Bubblewrap CLI**: https://github.com/GoogleChromeLabs/bubblewrap
- **PWA Builder**: https://www.pwabuilder.com/
- **아이콘 생성기**: https://www.pwabuilder.com/imageGenerator

### **가이드 문서**
- **TWA 공식 가이드**: https://developer.chrome.com/docs/android/trusted-web-activity/
- **Play Console 도움말**: https://support.google.com/googleplay/android-developer/

### **배포 정보**
- **배포된 사이트**: https://dagong-bi1.pages.dev
- **PWA Manifest**: https://dagong-bi1.pages.dev/manifest.json
- **Digital Asset Links**: https://dagong-bi1.pages.dev/.well-known/assetlinks.json

### **등록 콘솔**
- **Google Play Console**: https://play.google.com/console
- **Play Console 계정 등록**: https://play.google.com/console/signup

---

## 📞 문제 해결

### **APK 빌드 실패**
```bash
# Java 버전 확인
java -version  # Java 11 이상 필요

# Android SDK 재설치
bubblewrap doctor

# 캐시 삭제 후 재빌드
rm -rf build/
bubblewrap build
```

### **Play Console 검토 거부**
**주요 거부 사유**:
1. 개인정보처리방침 없음 → 페이지 생성 필수
2. 스크린샷 불일치 → 실제 앱 화면과 동일하게
3. 앱 아이콘 오류 → 512×512 PNG 확인

### **assetlinks.json 오류**
```bash
# 1. URL 검증
curl https://dagong-bi1.pages.dev/.well-known/assetlinks.json

# 2. SHA256 지문 재확인
keytool -list -v -keystore android.keystore \
  -alias android -storepass android | grep SHA256

# 3. 코드 수정 후 재배포
npm run build
npm run deploy
```

---

**문서 작성일**: 2026-02-19  
**마지막 업데이트**: 2026-02-19  
**예상 소요 시간**: 2-3시간 (검토 기간 제외)  
**난이도**: ⭐⭐⭐☆☆ (중급)

---

## 📱 다음 단계

1. ✅ **사이트맵 문제 해결 완료**
2. ⏭️ **앱 아이콘 PNG 생성** (30분)
3. ⏭️ **Bubblewrap 프로젝트 생성** (10분)
4. ⏭️ **APK 빌드 및 SHA256 추출** (5분)
5. ⏭️ **Google Play Console 등록** (1-2시간)

**시작할 준비가 되셨나요? 첫 단계부터 함께 진행하겠습니다!** 🚀
