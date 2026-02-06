# 🎯 SEO 설정 완료 - dagong.co.kr

## ✅ 완료된 작업

### 1. **sitemap.xml 생성** ✅
**URL**: `https://dagong.co.kr/sitemap.xml`

**포함된 페이지:**
- 홈페이지: https://dagong.co.kr/
- 상품 페이지: https://dagong.co.kr/products
- 차 직거래: https://dagong.co.kr/products?type=tea
- 공예품: https://dagong.co.kr/products?type=craft
- 지역: https://dagong.co.kr/regions
- 생산자: https://dagong.co.kr/producers
- 체험: https://dagong.co.kr/experiences
- 교육: https://dagong.co.kr/education/apply
- 커리큘럼: https://dagong.co.kr/education/curriculum
- 이벤트: https://dagong.co.kr/events

**업데이트 주기:**
- 메인 페이지: 매일 (daily)
- 상품 페이지: 매일 (daily)
- 지역/생산자: 매주 (weekly)
- 교육/이벤트: 매주/매월 (weekly/monthly)

---

### 2. **robots.txt 생성** ✅
**URL**: `https://dagong.co.kr/robots.txt`

**내용:**
```txt
User-agent: *
Allow: /

Sitemap: https://dagong.co.kr/sitemap.xml
```

**검색 엔진 지원:**
- ✅ Googlebot (구글)
- ✅ NaverBot (네이버)
- ✅ Yeti (네이버)
- ✅ Bingbot (빙)
- ✅ 모든 크롤러 허용

---

### 3. **메타 태그 개선** ✅

#### 기본 SEO 메타 태그:
```html
<meta name="description" content="다공 - 전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진을 줄여 합리적 가격으로 좋은 품질을 만나보세요." />

<meta name="keywords" content="다공, 한국차, 전통차, 공예품, 차 직거래, 공예품 직거래, 차산지, 공예산지, 다도, 지역특산품, 보성녹차, 하동녹차, 제주녹차, 전통공예, 도자기, 목공예, 금속공예, Korean tea, Korean craft, traditional tea, handmade craft, direct trade" />

<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

<meta name="googlebot" content="index, follow" />
<meta name="NaverBot" content="index, follow" />
<meta name="Yeti" content="index, follow" />

<link rel="canonical" content="https://dagong.co.kr/" />
```

#### Open Graph (소셜 미디어 공유):
```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="다공" />
<meta property="og:title" content="다공 - 차와 공예의 직거래 플랫폼 | 생산자 직거래로 합리적 가격에" />
<meta property="og:description" content="전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진 없이 생산자에게 직접 구매하세요. 보성녹차, 하동녹차, 제주녹차부터 전통 도자기, 목공예까지 - 소비자가 대비 최대 50% 절약!" />
<meta property="og:url" content="https://dagong.co.kr/" />
<meta property="og:image" content="https://dagong.co.kr/static/icons/icon-512x512.png" />
<meta property="og:locale" content="ko_KR" />
```

#### Twitter Card:
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="다공 - 차와 공예의 직거래 플랫폼" />
<meta name="twitter:description" content="전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진 없이 합리적 가격으로 좋은 품질을 만나보세요." />
<meta name="twitter:image" content="https://dagong.co.kr/static/icons/icon-512x512.png" />
```

---

## 🔍 다음 단계: 네이버 서치어드바이저 등록

### 1. 네이버 서치어드바이저 접속
```
https://searchadvisor.naver.com/
```

### 2. 사이트 등록
1. 로그인 (네이버 계정)
2. "사이트 관리" → "사이트 등록" 클릭
3. `https://dagong.co.kr` 입력
4. "확인" 클릭

### 3. 소유권 확인
**방법 1: HTML 파일 (추천)**
- 파일 다운로드: `naver123456789.html`
- `/home/user/webapp/public/` 에 복사
- 빌드 & 배포 후 확인

**방법 2: 메타 태그**
- 제공된 메타 태그를:
  ```html
  <meta name="naver-site-verification" content="코드" />
  ```
- `src/renderer.tsx` 파일에 추가 (line 45)
- 빌드 & 배포

### 4. sitemap.xml 제출
1. 소유권 확인 완료 후
2. "사이트 관리" → "요청" → "사이트맵 제출"
3. URL 입력: `https://dagong.co.kr/sitemap.xml`
4. "확인" 클릭

