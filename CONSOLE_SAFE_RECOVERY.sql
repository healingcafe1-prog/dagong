-- ========================================
-- Cloudflare D1 콘솔 전용 복구 파일
-- PRAGMA 제거, INSERT만 포함
-- ========================================

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
