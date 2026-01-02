# 차茶공예 - 한국 차산지와 공예산지 직거래 플랫폼

## 📋 프로젝트 개요

**차茶공예**는 한국의 전통 차산지와 공예산지를 생산자와 소비자가 직접 연결하는 직거래 플랫폼입니다.

### 핵심 가치
- 🍵 **생산자 직거래**: 중간 유통 없이 생산자와 직접 거래
- 🗺️ **지역 문화 관광**: 차산지와 공예산지의 관광 정보 제공
- 🎓 **전통 문화 교육**: 다도 교육 및 공예 체험 프로그램
- 🎁 **선물 세트**: 차와 공예품을 조합한 명품 선물 구성

## 🌐 공개 URL

- **개발 서버**: https://3000-i1cjrhuxghhqe7nryfah2-18e660f9.sandbox.novita.ai
- **API 엔드포인트**: https://3000-i1cjrhuxghhqe7nryfah2-18e660f9.sandbox.novita.ai/api

## ✨ 현재 구현된 기능 (Phase 2 - 회원 시스템)

### 1. 홈 화면
- ✅ 히어로 섹션 (메인 배너)
- ✅ 이달의 이벤트 표시
- ✅ 추천 상품 (인기 상품 8개)
- ✅ 차 산지 바로가기 (8개 지역)
- ✅ 공예 산지 바로가기 (4개 지역, 중복 제거)
- ✅ 체험 프로그램 CTA

### 2. 상품 관리
- ✅ 상품 목록 페이지 (차/공예/선물세트)
- ✅ 카테고리별 필터링
- ✅ 상품 상세 페이지
- ✅ **💰 할인가 표시 (정가 대비 30% 기본 할인)**
- ✅ **🚚 배송비 표시 (3,000원 ~ 5,000원)**
- ✅ **절약 금액 강조 표시**
- ✅ 생산자 정보 표시
- ✅ 선물세트 구성품 표시
- ✅ 조회수 추적

### 2-1. 생산자 상품 관리 시스템 🆕
- ✅ **생산자 관리 대시보드** (`/producer/manage/:id`)
  - 내 상품 목록 (할인가 표시)
  - 내 체험 프로그램 목록
  - 상품/체험 수정 및 삭제
- ✅ **상품 등록 폼** (`/producer/:id/product/new`)
  - 상세 정보 입력 (이름, 카테고리, 설명)
  - **가격 자동 계산 (정가 입력 → 30% 할인가 자동 계산)**
  - **배송비 설정 (3,000원 ~ 5,000원)**
  - 가격 미리보기 (할인율 실시간 표시)
  - 재고 및 상세 정보 (중량, 원산지, 타입)
  - 추천 상품 설정
- ✅ **상품 수정 폼** (`/producer/:id/product/:productId`)
- ✅ **체험 등록 폼** (`/producer/:id/experience/new`)
  - 체험 기본 정보 (이름, 지역, 유형)
  - **가격 자동 계산 (30% 할인 적용)**
  - 소요 시간, 최대 참가자 설정
- ✅ **체험 수정 폼** (`/producer/:id/experience/:experienceId`)

### 3. 지역별 정보
- ✅ 지역 목록 (차산지/공예산지 구분)
- ✅ 지역 상세 페이지
- ✅ 해당 지역 생산자 목록
- ✅ 가볼만한 곳 (관광 명소)
- ✅ 맛집 정보
- ✅ 공방/체험장 정보

### 4. 생산자 페이지
- ✅ 생산자 목록 (차/공예 구분)
- ✅ 생산자 상세 프로필
- ✅ 생산자 스토리
- ✅ 생산자의 상품 목록
- ✅ 연락처 정보

### 5. 체험 & 교육
- ✅ 체험 프로그램 목록
- ✅ 체험 타입별 필터링 (다도교육/시음/공예/투어/견학)
- ✅ 체험 상세 정보
- ✅ **💰 할인가 표시 (정가 대비 30% 기본 할인)**
- ✅ 예약 가능한 일정 표시
- ✅ 잔여석 표시

