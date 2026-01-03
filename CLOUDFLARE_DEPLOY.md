# Cloudflare Pages 빠른 배포 가이드

## 준비사항
✅ Cloudflare 계정
✅ GitHub 저장소에 코드 푸시 완료
✅ Wrangler CLI 설치

## 1단계: Cloudflare API 키 설정

```bash
# Sandbox에서 setup_cloudflare_api_key 실행
# 또는 로컬에서:
export CLOUDFLARE_API_TOKEN=your_api_token
```

## 2단계: D1 데이터베이스 생성

```bash
# 프로덕션 데이터베이스 생성
npx wrangler d1 create korean-tea-craft-production

# 출력 예시:
# ✅ Successfully created DB 'korean-tea-craft-production' in region APAC
# database_id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# wrangler.jsonc 파일 수정
# "database_id": "위의-database-id-입력"
```

## 3단계: wrangler.jsonc 설정

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "korean-tea-craft",
  "compatibility_date": "2024-01-01",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "korean-tea-craft-production",
      "database_id": "여기에-실제-database-id-입력"
    }
  ]
}
```

## 4단계: 마이그레이션 적용

```bash
# 프로덕션 데이터베이스에 마이그레이션 적용
npx wrangler d1 migrations apply korean-tea-craft-production

# 확인
npx wrangler d1 execute korean-tea-craft-production \
  --command="SELECT COUNT(*) as total FROM products"
```

## 5단계: 빌드

```bash
# 프로젝트 빌드
npm run build

# dist/ 폴더 확인
ls -la dist/
# 예상 파일:
# - _worker.js (메인 애플리케이션)
# - _routes.json (라우팅 설정)
# - static/ (정적 파일)
```

## 6단계: Cloudflare Pages 프로젝트 생성

```bash
# Pages 프로젝트 생성
npx wrangler pages project create korean-tea-craft \
  --production-branch main \
  --compatibility-date 2024-01-01

# 성공 메시지:
# ✅ Successfully created the 'korean-tea-craft' project.
```

## 7단계: 배포

```bash
# 첫 배포
npx wrangler pages deploy dist --project-name korean-tea-craft

# 배포 완료 메시지 예시:
# ✨ Success! Uploaded 42 files (3.2 sec)
# ✨ Deployment complete! Take a peek over at https://xxxxxxxx.korean-tea-craft.pages.dev
```

## 8단계: 환경 변수 설정 (선택사항)

```bash
# OAuth 키 설정 (소셜 로그인 사용 시)
npx wrangler pages secret put GOOGLE_CLIENT_ID --project-name korean-tea-craft
npx wrangler pages secret put GOOGLE_CLIENT_SECRET --project-name korean-tea-craft
npx wrangler pages secret put NAVER_CLIENT_ID --project-name korean-tea-craft
npx wrangler pages secret put NAVER_CLIENT_SECRET --project-name korean-tea-craft
npx wrangler pages secret put KAKAO_CLIENT_ID --project-name korean-tea-craft
npx wrangler pages secret put KAKAO_CLIENT_SECRET --project-name korean-tea-craft
npx wrangler pages secret put SESSION_SECRET --project-name korean-tea-craft

# 환경 변수 확인
npx wrangler pages secret list --project-name korean-tea-craft
```

## 9단계: 커스텀 도메인 연결 (선택사항)

```bash
# 커스텀 도메인 추가
npx wrangler pages domain add your-domain.com --project-name korean-tea-craft

# DNS 설정:
# CNAME 레코드 추가: your-domain.com -> korean-tea-craft.pages.dev
```

## 배포 URL 확인

배포가 완료되면 다음 URL에서 접근 가능합니다:

- **프로덕션**: https://korean-tea-craft.pages.dev
- **브랜치 배포**: https://main.korean-tea-craft.pages.dev

## 재배포 (업데이트)

```bash
# 1. 코드 변경 후 빌드
npm run build

# 2. 배포
npx wrangler pages deploy dist --project-name korean-tea-craft

# 자동으로 새 버전이 배포됩니다!
```

## 문제 해결

### 빌드 오류
```bash
rm -rf node_modules dist .wrangler
npm install
npm run build
```

### 데이터베이스 연결 오류
```bash
# wrangler.jsonc의 database_id가 올바른지 확인
npx wrangler d1 list

# 마이그레이션 재적용
npx wrangler d1 migrations apply korean-tea-craft-production
```

### 배포 실패
```bash
# Wrangler 로그 확인
npx wrangler pages deployment tail --project-name korean-tea-craft

# 캐시 정리 후 재배포
rm -rf .wrangler
npm run build
npx wrangler pages deploy dist --project-name korean-tea-craft
```

## 유용한 명령어

```bash
# 프로젝트 정보 확인
npx wrangler pages project list

# 배포 목록 확인
npx wrangler pages deployment list --project-name korean-tea-craft

# 배포 롤백
npx wrangler pages deployment rollback --project-name korean-tea-craft

# 로그 실시간 모니터링
npx wrangler pages deployment tail --project-name korean-tea-craft
```

## GitHub Actions 자동 배포 (선택사항)

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: korean-tea-craft
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

GitHub Secrets에 추가:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

---

## 참고 링크
- [Cloudflare Pages 공식 문서](https://developers.cloudflare.com/pages/)
- [Wrangler CLI 문서](https://developers.cloudflare.com/workers/wrangler/)
- [D1 데이터베이스 문서](https://developers.cloudflare.com/d1/)
