# 🚀 Google Play Store 빠른 등록 가이드

## ⏱️ 목표: 오늘 안에 제출 완료하기!

---

## 📋 체크리스트 (3시간 안에 완료 가능)

### ✅ 이미 준비된 것들 (샌드박스에서 완료)

- [x] PWA 웹사이트 배포: https://dagong-bi1.pages.dev/
- [x] PWA Manifest: https://dagong-bi1.pages.dev/manifest.json
- [x] Service Worker: https://dagong-bi1.pages.dev/sw.js
- [x] 앱 아이콘 (512×512): https://dagong-bi1.pages.dev/static/icons/icon-512x512.png
- [x] Asset Links: https://dagong-bi1.pages.dev/.well-known/assetlinks.json
- [x] TWA Manifest: `/home/user/webapp/android-twa/twa-manifest.json`
- [x] JDK 17 설치 완료

### ⚠️ 사용자가 해야 할 작업 (로컬 머신)

- [ ] 1단계: APK/AAB 빌드 (1시간)
- [ ] 2단계: Google Play 개발자 계정 생성 (10분)
- [ ] 3단계: 스크린샷 준비 (30분)
- [ ] 4단계: 스토어 페이지 작성 (1시간)
- [ ] 5단계: AAB 업로드 및 제출 (30분)

---

## 🏃 빠른 시작 (Step-by-Step)

### 1단계: APK/AAB 빌드 (1시간) ⏱️

#### A. 프로젝트 다운로드

**옵션 1: GitHub에서 클론 (추천)**
```bash
git clone https://github.com/YOUR_USERNAME/webapp.git
cd webapp/android-twa
```

**옵션 2: 파일 직접 다운로드**
- 샌드박스에서 `/home/user/webapp/android-twa/` 폴더 전체 다운로드
- `twa-manifest.json` 파일 확인

#### B. Bubblewrap 설치
```bash
# Node.js 18+ 필요
node --version  # v18 이상 확인

# Bubblewrap CLI 설치
npm install -g @bubblewrap/cli

# 버전 확인
npx @bubblewrap/cli --version
```

#### C. AAB 빌드 (Google Play 배포용)
```bash
cd android-twa

# AAB 빌드 (Play Store용)
npx @bubblewrap/cli build --bundleMode

# 질문에 답변:
# "Do you want Bubblewrap to install the Android SDK?" → Yes
# "Do you agree to the Android SDK terms?" → Yes
# 키스토어 비밀번호 설정 (안전하게 보관!)
```

#### D. 빌드 결과 확인
```bash
ls -lh android-twa/

# 결과 파일:
# ✅ app-release-bundle.aab  (Play Store 업로드용)
# ✅ android.keystore         (키스토어 백업 필수!)
```

**⚠️ 중요: 키스토어 백업!**
```bash
# 키스토어를 안전한 곳에 백업
cp android-twa/android.keystore ~/safe-backup/dagong-keystore.jks

# 또는 Google Drive, Dropbox 등에 백업
```

---

### 2단계: Google Play 개발자 계정 생성 (10분) ⏱️

#### A. 계정 생성
1. **Play Console 접속**: https://play.google.com/console
2. **로그인**: Google 계정으로 로그인
3. **개발자 계정 생성** 클릭
4. **$25 결제** (평생 유효)
5. **개발자 정보 입력**:
   - 개발자 이름: (원하는 이름)
   - 이메일: (연락 가능한 이메일)
   - 웹사이트: https://dagong-bi1.pages.dev/

#### B. 앱 생성
1. **"Create app"** 클릭
2. 앱 정보 입력:
   - **앱 이름**: 다공(茶工)
   - **기본 언어**: 한국어
   - **앱 유형**: 앱
   - **무료/유료**: 무료

---

### 3단계: 스크린샷 준비 (30분) ⏱️

#### A. 먼저 PWA로 앱 설치
Android 폰에서:
1. Chrome 브라우저 열기
2. https://dagong-bi1.pages.dev/ 접속
3. 주소창 오른쪽 **"설치"** 클릭
4. 홈 화면에 앱 추가됨

#### B. 스크린샷 촬영 (최소 2개, 최대 8개)

**필수 스크린샷** (1080×1920 이상):
1. 📱 **홈 화면**: 메인 페이지
2. 📱 **상품 목록**: 차 제품 또는 공예품 목록
3. 📱 **상품 상세**: 개별 상품 상세 페이지
4. 📱 **지역 목록**: 지역별 상품 페이지

**촬영 방법**:
```
1. PWA 앱 실행
2. 각 화면에서 스크린샷 촬영 (전원 + 볼륨다운)
3. PC로 이미지 전송
4. 해상도 확인: 1080×1920 이상
```

#### C. 기능 그래픽 (선택사항)

**크기**: 1024×500 PNG

온라인 도구 사용:
- Canva: https://www.canva.com/
- Figma: https://www.figma.com/

**템플릿**:
```
배경: #7c9473 (앱 테마색)
제목: "다공(茶工)" (큰 폰트)
부제목: "차와 공예의 직거래 플랫폼"
이미지: 차 또는 찻잔 이미지
```

---

### 4단계: 스토어 페이지 작성 (1시간) ⏱️

#### A. 기본 정보

**앱 이름** (최대 50자):
```
다공(茶工) - 차와 공예 직거래
```

**짧은 설명** (최대 80자):
```
한국 전통 차와 공예품을 생산자에게 직접 구매하세요
```

