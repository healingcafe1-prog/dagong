# 카카오 로그인 설정 가이드

## 🔑 Cloudflare 환경 변수 설정 필요

dagong.co.kr에서 카카오 로그인이 작동하려면 Cloudflare Pages에 다음 환경 변수를 설정해야 합니다:

### 1. Cloudflare Dashboard에서 설정
1. https://dash.cloudflare.com 접속
2. Pages → dagong 프로젝트 선택
3. Settings → Environment variables 메뉴
4. Production 탭에서 다음 변수 추가:

```
KAKAO_CLIENT_ID=카카오_REST_API_키
KAKAO_CLIENT_SECRET=카카오_시크릿_키 (선택사항)
GOOGLE_CLIENT_ID=구글_클라이언트_ID
GOOGLE_CLIENT_SECRET=구글_클라이언트_시크릿
NAVER_CLIENT_ID=네이버_클라이언트_ID
NAVER_CLIENT_SECRET=네이버_클라이언트_시크릿
```

### 2. 카카오 Developers 설정
1. https://developers.kakao.com/ 접속
2. 내 애플리케이션 → dagong 앱 선택
3. 플랫폼 설정:
   - Web 플랫폼 등록: https://dagong.co.kr
4. Redirect URI 설정:
   - https://dagong.co.kr/auth/kakao/callback
5. 동의 항목 설정:
   - 닉네임 (필수)
   - 프로필 이미지 (선택)
   - 카카오계정(이메일) (필수)

### 3. 구글 OAuth 설정
1. https://console.cloud.google.com/ 접속
2. 사용자 인증 정보 → OAuth 2.0 클라이언트 ID
3. 승인된 리디렉션 URI:
   - https://dagong.co.kr/auth/google/callback

### 4. 네이버 Developers 설정
1. https://developers.naver.com/ 접속
2. 내 애플리케이션 → dagong 앱 선택
3. Callback URL:
   - https://dagong.co.kr/auth/naver/callback

## ✅ 완료된 작업

1. ✅ 프로덕션 DB 마이그레이션 완료:
   - user_sessions 테이블 생성
   - users 테이블에 provider, provider_id, last_login_at 컬럼 추가
   - 인덱스 생성 (성능 최적화)

2. ✅ 카카오톡 친구초대 기능:
   - 로그인 사용자 확인
   - 추천인 코드 생성 (DG + 6자리 user_id)
   - Kakao SDK를 통한 공유
   - 링크 복사 fallback

3. ✅ 회원가입 시스템:
   - 소셜 로그인 (카카오, 구글, 네이버)
   - 세션 기반 인증
   - 30일 자동 로그인

## 🚀 배포 후 테스트

1. https://dagong.co.kr 접속
2. 로그인 버튼 클릭
3. 카카오/구글/네이버 로그인 시도
4. 로그인 성공 후 프로필 확인
5. 친구초대 팝업 테스트

## ⚠️ 주의사항

- 환경 변수 설정 후 반드시 Cloudflare Pages 재배포 필요
- 소셜 로그인 Redirect URI는 정확히 일치해야 함
- HTTPS 필수 (http://는 작동하지 않음)
