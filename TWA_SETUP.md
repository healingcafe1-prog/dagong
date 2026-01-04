# TWA (Trusted Web Activity) 설정 가이드

## 1. Bubblewrap CLI 설치 및 프로젝트 생성

### 사전 준비
```bash
# Node.js 설치 확인
node --version  # v18 이상 필요

# Java JDK 설치 확인
java -version   # JDK 11 이상 필요
```

### Bubblewrap 설치
```bash
# NPM으로 Bubblewrap 글로벌 설치
npm install -g @bubblewrap/cli

# 설치 확인
bubblewrap --version
```

### TWA 프로젝트 초기화
```bash
# 새 디렉토리 생성
mkdir chadirect-android
cd chadirect-android

# Bubblewrap 초기화 (대화형)
bubblewrap init --manifest=https://chadirect.kr/manifest.json
```

### 대화형 질문 답변 가이드
```
? Domain being opened in the TWA: 
  → chadirect.kr

? Name of the application: 
  → 차다이렉트

? Short name for the application (max 12 characters): 
  → 차다이렉트

? Application ID (domain in reverse order): 
  → kr.chadirect.twa

? Minimum API level: 
  → 19 (기본값, Android 4.4+)

? Start URL: 
  → /

? Theme color: 
  → #7c9473

? Background color: 
  → #f5f1e8

? Icon URL: 
  → https://chadirect.kr/static/icons/icon-512x512.png

? Maskable Icon URL (optional): 
  → https://chadirect.kr/static/icons/icon-512x512.png

? Splash screen fade out duration: 
  → 300 (기본값)

? Enable notifications: 
  → Yes

? Shortcuts (optional): 
  → (Enter 건너뛰기)

? Include app shortcuts: 
  → No
```

### 생성된 파일 구조
```
chadirect-android/
├── twa-manifest.json      # TWA 설정 파일
├── android/              # 안드로이드 프로젝트
│   ├── app/
│   │   └── build.gradle
│   ├── build.gradle
│   └── gradle/
├── store_icon.png        # 앱 아이콘 (512x512)
└── README.md
```

---

## 2. Digital Asset Links 설정 (중요!)

Digital Asset Links는 웹사이트와 안드로이드 앱 간 신뢰 관계를 증명합니다.

### SHA-256 인증서 지문 생성
```bash
# 키스토어 생성 (처음만)
keytool -genkey -v -keystore android.keystore \
  -alias chadirect-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# 입력 정보 예시:
# 이름: 차다이렉트
# 조직: 차다이렉트
# 도시: Seoul
# 시/도: Seoul
# 국가코드: KR
# 비밀번호: (안전하게 보관!)

# SHA-256 지문 추출
keytool -list -v -keystore android.keystore \
  -alias chadirect-key | grep SHA256

# 출력 예시:
# SHA256: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:...
```

### assetlinks.json 생성

아래 내용으로 웹사이트에 파일 추가:

**파일 위치:** `public/.well-known/assetlinks.json`

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "kr.chadirect.twa",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:..."
    ]
  }
}]
```

**중요:** SHA-256 지문을 실제 값으로 교체!

### 웹사이트에 배포
```bash
# 1. public/.well-known/ 디렉토리 생성
mkdir -p /home/user/webapp/public/.well-known/

# 2. assetlinks.json 파일 생성 (위 내용으로)
# 3. 빌드 및 배포
cd /home/user/webapp
npm run build
npx wrangler pages deploy dist --project-name chadirect-kr

# 4. 확인
curl https://chadirect.kr/.well-known/assetlinks.json
```

---

## 3. APK/AAB 빌드

### Debug 빌드 (테스트용)
```bash
cd chadirect-android

# Debug APK 생성
bubblewrap build

# 출력 파일:
# → android/app/build/outputs/apk/debug/app-debug.apk
```

### Release 빌드 (배포용)
```bash
# twa-manifest.json에 키스토어 정보 추가
cat > twa-manifest.json << 'EOF'
{
  "host": "chadirect.kr",
  "name": "차다이렉트",
  "packageId": "kr.chadirect.twa",
  "signingKey": {
    "path": "../android.keystore",
    "alias": "chadirect-key"
  },
  ...
}
EOF

# Release AAB 빌드 (Play Store 업로드용)
bubblewrap build --release

