#!/bin/bash

# =============================================
# 자동 데이터 복구 및 관리 스크립트
# =============================================

set -e  # 에러 발생 시 즉시 종료

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/user/webapp/backups"
LOG_FILE="/home/user/webapp/recovery_${TIMESTAMP}.log"

# 로그 함수
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# 백업 디렉토리 생성
mkdir -p "$BACKUP_DIR"

log "========================================="
log "데이터 복구 시작"
log "========================================="

# 1. 현재 상태 확인
log "1. 현재 데이터 상태 확인 중..."

EXPERIENCE_COUNT=$(curl -s "https://dagong-bi1.pages.dev/api/experiences?limit=10" | jq -r '.experiences | length')
EDUCATION_COUNT=$(curl -s "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50" | jq -r '.curriculum | length')
PRODUCTS_COUNT=$(curl -s "https://dagong-bi1.pages.dev/api/products?limit=100" | jq -r '.products | length')
LOCAL_COUNT=$(curl -s "https://dagong-bi1.pages.dev/api/products?type=local&limit=100" | jq -r '.products | length')

log "   - 체험 프로그램: ${EXPERIENCE_COUNT}개"
log "   - 교육과정: ${EDUCATION_COUNT}개"
log "   - 전체 상품: ${PRODUCTS_COUNT}개"
log "   - 지역특산품: ${LOCAL_COUNT}개"

# 2. 목표 개수 정의
TARGET_EXPERIENCE=5
TARGET_EDUCATION=30
TARGET_PRODUCTS=39
TARGET_LOCAL=13

# 3. 부족한 데이터 확인
log ""
log "2. 부족한 데이터 확인..."

MISSING_EXPERIENCE=$((TARGET_EXPERIENCE - EXPERIENCE_COUNT))
MISSING_EDUCATION=$((TARGET_EDUCATION - EDUCATION_COUNT))
MISSING_PRODUCTS=$((TARGET_PRODUCTS - PRODUCTS_COUNT))
MISSING_LOCAL=$((TARGET_LOCAL - LOCAL_COUNT))

if [ $MISSING_EXPERIENCE -le 0 ] && [ $MISSING_EDUCATION -le 0 ] && [ $MISSING_PRODUCTS -le 0 ]; then
    log "   ✅ 모든 데이터가 정상입니다!"
    exit 0
fi

log "   ⚠️  부족한 데이터:"
[ $MISSING_EXPERIENCE -gt 0 ] && log "      - 체험 프로그램: ${MISSING_EXPERIENCE}개 부족"
[ $MISSING_EDUCATION -gt 0 ] && log "      - 교육과정: ${MISSING_EDUCATION}개 부족"
[ $MISSING_PRODUCTS -gt 0 ] && log "      - 상품: ${MISSING_PRODUCTS}개 부족"
[ $MISSING_LOCAL -gt 0 ] && log "      - 지역특산품: ${MISSING_LOCAL}개 부족"

# 4. 백업 생성
log ""
log "3. 현재 데이터 백업 중..."

curl -s "https://dagong-bi1.pages.dev/api/experiences?limit=10" > "${BACKUP_DIR}/experiences_${TIMESTAMP}.json"
curl -s "https://dagong-bi1.pages.dev/api/education/curriculum?limit=50" > "${BACKUP_DIR}/education_${TIMESTAMP}.json"
curl -s "https://dagong-bi1.pages.dev/api/products?limit=100" > "${BACKUP_DIR}/products_${TIMESTAMP}.json"

log "   ✅ 백업 완료: ${BACKUP_DIR}"

# 5. 복구 안내
log ""
log "========================================="
log "복구 방법"
log "========================================="
log "1. Cloudflare 대시보드 접속:"
log "   https://dash.cloudflare.com/"
log ""
log "2. D1 콘솔로 이동:"
log "   Workers & Pages → D1 → webapp-production → Console"
log ""
log "3. 복구 SQL 실행:"
log "   파일 위치: /home/user/webapp/FULL_RECOVERY.sql"
log "   또는: https://github.com/healingcafe1-prog/dagong/blob/main/FULL_RECOVERY.sql"
log ""
log "4. 실행 후 확인:"
log "   bash /home/user/webapp/check_data.sh"
log ""
log "========================================="
log "복구 스크립트 완료"
log "로그 파일: ${LOG_FILE}"
log "========================================="
