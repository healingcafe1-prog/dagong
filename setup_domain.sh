#!/bin/bash

CLOUDFLARE_DNS_TOKEN="XnnK2YVBefP53td5y_oSPgT1Q_g2IAWUOslBNKEN"
ZONE_ID="9bde88dec4e7d52c28ef96d9a5e33e50"
TARGET="dagong-bi1.pages.dev"

echo "🚀 dagong.co.kr 도메인 DNS 설정 시작..."
echo ""

# 1. 기존 DNS 레코드 확인
echo "📋 1단계: 기존 DNS 레코드 확인..."
EXISTING=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?name=dagong.co.kr" \
  -H "Authorization: Bearer ${CLOUDFLARE_DNS_TOKEN}" \
  -H "Content-Type: application/json")

echo "$EXISTING" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data['success'] and data['result']:
    print('  현재 레코드:')
    for record in data['result']:
        print(f\"    - Type: {record['type']}, Name: {record['name']}, Content: {record.get('content', 'N/A')}\")
else:
    print('  레코드 없음')
"

echo ""

# 2. A 레코드가 있다면 삭제 (CNAME과 충돌 방지)
echo "🗑️  2단계: 충돌하는 A 레코드 삭제..."
RECORD_ID=$(echo "$EXISTING" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data['success'] and data['result']:
    for record in data['result']:
        if record['type'] == 'A' and record['name'] == 'dagong.co.kr':
            print(record['id'])
            break
" 2>/dev/null)

if [ ! -z "$RECORD_ID" ]; then
    curl -s -X DELETE "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${RECORD_ID}" \
      -H "Authorization: Bearer ${CLOUDFLARE_DNS_TOKEN}" \
      -H "Content-Type: application/json" > /dev/null
    echo "  ✅ A 레코드 삭제 완료"
else
    echo "  ℹ️  충돌하는 레코드 없음"
fi

echo ""

# 3. CNAME 레코드 추가 (루트 도메인)
echo "➕ 3단계: CNAME 레코드 추가 (dagong.co.kr → ${TARGET})..."
RESULT1=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${CLOUDFLARE_DNS_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "{
    \"type\": \"CNAME\",
    \"name\": \"@\",
    \"content\": \"${TARGET}\",
    \"ttl\": 1,
    \"proxied\": true
  }")

echo "$RESULT1" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data['success']:
    print('  ✅ dagong.co.kr CNAME 레코드 추가 성공')
else:
    if any('already exists' in str(e) for e in data.get('errors', [])):
        print('  ℹ️  dagong.co.kr CNAME 레코드 이미 존재')
    else:
        print('  ❌ 오류:', data.get('errors', []))
"

echo ""

# 4. www CNAME 레코드 추가
echo "➕ 4단계: CNAME 레코드 추가 (www.dagong.co.kr → ${TARGET})..."
RESULT2=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${CLOUDFLARE_DNS_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "{
    \"type\": \"CNAME\",
    \"name\": \"www\",
    \"content\": \"${TARGET}\",
    \"ttl\": 1,
    \"proxied\": true
  }")

echo "$RESULT2" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data['success']:
    print('  ✅ www.dagong.co.kr CNAME 레코드 추가 성공')
else:
    if any('already exists' in str(e) for e in data.get('errors', [])):
        print('  ℹ️  www.dagong.co.kr CNAME 레코드 이미 존재')
    else:
        print('  ❌ 오류:', data.get('errors', []))
"

echo ""
echo "✅ DNS 설정 완료!"
echo ""
echo "📋 최종 DNS 레코드:"
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?name=dagong.co.kr" \
  -H "Authorization: Bearer ${CLOUDFLARE_DNS_TOKEN}" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data['success']:
    for record in data['result']:
        proxy = '🟠 Proxied' if record.get('proxied') else '⚪ DNS only'
        print(f\"  {record['type']:8} {record['name']:25} → {record.get('content', 'N/A'):30} {proxy}\")
"

curl -s -X GET "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?name=www.dagong.co.kr" \
  -H "Authorization: Bearer ${CLOUDFLARE_DNS_TOKEN}" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data['success']:
    for record in data['result']:
        proxy = '🟠 Proxied' if record.get('proxied') else '⚪ DNS only'
        print(f\"  {record['type']:8} {record['name']:25} → {record.get('content', 'N/A'):30} {proxy}\")
"

echo ""
echo "⏳ DNS 전파 대기 중... (1~5분 소요)"

