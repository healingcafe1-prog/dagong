# 다공 (DaGong) - 차와 공예의 직거래 플랫폼

> 전통 차와 공예품을 생산자와 직거래하는 플랫폼

## 🌟 프로젝트 개요

**다공**은 전통 차와 공예품을 생산자와 소비자가 직접 거래할 수 있는 플랫폼입니다. 중간 마진을 최소화하여 소비자는 합리적인 가격에, 생산자는 정당한 수익을 얻을 수 있습니다.

### 주요 목표
- ✅ 생산자와 소비자 직거래 플랫폼
- ✅ 중간 마진 최소화 (최대 50% 절감)
- ✅ 지역 특산품 활성화
- ✅ 전통 문화 계승 및 발전

---

## 🚀 배포 정보

### 프로덕션 URL
- **메인 사이트**: https://dagong.co.kr
- **관리자 패널**: https://dagong.co.kr/admin.html
- **최신 배포**: https://43ab0729.dagong-bi1.pages.dev

### 기술 스택
- **Frontend**: HTML5, TailwindCSS, Vanilla JavaScript
- **Backend**: Hono (TypeScript)
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Pages
- **CI/CD**: GitHub Actions

---

## ✨ 현재 완료된 기능

### 1. 핵심 기능
- ✅ 지역별 보기 (5개 탭: 전체, 차 산지, 공예 산지, 박람회, 프리마켓)
- ✅ 상품 카테고리별 필터링
- ✅ 교육 프로그램 (다도, 명상, 공예 등)
- ✅ 체험 프로그램 (차 시음, 공방 방문, 승마체험 등)
- ✅ 장바구니 및 주문 시스템
- ✅ 다국어 지원 (한국어, English, 日本語)
- ✅ PWA 지원 (모바일 앱처럼 설치 가능)

### 2. 사용자 인증 시스템 (v2.1)
- ✅ 카카오 소셜 로그인
- ✅ 구글 소셜 로그인
- ✅ 네이버 소셜 로그인
- ✅ 30일 자동 로그인 (세션 관리)
- ✅ 카카오톡 친구초대 기능
- ✅ 추천인 코드 시스템 (DG + 6자리)

### 3. 자동 배포 시스템 (v2.1)
- ✅ GitHub Actions 워크플로우
- ✅ 코드 push만으로 자동 배포
- ✅ 웹 기반 관리자 패널
- ✅ 배포 상태 실시간 확인

---

## 📊 데이터베이스 현황

### Regions (22개)
- 차 산지: 8개 (보성, 하동, 제주, 화개, 구례, 장흥, 순천, 강진)
- 공예 산지: 10개
- 박람회: 1개 (한국차공예품박람회)
- 프리마켓: 1개 (다공 프리마켓)
- 기타: 2개 (괴산 승마)

### Education Categories (8개)
- 다도교육, 차공부, 공예공부, 명상교육
- 차 문화 특강, 차 비즈니스, 고급 다도

### Education Curriculum (27개)
- 기초 다도부터 고급 과정까지
- 훈민정음 다도, 직지심경 다도
- 블렌딩티 제작 컨설팅 등

### Experiences (17개)
- tea_tasting: 차 시음 체험
- craft_workshop: 공예 워크샵
- workshop_visit: 공방 방문
- farm_tour: 농장 투어
- horse_riding: 승마체험 (NEW)

---

## 🎯 사용 방법

### 간단한 업데이트 (3단계)

```bash
# 1. 코드 수정 (원하는 파일 편집)

# 2. Git 커밋
git add .
git commit -m "업데이트 내용"

# 3. GitHub 푸시
git push origin main
```

**끝! 2-3분 후 자동으로 https://dagong.co.kr에 반영됩니다!** 🚀

### 배포 상태 확인
- **GitHub Actions**: https://github.com/healingcafe1-prog/dagong/actions
- **관리자 패널**: https://dagong.co.kr/admin.html

---

## 🔧 환경 설정

### GitHub Actions Secrets
```
CLOUDFLARE_API_TOKEN: Cloudflare API 토큰
CLOUDFLARE_ACCOUNT_ID: Cloudflare Account ID
```

### Cloudflare 환경 변수 (Production)
```
KAKAO_CLIENT_ID: 카카오 REST API 키
KAKAO_CLIENT_SECRET: 카카오 시크릿 키
GOOGLE_CLIENT_ID: 구글 클라이언트 ID
GOOGLE_CLIENT_SECRET: 구글 클라이언트 시크릿
NAVER_CLIENT_ID: 네이버 클라이언트 ID
NAVER_CLIENT_SECRET: 네이버 클라이언트 시크릿
```

### 소셜 로그인 Redirect URI
- **카카오**: `https://dagong.co.kr/auth/kakao/callback`
- **구글**: `https://dagong.co.kr/auth/google/callback`
- **네이버**: `https://dagong.co.kr/auth/naver/callback`

---

## 📚 문서

### 자동 배포 관련
- [AUTO_DEPLOY_GUIDE.md](./AUTO_DEPLOY_GUIDE.md): 자동 배포 시스템 상세 가이드
- [EASY_UPDATE_GUIDE.md](./EASY_UPDATE_GUIDE.md): 간편 업데이트 가이드

