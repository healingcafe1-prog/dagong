-- ===================================================
-- Migration: 백차와 청차 카테고리 추가
-- Created: 2026-01-26
-- Description: 차 카테고리에 백차와 청차를 녹차 다음에 추가
-- ===================================================

-- 백차 카테고리 추가 (녹차 다음)
INSERT INTO categories (name, type, description) 
VALUES ('백차', 'tea', '은은하고 부드러운 맛의 미발효 백차');

-- 청차 카테고리 추가 (백차 다음)
INSERT INTO categories (name, type, description) 
VALUES ('청차', 'tea', '반발효로 깊은 맛과 향을 지닌 청차');
