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

---

## 🛠️ 기술 스택

- **Backend**: Hono v4 (Cloudflare Workers)
- **Frontend**: Vanilla JavaScript + TailwindCSS
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Pages
- **Version Control**: GitHub
- **Process Manager**: PM2 (로컬 개발용)

---

## 📊 현재 데이터 상태 (2026-02-18)

### ✅ 로컬 개발 환경
- **카테고리**: 27개 (차 7, 공예 11, 선물 4, 특산물 5)
- **지역**: 17개 (차산지 8, 공예산지 9)
- **이벤트**: 27개 (12개월 연중 행사)
- **상품**: 1개 (샘플 데이터)
- **로컬 서버**: http://localhost:3000

### ⚠️ 프로덕션 환경
- **URL**: https://dagong-bi1.pages.dev/
- **데이터**: 업데이트 필요 (카테고리 1개, 지역 1개, 이벤트 0개)
- **배포 가이드**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) 참조

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

---

## 📚 주요 문서

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 프로덕션 배포 가이드
- [MONTHLY_EVENTS.md](./MONTHLY_EVENTS.md) - 월별 이벤트 시스템 설명
- [SEO_GUIDE.md](./SEO_GUIDE.md) - 검색엔진 최적화 가이드

---

## 🌐 링크

- **프로덕션**: https://dagong.co.kr
- **Cloudflare Pages**: https://dagong-bi1.pages.dev
- **GitHub**: https://github.com/healingcafe1-prog/dagong

