-- ========================================
-- 프로덕션 스키마에 맞춘 복구 SQL
-- ========================================

-- 1. regions 테이블 (featured_image 컬럼 사용)
INSERT OR IGNORE INTO regions (id, name, type, description, featured_image, created_at) VALUES
(1, '제주도', 'tea', '한국 최대 차 생산지', '/images/regions/jeju.jpg', '2024-01-01 00:00:00'),
(2, '하동', 'tea', '지리산 자락의 전통 차 재배지', '/images/regions/hadong.jpg', '2024-01-01 00:00:00'),
(3, '김해', 'tea', '낙동강 하류의 차 재배지', '/images/regions/gimhae.jpg', '2024-01-01 00:00:00'),
(4, '보성', 'tea', '한국을 대표하는 녹차 명소', '/images/regions/boseong.jpg', '2024-01-01 00:00:00'),
(5, '장흥', 'tea', '남도의 차 향기가 가득한 곳', '/images/regions/jangheung.jpg', '2024-01-01 00:00:00'),
(6, '강진', 'tea', '다산 정약용의 차 문화가 살아있는 곳', '/images/regions/gangjin.jpg', '2024-01-01 00:00:00'),
(7, '고흥', 'tea', '남해안의 차밭', '/images/regions/goheung.jpg', '2024-01-01 00:00:00'),
(8, '순천', 'tea', '생태 도시의 유기농 차', '/images/regions/suncheon.jpg', '2024-01-01 00:00:00'),
(9, '경기 광주', 'craft', '전통 도자기와 수공예의 고장', '/images/regions/gwangju.jpg', '2024-01-01 00:00:00'),
(10, '여주', 'craft', '조선 왕실 도자기의 전통', '/images/regions/yeoju.jpg', '2024-01-01 00:00:00'),
(11, '이천', 'craft', '한국 도자기의 메카', '/images/regions/icheon.jpg', '2024-01-01 00:00:00'),
(12, '충북 단양', 'craft', '마늘과 수공예의 고장', '/images/regions/danyang.jpg', '2024-01-01 00:00:00'),
(13, '전남 담양', 'craft', '대나무와 죽세공의 본고장', '/images/regions/damyang.jpg', '2024-01-01 00:00:00'),
(14, '전북 남원', 'craft', '목공예와 전통 악기의 고장', '/images/regions/namwon.jpg', '2024-01-01 00:00:00'),
(15, '경남 통영', 'craft', '나전칠기의 본고장', '/images/regions/tongyeong.jpg', '2024-01-01 00:00:00'),
(16, '경북 안동', 'craft', '전통 한지와 목공예', '/images/regions/andong.jpg', '2024-01-01 00:00:00'),
(17, '강원 평창', 'craft', '고랭지 농산물의 고장', '/images/regions/pyeongchang.jpg', '2024-01-01 00:00:00');
