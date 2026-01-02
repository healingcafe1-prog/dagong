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
  product_type TEXT NOT NULL CHECK(product_type IN ('tea', 'craft', 'gift_set')),
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

-- 상품 이미지 테이블
CREATE TABLE IF NOT EXISTS product_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 선물세트 구성 테이블
CREATE TABLE IF NOT EXISTS gift_set_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gift_set_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER DEFAULT 1,
  FOREIGN KEY (gift_set_id) REFERENCES products(id),
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

-- 이벤트-상품 연결 테이블
CREATE TABLE IF NOT EXISTS event_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 관광지 정보 테이블
CREATE TABLE IF NOT EXISTS attractions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  region_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  attraction_type TEXT NOT NULL CHECK(attraction_type IN ('tourist_spot', 'restaurant', 'accommodation', 'workshop')),
  description TEXT,
  address TEXT,
  phone TEXT,
  opening_hours TEXT,
  main_image TEXT,
  latitude REAL,
  longitude REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (region_id) REFERENCES regions(id)
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

-- 체험 일정 테이블
CREATE TABLE IF NOT EXISTS experience_schedules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experience_id INTEGER NOT NULL,
  schedule_date DATE NOT NULL,
  start_time TEXT NOT NULL,
  available_slots INTEGER NOT NULL,
  booked_slots INTEGER DEFAULT 0,
  FOREIGN KEY (experience_id) REFERENCES experiences(id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_regions_type ON regions(type);
CREATE INDEX IF NOT EXISTS idx_producers_region ON producers(region_id);
CREATE INDEX IF NOT EXISTS idx_producers_type ON producers(producer_type);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_producer ON products(producer_id);
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_attractions_region ON attractions(region_id);
CREATE INDEX IF NOT EXISTS idx_attractions_type ON attractions(attraction_type);
CREATE INDEX IF NOT EXISTS idx_experiences_region ON experiences(region_id);
CREATE INDEX IF NOT EXISTS idx_experiences_type ON experiences(experience_type);
CREATE INDEX IF NOT EXISTS idx_events_active ON events(is_active);
CREATE INDEX IF NOT EXISTS idx_events_dates ON events(start_date, end_date);