### 인증 시스템 관련
- [KAKAO_AUTH_SETUP.md](./KAKAO_AUTH_SETUP.md): 카카오 인증 설정 가이드

### 배포 관련
- [FINAL_DEPLOYMENT_GUIDE.md](./FINAL_DEPLOYMENT_GUIDE.md): 최종 배포 가이드
- [CLOUDFLARE_MANUAL_DEPLOY.md](./CLOUDFLARE_MANUAL_DEPLOY.md): 수동 배포 가이드

---

## 🗂️ 프로젝트 구조

```
webapp/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 워크플로우
├── src/
│   ├── index.tsx               # Hono 메인 애플리케이션
│   └── auth-routes.ts          # 소셜 로그인 라우트
├── public/
│   ├── static/
│   │   ├── app.js              # 프론트엔드 JavaScript
│   │   ├── style.css           # 커스텀 스타일
│   │   ├── i18n.js             # 다국어 지원
│   │   └── kakao-invite.js     # 카카오 초대 기능
│   └── admin.html              # 관리자 패널
├── migrations/
│   ├── 0001_initial_schema.sql
│   ├── ...
│   └── 0043_add_user_auth_system.sql
├── wrangler.jsonc              # Cloudflare 설정
├── vite.config.ts              # Vite 빌드 설정
├── package.json
└── README.md
```

---

## 📈 주요 API 엔드포인트

### 공개 API
- `GET /api/regions`: 지역 목록
  - Query: `?type=tea|craft|fair|freemarket`
- `GET /api/products`: 상품 목록
  - Query: `?region_id=1&category_id=2`
- `GET /api/education`: 교육 프로그램 목록
- `GET /api/experiences`: 체험 프로그램 목록

### 인증 API
- `GET /auth/kakao`: 카카오 로그인
- `GET /auth/google`: 구글 로그인
- `GET /auth/naver`: 네이버 로그인
- `GET /auth/logout`: 로그아웃
- `GET /auth/me`: 현재 사용자 정보

### 주문 API (인증 필요)
- `POST /api/cart`: 장바구니 추가
- `GET /api/cart`: 장바구니 조회
- `POST /api/orders`: 주문 생성

---

## 🚨 알려진 이슈

### 1. GitHub Secret Scanning
- **문제**: 이전 커밋에 API 토큰 포함으로 push 차단
- **해결**: [Secret Scanning 해제 링크](https://github.com/healingcafe1-prog/dagong/security/secret-scanning/unblock-secret/3Cqg9ZE5njeVQe29q1dO28MCCeF) 방문

### 2. 중복 교육 카테고리
- **문제**: ID 7, 8에 "고급 다도" 중복
- **해결 예정**: 다음 마이그레이션에서 정리

---

## 📝 개발 히스토리

### v2.1 (2026-04-25) - 자동 배포 + 인증 시스템
- ✅ GitHub Actions 자동 배포
- ✅ 카카오/구글/네이버 소셜 로그인
- ✅ 카카오톡 친구초대 기능
- ✅ 웹 관리자 패널

### v2.0 (2026-04-25) - 프로덕션 배포
- ✅ 박람회·프리마켓 탭 추가
- ✅ 고급 다도 교육 프로그램 (5개)
- ✅ 승마체험 추가
- ✅ 괴산 지역 및 프로듀서 추가

### v1.0 (2026-02-18) - 초기 출시
- ✅ 기본 상품/교육/체험 시스템
- ✅ 지역별 필터링
- ✅ 장바구니 및 주문
- ✅ PWA 지원

---

## 🎯 다음 개발 계획

### 즉시 해야 할 작업
1. GitHub Secret Scanning 해제
2. Cloudflare 환경 변수 설정
3. 소셜 로그인 Redirect URI 등록

### 개선 작업
1. 중복 교육 카테고리 정리
2. 추천인 포인트 시스템 구현
3. 사용자 대시보드 개발
4. 결제 시스템 통합 (카카오페이, 네이버페이 등)
5. 생산자 관리 페이지
6. 주문 관리 시스템
7. 리뷰 및 평점 시스템

---

## 🤝 기여하기

### 개발 환경 설정
```bash
# 저장소 클론
git clone https://github.com/healingcafe1-prog/dagong.git
cd dagong

# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run build
npm run dev:sandbox

# 테스트
curl http://localhost:3000
```

### 배포
```bash
# 자동 배포 (권장)
git add .
git commit -m "업데이트 내용"
git push origin main

# 수동 배포
npm run deploy
```

---

## 📞 문의

- **사이트**: https://dagong.co.kr
- **관리자 패널**: https://dagong.co.kr/admin.html
- **GitHub**: https://github.com/healingcafe1-prog/dagong
- **이메일**: info@dagong.co.kr

---

## 📄 라이선스

이 프로젝트는 비공개 소스입니다. 무단 복제 및 배포를 금지합니다.

---

**생성일**: 2026-04-25  
**최종 업데이트**: 2026-04-25  
**버전**: v2.1  
**상태**: 🟢 운영 중
