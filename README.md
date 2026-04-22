# 다공 - 차와 공예의 직거래 플랫폼 v1.1 (최종본) 🎉

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange)](https://dagong.co.kr)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/healingcafe1-prog/dagong)
[![Version](https://img.shields.io/badge/Version-1.1--final-green)](https://github.com/healingcafe1-prog/dagong/releases/tag/v1.1-final-20250423)

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
- 🤖 **AI 간편 상품 등록** (사진 5장 + 상품명 + 가격만으로 자동 생성)
- 🎁 **카카오톡 친구초대** (20,000 포인트 적립)
- 🎓 **체험·교육 프로그램** (다도교육, 차체험, 공예체험 등)
- 🔍 **통합 검색 기능** (상품, 생산자, 지역 실시간 검색)
- 🏢 **회사소개 페이지** (연락처, 제휴사, 명함 다운로드) ✨ NEW!
- 🏷️ **품절 상품 관리** (샘플 품절 처리, 신상품 우선 정렬) ✨ NEW!

---

## 🔗 배포 정보

### 📍 URL
- **프로덕션**: https://dagong.co.kr
- **개발 환경**: https://3000-i1cjrhuxghhqe7nryfah2-5c13a017.sandbox.novita.ai
- **GitHub**: https://github.com/healingcafe1-prog/dagong
- **프로젝트 백업 v1.1**: https://www.genspark.ai/api/files/s/F2VbznS8
- **프로젝트 백업 v1.0**: https://www.genspark.ai/api/files/s/pWT2nsI1

### 📅 최종본 업데이트 이력

#### **v1.1 (2025-04-23)** 🎉 **최신 최종본**
- **회사소개 페이지 완성**:
  - 다공의 의미와 가치 섹션
  - 핵심 가치 3가지 (전통 계승, 직거래, K-Culture)
  - 연락처 정보 (대표, 전화, 이메일, 주소)
  - 온라인 채널 5개 (웹사이트, 유튜브, 인스타그램, 네이버카페, 네이버블로그)
  - 제휴사 6개 (SNP경매, 바디리셋28, 티카페알케미, 농어촌114, 솔라링크, 농기계차차차)
  - 명함 다운로드 기능 (미리보기, 다운로드, 인쇄)
- **품절 상품 관리**:
  - 전체 60개 샘플 상품 품절 처리
  - 품절 UI 개선 (이미지 오버레이 제거 → 상품명 옆 작은 배지)
  - 신상품 우선 정렬 (created_at DESC)
- **UI/UX 개선**:
  - 회사소개 아이콘 변경 (🏢 → ℹ️)
  - 인스타그램: @korea_teacraft
  - 네이버카페: cafe.naver.com/dasunilmi
  - 네이버블로그: blog.naver.com/dagong1004

#### **v1.0 (2026-04-22)**
- AI 간편 상품 등록 시스템
- 카카오톡 친구초대 팝업
- 체험·교육 프로그램 25개
- 지역 특산품 10개
- 교육 카테고리 구조 개편

---

## 🎨 주요 기능

### 1. **회사소개 페이지** 🏢 NEW! (v1.1)

**다공의 의미**:
- 차(茶)와 공예가 만드는 여백과 공간
- 일상의 여유와 전통의 가치
- 생산자-소비자 직거래로 합리적 가격

**핵심 가치**:
1. 🏛️ 전통 문화 계승
2. 🤝 생산자 직거래
3. 🌏 K-Culture 세계화

**연락처**:
- 대표: 박영광
- 휴대폰: 010-9571-9168
- 전화: 043-225-8582
- 이메일: dagong1004@naver.com
- 주소: 충북 청주시 상당구 중앙로 47 1층

**온라인 채널**:
- 웹사이트: dagong.co.kr
- 유튜브: 다공tv
- 인스타그램: @korea_teacraft
- 네이버카페: 한국차공예네트워크
- 네이버블로그: dagong1004

**제휴사** (6개):
- SNP 경매 (snpauction.com)
- 바디리셋28 (bodyreset28.co.kr)
- 티카페알케미 (티카페알케미.com)
- 농어촌114 (농어촌114.com)
- 솔라링크 (솔라링크.com)
- 농기계차차차 (농기계차차차.com)

**명함 다운로드**:
- 명함 미리보기
- 이미지 다운로드
- 인쇄 기능

**접근**: `/about`

### 2. **품절 상품 관리** 🏷️ NEW! (v1.1)

**샘플 상품 품절 처리**:
- 전체 60개 샘플 상품 `stock_quantity = 0`
- 신규 상품 등록 시 자동으로 최상단 노출
- 품절 샘플 상품은 하단으로 자동 이동

**품절 표시 UI**:
- 상품명 오른쪽에 작은 빨간 배지
- 스타일: `bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded`
- 이미지 오버레이 제거 (기존 검정 반투명 제거)
- 카드 투명도 제거 (정상 밝기)

**상품 정렬**:
```sql
ORDER BY 
  p.is_featured DESC,    -- 추천 상품 우선
  p.created_at DESC      -- 최신 등록 상품 우선
```

**적용 페이지**:
- 메인 페이지 추천 상품
- 상품 목록 (차, 공예품, 선물세트, 지역특산물)
- 생산자 페이지
- 상품 상세 페이지

### 3. **AI 간편 상품 등록** 🤖

고령의 생산자를 위한 초간단 등록 시스템:

**필수 입력**:
- 📸 사진 5장 (드래그 앤 드롭)
- ✏️ 상품명
- 💰 판매가격

**AI 자동 생성**:
- 상품 설명
- 주요 특징
- 사용 방법
- 보관 방법
- 카테고리 자동 판단

**접근**: `/products/new-simple`

### 2. **카카오톡 친구초대** 🎁 NEW!

**기능**:
- 사이트 진입 시 1.5초 후 자동 팝업
- 20,000 포인트 적립 (초대자 + 피초대자)
- 3가지 공유 방법:
  1. 카카오톡으로 초대
  2. 링크 복사
  3. 내 초대 현황 보기

**팝업 닫기**:
- X 버튼
- 배경 클릭
- "오늘 하루 보지 않기" 옵션 (24시간)

**접근**: 헤더 선물 아이콘(🎁) 또는 자동 팝업

### 3. **체험·교육 프로그램** 🎓 NEW!

**프로그램 종류** (25개):
- 다도교육 (5개): 전통 다도 입문, 왕실 다례 등
- 차체험 (5개): 블렌딩티 만들기, 차밭 트레킹 등
- 공예체험 (5개): 찻잔 만들기, 청자 공예 등
- 농장투어 (5개): 차 농장, 명인 농장 등
- 공방견학 (5개): 도예 공방, 청자 도요지 등

**교육 신청** (9가지 유형):
- 🍵 다도 · 차 문화:
  - 다도교육, 블렌딩티 만들기, 차 만들기, 차 산지 여행
- 🧘 명상 · 웰니스:
  - 명상교육, 활기체조(茶氣體操), 요가
- 🎨 공예 · 체험 · 레저:
  - 공예 체험, 승마 체험

**교육 커리큘럼** (30개):
- 다도 역사 개관 (8개)
- 차 기본 지식 (8개)
- 공예 (5개)
- 명상과 다도 (11개)

**접근**: `/experiences` 또는 `/education/curriculum`

### 4. **지역 특산품** 🌾 NEW!

**카테고리** (10개 샘플):
- 농산물 (4개): 제주 한라봉, 담양 죽순, 이천 쌀, 의성 마늘
- 가공식품 (3개): 보성 녹차 분말, 안동 간고등어, 정읍 장류 세트
- 수산물 (2개): 완도 전복, 영광 굴비
- 축산물 (1개): 횡성 한우

**접근**: `/products?type=local`

### 5. **카테고리 시스템**

**차 카테고리** (7개):
- 녹차, 백차, 청차, 황차, 홍차, 발효차, 블렌딩차

**공예품 카테고리** (11개):
- 찻잔, 다관, 장식품, 다기세트, 도자기, 목공예, 금속공예, 한복공예, 가죽공예, 서예, 그림

**선물세트 카테고리** (4개):
- 명절, 기념일, 기업, 맞춤 선물세트

**지역특산물 카테고리** (17개):
- 농산물, 수산물, 축산물, 가공식품, 전통주, 건강식품 등

### 6. **검색 기능** ✨

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

### 7. **네비게이션**

- **상단 메뉴**: 차 직거래, 공예품, 선물세트, 지역특산물, 지역별 보기, 체험·교육, 교육, 이벤트
- **우측 메뉴**: 검색, 친구초대(🎁), 장바구니, 언어 선택(KO/EN/ZH/JA), 로그인/프로필

### 8. **지역별 탐색**

17개 주요 지역 (제주도, 하동, 김해, 광양, 보성, 이천, 광주, 담양, 안동, 전주, 강진, 남원, 공주, 경주, 울산, 부산, 서울)

### 9. **소셜 로그인**

- Google OAuth
- Naver OAuth
- Kakao OAuth

---

## 🗄️ 데이터베이스 구조

### Cloudflare D1 (SQLite)

**주요 테이블**:
- `products`: 상품 정보 (카테고리, 생산자, 가격, 재고, AI 생성 여부)
- `categories`: 카테고리 정보 (차, 공예품, 선물, 특산물)
- `producers`: 생산자 정보 (지역, 연락처)
- `regions`: 지역 정보 (17개 지역)
- `experiences`: 체험·교육 프로그램 (25개)
- `education_categories`: 교육 카테고리 (4개)
- `education_curriculum`: 교육 커리큘럼 (30개)
- `education_applications`: 교육 신청서
- `referrals`: 친구 초대 관리 (추천인 코드, 포인트)
- `cart`: 장바구니
- `orders`: 주문 내역
- `users`: 사용자 정보
- `user_sessions`: 로그인 세션

### 데이터 현황

- **상품**: 68개 (차 20개, 공예 20개, 선물 10개, 특산물 10개, 추천 8개)
- **카테고리**: 31개 (차 7개, 공예 11개, 선물 4개, 특산물 5개)
- **생산자**: 3개
- **지역**: 17개
- **체험 프로그램**: 25개 (다도 5개, 차체험 5개, 공예 5개, 농장 5개, 공방 5개)
- **교육 커리큘럼**: 30개

---

## 🚀 배포 방법

### 로컬 개발

```bash
# 의존성 설치
npm install

# 빌드
npm run build

# 로컬 개발 서버 (Wrangler Pages Dev)
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000

# PM2로 백그라운드 실행 (권장)
pm2 start ecosystem.config.cjs

# 서버 상태 확인
pm2 list

# 로그 확인
pm2 logs --nostream
```

### Cloudflare Pages 배포

```bash
# 1. Cloudflare API 키 설정
# Deploy 탭에서 API 키 입력 또는:
export CLOUDFLARE_API_TOKEN=your_token

# 2. 빌드
npm run build

# 3. 프로젝트 생성 (최초 1회)
npx wrangler pages project create dagong --production-branch main

# 4. 배포
npx wrangler pages deploy dist --project-name dagong

# 5. 비밀 환경변수 설정
npx wrangler pages secret put GOOGLE_CLIENT_ID --project-name dagong
npx wrangler pages secret put GOOGLE_CLIENT_SECRET --project-name dagong
npx wrangler pages secret put NAVER_CLIENT_ID --project-name dagong
npx wrangler pages secret put NAVER_CLIENT_SECRET --project-name dagong
npx wrangler pages secret put KAKAO_CLIENT_ID --project-name dagong
```

---

## 🛠️ 기술 스택

### Frontend

- **프레임워크**: Hono v4.0 (Edge-first web framework)
- **스타일링**: TailwindCSS (CDN)
- **아이콘**: Font Awesome 6.4.0
- **HTTP 클라이언트**: Axios
- **소셜 공유**: Kakao SDK v2.7.0

### Backend

- **런타임**: Cloudflare Workers
- **데이터베이스**: Cloudflare D1 (SQLite)
- **인증**: OAuth 2.0 (Google, Naver, Kakao)
- **AI**: GPT-4 Vision / Claude Vision (상품 설명 자동 생성)

### 배포

- **호스팅**: Cloudflare Pages
- **빌드 도구**: Vite 6.4.1
- **배포 도구**: Wrangler 3.78.0
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

# 시드 데이터 삽입
npm run db:seed
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
KAKAO_JAVASCRIPT_KEY=your_kakao_javascript_key
```

### AI 상품 설명 생성 API 연동

현재는 Mock 데이터로 구현되어 있습니다. 실제 운영 시:

1. **OpenAI GPT-4 Vision 연동**:
```typescript
// src/index.tsx의 generateProductDescription 함수 수정
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4-vision-preview',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: '이 상품의 설명을 작성해주세요' },
          { type: 'image_url', image_url: { url: images[0] } }
        ]
      }
    ]
  })
})
```

2. **Claude Vision 연동** (대안):
```typescript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', data: imageBase64 } },
          { type: 'text', text: '이 상품의 설명을 작성해주세요' }
        ]
      }
    ]
  })
})
```

---

## 🔧 문제 해결

### 검색이 작동하지 않을 때

1. 브라우저 콘솔에서 에러 확인
2. `/api/search?q=테스트` API 직접 테스트
3. 데이터베이스에 상품이 있는지 확인

### 카테고리가 중복 표시될 때

```bash
# 데이터베이스에서 중복 카테고리 확인
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM categories WHERE type='tea'"

