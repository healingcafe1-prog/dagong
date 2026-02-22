# Google 색인 진행 상황 모니터링 가이드

**프로젝트**: 다공(茶工)  
**날짜**: 2026-02-22  
**상태**: 할당량 초과로 일부 페이지 색인 요청 보류

---

## 📊 **현재 색인 요청 현황**

### ✅ **완료된 페이지 (긴급 색인 요청)**
1. **홈페이지**: `https://dagong-bi1.pages.dev/`
   - 요청일: 2026-02-21
   - 예상 노출: 2026-02-22 01:00 KST (3시간 후)

2. **교육 커리큘럼**: `https://dagong-bi1.pages.dev/education/curriculum`
   - 요청일: 2026-02-21
   - 예상 노출: 2026-02-22 01:00 KST (3시간 후)

3. **상품 페이지**: `https://dagong-bi1.pages.dev/products`
   - 요청일: 2026-02-22 (재시도)
   - 예상 노출: 2026-02-22 16:00 KST (3시간 후)

### ⚠️ **부분 완료 (할당량 차감)**
4. **지역 페이지**: `https://dagong-bi1.pages.dev/regions`
   - 요청일: 2026-02-22
   - 상태: 중복 요청으로 할당량 차감됨 (색인 성공 여부 미확인)

### ❌ **할당량 초과로 보류**
5. **생산자 페이지**: `https://dagong-bi1.pages.dev/producers`
6. **체험 페이지**: `https://dagong-bi1.pages.dev/experiences`
7. **교육 신청**: `https://dagong-bi1.pages.dev/education/apply`
8. **이벤트**: `https://dagong-bi1.pages.dev/events`

### 🤖 **자동 크롤링 대기 (sitemap.xml)**
- **사이트맵 URL**: `https://dagong-bi1.pages.dev/sitemap.xml`
- **제출일**: 2026-02-21
- **상태**: 처리 중 (Google이 자동 크롤링 예정)
- **예상 완료**: 2026-02-23~24 (24~48시간)

---

## 🔍 **색인 상태 확인 방법**

### **방법 1: Google 검색 (가장 간단)**

#### **3시간 후 확인 (2026-02-22 16:00 KST)**
```
Google 검색창에 입력:
site:dagong-bi1.pages.dev

예상 결과: 3~4개 페이지 노출
(홈, 교육, 상품, 지역?)
```

#### **24시간 후 확인 (2026-02-23 13:00 KST)**
```
site:dagong-bi1.pages.dev

예상 결과: 10개 페이지 전체 노출
```

### **방법 2: Google Search Console**

1. **"개요" 탭 확인**
   - 경로: https://search.google.com/search-console → 개요
   - 지표: "색인 생성됨" 수치
   - 예상: 3~4개 (3시간 후) → 10개 (24시간 후)

2. **"Sitemaps" 탭 확인**
   - 경로: https://search.google.com/search-console → Sitemaps
   - 상태: "성공"
   - 발견됨: 10개
   - 색인 생성됨: 0~10개 (시간 경과에 따라 증가)

3. **"URL 검사" 탭**
   - 각 페이지 URL 입력
   - 상태 확인: "URL이 Google에 등록되어 있음" = 색인 완료 ✅

---

## 📅 **예상 타임라인**

| 시점 | 확인 방법 | 예상 결과 | 체크 |
|------|-----------|-----------|------|
| **2026-02-22 16:00** (3시간 후) | `site:dagong-bi1.pages.dev` | 3~4개 페이지 | [ ] |
| **2026-02-23 09:00** (내일 아침) | 할당량 초기화 | 색인 요청 가능 | [ ] |
| **2026-02-23 13:00** (24시간 후) | `site:dagong-bi1.pages.dev` | 10개 페이지 | [ ] |
| **2026-02-23 13:00** | GSC "개요" → 색인 | 10개 | [ ] |
| **2026-02-24** (48시간 후) | 키워드 검색 시작 | "다공" 1페이지 | [ ] |
| **2026-02-29** (1주일 후) | 안정적 노출 | 주요 키워드 상위 | [ ] |

---

## 🚀 **다음 행동 계획**

### **✅ 권장: 자동 크롤링 대기 (아무것도 안 함)**

**이유**:
- sitemap.xml이 이미 제출됨
- Google이 24~48시간 내 자동으로 모든 페이지 크롤링
- 할당량 낭비 없음
- 가장 안정적

**실행**:
- 아무것도 하지 않음
- 24시간 후 `site:dagong-bi1.pages.dev` 검색
- 10개 페이지 확인 ✅

---

### **⚡ 대안: 내일 아침 나머지 페이지 색인 요청**

**시기**: 2026-02-23 09:00 KST (UTC 자정 이후)

