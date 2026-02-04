# dagong.co.kr Cloudflare Pages 배포 가이드

## 🎯 배포 개요

**도메인**: dagong.co.kr  
**프로젝트명**: dagong  
**네임서버**: bjorn.ns.cloudflare.com, sara.ns.cloudflare.com ✅ 설정 완료

---

## ⚠️ 중요: Cloudflare API 토큰 필수

배포를 진행하려면 **Cloudflare API 토큰**이 필요합니다.

### 1️⃣ Cloudflare API 토큰 생성

1. **Cloudflare 대시보드 접속**
   - https://dash.cloudflare.com/profile/api-tokens

2. **"Create Token" 클릭**

3. **권한 설정 (아래 중 하나 선택)**
   
   **옵션 A: Edit Cloudflare Workers 템플릿 사용 (추천)**
   - "Use template" → "Edit Cloudflare Workers" 선택
   - Account Resources: Include - All accounts
   - Zone Resources: Include - All zones
   
   **옵션 B: Custom Token 생성**
   - Permissions:
     - Account - Cloudflare Pages - Edit
     - Account - D1 - Edit
     - Zone - DNS - Edit
   - Account Resources: Include - All accounts
   - Zone Resources: Include - Specific zone - dagong.co.kr

4. **토큰 생성 및 복사**
   - "Continue to summary" → "Create Token"
   - **토큰을 안전한 곳에 복사** (다시 볼 수 없음!)

---

## 🚀 배포 방법

### 방법 1: Cloudflare Dashboard에서 수동 배포 (권장)

#### Step 1: D1 데이터베이스 생성 (CLI 필요)

```bash
# Cloudflare에 로그인
cd /home/user/webapp
npx wrangler login

# D1 데이터베이스 생성
npx wrangler d1 create dagong-production

# 출력된 database_id를 wrangler.jsonc에 복사:
# database_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

**wrangler.jsonc 업데이트:**
```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "dagong-production",
    "database_id": "여기에_실제_database_id_입력"
  }
]
```

#### Step 2: D1 마이그레이션 적용

```bash
# 프로덕션 DB에 마이그레이션 적용
cd /home/user/webapp
npx wrangler d1 migrations apply dagong-production --remote
```

#### Step 3: Cloudflare Pages 프로젝트 생성

```bash
# Pages 프로젝트 생성 (main 브랜치)
npx wrangler pages project create dagong --production-branch main
```

#### Step 4: 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# Cloudflare Pages에 배포
npx wrangler pages deploy dist --project-name dagong
```

**배포 완료 후 받게 되는 URL:**
- `https://dagong.pages.dev` (임시 URL)
- `https://RANDOM-ID.dagong.pages.dev` (프리뷰 URL)

#### Step 5: 커스텀 도메인 연결

```bash
# dagong.co.kr 연결
npx wrangler pages domain add dagong.co.kr --project-name dagong

# www.dagong.co.kr도 연결 (선택)
npx wrangler pages domain add www.dagong.co.kr --project-name dagong
```

---

### 방법 2: Cloudflare Dashboard UI에서 수동 설정

#### A. D1 데이터베이스 설정

1. **Cloudflare Dashboard** → **Workers & Pages** → **D1**
2. **"Create database"** 클릭
3. Database name: `dagong-production`
4. 생성된 database_id를 복사

#### B. Pages 프로젝트 생성

1. **Workers & Pages** → **Create application** → **Pages**
2. **"Upload assets"** 선택
3. Project name: `dagong`
4. Production branch: `main`
5. 빌드 출력 디렉토리: `./dist` 폴더 업로드

#### C. D1 바인딩 설정

1. Pages 프로젝트 → **Settings** → **Functions**
2. **D1 database bindings** 섹션
3. Variable name: `DB`
4. D1 database: `dagong-production` 선택
5. **Save**

#### D. 커스텀 도메인 설정

