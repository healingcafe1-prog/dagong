-- Migration: 명상교육 커리큘럼 정리 및 내용 보강
-- Date: 2026-02-18

-- 1. 명상의 기초 삭제 (id: 29)
DELETE FROM education_curriculum WHERE id = 29;

-- 2. 명상의 종류와 방법 삭제 (id: 27)
DELETE FROM education_curriculum WHERE id = 27;

-- 3. 명상의 역사 중복 삭제 (id: 28)
DELETE FROM education_curriculum WHERE id = 28;

-- 4. 호흡명상 내용 업데이트 (id: 30)
UPDATE education_curriculum 
SET description = '코를 통한 호흡 관찰, 배를 이용한 복식호흡, 의식적 호흡 조절 등 다양한 호흡법을 통해 마음을 안정시키고 집중력을 높이는 방법을 배웁니다. 호흡과 마음의 연결 원리를 이해하고 일상에서 실천할 수 있는 호흡 명상 기법을 익힙니다.'
WHERE id = 30;

-- 5. 마음챙김 명상 내용 업데이트 (id: 31)
UPDATE education_curriculum 
SET description = '현재 순간의 몸의 감각, 감정, 생각을 있는 그대로 관찰하는 마음챙김 수행을 배웁니다. 바디스캔, 걷기명상, 먹기명상 등 일상 속에서 마음챙김을 실천하는 다양한 방법을 익히고, 스트레스와 불안을 다루는 기술을 습득합니다.'
WHERE id = 31;

-- 6. 차 명상 내용 업데이트 (id: 32)
UPDATE education_curriculum 
SET description = '차를 우리고 마시는 과정에서 오감을 깨우고 현재 순간에 온전히 집중하는 명상 수행을 배웁니다. 차의 색, 향, 맛, 온도를 섬세하게 느끼며 마음을 고요하게 하는 방법을 익히고, 다도와 명상의 융합을 통해 일상 속 평화를 경험합니다.'
WHERE id = 32;

-- 7. 요가와 명상 내용 업데이트 (id: 33)
UPDATE education_curriculum 
SET description = '요가 아사나(자세)와 명상을 결합하여 몸과 마음을 동시에 수련하는 방법을 배웁니다. 기본 요가 동작부터 명상적 요가까지, 신체의 유연성과 근력을 기르면서 호흡과 동작의 조화를 통해 내면의 평화와 균형을 찾는 수행법을 익힙니다.'
WHERE id = 33;

-- 최종 명상교육 커리큘럼 (category_id = 5):
-- 1. 명상의 역사와 정의 (id: 23) - beginner, 120분
-- 2. 명상의 종류와 실천 (id: 24) - intermediate, 150분
-- 3. 명상의 역사 (id: 25) - beginner, 90분
-- 4. 명상의 정의와 원리 (id: 26) - beginner, 60분
-- 5. 호흡 명상 (id: 30) - beginner, 45분
-- 6. 마음챙김 명상 (id: 31) - intermediate, 60분
-- 7. 차 명상 (id: 32) - intermediate, 90분
-- 8. 요가와 명상 (id: 33) - intermediate, 75분
