# 지역특산품과 체험교육 데이터 복원 가이드

## ⚠️ 중요 안내
Wrangler CLI를 통한 원격 실행이 너무 느려서 타임아웃이 발생합니다.  
**Cloudflare 대시보드에서 직접 SQL을 실행**하는 것이 가장 빠르고 확실합니다.

## 📋 복원할 데이터
1. **Producers**: 5개 → 13개 (8개 추가)
2. **Products**: 17개 → 78개 (61개 추가, 지역특산품 포함)
3. **Experiences**: 4개 → 5개 (1개 추가)
4. **Education Curriculum**: 16개 → 30개 (14개 추가)

## 🚀 복원 방법

### 방법 1: Cloudflare 대시보드 (권장)

1. **로그인**: https://dash.cloudflare.com/
2. **이동**: Workers & Pages → D1 → **webapp-production** → **Console**
3. **SQL 실행**: 아래 SQL을 복사하여 Console에 붙여넣고 실행

#### Step 1: Producers 추가 (8개)

```sql
INSERT INTO producers (id, name, region_id, producer_type, description, contact_email, contact_phone, address, created_at) VALUES
(6, '제주 다원명가', 1, 'tea', '제주 화산토에서 자란 유기농 녹차', 'jejutea@example.com', '064-123-4567', '제주특별자치도 서귀포시 표선면', '2024-01-01'),
(7, '제주 차향', 1, 'tea', '제주 동쪽 해안의 차밭에서 재배한 프리미엄 발효차', 'chahyang@example.com', '064-234-5678', '제주특별자치도 제주시 구좌읍', '2024-01-01'),
(8, '경기 광주 도예공방', 9, 'craft', '전통 분청사기 기법의 현대 다기', 'gwangjuceramics@example.com', '031-760-1234', '경기도 광주시 곤지암읍', '2024-01-01'),
(9, '이천 도자예술촌', 11, 'craft', '왕실 도자기 전통의 프리미엄 다기', 'icheonpottery@example.com', '031-630-2222', '경기도 이천시 신둔면', '2024-01-01'),
(10, '담양 죽세공예', 13, 'craft', '3대째 이어오는 대나무 다기', 'damyangbamboo@example.com', '061-380-3333', '전라남도 담양군 담양읍', '2024-01-01'),
(11, '통영 나전칠기', 15, 'craft', '전통 나전칠기 기법의 고급 다기', 'tongyeongmop@example.com', '055-640-4444', '경상남도 통영시 광도면', '2024-01-01'),
(12, '강원 평창 농특산', 17, 'tea', '해발 700m 고랭지 청정 농산물', 'pyeongchangfarm@example.com', '033-330-5555', '강원도 평창군 대관령면', '2024-01-01'),
(13, '장흥 정남진차', 5, 'tea', '남도의 정기가 담긴 유기농 녹차', 'jangheungtea@example.com', '061-860-6666', '전라남도 장흥군 관산읍', '2024-01-01');
```

**확인**: `SELECT COUNT(*) FROM producers;` → 13개 나와야 함

#### Step 2: Products 추가 (Part 1/3: ID 18-40)

⚠️ **중요**: 한 번에 너무 많은 INSERT를 하면 대시보드에서도 타임아웃될 수 있습니다.  
**3번에 나눠서** 실행하세요.

