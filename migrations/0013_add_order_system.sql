-- 주문 시스템 테이블 생성

-- 주문 테이블
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  order_number TEXT UNIQUE NOT NULL,
  
  -- 주문자 정보
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT NOT NULL,
  
  -- 배송 정보
  recipient_name TEXT NOT NULL,
  recipient_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_zipcode TEXT,
  delivery_memo TEXT,
  
  -- 가격 정보
  total_amount INTEGER NOT NULL,
  discount_amount INTEGER DEFAULT 0,
  shipping_fee INTEGER DEFAULT 0,
  final_amount INTEGER NOT NULL,
  
  -- 상태 정보
  order_status TEXT NOT NULL DEFAULT 'pending' 
    CHECK(order_status IN ('pending', 'paid', 'preparing', 'shipping', 'delivered', 'cancelled', 'refunded')),
  payment_status TEXT NOT NULL DEFAULT 'pending'
    CHECK(payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT CHECK(payment_method IN ('card', 'transfer', 'virtual_account', 'phone', 'kakao_pay', 'naver_pay')),
  
  -- 결제 정보
  payment_date DATETIME,
  payment_transaction_id TEXT,
  
  -- 타임스탬프
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 주문 상품 테이블
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  product_price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  discount_rate INTEGER DEFAULT 0,
  item_total INTEGER NOT NULL,
  
  -- 생산자 정보 (정산용)
  producer_id INTEGER NOT NULL,
  commission_rate REAL DEFAULT 9.9,
  commission_amount INTEGER,
  producer_revenue INTEGER,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (producer_id) REFERENCES producers(id)
);

-- 배송 추적 테이블
CREATE TABLE IF NOT EXISTS order_shipments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  courier_company TEXT,
  tracking_number TEXT,
  shipped_date DATETIME,
  estimated_delivery_date DATE,
  delivery_status TEXT DEFAULT 'preparing'
    CHECK(delivery_status IN ('preparing', 'shipped', 'in_transit', 'out_for_delivery', 'delivered', 'failed')),
  delivery_completed_date DATETIME,
  delivery_memo TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 주문 상태 변경 이력 테이블
CREATE TABLE IF NOT EXISTS order_status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  previous_status TEXT NOT NULL,
  new_status TEXT NOT NULL,
  changed_by TEXT,
  change_reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 수령 확인 테이블
CREATE TABLE IF NOT EXISTS order_confirmations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL UNIQUE,
  confirmed_by INTEGER,
  confirmed_date DATETIME NOT NULL,
  rating INTEGER CHECK(rating >= 1 AND rating <= 5),
  review_comment TEXT,
  is_reviewed BOOLEAN DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (confirmed_by) REFERENCES users(id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_order_items_producer ON order_items(producer_id);

CREATE INDEX IF NOT EXISTS idx_shipments_order ON order_shipments(order_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON order_shipments(delivery_status);
CREATE INDEX IF NOT EXISTS idx_shipments_tracking ON order_shipments(tracking_number);

CREATE INDEX IF NOT EXISTS idx_order_history_order ON order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_order_confirmations_order ON order_confirmations(order_id);
