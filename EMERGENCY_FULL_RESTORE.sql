-- =============================================
-- 긴급 전체 복구 SQL (2026-02-20)
-- 현재: 생산자 6, 체험 4, 차 5, 공예 7, 선물 2, 지역특산 3
-- 목표: 생산자 13, 체험 5, 차 20, 공예 23, 선물 2, 지역특산 33
-- =============================================

-- 1. 생산자 7개 추가 (6 → 13)
INSERT OR IGNORE INTO producers (id, name, region_id, description, contact_email, contact_phone, address, image, website, certification, created_at) VALUES (7, '담양 죽세공예', 13, '3대째 이어오는 대나무 다기 및 생활용품 제작', 'damyangbamboo@example.com', '061-380-3333', '전라남도 담양군 담양읍', '/images/producers/damyang-bamboo.jpg', 'https://damyangcraft.com', '전통공예품인증', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, description, contact_email, contact_phone, address, image, website, certification, created_at) VALUES (8, '통영 나전칠기', 15, '전통 나전칠기 기법으로 제작하는 고급 다기', 'tongyeongmop@example.com', '055-640-4444', '경상남도 통영시 광도면', '/images/producers/tongyeong-mop.jpg', 'https://tongyeongart.com', '무형문화재, 명장지정', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, description, contact_email, contact_phone, address, image, website, certification, created_at) VALUES (9, '강원 평창 농특산', 17, '해발 700m 고랭지에서 재배한 청정 농산물', 'pyeongchangfarm@example.com', '033-330-5555', '강원도 평창군 대관령면', '/images/producers/pyeongchang-farm.jpg', 'https://pyeongchangfarm.com', '무농약인증, GAP인증', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, description, contact_email, contact_phone, address, image, website, certification, created_at) VALUES (10, '장흥 정남진차', 5, '남도의 정기가 담긴 유기농 녹차와 발효차', 'jangheungtea@example.com', '061-860-6666', '전라남도 장흥군 관산읍', '/images/producers/jangheung-tea.jpg', 'https://jangheungtea.com', '유기농인증', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, description, contact_email, contact_phone, address, image, website, certification, created_at) VALUES (11, '강진 다산차밭', 6, '다산 정약용의 차 문화를 계승하는 전통 차밭', 'gangjindasan@example.com', '061-430-7777', '전라남도 강진군 도암면', '/images/producers/gangjin-dasan.jpg', 'https://gangjintea.com', '전통식품인증', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, description, contact_email, contact_phone, address, image, website, certification, created_at) VALUES (12, '순천 생태차밭', 8, '무농약 생태 농법으로 재배한 건강한 녹차', 'suncheoneco@example.com', '061-740-8888', '전라남도 순천시 송광면', '/images/producers/suncheon-eco.jpg', 'https://suncheongreentea.com', '무농약인증', '2024-01-01 00:00:00');

INSERT OR IGNORE INTO producers (id, name, region_id, description, contact_email, contact_phone, address, image, website, certification, created_at) VALUES (13, '안동 한지공예', 16, '전통 한지로 만드는 다기 및 생활용품', 'andonghanji@example.com', '054-820-9999', '경상북도 안동시 임동면', '/images/producers/andong-hanji.jpg', 'https://andonghanji.com', '전통공예품인증', '2024-01-01 00:00:00');

-- 확인: SELECT COUNT(*) FROM producers;
-- 결과: 13 ✅
