-- 테스트 주문 데이터 삽입

-- 1. 테스트 주문 생성 (pending 상태)
INSERT INTO orders (
  order_number, buyer_name, buyer_email, buyer_phone,
  recipient_name, recipient_phone, delivery_address, delivery_zipcode, delivery_memo,
  total_amount, discount_amount, shipping_fee, final_amount,
  order_status, payment_status
) VALUES (
  'ORD20260103001', '김철수', 'chulsoo@example.com', '010-1234-5678',
  '김철수', '010-1234-5678', '서울특별시 강남구 테헤란로 123', '06234', '문 앞에 놓아주세요',
  63000, 0, 3000, 66000,
  'pending', 'pending'
);

-- 2. 주문 상품 추가
INSERT INTO order_items (
  order_id, product_id, product_name, product_price, quantity, discount_rate, item_total,
  producer_id, commission_rate, commission_amount, producer_revenue
) VALUES 
  (1, 1, '제주 유기농 첫물차', 35000, 1, 30, 35000, 1, 9.9, 3465, 31535),
  (1, 2, '하동 야생 녹차', 28000, 1, 30, 28000, 2, 9.9, 2772, 25228);

-- 3. 결제 완료 주문 생성
INSERT INTO orders (
  order_number, buyer_name, buyer_email, buyer_phone,
  recipient_name, recipient_phone, delivery_address, delivery_zipcode,
  total_amount, discount_amount, shipping_fee, final_amount,
  order_status, payment_status, payment_method, payment_date, payment_transaction_id
) VALUES (
  'ORD20260103002', '이영희', 'younghee@example.com', '010-2345-6789',
  '이영희', '010-2345-6789', '부산광역시 해운대구 센텀중앙로 79', '48058',
  45000, 0, 3000, 48000,
  'paid', 'completed', 'card', datetime('now'), 'TXN_20260103_001'
);

INSERT INTO order_items (
  order_id, product_id, product_name, product_price, quantity, discount_rate, item_total,
  producer_id, commission_rate, commission_amount, producer_revenue
) VALUES 
  (2, 3, '보성 우전차', 28000, 1, 30, 28000, 3, 9.9, 2772, 25228),
  (2, 1, '제주 유기농 첫물차', 35000, 1, 30, 35000, 1, 9.9, 3465, 31535);

-- 4. 배송 중 주문
INSERT INTO orders (
  order_number, buyer_name, buyer_email, buyer_phone,
  recipient_name, recipient_phone, delivery_address, delivery_zipcode,
  total_amount, discount_amount, shipping_fee, final_amount,
  order_status, payment_status, payment_method, payment_date, payment_transaction_id
) VALUES (
  'ORD20260103003', '박민수', 'minsoo@example.com', '010-3456-7890',
  '박민수', '010-3456-7890', '대전광역시 유성구 대학로 99', '34141',
  35000, 0, 3000, 38000,
  'shipping', 'completed', 'kakao_pay', datetime('now', '-2 days'), 'TXN_20260103_002'
);

INSERT INTO order_items (
  order_id, product_id, product_name, product_price, quantity, discount_rate, item_total,
  producer_id, commission_rate, commission_amount, producer_revenue
) VALUES 
  (3, 1, '제주 유기농 첫물차', 35000, 1, 30, 35000, 1, 9.9, 3465, 31535);

-- 배송 추적 정보
INSERT INTO order_shipments (
  order_id, courier_company, tracking_number, shipped_date, 
  estimated_delivery_date, delivery_status
) VALUES (
  3, 'CJ대한통운', '123456789012', datetime('now', '-1 day'),
  date('now', '+1 day'), 'in_transit'
);

