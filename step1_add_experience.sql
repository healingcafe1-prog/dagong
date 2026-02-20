-- 체험 프로그램 1개 추가 (ID 5)
INSERT OR IGNORE INTO experiences (
  id, 
  title, 
  region_id, 
  producer_id, 
  experience_type, 
  description, 
  duration, 
  price, 
  max_participants, 
  main_image, 
  is_available, 
  original_price, 
  discount_rate, 
  commission_rate, 
  created_at
) VALUES (
  5,
  '하동 야생차 체험',
  2,
  2,
  'tea_experience',
  '천년 야생차밭에서 직접 차를 따고 전통 제다 과정을 체험합니다. 차 시음과 함께 야생차의 역사를 배울 수 있습니다.',
  '3시간',
  45000,
  15,
  '/images/experiences/hadong-wildtea.jpg',
  1,
  45000,
  0,
  9.9,
  '2024-01-01 00:00:00'
);
