# 네이버 서치어드바이저 등록 가이드

## 📋 준비 완료 항목

### 1. 사이트맵 (Sitemap)
- **URL**: https://dagong.co.kr/sitemap.xml
- **상태**: ✅ 생성 완료 (11개 URL 포함)
- **내용**:
  - 메인 페이지 (priority: 1.0)
  - 상품 카테고리 페이지 (한국차, 공예품, 선물세트, 지역특산물)
  - 선물추천 페이지
  - 체험/교육 페이지
  - 지역별, 생산자 페이지
  
### 2. RSS 피드
- **URL**: https://dagong.co.kr/rss.xml
- **상태**: ✅ 생성 완료 (8개 항목)
- **내용**: 주요 카테고리 및 페이지 정보

### 3. robots.txt
- **URL**: https://dagong.co.kr/robots.txt
- **상태**: ✅ 생성 완료
- **내용**: 네이버(Yeti), 구글(Googlebot), 빙(Bingbot) 크롤링 허용

### 4. 소유확인 파일
- **파일**: naverf3735d7a56c13e617b246ff2b6e0da46.html
- **URL**: https://dagong.co.kr/naverf3735d7a56c13e617b246ff2b6e0da46.html
- **상태**: ✅ 이미 등록됨

---

## 🚀 네이버 서치어드바이저 등록 절차

### Step 1: 네이버 서치어드바이저 접속
1. **URL**: https://searchadvisor.naver.com/
2. 네이버 계정으로 로그인

### Step 2: 사이트 등록 및 소유 확인
1. **사이트 추가** 버튼 클릭
2. 사이트 URL 입력: `https://dagong.co.kr`
3. 소유 확인 방법 선택: **HTML 파일 업로드** (이미 완료됨)
4. 소유 확인 완료

### Step 3: 사이트맵 제출
1. 좌측 메뉴에서 **요청 > 사이트맵 제출** 클릭
2. 사이트맵 URL 입력:
   ```
   https://dagong.co.kr/sitemap.xml
   ```
3. **확인** 버튼 클릭

### Step 4: RSS 제출
1. 좌측 메뉴에서 **요청 > RSS 제출** 클릭
2. RSS URL 입력:
   ```
   https://dagong.co.kr/rss.xml
   ```
3. **확인** 버튼 클릭

### Step 5: 웹페이지 수집 요청
다음 키워드로 **웹페이지 수집 > URL 수집 요청**에서 개별 수집 요청:

#### 메인 브랜드명
1. `다공` - https://dagong.co.kr/
2. `한국차공예플랫폼` - https://dagong.co.kr/
3. `dagong` - https://dagong.co.kr/
4. `dagong.co.kr` - https://dagong.co.kr/

#### 주요 카테고리
5. `한국차` - https://dagong.co.kr/products?type=tea
6. `공예품` - https://dagong.co.kr/products?type=craft
7. `선물세트` - https://dagong.co.kr/products?type=gift_set
8. `선물추천` - https://dagong.co.kr/gift-recommendation.html
9. `체험교육` - https://dagong.co.kr/experiences
10. `지역특산물` - https://dagong.co.kr/products?type=local

---

## 📝 웹페이지 수집 요청 URL 목록

### 복사해서 제출할 URL 목록:

```
https://dagong.co.kr/
https://dagong.co.kr/products
https://dagong.co.kr/products?type=tea
https://dagong.co.kr/products?type=craft
https://dagong.co.kr/products?type=gift_set
https://dagong.co.kr/products?type=local
https://dagong.co.kr/gift-recommendation.html
https://dagong.co.kr/experiences
https://dagong.co.kr/regions
https://dagong.co.kr/producers
```

### 제출 방법:
1. 네이버 서치어드바이저 > **요청 > 웹페이지 수집** 클릭
2. **URL 수집 요청** 탭 선택
3. 위 URL을 한 줄씩 입력하여 제출 (한 번에 최대 10개)

---

## 🔍 검색 노출 확인 방법

### 1. 사이트 인덱싱 확인
네이버 검색창에 다음과 같이 입력:
```
site:dagong.co.kr
```

### 2. 키워드별 검색 확인
- `다공`
- `한국차 플랫폼`
- `한국차 공예품`
- `한국차 선물`
- `전통차 온라인`
- `수공예품 쇼핑몰`

---

## ⏰ 예상 소요 시간

- **사이트맵/RSS 제출**: 즉시
- **웹페이지 수집 요청**: 즉시
- **크롤링 완료**: 24시간 ~ 3일
- **검색 노출**: 3일 ~ 1주일

---

## 📊 추가 최적화 권장사항

### 1. 메타 태그 최적화
각 페이지에 다음 메타 태그가 포함되어 있는지 확인:
- `<title>`: 페이지별 고유 제목
- `<meta name="description">`: 페이지 설명 (150자 이내)
- `<meta name="keywords">`: 주요 키워드

### 2. 오픈그래프(OG) 태그
소셜 미디어 공유를 위한 OG 태그 추가:
- `og:title`
- `og:description`
- `og:image`
- `og:url`

### 3. 구조화된 데이터 (Schema.org)
상품 페이지에 Product 스키마 추가:
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "상품명",
  "image": "상품이미지URL",
  "description": "상품설명",
  "brand": "다공",
  "offers": {
    "@type": "Offer",
    "price": "가격",
    "priceCurrency": "KRW"
  }
}
```

---

## 🎯 등록 체크리스트

- [ ] 네이버 서치어드바이저 로그인
- [ ] 사이트 등록 및 소유 확인 (HTML 파일)
- [ ] 사이트맵 제출 (https://dagong.co.kr/sitemap.xml)
- [ ] RSS 제출 (https://dagong.co.kr/rss.xml)
- [ ] 웹페이지 수집 요청 (10개 URL)
- [ ] 브랜드명 검색어 등록 (다공, 한국차공예플랫폼, dagong, dagong.co.kr)
- [ ] 크롤링 요청 확인
- [ ] 3일 후 검색 노출 확인 (site:dagong.co.kr)

---

## 📞 문제 발생 시 확인사항

### 크롤링이 안 되는 경우
1. robots.txt가 크롤링을 차단하고 있는지 확인
   - https://dagong.co.kr/robots.txt
2. 사이트가 정상적으로 접속되는지 확인
3. 네이버 서치어드바이저에서 크롤링 오류 확인

### 검색에 노출이 안 되는 경우
1. 사이트 색인 상태 확인 (site:dagong.co.kr)
2. 페이지 품질 개선 (콘텐츠, 속도, 모바일 최적화)
3. 백링크 확보 (다른 사이트에서 링크)

---

## 📚 참고 자료

- 네이버 서치어드바이저: https://searchadvisor.naver.com/
- 네이버 검색 등록 가이드: https://searchadvisor.naver.com/guide
- 구글 서치 콘솔: https://search.google.com/search-console
- 빙 웹마스터 도구: https://www.bing.com/webmasters

