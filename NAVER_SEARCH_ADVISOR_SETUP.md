# 🔍 Naver Search Advisor - dagong.co.kr 등록 가이드

**날짜:** 2026-02-23  
**도메인:** https://dagong.co.kr  
**목적:** 네이버 검색 노출을 위한 사이트 등록 및 색인 요청

---

## 📋 **1단계: Naver Search Advisor 접속**

### **웹마스터 도구 접속**
👉 https://searchadvisor.naver.com/

### **로그인**
- 네이버 계정으로 로그인
- (healingcafe1@gmail.com과 연동된 네이버 계정 사용)

---

## ➕ **2단계: 사이트 추가**

### **사이트 등록 절차**

1. **"웹마스터 도구" 메뉴 클릭**
2. **우측 상단 "사이트 추가" 버튼 클릭**
3. **사이트 URL 입력:**
   ```
   https://dagong.co.kr
   ```
4. **"확인" 버튼 클릭**

---

## ✅ **3단계: 소유 확인**

### **방법 1: HTML 태그 (이미 설정됨! 권장)**

**확인 메타 태그:**
```html
<meta name="naver-site-verification" content="9c90fe377c9fe65ae90b436292e98991ac6251b2" />
```

**이미 사이트에 적용되어 있습니다!** ✅

**확인 절차:**
1. Naver에서 **"HTML 태그"** 방식 선택
2. 제시된 메타 태그 확인
3. **content 값이 `9c90fe377c9fe65ae90b436292e98991ac6251b2`인지 확인**
4. **"소유확인"** 버튼 클릭

**예상 결과:** ✅ "소유 확인 완료"

---

### **방법 2: HTML 파일 (대안)**

만약 HTML 태그 방식이 안 되면:

1. Naver가 제공하는 HTML 파일 다운로드
2. 파일명 예시: `naver1234567890.html`
3. 파일을 `public/` 폴더에 추가
4. 사이트 재배포
5. Naver에서 "소유확인" 클릭

---

## 📄 **4단계: 사이트맵 제출**

소유 확인 완료 후:

### **요청 탭 이동**
1. **좌측 메뉴 → "요청" → "사이트맵 제출"** 클릭

### **사이트맵 URL 제출**
```
https://dagong.co.kr/sitemap.xml
```

2. **"확인" 버튼 클릭**

### **Sitemap 내용 (10개 URL)**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://dagong.co.kr/</loc></url>
  <url><loc>https://dagong.co.kr/products</loc></url>
  <url><loc>https://dagong.co.kr/regions</loc></url>
  <url><loc>https://dagong.co.kr/producers</loc></url>
  <url><loc>https://dagong.co.kr/experiences</loc></url>
  <url><loc>https://dagong.co.kr/education/curriculum</loc></url>
  <url><loc>https://dagong.co.kr/education/apply</loc></url>
  <url><loc>https://dagong.co.kr/events</loc></url>
</urlset>
```

**예상 결과:** "사이트맵이 성공적으로 제출되었습니다"

---

## 🔍 **5단계: RSS/Feed 등록 (선택사항)**

### **RSS 제출 (블로그/뉴스가 있는 경우)**

현재 dagong.co.kr에는 RSS가 없으므로 **건너뛰기**

나중에 블로그 기능 추가 시:
```
https://dagong.co.kr/blog/rss.xml
```

---

## 📊 **6단계: 검증 및 수집 요청**

### **수집 요청 (중요 페이지만)**

1. **좌측 메뉴 → "요청" → "웹 페이지 수집"**
2. **중요 URL 입력 (하루 최대 10개):**

**우선순위 URL:**
```
https://dagong.co.kr/
https://dagong.co.kr/products
https://dagong.co.kr/regions
https://dagong.co.kr/producers
```

3. **"확인" 버튼 클릭**

**예상 결과:** "수집 요청이 완료되었습니다"

---

## ⏱️ **예상 타임라인**

| 작업 | 소요 시간 | 결과 시간 |
|------|----------|----------|
| 사이트 추가 | 1분 | 즉시 |
| 소유 확인 | 1분 | 즉시 |
| Sitemap 제출 | 1분 | 즉시 |
| 웹 페이지 수집 요청 | 5분 | 즉시 |
| **네이버 검색 노출** | - | **3~7일** |
| 모든 페이지 색인 완료 | - | **7~14일** |

---

## 🧪 **7단계: 색인 확인**

### **3일 후 확인 (2026-02-26)**

네이버 검색:
```
site:dagong.co.kr
```

**예상 결과:** 2~5개 페이지 표시

### **1주일 후 확인 (2026-03-02)**

**예상 결과:** 8~10개 페이지 표시

### **Search Advisor에서 확인**

1. **좌측 메뉴 → "통계" → "검색 반영 현황"**
2. **수집 페이지 수 확인**
3. **검색 유입 통계 확인**

---

## 🎯 **8단계: 추가 최적화 (선택사항)**

### **메타 태그 최적화 (이미 완료)**
```html
<meta name="keywords" content="다공, 한국차, 전통차, 공예품, 차 직거래" />
<meta name="description" content="다공 - 전통 차와 공예품을 생산자와 직거래하는 플랫폼" />
```

### **robots.txt 확인**
```
https://dagong.co.kr/robots.txt
```

**내용:**
```
User-agent: *
Allow: /
Sitemap: https://dagong.co.kr/sitemap.xml

