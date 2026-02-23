#!/bin/bash

CLOUDFLARE_API_TOKEN="LXGOucsvl4mhyD8_WGhe_icWYUkyWkDwN4wZKjN8"
ACCOUNT_ID="ecc65d2ec1ecc2222db7937965158511"
PROJECT_NAME="dagong"
DOMAIN_ID="10cd6eed-ce63-43b5-bcb1-fa17d8a3feea"

echo "🔍 Retrying domain activation for dagong.co.kr"
echo ""

# Retry domain validation
curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/domains/${DOMAIN_ID}" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{}' | python3 -m json.tool

