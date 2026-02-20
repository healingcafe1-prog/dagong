#!/bin/bash

# =============================================
# 데이터 상태 확인 스크립트
# =============================================

echo "========================================="
echo "다공(Dagong) 데이터 상태 확인"
echo "========================================="
echo ""

# API 체크
echo "📊 프로덕션 데이터 현황:"
echo ""

# 체험 프로그램
EXPERIENCE_COUNT=$(curl -s "https://dagong-bi1.pages.dev/api/experiences?limit=10" | jq -r '.experiences | length')
echo "✅ 체험 프로그램: ${EXPERIENCE_COUNT}개 (목표: 5개)"

# 교육과정
EDUCATION_COUNT=$(curl -s "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50" | jq -r '.curriculum | length')
echo "✅ 교육과정: ${EDUCATION_COUNT}개 (목표: 30개)"

# 전체 상품
PRODUCTS_COUNT=$(curl -s "https://dagong-bi1.pages.dev/api/products?limit=100" | jq -r '.products | length')
echo "✅ 전체 상품: ${PRODUCTS_COUNT}개 (목표: 39개)"

# 타입별 상품
TEA_COUNT=$(curl -s "https://dagong-bi1.pages.dev/api/products?type=tea&limit=100" | jq -r '.products | length')
CRAFT_COUNT=$(curl -s "https://dagong-bi1.pages.dev/api/products?type=craft&limit=100" | jq -r '.products | length')
GIFT_COUNT=$(curl -s "https://dagong-bi1.pages.dev/api/products?type=gift_set&limit=100" | jq -r '.products | length')
LOCAL_COUNT=$(curl -s "https://dagong-bi1.pages.dev/api/products?type=local&limit=100" | jq -r '.products | length')

echo ""
echo "📦 상품 타입별 현황:"
echo "   - 차(tea): ${TEA_COUNT}개 (목표: 12개)"
echo "   - 공예품(craft): ${CRAFT_COUNT}개 (목표: 9개)"
echo "   - 선물세트(gift_set): ${GIFT_COUNT}개 (목표: 5개)"
echo "   - 지역특산품(local): ${LOCAL_COUNT}개 (목표: 13개)"

echo ""
echo "========================================="

# 결과 판정
TARGET_EXPERIENCE=5
TARGET_EDUCATION=30
TARGET_TEA=12
TARGET_CRAFT=9
TARGET_GIFT=5
TARGET_LOCAL=13

ALL_OK=true

if [ "$EXPERIENCE_COUNT" -lt "$TARGET_EXPERIENCE" ]; then
    echo "⚠️  체험 프로그램이 $((TARGET_EXPERIENCE - EXPERIENCE_COUNT))개 부족합니다."
    ALL_OK=false
fi

if [ "$EDUCATION_COUNT" -lt "$TARGET_EDUCATION" ]; then
    echo "⚠️  교육과정이 $((TARGET_EDUCATION - EDUCATION_COUNT))개 부족합니다."
    ALL_OK=false
fi

if [ "$TEA_COUNT" -lt "$TARGET_TEA" ]; then
    echo "⚠️  차 상품이 $((TARGET_TEA - TEA_COUNT))개 부족합니다."
    ALL_OK=false
fi

if [ "$CRAFT_COUNT" -lt "$TARGET_CRAFT" ]; then
    echo "⚠️  공예품이 $((TARGET_CRAFT - CRAFT_COUNT))개 부족합니다."
    ALL_OK=false
fi

if [ "$GIFT_COUNT" -lt "$TARGET_GIFT" ]; then
    echo "⚠️  선물세트가 $((TARGET_GIFT - GIFT_COUNT))개 부족합니다."
    ALL_OK=false
fi

if [ "$LOCAL_COUNT" -lt "$TARGET_LOCAL" ]; then
    echo "⚠️  지역특산품이 $((TARGET_LOCAL - LOCAL_COUNT))개 부족합니다."
    ALL_OK=false
fi

echo ""

if [ "$ALL_OK" = true ]; then
    echo "✅ 모든 데이터가 정상입니다!"
    exit 0
else
    echo "⚠️  복구가 필요합니다."
    echo ""
    echo "복구 방법:"
    echo "1. bash /home/user/webapp/auto_recovery.sh"
    echo "2. 또는 FULL_RECOVERY.sql 실행"
    exit 1
fi
