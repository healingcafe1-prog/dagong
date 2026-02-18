# 다공(茶工) - Android 앱 등록 준비 완료

## ✅ 완료된 작업

### 1️⃣ PWA (Progressive Web App) 구현 ✅
- ✅ `manifest.json` 생성 (웹 앱 메타데이터)
- ✅ `service-worker.js` 구현 (오프라인 캐싱, 푸시 알림)
- ✅ `pwa-init.js` 추가 (PWA 설치 프롬프트, 오프라인 감지)
- ✅ HTML `<head>`에 PWA 메타태그 추가
- ✅ Theme color 통일 (#059669)

### 2️⃣ Android TWA (Trusted Web Activity) 준비 ✅
- ✅ Digital Asset Links 엔드포인트 (`/.well-known/assetlinks.json`)
- ✅ Package name 설정: `kr.co.dagong`
- ✅ Manifest 엔드포인트 (`/manifest.json`)

### 3️⃣ 검색 엔진 등록 상태 ✅
- ✅ **Google**: 검증 메타태그 및 파일 존재
- ✅ **Naver**: 검증 메타태그 및 파일 존재
- ⚠️ **Daum (Kakao)**: 등록 필요 (https://register.search.daum.net/index.daum)

---

## 📱 Android 앱 등록 절차

### 단계별 가이드

#### 🔹 1단계: Bubblewrap CLI로 APK 생성 (가장 간단)

```bash
# Bubblewrap 설치
npm install -g @bubblewrap/cli

# TWA 프로젝트 초기화
bubblewrap init --manifest https://dagong.co.kr/manifest.json

# 대화형 질문 답변:
# - Domain: dagong.co.kr
# - Application ID: kr.co.dagong
# - Name: 다공
# - Display mode: standalone
# - Status bar color: #059669

# 앱 빌드 (APK 생성)
bubblewrap build

# 출력: app-release-signed.apk
```

#### 🔹 2단계: Digital Asset Links 설정

```bash
# 1. Keystore의 SHA256 지문 추출
keytool -list -v -keystore android.keystore -alias android -storepass android -keypass android | grep "SHA256"

# 2. 지문을 복사하여 웹사이트의 assetlinks.json에 추가
# 현재 엔드포인트: https://dagong.co.kr/.well-known/assetlinks.json
# (src/index.tsx에 이미 설정됨, SHA256 지문만 교체 필요)
```

**assetlinks.json 업데이트 필요:**
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "kr.co.dagong",
    "sha256_cert_fingerprints": [
      "실제_SHA256_지문을_여기에_입력"
    ]
  }
}]
```

#### 🔹 3단계: 앱 아이콘 준비

현재 상태:
- ⚠️ 임시 SVG 아이콘 생성됨 (`/public/static/icons/icon.svg`)
- ⚠️ PNG 아이콘 생성 필요

**아이콘 생성 방법:**
1. **온라인 도구**: https://www.pwabuilder.com/imageGenerator
2. **ImageMagick**: `android-app/ICON_GENERATION_GUIDE.md` 참고
3. **Node.js Script**: Sharp 라이브러리 사용

**필요한 아이콘 크기:**
- 72x72, 96x96, 128x128, 144x144, 152x152
- **192x192** (필수)
- 384x384
- **512x512** (필수)

#### 🔹 4단계: Google Play Console 등록

**사전 준비물:**
- [ ] Google Play Developer 계정 ($25 일회성 등록비)
- [ ] 서명된 APK 파일 (`app-release-signed.apk`)
- [ ] 앱 아이콘 512x512 PNG
- [ ] 스크린샷 최소 2장 (휴대폰용)
- [ ] 개인정보처리방침 URL (필요시 작성)
- [ ] 앱 설명문

**등록 절차:**
1. https://play.google.com/console 접속
2. "앱 만들기" 클릭
3. 앱 정보 입력:
   - 이름: **다공(茶工)**
   - 카테고리: **쇼핑**
   - 연락처 이메일: support@dagong.co.kr
4. APK 업로드 (내부 테스트 트랙)
5. 콘텐츠 등급 설정
6. 스토어 등록정보 작성
7. 가격 및 배포 국가 설정
8. 검토 제출

---

## 📂 생성된 파일 목록

```
/home/user/webapp/
├── public/
│   └── static/
│       ├── manifest.json           # PWA Manifest
│       ├── service-worker.js       # Service Worker (오프라인 캐싱)
│       ├── pwa-init.js             # PWA 초기화 스크립트
│       └── icons/
│           └── icon.svg            # 임시 SVG 아이콘 (PNG 변환 필요)
├── src/
│   ├── index.tsx                   # /.well-known/assetlinks.json 엔드포인트 추가
│   └── renderer.tsx                # PWA 메타태그 및 스크립트 추가
└── android-app/
    ├── README.md                   # Android 앱 준비 개요
    ├── ANDROID_TWA_GUIDE.md        # 상세 TWA 구현 가이드
    └── ICON_GENERATION_GUIDE.md    # 아이콘 생성 가이드
