# Google Search Console 색인 요청 가이드 (2일차)
**작성일**: 2026-02-22  
**프로젝트**: 다공(茶工) - https://dagong-bi1.pages.dev

---

## 📋 **현재 상태**

### ✅ **1일차 완료 (2026-02-21)**
- ✓ 소유권 확인 완료
- ✓ 사이트맵 제출: https://dagong-bi1.pages.dev/sitemap.xml
- ✓ 홈페이지 색인 요청 완료
- ✓ 교육 커리큘럼 색인 요청 완료

### ⏳ **2일차 작업 (2026-02-22) - 지금 진행**
할당량 초기화 완료! 아래 6개 페이지 색인 요청 필요:

1. **상품 페이지** (최우선): https://dagong-bi1.pages.dev/products
2. **지역 페이지**: https://dagong-bi1.pages.dev/regions
3. **생산자 페이지**: https://dagong-bi1.pages.dev/producers
4. **체험 페이지**: https://dagong-bi1.pages.dev/experiences
5. **교육 신청 페이지**: https://dagong-bi1.pages.dev/education/apply
6. **이벤트 페이지**: https://dagong-bi1.pages.dev/events

---

## 🎯 **단계별 색인 요청 방법**

### **Step 1: Google Search Console 접속**
1. https://search.google.com/search-console 접속
2. 로그인 후 속성 선택: `https://dagong-bi1.pages.dev`

### **Step 2: 각 페이지 색인 요청 (6번 반복)**

#### **📄 페이지 1: 상품 페이지** (가장 중요!)
```
URL: https://dagong-bi1.pages.dev/products
```
1. 상단 검색창에 위 URL 복사 → 붙여넣기 → Enter
2. "URL 검사" 결과 화면 대기 (10~30초)
3. 오른쪽 파란색 버튼 **"색인 생성 요청"** 클릭
4. "색인 생성 요청 중..." 메시지 대기 (1~2분)
5. **"색인 생성 요청됨"** 녹색 확인 메시지 표시 ✓
6. **"완료"** 버튼 클릭

---

#### **📄 페이지 2: 지역 페이지**
```
URL: https://dagong-bi1.pages.dev/regions
```
*(위와 동일한 6단계 반복)*

---

#### **📄 페이지 3: 생산자 페이지**
```
URL: https://dagong-bi1.pages.dev/producers
```
*(위와 동일한 6단계 반복)*

---

#### **📄 페이지 4: 체험 페이지**
```
URL: https://dagong-bi1.pages.dev/experiences
```
*(위와 동일한 6단계 반복)*

---

#### **📄 페이지 5: 교육 신청 페이지**
```
URL: https://dagong-bi1.pages.dev/education/apply
```
*(위와 동일한 6단계 반복)*

---

#### **📄 페이지 6: 이벤트 페이지**
```
URL: https://dagong-bi1.pages.dev/events
```
*(위와 동일한 6단계 반복)*

---

## ⏱️ **예상 소요 시간**
- 페이지당 2~3분
- 총 6개 페이지: **약 15~20분**

---

## 📊 **완료 후 체크리스트**

### **즉시 확인 (색인 요청 완료 직후)**
- [ ] 6개 페이지 모두 "색인 생성 요청됨" 메시지 확인
- [ ] Google Search Console → "URL 검사" 탭에서 요청 기록 확인

### **3시간 후 확인**
```bash
# Google 검색창에 입력
site:dagong-bi1.pages.dev
```
**예상 결과**: 8개 페이지 (1일차 2개 + 2일차 6개)

### **24시간 후 확인**
1. **Google Search Console → "개요" 탭**
   - "색인 생성됨" 수치 확인 → 예상: **10개**
   
2. **Google Search Console → "Sitemaps" 탭**
   - 상태: **성공**
   - 발견됨: **10개**
   - 색인 생성됨: **10개**

3. **Google 검색 확인**
   ```bash
   site:dagong-bi1.pages.dev
   ```
   **예상 결과**: 10개 페이지 전체 노출

---

## 🚨 **문제 해결**

### **문제 1: "할당량 초과" 메시지가 다시 나타남**
**원인**: 하루 10~20개 제한 도달  
**해결**: 
- 가장 중요한 페이지 3~5개만 우선 요청
- 나머지는 내일(UTC 자정 이후) 재시도
- **또는**: 아무것도 하지 않고 sitemap 자동 크롤링 대기 (24~48시간)

### **문제 2: "URL이 Google에 등록되어 있지 않음"**
**원인**: 정상 상태 (신규 페이지)  
**해결**: 계속 진행 → "색인 생성 요청" 클릭

### **문제 3: "크롤링 차단됨"**
**원인**: robots.txt 또는 noindex 태그  
**해결**: 
```bash
# 터미널에서 확인
curl -s https://dagong-bi1.pages.dev/robots.txt
curl -s https://dagong-bi1.pages.dev/products | grep -i noindex
```
결과에 "Disallow" 또는 "noindex" 있으면 문제 → 수정 필요

---

## 📈 **SEO 효과 예상 타임라인**

| 시점 | 예상 결과 |
|------|-----------|
| **즉시** | 색인 요청 완료 (GSC에 기록) |
| **1~3시간 후** | Google 검색 `site:dagong-bi1.pages.dev` → 8개 페이지 노출 |
| **24시간 후** | 10개 페이지 전체 색인 완료 |
| **3일 후** | 키워드 검색 시작 노출 ("다공", "한국 차 교육") |
| **1주일 후** | 주요 키워드 1~3페이지 진입 가능 |
| **1개월 후** | 안정적인 검색 트래픽 유입 시작 |

---

## 🔗 **관련 링크**

- **Google Search Console**: https://search.google.com/search-console
- **다공 웹사이트**: https://dagong-bi1.pages.dev
- **사이트맵**: https://dagong-bi1.pages.dev/sitemap.xml
- **robots.txt**: https://dagong-bi1.pages.dev/robots.txt
- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong
- **Instagram**: https://www.instagram.com/korea_teacraft/

---

## 💡 **추가 최적화 팁**

### **즉시 실행 가능한 마케팅 활동**
1. **Instagram 프로필에 웹사이트 링크 추가**
   - https://www.instagram.com/korea_teacraft/
   - 프로필 편집 → 웹사이트 → `https://dagong-bi1.pages.dev` 입력

2. **Instagram 스토리에 링크 스티커 추가**
   - "다공 웹사이트 오픈!" 스토리 게시
   - 링크 스티커 → 웹사이트 URL

3. **네이버 블로그 포스팅**
   - 제목: "한국 전통 차와 공예품, 협동조합 카페 다공 오픈"
   - 내용: 웹사이트 소개 + 링크 3~5회 삽입

4. **카카오톡 오픈채팅방 공유**
   - 차 관련, 협동조합 관련 오픈채팅방에 링크 공유

---

## 📝 **작성자**
다공(茶工) 개발팀  
최종 수정: 2026-02-22
