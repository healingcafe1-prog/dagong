-- 사용자 포인트 테이블
CREATE TABLE IF NOT EXISTS user_points (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  total_points INTEGER DEFAULT 0,  -- 총 적립 포인트
  available_points INTEGER DEFAULT 0,  -- 사용 가능 포인트
  used_points INTEGER DEFAULT 0,  -- 사용한 포인트
  withdrawn_points INTEGER DEFAULT 0,  -- 현금으로 출금한 포인트
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- 포인트 거래 내역 테이블
CREATE TABLE IF NOT EXISTS point_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  transaction_type TEXT NOT NULL CHECK(transaction_type IN ('earn', 'use', 'withdraw', 'referral_earn', 'referral_bonus', 'purchase_earn')),
  points INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,  -- 거래 후 잔액
  order_id INTEGER,  -- 주문 ID (구매 관련 포인트인 경우)
  referrer_id TEXT,  -- 추천인 ID (추천 관련 포인트인 경우)
  referred_user_id TEXT,  -- 피추천인 ID
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 포인트 현금 출금 신청 테이블
CREATE TABLE IF NOT EXISTS point_withdrawals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  points INTEGER NOT NULL,  -- 출금할 포인트 (600,000PV)
  cash_amount INTEGER NOT NULL,  -- 현금 금액 (50,000원)
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_holder TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected', 'completed')),
  admin_note TEXT,
  requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  processed_at DATETIME,
  processed_by TEXT
);

-- 추천인 관계 테이블
CREATE TABLE IF NOT EXISTS user_referrals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  referrer_id TEXT NOT NULL,  -- 추천인 user_id
  referred_user_id TEXT NOT NULL,  -- 피추천인 user_id
  signup_bonus_given INTEGER DEFAULT 0,  -- 가입 보너스 지급 여부 (20,000P)
  total_referral_earnings INTEGER DEFAULT 0,  -- 추천인이 얻은 총 포인트
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(referred_user_id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_user_points_user_id ON user_points(user_id);
CREATE INDEX IF NOT EXISTS idx_point_transactions_user_id ON point_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_point_transactions_type ON point_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_point_withdrawals_user_id ON point_withdrawals(user_id);
CREATE INDEX IF NOT EXISTS idx_point_withdrawals_status ON point_withdrawals(status);
CREATE INDEX IF NOT EXISTS idx_user_referrals_referrer ON user_referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_user_referrals_referred ON user_referrals(referred_user_id);
