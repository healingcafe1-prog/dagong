# 🔍 dagong.co.kr 방문자 유입 경로 확인 가이드

## 현재 상황
- ✅ **방문자**: 94명 (Cloudflare에서 확인됨)
- ❓ **유입 경로**: 확인 필요
- 📍 **도메인**: dagong.co.kr

---

## 🎯 유입 경로 확인 방법

### 방법 1: Cloudflare Analytics (가장 정확) ⭐⭐⭐⭐⭐

**1. Cloudflare 대시보드 접속:**
```
https://dash.cloudflare.com/9bde88dec4e7d52c28ef96d9a5e33e50/dagong.co.kr/analytics
```

**2. 확인 가능한 정보:**

#### Traffic 탭:
- 📊 **총 방문자 수**: 시간대별 트래픽
- 🌍 **국가별 방문**: 어느 나라에서 접속했는지
- 🤖 **Bot vs Human**: 실제 사용자 vs 봇
- 📱 **기기 유형**: 모바일/데스크톱

#### Security 탭:
- 🛡️ **위협 차단**: 차단된 요청
- 🔍 **요청 분석**: 의심스러운 트래픽

---

### 방법 2: 서버 로그 확인 (Cloudflare Pages)

Cloudflare Pages는 **실시간 로그**를 제공하지 않습니다. 하지만:

**Wrangler 로그로 확인:**
```bash
npx wrangler pages deployment tail --project-name dagong
```

이 명령어는 **실시간 요청**을 보여줍니다:
- 접속 IP
- User-Agent (브라우저)
- Referer (어디서 왔는지)

---

### 방법 3: Google Search Console 등록 (SEO 확인)

네이버에서 검색이 안 되는 이유를 확인하고 개선:

**1. Google Search Console 등록:**
```
https://search.google.com/search-console
```

**2. dagong.co.kr 추가:**
- "속성 추가" → dagong.co.kr 입력
- DNS TXT 레코드로 인증 (Cloudflare DNS에 추가)

**3. 확인 가능한 정보:**
- 🔍 **검색 노출**: Google에서 검색 시 순위
- 📊 **클릭률**: 검색 → 클릭 비율
- 🔗 **유입 키워드**: 어떤 검색어로 들어왔는지
- 🐛 **크롤링 오류**: 검색 엔진이 못 읽는 페이지

**4. 네이버 검색 등록:**
```
https://searchadvisor.naver.com/
```
- 사이트 등록
- 사이트맵 제출: https://dagong.co.kr/sitemap.xml

---

## 🤔 가능한 유입 경로 추측

현재 94명의 방문자가 있다면:

### 1. 직접 접속 (Direct)
- ✅ **URL 직접 입력**: dagong.co.kr 또는 dagong-bi1.pages.dev
- ✅ **북마크**: 즐겨찾기에서 접속
- ✅ **테스트**: 본인이나 지인이 테스트 접속

### 2. Cloudflare 봇/크롤러
- 🤖 **Cloudflare 자체 모니터링**: SSL 인증서 발급 시 자동 체크
- 🤖 **검색 엔진 봇**: Google, Naver, Bing 크롤러
- 🤖 **보안 스캔**: Cloudflare의 보안 검사

### 3. 외부 링크
- 🔗 **다른 사이트에서 링크**: 혹시 다른 곳에 링크를 공유했나요?
- 📱 **소셜 미디어**: 카카오톡, 페이스북, 인스타그램 등
- 💬 **채팅/메신저**: 링크를 누군가에게 보냈나요?

### 4. IP 스캔
- 🔍 **IP 스캐너**: 인터넷에서 자동으로 IP를 스캔하는 봇
- 🛡️ **보안 도구**: Shodan, Censys 같은 서비스

---

## 📊 실제 유입 확인하기

**지금 바로 확인 가능:**

