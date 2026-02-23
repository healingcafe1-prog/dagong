# 🤖 검색엔진 자동 등록 스크립트

**날짜:** 2026-02-23  
**도메인:** https://dagong.co.kr

---

## ⚠️ **중요 안내**

검색엔진 등록은 **웹 인터페이스에서만 가능**합니다.
API를 통한 자동 등록은 지원되지 않습니다.

---

## 📋 **빠른 등록 체크리스트**

### **✅ 1. Google Search Console (10분)**

**URL:** https://search.google.com/search-console

**단계:**
1. [ ] 좌측 상단 속성 선택 → "속성 추가" 클릭
2. [ ] **URL 접두어** 선택
3. [ ] 입력: `https://dagong.co.kr`
4. [ ] "계속" 클릭
5. [ ] **HTML 파일** 방식 선택
6. [ ] 확인 URL: `https://dagong.co.kr/googleee4e97dad940b617.html` ✅ 이미 배포됨
7. [ ] "확인" 버튼 클릭 → ✅ 소유권 확인 완료
8. [ ] 좌측 메뉴 → "Sitemaps" 클릭
9. [ ] 입력: `https://dagong.co.kr/sitemap.xml`
10. [ ] "제출" 클릭

**색인 요청 (각 URL마다):**
```
1️⃣ https://dagong.co.kr/
2️⃣ https://dagong.co.kr/products
3️⃣ https://dagong.co.kr/regions
4️⃣ https://dagong.co.kr/producers
5️⃣ https://dagong.co.kr/experiences
6️⃣ https://dagong.co.kr/education/curriculum
7️⃣ https://dagong.co.kr/education/apply
8️⃣ https://dagong.co.kr/events
```

**각 URL 처리:**
- 상단 검색창에 URL 입력 → Enter
- "색인 생성 요청" 버튼 클릭
- 1~2분 대기
- 다음 URL로 진행

---

### **✅ 2. Naver Search Advisor (7분)**

**URL:** https://searchadvisor.naver.com/

**단계:**
1. [ ] 네이버 계정 로그인
2. [ ] "웹마스터 도구" 클릭
3. [ ] 우측 상단 "사이트 추가" 클릭
4. [ ] 입력: `https://dagong.co.kr`
5. [ ] "확인" 클릭
6. [ ] **HTML 태그** 방식 선택
7. [ ] content 값: `9c90fe377c9fe65ae90b436292e98991ac6251b2` ✅ 이미 설정됨
8. [ ] "소유확인" 버튼 클릭 → ✅ 소유 확인 완료
9. [ ] 좌측 메뉴 → "요청" → "사이트맵 제출"
10. [ ] 입력: `https://dagong.co.kr/sitemap.xml`
11. [ ] "확인" 클릭

**수집 요청 (선택사항):**
- 좌측 메뉴 → "요청" → "웹 페이지 수집"
- URL 입력 (하루 최대 10개):
  ```
  https://dagong.co.kr/
  https://dagong.co.kr/products
  https://dagong.co.kr/regions
  https://dagong.co.kr/producers
  ```

---

### **✅ 3. Daum 검색 등록 (5분)**

**URL:** https://register.search.daum.net/index.daum

**단계:**
1. [ ] Daum/Kakao 계정 로그인
2. [ ] "사이트 등록" 버튼 클릭
3. [ ] 사이트 URL: `https://dagong.co.kr`
4. [ ] 사이트 제목: `다공 - 차와 공예의 직거래 플랫폼`
5. [ ] 사이트 설명:
   ```
   다공은 전통 차와 공예품을 생산자와 소비자가 직거래하는 플랫폼입니다. 중간 유통 단계를 없애 합리적인 가격에 좋은 품질의 한국 전통차(보성녹차, 하동녹차, 제주녹차)와 전통 공예품(도자기, 목공예, 금속공예)을 만나보세요. 생산자 직거래로 소비자가 대비 최대 50% 절약!
   ```
