# 다공 - 차와 공예의 직거래 플랫폼

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange)](https://dagong.co.kr)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/healingcafe1-prog/dagong)

## 📋 프로젝트 개요

다공은 전통 차와 공예품을 생산자와 소비자가 직접 거래할 수 있는 플랫폼입니다.

**주요 기능**:
- 🍵 차 및 공예품 카테고리별 탐색
- 🗺️ 지역별 생산자 찾기 (17개 지역)
- 🎉 월별 이벤트 및 할인 행사
- 🛒 직거래 장바구니 및 주문 시스템
- 👨‍🌾 생산자 프로필 및 상품 관리
- 🔐 소셜 로그인 (Google, Naver, Kakao)
- 📝 판매자 등록 시스템 (사업자/개인 구분)
- 📦 상품 등록 시스템 (사진 5-10장, 할인율 20-50%)
- 🔍 **통합 검색 기능** (상품, 생산자, 지역 실시간 검색)

---

## 🔗 배포 정보

### 📍 URL
- **프로덕션**: https://dagong.co.kr
- **개발 환경**: https://3000-i1cjrhuxghhqe7nryfah2-18e660f9.sandbox.novita.ai
- **GitHub**: https://github.com/healingcafe1-prog/dagong

### 📅 업데이트 이력
- **2026-02-23**: 검색 기능 개선 (UX 향상, 로딩 인디케이터, ESC 키 지원)
- **2026-02-23**: 데이터베이스 정리 (말차 제거, 중복 발효차 제거)
- **2026-02-23**: PC 버전 완전 복원 및 안정화

---

## 🎨 주요 기능

### 1. **카테고리 시스템**
**차 카테고리** (7개):
- 녹차, 백차, 청차, 황차, 홍차, 발효차, 블렌딩차

**공예품 카테고리**:
- 찻잔, 다관, 장식품

**선물세트 카테고리**:
- 명절, 기념일, 기업, 맞춤 선물세트

**지역특산물 카테고리**:
- 농산물, 수산물, 축산물, 가공식품, 전통주, 건강식품 등

### 2. **검색 기능** ✨
- **실시간 검색**: 2글자 이상 입력 시 300ms 디바운스
- **통합 검색**: 상품, 생산자, 지역 동시 검색
- **검색 결과 표시**:
  - 상품: 이름 + 가격 (초록색 강조)
  - 생산자: 이름 + 지역
  - 지역: 이름 + 설명
- **UX 개선**:
  - 로딩 인디케이터 (spinner)
  - ESC 키로 모달 닫기
  - 검색 결과 없음 메시지 개선
  - 에러 메시지 개선

### 3. **네비게이션**
- **상단 메뉴**: 차 직거래, 공예품, 선물세트, 지역특산물, 지역별 보기, 체험·교육, 다도교육, 이벤트
- **우측 메뉴**: 검색, 장바구니, 언어 선택(KO/EN/ZH/JA), 로그인/프로필

### 4. **지역별 탐색**
17개 주요 지역 (제주도, 하동, 김해, 광양, 보성, 이천, 광주, 담양, 안동, 전주, 강진, 남원, 공주, 경주, 울산, 부산, 서울)

### 5. **소셜 로그인**
- Google OAuth
- Naver OAuth
- Kakao OAuth

---

## 🗄️ 데이터베이스 구조

### Cloudflare D1 (SQLite)
**주요 테이블**:
- `products`: 상품 정보 (카테고리, 생산자, 가격, 재고)
- `categories`: 카테고리 정보 (차, 공예품, 선물, 특산물)
- `producers`: 생산자 정보 (지역, 연락처)
- `regions`: 지역 정보 (17개 지역)
- `cart`: 장바구니
- `orders`: 주문 내역
- `users`: 사용자 정보
- `sessions`: 로그인 세션

### 데이터 현황
- **상품**: 25개 (차, 공예품, 선물세트, 특산물)
- **카테고리**: 31개 (차 7개, 공예 3개, 선물 4개, 특산물 17개)
- **생산자**: 3개 (박수공, 제주 한라산 차농원, 김연호)
- **지역**: 17개

---

## 🚀 배포 방법

### 로컬 개발
```bash
# 빌드
npm run build

# PM2로 개발 서버 시작
pm2 start ecosystem.config.cjs

# 서버 상태 확인
pm2 list

# 로그 확인
pm2 logs --nostream
```

### Cloudflare Pages 배포
```bash
# Cloudflare API 키 설정 (Deploy 탭에서)

# 빌드
npm run build

# 배포
npx wrangler pages deploy dist --project-name dagong
```

---

## 🛠️ 기술 스택

### Frontend
- **프레임워크**: Hono (Edge-first web framework)
- **스타일링**: TailwindCSS (CDN)
- **아이콘**: Font Awesome
- **HTTP 클라이언트**: Axios

### Backend
- **런타임**: Cloudflare Workers
- **데이터베이스**: Cloudflare D1 (SQLite)
- **인증**: OAuth 2.0 (Google, Naver, Kakao)

### 배포
- **호스팅**: Cloudflare Pages
- **CI/CD**: GitHub Actions (자동 배포)
- **도메인**: dagong.co.kr

---

## 📝 개발 가이드

### 데이터베이스 마이그레이션
```bash
# 로컬 데이터베이스 마이그레이션
npm run db:migrate:local

# 프로덕션 데이터베이스 마이그레이션
npm run db:migrate:prod

# 데이터베이스 초기화
npm run db:reset
```

### 환경 변수
`.dev.vars` 파일 생성:
```
DB=webapp-production
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret
KAKAO_CLIENT_ID=your_kakao_client_id
```

---

## 🔧 문제 해결

### 검색이 작동하지 않을 때
1. 브라우저 콘솔에서 에러 확인
2. `/api/search?q=테스트` API 직접 테스트
3. 데이터베이스에 상품이 있는지 확인

### 카테고리가 중복 표시될 때
1. 데이터베이스에서 중복 카테고리 확인:
   ```bash
   npx wrangler d1 execute webapp-production --local --command="SELECT * FROM categories WHERE type='tea'"
   ```
2. 중복 제거:
   ```bash
   npx wrangler d1 execute webapp-production --local --command="DELETE FROM categories WHERE id IN (5, 7)"
   ```

### 빌드 오류
```bash
# node_modules 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 정리
rm -rf .wrangler dist
npm run build
```

---

## 📄 라이센스

© 2024 다공. All rights reserved.

---

## 📞 문의

- **이메일**: contact@dagong.co.kr
- **GitHub Issues**: https://github.com/healingcafe1-prog/dagong/issues