**전체 설명** (최대 4000자):
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
• 생산자 정보 및 연락처 제공
• 지역별 특산품 탐색
• 투명한 가격과 품질 보장

🎓 문화 체험:
• 차 체험 프로그램
• 다도 교육 신청
• 공예 체험 워크숍

다공(茶工)과 함께 한국의 전통 차 문화를 경험해보세요!
```

#### B. 그래픽 자산

**앱 아이콘** (512×512):
- 파일: `/home/user/webapp/public/static/icons/icon-512x512.png`
- 다운로드: https://dagong-bi1.pages.dev/static/icons/icon-512x512.png

**스크린샷** (최소 2개):
- 3단계에서 촬영한 스크린샷 업로드

**기능 그래픽** (1024×500) - 선택사항:
- 3단계에서 제작한 이미지 업로드

#### C. 앱 카테고리

- **카테고리**: 쇼핑
- **태그**: 차, 공예, 직거래, 전통, 한국

#### D. 연락처 정보

- **이메일**: (앱 문의용 이메일)
- **웹사이트**: https://dagong-bi1.pages.dev/
- **개인정보처리방침 URL**: https://dagong-bi1.pages.dev/privacy

**⚠️ 개인정보처리방침 페이지 필요**

간단한 개인정보처리방침 페이지를 생성해야 합니다:
```
웹사이트에 /privacy 페이지 추가 필요
또는 외부 개인정보처리방침 생성 도구 사용
```

#### E. 콘텐츠 등급

1. **설문지 작성** 클릭
2. 질문에 답변:
   - 폭력: 없음
   - 성적 콘텐츠: 없음
   - 언어: 없음
   - 도박: 없음
   - 마약/알코올: 없음
3. **결과**: 만 3세 이상 (모든 연령)

---

### 5단계: AAB 업로드 및 제출 (30분) ⏱️

#### A. 프로덕션 트랙 선택
1. Play Console → **프로덕션** 클릭
2. **새 출시 만들기** 클릭

#### B. AAB 업로드
1. **Android App Bundle 업로드** 클릭
2. `app-release-bundle.aab` 파일 선택
3. 업로드 완료 대기

#### C. 출시 정보 입력

**출시 이름**:
```
1.0.0 - 초기 출시
```

**출시 노트** (한국어):
```
🎉 다공(茶工) 첫 출시!

• 전통 차와 공예품 직거래 플랫폼
• 전국 17개 지역 상품 등록
• 생산자 직거래로 합리적인 가격
• 체험 프로그램 신청 기능
```

#### D. 검토 제출
1. 모든 필수 항목 완료 확인
2. **검토용 제출** 버튼 클릭
3. 확인 팝업에서 **제출** 클릭

---

## ✅ 제출 후

### 이메일 알림
Google에서 다음 이메일을 보냅니다:
1. ✅ "앱이 검토 중입니다"
2. ⏳ 검토 진행 중... (1-7일)
3. ✅ "앱이 승인되었습니다" 또는 ❌ "추가 정보 필요"

### 검토 상태 확인
- Play Console → 대시보드에서 상태 확인
- 평균 3-5일 소요
- 빠르면 1-2일 안에 승인

---

## 🚨 자주 발생하는 문제

### 1. "개인정보처리방침 URL이 필요합니다"

**해결**:
웹사이트에 개인정보처리방침 페이지 추가:
```
https://dagong-bi1.pages.dev/privacy
```

간단한 템플릿:
```html
개인정보처리방침

다공(茶工)은 사용자의 개인정보를 수집하지 않습니다.
본 앱은 웹사이트를 래핑한 형태로, 쿠키 및 로컬 스토리지만 사용합니다.

문의: your-email@example.com
```

### 2. "assetlinks.json 검증 실패"

**해결**:
```bash
# SHA-256 지문 추출
keytool -list -v -keystore android.keystore -alias android

# 출력에서 SHA256 복사:
# SHA256: AA:BB:CC:...

# assetlinks.json 업데이트 필요
```

### 3. "스크린샷 해상도 부족"

**해결**:
- 최소: 1080×1920
- 권장: 1440×2560 이상
- 고품질 PNG 또는 JPEG

---

## 📞 문제 발생 시

### Google Play 지원
- Help Center: https://support.google.com/googleplay/android-developer

### 커뮤니티
- Stack Overflow: https://stackoverflow.com/questions/tagged/google-play
- Reddit: r/androiddev

---

## 🎯 타임라인 요약

| 시간 | 작업 |
|------|------|
| **오늘 14:00-15:00** | APK/AAB 빌드 |
| **오늘 15:00-15:30** | Play 계정 생성 + 스크린샷 |
| **오늘 15:30-16:30** | 스토어 페이지 작성 |
| **오늘 16:30-17:00** | AAB 업로드 및 제출 |
| **오늘 17:00** | ✅ 제출 완료! |
| **3-7일 후** | ✅ 승인 및 Play Store 게시 |

---

## 🎉 예상 결과

**제출**: 오늘 저녁 (2월 19일)  
**승인**: 2월 22-26일  
**다운로드 가능**: 2월 22-26일

---

**파일 위치**:
- TWA Manifest: `/home/user/webapp/android-twa/twa-manifest.json`
- 앱 아이콘: `https://dagong-bi1.pages.dev/static/icons/icon-512x512.png`
- 웹사이트: `https://dagong-bi1.pages.dev/`

**준비 완료!** 이제 로컬 머신에서 위 단계를 따라 진행하시면 됩니다! 🚀
