# 🚨 D1 데이터베이스 바인딩 문제 해결 가이드

## 현재 상황

✅ **완료:**
- Cloudflare Pages 배포 성공
- Events API 코드 수정 완료
- D1 바인딩 Settings에 추가 완료 (DB → webapp-production)

❌ **문제:**
- API 요청 시 여전히 500 에러 발생
- `env.DB`가 `undefined`로 보임

---

## 🔍 문제 진단

D1 바인딩을 Cloudflare Pages **Settings**에 추가하셨지만, 실제로는 **Production 환경에 적용**되지 않았을 가능성이 높습니다.

### 확인이 필요한 사항:

1. **D1 바인딩이 Production 환경에 적용되었는지**
2. **Preview 환경과 Production 환경이 다르게 설정되었는지**

---

## ✅ 해결 방법: Cloudflare Dashboard에서 D1 바인딩 재확인

### 1단계: D1 바인딩 설정 확인

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com/

2. **Pages 프로젝트 선택**
   - **Workers & Pages** → **dagong** 프로젝트 클릭

3. **Settings 탭**
   - **Settings** 탭 클릭
   - **Functions** 섹션으로 스크롤

4. **D1 Database Bindings 확인**
   - **Production** 환경 확인:
     - Variable name: `DB`
     - D1 database: `webapp-production`
   
   - **⚠️ 중요**: Production과 Preview 환경을 **모두** 설정해야 합니다!

---

### 2단계: Production 환경에 D1 바인딩이 없다면

만약 **Production** 탭에 D1 바인딩이 없다면:

1. **Production** 환경 선택
2. **Add binding** 클릭
3. **Variable name**: `DB` (대문자!)
4. **D1 database**: `webapp-production` 선택
5. **Save** 클릭

---

### 3단계: 재배포

D1 바인딩을 추가/수정한 후:

1. **Deployments** 탭으로 이동
2. 최신 배포의 **⋯** 메뉴 클릭
3. **Retry deployment** 선택

또는 CLI로:
```bash
cd /home/user/webapp
npm run deploy
```

---

## 🧪 바인딩 확인 방법

### Cloudflare Dashboard에서 확인:

1. **Settings** → **Functions** → **D1 Database Bindings**
2. **Production** 탭과 **Preview** 탭 모두 확인
3. 각 환경에 다음이 설정되어 있어야 함:
   ```
   Variable name: DB
   D1 database: webapp-production
   ```

---

## 📋 체크리스트

바인딩 설정 후 다음을 확인하세요:

- [ ] Settings → Functions → D1 Database Bindings 확인
- [ ] **Production 환경**에 DB 바인딩 존재 확인
- [ ] Variable name이 정확히 `DB` (대문자)인지 확인
- [ ] D1 database가 `webapp-production`인지 확인
- [ ] 재배포 실행 (Retry deployment 또는 CLI)
- [ ] API 테스트: `curl https://dagong-bi1.pages.dev/api/events`
- [ ] 홈페이지 접속 확인: https://dagong-bi1.pages.dev/

---

## 🐛 디버깅: 로컬 환경에서 테스트

로컬 환경에서는 정상 작동하는지 확인:

```bash
# 로컬 D1과 함께 개발 서버 시작
cd /home/user/webapp
npm run dev:d1

# 다른 터미널에서 테스트
curl http://localhost:3000/api/events
```

로컬에서 정상이면 Cloudflare Pages 바인딩 문제가 확실합니다.

---

## 💡 대안: wrangler.jsonc 확인

`wrangler.jsonc` 파일에 D1 설정이 있는지 확인:

```jsonc
{
  "name": "dagong",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "webapp-production",
      "database_id": "ef76dccd-be5f-476b-851c-f9503f18dd53"
    }
  ]
}
```

현재 파일 위치: `/home/user/webapp/wrangler.jsonc`

---

## 🔗 유용한 링크

- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **dagong 프로젝트**: https://dash.cloudflare.com/ → Workers & Pages → dagong
- **D1 문서**: https://developers.cloudflare.com/d1/
- **Pages 바인딩 가이드**: https://developers.cloudflare.com/pages/functions/bindings/#d1-databases

---

## 📞 다음 단계

1. ✅ **즉시**: Cloudflare Dashboard에서 **Production 환경의 D1 바인딩** 확인
2. ✅ **바인딩 추가 후**: **Retry deployment** 실행
3. ✅ **확인**: `curl https://dagong-bi1.pages.dev/api/events`로 API 테스트
4. ✅ **성공**: 홈페이지 https://dagong-bi1.pages.dev/ 정상 작동 확인

---

**생성일**: 2026-02-19  
**배포 ID**: 53d268a0  
**상태**: Events API 수정 완료, D1 Production 바인딩 확인 필요
