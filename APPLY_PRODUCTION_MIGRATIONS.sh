#!/bin/bash

# dagong.co.kr 프로덕션 데이터베이스 마이그레이션 스크립트

echo "🗄️ Cloudflare D1 프로덕션 데이터베이스 마이그레이션"
echo "================================================"
echo ""

# Cloudflare API 키 확인
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "⚠️  CLOUDFLARE_API_TOKEN 환경 변수가 설정되지 않았습니다."
  echo ""
  echo "설정 방법:"
  echo "1. Deploy 탭에서 Cloudflare API 토큰 입력"
  echo "2. 또는 수동으로 설정:"
  echo "   export CLOUDFLARE_API_TOKEN='your-token-here'"
  echo ""
  exit 1
fi

echo "✅ Cloudflare API 토큰 확인됨"
echo ""

# 마이그레이션 파일 확인
echo "📋 적용 대기 중인 마이그레이션:"
ls -1 migrations/*.sql | tail -5
echo ""

# 프로덕션 마이그레이션 적용
echo "🚀 프로덕션 데이터베이스에 마이그레이션 적용 중..."
echo ""

npx wrangler d1 migrations apply webapp-production

echo ""
echo "✅ 마이그레이션 완료!"
echo ""

# 결과 확인
echo "📊 데이터베이스 통계 확인:"
npx wrangler d1 execute webapp-production --command="SELECT 'regions' as table_name, COUNT(*) as count FROM regions UNION ALL SELECT 'education_categories', COUNT(*) FROM education_categories UNION ALL SELECT 'education_curriculum', COUNT(*) FROM education_curriculum UNION ALL SELECT 'experiences', COUNT(*) FROM experiences"

echo ""
echo "================================================"
echo "✅ 프로덕션 배포 완료!"
echo ""
echo "🔗 확인: https://dagong.co.kr"
echo ""
