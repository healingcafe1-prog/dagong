# 📊 네이버 서치어드바이저 등록 가이드

## ✅ 현재 상태

### 1. 사이트맵 준비 완료
- **URL**: https://dagong.co.kr/sitemap.xml
- **등록된 페이지**: 11개
  - 메인 페이지 (우선순위 1.0)
  - 상품 페이지 6개 (우선순위 0.8-0.9)
  - 선물추천 (우선순위 0.9)
  - 체험/교육, 지역, 생산자 (우선순위 0.7-0.8)

### 2. robots.txt 설정 완료
- **URL**: https://dagong.co.kr/robots.txt
- 네이버 봇(Yeti) 허용
- 크롤링 금지 경로: /admin, /api/, /login, /logout, /seller/

### 3. 소유권 인증 파일 준비 완료
- **파일**: naverf3735d7a56c13e617b246ff2b6e0da46.html
- **URL**: https://dagong.co.kr/naverf3735d7a56c13e617b246ff2b6e0da46.html

---

## 📝 네이버 서치어드바이저 등록 절차

### 1단계: 사이트 등록 및 소유권 인증

1. **네이버 서치어드바이저 접속**
   - URL: https://searchadvisor.naver.com/
   - 네이버 계정으로 로그인

2. **사이트 등록**
   - 좌측 메뉴에서 "웹마스터 도구" 클릭
   - "사이트 등록" 버튼 클릭
   - URL 입력: `https://dagong.co.kr`

3. **소유권 인증**
   - 인증 방법 선택: "HTML 파일 업로드"
   - 이미 업로드된 파일 확인: `naverf3735d7a56c13e617b246ff2b6e0da46.html`
   - "소유 확인" 버튼 클릭
   - ✅ 인증 완료 확인

---

### 2단계: 사이트맵 제출

1. **사이트맵 URL 제출**
   - 좌측 메뉴에서 "요청" > "사이트맵 제출" 클릭
   - 사이트맵 URL 입력: `https://dagong.co.kr/sitemap.xml`
   - "확인" 버튼 클릭

2. **사이트맵 검증**
   ```bash
   # 사이트맵 접근 테스트
   curl -I https://dagong.co.kr/sitemap.xml
   # 예상 결과: HTTP/1.1 200 OK
   ```

---

### 3단계: 크롤링 요청

1. **주요 페이지 수동 크롤링 요청**
   - 좌측 메뉴에서 "요청" > "페이지 수집 요청" 클릭
   - 다음 URL들을 하나씩 제출:
     ```
     https://dagong.co.kr/
     https://dagong.co.kr/products
     https://dagong.co.kr/products?type=tea
     https://dagong.co.kr/products?type=craft
     https://dagong.co.kr/products?type=gift_set
     https://dagong.co.kr/gift-recommendation.html
     https://dagong.co.kr/experiences
     https://dagong.co.kr/regions
     https://dagong.co.kr/producers
     ```

2. **크롤링 상태 확인**
   - 좌측 메뉴에서 "검증" > "사이트 간단 체크" 클릭
   - robots.txt 확인
   - 사이트맵 확인

---

### 4단계: 검색노출 확인

1. **네이버 검색 테스트**
   - 1-2일 후 네이버에서 다음과 같이 검색:
     ```
     site:dagong.co.kr
     ```
   - 다공 사이트의 페이지들이 검색 결과에 나타나야 함

2. **수집 현황 확인**
   - 서치어드바이저 > "통계" > "수집 현황" 메뉴
   - 수집된 페이지 수 확인
   - 색인된 페이지 수 확인

---

## 🔍 SEO 최적화 현황

### 메타 태그 설정
모든 페이지에 다음 메타 태그가 포함되어 있습니다:
```html
<meta name="description" content="지역 특산품, 공예품, 체험 상품을 판매하는 다공 마켓플레이스">
<meta name="keywords" content="다공, 지역특산품, 공예품, 한국차, 체험, 펀딩">
<meta property="og:title" content="다공 - 지역 특산품 마켓플레이스">
<meta property="og:description" content="전국의 특별한 지역 특산품과 공예품을 만나보세요">
<meta property="og:url" content="https://dagong.co.kr">
<meta property="og:type" content="website">
```