**실행 순서**:
1. Google Search Console 접속
2. 나머지 4개 페이지 색인 요청:
   ```
   1. https://dagong-bi1.pages.dev/producers   (생산자)
   2. https://dagong-bi1.pages.dev/experiences (체험)
   3. https://dagong-bi1.pages.dev/education/apply (교육 신청)
   4. https://dagong-bi1.pages.dev/events      (이벤트)
   ```
3. 각 페이지마다 "색인 생성 요청" 클릭
4. 3시간 후 확인: `site:dagong-bi1.pages.dev` → 7~8개 페이지

**장점**:
- 1~3시간 내 빠른 노출
- 긴급 페이지 우선 처리

**단점**:
- 할당량 4개 추가 사용
- 수동 작업 필요 (10분)

---

## 📈 **SEO 효과 측정**

### **Google Search Console 지표**

**확인 위치**: https://search.google.com/search-console → 실적

| 지표 | 목표 (1주일) | 현재 | 달성률 |
|------|-------------|------|--------|
| 색인 페이지 수 | 10개 | __개 | ___% |
| 클릭 수 (7일) | 50회 | __회 | ___% |
| 노출 수 (7일) | 500회 | __회 | ___% |
| 평균 CTR | 10% | __% | ___% |
| 평균 게재 순위 | 10위 이내 | __위 | ___% |

### **키워드별 순위 (1주일 후 목표)**

| 키워드 | 목표 순위 | 현재 순위 | 달성 |
|--------|----------|----------|------|
| 다공 | 1페이지 (1~10위) | - | [ ] |
| 한국 차 교육 | 2~3페이지 (11~30위) | - | [ ] |
| 차 공예품 카페 | 1~2페이지 (1~20위) | - | [ ] |
| 협동조합 카페 창업 | 2~3페이지 (11~30위) | - | [ ] |

---

## 💡 **SEO 가속 팁**

### **즉시 실행 가능 (무료)**

1. **Instagram 프로필 링크 추가**
   - https://www.instagram.com/korea_teacraft/
   - 프로필 편집 → 웹사이트 → `https://dagong-bi1.pages.dev`

2. **Instagram 스토리 게시**
   - "다공 웹사이트 오픈!" 텍스트
   - 링크 스티커 → 웹사이트 URL

3. **네이버 블로그 포스팅**
   - 제목: "한국 전통 차와 공예품, 협동조합 카페 다공"
   - 내용: 웹사이트 소개 + 링크 3~5회 삽입

4. **카카오톡 오픈채팅방**
   - 차 관련 오픈채팅방에 링크 공유
   - 협동조합 관련 커뮤니티에 공유

5. **YouTube 커뮤니티 탭**
   - 관련 채널에서 소개 게시물

---

## 🚨 **문제 발생 시 대응**

### **문제 1: 24시간 후에도 색인 안 됨**

**확인**:
```bash
# 사이트맵 상태 확인
curl -s https://dagong-bi1.pages.dev/sitemap.xml | head -20

# robots.txt 확인
curl -s https://dagong-bi1.pages.dev/robots.txt
```

**해결**:
- Google Search Console → "Sitemaps" → 상태 확인
- "오류" 표시 시 → 사이트맵 재제출
- robots.txt에 "Disallow" 있으면 제거

### **문제 2: 일부 페이지만 색인됨**

**원인**: 페이지 품질 문제 또는 중복 콘텐츠

**해결**:
- Google Search Console → "적용 범위" 탭
- "제외됨" 항목 확인
- 해당 페이지 개선 후 재요청

### **문제 3: 색인됐지만 검색에 안 나옴**

**원인**: 키워드 관련성 낮음

**해결**:
- 페이지 제목, 메타 설명 최적화
- 본문에 핵심 키워드 자연스럽게 삽입
- 내부 링크 강화

---

## 🔗 **관련 문서**

- **색인 요청 가이드 (1일차)**: `/home/user/webapp/GOOGLE_REGISTRATION_STEP_BY_STEP.md`
- **색인 요청 가이드 (2일차)**: `/home/user/webapp/INDEXING_REQUEST_GUIDE_DAY2.md`
- **체크리스트**: `/home/user/webapp/INDEXING_CHECKLIST.md`
- **속성 선택 오류 해결**: `/home/user/webapp/PROPERTY_SELECTION_ERROR_FIX.md`
- **오류 진단**: `/home/user/webapp/GOOGLE_ERROR_DIAGNOSIS.md`

---

## 📝 **진행 상황 메모**

### **2026-02-22 진행 상황**
```
✅ 속성 전환 완료: https://dagong-bi1.pages.dev
✅ URL 검사 성공: /producers
❌ 색인 요청 실패: 할당량 초과

다음 작업:
[ ] 3시간 후 Google 검색 확인
[ ] 24시간 후 GSC 개요 확인
[ ] 내일 아침 나머지 페이지 색인 요청 (선택)
```

---

**작성일**: 2026-02-22  
**작성자**: 다공 개발팀  
**최종 수정**: 2026-02-22 13:50 UTC
