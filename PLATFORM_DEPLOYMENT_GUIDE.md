# 🚀 플랫폼 배포 및 연동 가이드

## 📦 데이터 백업 완료

✅ **백업 파일**: https://www.genspark.ai/api/files/s/urXDY7fc  
✅ **백업 내용**: 
- 카테고리 27개 (차 7개, 공예 11개, 선물 4개, 지역특산 5개)
- 지역 17개 (차산지 8개, 공예산지 9개)
- 이벤트 28개 (12개월 연중 이벤트)
- 상품 21개
- 생산자 15명

---

## 🔍 1단계: 검색엔진 등록 (무료, 즉시 가능)

### ✅ Google Search Console
**등록 링크**: https://search.google.com/search-console

**절차**:
1. Google 계정으로 로그인
2. "속성 추가" 클릭
3. URL 입력: `https://dagong-bi1.pages.dev`
4. 소유권 확인 (HTML 태그 방식)
5. sitemap.xml 제출: `https://dagong-bi1.pages.dev/sitemap.xml`

**소유권 확인 태그** (HTML 메타태그 필요 시):
```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

---

### ✅ 네이버 웹마스터 도구
**등록 링크**: https://searchadvisor.naver.com

**절차**:
1. 네이버 계정으로 로그인
2. "사이트 등록" 클릭
3. URL 입력: `https://dagong-bi1.pages.dev`
4. 소유권 확인 (**이미 완료**: 네이버 인증 태그 있음)
5. sitemap.xml 제출: `https://dagong-bi1.pages.dev/sitemap.xml`

**이미 추가된 네이버 인증 태그**:
```html
<meta name="naver-site-verification" content="51a0658e89bc8816eeb448bf53b1862b86609662"/>
```

---

### ✅ 다음(카카오) 검색등록
**등록 링크**: https://register.search.daum.net/index.daum

**절차**:
1. 카카오 계정으로 로그인
2. 사이트 등록 신청
3. URL 입력: `https://dagong-bi1.pages.dev`
4. 사이트 정보 입력 (제목, 설명, 키워드)
5. 승인 대기 (1~2주 소요)

---

## 🛒 2단계: 쇼핑몰 플랫폼 연동 (사업자등록 필요)

⚠️ **중요**: 각 플랫폼 연동 전 필수 준비사항:
1. **사업자등록증** (개인/법인)
2. **통신판매업신고증** (전자상거래법)
3. **개인정보처리방침**, **이용약관**, **환불/교환 정책**

---

### 1️⃣ 네이버 쇼핑 (스마트스토어)
**등록 링크**: https://sell.smartstore.naver.com

**수수료**: 2~5% (카테고리별 상이)

**연동 방법**:
- **방법 1**: 수동 상품 등록 (스마트스토어 관리자 페이지)
- **방법 2**: API 연동 (EPP, 자동화)

**API 연동 절차**:
1. 스마트스토어 입점 승인
2. 판매자 센터 > 상품 관리 > API 연동 신청
3. Client ID/Secret 발급
4. 상품 데이터 XML/JSON 형식으로 전송

**필요한 API**:
- 상품 등록 API
- 재고 관리 API
- 주문 관리 API

---

### 2️⃣ 쿠팡 (Coupang Wing)
**등록 링크**: https://wing.coupang.com

**수수료**: 10~15% (카테고리별 상이)

**연동 방법**:
- 쿠팡 Wing 입점 신청 (심사 1~2주)
- API 연동 또는 Wing Seller Admin에서 수동 등록

**API 연동**:
- Coupang Wing Open API 사용
- 상품, 주문, 정산 데이터 자동화

---

### 3️⃣ 11번가
**등록 링크**: https://spc.11st.co.kr

**수수료**: 7~12%

**연동 방법**:
- 11번가 입점 신청
- Open API 연동 또는 수동 등록

---

### 4️⃣ G마켓/옥션
**등록 링크**: http://escrow.gmarket.co.kr

**수수료**: 8~15%