```sql
-- Part 1: 녹차류 + 수공예품 일부 (ID 18-40)
INSERT INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, created_at) VALUES
(18, '제주 유기농 첫물차', 1, 6, '봄의 첫 순을 따서 만든 프리미엄 녹차', 35000, 100, '/images/products/jeju-first-tea.jpg', 'tea', '50g', '제주도', 1, 1, '2024-01-15'),
(19, '제주 봄차 세작', 1, 6, '곡우 전후 채엽한 상급 녹차', 45000, 80, '/images/products/jeju-sejak.jpg', 'tea', '100g', '제주도', 1, 1, '2024-01-15'),
(20, '제주 유기농 말차', 7, 6, '곱게 갈아 만든 프리미엄 말차 가루', 28000, 70, '/images/products/jeju-matcha.jpg', 'tea', '30g', '제주도', 1, 1, '2024-01-15'),
(21, '제주 백차 은침', 21, 6, '어린 순으로만 만든 희귀한 백차', 75000, 30, '/images/products/jeju-white-tea.jpg', 'tea', '30g', '제주도', 1, 1, '2024-01-15'),
(22, '제주 청차 동정오룡', 22, 6, '반발효차의 깊은 향', 48000, 60, '/images/products/jeju-oolong.jpg', 'tea', '50g', '제주도', 0, 1, '2024-01-15'),
(23, '제주 우롱차 고산', 23, 7, '제주 고산지대에서 재배한 우롱차', 52000, 55, '/images/products/jeju-gosan-oolong.jpg', 'tea', '100g', '제주도', 1, 1, '2024-01-15'),
(24, '제주 홍차', 3, 7, '국내산 홍차의 깊고 풍부한 맛', 42000, 70, '/images/products/jeju-black-tea.jpg', 'tea', '50g', '제주도', 0, 1, '2024-01-15'),
(25, '제주 발효차', 4, 7, '3년 숙성 발효차', 38000, 65, '/images/products/jeju-fermented.jpg', 'tea', '100g', '제주도', 0, 1, '2024-01-15'),
(26, '광주 분청 찻잔 세트', 8, 8, '전통 분청사기 다기 세트 (5개)', 85000, 30, '/images/products/gwangju-buncheong-cups.jpg', 'craft', '세트', '경기 광주', 1, 1, '2024-01-20'),
(27, '이천 백자 찻잔', 8, 9, '왕실 도자기 전통의 백자 찻잔', 95000, 25, '/images/products/icheon-white-cup.jpg', 'craft', '개', '이천', 1, 1, '2024-01-20'),
(28, '광주 분청 주전자', 9, 8, '전통 분청사기 주전자', 125000, 20, '/images/products/gwangju-buncheong-pot.jpg', 'craft', '개', '경기 광주', 1, 1, '2024-01-20'),
(29, '이천 백자 주전자', 9, 9, '왕실 백자 기법의 프리미엄 주전자', 155000, 15, '/images/products/icheon-white-pot.jpg', 'craft', '개', '이천', 1, 1, '2024-01-20'),
(30, '광주 분청 다관 세트', 12, 8, '찻잔 6개 + 주전자 + 찻상', 320000, 10, '/images/products/gwangju-tea-set.jpg', 'craft', '세트', '경기 광주', 1, 1, '2024-01-20'),
(31, '이천 백자 다관 세트', 12, 9, '왕실 백자 다기 풀세트', 450000, 8, '/images/products/icheon-tea-set.jpg', 'craft', '세트', '이천', 1, 1, '2024-01-20'),
(32, '담양 대나무 찻상', 10, 10, '3단 접이식 대나무 다탁', 75000, 35, '/images/products/damyang-bamboo-table.jpg', 'craft', '개', '담양', 0, 1, '2024-01-20'),
(33, '담양 대나무 다기세트', 10, 10, '대나무 찻상 + 찻잔받침 세트', 95000, 28, '/images/products/damyang-bamboo-set.jpg', 'craft', '세트', '담양', 0, 1, '2024-01-20'),
(34, '통영 나전 향로', 11, 11, '자개를 박아 만든 고급 향로', 185000, 12, '/images/products/tongyeong-incense.jpg', 'craft', '개', '통영', 1, 1, '2024-01-20'),
(35, '통영 나전 찻잔받침 세트', 11, 11, '나전칠기 기법의 찻잔받침 (5개)', 145000, 18, '/images/products/tongyeong-coaster-set.jpg', 'craft', '세트', '통영', 1, 1, '2024-01-20'),
(36, '광주 분청 개인찻잔', 8, 8, '일상용 분청 찻잔 (단품)', 22000, 80, '/images/products/gwangju-single-cup.jpg', 'craft', '개', '경기 광주', 0, 1, '2024-01-20'),
(37, '이천 청자 찻잔', 8, 9, '고려청자 기법의 모던 찻잔', 45000, 50, '/images/products/icheon-celadon-cup.jpg', 'craft', '개', '이천', 0, 1, '2024-01-20'),
(38, '이천 청자 주전자', 9, 9, '고려청자 스타일의 주전자', 135000, 22, '/images/products/icheon-celadon-pot.jpg', 'craft', '개', '이천', 0, 1, '2024-01-20'),
(39, '담양 대나무 다완', 12, 10, '장인이 깎아 만든 대나무 찻잔', 18000, 90, '/images/products/damyang-bamboo-cup.jpg', 'craft', '개', '담양', 0, 1, '2024-01-20'),
(40, '통영 나전 찻잔', 8, 11, '자개 장식의 고급 찻잔', 95000, 15, '/images/products/tongyeong-mop-cup.jpg', 'craft', '개', '통영', 1, 1, '2024-01-20');
```

