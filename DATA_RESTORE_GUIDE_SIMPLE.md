# 🔄 데이터 복원 가이드

## 📋 현재 상황
- **문제**: Cloudflare Pages 배포 후 홈페이지에 데이터가 표시되지 않음
- **원인**: D1 데이터베이스에 데이터가 없음 (테이블은 존재하나 빈 상태)
- **해결**: Production D1에 seed 데이터를 복원

---

## 🚀 빠른 복원 방법 (5분 소요)

### Step 1: Cloudflare D1 Console 접속
**링크**: https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/workers/d1/ef76dccd-be5f-476b-851c-f9503f18dd53

1. 위 링크를 클릭하여 D1 데이터베이스 페이지로 이동
2. **Console** 탭 클릭

### Step 2: SQL 복사 & 실행
1. `/home/user/webapp/RESTORE_DATA_QUICK.sql` 파일을 엽니다
2. **전체 SQL을 복사**합니다
3. Cloudflare D1 Console에 **붙여넣기**
4. **Execute** 버튼 클릭

### Step 3: 결과 확인
SQL 실행 후 다음과 같은 결과가 표시됩니다:
```
status: Data restored successfully!
regions_count: 15
categories_count: 21
producers_count: 10
products_count: 6
featured_products: 6
events_count: 3
```

### Step 4: 홈페이지 확인
1. https://dagong-bi1.pages.dev 접속
2. **Ctrl + Shift + R** (하드 새로고침)
3. 다음 항목들이 표시되는지 확인:
   - ✅ Hero 섹션
   - ✅ 이달의 이벤트 (3개)
   - ✅ 추천 상품 (6개 - 차 3개, 공예 3개)
   - ✅ 차 산지 (8개)
   - ✅ 공예 산지 (7개)

---

## 📁 복원할 데이터

### ✅ 포함된 데이터
- **지역 (Regions)**: 15개 (차 산지 8곳 + 공예 산지 7곳)
- **카테고리 (Categories)**: 21개 (차 7개 + 공예 5개 + 선물세트 4개 + 지역특산품 4개 + 백차 1개)
- **생산자 (Producers)**: 10명 (차 생산자 5명 + 공예 생산자 5명)
- **상품 (Products)**: 6개 (모두 Featured 상품)
  - 제주 첫차 우전 50g - 28,000원
  - 하동 야생차 100g - 45,000원
  - 보성 유기농 녹차 100g - 32,000원
  - 이천 백자 찻잔 세트 (4p) - 75,000원
  - 광주 분청 다관 - 110,000원
  - 강진 청자 다기세트 - 280,000원
- **이벤트 (Events)**: 3개 (신규 회원 가입, 봄맞이 특가, 생산자 직거래 페스티벌)

### ⏳ 제외된 데이터 (추후 추가 가능)
- 관광지 (Attractions): 25개
- 체험 프로그램 (Experiences): 9개
- 체험 일정 (Experience Schedules): 22개
- 교육 신청 (Education Applications): 16개
- 추가 상품: 23개

---

## 🔍 문제 해결

### ❌ 오류: "FOREIGN KEY constraint failed"
**원인**: 데이터 삽입 순서 문제
**해결**: 
1. 기존 데이터를 먼저 삭제 (RESTORE_DATA_QUICK.sql에 포함됨)
2. 순서대로 삽입: Regions → Categories → Producers → Products → Events → Event Products

### ❌ 홈페이지가 여전히 빈 화면
**확인 사항**:
1. D1 Console에서 데이터 확인:
   ```sql
   SELECT COUNT(*) FROM products WHERE is_featured = 1;
   ```
   결과가 `6`이어야 함

2. API 확인:
   ```bash
   curl https://dagong-bi1.pages.dev/api/products?featured=true&limit=8
   ```
   6개의 상품이 반환되어야 함

3. 브라우저 캐시 삭제:
   - **Ctrl + Shift + R** (하드 새로고침)
   - 또는 시크릿 모드로 접속

### ❌ SQL 실행 오류
**확인**:
- SQL 전체가 제대로 복사되었는지 확인
- Console 탭이 올바른지 확인 (Query 탭이 아님)
- Execute 버튼을 클릭했는지 확인

---

## 📚 전체 데이터 복원 (선택사항)

더 많은 데이터가 필요한 경우 `/home/user/webapp/seed.sql` 파일을 사용하세요.

**주의**: seed.sql은 200줄 이상이므로 여러 번 나누어 실행해야 할 수 있습니다.

---

## ✅ 완료 체크리스트

- [ ] Cloudflare D1 Console 접속 완료
- [ ] RESTORE_DATA_QUICK.sql 실행 완료
- [ ] 데이터 카운트 확인 (regions: 15, products: 6, events: 3)
- [ ] 홈페이지 새로고침 후 데이터 표시 확인
- [ ] 추천 상품 6개 표시 확인
- [ ] 이벤트 3개 표시 확인
- [ ] 지역 15곳 표시 확인

---

## 🎯 다음 단계

데이터 복원이 완료되면:
1. **자동 배포 설정** - GitHub → Cloudflare Pages 연동
2. **네이버 서치어드바이저 등록** - SEO 최적화
3. **커스텀 도메인 연결** - dagong.co.kr 설정

---

## 📞 도움이 필요하신가요?

문제가 발생하면 다음 정보를 함께 알려주세요:
- 어느 단계에서 문제가 발생했나요?
- 오류 메시지가 있나요?
- 브라우저 콘솔에 오류가 표시되나요? (F12 → Console 탭)
