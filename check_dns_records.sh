#!/bin/bash

CLOUDFLARE_API_TOKEN="LXGOucsvl4mhyD8_WGhe_icWYUkyWkDwN4wZKjN8"
ZONE_ID="9bde88dec4e7d52c28ef96d9a5e33e50"

echo "🔍 현재 dagong.co.kr의 DNS 레코드 확인 중..."
echo ""

curl -s -X GET "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data['success']:
    print('📋 현재 DNS 레코드:')
    print('')
    for record in data['result']:
        print(f\"  Type: {record['type']:8} Name: {record['name']:30} Target: {record.get('content', 'N/A')}\")
    print(f\"\n총 {len(data['result'])}개의 레코드\")
else:
    print('❌ 오류:', data['errors'])
"

