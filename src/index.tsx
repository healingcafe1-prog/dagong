import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

type Bindings = {
  DB: D1Database
  GOOGLE_CLIENT_ID?: string
  GOOGLE_CLIENT_SECRET?: string
  NAVER_CLIENT_ID?: string
  NAVER_CLIENT_SECRET?: string
  KAKAO_CLIENT_ID?: string
  KAKAO_CLIENT_SECRET?: string
  SESSION_SECRET?: string
  TOSS_PAYMENTS_CLIENT_KEY?: string
  TOSS_PAYMENTS_SECRET_KEY?: string
}

const app = new Hono<{ Bindings: Bindings }>()

// 인증 미들웨어
async function authMiddleware(c: any, next: any) {
  const cookies = c.req.header('Cookie') || ''
  const sessionMatch = cookies.match(/session=([^;]+)/)
  
  if (!sessionMatch) {
    return c.json({ error: '로그인이 필요합니다' }, 401)
  }
  
  const sessionToken = sessionMatch[1]
  
  // 세션 확인
  const { results: sessions } = await c.env.DB.prepare(`
    SELECT us.*, u.id as user_id, u.email, u.name, u.profile_image, u.role, u.provider
    FROM user_sessions us
    JOIN users u ON us.user_id = u.id
    WHERE us.session_token = ? AND us.expires_at > datetime('now')
  `).bind(sessionToken).all()
  
  if (sessions.length === 0) {
    return c.json({ error: '로그인 세션이 만료되었습니다' }, 401)
  }
  
  // 사용자 정보를 context에 저장
  c.set('user', sessions[0])
  await next()
}

// CORS 설정
app.use('/api/*', cors())

// 정적 파일 서빙
app.use('/static/*', serveStatic())

// SQL API 엔드포인트 - 완전한 SQL 반환
app.get('/api/sql-content', (c) => {
  const sqlContent = `DELETE FROM education_curriculum;
DELETE FROM education_categories;
DELETE FROM experiences;
DELETE FROM products;
DELETE FROM events;
DELETE FROM producers;
DELETE FROM categories;
DELETE FROM regions;

INSERT INTO regions (id, name, type, description, featured_image, created_at) VALUES 
(1, '제주도', 'tea', '제주의 청정 자연에서 자란 녹차', '/images/regions/jeju.jpg', '2026-02-18 12:18:03'),
(2, '하동', 'tea', '지리산 자락의 전통 차밭', '/images/regions/hadong.jpg', '2026-02-18 12:18:03'),
(3, '김해', 'tea', '한국 차문화의 발상지', '/images/regions/gimhae.jpg', '2026-02-18 12:18:03'),
(4, '광양', 'tea', '백운산 자락의 청정 차밭', '/images/regions/gwangyang.jpg', '2026-02-18 12:18:03'),
(5, '보성', 'tea', '대한민국 녹차의 수도', '/images/regions/boseong.jpg', '2026-02-18 12:18:03'),
(6, '이천', 'craft', '전통 도자기의 본고장', '/images/regions/icheon.jpg', '2026-02-18 12:18:03'),
(7, '광주', 'craft', '조선백자의 중심지', '/images/regions/gwangju.jpg', '2026-02-18 12:18:03'),
(8, '담양', 'craft', '대나무 공예의 메카', '/images/regions/damyang.jpg', '2026-02-18 12:18:03'),
(9, '안동', 'craft', '한국 정신문화의 수도', '/images/regions/andong.jpg', '2026-02-18 12:18:03'),
(10, '전주', 'craft', '한지와 전통공예', '/images/regions/jeonju.jpg', '2026-02-18 12:18:03'),
(11, '강진', 'craft', '고려청자의 고향', '/images/regions/gangjin.jpg', '2026-02-18 12:18:03'),
(12, '남원', 'craft', '전통 목공예의 중심', '/images/regions/namwon.jpg', '2026-02-18 12:18:03'),
(13, '공주', 'craft', '백제 문화의 보고', '/images/regions/gongju.jpg', '2026-02-18 12:18:03'),
(14, '경주', 'craft', '신라 천년의 공예', '/images/regions/gyeongju.jpg', '2026-02-18 12:18:03'),
(15, '울산', 'craft', '동해안 특산품', '/images/regions/ulsan.jpg', '2026-02-18 12:18:03'),
(16, '부산', 'craft', '해양 도시 특산품', '/images/regions/busan.jpg', '2026-02-18 12:18:03'),
(17, '서울', 'craft', '수도권 특산품', '/images/regions/seoul.jpg', '2026-02-18 12:18:03');

INSERT INTO categories (id, name, type, description, display_order, created_at) VALUES 
(1, '녹차', 'tea', '한국 전통 녹차', 1, '2026-02-18 12:18:13'),
(2, '황차', 'tea', '특별한 황차', 4, '2026-02-18 12:18:13'),
(3, '홍차', 'tea', '완전 발효 홍차', 5, '2026-02-18 12:18:13'),
(4, '발효차', 'tea', '전통 발효차', 6, '2026-02-18 12:18:13'),
(6, '블렌딩차', 'tea', '다양한 블렌딩 차', 7, '2026-02-18 12:18:13'),
(8, '찻잔', 'craft', '다양한 찻잔', 2, '2026-02-18 12:18:13'),
(9, '다관', 'craft', '전통 다관', 1, '2026-02-18 12:18:13'),
(11, '장식품', 'craft', '인테리어 장식품', 9, '2026-02-18 12:18:13'),
(12, '명절 선물세트', 'gift', '명절 특별 선물', 1, '2026-02-18 12:18:13'),
(13, '기념일 선물세트', 'gift', '기념일용 선물', 2, '2026-02-18 12:18:13'),
(14, '기업 선물세트', 'gift', '기업용 선물', 3, '2026-02-18 12:18:13'),
(15, '맞춤 선물세트', 'gift', '맞춤형 선물', 4, '2026-02-18 12:18:13'),
(17, '농산물', 'local', '지역 농산물', 1, '2026-02-18 12:18:13'),
(18, '가공식품', 'local', '지역 가공식품', 5, '2026-02-18 12:18:13'),
(19, '수산물', 'local', '지역 수산물', 2, '2026-02-18 12:18:13'),
(20, '축산물', 'local', '지역 축산물', 3, '2026-02-18 12:18:13'),
(21, '공예품', 'local', '지역 공예품', 4, '2026-02-18 12:18:13'),
(22, '전통주', 'local', '전통주/음료', 6, '2026-02-18 12:18:13'),
(23, '건강식품', 'local', '건강 식품', 7, '2026-02-18 12:18:13'),
(24, '조미료', 'local', '천연 조미료', 8, '2026-02-18 12:18:13'),
(25, '간편식', 'local', '간편 먹거리', 9, '2026-02-18 12:18:13'),
(26, '디저트', 'local', '전통 디저트', 10, '2026-02-18 12:18:13'),
(27, '생활용품', 'local', '친환경 생활용품', 11, '2026-02-18 12:18:13'),
(28, '화장품', 'local', '천연 화장품', 12, '2026-02-18 12:18:13'),
(29, '의류/잡화', 'local', '전통 의류/잡화', 13, '2026-02-18 12:18:13'),
(30, '인테리어', 'local', '인테리어 소품', 14, '2026-02-18 12:18:13'),
(31, '문화상품', 'local', '문화/예술 상품', 15, '2026-02-18 12:18:13');

INSERT INTO producers (id, name, region, description, contact, created_at) VALUES 
(1, '박수공', '제주도', '제주 한라산 유기농 차 농원', '064-123-4567', '2026-02-18 12:18:13'),
(2, '제주 한라산 차농원', '제주도', '3대째 이어온 전통 차 농원', '064-456-7890', '2026-02-18 12:18:13');

INSERT INTO products (id, name, category_id, producer_id, description, consumer_price, direct_price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count, created_at) VALUES 
(1, '제주 한라산 유기농 녹차', 1, 1, '청정 제주에서 자란 프리미엄 유기농 녹차', 35000.00, 28000.00, 3000.00, 100, '/images/products/tea1.jpg', 'tea', 100.00, '제주도', 1, 1, 150, '2026-02-18 12:18:13'),
(2, '하동 전통 발효차', 4, 2, '지리산 자락의 전통 방식 발효차', 45000.00, 36000.00, 3000.00, 50, '/images/products/tea2.jpg', 'tea', 100.00, '경남 하동', 1, 1, 120, '2026-02-18 12:18:13'),
(3, '보성 청태전', 4, 1, '보성의 전통 떡차', 38000.00, 30400.00, 3000.00, 80, '/images/products/tea3.jpg', 'tea', 150.00, '전남 보성', 1, 1, 200, '2026-02-18 12:18:13'),
(4, '김해 황차', 2, 2, '김해의 특별한 황차', 42000.00, 33600.00, 3000.00, 60, '/images/products/tea4.jpg', 'tea', 100.00, '경남 김해', 0, 1, 80, '2026-02-18 12:18:13'),
(5, '광양 매화차', 6, 1, '광양 백운산 매화로 만든 블렌딩차', 32000.00, 25600.00, 3000.00, 90, '/images/products/tea5.jpg', 'tea', 80.00, '전남 광양', 1, 1, 180, '2026-02-18 12:18:13'),
(6, '이천 도자기 찻잔 세트', 8, 1, '이천 전통 도자기 장인의 수제 찻잔', 85000.00, 68000.00, 3000.00, 30, '/images/products/craft1.jpg', 'craft', 800.00, '경기 이천', 1, 1, 95, '2026-02-18 12:18:13'),
(7, '광주 분청사기 다관', 9, 2, '조선시대 기법으로 만든 분청 다관', 150000.00, 120000.00, 3000.00, 15, '/images/products/craft2.jpg', 'craft', 1200.00, '경기 광주', 1, 1, 70, '2026-02-18 12:18:13'),
(8, '담양 대나무 찻상', 11, 1, '담양 대나무로 만든 전통 찻상', 95000.00, 76000.00, 5000.00, 25, '/images/products/craft3.jpg', 'craft', 2500.00, '전남 담양', 0, 1, 60, '2026-02-18 12:18:13'),
(9, '안동 한지 찻잔 받침', 11, 2, '안동 전통 한지 공예품', 28000.00, 22400.00, 2500.00, 50, '/images/products/craft4.jpg', 'craft', 100.00, '경북 안동', 0, 1, 45, '2026-02-18 12:18:13'),
(10, '전주 나전칠기 다기', 9, 1, '전주 전통 나전칠기 기법의 다기', 280000.00, 224000.00, 3000.00, 10, '/images/products/craft5.jpg', 'craft', 1500.00, '전북 전주', 1, 1, 85, '2026-02-18 12:18:13'),
(11, '강진 청자 찻잔', 8, 2, '고려청자의 전통을 이은 현대 청자', 120000.00, 96000.00, 3000.00, 20, '/images/products/craft6.jpg', 'craft', 600.00, '전남 강진', 1, 1, 110, '2026-02-18 12:18:13'),
(12, '남원 목기 찻잔받침', 11, 1, '남원 전통 목공예 찻잔받침', 35000.00, 28000.00, 2500.00, 40, '/images/products/craft7.jpg', 'craft', 300.00, '전북 남원', 0, 1, 55, '2026-02-18 12:18:13'),
(13, '제주 한라봉차', 6, 1, '제주 한라봉으로 만든 블렌딩차', 28000.00, 22400.00, 3000.00, 100, '/images/products/tea6.jpg', 'tea', 80.00, '제주도', 1, 1, 140, '2026-02-18 12:18:13'),
(14, '하동 야생차', 1, 2, '지리산 야생차나무에서 채취한 차', 65000.00, 52000.00, 3000.00, 30, '/images/products/tea7.jpg', 'tea', 100.00, '경남 하동', 1, 1, 90, '2026-02-18 12:18:13'),
(15, '명절 프리미엄 세트', 12, 1, '차와 다기가 함께하는 명절 선물', 150000.00, 120000.00, 0.00, 50, '/images/products/gift1.jpg', 'gift', 2000.00, '전국', 1, 1, 200, '2026-02-18 12:18:13'),
(16, '기념일 차 선물세트', 13, 2, '특별한 날을 위한 프리미엄 차 세트', 95000.00, 76000.00, 0.00, 60, '/images/products/gift2.jpg', 'gift', 1200.00, '전국', 1, 1, 175, '2026-02-18 12:18:13'),
(17, '기업 선물용 다기세트', 14, 1, '품격있는 기업 선물용 세트', 180000.00, 144000.00, 0.00, 40, '/images/products/gift3.jpg', 'gift', 2500.00, '전국', 1, 1, 130, '2026-02-18 12:18:13'),
(18, '맞춤 선물 구성', 15, 2, '원하는 대로 구성하는 선물세트', 120000.00, 96000.00, 0.00, 70, '/images/products/gift4.jpg', 'gift', 1500.00, '전국', 0, 1, 95, '2026-02-18 12:18:13'),
(19, '울산 미역', 19, 1, '동해안 청정 해역 미역', 25000.00, 20000.00, 3000.00, 80, '/images/products/local1.jpg', 'local', 300.00, '울산', 0, 1, 85, '2026-02-18 12:18:13'),
(20, '부산 멸치', 19, 2, '부산 앞바다 특산 멸치', 32000.00, 25600.00, 3000.00, 90, '/images/products/local2.jpg', 'local', 500.00, '부산', 1, 1, 110, '2026-02-18 12:18:13'),
(21, '제주 흑돼지 육포', 20, 1, '제주 흑돼지로 만든 프리미엄 육포', 28000.00, 22400.00, 3000.00, 70, '/images/products/local3.jpg', 'local', 200.00, '제주도', 1, 1, 95, '2026-02-18 12:18:13'),
(22, '보성 녹차 쌀', 17, 2, '녹차를 먹여 키운 특별한 쌀', 35000.00, 28000.00, 3000.00, 100, '/images/products/local4.jpg', 'local', 5000.00, '전남 보성', 0, 1, 75, '2026-02-18 12:18:13'),
(23, '하동 야생화 꿀', 23, 1, '지리산 야생화 꿀', 42000.00, 33600.00, 3000.00, 50, '/images/products/local5.jpg', 'local', 600.00, '경남 하동', 1, 1, 120, '2026-02-18 12:18:13'),
(24, '안동 간고등어', 19, 2, '안동 전통 간고등어', 38000.00, 30400.00, 3000.00, 60, '/images/products/local6.jpg', 'local', 800.00, '경북 안동', 0, 1, 65, '2026-02-18 12:18:13'),
(25, '전주 한과', 26, 1, '전통 방식으로 만든 전주 한과', 32000.00, 25600.00, 2500.00, 80, '/images/products/local7.jpg', 'local', 400.00, '전북 전주', 1, 1, 140, '2026-02-18 12:18:13'),
(26, '강릉 커피', 18, 2, '강릉 로스터리 원두', 22000.00, 17600.00, 3000.00, 90, '/images/products/local8.jpg', 'local', 200.00, '강원 강릉', 0, 1, 105, '2026-02-18 12:18:13'),
(27, '경주 빵', 26, 1, '경주 특산 빵', 18000.00, 14400.00, 3000.00, 100, '/images/products/local9.jpg', 'local', 500.00, '경북 경주', 0, 1, 88, '2026-02-18 12:18:13'),
(28, '남원 추어탕', 18, 2, '남원 전통 추어탕', 15000.00, 12000.00, 3500.00, 70, '/images/products/local10.jpg', 'local', 1000.00, '전북 남원', 0, 1, 72, '2026-02-18 12:18:13'),
(29, '제주 감귤', 17, 1, '제주 청정 감귤', 28000.00, 22400.00, 3500.00, 150, '/images/products/local11.jpg', 'local', 3000.00, '제주도', 1, 1, 180, '2026-02-18 12:18:13'),
(30, '서울 전통주', 22, 2, '서울 전통 막걸리', 18000.00, 14400.00, 3000.00, 80, '/images/products/local12.jpg', 'local', 750.00, '서울', 0, 1, 92, '2026-02-18 12:18:13'),
(31, '이천 쌀', 17, 1, '임금님표 이천쌀', 45000.00, 36000.00, 3500.00, 100, '/images/products/local13.jpg', 'local', 10000.00, '경기 이천', 1, 1, 160, '2026-02-18 12:18:13'),
(32, '담양 죽순', 17, 2, '담양 대나무 죽순', 32000.00, 25600.00, 3000.00, 60, '/images/products/local14.jpg', 'local', 1000.00, '전남 담양', 0, 1, 78, '2026-02-18 12:18:13'),
(33, '공주 밤', 17, 1, '공주 알밤', 28000.00, 22400.00, 3000.00, 90, '/images/products/local15.jpg', 'local', 2000.00, '충남 공주', 0, 1, 85, '2026-02-18 12:18:13'),
(34, '보령 굴비', 19, 2, '보령 명품 굴비', 55000.00, 44000.00, 3500.00, 50, '/images/products/local16.jpg', 'local', 1200.00, '충남 보령', 1, 1, 125, '2026-02-18 12:18:13'),
(35, '영광 모시', 29, 1, '영광 모시 의류', 85000.00, 68000.00, 3000.00, 40, '/images/products/local17.jpg', 'local', 500.00, '전남 영광', 0, 1, 68, '2026-02-18 12:18:13'),
(36, '나주 배', 17, 2, '나주 신고배', 38000.00, 30400.00, 3500.00, 80, '/images/products/local18.jpg', 'local', 5000.00, '전남 나주', 1, 1, 145, '2026-02-18 12:18:13'),
(37, '영양 고추', 24, 1, '영양 청정 고추', 42000.00, 33600.00, 3000.00, 70, '/images/products/local19.jpg', 'local', 500.00, '경북 영양', 0, 1, 95, '2026-02-18 12:18:13'),
(38, '의성 마늘', 24, 2, '의성 육쪽마늘', 35000.00, 28000.00, 3000.00, 90, '/images/products/local20.jpg', 'local', 1000.00, '경북 의성', 1, 1, 132, '2026-02-18 12:18:13'),
(39, '청송 사과', 17, 1, '청송 주왕산 사과', 45000.00, 36000.00, 3500.00, 100, '/images/products/local21.jpg', 'local', 5000.00, '경북 청송', 1, 1, 170, '2026-02-18 12:18:13'),
(40, '영덕 대게', 19, 2, '영덕 특산 대게', 95000.00, 76000.00, 5000.00, 30, '/images/products/local22.jpg', 'local', 1500.00, '경북 영덕', 1, 1, 155, '2026-02-18 12:18:13'),
(41, '울릉도 오징어', 19, 1, '울릉도 건오징어', 48000.00, 38400.00, 3500.00, 50, '/images/products/local23.jpg', 'local', 500.00, '경북 울릉', 0, 1, 88, '2026-02-18 12:18:13'),
(42, '삼척 건어물', 19, 2, '삼척 특산 건어물', 32000.00, 25600.00, 3000.00, 60, '/images/products/local24.jpg', 'local', 800.00, '강원 삼척', 0, 1, 75, '2026-02-18 12:18:13'),
(43, '속초 오징어순대', 18, 1, '속초 명물 오징어순대', 25000.00, 20000.00, 3500.00, 70, '/images/products/local25.jpg', 'local', 600.00, '강원 속초', 0, 1, 98, '2026-02-18 12:18:13'),
(44, '횡성 한우', 20, 2, '횡성 1++등급 한우', 120000.00, 96000.00, 5000.00, 40, '/images/products/local26.jpg', 'local', 2000.00, '강원 횡성', 1, 1, 185, '2026-02-18 12:18:13'),
(45, '평창 송이버섯', 17, 1, '평창 자연산 송이', 150000.00, 120000.00, 5000.00, 20, '/images/products/local27.jpg', 'local', 500.00, '강원 평창', 1, 1, 210, '2026-02-18 12:18:13'),
(46, '정선 곤드레', 17, 2, '정선 산나물 곤드레', 28000.00, 22400.00, 3000.00, 80, '/images/products/local28.jpg', 'local', 300.00, '강원 정선', 0, 1, 82, '2026-02-18 12:18:13'),
(47, '양구 시래기', 17, 1, '양구 청정 시래기', 22000.00, 17600.00, 3000.00, 90, '/images/products/local29.jpg', 'local', 500.00, '강원 양구', 0, 1, 76, '2026-02-18 12:18:13'),
(48, '인제 산나물', 17, 2, '인제 자연산 산나물', 35000.00, 28000.00, 3000.00, 70, '/images/products/local30.jpg', 'local', 400.00, '강원 인제', 0, 1, 88, '2026-02-18 12:18:13'),
(49, '화천 토마토', 17, 1, '화천 방울토마토', 28000.00, 22400.00, 3500.00, 100, '/images/products/local31.jpg', 'local', 2000.00, '강원 화천', 0, 1, 95, '2026-02-18 12:18:13'),
(50, '철원 오대쌀', 17, 2, '철원 DMZ 오대쌀', 42000.00, 33600.00, 3500.00, 80, '/images/products/local32.jpg', 'local', 10000.00, '강원 철원', 1, 1, 165, '2026-02-18 12:18:13');

INSERT INTO events (id, title, category, description, location, start_date, end_date, max_participants, current_participants, price, image_url, is_featured, status, created_at) VALUES 
(1, '제주 차밭 투어', 'tea', '제주 한라산 차밭 견학과 차 만들기 체험', '제주도', '2026-03-15', '2026-03-15', 30, 12, 45000, '/images/events/event1.jpg', 1, 'open', '2026-02-18 12:18:13'),
(2, '하동 야생차 체험', 'tea', '지리산 야생차 채취 체험', '경남 하동', '2026-03-20', '2026-03-20', 20, 8, 55000, '/images/events/event2.jpg', 1, 'open', '2026-02-18 12:18:13'),
(3, '보성 녹차밭 축제', 'tea', '보성 녹차밭 축제 및 차 시음회', '전남 보성', '2026-04-05', '2026-04-07', 100, 45, 35000, '/images/events/event3.jpg', 1, 'open', '2026-02-18 12:18:13'),
(4, '이천 도자기 만들기', 'craft', '이천 도자기 공방 체험', '경기 이천', '2026-03-22', '2026-03-22', 15, 10, 75000, '/images/events/event4.jpg', 1, 'open', '2026-02-18 12:18:13'),
(5, '광주 분청사기 체험', 'craft', '전통 분청사기 제작 체험', '경기 광주', '2026-03-25', '2026-03-25', 12, 6, 85000, '/images/events/event5.jpg', 0, 'open', '2026-02-18 12:18:13'),
(6, '담양 대나무 공예', 'craft', '담양 대나무 공예 만들기', '전남 담양', '2026-04-01', '2026-04-01', 20, 15, 45000, '/images/events/event6.jpg', 1, 'open', '2026-02-18 12:18:13'),
(7, '안동 한지 공예', 'craft', '안동 전통 한지 공예 체험', '경북 안동', '2026-04-08', '2026-04-08', 18, 9, 38000, '/images/events/event7.jpg', 0, 'open', '2026-02-18 12:18:13'),
(8, '전주 나전칠기 체험', 'craft', '전주 전통 나전칠기 만들기', '전북 전주', '2026-04-12', '2026-04-12', 10, 7, 95000, '/images/events/event8.jpg', 1, 'open', '2026-02-18 12:18:13'),
(9, '강진 청자 체험', 'craft', '고려청자 도자기 만들기', '전남 강진', '2026-04-15', '2026-04-15', 15, 5, 68000, '/images/events/event9.jpg', 0, 'open', '2026-02-18 12:18:13'),
(10, '남원 목공예 체험', 'craft', '전통 목공예 만들기', '전북 남원', '2026-04-18', '2026-04-18', 12, 8, 52000, '/images/events/event10.jpg', 0, 'open', '2026-02-18 12:18:13'),
(11, '봄 차 명상 힐링', 'meditation', '봄 차 명상과 힐링 프로그램', '제주도', '2026-03-28', '2026-03-29', 25, 18, 120000, '/images/events/event11.jpg', 1, 'open', '2026-02-18 12:18:13'),
(12, '다도 입문 교실', 'education', '전통 다도 기초 교육', '서울', '2026-04-02', '2026-04-02', 15, 12, 50000, '/images/events/event12.jpg', 1, 'open', '2026-02-18 12:18:13'),
(13, '차와 음식 페어링', 'tea', '차와 음식의 조화 체험', '서울', '2026-04-10', '2026-04-10', 20, 14, 65000, '/images/events/event13.jpg', 0, 'open', '2026-02-18 12:18:13'),
(14, '여름 차밭 캠핑', 'tea', '보성 차밭에서의 1박 2일 캠핑', '전남 보성', '2026-06-15', '2026-06-16', 30, 8, 95000, '/images/events/event14.jpg', 1, 'open', '2026-02-18 12:18:13'),
(15, '제주 차 만들기 워크샵', 'tea', '차 제조 과정 전체 체험', '제주도', '2026-05-08', '2026-05-09', 15, 6, 150000, '/images/events/event15.jpg', 1, 'open', '2026-02-18 12:18:13'),
(16, '전통 공예 박람회', 'craft', '전국 전통 공예 작가 작품전', '서울', '2026-05-20', '2026-05-25', 500, 120, 15000, '/images/events/event16.jpg', 1, 'open', '2026-02-18 12:18:13'),
(17, '차 소믈리에 입문', 'education', '차 소믈리에 기초 과정', '서울', '2026-05-15', '2026-05-16', 20, 16, 180000, '/images/events/event17.jpg', 1, 'open', '2026-02-18 12:18:13'),
(18, '가을 차 축제', 'tea', '전국 차 생산지 연합 축제', '전남 보성', '2026-09-15', '2026-09-17', 200, 85, 25000, '/images/events/event18.jpg', 1, 'open', '2026-02-18 12:18:13'),
(19, '명상과 차 명상', 'meditation', '마음챙김 명상과 차 명상', '경기 양평', '2026-07-20', '2026-07-21', 18, 12, 110000, '/images/events/event19.jpg', 0, 'open', '2026-02-18 12:18:13'),
(20, '도자기 고급 과정', 'craft', '도자기 제작 심화 과정', '경기 이천', '2026-06-10', '2026-06-11', 10, 8, 220000, '/images/events/event20.jpg', 0, 'open', '2026-02-18 12:18:13'),
(21, '겨울 차 명상 힐링', 'meditation', '겨울 차 명상 1박 2일', '강원 평창', '2026-12-15', '2026-12-16', 20, 5, 135000, '/images/events/event21.jpg', 1, 'open', '2026-02-18 12:18:13'),
(22, '설 명절 선물 특별전', 'gift', '설 명절 차 선물 특별전', '서울', '2027-01-20', '2027-01-28', 300, 95, 0, '/images/events/event22.jpg', 1, 'open', '2026-02-18 12:18:13'),
(23, '추석 선물 특별전', 'gift', '추석 명절 차 선물 특별전', '서울', '2026-08-25', '2026-09-05', 300, 145, 0, '/images/events/event23.jpg', 1, 'open', '2026-02-18 12:18:13'),
(24, '어린이 다도 교실', 'education', '어린이를 위한 다도 체험', '서울', '2026-07-28', '2026-07-30', 25, 20, 45000, '/images/events/event24.jpg', 0, 'open', '2026-02-18 12:18:13'),
(25, '기업 임직원 힐링 프로그램', 'meditation', '기업 임직원 차 명상 힐링', '경기 가평', '2026-08-14', '2026-08-15', 40, 30, 95000, '/images/events/event25.jpg', 0, 'open', '2026-02-18 12:18:13'),
(26, '전통 차 제조 비법', 'tea', '전통 차 제조 장인의 비법 전수', '경남 하동', '2026-10-10', '2026-10-12', 12, 10, 280000, '/images/events/event26.jpg', 1, 'open', '2026-02-18 12:18:13'),
(27, '연말 감사 고객 행사', 'gift', '연말 고객 감사 특별 행사', '서울', '2026-12-20', '2026-12-22', 100, 68, 0, '/images/events/event27.jpg', 0, 'open', '2026-02-18 12:18:13');

INSERT INTO experiences (id, title, category, description, location, duration, price, max_participants, difficulty, image_url, is_featured, status, included_items, created_at) VALUES 
(1, '제주 차밭 트레킹', 'tea', '제주 한라산 차밭 트레킹과 차 시음', '제주도', '3시간', 45000, 20, 'easy', '/images/exp/exp1.jpg', 1, 'available', '가이드, 차 시음, 다과', '2026-02-18 12:18:13'),
(2, '하동 차 만들기 체험', 'tea', '전통 방식으로 차 만들기', '경남 하동', '4시간', 65000, 15, 'medium', '/images/exp/exp2.jpg', 1, 'available', '재료비, 가이드, 완성품 포장', '2026-02-18 12:18:13'),
(3, '이천 도자기 원데이 클래스', 'craft', '물레를 이용한 도자기 만들기', '경기 이천', '5시간', 95000, 10, 'medium', '/images/exp/exp3.jpg', 1, 'available', '재료비, 가이드, 완성품 배송', '2026-02-18 12:18:13'),
(4, '담양 죽제품 만들기', 'craft', '대나무를 이용한 생활용품 제작', '전남 담양', '3시간', 48000, 12, 'easy', '/images/exp/exp4.jpg', 0, 'available', '재료비, 가이드, 완성품', '2026-02-18 12:18:13'),
(5, '전주 한지 공예 체험', 'craft', '전통 한지를 이용한 공예품 만들기', '전북 전주', '3시간', 42000, 15, 'easy', '/images/exp/exp5.jpg', 0, 'available', '재료비, 가이드, 완성품', '2026-02-18 12:18:13'),
(6, '차 명상 힐링 프로그램', 'meditation', '차를 마시며 하는 명상 프로그램', '제주도', '2시간', 55000, 12, 'easy', '/images/exp/exp6.jpg', 1, 'available', '가이드, 차, 다과', '2026-02-18 12:18:13'),
(7, '다도 예절 교육', 'education', '전통 다도 예절 배우기', '서울', '2시간', 40000, 15, 'easy', '/images/exp/exp7.jpg', 1, 'available', '가이드, 교재, 차', '2026-02-18 12:18:13'),
(8, '차와 음식 페어링 클래스', 'tea', '차와 어울리는 음식 조합 배우기', '서울', '3시간', 75000, 12, 'medium', '/images/exp/exp8.jpg', 0, 'available', '가이드, 차, 음식 재료', '2026-02-18 12:18:13'),
(9, '청자 도자기 체험', 'craft', '고려청자 만들기', '전남 강진', '4시간', 72000, 10, 'medium', '/images/exp/exp9.jpg', 1, 'available', '재료비, 가이드, 완성품 배송', '2026-02-18 12:18:13'),
(10, '나전칠기 체험', 'craft', '전통 나전칠기 소품 만들기', '전북 전주', '6시간', 120000, 8, 'hard', '/images/exp/exp10.jpg', 0, 'available', '재료비, 가이드, 완성품', '2026-02-18 12:18:13'),
(11, '차밭 요가 명상', 'meditation', '차밭에서 하는 요가와 명상', '전남 보성', '2시간', 48000, 15, 'easy', '/images/exp/exp11.jpg', 1, 'available', '가이드, 요가매트, 차', '2026-02-18 12:18:13'),
(12, '차 소믈리에 체험', 'education', '다양한 차 감별 및 시음', '서울', '3시간', 85000, 10, 'medium', '/images/exp/exp12.jpg', 0, 'available', '가이드, 교재, 차 샘플', '2026-02-18 12:18:13');

INSERT INTO education_categories (id, parent_id, name, description, display_order, icon, created_at) VALUES 
(1, NULL, '다도교육', '차문화와 명상을 통한 마음의 평안', 1, 'fa-spa', '2026-02-18 12:18:04'),
(2, 1, '차공부', '차의 역사와 문화, 종류와 우리는 방법을 배웁니다', 1, 'fa-mug-hot', '2026-02-18 12:18:04'),
(3, 1, '공예공부', '한국 전통 공예의 역사와 제작 기법을 배웁니다', 2, 'fa-palette', '2026-02-18 12:18:04'),
(4, 1, '다도교육', '다도의 의미와 역사, 명상과 인성교육을 배웁니다', 3, 'fa-spa', '2026-02-18 12:18:06'),
(5, 1, '명상교육', '명상의 역사와 종류, 실천 방법을 배우고 마음의 평안을 찾습니다', 4, 'fa-om', '2026-02-18 13:59:11');

INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, thumbnail_image, created_at) VALUES 
(1, 2, '차의 역사', '차의 기원부터 현대까지의 역사를 배웁니다', '차의 발견과 전파, 한국 차문화의 발전 과정을 학습합니다', '90분', 'beginner', 1, '/images/curriculum/tea_history.jpg', '2026-02-18 12:18:04'),
(2, 2, '한국차의 역사', '한국 전통차의 역사와 문화적 배경', '삼국시대부터 조선시대까지 한국 차문화의 발전사', '120분', 'intermediate', 2, '/images/curriculum/korean_tea_history.jpg', '2026-02-18 12:18:04'),
(3, 2, '6대 차류', '차의 6가지 분류와 각각의 특징', '녹차, 백차, 황차, 청차, 홍차, 흑차의 분류와 특성', '150분', 'intermediate', 3, '/images/curriculum/six_types.jpg', '2026-02-18 12:18:04'),
(4, 2, '한국차의 종류', '한국 전통차의 다양한 종류', '녹차, 발효차, 가향차 등 한국 차의 분류와 특징', '120분', 'intermediate', 4, '/images/curriculum/korean_tea_types.jpg', '2026-02-18 12:18:04'),
(5, 2, '차의 이로운 점', '차의 건강상 이점과 효능', '차의 성분과 건강 효능, 올바른 섭취 방법', '90분', 'beginner', 5, '/images/curriculum/tea_benefits.jpg', '2026-02-18 12:18:04'),
(6, 2, '6대 차류 우리는 방법', '차 종류별 올바른 우리는 방법', '각 차류별 최적의 온도, 시간, 물의 양', '180분', 'advanced', 6, '/images/curriculum/brewing_methods.jpg', '2026-02-18 12:18:04'),
(7, 3, '공예의 역사', '한국 전통 공예의 역사', '삼국시대 금속공예와 백제 도자기부터 고려청자, 조선백자까지 한국 공예의 발전사를 배웁니다. 각 시대별 대표 공예품과 특징, 제작 기법의 변화를 이해하고 현대 공예와의 연결점을 학습합니다.', '90분', 'beginner', 1, '/images/curriculum/craft_history.jpg', '2026-02-18 12:18:04'),
(8, 3, '한국공예의 시대별 변천사', '시대별 한국 공예의 특징과 변화', '삼국시대의 금속공예와 불교미술, 고려시대의 상감청자와 나전칠기, 조선시대의 백자와 민예품, 근현대의 전통공예 계승까지 시대별 공예 기법과 양식의 변천을 상세히 학습합니다.', '150분', 'intermediate', 2, '/images/curriculum/craft_evolution.jpg', '2026-02-18 12:18:04'),
(9, 3, '도자기의 제작 기법', '전통 도자기 제작 기법', '흙의 선택과 준비, 물레 성형 기법, 초벌구이와 재벌구이, 유약 배합과 시유 기법, 가마의 종류와 소성 온도 조절 등 도자기 제작의 전 과정을 실습과 함께 배웁니다.', '180분', 'advanced', 3, '/images/curriculum/pottery_technique.jpg', '2026-02-18 12:18:04'),
(10, 3, '도자기의 활용법', '도자기의 다양한 활용', '다기(찻잔, 다관, 찻상), 생활용기(밥그릇, 국그릇, 접시), 장식품(화병, 향로, 인형) 등 도자기의 다양한 쓰임새와 각 용도에 맞는 형태와 기능을 학습합니다.', '90분', 'beginner', 4, '/images/curriculum/pottery_usage.jpg', '2026-02-18 12:18:04'),
(11, 3, '도자기의 이로운 점', '도자기 사용의 장점', '원적외선 방출로 음식의 맛을 향상시키고, 유해물질 없는 안전한 식기로서의 가치, 자연 친화적 소재의 환경적 이점, 오래 사용할 수 있는 내구성 등을 학습합니다.', '90분', 'beginner', 5, '/images/curriculum/pottery_benefits.jpg', '2026-02-18 12:18:04'),
(12, 3, '서예의 역사와 발전', '한국 서예의 역사', '한글 서예와 한문 서예의 발전 과정을 학습합니다. 추사 김정희 등 역대 명필의 작품을 감상하고, 서체의 종류(해서, 행서, 초서)와 특징을 이해합니다.', '120분', 'intermediate', 6, '/images/curriculum/calligraphy_history.jpg', '2026-02-18 12:18:04'),
(13, 3, '한국 전통미술과 민화', '민화의 역사와 특징', '민화의 종류(화조도, 책가도, 호작도, 십장생도)와 의미를 배우고, 조선시대 서민들의 염원이 담긴 그림의 상징성을 이해하며, 현대적 해석과 활용 방법을 학습합니다.', '90분', 'intermediate', 7, '/images/curriculum/minhwa.jpg', '2026-02-18 12:18:04'),
(14, 3, '한복의 역사와 아름다움', '한복의 역사와 미학', '한복의 기원과 시대별 변천, 한복의 구조(저고리, 치마, 바지, 두루마기), 오방색과 색상의 상징적 의미, 문양(매화, 연꽃, 용, 봉황)의 뜻과 격식을 배웁니다. 한복의 곡선미와 자연스러운 실루엣이 주는 아름다움을 이해합니다.', '90분', 'beginner', 8, '/images/curriculum/hanbok.jpg', '2026-02-18 12:18:04'),
(15, 3, '한지의 역사와 제조법', '전통 한지의 역사와 제작', '한지의 역사와 우수성, 닥나무 재배부터 껍질 벗기기, 백피 만들기, 고해, 초지, 건조까지 전통 한지 제조 과정을 배웁니다. 한지의 통기성, 보존성, 친환경성 등의 특성과 현대적 활용(벽지, 공예품, 한지등)을 학습합니다.', '120분', 'intermediate', 9, '/images/curriculum/hanji.jpg', '2026-02-18 12:18:04'),
(31, 3, '한지공예 기초', '한지를 활용한 전통 공예', '한지의 종류(순지, 장판지, 창호지)와 특성을 이해하고, 한지 인형, 한지 등, 한지 부채, 지승공예(노리개, 바구니) 등 기초적인 한지공예 기법을 실습합니다. 한지 접기, 꼬기, 감기 등의 기본 기술을 익힙니다.', '150분', 'intermediate', 10, '/images/curriculum/hanji_craft.jpg', '2026-02-18 12:18:04'),
(32, 3, '한지공예 응용', '한지공예 심화 과정', '한지 조형물, 한지 액자, 한지 보자기, 한지 장신구 등 고급 한지공예 작품을 제작합니다. 한지와 다른 재료(나무, 금속, 천)의 조합 기법, 색한지 제작과 염색 기법, 한지의 방수 처리 방법 등을 학습합니다.', '180분', 'advanced', 11, '/images/curriculum/hanji_advanced.jpg', '2026-02-18 12:18:04'),
(33, 3, '한복공예 기초', '한복 만들기의 기초', '한복의 재단과 바느질 기법을 배웁니다. 천 선택(명주, 모시, 삼베, 무명), 치수 재기, 재단하기, 손바느질과 시침질, 감침질, 박음질 등 기본 바느질법을 익히고 간단한 소품(주머니, 노리개, 조바위)을 제작합니다.', '150분', 'intermediate', 12, '/images/curriculum/hanbok_craft.jpg', '2026-02-18 12:18:04'),
(34, 3, '한복공예 응용', '한복 제작 심화 과정', '저고리와 치마/바지의 제작 과정을 실습합니다. 배래와 동정 달기, 깃 달기, 고름 만들기, 단추와 장식 달기 등 한복 제작의 세부 기법을 배우고, 아동 한복이나 생활한복을 완성합니다. 자수와 매듭장식으로 고급스럽게 마무리하는 법을 학습합니다.', '180분', 'advanced', 13, '/images/curriculum/hanbok_advanced.jpg', '2026-02-18 12:18:04'),
(16, 4, '다도의 의미', '다도의 정신과 철학', '차를 통한 수양과 예절의 의미', '120분', 'beginner', 1, '/images/curriculum/dado_meaning.jpg', '2026-02-18 12:18:06'),
(17, 4, '다도의 역사와 시대적 변천사', '한국 다도의 역사적 발전', '시대별 다도 문화의 변화와 특징', '150분', 'intermediate', 2, '/images/curriculum/dado_history.jpg', '2026-02-18 12:18:06'),
(18, 4, '다도의 종류', '다양한 다도의 유형', '한국, 중국, 일본 다도의 특징 비교', '120분', 'intermediate', 3, '/images/curriculum/dado_types.jpg', '2026-02-18 12:18:06'),
(19, 4, '다도와 명상의 효과', '다도를 통한 명상 효과', '마음의 평안과 집중력 향상', '90분', 'beginner', 4, '/images/curriculum/dado_meditation.jpg', '2026-02-18 12:18:06'),
(20, 4, '인성교육으로 다도 명상을 해야하는 이유', '다도를 통한 인성 함양', '예절, 배려, 집중력 등 인성 교육', '150분', 'intermediate', 5, '/images/curriculum/dado_character.jpg', '2026-02-18 12:18:06'),
(21, 4, '다도의 역사와 정신', '다도의 철학적 배경', '선禪과 차의 정신적 연결', '120분', 'intermediate', 7, '/images/curriculum/dado_spirit.jpg', '2026-02-18 12:18:06'),
(22, 4, '다도교육의 이론과 실제', '다도 교육 방법론', '이론 학습과 실습을 통한 다도 교육', '150분', 'advanced', 8, '/images/curriculum/dado_practice.jpg', '2026-02-18 12:18:06'),
(23, 5, '호흡 명상', '호흡을 통한 명상', '올바른 호흡법과 명상 실습', '45분', 'beginner', 0, '/images/curriculum/breathing.jpg', '2026-02-18 13:59:11'),
(24, 5, '마음챙김 명상', '마음챙김 명상의 이론과 실습', '현재 순간에 집중하는 명상', '60분', 'intermediate', 0, '/images/curriculum/mindfulness.jpg', '2026-02-18 13:59:11'),
(25, 5, '차 명상', '차를 마시며 하는 명상', '차를 통한 오감 명상', '90분', 'intermediate', 0, '/images/curriculum/tea_meditation.jpg', '2026-02-18 13:59:11'),
(26, 5, '요가와 명상', '요가 동작과 명상의 결합', '몸과 마음을 함께 다스리는 명상', '75분', 'intermediate', 0, '/images/curriculum/yoga_meditation.jpg', '2026-02-18 13:59:11'),
(27, 5, '명상의 역사', '명상의 기원과 발전', '동서양 명상의 역사와 철학', '90분', 'beginner', 1, '/images/curriculum/meditation_history.jpg', '2026-02-18 13:59:11'),
(28, 5, '명상의 종류와 실천', '다양한 명상법', '호흡명상, 선명상, 위빠사나 등', '150분', 'intermediate', 2, '/images/curriculum/meditation_types.jpg', '2026-02-18 13:59:11'),
(29, 5, '명상의 정의와 원리', '명상의 본질과 작용 원리', '명상이 뇌와 신체에 미치는 영향', '60분', 'beginner', 2, '/images/curriculum/meditation_principle.jpg', '2026-02-18 13:59:11'),
(30, 5, '일상 속 명상 실천', '바쁜 일상 속 명상 적용', '짧은 시간으로 하는 실용적 명상법', '45분', 'beginner', 3, '/images/curriculum/daily_meditation.jpg', '2026-02-18 13:59:11');`;

  return c.text(sqlContent, 200, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
})

// SQL 복사 페이지 - 간단 버전
app.get('/copy', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SQL 복사 페이지</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-2xl p-8">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">📋 SQL 복사 페이지</h1>
            <p class="text-gray-600 text-lg mb-8">버튼을 클릭하면 전체 SQL (194줄)이 복사됩니다</p>

            <button id="copyBtn" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-xl shadow-lg text-xl mb-4">
                📋 SQL 전체 복사하기 (194줄)
            </button>
            
            <div id="msg" class="hidden bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6">
                <strong>복사 완료!</strong> 이제 Cloudflare D1 콘솔에 붙여넣기 하세요
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
                <h3 class="text-xl font-bold text-blue-900 mb-3">📌 사용 방법</h3>
                <ol class="list-decimal list-inside space-y-2 text-blue-800">
                    <li>"SQL 전체 복사하기" 버튼 클릭</li>
                    <li>Cloudflare Dashboard → Workers & Pages → D1 이동</li>
                    <li>webapp-production 데이터베이스 선택</li>
                    <li>Console 탭 클릭</li>
                    <li>콘솔 입력창에 붙여넣기 (Ctrl+V / Cmd+V)</li>
                    <li>Execute 버튼 클릭</li>
                    <li>1~2분 대기</li>
                </ol>
            </div>

            <div class="grid grid-cols-4 gap-4">
                <div class="bg-green-100 p-4 rounded-xl text-center">
                    <div class="text-3xl font-bold text-green-700">17</div>
                    <div class="text-sm text-green-600">지역</div>
                </div>
                <div class="bg-blue-100 p-4 rounded-xl text-center">
                    <div class="text-3xl font-bold text-blue-700">31</div>
                    <div class="text-sm text-blue-600">카테고리</div>
                </div>
                <div class="bg-purple-100 p-4 rounded-xl text-center">
                    <div class="text-3xl font-bold text-purple-700">50</div>
                    <div class="text-sm text-purple-600">제품</div>
                </div>
                <div class="bg-orange-100 p-4 rounded-xl text-center">
                    <div class="text-3xl font-bold text-orange-700">27</div>
                    <div class="text-sm text-orange-600">이벤트</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        let sql = '';
        
        // 페이지 로드시 SQL 데이터 가져오기
        fetch('/api/sql-content')
            .then(res => res.text())
            .then(data => {
                sql = data;
                console.log('SQL 로드 완료:', sql.split('\\n').length, '줄');
            })
            .catch(err => {
                console.error('SQL 로드 실패:', err);
                alert('SQL을 불러올 수 없습니다. 페이지를 새로고침 해주세요.');
            });

        document.getElementById('copyBtn').addEventListener('click', async () => {
            if (!sql) {
                alert('SQL 데이터가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
                return;
            }
            
            try {
                await navigator.clipboard.writeText(sql);
                document.getElementById('msg').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('msg').classList.add('hidden');
                }, 3000);
            } catch (error) {
                alert('복사 실패: ' + error);
            }
        });
    </script>
                alert('복사 실패: ' + error);
            }
        });
    </script>