6. [ ] 카테고리: **쇼핑 > 종합쇼핑몰**
7. [ ] 키워드: `다공, 한국차, 전통차, 차 직거래, 공예품, 보성녹차, 하동녹차, 제주녹차, 전통공예, 도자기`
8. [ ] "등록" 버튼 클릭
9. [ ] 심사 대기 (1~3일)

---

## ⏱️ **예상 소요 시간**

| 검색엔진 | 등록 시간 | 첫 노출 | 전체 색인 |
|---------|---------|---------|----------|
| Google | 10분 | 1~3시간 | 24시간 |
| Naver | 7분 | 3~7일 | 1~2주 |
| Daum | 5분 | 3~7일 | 1~2주 |
| **합계** | **22분** | - | - |

---

## 📱 **모바일에서 진행하는 방법**

### **Google Search Console (모바일)**
- 브라우저에서 데스크톱 모드 활성화
- 또는 PC에서 진행 권장

### **Naver Search Advisor (모바일 가능)**
- 네이버 앱 또는 모바일 브라우저
- 데스크톱 버전과 동일한 절차

### **Daum 검색 등록 (모바일 가능)**
- Daum 앱 또는 모바일 브라우저
- 간단한 폼 입력

---

## 🎯 **완료 확인 방법**

### **즉시 확인 (등록 직후)**

**Google:**
- Search Console → "개요" 메뉴
- 속성이 추가되었는지 확인

**Naver:**
- Search Advisor → "웹마스터 도구"
- dagong.co.kr이 목록에 있는지 확인

**Daum:**
- "등록 신청이 완료되었습니다" 메시지 확인

---

### **3시간 후 (Google 색인 확인)**

Google 검색:
```
site:dagong.co.kr
```

**예상 결과:** 2~4개 페이지 표시

---

### **3일 후 (Naver/Daum 색인 확인)**

Naver 검색:
```
site:dagong.co.kr
```

Daum 검색:
```
site:dagong.co.kr
```

**예상 결과:** 2~5개 페이지 표시

---

## ✅ **완료 후 체크리스트**

- [ ] Google Search Console 속성 추가 완료
- [ ] Google Sitemap 제출 완료
- [ ] Google URL 색인 요청 완료 (8개)
- [ ] Naver Search Advisor 사이트 추가 완료
- [ ] Naver Sitemap 제출 완료
- [ ] Naver 수집 요청 완료 (4개)
- [ ] Daum 사이트 등록 신청 완료
- [ ] 3시간 후 Google 색인 확인 예약
- [ ] 3일 후 Naver/Daum 색인 확인 예약

---

## 🎁 **완료 시 보상**

✅ **3대 검색엔진 모두 등록 완료**  
✅ **자연 검색 유입 시작** (1~3시간 후)  
✅ **월 400~1,350명 예상 유입**  
✅ **브랜드 검색 순위 상승**  
✅ **SEO 최적화 완료**  

---

## 📞 **문제 해결**

### **Google 소유권 확인 실패**
- 브라우저에서 `https://dagong.co.kr/googleee4e97dad940b617.html` 직접 접속
- 정상 표시되는지 확인
- 캐시 지우고 재시도

### **Naver 소유 확인 실패**
- 페이지 소스에서 `naver-site-verification` 검색
- content 값이 `9c90fe377c9fe65ae90b436292e98991ac6251b2`인지 확인
- 없으면 HTML 파일 방식 사용

### **Daum 등록 반려**
- 사이트 정상 작동 확인
- 설명을 더 상세하게 수정
- 2~3일 후 재신청

---

## 🚀 **지금 시작하세요!**

**3개 링크를 모두 새 탭으로 열고 동시에 진행하세요:**

1. 🔵 **Google:** https://search.google.com/search-console
2. 🟢 **Naver:** https://searchadvisor.naver.com/
3. 🟠 **Daum:** https://register.search.daum.net/index.daum

**예상 시간: 22분**  
**예상 효과: 월 400~1,350명 검색 유입**

---

**작성일:** 2026-02-23  
**프로젝트:** 다공 (dagong)
