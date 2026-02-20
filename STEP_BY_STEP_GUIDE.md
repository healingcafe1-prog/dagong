# 단계별 복구 가이드 (Step-by-Step Recovery)

## 🚨 문제 상황
- 큰 SQL 파일을 콘솔에 붙여넣으면 타임아웃 발생
- 현재 프로덕션 데이터: 이벤트 27개만 존재
- 필요 데이터: 제품 91개, 체험 14개, 교육 30개 등

## ✅ 해결책: 4단계 분할 복구

### 📋 실행 순서

#### STEP 1: 기본 데이터 (1분)
```
파일: STEP1_BASIC_DATA.sql
내용: 지역 17개 + 카테고리 27개 + 생산자 13개
```

1. Cloudflare D1 콘솔 열기: https://dash.cloudflare.com/
2. Workers & Pages → D1 → webapp-production → Console
3. GitHub에서 SQL 복사:
   https://github.com/healingcafe1-prog/dagong/blob/main/STEP1_BASIC_DATA.sql
4. **Raw 버튼 클릭** → 전체 선택 (Ctrl+A) → 복사 (Ctrl+C)
5. 콘솔에 붙여넣기 (Ctrl+V) → **Execute** 클릭
6. "STEP 1 완료" 메시지 확인

---

#### STEP 2: 차 + 공예품 (1분)
```
파일: STEP2_TEA_CRAFT.sql
내용: 차 제품 20개 + 공예품 23개
```

1. GitHub에서 SQL 복사:
   https://github.com/healingcafe1-prog/dagong/blob/main/STEP2_TEA_CRAFT.sql
2. **Raw 버튼 클릭** → 전체 선택 → 복사
3. 콘솔에 붙여넣기 → **Execute** 클릭
4. "STEP 2 완료" 메시지 확인

---

#### STEP 3: 선물 + 지역특산품 (생성 예정)
```
파일: STEP3_GIFT_LOCAL.sql (곧 생성)
내용: 선물세트 15개 + 지역특산품 33개
```

---

#### STEP 4: 체험 프로그램 (생성 예정)
```
파일: STEP4_EXPERIENCES.sql (곧 생성)
내용: 체험 프로그램 14개
```

---

## 📊 복구 진행 상황

| 단계 | 파일 | 내용 | 상태 |
|------|------|------|------|
| STEP 1 | STEP1_BASIC_DATA.sql | 지역 17 + 카테고리 27 + 생산자 13 | ✅ 준비됨 |
| STEP 2 | STEP2_TEA_CRAFT.sql | 차 20 + 공예 23 | ✅ 준비됨 |
| STEP 3 | STEP3_GIFT_LOCAL.sql | 선물 15 + 지역특산 33 | ⏳ 생성 중 |
| STEP 4 | STEP4_EXPERIENCES.sql | 체험 14 | ⏳ 생성 중 |

---

## 🎯 현재 실행 가능한 단계

### 지금 바로 실행: STEP 1 + STEP 2

1. **STEP 1 실행** (지역, 카테고리, 생산자)
2. **STEP 2 실행** (차 제품, 공예품)
3. **STEP 3, 4 대기** (곧 생성됨)

---

## 🔗 참고 링크

- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong
- **Cloudflare 콘솔**: https://dash.cloudflare.com/
- **프로덕션 사이트**: https://dagong-bi1.pages.dev

---

## ⚠️ 주의 사항

1. **순서대로 실행**: STEP 1 → STEP 2 → STEP 3 → STEP 4
2. **Raw 버튼 필수**: GitHub에서 반드시 Raw 버튼 클릭 후 복사
3. **완료 확인**: 각 단계마다 "STEP X 완료" 메시지 확인
4. **에러 발생 시**: 스크린샷 캡처하여 보고

---

**작성일**: 2026-02-20  
**버전**: 1.0 (분할 복구 버전)
