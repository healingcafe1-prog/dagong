#!/bin/bash

# V6 마스터 백업 생성 스크립트
# 생성일: 2026-02-21

BACKUP_FILE="MASTER_BACKUP_EDUCATION_V6.sql"

echo "-- ========================================" > $BACKUP_FILE
echo "-- 교육 커리큘럼 마스터 백업 V6" >> $BACKUP_FILE
echo "-- 생성일: 2026-02-21" >> $BACKUP_FILE
echo "-- 총 항목: 46개" >> $BACKUP_FILE
echo "-- - 다도교육 (category_id=1): 14개" >> $BACKUP_FILE
echo "-- - 차공부 (category_id=2): 12개" >> $BACKUP_FILE
echo "-- - 공예공부 (category_id=3): 8개" >> $BACKUP_FILE
echo "-- - 명상교육 (category_id=4): 12개" >> $BACKUP_FILE
echo "--" >> $BACKUP_FILE
echo "-- V6 업데이트 내용:" >> $BACKUP_FILE
echo "-- - ID 23: 한국 차 공예품 전문 카페 창업 완벽 가이드" >> $BACKUP_FILE
echo "-- - 투자비용 현실화 (소상공인 창업대출 5천만원 한도 내)" >> $BACKUP_FILE
echo "--   • 5평: 2,000~3,000만원 (1인당 400~600만원)" >> $BACKUP_FILE
echo "--   • 9평: 3,000만원 이하 (1인당 600만원)" >> $BACKUP_FILE
echo "--   • 15평: 5,000만원 이하 (1인당 1,000만원)" >> $BACKUP_FILE
echo "--   • 18평: 5,000만원 (1인당 1,000만원)" >> $BACKUP_FILE
echo "--   • 30평: 7,000만원 (7~10인 협동조합)" >> $BACKUP_FILE
echo "--   • 50평/100평 삭제" >> $BACKUP_FILE
echo "-- - 손익분기점 삭제" >> $BACKUP_FILE
echo "-- - 셀프 인테리어 컨설팅 무료 제공 (공익적 목표)" >> $BACKUP_FILE
echo "-- - 협동조합 5인 회원제 창업 모델 (인건비 Zero)" >> $BACKUP_FILE
echo "-- - 한살림 모델 + 지역 특산품 회원제 판매" >> $BACKUP_FILE
echo "-- - 샵인샵 4종 모델 (학교, 기업, 관공서, 병원)" >> $BACKUP_FILE
echo "-- ========================================" >> $BACKUP_FILE
echo "" >> $BACKUP_FILE
echo "DELETE FROM education_curriculum;" >> $BACKUP_FILE
echo "" >> $BACKUP_FILE

# Export data using wrangler
npx wrangler d1 export webapp-production --local --output temp_export.sql 2>&1 | grep -v "wrangler\|──\|🌀\|Resource\|Use --remote"

# Extract only education_curriculum INSERT statements
grep "INSERT INTO education_curriculum" temp_export.sql >> $BACKUP_FILE

# Cleanup
rm -f temp_export.sql

echo "" >> $BACKUP_FILE
echo "-- 복원 완료 확인" >> $BACKUP_FILE
echo "SELECT '✅ V6 교육 커리큘럼 복원 완료. 총 ' || COUNT(*) || '개 항목' as message FROM education_curriculum;" >> $BACKUP_FILE

echo "✅ MASTER_BACKUP_EDUCATION_V6.sql 생성 완료"
