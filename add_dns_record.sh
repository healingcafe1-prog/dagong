#!/bin/bash

CLOUDFLARE_API_TOKEN="LXGOucsvl4mhyD8_WGhe_icWYUkyWkDwN4wZKjN8"
ZONE_ID="9bde88dec4e7d52c28ef96d9a5e33e50"
DOMAIN="dagong.co.kr"
TARGET="dagong-bi1.pages.dev"

echo "🔍 Adding DNS CNAME record: $DOMAIN -> $TARGET"
echo ""

# Add CNAME record for root domain
curl -X POST "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "{
    \"type\": \"CNAME\",
    \"name\": \"@\",
    \"content\": \"${TARGET}\",
    \"ttl\": 1,
    \"proxied\": true
  }" | python3 -m json.tool

echo ""
echo "✅ DNS record add request sent"