</body>
</html>`)
})

// SQL 복사 페이지 (직접 HTML 반환)
app.get('/copy-sql', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cloudflare D1 업데이트 SQL - 복사용</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { font-size: 28px; margin-bottom: 10px; }
        .header p { font-size: 14px; opacity: 0.9; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; padding: 20px 30px; background: #f8f9fa; border-bottom: 2px solid #e9ecef; }
        .stat-item { text-align: center; padding: 10px; }
        .stat-number { font-size: 24px; font-weight: bold; color: #667eea; display: block; }
        .stat-label { font-size: 12px; color: #6c757d; margin-top: 5px; }
        .instructions { padding: 20px 30px; background: #fff3cd; border-left: 4px solid #ffc107; margin: 20px 30px; border-radius: 4px; }
        .instructions h3 { color: #856404; margin-bottom: 10px; font-size: 16px; }
        .instructions ol { margin-left: 20px; color: #856404; }
        .instructions li { margin: 5px 0; font-size: 14px; }
        .button-container { padding: 20px 30px; text-align: center; }
        .copy-btn { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px 40px; font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease; }
        .copy-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6); }
        .copy-btn:active { transform: translateY(0); }
        .copy-btn.copied { background: #28a745; }
        .sql-container { margin: 20px 30px; border: 2px solid #e9ecef; border-radius: 8px; overflow: hidden; }
        .sql-header { background: #343a40; color: white; padding: 12px 20px; font-family: 'Courier New', monospace; font-size: 13px; display: flex; justify-content: space-between; align-items: center; }
        .sql-content { background: #f8f9fa; padding: 20px; max-height: 500px; overflow-y: auto; font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.6; white-space: pre; color: #212529; }
        .footer { padding: 20px 30px; background: #f8f9fa; text-align: center; color: #6c757d; font-size: 13px; border-top: 2px solid #e9ecef; }
        .success-message { display: none; background: #d4edda; color: #155724; padding: 15px; margin: 20px 30px; border-radius: 8px; border: 1px solid #c3e6cb; text-align: center; font-weight: bold; }
        .success-message.show { display: block; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍵 다공(茶工) 데이터베이스 업데이트 SQL</h1>
            <p>Cloudflare D1 Console용 - 전체 복사 후 붙여넣기</p>
        </div>
        <div class="stats">
            <div class="stat-item"><span class="stat-number">194</span><span class="stat-label">총 라인 수</span></div>
            <div class="stat-item"><span class="stat-number">17</span><span class="stat-label">지역</span></div>
            <div class="stat-item"><span class="stat-number">31</span><span class="stat-label">카테고리</span></div>
            <div class="stat-item"><span class="stat-number">50</span><span class="stat-label">제품</span></div>
            <div class="stat-item"><span class="stat-number">27</span><span class="stat-label">이벤트</span></div>
            <div class="stat-item"><span class="stat-number">12</span><span class="stat-label">체험 프로그램</span></div>
            <div class="stat-item"><span class="stat-number">5</span><span class="stat-label">교육 카테고리</span></div>
            <div class="stat-item"><span class="stat-number">30</span><span class="stat-label">교육 커리큘럼</span></div>
        </div>
        <div class="instructions">
            <h3>📋 사용 방법</h3>
            <ol>
                <li><strong>"전체 복사" 버튼</strong>을 클릭하세요</li>
                <li><strong>Cloudflare 대시보드</strong>로 이동: <a href="https://dash.cloudflare.com/" target="_blank">https://dash.cloudflare.com/</a></li>
                <li><strong>Workers & Pages → D1 → webapp-production → Console</strong> 탭 선택</li>
                <li>큰 입력창에 <strong>붙여넣기</strong> (Ctrl+V / Cmd+V)</li>
                <li><strong>Execute</strong> 버튼 클릭 후 1-2분 대기</li>
            </ol>
        </div>
        <div class="button-container">
            <button class="copy-btn" onclick="copySQL()">📋 전체 복사 (194줄)</button>
        </div>
        <div class="success-message" id="successMessage">
            ✅ SQL이 클립보드에 복사되었습니다! Cloudflare 콘솔에 붙여넣으세요.
        </div>
        <div class="sql-container">
            <div class="sql-header"><span>COPY_THIS.sql</span><span>194 lines</span></div>
            <div class="sql-content" id="sqlContent">DELETE FROM education_curriculum;
DELETE FROM education_categories;
DELETE FROM experiences;
DELETE FROM products;
DELETE FROM events;
DELETE FROM producers;
DELETE FROM categories;
DELETE FROM regions;

INSERT INTO regions (id, name, type, description, featured_image, created_at) VALUES 
(1, '제주도', 'tea', '제주의 청정 자연에서 자란 녹차', '/images/regions/jeju.jpg', '2026-02-18 12:18:03'),
(2, '하동', 'tea', '지리산 자락의 전통 차밭', '/images/regions/hadong.jpg', '2026-02-18 12:18:03'),
(3, '김해', 'tea', '한국 차문화의 발상지', '/images/regions/gimhae.jpg', '2026-02-18 12:18:03'),
(4, '광양', 'tea', '백운산 자락의 청정 차밭', '/images/regions/gwangyang.jpg', '2026-02-18 12:18:03'),
(5, '보성', 'tea', '대한민국 녹차의 수도', '/images/regions/boseong.jpg', '2026-02-18 12:18:03'),
(6, '이천', 'craft', '전통 도자기의 본고장', '/images/regions/icheon.jpg', '2026-02-18 12:18:03'),
(7, '광주', 'craft', '조선백자의 중심지', '/images/regions/gwangju.jpg', '2026-02-18 12:18:03'),
(8, '담양', 'craft', '대나무 공예의 메카', '/images/regions/damyang.jpg', '2026-02-18 12:18:03'),
(9, '안동', 'craft', '한국 정신문화의 수도', '/images/regions/andong.jpg', '2026-02-18 12:18:03'),
(10, '전주', 'craft', '한지와 전통공예', '/images/regions/jeonju.jpg', '2026-02-18 12:18:03'),
(11, '강진', 'craft', '고려청자의 고향', '/images/regions/gangjin.jpg', '2026-02-18 12:18:03'),
(12, '남원', 'craft', '전통 목공예의 중심', '/images/regions/namwon.jpg', '2026-02-18 12:18:03'),
(13, '공주', 'craft', '백제 문화의 보고', '/images/regions/gongju.jpg', '2026-02-18 12:18:03'),
(14, '경주', 'craft', '신라 천년의 공예', '/images/regions/gyeongju.jpg', '2026-02-18 12:18:03'),
(15, '울산', 'craft', '동해안 특산품', '/images/regions/ulsan.jpg', '2026-02-18 12:18:03'),
(16, '부산', 'craft', '해양 도시 특산품', '/images/regions/busan.jpg', '2026-02-18 12:18:03'),
(17, '서울', 'craft', '수도권 특산품', '/images/regions/seoul.jpg', '2026-02-18 12:18:03');

INSERT INTO categories (id, name, type, description, display_order, created_at) VALUES 
(1, '녹차', 'tea', '한국 전통 녹차', 1, '2026-02-18 12:18:13'),
(2, '황차', 'tea', '특별한 황차', 4, '2026-02-18 12:18:13'),
(3, '홍차', 'tea', '완전 발효 홍차', 5, '2026-02-18 12:18:13'),
(4, '발효차', 'tea', '전통 발효차', 6, '2026-02-18 12:18:13'),
(6, '블렌딩차', 'tea', '다양한 블렌딩 차', 7, '2026-02-18 12:18:13'),
(8, '찻잔', 'craft', '다양한 찻잔', 2, '2026-02-18 12:18:13'),
(9, '다관', 'craft', '전통 다관', 1, '2026-02-18 12:18:13'),
(11, '장식품', 'craft', '인테리어 장식품', 9, '2026-02-18 12:18:13'),
(12, '명절 선물세트', 'gift', '명절 특별 선물', 1, '2026-02-18 12:18:13'),
(13, '기념일 선물세트', 'gift', '기념일용 선물', 2, '2026-02-18 12:18:13'),
(14, '기업 선물세트', 'gift', '기업용 선물', 3, '2026-02-18 12:18:13'),
(15, '맞춤 선물세트', 'gift', '맞춤형 선물', 4, '2026-02-18 12:18:13'),
(17, '농산물', 'local', '지역 농산물', 1, '2026-02-18 12:18:13'),
(18, '가공식품', 'local', '지역 가공식품', 5, '2026-02-18 12:18:13'),
(19, '수산물', 'local', '지역 수산물', 2, '2026-02-18 12:18:13'),
(20, '축산물', 'local', '지역 축산물', 3, '2026-02-18 12:18:13'),
(21, '공예품', 'local', '지역 공예품', 4, '2026-02-18 12:18:13'),
(22, '전통주', 'local', '전통주/음료', 6, '2026-02-18 12:18:13'),
(23, '건강식품', 'local', '건강 식품', 7, '2026-02-18 12:18:13'),
(24, '조미료', 'local', '천연 조미료', 8, '2026-02-18 12:18:13'),
(25, '간편식', 'local', '간편 먹거리', 9, '2026-02-18 12:18:13'),
(26, '디저트', 'local', '전통 디저트', 10, '2026-02-18 12:18:13'),
(27, '생활용품', 'local', '친환경 생활용품', 11, '2026-02-18 12:18:13'),
(28, '화장품', 'local', '천연 화장품', 12, '2026-02-18 12:18:13'),
(29, '의류/잡화', 'local', '전통 의류/잡화', 13, '2026-02-18 12:18:13'),
(30, '인테리어', 'local', '인테리어 소품', 14, '2026-02-18 12:18:13'),
(31, '문화상품', 'local', '문화/예술 상품', 15, '2026-02-18 12:18:13');

INSERT INTO producers (id, name, region, description, contact, created_at) VALUES 
(1, '박수공', '제주도', '제주 한라산 유기농 차 농원', '064-123-4567', '2026-02-18 12:18:13'),
(2, '제주 한라산 차농원', '제주도', '3대째 이어온 전통 차 농원', '064-456-7890', '2026-02-18 12:18:13');

INSERT INTO products (id, name, category_id, producer_id, description, consumer_price, direct_price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count, created_at) VALUES 
(1, '제주 한라산 유기농 녹차', 1, 1, '청정 제주에서 자란 프리미엄 유기농 녹차', 35000.00, 28000.00, 3000.00, 100, '/images/products/tea1.jpg', 'tea', 100.00, '제주도', 1, 1, 150, '2026-02-18 12:18:13'),
(2, '하동 전통 발효차', 4, 2, '지리산 자락의 전통 방식 발효차', 45000.00, 36000.00, 3000.00, 50, '/images/products/tea2.jpg', 'tea', 100.00, '경남 하동', 1, 1, 120, '2026-02-18 12:18:13'),
(3, '보성 청태전', 4, 1, '보성의 전통 떡차', 38000.00, 30400.00, 3000.00, 80, '/images/products/tea3.jpg', 'tea', 150.00, '전남 보성', 1, 1, 200, '2026-02-18 12:18:13'),
(4, '김해 황차', 2, 2, '김해의 특별한 황차', 42000.00, 33600.00, 3000.00, 60, '/images/products/tea4.jpg', 'tea', 100.00, '경남 김해', 0, 1, 80, '2026-02-18 12:18:13'),
(5, '광양 매화차', 6, 1, '광양 백운산 매화로 만든 블렌딩차', 32000.00, 25600.00, 3000.00, 90, '/images/products/tea5.jpg', 'tea', 80.00, '전남 광양', 1, 1, 180, '2026-02-18 12:18:13');</div>
        </div>
        <div class="footer">
            <p>💡 이 SQL을 Cloudflare D1 Console에서 실행하면 모든 데이터가 업데이트됩니다.</p>
            <p style="margin-top: 5px; font-size: 11px;">문제가 발생하면 전체 194줄이 복사되었는지 확인하세요.</p>
        </div>
    </div>
    <script>
        function copySQL() {
            const sqlContent = document.getElementById('sqlContent').textContent;
            const btn = document.querySelector('.copy-btn');
            const successMsg = document.getElementById('successMessage');
            navigator.clipboard.writeText(sqlContent).then(() => {
                btn.textContent = '✅ 복사 완료!';
                btn.classList.add('copied');
                successMsg.classList.add('show');
                setTimeout(() => { btn.textContent = '📋 전체 복사 (194줄)'; btn.classList.remove('copied'); }, 3000);
                setTimeout(() => { successMsg.classList.remove('show'); }, 5000);
            }).catch(err => { alert('복사 실패: ' + err); });
        }
    </script>
</body>
</html>`)
})



