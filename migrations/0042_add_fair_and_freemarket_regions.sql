-- 마이그레이션: 지역별 보기에 '한국차공예품박람회'와 '프리마켓' 탭 추가
-- type은 'craft'로 저장하고, 프론트엔드에서 name으로 구분

INSERT INTO regions (name, type, description, featured_image) VALUES
('한국차공예품박람회', 'craft', '전국의 차와 공예품이 모이는 대규모 박람회', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'),
('프리마켓', 'craft', '수제 차와 공예품을 자유롭게 거래하는 프리마켓', 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800');