### 5-1. 다도교육 신청 시스템 🆕
- ✅ **교육 신청 페이지** (`/education/apply`)
  - 기관 유형별 신청 (어린이집/학교/기업/관공서)
  - 상세 신청 정보 입력
  - 희망 날짜 및 시간 선택
- ✅ **교육 진행 현황 페이지** (`/education/status`)
  - 대시보드 (전체/진행중/대기/완료 통계)
  - 진행 중인 교육 카드 뷰
  - 전체 신청 목록 (상태별 필터)

### 6. 이벤트
- ✅ 진행 중인 이벤트 목록
- ✅ 할인율 표시
- ✅ 이벤트 기간 표시

### 7. 검색 기능
- ✅ 통합 검색 (상품/생산자/지역)
- ✅ 실시간 검색 결과
- ✅ 검색 모달 UI

### 8. 회원 시스템 🆕
- ✅ **소셜 로그인** (`/login`)
  - 구글 로그인
  - 네이버 로그인
  - 카카오 로그인
- ✅ **세션 관리**
  - 자동 로그인 유지 (30일)
  - 로그아웃 기능
- ✅ **사용자 정보**
  - 프로필 이미지
  - 이름, 이메일
  - 소셜 로그인 제공자 정보
- ✅ **네비게이션 통합**
  - 로그인 전: 로그인 버튼 표시
  - 로그인 후: 사용자 아바타 & 드롭다운 메뉴

### 9. 수수료 시스템 🆕
- ✅ **플랫폼 수수료 9.9% 설정**
- ✅ **생산자 수익 계산**
  - 상품 등록 시 실시간 수수료 계산
  - 체험 등록 시 실시간 수수료 계산
- ✅ **가격 미리보기**
  - 판매가
  - 플랫폼 수수료
  - 생산자 실수익

### 10. 네비게이션
- ✅ 반응형 네비게이션 바
- ✅ 모바일 메뉴
- ✅ 푸터 정보

## 💡 주요 특징

### 🏷️ 직거래 할인 시스템
- **30% 기본 할인**: 모든 상품과 체험에 기본 30% 할인 적용
- **정가 대비 절약 금액 표시**: 소비자가 얼마나 절약하는지 명확히 표시
- **가격 자동 계산**: 생산자가 정가만 입력하면 할인가 자동 계산
- **실시간 미리보기**: 등록 폼에서 할인가 실시간 확인

### 🎯 생산자 중심 설계
- **쉬운 상품 등록**: 직관적인 폼으로 상품 정보 입력
- **체험 프로그램 관리**: 체험 등록 및 일정 관리
- **통합 관리 대시보드**: 한 곳에서 모든 상품과 체험 관리
- **실시간 수정/삭제**: 언제든지 정보 수정 가능

## 🚧 아직 구현되지 않은 기능

### Phase 2 - 확장 기능
- ⏳ **인증 시스템**: 생산자 로그인/회원가입
- ⏳ 결제 시스템 (장바구니, 주문, 결제)
- ⏳ 회원 시스템 (소비자 회원가입, 로그인, 마이페이지)
- ⏳ 체험 프로그램 예약 시스템
- ⏳ 리뷰 및 평점 시스템
- ⏳ 찜하기 (위시리스트) 기능
- ⏳ **이미지 업로드 및 관리** (현재는 URL 입력)

### Phase 3 - 고급 기능
- ⏳ 생산자-소비자 실시간 소통 채널
- ⏳ 개인화 추천 알고리즘
- ⏳ 소셜 미디어 공유
- ⏳ 다국어 지원 (영어/중국어/일본어)
- ⏳ 관리자 대시보드
- ⏳ 상품/지역 관리 기능

## 📊 기능별 URI 요약

### 프론트엔드 페이지
| 페이지 | URI | 파라미터 |
|--------|-----|----------|
| 홈 화면 | `/` | - |
| 상품 목록 | `/products` | `?type=tea\|craft\|gift_set` `&category_id={id}` |
| 상품 상세 | `/products/:id` | - |
| 지역 목록 | `/regions` | `?type=tea\|craft` |
| 지역 상세 | `/regions/:id` | - |
| 생산자 목록 | `/producers` | `?type=tea\|craft` |
| 생산자 상세 | `/producers/:id` | - |
| 체험 목록 | `/experiences` | `?type=tea_ceremony\|tea_tasting\|craft_workshop\|farm_tour\|workshop_visit` |
| 체험 상세 | `/experiences/:id` | - |
| 이벤트 목록 | `/events` | - |
| 검색 | `/search` | `?q={검색어}` |