**확인**: `SELECT COUNT(*) FROM products;` → 40개 나와야 함

#### Step 3: Products 추가 (Part 2/3: ID 41-60, 지역특산품)

```sql
-- Part 2: 지역 특산품 (ID 41-60)
INSERT INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, created_at) VALUES
(41, '평창 고랭지 배추', 15, 12, '해발 700m 청정 고랭지 배추', 25000, 100, '/images/products/pyeongchang-cabbage.jpg', 'local', '10kg', '평창', 0, 1, '2024-02-01'),
(42, '평창 고랭지 무', 15, 12, '아삭한 고랭지 무', 15000, 120, '/images/products/pyeongchang-radish.jpg', 'local', '5kg', '평창', 0, 1, '2024-02-01'),
(43, '평창 감자', 15, 12, '밤맛 나는 고랭지 감자', 12000, 150, '/images/products/pyeongchang-potato.jpg', 'local', '3kg', '평창', 0, 1, '2024-02-01'),
(44, '평창 찰옥수수', 15, 12, '당도 높은 찰옥수수', 18000, 80, '/images/products/pyeongchang-corn.jpg', 'local', '10개', '평창', 1, 1, '2024-02-01'),
(45, '제주 당근', 15, 6, '달콤한 제주 당근', 15000, 90, '/images/products/jeju-carrot.jpg', 'local', '3kg', '제주도', 0, 1, '2024-02-01'),
(46, '제주 브로콜리', 15, 6, '신선한 제주 브로콜리', 12000, 70, '/images/products/jeju-broccoli.jpg', 'local', '2kg', '제주도', 0, 1, '2024-02-01'),
(47, '보성 녹차쌀', 15, 1, '녹차밭에서 재배한 쌀', 28000, 60, '/images/products/boseong-greentea-rice.jpg', 'local', '5kg', '보성', 0, 1, '2024-02-01'),
(48, '보성 녹차 김', 16, 1, '녹차 가루를 입힌 김', 15000, 100, '/images/products/boseong-greentea-seaweed.jpg', 'local', '10매', '보성', 0, 1, '2024-02-01'),
(49, '제주 녹차 초콜릿', 18, 6, '제주 녹차 수제 초콜릿', 18000, 80, '/images/products/jeju-greentea-chocolate.jpg', 'local', '200g', '제주도', 0, 1, '2024-02-01'),
(50, '제주 녹차 쿠키', 18, 6, '바삭한 녹차 쿠키', 12000, 90, '/images/products/jeju-greentea-cookie.jpg', 'local', '300g', '제주도', 0, 1, '2024-02-01'),
(51, '보성 녹차 카스테라', 18, 1, '촉촉한 녹차 카스테라', 15000, 70, '/images/products/boseong-greentea-cake.jpg', 'local', '1개', '보성', 0, 1, '2024-02-01'),
(52, '제주 녹차 잼', 18, 7, '유기농 녹차로 만든 잼', 14000, 60, '/images/products/jeju-greentea-jam.jpg', 'local', '250g', '제주도', 0, 1, '2024-02-01'),
(53, '제주 삼백초', 19, 6, '제주 자생 삼백초', 22000, 50, '/images/products/jeju-houttuynia.jpg', 'local', '100g', '제주도', 0, 1, '2024-02-01'),
(54, '제주 곽향', 19, 7, '제주산 곽향', 18000, 55, '/images/products/jeju-agastache.jpg', 'local', '100g', '제주도', 0, 1, '2024-02-01'),
(55, '평창 더덕', 19, 12, '산지 직송 더덕', 35000, 40, '/images/products/pyeongchang-deodeok.jpg', 'local', '1kg', '평창', 1, 1, '2024-02-01'),
(56, '평창 도라지', 19, 12, '쌉싸름한 도라지', 32000, 45, '/images/products/pyeongchang-doraji.jpg', 'local', '1kg', '평창', 0, 1, '2024-02-01'),
(57, '제주 한라봉', 15, 6, '달콤한 제주 한라봉', 35000, 100, '/images/products/jeju-hallabong.jpg', 'local', '3kg', '제주도', 1, 1, '2024-02-01'),
(58, '제주 천혜향', 15, 6, '고급 감귤 천혜향', 38000, 80, '/images/products/jeju-cheonhyehyang.jpg', 'local', '3kg', '제주도', 1, 1, '2024-02-01'),
(59, '제주 레드향', 15, 6, '새콤달콤 레드향', 32000, 90, '/images/products/jeju-redhyang.jpg', 'local', '3kg', '제주도', 0, 1, '2024-02-01'),
(60, '평창 대관령 양배추', 15, 12, '고랭지 양배추', 18000, 100, '/images/products/pyeongchang-cabbage2.jpg', 'local', '5kg', '평창', 0, 1, '2024-02-01');
```

