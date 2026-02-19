# Cloudflare API 키 설정 가이드

## 🔑 Cloudflare API 키가 필요합니다

재배포를 진행하려면 Cloudflare API 키를 설정해야 합니다.

---

## 📌 API 키 설정 방법

### 옵션 1: GenSpark Deploy 탭 사용 (추천)

1. **왼쪽 사이드바에서 "Deploy" 탭 클릭**
2. **Cloudflare API 키 섹션 찾기**
3. **API 키 입력 및 저장**

---

### 옵션 2: Cloudflare Dashboard에서 API 토큰 생성

1. **Cloudflare Dashboard 로그인**
   - https://dash.cloudflare.com/

2. **API 토큰 생성 페이지로 이동**
   - 우측 상단 프로필 아이콘 클릭
   - **My Profile** 선택
   - 왼쪽 메뉴에서 **API Tokens** 클릭

3. **API 토큰 생성**
   - **Create Token** 버튼 클릭
   - "Edit Cloudflare Workers" 템플릿 선택하거나
   - **Custom token** 선택 후 다음 권한 설정:
     - Account → Cloudflare Pages → Edit
     - Account → D1 → Edit

4. **토큰 복사**
   - 생성된 토큰을 복사 (한 번만 표시됨!)
   - 안전한 곳에 저장

5. **GenSpark Deploy 탭에 입력**
   - Deploy 탭으로 돌아가기
   - 복사한 토큰 붙여넣기
   - 저장

---

## 🚀 API 키 설정 후 진행할 작업

API 키를 설정하시면 제가 자동으로:

1. ✅ 프로젝트 빌드
2. ✅ Cloudflare Pages에 배포
3. ✅ D1 데이터베이스 연결 확인
4. ✅ 사이트 정상 작동 테스트

이 모든 작업을 진행하겠습니다.

---

## 💡 대안: Dashboard에서 수동 재배포

API 키 없이 재배포하려면:

1. **Deployments 탭**에서 최신 배포를 찾기
2. **오른쪽 끝**에 있는 **⋯ (점 3개)** 버튼 클릭
   - 스크린샷에서는 "View details" 옆에 있을 것입니다
   - 또는 "..." 또는 "More" 버튼으로 표시될 수 있습니다
3. 드롭다운 메뉴에서 **"Retry deployment"** 또는 **"Redeploy"** 선택

---

## 🔗 유용한 링크

- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **API 토큰 생성**: https://dash.cloudflare.com/profile/api-tokens
- **Cloudflare Pages 문서**: https://developers.cloudflare.com/pages/
- **Deploy 탭**: 왼쪽 사이드바에서 찾기

---

## 📞 다음 단계

**Deploy 탭에서 Cloudflare API 키를 설정해주시면, 제가 즉시 재배포를 진행하겠습니다!**

또는 Dashboard의 ⋯ 메뉴에서 "Retry deployment"를 찾아 직접 클릭하실 수도 있습니다.
