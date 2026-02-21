# 다공 사이트 검색엔진 & 플레이스토어 등록 현황

작성일: 2024-02-21

## 📊 현황 요약

| 구분 | 등록 상태 | 비고 |
|------|----------|------|
| **구글 검색** | ❌ 미등록 | 색인 필요 |
| **네이버 검색** | ❌ 미등록 | 등록 필요 |
| **다음 검색** | ❌ 미등록 | 등록 필요 |
| **Google Play Store** | ❌ 미등록 | 앱 없음 (PWA만 존재) |
| **Instagram** | ✅ 등록됨 | @korea_teacraft |

## 🌐 웹사이트 정보

### 프로덕션 URL
- **메인 사이트**: https://dagong-bi1.pages.dev
- **서브 도메인**: https://3000-i1cjrhuxghhqe7nryfah2-18e660f9.sandbox.gensparksite.com (개발용)

### 사이트 제목
**다공 - 차와 공예의 직거래 플랫폼**

### 주요 키워드
- 차 직거래
- 공예품 직거래
- 다도교육
- 명상교육
- 차 생산자
- 공예 작가
- 한국 차 문화
- 전통 공예

## 📝 검색엔진 등록 방법

### 1. 구글 검색 등록

**방법 A: Google Search Console (권장)**

1. Google Search Console 접속: https://search.google.com/search-console
2. 속성 추가 → URL 접두어 선택
3. `https://dagong-bi1.pages.dev` 입력
4. 소유권 확인:
   - HTML 파일 업로드 방식 또는
   - 메타 태그 추가 방식
   - 이미 `public/googleee4e97dad940b617.html` 파일 존재 확인 필요
5. 사이트맵 제출:
   - URL: `https://dagong-bi1.pages.dev/sitemap.xml`
   - 이미 `public/sitemap.xml` 파일 존재

**방법 B: URL 직접 제출**
- Google에 URL 직접 제출: https://www.google.com/ping?sitemap=https://dagong-bi1.pages.dev/sitemap.xml

**색인 시간**: 일반적으로 1~7일 소요

### 2. 네이버 검색 등록

**네이버 서치어드바이저 등록**

1. 네이버 서치어드바이저 접속: https://searchadvisor.naver.com
2. 웹마스터 도구 → 사이트 등록
3. `https://dagong-bi1.pages.dev` 입력
4. 소유권 확인:
   - HTML 파일 업로드 또는
   - 메타 태그 추가
   - 이미 `public/naverf3735d7a56c13e617b246ff2b6e0da46.html` 파일 존재 확인 필요
5. 사이트 검증 완료 후:
   - 사이트맵 제출: `/sitemap.xml`
   - RSS 제출 (선택사항)
   - 사이트 간단 설명 등록

**추가 작업**:
- 네이버 플레이스 등록 (오프라인 매장이 있는 경우)
- 네이버 블로그 운영하여 백링크 생성

**색인 시간**: 일반적으로 1~3일 소요

### 3. 다음 검색 등록

**다음 검색등록**

1. 다음 검색등록 페이지 접속: https://register.search.daum.net/index.daum
2. "사이트 등록" 선택
3. 사이트 정보 입력:
   - URL: `https://dagong-bi1.pages.dev`
   - 사이트명: 다공 - 차와 공예의 직거래 플랫폼
   - 카테고리: 쇼핑 > 전문몰 > 식품/농수산물
   - 설명: 차 생산자와 공예 작가가 소비자와 직접 만나는 플랫폼
4. 등록 완료

**색인 시간**: 일반적으로 1~7일 소요

## 📱 Google Play Store 등록

### 현황
- 현재 **PWA(Progressive Web App)** 형태로 개발됨
- `public/manifest.json` 파일 존재
- Service Worker 비활성화 상태

### PWA를 Play Store에 등록하는 방법

**옵션 1: Trusted Web Activity (TWA) 사용**

TWA를 사용하면 PWA를 네이티브 앱처럼 Play Store에 등록할 수 있습니다.

1. **Bubblewrap 설치 및 사용**
   ```bash
   npm install -g @bubblewrap/cli
   bubblewrap init --manifest https://dagong-bi1.pages.dev/manifest.json
   bubblewrap build
   ```

2. **Digital Asset Links 설정**
   - `.well-known/assetlinks.json` 파일 생성
   - 앱 서명 SHA-256 지문 추가

3. **Play Console에 APK/AAB 업로드**
   - Google Play Console: https://play.google.com/console
   - 앱 생성 → APK/AAB 업로드
   - 스토어 등록 정보 작성
   - 검토 제출

**옵션 2: PWABuilder 사용 (더 간단)**

1. PWABuilder 접속: https://www.pwabuilder.com
2. URL 입력: `https://dagong-bi1.pages.dev`
3. "Package for Stores" 선택
4. Android 패키지 생성
5. 생성된 APK를 Play Store에 업로드