**확인**: `SELECT COUNT(*) FROM products;` → 60개 나와야 함

#### Step 4: Products 추가 (Part 3/3: ID 61-78, 지역특산품 계속)

```sql
-- Part 3: 지역 특산품 계속 (ID 61-78)
INSERT INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, created_at) VALUES
(61, '평창 한우 불고기', 17, 12, '1++등급 한우 불고기', 75000, 30, '/images/products/pyeongchang-hanwoo.jpg', 'local', '1kg', '평창', 1, 1, '2024-02-01'),
(62, '평창 한우 등심', 17, 12, '1++등급 한우 등심', 85000, 25, '/images/products/pyeongchang-hanwoo-sirloin.jpg', 'local', '500g', '평창', 1, 1, '2024-02-01'),
(63, '보성 녹차 국수', 18, 1, '녹차를 넣은 건면', 8000, 120, '/images/products/boseong-greentea-noodle.jpg', 'local', '500g', '보성', 0, 1, '2024-02-01'),
(64, '제주 녹차 빵', 18, 6, '녹차 크림 듬뿍 빵', 12000, 80, '/images/products/jeju-greentea-bread.jpg', 'local', '6개', '제주도', 0, 1, '2024-02-01'),
(65, '제주 녹차 엿', 18, 7, '전통 방식 녹차 엿', 15000, 60, '/images/products/jeju-greentea-yeot.jpg', 'local', '300g', '제주도', 0, 1, '2024-02-01'),
(66, '장흥 녹차 된장', 18, 13, '녹차를 넣은 된장', 18000, 50, '/images/products/jangheung-greentea-doenjang.jpg', 'local', '500g', '장흥', 0, 1, '2024-02-01'),
(67, '장흥 녹차 고추장', 18, 13, '녹차를 넣은 고추장', 19000, 45, '/images/products/jangheung-greentea-gochujang.jpg', 'local', '500g', '장흥', 0, 1, '2024-02-01'),
(68, '장흥 녹차주', 20, 13, '녹차를 넣은 전통 청주', 28000, 40, '/images/products/jangheung-greentea-soju.jpg', 'local', '375ml', '장흥', 0, 1, '2024-02-01'),
(69, '장흥 다산주', 20, 13, '다산 선생의 차 문화를 담은 청주', 32000, 35, '/images/products/gangjin-dasan-soju.jpg', 'local', '375ml', '장흥', 0, 1, '2024-02-01'),
(70, '제주 녹차 아이스크림', 18, 6, '진한 녹차 맛 아이스크림', 12000, 70, '/images/products/jeju-greentea-icecream.jpg', 'local', '500ml', '제주도', 0, 1, '2024-02-01'),
(71, '보성 녹차 빙수떡', 18, 1, '녹차 맛 빙수떡', 9000, 90, '/images/products/boseong-greentea-bingsu.jpg', 'local', '300g', '보성', 0, 1, '2024-02-01'),
(72, '제주 귤 초콜릿', 15, 6, '제주 귤 필 초콜릿', 16000, 75, '/images/products/jeju-citrus-chocolate.jpg', 'local', '200g', '제주도', 0, 1, '2024-02-01'),
(73, '제주 말차 마카롱', 18, 7, '프리미엄 말차 마카롱', 18000, 55, '/images/products/jeju-matcha-macaron.jpg', 'local', '6개', '제주도', 0, 1, '2024-02-01'),
(74, '평창 송이버섯', 15, 12, '자연산 송이버섯', 85000, 15, '/images/products/pyeongchang-songi.jpg', 'local', '500g', '평창', 1, 1, '2024-02-01'),
(75, '평창 곤드레', 15, 12, '신선한 곤드레나물', 12000, 60, '/images/products/pyeongchang-gondre.jpg', 'local', '300g', '평창', 0, 1, '2024-02-01'),
(76, '제주 우도 땅콩', 15, 6, '고소한 우도 땅콩', 15000, 80, '/images/products/jeju-udo-peanut.jpg', 'local', '500g', '제주도', 0, 1, '2024-02-01'),
(77, '보성 녹차 막걸리', 20, 1, '녹차향 가득한 막걸리', 8000, 100, '/images/products/boseong-greentea-makgeolli.jpg', 'local', '750ml', '보성', 0, 1, '2024-02-01'),
(78, '제주 한라산 꿀', 19, 6, '청정 제주 야생화 꿀', 35000, 50, '/images/products/jeju-hallasan-honey.jpg', 'local', '500g', '제주도', 1, 1, '2024-02-01');
```

