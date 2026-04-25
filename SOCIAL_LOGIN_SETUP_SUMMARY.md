# ✅ 소셜 로그인 등록 완료 안내

다공 플랫폼의 **카카오/구글/네이버 소셜 로그인** 등록 가이드가 준비되었습니다!

---

## 📚 작성된 가이드 문서

### 1. 📖 상세 등록 가이드
**파일**: `SOCIAL_LOGIN_REGISTRATION_GUIDE.md`

**포함 내용**:
- ✅ 카카오 로그인 설정 (단계별 스크린샷 가이드)
- ✅ 구글 로그인 설정 (OAuth 동의 화면 포함)
- ✅ 네이버 로그인 설정 (검수 신청 방법)
- ✅ Cloudflare 환경 변수 설정
- ✅ 테스트 방법
- ✅ 문제 해결 가이드
- ✅ 체크리스트

**예상 시간**: 약 40분 (카카오 10분 + 구글 15분 + 네이버 10분 + Cloudflare 5분)

### 2. ⚡ 빠른 시작 가이드
**파일**: `QUICK_START_SOCIAL_LOGIN.md`

**포함 내용**:
- ✅ 5분 요약 설정
- ✅ 필수 항목만 정리
- ✅ 간단한 체크리스트
- ✅ 주요 문제 해결

**예상 시간**: 약 15-20분

---

## 🔑 등록해야 할 플랫폼

### 1️⃣ 카카오 Developers
**URL**: https://developers.kakao.com/

**필요한 작업**:
1. 앱 생성 또는 선택
2. Web 플랫폼 등록: `https://dagong.co.kr`
3. 카카오 로그인 활성화
4. Redirect URI: `https://dagong.co.kr/auth/kakao/callback`
5. 동의 항목 설정: 닉네임, 이메일 (필수)
6. REST API 키 복사 → `KAKAO_CLIENT_ID`

### 2️⃣ Google Cloud Console
**URL**: https://console.cloud.google.com/

**필요한 작업**:
1. 프로젝트 생성 또는 선택
2. OAuth 동의 화면 구성
3. OAuth 클라이언트 ID 생성 (웹 애플리케이션)
4. 리디렉션 URI: `https://dagong.co.kr/auth/google/callback`
5. 클라이언트 ID 복사 → `GOOGLE_CLIENT_ID`
6. 클라이언트 보안 비밀 복사 → `GOOGLE_CLIENT_SECRET`

### 3️⃣ 네이버 Developers
**URL**: https://developers.naver.com/

**필요한 작업**:
1. 애플리케이션 등록
2. 네이버 로그인 API 선택
3. 서비스 URL: `https://dagong.co.kr`
4. Callback URL: `https://dagong.co.kr/auth/naver/callback`
5. Client ID 복사 → `NAVER_CLIENT_ID`
6. Client Secret 복사 → `NAVER_CLIENT_SECRET`

---

## ⚙️ Cloudflare 환경 변수 설정

### 위치
https://dash.cloudflare.com/ → Pages → dagong → Settings → Environment variables → **Production**

### 추가할 변수 (총 5개)

```bash
# 카카오 (1개)
KAKAO_CLIENT_ID = [카카오 REST API 키]

# 구글 (2개)
GOOGLE_CLIENT_ID = [구글 클라이언트 ID]
GOOGLE_CLIENT_SECRET = [구글 클라이언트 보안 비밀]

# 네이버 (2개)
NAVER_CLIENT_ID = [네이버 Client ID]
NAVER_CLIENT_SECRET = [네이버 Client Secret]
```

### 설정 후
1. **Save** 클릭
2. **Deployments** 탭 → **Retry deployment**
3. 또는 Git 푸시로 자동 배포

---

## 🚀 설정 완료 후

### 테스트 방법
1. https://dagong.co.kr 접속
2. **로그인** 버튼 클릭
3. **카카오/구글/네이버** 로그인 시도
4. 로그인 성공 확인
5. 프로필 정보 표시 확인

---

## 📋 설정 체크리스트

### 카카오 설정
- [ ] 카카오 Developers 앱 생성
- [ ] Web 플랫폼: `https://dagong.co.kr` 등록
- [ ] 카카오 로그인 활성화
- [ ] Redirect URI: `https://dagong.co.kr/auth/kakao/callback` 등록
- [ ] 동의 항목 설정 (닉네임, 이메일 필수)
- [ ] REST API 키 복사
- [ ] Cloudflare에 `KAKAO_CLIENT_ID` 추가