// SQL 텍스트 파일 다운로드 (기존 버전)
app.get('/sql.txt', (c) => {
  const sql = `DELETE FROM education_curriculum;
DELETE FROM education_categories;
DELETE FROM experiences;
DELETE FROM products;
DELETE FROM events;
DELETE FROM producers;
DELETE FROM categories;
DELETE FROM regions;

INSERT INTO regions (id, name, type, description, featured_image, created_at) VALUES 
(1, '제주도', 'tea', '제주의 청정 자연에서 자란 녹차', '/images/regions/jeju.jpg', '2026-02-18 12:18:03'),
(2, '하동', 'tea', '지리산 자락의 전통 차밭', '/images/regions/hadong.jpg', '2026-02-18 12:18:03'),
(3, '김해', 'tea', '한국 차문화의 발상지', '/images/regions/gimhae.jpg', '2026-02-18 12:18:03'),
(4, '광양', 'tea', '백운산 자락의 청정 차밭', '/images/regions/gwangyang.jpg', '2026-02-18 12:18:03'),
(5, '보성', 'tea', '대한민국 녹차의 수도', '/images/regions/boseong.jpg', '2026-02-18 12:18:03'),
(6, '이천', 'craft', '전통 도자기의 본고장', '/images/regions/icheon.jpg', '2026-02-18 12:18:03'),
(7, '광주', 'craft', '조선백자의 중심지', '/images/regions/gwangju.jpg', '2026-02-18 12:18:03'),
(8, '담양', 'craft', '대나무 공예의 메카', '/images/regions/damyang.jpg', '2026-02-18 12:18:03'),
(9, '안동', 'craft', '한국 정신문화의 수도', '/images/regions/andong.jpg', '2026-02-18 12:18:03'),
(10, '전주', 'craft', '한지와 전통공예', '/images/regions/jeonju.jpg', '2026-02-18 12:18:03'),
(11, '강진', 'craft', '고려청자의 고향', '/images/regions/gangjin.jpg', '2026-02-18 12:18:03'),
(12, '남원', 'craft', '전통 목공예의 중심', '/images/regions/namwon.jpg', '2026-02-18 12:18:03'),
(13, '공주', 'craft', '백제 문화의 보고', '/images/regions/gongju.jpg', '2026-02-18 12:18:03'),
(14, '경주', 'craft', '신라 천년의 공예', '/images/regions/gyeongju.jpg', '2026-02-18 12:18:03'),
(15, '울산', 'craft', '동해안 특산품', '/images/regions/ulsan.jpg', '2026-02-18 12:18:03'),
(16, '부산', 'craft', '해양 도시 특산품', '/images/regions/busan.jpg', '2026-02-18 12:18:03'),
(17, '서울', 'craft', '수도권 특산품', '/images/regions/seoul.jpg', '2026-02-18 12:18:03');

INSERT INTO categories (id, name, type, description, display_order, created_at) VALUES 
(1, '녹차', 'tea', '한국 전통 녹차', 1, '2026-02-18 12:18:13'),
(2, '황차', 'tea', '특별한 황차', 4, '2026-02-18 12:18:13'),
(3, '홍차', 'tea', '완전 발효 홍차', 5, '2026-02-18 12:18:13'),
(4, '발효차', 'tea', '전통 발효차', 6, '2026-02-18 12:18:13'),
(6, '블렌딩차', 'tea', '다양한 블렌딩 차', 7, '2026-02-18 12:18:13'),
(8, '찻잔', 'craft', '다양한 찻잔', 2, '2026-02-18 12:18:13'),
(9, '다관', 'craft', '전통 다관', 1, '2026-02-18 12:18:13'),
(11, '장식품', 'craft', '인테리어 장식품', 9, '2026-02-18 12:18:13'),
(12, '명절 선물세트', 'gift', '명절 특별 선물', 1, '2026-02-18 12:18:13'),
(13, '기념일 선물세트', 'gift', '기념일용 선물', 2, '2026-02-18 12:18:13'),
(14, '기업 선물세트', 'gift', '기업용 선물', 3, '2026-02-18 12:18:13'),
(15, '맞춤 선물세트', 'gift', '맞춤형 선물', 4, '2026-02-18 12:18:13'),
(17, '농산물', 'local', '지역 농산물', 1, '2026-02-18 12:18:13'),
(18, '가공식품', 'local', '지역 가공식품', 5, '2026-02-18 12:18:13'),
(19, '수산물', 'local', '지역 수산물', 2, '2026-02-18 12:18:13'),
(20, '축산물', 'local', '지역 축산물', 3, '2026-02-18 12:18:13'),
(21, '공예품', 'local', '지역 공예품', 4, '2026-02-18 12:18:13'),
(22, '전통주', 'local', '전통주/음료', 6, '2026-02-18 12:18:13'),
(23, '건강식품', 'local', '건강 식품', 7, '2026-02-18 12:18:13'),
(24, '조미료', 'local', '천연 조미료', 8, '2026-02-18 12:18:13'),
(25, '간편식', 'local', '간편 먹거리', 9, '2026-02-18 12:18:13'),
(26, '디저트', 'local', '전통 디저트', 10, '2026-02-18 12:18:13'),
(27, '생활용품', 'local', '친환경 생활용품', 11, '2026-02-18 12:18:13'),
(28, '화장품', 'local', '천연 화장품', 12, '2026-02-18 12:18:13'),
(29, '의류/잡화', 'local', '전통 의류/잡화', 13, '2026-02-18 12:18:13'),
(30, '인테리어', 'local', '인테리어 소품', 14, '2026-02-18 12:18:13'),
(31, '문화상품', 'local', '문화/예술 상품', 15, '2026-02-18 12:18:13');

INSERT INTO producers (id, name, region, description, contact, created_at) VALUES 
(1, '박수공', '제주도', '제주 한라산 유기농 차 농원', '064-123-4567', '2026-02-18 12:18:13'),
(2, '제주 한라산 차농원', '제주도', '3대째 이어온 전통 차 농원', '064-456-7890', '2026-02-18 12:18:13');

INSERT INTO products (id, name, category_id, producer_id, description, consumer_price, direct_price, shipping_fee, stock_quantity, main_image, product_type, weight, origin, is_featured, is_available, view_count, created_at) VALUES 
(1, '제주 한라산 유기농 녹차', 1, 1, '청정 제주에서 자란 프리미엄 유기농 녹차', 35000.00, 28000.00, 3000.00, 100, '/images/products/tea1.jpg', 'tea', 100.00, '제주도', 1, 1, 150, '2026-02-18 12:18:13'),
(2, '하동 전통 발효차', 4, 2, '지리산 자락의 전통 방식 발효차', 45000.00, 36000.00, 3000.00, 50, '/images/products/tea2.jpg', 'tea', 100.00, '경남 하동', 1, 1, 120, '2026-02-18 12:18:13'),
(3, '보성 청태전', 4, 1, '보성의 전통 떡차', 38000.00, 30400.00, 3000.00, 80, '/images/products/tea3.jpg', 'tea', 150.00, '전남 보성', 1, 1, 200, '2026-02-18 12:18:13'),
(4, '김해 황차', 2, 2, '김해의 특별한 황차', 42000.00, 33600.00, 3000.00, 60, '/images/products/tea4.jpg', 'tea', 100.00, '경남 김해', 0, 1, 80, '2026-02-18 12:18:13'),
(5, '광양 매화차', 6, 1, '광양 백운산 매화로 만든 블렌딩차', 32000.00, 25600.00, 3000.00, 90, '/images/products/tea5.jpg', 'tea', 80.00, '전남 광양', 1, 1, 180, '2026-02-18 12:18:13'),
(6, '이천 도자기 찻잔 세트', 8, 1, '이천 전통 도자기 장인의 수제 찻잔', 85000.00, 68000.00, 3000.00, 30, '/images/products/craft1.jpg', 'craft', 800.00, '경기 이천', 1, 1, 95, '2026-02-18 12:18:13'),
(7, '광주 분청사기 다관', 9, 2, '조선시대 기법으로 만든 분청 다관', 150000.00, 120000.00, 3000.00, 15, '/images/products/craft2.jpg', 'craft', 1200.00, '경기 광주', 1, 1, 70, '2026-02-18 12:18:13'),
(8, '담양 대나무 찻상', 11, 1, '담양 대나무로 만든 전통 찻상', 95000.00, 76000.00, 5000.00, 25, '/images/products/craft3.jpg', 'craft', 2500.00, '전남 담양', 0, 1, 60, '2026-02-18 12:18:13'),
(9, '안동 한지 찻잔 받침', 11, 2, '안동 전통 한지 공예품', 28000.00, 22400.00, 2500.00, 50, '/images/products/craft4.jpg', 'craft', 100.00, '경북 안동', 0, 1, 45, '2026-02-18 12:18:13'),
(10, '전주 나전칠기 다기', 9, 1, '전주 전통 나전칠기 기법의 다기', 280000.00, 224000.00, 3000.00, 10, '/images/products/craft5.jpg', 'craft', 1500.00, '전북 전주', 1, 1, 85, '2026-02-18 12:18:13'),
(11, '강진 청자 찻잔', 8, 2, '고려청자의 전통을 이은 현대 청자', 120000.00, 96000.00, 3000.00, 20, '/images/products/craft6.jpg', 'craft', 600.00, '전남 강진', 1, 1, 110, '2026-02-18 12:18:13'),
(12, '남원 목기 찻잔받침', 11, 1, '남원 전통 목공예 찻잔받침', 35000.00, 28000.00, 2500.00, 40, '/images/products/craft7.jpg', 'craft', 300.00, '전북 남원', 0, 1, 55, '2026-02-18 12:18:13'),
(13, '제주 한라봉차', 6, 1, '제주 한라봉으로 만든 블렌딩차', 28000.00, 22400.00, 3000.00, 100, '/images/products/tea6.jpg', 'tea', 80.00, '제주도', 1, 1, 140, '2026-02-18 12:18:13'),
(14, '하동 야생차', 1, 2, '지리산 야생차나무에서 채취한 차', 65000.00, 52000.00, 3000.00, 30, '/images/products/tea7.jpg', 'tea', 100.00, '경남 하동', 1, 1, 90, '2026-02-18 12:18:13'),
(15, '명절 프리미엄 세트', 12, 1, '차와 다기가 함께하는 명절 선물', 150000.00, 120000.00, 0.00, 50, '/images/products/gift1.jpg', 'gift', 2000.00, '전국', 1, 1, 200, '2026-02-18 12:18:13'),
(16, '기념일 차 선물세트', 13, 2, '특별한 날을 위한 프리미엄 차 세트', 95000.00, 76000.00, 0.00, 60, '/images/products/gift2.jpg', 'gift', 1200.00, '전국', 1, 1, 175, '2026-02-18 12:18:13'),
(17, '기업 선물용 다기세트', 14, 1, '품격있는 기업 선물용 세트', 180000.00, 144000.00, 0.00, 40, '/images/products/gift3.jpg', 'gift', 2500.00, '전국', 1, 1, 130, '2026-02-18 12:18:13'),
(18, '맞춤 선물 구성', 15, 2, '원하는 대로 구성하는 선물세트', 120000.00, 96000.00, 0.00, 70, '/images/products/gift4.jpg', 'gift', 1500.00, '전국', 0, 1, 95, '2026-02-18 12:18:13'),
(19, '울산 미역', 19, 1, '동해안 청정 해역 미역', 25000.00, 20000.00, 3000.00, 80, '/images/products/local1.jpg', 'local', 300.00, '울산', 0, 1, 85, '2026-02-18 12:18:13'),
(20, '부산 멸치', 19, 2, '부산 앞바다 특산 멸치', 32000.00, 25600.00, 3000.00, 90, '/images/products/local2.jpg', 'local', 500.00, '부산', 1, 1, 110, '2026-02-18 12:18:13'),
(21, '제주 흑돼지 육포', 20, 1, '제주 흑돼지로 만든 프리미엄 육포', 28000.00, 22400.00, 3000.00, 70, '/images/products/local3.jpg', 'local', 200.00, '제주도', 1, 1, 95, '2026-02-18 12:18:13'),
(22, '보성 녹차 쌀', 17, 2, '녹차를 먹여 키운 특별한 쌀', 35000.00, 28000.00, 3000.00, 100, '/images/products/local4.jpg', 'local', 5000.00, '전남 보성', 0, 1, 75, '2026-02-18 12:18:13'),
(23, '하동 야생화 꿀', 23, 1, '지리산 야생화 꿀', 42000.00, 33600.00, 3000.00, 50, '/images/products/local5.jpg', 'local', 600.00, '경남 하동', 1, 1, 120, '2026-02-18 12:18:13'),
(24, '안동 간고등어', 19, 2, '안동 전통 간고등어', 38000.00, 30400.00, 3000.00, 60, '/images/products/local6.jpg', 'local', 800.00, '경북 안동', 0, 1, 65, '2026-02-18 12:18:13'),
(25, '전주 한과', 26, 1, '전통 방식으로 만든 전주 한과', 32000.00, 25600.00, 2500.00, 80, '/images/products/local7.jpg', 'local', 400.00, '전북 전주', 1, 1, 140, '2026-02-18 12:18:13'),
(26, '강릉 커피', 18, 2, '강릉 로스터리 원두', 22000.00, 17600.00, 3000.00, 90, '/images/products/local8.jpg', 'local', 200.00, '강원 강릉', 0, 1, 105, '2026-02-18 12:18:13'),
(27, '경주 빵', 26, 1, '경주 특산 빵', 18000.00, 14400.00, 3000.00, 100, '/images/products/local9.jpg', 'local', 500.00, '경북 경주', 0, 1, 88, '2026-02-18 12:18:13'),
(28, '남원 추어탕', 18, 2, '남원 전통 추어탕', 15000.00, 12000.00, 3500.00, 70, '/images/products/local10.jpg', 'local', 1000.00, '전북 남원', 0, 1, 72, '2026-02-18 12:18:13'),
(29, '제주 감귤', 17, 1, '제주 청정 감귤', 28000.00, 22400.00, 3500.00, 150, '/images/products/local11.jpg', 'local', 3000.00, '제주도', 1, 1, 180, '2026-02-18 12:18:13'),
(30, '서울 전통주', 22, 2, '서울 전통 막걸리', 18000.00, 14400.00, 3000.00, 80, '/images/products/local12.jpg', 'local', 750.00, '서울', 0, 1, 92, '2026-02-18 12:18:13'),
(31, '이천 쌀', 17, 1, '임금님표 이천쌀', 45000.00, 36000.00, 3500.00, 100, '/images/products/local13.jpg', 'local', 10000.00, '경기 이천', 1, 1, 160, '2026-02-18 12:18:13'),
(32, '담양 죽순', 17, 2, '담양 대나무 죽순', 32000.00, 25600.00, 3000.00, 60, '/images/products/local14.jpg', 'local', 1000.00, '전남 담양', 0, 1, 78, '2026-02-18 12:18:13'),
(33, '공주 밤', 17, 1, '공주 알밤', 28000.00, 22400.00, 3000.00, 90, '/images/products/local15.jpg', 'local', 2000.00, '충남 공주', 0, 1, 85, '2026-02-18 12:18:13'),
(34, '보령 굴비', 19, 2, '보령 명품 굴비', 55000.00, 44000.00, 3500.00, 50, '/images/products/local16.jpg', 'local', 1200.00, '충남 보령', 1, 1, 125, '2026-02-18 12:18:13'),
(35, '영광 모시', 29, 1, '영광 모시 의류', 85000.00, 68000.00, 3000.00, 40, '/images/products/local17.jpg', 'local', 500.00, '전남 영광', 0, 1, 68, '2026-02-18 12:18:13'),
(36, '나주 배', 17, 2, '나주 신고배', 38000.00, 30400.00, 3500.00, 80, '/images/products/local18.jpg', 'local', 5000.00, '전남 나주', 1, 1, 145, '2026-02-18 12:18:13'),
(37, '영양 고추', 24, 1, '영양 청정 고추', 42000.00, 33600.00, 3000.00, 70, '/images/products/local19.jpg', 'local', 500.00, '경북 영양', 0, 1, 95, '2026-02-18 12:18:13'),
(38, '의성 마늘', 24, 2, '의성 육쪽마늘', 35000.00, 28000.00, 3000.00, 90, '/images/products/local20.jpg', 'local', 1000.00, '경북 의성', 1, 1, 132, '2026-02-18 12:18:13'),
(39, '청송 사과', 17, 1, '청송 주왕산 사과', 45000.00, 36000.00, 3500.00, 100, '/images/products/local21.jpg', 'local', 5000.00, '경북 청송', 1, 1, 170, '2026-02-18 12:18:13'),
(40, '영덕 대게', 19, 2, '영덕 특산 대게', 95000.00, 76000.00, 5000.00, 30, '/images/products/local22.jpg', 'local', 1500.00, '경북 영덕', 1, 1, 155, '2026-02-18 12:18:13'),
(41, '울릉도 오징어', 19, 1, '울릉도 건오징어', 48000.00, 38400.00, 3500.00, 50, '/images/products/local23.jpg', 'local', 500.00, '경북 울릉', 0, 1, 88, '2026-02-18 12:18:13'),
(42, '삼척 건어물', 19, 2, '삼척 특산 건어물', 32000.00, 25600.00, 3000.00, 60, '/images/products/local24.jpg', 'local', 800.00, '강원 삼척', 0, 1, 75, '2026-02-18 12:18:13'),
(43, '속초 오징어순대', 18, 1, '속초 명물 오징어순대', 25000.00, 20000.00, 3500.00, 70, '/images/products/local25.jpg', 'local', 600.00, '강원 속초', 0, 1, 98, '2026-02-18 12:18:13'),
(44, '횡성 한우', 20, 2, '횡성 1++등급 한우', 120000.00, 96000.00, 5000.00, 40, '/images/products/local26.jpg', 'local', 2000.00, '강원 횡성', 1, 1, 185, '2026-02-18 12:18:13'),
(45, '평창 송이버섯', 17, 1, '평창 자연산 송이', 150000.00, 120000.00, 5000.00, 20, '/images/products/local27.jpg', 'local', 500.00, '강원 평창', 1, 1, 210, '2026-02-18 12:18:13'),
(46, '정선 곤드레', 17, 2, '정선 산나물 곤드레', 28000.00, 22400.00, 3000.00, 80, '/images/products/local28.jpg', 'local', 300.00, '강원 정선', 0, 1, 82, '2026-02-18 12:18:13'),
(47, '양구 시래기', 17, 1, '양구 청정 시래기', 22000.00, 17600.00, 3000.00, 90, '/images/products/local29.jpg', 'local', 500.00, '강원 양구', 0, 1, 76, '2026-02-18 12:18:13'),
(48, '인제 산나물', 17, 2, '인제 자연산 산나물', 35000.00, 28000.00, 3000.00, 70, '/images/products/local30.jpg', 'local', 400.00, '강원 인제', 0, 1, 88, '2026-02-18 12:18:13'),
(49, '화천 토마토', 17, 1, '화천 방울토마토', 28000.00, 22400.00, 3500.00, 100, '/images/products/local31.jpg', 'local', 2000.00, '강원 화천', 0, 1, 95, '2026-02-18 12:18:13'),
(50, '철원 오대쌀', 17, 2, '철원 DMZ 오대쌀', 42000.00, 33600.00, 3500.00, 80, '/images/products/local32.jpg', 'local', 10000.00, '강원 철원', 1, 1, 165, '2026-02-18 12:18:13');

INSERT INTO events (id, title, category, description, location, start_date, end_date, max_participants, current_participants, price, image_url, is_featured, status, created_at) VALUES 
(1, '제주 차밭 투어', 'tea', '제주 한라산 차밭 견학과 차 만들기 체험', '제주도', '2026-03-15', '2026-03-15', 30, 12, 45000, '/images/events/event1.jpg', 1, 'open', '2026-02-18 12:18:13'),
(2, '하동 야생차 체험', 'tea', '지리산 야생차 채취 체험', '경남 하동', '2026-03-20', '2026-03-20', 20, 8, 55000, '/images/events/event2.jpg', 1, 'open', '2026-02-18 12:18:13'),
(3, '보성 녹차밭 축제', 'tea', '보성 녹차밭 축제 및 차 시음회', '전남 보성', '2026-04-05', '2026-04-07', 100, 45, 35000, '/images/events/event3.jpg', 1, 'open', '2026-02-18 12:18:13'),
(4, '이천 도자기 만들기', 'craft', '이천 도자기 공방 체험', '경기 이천', '2026-03-22', '2026-03-22', 15, 10, 75000, '/images/events/event4.jpg', 1, 'open', '2026-02-18 12:18:13'),
(5, '광주 분청사기 체험', 'craft', '전통 분청사기 제작 체험', '경기 광주', '2026-03-25', '2026-03-25', 12, 6, 85000, '/images/events/event5.jpg', 0, 'open', '2026-02-18 12:18:13'),
(6, '담양 대나무 공예', 'craft', '담양 대나무 공예 만들기', '전남 담양', '2026-04-01', '2026-04-01', 20, 15, 45000, '/images/events/event6.jpg', 1, 'open', '2026-02-18 12:18:13'),
(7, '안동 한지 공예', 'craft', '안동 전통 한지 공예 체험', '경북 안동', '2026-04-08', '2026-04-08', 18, 9, 38000, '/images/events/event7.jpg', 0, 'open', '2026-02-18 12:18:13'),
(8, '전주 나전칠기 체험', 'craft', '전주 전통 나전칠기 만들기', '전북 전주', '2026-04-12', '2026-04-12', 10, 7, 95000, '/images/events/event8.jpg', 1, 'open', '2026-02-18 12:18:13'),
(9, '강진 청자 체험', 'craft', '고려청자 도자기 만들기', '전남 강진', '2026-04-15', '2026-04-15', 15, 5, 68000, '/images/events/event9.jpg', 0, 'open', '2026-02-18 12:18:13'),
(10, '남원 목공예 체험', 'craft', '전통 목공예 만들기', '전북 남원', '2026-04-18', '2026-04-18', 12, 8, 52000, '/images/events/event10.jpg', 0, 'open', '2026-02-18 12:18:13'),
(11, '봄 차 명상 힐링', 'meditation', '봄 차 명상과 힐링 프로그램', '제주도', '2026-03-28', '2026-03-29', 25, 18, 120000, '/images/events/event11.jpg', 1, 'open', '2026-02-18 12:18:13'),
(12, '다도 입문 교실', 'education', '전통 다도 기초 교육', '서울', '2026-04-02', '2026-04-02', 15, 12, 50000, '/images/events/event12.jpg', 1, 'open', '2026-02-18 12:18:13'),
(13, '차와 음식 페어링', 'tea', '차와 음식의 조화 체험', '서울', '2026-04-10', '2026-04-10', 20, 14, 65000, '/images/events/event13.jpg', 0, 'open', '2026-02-18 12:18:13'),
(14, '여름 차밭 캠핑', 'tea', '보성 차밭에서의 1박 2일 캠핑', '전남 보성', '2026-06-15', '2026-06-16', 30, 8, 95000, '/images/events/event14.jpg', 1, 'open', '2026-02-18 12:18:13'),
(15, '제주 차 만들기 워크샵', 'tea', '차 제조 과정 전체 체험', '제주도', '2026-05-08', '2026-05-09', 15, 6, 150000, '/images/events/event15.jpg', 1, 'open', '2026-02-18 12:18:13'),
(16, '전통 공예 박람회', 'craft', '전국 전통 공예 작가 작품전', '서울', '2026-05-20', '2026-05-25', 500, 120, 15000, '/images/events/event16.jpg', 1, 'open', '2026-02-18 12:18:13'),
(17, '차 소믈리에 입문', 'education', '차 소믈리에 기초 과정', '서울', '2026-05-15', '2026-05-16', 20, 16, 180000, '/images/events/event17.jpg', 1, 'open', '2026-02-18 12:18:13'),
(18, '가을 차 축제', 'tea', '전국 차 생산지 연합 축제', '전남 보성', '2026-09-15', '2026-09-17', 200, 85, 25000, '/images/events/event18.jpg', 1, 'open', '2026-02-18 12:18:13'),
(19, '명상과 차 명상', 'meditation', '마음챙김 명상과 차 명상', '경기 양평', '2026-07-20', '2026-07-21', 18, 12, 110000, '/images/events/event19.jpg', 0, 'open', '2026-02-18 12:18:13'),
(20, '도자기 고급 과정', 'craft', '도자기 제작 심화 과정', '경기 이천', '2026-06-10', '2026-06-11', 10, 8, 220000, '/images/events/event20.jpg', 0, 'open', '2026-02-18 12:18:13'),
(21, '겨울 차 명상 힐링', 'meditation', '겨울 차 명상 1박 2일', '강원 평창', '2026-12-15', '2026-12-16', 20, 5, 135000, '/images/events/event21.jpg', 1, 'open', '2026-02-18 12:18:13'),
(22, '설 명절 선물 특별전', 'gift', '설 명절 차 선물 특별전', '서울', '2027-01-20', '2027-01-28', 300, 95, 0, '/images/events/event22.jpg', 1, 'open', '2026-02-18 12:18:13'),
(23, '추석 선물 특별전', 'gift', '추석 명절 차 선물 특별전', '서울', '2026-08-25', '2026-09-05', 300, 145, 0, '/images/events/event23.jpg', 1, 'open', '2026-02-18 12:18:13'),
(24, '어린이 다도 교실', 'education', '어린이를 위한 다도 체험', '서울', '2026-07-28', '2026-07-30', 25, 20, 45000, '/images/events/event24.jpg', 0, 'open', '2026-02-18 12:18:13'),
(25, '기업 임직원 힐링 프로그램', 'meditation', '기업 임직원 차 명상 힐링', '경기 가평', '2026-08-14', '2026-08-15', 40, 30, 95000, '/images/events/event25.jpg', 0, 'open', '2026-02-18 12:18:13'),
(26, '전통 차 제조 비법', 'tea', '전통 차 제조 장인의 비법 전수', '경남 하동', '2026-10-10', '2026-10-12', 12, 10, 280000, '/images/events/event26.jpg', 1, 'open', '2026-02-18 12:18:13'),
(27, '연말 감사 고객 행사', 'gift', '연말 고객 감사 특별 행사', '서울', '2026-12-20', '2026-12-22', 100, 68, 0, '/images/events/event27.jpg', 0, 'open', '2026-02-18 12:18:13');

INSERT INTO experiences (id, title, category, description, location, duration, price, max_participants, difficulty, image_url, is_featured, status, included_items, created_at) VALUES 
(1, '제주 차밭 트레킹', 'tea', '제주 한라산 차밭 트레킹과 차 시음', '제주도', '3시간', 45000, 20, 'easy', '/images/exp/exp1.jpg', 1, 'available', '가이드, 차 시음, 다과', '2026-02-18 12:18:13'),
(2, '하동 차 만들기 체험', 'tea', '전통 방식으로 차 만들기', '경남 하동', '4시간', 65000, 15, 'medium', '/images/exp/exp2.jpg', 1, 'available', '재료비, 가이드, 완성품 포장', '2026-02-18 12:18:13'),
(3, '이천 도자기 원데이 클래스', 'craft', '물레를 이용한 도자기 만들기', '경기 이천', '5시간', 95000, 10, 'medium', '/images/exp/exp3.jpg', 1, 'available', '재료비, 가이드, 완성품 배송', '2026-02-18 12:18:13'),
(4, '담양 죽제품 만들기', 'craft', '대나무를 이용한 생활용품 제작', '전남 담양', '3시간', 48000, 12, 'easy', '/images/exp/exp4.jpg', 0, 'available', '재료비, 가이드, 완성품', '2026-02-18 12:18:13'),
(5, '전주 한지 공예 체험', 'craft', '전통 한지를 이용한 공예품 만들기', '전북 전주', '3시간', 42000, 15, 'easy', '/images/exp/exp5.jpg', 0, 'available', '재료비, 가이드, 완성품', '2026-02-18 12:18:13'),
(6, '차 명상 힐링 프로그램', 'meditation', '차를 마시며 하는 명상 프로그램', '제주도', '2시간', 55000, 12, 'easy', '/images/exp/exp6.jpg', 1, 'available', '가이드, 차, 다과', '2026-02-18 12:18:13'),
(7, '다도 예절 교육', 'education', '전통 다도 예절 배우기', '서울', '2시간', 40000, 15, 'easy', '/images/exp/exp7.jpg', 1, 'available', '가이드, 교재, 차', '2026-02-18 12:18:13'),
(8, '차와 음식 페어링 클래스', 'tea', '차와 어울리는 음식 조합 배우기', '서울', '3시간', 75000, 12, 'medium', '/images/exp/exp8.jpg', 0, 'available', '가이드, 차, 음식 재료', '2026-02-18 12:18:13'),
(9, '청자 도자기 체험', 'craft', '고려청자 만들기', '전남 강진', '4시간', 72000, 10, 'medium', '/images/exp/exp9.jpg', 1, 'available', '재료비, 가이드, 완성품 배송', '2026-02-18 12:18:13'),
(10, '나전칠기 체험', 'craft', '전통 나전칠기 소품 만들기', '전북 전주', '6시간', 120000, 8, 'hard', '/images/exp/exp10.jpg', 0, 'available', '재료비, 가이드, 완성품', '2026-02-18 12:18:13'),
(11, '차밭 요가 명상', 'meditation', '차밭에서 하는 요가와 명상', '전남 보성', '2시간', 48000, 15, 'easy', '/images/exp/exp11.jpg', 1, 'available', '가이드, 요가매트, 차', '2026-02-18 12:18:13'),
(12, '차 소믈리에 체험', 'education', '다양한 차 감별 및 시음', '서울', '3시간', 85000, 10, 'medium', '/images/exp/exp12.jpg', 0, 'available', '가이드, 교재, 차 샘플', '2026-02-18 12:18:13');

INSERT INTO education_categories (id, parent_id, name, description, display_order, icon, created_at) VALUES 
(1, NULL, '다도교육', '차문화와 명상을 통한 마음의 평안', 1, 'fa-spa', '2026-02-18 12:18:04'),
(2, 1, '차공부', '차의 역사와 문화, 종류와 우리는 방법을 배웁니다', 1, 'fa-mug-hot', '2026-02-18 12:18:04'),
(3, 1, '공예공부', '한국 전통 공예의 역사와 제작 기법을 배웁니다', 2, 'fa-palette', '2026-02-18 12:18:04'),
(4, 1, '다도교육', '다도의 의미와 역사, 명상과 인성교육을 배웁니다', 3, 'fa-spa', '2026-02-18 12:18:06'),
(5, 1, '명상교육', '명상의 역사와 종류, 실천 방법을 배우고 마음의 평안을 찾습니다', 4, 'fa-om', '2026-02-18 13:59:11');

INSERT INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, thumbnail_image, created_at) VALUES 
(1, 2, '차의 역사', '차의 기원부터 현대까지의 역사를 배웁니다', '차의 발견과 전파, 한국 차문화의 발전 과정을 학습합니다', '90분', 'beginner', 1, '/images/curriculum/tea_history.jpg', '2026-02-18 12:18:04'),
(2, 2, '한국차의 역사', '한국 전통차의 역사와 문화적 배경', '삼국시대부터 조선시대까지 한국 차문화의 발전사', '120분', 'intermediate', 2, '/images/curriculum/korean_tea_history.jpg', '2026-02-18 12:18:04'),
(3, 2, '6대 차류', '차의 6가지 분류와 각각의 특징', '녹차, 백차, 황차, 청차, 홍차, 흑차의 분류와 특성', '150분', 'intermediate', 3, '/images/curriculum/six_types.jpg', '2026-02-18 12:18:04'),
(4, 2, '한국차의 종류', '한국 전통차의 다양한 종류', '녹차, 발효차, 가향차 등 한국 차의 분류와 특징', '120분', 'intermediate', 4, '/images/curriculum/korean_tea_types.jpg', '2026-02-18 12:18:04'),
(5, 2, '차의 이로운 점', '차의 건강상 이점과 효능', '차의 성분과 건강 효능, 올바른 섭취 방법', '90분', 'beginner', 5, '/images/curriculum/tea_benefits.jpg', '2026-02-18 12:18:04'),
(6, 2, '6대 차류 우리는 방법', '차 종류별 올바른 우리는 방법', '각 차류별 최적의 온도, 시간, 물의 양', '180분', 'advanced', 6, '/images/curriculum/brewing_methods.jpg', '2026-02-18 12:18:04'),
(7, 3, '공예의 역사', '한국 전통 공예의 역사', '삼국시대 금속공예와 백제 도자기부터 고려청자, 조선백자까지 한국 공예의 발전사를 배웁니다. 각 시대별 대표 공예품과 특징, 제작 기법의 변화를 이해하고 현대 공예와의 연결점을 학습합니다.', '90분', 'beginner', 1, '/images/curriculum/craft_history.jpg', '2026-02-18 12:18:04'),
(8, 3, '한국공예의 시대별 변천사', '시대별 한국 공예의 특징과 변화', '삼국시대의 금속공예와 불교미술, 고려시대의 상감청자와 나전칠기, 조선시대의 백자와 민예품, 근현대의 전통공예 계승까지 시대별 공예 기법과 양식의 변천을 상세히 학습합니다.', '150분', 'intermediate', 2, '/images/curriculum/craft_evolution.jpg', '2026-02-18 12:18:04'),
(9, 3, '도자기의 제작 기법', '전통 도자기 제작 기법', '흙의 선택과 준비, 물레 성형 기법, 초벌구이와 재벌구이, 유약 배합과 시유 기법, 가마의 종류와 소성 온도 조절 등 도자기 제작의 전 과정을 실습과 함께 배웁니다.', '180분', 'advanced', 3, '/images/curriculum/pottery_technique.jpg', '2026-02-18 12:18:04'),
(10, 3, '도자기의 활용법', '도자기의 다양한 활용', '다기(찻잔, 다관, 찻상), 생활용기(밥그릇, 국그릇, 접시), 장식품(화병, 향로, 인형) 등 도자기의 다양한 쓰임새와 각 용도에 맞는 형태와 기능을 학습합니다.', '90분', 'beginner', 4, '/images/curriculum/pottery_usage.jpg', '2026-02-18 12:18:04'),
(11, 3, '도자기의 이로운 점', '도자기 사용의 장점', '원적외선 방출로 음식의 맛을 향상시키고, 유해물질 없는 안전한 식기로서의 가치, 자연 친화적 소재의 환경적 이점, 오래 사용할 수 있는 내구성 등을 학습합니다.', '90분', 'beginner', 5, '/images/curriculum/pottery_benefits.jpg', '2026-02-18 12:18:04'),
(12, 3, '서예의 역사와 발전', '한국 서예의 역사', '한글 서예와 한문 서예의 발전 과정을 학습합니다. 추사 김정희 등 역대 명필의 작품을 감상하고, 서체의 종류(해서, 행서, 초서)와 특징을 이해합니다.', '120분', 'intermediate', 6, '/images/curriculum/calligraphy_history.jpg', '2026-02-18 12:18:04'),
(13, 3, '한국 전통미술과 민화', '민화의 역사와 특징', '민화의 종류(화조도, 책가도, 호작도, 십장생도)와 의미를 배우고, 조선시대 서민들의 염원이 담긴 그림의 상징성을 이해하며, 현대적 해석과 활용 방법을 학습합니다.', '90분', 'intermediate', 7, '/images/curriculum/minhwa.jpg', '2026-02-18 12:18:04'),
(14, 3, '한복의 역사와 아름다움', '한복의 역사와 미학', '한복의 기원과 시대별 변천, 한복의 구조(저고리, 치마, 바지, 두루마기), 오방색과 색상의 상징적 의미, 문양(매화, 연꽃, 용, 봉황)의 뜻과 격식을 배웁니다. 한복의 곡선미와 자연스러운 실루엣이 주는 아름다움을 이해합니다.', '90분', 'beginner', 8, '/images/curriculum/hanbok.jpg', '2026-02-18 12:18:04'),
(15, 3, '한지의 역사와 제조법', '전통 한지의 역사와 제작', '한지의 역사와 우수성, 닥나무 재배부터 껍질 벗기기, 백피 만들기, 고해, 초지, 건조까지 전통 한지 제조 과정을 배웁니다. 한지의 통기성, 보존성, 친환경성 등의 특성과 현대적 활용(벽지, 공예품, 한지등)을 학습합니다.', '120분', 'intermediate', 9, '/images/curriculum/hanji.jpg', '2026-02-18 12:18:04'),
(31, 3, '한지공예 기초', '한지를 활용한 전통 공예', '한지의 종류(순지, 장판지, 창호지)와 특성을 이해하고, 한지 인형, 한지 등, 한지 부채, 지승공예(노리개, 바구니) 등 기초적인 한지공예 기법을 실습합니다. 한지 접기, 꼬기, 감기 등의 기본 기술을 익힙니다.', '150분', 'intermediate', 10, '/images/curriculum/hanji_craft.jpg', '2026-02-18 12:18:04'),
(32, 3, '한지공예 응용', '한지공예 심화 과정', '한지 조형물, 한지 액자, 한지 보자기, 한지 장신구 등 고급 한지공예 작품을 제작합니다. 한지와 다른 재료(나무, 금속, 천)의 조합 기법, 색한지 제작과 염색 기법, 한지의 방수 처리 방법 등을 학습합니다.', '180분', 'advanced', 11, '/images/curriculum/hanji_advanced.jpg', '2026-02-18 12:18:04'),
(33, 3, '한복공예 기초', '한복 만들기의 기초', '한복의 재단과 바느질 기법을 배웁니다. 천 선택(명주, 모시, 삼베, 무명), 치수 재기, 재단하기, 손바느질과 시침질, 감침질, 박음질 등 기본 바느질법을 익히고 간단한 소품(주머니, 노리개, 조바위)을 제작합니다.', '150분', 'intermediate', 12, '/images/curriculum/hanbok_craft.jpg', '2026-02-18 12:18:04'),
(34, 3, '한복공예 응용', '한복 제작 심화 과정', '저고리와 치마/바지의 제작 과정을 실습합니다. 배래와 동정 달기, 깃 달기, 고름 만들기, 단추와 장식 달기 등 한복 제작의 세부 기법을 배우고, 아동 한복이나 생활한복을 완성합니다. 자수와 매듭장식으로 고급스럽게 마무리하는 법을 학습합니다.', '180분', 'advanced', 13, '/images/curriculum/hanbok_advanced.jpg', '2026-02-18 12:18:04'),
(16, 4, '다도의 의미', '다도의 정신과 철학', '차를 통한 수양과 예절의 의미', '120분', 'beginner', 1, '/images/curriculum/dado_meaning.jpg', '2026-02-18 12:18:06'),
(17, 4, '다도의 역사와 시대적 변천사', '한국 다도의 역사적 발전', '시대별 다도 문화의 변화와 특징', '150분', 'intermediate', 2, '/images/curriculum/dado_history.jpg', '2026-02-18 12:18:06'),
(18, 4, '다도의 종류', '다양한 다도의 유형', '한국, 중국, 일본 다도의 특징 비교', '120분', 'intermediate', 3, '/images/curriculum/dado_types.jpg', '2026-02-18 12:18:06'),
(19, 4, '다도와 명상의 효과', '다도를 통한 명상 효과', '마음의 평안과 집중력 향상', '90분', 'beginner', 4, '/images/curriculum/dado_meditation.jpg', '2026-02-18 12:18:06'),
(20, 4, '인성교육으로 다도 명상을 해야하는 이유', '다도를 통한 인성 함양', '예절, 배려, 집중력 등 인성 교육', '150분', 'intermediate', 5, '/images/curriculum/dado_character.jpg', '2026-02-18 12:18:06'),
(21, 4, '다도의 역사와 정신', '다도의 철학적 배경', '선禪과 차의 정신적 연결', '120분', 'intermediate', 7, '/images/curriculum/dado_spirit.jpg', '2026-02-18 12:18:06'),
(22, 4, '다도교육의 이론과 실제', '다도 교육 방법론', '이론 학습과 실습을 통한 다도 교육', '150분', 'advanced', 8, '/images/curriculum/dado_practice.jpg', '2026-02-18 12:18:06'),
(23, 5, '호흡 명상', '호흡을 통한 명상', '올바른 호흡법과 명상 실습', '45분', 'beginner', 0, '/images/curriculum/breathing.jpg', '2026-02-18 13:59:11'),
(24, 5, '마음챙김 명상', '마음챙김 명상의 이론과 실습', '현재 순간에 집중하는 명상', '60분', 'intermediate', 0, '/images/curriculum/mindfulness.jpg', '2026-02-18 13:59:11'),
(25, 5, '차 명상', '차를 마시며 하는 명상', '차를 통한 오감 명상', '90분', 'intermediate', 0, '/images/curriculum/tea_meditation.jpg', '2026-02-18 13:59:11'),
(26, 5, '요가와 명상', '요가 동작과 명상의 결합', '몸과 마음을 함께 다스리는 명상', '75분', 'intermediate', 0, '/images/curriculum/yoga_meditation.jpg', '2026-02-18 13:59:11'),
(27, 5, '명상의 역사', '명상의 기원과 발전', '동서양 명상의 역사와 철학', '90분', 'beginner', 1, '/images/curriculum/meditation_history.jpg', '2026-02-18 13:59:11'),
(28, 5, '명상의 종류와 실천', '다양한 명상법', '호흡명상, 선명상, 위빠사나 등', '150분', 'intermediate', 2, '/images/curriculum/meditation_types.jpg', '2026-02-18 13:59:11'),
(29, 5, '명상의 정의와 원리', '명상의 본질과 작용 원리', '명상이 뇌와 신체에 미치는 영향', '60분', 'beginner', 2, '/images/curriculum/meditation_principle.jpg', '2026-02-18 13:59:11'),
(30, 5, '일상 속 명상 실천', '바쁜 일상 속 명상 적용', '짧은 시간으로 하는 실용적 명상법', '45분', 'beginner', 3, '/images/curriculum/daily_meditation.jpg', '2026-02-18 13:59:11');`;
  
  return c.text(sql, 200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Disposition': 'inline; filename="COPY_THIS.sql"'
  })
})

// 네이버 사이트 소유 확인 파일 (구버전)
app.get('/naverf3735d7a56c13e617b246ff2b6e0da46.html', (c) => {
  return c.text('naver-site-verification: naverf3735d7a56c13e617b246ff2b6e0da46.html', 200, {
    'Content-Type': 'text/html; charset=utf-8'
  })
})

// 네이버 사이트 소유 확인 파일 (신규 - dagong-bi1.pages.dev)
app.get('/navere1b82926e3746b15d5a96506bba49b8f.html', (c) => {
  return c.text('naver-site-verification: navere1b82926e3746b15d5a96506bba49b8f.html', 200, {
    'Content-Type': 'text/html; charset=utf-8'
  })
})

// 구글 사이트 소유 확인 파일
app.get('/googleee4e97dad940b617.html', (c) => {
  return c.text('google-site-verification: googleee4e97dad940b617.html', 200, {
    'Content-Type': 'text/html; charset=utf-8'
  })
})

// 관리자 페이지
app.get('/admin', (c) => {
  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>다공 관리자</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <div class="min-h-screen p-4 md:p-8">
        <div class="max-w-6xl mx-auto">
            <!-- 헤더 -->
            <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900 mb-2">
                            <i class="fas fa-leaf text-green-600 mr-2"></i>
                            다공 관리자
                        </h1>
                        <p class="text-gray-600">자동 배포 시스템 v2.1</p>
                    </div>
                    <a href="/" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        <i class="fas fa-home mr-2"></i>사이트로
                    </a>
                </div>
            </div>

            <!-- 자동 배포 안내 -->
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 mb-6 text-white">
                <div class="flex items-start space-x-4">
                    <i class="fas fa-rocket text-5xl opacity-80"></i>
                    <div class="flex-1">
                        <h2 class="text-2xl font-bold mb-3">✨ 자동 배포 시스템 활성화!</h2>
                        <p class="text-blue-100 mb-4">
                            이제 코드를 수정하고 GitHub에 푸시하기만 하면 자동으로 사이트가 업데이트됩니다!
                        </p>
                        <div class="bg-blue-700 bg-opacity-50 rounded-lg p-4 space-y-2">
                            <p class="font-medium">📝 업데이트 방법:</p>
                            <ol class="list-decimal list-inside space-y-1 text-sm text-blue-50">
                                <li>코드 수정</li>
                                <li>Git에 커밋: <code class="bg-blue-800 px-2 py-0.5 rounded">git add . && git commit -m "업데이트"</code></li>
                                <li>GitHub에 푸시: <code class="bg-blue-800 px-2 py-0.5 rounded">git push origin main</code></li>
                                <li>자동으로 배포됨 (2-3분 소요)</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 빠른 링크 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <a href="https://github.com/healingcafe1-prog/dagong/actions" target="_blank" 
                   class="bg-white hover:bg-gray-50 border rounded-lg p-6 text-center transition group">
                    <i class="fab fa-github text-4xl text-gray-800 mb-3 group-hover:scale-110 transition"></i>
                    <p class="font-bold text-gray-900">GitHub Actions</p>
                    <p class="text-xs text-gray-500 mt-1">배포 상태 확인</p>
                </a>

                <a href="https://dash.cloudflare.com/pages" target="_blank" 
                   class="bg-white hover:bg-gray-50 border rounded-lg p-6 text-center transition group">
                    <i class="fas fa-cloud text-4xl text-orange-500 mb-3 group-hover:scale-110 transition"></i>
                    <p class="font-bold text-gray-900">Cloudflare Pages</p>
                    <p class="text-xs text-gray-500 mt-1">배포 관리</p>
                </a>

                <a href="https://dash.cloudflare.com" target="_blank" 
                   class="bg-white hover:bg-gray-50 border rounded-lg p-6 text-center transition group">
                    <i class="fas fa-database text-4xl text-purple-600 mb-3 group-hover:scale-110 transition"></i>
                    <p class="font-bold text-gray-900">D1 Database</p>
                    <p class="text-xs text-gray-500 mt-1">DB 관리</p>
                </a>

                <a href="https://dagong.co.kr" target="_blank" 
                   class="bg-white hover:bg-gray-50 border rounded-lg p-6 text-center transition group">
                    <i class="fas fa-globe text-4xl text-green-600 mb-3 group-hover:scale-110 transition"></i>
                    <p class="font-bold text-gray-900">사이트 보기</p>
                    <p class="text-xs text-gray-500 mt-1">dagong.co.kr</p>
                </a>
            </div>

            <!-- 환경 변수 설정 -->
            <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-key text-yellow-600 mr-2"></i>
                    환경 변수 설정 (필수)
                </h3>
                <p class="text-gray-600 mb-4">
                    소셜 로그인이 작동하려면 Cloudflare Pages에서 환경 변수를 설정해야 합니다.
                </p>
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p class="text-sm text-yellow-800 font-medium mb-2">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        설정하지 않으면 로그인 기능이 작동하지 않습니다!
                    </p>
                </div>
                <div class="space-y-2 mb-4">
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <code class="text-sm">KAKAO_CLIENT_ID</code>
                        <span class="text-xs text-gray-500">카카오 REST API 키</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <code class="text-sm">KAKAO_CLIENT_SECRET</code>
                        <span class="text-xs text-gray-500">카카오 시크릿 키</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <code class="text-sm">GOOGLE_CLIENT_ID</code>
                        <span class="text-xs text-gray-500">구글 클라이언트 ID</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <code class="text-sm">GOOGLE_CLIENT_SECRET</code>
                        <span class="text-xs text-gray-500">구글 시크릿</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <code class="text-sm">NAVER_CLIENT_ID</code>
                        <span class="text-xs text-gray-500">네이버 클라이언트 ID</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <code class="text-sm">NAVER_CLIENT_SECRET</code>
                        <span class="text-xs text-gray-500">네이버 시크릿</span>
                    </div>
                </div>
                <a href="https://dash.cloudflare.com" target="_blank" 
                   class="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center px-4 py-3 rounded-lg font-medium">
                    <i class="fas fa-cog mr-2"></i>
                    Cloudflare에서 환경 변수 설정하기
                </a>
            </div>

            <!-- GitHub Secrets 설정 -->
            <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fab fa-github text-gray-800 mr-2"></i>
                    GitHub Secrets 설정 (자동 배포용)
                </h3>
                <p class="text-gray-600 mb-4">
                    자동 배포가 작동하려면 GitHub Repository Secrets를 설정해야 합니다.
                </p>
                <div class="space-y-2 mb-4">
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <code class="text-sm">CLOUDFLARE_API_TOKEN</code>
                        <span class="text-xs text-green-600 font-medium">
                            <i class="fas fa-check-circle mr-1"></i>설정됨
                        </span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <code class="text-sm">CLOUDFLARE_ACCOUNT_ID</code>
                        <span class="text-xs text-gray-500">ecc65d2ec1ecc2222db7937965158511</span>
                    </div>
                </div>
                <a href="https://github.com/healingcafe1-prog/dagong/settings/secrets/actions" target="_blank" 
                   class="block w-full bg-gray-800 hover:bg-gray-900 text-white text-center px-4 py-3 rounded-lg font-medium">
                    <i class="fab fa-github mr-2"></i>
                    GitHub Secrets 관리
                </a>
            </div>

            <!-- 최근 업데이트 -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                    <i class="fas fa-history text-indigo-600 mr-2"></i>
                    최근 업데이트
                </h3>
                <div class="space-y-3">
                    <div class="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <i class="fas fa-check-circle text-green-600 mt-1"></i>
                        <div>
                            <p class="font-medium text-gray-900">자동 배포 시스템 구축</p>
                            <p class="text-sm text-gray-600">GitHub Actions + Cloudflare Pages</p>
                            <p class="text-xs text-gray-500 mt-1">2026-04-25</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <i class="fas fa-check-circle text-blue-600 mt-1"></i>
                        <div>
                            <p class="font-medium text-gray-900">사용자 인증 시스템 수정</p>
                            <p class="text-sm text-gray-600">카카오/구글/네이버 로그인 및 친구초대</p>
                            <p class="text-xs text-gray-500 mt-1">2026-04-25</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <i class="fas fa-check-circle text-purple-600 mt-1"></i>
                        <div>
                            <p class="font-medium text-gray-900">새로운 콘텐츠 추가</p>
                            <p class="text-sm text-gray-600">박람회, 프리마켓, 고급 다도, 승마체험</p>
                            <p class="text-xs text-gray-500 mt-1">2026-04-25</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
  
  return c.html(html)
})

