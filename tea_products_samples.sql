-- 녹차 3개
INSERT INTO products (
  name, category_id, producer_id, description, 
  consumer_price, direct_price, original_price,
  discount_rate, shipping_fee, stock_quantity,
  product_type, weight, origin,
  is_featured, is_available,
  platform_fee_rate, card_fee_rate, tax_rate, total_fee_rate
) VALUES
('제주 한라산 녹차 50g', 1, 2, '제주 한라산 청정지역에서 자란 유기농 녹차입니다. 은은한 향과 깔끔한 맛이 특징입니다.', 
 15000, 10500, 15000, 30, 3000, 100,
 'tea', 50, '제주도', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('하동 야생 녹차 100g', 1, 1, '경남 하동의 야생차밭에서 자란 프리미엄 녹차입니다. 깊은 맛과 진한 향이 일품입니다.', 
 35000, 24500, 35000, 30, 3000, 50,
 'tea', 100, '경상남도 하동', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('보성 우전 녹차 50g', 1, 1, '전남 보성의 첫 물 우전차입니다. 부드러운 맛과 은은한 단맛이 특징입니다.', 
 28000, 19600, 28000, 30, 3000, 80,
 'tea', 50, '전라남도 보성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2);

-- 백차 3개
INSERT INTO products (
  name, category_id, producer_id, description, 
  consumer_price, direct_price, original_price,
  discount_rate, shipping_fee, stock_quantity,
  product_type, weight, origin,
  is_featured, is_available,
  platform_fee_rate, card_fee_rate, tax_rate, total_fee_rate
) VALUES
('백모단 백차 30g', 21, 2, '어린 잎으로 만든 프리미엄 백차입니다. 은은한 꽃향과 부드러운 맛이 특징입니다.', 
 45000, 31500, 45000, 30, 3000, 30,
 'tea', 30, '중국 푸젠성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('백호은침 백차 50g', 21, 1, '고급 백차로 은빛 털이 가득한 어린 싹으로 만들었습니다. 달콤한 여운이 오래 남습니다.', 
 55000, 38500, 55000, 30, 3000, 25,
 'tea', 50, '중국 푸젠성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('수미 백차 40g', 21, 2, '부드럽고 깔끔한 맛의 백차입니다. 카페인이 적어 밤에도 즐기기 좋습니다.', 
 38000, 26600, 38000, 30, 3000, 40,
 'tea', 40, '중국 푸젠성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2);

-- 청차 3개
INSERT INTO products (
  name, category_id, producer_id, description, 
  consumer_price, direct_price, original_price,
  discount_rate, shipping_fee, stock_quantity,
  product_type, weight, origin,
  is_featured, is_available,
  platform_fee_rate, card_fee_rate, tax_rate, total_fee_rate
) VALUES
('철관음 청차 80g', 22, 1, '중국 안계철관음입니다. 화려한 꽃향과 깊은 맛이 조화롭습니다.', 
 42000, 29400, 42000, 30, 3000, 60,
 'tea', 80, '중국 푸젠성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('대만 동정오룡차 100g', 22, 2, '대만 고산에서 자란 프리미엄 오룡차입니다. 과일향과 꿀향이 풍부합니다.', 
 65000, 45500, 65000, 30, 3000, 35,
 'tea', 100, '대만', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('무이암차 대홍포 50g', 22, 1, '중국 무이산의 명차 대홍포입니다. 깊고 묵직한 암운 향이 특징입니다.', 
 85000, 59500, 85000, 30, 3000, 20,
 'tea', 50, '중국 푸젠성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2);

-- 황차 3개
INSERT INTO products (
  name, category_id, producer_id, description, 
  consumer_price, direct_price, original_price,
  discount_rate, shipping_fee, stock_quantity,
  product_type, weight, origin,
  is_featured, is_available,
  platform_fee_rate, card_fee_rate, tax_rate, total_fee_rate
) VALUES
('군산황아 황차 50g', 2, 2, '중국 사천의 전통 황차입니다. 부드러운 맛과 은은한 단맛이 특징입니다.', 
 48000, 33600, 48000, 30, 3000, 40,
 'tea', 50, '중국 사천성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('몽정황아 황차 80g', 2, 1, '중국 명차 몽정황아입니다. 황금빛 수색과 깨끗한 맛이 일품입니다.', 
 68000, 47600, 68000, 30, 3000, 25,
 'tea', 80, '중국 사천성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('곽산황대차 황차 100g', 2, 2, '황차의 대표격인 곽산황대차입니다. 깊은 맛과 오래 지속되는 여운이 특징입니다.', 
 52000, 36400, 52000, 30, 3000, 30,
 'tea', 100, '중국 안휘성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2);

-- 홍차 3개
INSERT INTO products (
  name, category_id, producer_id, description, 
  consumer_price, direct_price, original_price,
  discount_rate, shipping_fee, stock_quantity,
  product_type, weight, origin,
  is_featured, is_available,
  platform_fee_rate, card_fee_rate, tax_rate, total_fee_rate
) VALUES
('정산소종 홍차 80g', 3, 1, '중국 정산의 전통 홍차입니다. 스모키한 향과 깊은 맛이 특징입니다.', 
 38000, 26600, 38000, 30, 3000, 50,
 'tea', 80, '중국 푸젠성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('기문홍차 100g', 3, 2, '세계 3대 홍차 기문홍차입니다. 과일향과 꿀향이 어우러진 고급 홍차입니다.', 
 55000, 38500, 55000, 30, 3000, 40,
 'tea', 100, '중국 안휘성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('전홍 제주 홍차 50g', 3, 2, '제주에서 재배한 국산 홍차입니다. 부드러운 맛과 은은한 단맛이 특징입니다.', 
 32000, 22400, 32000, 30, 3000, 60,
 'tea', 50, '제주도', 
 1, 1,
 6.6, 3.3, 3.3, 13.2);

-- 발효차 3개
INSERT INTO products (
  name, category_id, producer_id, description, 
  consumer_price, direct_price, original_price,
  discount_rate, shipping_fee, stock_quantity,
  product_type, weight, origin,
  is_featured, is_available,
  platform_fee_rate, card_fee_rate, tax_rate, total_fee_rate
) VALUES
('보이생차 100g', 4, 1, '운남 보이 생차입니다. 떫은맛과 단맛이 조화롭고 숙성 가능성이 높습니다.', 
 48000, 33600, 48000, 30, 3000, 45,
 'tea', 100, '중국 운남성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('보이숙차 병차 357g', 4, 2, '10년 숙성 보이 숙차입니다. 깊고 부드러운 맛이 일품입니다.', 
 120000, 84000, 120000, 30, 3000, 20,
 'tea', 357, '중국 운남성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('흑전차 안화흑차 200g', 4, 1, '중국 안화의 전통 흑차입니다. 구수한 맛과 깊은 여운이 특징입니다.', 
 65000, 45500, 65000, 30, 3000, 30,
 'tea', 200, '중국 호남성', 
 1, 1,
 6.6, 3.3, 3.3, 13.2);

-- 블렌딩차 3개
INSERT INTO products (
  name, category_id, producer_id, description, 
  consumer_price, direct_price, original_price,
  discount_rate, shipping_fee, stock_quantity,
  product_type, weight, origin,
  is_featured, is_available,
  platform_fee_rate, card_fee_rate, tax_rate, total_fee_rate
) VALUES
('얼그레이 블렌딩 100g', 6, 2, '홍차에 베르가못 향을 더한 클래식 블렌딩차입니다. 상쾌한 감귤향이 특징입니다.', 
 28000, 19600, 28000, 30, 3000, 80,
 'tea', 100, '국내 제조', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('캐모마일 릴렉스 블렌딩 50g', 6, 1, '캐모마일과 허브를 블렌딩한 릴렉스 티입니다. 숙면에 도움을 줍니다.', 
 22000, 15400, 22000, 30, 3000, 90,
 'tea', 50, '국내 제조', 
 1, 1,
 6.6, 3.3, 3.3, 13.2),

('과일 하이비스커스 블렌딩 80g', 6, 2, '하이비스커스에 다양한 과일을 블렌딩했습니다. 새콤달콤한 맛이 일품입니다.', 
 25000, 17500, 25000, 30, 3000, 100,
 'tea', 80, '국내 제조', 
 1, 1,
 6.6, 3.3, 3.3, 13.2);