### 구글 설정
- [ ] Google Cloud 프로젝트 생성
- [ ] OAuth 동의 화면 구성
- [ ] OAuth 클라이언트 ID 생성
- [ ] 리디렉션 URI: `https://dagong.co.kr/auth/google/callback` 등록
- [ ] 클라이언트 ID, 보안 비밀 복사
- [ ] Cloudflare에 `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` 추가

### 네이버 설정
- [ ] 네이버 Developers 앱 등록
- [ ] 네이버 로그인 API 선택
- [ ] 서비스 URL, Callback URL 설정
- [ ] Client ID, Client Secret 복사
- [ ] Cloudflare에 `NAVER_CLIENT_ID`, `NAVER_CLIENT_SECRET` 추가

### Cloudflare & 배포
- [ ] 5개 환경 변수 모두 추가 완료
- [ ] 재배포 실행
- [ ] 배포 완료 확인 (GitHub Actions)

### 테스트
- [ ] 카카오 로그인 테스트
- [ ] 구글 로그인 테스트
- [ ] 네이버 로그인 테스트
- [ ] 프로필 정보 표시 확인
- [ ] 친구 초대 팝업 확인

---

## 🎯 각 Redirect URI 요약

모든 플랫폼에서 다음 URI를 정확히 입력하세요:

```
카카오: https://dagong.co.kr/auth/kakao/callback
구글:   https://dagong.co.kr/auth/google/callback
네이버: https://dagong.co.kr/auth/naver/callback
```

**주의**: 
- `https://` 필수 (http:// 작동 안 함)
- 끝에 슬래시(/) 없음
- 정확히 일치해야 함

---

## 💡 자주 묻는 질문

### Q1: 환경 변수를 추가했는데 로그인이 안 돼요
**A**: Cloudflare Pages 재배포를 실행하셨나요? 환경 변수 추가 후 반드시 재배포가 필요합니다.

### Q2: "Redirect URI mismatch" 오류가 나요
**A**: 각 플랫폼의 개발자 콘솔에서 Redirect URI가 정확히 입력되었는지 확인하세요.

### Q3: 구글 로그인에서 "앱이 확인되지 않음" 경고가 나와요
**A**: 개발 중에는 정상입니다. "고급" → "안전하지 않은 페이지로 이동" 클릭하거나, OAuth 동의 화면에서 테스트 사용자로 본인을 추가하세요.

### Q4: 네이버 로그인이 "개발 중" 상태에요
**A**: 개발 중에는 등록한 계정만 로그인 가능합니다. 실제 서비스를 위해서는 검수 신청이 필요합니다.

### Q5: 카카오톡 공유가 작동하지 않아요
**A**: Kakao JavaScript SDK 초기화가 필요합니다. `src/index.tsx`에서 `Kakao.init()`의 주석을 해제하고 JavaScript 키를 입력하세요.

---

## 📞 추가 도움말

### 공식 문서
- **카카오**: https://developers.kakao.com/docs/latest/ko/kakaologin/common
- **구글**: https://developers.google.com/identity/protocols/oauth2
- **네이버**: https://developers.naver.com/docs/login/overview/

### 프로젝트 문서
- **상세 가이드**: [SOCIAL_LOGIN_REGISTRATION_GUIDE.md](./SOCIAL_LOGIN_REGISTRATION_GUIDE.md)
- **빠른 시작**: [QUICK_START_SOCIAL_LOGIN.md](./QUICK_START_SOCIAL_LOGIN.md)
- **자동 배포**: [AUTO_DEPLOY_GUIDE.md](./AUTO_DEPLOY_GUIDE.md)

---

## ✨ 다음 단계

1. **각 플랫폼에서 앱 등록** (30-40분)
2. **Cloudflare 환경 변수 설정** (5분)
3. **재배포 실행** (2-3분)
4. **테스트** (1-2분)

**총 소요 시간**: 약 40-50분

---

## 🎉 완료하면

- ✅ 카카오 계정으로 로그인
- ✅ 구글 계정으로 로그인
- ✅ 네이버 계정으로 로그인
- ✅ 30일 자동 로그인
- ✅ 카카오톡 친구 초대
- ✅ 추천인 코드 시스템

모두 정상 작동합니다! 🚀

---

**작성일**: 2026-04-25  
**문서 위치**: `/home/user/webapp/`  
**GitHub**: https://github.com/healingcafe1-prog/dagong  
**사이트**: https://dagong.co.kr

**상태**: ✅ 가이드 작성 완료, 등록 대기
