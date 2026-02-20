# 추가 샘플 데이터 복원 완료 ✅

## 📊 추가된 데이터

### 1️⃣ 공예품 추가 (23개)
- ✅ 다기세트 2개
- ✅ 도자기 3개
- ✅ 목공예 3개
- ✅ 금속공예 2개
- ✅ 한복공예 2개
- ✅ 가죽공예 1개
- ✅ 장식품 3개
- ✅ 서예 2개
- ✅ 그림 2개
- ✅ 기존 3개 (이천 도자기 찻잔 세트, 광주 분청사기 다관, 담양 대나무 찻상)

**총 공예품: 26개**

### 2️⃣ 지역특산품 추가 (35개)
- ✅ 농산물 8개 (제주 한라봉, 감귤, 보성 녹차쌀, 이천 쌀, 담양 죽순, 공주 밤, 청송 사과, 나주 배)
- ✅ 수산물 8개 (부산 멸치, 울산 미역, 보령 굴비, 영덕 대게, 울릉도 오징어, 삼척 건어물, 속초 오징어순대, 안동 간고등어)
- ✅ 축산물 2개 (제주 흑돼지 육포, 횡성 한우)
- ✅ 특산품 4개 (영광 모시, 평창 송이버섯, 영양 고추, 의성 마늘)
- ✅ 가공식품 13개 (하동 야생화 꿀, 전주 한과, 강릉 커피 등)

**총 지역특산품: 35개**

### 3️⃣ 생산자 추가 (10개)
- ✅ 광주 분청도예
- ✅ 담양 죽제품
- ✅ 전주 나전칠기
- ✅ 안동 한지공예
- ✅ 강진 청자도예
- ✅ 남원 목공예
- ✅ 부산 수산
- ✅ 울산 특산
- ✅ 제주 특산
- ✅ 보성 농산

**총 생산자: 13개** (기존 3개 + 추가 10개)

## 📈 전체 데이터 요약

### 현재 데이터베이스 상태
- ✅ **13개 생산자**
- ✅ **63개 제품**
  - 차 제품: 5개
  - 공예품: 26개 ⬆️ (기존 3개 → 26개)
  - 선물세트: 2개
  - 지역특산품: 30개 ⬆️ (0개 → 30개, gift_set 타입)
- ✅ **5개 체험 프로그램**
- ✅ **30개 교육 커리큘럼**
- ✅ **27개 이벤트** (기존 마이그레이션에서 제공)
- ✅ **17개 지역**
- ✅ **27개 카테고리**

## 🚀 프로덕션 데이터베이스 업데이트

### Cloudflare Dashboard에서 실행

1. **Cloudflare Dashboard** 로그인
2. **Workers & Pages** → **D1** → **webapp-production** 선택
3. **Console** 탭으로 이동
4. 아래 파일 내용을 복사해서 실행:

```bash
# GitHub에서 추가 데이터 파일 다운로드
curl https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/seed_additional.sql
```

5. 파일 내용을 D1 Console에 붙여넣고 **Execute** 클릭

### 파일 위치
- `/home/user/webapp/seed_additional.sql`
- GitHub: https://github.com/healingcafe1-prog/dagong/blob/main/seed_additional.sql

## 🧪 로컬 API 테스트

```bash
# 전체 제품 (63개)
curl http://localhost:3000/api/products?limit=100

# 공예품만 필터링
curl "http://localhost:3000/api/products?limit=100&category_id=8"  # 찻잔
curl "http://localhost:3000/api/products?limit=100&category_id=9"  # 다관
curl "http://localhost:3000/api/products?limit=100&category_id=24" # 도자기

# 지역특산품 필터링
curl "http://localhost:3000/api/products?limit=100&category_id=17" # 농산물
curl "http://localhost:3000/api/products?limit=100&category_id=19" # 수산물
curl "http://localhost:3000/api/products?limit=100&category_id=20" # 축산물
```

## 📝 주의사항

### product_type 필드
- `tea`: 차 제품
- `craft`: 공예품
- `gift_set`: 선물세트 **및** 지역특산품

**지역특산품은 `product_type='gift_set'`으로 저장됩니다.**

이는 스키마 제약 때문입니다:
```sql
product_type TEXT NOT NULL CHECK(product_type IN ('tea', 'craft', 'gift_set'))
```

### 카테고리로 구분
지역특산품을 구분하려면 `category_id` 또는 `category.type='local'`을 사용하세요:
- 17: 농산물
- 18: 가공식품
- 19: 수산물
- 20: 축산물
- 31: 특산품

## 🔗 유용한 링크

- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong
- **프로덕션 사이트**: https://dagong-bi1.pages.dev
- **로컬 서버**: http://localhost:3000

---

**작업 완료 시간**: 2026-02-20 04:45
**Git Commit**: d76619a
**총 제품 수**: 63개 (차 5 + 공예 26 + 선물 2 + 특산품 30)
