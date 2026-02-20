#!/bin/bash

# 프로덕션 D1 데이터베이스 업데이트 스크립트
# 이 스크립트는 MASTER_SEED.sql을 프로덕션 D1에 적용합니다.

echo "🚀 프로덕션 D1 데이터베이스 업데이트 시작..."
echo ""

# 현재 디렉토리 확인
if [ ! -f "MASTER_SEED.sql" ]; then
    echo "❌ 오류: MASTER_SEED.sql 파일을 찾을 수 없습니다."
    echo "   /home/user/webapp 디렉토리에서 실행해주세요."
    exit 1
fi

# Cloudflare API 토큰 확인
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "⚠️  경고: CLOUDFLARE_API_TOKEN이 설정되지 않았습니다."
    echo ""
    echo "해결 방법:"
    echo "1. Deploy 탭에서 Cloudflare API 토큰을 설정하거나"
    echo "2. 다음 명령으로 임시 설정:"
    echo "   export CLOUDFLARE_API_TOKEN='your-token-here'"
    echo ""
    read -p "계속하시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📊 프로덕션 DB에 데이터 삽입 중..."
echo ""

# Wrangler로 SQL 실행
npx wrangler d1 execute webapp-production --file=MASTER_SEED.sql --remote

# 실행 결과 확인
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 데이터 삽입 완료!"
    echo ""
    echo "확인 중..."
    sleep 2
    
    # 프로덕션 API로 데이터 확인
    echo ""
    echo "📊 프로덕션 데이터 확인:"
    echo ""
    
    PRODUCTS=$(curl -s "https://dagong-bi1.pages.dev/api/products?limit=100" | jq '.products | length' 2>/dev/null)
    echo "  제품: $PRODUCTS개 (목표: 78개)"
    
    EVENTS=$(curl -s "https://dagong-bi1.pages.dev/api/events?limit=50" | jq '.events | length' 2>/dev/null)
    echo "  이벤트: $EVENTS개 (목표: 27개)"
    
    EXPERIENCES=$(curl -s "https://dagong-bi1.pages.dev/api/experiences?limit=100" | jq '.experiences | length' 2>/dev/null)
    echo "  체험: $EXPERIENCES개 (목표: 5개)"
    
    CURRICULUM=$(curl -s "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50" | jq '.curriculum | length' 2>/dev/null)
    echo "  교육: $CURRICULUM개 (목표: 30개)"
    
    echo ""
    if [ "$PRODUCTS" = "78" ] && [ "$EVENTS" = "27" ] && [ "$EXPERIENCES" = "5" ] && [ "$CURRICULUM" = "30" ]; then
        echo "🎉 성공! 모든 데이터가 정상적으로 삽입되었습니다!"
    else
        echo "⚠️  일부 데이터가 누락되었을 수 있습니다."
        echo "   프로덕션 사이트를 확인해주세요: https://dagong-bi1.pages.dev"
    fi
else
    echo ""
    echo "❌ 오류 발생!"
    echo ""
    echo "해결 방법:"
    echo "1. CLOUDFLARE_API_TOKEN이 올바르게 설정되었는지 확인"
    echo "2. Deploy 탭에서 API 토큰 재설정"
    echo "3. 오류 메시지 확인 후 재시도"
    exit 1
fi

echo ""
echo "🔗 유용한 링크:"
echo "  - 프로덕션 사이트: https://dagong-bi1.pages.dev"
echo "  - 제품 API: https://dagong-bi1.pages.dev/api/products?limit=100"
echo "  - 이벤트 API: https://dagong-bi1.pages.dev/api/events?limit=50"
echo ""
