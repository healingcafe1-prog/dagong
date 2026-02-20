-- ========================================
-- STEP 1: 기본 데이터 (지역, 카테고리, 생산자)
-- Cloudflare D1 콘솔 복사용
-- ========================================

PRAGMA foreign_keys = OFF;

-- 1. regions 테이블 데이터 삽입 (17개 지역)
INSERT OR IGNORE INTO regions (id, name, type, image, description, created_at) VALUES
(1, '제주도', 'tea', '/images/regions/jeju.jpg', '한국 최대 차 생산지', '2024-01-01 00:00:00'),
(2, '하동', 'tea', '/images/regions/hadong.jpg', '지리산 자락의 전통 차 재배지', '2024-01-01 00:00:00'),
(3, '김해', 'tea', '/images/regions/gimhae.jpg', '낙동강 하류의 차 재배지', '2024-01-01 00:00:00'),
(4, '보성', 'tea', '/images/regions/boseong.jpg', '한국을 대표하는 녹차 명소', '2024-01-01 00:00:00'),
(5, '장흥', 'tea', '/images/regions/jangheung.jpg', '남도의 차 향기가 가득한 곳', '2024-01-01 00:00:00'),
(6, '강진', 'tea', '/images/regions/gangjin.jpg', '다산 정약용의 차 문화가 살아있는 곳', '2024-01-01 00:00:00'),
(7, '고흥', 'tea', '/images/regions/goheung.jpg', '남해안의 차밭', '2024-01-01 00:00:00'),
(8, '순천', 'tea', '/images/regions/suncheon.jpg', '생태 도시의 유기농 차', '2024-01-01 00:00:00'),
(9, '경기 광주', 'craft', '/images/regions/gwangju.jpg', '전통 도자기와 수공예의 고장', '2024-01-01 00:00:00'),
(10, '여주', 'craft', '/images/regions/yeoju.jpg', '조선 왕실 도자기의 전통', '2024-01-01 00:00:00'),
(11, '이천', 'craft', '/images/regions/icheon.jpg', '한국 도자기의 메카', '2024-01-01 00:00:00'),
(12, '충북 단양', 'craft', '/images/regions/danyang.jpg', '마늘과 수공예의 고장', '2024-01-01 00:00:00'),
(13, '전남 담양', 'craft', '/images/regions/damyang.jpg', '대나무와 죽세공의 본고장', '2024-01-01 00:00:00'),
(14, '전북 남원', 'craft', '/images/regions/namwon.jpg', '목공예와 전통 악기의 고장', '2024-01-01 00:00:00'),
(15, '경남 통영', 'craft', '/images/regions/tongyeong.jpg', '나전칠기의 본고장', '2024-01-01 00:00:00'),
(16, '경북 안동', 'craft', '/images/regions/andong.jpg', '전통 한지와 목공예', '2024-01-01 00:00:00'),
(17, '강원 평창', 'local', '/images/regions/pyeongchang.jpg', '고랭지 농산물의 고장', '2024-01-01 00:00:00');

-- 2. categories 테이블 데이터 삽입 (27개 카테고리)
INSERT OR IGNORE INTO categories (id, name, type, display_order, created_at) VALUES
(1, '녹차', 'tea', 1, '2024-01-01 00:00:00'),
(2, '황차', 'tea', 2, '2024-01-01 00:00:00'),
(3, '홍차', 'tea', 3, '2024-01-01 00:00:00'),
(4, '발효차', 'tea', 4, '2024-01-01 00:00:00'),
(5, '블렌딩차', 'tea', 5, '2024-01-01 00:00:00'),
(6, '허브차', 'tea', 6, '2024-01-01 00:00:00'),
(7, '말차', 'tea', 7, '2024-01-01 00:00:00'),
(8, '찻잔', 'craft', 8, '2024-01-01 00:00:00'),
(9, '주전자', 'craft', 9, '2024-01-01 00:00:00'),
(10, '찻상', 'craft', 10, '2024-01-01 00:00:00'),
(11, '향로', 'craft', 11, '2024-01-01 00:00:00'),
(12, '다관', 'craft', 12, '2024-01-01 00:00:00'),
(13, '명절 선물세트', 'gift', 13, '2024-01-01 00:00:00'),
(14, '프리미엄 선물세트', 'gift', 14, '2024-01-01 00:00:00'),
(15, '농산물', 'local', 15, '2024-01-01 00:00:00'),
(16, '수산물', 'local', 16, '2024-01-01 00:00:00'),
(17, '축산물', 'local', 17, '2024-01-01 00:00:00'),
(18, '가공식품', 'local', 18, '2024-01-01 00:00:00'),
(19, '약초/건강식품', 'local', 19, '2024-01-01 00:00:00'),
(20, '전통주', 'local', 20, '2024-01-01 00:00:00'),
(21, '백차', 'tea', 21, '2024-01-01 00:00:00'),
(22, '청차', 'tea', 22, '2024-01-01 00:00:00'),
(23, '우롱차', 'tea', 23, '2024-01-01 00:00:00'),
(24, '향차', 'tea', 24, '2024-01-01 00:00:00'),
(25, '과일차', 'tea', 25, '2024-01-01 00:00:00'),
(26, '곡물차', 'tea', 26, '2024-01-01 00:00:00'),
(27, '암차', 'tea', 27, '2024-01-01 00:00:00');