**확인**: `SELECT COUNT(*) FROM products;` → 78개 나와야 함  
**확인**: `SELECT COUNT(*) FROM products WHERE product_type='local';` → 38개 지역특산품

#### Step 5: Experience 추가 (1개)

```sql
INSERT INTO experiences (id, producer_id, title, description, duration, price, max_participants, location, schedule_info, difficulty, min_age, created_at) VALUES
(5, 2, '하동 야생차 채엽과 전통 제다', '지리산 자락의 야생차밭에서 손으로 차를 따고 전통 덖음 방식으로 차를 만드는 본격 체험', 240, 75000, 8, '경상남도 하동군 악양면', '4-5월, 매주 토 09:00 (1회)', '중급', 14, '2024-01-10');
```

**확인**: `SELECT COUNT(*) FROM experiences;` → 5개 나와야 함

#### Step 6: Education Curriculum 추가 (14개, 2번에 나눠 실행)

**Part 1 (ID 17-24):**
```sql
INSERT INTO education_curriculum (id, category_id, title, description, duration, price, max_students, schedule, instructor, curriculum_detail, difficulty, prerequisites, certificate, created_at) VALUES
(17, 3, '차 힐링 테라피스트', '차를 활용한 힐링 프로그램 운영 전문가 과정', 240, 350000, 10, '매월 둘째주 토요일 시작', '이힐링 테라피스트', '1강: 힐링의 이해, 2강: 차 테라피 기법, 3강: 프로그램 기획, 4강: 실전 운영', '중급', '차 명상 이수', '차 힐링 테라피스트 자격증', '2024-01-05'),
(18, 4, '말차 제조와 활용', '말차를 직접 제조하고 활용하는 실습', 150, 100000, 15, '매월 넷째주 토요일 14:00', '정말차 장인', '1강: 말차의 이해, 2강: 덖음차 제조, 3강: 분쇄 실습, 4강: 말차 요리와 음료', '중급', '없음', '수료증', '2024-01-05'),
(19, 4, '차 가공식품 개발', '차 활용 식품 개발 창업 과정', 180, 150000, 12, '매월 첫째주 일요일 10:00', '최창업 대표', '1강: 차 가공식품의 종류, 2강: 제품 기획, 3강: 시제품 제작, 4강: 인허가와 판매', '고급', '없음', '수료증', '2024-01-05'),
(20, 5, '목공예 다기 만들기', '나무를 깎아 다완, 차통 만들기', 180, 150000, 10, '매월 둘째주 토요일 10:00', '강목수 장인', '1강: 목재의 이해, 2강: 깎기 도구 사용, 3강: 다완 제작, 4강: 차통 제작', '중급', '없음', '수료증', '2024-01-05'),
(21, 5, '칠기 다기 만들기', '나전칠기 기법으로 다기 제작', 240, 300000, 6, '매월 셋째주 토-일 10:00', '박칠기 장인', '1강: 칠기의 역사, 2강: 옹이 제작, 3강: 칠 올리기, 4강: 나전 장식', '고급', '없음', '수료증', '2024-01-05'),
(22, 6, '차 창업 과정', '차 카페나 차 판매업 창업 실전 과정', 240, 300000, 15, '매월 넷째주 금요일 시작', '송사장 대표', '1강: 차 시장 분석, 2강: 사업 계획서, 3강: 공간 구성, 4강: 메뉴 개발, 5강: 마케팅, 6강: 운영 실무', '중급', '없음', '수료증', '2024-01-05'),
(23, 6, '티 바리스타 과정', '카페에서 다양한 티 음료를 만드는 바리스타 과정', 180, 180000, 12, '매월 첫째주 월요일 시작', '이바리 바리스타', '1강: 티 바리스타의 이해, 2강: 차 추출 기법, 3강: 티 라떼 만들기, 4강: 티 칵테일 만들기, 5강: 실전 메뉴 개발', '중급', '없음', '티 바리스타 자격증', '2024-01-05'),
(24, 1, '어린이 차 교실', '어린이가 차 문화를 쉽고 재미있게 배우는 과정', 90, 30000, 15, '매월 둘째주 토요일 10:00', '홍선생', '1강: 차는 어디서 왔을까, 2강: 차 마시는 방법, 3강: 엄마 아빠께 차 대접하기', '초급', '초등학생', '수료증', '2024-01-05');
```

