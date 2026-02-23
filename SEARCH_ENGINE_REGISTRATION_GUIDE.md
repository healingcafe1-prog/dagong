# 🎉 dagong.co.kr 검색엔진 재등록 완료 가이드

**날짜:** 2026-02-23  
**도메인:** https://dagong.co.kr  
**Git 커밋:** cd73656

---

## ✅ **완료된 작업**

### **1. 도메인 설정** ✅
- DNS CNAME 레코드: `dagong.co.kr` → `dagong-bi1.pages.dev`
- Cloudflare Pages 도메인 활성화
- SSL 인증서 자동 발급
- **접속 테스트: HTTP 200 OK** ✅

### **2. 메타 태그 업데이트** ✅
- canonical, og:url, og:image 모두 `dagong.co.kr`로 변경
- 소유권 확인 태그 유지:
  - Google: `googleee4e97dad940b617.html`
  - Naver: `content="9c90fe377c9fe65ae90b436292e98991ac6251b2"`

### **3. 가이드 문서 생성** ✅
- `GOOGLE_SEARCH_CONSOLE_SETUP.md` - Google 재등록 가이드
- `NAVER_SEARCH_ADVISOR_SETUP.md` - Naver 재등록 가이드
- `DAUM_SEARCH_REGISTRATION.md` - Daum 등록 가이드

---

## 🚀 **즉시 실행할 작업 (3단계)**

### **📋 Step 1: Google Search Console (15분)**

👉 https://search.google.com/search-console

**작업 순서:**
1. ✅ 속성 추가: `https://dagong.co.kr` (URL 접두어)
2. ✅ 소유권 확인: HTML 파일
   - URL: `https://dagong.co.kr/googleee4e97dad940b617.html`
   - 이미 배포됨 ✅
3. ✅ Sitemap 제출: `https://dagong.co.kr/sitemap.xml`
4. ✅ URL 검사 및 색인 요청 (8개 URL):
   ```
   https://dagong.co.kr/
   https://dagong.co.kr/products
   https://dagong.co.kr/regions
   https://dagong.co.kr/producers
   https://dagong.co.kr/experiences
   https://dagong.co.kr/education/curriculum
   https://dagong.co.kr/education/apply
   https://dagong.co.kr/events
   ```

**예상 결과:**
- 3시간 후: 2~4개 페이지 검색 노출
- 24시간 후: 8~10개 페이지 전체 색인

**상세 가이드:** `/home/user/webapp/GOOGLE_SEARCH_CONSOLE_SETUP.md`

---

### **📋 Step 2: Naver Search Advisor (10분)**

👉 https://searchadvisor.naver.com/

**작업 순서:**
1. ✅ 사이트 추가: `https://dagong.co.kr`
2. ✅ 소유 확인: HTML 태그
   - `<meta name="naver-site-verification" content="9c90fe377c9fe65ae90b436292e98991ac6251b2" />`
   - 이미 설정됨 ✅
3. ✅ 사이트맵 제출: `https://dagong.co.kr/sitemap.xml`
4. ✅ 웹 페이지 수집 요청 (4개 URL):
   ```
   https://dagong.co.kr/
   https://dagong.co.kr/products
   https://dagong.co.kr/regions
   https://dagong.co.kr/producers
   ```

**예상 결과:**
- 3~7일 후: 2~5개 페이지 검색 노출
- 1~2주 후: 8~10개 페이지 전체 색인

**상세 가이드:** `/home/user/webapp/NAVER_SEARCH_ADVISOR_SETUP.md`

---

### **📋 Step 3: Daum 검색 등록 (5분)**

👉 https://register.search.daum.net/index.daum

**작업 순서:**
1. ✅ 사이트 등록: `https://dagong.co.kr`
2. ✅ 정보 입력:
   - **제목:** 다공 - 차와 공예의 직거래 플랫폼
   - **설명:** 전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진 없이 합리적 가격으로...
   - **카테고리:** 쇼핑 > 종합쇼핑몰
   - **키워드:** 다공, 한국차, 전통차, 차 직거래, 공예품, 보성녹차, 하동녹차, 제주녹차, 전통공예, 도자기
3. ✅ 심사 대기: 1~3일

**예상 결과:**
- 승인 후 3~7일: 2~5개 페이지 검색 노출
- 1~2주 후: 전체 페이지 색인

**상세 가이드:** `/home/user/webapp/DAUM_SEARCH_REGISTRATION.md`

---

## ⏱️ **타임라인 요약**

| 검색엔진 | 등록 시간 | 첫 노출 | 전체 색인 | 예상 트래픽 |
|---------|---------|---------|----------|------------|
| **Google** | 15분 | 1~3시간 | 24~48시간 | 5~20명/일 |
| **Naver** | 10분 | 3~7일 | 1~2주 | 5~15명/일 |
| **Daum** | 5분 | 3~7일 | 1~2주 | 3~10명/일 |
| **합계** | 30분 | 1시간~ | 2주 | **13~45명/일** |

---

## 🧪 **색인 확인 방법**

### **Google 검색 (3시간 후)**
```
site:dagong.co.kr
```

### **Naver 검색 (3일 후)**
```
site:dagong.co.kr
```

### **Daum 검색 (3일 후)**
```
site:dagong.co.kr
```

### **브랜드 키워드 (1주일 후)**
```
다공
다공 차
다공 공예
```

---

