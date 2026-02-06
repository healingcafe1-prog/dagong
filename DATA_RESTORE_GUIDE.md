# 🚀 다공 홈페이지 전체 데이터 복원 가이드

생성일시: 2026-02-06 13:30 UTC  
상태: **Cloudflare 배포 전 원본 데이터 복원**

---

## 📋 문제 상황

**증상:**
- 홈페이지에 추천 상품이 표시되지 않음
- 이벤트 섹션이 비어있음
- 차 산지, 공예 산지 정보가 매우 제한적

**원인:**
- 로컬 개발 환경의 풍부한 데이터가 Cloudflare D1에 없음
- 기본 테스트 데이터만 있음 (보성, 하동, 이천 3개 지역만)

---

## ✅ 원본 데이터 확인

**위치:** `/home/user/webapp/seed.sql`

**내용:**
- ✅ **15개 지역** (차 산지 8개 + 공예 산지 7개)
- ✅ **19개 카테고리** (차 7 + 공예 5 + 선물 4 + 지역 5)
- ✅ **15명 생산자** (차 4 + 공예 6 + 지역 5)
- ✅ **30+ 상품** (차, 공예, 선물세트, 지역 특산품)
- ✅ **3개 이벤트** (할인, 시즌, 전시)
- ✅ **체험 프로그램, 관광지 등**

---

## 🔧 복원 방법

### **방법 1: 로컬 D1에서 직접 실행** (가장 빠름!)

```bash
# 로컬 D1 데이터베이스 초기화 및 복원
cd /home/user/webapp

# 1. 로컬 D1 초기화
rm -rf .wrangler/state/v3/d1

# 2. 마이그레이션 실행
npx wrangler d1 migrations apply webapp-production --local

# 3. Seed 데이터 로드
npx wrangler d1 execute webapp-production --local --file=./seed.sql

# 4. 확인
npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) FROM products"
npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) FROM events"
```

**이 방법의 장점:**
- 로컬에서 먼저 테스트 가능
- 빠르고 안전
- 언제든 재시작 가능

---

### **방법 2: Cloudflare D1 Console에서 직접 실행** (프로덕션)

#### **Step 1: D1 Console 접속**
https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/workers/d1/ef76dccd-be5f-476b-851c-f9503f18dd53

#### **Step 2: seed.sql 파일 준비**

**옵션 A: GitHub에서 다운로드**
1. https://github.com/healingcafe1-prog/dagong/blob/main/seed.sql
2. "Raw" 버튼 클릭
3. 전체 복사

**옵션 B: 로컬 파일 사용**
```bash
# seed.sql 파일 내용 확인
cat /home/user/webapp/seed.sql
```

#### **Step 3: Console에서 실행**

**⚠️ 주의: 큰 SQL 파일은 한 번에 실행하면 타임아웃될 수 있습니다!**

**해결책: 섹션별로 나누어 실행**

1. **지역 데이터** (Regions) - 15개
2. **카테고리 데이터** (Categories) - 19개  
3. **생산자 데이터** (Producers) - 15개
4. **상품 데이터** (Products) - 30+개
5. **이벤트 데이터** (Events) - 3개
6. **기타** (Attractions, Experiences)

---

## 🎯 빠른 복원 SQL (필수 데이터만)

**D1 Console에서 바로 실행 가능한 최소 버전:**