// robots.txt 서빙
app.get('/robots.txt', (c) => {
  // 요청의 호스트를 기반으로 사이트맵 URL 생성
  const protocol = c.req.header('x-forwarded-proto') || 'https'
  const host = c.req.header('host') || 'dagong-bi1.pages.dev'
  const sitemapUrl = `${protocol}://${host}/sitemap.xml`
  
  return c.text(`User-agent: *
Allow: /

Sitemap: ${sitemapUrl}`, 200, {
    'Content-Type': 'text/plain; charset=utf-8'
  })
})

// PWA Manifest 서빙
app.get('/manifest.json', (c) => {
  return c.json({
    name: '다공(茶工) - 차 생산자 직거래 플랫폼',
    short_name: '다공',
    description: '차 생산자와 소비자를 직접 연결하는 직거래 플랫폼. 차 직거래, 공예품, 체험 교육을 제공합니다.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#059669',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      { src: '/static/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: '/static/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
    ],
    categories: ['shopping', 'lifestyle', 'business'],
    prefer_related_applications: false
  })
})

// Digital Asset Links for Android TWA
app.get('/.well-known/assetlinks.json', (c) => {
  return c.json([{
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'kr.co.dagong',
      sha256_cert_fingerprints: [
        '여기에_실제_SHA256_지문을_입력하세요'
      ]
    }
  }])
})

// sitemap.xml 서빙 (간단 버전)
app.get('/sitemap.xml', (c) => {
  // 요청의 호스트를 기반으로 baseUrl 동적 생성
  const protocol = c.req.header('x-forwarded-proto') || 'https'
  const host = c.req.header('host') || 'dagong-bi1.pages.dev'
  const baseUrl = `${protocol}://${host}`
  const today = new Date().toISOString().split('T')[0]
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/products</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/products?type=tea</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/products?type=craft</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/regions</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/producers</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/experiences</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/education/apply</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/education/curriculum</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/events</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`

  return c.text(xml, 200, {
    'Content-Type': 'application/xml; charset=utf-8'
  })
})

// PWA 파일 서빙
app.get('/manifest.json', async (c) => {
  const manifestData = {
    name: "다공 - 차와 공예의 직거래 플랫폼",
    short_name: "다공",
    description: "전통 차와 공예품을 생산자와 직거래하는 모바일 플랫폼. 소비자가와 직거래가로 최대 50% 절약하세요.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1e8",
    theme_color: "#7c9473",
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      { src: "/static/icons/icon-72x72.png", sizes: "72x72", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-96x96.png", sizes: "96x96", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-128x128.png", sizes: "128x128", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-144x144.png", sizes: "144x144", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-152x152.png", sizes: "152x152", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-192x192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
      { src: "/static/icons/icon-384x384.png", sizes: "384x384", type: "image/png", purpose: "any" },
      { src: "/static/icons/icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
    ],
    screenshots: [
      { src: "/static/screenshots/screenshot-mobile.png", sizes: "540x720", type: "image/png", form_factor: "narrow", label: "홈 화면" },
      { src: "/static/screenshots/screenshot-products.png", sizes: "540x720", type: "image/png", form_factor: "narrow", label: "상품 목록" }
    ],
    categories: ["shopping", "food", "lifestyle"],
    lang: "ko-KR",
    dir: "ltr",
    prefer_related_applications: false,
    related_applications: [
      {
        platform: "play",
        url: "https://play.google.com/store/apps/details?id=kr.co.dagong.twa",
        id: "kr.co.dagong.twa"
      }
    ],
    share_target: {
      action: "/share",
      method: "POST",
      enctype: "multipart/form-data",
      params: {
        title: "title",
        text: "text",
        url: "url"
      }
    }
  }
  return c.json(manifestData)
})

// 렌더러 미들웨어
app.use(renderer)

// ===== API 라우트 =====

// 지역 목록 조회 API
app.get('/api/regions', async (c) => {
  const type = c.req.query('type') // 'tea', 'craft', 'fair', 'freemarket'
  
  let query = 'SELECT * FROM regions'
  const params: string[] = []
  
  if (type) {
    if (type === 'fair') {
      // '한국차공예품박람회'로 필터링
      query += ' WHERE name = ?'
      params.push('한국차공예품박람회')
    } else if (type === 'freemarket') {
      // '프리마켓'으로 필터링
      query += ' WHERE name = ?'
      params.push('프리마켓')
    } else {
      // 'tea' 또는 'craft' type으로 필터링 (단, 박람회/프리마켓 제외)
      query += ' WHERE type = ? AND name NOT IN (?, ?)'
      params.push(type, '한국차공예품박람회', '프리마켓')
    }
  }
  
  query += ' ORDER BY id'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ regions: results })
})

// 특정 지역 상세 조회 API
app.get('/api/regions/:id', async (c) => {
  const id = c.req.param('id')
  
  const region = await c.env.DB.prepare(
    'SELECT * FROM regions WHERE id = ?'
  ).bind(id).first()
  
  if (!region) {
    return c.json({ error: '지역을 찾을 수 없습니다' }, 404)
  }
  
  // 해당 지역의 생산자 목록
  const { results: producers } = await c.env.DB.prepare(
    'SELECT * FROM producers WHERE region_id = ?'
  ).bind(id).all()
  
  // 해당 지역의 관광지
  const { results: attractions } = await c.env.DB.prepare(
    'SELECT * FROM attractions WHERE region_id = ?'
  ).bind(id).all()
  
  return c.json({ 
    region, 
    producers,
    attractions
  })
})

// 생산자 목록 조회 API
app.get('/api/producers', async (c) => {
  const type = c.req.query('type')
  const regionId = c.req.query('region_id')
  
  let query = `
    SELECT p.*, r.name as region_name 
    FROM producers p 
    LEFT JOIN regions r ON p.region_id = r.id
    WHERE 1=1
  `
  const params: string[] = []
  
  if (type) {
    query += ' AND p.producer_type = ?'
    params.push(type)
  }
  
  if (regionId) {
    query += ' AND p.region_id = ?'
    params.push(regionId)
  }
  
  query += ' ORDER BY p.id'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ producers: results })
})

// 특정 생산자 상세 조회 API
app.get('/api/producers/:id', async (c) => {
  const id = c.req.param('id')
  
  const producer = await c.env.DB.prepare(`
    SELECT p.*, r.name as region_name 
    FROM producers p 
    LEFT JOIN regions r ON p.region_id = r.id
    WHERE p.id = ?
  `).bind(id).first()
  
  if (!producer) {
    return c.json({ error: '생산자를 찾을 수 없습니다' }, 404)
  }
  
  // 해당 생산자의 상품 목록
  const { results: products } = await c.env.DB.prepare(
    'SELECT * FROM products WHERE producer_id = ? AND is_available = 1'
  ).bind(id).all()
  
  return c.json({ producer, products })
})

// 판매자 정보 등록 (사업자/개인 구분) - 로그인 필수
app.post('/api/producers', authMiddleware, async (c) => {
  const data = await c.req.json()
  const user = c.get('user') as any
  
  // 이미 판매자 정보가 있는지 확인
  const existingProducer = await c.env.DB.prepare(
    'SELECT id FROM producers WHERE user_id = ?'
  ).bind(user.user_id).first()
  
  if (existingProducer) {
    return c.json({ 
      error: '이미 판매자 정보가 등록되어 있습니다',
      producer_id: (existingProducer as any).id 
    }, 400)
  }
  
  // seller_type 검증: 'business' 또는 'individual'
  const sellerType = data.seller_type || 'individual'
  if (!['business', 'individual'].includes(sellerType)) {
    return c.json({ error: 'seller_type은 business 또는 individual이어야 합니다' }, 400)
  }
  
  // 사업자인 경우 필수 필드 검증
  if (sellerType === 'business') {
    if (!data.business_registration_number) {
      return c.json({ error: '사업자등록번호는 필수입니다' }, 400)
    }
    if (!data.business_name) {
      return c.json({ error: '상호명은 필수입니다' }, 400)
    }
    if (!data.representative_name) {
      return c.json({ error: '대표자명은 필수입니다' }, 400)
    }
  }
  
  // 개인인 경우 필수 필드 검증
  if (sellerType === 'individual') {
    if (!data.personal_id_number) {
      return c.json({ error: '주민등록번호는 필수입니다' }, 400)
    }
    if (!data.mobile_phone) {
      return c.json({ error: '휴대폰 번호는 필수입니다' }, 400)
    }
    if (!data.personal_email) {
      return c.json({ error: '이메일은 필수입니다' }, 400)
    }
  }
  
  // 공통 필수 필드
  const accountHolder = data.account_holder_name || data.account_holder;
  const accountNumber = data.bank_account_number || data.account_number;
  
  if (!data.bank_name || !accountNumber || !accountHolder) {
    return c.json({ error: '은행명, 계좌번호, 예금주명은 필수입니다' }, 400)
  }
  
  try {
    const result = await c.env.DB.prepare(`
      INSERT INTO producers (
        user_id, name, region_id, producer_type, description, profile_image,
        contact_phone, contact_email, address,
        seller_type,
        business_registration_number, business_name, representative_name,
        business_address, business_phone,
        personal_id_number, mobile_phone, personal_address, personal_zipcode, personal_email,
        bank_name, account_number, account_holder,
        is_verified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      user.user_id,
      data.name,
      data.region_id || null,
      data.producer_type || 'both',
      data.description || null,
      data.profile_image || null,
      data.phone || data.contact_phone || null,
      data.email || data.contact_email || null,
      data.address || null,
      sellerType,
      sellerType === 'business' ? (data.business_registration_number || null) : null,
      sellerType === 'business' ? (data.business_name || null) : null,
      sellerType === 'business' ? (data.representative_name || null) : null,
      sellerType === 'business' ? (data.business_address || null) : null,
      sellerType === 'business' ? (data.business_phone || null) : null,
      sellerType === 'individual' ? (data.personal_id_number || null) : null,
      sellerType === 'individual' ? (data.mobile_phone || null) : null,
      sellerType === 'individual' ? (data.personal_address || null) : null,
      sellerType === 'individual' ? (data.personal_zipcode || null) : null,
      sellerType === 'individual' ? (data.personal_email || null) : null,
      data.bank_name,
      accountNumber,
      accountHolder,
      0 // is_verified: 기본값 0 (미인증)
    ).run()
    
    return c.json({ 
      success: true, 
      producer_id: result.meta.last_row_id,
      message: '판매자 정보가 등록되었습니다. 관리자 승인 후 상품 등록이 가능합니다.'
    })
  } catch (error: any) {
    return c.json({ error: '판매자 등록 실패: ' + error.message }, 500)
  }
})

// 판매자 정보 수정
app.put('/api/producers/:id', async (c) => {
  const producerId = c.req.param('id')
  const data = await c.req.json()
  
  // seller_type 검증 (변경 가능)
  if (data.seller_type && !['business', 'individual'].includes(data.seller_type)) {
    return c.json({ error: 'seller_type은 business 또는 individual이어야 합니다' }, 400)
  }
  
  // 기존 판매자 정보 조회
  const existingProducer = await c.env.DB.prepare(
    'SELECT seller_type FROM producers WHERE id = ?'
  ).bind(producerId).first()
  
  if (!existingProducer) {
    return c.json({ error: '판매자를 찾을 수 없습니다' }, 404)
  }
  
  const sellerType = data.seller_type || existingProducer.seller_type
  
  try {
    await c.env.DB.prepare(`
      UPDATE producers SET
        name = COALESCE(?, name),
        region_id = COALESCE(?, region_id),
        producer_type = COALESCE(?, producer_type),
        description = COALESCE(?, description),
        profile_image = COALESCE(?, profile_image),
        contact_phone = COALESCE(?, contact_phone),
        contact_email = COALESCE(?, contact_email),
        address = COALESCE(?, address),
        seller_type = COALESCE(?, seller_type),
        business_registration_number = ?,
        business_name = ?,
        representative_name = ?,
        business_address = ?,
        business_phone = ?,
        personal_id_number = ?,
        mobile_phone = ?,
        personal_address = ?,
        personal_zipcode = ?,
        personal_email = ?,
        bank_name = COALESCE(?, bank_name),
        account_number = COALESCE(?, account_number),
        account_holder = COALESCE(?, account_holder),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      data.name || null,
      data.region_id || null,
      data.producer_type || null,
      data.description || null,
      data.profile_image || null,
      data.phone || data.contact_phone || null,
      data.email || data.contact_email || null,
      data.address || null,
      data.seller_type || null,
      sellerType === 'business' ? data.business_registration_number : null,
      sellerType === 'business' ? data.business_name : null,
      sellerType === 'business' ? data.representative_name : null,
      sellerType === 'business' ? data.business_address : null,
      sellerType === 'business' ? data.business_phone : null,
      sellerType === 'individual' ? data.personal_id_number : null,
      sellerType === 'individual' ? data.mobile_phone : null,
      sellerType === 'individual' ? data.personal_address : null,
      sellerType === 'individual' ? data.personal_zipcode : null,
      sellerType === 'individual' ? data.personal_email : null,
      data.bank_name || null,
      data.bank_account_number || data.account_number || null,
      data.account_holder_name || data.account_holder || null,
      producerId
    ).run()
    
    return c.json({ success: true, message: '판매자 정보가 수정되었습니다.' })
  } catch (error: any) {
    return c.json({ error: '판매자 정보 수정 실패: ' + error.message }, 500)
  }
})

// 상품 목록 조회 API
app.get('/api/products', async (c) => {
  const type = c.req.query('type')
  const categoryId = c.req.query('category_id')
  const featured = c.req.query('featured')
  const search = c.req.query('search')
  const limit = c.req.query('limit') || '20'
  const offset = c.req.query('offset') || '0'
  
  let query = `
    SELECT p.*, c.name as category_name, pr.name as producer_name, r.name as region_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN producers pr ON p.producer_id = pr.id
    LEFT JOIN regions r ON pr.region_id = r.id
    WHERE p.is_available = 1
  `
  const params: any[] = []
  
  if (type) {
    query += ' AND p.product_type = ?'
    params.push(type)
  }
  
  if (categoryId) {
    query += ' AND p.category_id = ?'
    params.push(categoryId)
  }
  
  if (featured === 'true') {
    query += ' AND p.is_featured = 1'
  }
  
  if (search) {
    query += ' AND (p.name LIKE ? OR p.description LIKE ?)'
    params.push(`%${search}%`, `%${search}%`)
  }
  
  query += ' ORDER BY p.is_featured DESC, p.created_at DESC LIMIT ? OFFSET ?'
  params.push(parseInt(limit), parseInt(offset))
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ products: results })
})

// 특정 상품 상세 조회 API
app.get('/api/products/:id', async (c) => {
  const id = c.req.param('id')
  
  const product = await c.env.DB.prepare(`
    SELECT p.*, c.name as category_name, pr.name as producer_name, 
           pr.description as producer_description, r.name as region_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN producers pr ON p.producer_id = pr.id
    LEFT JOIN regions r ON pr.region_id = r.id
    WHERE p.id = ?
  `).bind(id).first()
  
  if (!product) {
    return c.json({ error: '상품을 찾을 수 없습니다' }, 404)
  }
  
  // 조회수 증가
  await c.env.DB.prepare(
    'UPDATE products SET view_count = view_count + 1 WHERE id = ?'
  ).bind(id).run()
  
  // 상품 이미지 목록
  const { results: images } = await c.env.DB.prepare(
    'SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order'
  ).bind(id).all()
  
  // 선물세트인 경우 구성품 조회
  let giftSetItems = []
  if (product.product_type === 'gift_set') {
    const { results } = await c.env.DB.prepare(`
      SELECT p.*, gsi.quantity
      FROM gift_set_items gsi
      LEFT JOIN products p ON gsi.product_id = p.id
      WHERE gsi.gift_set_id = ?
    `).bind(id).all()
    giftSetItems = results
  }
  
  return c.json({ product, images, giftSetItems })
})

// 카테고리 목록 조회 API
app.get('/api/categories', async (c) => {
  const type = c.req.query('type')
  
  let query = 'SELECT * FROM categories WHERE parent_id IS NULL'
  const params: string[] = []
  
  if (type) {
    query += ' AND type = ?'
    params.push(type)
  }
  
  // display_order 컬럼으로 정렬 (없으면 id로 정렬)
  query += ' ORDER BY display_order, id'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ categories: results })
})

// 이벤트 목록 조회 API
app.get('/api/events', async (c) => {
  try {
    const active = c.req.query('active')
    const month = c.req.query('month')
    const limitParam = c.req.query('limit')
    const limit = limitParam ? parseInt(limitParam) : 30
    
    let query = `SELECT * FROM events`
    const params: (string | number)[] = []
    let whereAdded = false
    
    // 활성 상태 필터링
    if (active === 'true' || active === undefined) {
      query += ' WHERE is_active = 1'
      whereAdded = true
    } else if (active === 'false') {
      query += ' WHERE is_active = 0'
      whereAdded = true
    }
    
    // 월별 필터링
    if (month) {
      query += whereAdded ? ' AND' : ' WHERE'
      query += ' month = ?'
      params.push(parseInt(month))
      whereAdded = true
    }
    
    // 우선순위와 월 순으로 정렬
    query += ' ORDER BY month ASC, priority DESC, start_date ASC LIMIT ?'
    params.push(limit)
    
    const { results } = await c.env.DB.prepare(query).bind(...params).all()
    
    return c.json({ events: results || [] })
  } catch (error) {
    console.error('Events API error:', error)
    // 에러 발생 시 빈 배열 반환 (홈페이지가 로드되도록)
    return c.json({ events: [] })
  }
})

// 특정 이벤트 상세 조회 API
app.get('/api/events/:id', async (c) => {
  const id = c.req.param('id')
  
  const event = await c.env.DB.prepare(
    'SELECT * FROM events WHERE id = ?'
  ).bind(id).first()
  
  if (!event) {
    return c.json({ error: '이벤트를 찾을 수 없습니다' }, 404)
  }
  
  return c.json({ event })
})

// 관광지 목록 조회 API
app.get('/api/attractions', async (c) => {
  const regionId = c.req.query('region_id')
  const type = c.req.query('type')
  
  let query = `
    SELECT a.*, r.name as region_name
    FROM attractions a
    LEFT JOIN regions r ON a.region_id = r.id
    WHERE 1=1
  `
  const params: string[] = []
  
  if (regionId) {
    query += ' AND a.region_id = ?'
    params.push(regionId)
  }
  
  if (type) {
    query += ' AND a.attraction_type = ?'
    params.push(type)
  }
  
  query += ' ORDER BY a.id'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ attractions: results })
})

// 체험 프로그램 목록 조회 API
app.get('/api/experiences', async (c) => {
  const type = c.req.query('type')
  const regionId = c.req.query('region_id')
  
  let query = `
    SELECT e.*, r.name as region_name, p.name as producer_name
    FROM experiences e
    LEFT JOIN regions r ON e.region_id = r.id
    LEFT JOIN producers p ON e.producer_id = p.id
    WHERE e.is_available = 1
  `
  const params: string[] = []
  
  if (type) {
    query += ' AND e.experience_type = ?'
    params.push(type)
  }
  
  if (regionId) {
    query += ' AND e.region_id = ?'
    params.push(regionId)
  }
  
  query += ' ORDER BY e.id'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ experiences: results })
})

// 특정 체험 상세 조회 API
app.get('/api/experiences/:id', async (c) => {
  const id = c.req.param('id')
  
  const experience = await c.env.DB.prepare(`
    SELECT e.*, r.name as region_name, p.name as producer_name
    FROM experiences e
    LEFT JOIN regions r ON e.region_id = r.id
    LEFT JOIN producers p ON e.producer_id = p.id
    WHERE e.id = ?
  `).bind(id).first()
  
  if (!experience) {
    return c.json({ error: '체험 프로그램을 찾을 수 없습니다' }, 404)
  }
  
  // 예약 가능한 일정 목록
  const { results: schedules } = await c.env.DB.prepare(`
    SELECT * FROM experience_schedules 
    WHERE experience_id = ? 
    AND date(schedule_date) >= date('now')
    AND booked_slots < available_slots
    ORDER BY schedule_date, start_time
  `).bind(id).all()
  
  return c.json({ experience, schedules })
})

// 검색 API
app.get('/api/search', async (c) => {
  const q = c.req.query('q')
  
  if (!q) {
    return c.json({ error: '검색어를 입력해주세요' }, 400)
  }
  
  // 상품 검색
  const { results: products } = await c.env.DB.prepare(`
    SELECT p.*, 'product' as result_type
    FROM products p
    WHERE (p.name LIKE ? OR p.description LIKE ?)
    AND p.is_available = 1
    LIMIT 10
  `).bind(`%${q}%`, `%${q}%`).all()
  
  // 생산자 검색
  const { results: producers } = await c.env.DB.prepare(`
    SELECT pr.*, 'producer' as result_type
    FROM producers pr
    WHERE pr.name LIKE ? OR pr.description LIKE ?
    LIMIT 10
  `).bind(`%${q}%`, `%${q}%`).all()
  
  // 지역 검색
  const { results: regions } = await c.env.DB.prepare(`
    SELECT r.*, 'region' as result_type
    FROM regions r
    WHERE r.name LIKE ? OR r.description LIKE ?
    LIMIT 10
  `).bind(`%${q}%`, `%${q}%`).all()
  
  return c.json({ 
    results: {
      products,
      producers,
      regions
    }
  })
})

// ===== 생산자 관리 API =====

// 생산자별 상품 목록 조회
app.get('/api/producers/:id/products', async (c) => {
  const producerId = c.req.param('id')
  
  const { results } = await c.env.DB.prepare(`
    SELECT p.*, c.name as category_name, c.type as category_type
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.producer_id = ?
    ORDER BY p.created_at DESC
  `).bind(producerId).all()
  
  return c.json({ products: results })
})

// 생산자별 체험 목록 조회
app.get('/api/producers/:id/experiences', async (c) => {
  const producerId = c.req.param('id')
  
  const { results } = await c.env.DB.prepare(`
    SELECT e.*, r.name as region_name
    FROM experiences e
    LEFT JOIN regions r ON e.region_id = r.id
    WHERE e.producer_id = ?
    ORDER BY e.created_at DESC
  `).bind(producerId).all()
  
  return c.json({ experiences: results })
})

// 상품 등록
app.post('/api/products', authMiddleware, async (c) => {
  const data = await c.req.json()
  const user = c.get('user') as any
  
  // 판매자 정보 확인
  const producer = await c.env.DB.prepare(
    'SELECT id FROM producers WHERE user_id = ? AND is_verified = 1'
  ).bind(user.user_id).first()
  
  if (!producer) {
    return c.json({ 
      error: '판매자 정보가 없거나 승인되지 않았습니다. 먼저 판매자 정보를 등록하고 승인을 받아주세요.'
    }, 403)
  }
  
  const producerId = (producer as any).id
  
  // 이미지 개수 검증 (최소 5개, 최대 10개)
  const images = data.images || []
  if (images.length < 5) {
    return c.json({ error: '상품 이미지는 최소 5개 이상 등록해야 합니다', min_images: 5 }, 400)
  }
  if (images.length > 10) {
    return c.json({ error: '상품 이미지는 최대 10개까지 등록할 수 있습니다', max_images: 10 }, 400)
  }
  
  // 할인율 검증 (20% ~ 50%)
  const discountRate = data.discount_rate || 30
  if (discountRate < 20 || discountRate > 50) {
    return c.json({ error: '할인율은 20%에서 50% 사이여야 합니다', min: 20, max: 50 }, 400)
  }
  
  // 포인트 적립률 검증 (25% ~ 35%)
  const pointRate = data.point_rate || 35
  if (pointRate < 25 || pointRate > 35) {
    return c.json({ error: '포인트 적립률은 25%에서 35% 사이여야 합니다', min: 25, max: 35 }, 400)
  }
  
  // 새로운 가격 필드 사용: consumer_price, direct_price
  // 하위 호환성을 위해 original_price, price도 유지
  const consumerPrice = data.consumer_price || data.original_price
  const directPrice = data.direct_price || data.price
  
  // 수수료 계산: 플랫폼 6.6% + 카드 3.3% + 세금 3.3% = 총 13.2%
  const platformFeeRate = 6.6
  const cardFeeRate = 3.3
  const taxRate = 3.3
  const totalFeeRate = 13.2
  
  const platformFeeAmount = Math.round(directPrice * (platformFeeRate / 100))
  const cardFeeAmount = Math.round(directPrice * (cardFeeRate / 100))
  const taxAmount = Math.round(directPrice * (taxRate / 100))
  const totalFeeAmount = platformFeeAmount + cardFeeAmount + taxAmount
  const producerRevenue = directPrice - totalFeeAmount
  
  const result = await c.env.DB.prepare(`
    INSERT INTO products (
      name, category_id, producer_id, description, 
      consumer_price, direct_price, original_price, price, discount_rate, point_rate,
      shipping_fee, stock_quantity, 
      platform_fee_rate, card_fee_rate, tax_rate, total_fee_rate,
      platform_fee_amount, card_fee_amount, tax_amount, total_fee_amount, producer_revenue,
      main_image, product_type, weight, origin, is_featured
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.name,
    data.category_id,
    producerId, // 로그인한 사용자의 판매자 ID 사용
    data.description || null,
    consumerPrice,
    directPrice,
    consumerPrice, // 하위 호환성
    directPrice, // 하위 호환성
    discountRate,
    pointRate,
    data.shipping_fee || 3000,
    data.stock_quantity || 0,
    platformFeeRate,
    cardFeeRate,
    taxRate,
    totalFeeRate,
    platformFeeAmount,
    cardFeeAmount,
    taxAmount,
    totalFeeAmount,
    producerRevenue,
    data.main_image || '/images/products/default.jpg',
    data.product_type || null,
    data.weight || null,
    data.origin || null,
    data.is_featured ? 1 : 0
  ).run()
  
  const productId = result.meta.last_row_id
  
  // 상품 이미지 등록 (5~10개)
  for (let i = 0; i < images.length; i++) {
    await c.env.DB.prepare(`
      INSERT INTO product_images (product_id, image_url, display_order)
      VALUES (?, ?, ?)
    `).bind(productId, images[i], i + 1).run()
  }
  
  return c.json({ 
    success: true, 
    product_id: productId,
    images_count: images.length,
    message: '상품이 등록되었습니다'
  })
})

// 상품 수정
app.put('/api/products/:id', async (c) => {
  const productId = c.req.param('id')
  const data = await c.req.json()
  
  // 할인율 검증 (20% ~ 50%)
  const discountRate = data.discount_rate || 30
  if (discountRate < 20 || discountRate > 50) {
    return c.json({ error: '할인율은 20%에서 50% 사이여야 합니다', min: 20, max: 50 }, 400)
  }
  
  const consumerPrice = data.consumer_price || data.original_price
  const directPrice = data.direct_price || data.price
  
  // 수수료 계산: 플랫폼 6.6% + 카드 3.3% + 세금 3.3% = 총 13.2%
  const platformFeeRate = 6.6
  const cardFeeRate = 3.3
  const taxRate = 3.3
  const totalFeeRate = 13.2
  
  const platformFeeAmount = Math.round(directPrice * (platformFeeRate / 100))
  const cardFeeAmount = Math.round(directPrice * (cardFeeRate / 100))
  const taxAmount = Math.round(directPrice * (taxRate / 100))
  const totalFeeAmount = platformFeeAmount + cardFeeAmount + taxAmount
  const producerRevenue = directPrice - totalFeeAmount
  
  await c.env.DB.prepare(`
    UPDATE products 
    SET name = ?, category_id = ?, description = ?,
        consumer_price = ?, direct_price = ?, original_price = ?, price = ?,
        discount_rate = ?, shipping_fee = ?, stock_quantity = ?,
        platform_fee_rate = ?, card_fee_rate = ?, tax_rate = ?, total_fee_rate = ?,
        platform_fee_amount = ?, card_fee_amount = ?, tax_amount = ?, total_fee_amount = ?,
        producer_revenue = ?,
        main_image = ?, weight = ?, origin = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    data.name,
    data.category_id,
    data.description,
    consumerPrice,
    directPrice,
    consumerPrice, // 하위 호환성
    directPrice, // 하위 호환성
    discountRate,
    data.shipping_fee || 3000,
    data.stock_quantity,
    platformFeeRate,
    cardFeeRate,
    taxRate,
    totalFeeRate,
    platformFeeAmount,
    cardFeeAmount,
    taxAmount,
    totalFeeAmount,
    producerRevenue,
    data.main_image,
    data.weight,
    data.origin,
    productId
  ).run()
  
  // 이미지 업데이트 (있을 경우)
  if (data.images && data.images.length > 0) {
    // 이미지 개수 검증 (5~10개)
    if (data.images.length < 5 || data.images.length > 10) {
      return c.json({ 
        error: '상품 이미지는 5개에서 10개 사이여야 합니다', 
        min_images: 5, 
        max_images: 10 
      }, 400)
    }
    
    // 기존 이미지 삭제
    await c.env.DB.prepare('DELETE FROM product_images WHERE product_id = ?')
      .bind(productId).run()
    
    // 새 이미지 등록
    for (let i = 0; i < data.images.length; i++) {
      await c.env.DB.prepare(`
        INSERT INTO product_images (product_id, image_url, display_order)
        VALUES (?, ?, ?)
      `).bind(productId, data.images[i], i + 1).run()
    }
  }
  
  return c.json({ success: true, message: '상품 정보가 수정되었습니다' })
})

// 상품 삭제
app.delete('/api/products/:id', async (c) => {
  const productId = c.req.param('id')
  
  await c.env.DB.prepare(`
    DELETE FROM products WHERE id = ?
  `).bind(productId).run()
  
  return c.json({ success: true })
})

// 체험 등록
app.post('/api/experiences', async (c) => {
  const data = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO experiences (
      name, region_id, producer_id, type, description,
      original_price, price, discount_rate, duration_hours,
      max_participants, image_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    data.name,
    data.region_id,
    data.producer_id,
    data.type,
    data.description,
    data.original_price,
    data.price,
    data.discount_rate || 30,
    data.duration_hours,
    data.max_participants,
    data.image_url || '/images/experiences/default.jpg'
  ).run()
  
  return c.json({ 
    success: true, 
    experience_id: result.meta.last_row_id 
  })
})

// 체험 수정
app.put('/api/experiences/:id', async (c) => {
  const experienceId = c.req.param('id')
  const data = await c.req.json()
  
  await c.env.DB.prepare(`
    UPDATE experiences 
    SET name = ?, type = ?, description = ?,
        original_price = ?, price = ?, discount_rate = ?,
        duration_hours = ?, max_participants = ?, image_url = ?
    WHERE id = ?
  `).bind(
    data.name,
    data.type,
    data.description,
    data.original_price,
    data.price,
    data.discount_rate || 30,
    data.duration_hours,
    data.max_participants,
    data.image_url,
    experienceId
  ).run()
  
  return c.json({ success: true })
})

// 체험 삭제
app.delete('/api/experiences/:id', async (c) => {
  const experienceId = c.req.param('id')
  
  await c.env.DB.prepare(`
    DELETE FROM experiences WHERE id = ?
  `).bind(experienceId).run()
  
  return c.json({ success: true })
})

// 체험 일정 추가
app.post('/api/experience-schedules', async (c) => {
  const data = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO experience_schedules (
      experience_id, date, start_time, available_slots, booked_slots
    ) VALUES (?, ?, ?, ?, ?)
  `).bind(
    data.experience_id,
    data.date,
    data.start_time,
    data.available_slots,
    data.booked_slots || 0
  ).run()
  
  return c.json({ 
    success: true, 
    schedule_id: result.meta.last_row_id 
  })
})

// 체험 일정 삭제
app.delete('/api/experience-schedules/:id', async (c) => {
  const scheduleId = c.req.param('id')
  
  await c.env.DB.prepare(`
    DELETE FROM experience_schedules WHERE id = ?
  `).bind(scheduleId).run()
  
  return c.json({ success: true })
})

// ===== 교육 신청 API =====

// 교육 신청 목록 조회 API
app.get('/api/education-applications', async (c) => {
  const status = c.req.query('status')
  const orgType = c.req.query('org_type')
  const limit = c.req.query('limit') || '50'
  const offset = c.req.query('offset') || '0'
  
  let query = 'SELECT * FROM education_applications WHERE 1=1'
  const params: any[] = []
  
  if (status) {
    query += ' AND status = ?'
    params.push(status)
  }
  
  if (orgType) {
    query += ' AND organization_type = ?'
    params.push(orgType)
  }
  
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
  params.push(parseInt(limit), parseInt(offset))
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ applications: results })
})

// 특정 교육 신청 상세 조회 API
app.get('/api/education-applications/:id', async (c) => {
  const id = c.req.param('id')
  
  const application = await c.env.DB.prepare(
    'SELECT * FROM education_applications WHERE id = ?'
  ).bind(id).first()
  
  if (!application) {
    return c.json({ error: '신청서를 찾을 수 없습니다' }, 404)
  }
  
  return c.json({ application })
})

// 교육 신청 등록 API
app.post('/api/education-applications', async (c) => {
  const body = await c.req.json()
  
  const {
    organization_type,
    organization_name,
    contact_person,
    contact_phone,
    contact_email,
    address,
    participant_count,
    preferred_date,
    preferred_time,
    education_type,
    message
  } = body
  
  // 필수 필드 검증
  if (!organization_type || !organization_name || !contact_person || 
      !contact_phone || !address || !participant_count || !education_type) {
    return c.json({ error: '필수 정보를 모두 입력해주세요' }, 400)
  }
  
  const result = await c.env.DB.prepare(`
    INSERT INTO education_applications (
      organization_type, organization_name, contact_person, contact_phone, 
      contact_email, address, participant_count, preferred_date, preferred_time,
      education_type, message, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `).bind(
    organization_type, organization_name, contact_person, contact_phone,
    contact_email, address, participant_count, preferred_date, preferred_time,
    education_type, message
  ).run()
  
  return c.json({ 
    success: true, 
    id: result.meta.last_row_id,
    message: '교육 신청이 접수되었습니다. 담당자 확인 후 연락드리겠습니다.'
  })
})

