-- 교육과정 4개 추가 (ID 27-30)
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, content, duration, difficulty, display_order, thumbnail_image, created_at) VALUES
(27, 1, '차 관광 해설사', '차 산업 관광 전문 해설사 양성 과정입니다.', '차 역사, 문화, 해설 기법, 현장 실습 등을 배웁니다. 교재, 해설 자료, 현장 답사 제공. 사전 지식 불필요. 완료시 관광 해설사 자격증 취득.', '44시간', 'intermediate', 27, '/images/education/tea-guide.jpg', '2024-01-01 00:00:00'),
(28, 3, '전통 죽세공예', '전통 대나무 세공예 기술을 배웁니다.', '대나무 가공, 편조 기법, 작품 제작, 마감 등을 배웁니다. 교재, 공구, 대나무 재료 제공. 사전 지식 불필요. 완료시 죽세공예 기초 수료증 취득.', '40시간', 'intermediate', 28, '/images/education/bamboo-craft.jpg', '2024-01-01 00:00:00'),
(29, 1, '차 품평 전문가', '전문적인 차 품평 기술을 배웁니다.', '감각 훈련, 품평 기법, 성분 분석, 등급 평가 등을 배웁니다. 교재, 다양한 차 샘플, 품평 도구 제공. 차 소믈리에 2급 이상 필수. 완료시 차 품평 전문가 인증 취득.', '52시간', 'advanced', 29, '/images/education/tea-tasting.jpg', '2024-01-01 00:00:00'),
(30, 2, '약용차 블렌딩', '약용 효과를 고려한 차 블렌딩을 배웁니다.', '약재 지식, 배합 원리, 블렌딩 실습, 효능 등을 배웁니다. 교재, 약재 샘플, 블렌딩 도구 제공. 한약 기초 지식 필수. 완료시 약용차 블렌딩 수료증 취득.', '36시간', 'intermediate', 30, '/images/education/herbal-tea.jpg', '2024-01-01 00:00:00');
