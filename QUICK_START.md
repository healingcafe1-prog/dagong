# 🚀 다공 프로덕션 복구 - 빠른 시작 가이드

## 📋 4단계로 완료하는 데이터 복구 (총 4분)

### 🔗 Cloudflare D1 콘솔 열기
👉 https://dash.cloudflare.com/
- Workers & Pages → D1 → **webapp-production** → **Console**

---

## STEP 1️⃣ 기본 데이터 (1분)
```
지역 17개 + 카테고리 27개 + 생산자 13개
```

1. **SQL 복사**: https://github.com/healingcafe1-prog/dagong/blob/main/STEP1_BASIC_DATA.sql
2. **Raw 클릭** → Ctrl+A → Ctrl+C
3. **콘솔 붙여넣기** → Execute
4. ✅ "STEP 1 완료" 확인

---

## STEP 2️⃣ 차 + 공예품 (1분)
```
차 제품 20개 + 공예품 23개
```

1. **SQL 복사**: https://github.com/healingcafe1-prog/dagong/blob/main/STEP2_TEA_CRAFT.sql
2. **Raw 클릭** → Ctrl+A → Ctrl+C
3. **콘솔 붙여넣기** → Execute
4. ✅ "STEP 2 완료" 확인

---

## STEP 3️⃣ 선물 + 지역특산품 (1분)
```
선물세트 15개 + 지역특산품 33개
```

1. **SQL 복사**: https://github.com/healingcafe1-prog/dagong/blob/main/STEP3_GIFT_LOCAL.sql
2. **Raw 클릭** → Ctrl+A → Ctrl+C
3. **콘솔 붙여넣기** → Execute
4. ✅ "STEP 3 완료" 확인

---

## STEP 4️⃣ 체험 프로그램 (1분)
```
체험 프로그램 14개
```

1. **SQL 복사**: https://github.com/healingcafe1-prog/dagong/blob/main/STEP4_EXPERIENCES.sql
2. **Raw 클릭** → Ctrl+A → Ctrl+C
3. **콘솔 붙여넣기** → Execute
4. ✅ "STEP 4 완료" 확인

---

## ✅ 한 번에 전체 복구 (권장)

### 🌟 SAFE_INSERT_ONLY.sql 사용 (가장 확실!)

**이 파일은 모든 데이터를 포함하고 있습니다:**
- ✅ 지역 17개 + 카테고리 27개 + 생산자 13개
- ✅ 제품 91개 (차 20 + 공예 23 + 선물 15 + 지역특산 33)
- ✅ 체험 14개
- ✅ 교육 카테고리 6개 + 교육 과정 30개
- ✅ 이벤트 27개 (1~12월)

**복구 방법:**
1. https://dash.cloudflare.com/ → Workers & Pages → D1 → webapp-production → Console
2. https://github.com/healingcafe1-prog/dagong/blob/main/SAFE_INSERT_ONLY.sql
3. **Raw 버튼** 클릭 → Ctrl+A → Ctrl+C
4. D1 콘솔 붙여넣기 → **Execute**
5. 완료 메시지 확인: "=== 완전 복구 완료 ==="

---

## ✅ 복구 완료 후 확인

### 웹 브라우저에서 확인
- 🌐 전체: https://dagong-bi1.pages.dev
- 🍵 차: https://dagong-bi1.pages.dev/?category=tea
- 🎨 공예품: https://dagong-bi1.pages.dev/?category=craft
- 🎁 선물세트: https://dagong-bi1.pages.dev/?category=gift
- 🌾 지역특산품: https://dagong-bi1.pages.dev/?category=local
- 🎪 체험: https://dagong-bi1.pages.dev/?category=experiences
- 📚 다도교육: https://dagong-bi1.pages.dev/education
- 🎉 이벤트: https://dagong-bi1.pages.dev/events

### API로 확인
```bash
# 차 제품 (목표: 20개)
curl "https://dagong-bi1.pages.dev/api/products?type=tea&limit=50"

# 공예품 (목표: 23개)
curl "https://dagong-bi1.pages.dev/api/products?type=craft&limit=50"

# 선물세트 (목표: 15개)
curl "https://dagong-bi1.pages.dev/api/products?type=gift&limit=50"

# 지역특산품 (목표: 33개)
curl "https://dagong-bi1.pages.dev/api/products?type=local&limit=50"

# 체험 프로그램 (목표: 14개)
curl "https://dagong-bi1.pages.dev/api/experiences?limit=50"
```

---

## 📊 최종 데이터 현황

| 항목 | 현재 | 복구 후 |
|------|------|---------|
| 🌏 지역 | ? | 17 ✅ |
| 📂 카테고리 | ? | 27 ✅ |
| 👥 생산자 | 6 | 13 ✅ |
| 🍵 차 제품 | 7 | 20 ✅ |
| 🎨 공예품 | 4 | 23 ✅ |
| 🎁 선물세트 | 0 | 15 ✅ |
| 🌾 지역특산품 | 3 | 33 ✅ |
| 🎪 체험 프로그램 | 8 | 14 ✅ |
| 📚 교육 카테고리 | 0 | 6 ✅ |
| 📖 다도교육 | 0 | 30 ✅ |
| 🎉 이벤트 | 27 | 27 ✅ |

**총 제품**: 17개 → **91개** ✅  
**총 체험**: 8개 → **14개** ✅  
**총 교육**: 0개 → **30개** ✅  
**총 이벤트**: 27개 ✅ (이미 완료)

---

## ⚠️ 중요 사항

1. ✅ **순서 준수**: STEP 1 → 2 → 3 → 4 (Foreign Key 제약)
2. ✅ **Raw 버튼**: GitHub에서 반드시 Raw 클릭 후 복사
3. ✅ **완료 확인**: 각 단계마다 "STEP X 완료" 메시지 확인
4. ✅ **안전 복구**: INSERT OR IGNORE 사용 (중복 방지)

---

## 🔗 참고 링크

- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong
- **단계별 가이드**: https://github.com/healingcafe1-prog/dagong/blob/main/STEP_BY_STEP_GUIDE.md
- **Cloudflare D1**: https://dash.cloudflare.com/
- **프로덕션 사이트**: https://dagong-bi1.pages.dev

---

**작성일**: 2026-02-20  
**버전**: 1.0 (4단계 분할 복구)