// 교육 신청 상태 업데이트 API (관리자용)
app.put('/api/education-applications/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  
  const {
    status,
    approved_date,
    education_start_date,
    education_end_date,
    instructor_name,
    notes
  } = body
  
  await c.env.DB.prepare(`
    UPDATE education_applications 
    SET status = ?,
        approved_date = ?,
        education_start_date = ?,
        education_end_date = ?,
        instructor_name = ?,
        notes = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    status || 'pending',
    approved_date,
    education_start_date,
    education_end_date,
    instructor_name,
    notes,
    id
  ).run()
  
  return c.json({ success: true, message: '신청 정보가 업데이트되었습니다.' })
})

// 교육 통계 API
app.get('/api/education-statistics', async (c) => {
  // 기관별 통계
  const { results: orgStats } = await c.env.DB.prepare(`
    SELECT 
      organization_type,
      COUNT(*) as count
    FROM education_applications
    GROUP BY organization_type
  `).all()
  
  // 상태별 통계
  const { results: statusStats } = await c.env.DB.prepare(`
    SELECT 
      status,
      COUNT(*) as count
    FROM education_applications
    GROUP BY status
  `).all()
  
  // 교육 타입별 통계
  const { results: typeStats } = await c.env.DB.prepare(`
    SELECT 
      education_type,
      COUNT(*) as count
    FROM education_applications
    GROUP BY education_type
  `).all()
  
  return c.json({
    organizationStats: orgStats,
    statusStats: statusStats,
    typeStats: typeStats
  })
})

// 교육 타입별 상태 통계 API
app.get('/api/education/applications/status', async (c) => {
  const educationType = c.req.query('education_type')
  
  if (!educationType) {
    return c.json({ error: 'education_type parameter is required' }, 400)
  }
  
  // 전체 신청 수
  const { results: totalResult } = await c.env.DB.prepare(`
    SELECT COUNT(*) as count
    FROM education_applications
    WHERE education_type = ?
  `).bind(educationType).all()
  
  // 승인 대기 수
  const { results: pendingResult } = await c.env.DB.prepare(`
    SELECT COUNT(*) as count
    FROM education_applications
    WHERE education_type = ? AND status = 'pending'
  `).bind(educationType).all()
  
  // 진행 중 수
  const { results: approvedResult } = await c.env.DB.prepare(`
    SELECT COUNT(*) as count
    FROM education_applications
    WHERE education_type = ? AND status = 'approved'
  `).bind(educationType).all()
  
  // 완료 수
  const { results: completedResult } = await c.env.DB.prepare(`
    SELECT COUNT(*) as count
    FROM education_applications
    WHERE education_type = ? AND status = 'completed'
  `).bind(educationType).all()
  
  // 신청 목록 (최근 10개)
  const { results: recentApplications } = await c.env.DB.prepare(`
    SELECT *
    FROM education_applications
    WHERE education_type = ?
    ORDER BY created_at DESC
    LIMIT 10
  `).bind(educationType).all()
  
  return c.json({
    total: totalResult[0]?.count || 0,
    pending: pendingResult[0]?.count || 0,
    approved: approvedResult[0]?.count || 0,
    completed: completedResult[0]?.count || 0,
    recentApplications: recentApplications
  })
})

// ===== 교육 커리큘럼 API =====

// 교육 카테고리 목록 조회 (차공부, 공예공부)
app.get('/api/education/categories', async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM education_categories 
    ORDER BY display_order ASC
  `).all()
  
  return c.json({ categories: results })
})

// 교육 커리큘럼 목록 조회
app.get('/api/education/curriculum', async (c) => {
  const categoryId = c.req.query('category_id')
  const difficulty = c.req.query('difficulty')
  
  let query = `
    SELECT 
      ec.*,
      cat.name as category_name,
      cat.icon as category_icon
    FROM education_curriculum ec
    LEFT JOIN education_categories cat ON ec.category_id = cat.id
    WHERE 1=1
  `
  const params: any[] = []
  
  if (categoryId) {
    query += ' AND ec.category_id = ?'
    params.push(parseInt(categoryId))
  }
  
  if (difficulty) {
    query += ' AND ec.difficulty = ?'
    params.push(difficulty)
  }
  
  query += ' ORDER BY ec.category_id ASC, ec.display_order ASC'
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  return c.json({ curriculum: results })
})

// 교육 커리큘럼 상세 조회
app.get('/api/education/curriculum/:id', async (c) => {
  const id = c.req.param('id')
  
  const curriculum = await c.env.DB.prepare(`
    SELECT 
      ec.*,
      cat.name as category_name,
      cat.description as category_description,
      cat.icon as category_icon
    FROM education_curriculum ec
    LEFT JOIN education_categories cat ON ec.category_id = cat.id
    WHERE ec.id = ?
  `).bind(id).first()
  
  if (!curriculum) {
    return c.json({ error: '커리큘럼을 찾을 수 없습니다' }, 404)
  }
  
  return c.json({ curriculum })
})

// ===== 프론트엔드 페이지 라우트 =====

// User-Agent 기반 모바일 감지 함수
const isMobile = (userAgent: string) => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
}

// 홈 페이지
app.get('/', async (c) => {
  const userAgent = c.req.header('User-Agent') || ''
  const mobile = isMobile(userAgent)
  
  // 모바일 사용자
  if (mobile) {
    // 최신 20개 상품 가져오기 (SSR)
    const { results: products } = await c.env.DB.prepare(`
      SELECT p.*, c.name as category_name, c.type as category_type,
             pr.name as producer_name, r.name as region_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN producers pr ON p.producer_id = pr.id
      LEFT JOIN regions r ON pr.region_id = r.id
      WHERE p.is_available = 1
      ORDER BY p.is_featured DESC, p.created_at DESC
      LIMIT 20
    `).all()
    
    return c.render(
      <div id="app" class="mobile-app">
        {/* 모바일 전용 헤더 */}
        <div class="mobile-header">
          <a href="/" class="mobile-logo">
            <i class="fas fa-leaf"></i>
            <span>다공</span>
          </a>
          <div class="mobile-header-actions">
            <a href="/login" id="mobileLoginBtn" class="mobile-header-icon">
              <i class="fas fa-user"></i>
            </a>
            <div id="mobileUserMenu" class="mobile-header-icon" style="display: none;">
              <img id="mobileUserAvatar" src="" alt="프로필" class="mobile-avatar"/>
            </div>
            <a href="/cart" class="mobile-header-icon">
              <i class="fas fa-shopping-cart"></i>
              <span id="mobileCartCount" class="cart-badge" style="display: none;">0</span>
            </a>
            <button id="mobileCategoryBtn" class="mobile-header-icon">
              <i class="fas fa-bars"></i>
            </button>
            <button id="mobileLangBtn" class="mobile-lang-btn">
              <i class="fas fa-globe"></i>
            </button>
          </div>
        </div>
        
        {/* 모바일 언어 선택 모달 */}
        <div id="mobileLangModal" class="mobile-lang-modal">
          <div class="mobile-lang-content">
            <div class="mobile-lang-header">
              <h3 class="mobile-lang-title">언어 선택</h3>
              <button id="mobileLangClose" class="mobile-lang-close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="mobile-lang-list">
              <button class="mobile-lang-option" data-lang-mobile="ko">
                <div class="mobile-lang-option-left">
                  <span class="mobile-lang-option-flag">🇰🇷</span>
                  <span class="mobile-lang-option-text">한국어</span>
                </div>
                <span class="mobile-lang-option-code">KO</span>
              </button>
              <button class="mobile-lang-option" data-lang-mobile="en">
                <div class="mobile-lang-option-left">
                  <span class="mobile-lang-option-flag">🇺🇸</span>
                  <span class="mobile-lang-option-text">English</span>
                </div>
                <span class="mobile-lang-option-code">EN</span>
              </button>
              <button class="mobile-lang-option" data-lang-mobile="zh">
                <div class="mobile-lang-option-left">
                  <span class="mobile-lang-option-flag">🇨🇳</span>
                  <span class="mobile-lang-option-text">中文</span>
                </div>
                <span class="mobile-lang-option-code">ZH</span>
              </button>
              <button class="mobile-lang-option" data-lang-mobile="ja">
                <div class="mobile-lang-option-left">
                  <span class="mobile-lang-option-flag">🇯🇵</span>
                  <span class="mobile-lang-option-text">日本語</span>
                </div>
                <span class="mobile-lang-option-code">JA</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* 모바일 카테고리 메뉴 모달 */}
        <div id="mobileCategoryModal" class="mobile-lang-modal">
          <div class="mobile-lang-content">
            <div class="mobile-lang-header">
              <h3 class="mobile-lang-title">카테고리</h3>
              <button id="mobileCategoryClose" class="mobile-lang-close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="mobile-category-list">
              <a href="/products?type=tea" class="mobile-category-option">
                <div class="mobile-category-option-left">
                  <span class="mobile-category-icon">🍵</span>
                  <span class="mobile-category-text">한국차</span>
                </div>
                <i class="fas fa-chevron-right"></i>
              </a>
              <a href="/products?type=craft" class="mobile-category-option">
                <div class="mobile-category-option-left">
                  <span class="mobile-category-icon">🎨</span>
                  <span class="mobile-category-text">공예품</span>
                </div>
                <i class="fas fa-chevron-right"></i>
              </a>
              <a href="/products?type=gift_set" class="mobile-category-option">
                <div class="mobile-category-option-left">
                  <span class="mobile-category-icon">🎁</span>
                  <span class="mobile-category-text">선물세트</span>
                </div>
                <i class="fas fa-chevron-right"></i>
              </a>
              <a href="/products?type=local" class="mobile-category-option">
                <div class="mobile-category-option-left">
                  <span class="mobile-category-icon">🌾</span>
                  <span class="mobile-category-text">지역특산물</span>
                </div>
                <i class="fas fa-chevron-right"></i>
              </a>
              <a href="/regions" class="mobile-category-option">
                <div class="mobile-category-option-left">
                  <span class="mobile-category-icon">📍</span>
                  <span class="mobile-category-text">지역별</span>
                </div>
                <i class="fas fa-chevron-right"></i>
              </a>
              <a href="/producers" class="mobile-category-option">
                <div class="mobile-category-option-left">
                  <span class="mobile-category-icon">👨‍🌾</span>
                  <span class="mobile-category-text">생산자</span>
                </div>
                <i class="fas fa-chevron-right"></i>
              </a>
              <a href="/events" class="mobile-category-option">
                <div class="mobile-category-option-left">
                  <span class="mobile-category-icon">🎉</span>
                  <span class="mobile-category-text">이벤트</span>
                </div>
                <i class="fas fa-chevron-right"></i>
              </a>
              <a href="/experiences" class="mobile-category-option">
                <div class="mobile-category-option-left">
                  <span class="mobile-category-icon">🏃</span>
                  <span class="mobile-category-text">체험</span>
                </div>
                <i class="fas fa-chevron-right"></i>
              </a>
              <a href="/education/curriculum" class="mobile-category-option">
                <div class="mobile-category-option-left">
                  <span class="mobile-category-icon">🎓</span>
                  <span class="mobile-category-text">다도교육</span>
                </div>
                <i class="fas fa-chevron-right"></i>
              </a>
              <a href="/products/new" class="mobile-category-option">
                <div class="mobile-category-option-left">
                  <span class="mobile-category-icon">📝</span>
                  <span class="mobile-category-text">상품등록</span>
                </div>
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* 모바일 히어로 섹션 */}
        <div class="mobile-hero">
          <div class="hero-content">
            <h1 class="hero-title">다공</h1>
            <p class="hero-subtitle">전통 차와 공예의 품격</p>
            <p class="hero-description">생산자와 직접 거래하는 프리미엄 플랫폼</p>
          </div>
        </div>
        
        {/* 주요 액션 버튼 */}
        <div class="quick-actions">
          <a href="/experiences" class="action-button experience">
            <div class="action-icon">🏃</div>
            <div class="action-content">
              <div class="action-title">체험 예약하기</div>
              <div class="action-subtitle">다도, 공예 체험</div>
            </div>
            <i class="fas fa-chevron-right"></i>
          </a>
          <a href="/products/new" class="action-button register">
            <div class="action-icon">📝</div>
            <div class="action-content">
              <div class="action-title">상품 등록하기</div>
              <div class="action-subtitle">AI 상세페이지 생성</div>
            </div>
            <i class="fas fa-chevron-right"></i>
          </a>
        </div>
        
        {/* 카테고리 그리드 - 컬리 스타일 */}
        <div class="category-section">
          <h2 class="category-title">카테고리</h2>
          <div class="category-grid-visual">
            <a href="/products?type=tea" class="category-item">
              <div class="category-image-wrapper">
                <img src="/static/images/category-tea.svg" alt="한국차" class="category-image" />
              </div>
              <span class="category-label">🍵 한국차</span>
            </a>
            <a href="/products?type=craft" class="category-item">
              <div class="category-image-wrapper">
                <img src="/static/images/category-craft.svg" alt="공예품" class="category-image" />
              </div>
              <span class="category-label">🎨 공예품</span>
            </a>
            <a href="/products?type=gift_set" class="category-item">
              <div class="category-image-wrapper">
                <img src="/static/images/category-gift.svg" alt="선물세트" class="category-image" />
              </div>
              <span class="category-label">🎁 선물세트</span>
            </a>
            <a href="/products?type=local" class="category-item">
              <div class="category-image-wrapper">
                <img src="/static/images/category-local.svg" alt="지역특산물" class="category-image" />
              </div>
              <span class="category-label">🌾 지역특산물</span>
            </a>
            <a href="/regions" class="category-item">
              <div class="category-image-wrapper">
                <img src="/static/images/category-region.svg" alt="지역별" class="category-image" />
              </div>
              <span class="category-label">📍 지역별</span>
            </a>
            <a href="/producers" class="category-item">
              <div class="category-image-wrapper">
                <img src="/static/images/category-producer.svg" alt="생산자" class="category-image" />
              </div>
              <span class="category-label">👨‍🌾 생산자</span>
            </a>
            <a href="/events" class="category-item">
              <div class="category-image-wrapper">
                <img src="/static/images/category-event.svg" alt="이벤트" class="category-image" />
              </div>
              <span class="category-label">🎉 이벤트</span>
            </a>
            <a href="/experiences" class="category-item">
              <div class="category-image-wrapper">
                <img src="/static/images/category-experience.svg" alt="체험" class="category-image" />
              </div>
              <span class="category-label">🏃 체험</span>
            </a>
            <a href="/education/curriculum" class="category-item">
              <div class="category-image-wrapper">
                <img src="/static/images/category-education.svg" alt="다도교육" class="category-image" />
              </div>
              <span class="category-label">🎓 다도교육</span>
            </a>
            <a href="/products/new" class="category-item">
              <div class="category-image-wrapper">
                <img src="/static/images/category-register.svg" alt="상품등록" class="category-image" />
              </div>
              <span class="category-label">📝 상품등록</span>
            </a>
          </div>
        </div>
        
        {/* 상품 목록 */}
        <div class="product-section">
          <div class="section-header">
            <h2 class="section-title">추천 상품</h2>
            <a href="/products" class="section-link">전체보기</a>
          </div>
          <div class="product-grid" id="productGrid">
            {products.map((product: any) => (
              <a href={`/products/${product.id}`} class="product-card">
                <div class="product-image">
                  <img src={product.main_image || '/images/placeholder.jpg'} alt={product.name} />
                  {product.discount_rate > 0 && (
                    <div class="discount-badge">{product.discount_rate}%</div>
                  )}
                </div>
                <div class="product-info">
                  <div class="product-category">{product.category_name}</div>
                  <div class="product-name">{product.name}</div>
                  <div class="product-producer">{product.producer_name}</div>
                  <div class="product-price">
                    {product.discount_rate > 0 && (
                      <span class="original-price">{product.original_price?.toLocaleString()}원</span>
                    )}
                    <span class="current-price">{product.price?.toLocaleString()}원</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  // PC 사용자 (기존 방식)
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 상품 목록 페이지
app.get('/products', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// ===== AI 간편 상품 등록 =====
// AI가 자동으로 상세페이지를 생성하는 간편 등록 (사진 5장 + 상품명 + 가격)
app.get('/products/new-simple', async (c) => {
  // 쿠키에서 세션 확인
  const cookies = c.req.header('Cookie') || ''
  const sessionMatch = cookies.match(/session=([^;]+)/)
  
  if (!sessionMatch) {
    return c.redirect('/login?redirect=/products/new-simple')
  }
  
  const sessionToken = sessionMatch[1]
  
  // 세션 유효성 확인
  const { results: sessions } = await c.env.DB.prepare(`
    SELECT us.*, u.id as user_id, u.email, u.name, u.role
    FROM user_sessions us
    JOIN users u ON us.user_id = u.id
    WHERE us.session_token = ? AND us.expires_at > datetime('now')
  `).bind(sessionToken).all()
  
  if (sessions.length === 0) {
    return c.redirect('/login?redirect=/products/new-simple')
  }
  
  const user = sessions[0]
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI 간편 상품 등록 - 다공</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
          }
          .main-container {
            max-width: 800px;
            margin: 0 auto;
          }
          .header-card {
            background: white;
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            margin-bottom: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          }
          .form-card {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          }
          .photo-upload-area {
            border: 3px dashed #cbd5e0;
            border-radius: 16px;
            padding: 40px;
            text-align: center;
            transition: all 0.3s;
            cursor: pointer;
            background: #f7fafc;
          }
          .photo-upload-area:hover {
            border-color: #667eea;
            background: #edf2f7;
          }
          .photo-upload-area.dragover {
            border-color: #667eea;
            background: #e6f2ff;
          }
          .photo-preview {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 15px;
            margin-top: 20px;
          }
          .photo-item {
            position: relative;
            aspect-ratio: 1;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .photo-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .photo-item .remove-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(239, 68, 68, 0.9);
            color: white;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.3s;
          }
          .photo-item .remove-btn:hover {
            background: rgba(220, 38, 38, 1);
            transform: scale(1.1);
          }
          .photo-item .main-badge {
            position: absolute;
            top: 8px;
            left: 8px;
            background: rgba(16, 185, 129, 0.9);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
          }
          .form-group {
            margin-bottom: 25px;
          }
          .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 10px;
            color: #2d3748;
            font-size: 16px;
          }
          .form-group input, .form-group select {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s;
          }
          .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          }
          .ai-badge {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin-left: 10px;
          }
          .btn-generate {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 18px 40px;
            border: none;
            border-radius: 12px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
            margin-top: 20px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          }
          .btn-generate:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
          }
          .btn-generate:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }
          .info-box {
            background: #e6f7ff;
            border-left: 4px solid #1890ff;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
          }
          .info-box p {
            margin: 8px 0;
            color: #0050b3;
          }
          .step-indicator {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
          }
          .step {
            flex: 1;
            text-align: center;
            position: relative;
          }
          .step:not(:last-child)::after {
            content: '';
            position: absolute;
            top: 20px;
            right: -50%;
            width: 100%;
            height: 2px;
            background: #e2e8f0;
            z-index: -1;
          }
          .step-number {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #e2e8f0;
            color: #718096;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            margin-bottom: 10px;
          }
          .step.active .step-number {
            background: #667eea;
            color: white;
          }
          .step-label {
            font-size: 14px;
            color: #718096;
            font-weight: 600;
          }
          .loading-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
            justify-content: center;
            align-items: center;
          }
          .loading-overlay.show {
            display: flex;
          }
          .loading-content {
            background: white;
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            max-width: 400px;
          }
          .spinner {
            border: 4px solid #f3f4f6;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
    </head>
    <body>
        <div class="main-container">
            <!-- 헤더 -->
            <div class="header-card">
                <div style="font-size: 60px; margin-bottom: 20px;">🤖✨</div>
                <h1 style="font-size: 32px; font-weight: 800; color: #2d3748; margin-bottom: 15px;">
                    AI 간편 상품 등록
                </h1>
                <p style="font-size: 18px; color: #718096; line-height: 1.6;">
                    사진 5장만 찍어서 올리고, 상품명과 가격만 입력하세요<br>
                    <strong style="color: #667eea;">AI가 자동으로 멋진 상세페이지를 만들어드립니다!</strong>
                </p>
            </div>

            <!-- 단계 표시 -->
            <div class="form-card">
                <div class="step-indicator">
                    <div class="step active">
                        <div class="step-number">1</div>
                        <div class="step-label">사진 업로드</div>
                    </div>
                    <div class="step active">
                        <div class="step-number">2</div>
                        <div class="step-label">기본 정보</div>
                    </div>
                    <div class="step active">
                        <div class="step-number">3</div>
                        <div class="step-label">AI 생성</div>
                    </div>
                </div>

                <!-- 안내 -->
                <div class="info-box">
                    <p><i class="fas fa-lightbulb mr-2"></i><strong>쉽고 간단해요!</strong></p>
                    <p>📸 상품 사진 5장 (앞, 뒤, 옆, 디테일, 포장)</p>
                    <p>✏️ 상품 이름과 판매 가격만 입력</p>
                    <p>🤖 AI가 자동으로 설명, 특징, 사용법을 작성해드립니다</p>
                </div>

                <form id="simpleProductForm">
                    <!-- 사진 업로드 -->
                    <div class="form-group">
                        <label>
                            <i class="fas fa-camera mr-2"></i>상품 사진 (5장)
                            <span class="ai-badge">AI 분석</span>
                        </label>
                        <div class="photo-upload-area" id="photoUploadArea">
                            <i class="fas fa-cloud-upload-alt" style="font-size: 48px; color: #cbd5e0; margin-bottom: 15px;"></i>
                            <p style="font-size: 18px; font-weight: 600; color: #4a5568; margin-bottom: 10px;">
                                사진을 드래그하거나 클릭해서 업로드하세요
                            </p>
                            <p style="font-size: 14px; color: #a0aec0;">
                                최대 5장까지 (JPG, PNG, HEIC)
                            </p>
                            <input type="file" id="photoInput" accept="image/*,.heic" multiple style="display: none;" />
                        </div>
                        <div class="photo-preview" id="photoPreview"></div>
                    </div>

                    <!-- 상품명 -->
                    <div class="form-group">
                        <label for="productName">
                            <i class="fas fa-tag mr-2"></i>상품 이름
                        </label>
                        <input 
                            type="text" 
                            id="productName" 
                            name="productName" 
                            placeholder="예: 하동 야생차 100g" 
                            required 
                        />
                    </div>

                    <!-- 판매가 -->
                    <div class="form-group">
                        <label for="productPrice">
                            <i class="fas fa-won-sign mr-2"></i>판매 가격 (원)
                        </label>
                        <input 
                            type="number" 
                            id="productPrice" 
                            name="productPrice" 
                            placeholder="예: 35000" 
                            required 
                            min="0"
                            step="1000"
                        />
                    </div>

                    <!-- 카테고리 (선택) -->
                    <div class="form-group">
                        <label for="productCategory">
                            <i class="fas fa-list mr-2"></i>카테고리 (선택사항)
                        </label>
                        <select id="productCategory" name="productCategory">
                            <option value="">AI가 자동으로 선택합니다</option>
                            <option value="tea">차 제품</option>
                            <option value="craft">공예품</option>
                            <option value="gift_set">선물세트</option>
                            <option value="local">지역 특산물</option>
                        </select>
                    </div>

                    <!-- 제출 버튼 -->
                    <button type="submit" class="btn-generate" id="generateBtn">
                        <i class="fas fa-magic mr-3"></i>
                        AI로 상세페이지 자동 생성하기
                    </button>
                </form>

                <!-- 하단 안내 -->
                <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="color: #718096; font-size: 14px;">
                        <i class="fas fa-info-circle mr-2"></i>
                        AI가 생성한 내용은 등록 후 언제든 수정할 수 있습니다
                    </p>
                    <a href="/products/new" style="color: #667eea; text-decoration: underline; font-size: 14px; margin-top: 10px; display: inline-block;">
                        직접 입력하고 싶으신가요? 상세 등록 페이지로 이동
                    </a>
                </div>
            </div>
        </div>

        <!-- 로딩 오버레이 -->
        <div class="loading-overlay" id="loadingOverlay">
            <div class="loading-content">
                <div class="spinner"></div>
                <h3 style="font-size: 24px; font-weight: 700; color: #2d3748; margin-bottom: 15px;">
                    AI가 상세페이지를 생성하고 있습니다
                </h3>
                <p style="color: #718096; font-size: 15px; line-height: 1.6;">
                    사진을 분석하고 멋진 설명을 작성하는 중...<br>
                    <span id="loadingStep">1/3 사진 분석 중</span>
                </p>
            </div>
        </div>

        <script>
            const photoInput = document.getElementById('photoInput');
            const photoUploadArea = document.getElementById('photoUploadArea');
            const photoPreview = document.getElementById('photoPreview');
            const form = document.getElementById('simpleProductForm');
            const generateBtn = document.getElementById('generateBtn');
            const loadingOverlay = document.getElementById('loadingOverlay');
            const loadingStep = document.getElementById('loadingStep');
            
            let uploadedPhotos = [];

            // 사진 업로드 영역 클릭
            photoUploadArea.addEventListener('click', () => {
                photoInput.click();
            });

            // 드래그 앤 드롭
            photoUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                photoUploadArea.classList.add('dragover');
            });

            photoUploadArea.addEventListener('dragleave', () => {
                photoUploadArea.classList.remove('dragover');
            });

            photoUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                photoUploadArea.classList.remove('dragover');
                const files = Array.from(e.dataTransfer.files);
                handleFiles(files);
            });

            // 파일 선택
            photoInput.addEventListener('change', (e) => {
                const files = Array.from(e.target.files);
                handleFiles(files);
            });

            // 파일 처리
            function handleFiles(files) {
                const imageFiles = files.filter(file => file.type.startsWith('image/') || file.name.toLowerCase().endsWith('.heic'));
                
                if (uploadedPhotos.length + imageFiles.length > 5) {
                    alert('최대 5장까지만 업로드할 수 있습니다.');
                    return;
                }

                imageFiles.forEach(file => {
                    if (file.size > 10 * 1024 * 1024) {
                        alert(file.name + '은(는) 10MB를 초과합니다.');
                        return;
                    }

                    uploadedPhotos.push(file);
                    displayPhoto(file);
                });

                updateGenerateButton();
            }

            // 사진 미리보기
            function displayPhoto(file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const photoItem = document.createElement('div');
                    photoItem.className = 'photo-item';
                    
                    const isFirst = uploadedPhotos.length === 1;
                    
                    photoItem.innerHTML = \`
                        \${isFirst ? '<div class="main-badge"><i class="fas fa-star mr-1"></i>대표</div>' : ''}
                        <img src="\${e.target.result}" alt="상품 사진" />
                        <button type="button" class="remove-btn" onclick="removePhoto(\${uploadedPhotos.length - 1})">
                            <i class="fas fa-times"></i>
                        </button>
                    \`;
                    
                    photoPreview.appendChild(photoItem);
                };
                reader.readAsDataURL(file);
            }

            // 사진 삭제
            window.removePhoto = function(index) {
                uploadedPhotos.splice(index, 1);
                photoPreview.innerHTML = '';
                uploadedPhotos.forEach(file => displayPhoto(file));
                updateGenerateButton();
            };

            // 버튼 활성화 체크
            function updateGenerateButton() {
                const hasPhotos = uploadedPhotos.length >= 1 && uploadedPhotos.length <= 5;
                generateBtn.disabled = !hasPhotos;
            }

            // 폼 제출
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const productName = document.getElementById('productName').value.trim();
                const productPrice = document.getElementById('productPrice').value;
                const productCategory = document.getElementById('productCategory').value;

                if (!productName || !productPrice) {
                    alert('상품 이름과 가격을 입력해주세요.');
                    return;
                }

                if (uploadedPhotos.length === 0) {
                    alert('최소 1장의 사진을 업로드해주세요.');
                    return;
                }

                // 로딩 표시
                loadingOverlay.classList.add('show');
                generateBtn.disabled = true;

                try {
                    // 1단계: 사진 업로드
                    loadingStep.textContent = '1/3 사진 업로드 중...';
                    const imageUrls = await uploadImages(uploadedPhotos);

                    // 2단계: AI 분석 및 생성
                    loadingStep.textContent = '2/3 AI가 사진을 분석하고 설명을 생성하는 중...';
                    await sleep(2000); // AI 분석 시뮬레이션

                    // 3단계: 상품 등록
                    loadingStep.textContent = '3/3 상품 등록 중...';
                    const productData = {
                        name: productName,
                        price: parseInt(productPrice),
                        category: productCategory,
                        images: imageUrls,
                        ai_generated: true
                    };

                    const response = await fetch('/api/products/simple', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(productData)
                    });

                    if (!response.ok) {
                        throw new Error('상품 등록에 실패했습니다.');
                    }

                    const result = await response.json();

                    // 성공!
                    alert('🎉 AI가 멋진 상세페이지를 만들었습니다!\\n상품이 성공적으로 등록되었습니다.');
                    window.location.href = '/products/' + result.product_id;

                } catch (error) {
                    console.error('등록 오류:', error);
                    alert('등록 중 오류가 발생했습니다: ' + error.message);
                } finally {
                    loadingOverlay.classList.remove('show');
                    generateBtn.disabled = false;
                }
            });

            // 이미지 업로드 (Base64로 변환)
            async function uploadImages(files) {
                const urls = [];
                for (const file of files) {
                    const base64 = await fileToBase64(file);
                    urls.push(base64);
                }
                return urls;
            }

            // File을 Base64로 변환
            function fileToBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            }

            // Sleep 함수
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            // 초기 버튼 상태
            updateGenerateButton();
        </script>
    </body>
    </html>
  `)
})

// AI 간편 등록 API
app.post('/api/products/simple', async (c) => {
  // 인증 확인
  const user = await requireAuth(c)
  if (!user) {
    return c.json({ error: '로그인이 필요합니다' }, 401)
  }

  const { name, price, category, images, ai_generated } = await c.req.json()

  // AI로 상세 정보 생성 (실제로는 외부 AI API 호출)
  const aiGeneratedContent = await generateProductDescription(name, price, category, images)

  // 상품 등록
  const result = await c.env.DB.prepare(`
    INSERT INTO products (
      name, description, price, product_type, category_id, 
      main_image, producer_id, is_available, ai_generated
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1)
  `).bind(
    name,
    aiGeneratedContent.description,
    price,
    category || aiGeneratedContent.suggestedCategory,
    aiGeneratedContent.categoryId,
    images[0], // 첫 번째 이미지를 대표 이미지로
    user.producer_id || 1
  ).run()

  const productId = result.meta.last_row_id

  // 추가 이미지 저장
  for (let i = 0; i < images.length; i++) {
    await c.env.DB.prepare(`
      INSERT INTO product_images (product_id, image_url, display_order, is_main)
      VALUES (?, ?, ?, ?)
    `).bind(productId, images[i], i + 1, i === 0 ? 1 : 0).run()
  }

  return c.json({ 
    success: true, 
    product_id: productId,
    ai_content: aiGeneratedContent
  })
})

// AI 상품 설명 생성 함수 (Mock)
async function generateProductDescription(name: string, price: number, category: string, images: string[]) {
  // 실제로는 여기서 OpenAI GPT-4 Vision API나 Claude Vision API를 호출
  // 이미지를 분석하고 상품 설명을 자동 생성
  
  // Mock 데이터
  const categoryMap: Record<string, number> = {
    'tea': 1,
    'craft': 8,
    'gift_set': 12,
    'local': 17
  }

  // 카테고리 자동 판단 (이름 기반 간단 로직)
  let suggestedCategory = category
  let categoryId = categoryMap[category]

  if (!category) {
    if (name.includes('차') || name.includes('녹차') || name.includes('홍차')) {
      suggestedCategory = 'tea'
      categoryId = 1
    } else if (name.includes('도자기') || name.includes('공예') || name.includes('찻잔')) {
      suggestedCategory = 'craft'
      categoryId = 8
    } else if (name.includes('선물') || name.includes('세트')) {
      suggestedCategory = 'gift_set'
      categoryId = 12
    } else {
      suggestedCategory = 'local'
      categoryId = 17
    }
  }

  // AI 생성 설명 (실제로는 GPT-4 Vision이 이미지를 보고 생성)
  const description = `【AI가 생성한 상품 설명】

${name}은(는) 정성스럽게 만들어진 프리미엄 제품입니다.

▶ 주요 특징
• 전통 방식으로 제작되어 깊은 맛과 향을 자랑합니다
• 엄선된 원료만을 사용하여 품질을 보장합니다
• 선물용으로도 손색없는 고급스러운 제품입니다

▶ 사용 방법
적절한 온도의 물과 함께 사용하시면 가장 좋은 맛을 느끼실 수 있습니다.

▶ 보관 방법
서늘하고 건조한 곳에 보관하시고, 직사광선을 피해주세요.

* 이 설명은 AI가 상품 사진을 분석하여 자동으로 작성한 것입니다.
* 판매자는 언제든 내용을 수정할 수 있습니다.`.trim()

  return {
    description,
    suggestedCategory,
    categoryId,
    features: [
      '전통 방식 제작',
      '프리미엄 품질',
      '선물용 추천'
    ],
    tags: ['전통', '수제', '프리미엄']
  }
}