# 키스토어 비밀번호 입력 (2회)
# 출력 파일:
# → android/app/build/outputs/bundle/release/app-release.aab
```

---

## 4. 로컬 테스트

### 에뮬레이터 테스트
```bash
# Android Studio에서 에뮬레이터 실행 후
adb install android/app/build/outputs/apk/debug/app-debug.apk

# 또는 Bubblewrap 명령어
bubblewrap install
```

### 실제 기기 테스트
```bash
# USB 디버깅 활성화 후
# 기기 연결 확인
adb devices

# APK 설치
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 5. Play Store 배포 자료 준비

### 필수 이미지 자산

1. **앱 아이콘** (512x512 PNG)
   - ✅ 이미 있음: `/static/icons/icon-512x512.png`

2. **Feature Graphic** (1024x500 JPG/PNG)
   - Play Store 상단 배너
   - 생성 필요

3. **스크린샷** (최소 2개)
   - 휴대폰: 320-3840px (16:9 또는 9:16)
   - 태블릿: 1024-3840px
   - ✅ 이미 있음: `/static/screenshots/screenshot-mobile.png`

### Feature Graphic 생성

Canva 또는 Figma 사용:
```
크기: 1024 x 500 px
내용: 
  - 앱 로고
  - 슬로건: "한국 차 문화, 우리가 함께 쓰는 새로운 문화 혁명"
  - 배경: #7c9473 (차공예 그린)
  - 텍스트: 흰색
```

### 스크린샷 추가 촬영
```bash
# 주요 화면 스크린샷:
1. 홈 화면
2. 상품 목록
3. 상품 상세
4. 장바구니
5. 주문서
6. 마이페이지
```

---

## 6. Play Console 앱 등록

### 앱 생성
1. https://play.google.com/console 접속
2. **"앱 만들기"** 클릭
3. 정보 입력:
   - **앱 이름:** 차다이렉트
   - **기본 언어:** 한국어 (대한민국)
   - **앱 또는 게임:** 앱
   - **무료 또는 유료:** 무료

### 앱 콘텐츠 설정

#### 개인정보처리방침 URL
```
https://chadirect.kr/privacy-policy
```
(별도 페이지 생성 필요)

#### 앱 액세스 권한
```
이 앱의 모든 기능은 특별한 액세스 없이 사용 가능합니다.
```

#### 광고
```
아니요, 제 앱에는 광고가 없습니다
```

#### 콘텐츠 등급
- 설문 작성 (쇼핑 앱)
- 예상 등급: **전체 이용가**

#### 타겟층 및 콘텐츠
- **타겟층:** 만 18세 이상
- **스토어 게시 위치:** 모든 국가

### 스토어 등록정보

#### 짧은 설명 (80자 이내)
```
한국 차와 공예를 생산자와 직접 거래하는 문화 플랫폼
```

#### 전체 설명 (4000자 이내)
```
차다이렉트 - 한국 차 문화, 우리가 함께 쓰는 새로운 문화 혁명

🍵 생산자와 소비자를 직접 연결하는 신뢰의 플랫폼

차다이렉트는 한국 전통 차와 공예품을 생산자와 직접 거래할 수 있는 
문화 플랫폼입니다. 중간 유통 과정을 없애 합리적인 가격으로 
고품질의 한국 차와 공예품을 만날 수 있습니다.

✨ 주요 기능

• 차 직거래: 전국 8개 차산지의 프리미엄 차
• 공예품: 7개 공예산지의 전통 공예품
• 체험 예약: 다도 체험, 차 만들기, 공예 체험
• 커리큘럼: 차 공부, 공예 공부, 다도 교육
• 직거래 혜택: 평균 30% 할인된 가격
• 안전한 결제: 다양한 결제 수단 지원
• 배송 추적: 실시간 주문/배송 조회

🌱 왜 차다이렉트인가요?

• 생산자 직거래로 합리적인 가격
• 신선한 차와 정성 가득한 공예품
• 한국 전통 문화 보존에 기여
• 투명한 거래, 신뢰할 수 있는 플랫폼
• 전국 배송, 3,000원~ (3만원 이상 무료)

📍 지역별 특산품

차산지: 보성, 하동, 제주, 강진, 구례, 남원, 순천, 장흥
공예산지: 이천, 여주, 담양, 통영, 안동, 전주, 경주

💚 함께 만드는 한국 차 문화

당신의 선택이 한국 차 문화를 살립니다.
생산자와 소비자가 함께 쓰는 새로운 역사에 동참하세요.

지금 바로 차다이렉트에서 한국의 차와 공예를 만나보세요!
```

