# 다공 - 차와 공예의 직거래 플랫폼

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-orange)](https://dagong.co.kr)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/healingcafe1-prog/dagong)

## 📋 프로젝트 개요

다공은 전통 차와 공예품을 생산자와 소비자가 직접 거래할 수 있는 플랫폼입니다.

**주요 기능**:
- 🍵 차 및 공예품 카테고리별 탐색 (27개 카테고리)
- 🗺️ 지역별 생산자 찾기 (17개 지역)
- 🎉 월별 이벤트 및 할인 행사 (연중 27개 이벤트)
- 🛒 직거래 장바구니 및 주문 시스템
- 👨‍🌾 생산자 프로필 및 상품 관리
- 🔐 소셜 로그인 (Google, Naver, Kakao)
- 📝 판매자 등록 시스템 (사업자/개인 구분)
- 📦 상품 등록 시스템 (사진 5-10장, 할인율 20-50%)
- 📱 **모바일 최적화 UI** (상단 카테고리 바 + 하단 네비게이션 + 2열 그리드)

---

## 📱 모바일 UI (NEW!)

### 반응형 레이아웃
- **Desktop (1024px+)**: 기존 레이아웃 유지 (상단 메뉴, 4열 그리드)
- **Mobile (< 1024px)**: 앱 스타일 UI (카테고리 바 + 하단 네비게이션 + 2열 그리드)

### 모바일 전용 기능
1. **상단 카테고리 바** (가로 스크롤)
   - 홈, 한국차, 공예품, 선물, 특산물, 지역, 체험, 이벤트
   - 각 카테고리 아이콘 + 텍스트
   - 좌우 스크롤로 전체 카테고리 탐색

2. **하단 고정 네비게이션** (5개 메뉴)
   - 🏠 **홈**: 메인 페이지
   - 📂 **카테고리**: 상단 카테고리 바 표시/숨김
   - 🔍 **검색**: 검색 모달 열기
   - ➕ **상품등록**: 판매자 상품 등록
   - 👤 **마이로그인**: 로그인/마이페이지

3. **2열 상품 그리드**
   - 모바일: 2열 (화면 최적화)
   - 태블릿: 2-3열
   - 데스크탑: 4열
   - 1:1 비율 상품 이미지 (aspect-ratio)

### 사용자 경험 개선
- **터치 영역 확대**: 모든 버튼 최소 44x44px
- **가로 스크롤**: 카테고리 필터, 카테고리 바
- **Safe Area 지원**: iOS 노치 대응
- **빠른 네비게이션**: 하단 바로 주요 기능 접근

---

## 🛠️ 기술 스택

- **Backend**: Hono v4 (Cloudflare Workers)
- **Frontend**: Vanilla JavaScript + TailwindCSS
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Pages
- **Version Control**: GitHub
- **Process Manager**: PM2 (로컬 개발용)

---

## 📊 현재 데이터 상태 (2026-02-20)

### ✅ 프로덕션 목표 (완전 복구 목표)
- **URL**: https://dagong-bi1.pages.dev/
- **카테고리**: 27개 (차 7, 공예 11, 선물 4, 특산물 5)
- **지역**: 17개 (차산지 8, 공예산지 9)
- **생산자**: 5개
- **이벤트**: 27개 (1월~12월 연중 행사) ✅
- **체험 프로그램**: 5개 (목표)
- **교육과정**: 30개 ✅
- **상품**:
  - 차(tea): 12개 (목표)
  - 공예품(craft): 9개 (목표)
  - 선물세트(gift_set): 5개 (목표)
  - 지역특산품(local): 13개 (목표)
  - **총 39개**

### 🔧 로컬 개발 환경
- **로컬 서버**: http://localhost:3000
- **데이터**: 로컬 SQLite 사용 (--local 플래그)

### 🚨 자동 데이터 관리 시스템
- **현재 상태 확인**: `bash check_data.sh` ⭐
- **자동 복구 안내**: `bash auto_recovery.sh`
- **긴급 복구 가이드**: [EMERGENCY_RECOVERY.md](./EMERGENCY_RECOVERY.md) 🔥
- **완전 복구 SQL**: [FULL_RECOVERY.sql](./FULL_RECOVERY.sql)
- **GitHub 백업**: 모든 SQL 파일은 GitHub에 백업됨

### 🎯 새로 구현된 기능
1. **소셜 로그인**
   - Google, Naver, Kakao 간편 로그인
   - 로그인 페이지: `/login`
   
2. **판매자 등록 시스템**
   - 판매자 등록 폼: `/seller/register`
   - 사업자/개인 구분 (탭 UI)
   - 필수 정보: 사업자등록번호/개인ID, 연락처, 은행계좌
   - 관리자 승인 후 상품 등록 가능
   
3. **상품 등록 시스템**
   - 상품 등록 폼: `/products/new`
   - 사진 5~10장 필수
   - 할인율 20~50% 범위
   - 수수료 자동 계산 (플랫폼 6.6% + 카드 3.3% + 세금 3.3% = 총 13.2%)
   - 실시간 유효성 검사
   
4. **수수료 구조**
   - 플랫폼 수수료: 6.6%
   - 카드 수수료: 3.3%
   - 세금: 3.3%
   - 총 수수료: 13.2%
   - 판매자 수령액 = 직거래가 - 총 수수료

### 📝 데이터 관리
- **통합 데이터 파일**: [MASTER_DATA.sql](./MASTER_DATA.sql)
- **복구 가이드**: [DATA_RESTORE_FINAL.md](./DATA_RESTORE_FINAL.md)
- **이벤트 복원 성공**: [EVENT_RESTORATION_SUCCESS.md](./EVENT_RESTORATION_SUCCESS.md)

---

## 🚀 배포

### GitHub → Cloudflare Pages (자동 배포)
```bash
git push origin main  # 푸시하면 자동 배포!
```

### 프로덕션 D1 데이터베이스 업데이트
상세 가이드는 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) 참조

