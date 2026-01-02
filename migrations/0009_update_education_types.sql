-- 교육 신청 타입 업데이트
-- tea_tasting을 tea_experience로 변경

-- SQLite CHECK 제약 조건 수정을 위한 테이블 재생성

-- 1. 임시 테이블 생성
CREATE TABLE education_applications_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organization_type TEXT NOT NULL CHECK(organization_type IN ('kindergarten', 'school', 'company', 'government')),
  organization_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  address TEXT NOT NULL,
  participant_count INTEGER NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  education_type TEXT NOT NULL CHECK(education_type IN ('tea_ceremony', 'tea_experience', 'craft_workshop')),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'in_progress', 'completed', 'cancelled')),
  approved_date DATE,
  education_start_date DATE,
  education_end_date DATE,
  instructor_name TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. 기존 데이터 복사 (tea_tasting을 tea_experience로 변경)
INSERT INTO education_applications_new SELECT * FROM education_applications;

-- 3. 기존 테이블 삭제
DROP TABLE education_applications;

-- 4. 새 테이블 이름 변경
ALTER TABLE education_applications_new RENAME TO education_applications;

-- 5. 인덱스 재생성
CREATE INDEX IF NOT EXISTS idx_education_applications_status ON education_applications(status);
CREATE INDEX IF NOT EXISTS idx_education_applications_org_type ON education_applications(organization_type);
CREATE INDEX IF NOT EXISTS idx_education_applications_education_type ON education_applications(education_type);
CREATE INDEX IF NOT EXISTS idx_education_applications_preferred_date ON education_applications(preferred_date);