### 1. Cloudflare Analytics 접속
```
https://dash.cloudflare.com/9bde88dec4e7d52c28ef96d9a5e33e50/dagong.co.kr/analytics
```

확인할 내용:
- [ ] 방문자 수 그래프 (시간대별)
- [ ] 국가 분포 (한국인지 확인)
- [ ] Bot vs Human (실제 사람인지)
- [ ] 페이지 뷰 (어떤 페이지를 봤는지)

### 2. 실시간 로그 보기 (선택)
```bash
npx wrangler pages deployment tail --project-name dagong
```

이 명령어를 실행하고 누군가 접속하면:
```
GET https://dagong.co.kr/
From: 123.456.789.0
User-Agent: Mozilla/5.0 (iPhone; ...)
Referer: https://google.com/search?q=...
```

이런 식으로 실시간 정보를 볼 수 있습니다.

---

## 🔍 네이버 검색 안 되는 이유

**왜 네이버에서 검색이 안 될까요?**

### 1. 신규 도메인
- ⏰ **시간 필요**: 도메인이 새로 등록되면 검색 엔진에 색인되는데 **1-2주** 소요
- 🕷️ **크롤링 대기**: 네이버 봇이 아직 방문하지 않음

### 2. 사이트맵 없음
- 📄 **sitemap.xml**: 검색 엔진에게 페이지 목록을 알려주는 파일
- ❌ **현재 상태**: sitemap.xml이 없을 가능성

### 3. robots.txt 설정
- 🤖 **robots.txt**: 검색 엔진 접근 허용/차단 파일
- ❌ **차단 가능성**: 혹시 크롤러를 차단하고 있나?

---

## ✅ 네이버 검색 등록하기

**즉시 등록 방법:**

### 1. 네이버 서치어드바이저 등록
```
https://searchadvisor.naver.com/
```

**단계:**
1. 로그인
2. "사이트 등록" 클릭
3. `https://dagong.co.kr` 입력
4. 소유권 확인 (HTML 파일 또는 메타 태그)
5. 사이트맵 제출

### 2. sitemap.xml 생성

제가 자동으로 sitemap.xml을 생성해 드릴까요?

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dagong.co.kr/</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dagong.co.kr/products</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dagong.co.kr/products?type=craft</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dagong.co.kr/products?type=art</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 3. robots.txt 생성

```txt
User-agent: *
Allow: /

Sitemap: https://dagong.co.kr/sitemap.xml
```

---

## 🎯 추천 다음 단계

**지금 바로 할 것:**

1. **Cloudflare Analytics 확인** (5분)
   ```
   https://dash.cloudflare.com/9bde88dec4e7d52c28ef96d9a5e33e50/dagong.co.kr/analytics
   ```
   - 방문자 국가 확인
   - Bot vs Human 비율 확인

2. **sitemap.xml 생성** (제가 도와드릴게요)

3. **네이버 서치어드바이저 등록** (10분)
   ```
   https://searchadvisor.naver.com/
   ```

4. **Google Search Console 등록** (10분)
   ```
   https://search.google.com/search-console
   ```

---

## 💬 다음 단계 선택

**어떻게 진행하시겠습니까?**

**A) Cloudflare Analytics 확인하기**
- 지금 바로 링크 열어서 방문자 정보 확인

**B) sitemap.xml 생성하기** (추천)
- 검색 엔진에 사이트 구조 알리기
- 네이버/구글 검색 등록 준비

**C) 실시간 로그 보기**
- `wrangler pages deployment tail` 실행

**D) 전체 SEO 설정 진행**
- sitemap.xml + robots.txt + Search Console 등록

---

**알려주세요:**
- Cloudflare Analytics에서 어떤 정보가 보이나요?
- 네이버 검색 노출을 원하시나요?
- sitemap.xml을 생성해 드릴까요?

---

생성 시간: 2026-02-05 13:10 UTC
상태: dagong.co.kr 방문자 94명 확인, 유입 경로 분석 대기
