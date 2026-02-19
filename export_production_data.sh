#!/bin/bash

# 프로덕션 데이터 내보내기 스크립트
echo "-- 다공(茶工) 프로덕션 데이터 덤프" > production_data_full.sql
echo "-- 생성일: $(date '+%Y-%m-%d %H:%M:%S')" >> production_data_full.sql
echo "" >> production_data_full.sql

# 기존 데이터 삭제
echo "-- 기존 데이터 삭제" >> production_data_full.sql
echo "DELETE FROM education_applications;" >> production_data_full.sql
echo "DELETE FROM order_items;" >> production_data_full.sql
echo "DELETE FROM order_commissions;" >> production_data_full.sql
echo "DELETE FROM product_images;" >> production_data_full.sql
echo "DELETE FROM reviews;" >> production_data_full.sql
echo "DELETE FROM experiences;" >> production_data_full.sql
echo "DELETE FROM products;" >> production_data_full.sql
echo "DELETE FROM producers;" >> production_data_full.sql
echo "DELETE FROM events;" >> production_data_full.sql
echo "DELETE FROM categories;" >> production_data_full.sql
echo "DELETE FROM regions;" >> production_data_full.sql
echo "" >> production_data_full.sql

# Categories 데이터
echo "-- Categories 데이터" >> production_data_full.sql
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM categories ORDER BY id" --json | \
jq -r '.[] | .results[] | "INSERT INTO categories (id, name, type, description, display_order, created_at) VALUES (\(.id), '\''\(.name)'\'', '\''\(.type)'\'', '\''\(.description // "")'\'', \(.display_order), '\''\(.created_at)'\'');"' >> production_data_full.sql
echo "" >> production_data_full.sql

# Regions 데이터
echo "-- Regions 데이터" >> production_data_full.sql
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM regions ORDER BY id" --json | \
jq -r '.[] | .results[] | "INSERT INTO regions (id, name, type, description, image_url, created_at) VALUES (\(.id), '\''\(.name)'\'', '\''\(.type // "")'\'', '\''\(.description // "")'\'', '\''\(.image_url // "")'\'', '\''\(.created_at)'\'');"' >> production_data_full.sql
echo "" >> production_data_full.sql

# Producers 데이터
echo "-- Producers 데이터" >> production_data_full.sql
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM producers ORDER BY id" --json | \
jq -r '.[] | .results[] | "INSERT INTO producers (id, name, description, region_id, contact, image_url, created_at) VALUES (\(.id), '\''\(.name)'\'', '\''\(.description // "")'\'', \(.region_id // "NULL"), '\''\(.contact // "")'\'', '\''\(.image_url // "")'\'', '\''\(.created_at)'\'');"' >> production_data_full.sql
echo "" >> production_data_full.sql

# Products 데이터
echo "-- Products 데이터" >> production_data_full.sql
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM products ORDER BY id" --json | \
jq -r '.[] | .results[] | "INSERT INTO products (id, name, category_id, producer_id, description, price, stock, main_image, product_type, weight, origin, is_featured, is_available, created_at, original_price, discount_rate, commission_rate) VALUES (\(.id), '\''\(.name)'\'', \(.category_id), \(.producer_id), '\''\(.description // "")'\'', \(.price), \(.stock), '\''\(.main_image // "")'\'', '\''\(.product_type // "")'\'', '\''\(.weight // "")'\'', '\''\(.origin // "")'\'', \(.is_featured), \(.is_available), '\''\(.created_at)'\'', \(.original_price // "NULL"), \(.discount_rate // "NULL"), \(.commission_rate));"' >> production_data_full.sql
echo "" >> production_data_full.sql

# Experiences 데이터
echo "-- Experiences 데이터" >> production_data_full.sql
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM experiences ORDER BY id" --json | \
jq -r '.[] | .results[] | "INSERT INTO experiences (id, title, description, producer_id, region_id, price, duration, max_participants, image_url, created_at) VALUES (\(.id), '\''\(.title)'\'', '\''\(.description // "")'\'', \(.producer_id), \(.region_id // "NULL"), \(.price), '\''\(.duration // "")'\'', \(.max_participants // "NULL"), '\''\(.image_url // "")'\'', '\''\(.created_at)'\'');"' >> production_data_full.sql
echo "" >> production_data_full.sql

# Events 데이터
echo "-- Events 데이터" >> production_data_full.sql
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM events ORDER BY id" --json | \
jq -r '.[] | .results[] | "INSERT INTO events (id, title, description, event_type, discount_rate, banner_image, start_date, end_date, is_active, month, is_recurring, priority, created_at) VALUES (\(.id), '\''\(.title)'\'', '\''\(.description // "")'\'', '\''\(.event_type // "")'\'', \(.discount_rate // "NULL"), '\''\(.banner_image // "")'\'', '\''\(.start_date // "")'\'', '\''\(.end_date // "")'\'', \(.is_active), \(.month // "NULL"), \(.is_recurring), \(.priority), '\''\(.created_at)'\'');"' >> production_data_full.sql

echo ""
echo "✅ 데이터 내보내기 완료: production_data_full.sql"
wc -l production_data_full.sql