// 상품 등록 페이지 (반드시 /products/:id 앞에 위치)
// 상품 등록 페이지 (인증 필요)
app.get('/products/new', async (c) => {
  // 쿠키에서 세션 확인
  const cookies = c.req.header('Cookie') || ''
  const sessionMatch = cookies.match(/session=([^;]+)/)
  
  if (!sessionMatch) {
    // 로그인 안 됨 - 로그인 페이지로 리다이렉트
    return c.redirect('/login?redirect=/products/new')
  }
  
  const sessionToken = sessionMatch[1]
  
  // 세션 유효성 확인
  const { results: sessions } = await c.env.DB.prepare(`
    SELECT us.*, u.id as user_id, u.email, u.name, u.role
    FROM user_sessions us
    JOIN users u ON us.user_id = u.id
    WHERE us.session_token = ? AND us.expires_at > datetime('now')
  `).bind(sessionToken).all()
  
  if (sessions.length === 0) {
    // 세션 만료 - 로그인 페이지로 리다이렉트
    return c.redirect('/login?redirect=/products/new')
  }
  
  const user = sessions[0]
  
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>상품 등록 - 다공</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            background: #f5f7fa;
            min-height: 100vh;
            padding: 20px 0;
          }
          .form-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 2px 20px rgba(0,0,0,0.08);
            padding: 40px;
          }
          .form-group {
            margin-bottom: 25px;
          }
          .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 8px;
            color: #2c3e50;
          }
          .form-group input, .form-group textarea, .form-group select {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e0e6ed;
            border-radius: 8px;
            font-size: 15px;
            transition: border-color 0.3s;
          }
          .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
            outline: none;
            border-color: #4a90e2;
          }
          .form-group textarea {
            min-height: 120px;
            resize: vertical;
          }
          .required::after {
            content: " *";
            color: #e74c3c;
          }
          .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 14px 32px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
            margin-top: 10px;
          }
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }
          .btn-primary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }
          .image-preview-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 10px;
          }
          .image-preview {
            position: relative;
            width: 100%;
            padding-top: 100%;
            background: #f8f9fa;
            border: 2px dashed #dee2e6;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
          }
          .image-preview:hover {
            border-color: #667eea;
            background: #f0f4ff;
          }
          .image-preview img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 6px;
          }
          .image-preview .upload-placeholder {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #6c757d;
          }
          .remove-image {
            position: absolute;
            top: 5px;
            right: 5px;
            background: #e74c3c;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            z-index: 10;
          }
          .help-text {
            font-size: 13px;
            color: #6c757d;
            margin-top: 6px;
          }
          .error-text {
            font-size: 13px;
            color: #e74c3c;
            margin-top: 6px;
          }
          .info-box {
            background: #f0f8ff;
            border-left: 4px solid #4a90e2;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 25px;
          }
          .seller-type-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-top: 10px;
          }
          .seller-type-option {
            border: 2px solid #e0e6ed;
            border-radius: 8px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: center;
          }
          .seller-type-option:hover {
            border-color: #4a90e2;
            background: #f8f9fa;
          }
          .seller-type-option.selected {
            border-color: #4a90e2;
            background: #f0f4ff;
          }
          .seller-type-option input[type="radio"] {
            display: none;
  }
          .seller-type-option .icon {
            font-size: 32px;
            margin-bottom: 10px;
            color: #4a90e2;
          }
          .seller-type-option .title {
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 5px;
          }
          .seller-type-option .description {
            font-size: 13px;
            color: #6c757d;
          }
          .conditional-field {
            display: none;
          }
          .conditional-field.show {
            display: block;
          }

        </style>
    </head>
    <body>
        <div class="form-container">
            <h1 style="font-size: 28px; font-weight: 700; color: #2c3e50; margin-bottom: 10px;">
                <i class="fas fa-box"></i> 상품 등록
            </h1>
            <p style="color: #6c757d; margin-bottom: 30px;">
                간편하게 상품을 등록하고 판매를 시작하세요
            </p>

            <div class="info-box">
                <i class="fas fa-info-circle"></i> 
                <strong>등록 안내</strong><br>
                • 상품 사진은 5~10장 필수입니다<br>
                • 할인율은 20%~50% 범위에서 설정할 수 있습니다
            </div>

            <form id="productForm">
                <!-- 판매자 유형 -->
                <div class="form-group">
                    <label class="required">판매자 유형</label>
                    <div class="seller-type-container">
                        <label class="seller-type-option" id="businessOption">
                            <input type="radio" name="seller_type" value="business" required>
                            <div class="icon">🏢</div>
                            <div class="title">사업자</div>
                            <div class="description">사업자등록증이 있는 경우</div>
                        </label>
                        <label class="seller-type-option" id="individualOption">
                            <input type="radio" name="seller_type" value="individual" required>
                            <div class="icon">👤</div>
                            <div class="title">일반인</div>
                            <div class="description">개인 판매자</div>
                        </label>
                    </div>
                </div>

                <!-- 사업자 정보 (사업자만) -->
                <div class="form-group conditional-field" id="businessFields">
                    <label class="required">사업자등록번호</label>
                    <input type="text" name="business_number" id="business_number" placeholder="000-00-00000" maxlength="12">
                    <div class="help-text">하이픈(-)을 포함하여 입력하세요</div>
                </div>

                <!-- 계좌 정보 (공통) -->
                <div class="form-group conditional-field" id="accountFields">
                    <label class="required">은행명</label>
                    <select name="bank_name" id="bank_name">
                        <option value="">은행 선택</option>
                        <option value="KB국민은행">KB국민은행</option>
                        <option value="신한은행">신한은행</option>
                        <option value="우리은행">우리은행</option>
                        <option value="하나은행">하나은행</option>
                        <option value="NH농협은행">NH농협은행</option>
                        <option value="IBK기업은행">IBK기업은행</option>
                        <option value="카카오뱅크">카카오뱅크</option>
                        <option value="토스뱅크">토스뱅크</option>
                        <option value="케이뱅크">케이뱅크</option>
                        <option value="SC제일은행">SC제일은행</option>
                        <option value="새마을금고">새마을금고</option>
                        <option value="신협">신협</option>
                    </select>
                </div>

                <div class="form-group conditional-field" id="accountNumberField">
                    <label class="required">계좌번호</label>
                    <input type="text" name="account_number" id="account_number" placeholder="숫자만 입력" maxlength="20">
                    <div class="help-text">하이픈(-) 없이 숫자만 입력하세요</div>
                </div>

                <div class="form-group conditional-field" id="accountHolderField">
                    <label class="required">예금주명</label>
                    <input type="text" name="account_holder" id="account_holder" placeholder="예금주 이름">
                    <div class="help-text">계좌의 예금주 이름을 입력하세요</div>
                </div>

                <!-- 상품명 -->
                <div class="form-group">
                    <label class="required">상품명</label>
                    <input type="text" name="name" id="name" placeholder="예: 제주 한라산 녹차 50g" required>
                    <div class="help-text">고객이 알아보기 쉬운 상품명을 입력하세요</div>
                </div>

                <!-- 상품 설명 -->
                <div class="form-group">
                    <label class="required">상품 설명</label>
                    <textarea name="description" id="description" placeholder="상품의 특징, 원산지, 제조 방법 등을 자세히 설명해주세요" required></textarea>
                    <div class="help-text">상품에 대한 자세한 정보를 입력하세요</div>
                </div>

                <!-- 상품 사진 -->
                <div class="form-group">
                    <label class="required">상품 사진 (5~10장)</label>
                    <div class="image-preview-container" id="imagePreviewContainer">
                        <!-- 이미지 미리보기가 여기에 추가됩니다 -->
                    </div>
                    <input type="file" id="imageInput" accept="image/*" multiple style="display: none;">
                    <button type="button" class="btn-primary" onclick="document.getElementById('imageInput').click()" style="margin-top: 15px; background: linear-gradient(135deg, #48c774 0%, #00b894 100%);">
                        <i class="fas fa-camera"></i> 사진 추가
                    </button>
                    <div class="help-text" id="imageCountText">0장 선택됨 (최소 5장, 최대 10장)</div>
                    <div class="error-text" id="imageError" style="display: none;"></div>
                </div>

                <!-- 카테고리 -->
                <div class="form-group">
                    <label class="required">카테고리</label>
                    <select name="category_id" id="category_id" required>
                        <option value="">카테고리 선택</option>
                        <option value="1">차 (茶)</option>
                        <option value="2">공예품</option>
                        <option value="3">선물세트</option>
                    </select>
                </div>

                <!-- 상품 타입 -->
                <div class="form-group">
                    <label class="required">상품 타입</label>
                    <select name="product_type" id="product_type" required>
                        <option value="">타입 선택</option>
                        <option value="tea">차</option>
                        <option value="craft">공예품</option>
                        <option value="gift_set">선물세트</option>
                        <option value="local">지역특산물</option>
                    </select>
                </div>

                <!-- 가격 정보 -->
                <div class="form-group">
                    <label class="required">소비자가 (원)</label>
                    <input type="number" name="consumer_price" id="consumer_price" placeholder="예: 25000" required min="1000">
                    <div class="help-text">일반 소비자가격 (시장가격)</div>
                </div>

                <div class="form-group">
                    <label class="required">직거래가 (원)</label>
                    <input type="number" name="direct_price" id="direct_price" placeholder="예: 20000" required min="1000">
                    <div class="help-text">다공 플랫폼에서 판매할 가격</div>
                </div>

                <!-- 할인율 -->
                <div class="form-group">
                    <label class="required">할인율 (%)</label>
                    <input type="number" name="discount_rate" id="discount_rate" value="30" required min="20" max="50">
                    <div class="help-text">20% ~ 50% 범위에서 설정 가능</div>
                    <div class="error-text" id="discountError" style="display: none;"></div>
                </div>

                <!-- 배송비 -->
                <div class="form-group">
                    <label>배송비 (원)</label>
                    <input type="number" name="shipping_fee" id="shipping_fee" value="3000" min="3000" max="5000">
                    <div class="help-text">기본 3,000원 (3,000~5,000원 범위)</div>
                </div>

                <!-- 재고 수량 -->
                <div class="form-group">
                    <label>재고 수량</label>
                    <input type="number" name="stock_quantity" id="stock_quantity" value="100" min="0">
                    <div class="help-text">판매 가능한 재고 수량</div>
                </div>

                <!-- 무게 -->
                <div class="form-group">
                    <label>무게 (g)</label>
                    <input type="number" name="weight" id="weight" placeholder="예: 50" min="1">
                </div>

                <!-- 원산지 -->
                <div class="form-group">
                    <label>원산지</label>
                    <input type="text" name="origin" id="origin" placeholder="예: 제주도">
                </div>

                <!-- 등록 버튼 -->
                <button type="submit" class="btn-primary" id="submitBtn">
                    <i class="fas fa-check"></i> 상품 등록하기
                </button>
            </form>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
          let selectedImages = [];

          // 판매자 유형 선택 처리
          const businessOption = document.getElementById('businessOption');
          const individualOption = document.getElementById('individualOption');
          const businessFields = document.getElementById('businessFields');
          const accountFields = document.getElementById('accountFields');
          const accountNumberField = document.getElementById('accountNumberField');
          const accountHolderField = document.getElementById('accountHolderField');

          document.querySelectorAll('input[name="seller_type"]').forEach(radio => {
            radio.addEventListener('change', function() {
              // 스타일 업데이트
              businessOption.classList.remove('selected');
              individualOption.classList.remove('selected');
              
              if (this.value === 'business') {
                businessOption.classList.add('selected');
                businessFields.classList.add('show');
                document.getElementById('business_number').required = true;
              } else if (this.value === 'individual') {
                individualOption.classList.add('selected');
                businessFields.classList.remove('show');
                document.getElementById('business_number').required = false;
                document.getElementById('business_number').value = '';
              }
              
              // 계좌 정보 필드 표시
              accountFields.classList.add('show');
              accountNumberField.classList.add('show');
              accountHolderField.classList.add('show');
              document.getElementById('bank_name').required = true;
              document.getElementById('account_number').required = true;
              document.getElementById('account_holder').required = true;
            });
          });

          // 사업자등록번호 포맷팅 (000-00-00000)
          document.getElementById('business_number').addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value.length > 10) value = value.substr(0, 10);
            
            if (value.length > 5) {
              value = value.substr(0, 3) + '-' + value.substr(3, 2) + '-' + value.substr(5);
            } else if (value.length > 3) {
              value = value.substr(0, 3) + '-' + value.substr(3);
            }
            
            e.target.value = value;
          });

          // 계좌번호 숫자만 입력
          document.getElementById('account_number').addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
          });

          // 이미지 업로드 처리
          document.getElementById('imageInput').addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            
            files.forEach(file => {
              if (selectedImages.length >= 10) {
                showImageError('최대 10장까지 등록할 수 있습니다');
                return;
              }

              const reader = new FileReader();
              reader.onload = function(e) {
                selectedImages.push({
                  file: file,
                  url: e.target.result
                });
                updateImagePreviews();
              };
              reader.readAsDataURL(file);
            });

            // 입력 초기화
            e.target.value = '';
          });

          function updateImagePreviews() {
            const container = document.getElementById('imagePreviewContainer');
            container.innerHTML = '';

            selectedImages.forEach((image, index) => {
              const div = document.createElement('div');
              div.className = 'image-preview';
              div.innerHTML = \`
                <img src="\${image.url}" alt="상품 이미지 \${index + 1}">
                <button type="button" class="remove-image" onclick="removeImage(\${index})">
                  <i class="fas fa-times"></i>
                </button>
              \`;
              container.appendChild(div);
            });

            // 이미지 개수 업데이트
            const countText = document.getElementById('imageCountText');
            countText.textContent = \`\${selectedImages.length}장 선택됨 (최소 5장, 최대 10장)\`;

            // 에러 메시지 체크
            if (selectedImages.length < 5) {
              showImageError('최소 5장 이상의 사진을 등록해주세요');
            } else if (selectedImages.length > 10) {
              showImageError('최대 10장까지 등록할 수 있습니다');
            } else {
              hideImageError();
            }
          }

          function removeImage(index) {
            selectedImages.splice(index, 1);
            updateImagePreviews();
          }

          function showImageError(message) {
            const errorEl = document.getElementById('imageError');
            errorEl.textContent = message;
            errorEl.style.display = 'block';
          }

          function hideImageError() {
            document.getElementById('imageError').style.display = 'none';
          }

          // 할인율 검증
          document.getElementById('discount_rate').addEventListener('input', function() {
            const value = parseInt(this.value);
            const errorEl = document.getElementById('discountError');
            
            if (value < 20 || value > 50) {
              errorEl.textContent = '할인율은 20% ~ 50% 범위에서 설정해주세요';
              errorEl.style.display = 'block';
            } else {
              errorEl.style.display = 'none';
            }
          });

          // 폼 제출
          document.getElementById('productForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            // 판매자 유형 확인
            const sellerType = document.querySelector('input[name="seller_type"]:checked');
            if (!sellerType) {
              alert('판매자 유형을 선택해주세요');
              return;
            }

            // 계좌 정보 확인
            const bankName = document.getElementById('bank_name').value;
            const accountNumber = document.getElementById('account_number').value;
            const accountHolder = document.getElementById('account_holder').value;
            
            if (!bankName || !accountNumber || !accountHolder) {
              alert('계좌 정보를 모두 입력해주세요');
              return;
            }

            // 사업자인 경우 사업자등록번호 확인
            if (sellerType.value === 'business') {
              const businessNumber = document.getElementById('business_number').value;
              if (!businessNumber || businessNumber.length !== 12) {
                alert('사업자등록번호를 정확히 입력해주세요 (000-00-00000)');
                return;
              }
            }

            // 이미지 검증
            if (selectedImages.length < 5 || selectedImages.length > 10) {
              alert('상품 사진은 5~10장 등록해야 합니다');
              return;
            }

            // 할인율 검증
            const discountRate = parseInt(document.getElementById('discount_rate').value);
            if (discountRate < 20 || discountRate > 50) {
              alert('할인율은 20% ~ 50% 범위에서 설정해주세요');
              return;
            }

            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 등록 중...';

            try {
              // 이미지를 Base64로 변환 (실제로는 이미지 업로드 API 사용)
              const imageUrls = selectedImages.map((img, index) => 
                \`/images/products/\${Date.now()}-\${index}.jpg\`
              );

              const formData = {
                // 판매자 정보
                seller_type: document.querySelector('input[name="seller_type"]:checked').value,
                business_number: document.getElementById('business_number').value || null,
                bank_name: document.getElementById('bank_name').value,
                account_number: document.getElementById('account_number').value,
                account_holder: document.getElementById('account_holder').value,
                // 상품 정보
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                images: imageUrls,
                category_id: parseInt(document.getElementById('category_id').value),
                product_type: document.getElementById('product_type').value,
                consumer_price: parseFloat(document.getElementById('consumer_price').value),
                direct_price: parseFloat(document.getElementById('direct_price').value),
                discount_rate: discountRate,
                shipping_fee: parseInt(document.getElementById('shipping_fee').value) || 3000,
                stock_quantity: parseInt(document.getElementById('stock_quantity').value) || 0,
                weight: parseInt(document.getElementById('weight').value) || null,
                origin: document.getElementById('origin').value || null
              };

              const response = await axios.post('/api/products', formData);

              if (response.data.success) {
                alert(\`상품이 등록되었습니다! (상품 ID: \${response.data.product_id})\`);
                window.location.href = '/products';
              } else {
                throw new Error(response.data.message || '상품 등록 실패');
              }
            } catch (error) {
              console.error('Error:', error);
              alert('상품 등록에 실패했습니다: ' + (error.response?.data?.message || error.message));
            } finally {
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fas fa-check"></i> 상품 등록하기';
            }
          });
        </script>
    </body>
    </html>
  `)
})

