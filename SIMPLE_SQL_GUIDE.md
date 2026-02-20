# 🚨 SQL 오류 해결 가이드

## 문제 원인
Cloudflare D1 콘솔에서 여러 줄 SQL 실행 시 문법 오류 발생

## ✅ 해결 방법: 한 줄씩 실행

---

## 1️⃣ 체험 프로그램 추가 (한 줄)

**복사해서 붙여넣기**:
```sql
INSERT OR IGNORE INTO experiences (id, title, region_id, producer_id, experience_type, description, duration, price, max_participants, is_available, created_at) VALUES (5, '하동 야생차 체험', 2, 2, 'tea_experience', '야생차밭 체험', '3시간', 45000, 15, 1, '2024-01-01 00:00:00');
```

**확인**:
```sql
SELECT COUNT(*) FROM experiences;
```
결과: 5

---

## 2️⃣ 교육과정 추가 (하나씩)

### 교육과정 17
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (17, 1, '차 힐링 테라피스트', '차 테라피 전문가', '60시간', 'advanced', 17, '2024-01-01 00:00:00');
```

### 교육과정 18
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (18, 2, '말차 제조와 활용', '말차 제조 기법', '24시간', 'intermediate', 18, '2024-01-01 00:00:00');
```

### 교육과정 19
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (19, 1, '차 가공식품 개발', '가공식품 개발 실무', '40시간', 'intermediate', 19, '2024-01-01 00:00:00');
```

### 교육과정 20
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (20, 3, '목공예 다기 만들기', '목공예 다기 제작', '32시간', 'beginner', 20, '2024-01-01 00:00:00');
```

### 교육과정 21
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (21, 1, '차 마케팅 전문가', '차 마케팅 전략', '36시간', 'advanced', 21, '2024-01-01 00:00:00');
```

### 교육과정 22
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (22, 2, '녹차 블렌딩 마스터', '녹차 블렌딩 기술', '28시간', 'advanced', 22, '2024-01-01 00:00:00');
```

### 교육과정 23
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (23, 1, '차 카페 창업 실무', '차 카페 창업 준비', '48시간', 'intermediate', 23, '2024-01-01 00:00:00');
```

### 교육과정 24
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (24, 3, '다도구 디자인', '다도구 디자인', '40시간', 'intermediate', 24, '2024-01-01 00:00:00');
```

### 교육과정 25
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (25, 1, '차 수출입 실무', '차 수출입 무역', '32시간', 'advanced', 25, '2024-01-01 00:00:00');
```

### 교육과정 26
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (26, 2, '발효차 제조 전문', '발효차 제조 기술', '36시간', 'advanced', 26, '2024-01-01 00:00:00');
```

### 교육과정 27
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (27, 1, '차 관광 해설사', '차 관광 해설', '44시간', 'intermediate', 27, '2024-01-01 00:00:00');
```

### 교육과정 28
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (28, 3, '전통 죽세공예', '죽세공예 기술', '40시간', 'intermediate', 28, '2024-01-01 00:00:00');
```

### 교육과정 29
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (29, 1, '차 품평 전문가', '차 품평 기술', '52시간', 'advanced', 29, '2024-01-01 00:00:00');
```

### 교육과정 30
```sql
INSERT OR IGNORE INTO education_curriculum (id, category_id, title, description, duration, difficulty, display_order, created_at) VALUES (30, 2, '약용차 블렌딩', '약용차 블렌딩', '36시간', 'intermediate', 30, '2024-01-01 00:00:00');
```

---

## 3️⃣ 확인

```sql
SELECT COUNT(*) FROM experiences;
```
결과: 5

```sql
SELECT COUNT(*) FROM education_curriculum;
```
결과: 30

---

## 💡 중요 팁

1. **한 번에 한 줄씩 실행**
2. **복사-붙여넣기 후 바로 Execute 클릭**
3. **각 줄 실행 후 결과 확인**
4. **오류 발생 시 해당 줄만 다시 실행**

---

## 🔗 API 최종 확인

```bash
curl "https://dagong-bi1.pages.dev/api/experiences?limit=10"
curl "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50"
```

---

**이 방법으로 하면 확실히 성공합니다!** ✅