**Part 2 (ID 25-30):**
```sql
INSERT INTO education_curriculum (id, category_id, title, description, duration, price, max_students, schedule, instructor, curriculum_detail, difficulty, prerequisites, certificate, created_at) VALUES
(25, 3, '사찰 차 명상', '사찰에서 진행하는 1박 2일 차 명상 템플스테이', 1440, 150000, 20, '매월 첫째, 셋째 토-일', '혜정 스님', '1일차: 사찰 예절, 저녁 예불, 차 명상, 2일차: 새벽 예불, 발우공양, 108배, 차 명상, 소감 나눔', '초급', '없음', '수료증', '2024-01-05'),
(26, 4, '야생차 채엽 실습', '지리산 야생차밭에서 채엽과 제다 실습', 300, 200000, 10, '4-5월 매주 토요일 08:00', '송야생 장인', '1강: 야생차의 이해, 2강: 산행과 채엽, 3강: 전통 덖음 실습, 4강: 건조와 보관', '중급', '없음', '수료증', '2024-01-05'),
(27, 5, '한지 공예 다기', '전통 한지로 찻상, 찻잔받침 만들기', 150, 100000, 12, '매월 셋째주 일요일 13:00', '김한지 작가', '1강: 한지의 역사, 2강: 한지 제작 체험, 3강: 찻잔받침 만들기, 4강: 찻상 만들기', '초급', '없음', '수료증', '2024-01-05'),
(28, 6, '차 수출입 실무', '차를 수출입하려는 이들을 위한 무역 실무 과정', 180, 200000, 15, '매월 넷째주 화요일 시작', '장무역 대표', '1강: 차 무역의 이해, 2강: 수출입 절차, 3강: 통관과 인증, 4강: 바이어 발굴', '고급', '없음', '수료증', '2024-01-05'),
(29, 3, '차와 명상 지도자', '차 명상 프로그램 지도 전문가 과정', 360, 500000, 10, '매월 첫째주 목요일 시작', '김명상 지도자', '1개월: 명상의 이론과 실습, 2개월: 차 명상 프로그램 기획, 3개월: 실전 지도와 평가', '고급', '차 명상 심화 이수', '차 명상 지도사 자격증', '2024-01-05'),
(30, 6, '차 품평회 심사위원', '공인 차 품평회에서 심사할 수 있는 전문가 양성', 240, 400000, 8, '매월 둘째주 토-일 10:00', '한심사 위원', '1강: 품평회의 이해, 2강: 심사 기준과 방법, 3강: 실전 품평 훈련, 4강: 모의 품평회', '최상급', '차 소믈리에 이수', '차 품평 심사위원 자격증', '2024-01-05');
```

