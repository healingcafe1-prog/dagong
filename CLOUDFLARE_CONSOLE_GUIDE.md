# 🚀 Cloudflare D1 Console 실행 가이드

## ❌ 발생한 문제
Cloudflare D1 Console은 **여러 개의 SQL 문을 한 번에 실행할 수 없습니다**.
따라서 각 UPDATE 문을 **개별적으로** 실행해야 합니다.

---

## ✅ 해결 방법 2가지

### **방법 1: Wrangler CLI 사용 (추천 ⭐)**

터미널에서 한 번에 실행:

```bash
# 1. Cloudflare API 토큰 설정
export CLOUDFLARE_API_TOKEN='your-token-here'

# 2. 배포 스크립트 실행
cd /home/user/webapp
./DEPLOY_TO_PRODUCTION.sh
```

**배포 스크립트는 자동으로:**
- Step 1 (다도교육 콘텐츠 보강) 실행
- Step 2 (카테고리 설명 수정) 실행
- 결과 확인

---

### **방법 2: Cloudflare D1 Console에서 수동 실행**

#### 📋 Step 1: 다도교육 콘텐츠 보강 (6개 파일)

아래 링크를 **순서대로** 하나씩 클릭하여 실행하세요:

1. **ID 17 업데이트** - 차 힐링 테라피 전문가 과정
   ```
   https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/CONSOLE_STEP1_UPDATE_17.sql
   ```
   → Raw 내용 복사 → D1 Console 붙여넣기 → **Execute** 클릭

2. **ID 19 업데이트** - 차 가공식품 개발 실무
   ```
   https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/CONSOLE_STEP1_UPDATE_19.sql
   ```
   → Raw 내용 복사 → D1 Console 붙여넣기 → **Execute** 클릭

3. **ID 23 업데이트** - 차 카페 창업 완벽 가이드
   ```
   https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/CONSOLE_STEP1_UPDATE_23.sql
   ```
   → Raw 내용 복사 → D1 Console 붙여넣기 → **Execute** 클릭

4. **ID 25 업데이트** - 차 수출입 무역 실무
   ```
   https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/CONSOLE_STEP1_UPDATE_25.sql
   ```
   → Raw 내용 복사 → D1 Console 붙여넣기 → **Execute** 클릭

5. **ID 27 업데이트** - 차 문화 관광 해설사 양성
   ```
   https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/CONSOLE_STEP1_UPDATE_27.sql
   ```
   → Raw 내용 복사 → D1 Console 붙여넣기 → **Execute** 클릭

6. **ID 29 업데이트** - 차 소믈리에 (차 품평 전문가)
   ```
   https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/CONSOLE_STEP1_UPDATE_29.sql
   ```
   → Raw 내용 복사 → D1 Console 붙여넣기 → **Execute** 클릭

---

#### 📋 Step 2: 카테고리 설명 수정

7. **카테고리 설명 수정**
   ```
   https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/PRODUCTION_UPDATE_STEP2.sql
   ```
   → Raw 내용 복사 → D1 Console 붙여넣기 → **Execute** 클릭

---

## ✅ 실행 순서 요약

1. ✅ CONSOLE_STEP1_UPDATE_17.sql (차 힐링 테라피)
2. ✅ CONSOLE_STEP1_UPDATE_19.sql (차 가공식품)
3. ✅ CONSOLE_STEP1_UPDATE_23.sql (차 카페 창업)
4. ✅ CONSOLE_STEP1_UPDATE_25.sql (차 수출입)
5. ✅ CONSOLE_STEP1_UPDATE_27.sql (차 문화 관광)
6. ✅ CONSOLE_STEP1_UPDATE_29.sql (차 소믈리에)
7. ✅ PRODUCTION_UPDATE_STEP2.sql (카테고리 설명)

---

## 🔍 확인 방법

모든 실행이 완료되면:
1. https://dagong-bi1.pages.dev/education 접속
2. **다도교육** 카테고리 클릭
3. 13개 항목 확인
4. 각 항목의 콘텐츠가 풍부한지 확인

---

## 📚 업데이트 내용

### 다도교육 콘텐츠 보강 (6개)
- ID 17: 차 힐링 테라피 전문가 과정 (1,017 bytes)
- ID 19: 차 가공식품 개발 실무 (706 bytes)
- ID 23: 차 카페 창업 완벽 가이드 (751 bytes)
- ID 25: 차 수출입 무역 실무 (701 bytes)
- ID 27: 차 문화 관광 해설사 양성 (760 bytes)
- ID 29: 차 소믈리에 (차 품평 전문가) (1,100 bytes)

### 카테고리 설명 수정
- 다도교육: "다도의 의미와 역사, 방법을 배우며 다도가 인성교육에 도움이 되는 가치를 배웁니다"
- 명상교육: "명상의 기초와 실천, 요가와 마음챙김을 배웁니다"

---

## 🎯 최종 결과

| 카테고리 | 항목 수 | 상태 |
|---------|--------|------|
| 다도교육 | 13 | ✅ |
| 차공부 | 12 | ✅ |
| 공예공부 | 8 | ✅ |
| 명상교육 | 12 | ✅ |
| 체험 프로그램 | 20 | ✅ |
| 제품 | 120 | ✅ |
| 이벤트 | 27 | ✅ |
| **총계** | **212** | **✅** |

---

## 💡 팁

- 각 SQL 실행 후 **"✅ Successfully executed"** 메시지 확인
- 에러 발생 시 다시 실행하거나 문의
- 모든 실행 완료 후 웹사이트에서 확인

**🎉 모두 실행 완료하시면 알려주세요!**