// 상품 상세 페이지
app.get('/products/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 지역 목록 페이지
app.get('/regions', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 지역 상세 페이지
app.get('/regions/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 생산자 목록 페이지
app.get('/producers', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 생산자 상세 페이지
app.get('/producers/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 체험 목록 페이지
app.get('/experiences', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 체험 상세 페이지
app.get('/experiences/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 이벤트 목록 페이지
app.get('/events', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 회사소개 페이지
app.get('/about', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 검색 페이지
app.get('/search', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 교육 신청 페이지
app.get('/education/apply', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 교육 현황 페이지
app.get('/education/status', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 교육 커리큘럼 페이지
app.get('/education/curriculum', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 교육 커리큘럼 상세 페이지
app.get('/education/curriculum/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// ===== 마이페이지 =====

// 마이페이지 메인
app.get('/mypage', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 주문 내역
app.get('/mypage/orders', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// 주문 상세
app.get('/mypage/orders/:id', (c) => {
  return c.render(
    <div id="app">
      <div class="loading">로딩 중...</div>
    </div>
  )
})

// ===== 소셜 로그인 API =====

// 로그인 페이지
app.get('/login', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>다공 - 로그인</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .login-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            padding: 40px;
            max-width: 400px;
            width: 90%;
          }
          .social-btn {
            width: 100%;
            padding: 15px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            text-decoration: none;
          }
          .social-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }
          .google-btn {
            background: #fff;
            color: #333;
            border: 1px solid #ddd;
          }
          .naver-btn {
            background: #03C75A;
            color: white;
          }
          .kakao-btn {
            background: #FEE500;
            color: #000;
          }
        </style>
    </head>
    <body>
        <div class="login-card">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">다공</h1>
                <p class="text-gray-600">간편하게 로그인하고 시작하세요</p>
            </div>
            
            <div class="space-y-4">
                <a href="/auth/google" class="social-btn google-btn">
                    <i class="fab fa-google text-xl"></i>
                    구글로 계속하기
                </a>
                
                <a href="/auth/naver" class="social-btn naver-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.6 0H6.4v20h7.2V0zM10 10L6.4 0v10H10z"/>
                        <path d="M13.6 10v10L10 10h3.6z"/>
                    </svg>
                    네이버로 계속하기
                </a>
                
                <a href="/auth/kakao" class="social-btn kakao-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C4.477 0 0 3.58 0 8c0 2.827 1.875 5.31 4.688 6.72-.195.715-.7 2.61-.81 3.026-.128.495.182.489.385.355.164-.106 2.537-1.733 3.49-2.387.738.102 1.496.156 2.247.156 5.523 0 10-3.58 10-8S15.523 0 10 0z"/>
                    </svg>
                    카카오로 계속하기
                </a>
            </div>
            
            <div class="mt-8 text-center text-sm text-gray-500">
                <p>로그인하면 다공의 <a href="/terms" class="text-purple-600">이용약관</a> 및</p>
                <p><a href="/privacy" class="text-purple-600">개인정보처리방침</a>에 동의하게 됩니다</p>
            </div>
        </div>
    </body>
    </html>
  `)
})

// 판매자 등록 페이지
app.get('/seller/register', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>판매자 등록 - 다공</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            background: #f5f7fa;
            min-height: 100vh;
            padding: 20px 0;
          }
          .form-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 40px;
          }
          .form-group {
            margin-bottom: 24px;
          }
          .form-label {
            display: block;
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
          }
          .form-input {
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 14px;
          }
          .form-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
          .tab-button {
            padding: 12px 24px;
            background: #e5e7eb;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
          }
          .tab-button.active {
            background: #667eea;
            color: white;
          }
          .tab-content {
            display: none;
          }
          .tab-content.active {
            display: block;
          }
          .btn-submit {
            width: 100%;
            padding: 16px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
          }
          .btn-submit:hover {
            background: #5568d3;
          }
          .required {
            color: #ef4444;
          }
        </style>
    </head>
    <body>
        <div class="form-container">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">판매자 정보 등록</h1>
                <p class="text-gray-600">상품을 판매하기 위해 판매자 정보를 등록해주세요</p>
            </div>

            <!-- 판매자 타입 선택 -->
            <div class="mb-8">
                <div class="flex gap-2">
                    <button type="button" class="tab-button active flex-1" data-tab="business" onclick="switchTab('business')">
                        <i class="fas fa-building mr-2"></i>사업자
                    </button>
                    <button type="button" class="tab-button flex-1" data-tab="individual" onclick="switchTab('individual')">
                        <i class="fas fa-user mr-2"></i>개인
                    </button>
                </div>
            </div>

            <form id="sellerForm">
                <input type="hidden" id="seller_type" name="seller_type" value="business">

                <!-- 공통 정보 -->
                <div class="form-group">
                    <label class="form-label">
                        판매자명 <span class="required">*</span>
                    </label>
                    <input type="text" class="form-input" name="name" required placeholder="예: 제주 한라산 차농원">
                </div>

                <!-- 사업자 정보 -->
                <div id="business-fields" class="tab-content active">
                    <h3 class="text-lg font-semibold mb-4 text-gray-700">사업자 정보</h3>
                    
                    <div class="form-group">
                        <label class="form-label">
                            사업자등록번호 <span class="required">*</span>
                        </label>
                        <input type="text" class="form-input" name="business_registration_number" placeholder="123-45-67890">
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            상호명 <span class="required">*</span>
                        </label>
                        <input type="text" class="form-input" name="business_name" placeholder="한라산차농원">
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            대표자명 <span class="required">*</span>
                        </label>
                        <input type="text" class="form-input" name="representative_name" placeholder="김제주">
                    </div>

                    <div class="form-group">
                        <label class="form-label">사업장 주소</label>
                        <input type="text" class="form-input" name="business_address" placeholder="제주특별자치도 제주시 한라산로 123">
                    </div>

                    <div class="form-group">
                        <label class="form-label">사업장 전화번호</label>
                        <input type="tel" class="form-input" name="business_phone" placeholder="064-123-4567">
                    </div>
                </div>

                <!-- 개인 정보 -->
                <div id="individual-fields" class="tab-content">
                    <h3 class="text-lg font-semibold mb-4 text-gray-700">개인 정보</h3>
                    
                    <div class="form-group">
                        <label class="form-label">
                            주민등록번호 <span class="required">*</span>
                        </label>
                        <input type="text" class="form-input" name="personal_id_number" placeholder="900101-1******">
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            휴대폰 번호 <span class="required">*</span>
                        </label>
                        <input type="tel" class="form-input" name="mobile_phone" placeholder="010-1234-5678">
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            이메일 <span class="required">*</span>
                        </label>
                        <input type="email" class="form-input" name="personal_email" placeholder="example@email.com">
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            주소 <span class="required">*</span>
                        </label>
                        <input type="text" class="form-input" name="personal_address" placeholder="전라남도 보성군 보성읍 차밭로 456">
                    </div>

                    <div class="form-group">
                        <label class="form-label">우편번호</label>
                        <input type="text" class="form-input" name="personal_zipcode" placeholder="59450">
                    </div>
                </div>

                <!-- 정산 계좌 정보 (공통) -->
                <div class="mt-8">
                    <h3 class="text-lg font-semibold mb-4 text-gray-700">정산 계좌 정보</h3>
                    
                    <div class="form-group">
                        <label class="form-label">
                            은행명 <span class="required">*</span>
                        </label>
                        <select class="form-input" name="bank_name" required>
                            <option value="">은행 선택</option>
                            <option value="농협은행">농협은행</option>
                            <option value="신한은행">신한은행</option>
                            <option value="국민은행">국민은행</option>
                            <option value="우리은행">우리은행</option>
                            <option value="하나은행">하나은행</option>
                            <option value="기업은행">기업은행</option>
                            <option value="SC제일은행">SC제일은행</option>
                            <option value="카카오뱅크">카카오뱅크</option>
                            <option value="케이뱅크">케이뱅크</option>
                            <option value="토스뱅크">토스뱅크</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            계좌번호 <span class="required">*</span>
                        </label>
                        <input type="text" class="form-input" name="account_number" required placeholder="123-456-789012">
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            예금주명 <span class="required">*</span>
                        </label>
                        <input type="text" class="form-input" name="account_holder" required placeholder="김제주">
                    </div>
                </div>

                <!-- 안내 문구 -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p class="text-sm text-blue-800">
                        <i class="fas fa-info-circle mr-2"></i>
                        판매자 정보는 관리자 승인 후 상품 등록이 가능합니다. 승인까지 1-2일 소요될 수 있습니다.
                    </p>
                </div>

                <!-- 제출 버튼 -->
                <button type="submit" class="btn-submit">
                    <i class="fas fa-check mr-2"></i>판매자 정보 등록
                </button>
            </form>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            // 탭 전환
            function switchTab(tabName) {
                // 버튼 활성화
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(\`[data-tab="\${tabName}"]\`).classList.add('active');

                // 컨텐츠 표시
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(\`\${tabName}-fields\`).classList.add('active');

                // hidden input 업데이트
                document.getElementById('seller_type').value = tabName;
            }

            // 폼 제출
            document.getElementById('sellerForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                
                // 판매자 타입별 필수 필드 검증
                const sellerType = data.seller_type;
                
                if (sellerType === 'business') {
                    if (!data.business_registration_number || !data.business_name || !data.representative_name) {
                        alert('사업자 필수 정보를 모두 입력해주세요');
                        return;
                    }
                } else if (sellerType === 'individual') {
                    if (!data.personal_id_number || !data.mobile_phone || !data.personal_email || !data.personal_address) {
                        alert('개인 필수 정보를 모두 입력해주세요');
                        return;
                    }
                }
                
                try {
                    const response = await axios.post('/api/producers', data);
                    
                    if (response.data.success) {
                        alert('판매자 정보가 등록되었습니다!\\n관리자 승인 후 상품을 등록하실 수 있습니다.');
                        window.location.href = '/';
                    }
                } catch (error) {
                    if (error.response) {
                        alert('오류: ' + error.response.data.error);
                    } else {
                        alert('등록 중 오류가 발생했습니다: ' + error.message);
                    }
                }
            });
        </script>
    </body>
    </html>
  `)
})

// 구글 로그인 시작
app.get('/auth/google', (c) => {
  const clientId = c.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'
  const redirectUri = `${new URL(c.req.url).origin}/auth/google/callback`
  const scope = 'openid email profile'
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope)}`
  
  return c.redirect(authUrl)
})

// 구글 로그인 콜백
app.get('/auth/google/callback', async (c) => {
  const code = c.req.query('code')
  if (!code) {
    return c.redirect('/login?error=no_code')
  }
  
  try {
    const clientId = c.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID'
    const clientSecret = c.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET'
    const redirectUri = `${new URL(c.req.url).origin}/auth/google/callback`
    
    // Access token 교환
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    })
    
    const tokenData = await tokenResponse.json() as any
    
    // 사용자 정보 가져오기
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    })
    
    const userData = await userResponse.json() as any
    
    // 사용자 DB에 저장 또는 업데이트
    const { results: existingUser } = await c.env.DB.prepare(
      'SELECT * FROM users WHERE provider = ? AND provider_id = ?'
    ).bind('google', userData.id).all()
    
    let userId
    if (existingUser.length > 0) {
      // 기존 사용자 - 로그인 시간 업데이트
      userId = (existingUser[0] as any).id
      await c.env.DB.prepare(
        'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).bind(userId).run()
    } else {
      // 신규 사용자 생성
      const result = await c.env.DB.prepare(`
        INSERT INTO users (email, name, profile_image, provider, provider_id, last_login_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        userData.email,
        userData.name,
        userData.picture,
        'google',
        userData.id
      ).run()
      userId = result.meta.last_row_id
    }
    
    // 세션 생성
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30일
    
    await c.env.DB.prepare(`
      INSERT INTO user_sessions (user_id, session_token, expires_at)
      VALUES (?, ?, ?)
    `).bind(userId, sessionToken, expiresAt.toISOString()).run()
    
    // 쿠키 설정 및 리다이렉트
    c.header('Set-Cookie', `session=${sessionToken}; Path=/; HttpOnly; Max-Age=2592000; SameSite=Lax`)
    return c.redirect('/')
    
  } catch (error) {
    console.error('Google login error:', error)
    return c.redirect('/login?error=auth_failed')
  }
})

// 네이버 로그인 시작
app.get('/auth/naver', (c) => {
  const clientId = c.env.NAVER_CLIENT_ID || 'YOUR_NAVER_CLIENT_ID'
  const redirectUri = `${new URL(c.req.url).origin}/auth/naver/callback`
  const state = crypto.randomUUID()
  
  const authUrl = `https://nid.naver.com/oauth2.0/authorize?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `state=${state}`
  
  return c.redirect(authUrl)
})

// 네이버 로그인 콜백
app.get('/auth/naver/callback', async (c) => {
  const code = c.req.query('code')
  const state = c.req.query('state')
  
  if (!code || !state) {
    return c.redirect('/login?error=no_code')
  }
  
  try {
    const clientId = c.env.NAVER_CLIENT_ID || 'YOUR_NAVER_CLIENT_ID'
    const clientSecret = c.env.NAVER_CLIENT_SECRET || 'YOUR_NAVER_CLIENT_SECRET'
    
    // Access token 교환
    const tokenResponse = await fetch(
      `https://nid.naver.com/oauth2.0/token?` +
      `grant_type=authorization_code&` +
      `client_id=${clientId}&` +
      `client_secret=${clientSecret}&` +
      `code=${code}&` +
      `state=${state}`
    )
    
    const tokenData = await tokenResponse.json() as any
    
    // 사용자 정보 가져오기
    const userResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    })
    
    const userData = await userResponse.json() as any
    const naverUser = userData.response
    
    // 사용자 DB에 저장 또는 업데이트
    const { results: existingUser } = await c.env.DB.prepare(
      'SELECT * FROM users WHERE provider = ? AND provider_id = ?'
    ).bind('naver', naverUser.id).all()
    
    let userId
    if (existingUser.length > 0) {
      userId = (existingUser[0] as any).id
      await c.env.DB.prepare(
        'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).bind(userId).run()
    } else {
      const result = await c.env.DB.prepare(`
        INSERT INTO users (email, name, profile_image, provider, provider_id, last_login_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        naverUser.email,
        naverUser.name,
        naverUser.profile_image,
        'naver',
        naverUser.id
      ).run()
      userId = result.meta.last_row_id
    }
    
    // 세션 생성
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    
    await c.env.DB.prepare(`
      INSERT INTO user_sessions (user_id, session_token, expires_at)
      VALUES (?, ?, ?)
    `).bind(userId, sessionToken, expiresAt.toISOString()).run()
    
    c.header('Set-Cookie', `session=${sessionToken}; Path=/; HttpOnly; Max-Age=2592000; SameSite=Lax`)
    return c.redirect('/')
    
  } catch (error) {
    console.error('Naver login error:', error)
    return c.redirect('/login?error=auth_failed')
  }
})

// 카카오 로그인 시작
app.get('/auth/kakao', (c) => {
  const clientId = c.env.KAKAO_CLIENT_ID || 'YOUR_KAKAO_CLIENT_ID'
  const redirectUri = `${new URL(c.req.url).origin}/auth/kakao/callback`
  
  const authUrl = `https://kauth.kakao.com/oauth/authorize?` +
    `response_type=code&` +
    `client_id=${clientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}`
  
  return c.redirect(authUrl)
})

// 카카오 로그인 콜백
app.get('/auth/kakao/callback', async (c) => {
  const code = c.req.query('code')
  if (!code) {
    return c.redirect('/login?error=no_code')
  }
  
  try {
    const clientId = c.env.KAKAO_CLIENT_ID || 'YOUR_KAKAO_CLIENT_ID'
    const clientSecret = c.env.KAKAO_CLIENT_SECRET || ''
    const redirectUri = `${new URL(c.req.url).origin}/auth/kakao/callback`
    
    // Access token 교환
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code
      })
    })
    
    const tokenData = await tokenResponse.json() as any
    
    // 사용자 정보 가져오기
    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    })
    
    const userData = await userResponse.json() as any
    
    // 사용자 DB에 저장 또는 업데이트
    const { results: existingUser } = await c.env.DB.prepare(
      'SELECT * FROM users WHERE provider = ? AND provider_id = ?'
    ).bind('kakao', userData.id.toString()).all()
    
    let userId
    if (existingUser.length > 0) {
      userId = (existingUser[0] as any).id
      await c.env.DB.prepare(
        'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?'
      ).bind(userId).run()
    } else {
      const result = await c.env.DB.prepare(`
        INSERT INTO users (email, name, profile_image, provider, provider_id, last_login_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        userData.kakao_account?.email || `kakao_${userData.id}@example.com`,
        userData.kakao_account?.profile?.nickname || '카카오사용자',
        userData.kakao_account?.profile?.profile_image_url || '',
        'kakao',
        userData.id.toString()
      ).run()
      userId = result.meta.last_row_id
    }
    
    // 세션 생성
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    
    await c.env.DB.prepare(`
      INSERT INTO user_sessions (user_id, session_token, expires_at)
      VALUES (?, ?, ?)
    `).bind(userId, sessionToken, expiresAt.toISOString()).run()
    
    c.header('Set-Cookie', `session=${sessionToken}; Path=/; HttpOnly; Max-Age=2592000; SameSite=Lax`)
    return c.redirect('/')
    
  } catch (error) {
    console.error('Kakao login error:', error)
    return c.redirect('/login?error=auth_failed')
  }
})

// 현재 로그인 사용자 정보 조회
app.get('/api/auth/me', async (c) => {
  const cookies = c.req.header('Cookie') || ''
  const sessionMatch = cookies.match(/session=([^;]+)/)
  
  if (!sessionMatch) {
    return c.json({ user: null })
  }
  
  const sessionToken = sessionMatch[1]
  
  // 세션 확인
  const { results: sessions } = await c.env.DB.prepare(`
    SELECT us.*, u.id as user_id, u.email, u.name, u.profile_image, u.role, u.provider
    FROM user_sessions us
    JOIN users u ON us.user_id = u.id
    WHERE us.session_token = ? AND us.expires_at > datetime('now')
  `).bind(sessionToken).all()
  
  if (sessions.length === 0) {
    return c.json({ user: null })
  }
  
  const session = sessions[0] as any
  
  // 판매자 정보 확인
  const producer = await c.env.DB.prepare(
    'SELECT id, name, seller_type, is_verified FROM producers WHERE user_id = ?'
  ).bind(session.user_id).first()
  
  return c.json({
    user: {
      id: session.user_id,
      email: session.email,
      name: session.name,
      profile_image: session.profile_image,
      role: session.role,
      provider: session.provider,
      producer: producer ? {
        id: (producer as any).id,
        name: (producer as any).name,
        seller_type: (producer as any).seller_type,
        is_verified: (producer as any).is_verified
      } : null
    }
  })
})

// 로그아웃
app.post('/api/auth/logout', async (c) => {
  const cookies = c.req.header('Cookie') || ''
  const sessionMatch = cookies.match(/session=([^;]+)/)
  
  if (sessionMatch) {
    const sessionToken = sessionMatch[1]
    await c.env.DB.prepare(
      'DELETE FROM user_sessions WHERE session_token = ?'
    ).bind(sessionToken).run()
  }
  
  c.header('Set-Cookie', 'session=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax')
  return c.json({ success: true })
})

// ===== 장바구니 API =====

// 장바구니 개수 조회 (로그인 없이도 작동)
app.get('/api/cart/count', async (c) => {
  const userId = c.req.query('user_id')
  const sessionId = c.req.query('session_id')
  
  // 로그인하지 않은 사용자는 count 0 반환
  if (!userId && !sessionId) {
    return c.json({ count: 0 })
  }
  
  try {
    const query = userId 
      ? 'SELECT COUNT(*) as count FROM cart_items WHERE user_id = ?'
      : 'SELECT COUNT(*) as count FROM cart_items WHERE session_id = ?'
    
    const result = await c.env.DB.prepare(query)
      .bind(userId || sessionId)
      .first()
    
    return c.json({ count: result?.count || 0 })
  } catch (error) {
    console.error('Cart count error:', error)
    return c.json({ count: 0 })
  }
})

// 장바구니 목록 조회
app.get('/api/cart', async (c) => {
  const userId = c.req.query('user_id')
  const sessionId = c.req.query('session_id')
  
  if (!userId && !sessionId) {
    return c.json({ error: '사용자 ID 또는 세션 ID가 필요합니다' }, 400)
  }
  
  const query = `
    SELECT 
      c.id, c.product_id, c.quantity, c.is_selected, 
      c.price_snapshot, c.created_at,
      p.name as product_name, p.price, p.main_image, 
      p.stock_quantity, p.is_available,
      pr.name as producer_name, pr.id as producer_id
    FROM cart_items c
    JOIN products p ON c.product_id = p.id
    LEFT JOIN producers pr ON p.producer_id = pr.id
    WHERE ${userId ? 'c.user_id = ?' : 'c.session_id = ?'}
    ORDER BY c.created_at DESC
  `
  
  const { results } = await c.env.DB.prepare(query)
    .bind(userId || sessionId)
    .all()
  
  return c.json({ cart_items: results })
})

// 장바구니에 상품 추가
app.post('/api/cart', async (c) => {
  const data = await c.req.json()
  const { user_id, session_id, product_id, quantity = 1 } = data
  
  if (!user_id && !session_id) {
    return c.json({ error: '사용자 ID 또는 세션 ID가 필요합니다' }, 400)
  }
  
  if (!product_id) {
    return c.json({ error: '상품 ID가 필요합니다' }, 400)
  }
  
  // 상품 존재 및 재고 확인
  const product = await c.env.DB.prepare(
    'SELECT id, price, stock_quantity, is_available FROM products WHERE id = ?'
  ).bind(product_id).first()
  
  if (!product) {
    return c.json({ error: '상품을 찾을 수 없습니다' }, 404)
  }
  
  if (!product.is_available) {
    return c.json({ error: '판매 중단된 상품입니다' }, 400)
  }
  
  if (product.stock_quantity < quantity) {
    return c.json({ error: '재고가 부족합니다', available_stock: product.stock_quantity }, 400)
  }
  
  // 이미 장바구니에 있는지 확인
  const existingItem = await c.env.DB.prepare(`
    SELECT id, quantity FROM cart_items 
    WHERE product_id = ? AND ${user_id ? 'user_id = ?' : 'session_id = ?'}
  `).bind(product_id, user_id || session_id).first()
  
  if (existingItem) {
    // 수량 업데이트
    const newQuantity = (existingItem.quantity as number) + quantity
    
    if (product.stock_quantity < newQuantity) {
      return c.json({ 
        error: '재고가 부족합니다', 
        available_stock: product.stock_quantity,
        current_cart_quantity: existingItem.quantity
      }, 400)
    }
    
    await c.env.DB.prepare(`
      UPDATE cart_items 
      SET quantity = ?, price_snapshot = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(newQuantity, product.price, existingItem.id).run()
    
    return c.json({ 
      success: true, 
      cart_item_id: existingItem.id,
      quantity: newQuantity,
      message: '장바구니 수량이 업데이트되었습니다'
    })
  }
  
  // 새로 추가
  const result = await c.env.DB.prepare(`
    INSERT INTO cart_items (user_id, session_id, product_id, quantity, price_snapshot)
    VALUES (?, ?, ?, ?, ?)
  `).bind(user_id || null, session_id || null, product_id, quantity, product.price).run()
  
  return c.json({ 
    success: true, 
    cart_item_id: result.meta.last_row_id,
    message: '장바구니에 추가되었습니다'
  })
})

// 장바구니 수량 변경
app.put('/api/cart/:id', async (c) => {
  const cartItemId = c.req.param('id')
  const data = await c.req.json()
  const { quantity, is_selected } = data
  
  // 현재 장바구니 항목 조회
  const cartItem = await c.env.DB.prepare(
    'SELECT product_id FROM cart_items WHERE id = ?'
  ).bind(cartItemId).first()
  
  if (!cartItem) {
    return c.json({ error: '장바구니 항목을 찾을 수 없습니다' }, 404)
  }
  
  // 수량 변경인 경우 재고 확인
  if (quantity !== undefined) {
    const product = await c.env.DB.prepare(
      'SELECT stock_quantity, is_available FROM products WHERE id = ?'
    ).bind(cartItem.product_id).first()
    
    if (!product || !product.is_available) {
      return c.json({ error: '상품을 구매할 수 없습니다' }, 400)
    }
    
    if (product.stock_quantity < quantity) {
      return c.json({ 
        error: '재고가 부족합니다', 
        available_stock: product.stock_quantity 
      }, 400)
    }
    
    await c.env.DB.prepare(`
      UPDATE cart_items 
      SET quantity = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(quantity, cartItemId).run()
  }
  
  // 선택 상태 변경
  if (is_selected !== undefined) {
    await c.env.DB.prepare(`
      UPDATE cart_items 
      SET is_selected = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(is_selected ? 1 : 0, cartItemId).run()
  }
  
  return c.json({ success: true, message: '장바구니가 업데이트되었습니다' })
})

// 장바구니 항목 삭제
app.delete('/api/cart/:id', async (c) => {
  const cartItemId = c.req.param('id')
  
  await c.env.DB.prepare('DELETE FROM cart_items WHERE id = ?')
    .bind(cartItemId).run()
  
  return c.json({ success: true, message: '장바구니에서 삭제되었습니다' })
})

// 장바구니 전체 비우기
app.delete('/api/cart', async (c) => {
  const userId = c.req.query('user_id')
  const sessionId = c.req.query('session_id')
  
  if (!userId && !sessionId) {
    return c.json({ error: '사용자 ID 또는 세션 ID가 필요합니다' }, 400)
  }
  
  await c.env.DB.prepare(`
    DELETE FROM cart_items WHERE ${userId ? 'user_id = ?' : 'session_id = ?'}
  `).bind(userId || sessionId).run()
  
  return c.json({ success: true, message: '장바구니가 비워졌습니다' })
})

// 위시리스트 목록 조회
app.get('/api/wishlist', async (c) => {
  const userId = c.req.query('user_id')
  
  if (!userId) {
    return c.json({ error: '사용자 ID가 필요합니다' }, 400)
  }
  
  const { results } = await c.env.DB.prepare(`
    SELECT 
      w.id, w.product_id, w.created_at,
      p.name, p.price, p.main_image, p.is_available, p.stock_quantity,
      pr.name as producer_name
    FROM wishlist w
    JOIN products p ON w.product_id = p.id
    LEFT JOIN producers pr ON p.producer_id = pr.id
    WHERE w.user_id = ?
    ORDER BY w.created_at DESC
  `).bind(userId).all()
  
  return c.json({ wishlist: results })
})

// 위시리스트에 추가
app.post('/api/wishlist', async (c) => {
  const data = await c.req.json()
  const { user_id, product_id } = data
  
  if (!user_id || !product_id) {
    return c.json({ error: '사용자 ID와 상품 ID가 필요합니다' }, 400)
  }
  
  try {
    const result = await c.env.DB.prepare(`
      INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)
    `).bind(user_id, product_id).run()
    
    return c.json({ 
      success: true, 
      wishlist_id: result.meta.last_row_id,
      message: '찜 목록에 추가되었습니다'
    })
  } catch (error) {
    // UNIQUE 제약 위반 (이미 추가됨)
    return c.json({ error: '이미 찜 목록에 있습니다' }, 409)
  }
})

// 위시리스트에서 삭제
app.delete('/api/wishlist/:id', async (c) => {
  const wishlistId = c.req.param('id')
  
  await c.env.DB.prepare('DELETE FROM wishlist WHERE id = ?')
    .bind(wishlistId).run()
  
  return c.json({ success: true, message: '찜 목록에서 삭제되었습니다' })
})

// ===== 주문 관리 API =====

// 주문 생성
app.post('/api/orders', async (c) => {
  const data = await c.req.json()
  
  // 주문번호 생성 (ORD + YYYYMMDD + 시퀀스)
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const { results } = await c.env.DB.prepare(
    `SELECT COUNT(*) as count FROM orders WHERE order_number LIKE 'ORD${today}%'`
  ).all()
  const sequence = String((results[0].count as number) + 1).padStart(3, '0')
  const orderNumber = `ORD${today}${sequence}`
  
  // 주문 생성
  const orderResult = await c.env.DB.prepare(`
    INSERT INTO orders (
      order_number, user_id, buyer_name, buyer_email, buyer_phone,
      recipient_name, recipient_phone, delivery_address, delivery_zipcode, delivery_memo,
      total_amount, discount_amount, shipping_fee, final_amount,
      order_status, payment_status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')
  `).bind(
    orderNumber,
    data.user_id || null,
    data.buyer_name,
    data.buyer_email,
    data.buyer_phone,
    data.recipient_name,
    data.recipient_phone,
    data.delivery_address,
    data.delivery_zipcode,
    data.delivery_memo || null,
    data.total_amount,
    data.discount_amount || 0,
    data.shipping_fee || 3000,
    data.final_amount
  ).run()
  
  const orderId = orderResult.meta.last_row_id
  
  // 주문 상품 추가
  for (const item of data.items) {
    await c.env.DB.prepare(`
      INSERT INTO order_items (
        order_id, product_id, product_name, product_price, quantity,
        discount_rate, item_total, producer_id, commission_rate,
        commission_amount, producer_revenue
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      orderId,
      item.product_id,
      item.product_name,
      item.product_price,
      item.quantity,
      item.discount_rate || 0,
      item.item_total,
      item.producer_id,
      item.commission_rate || 9.9,
      item.commission_amount,
      item.producer_revenue
    ).run()
  }
  
  // 상태 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, 'new', 'pending', 'system', '주문 생성')
  `).bind(orderId).run()
  
  return c.json({ 
    success: true, 
    order_id: orderId,
    order_number: orderNumber
  })
})

// 주문 목록 조회
app.get('/api/orders', async (c) => {
  const userId = c.req.query('user_id')
  const status = c.req.query('status')
  const limit = parseInt(c.req.query('limit') || '20')
  const offset = parseInt(c.req.query('offset') || '0')
  
  let query = `
    SELECT o.*, 
           COUNT(oi.id) as item_count
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    WHERE 1=1
  `
  
  const bindings: any[] = []
  
  if (userId) {
    query += ' AND o.user_id = ?'
    bindings.push(userId)
  }
  
  if (status) {
    query += ' AND o.order_status = ?'
    bindings.push(status)
  }
  
  query += ' GROUP BY o.id ORDER BY o.created_at DESC LIMIT ? OFFSET ?'
  bindings.push(limit, offset)
  
  const { results } = await c.env.DB.prepare(query).bind(...bindings).all()
  
  return c.json({ orders: results })
})

// 주문 상세 조회
app.get('/api/orders/:id', async (c) => {
  const orderId = c.req.param('id')
  
  // 주문 정보
  const orderResult = await c.env.DB.prepare(
    'SELECT * FROM orders WHERE id = ?'
  ).bind(orderId).first()
  
  if (!orderResult) {
    return c.json({ error: 'Order not found' }, 404)
  }
  
  // 주문 상품
  const itemsResult = await c.env.DB.prepare(
    'SELECT * FROM order_items WHERE order_id = ?'
  ).bind(orderId).all()
  
  // 배송 정보
  const shipmentResult = await c.env.DB.prepare(
    'SELECT * FROM order_shipments WHERE order_id = ? ORDER BY created_at DESC LIMIT 1'
  ).bind(orderId).first()
  
  // 수령 확인 정보
  const confirmationResult = await c.env.DB.prepare(
    'SELECT * FROM order_confirmations WHERE order_id = ?'
  ).bind(orderId).first()
  
  // 상태 이력
  const historyResult = await c.env.DB.prepare(
    'SELECT * FROM order_status_history WHERE order_id = ? ORDER BY created_at DESC'
  ).bind(orderId).all()
  
  return c.json({
    order: orderResult,
    items: itemsResult.results,
    shipment: shipmentResult,
    confirmation: confirmationResult,
    history: historyResult.results
  })
})

// 생산자별 주문 조회
app.get('/api/orders/producer/:producerId', async (c) => {
  const producerId = c.req.param('producerId')
  
  // 생산자의 상품을 포함한 주문들 조회
  const { results } = await c.env.DB.prepare(`
    SELECT DISTINCT
      o.id as order_id,
      o.order_number,
      o.buyer_name,
      o.buyer_phone,
      o.recipient_name,
      o.recipient_phone,
      o.delivery_address,
      o.order_status,
      o.payment_status,
      o.payment_method,
      o.total_amount,
      o.final_amount,
      o.created_at,
      COUNT(oi.id) as item_count
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    WHERE oi.producer_id = ?
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `).bind(producerId).all()
  
  return c.json({ orders: results })
})

// 주문 상태 변경
app.put('/api/orders/:id/status', async (c) => {
  const orderId = c.req.param('id')
  const data = await c.req.json()
  
  // 현재 주문 조회
  const currentOrder = await c.env.DB.prepare(
    'SELECT order_status FROM orders WHERE id = ?'
  ).bind(orderId).first()
  
  if (!currentOrder) {
    return c.json({ error: 'Order not found' }, 404)
  }
  
  // 상태 업데이트
  await c.env.DB.prepare(
    'UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind(data.new_status, orderId).run()
  
  // 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, ?, ?, ?, ?)
  `).bind(
    orderId,
    currentOrder.order_status,
    data.new_status,
    data.changed_by || 'system',
    data.change_reason || ''
  ).run()
  
  return c.json({ success: true })
})

// 결제 완료 처리
app.post('/api/orders/:id/payment', async (c) => {
  const orderId = c.req.param('id')
  const data = await c.req.json()
  
  // 주문 상태 업데이트
  await c.env.DB.prepare(`
    UPDATE orders 
    SET order_status = 'paid', 
        payment_status = 'completed',
        payment_method = ?,
        payment_date = CURRENT_TIMESTAMP,
        payment_transaction_id = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(data.payment_method, data.transaction_id, orderId).run()
  
  // 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, 'pending', 'paid', 'system', '결제 완료')
  `).bind(orderId).run()
  
  return c.json({ success: true })
})

// 배송 정보 등록
app.post('/api/orders/:id/shipment', async (c) => {
  const orderId = c.req.param('id')
  const data = await c.req.json()
  
  // 배송 정보 등록
  await c.env.DB.prepare(`
    INSERT INTO order_shipments (
      order_id, courier_company, tracking_number, shipped_date,
      estimated_delivery_date, delivery_status
    ) VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, 'shipped')
  `).bind(
    orderId,
    data.courier_company,
    data.tracking_number,
    data.estimated_delivery_date
  ).run()
  
  // 주문 상태 업데이트
  await c.env.DB.prepare(
    'UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind('shipping', orderId).run()
  
  // 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, 'preparing', 'shipping', ?, '배송 시작')
  `).bind(orderId, data.changed_by || 'system').run()
  
  return c.json({ success: true })
})

// 배송 완료 처리
app.put('/api/orders/:id/delivered', async (c) => {
  const orderId = c.req.param('id')
  
  // 주문 상태 업데이트
  await c.env.DB.prepare(
    'UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind('delivered', orderId).run()
  
  // 배송 상태 업데이트
  await c.env.DB.prepare(`
    UPDATE order_shipments 
    SET delivery_status = 'delivered', 
        delivery_completed_date = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE order_id = ?
  `).bind(orderId).run()
  
  // 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, 'shipping', 'delivered', 'system', '배송 완료')
  `).bind(orderId).run()
  
  return c.json({ success: true })
})

// 수령 확인
app.post('/api/orders/:id/confirm', async (c) => {
  const orderId = c.req.param('id')
  const data = await c.req.json()
  
  // 주문 상태 확인
  const order = await c.env.DB.prepare(
    'SELECT order_status FROM orders WHERE id = ?'
  ).bind(orderId).first()
  
  if (!order || order.order_status !== 'delivered') {
    return c.json({ error: '배송 완료된 주문만 수령 확인할 수 있습니다' }, 400)
  }
  
  // 수령 확인 등록
  await c.env.DB.prepare(`
    INSERT INTO order_confirmations (
      order_id, confirmed_by, confirmed_date, rating, review_comment, is_reviewed
    ) VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?, ?)
  `).bind(
    orderId,
    data.user_id || null,
    data.rating || null,
    data.review_comment || null,
    data.rating ? 1 : 0
  ).run()
  
  return c.json({ success: true })
})

// 주문 취소
app.post('/api/orders/:id/cancel', async (c) => {
  const orderId = c.req.param('id')
  const data = await c.req.json()
  
  // 주문 상태 확인
  const order = await c.env.DB.prepare(
    'SELECT order_status FROM orders WHERE id = ?'
  ).bind(orderId).first()
  
  if (!order) {
    return c.json({ error: 'Order not found' }, 404)
  }
  
  if (order.order_status === 'shipped' || order.order_status === 'delivered') {
    return c.json({ error: '배송 시작된 주문은 취소할 수 없습니다' }, 400)
  }
  
  // 주문 상태 업데이트
  await c.env.DB.prepare(
    'UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind('cancelled', orderId).run()
  
  // 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, ?, 'cancelled', ?, ?)
  `).bind(
    orderId,
    order.order_status,
    data.changed_by || 'customer',
    data.cancel_reason || '구매자 요청'
  ).run()
  
  return c.json({ success: true })
})

// ===== 결제 및 정산 시스템 API =====

// 사업자 계좌 등록
app.post('/api/producers/:id/business-account', async (c) => {
  const producerId = c.req.param('id')
  const data = await c.req.json()
  
  try {
    const result = await c.env.DB.prepare(`
      INSERT INTO business_accounts (
        producer_id, business_registration_number, business_name, representative_name,
        business_type, business_category, bank_name, account_number, account_holder,
        commission_rate, settlement_cycle, minimum_settlement_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      producerId,
      data.business_registration_number,
      data.business_name,
      data.representative_name,
      data.business_type || null,
      data.business_category || null,
      data.bank_name,
      data.account_number,
      data.account_holder,
      data.commission_rate || 9.9,
      data.settlement_cycle || 'weekly',
      data.minimum_settlement_amount || 10000
    ).run()
    
    return c.json({ 
      success: true, 
      accountId: result.meta.last_row_id,
      message: '사업자 계좌가 등록되었습니다. 관리자 승인 후 사용 가능합니다.'
    })
  } catch (error: any) {
    return c.json({ error: '계좌 등록 실패: ' + error.message }, 500)
  }
})

// 사업자 계좌 조회
app.get('/api/producers/:id/business-account', async (c) => {
  const producerId = c.req.param('id')
  
  const account = await c.env.DB.prepare(`
    SELECT 
      id, producer_id, business_registration_number, business_name, representative_name,
      business_type, business_category, bank_name, 
      SUBSTR(account_number, 1, 3) || '-****-' || SUBSTR(account_number, -4) as account_number_masked,
      account_holder, commission_rate, settlement_cycle, minimum_settlement_amount,
      verification_status, verified_at, is_active, created_at
    FROM business_accounts
    WHERE producer_id = ?
  `).bind(producerId).first()
  
  if (!account) {
    return c.json({ error: '등록된 계좌 정보가 없습니다' }, 404)
  }
  
  return c.json({ account })
})

// 사업자 계좌 수정
app.put('/api/producers/:id/business-account', async (c) => {
  const producerId = c.req.param('id')
  const data = await c.req.json()
  
  try {
    await c.env.DB.prepare(`
      UPDATE business_accounts SET
        bank_name = ?, account_number = ?, account_holder = ?,
        settlement_cycle = ?, updated_at = CURRENT_TIMESTAMP
      WHERE producer_id = ?
    `).bind(
      data.bank_name,
      data.account_number,
      data.account_holder,
      data.settlement_cycle || 'weekly',
      producerId
    ).run()
    
    return c.json({ success: true, message: '계좌 정보가 수정되었습니다.' })
  } catch (error: any) {
    return c.json({ error: '계좌 수정 실패: ' + error.message }, 500)
  }
})

// 결제 승인 검증 (토스페이먼츠)
app.post('/api/payment/confirm', async (c) => {
  const { orderId, amount, paymentKey } = await c.req.json()
  
  // 토스페이먼츠 API 키 확인
  const SECRET_KEY = c.env.TOSS_PAYMENTS_SECRET_KEY
  if (!SECRET_KEY) {
    return c.json({ error: '결제 시스템 설정 오류' }, 500)
  }
  
  try {
    // 토스페이먼츠 승인 API 호출
    const authString = btoa(SECRET_KEY + ':')
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderId, amount, paymentKey })
    })
    
    const payment = await response.json()
    
    if (!response.ok) {
      throw new Error(payment.message || '결제 승인 실패')
    }
    
    // 주문 정보 조회
    const order = await c.env.DB.prepare(
      'SELECT id FROM orders WHERE order_number = ?'
    ).bind(orderId).first()
    
    if (!order) {
      return c.json({ error: '주문을 찾을 수 없습니다' }, 404)
    }
    
    // 결제 트랜잭션 저장
    await c.env.DB.prepare(`
      INSERT INTO payment_transactions (
        order_id, pg_provider, pg_transaction_id, payment_method, payment_amount,
        card_company, card_number_masked, installment_months,
        transaction_status, approved_at, approval_number, pg_response_data
      ) VALUES (?, 'tosspayments', ?, ?, ?, ?, ?, ?, 'completed', CURRENT_TIMESTAMP, ?, ?)
    `).bind(
      order.id,
      paymentKey,
      payment.method,
      payment.totalAmount,
      payment.card?.company || null,
      payment.card?.number || null,
      payment.card?.installmentPlanMonths || 0,
      payment.approvedAt,
      JSON.stringify(payment)
    ).run()
    
    // 주문 상태 업데이트
    await c.env.DB.prepare(`
      UPDATE orders SET 
        payment_status = 'completed',
        payment_method = ?,
        payment_date = CURRENT_TIMESTAMP,
        payment_transaction_id = ?,
        order_status = 'paid',
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(payment.method, paymentKey, order.id).run()
    
    return c.json({ 
      success: true, 
      payment,
      message: '결제가 완료되었습니다.'
    })
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
})

// 결제 취소
app.post('/api/payment/cancel', async (c) => {
  const { paymentKey, cancelReason } = await c.req.json()
  
  const SECRET_KEY = c.env.TOSS_PAYMENTS_SECRET_KEY
  if (!SECRET_KEY) {
    return c.json({ error: '결제 시스템 설정 오류' }, 500)
  }
  
  try {
    const authString = btoa(SECRET_KEY + ':')
    const response = await fetch(`https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cancelReason })
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.message || '결제 취소 실패')
    }
    
    // 트랜잭션 상태 업데이트
    await c.env.DB.prepare(`
      UPDATE payment_transactions SET
        transaction_status = 'cancelled',
        cancelled_at = CURRENT_TIMESTAMP,
        cancel_reason = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE pg_transaction_id = ?
    `).bind(cancelReason, paymentKey).run()
    
    // 주문 상태 업데이트
    await c.env.DB.prepare(`
      UPDATE orders SET
        payment_status = 'refunded',
        order_status = 'cancelled',
        updated_at = CURRENT_TIMESTAMP
      WHERE payment_transaction_id = ?
    `).bind(paymentKey).run()
    
    return c.json({ success: true, message: '결제가 취소되었습니다.' })
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
})

// 정산 내역 조회 (생산자용)
app.get('/api/producers/:id/settlements', async (c) => {
  const producerId = c.req.param('id')
  
  const settlements = await c.env.DB.prepare(`
    SELECT 
      ps.*,
      sb.settlement_period_start,
      sb.settlement_period_end,
      sb.settlement_status as batch_status
    FROM producer_settlements ps
    JOIN settlement_batches sb ON ps.settlement_batch_id = sb.id
    WHERE ps.producer_id = ?
    ORDER BY sb.settlement_period_end DESC
    LIMIT 50
  `).bind(producerId).all()
  
  return c.json({ settlements: settlements.results })
})

// 정산 상세 내역 (주문 목록)
app.get('/api/settlements/:id/items', async (c) => {
  const settlementId = c.req.param('id')
  
  const items = await c.env.DB.prepare(`
    SELECT * FROM settlement_items
    WHERE settlement_id = ?
    ORDER BY order_date DESC
  `).bind(settlementId).all()
  
  return c.json({ items: items.results })
})

// 정산 배치 생성 (관리자용)
app.post('/api/admin/settlements/create-batch', async (c) => {
  const { periodStart, periodEnd } = await c.req.json()
  
  try {
    // 1. 정산 배치 생성
    const batchResult = await c.env.DB.prepare(`
      INSERT INTO settlement_batches (
        settlement_period_start, settlement_period_end, settlement_status
      ) VALUES (?, ?, 'calculating')
    `).bind(periodStart, periodEnd).run()
    
    const batchId = batchResult.meta.last_row_id
    
    // 2. 생산자별 정산 계산
    const producers = await c.env.DB.prepare(`
      SELECT 
        p.id as producer_id,
        ba.id as account_id,
        ba.bank_name,
        ba.account_number,
        ba.account_holder,
        ba.commission_rate,
        COUNT(DISTINCT oi.order_id) as order_count,
        SUM(oi.item_total) as total_sales,
        SUM(oi.commission_amount) as total_commission
      FROM producers p
      JOIN business_accounts ba ON p.id = ba.producer_id
      JOIN order_items oi ON p.id = oi.producer_id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.payment_status = 'completed'
        AND o.order_status NOT IN ('cancelled', 'refunded')
        AND o.payment_date BETWEEN ? AND ?
        AND ba.verification_status = 'verified'
        AND ba.is_active = 1
      GROUP BY p.id
    `).bind(periodStart, periodEnd).all()
    
    let totalOrderAmount = 0
    let totalCommission = 0
    let totalSettlement = 0
    
    // 3. 생산자별 정산 레코드 생성
    for (const producer of producers.results as any[]) {
      const settlementAmount = producer.total_sales - producer.total_commission
      
      await c.env.DB.prepare(`
        INSERT INTO producer_settlements (
          settlement_batch_id, producer_id, account_id,
          settlement_period_start, settlement_period_end,
          order_count, total_sales_amount, total_commission_amount, settlement_amount,
          bank_name, account_number, account_holder, settlement_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `).bind(
        batchId, producer.producer_id, producer.account_id,
        periodStart, periodEnd,
        producer.order_count, producer.total_sales,
        producer.total_commission, settlementAmount,
        producer.bank_name, producer.account_number, producer.account_holder
      ).run()
      
      totalOrderAmount += producer.total_sales
      totalCommission += producer.total_commission
      totalSettlement += settlementAmount
    }
    
    // 4. 배치 통계 업데이트
    await c.env.DB.prepare(`
      UPDATE settlement_batches SET
        settlement_status = 'ready',
        total_order_amount = ?,
        total_commission_amount = ?,
        total_settlement_amount = ?,
        producer_count = ?,
        calculated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(totalOrderAmount, totalCommission, totalSettlement, producers.results.length, batchId).run()
    
    // 5. 플랫폼 수익 기록
    await c.env.DB.prepare(`
      INSERT INTO platform_revenues (
        settlement_batch_id, revenue_period_start, revenue_period_end,
        total_commission_amount, total_order_count, total_order_amount
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).bind(batchId, periodStart, periodEnd, totalCommission, producers.results.length, totalOrderAmount).run()
    
    return c.json({ 
      success: true,
      batchId,
      producerCount: producers.results.length,
      totalOrderAmount,
      totalCommission,
      totalSettlement
    })
  } catch (error: any) {
    return c.json({ error: '정산 배치 생성 실패: ' + error.message }, 500)
  }
})

// 정산 배치 목록 (관리자용)
app.get('/api/admin/settlements/batches', async (c) => {
  const batches = await c.env.DB.prepare(`
    SELECT * FROM settlement_batches
    ORDER BY settlement_period_end DESC
    LIMIT 50
  `).all()
  
  return c.json({ batches: batches.results })
})

// ===== JSX Renderer =====
import { jsxRenderer } from 'hono/jsx-renderer'

app.use('*', jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <title>다공 - 차와 공예의 직거래 플랫폼</title>
        <meta name="description" content="다공 - 전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진을 줄여 합리적 가격으로 좋은 품질을 만나보세요." />
        
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#7c9473" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="다공" />
        
        {/* SEO Keywords */}
        <meta name="keywords" content="다공, 한국차, 전통차, 공예품, 차 직거래, 공예품 직거래, 차산지, 공예산지, 다도, 지역특산품, 보성녹차, 하동녹차, 제주녹차, 전통공예, 도자기, 목공예, 금속공예, Korean tea, Korean craft, traditional tea, handmade craft, direct trade" />
        <meta name="author" content="다공" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="NaverBot" content="index, follow" />
        <meta name="Yeti" content="index, follow" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://dagong.co.kr/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="다공" />
        <meta property="og:title" content="다공 - 차와 공예의 직거래 플랫폼 | 생산자 직거래로 합리적 가격에" />
        <meta property="og:description" content="전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진 없이 생산자에게 직접 구매하세요. 보성녹차, 하동녹차, 제주녹차부터 전통 도자기, 목공예까지 - 소비자가 대비 최대 50% 절약!" />
        <meta property="og:url" content="https://dagong.co.kr/" />
        <meta property="og:image" content="https://dagong.co.kr/static/icons/icon-512x512.png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:locale" content="ko_KR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dagong_kr" />
        <meta name="twitter:title" content="다공 - 차와 공예의 직거래 플랫폼" />
        <meta name="twitter:description" content="전통 차와 공예품을 생산자와 직거래하는 플랫폼. 중간마진 없이 합리적 가격으로 좋은 품질을 만나보세요." />
        <meta name="twitter:image" content="https://dagong.co.kr/static/icons/icon-512x512.png" />
        
        {/* Naver Site Verification */}
        <meta name="naver-site-verification" content="51a0658e89bc8816eeb448bf53b1862b86609662" />
        
        {/* Structured Data */}
        <meta property="article:publisher" content="https://dagong.co.kr" />
        
        {/* External Resources */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* PWA Manifest */}
        <meta name="theme-color" content="#7c9473" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="다공" />
        <link rel="icon" type="image/png" sizes="512x512" href="/static/icons/icon-512x512.png" />
        
        {/* i18n Script */}
        <script src="/static/i18n.js"></script>
        
        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{__html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'tea-green': '#7c9473',
                    'tea-brown': '#8b6f47',
                    'tea-cream': '#f5f1e8',
                    'craft-blue': '#5b7c99',
                  }
                }
              }
            }
          `}} />
      </head>
      <body class="bg-tea-cream min-h-screen">
        {children}
        
        {/* Scripts */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
        <script src="/static/producer-forms.js"></script>
        <script src="/static/mobile.js"></script>
      </body>
    </html>
  )
}))

// ===== Homepage =====
app.get('/', (c) => {
  return c.render(
    <>
      {/* Navigation */}
      <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" class="flex items-center space-x-3 group">
              <i class="fas fa-leaf text-tea-green text-2xl group-hover:rotate-12 transition-transform duration-300"></i>
              <div class="flex items-center" id="logoText">
                <span class="text-2xl font-bold text-gray-800">다공</span>
              </div>
            </a>
            
            {/* Desktop Menu */}
            <div class="hidden md:flex items-center space-x-8">
              <a href="/products?type=tea" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition group">
                <i class="fas fa-mug-hot text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.teaDirect">차 직거래</span>
              </a>
              <a href="/products?type=craft" class="flex flex-col items-center text-gray-700 hover:text-craft-blue transition group">
                <i class="fas fa-palette text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.craft">공예품</span>
              </a>
              <a href="/products?type=gift_set" class="flex flex-col items-center text-gray-700 hover:text-tea-brown transition group">
                <i class="fas fa-gift text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.giftSet">선물세트</span>
              </a>
              <a href="/products?type=local" class="flex flex-col items-center text-gray-700 hover:text-green-600 transition group">
                <i class="fas fa-seedling text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.localProducts">지역특산물</span>
              </a>
              <a href="/regions" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition group">
                <i class="fas fa-map-marked-alt text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.regions">지역별 보기</span>
              </a>
              <a href="/experiences" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition group">
                <i class="fas fa-users text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.experiences">체험·교육</span>
              </a>
              <div class="relative group">
                <a href="/education/curriculum" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition">
                  <i class="fas fa-graduation-cap text-xl mb-1"></i>
                  <span class="text-sm" data-i18n="nav.education">다도교육</span>
                </a>
                <div class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <a href="/education/curriculum" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-book mr-2"></i>
                    <span data-i18n="nav.educationCurriculum">교육 커리큘럼</span>
                  </a>
                  <a href="/education/apply" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-pencil-alt mr-2"></i>
                    <span data-i18n="nav.educationApply">교육 신청</span>
                  </a>
                  <a href="/education/status" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-list-check mr-2"></i>
                    <span data-i18n="nav.educationStatus">교육 현황</span>
                  </a>
                </div>
              </div>
              <a href="/events" class="flex flex-col items-center text-gray-700 hover:text-tea-brown transition group">
                <i class="fas fa-star text-xl mb-1"></i>
                <span class="text-sm" data-i18n="nav.events">이벤트</span>
              </a>
            </div>
            
            {/* Right Actions */}
            <div class="flex items-center space-x-4">
              <button id="searchBtn" class="text-gray-700 hover:text-tea-green">
                <i class="fas fa-search text-xl"></i>
              </button>
              <a href="/cart" class="relative text-gray-700 hover:text-tea-green transition">
                <i class="fas fa-shopping-cart text-xl"></i>
                <span id="cartCount" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold" style="display: none;">0</span>
              </a>
              <div class="relative hidden md:block">
                <button id="langBtn" class="flex items-center space-x-1 text-gray-700 hover:text-tea-green transition">
                  <i class="fas fa-globe text-xl"></i>
                  <span id="currentLang" class="text-sm font-medium">KO</span>
                  <i class="fas fa-chevron-down text-xs"></i>
                </button>
                <div id="langDropdown" class="hidden absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <button data-lang="ko" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                    <span class="flex items-center"><span class="mr-2">🇰🇷</span> 한국어</span>
                    <span class="text-xs text-gray-500">KO</span>
                  </button>
                  <button data-lang="en" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                    <span class="flex items-center"><span class="mr-2">🇺🇸</span> English</span>
                    <span class="text-xs text-gray-500">EN</span>
                  </button>
                  <button data-lang="zh" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                    <span class="flex items-center"><span class="mr-2">🇨🇳</span> 中文</span>
                    <span class="text-xs text-gray-500">ZH</span>
                  </button>
                  <button data-lang="ja" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                    <span class="flex items-center"><span class="mr-2">🇯🇵</span> 日本語</span>
                    <span class="text-xs text-gray-500">JA</span>
                  </button>
                </div>
              </div>
              <div id="userMenu" class="hidden md:block">
                <a href="/login" id="loginBtn" class="text-gray-700 hover:text-tea-green">
                  <i class="fas fa-user text-xl"></i>
                </a>
                <div id="userDropdown" class="hidden relative">
                  <button id="userMenuBtn" class="flex items-center space-x-2 text-gray-700 hover:text-tea-green">
                    <img id="userAvatar" src="" alt="프로필" class="w-8 h-8 rounded-full" />
                    <span id="userName"></span>
                  </button>
                  <div id="dropdownMenu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <a href="/mypage" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <i class="fas fa-user mr-2"></i>마이페이지
                    </a>
                    <button id="logoutBtn" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <i class="fas fa-sign-out-alt mr-2"></i>로그아웃
                    </button>
                  </div>
                </div>
              </div>
              <button id="mobileMenuBtn" class="md:hidden text-gray-700">
                <i class="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div id="mobileMenu" class="hidden md:hidden pb-4">
            <a href="/products?type=tea" class="block py-2 text-gray-700 hover:text-tea-green">차 직거래</a>
            <a href="/products?type=craft" class="block py-2 text-gray-700 hover:text-craft-blue">공예품</a>
            <a href="/products?type=gift_set" class="block py-2 text-gray-700 hover:text-tea-brown">선물세트</a>
            <a href="/products?type=local" class="block py-2 text-gray-700 hover:text-green-600">지역특산물</a>
            <a href="/regions" class="block py-2 text-gray-700 hover:text-tea-green">지역별 보기</a>
            <a href="/experiences" class="block py-2 text-gray-700 hover:text-tea-green">체험·교육</a>
            <div class="py-2">
              <div class="font-medium text-gray-900 mb-1">다도교육</div>
              <a href="/education/curriculum" class="block py-1 pl-4 text-gray-700 hover:text-tea-green">교육 커리큘럼</a>
              <a href="/education/apply" class="block py-1 pl-4 text-gray-700 hover:text-tea-green">교육 신청</a>
              <a href="/education/status" class="block py-1 pl-4 text-gray-700 hover:text-tea-green">교육 현황</a>
            </div>
            <a href="/events" class="block py-2 text-gray-700 hover:text-tea-brown">이벤트</a>
            <div class="py-2 border-t border-gray-200 mt-2">
              <div class="font-medium text-gray-900 mb-2 flex items-center">
                <i class="fas fa-globe mr-2"></i>언어 선택
              </div>
              <button data-lang-mobile="ko" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                <span class="mr-2">🇰🇷</span> 한국어 (Korean)
              </button>
              <button data-lang-mobile="en" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                <span class="mr-2">🇺🇸</span> English
              </button>
              <button data-lang-mobile="zh" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                <span class="mr-2">🇨🇳</span> 中文 (Chinese)
              </button>
              <button data-lang-mobile="ja" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                <span class="mr-2">🇯🇵</span> 日本語 (Japanese)
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Search Modal */}
      <div id="searchModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-gray-800">검색</h3>
              <button id="closeSearchBtn" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
            <input type="text" id="searchInput" placeholder="상품, 생산자, 지역을 검색하세요..." class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green" />
            <div id="searchResults" class="mt-4"></div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main class="min-h-screen">
        <div id="app">
          <div class="loading">로딩 중...</div>
        </div>
      </main>
      
      {/* Footer */}
      <footer class="bg-gray-800 text-white mt-20">
        <div class="container mx-auto px-4 py-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 class="text-lg font-bold mb-4">다공</h4>
              <p class="text-gray-400 text-sm">전통 차와 공예품을 생산자와<br />직거래하는 플랫폼입니다.</p>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-4">상품</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="/products?type=tea" class="text-gray-400 hover:text-white">차 직거래</a></li>
                <li><a href="/products?type=craft" class="text-gray-400 hover:text-white">공예품</a></li>
                <li><a href="/products?type=gift_set" class="text-gray-400 hover:text-white">선물세트</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-4">지역</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="/regions?type=tea" class="text-gray-400 hover:text-white">차 산지</a></li>
                <li><a href="/regions?type=craft" class="text-gray-400 hover:text-white">공예 산지</a></li>
                <li><a href="/producers" class="text-gray-400 hover:text-white">생산자</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-4">체험·이벤트</h4>
              <ul class="space-y-2 text-sm">
                <li><a href="/experiences" class="text-gray-400 hover:text-white">체험 프로그램</a></li>
                <li><a href="/events" class="text-gray-400 hover:text-white">이달의 이벤트</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 다공. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
})

// ===== 포인트 시스템 API =====

// 내 포인트 조회
app.get('/api/points/me', authMiddleware, async (c) => {
  const user = c.get('user') as any
  
  // 포인트 정보 조회
  let userPoints = await c.env.DB.prepare(
    'SELECT * FROM user_points WHERE user_id = ?'
  ).bind(user.user_id).first()
  
  // 포인트 정보가 없으면 생성
  if (!userPoints) {
    await c.env.DB.prepare(`
      INSERT INTO user_points (user_id, total_points, available_points, used_points, withdrawn_points)
      VALUES (?, 0, 0, 0, 0)
    `).bind(user.user_id).run()
    
    userPoints = {
      user_id: user.user_id,
      total_points: 0,
      available_points: 0,
      used_points: 0,
      withdrawn_points: 0
    }
  }
  
  // 최근 거래 내역 조회 (최근 10건)
  const { results: recentTransactions } = await c.env.DB.prepare(`
    SELECT * FROM point_transactions 
    WHERE user_id = ? 
    ORDER BY created_at DESC 
    LIMIT 10
  `).bind(user.user_id).all()
  
  // 추천인 정보 조회
  const referralInfo = await c.env.DB.prepare(
    'SELECT referrer_id, total_referral_earnings FROM user_referrals WHERE referred_user_id = ?'
  ).bind(user.user_id).first()
  
  // 내가 추천한 사람들 수
  const referredCount = await c.env.DB.prepare(
    'SELECT COUNT(*) as count FROM user_referrals WHERE referrer_id = ?'
  ).bind(user.user_id).first() as any
  
  return c.json({
    points: userPoints,
    recent_transactions: recentTransactions,
    referral_info: referralInfo,
    referred_count: referredCount?.count || 0,
    cash_conversion: {
      points_required: 600000,
      cash_amount: 50000,
      can_withdraw: (userPoints as any).available_points >= 600000
    }
  })
})

// 포인트 거래 내역 조회 (페이징)
app.get('/api/points/transactions', authMiddleware, async (c) => {
  const user = c.get('user') as any
  const limit = parseInt(c.req.query('limit') || '20')
  const offset = parseInt(c.req.query('offset') || '0')
  const type = c.req.query('type') // 거래 유형 필터
  
  let query = 'SELECT * FROM point_transactions WHERE user_id = ?'
  const params: any[] = [user.user_id]
  
  if (type) {
    query += ' AND transaction_type = ?'
    params.push(type)
  }
  
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  
  // 전체 개수 조회
  let countQuery = 'SELECT COUNT(*) as total FROM point_transactions WHERE user_id = ?'
  const countParams: any[] = [user.user_id]
  
  if (type) {
    countQuery += ' AND transaction_type = ?'
    countParams.push(type)
  }
  
  const total = await c.env.DB.prepare(countQuery).bind(...countParams).first() as any
  
  return c.json({
    transactions: results,
    pagination: {
      total: total?.total || 0,
      limit,
      offset,
      has_more: (total?.total || 0) > offset + limit
    }
  })
})

// 포인트 현금 출금 신청
app.post('/api/points/withdraw', authMiddleware, async (c) => {
  const user = c.get('user') as any
  const data = await c.req.json()
  
  // 필수 필드 검증
  if (!data.bank_name || !data.account_number || !data.account_holder) {
    return c.json({ error: '은행명, 계좌번호, 예금주를 모두 입력해주세요' }, 400)
  }
  
  // 포인트 정보 조회
  const userPoints = await c.env.DB.prepare(
    'SELECT * FROM user_points WHERE user_id = ?'
  ).bind(user.user_id).first() as any
  
  if (!userPoints || userPoints.available_points < 600000) {
    return c.json({ 
      error: '출금 가능한 포인트가 부족합니다. 600,000P 이상 필요합니다',
      available_points: userPoints?.available_points || 0,
      required_points: 600000
    }, 400)
  }
  
  // 트랜잭션 시작
  try {
    // 1. 포인트 차감
    await c.env.DB.prepare(`
      UPDATE user_points 
      SET available_points = available_points - 600000,
          withdrawn_points = withdrawn_points + 600000,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `).bind(user.user_id).run()
    
    // 2. 출금 신청 생성
    const withdrawal = await c.env.DB.prepare(`
      INSERT INTO point_withdrawals 
      (user_id, points, cash_amount, bank_name, account_number, account_holder, status)
      VALUES (?, 600000, 50000, ?, ?, ?, 'pending')
    `).bind(user.user_id, data.bank_name, data.account_number, data.account_holder).run()
    
    // 3. 포인트 거래 내역 추가
    const newBalance = userPoints.available_points - 600000
    await c.env.DB.prepare(`
      INSERT INTO point_transactions 
      (user_id, transaction_type, points, balance_after, description)
      VALUES (?, 'withdraw', -600000, ?, '현금 출금 신청 (50,000원)')
    `).bind(user.user_id, newBalance).run()
    
    return c.json({
      success: true,
      withdrawal_id: (withdrawal.meta as any).last_row_id,
      points_withdrawn: 600000,
      cash_amount: 50000,
      remaining_points: newBalance,
      message: '출금 신청이 완료되었습니다. 영업일 기준 3-5일 내 처리됩니다.'
    })
  } catch (error) {
    return c.json({ error: '출금 신청 중 오류가 발생했습니다' }, 500)
  }
})

// 출금 신청 내역 조회
app.get('/api/points/withdrawals', authMiddleware, async (c) => {
  const user = c.get('user') as any
  
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM point_withdrawals 
    WHERE user_id = ? 
    ORDER BY requested_at DESC
  `).bind(user.user_id).all()
  
  return c.json({ withdrawals: results })
})

// 추천인 코드로 가입 처리 (회원가입 시 호출)
app.post('/api/referrals/register', authMiddleware, async (c) => {
  const user = c.get('user') as any
  const { referrer_code } = await c.req.json()
  
  if (!referrer_code) {
    return c.json({ error: '추천인 코드가 없습니다' }, 400)
  }
  
  // 추천인 존재 확인
  const referrer = await c.env.DB.prepare(
    'SELECT user_id FROM users WHERE referral_code = ?'
  ).bind(referrer_code).first() as any
  
  if (!referrer) {
    return c.json({ error: '유효하지 않은 추천인 코드입니다' }, 404)
  }
  
  // 자기 자신을 추천인으로 등록 방지
  if (referrer.user_id === user.user_id) {
    return c.json({ error: '자기 자신을 추천인으로 등록할 수 없습니다' }, 400)
  }
  
  // 이미 추천인이 등록되어 있는지 확인
  const existing = await c.env.DB.prepare(
    'SELECT * FROM user_referrals WHERE referred_user_id = ?'
  ).bind(user.user_id).first()
  
  if (existing) {
    return c.json({ error: '이미 추천인이 등록되어 있습니다' }, 400)
  }
  
  try {
    // 1. 추천 관계 생성
    await c.env.DB.prepare(`
      INSERT INTO user_referrals (referrer_id, referred_user_id, signup_bonus_given)
      VALUES (?, ?, 1)
    `).bind(referrer.user_id, user.user_id).run()
    
    // 2. 추천인에게 20,000P 지급
    await c.env.DB.prepare(`
      INSERT INTO user_points (user_id, total_points, available_points)
      VALUES (?, 20000, 20000)
      ON CONFLICT(user_id) DO UPDATE SET
        total_points = total_points + 20000,
        available_points = available_points + 20000,
        updated_at = CURRENT_TIMESTAMP
    `).bind(referrer.user_id).run()
    
    // 3. 피추천인에게 20,000P 지급
    await c.env.DB.prepare(`
      INSERT INTO user_points (user_id, total_points, available_points)
      VALUES (?, 20000, 20000)
      ON CONFLICT(user_id) DO UPDATE SET
        total_points = total_points + 20000,
        available_points = available_points + 20000,
        updated_at = CURRENT_TIMESTAMP
    `).bind(user.user_id).run()
    
    // 4. 추천인 포인트 거래 내역
    const referrerBalance = await c.env.DB.prepare(
      'SELECT available_points FROM user_points WHERE user_id = ?'
    ).bind(referrer.user_id).first() as any
    
    await c.env.DB.prepare(`
      INSERT INTO point_transactions 
      (user_id, transaction_type, points, balance_after, referred_user_id, description)
      VALUES (?, 'referral_bonus', 20000, ?, ?, '친구 초대 보너스')
    `).bind(referrer.user_id, referrerBalance.available_points, user.user_id).run()
    
    // 5. 피추천인 포인트 거래 내역
    await c.env.DB.prepare(`
      INSERT INTO point_transactions 
      (user_id, transaction_type, points, balance_after, referrer_id, description)
      VALUES (?, 'referral_bonus', 20000, 20000, ?, '추천인 가입 보너스')
    `).bind(user.user_id, referrer.user_id).run()
    
    return c.json({
      success: true,
      message: '추천인 등록이 완료되었습니다. 20,000P가 지급되었습니다!',
      points_earned: 20000
    })
  } catch (error) {
    return c.json({ error: '추천인 등록 중 오류가 발생했습니다' }, 500)
  }
})

// 주문 완료 후 포인트 적립 (내부 함수로 사용)
async function awardPurchasePoints(
  db: any, 
  userId: string, 
  orderId: number, 
  productPrice: number, 
  pointRate: number
) {
  const pointsEarned = Math.floor(productPrice * (pointRate / 100))
  
  // 1. 구매자 포인트 적립
  await db.prepare(`
    INSERT INTO user_points (user_id, total_points, available_points)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      total_points = total_points + ?,
      available_points = available_points + ?,
      updated_at = CURRENT_TIMESTAMP
  `).bind(userId, pointsEarned, pointsEarned, pointsEarned, pointsEarned).run()
  
  // 2. 포인트 거래 내역 추가
  const userBalance = await db.prepare(
    'SELECT available_points FROM user_points WHERE user_id = ?'
  ).bind(userId).first() as any
  
  await db.prepare(`
    INSERT INTO point_transactions 
    (user_id, transaction_type, points, balance_after, order_id, description)
    VALUES (?, 'purchase_earn', ?, ?, ?, '상품 구매 적립')
  `).bind(userId, pointsEarned, userBalance.available_points, orderId).run()
  
  // 3. 주문에 적립 포인트 기록
  await db.prepare(`
    UPDATE orders SET points_earned = ? WHERE id = ?
  `).bind(pointsEarned, orderId).run()
  
  // 4. 추천인이 있으면 추천인에게도 포인트 적립
  const referral = await db.prepare(
    'SELECT referrer_id FROM user_referrals WHERE referred_user_id = ?'
  ).bind(userId).first() as any
  
  if (referral) {
    await db.prepare(`
      INSERT INTO user_points (user_id, total_points, available_points)
      VALUES (?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        total_points = total_points + ?,
        available_points = available_points + ?,
        updated_at = CURRENT_TIMESTAMP
    `).bind(referral.referrer_id, pointsEarned, pointsEarned, pointsEarned, pointsEarned).run()
    
    // 추천인 포인트 거래 내역
    const referrerBalance = await db.prepare(
      'SELECT available_points FROM user_points WHERE user_id = ?'
    ).bind(referral.referrer_id).first() as any
    
    await db.prepare(`
      INSERT INTO point_transactions 
      (user_id, transaction_type, points, balance_after, order_id, referred_user_id, description)
      VALUES (?, 'referral_earn', ?, ?, ?, ?, '추천인 구매 적립')
    `).bind(referral.referrer_id, pointsEarned, referrerBalance.available_points, orderId, userId).run()
    
    // 추천 총 수익 업데이트
    await db.prepare(`
      UPDATE user_referrals 
      SET total_referral_earnings = total_referral_earnings + ?
      WHERE referrer_id = ? AND referred_user_id = ?
    `).bind(pointsEarned, referral.referrer_id, userId).run()
  }
  
  return {
    buyer_points: pointsEarned,
    referrer_points: referral ? pointsEarned : 0
  }
}

export default app

// ===== 주문 확인 및 정산 API =====

// 구매확정 (수령 확인)
app.post('/api/orders/:id/confirm', async (c) => {
  const orderId = c.req.param('id')
  const data = await c.req.json()
  
  // 주문 존재 확인
  const order = await c.env.DB.prepare(
    'SELECT * FROM orders WHERE id = ?'
  ).bind(orderId).first()
  
  if (!order) {
    return c.json({ error: '주문을 찾을 수 없습니다' }, 404)
  }
  
  // 이미 확인된 주문인지 체크
  const existing = await c.env.DB.prepare(
    'SELECT * FROM order_confirmations WHERE order_id = ?'
  ).bind(orderId).first()
  
  if (existing) {
    return c.json({ error: '이미 구매확정된 주문입니다' }, 400)
  }
  
  // 구매확정 등록 (confirmed_at + 3일 = settlement_due_date)
  const confirmedAt = new Date()
  const settlementDueDate = new Date(confirmedAt.getTime() + 3 * 24 * 60 * 60 * 1000)
  
  await c.env.DB.prepare(`
    INSERT INTO order_confirmations (
      order_id, confirmed_by, confirmed_at, confirmation_type,
      settlement_due_date, settlement_status
    ) VALUES (?, ?, ?, ?, ?, 'pending')
  `).bind(
    orderId,
    data.user_id || null,
    confirmedAt.toISOString(),
    data.confirmation_type || 'manual',
    settlementDueDate.toISOString()
  ).run()
  
  // 주문 상태를 'delivered'로 업데이트
  await c.env.DB.prepare(`
    UPDATE orders SET order_status = 'delivered' WHERE id = ?
  `).bind(orderId).run()
  
  // 상태 이력 추가
  await c.env.DB.prepare(`
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by, change_reason)
    VALUES (?, ?, 'delivered', ?, '구매확정')
  `).bind(orderId, (order as any).order_status, data.user_id || 'system').run()
  
  // 포인트 적립 처리
  const orderData = order as any
  const { results: orderItems } = await c.env.DB.prepare(
    'SELECT oi.*, p.point_rate FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?'
  ).bind(orderId).all()
  
  let totalPointsEarned = 0
  for (const item of orderItems) {
    const itemData = item as any
    const pointsForItem = Math.floor(itemData.price * itemData.quantity * ((itemData.point_rate || 35) / 100))
    totalPointsEarned += pointsForItem
  }
  
  if (totalPointsEarned > 0 && orderData.user_id) {
    await awardPurchasePoints(c.env.DB, orderData.user_id, parseInt(orderId), totalPointsEarned, 100)
  }
  
  return c.json({ 
    success: true, 
    message: '구매확정이 완료되었습니다',
    points_earned: totalPointsEarned,
    settlement_due_date: settlementDueDate.toISOString(),
    settlement_info: '3일 이내에 판매자에게 정산됩니다'
  })
})

// 정산 대기 목록 조회 (관리자용)
app.get('/api/settlements/pending', async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT 
      oc.id as confirmation_id,
      oc.order_id,
      oc.confirmed_at,
      oc.settlement_due_date,
      oc.settlement_status,
      o.order_number,
      o.final_amount,
      o.buyer_name,
      SUM(oi.producer_revenue) as total_producer_revenue,
      SUM(oi.commission_amount) as total_commission
    FROM order_confirmations oc
    JOIN orders o ON oc.order_id = o.id
    JOIN order_items oi ON o.id = oi.order_id
    WHERE oc.settlement_status = 'pending'
    AND date(oc.settlement_due_date) <= date('now')
    GROUP BY oc.id
    ORDER BY oc.settlement_due_date ASC
  `).all()
  
  return c.json({ settlements: results })
})

// 정산 처리 (관리자용)
app.post('/api/settlements/:confirmationId/process', async (c) => {
  const confirmationId = c.req.param('confirmationId')
  const data = await c.req.json()
  
  // 구매확정 정보 조회
  const confirmation = await c.env.DB.prepare(`
    SELECT * FROM order_confirmations WHERE id = ?
  `).bind(confirmationId).first()
  
  if (!confirmation) {
    return c.json({ error: '구매확정 정보를 찾을 수 없습니다' }, 404)
  }
  
  if (confirmation.settlement_status !== 'pending') {
    return c.json({ error: '이미 처리된 정산입니다' }, 400)
  }
  
  // 정산 상태 업데이트
  await c.env.DB.prepare(`
    UPDATE order_confirmations 
    SET settlement_status = 'completed',
        settlement_date = CURRENT_TIMESTAMP,
        notes = ?
    WHERE id = ?
  `).bind(data.notes || '정산 완료', confirmationId).run()
  
  return c.json({ 
    success: true, 
    message: '정산이 완료되었습니다',
    confirmation_id: confirmationId
  })
})

// 생산자별 정산 내역 조회
app.get('/api/settlements/producer/:producerId', async (c) => {
  const producerId = c.req.param('producerId')
  const status = c.req.query('status') || 'all'
  const limit = parseInt(c.req.query('limit') || '50')
  const offset = parseInt(c.req.query('offset') || '0')
  
  let query = `
    SELECT 
      oc.id as confirmation_id,
      oc.order_id,
      oc.confirmed_at,
      oc.settlement_due_date,
      oc.settlement_date,
      oc.settlement_status,
      o.order_number,
      o.buyer_name,
      oi.product_name,
      oi.quantity,
      oi.item_total,
      oi.commission_amount,
      oi.producer_revenue
    FROM order_confirmations oc
    JOIN orders o ON oc.order_id = o.id
    JOIN order_items oi ON o.id = oi.order_id
    WHERE oi.producer_id = ?
  `
  
  const params: any[] = [producerId]
  
  if (status !== 'all') {
    query += ' AND oc.settlement_status = ?'
    params.push(status)
  }
  
  query += ' ORDER BY oc.confirmed_at DESC LIMIT ? OFFSET ?'
  params.push(limit, offset)
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all()
  
  return c.json({ settlements: results })
})

// 정산 통계 (생산자용)
app.get('/api/settlements/producer/:producerId/stats', async (c) => {
  const producerId = c.req.param('producerId')
  
  // 정산 예정 금액
  const pendingResult = await c.env.DB.prepare(`
    SELECT 
      COUNT(DISTINCT oc.id) as pending_count,
      SUM(oi.producer_revenue) as pending_amount
    FROM order_confirmations oc
    JOIN orders o ON oc.order_id = o.id
    JOIN order_items oi ON o.id = oi.order_id
    WHERE oi.producer_id = ?
    AND oc.settlement_status = 'pending'
  `).bind(producerId).first()
  
  // 정산 완료 금액 (이번 달)
  const completedResult = await c.env.DB.prepare(`
    SELECT 
      COUNT(DISTINCT oc.id) as completed_count,
      SUM(oi.producer_revenue) as completed_amount
    FROM order_confirmations oc
    JOIN orders o ON oc.order_id = o.id
    JOIN order_items oi ON o.id = oi.order_id
    WHERE oi.producer_id = ?
    AND oc.settlement_status = 'completed'
    AND strftime('%Y-%m', oc.settlement_date) = strftime('%Y-%m', 'now')
  `).bind(producerId).first()
  
  // 전체 정산 금액
  const totalResult = await c.env.DB.prepare(`
    SELECT 
      COUNT(DISTINCT oc.id) as total_count,
      SUM(oi.producer_revenue) as total_amount
    FROM order_confirmations oc
    JOIN orders o ON oc.order_id = o.id
    JOIN order_items oi ON o.id = oi.order_id
    WHERE oi.producer_id = ?
    AND oc.settlement_status = 'completed'
  `).bind(producerId).first()
  
  return c.json({
    pending: pendingResult,
    completed_this_month: completedResult,
    total: totalResult
  })
})

// 개인정보처리방침 페이지 (Google Play Console 필수)
app.get('/privacy', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>개인정보처리방침 - 다공(茶工)</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 py-12">
            <div class="bg-white rounded-lg shadow-md p-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-6">개인정보처리방침</h1>
                
                <div class="prose max-w-none">
                    <p class="text-gray-600 mb-4">
                        <strong>시행일자:</strong> 2026년 2월 19일
                    </p>

                    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. 개인정보의 수집 및 이용</h2>
                    <p class="text-gray-700 mb-4">
                        다공(茶工)은 사용자의 개인정보를 별도로 수집하지 않습니다. 
                        본 앱은 Progressive Web App(PWA) 형태로, 웹사이트를 래핑한 구조입니다.
                    </p>

                    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. 수집하는 정보</h2>
                    <p class="text-gray-700 mb-4">
                        다공(茶工)은 다음과 같은 방식으로 최소한의 정보를 처리합니다:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                        <li>쿠키 및 로컬 스토리지를 사용한 앱 설정 저장</li>
                        <li>상품 검색 및 필터링을 위한 임시 데이터 저장</li>
                        <li>서비스 개선을 위한 익명화된 사용 통계</li>
                    </ul>

                    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. 개인정보의 보관 및 파기</h2>
                    <p class="text-gray-700 mb-4">
                        본 앱은 사용자의 개인정보를 서버에 저장하지 않으며, 
                        브라우저의 로컬 스토리지에만 임시 저장됩니다. 
                        사용자가 브라우저 캐시를 삭제하면 모든 데이터가 즉시 삭제됩니다.
                    </p>

                    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. 제3자 제공</h2>
                    <p class="text-gray-700 mb-4">
                        다공(茶工)은 사용자의 개인정보를 제3자에게 제공하지 않습니다.
                    </p>

                    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. 사용자의 권리</h2>
                    <p class="text-gray-700 mb-4">
                        사용자는 언제든지:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                        <li>브라우저 설정에서 쿠키 및 로컬 스토리지 삭제 가능</li>
                        <li>앱 삭제를 통해 모든 저장된 데이터 제거 가능</li>
                    </ul>

                    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. 개인정보처리방침 변경</h2>
                    <p class="text-gray-700 mb-4">
                        본 방침은 법령 및 정책 변경에 따라 수정될 수 있으며, 
                        변경 시 웹사이트를 통해 공지합니다.
                    </p>

                    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. 문의</h2>
                    <p class="text-gray-700 mb-4">
                        개인정보처리방침에 대한 문의사항이 있으시면 아래로 연락 주시기 바랍니다:
                    </p>
                    <ul class="list-none text-gray-700 mb-4 space-y-2">
                        <li><strong>서비스명:</strong> 다공(茶工)</li>
                        <li><strong>웹사이트:</strong> <a href="https://dagong-bi1.pages.dev/" class="text-green-600 hover:underline">https://dagong-bi1.pages.dev/</a></li>
                    </ul>
                </div>

                <div class="mt-8 pt-8 border-t border-gray-200">
                    <a href="/" class="text-green-600 hover:text-green-700 font-medium">
                        ← 홈으로 돌아가기
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>
  `)
})

// ============================================
// 상품 등록 및 펀딩 API
// ============================================

// 1. 상품 등록 생성 (초안)
app.post('/api/listings', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    
    const { title, short_description, category, price, images = [] } = body
    
    // 필수 필드 확인
    if (!title || !short_description || !category || !price) {
      return c.json({ error: '필수 항목을 모두 입력해주세요' }, 400)
    }
    
    // 상품 등록 생성
    const result = await c.env.DB.prepare(`
      INSERT INTO product_listings 
      (user_id, title, short_description, category, price, status)
      VALUES (?, ?, ?, ?, ?, 'draft')
    `).bind(user.user_id, title, short_description, category, price).run()
    
    const listingId = result.meta.last_row_id
    
    // 이미지 저장
    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await c.env.DB.prepare(`
          INSERT INTO product_listing_images 
          (listing_id, image_url, image_order, is_main)
          VALUES (?, ?, ?, ?)
        `).bind(listingId, images[i], i, i === 0 ? 1 : 0).run()
      }
    }
    
    return c.json({
      success: true,
      listing_id: listingId,
      message: '상품 등록이 생성되었습니다'
    })
  } catch (error) {
    console.error('상품 등록 생성 오류:', error)
    return c.json({ error: '상품 등록 생성 중 오류가 발생했습니다' }, 500)
  }
})

// 2. AI 상세페이지 생성 요청
app.post('/api/listings/:id/generate-ai-description', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const listingId = c.req.param('id')
    
    // 상품 정보 가져오기
    const { results: listings } = await c.env.DB.prepare(`
      SELECT * FROM product_listings 
      WHERE id = ? AND user_id = ?
    `).bind(listingId, user.user_id).all()
    
    if (listings.length === 0) {
      return c.json({ error: '상품을 찾을 수 없습니다' }, 404)
    }
    
    const listing = listings[0]
    
    // AI 상세페이지 생성 (시뮬레이션)
    const aiDescription = `
# ${listing.title}

## 상품 소개
${listing.short_description}

## 특징
- 프리미엄 품질의 ${listing.category === 'tea' ? '차' : listing.category === 'craft' ? '공예품' : '상품'}입니다
- 장인의 정성이 담긴 수작업 제품
- 친환경 재료를 사용하여 안전합니다
- 선물용으로도 완벽한 패키징

## 상세 설명
이 상품은 전통 기법과 현대적 감각이 조화를 이룬 특별한 작품입니다. 
오랜 시간 연구와 개발을 통해 최고의 품질을 자랑합니다.

## 사용 방법
1. 제품을 개봉합니다
2. 사용 전 제품을 깨끗이 세척합니다
3. 용도에 맞게 사용하시면 됩니다

## 보관 방법
- 직사광선을 피해 서늘한 곳에 보관하세요
- 습기가 적은 곳에 보관하세요
- 사용 후에는 깨끗이 씻어 말려주세요

## 교환 및 반품
- 상품 수령 후 7일 이내 교환/반품 가능
- 미사용 제품에 한해 가능합니다
    `.trim()
    
    // DB에 저장
    await c.env.DB.prepare(`
      UPDATE product_listings 
      SET ai_detailed_description = ?,
          ai_generated_at = datetime('now'),
          updated_at = datetime('now')
      WHERE id = ?
    `).bind(aiDescription, listingId).run()
    
    // AI 생성 로그 저장
    await c.env.DB.prepare(`
      INSERT INTO ai_generation_logs 
      (listing_id, user_id, input_data, generated_content, model_used, status)
      VALUES (?, ?, ?, ?, 'gpt-4', 'completed')
    `).bind(
      listingId, 
      user.user_id, 
      JSON.stringify({ title: listing.title, description: listing.short_description }),
      aiDescription
    ).run()
    
    return c.json({
      success: true,
      description: aiDescription,
      message: 'AI 상세페이지가 생성되었습니다'
    })
  } catch (error) {
    console.error('AI 생성 오류:', error)
    return c.json({ error: 'AI 생성 중 오류가 발생했습니다' }, 500)
  }
})

// 3. 펀딩 설정
app.put('/api/listings/:id/funding', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const listingId = c.req.param('id')
    const body = await c.req.json()
    
    const { 
      funding_goal, 
      funding_start_date, 
      funding_end_date,
      min_funding_amount = 10000
    } = body
    
    // 펀딩 설정 업데이트
    await c.env.DB.prepare(`
      UPDATE product_listings 
      SET is_funding = 1,
          funding_goal = ?,
          funding_start_date = ?,
          funding_end_date = ?,
          min_funding_amount = ?,
          updated_at = datetime('now')
      WHERE id = ? AND user_id = ?
    `).bind(
      funding_goal, 
      funding_start_date, 
      funding_end_date,
      min_funding_amount,
      listingId, 
      user.user_id
    ).run()
    
    return c.json({
      success: true,
      message: '펀딩 설정이 완료되었습니다'
    })
  } catch (error) {
    console.error('펀딩 설정 오류:', error)
    return c.json({ error: '펀딩 설정 중 오류가 발생했습니다' }, 500)
  }
})

// 4. 일정 추가
app.post('/api/listings/:id/schedules', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const listingId = c.req.param('id')
    const body = await c.req.json()
    
    const { 
      schedule_date, 
      start_time, 
      end_time, 
      max_participants = 10,
      price_adjustment = 0
    } = body
    
    // 일정 추가
    const result = await c.env.DB.prepare(`
      INSERT INTO product_schedules 
      (listing_id, schedule_date, start_time, end_time, max_participants, price_adjustment)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(listingId, schedule_date, start_time, end_time, max_participants, price_adjustment).run()
    
    // 상품에 일정 있음 표시
    await c.env.DB.prepare(`
      UPDATE product_listings 
      SET has_schedule = 1,
          updated_at = datetime('now')
      WHERE id = ? AND user_id = ?
    `).bind(listingId, user.user_id).run()
    
    return c.json({
      success: true,
      schedule_id: result.meta.last_row_id,
      message: '일정이 추가되었습니다'
    })
  } catch (error) {
    console.error('일정 추가 오류:', error)
    return c.json({ error: '일정 추가 중 오류가 발생했습니다' }, 500)
  }
})

// 5. 상품 제출 (심사 요청)
app.put('/api/listings/:id/submit', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const listingId = c.req.param('id')
    
    // 상품 상태를 pending으로 변경
    await c.env.DB.prepare(`
      UPDATE product_listings 
      SET status = 'pending',
          updated_at = datetime('now')
      WHERE id = ? AND user_id = ? AND status = 'draft'
    `).bind(listingId, user.user_id).run()
    
    return c.json({
      success: true,
      message: '상품이 심사 요청되었습니다'
    })
  } catch (error) {
    console.error('상품 제출 오류:', error)
    return c.json({ error: '상품 제출 중 오류가 발생했습니다' }, 500)
  }
})

// 6. 내 상품 목록 조회
app.get('/api/my-listings', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    
    const { results: listings } = await c.env.DB.prepare(`
      SELECT pl.*,
             (SELECT image_url FROM product_listing_images 
              WHERE listing_id = pl.id AND is_main = 1 LIMIT 1) as main_image,
             (SELECT COUNT(*) FROM product_listing_images 
              WHERE listing_id = pl.id) as image_count
      FROM product_listings pl
      WHERE pl.user_id = ?
      ORDER BY pl.created_at DESC
    `).bind(user.user_id).all()
    
    return c.json({ listings })
  } catch (error) {
    console.error('상품 목록 조회 오류:', error)
    return c.json({ error: '상품 목록 조회 중 오류가 발생했습니다' }, 500)
  }
})