### API 엔드포인트
| API | Method | URI | 파라미터 | 설명 |
|-----|--------|-----|----------|------|
| 지역 목록 | GET | `/api/regions` | `?type=tea\|craft` | 차산지/공예산지 목록 |
| 지역 상세 | GET | `/api/regions/:id` | - | 지역 상세 정보 + 생산자 + 관광지 |
| 생산자 목록 | GET | `/api/producers` | `?type=tea\|craft&region_id={id}` | 생산자 목록 |
| 생산자 상세 | GET | `/api/producers/:id` | - | 생산자 정보 + 상품 목록 |
| **생산자 상품 목록 🆕** | **GET** | `/api/producers/:id/products` | - | 생산자의 모든 상품 |
| **생산자 체험 목록 🆕** | **GET** | `/api/producers/:id/experiences` | - | 생산자의 모든 체험 |
| 상품 목록 | GET | `/api/products` | `?type=tea\|craft\|gift_set&category_id={id}&featured=true&search={query}&limit={n}&offset={n}` | 상품 목록 |
| 상품 상세 | GET | `/api/products/:id` | - | 상품 상세 (할인 정보 포함) |
| **상품 등록 🆕** | **POST** | `/api/products` | Body: JSON | 새 상품 등록 |
| **상품 수정 🆕** | **PUT** | `/api/products/:id` | Body: JSON | 상품 정보 수정 |
| **상품 삭제 🆕** | **DELETE** | `/api/products/:id` | - | 상품 삭제 |
| 카테고리 | GET | `/api/categories` | `?type=tea\|craft\|gift` | 카테고리 목록 |
| 이벤트 목록 | GET | `/api/events` | - | 진행 중인 이벤트 |
| 이벤트 상세 | GET | `/api/events/:id` | - | 이벤트 정보 + 이벤트 상품 |
| 관광지 | GET | `/api/attractions` | `?region_id={id}&type=tourist_spot\|restaurant\|accommodation\|workshop` | 관광지/맛집 목록 |
| 체험 목록 | GET | `/api/experiences` | `?type=tea_ceremony\|tea_tasting\|craft_workshop\|farm_tour\|workshop_visit&region_id={id}` | 체험 프로그램 목록 |
| 체험 상세 | GET | `/api/experiences/:id` | - | 체험 정보 (할인 정보 포함) + 일정 |
| **체험 등록 🆕** | **POST** | `/api/experiences` | Body: JSON | 새 체험 등록 |
| **체험 수정 🆕** | **PUT** | `/api/experiences/:id` | Body: JSON | 체험 정보 수정 |
| **체험 삭제 🆕** | **DELETE** | `/api/experiences/:id` | - | 체험 삭제 |
| **체험 일정 추가 🆕** | **POST** | `/api/experience-schedules` | Body: JSON | 체험 일정 추가 |
| **체험 일정 삭제 🆕** | **DELETE** | `/api/experience-schedules/:id` | - | 체험 일정 삭제 |
| 통합 검색 | GET | `/api/search` | `?q={검색어}` | 상품/생산자/지역 통합 검색 |
| **교육 신청 목록 🆕** | **GET** | `/api/education-applications` | `?status={상태}&org_type={기관}` | 교육 신청 목록 |
| **교육 신청 상세 🆕** | **GET** | `/api/education-applications/:id` | - | 교육 신청 상세 |
| **교육 신청 등록 🆕** | **POST** | `/api/education-applications` | Body: JSON | 교육 신청 |
| **교육 신청 수정 🆕** | **PUT** | `/api/education-applications/:id` | Body: JSON | 교육 신청 정보 수정 |
| **교육 통계 🆕** | **GET** | `/api/education-statistics` | - | 교육 신청 통계 |
| **구글 로그인 🆕** | **GET** | `/auth/google` | - | Google OAuth 인증 시작 |
| **구글 로그인 콜백 🆕** | **GET** | `/auth/google/callback` | code, state | Google OAuth 콜백 처리 |
| **네이버 로그인 🆕** | **GET** | `/auth/naver` | - | Naver OAuth 인증 시작 |
| **네이버 로그인 콜백 🆕** | **GET** | `/auth/naver/callback` | code, state | Naver OAuth 콜백 처리 |
| **카카오 로그인 🆕** | **GET** | `/auth/kakao` | - | Kakao OAuth 인증 시작 |
| **카카오 로그인 콜백 🆕** | **GET** | `/auth/kakao/callback` | code | Kakao OAuth 콜백 처리 |
| **현재 사용자 정보 🆕** | **GET** | `/api/auth/me` | - | 로그인한 사용자 정보 |
| **로그아웃 🆕** | **POST** | `/api/auth/logout` | - | 세션 삭제 및 로그아웃 |

