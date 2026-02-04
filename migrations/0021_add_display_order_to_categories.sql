-- Add display_order column to categories table
ALTER TABLE categories ADD COLUMN display_order INTEGER DEFAULT 0;

-- Update display_order for local categories
-- 원하는 순서: 농산물(1) → 수산물(3) → 축산물(4) → 기타 특산품(5) → 가공식품(2)
UPDATE categories SET display_order = 1 WHERE id = 1; -- 농산물
UPDATE categories SET display_order = 2 WHERE id = 3; -- 수산물
UPDATE categories SET display_order = 3 WHERE id = 4; -- 축산물
UPDATE categories SET display_order = 4 WHERE id = 5; -- 기타 특산품
UPDATE categories SET display_order = 5 WHERE id = 2; -- 가공식품

-- Update display_order for tea categories (current order maintained)
UPDATE categories SET display_order = 1 WHERE id = 6;  -- 녹차
UPDATE categories SET display_order = 2 WHERE id = 30; -- 백차
UPDATE categories SET display_order = 3 WHERE id = 31; -- 청차
UPDATE categories SET display_order = 4 WHERE id = 7;  -- 황차
UPDATE categories SET display_order = 5 WHERE id = 8;  -- 홍차
UPDATE categories SET display_order = 6 WHERE id = 9;  -- 발효차
UPDATE categories SET display_order = 7 WHERE id = 11; -- 블렌딩차

-- Set display_order for other categories based on their ID
UPDATE categories SET display_order = id WHERE display_order = 0;