**확인**: `SELECT COUNT(*) FROM education_curriculum;` → 30개 나와야 함

## ✅ 최종 확인

모든 단계가 완료되면 다음 명령으로 최종 확인:

```sql
SELECT 
  (SELECT COUNT(*) FROM producers) as producers,
  (SELECT COUNT(*) FROM products) as products,
  (SELECT COUNT(*) FROM products WHERE product_type='local') as local_products,
  (SELECT COUNT(*) FROM experiences) as experiences,
  (SELECT COUNT(*) FROM education_curriculum) as education;
```

**예상 결과**:
- producers: 13
- products: 78
- local_products: 38 (지역특산품)
- experiences: 5
- education: 30

## 🌐 프로덕션 API 테스트

```bash
# 제품 (전체)
curl https://dagong-bi1.pages.dev/api/products?limit=100 | jq '.products | length'

# 지역특산품
curl https://dagong-bi1.pages.dev/api/products?product_type=local&limit=100 | jq '.products | length'

# 체험
curl https://dagong-bi1.pages.dev/api/experiences | jq '.experiences | length'

# 교육과정
curl https://dagong-bi1.pages.dev/api/education/curriculum | jq '.curriculum | length'
```

## 📝 참고사항
- **실행 시간**: 전체 약 10-15분 소요
- **중요**: 각 단계를 순서대로 실행하세요
- **에러 발생 시**: SQL을 다시 복사하여 재실행
- **대시보드 경로**: https://dash.cloudflare.com/ → Workers & Pages → D1 → webapp-production → Console

---

**작성일**: 2026-02-20  
**프로젝트**: 다공(dagong)  
**GitHub**: https://github.com/healingcafe1-prog/dagong
