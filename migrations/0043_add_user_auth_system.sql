-- 사용자 인증 시스템 추가: provider, provider_id, last_login_at, user_sessions 테이블

-- 1. users 테이블에 컬럼 추가
ALTER TABLE users ADD COLUMN provider TEXT;
ALTER TABLE users ADD COLUMN provider_id TEXT;
ALTER TABLE users ADD COLUMN last_login_at DATETIME;

-- 2. 기존 oauth_provider, oauth_id 데이터를 새 컬럼으로 복사
UPDATE users SET provider = oauth_provider, provider_id = oauth_id WHERE oauth_provider IS NOT NULL;

-- 3. user_sessions 테이블 생성
CREATE TABLE IF NOT EXISTS user_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 4. 세션 토큰 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);

-- 5. users 테이블 provider 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);