## 📊 **예상 효과**

### **검색 트래픽 증가**
- **1주일 후:** 10~30명/일
- **1개월 후:** 30~80명/일
- **3개월 후:** 80~200명/일

### **검색 순위 목표**
- **브랜드 키워드 ("다공"):** 1~3위
- **롱테일 키워드:** 5~15위
- **지역 키워드:** 3~10위

### **주요 검색 키워드**
- 다공
- 한국차 직거래
- 전통차 플랫폼
- 보성녹차 직거래
- 하동녹차 생산자
- 전통 공예품 직거래
- 차산지 직배송

---

## ✅ **완료 체크리스트**

### **도메인 설정 (자동 완료)** ✅
- [x] DNS 레코드 설정
- [x] Cloudflare Pages 활성화
- [x] SSL 인증서 발급
- [x] 메타 태그 변경
- [x] 사이트 재배포

### **검색엔진 등록 (수동 작업 필요)** 🔄
- [ ] Google Search Console 재설정
  - [ ] 속성 추가
  - [ ] 소유권 확인
  - [ ] Sitemap 제출
  - [ ] URL 색인 요청 (8개)
- [ ] Naver Search Advisor 재설정
  - [ ] 사이트 추가
  - [ ] 소유 확인
  - [ ] Sitemap 제출
  - [ ] 수집 요청 (4개)
- [ ] Daum 검색 등록
  - [ ] 사이트 등록
  - [ ] 정보 입력
  - [ ] 심사 대기

### **추가 최적화 (선택사항)** 🔄
- [ ] Instagram 프로필 링크 업데이트
- [ ] 네이버 블로그 포스팅 (사이트 소개)
- [ ] 카카오톡 오픈채팅 링크 공유
- [ ] Kakao 채널 생성

---

## 🔗 **주요 링크 모음**

### **검색엔진 관리 페이지**
- **Google Search Console:** https://search.google.com/search-console
- **Naver Search Advisor:** https://searchadvisor.naver.com/
- **Daum 검색 등록:** https://register.search.daum.net/index.daum

### **사이트 URL**
- **프로덕션:** https://dagong.co.kr ✅
- **www:** https://www.dagong.co.kr ✅
- **Sitemap:** https://dagong.co.kr/sitemap.xml
- **robots.txt:** https://dagong.co.kr/robots.txt

### **소유권 확인**
- **Google:** https://dagong.co.kr/googleee4e97dad940b617.html
- **Naver:** 페이지 소스의 `<meta name="naver-site-verification" ...>`

### **Cloudflare 관리**
- **Pages 프로젝트:** https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/pages/view/dagong
- **DNS 설정:** https://dash.cloudflare.com/9bde88dec4e7d52c28ef96d9a5e33e50/dagong.co.kr/dns

### **GitHub**
- **저장소:** https://github.com/healingcafe1-prog/dagong
- **커밋:** cd73656

---

## 📱 **다음 단계**

### **즉시 (오늘 내로):**
1. ✅ **Instagram 프로필 링크** → `dagong.co.kr` 업데이트
2. ✅ **Google Search Console** 재설정 (15분)
3. ✅ **Naver Search Advisor** 재설정 (10분)
4. ✅ **Daum 검색** 등록 (5분)

### **내일 (2026-02-24):**
1. Google Search Console에서 색인 상태 확인
2. Instagram 링크 정상 작동 확인
3. 트래픽 분석 시작

### **3일 후 (2026-02-26):**
1. Naver/Daum `site:dagong.co.kr` 검색 확인
2. Search Console "커버리지" 통계 확인

### **1주일 후 (2026-03-02):**
1. 모든 검색엔진 색인 확인
2. 트래픽 분석 (Google Analytics)
3. 검색 키워드 분석
4. 추가 SEO 최적화

---

## 🎁 **완료 시 혜택**

✅ **통합 도메인** - 모든 채널에서 `dagong.co.kr` 사용  
✅ **검색 노출** - Google, Naver, Daum 3대 검색엔진  
✅ **트래픽 증가** - 검색 유입 13~45명/일 (초기)  
✅ **브랜드 강화** - 짧고 기억하기 쉬운 도메인  
✅ **SEO 점수** - 도메인 권위 향상  
✅ **마케팅 효율** - 일관된 URL로 링크 집중화  

---

## 📞 **지원 및 문의**

문제가 발생하거나 도움이 필요하면:

1. **상세 가이드 참고:**
   - `GOOGLE_SEARCH_CONSOLE_SETUP.md`
   - `NAVER_SEARCH_ADVISOR_SETUP.md`
   - `DAUM_SEARCH_REGISTRATION.md`

2. **스크린샷 공유:**
   - 오류 메시지 캡처
   - 문제 발생 화면
   - 설정 완료 화면

3. **진행 상황 보고:**
   - 각 단계 완료 시 알림
   - 색인 확인 결과 공유
   - 트래픽 변화 공유

---

## 🎉 **성공을 기원합니다!**

**모든 검색엔진 등록을 완료하면 dagong.co.kr이 Google, Naver, Daum 검색에서 노출되기 시작합니다!**

**30분 투자로 월 수백 명의 자연 검색 유입을 기대할 수 있습니다!** 🚀

---

**작성일:** 2026-02-23  
**프로젝트:** 다공 (dagong)  
**상태:** ✅ 가이드 완료, 등록 대기 중
