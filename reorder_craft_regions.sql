-- 공예산지 순서 변경
-- 순서: 경기 광주 → 여주 → 이천 → 진천 → 청주 → 문경 → 김해 → 강진 → 부안

-- 1. display_order 컬럼 추가
ALTER TABLE regions ADD COLUMN display_order INTEGER DEFAULT 0;

-- 2. 공예산지 순서 설정
UPDATE regions SET display_order = 1 WHERE name = '경기 광주' AND type = 'craft';
UPDATE regions SET display_order = 2 WHERE name = '여주' AND type = 'craft';
UPDATE regions SET display_order = 3 WHERE name = '이천' AND type = 'craft';
UPDATE regions SET display_order = 4 WHERE name = '진천' AND type = 'craft';
UPDATE regions SET display_order = 5 WHERE name = '청주' AND type = 'craft';
UPDATE regions SET display_order = 6 WHERE name = '문경' AND type = 'craft';
UPDATE regions SET display_order = 7 WHERE name = '김해' AND type = 'craft';
UPDATE regions SET display_order = 8 WHERE name = '강진' AND type = 'craft';
UPDATE regions SET display_order = 9 WHERE name = '부안' AND type = 'craft';

-- 3. 차산지는 ID 순서로 유지 (기본값 0이면 ID 순서로 정렬됨)
