#!/bin/bash

echo "🚀 프로덕션 긴급 수정 시작..."
echo ""

# Cloudflare API 토큰 확인
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "⚠️  CLOUDFLARE_API_TOKEN이 설정되지 않았습니다."
    echo ""
    echo "1. Cloudflare Dashboard 접속: https://dash.cloudflare.com/profile/api-tokens"
    echo "2. API 토큰 생성 (D1 Edit 권한 필요)"
    echo "3. 다음 명령어로 설정:"
    echo ""
    echo "   export CLOUDFLARE_API_TOKEN='your-token-here'"
    echo ""
    exit 1
fi

echo "✅ API 토큰 확인됨"
echo ""

# 먼저 현재 상태 확인
echo "📊 현재 프로덕션 상태 확인 중..."
echo ""

npx wrangler d1 execute webapp-production --remote --command="SELECT id, title, LENGTH(content) as len FROM education_curriculum WHERE category_id = 1 AND id IN (17, 19, 23, 25, 27, 29) ORDER BY id;"

echo ""
echo "🔄 업데이트 시작..."
echo ""

# 6개 파일 순차 실행
for file in CONSOLE_STEP1_UPDATE_17.sql CONSOLE_STEP1_UPDATE_19.sql CONSOLE_STEP1_UPDATE_23.sql CONSOLE_STEP1_UPDATE_25.sql CONSOLE_STEP1_UPDATE_27.sql CONSOLE_STEP1_UPDATE_29.sql; do
    echo "📝 실행 중: $file"
    npx wrangler d1 execute webapp-production --remote --file="$file"
    
    if [ $? -eq 0 ]; then
        echo "   ✅ 성공"
    else
        echo "   ❌ 실패: $file"
        exit 1
    fi
    echo ""
done

echo "📝 실행 중: PRODUCTION_UPDATE_STEP2.sql (카테고리 설명)"
npx wrangler d1 execute webapp-production --remote --file="PRODUCTION_UPDATE_STEP2.sql"

if [ $? -eq 0 ]; then
    echo "   ✅ 성공"
else
    echo "   ❌ 실패"
    exit 1
fi

echo ""
echo "🔍 업데이트 후 상태 확인..."
echo ""

npx wrangler d1 execute webapp-production --remote --command="SELECT id, title, LENGTH(content) as len FROM education_curriculum WHERE category_id = 1 AND id IN (17, 19, 23, 25, 27, 29) ORDER BY id;"

echo ""
echo "🎉 프로덕션 업데이트 완료!"
echo ""
echo "🔗 확인: https://dagong-bi1.pages.dev/education"
