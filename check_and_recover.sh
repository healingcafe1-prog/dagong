#!/bin/bash
# =============================================
# 프로덕션 완전 복구 스크립트
# 2026-02-20
# =============================================

echo "🔍 현재 상태 확인 중..."

# 현재 데이터 수 확인
PRODUCTS=$(curl -s "https://dagong-bi1.pages.dev/api/products?limit=100" | jq '.products | length')
EXPERIENCES=$(curl -s "https://dagong-bi1.pages.dev/api/experiences?limit=20" | jq '.experiences | length')
EDUCATION=$(curl -s "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50" | jq '.curriculum | length')

echo "📊 현재 상태:"
echo "  - 제품: $PRODUCTS / 78"
echo "  - 체험: $EXPERIENCES / 14"
echo "  - 교육: $EDUCATION / 30"

echo ""
echo "🎯 목표:"
echo "  - 제품: 78개 (차 20 + 공예 23 + 선물 2 + 특산 33)"
echo "  - 체험: 14개"
echo "  - 교육: 30개 ✅"

echo ""
echo "⚡ 복구 방법:"
echo ""
echo "1️⃣ CLI 복구 (권장, 5분):"
echo "   cd /home/user/webapp"
echo "   npx wrangler d1 execute webapp-production --remote --file=MASTER_SEED_FINAL.sql"
echo ""
echo "2️⃣ 단계별 복구 (안전, 10분):"
echo "   - 1단계: 생산자 추가"
echo "   - 2단계: 체험 추가"
echo "   - 3단계: 제품 추가"
echo ""
echo "📋 가이드: /home/user/webapp/PRODUCTION_FULL_RECOVERY.md"
echo ""
