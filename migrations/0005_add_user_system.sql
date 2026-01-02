-- 회원 테이블
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  profile_image TEXT,
  provider TEXT NOT NULL, -- 'google', 'naver', 'kakao'
  provider_id TEXT NOT NULL, -- 소셜 로그인 제공자의 고유 ID
  role TEXT DEFAULT 'customer', -- 'customer', 'producer', 'admin'
  is_active INTEGER DEFAULT 1,
  last_login_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(provider, provider_id)
);

-- 세션 테이블
CREATE TABLE IF NOT EXISTS user_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  session_token TEXT UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 사용자 제안 맛집/명소 테이블
CREATE TABLE IF NOT EXISTS user_suggestions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  region_id INTEGER NOT NULL,
  type TEXT NOT NULL, -- 'restaurant', 'tourist_spot', 'accommodation', 'workshop'
  name TEXT NOT NULL,
  description TEXT,
  address TEXT,
  contact_phone TEXT,
  operating_hours TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  admin_note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (region_id) REFERENCES regions(id) ON DELETE CASCADE
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_suggestions_user ON user_suggestions(user_id);
CREATE INDEX IF NOT EXISTS idx_suggestions_status ON user_suggestions(status);
