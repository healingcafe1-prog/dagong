-- 교육 신청 테이블 확장: 다도교육(tea_education)과 명상교육(meditation) 추가
-- organization_type에 community, hospital 추가
-- education_type에 tea_education, meditation 추가

-- Step 1: 기존 테이블 백업
CREATE TABLE education_applications_backup AS SELECT * FROM education_applications;

-- Step 2: 기존 테이블 삭제
DROP TABLE education_applications;

-- Step 3: 새로운 제약조건으로 테이블 재생성
CREATE TABLE education_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  organization_type TEXT NOT NULL CHECK(organization_type IN ('kindergarten', 'school', 'company', 'government', 'community', 'hospital', 'other')),
  organization_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  address TEXT NOT NULL,
  participant_count INTEGER NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  education_type TEXT NOT NULL CHECK(education_type IN ('tea_ceremony', 'tea_experience', 'craft_workshop', 'tea_education', 'meditation')),
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

-- Step 4: 백업 데이터 복원
INSERT INTO education_applications SELECT * FROM education_applications_backup;

-- Step 5: 백업 테이블 삭제
DROP TABLE education_applications_backup;
