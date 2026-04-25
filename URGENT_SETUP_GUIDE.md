# 🚨 긴급: GitHub Secrets 설정 필요

## ⚠️ 문제
GitHub Actions에서 `CLOUDFLARE_API_TOKEN`을 찾을 수 없어 배포가 실패하고 있습니다.

## 📝 즉시 해야 할 일

### 1단계: GitHub Secrets 설정 페이지 열기
**바로 가기:** https://github.com/healingcafe1-prog/dagong/settings/secrets/actions

### 2단계: Cloudflare API Token 생성

1. **Cloudflare 대시보드 접속**
   - https://dash.cloudflare.com/profile/api-tokens

2. **"Create Token" 클릭**

3. **"Edit Cloudflare Workers" 템플릿 선택**

4. **권한 설정**
   - Account: Cloudflare Pages - Edit
   - Zone: All zones

5. **"Continue to summary" → "Create Token"**

6. **토큰 복사** (한 번만 표시됨!)

### 3단계: GitHub에 Secret 추가

1. **GitHub Secrets 페이지에서 "New repository secret" 클릭**

2. **첫 번째 Secret 추가**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Secret: [위에서 복사한 토큰 붙여넣기]
   - "Add secret" 클릭

3. **두 번째 Secret 확인/추가**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Secret: `ecc65d2ec1ecc2222db7937965158511`
   - "Add secret" 클릭

### 4단계: 배포 재실행

1. **GitHub Actions 페이지 열기**
   - https://github.com/healingcafe1-prog/dagong/actions

2. **최신 실패한 워크플로우 클릭**

3. **"Re-run jobs" → "Re-run all jobs" 클릭**

4. **2~3분 대기**

5. **성공 확인** ✅

### 5단계: 사이트 확인

- https://dagong.co.kr 접속
- 히어로 섹션에서 "📝 상품 등록하기" 버튼 확인

## 🎯 예상 결과

**Secrets 설정 전:**
```
❌ Error: Input required and not supplied: apiToken
```

**Secrets 설정 후:**
```
✅ Deployment complete
✅ URL: https://dagong.co.kr
```

## 📸 스크린샷 가이드

### GitHub Secrets 페이지
![image](https://user-images.githubusercontent.com/example.png)

설정해야 할 Secrets:
- ✅ `CLOUDFLARE_API_TOKEN` (방금 생성한 토큰)
- ✅ `CLOUDFLARE_ACCOUNT_ID` (ecc65d2ec1ecc2222db7937965158511)

## 💡 추가 정보

### Cloudflare API Token 권한
토큰에 필요한 권한:
- **Account - Cloudflare Pages: Edit**
- **Zone - All zones**

### Token 보안
- 토큰은 한 번만 표시됩니다
- 복사 후 바로 GitHub에 저장하세요
- 절대 코드나 문서에 포함하지 마세요

### 문제 해결
만약 배포가 여전히 실패한다면:
1. 토큰 권한 재확인
2. Account ID 확인
3. GitHub Actions 로그 확인

## 🔗 유용한 링크

- **GitHub Secrets 설정**: https://github.com/healingcafe1-prog/dagong/settings/secrets/actions
- **Cloudflare API Tokens**: https://dash.cloudflare.com/profile/api-tokens
- **GitHub Actions 로그**: https://github.com/healingcafe1-prog/dagong/actions
- **프로덕션 사이트**: https://dagong.co.kr

---

**⏱️ 소요 시간: 5분**

설정 완료 후 자동으로 배포되며, 2~3분 후 사이트에 반영됩니다!

