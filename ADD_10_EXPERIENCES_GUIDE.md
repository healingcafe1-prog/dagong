# 🎯 체험 프로그램 10개 추가 가이드

## 📊 현재 상태
- **현재**: 4개
- **추가**: 10개
- **최종**: 14개 ✅

---

## ⚡ 즉시 실행 방법

### 1단계: Cloudflare D1 콘솔 접속
```
https://dash.cloudflare.com/
→ Workers & Pages
→ D1
→ webapp-production
→ Console 탭
```

### 2단계: SQL 복사 및 실행

아래 SQL을 **한 번에 전체 복사** → 콘솔에 붙여넣기 → Execute

---

## 📋 체험 프로그램 목록 (10개)

### 5. 하동 야생차 채엽과 전통 제다
- **시간**: 4시간
- **가격**: 75,000원
- **인원**: 8명
- **난이도**: 중급
- **포함**: 야생차밭 트레킹, 채엽 체험, 전통 제다 실습, 점심, 완성 차 100g

### 6. 이천 백자 다기 만들기
- **시간**: 3시간
- **가격**: 85,000원
- **인원**: 8명
- **난이도**: 중급
- **포함**: 물레 체험, 성형, 초벌구이, 완성품 택배 배송

### 7. 담양 대나무 다기 만들기
- **시간**: 2.5시간
- **가격**: 48,000원
- **인원**: 12명
- **난이도**: 초급
- **포함**: 대나무 선택, 깎기 도구 사용법, 제작 체험, 완성품

### 8. 통영 나전칠기 찻잔받침 만들기
- **시간**: 3시간
- **가격**: 95,000원
- **인원**: 6명
- **난이도**: 중급
- **포함**: 역사 설명, 자개 선택, 붙이기 실습, 완성품

### 9. 장흥 정남진 발효차 체험
- **시간**: 3시간
- **가격**: 58,000원
- **인원**: 15명
- **난이도**: 초급
- **포함**: 이론 교육, 차 만들기, 시음, 완성 발효차 50g

### 10. 강진 다산 차 문화 탐방
- **시간**: 4시간
- **가격**: 65,000원
- **인원**: 20명
- **난이도**: 초급
- **포함**: 다산초당 방문, 문화 해설, 전통 다례 실습, 차와 다식

### 11. 순천 생태 차밭 명상과 요가
- **시간**: 3시간
- **가격**: 52,000원
- **인원**: 25명
- **난이도**: 초급
- **포함**: 요가 매트, 명상 가이드, 차 명상 세션, 유기농 차

### 12. 제주 유기농 말차 체험
- **시간**: 2.5시간
- **가격**: 48,000원
- **인원**: 15명
- **난이도**: 초급
- **포함**: 녹차 덖기, 분쇄 실습, 말차 라떼 만들기, 쿠키 만들기

### 13. 안동 전통 한지로 찻상 만들기
- **시간**: 2.5시간
- **가격**: 42,000원
- **인원**: 12명
- **난이도**: 초급
- **포함**: 한지 제작 견학, 공예 실습, 찻상 만들기, 완성품

### 14. 평창 고랭지 농장 투어와 차 시음
- **시간**: 3시간
- **가격**: 38,000원
- **인원**: 30명
- **난이도**: 초급
- **포함**: 농장 투어, 채소 수확 체험, 차와 농산물 시음, 선물

---

## 🔍 실행 SQL

