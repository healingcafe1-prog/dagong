-- 결제 및 정산 시스템 테이블

-- 1. 사업자 계좌 정보
CREATE TABLE IF NOT EXISTS business_accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  producer_id INTEGER NOT NULL UNIQUE,
  business_registration_number TEXT NOT NULL,
  business_name TEXT NOT NULL,
  representative_name TEXT NOT NULL,
  business_type TEXT,
  business_category TEXT,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_holder TEXT NOT NULL,
  commission_rate REAL DEFAULT 9.9,
  settlement_cycle TEXT DEFAULT 'weekly',
  minimum_settlement_amount INTEGER DEFAULT 10000,
  verification_status TEXT DEFAULT 'pending',
  verified_at DATETIME,
  verification_memo TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producer_id) REFERENCES producers(id)
);

-- 2. 결제 트랜잭션
CREATE TABLE IF NOT EXISTS payment_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  pg_provider TEXT NOT NULL,
  pg_transaction_id TEXT UNIQUE,
  payment_method TEXT NOT NULL,
  payment_amount INTEGER NOT NULL,
  card_company TEXT,
  card_number_masked TEXT,
  installment_months INTEGER DEFAULT 0,
  virtual_account_bank TEXT,
  virtual_account_number TEXT,
  virtual_account_holder TEXT,
  virtual_account_due_date DATETIME,
  transaction_status TEXT NOT NULL DEFAULT 'pending',
  approved_at DATETIME,
  approval_number TEXT,
  cancelled_at DATETIME,
  cancel_reason TEXT,
  refund_amount INTEGER DEFAULT 0,
  refunded_at DATETIME,
  pg_response_data TEXT,
  error_code TEXT,
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 3. 정산 배치
CREATE TABLE IF NOT EXISTS settlement_batches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  settlement_period_start DATE NOT NULL,
  settlement_period_end DATE NOT NULL,
  settlement_status TEXT NOT NULL DEFAULT 'pending',
  total_order_amount INTEGER DEFAULT 0,
  total_commission_amount INTEGER DEFAULT 0,
  total_settlement_amount INTEGER DEFAULT 0,
  producer_count INTEGER DEFAULT 0,
  calculated_at DATETIME,
  processed_at DATETIME,
  completed_at DATETIME,
  processed_by TEXT,
  memo TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. 생산자별 정산 (기존 settlements 테이블과 이름 충돌 방지)
CREATE TABLE IF NOT EXISTS producer_settlements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  settlement_batch_id INTEGER NOT NULL,
  producer_id INTEGER NOT NULL,
  account_id INTEGER NOT NULL,
  settlement_period_start DATE NOT NULL,
  settlement_period_end DATE NOT NULL,
  order_count INTEGER DEFAULT 0,
  total_sales_amount INTEGER NOT NULL,
  total_commission_amount INTEGER NOT NULL,
  settlement_amount INTEGER NOT NULL,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  account_holder TEXT NOT NULL,
  settlement_status TEXT NOT NULL DEFAULT 'pending',
  transfer_requested_at DATETIME,
  transferred_at DATETIME,
  transfer_confirmation_number TEXT,
  hold_reason TEXT,
  error_message TEXT,
  admin_memo TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (settlement_batch_id) REFERENCES settlement_batches(id),
  FOREIGN KEY (producer_id) REFERENCES producers(id),
  FOREIGN KEY (account_id) REFERENCES business_accounts(id)
);

-- 5. 정산 항목 상세
CREATE TABLE IF NOT EXISTS settlement_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  settlement_id INTEGER NOT NULL,
  order_item_id INTEGER NOT NULL,
  order_id INTEGER NOT NULL,
  order_number TEXT NOT NULL,
  product_name TEXT NOT NULL,
  order_date DATETIME NOT NULL,
  sales_amount INTEGER NOT NULL,
  commission_rate REAL NOT NULL,
  commission_amount INTEGER NOT NULL,
  settlement_amount INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (settlement_id) REFERENCES producer_settlements(id),
  FOREIGN KEY (order_item_id) REFERENCES order_items(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 6. 플랫폼 수익
CREATE TABLE IF NOT EXISTS platform_revenues (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  settlement_batch_id INTEGER NOT NULL,
  revenue_period_start DATE NOT NULL,
  revenue_period_end DATE NOT NULL,
  total_commission_amount INTEGER NOT NULL,
  total_order_count INTEGER NOT NULL,
  total_order_amount INTEGER NOT NULL,
  commission_breakdown TEXT,
  category_breakdown TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (settlement_batch_id) REFERENCES settlement_batches(id)
);

-- 7. 정산 분쟁
CREATE TABLE IF NOT EXISTS settlement_disputes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  settlement_id INTEGER NOT NULL,
  order_id INTEGER,
  dispute_type TEXT NOT NULL,
  dispute_reason TEXT NOT NULL,
  dispute_status TEXT NOT NULL DEFAULT 'open',
  assigned_to TEXT,
  resolution TEXT,
  resolved_at DATETIME,
  resolved_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (settlement_id) REFERENCES producer_settlements(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_business_accounts_producer ON business_accounts(producer_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_order ON payment_transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_pg_id ON payment_transactions(pg_transaction_id);
CREATE INDEX IF NOT EXISTS idx_settlement_batches_period ON settlement_batches(settlement_period_start, settlement_period_end);
CREATE INDEX IF NOT EXISTS idx_producer_settlements_batch ON producer_settlements(settlement_batch_id);
CREATE INDEX IF NOT EXISTS idx_producer_settlements_producer ON producer_settlements(producer_id);
CREATE INDEX IF NOT EXISTS idx_settlement_items_settlement ON settlement_items(settlement_id);
CREATE INDEX IF NOT EXISTS idx_platform_revenues_batch ON platform_revenues(settlement_batch_id);