# 중복 제거
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

### 팝업이 표시되지 않을 때

```bash
# 브라우저 쿠키 확인 및 삭제
document.cookie = 'hideInvitePopup=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

# 페이지 새로고침
location.reload()
```

---

## 📦 프로젝트 구조

```
webapp/
├── src/
│   ├── index.tsx          # 메인 Hono 애플리케이션
│   └── renderer.tsx       # JSX 렌더러 (헤더, 푸터)
├── public/
│   └── static/
│       ├── app.js         # 프론트엔드 JavaScript
│       ├── style.css      # 커스텀 CSS
│       └── i18n.js        # 다국어 지원
├── migrations/            # D1 데이터베이스 마이그레이션
├── dist/                  # 빌드 결과물
├── .wrangler/            # Wrangler 캐시
├── ecosystem.config.cjs  # PM2 설정
├── wrangler.jsonc        # Cloudflare 설정
├── vite.config.ts        # Vite 빌드 설정
├── package.json          # 의존성 및 스크립트
└── README.md             # 문서 (이 파일)
```

---

## 🎯 주요 개선 사항 (v1.0)

### 사용자 경험
✅ AI 간편 등록으로 고령 생산자 접근성 향상  
✅ 친구초대 팝업으로 바이럴 마케팅 강화  
✅ 체험·교육 프로그램으로 오프라인 연계  
✅ 교육 카테고리 구조 개편으로 혼란 제거  