// 7. 상품 상세 조회
app.get('/api/listings/:id', async (c) => {
  try {
    const listingId = c.req.param('id')
    
    const { results: listings } = await c.env.DB.prepare(`
      SELECT pl.*,
             u.name as seller_name,
             u.profile_image as seller_image
      FROM product_listings pl
      JOIN users u ON pl.user_id = u.id
      WHERE pl.id = ?
    `).bind(listingId).all()
    
    if (listings.length === 0) {
      return c.json({ error: '상품을 찾을 수 없습니다' }, 404)
    }
    
    // 이미지 가져오기
    const { results: images } = await c.env.DB.prepare(`
      SELECT * FROM product_listing_images 
      WHERE listing_id = ?
      ORDER BY image_order
    `).bind(listingId).all()
    
    // 일정 가져오기
    const { results: schedules } = await c.env.DB.prepare(`
      SELECT * FROM product_schedules 
      WHERE listing_id = ? AND schedule_date >= date('now')
      ORDER BY schedule_date, start_time
    `).bind(listingId).all()
    
    // 조회수 증가
    await c.env.DB.prepare(`
      UPDATE product_listings 
      SET view_count = view_count + 1
      WHERE id = ?
    `).bind(listingId).run()
    
    return c.json({
      listing: listings[0],
      images,
      schedules
    })
  } catch (error) {
    console.error('상품 조회 오류:', error)
    return c.json({ error: '상품 조회 중 오류가 발생했습니다' }, 500)
  }
})

// 8. 펀딩 목록 조회 (공개)
app.get('/api/fundings', async (c) => {
  try {
    const status = c.req.query('status') || 'active'
    
    let query = `
      SELECT pl.*,
             u.name as seller_name,
             (SELECT image_url FROM product_listing_images 
              WHERE listing_id = pl.id AND is_main = 1 LIMIT 1) as main_image,
             ROUND((pl.funding_current_amount * 100.0 / pl.funding_goal), 1) as funding_percentage
      FROM product_listings pl
      JOIN users u ON pl.user_id = u.id
      WHERE pl.is_funding = 1 AND pl.status = 'published'
    `
    
    if (status === 'active') {
      query += ` AND pl.funding_end_date >= date('now')`
    } else if (status === 'ended') {
      query += ` AND pl.funding_end_date < date('now')`
    }
    
    query += ` ORDER BY pl.created_at DESC`
    
    const { results: fundings } = await c.env.DB.prepare(query).all()
    
    return c.json({ fundings })
  } catch (error) {
    console.error('펀딩 목록 조회 오류:', error)
    return c.json({ error: '펀딩 목록 조회 중 오류가 발생했습니다' }, 500)
  }
})

// 9. 펀딩 후원하기
app.post('/api/fundings/:id/pledge', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const listingId = c.req.param('id')
    const body = await c.req.json()
    
    const { amount, quantity = 1, message } = body
    
    // 최소 금액 확인
    const { results: listings } = await c.env.DB.prepare(`
      SELECT * FROM product_listings WHERE id = ?
    `).bind(listingId).all()
    
    if (listings.length === 0) {
      return c.json({ error: '펀딩을 찾을 수 없습니다' }, 404)
    }
    
    const listing = listings[0]
    
    if (amount < listing.min_funding_amount) {
      return c.json({ 
        error: `최소 후원 금액은 ${listing.min_funding_amount}원입니다` 
      }, 400)
    }
    
    // 후원 저장
    const result = await c.env.DB.prepare(`
      INSERT INTO funding_pledges 
      (listing_id, user_id, amount, quantity, backer_message, payment_status)
      VALUES (?, ?, ?, ?, ?, 'pending')
    `).bind(listingId, user.user_id, amount, quantity, message).run()
    
    // 펀딩 금액 업데이트
    await c.env.DB.prepare(`
      UPDATE product_listings 
      SET funding_current_amount = funding_current_amount + ?,
          funding_backers_count = funding_backers_count + 1
      WHERE id = ?
    `).bind(amount, listingId).run()
    
    return c.json({
      success: true,
      pledge_id: result.meta.last_row_id,
      message: '후원이 완료되었습니다'
    })
  } catch (error) {
    console.error('펀딩 후원 오류:', error)
    return c.json({ error: '펀딩 후원 중 오류가 발생했습니다' }, 500)
  }
})

