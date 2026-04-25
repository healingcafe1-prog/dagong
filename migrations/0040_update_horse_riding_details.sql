-- 괴산 지역 추가
INSERT INTO regions (name, type, description) 
VALUES ('괴산', 'craft', '충청북도 괴산군');

-- 괴산네이쳐승마장 생산자 추가
INSERT INTO producers (
  name,
  region_id,
  producer_type,
  description,
  contact_phone,
  contact_email,
  address
) VALUES (
  '괴산네이쳐승마장',
  (SELECT id FROM regions WHERE name = '괴산'),
  'local',
  '자연과 함께하는 승마 체험을 제공하는 괴산의 승마장',
  '043-000-0000',
  'goesan.nature@example.com',
  '충청북도 괴산군'
);

-- 괴산 네이쳐승마장 외승 프로그램 업데이트
UPDATE experiences 
SET 
  region_id = (SELECT id FROM regions WHERE name = '괴산'),
  producer_id = (SELECT id FROM producers WHERE name = '괴산네이쳐승마장'),
  duration = '2시간',
  description = '아름다운 자연 속에서 즐기는 승마 외승 체험. 초보자도 안전하게 참여 가능하며, 전문 강사의 1:1 지도로 진행됩니다. 총 2시간 동안 자연 속 외승을 체험할 수 있습니다.'
WHERE experience_type = 'horse_riding' 
  AND title = '괴산 네이쳐승마장 외승';
