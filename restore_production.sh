#!/bin/bash

# 다공(Dagong) 프로덕션 복구 스크립트
# 사용법: bash restore_production.sh

echo "==================================="
echo "다공 프로덕션 DB 복구 시작"
echo "==================================="
echo ""

# 현재 디렉토리 확인
if [ ! -f "SAFE_INSERT_ONLY.sql" ]; then
    echo "❌ 에러: SAFE_INSERT_ONLY.sql 파일을 찾을 수 없습니다."
    echo "   /home/user/webapp 디렉토리에서 실행하세요."
    exit 1
fi

echo "📂 복구 파일 확인: SAFE_INSERT_ONLY.sql ✅"
echo ""

# Wrangler 설치 확인
if ! command -v npx &> /dev/null; then
    echo "❌ 에러: npx가 설치되어 있지 않습니다."
    exit 1
fi

echo "🔧 Wrangler 확인 완료 ✅"
echo ""

# 복구 실행
echo "🚀 프로덕션 DB 복구 중..."
echo "   (약 30초 소요됩니다)"
echo ""

npx wrangler d1 execute webapp-production --remote --file=SAFE_INSERT_ONLY.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "==================================="
    echo "✅ 복구 완료!"
    echo "==================================="
    echo ""
    echo "📊 복구된 데이터:"
    echo "   - 지역: 17개"
    echo "   - 카테고리: 27개"
    echo "   - 생산자: 13개"
    echo "   - 제품: 78개 (차 20, 공예 23, 선물 2, 지역특산품 33)"
    echo "   - 체험: 14개"
    echo ""
    echo "🌐 프로덕션 확인: https://dagong-bi1.pages.dev"
    echo ""
    echo "🔍 검증 방법:"
    echo "   bash check_and_recover.sh"
else
    echo ""
    echo "==================================="
    echo "❌ 복구 실패"
    echo "==================================="
    echo ""
    echo "💡 해결 방법:"
    echo "   1. CLOUDFLARE_API_TOKEN 확인"
    echo "   2. Cloudflare D1 콘솔 사용 (수동 복구)"
    echo "      https://dash.cloudflare.com/"
    echo ""
    echo "📖 자세한 가이드:"
    echo "   FINAL_COMPLETE_GUIDE.md 참조"
fi