---

## 💻 로컬 개발

### 설치
```bash
npm install
```

### 개발 서버 시작
```bash
# 빌드
npm run build

# PM2로 서버 시작
pm2 start ecosystem.config.cjs

# 또는 직접 실행 (디버깅용)
npx wrangler pages dev dist --d1=webapp-production --local --ip 0.0.0.0 --port 3000
```

### 로컬 D1 데이터베이스
```bash
# 마이그레이션 적용
npm run db:migrate:local

# 데이터베이스 초기화 (개발용)
npm run db:reset

# D1 콘솔 접속
npm run db:console:local
```

### 판매자 승인 (로컬 개발용)
```bash
# 판매자 승인 (상품 등록 가능하게)
npx wrangler d1 execute webapp-production --local --command="UPDATE producers SET is_verified = 1, verified_at = CURRENT_TIMESTAMP WHERE id = 1;"
```

---

## 🔐 인증 및 권한

### 사용자 흐름
1. **회원가입**: `/login` → Google/Naver/Kakao 선택
2. **판매자 등록**: `/seller/register` → 사업자/개인 정보 입력
3. **관리자 승인**: 판매자 is_verified = 1 설정
4. **상품 등록**: `/products/new` → 상품 정보 입력 (5-10장 사진, 할인율 20-50%)

### API 권한
- `POST /api/producers`: 로그인 필수, user_id 자동 연결
- `POST /api/products`: 로그인 + 판매자 승인(is_verified=1) 필수
- `GET /api/auth/me`: 현재 로그인한 사용자 정보 조회

---

## 📚 주요 문서

### 배포 및 데이터 관리
- [MASTER_DATA.sql](./MASTER_DATA.sql) - 🔥 통합 데이터 관리 SQL (체험·교육 포함)
- [DATA_RESTORE_FINAL.md](./DATA_RESTORE_FINAL.md) - 체험교육 데이터 복구 가이드
- [EVENT_RESTORATION_SUCCESS.md](./EVENT_RESTORATION_SUCCESS.md) - 이벤트 복원 성공 보고서
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 프로덕션 배포 가이드

### 기능 설명
- [MONTHLY_EVENTS.md](./MONTHLY_EVENTS.md) - 월별 이벤트 시스템 설명
- [SEO_GUIDE.md](./SEO_GUIDE.md) - 검색엔진 최적화 가이드

---

## 🌐 링크

- **프로덕션**: https://dagong.co.kr
- **Cloudflare Pages**: https://dagong-bi1.pages.dev
- **GitHub**: https://github.com/healingcafe1-prog/dagong

