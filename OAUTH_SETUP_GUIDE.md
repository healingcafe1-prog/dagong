# 소셜 로그인 OAuth 앱 등록 가이드

이 문서는 차茶공예 플랫폼에서 소셜 로그인(Google, Naver, Kakao)을 사용하기 위한 OAuth 앱 등록 방법을 설명합니다.

## 📋 목차
- [Google OAuth 앱 등록](#google-oauth-앱-등록)
- [네이버 OAuth 앱 등록](#네이버-oauth-앱-등록)
- [카카오 OAuth 앱 등록](#카카오-oauth-앱-등록)
- [환경 변수 설정](#환경-변수-설정)

---

## 🟦 Google OAuth 앱 등록

### 1단계: Google Cloud Console 접속
1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) 접속
2. Google 계정으로 로그인

### 2단계: 프로젝트 생성
1. 상단의 프로젝트 선택 드롭다운 클릭
2. "새 프로젝트" 클릭
3. 프로젝트 이름 입력 (예: "차茶공예 플랫폼")
4. "만들기" 클릭

### 3단계: OAuth 동의 화면 구성
1. 좌측 메뉴에서 "OAuth 동의 화면" 클릭
2. User Type: "외부" 선택 후 "만들기"
3. **앱 정보 입력:**
   - 앱 이름: `차茶공예`
   - 사용자 지원 이메일: 본인 이메일
   - 앱 로고: (선택사항)
   - 앱 도메인: `https://your-domain.pages.dev`
4. **범위 설정:**
   - "범위 추가 또는 삭제" 클릭
   - 다음 범위 추가:
     - `../auth/userinfo.email`
     - `../auth/userinfo.profile`
     - `openid`
5. 저장 후 계속

### 4단계: OAuth 2.0 클라이언트 ID 만들기
1. "사용자 인증 정보" 메뉴 클릭
2. "+ 사용자 인증 정보 만들기" → "OAuth 2.0 클라이언트 ID" 선택
3. **애플리케이션 유형:** "웹 애플리케이션" 선택
4. **이름:** "차茶공예 웹 클라이언트"
5. **승인된 자바스크립트 원본:**
   ```
   http://localhost:3000
   https://your-domain.pages.dev
   ```
6. **승인된 리디렉션 URI:**
   ```
   http://localhost:3000/auth/google/callback
   https://your-domain.pages.dev/auth/google/callback
   ```
7. "만들기" 클릭
8. **클라이언트 ID**와 **클라이언트 보안 비밀번호** 복사 (나중에 사용)

---

## 🟩 네이버 OAuth 앱 등록

### 1단계: 네이버 개발자 센터 접속
1. [네이버 개발자 센터](https://developers.naver.com/apps/#/register) 접속
2. 네이버 계정으로 로그인

### 2단계: 애플리케이션 등록
1. "애플리케이션 등록" 버튼 클릭
2. **애플리케이션 이름:** `차茶공예`
3. **사용 API 선택:**
   - ✅ 네이버 로그인
4. **서비스 환경:**
   - ✅ PC 웹
5. **서비스 URL:**
   ```
   http://localhost:3000
   ```
   (배포 후 실제 도메인으로 변경)
6. **네이버 로그인 Callback URL:**
   ```
   http://localhost:3000/auth/naver/callback
   https://your-domain.pages.dev/auth/naver/callback
   ```
   (줄바꿈으로 구분하여 2개 입력)
7. **제공 정보 선택:**
   - ✅ 회원 이름
   - ✅ 이메일 주소
   - ✅ 프로필 이미지
8. "등록하기" 클릭
9. **Client ID**와 **Client Secret** 복사

---

## 🟨 카카오 OAuth 앱 등록

### 1단계: 카카오 개발자 콘솔 접속
1. [Kakao Developers](https://developers.kakao.com/console/app) 접속
2. 카카오 계정으로 로그인

### 2단계: 애플리케이션 추가
1. "애플리케이션 추가하기" 클릭
2. **앱 이름:** `차茶공예`
3. **사업자명:** 본인 이름 또는 사업자명
4. "저장" 클릭

### 3단계: 플랫폼 설정
1. 생성된 앱 선택
2. 좌측 메뉴 "앱 설정" → "플랫폼" 클릭
3. "Web 플랫폼 등록" 클릭
4. **사이트 도메인:**
   ```
   http://localhost:3000
   https://your-domain.pages.dev
   ```
5. 저장

### 4단계: 카카오 로그인 활성화
1. 좌측 메뉴 "제품 설정" → "카카오 로그인" 클릭
2. "활성화 설정" → **ON** 전환
3. **Redirect URI 등록:**
   ```
   http://localhost:3000/auth/kakao/callback
   https://your-domain.pages.dev/auth/kakao/callback
   ```
4. 저장

### 5단계: 동의항목 설정
1. 좌측 메뉴 "제품 설정" → "카카오 로그인" → "동의항목" 클릭
2. 다음 항목 설정:
   - **닉네임:** 필수 동의
   - **프로필 이미지:** 선택 동의
   - **카카오계정(이메일):** 필수 동의

### 6단계: 앱 키 확인
1. 좌측 메뉴 "앱 설정" → "앱 키" 클릭
2. **REST API 키** 복사 (이것이 Client ID)
3. Client Secret은 선택사항 (비워둬도 됨)

---

## 🔐 환경 변수 설정

### 개발 환경 (.dev.vars 파일)

프로젝트 루트에 `.dev.vars` 파일을 생성하고 다음 내용을 입력하세요:

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Naver OAuth
NAVER_CLIENT_ID=your_naver_client_id_here
NAVER_CLIENT_SECRET=your_naver_client_secret_here

# Kakao OAuth
KAKAO_CLIENT_ID=your_kakao_rest_api_key_here
KAKAO_CLIENT_SECRET=
```

**⚠️ 주의:** `.dev.vars` 파일은 `.gitignore`에 포함되어 있으므로 Git에 커밋되지 않습니다.

### 프로덕션 환경 (Cloudflare Pages)

프로덕션 배포 시에는 Cloudflare 환경 변수로 설정해야 합니다:

```bash
# Google OAuth
npx wrangler pages secret put GOOGLE_CLIENT_ID --project-name webapp
npx wrangler pages secret put GOOGLE_CLIENT_SECRET --project-name webapp

# Naver OAuth
npx wrangler pages secret put NAVER_CLIENT_ID --project-name webapp
npx wrangler pages secret put NAVER_CLIENT_SECRET --project-name webapp

# Kakao OAuth
npx wrangler pages secret put KAKAO_CLIENT_ID --project-name webapp
# KAKAO_CLIENT_SECRET는 선택사항이므로 생략 가능
```

---

## 🧪 테스트

모든 설정이 완료되면 다음과 같이 테스트하세요:

1. **개발 서버 시작:**
   ```bash
   npm run build
   pm2 restart webapp
   ```

2. **로그인 페이지 접속:**
   ```
   http://localhost:3000/login
   ```

3. **각 소셜 로그인 버튼 테스트:**
   - 구글로 시작하기
   - 네이버로 시작하기
   - 카카오로 시작하기

4. **로그인 성공 확인:**
   - 홈페이지로 리디렉션
   - 상단 네비게이션에 사용자 아바타 표시
   - 드롭다운 메뉴에서 "마이페이지", "로그아웃" 확인

---

## 🚨 문제 해결

### 일반적인 오류

1. **"redirect_uri_mismatch" 오류**
   - 각 플랫폼의 Redirect URI 설정을 확인하세요
   - `http://localhost:3000/auth/{provider}/callback` 형식이 정확한지 확인

2. **"invalid_client" 오류**
   - Client ID와 Client Secret이 정확한지 확인
   - `.dev.vars` 파일이 프로젝트 루트에 있는지 확인

3. **"access_denied" 오류**
   - OAuth 동의 화면 설정을 확인
   - 필요한 권한(이메일, 프로필)이 요청되었는지 확인

### 로그 확인

서버 로그에서 오류 메시지 확인:
```bash
pm2 logs webapp --nostream
```

---

## 📚 참고 자료

- [Google OAuth 2.0 가이드](https://developers.google.com/identity/protocols/oauth2)
- [네이버 로그인 API](https://developers.naver.com/docs/login/api/)
- [카카오 로그인 REST API](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)
- [Cloudflare Pages 환경 변수](https://developers.cloudflare.com/pages/configuration/build-configuration/)

---

완료되었습니다! 소셜 로그인을 사용할 준비가 되었습니다. 🎉