### 구조화된 데이터
- 상품 페이지: Product 스키마
- 리뷰: Review 스키마
- 평점: AggregateRating 스키마

---

## 📈 추가 최적화 권장사항

### 1. 네이버 블로그/포스트 활용
- 다공 공식 네이버 블로그 개설
- 상품 소개 및 제작자 인터뷰 포스팅
- 블로그에서 다공 사이트로 링크 연결

### 2. 네이버 플레이스 등록
- 오프라인 매장이 있다면 네이버 플레이스 등록
- 온라인 전용이면 "비즈니스 홈" 활용

### 3. 네이버 쇼핑 입점
- 네이버 쇼핑에 상품 등록
- 상품 정보 연동 (EP, XML 파일)

### 4. 컨텐츠 최적화
- 상품명에 검색 키워드 포함
  - 예: "제주 한라봉 선물세트", "전통 도자기 찻잔"
- 상품 설명을 최소 200자 이상 작성
- 고해상도 이미지 사용 (최소 800x800px)

### 5. 내부 링크 구조
- 메인 페이지에서 모든 카테고리 페이지로 링크
- 상품 상세 페이지에서 관련 상품으로 링크
- 빵 부스러기(Breadcrumb) 네비게이션 추가

---

## 🚀 예상 검색노출 일정

| 단계 | 예상 소요 시간 | 상태 |
|------|--------------|------|
| 사이트 소유권 인증 | 즉시 | ✅ 준비 완료 |
| 사이트맵 제출 | 즉시 | ✅ 준비 완료 |
| 크롤링 시작 | 1-2일 | ⏳ 대기 중 |
| 첫 검색노출 | 3-7일 | ⏳ 대기 중 |
| 전체 페이지 색인 | 1-2주 | ⏳ 대기 중 |

---

## 📞 문제 해결

### 사이트맵이 제출되지 않는 경우
```bash
# 사이트맵 형식 검증
curl https://dagong.co.kr/sitemap.xml | head -20

# robots.txt 확인
curl https://dagong.co.kr/robots.txt
```

### 크롤링이 진행되지 않는 경우
1. robots.txt에서 Yeti 봇이 허용되어 있는지 확인
2. 사이트가 정상적으로 접근 가능한지 확인
3. 서버 응답 속도 확인 (2초 이내 권장)

### 검색노출이 되지 않는 경우
1. 서치어드바이저에서 "사이트 간단 체크" 실행
2. "수집 현황" 메뉴에서 오류 확인
3. 메타 태그 및 컨텐츠 최적화

---

## 📊 모니터링 항목

### 네이버 서치어드바이저에서 확인
- 수집된 페이지 수
- 색인된 페이지 수
- 검색 노출 수
- 클릭 수
- 평균 노출 순위

### Google Search Console도 함께 등록 권장
- URL: https://search.google.com/search-console
- 동일한 사이트맵 제출: https://dagong.co.kr/sitemap.xml

---

## ✅ 체크리스트

- [x] sitemap.xml 생성 및 배포
- [x] robots.txt 생성 및 배포
- [x] 네이버 소유권 인증 파일 업로드
- [ ] 네이버 서치어드바이저 사이트 등록
- [ ] 네이버 서치어드바이저 소유권 인증
- [ ] 사이트맵 제출
- [ ] 주요 페이지 크롤링 요청
- [ ] Google Search Console 등록
- [ ] 3-7일 후 검색노출 확인

---

## 🔗 유용한 링크

- **네이버 서치어드바이저**: https://searchadvisor.naver.com/
- **네이버 웹마스터 가이드**: https://searchadvisor.naver.com/guide
- **Google Search Console**: https://search.google.com/search-console
- **사이트맵 테스트 도구**: https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

**최종 업데이트**: 2026-04-27
**작성자**: AI Developer
**문서 버전**: 1.0