## 🗄️ 데이터 모델

### 주요 테이블
- **regions**: 지역 정보 (차산지 8개, 공예산지 6개)
- **producers**: 생산자 정보 (차 생산자 4명, 공예 작가 5명)
- **categories**: 상품 카테고리 (차 7개, 공예 5개, 선물 4개)
  - 차: 녹차, 황차, 홍차, 발효차, 말차, 블렌딩차, 허브차
- **products**: 상품 정보 (차, 공예품, 선물세트)
  - 🆕 `original_price`: 정가
  - 🆕 `discount_rate`: 할인율 (기본 30%)
  - `price`: 할인가 (판매가)
  - 🆕 `shipping_fee`: 배송비 (3,000 ~ 5,000원)
  - 🆕 `commission_rate`: 수수료율 (9.9%)
  - 🆕 `commission_amount`: 수수료 금액
  - 🆕 `producer_revenue`: 생산자 실수익
- **product_images**: 상품 이미지
- **gift_set_items**: 선물세트 구성품
- **events**: 이벤트 정보
- **event_products**: 이벤트-상품 연결
- **attractions**: 관광지/맛집 정보
- **experiences**: 체험 프로그램
  - 🆕 `original_price`: 정가
  - 🆕 `discount_rate`: 할인율 (기본 30%)
  - `price`: 할인가 (체험비)
- **experience_schedules**: 체험 일정
- **education_applications** 🆕: 다도교육 신청 정보
  - 기관 유형, 담당자 정보, 일정, 상태 등
- **system_settings** 🆕: 시스템 설정
  - `commission_rate`: 플랫폼 수수료율 (9.9%)
  - `default_shipping_fee`: 기본 배송비 (3,000원)
  - `shipping_fee_range_min`: 최소 배송비 (3,000원)
  - `shipping_fee_range_max`: 최대 배송비 (5,000원)
- **users** 🆕: 회원 정보
  - 이메일, 이름, 프로필 이미지
  - 소셜 로그인 제공자 정보 (google, naver, kakao)
  - 역할 (user, producer, admin)
- **user_sessions** 🆕: 사용자 세션
  - 세션 토큰, 만료 시간

### 지역 데이터
**차산지 (8개)**
- 제주도, 하동, 김해, 광양, 보성, 강진, 장흥, 부안

**공예산지 (7개)**
- 경기 광주, 이천, 여주, 청주, 부안, 강진, 문경

### 저장 서비스
- **Cloudflare D1**: SQLite 기반 관계형 데이터베이스 (로컬 개발 모드)
- **로컬 파일 시스템**: 정적 파일 (CSS, JS)

## 💻 기술 스택

### 백엔드
- **Hono**: 경량 웹 프레임워크
- **TypeScript**: 타입 안전성
- **Cloudflare D1**: SQLite 데이터베이스
- **Cloudflare Pages**: 글로벌 엣지 배포
- **OAuth 2.0**: 소셜 로그인 인증 (Google, Naver, Kakao)

### 프론트엔드
- **TailwindCSS**: 유틸리티 기반 CSS 프레임워크
- **Font Awesome**: 아이콘
- **Axios**: HTTP 클라이언트
- **Vanilla JavaScript**: 클라이언트 사이드 로직

