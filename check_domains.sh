#!/bin/bash

CLOUDFLARE_API_TOKEN="LXGOucsvl4mhyD8_WGhe_icWYUkyWkDwN4wZKjN8"
ACCOUNT_ID="ecc65d2ec1ecc2222db7937965158511"
PROJECT_NAME="dagong"

echo "🔍 Checking domains for project: $PROJECT_NAME"
echo ""

curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" | python3 -m json.tool | grep -A 20 "domains\|subdomain"

