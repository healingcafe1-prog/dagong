# 🗄️ D1 Database 마이그레이션 실행 가이드

생성일시: 2026-02-06 09:40 UTC  
상태: **D1 Database 생성 완료, 마이그레이션 필요**

---

## ✅ 완료된 작업

1. ✅ D1 Database 생성: `webapp-production`
2. ✅ Database ID: `ef76dccd-be5f-476b-851c-f9503f18dd53`
3. ✅ wrangler.jsonc 업데이트
4. ✅ Cloudflare Pages 재배포

---

## ⚠️ 현재 문제

**API 500 에러 계속 발생**
- D1 Database가 **비어있음** (테이블 없음)
- 마이그레이션 실행 필요

---

## 🔧 해결 방법: Dashboard에서 SQL 실행

### **1단계: D1 Console 접속**

👉 **https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/workers/d1/ef76dccd-be5f-476b-851c-f9503f18dd53**

또는:

1. https://dash.cloudflare.com 접속
2. **Workers & Pages** → **D1** 클릭
3. **webapp-production** 클릭
4. **"Console"** 탭 클릭

---

### **2단계: 초기 스키마 SQL 복사**

아래 SQL을 전체 복사하세요:

\`\`\`sql
-- 지역 정보 테이블 (차산지 및 공예산지)
CREATE TABLE IF NOT EXISTS regions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('tea', 'craft')),
  description TEXT,
  featured_image TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 생산자 정보 테이블
CREATE TABLE IF NOT EXISTS producers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  region_id INTEGER NOT NULL,
  producer_type TEXT NOT NULL CHECK(producer_type IN ('tea', 'craft')),
  description TEXT,
  story TEXT,
  profile_image TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- 상품 카테고리 테이블
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  parent_id INTEGER,
  type TEXT NOT NULL CHECK(type IN ('tea', 'craft', 'gift')),
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);

-- 상품 테이블
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  producer_id INTEGER NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  stock INTEGER DEFAULT 0,
  main_image TEXT,
  product_type TEXT NOT NULL CHECK(product_type IN ('tea', 'craft', 'gift_set', 'local')),
  weight TEXT,
  origin TEXT,
  is_featured BOOLEAN DEFAULT 0,
  is_available BOOLEAN DEFAULT 1,
  view_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (producer_id) REFERENCES producers(id)
);

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  profile_image TEXT,
  oauth_provider TEXT CHECK(oauth_provider IN ('google', 'naver', 'kakao')),
  oauth_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 장바구니 테이블
CREATE TABLE IF NOT EXISTS cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 주문 테이블
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  order_number TEXT UNIQUE NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  shipping_name TEXT NOT NULL,
  shipping_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 주문 아이템 테이블
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 이벤트 테이블
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK(event_type IN ('discount', 'new_product', 'season', 'festival')),
  discount_rate INTEGER DEFAULT 0,
  banner_image TEXT,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 체험 프로그램 테이블
CREATE TABLE IF NOT EXISTS experiences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  region_id INTEGER,
  producer_id INTEGER,
  experience_type TEXT NOT NULL CHECK(experience_type IN ('tea_ceremony', 'tea_tasting', 'craft_workshop', 'farm_tour', 'workshop_visit')),
  description TEXT,
  duration TEXT,
  price INTEGER NOT NULL,
  max_participants INTEGER,
  main_image TEXT,
  is_available BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (region_id) REFERENCES regions(id),
  FOREIGN KEY (producer_id) REFERENCES producers(id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_regions_type ON regions(type);
CREATE INDEX IF NOT EXISTS idx_producers_region ON producers(region_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_producer ON products(producer_id);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_cart_user ON cart(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
\`\`\`

---

### **3단계: Console에 붙여넣기 및 실행**

1. **D1 Console** 화면의 SQL 입력창에 위 SQL 전체 붙여넣기
2. **"Execute"** 또는 **"실행"** 버튼 클릭
3. **성공 메시지 확인**

---

### **4단계: 테스트 데이터 추가 (선택사항)**

테이블만 생성하면 API가 빈 결과를 반환합니다. 테스트 데이터를 추가하려면:

\`\`\`sql
-- 테스트 지역 추가
INSERT INTO regions (name, type, description) VALUES
('보성', 'tea', '녹차의 고장'),
('하동', 'tea', '전통 차 산지'),
('이천', 'craft', '도자기의 고장');

-- 테스트 생산자 추가
INSERT INTO producers (name, region_id, producer_type, description) VALUES
('보성차농원', 1, 'tea', '보성 대표 차농원'),
('하동녹차', 2, 'tea', '하동 전통 녹차'),
('이천도예', 3, 'craft', '이천 전통 도자기');

-- 테스트 카테고리 추가
INSERT INTO categories (name, type, description, display_order) VALUES
('녹차', 'tea', '한국 전통 녹차', 1),
('홍차', 'tea', '발효차', 2),
('도자기', 'craft', '전통 도자기', 3);

-- 테스트 상품 추가
INSERT INTO products (name, category_id, producer_id, description, price, stock, product_type, is_available) VALUES
('보성 녹차 100g', 1, 1, '보성의 신선한 녹차', 15000, 100, 'tea', 1),
('하동 녹차 50g', 1, 2, '하동 전통 녹차', 12000, 50, 'tea', 1),
('이천 찻잔 세트', 3, 3, '전통 도자기 찻잔', 45000, 20, 'craft', 1);
\`\`\`

---

## 🎯 완료 후 테스트

마이그레이션 실행 후:

1. **API 테스트**: https://dagong-bi1.pages.dev/api/products

2. **홈페이지 확인**: https://dagong-bi1.pages.dev

3. **오류 사라짐 확인**

---

## 📊 체크리스트

- [ ] D1 Console 접속
- [ ] 초기 스키마 SQL 복사
- [ ] Console에 붙여넣기
- [ ] Execute 실행
- [ ] 성공 메시지 확인
- [ ] (선택) 테스트 데이터 추가
- [ ] API 테스트
- [ ] 홈페이지 정상 작동 확인

---

## 💡 다음 단계

마이그레이션 완료 후:

1. ✅ **사이트 정상 작동 확인**
2. ✅ **네이버 서치어드바이저 등록**
3. ✅ **GitHub 자동 배포 연동**

---

**지금 D1 Console에서 SQL을 실행하시고 "완료"라고 말씀해주세요!** 😊
