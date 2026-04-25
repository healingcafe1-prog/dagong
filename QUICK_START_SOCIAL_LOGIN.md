# 🚀 빠른 시작 가이드 - 소셜 로그인 5분 설정

다공 플랫폼의 소셜 로그인을 빠르게 설정하는 간단한 가이드입니다.

---

## 📋 준비물

아래 정보를 먼저 확인하세요. 이미 앱이 등록되어 있다면 더 빠릅니다!

---

## 🔑 1단계: API 키 확인 (10분)

### 카카오 (3분)
1. https://developers.kakao.com/ 접속
2. 내 애플리케이션 → 앱 선택
3. **앱 키** 탭에서:
   - **REST API 키** 복사 ← 이게 `KAKAO_CLIENT_ID`
4. **플랫폼** 메뉴:
   - Web 플랫폼: `https://dagong.co.kr` 추가
5. **카카오 로그인** 메뉴:
   - 활성화 ON
   - Redirect URI: `https://dagong.co.kr/auth/kakao/callback` 추가
6. **동의 항목**: 닉네임, 이메일 **필수**로 설정

### 구글 (4분)
1. https://console.cloud.google.com/ 접속
2. 프로젝트 선택 또는 생성
3. **APIs & Services** → **사용자 인증 정보**
4. **OAuth 클라이언트 ID** 생성:
   - 유형: 웹 애플리케이션
   - 리디렉션 URI: `https://dagong.co.kr/auth/google/callback`
5. 생성된 **클라이언트 ID**와 **보안 비밀** 복사

### 네이버 (3분)
1. https://developers.naver.com/ 접속
2. **Application** → **애플리케이션 등록**
3. 네이버 로그인 API 선택
4. 서비스 URL: `https://dagong.co.kr`
5. Callback URL: `https://dagong.co.kr/auth/naver/callback`
6. 생성된 **Client ID**와 **Client Secret** 복사

---

## ⚙️ 2단계: Cloudflare 환경 변수 설정 (5분)

### 설정 방법
1. https://dash.cloudflare.com/ 접속
2. **Pages** → **dagong** 선택
3. **Settings** → **Environment variables**
4. **Production** 탭에서 아래 변수 추가:

```
KAKAO_CLIENT_ID=[카카오 REST API 키]
GOOGLE_CLIENT_ID=[구글 클라이언트 ID]
GOOGLE_CLIENT_SECRET=[구글 클라이언트 보안 비밀]
NAVER_CLIENT_ID=[네이버 Client ID]
NAVER_CLIENT_SECRET=[네이버 Client Secret]
```

### 예시
```
KAKAO_CLIENT_ID=a1b2c3d4e5f6g7h8i9j0
GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbC123DeF456GhI789
NAVER_CLIENT_ID=AbCdEfGhIj
NAVER_CLIENT_SECRET=1234567890
```

5. **Save** 클릭

---

## 🚀 3단계: 재배포 (2분)

### 방법 1: Cloudflare에서 재배포
1. **Deployments** 탭
2. 최신 배포의 **...** 메뉴
3. **Retry deployment** 클릭

### 방법 2: Git 푸시로 자동 배포
```bash
cd /home/user/webapp
git commit --allow-empty -m "환경 변수 업데이트"
git push origin main
```

2-3분 후 자동 배포 완료!

---

## ✅ 4단계: 테스트 (1분)

1. https://dagong.co.kr 접속
2. **로그인** 버튼 클릭
3. **카카오/구글/네이버** 중 하나 선택
4. 로그인 완료!

---

## 📋 요약 체크리스트

### 카카오
- [ ] REST API 키 복사
- [ ] Web 플랫폼에 `https://dagong.co.kr` 등록
- [ ] Redirect URI: `https://dagong.co.kr/auth/kakao/callback`
- [ ] 동의 항목: 닉네임, 이메일 필수

### 구글
- [ ] OAuth 클라이언트 ID 생성
- [ ] 클라이언트 ID, 보안 비밀 복사
- [ ] 리디렉션 URI: `https://dagong.co.kr/auth/google/callback`

### 네이버
- [ ] 애플리케이션 등록
- [ ] Client ID, Client Secret 복사
- [ ] Callback URL: `https://dagong.co.kr/auth/naver/callback`

### Cloudflare
- [ ] KAKAO_CLIENT_ID 설정
- [ ] GOOGLE_CLIENT_ID 설정
- [ ] GOOGLE_CLIENT_SECRET 설정
- [ ] NAVER_CLIENT_ID 설정
- [ ] NAVER_CLIENT_SECRET 설정
- [ ] 재배포 실행

---

## 🔍 문제 해결

### "Redirect URI mismatch" 오류
→ 각 플랫폼에서 Redirect URI를 **정확히** 확인:
- 카카오: `https://dagong.co.kr/auth/kakao/callback`
- 구글: `https://dagong.co.kr/auth/google/callback`
- 네이버: `https://dagong.co.kr/auth/naver/callback`

### 로그인 버튼이 작동하지 않음
→ Cloudflare 환경 변수가 제대로 설정되었는지 확인
→ 재배포 실행했는지 확인

### "앱이 확인되지 않음" (구글)
→ OAuth 동의 화면에서 **테스트 사용자** 추가 또는 **앱 게시**

---

## 💡 팁

1. **개발 단계**: 테스트 사용자로 본인 계정만 추가
2. **실제 서비스**: 앱 게시/검수 완료 후 누구나 로그인 가능
3. **환경 변수**: 절대 GitHub에 커밋하지 말 것!
4. **Redirect URI**: https:// 필수, http:// 작동 안 됨

---

## 📞 도움말

상세한 설명은 다음 문서 참조:
- [SOCIAL_LOGIN_REGISTRATION_GUIDE.md](./SOCIAL_LOGIN_REGISTRATION_GUIDE.md) - 완전한 가이드

공식 문서:
- 카카오: https://developers.kakao.com/docs/latest/ko/kakaologin/common
- 구글: https://developers.google.com/identity/protocols/oauth2
- 네이버: https://developers.naver.com/docs/login/overview/

---

## ✨ 완료!

**총 소요 시간**: 약 15-20분

이제 https://dagong.co.kr 에서 소셜 로그인을 사용할 수 있습니다! 🎉

---

**작성일**: 2026-04-25  
**버전**: v1.0