```sql
-- 5. 하동 야생차 채엽과 전통 제다
INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (5, 3, '하동 야생차 채엽과 전통 제다', '지리산 자락의 야생차밭에서 손으로 차를 따고 전통 덖음 방식으로 차를 만드는 본격 체험', 240, 75000, 8, '/images/experiences/hadong-wild-tea.jpg', '경상남도 하동군 악양면', '야생차밭 트레킹, 채엽 체험, 전통 제다 실습, 점심 식사, 완성된 차 100g', '4-5월, 매주 토 09:00 (1회)', '중급', 14, '2024-01-10 00:00:00');

-- 6. 이천 백자 다기 만들기
INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (6, 6, '이천 백자 다기 만들기', '왕실 도자기 기법으로 나만의 찻잔이나 주전자를 직접 제작하는 프리미엄 체험', 180, 85000, 8, '/images/experiences/icheon-pottery.jpg', '경기도 이천시 신둔면', '물레 체험, 성형 실습, 초벌구이, 완성품 택배 배송', '매주 토-일 10:00, 14:00', '중급', 12, '2024-01-10 00:00:00');

-- 7. 담양 대나무 다기 만들기
INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (7, 7, '담양 대나무 다기 만들기', '대나무를 깎아 나만의 찻잔, 차통, 찻상을 만드는 전통 죽세공예 체험', 150, 48000, 12, '/images/experiences/damyang-bamboo.jpg', '전라남도 담양군 담양읍', '대나무 선택, 깎기 도구 사용법, 제작 체험, 완성품 가져가기', '매주 토-일 10:00, 14:00', '초급', 10, '2024-01-10 00:00:00');

-- 8. 통영 나전칠기 찻잔받침 만들기
INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (8, 8, '통영 나전칠기 찻잔받침 만들기', '자개를 박아 나만의 고급 찻잔받침을 만드는 무형문화재 기법 체험', 180, 95000, 6, '/images/experiences/tongyeong-mop.jpg', '경상남도 통영시 광도면', '나전칠기 역사 설명, 자개 선택, 붙이기 실습, 완성품 가져가기', '매주 토 13:00, 일 10:00', '중급', 14, '2024-01-10 00:00:00');

-- 9. 장흥 정남진 발효차 체험
INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (9, 10, '장흥 정남진 발효차 체험', '남도 전통 발효차를 직접 만들고 숙성 과정을 배우는 특별 체험', 180, 58000, 15, '/images/experiences/jangheung-fermented-tea.jpg', '전라남도 장흥군 관산읍', '발효차 이론 교육, 차 만들기 실습, 시음, 완성된 발효차 50g', '매주 토 10:00, 14:00', '초급', 12, '2024-01-10 00:00:00');

-- 10. 강진 다산 차 문화 탐방
INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (10, 11, '강진 다산 차 문화 탐방', '다산 정약용 선생의 차 문화 유적지를 돌아보고 전통 다례를 배우는 문화 체험', 240, 65000, 20, '/images/experiences/gangjin-dasan-culture.jpg', '전라남도 강진군 도암면', '다산초당 방문, 차 문화 해설, 전통 다례 실습, 차와 다식, 기념품', '매주 토-일 10:00', '초급', 8, '2024-01-10 00:00:00');

-- 11. 순천 생태 차밭 명상과 요가
INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (11, 12, '순천 생태 차밭 명상과 요가', '무농약 차밭에서 진행하는 명상, 요가, 차 명상이 결합된 힐링 프로그램', 180, 52000, 25, '/images/experiences/suncheon-eco-healing.jpg', '전라남도 순천시 송광면', '요가 매트, 명상 가이드, 차 명상 세션, 유기농 차와 간식', '매주 토-일 09:00, 15:00', '초급', 12, '2024-01-10 00:00:00');

-- 12. 제주 유기농 말차 체험
INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (12, 1, '제주 유기농 말차 체험', '제주 녹차를 곱게 갈아 말차를 만들고 말차 음료와 디저트를 만드는 체험', 150, 48000, 15, '/images/experiences/jeju-matcha.jpg', '제주특별자치도 서귀포시 표선면', '녹차 덖기 체험, 분쇄 실습, 말차 라떼 만들기, 말차 쿠키 만들기', '매주 수-일 13:00, 15:00', '초급', 8, '2024-01-10 00:00:00');

-- 13. 안동 전통 한지로 찻상 만들기
INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (13, 13, '안동 전통 한지로 찻상 만들기', '전통 한지 공예 기법으로 접이식 찻상과 찻잔받침을 만드는 체험', 150, 42000, 12, '/images/experiences/andong-hanji-craft.jpg', '경상북도 안동시 임동면', '한지 제작 과정 견학, 한지 공예 실습, 찻상 만들기, 완성품 가져가기', '매주 토-일 10:00, 14:00', '초급', 10, '2024-01-10 00:00:00');

-- 14. 평창 고랭지 농장 투어와 차 시음
INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (14, 9, '평창 고랭지 농장 투어와 차 시음', '해발 700m 청정 고랭지 농장을 견학하고 신선한 농산물과 차를 시음하는 힐링 투어', 180, 38000, 30, '/images/experiences/pyeongchang-highland-tour.jpg', '강원도 평창군 대관령면', '농장 투어, 채소 수확 체험, 차와 농산물 시음, 신선 농산물 선물', '매주 토-일 10:00, 14:00', '초급', 5, '2024-01-10 00:00:00');
```

---

## ✅ 확인 쿼리

```sql
-- 전체 개수 확인
SELECT COUNT(*) FROM experiences;
-- 결과: 14

-- 전체 목록 확인
SELECT id, title, price, max_participants, location FROM experiences ORDER BY id;
```

---

## 🎯 특징

✅ **다양한 지역**: 하동, 이천, 담양, 통영, 장흥, 강진, 순천, 제주, 안동, 평창  
✅ **다양한 가격대**: 38,000원 ~ 95,000원  
✅ **다양한 난이도**: 초급(7개), 중급(3개)  
✅ **차 체험**: 5개 (야생차, 발효차, 말차, 차 문화, 차밭 투어)  
✅ **공예 체험**: 5개 (도자기, 대나무, 나전칠기, 한지)  

---

## 🔗 관련 파일

- SQL 파일: `ADD_10_EXPERIENCES.sql`
- GitHub: https://github.com/healingcafe1-prog/dagong
- 프로덕션: https://dagong-bi1.pages.dev

이제 Cloudflare D1 콘솔에서 위 SQL을 실행하시면 체험 프로그램이 **4개 → 14개**로 늘어납니다! 🚀
