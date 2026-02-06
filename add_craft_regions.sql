-- 공예산지에 김해, 진천 추가

INSERT OR IGNORE INTO regions (name, type, description, featured_image) VALUES
  ('김해', 'craft', '가야 도자기 전통을 잇는 공예의 고장', '/images/regions/gimhae-craft.jpg'),
  ('진천', 'craft', '전통 도자기와 공예의 명맥을 이어가는 지역', '/images/regions/jincheon-craft.jpg');
