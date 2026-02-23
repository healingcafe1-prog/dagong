#!/bin/bash

CLOUDFLARE_API_TOKEN="LXGOucsvl4mhyD8_WGhe_icWYUkyWkDwN4wZKjN8"
ACCOUNT_ID="ecc65d2ec1ecc2222db7937965158511"
PROJECT_NAME="dagong"
DOMAIN_ID="10cd6eed-ce63-43b5-bcb1-fa17d8a3feea"

echo "🔄 Cloudflare Pages 도메인 재활성화 중..."
echo ""

# 도메인 삭제
echo "1️⃣ 기존 도메인 제거..."
curl -s -X DELETE "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/domains/${DOMAIN_ID}" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" | python3 -c "
import sys, json
data = json.load(sys.stdin)
print('  ✅ 제거 완료' if data.get('success') else '  ℹ️  이미 제거됨')
"

echo ""
echo "⏳ 3초 대기..."
sleep 3

# 도메인 재추가
echo ""
echo "2️⃣ 도메인 재추가..."
curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/domains" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"name":"dagong.co.kr"}' | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data.get('success'):
    result = data['result']
    print(f\"  ✅ dagong.co.kr 추가 성공!\")
    print(f\"     - Status: {result.get('status', 'unknown')}\")
    print(f\"     - Validation: {result.get('validation_data', {}).get('status', 'unknown')}\")
else:
    errors = data.get('errors', [])
    if any('already' in str(e).lower() for e in errors):
        print('  ℹ️  도메인이 이미 존재합니다')
    else:
        print('  ❌ 오류:', errors)
"

echo ""
echo "✅ 작업 완료!"

