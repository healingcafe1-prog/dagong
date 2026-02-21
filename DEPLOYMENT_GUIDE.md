# 🚀 프로덕션 배포 가이드

Cloudflare D1 Console에서 실행할 SQL 파일입니다.

---

## 📁 파일 다운로드 링크

### 방법 1: GitHub Raw 버튼 사용 (추천)

#### Step 1: 다도교육 Content 보강
1. **파일 링크**: [PRODUCTION_UPDATE_STEP1.sql](https://github.com/healingcafe1-prog/dagong/blob/main/PRODUCTION_UPDATE_STEP1.sql)
2. 링크 클릭 → 우측 상단 **Raw** 버튼 클릭
3. 브라우저에 표시된 전체 내용 복사 (Ctrl+A, Ctrl+C)
4. Cloudflare D1 Console에 붙여넣기 → Execute

#### Step 2: 카테고리 설명 수정
1. **파일 링크**: [PRODUCTION_UPDATE_STEP2.sql](https://github.com/healingcafe1-prog/dagong/blob/main/PRODUCTION_UPDATE_STEP2.sql)
2. 링크 클릭 → 우측 상단 **Raw** 버튼 클릭
3. 브라우저에 표시된 전체 내용 복사 (Ctrl+A, Ctrl+C)
4. Cloudflare D1 Console에 붙여넣기 → Execute

---

## 🔗 Raw 파일 직접 링크

복사가 더 쉬운 Raw 링크입니다:

### Step 1 (다도교육 Content 보강)
```
https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/PRODUCTION_UPDATE_STEP1.sql
```
- 위 링크 클릭 → 전체 선택 (Ctrl+A) → 복사 (Ctrl+C)

### Step 2 (카테고리 설명 수정)
```
https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/PRODUCTION_UPDATE_STEP2.sql
```
- 위 링크 클릭 → 전체 선택 (Ctrl+A) → 복사 (Ctrl+C)

---

## ✅ 실행 순서

1. **Step 1 먼저 실행** (다도교육 Content 보강)
   - Raw 링크에서 전체 복사
   - Cloudflare D1 Console 붙여넣기
   - Execute 클릭

2. **Step 2 실행** (카테고리 설명 수정)
   - Raw 링크에서 전체 복사
   - Cloudflare D1 Console 붙여넣기
   - Execute 클릭

3. **완료!** 🎉

---

## 📊 업데이트 내용

### Step 1 업데이트 (6개 항목)
- ID 17: 차 힐링 테라피 전문가 과정 (1,225자)
- ID 19: 차 가공식품 개발 실무 (1,429자)
- ID 23: 차 카페 창업 완벽 가이드 (1,760자)
- ID 25: 차 수출입 무역 실무 (2,072자)
- ID 27: 차 문화 관광 해설사 양성 (2,101자)
- ID 29: 차 소믈리에 (2,713자)

### Step 2 업데이트 (2개 항목)
- 다도교육: "다도의 의미와 역사, 방법을 배우며 다도가 인성교육에 도움이 되는 가치를 배웁니다"
- 명상교육: "명상의 기초와 실천, 요가와 마음챙김을 배웁니다"

---

## 🔍 Cloudflare D1 Console 위치

1. Cloudflare Dashboard 로그인
2. 좌측 메뉴에서 **Workers & Pages** 클릭
3. **D1** 탭 클릭
4. **webapp-production** 데이터베이스 클릭
5. **Console** 탭으로 이동
6. SQL 입력창에 복사한 내용 붙여넣기
7. **Execute** 버튼 클릭

---

## ⚠️ 주의사항

- 반드시 **Step 1을 먼저** 실행하세요
- Step 1 성공 후 **Step 2를 실행**하세요
- 각 Step 실행 후 성공 메시지를 확인하세요

---

## 🎊 완료 후 확인

프로덕션 사이트에서 확인:
- https://dagong-bi1.pages.dev/education
- 다도교육 항목 클릭 → 학습 내용 확인
- 명상교육 항목 클릭 → 내용 확인

---

**작성일**: 2026-02-21  
**저장소**: https://github.com/healingcafe1-prog/dagong