**필요한 준비사항**:
- Google Play Developer 계정 ($25 일회성 등록비)
- 앱 아이콘 고해상도 버전 (512x512)
- 스크린샷 (최소 2개, 다양한 화면 크기)
- 앱 설명 및 개인정보 처리방침
- 콘텐츠 등급 설정

**색인 시간**: 검토 후 1~7일 소요

## 🔍 SEO 최적화 현황

### 이미 구현된 항목 ✅
- [x] `robots.txt` (허용)
- [x] `sitemap.xml` (자동 생성)
- [x] `manifest.json` (PWA)
- [x] 메타 태그 (title, description)
- [x] Open Graph 태그
- [x] 구조화된 데이터 (JSON-LD)
- [x] Google Analytics 스크립트 준비

### 추가 권장사항

1. **Google Search Console 소유권 확인 파일 검증**
   ```bash
   # 확인
   curl https://dagong-bi1.pages.dev/googleee4e97dad940b617.html
   ```

2. **네이버 소유권 확인 파일 검증**
   ```bash
   # 확인
   curl https://dagong-bi1.pages.dev/naverf3735d7a56c13e617b246ff2b6e0da46.html
   ```

3. **사이트맵 검증**
   ```bash
   # 확인
   curl https://dagong-bi1.pages.dev/sitemap.xml
   ```

4. **콘텐츠 최적화**
   - 각 페이지마다 고유한 title 및 description 설정
   - H1 태그 적절히 사용
   - 이미지 alt 텍스트 추가
   - 내부 링크 구조 최적화

5. **백링크 구축**
   - 블로그 포스팅
   - 소셜 미디어 공유
   - 관련 사이트에 등록
   - 온라인 커뮤니티 활동

## 📊 예상 색인 일정

| 플랫폼 | 등록 후 색인 시간 | 우선순위 |
|--------|------------------|---------|
| 구글 검색 | 1~7일 | 🔴 높음 |
| 네이버 검색 | 1~3일 | 🔴 높음 |
| 다음 검색 | 1~7일 | 🟡 중간 |
| Play Store | 1~7일 (검토 후) | 🟢 낮음 |

## 🎯 즉시 실행 가능한 액션 아이템

### 1단계: 소유권 확인 파일 검증 (5분)
```bash
# Google 소유권 확인
curl https://dagong-bi1.pages.dev/googleee4e97dad940b617.html

# 네이버 소유권 확인
curl https://dagong-bi1.pages.dev/naverf3735d7a56c13e617b246ff2b6e0da46.html

# 사이트맵 확인
curl https://dagong-bi1.pages.dev/sitemap.xml
```

### 2단계: Google Search Console 등록 (10분)
1. https://search.google.com/search-console 접속
2. 속성 추가: `https://dagong-bi1.pages.dev`
3. HTML 파일로 소유권 확인
4. 사이트맵 제출: `/sitemap.xml`

### 3단계: 네이버 서치어드바이저 등록 (10분)
1. https://searchadvisor.naver.com 접속
2. 사이트 등록: `https://dagong-bi1.pages.dev`
3. HTML 파일로 소유권 확인
4. 사이트맵 제출: `/sitemap.xml`

### 4단계: 다음 검색 등록 (5분)
1. https://register.search.daum.net/index.daum 접속
2. 사이트 정보 입력 및 제출

### 5단계: Play Store 등록 (선택사항, 2~3시간)
1. PWABuilder로 Android 패키지 생성
2. Play Console에 업로드
3. 스토어 정보 작성 및 제출

## 📈 등록 후 모니터링

### 검색엔진 색인 확인
```bash
# 구글 색인 확인
site:dagong-bi1.pages.dev

# 네이버 색인 확인 (네이버에서 검색)
site:dagong-bi1.pages.dev

# 다음 색인 확인 (다음에서 검색)
site:dagong-bi1.pages.dev
```

### Analytics 데이터 확인
- Google Analytics 대시보드
- Search Console 실적 보고서
- 네이버 서치어드바이저 통계

## 📞 지원 문서

- **Google Search Console 고객센터**: https://support.google.com/webmasters
- **네이버 서치어드바이저 고객센터**: https://help.naver.com/searchAdvisor
- **다음 검색등록 안내**: https://cs.daum.net/faq/3.html
- **Google Play Console 고객센터**: https://support.google.com/googleplay/android-developer

## 🔗 관련 링크

- **Instagram**: https://www.instagram.com/korea_teacraft/
- **GitHub**: https://github.com/healingcafe1-prog/dagong
- **Production**: https://dagong-bi1.pages.dev

---

**다음 단계**: 위의 액션 아이템을 순서대로 실행하여 검색엔진에 사이트를 등록하세요. 약 1~2주 후 검색 결과에 나타나기 시작합니다.
