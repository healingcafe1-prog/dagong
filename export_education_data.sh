#!/bin/bash

DB_FILE=".wrangler/state/v3/d1/miniflare-D1DatabaseObject/$(ls -t .wrangler/state/v3/d1/miniflare-D1DatabaseObject/ | head -1)"

echo "-- =========================================="
echo "-- 교육 데이터 (차공부, 공예공부, 다도교육, 명상교육)"
echo "-- =========================================="
echo ""

# Education Categories
echo "-- Education Categories"
sqlite3 "$DB_FILE" << 'SQL'
.mode insert education_categories
SELECT * FROM education_categories ORDER BY id;
SQL

echo ""

# Education Curriculum (처음 10개만)
echo "-- Education Curriculum (샘플 - 전체는 너무 많음)"
sqlite3 "$DB_FILE" << 'SQL'
.mode insert education_curriculum  
SELECT * FROM education_curriculum ORDER BY id LIMIT 10;
SQL