### 개발 도구
- **Wrangler**: Cloudflare CLI
- **Vite**: 빌드 도구
- **PM2**: 프로세스 매니저 (개발 환경)

## 🚀 사용 방법

### 개발 환경 시작

```bash
# 1. 데이터베이스 초기화 (처음 한 번만)
npm run db:reset

# 2. 소셜 로그인 환경변수 설정 (필수)
# .dev.vars 파일 생성 후 OAuth 앱 키 입력
# 자세한 내용은 OAUTH_SETUP_GUIDE.md 참조
cp .dev.vars.example .dev.vars
# .dev.vars 파일을 편집하여 실제 OAuth 키 입력

# 3. 프로젝트 빌드
npm run build

# 4. 개발 서버 시작 (PM2)
pm2 start ecosystem.config.cjs

# 서버 상태 확인
pm2 list

# 로그 확인
pm2 logs webapp --nostream
```

### 소셜 로그인 설정

소셜 로그인 기능을 사용하려면 OAuth 앱을 등록해야 합니다:

1. **[OAUTH_SETUP_GUIDE.md](./OAUTH_SETUP_GUIDE.md)** 파일을 참조하여 각 플랫폼에서 OAuth 앱 등록
   - Google OAuth 2.0 클라이언트 ID 발급
   - 네이버 개발자 센터에서 애플리케이션 등록
   - 카카오 개발자 콘솔에서 앱 등록

2. `.dev.vars` 파일에 발급받은 키 입력:
   ```bash
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_secret
   NAVER_CLIENT_ID=your_naver_client_id
   NAVER_CLIENT_SECRET=your_naver_secret
   KAKAO_CLIENT_ID=your_kakao_rest_api_key
   ```

3. 로그인 페이지 접속: `http://localhost:3000/login`

### 주요 npm 스크립트

```bash
# 로컬 개발 (Vite)
npm run dev

# 샌드박스 개발 (Wrangler + D1)
npm run dev:sandbox

# 빌드
npm run build

# 프리뷰
npm run preview

# 데이터베이스 관리
npm run db:migrate:local    # 마이그레이션 적용 (로컬)
npm run db:seed             # 시드 데이터 입력
npm run db:reset            # DB 초기화 + 마이그레이션 + 시드
npm run db:console:local    # D1 콘솔 (로컬)

# 포트 정리
npm run clean-port

# Git 커밋
npm run git:commit "커밋 메시지"
```

### 데이터베이스 쿼리 실행

```bash
# 로컬 D1 콘솔에서 쿼리 실행
npm run db:console:local

# 예시: 상품 조회
wrangler d1 execute webapp-production --local --command="SELECT * FROM products LIMIT 5"
```

## 📈 다음 개발 추천 단계

### 우선순위 1: 핵심 커머스 기능
1. **장바구니 시스템**: 상품 담기, 수량 조절, 장바구니 페이지
2. **주문/결제 시스템**: 주문서 작성, 배송지 입력, 결제 연동
3. ✅ **회원 시스템**: ~~회원가입~~, ~~로그인~~, 마이페이지 (소셜 로그인 완료)

### 우선순위 2: 사용자 경험 향상
1. **체험 예약 시스템**: 일정 선택, 예약 정보 입력, 예약 확인
2. **리뷰 시스템**: 상품 리뷰 작성, 별점, 사진 첨부
3. **찜하기 기능**: 관심 상품 저장, 위시리스트 관리

### 우선순위 3: 콘텐츠 강화
1. **이미지 업로드**: 실제 상품 이미지, 지역 사진 추가
2. **블로그/스토리**: 차문화 이야기, 생산자 스토리 콘텐츠
3. **동영상 콘텐츠**: 생산 과정, 체험 프로그램 소개 영상

### 우선순위 4: 관리 기능
1. **관리자 대시보드**: 상품/주문/회원 관리
2. **통계 및 분석**: 매출 통계, 인기 상품 분석
3. **생산자 페이지**: 생산자 자체 상품/재고 관리

