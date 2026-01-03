-- 지역 특산품 카테고리 추가
-- 마이그레이션: 0010_add_local_products_category.sql

-- categories 테이블의 type CHECK 제약 조건 업데이트 (먼저 실행)
-- 1. 임시 백업
CREATE TABLE categories_backup AS SELECT * FROM categories;

-- 2. 기존 테이블 삭제
DROP TABLE categories;

-- 3. 새 제약 조건으로 재생성
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  parent_id INTEGER,
  type TEXT NOT NULL CHECK(type IN ('tea', 'craft', 'gift', 'local')),
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id)
);

-- 4. 데이터 복원
INSERT INTO categories SELECT * FROM categories_backup;

-- 5. 백업 삭제
DROP TABLE categories_backup;

-- 6. 인덱스 재생성
CREATE INDEX idx_categories_type ON categories(type);
CREATE INDEX idx_categories_parent ON categories(parent_id);

-- 지역 특산품 카테고리 추가
INSERT INTO categories (name, parent_id, type, description) VALUES
-- 지역 특산품 상위 카테고리
('농산물', NULL, 'local', '신선한 지역 농산물'),
('가공식품', NULL, 'local', '전통 방식으로 만든 가공식품'),
('수산물', NULL, 'local', '신선한 지역 수산물'),
('축산물', NULL, 'local', '건강하게 키운 축산물'),
('기타 특산품', NULL, 'local', '지역의 독특한 특산품');

-- products 테이블에 이미 product_type에 'local' 지원 추가를 위한 확인
-- CHECK 제약 조건 업데이트 (기존: 'tea','craft','gift_set' -> 추가: 'local')
-- SQLite는 ALTER TABLE로 CHECK 제약 조건을 직접 수정할 수 없으므로
-- 새 테이블을 만들고 데이터를 복사한 후 기존 테이블을 교체

-- 1. 임시 백업 테이블 생성
CREATE TABLE products_backup AS SELECT * FROM products;

-- 2. 기존 테이블 삭제
DROP TABLE products;

-- 3. 새 제약 조건으로 테이블 재생성
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  producer_id INTEGER NOT NULL,
  description TEXT,
  original_price INTEGER,
  price INTEGER NOT NULL,
  discount_rate INTEGER DEFAULT 30,
  shipping_fee INTEGER DEFAULT 3000 CHECK(shipping_fee >= 3000 AND shipping_fee <= 5000),
  stock_quantity INTEGER DEFAULT 0,
  main_image TEXT,
  product_type TEXT NOT NULL CHECK(product_type IN ('tea', 'craft', 'gift_set', 'local')),
  weight TEXT,
  origin TEXT,
  is_featured INTEGER DEFAULT 0,
  is_available INTEGER DEFAULT 1,
  view_count INTEGER DEFAULT 0,
  commission_rate REAL DEFAULT 9.9,
  commission_amount INTEGER,
  producer_revenue INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (producer_id) REFERENCES producers(id)
);

-- 4. 백업에서 데이터 복원
INSERT INTO products SELECT * FROM products_backup;

-- 5. 백업 테이블 삭제
DROP TABLE products_backup;

-- 6. 인덱스 재생성
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_producer ON products(producer_id);
CREATE INDEX idx_products_type ON products(product_type);
CREATE INDEX idx_products_featured ON products(is_featured);

-- producers 테이블의 producer_type CHECK 제약 조건 업데이트
-- 1. 임시 백업
CREATE TABLE producers_backup AS SELECT * FROM producers;

-- 2. 기존 테이블 삭제
DROP TABLE producers;

-- 3. 새 제약 조건으로 재생성
CREATE TABLE producers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  region_id INTEGER NOT NULL,
  producer_type TEXT NOT NULL CHECK(producer_type IN ('tea', 'craft', 'local')),
  description TEXT,
  story TEXT,
  profile_image TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (region_id) REFERENCES regions(id)
);

-- 4. 데이터 복원
INSERT INTO producers SELECT * FROM producers_backup;

-- 5. 백업 삭제
DROP TABLE producers_backup;

-- 6. 인덱스 재생성
CREATE INDEX idx_producers_region ON producers(region_id);
CREATE INDEX idx_producers_type ON producers(producer_type);