-- 3. producers 테이블 데이터 삽입 (13개 생산자)
INSERT OR IGNORE INTO producers (id, name, region_id, description, contact_email, contact_phone, address, image, website, certification, created_at) VALUES
(1, '제주 다원명가', 1, '제주 화산토에서 자란 유기농 녹차를 생산하는 40년 전통의 차밭', 'jejutea@example.com', '064-123-4567', '제주특별자치도 서귀포시 표선면', '/images/producers/jeju-dawon.jpg', 'https://jejudawon.com', '유기농인증, GAP인증', '2024-01-01 00:00:00'),
(2, '제주 차향', 1, '제주 동쪽 해안의 차밭에서 재배한 프리미엄 발효차 전문', 'chahyang@example.com', '064-234-5678', '제주특별자치도 제주시 구좌읍', '/images/producers/jeju-chahyang.jpg', 'https://chahyang.com', '유기농인증', '2024-01-01 00:00:00'),
(3, '하동 야생차원', 2, '지리산 자락의 야생차를 수확하여 전통 방식으로 제다', 'hadongwild@example.com', '055-880-1234', '경상남도 하동군 악양면', '/images/producers/hadong-wild.jpg', 'https://hadongwild.com', '무농약인증, 전통식품인증', '2024-01-01 00:00:00'),
(4, '보성 녹차마을', 4, '한국 최대 규모의 녹차 단지, 다양한 녹차 제품 생산', 'boseong@example.com', '061-850-5555', '전라남도 보성군 보성읍', '/images/producers/boseong-village.jpg', 'https://boseonggreentea.com', 'GAP인증, 지리적표시제', '2024-01-01 00:00:00'),
(5, '경기 광주 도예공방', 9, '전통 분청사기 기법으로 제작하는 현대 다기', 'gwangjuceramics@example.com', '031-760-1234', '경기도 광주시 곤지암읍', '/images/producers/gwangju-ceramics.jpg', 'https://gwangjuart.com', '명장지정, 전통공예품인증', '2024-01-01 00:00:00'),
(6, '이천 도자예술촌', 11, '왕실 도자기 전통을 잇는 프리미엄 다기 제작', 'icheonpottery@example.com', '031-630-2222', '경기도 이천시 신둔면', '/images/producers/icheon-pottery.jpg', 'https://icheonart.com', '이천도자기명장, 지리적표시제', '2024-01-01 00:00:00'),
(7, '담양 죽세공예', 13, '3대째 이어오는 대나무 다기 및 생활용품 제작', 'damyangbamboo@example.com', '061-380-3333', '전라남도 담양군 담양읍', '/images/producers/damyang-bamboo.jpg', 'https://damyangcraft.com', '전통공예품인증', '2024-01-01 00:00:00'),
(8, '통영 나전칠기', 15, '전통 나전칠기 기법으로 제작하는 고급 다기', 'tongyeongmop@example.com', '055-640-4444', '경상남도 통영시 광도면', '/images/producers/tongyeong-mop.jpg', 'https://tongyeongart.com', '무형문화재, 명장지정', '2024-01-01 00:00:00'),
(9, '강원 평창 농특산', 17, '해발 700m 고랭지에서 재배한 청정 농산물', 'pyeongchangfarm@example.com', '033-330-5555', '강원도 평창군 대관령면', '/images/producers/pyeongchang-farm.jpg', 'https://pyeongchangfarm.com', '무농약인증, GAP인증', '2024-01-01 00:00:00'),
(10, '장흥 정남진차', 5, '남도의 정기가 담긴 유기농 녹차와 발효차', 'jangheungtea@example.com', '061-860-6666', '전라남도 장흥군 관산읍', '/images/producers/jangheung-tea.jpg', 'https://jangheungtea.com', '유기농인증', '2024-01-01 00:00:00'),
(11, '강진 다산차밭', 6, '다산 정약용의 차 문화를 계승하는 전통 차밭', 'gangjindasan@example.com', '061-430-7777', '전라남도 강진군 도암면', '/images/producers/gangjin-dasan.jpg', 'https://gangjintea.com', '전통식품인증', '2024-01-01 00:00:00'),
(12, '순천 생태차밭', 8, '무농약 생태 농법으로 재배한 건강한 녹차', 'suncheoneco@example.com', '061-740-8888', '전라남도 순천시 송광면', '/images/producers/suncheon-eco.jpg', 'https://suncheongreentea.com', '무농약인증', '2024-01-01 00:00:00'),
(13, '안동 한지공예', 16, '전통 한지로 만드는 다기 및 생활용품', 'andonghanji@example.com', '054-820-9999', '경상북도 안동시 임동면', '/images/producers/andong-hanji.jpg', 'https://andonghanji.com', '전통공예품인증', '2024-01-01 00:00:00');

PRAGMA foreign_keys = ON;

SELECT 'STEP 1 완료: 지역 17개, 카테고리 27개, 생산자 13개 추가됨' AS status;