## 📁 프로젝트 구조

```
webapp/
├── src/
│   ├── index.tsx          # 메인 애플리케이션 (Hono API 라우트)
│   └── renderer.tsx        # HTML 렌더러 (레이아웃)
├── public/
│   └── static/
│       ├── app.js          # 프론트엔드 로직 (페이지 라우팅)
│       ├── producer-forms.js  # 🆕 생산자 등록 폼
│       └── style.css       # 커스텀 스타일
├── migrations/
│   ├── 0001_initial_schema.sql          # 초기 데이터베이스 스키마
│   ├── 0002_education_applications.sql  # 교육 신청 테이블
│   ├── 0003_add_pricing_fields.sql      # 🆕 할인가 필드 추가
│   ├── 0004_add_commission_settings.sql # 🆕 수수료 시스템 (9.9%)
│   ├── 0005_add_user_system.sql         # 🆕 회원/세션 테이블
│   └── 0006_add_shipping_fee.sql        # 🆕 배송비 시스템 (3,000~5,000원)
├── seed.sql                # 초기 데이터
├── .dev.vars               # 🆕 OAuth 환경 변수 (로컬 개발, .gitignore)
├── .dev.vars.example       # 🆕 환경 변수 예시 파일
├── ecosystem.config.cjs    # PM2 설정
├── wrangler.jsonc          # Cloudflare 설정
├── vite.config.ts          # Vite 빌드 설정
├── package.json            # 프로젝트 의존성
├── OAUTH_SETUP_GUIDE.md    # 🆕 소셜 로그인 설정 가이드
└── README.md               # 프로젝트 문서
```

## 🎨 디자인 컬러 팔레트

- **tea-green**: `#7c9473` - 차의 고요한 녹색
- **tea-brown**: `#8b6f47` - 따뜻한 차 색상
- **tea-cream**: `#f5f1e8` - 부드러운 크림색 배경
- **craft-blue**: `#5b7c99` - 공예품의 청자 색상

## 📝 개발 상태

- ✅ **Phase 1 (MVP)**: 완료 ← 기본 페이지 및 정보 표시
- ✅ **Phase 1.5 (생산자 관리)**: 완료 ← 상품/체험 등록, 30% 할인 시스템
- ✅ **Phase 2 (회원 시스템)**: 완료 ← 소셜 로그인, 세션 관리, 수수료 시스템
- ✅ **Phase 1.5 (생산자 관리)**: 완료 ← 🆕 상품/체험 등록 및 할인가 시스템
- 🚧 **Phase 2 (확장 기능)**: 계획 중 ← 결제, 회원, 예약 시스템
- 📅 **Phase 3 (고급 기능)**: 미정 ← 고급 관리 및 분석

## 🎯 생산자를 위한 사용 가이드

### 상품 등록하기
1. 생산자 관리 페이지 접속: `/producer/manage/{생산자ID}`
2. "상품 등록" 버튼 클릭
3. 상품 정보 입력:
   - 기본 정보 (이름, 카테고리, 설명)
   - 정가 입력 → **할인가 자동 계산** (30% 할인)
   - 재고 및 상세 정보 (중량, 원산지)
4. 등록 완료!

### 체험 프로그램 등록하기
1. 생산자 관리 페이지에서 "체험 등록" 클릭
2. 체험 정보 입력:
   - 기본 정보 (이름, 지역, 유형)
   - 정가 입력 → **할인가 자동 계산** (30% 할인)
   - 소요 시간, 최대 참가자
3. 등록 완료!

### 할인가 시스템
- 정가를 입력하면 **30% 할인가가 자동 계산**됩니다
- 상세 페이지에서 정가, 할인율, 절약 금액이 강조 표시됩니다
- 직거래 특별가임을 명확히 보여줍니다

## 📞 문의 및 기여

이 프로젝트는 한국의 전통 차문화와 공예 문화를 보존하고 발전시키기 위한 목적으로 개발되었습니다.

---

**최종 업데이트**: 2026-01-02
**버전**: 1.5.0 (Phase 1.5 - 생산자 관리)
**개발자**: AI Assistant
**라이선스**: MIT
