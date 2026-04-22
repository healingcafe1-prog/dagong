# 다공 v1.1 배포 가이드 (2025-04-23)

## 📦 최종본 정보
- **버전**: v1.1-final-20250423
- **백업 URL**: https://www.genspark.ai/api/files/s/F2VbznS8
- **빌드 상태**: ✅ 완료 (dist/ 디렉토리 준비됨)
- **Git 커밋**: 331개 (41개 미푸시)

---

## 🚀 배포 방법

### 방법 1: Cloudflare Pages 직접 배포 (권장)

#### 1단계: API 키 설정
```bash
# Cloudflare API 키 설정
export CLOUDFLARE_API_TOKEN="your-api-token-here"
```

#### 2단계: 프로젝트가 없으면 생성
```bash
cd /home/user/webapp
npx wrangler pages project create dagong \
  --production-branch main \
  --compatibility-date 2024-01-01
```

#### 3단계: 배포
```bash
cd /home/user/webapp
npm run build
npx wrangler pages deploy dist --project-name dagong
```

---

### 방법 2: GitHub를 통한 자동 배포

#### 1단계: GitHub 인증 설정
1. GitHub 탭에서 인증 완료
2. 또는 수동으로 토큰 설정:
```bash
export GITHUB_TOKEN="your-github-token"
git remote set-url origin https://$GITHUB_TOKEN@github.com/healingcafe1-prog/dagong.git
```

#### 2단계: GitHub에 푸시
```bash
cd /home/user/webapp
git push origin main --force
```

#### 3단계: Cloudflare Pages 연결
1. Cloudflare Dashboard → Pages
2. "Create a project" → "Connect to Git"
3. Repository: healingcafe1-prog/dagong 선택
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

---

### 방법 3: 백업 파일로 복원 후 배포

#### 1단계: 백업 다운로드 및 복원
```bash
# 새로운 위치에서
wget https://www.genspark.ai/api/files/s/F2VbznS8 -O dagong-v1.1.tar.gz
tar -xzf dagong-v1.1.tar.gz
cd home/user/webapp
```

#### 2단계: 의존성 설치 및 빌드
```bash
npm install
npm run build
```

#### 3단계: 배포
```bash
npx wrangler pages deploy dist --project-name dagong
```

---

## 🔧 환경 변수 설정

### 필수 환경 변수
```bash
# Cloudflare Pages에서 설정
# Settings → Environment variables

# 프로덕션 환경
NODE_ENV=production
```

### D1 데이터베이스 설정
```bash
# D1 데이터베이스 생성 (최초 1회)
npx wrangler d1 create dagong-production

# wrangler.jsonc에 database_id 추가
# 마이그레이션 적용
npx wrangler d1 migrations apply dagong-production
```

---

## 📊 배포 전 체크리스트

- ✅ 빌드 파일 생성 완료 (dist/)
- ✅ Git 커밋 정리 완료 (331 commits)
- ✅ README v1.1 업데이트 완료
- ✅ Git 태그 생성 완료 (v1.1-final-20250423)
- ✅ 프로젝트 백업 완료 (14.58 MB)
- ⬜ Cloudflare API 키 설정 필요
- ⬜ GitHub 푸시 필요 (41 commits)
- ⬜ D1 데이터베이스 마이그레이션 필요

---

## 🌐 배포 후 확인사항

### 1. 사이트 접속 확인
```bash
curl https://dagong.pages.dev
# 또는
curl https://dagong.co.kr
```

### 2. 주요 페이지 확인
- https://dagong.co.kr/
- https://dagong.co.kr/about (회사소개)
- https://dagong.co.kr/products (상품 목록)
- https://dagong.co.kr/experiences (체험·교육)

### 3. API 엔드포인트 확인
```bash
curl https://dagong.co.kr/api/products
curl https://dagong.co.kr/api/experiences
```

### 4. 데이터베이스 확인
```bash
# 프로덕션 DB 상태 확인
npx wrangler d1 execute dagong-production \
  --command="SELECT COUNT(*) FROM products"
```

---

## 🆘 문제 해결

### 빌드 실패 시
```bash
cd /home/user/webapp
rm -rf node_modules dist
npm install
npm run build
```

### 배포 실패 시
```bash
# 기존 배포 확인
npx wrangler pages deployment list --project-name dagong

# 캐시 클리어
rm -rf .wrangler
npm run build
```

### 데이터 초기화 필요 시
```bash
# 로컬 DB 리셋
npm run db:reset

# 프로덕션 DB 마이그레이션
npx wrangler d1 migrations apply dagong-production
```

---

## 📞 지원

문제가 발생하면:
1. 백업 파일로 복원: https://www.genspark.ai/api/files/s/F2VbznS8
2. Git 태그로 복원: `git checkout v1.1-final-20250423`
3. README.md 참고

---

**배포 완료 후 이 파일을 업데이트하여 배포 URL과 날짜를 기록하세요.**
