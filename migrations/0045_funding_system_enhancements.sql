-- 마이그레이션 0045: 펀딩 시스템 개선 - 제작 기간 및 셀러 알림 기능
-- 공예품 맞춤 펀딩: 샘플 등록 → 펀딩 모집 → 제작 → 발송

-- 1. product_listings 테이블에 제작 기간 컬럼 추가
ALTER TABLE product_listings ADD COLUMN production_days INTEGER DEFAULT 30;
ALTER TABLE product_listings ADD COLUMN production_start_date DATETIME;
ALTER TABLE product_listings ADD COLUMN production_end_date DATETIME;
ALTER TABLE product_listings ADD COLUMN shipping_start_date DATETIME;

-- 2. funding_pledges 테이블에 알림 관련 컬럼 추가
ALTER TABLE funding_pledges ADD COLUMN seller_notified BOOLEAN DEFAULT 0;
ALTER TABLE funding_pledges ADD COLUMN seller_notified_at DATETIME;
ALTER TABLE funding_pledges ADD COLUMN seller_viewed BOOLEAN DEFAULT 0;
ALTER TABLE funding_pledges ADD COLUMN seller_viewed_at DATETIME;

-- 3. 펀딩 상태 업데이트 (funding_status 컬럼 추가)
ALTER TABLE product_listings ADD COLUMN funding_status TEXT DEFAULT 'preparing' 
  CHECK(funding_status IN ('preparing', 'active', 'success', 'failed', 'producing', 'shipping', 'completed'));

-- 4. 셀러 알림 테이블 생성
CREATE TABLE IF NOT EXISTS seller_notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  listing_id INTEGER,
  pledge_id INTEGER,
  
  -- 알림 타입
  type TEXT NOT NULL CHECK(type IN ('new_order', 'funding_success', 'funding_failed', 'question', 'review')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- 알림톡 정보
  kakao_sent BOOLEAN DEFAULT 0,
  kakao_sent_at DATETIME,
  kakao_message_id TEXT,
  
  -- 상태
  is_read BOOLEAN DEFAULT 0,
  read_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (listing_id) REFERENCES product_listings(id),
  FOREIGN KEY (pledge_id) REFERENCES funding_pledges(id)
);

-- 5. 펀딩 목표 달성 로그 테이블
CREATE TABLE IF NOT EXISTS funding_milestones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id INTEGER NOT NULL,
  milestone_type TEXT NOT NULL CHECK(milestone_type IN ('goal_reached', 'funding_ended', 'production_started', 'shipping_started', 'completed')),
  milestone_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  total_amount INTEGER NOT NULL,
  total_backers INTEGER NOT NULL,
  notes TEXT,
  
  FOREIGN KEY (listing_id) REFERENCES product_listings(id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_seller_notifications_user_id ON seller_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_seller_notifications_is_read ON seller_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_seller_notifications_created_at ON seller_notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_funding_milestones_listing_id ON funding_milestones(listing_id);
CREATE INDEX IF NOT EXISTS idx_funding_pledges_seller_viewed ON funding_pledges(seller_viewed);
CREATE INDEX IF NOT EXISTS idx_product_listings_funding_status ON product_listings(funding_status);

-- 샘플 데이터: 진행중인 펀딩 상품
UPDATE product_listings 
SET 
  production_days = 30,
  funding_status = 'active'
WHERE is_funding = 1 AND status = 'published';