-- 5. 배송 완료 주문
INSERT INTO orders (
  order_number, buyer_name, buyer_email, buyer_phone,
  recipient_name, recipient_phone, delivery_address, delivery_zipcode,
  total_amount, discount_amount, shipping_fee, final_amount,
  order_status, payment_status, payment_method, payment_date, payment_transaction_id
) VALUES (
  'ORD20260103004', '최지영', 'jiyoung@example.com', '010-4567-8901',
  '최지영', '010-4567-8901', '광주광역시 동구 금남로 123', '61470',
  73000, 0, 3000, 76000,
  'delivered', 'completed', 'card', datetime('now', '-5 days'), 'TXN_20260103_003'
);

INSERT INTO order_items (
  order_id, product_id, product_name, product_price, quantity, discount_rate, item_total,
  producer_id, commission_rate, commission_amount, producer_revenue
) VALUES 
  (4, 2, '하동 야생 녹차', 45000, 1, 30, 45000, 2, 9.9, 4455, 40545),
  (4, 3, '보성 우전차', 28000, 1, 30, 28000, 3, 9.9, 2772, 25228);

-- 배송 추적 정보
INSERT INTO order_shipments (
  order_id, courier_company, tracking_number, shipped_date, 
  estimated_delivery_date, delivery_status, delivery_completed_date
) VALUES (
  4, '로젠택배', '987654321098', datetime('now', '-4 days'),
  date('now', '-1 day'), 'delivered', datetime('now', '-1 day')
);

-- 6. 수령 확인 완료 주문
INSERT INTO orders (
  order_number, buyer_name, buyer_email, buyer_phone,
  recipient_name, recipient_phone, delivery_address, delivery_zipcode,
  total_amount, discount_amount, shipping_fee, final_amount,
  order_status, payment_status, payment_method, payment_date, payment_transaction_id
) VALUES (
  'ORD20260103005', '정현우', 'hyunwoo@example.com', '010-5678-9012',
  '정현우', '010-5678-9012', '인천광역시 연수구 송도과학로 123', '21984',
  35000, 0, 3000, 38000,
  'delivered', 'completed', 'naver_pay', datetime('now', '-7 days'), 'TXN_20260103_004'
);

INSERT INTO order_items (
  order_id, product_id, product_name, product_price, quantity, discount_rate, item_total,
  producer_id, commission_rate, commission_amount, producer_revenue
) VALUES 
  (5, 1, '제주 유기농 첫물차', 35000, 1, 30, 35000, 1, 9.9, 3465, 31535);

-- 배송 추적 정보
INSERT INTO order_shipments (
  order_id, courier_company, tracking_number, shipped_date, 
  estimated_delivery_date, delivery_status, delivery_completed_date
) VALUES (
  5, 'CJ대한통운', '555666777888', datetime('now', '-6 days'),
  date('now', '-3 days'), 'delivered', datetime('now', '-3 days')
);

-- 수령 확인
INSERT INTO order_confirmations (
  order_id, confirmed_date, rating, review_comment, is_reviewed
) VALUES (
  5, datetime('now', '-2 days'), 5, '상품 품질이 정말 좋네요! 배송도 빨랐습니다.', 1
);

-- 주문 상태 변경 이력
INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason) VALUES
  (2, 'pending', 'paid', 'system', '결제 완료'),
  (2, 'paid', 'preparing', 'producer_1', '상품 준비 시작'),
  (3, 'pending', 'paid', 'system', '결제 완료'),
  (3, 'paid', 'preparing', 'producer_1', '상품 준비 시작'),
  (3, 'preparing', 'shipping', 'producer_1', '배송 시작'),
  (4, 'pending', 'paid', 'system', '결제 완료'),
  (4, 'paid', 'preparing', 'producer_2', '상품 준비 시작'),
  (4, 'preparing', 'shipping', 'producer_2', '배송 시작'),
  (4, 'shipping', 'delivered', 'system', '배송 완료'),
  (5, 'pending', 'paid', 'system', '결제 완료'),
  (5, 'paid', 'preparing', 'producer_1', '상품 준비 시작'),
  (5, 'preparing', 'shipping', 'producer_1', '배송 시작'),
  (5, 'shipping', 'delivered', 'system', '배송 완료');