**연동 방법**:
- 이베이코리아 입점 신청
- G마켓/옥션 통합 관리
- Open API 연동 가능

---

### 5️⃣ 카카오 쇼핑
**등록 링크**: https://gift.kakao.com/merchant

**수수료**: 협의 필요

**특징**:
- 카카오톡 선물하기 연동
- 모바일 특화 플랫폼
- 입점 심사 필요

---

## 📊 3단계: 상품 데이터 Feed 생성

각 플랫폼은 **상품 데이터 Feed**를 요구합니다.  
형식: XML, JSON, CSV

**다공 현재 상품 데이터**:
- 총 21개 상품
- API 엔드포인트: `https://dagong-bi1.pages.dev/api/products`

**필요한 필드**:
```json
{
  "product_id": "1",
  "name": "제주 유기농 첫물차",
  "price": "35000",
  "category": "녹차",
  "description": "제주도에서 재배한 유기농 첫물차",
  "image_url": "https://dagong-bi1.pages.dev/images/products/jeju-tea.jpg",
  "stock": "100",
  "origin": "제주도",
  "producer": "제주 차농원"
}
```

---

## 💡 수수료 및 운영규칙 관리

### ✅ 배포 후 조정 가능한 항목:

1. **플랫폼별 수수료율**
   - 각 플랫폼의 판매 수수료는 계약 시 협의
   - 배포 후 플랫폼별 성과에 따라 재협상 가능

2. **상품 가격**
   - 플랫폼별 다른 가격 책정 가능
   - 할인/프로모션 자유 조정

3. **환불/교환 정책**
   - 초기 설정 후 개선 가능
   - 법적 기준 준수 필요

4. **배송비 정책**
   - 무료배송 기준 조정 가능
   - 지역별 차등 배송비 설정

5. **이벤트/할인**
   - 월별 이벤트 활성화/비활성화
   - 할인율 조정 자유

---

## 🎯 추천 배포 순서

### **1차: 검색엔진 등록 (즉시 가능)** ✅
- Google Search Console
- 네이버 웹마스터 도구
- 다음(카카오) 검색등록

### **2차: 법적 준비** (1~2주 소요)
- 사업자등록증 발급
- 통신판매업신고
- 약관/정책 문서 작성

### **3차: 주요 플랫폼 입점** (2~4주 소요)
- 네이버 스마트스토어 (우선)
- 쿠팡 Wing
- 11번가/G마켓

### **4차: 추가 플랫폼 확장**
- 카카오 쇼핑
- 기타 전문 플랫폼

---

## 🔄 자동화 연동 구현 (향후 개발)

현재 다공 API를 활용해 각 플랫폼에 상품 데이터를 자동으로 전송하는 시스템 구축 가능:

```javascript
// 예시: 네이버 쇼핑 API 연동
async function syncToNaverShopping() {
  const products = await fetch('https://dagong-bi1.pages.dev/api/products')
  const data = await products.json()
  
  // 네이버 API로 상품 업로드
  for (const product of data.products) {
    await uploadToNaver(product)
  }
}
```

---

## ✅ 현재 완료 사항

1. ✅ 검색엔진 최적화 (SEO)
   - sitemap.xml 생성
   - robots.txt 생성
   - 메타 태그 최적화

2. ✅ 데이터 완전 백업
   - 백업 파일: https://www.genspark.ai/api/files/s/urXDY7fc
   - 모든 데이터 보존 완료

3. ✅ 상품 API 준비
   - REST API 엔드포인트 구축
   - JSON 형식 데이터 제공

---

## 📞 다음 단계 안내

**즉시 시작 가능**:
1. Google Search Console 등록
2. 네이버 웹마스터 도구 sitemap 제출
3. 다음 검색등록 신청

**준비 필요**:
1. 사업자등록증, 통신판매업신고증 준비
2. 네이버 스마트스토어 입점 신청
3. 약관/정책 문서 작성

**수수료는 배포 후에도 조정 가능**하며, 각 플랫폼과의 협의를 통해 최적화할 수 있습니다! 🚀
