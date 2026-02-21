#!/bin/bash

# ============================================
# 다공(茶工) 교육 데이터 복원 스크립트
# 용도: 로컬/프로덕션 DB를 마스터 백업으로 복원
# ============================================

set -e

echo "🔄 다공(茶工) 교육 데이터 복원 시작..."
echo ""

# 복원 대상 선택
echo "복원 대상을 선택하세요:"
echo "1) 로컬 DB (--local)"
echo "2) 프로덕션 DB (--remote)"
read -p "선택 (1 또는 2): " choice

if [ "$choice" = "1" ]; then
    TARGET="--local"
    TARGET_NAME="로컬"
elif [ "$choice" = "2" ]; then
    TARGET="--remote"
    TARGET_NAME="프로덕션"
    
    # 프로덕션 복원 확인
    echo ""
    echo "⚠️  경고: 프로덕션 DB를 복원하려고 합니다!"
    read -p "정말 진행하시겠습니까? (yes/no): " confirm
    if [ "$confirm" != "yes" ]; then
        echo "❌ 복원이 취소되었습니다."
        exit 1
    fi
else
    echo "❌ 잘못된 선택입니다."
    exit 1
fi

echo ""
echo "📋 $TARGET_NAME DB 복원 중..."
echo ""

# 마스터 백업 적용
npx wrangler d1 execute webapp-production $TARGET --file=MASTER_BACKUP_EDUCATION.sql

echo ""
echo "✅ 복원 완료!"
echo ""
echo "📊 복원된 데이터 확인:"
echo ""

# 데이터 확인
npx wrangler d1 execute webapp-production $TARGET --command="
SELECT 
    category_id,
    COUNT(*) as count,
    CASE category_id
        WHEN 1 THEN '다도교육'
        WHEN 2 THEN '차공부'
        WHEN 3 THEN '공예공부'
        WHEN 4 THEN '명상교육'
        ELSE '기타'
    END as category_name
FROM education_curriculum
WHERE category_id IN (1, 4)
GROUP BY category_id
ORDER BY category_id;
"

echo ""
echo "🎉 복원 작업이 성공적으로 완료되었습니다!"
echo ""
echo "📝 다음 단계:"
if [ "$TARGET" = "--local" ]; then
    echo "   - 로컬 서버 재시작: cd /home/user/webapp && pm2 restart webapp"
    echo "   - 확인: http://localhost:3000/education/curriculum"
else
    echo "   - 프로덕션 확인: https://dagong-bi1.pages.dev/education/curriculum"
    echo "   - 시크릿 모드로 접속하여 확인하세요"
fi