User-agent: Yeti
Allow: /
```

✅ **이미 최적화되어 있음**

---

## 🔧 **문제 해결**

### **"소유 확인 실패" 오류**

**원인:** 메타 태그를 찾을 수 없음

**해결:**
1. https://dagong.co.kr 페이지 소스 보기 (Ctrl+U)
2. `naver-site-verification` 검색
3. 메타 태그가 있는지 확인
4. 없으면 HTML 파일 방식 사용

### **사이트맵 오류**

**원인:** 사이트맵 URL에 접근할 수 없음

**해결:**
1. https://dagong.co.kr/sitemap.xml 브라우저에서 직접 접속
2. XML 내용이 표시되는지 확인
3. 404 오류 시 재배포 필요

### **수집이 안 됨**

**원인:** 네이버 크롤러 차단

**해결:**
1. robots.txt에서 `Yeti` (네이버봇) 허용 확인
2. `User-agent: Yeti` 및 `Allow: /` 설정

---

## 📊 **기대 효과**

### **네이버 검색 노출**
- 검색 트래픽: 5~15명/일
- 브랜드 키워드("다공"): 1~5위
- 상품 키워드: 5~20위

### **네이버 쇼핑 연동 (향후)**
- 네이버 쇼핑에 상품 등록 가능
- 스마트스토어 연동

---

## ✅ **체크리스트**

- [ ] Naver Search Advisor 접속
- [ ] 사이트 추가 (`https://dagong.co.kr`)
- [ ] 소유 확인 (HTML 태그)
- [ ] 사이트맵 제출 (`/sitemap.xml`)
- [ ] 웹 페이지 수집 요청 (4개 URL)
- [ ] 3일 후 `site:dagong.co.kr` 검색 확인
- [ ] 1주일 후 전체 페이지 색인 확인
- [ ] Search Advisor "통계" 메뉴에서 유입 확인

---

## 🔗 **주요 링크**

- **Naver Search Advisor:** https://searchadvisor.naver.com/
- **소유 확인 (메타 태그 확인):** https://dagong.co.kr/ (페이지 소스)
- **Sitemap:** https://dagong.co.kr/sitemap.xml
- **robots.txt:** https://dagong.co.kr/robots.txt
- **사이트:** https://dagong.co.kr

---

## 📝 **참고 사항**

### **네이버 검색 특징**
- Google보다 색인 속도 느림 (3~7일)
- 신규 사이트는 신뢰도 축적 필요 (2~4주)
- 블로그 백링크가 효과적

### **네이버 SEO 팁**
- 네이버 블로그에 사이트 링크 포함
- 네이버 카페에 소개글 작성
- 네이버 지식iN 답변에 사이트 링크

---

**이 가이드를 따라 Naver Search Advisor 설정을 완료하세요!**

**완료 후 다음 단계(Daum)로 진행하겠습니다.** 🚀

---

**작성일:** 2026-02-23  
**프로젝트:** 다공 (dagong)