#### 그래픽 자산 업로드
- 앱 아이콘 (512x512)
- Feature Graphic (1024x500)
- 휴대폰 스크린샷 (최소 2개)
- 7인치 태블릿 스크린샷 (선택)
- 10인치 태블릿 스크린샷 (선택)

---

## 7. AAB 업로드 및 출시

### 프로덕션 트랙 생성
```
1. Play Console → 왼쪽 메뉴 → "프로덕션"
2. "새 버전 만들기" 클릭
3. AAB 업로드:
   → android/app/build/outputs/bundle/release/app-release.aab
4. 버전 이름: 1.0.0
5. 버전 정보:
   "첫 번째 공식 출시 버전"
```

### 출시 검토 및 제출
```
1. 모든 정보 입력 확인
2. "검토 및 출시" 클릭
3. Play Store 심사 대기 (평균 1-3일)
```

---

## 8. 심사 및 출시

### 예상 일정
- **업로드 → 검토:** 즉시
- **검토 → 승인:** 1-3일 (평균 1일)
- **승인 → 출시:** 즉시

### 심사 거부 가능 사유
1. ❌ Digital Asset Links 미설정
2. ❌ 개인정보처리방침 누락
3. ❌ 스토어 등록정보 불완전
4. ❌ 스크린샷 품질 낮음
5. ❌ 앱 충돌/버그

### 승인 후
```
✅ Play Store에서 검색 가능
✅ 전 세계 사용자 다운로드 가능
✅ 자동 업데이트 (웹사이트 업데이트 시)
```

---

## 9. 유지보수

### 웹사이트 업데이트 시
```bash
# 웹사이트만 배포하면 앱도 자동 업데이트!
cd /home/user/webapp
npm run build
npx wrangler pages deploy dist
```

### 앱 업데이트가 필요한 경우
- 패키지명 변경
- 권한 추가
- 앱 아이콘 변경
- Manifest 수정

```bash
cd chadirect-android
# twa-manifest.json 수정
bubblewrap update

# 버전 코드 증가 (자동)
bubblewrap build --release

# Play Console에서 새 버전 업로드
```

---

## 10. 체크리스트

### 배포 전 확인사항
- [ ] Google Play Console 계정 생성 ($25)
- [ ] 웹사이트 HTTPS 배포 완료
- [ ] assetlinks.json 배포 및 확인
- [ ] 키스토어 생성 및 안전 보관
- [ ] AAB 파일 빌드 성공
- [ ] Feature Graphic 제작 (1024x500)
- [ ] 스크린샷 준비 (최소 2개)
- [ ] 개인정보처리방침 페이지 작성
- [ ] 앱 설명 작성 완료
- [ ] 로컬 테스트 완료

### 배포 후 확인사항
- [ ] Play Store에서 앱 검색 가능
- [ ] 다운로드 및 설치 정상
- [ ] 모든 기능 작동 확인
- [ ] Digital Asset Links 연결 확인
- [ ] 주소창 숨김 확인 (풀스크린)

---

## 📞 문제 해결

### Digital Asset Links 오류
```bash
# 1. assetlinks.json 접근 가능 확인
curl https://chadirect.kr/.well-known/assetlinks.json

# 2. SHA-256 지문 재확인
keytool -list -v -keystore android.keystore -alias chadirect-key

# 3. Google 검증 도구
# https://digitalassetlinks.googleapis.com/v1/statements:list?
#   source.web.site=https://chadirect.kr&
#   relation=delegate_permission/common.handle_all_urls
```

### 빌드 오류
```bash
# Gradle 캐시 삭제
cd chadirect-android/android
./gradlew clean

# 재빌드
cd ..
bubblewrap build
```

### 키스토어 분실 시
⚠️ **백업 필수!** 분실 시 앱 업데이트 불가능
→ 새 패키지명으로 재등록 필요

---

## 🎉 완료!

이제 **차다이렉트** 앱이 Google Play Store에서 다운로드 가능합니다!

```
📱 Play Store 링크:
https://play.google.com/store/apps/details?id=kr.chadirect.twa
```

---

## 📚 참고 자료

- Bubblewrap 문서: https://github.com/GoogleChromeLabs/bubblewrap
- TWA 가이드: https://developer.chrome.com/docs/android/trusted-web-activity/
- Play Console: https://play.google.com/console
- Digital Asset Links: https://developers.google.com/digital-asset-links
