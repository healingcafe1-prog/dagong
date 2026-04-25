-- 다도교육 관련 데이터 삭제
DELETE FROM education_curriculum WHERE category_id = 4;
DELETE FROM education_categories WHERE id = 4;

-- 승마체험 카테고리 추가
INSERT INTO education_categories (id, name, parent_id, description, display_order, icon)
VALUES (5, '승마체험', 1, '자연과 함께하는 승마 체험 프로그램', 4, 'fa-horse');

-- 괴산 네이쳐승마장 외승 프로그램 추가
INSERT INTO education_curriculum (
  category_id,
  title,
  description,
  content,
  duration,
  difficulty,
  display_order,
  thumbnail_image
) VALUES (
  5,
  '괴산 네이쳐승마장 외승 - 100,000원',
  '아름다운 자연 속에서 즐기는 외승 체험 (체험비: 100,000원)',
  '• 프로그램 소개
- 괴산의 청정 자연 속에서 즐기는 승마 외승
- 초보자도 안전하게 참여 가능
- 전문 강사의 1:1 지도
- 체험비: 100,000원 (1인당)

• 프로그램 내용
- 승마 기초 안전 교육 (30분)
- 마장 내 승마 연습 (30분)
- 자연 속 외승 체험 (60분)
- 말 관리 체험 (30분)

• 포함 사항
- 승마 장비 대여 (헬멧, 보호대)
- 전문 강사 동행
- 보험 가입
- 기념 사진 촬영

• 준비물
- 편한 복장 (긴 바지 필수)
- 운동화
- 물

• 위치
충청북도 괴산군 괴산읍 네이쳐승마장
주차 가능

• 예약 및 문의
전화: 043-XXX-XXXX
참가 인원: 최대 10명
예약 필수',
  '150분',
  'beginner',
  1,
  'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800'
);