1. Pages 프로젝트 → **Custom domains**
2. **Set up a custom domain** 클릭
3. Domain: `dagong.co.kr` 입력
4. **Continue** → Cloudflare가 자동으로 DNS 레코드 추가
5. 반복: `www.dagong.co.kr`도 추가 (선택)

---

## 📊 DNS 설정 확인

네임서버가 이미 Cloudflare로 변경되었으므로, 커스텀 도메인 추가 시 **DNS 레코드가 자동으로 생성**됩니다.

### 확인 방법

Cloudflare Dashboard → **DNS** → **Records**에서 다음 레코드 확인:

```
Type    Name               Content                           Proxy
CNAME   dagong.co.kr       dagong.pages.dev                  ✅ Proxied
CNAME   www.dagong.co.kr   dagong.pages.dev                  ✅ Proxied
```

---

## ✅ 배포 확인 체크리스트

### 1. D1 데이터베이스
- [ ] D1 데이터베이스 `dagong-production` 생성됨
- [ ] `wrangler.jsonc`에 database_id 업데이트됨
- [ ] 마이그레이션 파일 적용됨 (19개 마이그레이션)

### 2. Cloudflare Pages
- [ ] Pages 프로젝트 `dagong` 생성됨
- [ ] 빌드 파일(`dist/` 폴더) 배포됨
- [ ] D1 바인딩 설정됨 (Variable: `DB`)

### 3. 도메인 설정
- [ ] 네임서버 변경 완료: `bjorn.ns.cloudflare.com`, `sara.ns.cloudflare.com`
- [ ] 커스텀 도메인 `dagong.co.kr` 추가됨
- [ ] SSL/TLS 인증서 자동 발급됨 (Cloudflare 자동)
- [ ] DNS 레코드 자동 생성됨

### 4. 접속 테스트
- [ ] `https://dagong.pages.dev` 접속 확인
- [ ] `https://dagong.co.kr` 접속 확인
- [ ] `https://www.dagong.co.kr` 접속 확인 (설정 시)
- [ ] API 엔드포인트 테스트: `https://dagong.co.kr/api/products`
- [ ] D1 데이터베이스 연동 확인

---

## 🔧 문제 해결

### 문제 1: "CLOUDFLARE_API_TOKEN 환경변수 없음"
```bash
# 환경변수 설정
export CLOUDFLARE_API_TOKEN="your-api-token-here"

# 또는 .bashrc에 추가
echo 'export CLOUDFLARE_API_TOKEN="your-api-token-here"' >> ~/.bashrc
source ~/.bashrc
```

### 문제 2: D1 데이터베이스 연결 실패
- wrangler.jsonc의 database_id가 실제 생성된 ID와 일치하는지 확인
- Pages 프로젝트의 D1 바인딩 설정 확인

### 문제 3: 도메인 접속 안 됨
- 네임서버 전파 시간: 최대 24-48시간 (보통 1-2시간)
- DNS 전파 확인: https://www.whatsmydns.net/#CNAME/dagong.co.kr
- Cloudflare DNS 레코드 Proxy 상태 확인 (✅ Proxied)

---

## 📌 추가 설정 (선택사항)

### 환경 변수 설정
```bash
# 프로덕션 환경 변수 추가
npx wrangler pages secret put API_KEY --project-name dagong
```

### 자동 배포 설정 (GitHub 연동)
1. GitHub 저장소 연결
2. Cloudflare Pages가 자동으로 빌드/배포
3. PR 생성 시 프리뷰 환경 자동 생성

---

## 🎉 배포 완료 후 확인 사항

✅ **임시 URL**: https://dagong.pages.dev  
✅ **프로덕션 URL**: https://dagong.co.kr  
✅ **데이터베이스**: D1 (19 migrations 적용됨)  
✅ **SSL**: Cloudflare 자동 발급  
✅ **CDN**: 전 세계 Cloudflare 엣지 네트워크

---

**배포 성공을 기원합니다!** 🚀
