-- 마이그레이션: 상품 등록 및 펀딩 시스템
-- 아이디어스 스타일의 상품 등록, AI 상세페이지 생성, 펀딩 모집 기능

-- 1. 상품 등록 테이블
CREATE TABLE IF NOT EXISTS product_listings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('tea', 'craft', 'experience', 'education')),
  
  -- 기본 정보
  price INTEGER NOT NULL,
  original_price INTEGER,
  discount_rate INTEGER DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  
  -- AI 생성 상세페이지
  ai_detailed_description TEXT,
  ai_generated_at DATETIME,
  
  -- 펀딩 정보
  is_funding BOOLEAN DEFAULT 0,
  funding_goal INTEGER DEFAULT 0,
  funding_start_date DATETIME,
  funding_end_date DATETIME,
  funding_current_amount INTEGER DEFAULT 0,
  funding_backers_count INTEGER DEFAULT 0,
  min_funding_amount INTEGER DEFAULT 10000,
  
  -- 일정 정보 (체험/교육 상품용)
  has_schedule BOOLEAN DEFAULT 0,
  schedule_type TEXT CHECK(schedule_type IN ('single', 'recurring', 'on_demand', NULL)),
  
  -- 상태
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'pending', 'approved', 'rejected', 'published', 'ended')),
  rejection_reason TEXT,
  
  -- 관리자 승인
  reviewed_by INTEGER,
  reviewed_at DATETIME,
  
  -- 메타 정보
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (reviewed_by) REFERENCES users(id)
);

-- 2. 상품 이미지 테이블
CREATE TABLE IF NOT EXISTS product_listing_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  image_order INTEGER NOT NULL DEFAULT 0,
  is_main BOOLEAN DEFAULT 0,
  caption TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (listing_id) REFERENCES product_listings(id) ON DELETE CASCADE
);

-- 3. 상품 일정 테이블
CREATE TABLE IF NOT EXISTS product_schedules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER NOT NULL,
  schedule_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 10,
  current_participants INTEGER DEFAULT 0,
  price_adjustment INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT 1,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (listing_id) REFERENCES product_listings(id) ON DELETE CASCADE
);

-- 4. 펀딩 후원 테이블
CREATE TABLE IF NOT EXISTS funding_pledges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  quantity INTEGER DEFAULT 1,
  reward_option TEXT,
  
  -- 결제 정보
  payment_method TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK(payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id TEXT,
  
  -- 배송 정보 (실물 상품인 경우)
  shipping_name TEXT,
  shipping_phone TEXT,
  shipping_address TEXT,
  shipping_status TEXT CHECK(shipping_status IN ('pending', 'preparing', 'shipped', 'delivered', NULL)),
  
  -- 메시지
  backer_message TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  paid_at DATETIME,
  
  FOREIGN KEY (listing_id) REFERENCES product_listings(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 5. 상품 문의 테이블
CREATE TABLE IF NOT EXISTS product_inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  is_secret BOOLEAN DEFAULT 0,
  is_answered BOOLEAN DEFAULT 0,
  answered_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (listing_id) REFERENCES product_listings(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 6. 상품 좋아요 테이블
CREATE TABLE IF NOT EXISTS product_likes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(listing_id, user_id),
  FOREIGN KEY (listing_id) REFERENCES product_listings(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. AI 생성 로그 테이블
CREATE TABLE IF NOT EXISTS ai_generation_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  input_data TEXT NOT NULL,
  generated_content TEXT,
  model_used TEXT,
  tokens_used INTEGER,
  generation_time_ms INTEGER,
  status TEXT CHECK(status IN ('processing', 'completed', 'failed')),
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (listing_id) REFERENCES product_listings(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_product_listings_user_id ON product_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_product_listings_status ON product_listings(status);
CREATE INDEX IF NOT EXISTS idx_product_listings_category ON product_listings(category);
CREATE INDEX IF NOT EXISTS idx_product_listings_is_funding ON product_listings(is_funding);
CREATE INDEX IF NOT EXISTS idx_product_listing_images_listing_id ON product_listing_images(listing_id);
CREATE INDEX IF NOT EXISTS idx_product_schedules_listing_id ON product_schedules(listing_id);
CREATE INDEX IF NOT EXISTS idx_product_schedules_date ON product_schedules(schedule_date);
CREATE INDEX IF NOT EXISTS idx_funding_pledges_listing_id ON funding_pledges(listing_id);
CREATE INDEX IF NOT EXISTS idx_funding_pledges_user_id ON funding_pledges(user_id);
CREATE INDEX IF NOT EXISTS idx_product_inquiries_listing_id ON product_inquiries(listing_id);
CREATE INDEX IF NOT EXISTS idx_product_likes_listing_user ON product_likes(listing_id, user_id);
CREATE INDEX IF NOT EXISTS idx_ai_generation_logs_listing_id ON ai_generation_logs(listing_id);

-- 샘플 데이터 (테스트용)
-- 사용자 ID 1번이 있다고 가정
INSERT OR IGNORE INTO product_listings (id, user_id, title, short_description, category, price, is_funding, funding_goal, funding_start_date, funding_end_date, status) VALUES
(1, 1, '수제 전통 찻잔 세트', '장인이 직접 만든 전통 분청사기 찻잔 세트입니다. 하나하나 정성껏 제작했습니다.', 'craft', 89000, 1, 5000000, datetime('now'), datetime('now', '+30 days'), 'published'),
(2, 1, '보성 유기농 녹차', '보성의 청정지역에서 재배한 100% 유기농 녹차입니다.', 'tea', 35000, 0, 0, NULL, NULL, 'published');
