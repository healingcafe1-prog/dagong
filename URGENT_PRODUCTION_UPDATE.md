# ⚠️ 프로덕션 데이터가 비어있습니다 - 즉시 조치 필요

## 📊 현재 상황 확인

방금 프로덕션 API를 확인한 결과:
- **제품**: 17개 (목표: 78개) ❌
- **지역특산품**: 3개 (목표: 33개) ❌  
- **체험 프로그램**: 4개 (목표: 5개) ❌
- **이벤트**: 0개 (목표: 27개) ❌
- **교육 커리큘럼**: 16개 (목표: 30개) ❌

**문제**: Cloudflare Dashboard Console의 입력 크기 제한으로 인해 전체 SQL이 실행되지 않았습니다.

---

## 🚀 해결 방법 (Wrangler CLI 사용 필수)

Cloudflare Dashboard Console은 크기 제한이 있어서 대용량 SQL을 실행할 수 없습니다.  
**Wrangler CLI를 사용해야 합니다.**

### Step 1: Cloudflare API 토큰 설정 (필수)

#### 1-1. Deploy 탭으로 이동
사이드바에서 **Deploy** 탭을 클릭하세요.

#### 1-2. Cloudflare API 토큰 생성
1. https://dash.cloudflare.com/profile/api-tokens 접속
2. **Create Token** 클릭
3. **Edit Cloudflare Workers** 템플릿 사용
4. 권한 설정:
   - **Account** → **D1** → **Edit**
   - **Zone** → **Workers Routes** → **Edit**
5. **Continue to summary** → **Create Token** 클릭
6. 생성된 토큰 복사

#### 1-3. Deploy 탭에 토큰 입력
1. Deploy 탭의 Cloudflare API 토큰 입력란에 붙여넣기
2. **저장** 버튼 클릭

### Step 2: Wrangler로 데이터 삽입

API 토큰이 설정되면 다음 명령을 실행하세요:

```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --file=MASTER_SEED.sql --remote
```

실행 시간: 약 10-20초

### Step 3: 확인

```bash
# 프로덕션 제품 수 확인
curl https://dagong-bi1.pages.dev/api/products?limit=100 | jq '.products | length'
# 예상 결과: 78

# 프로덕션 이벤트 확인
curl https://dagong-bi1.pages.dev/api/events?limit=50 | jq '.events | length'
# 예상 결과: 27

# 프로덕션 체험 확인
curl https://dagong-bi1.pages.dev/api/experiences | jq '.experiences | length'
# 예상 결과: 5
```

---

## 📝 왜 Cloudflare Dashboard Console로 안 되나요?

Cloudflare Dashboard Console에는 입력 크기 제한이 있습니다:
- **최대 입력 크기**: 약 32KB (추정)
- **MASTER_SEED.sql 크기**: 약 45KB
- **결과**: SQL의 일부만 실행되어 데이터가 불완전함

**해결책**: Wrangler CLI는 제한이 없으므로 전체 SQL을 실행할 수 있습니다.

---

## ✅ Wrangler CLI 사용 시 장점

1. **크기 제한 없음**: 어떤 크기의 SQL도 실행 가능
2. **트랜잭션 보장**: 전체 SQL이 하나의 트랜잭션으로 실행
3. **오류 처리**: 오류 발생 시 롤백
4. **자동화 가능**: CI/CD 파이프라인 구축 가능

---

## 🔗 관련 링크

- **MASTER_SEED.sql**: https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/MASTER_SEED.sql
- **Cloudflare API 토큰 생성**: https://dash.cloudflare.com/profile/api-tokens
- **Cloudflare D1 문서**: https://developers.cloudflare.com/d1/
- **프로덕션 사이트**: https://dagong-bi1.pages.dev

---

## 💡 현재 로컬 환경 상태

로컬 환경에는 모든 데이터가 정상입니다:
```bash
# 로컬 확인 (정상)
curl http://localhost:3000/api/products?limit=100 | jq '.products | length'
# → 78 ✅

curl http://localhost:3000/api/events?limit=50 | jq '.events | length'
# → 27 ✅

curl http://localhost:3000/api/experiences | jq '.experiences | length'
# → 5 ✅
```

프로덕션만 업데이트하면 완료됩니다!

---

## 🆘 문제 해결

### 문제: "CLOUDFLARE_API_TOKEN 필요" 오류

**원인**: Deploy 탭에서 API 토큰이 설정되지 않음

**해결**: 
1. Deploy 탭으로 이동
2. Cloudflare API 토큰 생성 및 입력
3. 저장 후 다시 시도

### 문제: "권한 없음" 오류

**원인**: API 토큰에 D1 편집 권한이 없음

**해결**:
1. https://dash.cloudflare.com/profile/api-tokens 에서 토큰 편집
2. D1 권한을 **Edit**로 변경
3. 새 토큰 생성하여 Deploy 탭에 재입력

---

## 📞 즉시 조치 필요

**현재 프로덕션 사이트에 데이터가 부족하여 사용자 경험이 저하됩니다.**

### 조치 순서:
1. ✅ Deploy 탭에서 Cloudflare API 토큰 설정
2. ✅ `npx wrangler d1 execute webapp-production --file=MASTER_SEED.sql --remote` 실행
3. ✅ 프로덕션 API 확인

**예상 소요 시간**: 5분

---

**작성일**: 2026-02-20  
**업데이트**: 프로덕션 데이터 부족 확인됨  
**우선순위**: 🔴 긴급