### 데이터
✅ 체험 프로그램 25개 샘플 추가  
✅ 지역 특산품 10개 샘플 추가  
✅ 교육 커리큘럼 30개 정리 (직업 관련 13개 제거)  

### 기능
✅ 카카오톡 SDK 연동 (공유하기)  
✅ 쿠키 기반 팝업 관리  
✅ 드래그 앤 드롭 파일 업로드  
✅ 실시간 사진 미리보기  

---

## 📄 라이센스

© 2024-2026 다공. All rights reserved.

---

## 📞 문의

- **이메일**: contact@dagong.co.kr
- **전화**: 02-1234-5678
- **GitHub Issues**: https://github.com/healingcafe1-prog/dagong/issues

---

## 🙏 감사의 말

이 프로젝트는 전통 차와 공예의 가치를 알리고, 생산자와 소비자를 직접 연결하여  
중간 마진을 줄이고 합리적인 가격으로 좋은 품질의 제품을 제공하고자 만들어졌습니다.

특히 디지털에 익숙하지 않은 고령의 생산자분들을 위해 AI 간편 등록 시스템을 도입하여  
누구나 쉽게 자신의 제품을 등록하고 판매할 수 있도록 하였습니다.

앞으로도 전통 문화의 계승과 발전을 위해 노력하겠습니다.

**다공 팀 일동** 🍵
