# 🔍 프로덕션 업데이트 검증 가이드

## ⚠️ 에러 메시지에 대하여

Cloudflare D1 Console에서 다음 메시지가 표시되어도 **정상입니다**:
```
The request is malformed: Requests without any query are not supported.
```

이는 UPDATE 실행 후 결과를 표시하려 할 때 나타나는 메시지이며, **실제 UPDATE는 성공했을 가능성이 높습니다**.

---

## ✅ 업데이트 확인 방법

### 1️⃣ 다도교육 콘텐츠 확인

Cloudflare D1 Console에서 다음 SQL을 실행하세요:

```sql
SELECT 
  id,
  title,
  LENGTH(content) as content_length,
  duration,
  difficulty
FROM education_curriculum 
WHERE category_id = 1 
  AND id IN (17, 19, 23, 25, 27, 29)
ORDER BY id;
```

**예상 결과:**
| id | title | content_length | duration | difficulty |
|----|-------|----------------|----------|------------|
| 17 | 차 힐링 테라피 전문가 과정 | 800+ | 3.5시간 | advanced |
| 19 | 차 가공식품 개발 실무 | 500+ | 4시간 | intermediate |
| 23 | 차 카페 창업 완벽 가이드 | 600+ | 5시간 | intermediate |
| 25 | 차 수출입 무역 실무 | 600+ | 5.5시간 | advanced |
| 27 | 차 문화 관광 해설사 양성 | 700+ | 6시간 | intermediate |
| 29 | 차 소믈리에 (차 품평 전문가) | 1000+ | 5시간 | advanced |

→ `content_length`가 **500 이상**이면 ✅ 성공!

---

### 2️⃣ 카테고리 설명 확인

```sql
SELECT 
  id,
  name,
  description
FROM education_categories 
WHERE id IN (1, 4);
```

**예상 결과:**
| id | name | description |
|----|------|-------------|
| 1 | 다도교육 | 다도의 의미와 역사, 방법을 배우며 다도가 인성교육에 도움이 되는 가치를 배웁니다 |
| 4 | 명상교육 | 명상의 기초와 실천, 요가와 마음챙김을 배웁니다 |

→ 설명이 **위와 같으면** ✅ 성공!

---

### 3️⃣ 웹사이트에서 직접 확인

프로덕션 사이트에 접속하여 확인:

```
https://dagong-bi1.pages.dev/education
```

**확인 사항:**
1. ✅ 다도교육 카테고리 클릭
2. ✅ 13개 항목 표시
3. ✅ 각 항목 클릭 시 풍부한 콘텐츠 표시
4. ✅ 명상교육 카테고리 확인
5. ✅ 12개 항목 표시

---

## 🚨 만약 업데이트가 안 되었다면?

### Wrangler CLI로 재실행

터미널에서 다음을 실행하세요:

```bash
# 1. API 토큰 설정
export CLOUDFLARE_API_TOKEN='your-token-here'

# 2. 각 파일 실행
cd /home/user/webapp

npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_17.sql
npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_19.sql
npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_23.sql
npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_25.sql
npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_27.sql
npx wrangler d1 execute webapp-production --remote --file=CONSOLE_STEP1_UPDATE_29.sql
npx wrangler d1 execute webapp-production --remote --file=PRODUCTION_UPDATE_STEP2.sql
```

또는 **배포 스크립트 사용**:

```bash
./DEPLOY_TO_PRODUCTION.sh
```

---

## 📊 최종 확인 체크리스트

- [ ] SQL 검증: 다도교육 6개 항목 `content_length` 확인
- [ ] SQL 검증: 카테고리 설명 변경 확인
- [ ] 웹사이트: 다도교육 13개 항목 표시
- [ ] 웹사이트: 명상교육 12개 항목 표시
- [ ] 웹사이트: 각 항목 클릭 시 풍부한 콘텐츠

**모두 ✅ 표시되면 완벽하게 완료된 것입니다!** 🎉

---

## 💡 참고

Raw 검증 SQL 파일:
- https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/VERIFY_UPDATES.sql
- https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/VERIFY_CATEGORIES.sql
