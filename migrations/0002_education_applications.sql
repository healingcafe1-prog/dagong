-- 교육 신청 테이블
CREATE TABLE IF NOT EXISTS education_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organization_type TEXT NOT NULL CHECK(organization_type IN ('kindergarten', 'school', 'company', 'government')),
  organization_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT,
  address TEXT NOT NULL,
  participant_count INTEGER NOT NULL,
  preferred_date TEXT,
  preferred_time TEXT,
  education_type TEXT NOT NULL CHECK(education_type IN ('tea_ceremony', 'tea_tasting', 'craft_workshop')),
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'in_progress', 'completed', 'cancelled')),
  approved_date DATE,
  education_start_date DATE,
  education_end_date DATE,
  instructor_name TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_education_applications_org_type ON education_applications(organization_type);
CREATE INDEX IF NOT EXISTS idx_education_applications_status ON education_applications(status);
CREATE INDEX IF NOT EXISTS idx_education_applications_education_type ON education_applications(education_type);
CREATE INDEX IF NOT EXISTS idx_education_applications_created_at ON education_applications(created_at);
