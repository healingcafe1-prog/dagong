# 🔍 Google Search Console - dagong.co.kr 등록 가이드

**날짜:** 2026-02-23  
**도메인:** https://dagong.co.kr  
**목적:** 새 도메인 소유권 확인 및 색인 요청

---

## 📋 **1단계: 새 속성 추가**

### **Google Search Console 접속**
👉 https://search.google.com/search-console

### **속성 추가 절차**

1. **좌측 상단 속성 선택 드롭다운 클릭**
2. **"속성 추가" 클릭**
3. **URL 접두어 선택** (권장)
   - 입력: `https://dagong.co.kr`
   - ❌ 도메인 속성은 선택하지 마세요
4. **"계속" 클릭**

---

## ✅ **2단계: 소유권 확인**

### **HTML 파일 방식 (자동 완료됨!)**

Google이 제시하는 확인 방법 중 **"HTML 파일"** 선택

**확인 파일:**
- 파일명: `googleee4e97dad940b617.html`
- 내용: `google-site-verification: googleee4e97dad940b617.html`
- **이미 배포되어 있음!** ✅

**확인 URL:**
```
https://dagong.co.kr/googleee4e97dad940b617.html
```

**확인 방법:**
1. 위 URL을 새 탭에서 열어보세요
2. `google-site-verification: googleee4e97dad940b617.html` 텍스트가 보이면 정상
3. Google Search Console로 돌아와서 **"확인"** 버튼 클릭

**예상 결과:** ✅ "소유권이 확인되었습니다"

---

## 📄 **3단계: Sitemap 제출**

소유권 확인 후:

1. **좌측 메뉴 → "Sitemaps"** 클릭
2. **"새 사이트맵 추가"** 입력란에:
   ```
   https://dagong.co.kr/sitemap.xml
   ```
3. **"제출"** 클릭

**sitemap.xml 내용 (10개 URL):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://dagong.co.kr/</loc><priority>1.0</priority></url>
  <url><loc>https://dagong.co.kr/products</loc><priority>0.9</priority></url>
  <url><loc>https://dagong.co.kr/regions</loc><priority>0.9</priority></url>
  <url><loc>https://dagong.co.kr/producers</loc><priority>0.9</priority></url>
  <url><loc>https://dagong.co.kr/experiences</loc><priority>0.9</priority></url>
  <url><loc>https://dagong.co.kr/education/curriculum</loc><priority>0.8</priority></url>
  <url><loc>https://dagong.co.kr/education/apply</loc><priority>0.7</priority></url>
  <url><loc>https://dagong.co.kr/events</loc><priority>0.8</priority></url>
</urlset>
```

**예상 결과:** "성공" (녹색 체크)

---

## 🔍 **4단계: URL 검사 및 색인 요청**

### **우선순위 URL (8개)**

사이트맵 제출 후, 빠른 색인을 위해 개별 URL 검사:

1. **홈페이지**
   ```
   https://dagong.co.kr/
   ```

2. **상품 페이지**
   ```
   https://dagong.co.kr/products
   ```

3. **지역 페이지**
   ```
   https://dagong.co.kr/regions
   ```

4. **생산자 페이지**
   ```
   https://dagong.co.kr/producers
   ```

5. **체험 페이지**
   ```
   https://dagong.co.kr/experiences
   ```

6. **교육 커리큘럼**
   ```
   https://dagong.co.kr/education/curriculum
   ```

7. **교육 신청**
   ```
   https://dagong.co.kr/education/apply
   ```

8. **이벤트**
   ```
   https://dagong.co.kr/events
   ```

### **색인 요청 절차 (각 URL마다 반복)**

1. **상단 검색창**에 URL 입력 (예: `https://dagong.co.kr/`)
2. **Enter** 키 누르기
3. **"색인 생성 요청"** 버튼 클릭
4. **1~2분 대기** (테스트 진행 중)
5. **"색인 생성 요청됨"** 녹색 메시지 확인
6. **다음 URL로 진행**

**일일 할당량:** 10~20개 URL (충분함)

---

## ⏱️ **예상 타임라인**

| 작업 | 소요 시간 | 결과 시간 |
|------|----------|----------|
| 속성 추가 | 1분 | 즉시 |
| 소유권 확인 | 1분 | 즉시 |
| Sitemap 제출 | 1분 | 즉시 |
| URL 검사 (8개) | 15분 | 즉시 |
| **Google 검색 노출** | - | **1~3시간** |
| 모든 페이지 색인 완료 | - | **24~48시간** |

---

## 🧪 **5단계: 색인 확인**

### **3시간 후 확인 (2026-02-23 04:00 UTC)**

Google 검색:
```
site:dagong.co.kr
```

**예상 결과:** 2~4개 페이지 표시

### **24시간 후 확인 (2026-02-24 01:00 UTC)**

**예상 결과:** 8~10개 페이지 표시

### **Search Console에서 확인**

1. **좌측 메뉴 → "개요"**
2. **"성능" 탭**
3. **"커버리지" 확인**

---

## 🔧 **문제 해결**

### **"소유권을 확인할 수 없습니다" 오류**

**원인:** 확인 파일에 접근할 수 없음

**해결:**
1. 브라우저에서 https://dagong.co.kr/googleee4e97dad940b617.html 직접 접속
2. 정상 표시되는지 확인
3. 캐시 지우고 재시도

### **"URL이 Google에 등록되어 있지 않음" (정상)**

이는 아직 색인되지 않았다는 의미 (오류 아님)

**조치:** "색인 생성 요청" 버튼 클릭

### **할당량 초과**

**증상:** "일일 할당량을 초과했습니다"

**해결:**
- 내일(UTC 00:00 기준) 다시 시도
- 또는 Sitemap 자동 크롤링 대기 (24~48시간)

---

## 📊 **기대 효과**

### **검색 노출 증가**
- Google 검색 트래픽: 5~20명/일
- 검색 키워드: "한국차 직거래", "다공", "전통차" 등

### **검색 순위**
- 브랜드 키워드("다공"): 1~3위
- 롱테일 키워드: 5~15위
- 지속 최적화 필요

---

## ✅ **체크리스트**

- [ ] Google Search Console 접속
- [ ] 새 속성 추가 (`https://dagong.co.kr`)
- [ ] 소유권 확인 (HTML 파일)
- [ ] Sitemap 제출 (`/sitemap.xml`)
- [ ] URL 검사 및 색인 요청 (8개)
- [ ] 3시간 후 `site:dagong.co.kr` 검색 확인
- [ ] 24시간 후 전체 페이지 색인 확인

---

## 🔗 **주요 링크**

- **Google Search Console:** https://search.google.com/search-console
- **소유권 확인 파일:** https://dagong.co.kr/googleee4e97dad940b617.html
- **Sitemap:** https://dagong.co.kr/sitemap.xml
- **사이트:** https://dagong.co.kr

---

**이 가이드를 따라 Google Search Console 설정을 완료하세요!**

**완료 후 다음 단계(Naver, Daum)로 진행하겠습니다.** 🚀

---

**작성일:** 2026-02-23  
**프로젝트:** 다공 (dagong)