```

---

## 🚀 빠른 시작 (Quick Start)

### PWA 테스트 (현재 가능)
1. Chrome 브라우저에서 https://dagong.co.kr 접속
2. 주소창 오른쪽 "설치" 아이콘 클릭
3. 또는 설정 → "홈 화면에 추가"
4. 앱처럼 독립 실행

### Android APK 생성 (다음 단계)
```bash
# 1. Bubblewrap 설치 (한 번만)
npm install -g @bubblewrap/cli

# 2. TWA 프로젝트 생성
cd /home/user/webapp/android-app
bubblewrap init --manifest https://dagong.co.kr/manifest.json

# 3. APK 빌드
bubblewrap build
# 출력: app-release-signed.apk

# 4. SHA256 지문 확인
bubblewrap doctor

# 5. assetlinks.json 업데이트 (src/index.tsx 수정)
# 실제 SHA256 지문으로 교체 후 재배포

# 6. Google Play Console에 APK 업로드
```

---

## 📋 체크리스트

### PWA (이미 완료)
- [x] manifest.json 생성
- [x] service-worker.js 구현
- [x] PWA 초기화 스크립트 추가
- [x] HTML 메타태그 설정
- [x] 로컬 테스트 성공

### Android TWA (진행 필요)
- [ ] 앱 아이콘 PNG 생성 (192x192, 512x512 필수)
- [ ] Bubblewrap CLI 설치 및 초기화
- [ ] APK 빌드
- [ ] SHA256 지문 추출 및 assetlinks.json 업데이트
- [ ] 웹사이트 재배포
- [ ] APK 테스트 (실제 기기 또는 에뮬레이터)
- [ ] Google Play Developer 계정 생성
- [ ] 스크린샷 준비
- [ ] Play Console에 앱 등록
- [ ] 내부 테스트 (최소 14일)
- [ ] 프로덕션 출시

### 검색 엔진 등록
- [ ] Google Search Console 소유권 확인
- [ ] Naver Search Advisor 소유권 확인
- [ ] Daum 검색 등록

---

## 🔗 참고 자료

### 공식 문서
- **Bubblewrap CLI**: https://github.com/GoogleChromeLabs/bubblewrap
- **TWA 가이드**: https://developer.chrome.com/docs/android/trusted-web-activity/
- **Google Play Console**: https://play.google.com/console
- **PWA Builder**: https://www.pwabuilder.com/

### 검색 엔진 등록
- **Google Search Console**: https://search.google.com/search-console
- **Naver Search Advisor**: https://searchadvisor.naver.com
- **Daum 검색 등록**: https://register.search.daum.net/index.daum

### 도구
- **Icon Generator**: https://www.pwabuilder.com/imageGenerator
- **RealFaviconGenerator**: https://realfavicongenerator.net/
- **Maskable Icon Tester**: https://maskable.app/

---

## 💡 다음 단계 권장 순서

1. **앱 아이콘 생성** (가장 시급)
   - 512x512 마스터 이미지 준비
   - PWA Builder로 모든 크기 자동 생성
   - `/public/static/icons/` 디렉토리에 배치

2. **Bubblewrap으로 APK 생성**
   - 명령어 한 줄로 간단히 생성
   - 테스트 APK로 실기기에서 동작 확인

3. **Digital Asset Links 설정**
   - SHA256 지문 추출
   - assetlinks.json 업데이트
   - 웹사이트 재배포

4. **Google Play Console 등록**
   - 개발자 계정 생성
   - 앱 등록정보 작성
   - APK 업로드

5. **내부 테스트 및 출시**
   - 최소 14일 내부 테스트
   - 피드백 수집 및 개선
   - 프로덕션 출시

---

## 📞 지원

질문이나 문제가 있으면:
1. `android-app/ANDROID_TWA_GUIDE.md` 상세 가이드 참고
2. `android-app/ICON_GENERATION_GUIDE.md` 아이콘 생성 방법 참고
3. Bubblewrap 공식 문서: https://github.com/GoogleChromeLabs/bubblewrap

---

**마지막 업데이트**: 2026-02-18
