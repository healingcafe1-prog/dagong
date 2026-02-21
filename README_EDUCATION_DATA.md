# 📚 다공(茶工) 교육 데이터 관리 가이드

## 📁 파일 구조

```
webapp/
├── MASTER_BACKUP_EDUCATION.sql     # 마스터 백업 데이터 (복원 시 사용)
├── restore_education_data.sh       # 데이터 복원 스크립트
├── reorder_dado_education.sql      # 다도교육 순서 재배치 SQL
└── README_EDUCATION_DATA.md        # 이 문서
```

---

## 🎯 교육 데이터 구조

### ✅ **다도교육 (category_id = 1) - 13개 항목**

**순서 (display_order):**
1. 다도의 의미
2. 다도의 역사와 시대적 변천사
3. **다도의 기원과 발전** ← 역사 섹션 시작
4. **한국 전통 다도의 역사**
5. **중국 다도의 역사와 문화**
6. **일본 다도의 역사와 정신**
7. **한중일 다도 문화 비교** ← 역사 섹션 끝
8. 차 힐링 테라피 전문가 과정
9. 차 가공식품 개발 실무
10. 차 카페 창업 완벽 가이드
11. 차 수출입 무역 실무
12. 차 문화 관광 해설사 양성
13. 차 소믈리에 (차 품평 전문가)

**특징:**
- "다도의 역사와 시대적 변천사" 뒤에 역사 관련 항목들을 그룹화
- 기초 → 역사 → 전문 과정 순으로 자연스러운 학습 흐름

### ✅ **명상교육 (category_id = 4) - 12개 항목**

**순서 (display_order):**
1. 명상의 역사
2. 명상의 정의와 원리
3. 명상의 종류와 방법
4. 명상의 기원과 고대 역사
5. 불교 명상의 발전과 전파
6. 한국 전통 명상의 역사
7. 중국 도교 명상과 기공
8. 일본 선(禪)과 좌선 수행
9. 명상의 서양 전파
10. 한중일 명상 문화 비교
11. 현대 명상과 마음챙김
12. 차와 함께하는 명상

---

## 🔄 데이터 복원 방법

### **방법 1: 복원 스크립트 사용 (추천)**

```bash
cd /home/user/webapp
./restore_education_data.sh
```

**대화형 선택:**
1. 로컬 DB 복원 → 선택 `1`
2. 프로덕션 DB 복원 → 선택 `2` (확인 필요)

### **방법 2: 수동 복원**

**로컬 DB 복원:**
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --local \
  --file=MASTER_BACKUP_EDUCATION.sql
```

**프로덕션 DB 복원:**
```bash
cd /home/user/webapp
export CLOUDFLARE_API_TOKEN='your-token-here'
npx wrangler d1 execute webapp-production --remote \
  --file=MASTER_BACKUP_EDUCATION.sql
```

---

## ✅ 복원 후 확인

### **1. 데이터 개수 확인**

```bash
npx wrangler d1 execute webapp-production --local --command="
SELECT 
    category_id,
    COUNT(*) as count,
    CASE category_id
        WHEN 1 THEN '다도교육'
        WHEN 4 THEN '명상교육'
    END as name
FROM education_curriculum
WHERE category_id IN (1, 4)
GROUP BY category_id;
"
```

**기대 결과:**
- category_id 1 (다도교육): 13개
- category_id 4 (명상교육): 12개

### **2. 순서 확인**

```bash
npx wrangler d1 execute webapp-production --local --command="
SELECT id, title, display_order 
FROM education_curriculum 
WHERE category_id = 1 
ORDER BY display_order;
"
```

### **3. 웹사이트 확인**

**로컬:**
```
http://localhost:3000/education/curriculum
```

**프로덕션:**
```
https://dagong-bi1.pages.dev/education/curriculum
```

---

## 📝 순서 변경 방법

### **다도교육 순서만 변경:**

```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --local \
  --file=reorder_dado_education.sql
```

---

## 🛠️ 유지보수 가이드

### **새 항목 추가**

```sql
INSERT INTO education_curriculum (
    id, category_id, title, description, content, 
    duration_minutes, difficulty, display_order, created_at
) VALUES (
    새ID, 카테고리ID, '제목', '설명', '내용',
    시간(분), '난이도', 순서, datetime('now')
);
```

**난이도 값:**
- `beginner` - 입문
- `intermediate` - 중급
- `advanced` - 심화

### **항목 수정**

```sql
UPDATE education_curriculum 
SET 
    title = '새 제목',
    description = '새 설명',
    content = '새 내용',
    duration_minutes = 120,
    difficulty = 'intermediate',
    display_order = 5
WHERE id = 항목ID;
```

### **항목 삭제**

```sql
DELETE FROM education_curriculum WHERE id = 항목ID;
```

---

## 📊 데이터 백업

### **로컬 DB → 백업 파일**

```bash
# SQLite 덤프 (추천)
cd /home/user/webapp
npx wrangler d1 execute webapp-production --local --command="
SELECT * FROM education_curriculum;
" > education_backup_$(date +%Y%m%d).json
```

### **마스터 백업 업데이트**

현재 데이터로 마스터 백업을 업데이트하려면:

1. 모든 데이터 확인
2. `MASTER_BACKUP_EDUCATION.sql` 파일 수정
3. Git 커밋

```bash
git add MASTER_BACKUP_EDUCATION.sql
git commit -m "📝 교육 데이터 마스터 백업 업데이트"
git push origin main
```

---

## 🚀 프로덕션 배포

### **1. 로컬 테스트**

```bash
cd /home/user/webapp
npm run build
pm2 restart webapp
curl http://localhost:3000/api/education/curriculum?category_id=1
```

### **2. 프로덕션 배포**

```bash
cd /home/user/webapp
export CLOUDFLARE_API_TOKEN='your-token-here'

# DB 복원 (처음 한 번만)
npx wrangler d1 execute webapp-production --remote \
  --file=MASTER_BACKUP_EDUCATION.sql

# 앱 배포
npm run build
npx wrangler pages deploy dist --project-name dagong-bi1
```

### **3. 배포 확인**

```
https://dagong-bi1.pages.dev/education/curriculum
```

---

## ❓ 문제 해결

### **Q: 복원 후 데이터가 표시되지 않음**
**A:** 
1. 서버 재시작: `pm2 restart webapp`
2. 브라우저 캐시 제거: Ctrl+Shift+R
3. 시크릿 모드로 접속

### **Q: 순서가 이상함**
**A:**
```bash
npx wrangler d1 execute webapp-production --local \
  --file=reorder_dado_education.sql
pm2 restart webapp
```

### **Q: 데이터가 중복됨**
**A:**
```bash
# 마스터 백업은 DELETE 후 INSERT하므로 중복 없음
# 전체 복원 실행
./restore_education_data.sh
```

---

## 📚 참고 문서

- **ULTIMATE_FIX.md** - 캐시 문제 해결 가이드
- **FINAL_FIX_GUIDE.md** - Service Worker 문제 해결
- **CACHE_CLEAR_GUIDE.md** - 브라우저 캐시 제거 방법

---

## 🎊 완성!

이제 교육 데이터는 안전하게 백업되었으며, 언제든지 복원할 수 있습니다!

**마스터 백업 위치:**
- 파일: `/home/user/webapp/MASTER_BACKUP_EDUCATION.sql`
- GitHub: https://github.com/healingcafe1-prog/dagong

**데이터 요약:**
- ✅ 다도교육: 13개 항목 (역사 섹션 그룹화)
- ✅ 명상교육: 12개 항목
- ✅ 자동 복원 스크립트 준비
- ✅ 순서 최적화 완료
