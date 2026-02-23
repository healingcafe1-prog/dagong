#!/bin/bash

CLOUDFLARE_API_TOKEN="LXGOucsvl4mhyD8_WGhe_icWYUkyWkDwN4wZKjN8"
ACCOUNT_ID="ecc65d2ec1ecc2222db7937965158511"
PROJECT_NAME="dagong"
CUSTOM_DOMAIN="dagong.co.kr"

echo "🔍 Adding custom domain: $CUSTOM_DOMAIN to project: $PROJECT_NAME"

curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/domains" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "{\"name\":\"${CUSTOM_DOMAIN}\"}" | python3 -m json.tool

echo ""
echo "✅ Domain add request sent"
