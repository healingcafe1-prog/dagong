-- 소셜 커머스 구조 마이그레이션
-- 작가: 15%, 25%, 35%, 50% 할인율 설정
-- MD: 25%-35% 수수료 설정
-- 플랫폼 수수료: 0% (무료)

-- 1. users 테이블에 역할 및 수수료 정보 추가
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'artist' CHECK (user_type IN ('artist', 'md', 'buyer'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS md_commission_rate INTEGER DEFAULT 25 CHECK (md_commission_rate >= 25 AND md_commission_rate <= 35);
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS business_registration_number TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS business_name TEXT;

-- 2. product_listings 테이블에 할인율 및 수수료 정보 추가
ALTER TABLE product_listings ADD COLUMN IF NOT EXISTS seller_type TEXT DEFAULT 'artist' CHECK (seller_type IN ('artist', 'md'));
ALTER TABLE product_listings ADD COLUMN IF NOT EXISTS discount_rate INTEGER DEFAULT 0 CHECK (discount_rate IN (0, 15, 25, 35, 50));
ALTER TABLE product_listings ADD COLUMN IF NOT EXISTS md_commission_rate INTEGER DEFAULT 0;
ALTER TABLE product_listings ADD COLUMN IF NOT EXISTS platform_fee_rate INTEGER DEFAULT 0;
ALTER TABLE product_listings ADD COLUMN IF NOT EXISTS artist_price INTEGER DEFAULT 0;
ALTER TABLE product_listings ADD COLUMN IF NOT EXISTS final_price INTEGER DEFAULT 0;

-- 3. 주문 테이블에 수수료 분배 정보 추가
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT UNIQUE NOT NULL,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER DEFAULT 1,
  
  -- 가격 정보
  original_price INTEGER NOT NULL,
  discount_rate INTEGER DEFAULT 0,
  final_price INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  
  -- 수수료 분배
  seller_type TEXT CHECK (seller_type IN ('artist', 'md')),
  artist_revenue INTEGER DEFAULT 0,
  md_commission INTEGER DEFAULT 0,
  platform_fee INTEGER DEFAULT 0,
  
  -- 배송 정보
  recipient_name TEXT NOT NULL,
  recipient_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_postcode TEXT,
  shipping_memo TEXT,
  
  -- 주문 상태
  order_status TEXT DEFAULT 'pending' CHECK (order_status IN ('pending', 'paid', 'preparing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  
  -- 타임스탬프
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  paid_at DATETIME,
  shipped_at DATETIME,
  delivered_at DATETIME,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES product_listings(id)
);

-- 4. 정산 테이블 생성
CREATE TABLE IF NOT EXISTS settlements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  
  -- 정산 정보
  settlement_type TEXT CHECK (settlement_type IN ('artist', 'md')),
  settlement_amount INTEGER NOT NULL,
  settlement_status TEXT DEFAULT 'pending' CHECK (settlement_status IN ('pending', 'completed', 'failed')),
  
  -- 은행 정보
  bank_name TEXT,
  account_number TEXT,
  account_holder TEXT,
  
  -- 타임스탬프
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 5. 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type);
CREATE INDEX IF NOT EXISTS idx_product_listings_seller_type ON product_listings(seller_type);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_settlements_user_id ON settlements(user_id);
CREATE INDEX IF NOT EXISTS idx_settlements_settlement_status ON settlements(settlement_status);

-- 6. 샘플 데이터 (테스트용)
-- 작가 사용자
INSERT OR IGNORE INTO users (id, email, name, user_type, is_verified) VALUES 
  (1, 'artist1@example.com', '김작가', 'artist', TRUE),
  (2, 'artist2@example.com', '이작가', 'artist', TRUE);

-- MD 사용자
INSERT OR IGNORE INTO users (id, email, name, user_type, md_commission_rate, is_verified) VALUES 
  (3, 'md1@example.com', '박MD', 'md', 30, TRUE),
  (4, 'md2@example.com', '최MD', 'md', 25, TRUE);

-- 구매자
INSERT OR IGNORE INTO users (id, email, name, user_type) VALUES 
  (5, 'buyer1@example.com', '구매자1', 'buyer'),
  (6, 'buyer2@example.com', '구매자2', 'buyer');