```sql
-- ==========================================
-- 핵심 데이터만 빠르게 복원
-- ==========================================

-- 1. 추천 상품 설정
UPDATE products SET is_featured = 1 WHERE id IN (1, 2, 3);

-- 2. 이벤트 추가
INSERT INTO events (title, description, event_type, discount_rate, start_date, end_date, is_active) VALUES 
  ('신년 맞이 특별 할인', '새해를 맞아 모든 차 제품 20% 할인', 'discount', 20, '2024-01-01', '2024-12-31', 1),
  ('봄 햇차 시즌 이벤트', '올해 첫 수확 햇차 예약 판매 시작', 'season', 0, '2024-04-01', '2024-04-30', 1),
  ('장인 초대전', '이천 도예 명인들의 특별 작품 전시', 'new_product', 0, '2024-03-01', '2024-03-31', 1);

-- 3. 추가 상품 (featured)
INSERT OR IGNORE INTO products (
  name, category_id, producer_id, description,
  price, stock, product_type, is_featured, is_available
) VALUES 
  ('제주 유기농 첫물차', 1, 1, '봄에 첫 수확한 어린 찻잎으로 만든 프리미엄 녹차', 35000, 50, 'tea', 1, 1),
  ('하동 야생 녹차', 1, 2, '지리산 자락의 야생 차나무에서 채취한 귀한 녹차', 45000, 30, 'tea', 1, 1),
  ('제주 발효 홍차', 1, 1, '제주 녹차를 발효시켜 만든 깊은 맛의 홍차', 38000, 40, 'tea', 1, 1),
  ('백자 찻잔 세트', 3, 3, '순백의 아름다움이 돋보이는 전통 백자 찻잔 5개 세트', 85000, 20, 'craft', 1, 1),
  ('분청사기 다관', 3, 3, '소박한 아름다움의 분청사기 찻주전자', 120000, 15, 'craft', 1, 1),
  ('프리미엄 다기세트', 3, 3, '찻잔, 다관, 찻받침이 포함된 완벽한 다기세트', 250000, 10, 'craft', 1, 1),
  ('강진 고려청자 다완', 3, 3, '천년의 역사를 지닌 고려청자 찻잔', 180000, 8, 'craft', 1, 1),
  ('문경 사기 다기세트', 3, 3, '문경 사기로 만든 실용적인 다기세트', 150000, 12, 'craft', 1, 1);

-- 4. 확인
SELECT '추천 상품:', COUNT(*) as count FROM products WHERE is_featured = 1;
SELECT '활성 이벤트:', COUNT(*) as count FROM events WHERE is_active = 1;
SELECT '전체 상품:', COUNT(*) as count FROM products;
```

---

## 🚀 추천 실행 순서

### **옵션 A: 빠른 복원 (5분)**
1. D1 Console 접속
2. 위 "빠른 복원 SQL" 실행
3. 홈페이지 새로고침
4. ✅ 완료!

### **옵션 B: 완전한 복원 (30분)**
1. 로컬에서 테스트:
   ```bash
   cd /home/user/webapp
   rm -rf .wrangler/state/v3/d1
   npx wrangler d1 migrations apply webapp-production --local
   npx wrangler d1 execute webapp-production --local --file=./seed.sql
   ```

2. 로컬 테스트:
   ```bash
   npm run build
   pm2 restart webapp
   ```

3. 프로덕션 마이그레이션:
   ```bash
   npx wrangler d1 migrations apply webapp-production --remote
   npx wrangler d1 execute webapp-production --remote --file=./seed.sql
   ```

4. 프로덕션 배포:
   ```bash
   npx wrangler pages deploy dist --project-name dagong
   ```

---

## ✅ 완료 확인

### **API 테스트:**
```bash
# 추천 상품
curl https://dagong-bi1.pages.dev/api/products?featured=true

# 이벤트
curl https://dagong-bi1.pages.dev/api/events

# 지역
curl https://dagong-bi1.pages.dev/api/regions
```

### **홈페이지 확인:**
- https://dagong-bi1.pages.dev
- ✅ 추천 상품 8개 표시
- ✅ 이벤트 3개 표시
- ✅ 차 산지 여러 개 표시
- ✅ 공예 산지 여러 개 표시

---

## 💬 다음 단계

**어떤 방법을 원하시나요?**

1. **"빠른 복원해줘"** → 제가 빠른 복원 SQL 실행 (로컬)
2. **"완전 복원해줘"** → 제가 전체 seed.sql 실행 (로컬)
3. **"직접 할게"** → D1 Console에서 직접 실행

**알려주세요!** 😊
