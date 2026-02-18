# 빠른 시작 가이드 (Quick Start)

## 🔍 포털 검색 등록 (5분)

### ✅ 현재 상태
- **Google**: 검증 파일 설치 완료 → Search Console에서 확인만 하면 됨
- **Naver**: 검증 파일 설치 완료 → Search Advisor에서 확인만 하면 됨  
- **Daum**: 등록 안 됨 → URL만 제출하면 됨

### 🚀 지금 바로 할 일

#### 1. Google (2분)
```
1. https://search.google.com/search-console 접속
2. 속성 추가 → https://dagong.co.kr 입력
3. "HTML 파일" 또는 "HTML 태그" 선택
4. "확인" 클릭 (파일/태그 이미 설치됨)
5. Sitemaps → https://dagong.co.kr/sitemap.xml 제출
```

#### 2. Naver (2분)
```
1. https://searchadvisor.naver.com 접속
2. 사이트 추가 → https://dagong.co.kr 입력
3. "HTML 파일" 또는 "메타태그" 선택
4. "소유확인" 클릭 (파일/태그 이미 설치됨)
5. 사이트맵 제출 → https://dagong.co.kr/sitemap.xml
```

#### 3. Daum (1분)
```
1. https://register.search.daum.net/index.daum 접속
2. URL: https://dagong.co.kr 입력
3. 제목: 다공 - 차와 공예의 직거래 플랫폼
4. 설명: 전통 차와 공예품 생산자 직거래 플랫폼
5. "등록" 클릭
```

**완료!** 1-7일 후 검색 노출 시작

---

## 📱 Android 앱 등록 (빠른 방법)

### 🎯 준비물
- [ ] Google Play Developer 계정 ($25, 1회)
- [ ] 앱 아이콘 512x512 PNG
- [ ] 스크린샷 2-4장

### 🛠️ 5단계로 끝내기

#### Step 1: Bubblewrap 설치 (1분)
```bash
npm install -g @bubblewrap/cli
```

#### Step 2: TWA 프로젝트 생성 (2분)
```bash
cd /home/user/webapp/android-twa
bubblewrap init --manifest https://dagong.co.kr/manifest.json
```

**질문 답변**:
```
Domain: dagong.co.kr
Package ID: kr.co.dagong
Name: 다공
Display: standalone
Status Bar: #059669
```

#### Step 3: APK 빌드 (3분)
```bash
bubblewrap build
```
→ `app-release-signed.apk` 생성됨

#### Step 4: SHA256 추출 및 웹사이트 업데이트 (5분)
```bash
# SHA256 추출
keytool -list -v -keystore android.keystore \
  -alias android -storepass android | grep "SHA256"

# 복사된 SHA256을 src/index.tsx의 assetlinks.json에 입력
# 웹사이트 재배포
cd /home/user/webapp
npm run build && npm run deploy
```

#### Step 5: Play Console 등록 (30분)
```
1. https://play.google.com/console
2. 앱 만들기 → 다공
3. APK 업로드
4. 스토어 정보 입력
5. 아이콘/스크린샷 업로드
6. 검토 제출
```

**완료!** 1-7일 후 앱 승인

---

## ⚠️ 중요 체크리스트

### 반드시 필요
- [ ] 앱 아이콘 PNG 생성 (512x512)
- [ ] 스크린샷 2장 이상
- [ ] 개인정보처리방침 페이지
- [ ] SHA256 지문 웹사이트 적용

### 권장 사항
- [ ] 내부 테스트 (14일)
- [ ] 기능 그래픽 (1024x500)
- [ ] 홍보 동영상

---

## 📞 빠른 도움말

**앱이 브라우저로 열림**  
→ assetlinks.json의 SHA256 확인

**빌드 실패**  
→ `bubblewrap doctor` 실행

**Play 검토 거부**  
→ 개인정보처리방침 페이지 확인

---

**상세 가이드**: `PORTAL_AND_ANDROID_GUIDE.md` 참고
