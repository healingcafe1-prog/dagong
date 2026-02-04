#!/bin/bash

# dagong.co.kr Cloudflare Pages 배포 스크립트
# Usage: ./deploy.sh

set -e  # 에러 발생 시 중단

echo "🚀 dagong.co.kr Cloudflare Pages 배포 시작..."
echo ""

# 1. Cloudflare API 토큰 확인
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "⚠️  CLOUDFLARE_API_TOKEN 환경변수가 설정되지 않았습니다."
  echo ""
  echo "다음 명령어로 설정하세요:"
  echo "export CLOUDFLARE_API_TOKEN='your-token-here'"
  echo ""
  echo "또는 Deploy 탭에서 API 키를 설정하세요."
  exit 1
fi

# 2. 프로젝트 정보
PROJECT_NAME="dagong"
DOMAIN="dagong.co.kr"

echo "📦 프로젝트: $PROJECT_NAME"
echo "🌐 도메인: $DOMAIN"
echo ""

# 3. 빌드
echo "🔨 프로덕션 빌드 중..."
npm run build
echo "✅ 빌드 완료!"
echo ""

# 4. Cloudflare 로그인 확인
echo "🔑 Cloudflare 인증 확인 중..."
if ! npx wrangler whoami 2>/dev/null; then
  echo "⚠️  Cloudflare 로그인이 필요합니다."
  echo "다음 명령어를 실행하세요:"
  echo "npx wrangler login"
  exit 1
fi
echo "✅ 인증 완료!"
echo ""

# 5. D1 데이터베이스 확인
echo "🗄️  D1 데이터베이스 확인 중..."
DB_EXISTS=$(npx wrangler d1 list | grep "dagong-production" || echo "")

if [ -z "$DB_EXISTS" ]; then
  echo "⚠️  D1 데이터베이스 'dagong-production'가 존재하지 않습니다."
  echo ""
  echo "다음 명령어로 생성하세요:"
  echo "npx wrangler d1 create dagong-production"
  echo ""
  echo "생성 후 wrangler.jsonc의 database_id를 업데이트하세요."
  exit 1
fi
echo "✅ D1 데이터베이스 확인 완료!"
echo ""

# 6. 마이그레이션 적용 (선택)
read -p "📊 D1 마이그레이션을 적용하시겠습니까? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🔄 마이그레이션 적용 중..."
  npx wrangler d1 migrations apply dagong-production --remote
  echo "✅ 마이그레이션 적용 완료!"
  echo ""
fi

# 7. Pages 프로젝트 확인
echo "📄 Cloudflare Pages 프로젝트 확인 중..."
PROJECT_EXISTS=$(npx wrangler pages project list | grep "$PROJECT_NAME" || echo "")

if [ -z "$PROJECT_EXISTS" ]; then
  echo "⚠️  Pages 프로젝트 '$PROJECT_NAME'가 존재하지 않습니다."
  echo ""
  read -p "📦 프로젝트를 생성하시겠습니까? (y/N): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🆕 프로젝트 생성 중..."
    npx wrangler pages project create "$PROJECT_NAME" --production-branch main
    echo "✅ 프로젝트 생성 완료!"
    echo ""
  else
    echo "❌ 프로젝트 생성이 취소되었습니다."
    exit 1
  fi
fi
echo "✅ Pages 프로젝트 확인 완료!"
echo ""

# 8. 배포
echo "🚀 Cloudflare Pages에 배포 중..."
npx wrangler pages deploy dist --project-name "$PROJECT_NAME"
echo ""
echo "✅ 배포 완료!"
echo ""

# 9. 커스텀 도메인 설정 안내
echo "🌐 커스텀 도메인 설정:"
echo ""
echo "다음 명령어로 도메인을 연결하세요:"
echo "npx wrangler pages domain add $DOMAIN --project-name $PROJECT_NAME"
echo "npx wrangler pages domain add www.$DOMAIN --project-name $PROJECT_NAME"
echo ""

# 10. 배포 URL 안내
echo "🎉 배포가 완료되었습니다!"
echo ""
echo "📍 접속 URL:"
echo "  - 임시: https://$PROJECT_NAME.pages.dev"
echo "  - 프로덕션: https://$DOMAIN (도메인 연결 후)"
echo ""
echo "📊 D1 데이터베이스: dagong-production"
echo "🔧 프로젝트 관리: https://dash.cloudflare.com"
echo ""
