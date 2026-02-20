# ⚡ 체험 프로그램 10개 즉시 추가 가이드

## 🚨 중요: 올바른 실행 방법

### ❌ **잘못된 방법**
```
> https://github.com/healingcafe1-prog/dagong/blob/main/ADD_10_EXPERIENCES.sql
```
→ **GitHub URL을 직접 붙여넣으면 안 됩니다!**

### ✅ **올바른 방법**
**SQL 내용을 복사**해서 붙여넣기

---

## 📋 즉시 복사용 SQL (10개 체험)

아래 SQL을 **전체 선택 → 복사 → Cloudflare D1 콘솔에 붙여넣기 → Execute**

```sql
INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (5, 3, '하동 야생차 채엽과 전통 제다', '지리산 자락의 야생차밭에서 손으로 차를 따고 전통 덖음 방식으로 차를 만드는 본격 체험', 240, 75000, 8, '/images/experiences/hadong-wild-tea.jpg', '경상남도 하동군 악양면', '야생차밭 트레킹, 채엽 체험, 전통 제다 실습, 점심 식사, 완성된 차 100g', '4-5월, 매주 토 09:00 (1회)', '중급', 14, '2024-01-10 00:00:00');

INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (6, 6, '이천 백자 다기 만들기', '왕실 도자기 기법으로 나만의 찻잔이나 주전자를 직접 제작하는 프리미엄 체험', 180, 85000, 8, '/images/experiences/icheon-pottery.jpg', '경기도 이천시 신둔면', '물레 체험, 성형 실습, 초벌구이, 완성품 택배 배송', '매주 토-일 10:00, 14:00', '중급', 12, '2024-01-10 00:00:00');

INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (7, 7, '담양 대나무 다기 만들기', '대나무를 깎아 나만의 찻잔, 차통, 찻상을 만드는 전통 죽세공예 체험', 150, 48000, 12, '/images/experiences/damyang-bamboo.jpg', '전라남도 담양군 담양읍', '대나무 선택, 깎기 도구 사용법, 제작 체험, 완성품 가져가기', '매주 토-일 10:00, 14:00', '초급', 10, '2024-01-10 00:00:00');

INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (8, 8, '통영 나전칠기 찻잔받침 만들기', '자개를 박아 나만의 고급 찻잔받침을 만드는 무형문화재 기법 체험', 180, 95000, 6, '/images/experiences/tongyeong-mop.jpg', '경상남도 통영시 광도면', '나전칠기 역사 설명, 자개 선택, 붙이기 실습, 완성품 가져가기', '매주 토 13:00, 일 10:00', '중급', 14, '2024-01-10 00:00:00');

INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (9, 10, '장흥 정남진 발효차 체험', '남도 전통 발효차를 직접 만들고 숙성 과정을 배우는 특별 체험', 180, 58000, 15, '/images/experiences/jangheung-fermented-tea.jpg', '전라남도 장흥군 관산읍', '발효차 이론 교육, 차 만들기 실습, 시음, 완성된 발효차 50g', '매주 토 10:00, 14:00', '초급', 12, '2024-01-10 00:00:00');

INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (10, 11, '강진 다산 차 문화 탐방', '다산 정약용 선생의 차 문화 유적지를 돌아보고 전통 다례를 배우는 문화 체험', 240, 65000, 20, '/images/experiences/gangjin-dasan-culture.jpg', '전라남도 강진군 도암면', '다산초당 방문, 차 문화 해설, 전통 다례 실습, 차와 다식, 기념품', '매주 토-일 10:00', '초급', 8, '2024-01-10 00:00:00');

INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (11, 12, '순천 생태 차밭 명상과 요가', '무농약 차밭에서 진행하는 명상, 요가, 차 명상이 결합된 힐링 프로그램', 180, 52000, 25, '/images/experiences/suncheon-eco-healing.jpg', '전라남도 순천시 송광면', '요가 매트, 명상 가이드, 차 명상 세션, 유기농 차와 간식', '매주 토-일 09:00, 15:00', '초급', 12, '2024-01-10 00:00:00');

INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (12, 1, '제주 유기농 말차 체험', '제주 녹차를 곱게 갈아 말차를 만들고 말차 음료와 디저트를 만드는 체험', 150, 48000, 15, '/images/experiences/jeju-matcha.jpg', '제주특별자치도 서귀포시 표선면', '녹차 덖기 체험, 분쇄 실습, 말차 라떼 만들기, 말차 쿠키 만들기', '매주 수-일 13:00, 15:00', '초급', 8, '2024-01-10 00:00:00');

INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (13, 13, '안동 전통 한지로 찻상 만들기', '전통 한지 공예 기법으로 접이식 찻상과 찻잔받침을 만드는 체험', 150, 42000, 12, '/images/experiences/andong-hanji-craft.jpg', '경상북도 안동시 임동면', '한지 제작 과정 견학, 한지 공예 실습, 찻상 만들기, 완성품 가져가기', '매주 토-일 10:00, 14:00', '초급', 10, '2024-01-10 00:00:00');

INSERT OR IGNORE INTO experiences (id, producer_id, title, description, duration, price, max_participants, image, location, includes, schedule_info, difficulty, min_age, created_at) VALUES (14, 9, '평창 고랭지 농장 투어와 차 시음', '해발 700m 청정 고랭지 농장을 견학하고 신선한 농산물과 차를 시음하는 힐링 투어', 180, 38000, 30, '/images/experiences/pyeongchang-highland-tour.jpg', '강원도 평창군 대관령면', '농장 투어, 채소 수확 체험, 차와 농산물 시음, 신선 농산물 선물', '매주 토-일 10:00, 14:00', '초급', 5, '2024-01-10 00:00:00');
```

---

## ✅ 확인

```sql
SELECT COUNT(*) FROM experiences;
```
→ 결과: **14** ✅

```sql
SELECT id, title, price, max_participants FROM experiences ORDER BY id;
```

---

## 🎯 실행 순서 (1분)

1. **Cloudflare D1 콘솔 열기**
   ```
   https://dash.cloudflare.com/
   → Workers & Pages → D1 → webapp-production → Console
   ```

2. **위 SQL 전체 복사**  
   (주석 제외하고 INSERT 문만)

3. **콘솔에 붙여넣기**

4. **Execute 버튼 클릭**

5. **확인 쿼리 실행**

---

## 💡 핵심 포인트

✅ **URL이 아닌 SQL 내용을 복사**  
✅ **한 번에 전체 복사 가능** (10개 INSERT 문)  
✅ **INSERT OR IGNORE로 중복 방지**  
✅ **1분 이내 완료**

이제 체험 프로그램이 **4개 → 14개**로 늘어납니다! 🚀