### 5. RSS 등록 (선택)
- 웹마스터 도구에서 RSS 제출 가능

---

## 📊 Google Search Console 등록

### 1. Google Search Console 접속
```
https://search.google.com/search-console
```

### 2. 속성 추가
1. "속성 추가" 클릭
2. URL 입력: `https://dagong.co.kr`
3. "계속" 클릭

### 3. 소유권 확인
**방법 1: DNS TXT 레코드 (추천)**
1. TXT 레코드 받기
2. Cloudflare DNS 페이지:
   ```
   https://dash.cloudflare.com/9bde88dec4e7d52c28ef96d9a5e33e50/dagong.co.kr/dns/records
   ```
3. "Add record" 클릭
4. 설정:
   ```
   Type: TXT
   Name: @
   Content: google-site-verification=xxxxx
   TTL: Auto
   ```
5. "Save" 클릭
6. Google Search Console에서 "확인" 클릭

**방법 2: HTML 파일**
- 네이버와 동일한 방식

### 4. sitemap.xml 제출
1. 좌측 메뉴 → "Sitemaps"
2. "새 사이트맵 추가"
3. URL 입력: `sitemap.xml`
4. "제출" 클릭

---

## ⏰ 예상 검색 노출 시간

### 네이버:
- **등록 완료 후**: 1-3일
- **본격 노출**: 1-2주
- **전체 색인**: 2-4주

### 구글:
- **등록 완료 후**: 1-2일
- **본격 노출**: 1주
- **전체 색인**: 2-3주

---

## 🎯 SEO 효과 측정

### 1. 네이버 서치어드바이저
**확인 항목:**
- 검색 노출 횟수
- 검색 클릭 횟수
- 검색 키워드
- 페이지별 노출 순위

### 2. Google Search Console
**확인 항목:**
- 노출 수 (Impressions)
- 클릭 수 (Clicks)
- 평균 CTR (Click-Through Rate)
- 평균 검색 순위
- 인덱싱 상태

### 3. Cloudflare Analytics
**확인 항목:**
- 트래픽 증가 추이
- 검색 엔진 봇 방문 횟수
- 국가별 방문자 분포

---

## 🔧 추가 최적화 권장사항

### 1. 구조화된 데이터 (JSON-LD)
나중에 추가 가능:
- 상품 정보 (Product Schema)
- 조직 정보 (Organization Schema)
- 리뷰 정보 (Review Schema)
- 빵 부스러기 (Breadcrumb Schema)

### 2. 페이지 속도 최적화
- 이미지 최적화 (WebP 형식)
- 캐싱 설정 (Cloudflare)
- Lazy Loading

### 3. 모바일 최적화
- ✅ 이미 완료 (반응형 디자인)
- ✅ PWA 지원

### 4. 콘텐츠 최적화
- 제목 태그 (H1, H2, H3) 최적화
- 이미지 alt 태그 추가
- 내부 링크 구조 개선

---

## 📝 현재 상태 요약

| 항목 | 상태 | URL |
|-----|------|-----|
| **sitemap.xml** | ✅ 완료 | https://dagong.co.kr/sitemap.xml |
| **robots.txt** | ✅ 완료 | https://dagong.co.kr/robots.txt |
| **메타 태그** | ✅ 완료 | - |
| **Open Graph** | ✅ 완료 | - |
| **Canonical URL** | ✅ 완료 | - |
| **네이버 등록** | ⏳ 대기 중 | https://searchadvisor.naver.com/ |
| **구글 등록** | ⏳ 대기 중 | https://search.google.com/search-console |

---

## 🎉 완료!

**SEO 기본 설정이 완료되었습니다!**

이제 네이버와 구글에 사이트를 등록하면 1-2주 후부터 검색 결과에 노출되기 시작합니다.

**다음 단계:**
1. ✅ sitemap.xml, robots.txt 생성 완료
2. ✅ 메타 태그 최적화 완료
3. ⏳ 네이버 서치어드바이저 등록 (위 가이드 참고)
4. ⏳ Google Search Console 등록 (위 가이드 참고)

**추가 지원이 필요하면 언제든지 알려주세요!**

---

생성 시간: 2026-02-05 13:30 UTC
상태: SEO 기본 설정 완료, 검색 엔진 등록 대기
