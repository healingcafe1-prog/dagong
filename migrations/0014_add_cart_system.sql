-- 장바구니 시스템 테이블 생성

-- 장바구니 테이블
CREATE TABLE IF NOT EXISTS cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  session_id TEXT,  -- 비로그인 사용자용
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  
  -- 주문 시점의 가격 정보 (가격 변동 대비)
  price_snapshot INTEGER,
  
  -- 선택 여부 (일부만 주문하기 위해)
  is_selected INTEGER DEFAULT 1,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_session_id ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_product_id ON cart_items(product_id);

-- 장바구니 + 상품 조회를 위한 복합 인덱스
CREATE UNIQUE INDEX IF NOT EXISTS idx_cart_user_product 
  ON cart_items(user_id, product_id) 
  WHERE user_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_cart_session_product 
  ON cart_items(session_id, product_id) 
  WHERE session_id IS NOT NULL;

-- 위시리스트 테이블 (찜하기)
CREATE TABLE IF NOT EXISTS wishlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  
  UNIQUE(user_id, product_id)
);

-- 위시리스트 인덱스
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product_id ON wishlist(product_id);
