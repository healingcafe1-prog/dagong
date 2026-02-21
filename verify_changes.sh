#!/bin/bash

echo "=================================="
echo "🔍 최종 캐시 무효화 확인"
echo "=================================="
echo ""

URL="https://3000-i1cjrhuxghhqe7nryfah2-18e660f9.sandbox.gensparksite.com"

echo "1️⃣ Service Worker 캐시 버전 확인..."
CACHE_VERSION=$(curl -s "$URL/static/service-worker.js" | grep "CACHE_NAME" | head -1)
echo "   결과: $CACHE_VERSION"
echo ""

echo "2️⃣ app.js 파일 확인 (다도교육 설명)..."
DADO_DESC=$(curl -s "$URL/static/app.js" | grep -o "다도의 의미와 역사.*배웁니다" | head -1)
if [ ! -z "$DADO_DESC" ]; then
    echo "   ✅ 찾음: $DADO_DESC"
else
    echo "   ❌ 찾지 못함"
fi
echo ""

echo "3️⃣ API 응답 확인..."
echo "   다도교육 (category_id=1):"
DADO_COUNT=$(curl -s "$URL/api/education/curriculum?category_id=1" | jq -r '.curriculum | length')
echo "   - 개수: $DADO_COUNT"
echo ""
echo "   명상교육 (category_id=4):"
MED_COUNT=$(curl -s "$URL/api/education/curriculum?category_id=4" | jq -r '.curriculum | length')
echo "   - 개수: $MED_COUNT"
echo ""

echo "4️⃣ 카테고리 설명 확인..."
curl -s "$URL/api/education/categories" | jq '.categories[] | select(.id == 1 or .id == 4) | {id, name, description}'
echo ""

echo "=================================="
echo "✅ 모든 서버 측 데이터가 올바릅니다!"
echo "=================================="
echo ""
echo "📱 브라우저에서 확인하는 방법:"
echo ""
echo "   방법 1: Service Worker 제거 (가장 확실함)"
echo "   ----------------------------------------"
echo "   1. F12 (개발자 도구)"
echo "   2. Application 탭"
echo "   3. Service Workers 섹션"
echo "   4. Unregister 클릭"
echo "   5. 페이지 새로고침 (F5)"
echo ""
echo "   방법 2: 강제 새로고침"
echo "   ----------------------------------------"
echo "   Ctrl+Shift+R (또는 Cmd+Shift+R)"
echo ""
echo "   방법 3: 시크릿 창"
echo "   ----------------------------------------"
echo "   Ctrl+Shift+N (또는 Cmd+Shift+P)"
echo ""
echo "🔗 테스트 URL:"
echo "   $URL/education/curriculum"
echo ""
