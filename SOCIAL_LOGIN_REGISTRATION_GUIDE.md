# 🔐 소셜 로그인 등록 가이드 (카카오/구글/네이버)

**다공 플랫폼** - 소셜 로그인 설정 완벽 가이드

---

## 📋 목차
1. [카카오 로그인 설정](#1-카카오-로그인-설정)
2. [구글 로그인 설정](#2-구글-로그인-설정)
3. [네이버 로그인 설정](#3-네이버-로그인-설정)
4. [Cloudflare 환경 변수 설정](#4-cloudflare-환경-변수-설정)
5. [테스트 방법](#5-테스트-방법)

---

## 1. 카카오 로그인 설정

### 1️⃣ 카카오 Developers 콘솔 접속
1. https://developers.kakao.com/ 접속
2. 로그인 후 **내 애플리케이션** 클릭

### 2️⃣ 애플리케이션 생성 또는 선택
- **새로 만들기**: "다공 플랫폼" 이름으로 앱 생성
- **기존 앱**: 이미 있다면 해당 앱 선택

### 3️⃣ 앱 설정 - 일반
1. **앱 키** 확인:
   - **REST API 키** 복사 (나중에 `KAKAO_CLIENT_ID`로 사용)
   - JavaScript 키도 복사 (프론트엔드용, 선택사항)

### 4️⃣ 플랫폼 설정
1. 왼쪽 메뉴 → **플랫폼** 클릭
2. **Web 플랫폼 등록** 클릭
3. 사이트 도메인 입력:
   ```
   https://dagong.co.kr
   ```
4. **저장** 클릭

### 5️⃣ 카카오 로그인 설정
1. 왼쪽 메뉴 → **카카오 로그인** 클릭
2. **활성화 설정** → **ON** 으로 변경
3. **Redirect URI** 설정:
   - **Redirect URI 등록** 버튼 클릭
   - 다음 URI 입력:
     ```
     https://dagong.co.kr/auth/kakao/callback
     ```
   - **저장** 클릭

### 6️⃣ 동의 항목 설정
1. 왼쪽 메뉴 → **동의 항목** 클릭
2. 다음 항목 설정:

| 항목 | 설정 | 필수 여부 |
|------|------|-----------|
| 닉네임 | 필수 동의 | ✅ 필수 |
| 프로필 사진 | 선택 동의 | ⚪ 선택 |
| 카카오계정(이메일) | 필수 동의 | ✅ 필수 |

3. **저장** 클릭

### 7️⃣ Client Secret 생성 (선택사항)
1. 왼쪽 메뉴 → **보안** 클릭
2. **Client Secret** → **코드 생성** 클릭
3. 생성된 코드 복사 (나중에 `KAKAO_CLIENT_SECRET`로 사용)
4. **활성화** 상태로 변경

### ✅ 카카오 설정 완료!
**필요한 값**:
- `KAKAO_CLIENT_ID`: REST API 키
- `KAKAO_CLIENT_SECRET`: Client Secret (선택사항)
- Redirect URI: `https://dagong.co.kr/auth/kakao/callback`

---

## 2. 구글 로그인 설정

### 1️⃣ Google Cloud Console 접속
1. https://console.cloud.google.com/ 접속
2. 로그인 후 프로젝트 선택 또는 생성

### 2️⃣ 프로젝트 생성 (새로운 경우)
1. 상단 **프로젝트 선택** → **새 프로젝트**
2. 프로젝트 이름: **다공 플랫폼**
3. **만들기** 클릭
4. 프로젝트 선택

### 3️⃣ OAuth 동의 화면 구성
1. 왼쪽 메뉴 → **APIs & Services** → **OAuth 동의 화면**
2. **외부(External)** 선택 → **만들기**
3. 앱 정보 입력:
   - **앱 이름**: 다공
   - **사용자 지원 이메일**: 본인 이메일
   - **앱 로고**: (선택사항)
   - **앱 도메인**:
     - 애플리케이션 홈페이지: `https://dagong.co.kr`
   - **승인된 도메인**: `dagong.co.kr`
   - **개발자 연락처 정보**: 본인 이메일
4. **저장 후 계속** 클릭

### 4️⃣ 범위 설정
1. **범위 추가 또는 삭제** 클릭
2. 다음 범위 선택:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
3. **업데이트** 클릭
4. **저장 후 계속** 클릭

### 5️⃣ 테스트 사용자 추가 (개발 중)
1. **테스트 사용자 추가** 클릭
2. 본인 Gmail 주소 추가
3. **저장 후 계속** 클릭
4. **대시보드로 돌아가기** 클릭

### 6️⃣ OAuth 2.0 클라이언트 ID 생성
1. 왼쪽 메뉴 → **사용자 인증 정보** 클릭
2. 상단 **+ 사용자 인증 정보 만들기** → **OAuth 클라이언트 ID**
3. 애플리케이션 유형: **웹 애플리케이션**
4. 이름: **다공 웹**
5. **승인된 리디렉션 URI**:
   - **URI 추가** 클릭
   - 다음 URI 입력:
     ```
     https://dagong.co.kr/auth/google/callback
     ```
6. **만들기** 클릭

### 7️⃣ 클라이언트 ID 및 Secret 복사
- 팝업에서 다음 정보 복사:
  - **클라이언트 ID** → `GOOGLE_CLIENT_ID`로 사용
  - **클라이언트 보안 비밀** → `GOOGLE_CLIENT_SECRET`로 사용

### 8️⃣ 앱 게시 (실제 서비스용)
1. **OAuth 동의 화면** 메뉴
2. **앱 게시** 버튼 클릭
3. 확인 후 게시

### ✅ 구글 설정 완료!
**필요한 값**:
- `GOOGLE_CLIENT_ID`: 클라이언트 ID
- `GOOGLE_CLIENT_SECRET`: 클라이언트 보안 비밀
- Redirect URI: `https://dagong.co.kr/auth/google/callback`

---

## 3. 네이버 로그인 설정

### 1️⃣ 네이버 Developers 접속
1. https://developers.naver.com/ 접속
2. 로그인 후 **Application** → **애플리케이션 등록**

### 2️⃣ 애플리케이션 등록
1. **애플리케이션 이름**: 다공
2. **사용 API**: 
   - **네이버 로그인** 체크 ✅
3. **제공 정보 선택**:
   - **회원이름** ✅ 필수
   - **이메일 주소** ✅ 필수
   - **프로필 사진** ⚪ 선택

### 3️⃣ 환경 설정
1. **서비스 환경**:
   - **PC 웹** 선택 ✅
2. **서비스 URL**:
   ```
   https://dagong.co.kr
   ```
3. **Callback URL**:
   ```
   https://dagong.co.kr/auth/naver/callback
   ```

### 4️⃣ 등록하기
1. 모든 정보 확인
2. **등록하기** 버튼 클릭

### 5️⃣ 클라이언트 ID 및 Secret 확인
1. 등록 완료 후 **내 애플리케이션** 페이지로 이동
2. 생성된 앱 클릭
3. **Client ID** 복사 → `NAVER_CLIENT_ID`로 사용
4. **Client Secret** 복사 → `NAVER_CLIENT_SECRET`로 사용

### 6️⃣ 검수 요청 (실제 서비스용)
1. **개발 상태** → **서비스 적용** 으로 변경
2. 검수 신청 (영업일 기준 2-3일 소요)

### ✅ 네이버 설정 완료!
**필요한 값**:
- `NAVER_CLIENT_ID`: Client ID
- `NAVER_CLIENT_SECRET`: Client Secret
- Callback URL: `https://dagong.co.kr/auth/naver/callback`

---

## 4. Cloudflare 환경 변수 설정

### 위에서 얻은 모든 값을 Cloudflare에 등록합니다.

### 1️⃣ Cloudflare Dashboard 접속
1. https://dash.cloudflare.com/ 접속
2. **Pages** 메뉴 클릭
3. **dagong** 프로젝트 선택

### 2️⃣ 환경 변수 추가
1. **Settings** 탭 클릭
2. **Environment variables** 메뉴
3. **Production** 탭에서 **Add variable** 클릭

### 3️⃣ 다음 변수들을 하나씩 추가:

#### 카카오 변수
```
Variable name: KAKAO_CLIENT_ID
Value: [카카오 REST API 키]
```

```
Variable name: KAKAO_CLIENT_SECRET
Value: [카카오 Client Secret] (있는 경우)
```

#### 구글 변수
```
Variable name: GOOGLE_CLIENT_ID
Value: [구글 클라이언트 ID]
```

```
Variable name: GOOGLE_CLIENT_SECRET
Value: [구글 클라이언트 보안 비밀]
```

#### 네이버 변수
```
Variable name: NAVER_CLIENT_ID
Value: [네이버 Client ID]
```

```
Variable name: NAVER_CLIENT_SECRET
Value: [네이버 Client Secret]
```

### 4️⃣ 저장 및 재배포
1. 모든 변수 추가 완료 후 **Save** 클릭
2. **Deployments** 탭으로 이동
3. 최신 배포의 **...** 메뉴 → **Retry deployment** 클릭
4. 또는 GitHub에 새로운 커밋을 푸시하여 자동 배포

---

## 5. 테스트 방법

### 1️⃣ 기본 접속 테스트
```bash
# 메인 페이지 확인
curl -I https://dagong.co.kr

# 예상 결과: HTTP/2 200
```

### 2️⃣ 각 로그인 버튼 테스트
1. https://dagong.co.kr 접속
2. **로그인** 버튼 클릭
3. 각 소셜 로그인 버튼 확인:
   - 카카오 로그인
   - 구글 로그인
   - 네이버 로그인

### 3️⃣ 카카오 로그인 테스트
1. **카카오 로그인** 버튼 클릭
2. 카카오 계정으로 로그인
3. 동의 항목 확인 후 **동의하고 계속하기**
4. https://dagong.co.kr 로 리다이렉트 확인
5. 오른쪽 상단에 프로필 이미지 및 이름 표시 확인

### 4️⃣ 구글 로그인 테스트
1. **구글 로그인** 버튼 클릭
2. Google 계정 선택
3. 권한 승인
4. https://dagong.co.kr 로 리다이렉트 확인
5. 프로필 정보 확인

### 5️⃣ 네이버 로그인 테스트
1. **네이버 로그인** 버튼 클릭
2. 네이버 계정으로 로그인
3. 약관 동의
4. https://dagong.co.kr 로 리다이렉트 확인
5. 프로필 정보 확인

### 6️⃣ 세션 지속성 테스트
1. 로그인 후 브라우저 새로고침
2. 로그인 상태 유지 확인
3. 브라우저 닫고 다시 열기
4. 30일 이내에 자동 로그인 확인

### 7️⃣ 친구 초대 테스트
1. 로그인 상태에서 **친구 초대** 팝업 확인
2. **카카오톡으로 초대하기** 클릭
3. 카카오톡 공유 또는 링크 복사 동작 확인

---

## 🔍 문제 해결

### 카카오 로그인 오류
- **오류**: Redirect URI mismatch
- **해결**: 카카오 Developers에서 Redirect URI가 정확히 `https://dagong.co.kr/auth/kakao/callback` 인지 확인

### 구글 로그인 오류
- **오류**: redirect_uri_mismatch
- **해결**: Google Cloud Console에서 승인된 리디렉션 URI가 정확한지 확인
- **오류**: 앱이 확인되지 않음
- **해결**: OAuth 동의 화면에서 앱 게시 또는 테스트 사용자 추가

### 네이버 로그인 오류
- **오류**: Callback URL 오류
- **해결**: 네이버 Developers에서 Callback URL이 정확한지 확인
- **오류**: 승인되지 않은 애플리케이션
- **해결**: 검수 요청 후 승인 대기

### 환경 변수 오류
- **증상**: 로그인 버튼 클릭 시 오류
- **해결**: 
  1. Cloudflare Pages에서 환경 변수 확인
  2. 변수 이름 철자 확인 (대소문자 구분)
  3. 재배포 실행

---

## 📋 체크리스트

### 카카오 설정
- [ ] 카카오 Developers 앱 생성
- [ ] Web 플랫폼 등록 (`https://dagong.co.kr`)
- [ ] 카카오 로그인 활성화
- [ ] Redirect URI 등록 (`https://dagong.co.kr/auth/kakao/callback`)
- [ ] 동의 항목 설정 (닉네임, 이메일 필수)
- [ ] REST API 키 복사
- [ ] Client Secret 생성 (선택)

### 구글 설정
- [ ] Google Cloud 프로젝트 생성
- [ ] OAuth 동의 화면 구성
- [ ] 범위 추가 (email, profile)
- [ ] OAuth 클라이언트 ID 생성
- [ ] 리디렉션 URI 등록 (`https://dagong.co.kr/auth/google/callback`)
- [ ] 클라이언트 ID 복사
- [ ] 클라이언트 보안 비밀 복사
- [ ] 앱 게시 (실제 서비스용)

### 네이버 설정
- [ ] 네이버 Developers 앱 등록
- [ ] 네이버 로그인 API 선택
- [ ] 제공 정보 선택 (이름, 이메일 필수)
- [ ] 서비스 URL 등록 (`https://dagong.co.kr`)
- [ ] Callback URL 등록 (`https://dagong.co.kr/auth/naver/callback`)
- [ ] Client ID 복사
- [ ] Client Secret 복사
- [ ] 검수 신청 (실제 서비스용)

### Cloudflare 설정
- [ ] KAKAO_CLIENT_ID 추가
- [ ] KAKAO_CLIENT_SECRET 추가 (선택)
- [ ] GOOGLE_CLIENT_ID 추가
- [ ] GOOGLE_CLIENT_SECRET 추가
- [ ] NAVER_CLIENT_ID 추가
- [ ] NAVER_CLIENT_SECRET 추가
- [ ] 재배포 실행

### 테스트
- [ ] 카카오 로그인 테스트
- [ ] 구글 로그인 테스트
- [ ] 네이버 로그인 테스트
- [ ] 세션 지속성 확인
- [ ] 친구 초대 기능 확인

---

## 📞 추가 도움말

### 공식 문서
- **카카오**: https://developers.kakao.com/docs/latest/ko/kakaologin/common
- **구글**: https://developers.google.com/identity/protocols/oauth2
- **네이버**: https://developers.naver.com/docs/login/overview/

### 지원 센터
- **카카오**: https://devtalk.kakao.com/
- **구글**: https://support.google.com/cloud/
- **네이버**: https://developers.naver.com/support/

---

## ✅ 완료!

모든 설정을 완료하면 다공 플랫폼에서 카카오/구글/네이버 소셜 로그인을 사용할 수 있습니다!

**테스트 URL**: https://dagong.co.kr

**설정 소요 시간**: 
- 카카오: 10분
- 구글: 15분
- 네이버: 10분
- Cloudflare: 5분
- **총 약 40분**

---

**작성일**: 2026-04-25  
**버전**: v1.0  
**상태**: ✅ 완료
