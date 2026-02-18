-- 다도교육 진행현황 샘플 데이터

-- 승인 대기 (pending)
INSERT INTO education_applications (
  organization_type, organization_name, contact_person, contact_phone, contact_email,
  address, participant_count, preferred_date, preferred_time, education_type,
  message, status, created_at
) VALUES 
('school', '서울중앙고등학교', '김선생', '02-1234-5678', 'kim@school.kr',
 '서울시 종로구 교육로 123', 25, '2026-03-15', '14:00-16:00', 'tea_education',
 '고등학교 2학년 학생들을 위한 전통 다도 체험 교육을 신청합니다.', 'pending', '2026-02-10 10:00:00'),
('company', '㈜한국기업', '이대리', '02-2222-3333', 'lee@company.kr',
 '서울시 강남구 테헤란로 456', 30, '2026-03-20', '15:00-17:00', 'tea_education',
 '직원 워크샵의 일환으로 다도 교육을 신청합니다.', 'pending', '2026-02-12 14:30:00'),
('community', '강남구 문화센터', '박관장', '02-3333-4444', 'park@culture.kr',
 '서울시 강남구 문화로 789', 20, '2026-03-25', '10:00-12:00', 'tea_education',
 '지역 주민을 위한 전통 차문화 강좌를 신청합니다.', 'pending', '2026-02-15 09:00:00');

-- 진행 중 (approved)
INSERT INTO education_applications (
  organization_type, organization_name, contact_person, contact_phone, contact_email,
  address, participant_count, preferred_date, preferred_time, education_type,
  message, status, approved_date, education_start_date, education_end_date, instructor_name,
  created_at
) VALUES 
('government', '서울시청 공무원교육원', '최과장', '02-4444-5555', 'choi@seoul.go.kr',
 '서울시 중구 시청로 1', 40, '2026-02-25', '14:00-16:00', 'tea_education',
 '공무원 대상 전통문화 교육 프로그램입니다.', 'approved', '2026-02-16', '2026-02-25', '2026-02-25', '다도 전문강사 김다경',
 '2026-02-08 11:00:00'),
('school', '부산여자고등학교', '정선생', '051-1111-2222', 'jung@busan.kr',
 '부산시 해운대구 교육로 234', 35, '2026-03-05', '13:00-15:00', 'tea_education',
 '전통문화 이해 수업의 일환으로 신청합니다.', 'approved', '2026-02-14', '2026-03-05', '2026-03-05', '다도 전문강사 이차연',
 '2026-02-05 15:20:00');

-- 완료 (completed)
INSERT INTO education_applications (
  organization_type, organization_name, contact_person, contact_phone, contact_email,
  address, participant_count, preferred_date, preferred_time, education_type,
  message, status, approved_date, education_start_date, education_end_date, instructor_name, notes,
  created_at
) VALUES 
('company', '대한제약', '강부장', '02-5555-6666', 'kang@pharma.kr',
 '서울시 서초구 제약로 567', 28, '2026-02-18', '14:00-16:00', 'tea_education',
 '임직원 힐링 프로그램으로 신청합니다.', 'completed', '2026-02-01', '2026-02-18', '2026-02-18', '다도 전문강사 박다원', '교육이 성공적으로 진행되었습니다. 참여자 만족도 높음.',
 '2026-01-25 10:00:00'),
('school', '인천초등학교', '윤교사', '032-7777-8888', 'yoon@incheon.kr',
 '인천시 남동구 초등로 890', 30, '2026-02-10', '10:00-12:00', 'tea_education',
 '5-6학년 학생들을 위한 차문화 체험 교육입니다.', 'completed', '2026-01-28', '2026-02-10', '2026-02-10', '다도 전문강사 최다희', '학생들이 매우 흥미로워했으며, 추가 교육 요청 있음.',
 '2026-01-20 13:45:00');

-- 명상교육 진행현황 샘플 데이터

-- 승인 대기 (pending)
INSERT INTO education_applications (
  organization_type, organization_name, contact_person, contact_phone, contact_email,
  address, participant_count, preferred_date, preferred_time, education_type,
  message, status, created_at
) VALUES 
('company', 'IT벤처기업', '손대표', '02-8888-9999', 'son@venture.kr',
 '서울시 강남구 스타트업로 111', 15, '2026-03-18', '18:00-20:00', 'meditation',
 '직원들의 스트레스 관리를 위한 명상 교육을 신청합니다.', 'pending', '2026-02-14 16:00:00'),
('hospital', '서울대학병원 정신건강의학과', '한원장', '02-9999-0000', 'han@hospital.kr',
 '서울시 종로구 대학로 101', 12, '2026-03-22', '14:00-16:00', 'meditation',
 '환자 대상 명상 치료 프로그램 도입을 위한 교육입니다.', 'pending', '2026-02-16 11:20:00');

-- 진행 중 (approved)
INSERT INTO education_applications (
  organization_type, organization_name, contact_person, contact_phone, contact_email,
  address, participant_count, preferred_date, preferred_time, education_type,
  message, status, approved_date, education_start_date, education_end_date, instructor_name,
  created_at
) VALUES 
('company', '금융공기업', '문차장', '02-1111-3333', 'moon@finance.kr',
 '서울시 영등포구 금융로 222', 25, '2026-02-28', '19:00-21:00', 'meditation',
 '직장인 마음챙김 명상 교육을 신청합니다.', 'approved', '2026-02-17', '2026-02-28', '2026-02-28', '명상 전문강사 김명상',
 '2026-02-10 09:30:00'),
('school', '경기여자중학교', '유선생', '031-2222-4444', 'yoo@gyeonggi.kr',
 '경기도 성남시 교육로 333', 20, '2026-03-08', '15:00-17:00', 'meditation',
 '학생들의 정서 안정을 위한 명상 교육 신청입니다.', 'approved', '2026-02-15', '2026-03-08', '2026-03-08', '명상 전문강사 이명온',
 '2026-02-07 14:10:00');

-- 완료 (completed)
INSERT INTO education_applications (
  organization_type, organization_name, contact_person, contact_phone, contact_email,
  address, participant_count, preferred_date, preferred_time, education_type,
  message, status, approved_date, education_start_date, education_end_date, instructor_name, notes,
  created_at
) VALUES 
('community', '마포구 복지관', '조관장', '02-3333-5555', 'cho@welfare.kr',
 '서울시 마포구 복지로 444', 18, '2026-02-15', '14:00-16:00', 'meditation',
 '지역 어르신들을 위한 명상 프로그램입니다.', 'completed', '2026-02-05', '2026-02-15', '2026-02-15', '명상 전문강사 박명심', '어르신들이 매우 만족하셨으며, 정기 프로그램 전환 예정.',
 '2026-01-30 10:15:00'),
('company', '제조업체', '배사장', '031-4444-6666', 'bae@manu.kr',
 '경기도 안산시 공단로 555', 22, '2026-02-20', '17:00-19:00', 'meditation',
 '작업 집중력 향상을 위한 명상 교육 신청입니다.', 'completed', '2026-02-08', '2026-02-20', '2026-02-20', '명상 전문강사 최명안', '근로자들의 집중력 향상 효과 확인. 우수 평가.',
 '2026-02-01 13:00:00');
