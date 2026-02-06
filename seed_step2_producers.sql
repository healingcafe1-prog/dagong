-- 생산자 데이터
INSERT OR REPLACE INTO producers (id, name, region_id, producer_type, description, story, profile_image, contact_email, contact_phone, address) VALUES
(1, '제주 설록다원', 1, 'tea', '제주의 청정 자연에서 자란 유기농 녹차를 생산합니다', '1983년부터 제주의 맑은 공기와 화산토에서 건강한 차를 키워왔습니다', '/images/producers/seolrok.jpg', 'seolrok@example.com', '064-123-4567', '제주시 한림읍'),
(2, '하동 야생차 농원', 2, 'tea', '지리산 자락의 천년 야생차를 전통 방식으로 만듭니다', '조상 대대로 내려온 야생 차나무를 정성껏 가꿔왔습니다', '/images/producers/hadong.jpg', 'hadong@example.com', '055-880-1234', '하동군 화개면'),
(3, '보성 대한다원', 5, 'tea', '국내 최대 규모의 차밭에서 품질 좋은 녹차를 생산합니다', '1957년 설립 이후 한국 녹차 산업을 선도해왔습니다', '/images/producers/boseong.jpg', 'boseong@example.com', '061-852-1234', '보성군 보성읍'),
(4, '강진 백운옥판차', 6, 'tea', '다산 선생의 차문화를 현대에 계승합니다', '전통 제차법으로 만든 고품질 녹차를 생산합니다', '/images/producers/gangjin.jpg', 'gangjin@example.com', '061-432-1234', '강진군 성전면'),
(5, '광주 사기장', 9, 'craft', '500년 전통의 분청사기를 현대적으로 재해석합니다', '조선시대부터 내려온 도자기 제작 기법을 보존하고 있습니다', '/images/producers/gwangju-pottery.jpg', 'gwangju@example.com', '031-762-1234', '광주시 남한산성면'),
(6, '이천 백자공방', 10, 'craft', '세계적 수준의 백자를 만드는 명인의 공방', '대를 이어 백자만을 고집하며 작품을 만들고 있습니다', '/images/producers/icheon-pottery.jpg', 'icheon@example.com', '031-634-1234', '이천시 신둔면'),
(7, '여주 도예촌', 11, 'craft', '현대적 감각의 다기를 제작하는 젊은 도예가들의 공방', '전통과 현대를 조화시킨 실용적인 다기를 만듭니다', '/images/producers/yeoju-pottery.jpg', 'yeoju@example.com', '031-884-1234', '여주시 점동면'),
(8, '부안 옹기마을', 13, 'craft', '변산반도의 전통 옹기를 만드는 장인들의 협동 작업장', '300년 전통의 옹기 제작 기법을 이어가고 있습니다', '/images/producers/buan-pottery.jpg', 'buan@example.com', '063-582-1234', '부안군 보안면'),
(9, '강진 청자촌', 14, 'craft', '고려청자를 복원하고 현대적으로 재해석하는 명장', '천년 전통의 고려청자 기법을 계승하고 발전시키고 있습니다', '/images/producers/gangjin-celadon.jpg', 'gangjin-craft@example.com', '061-430-3755', '강진군 대구면'),
(10, '문경 사기장', 15, 'craft', '문경 전통 사기의 맥을 잇는 도예 명장', '400년 넘게 이어온 문경 사기의 전통을 현대에 계승하고 있습니다', '/images/producers/mungyeong-pottery.jpg', 'mungyeong@example.com', '054-571-1234', '문경시 가은읍'),
(11, '제주 한라산 감귤농장', 1, 'local', '제주 청정 자연에서 자란 달콤한 감귤을 재배합니다', '3대째 이어온 감귤 농사로 품질 좋은 감귤만을 생산합니다', '/images/producers/jeju-citrus.jpg', 'citrus@example.com', '064-756-1234', '제주시 애월읍'),
(12, '하동 섬진강 재첩마을', 2, 'local', '맑은 섬진강에서 자란 싱싱한 재첩을 생산합니다', '청정 섬진강의 재첩으로 건강을 전합니다', '/images/producers/hadong-jaechup.jpg', 'jaechup@example.com', '055-880-5678', '하동군 하동읍'),
(13, '보성 녹차쌀 농가', 5, 'local', '녹차를 먹여 키운 친환경 녹차쌀을 재배합니다', '녹차밭 주변에서 재배한 향긋한 쌀입니다', '/images/producers/boseong-rice.jpg', 'rice@example.com', '061-852-5678', '보성군 회천면'),
(14, '강진 한우목장', 6, 'local', '청정 지역에서 정성껏 키운 한우를 생산합니다', '좋은 사료와 깨끗한 환경에서 건강하게 키운 한우', '/images/producers/gangjin-beef.jpg', 'beef@example.com', '061-432-5678', '강진군 칠량면'),
(15, '부안 천일염 생산', 8, 'local', '변산반도 갯벌에서 만든 천일염을 생산합니다', '미네랄이 풍부한 청정 갯벌 천일염', '/images/producers/buan-salt.jpg', 'salt@example.com', '063-582-5678', '부안군 진서면');
