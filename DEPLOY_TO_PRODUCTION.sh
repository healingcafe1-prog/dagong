#!/bin/bash

echo "🚀 프로덕션 배포 시작..."
echo ""

# Cloudflare API 토큰 확인
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ CLOUDFLARE_API_TOKEN이 설정되지 않았습니다."
    echo "다음 명령어로 설정하세요:"
    echo "export CLOUDFLARE_API_TOKEN='your-token-here'"
    exit 1
fi

echo "📦 Step 1: 다도교육 콘텐츠 보강 중..."
npx wrangler d1 execute webapp-production --remote --file=PRODUCTION_UPDATE_STEP1.sql

if [ $? -eq 0 ]; then
    echo "✅ Step 1 완료!"
else
    echo "❌ Step 1 실패!"
    exit 1
fi

echo ""
echo "📦 Step 2: 카테고리 설명 수정 중..."
npx wrangler d1 execute webapp-production --remote --file=PRODUCTION_UPDATE_STEP2.sql

if [ $? -eq 0 ]; then
    echo "✅ Step 2 완료!"
else
    echo "❌ Step 2 실패!"
    exit 1
fi

echo ""
echo "🎉 프로덕션 배포 완료!"
echo ""
echo "🔍 확인 URL: https://dagong-bi1.pages.dev/education"
