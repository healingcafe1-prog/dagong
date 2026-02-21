# 다공(茶工) V9 복구 및 업데이트 가이드

## 📋 목차
1. [전체 프로젝트 복구](#전체-프로젝트-복구)
2. [데이터베이스만 복구](#데이터베이스만-복구)
3. [증분 업데이트 방법](#증분-업데이트-방법)
4. [백업 생성 방법](#백업-생성-방법)

---

## 🔄 전체 프로젝트 복구

### 방법 1: 프로젝트 전체 백업에서 복구 (추천)

```bash
# 1. V9 백업 다운로드
wget https://www.genspark.ai/api/files/s/tvbtrN8B -O dagong_v9.tar.gz

# 2. 압축 해제 (절대 경로로 복원됨)
cd /
sudo tar -xzf /path/to/dagong_v9.tar.gz

# 3. 프로젝트 디렉토리로 이동
cd /home/user/webapp

# 4. 의존성 설치
npm install

# 5. 데이터베이스 마이그레이션 (최초 1회)
npx wrangler d1 migrations apply webapp-production --local

# 6. 로컬 데이터베이스 복구
npx wrangler d1 execute webapp-production --local --file=FULL_EXPORT_V9.sql

# 7. 서비스 시작
fuser -k 3000/tcp 2>/dev/null || true
npm run build
pm2 start ecosystem.config.cjs

# 8. 확인
curl http://localhost:3000
```

### 방법 2: GitHub에서 복구

```bash
# 1. 저장소 클론
git clone https://github.com/healingcafe1-prog/dagong.git /home/user/webapp
cd /home/user/webapp

# 2. V9 커밋으로 체크아웃
git checkout b601515

# 3. 의존성 설치
npm install

# 4. 로컬 데이터베이스 복구
npx wrangler d1 migrations apply webapp-production --local
npx wrangler d1 execute webapp-production --local --file=FULL_EXPORT_V9.sql

# 5. 서비스 시작
npm run build
pm2 start ecosystem.config.cjs
```

---

## 💾 데이터베이스만 복구

### 교육 커리큘럼만 복구 (권장)

```bash
cd /home/user/webapp

# V9 교육 커리큘럼 백업에서 복구
npx wrangler d1 execute webapp-production --local --file=MASTER_BACKUP_EDUCATION_V9.sql

# 확인
npx wrangler d1 execute webapp-production --local --command="SELECT COUNT(*) as total FROM education_curriculum"
```

### 전체 데이터베이스 복구

```bash
cd /home/user/webapp

# 전체 DB 백업에서 복구
npx wrangler d1 execute webapp-production --local --file=FULL_EXPORT_V9.sql

# 확인
npx wrangler d1 execute webapp-production --local --command="SELECT name FROM sqlite_master WHERE type='table'"
```

---

## 🔧 증분 업데이트 방법

### 시나리오 1: 새로운 교육 프로그램 추가

```bash
cd /home/user/webapp

# 1. 업데이트 SQL 파일 생성
cat > UPDATE_ADD_PROGRAM_V10.sql << 'SQL'
-- V10: 새 교육 프로그램 추가
-- 작성일: 2026-02-XX

INSERT INTO education_curriculum (
    category_id, 
    title, 
    description, 
    content, 
    duration, 
    level, 
    display_order
) VALUES (
    1,  -- 다도교육
    '새 프로그램 제목',
    '새 프로그램 설명',
    '새 프로그램 상세 내용...',
    '120분',
    'beginner',
    15  -- 다음 순서 번호
);

SELECT '✅ V10 업데이트: 새 교육 프로그램 추가 완료' as message;
SQL

# 2. 로컬 DB에 적용
npx wrangler d1 execute webapp-production --local --file=UPDATE_ADD_PROGRAM_V10.sql

# 3. 서비스 재시작
pm2 restart webapp

# 4. 확인
curl -s "http://localhost:3000/api/education/curriculum?category_id=1" | jq '.curriculum | length'

# 5. 백업 생성
npx wrangler d1 export webapp-production --local --output=FULL_EXPORT_V10.sql

# 6. Git 커밋
git add -A
git commit -m "🎉 V10: 새 교육 프로그램 추가"
git push origin main
```

### 시나리오 2: 기존 내용 수정 (예: 카페 창업 가이드)

```bash
cd /home/user/webapp

# 1. 업데이트 SQL 파일 생성
cat > UPDATE_MODIFY_GUIDE_V10.sql << 'SQL'
-- V10: 카페 창업 가이드 수정
-- 작성일: 2026-02-XX

UPDATE education_curriculum
SET content = REPLACE(
    content,
    '기존 텍스트',
    '새로운 텍스트'
)
WHERE id = 23;

SELECT '✅ V10 업데이트: 카페 창업 가이드 수정 완료' as message;
SQL

# 2. 적용 및 재시작
npx wrangler d1 execute webapp-production --local --file=UPDATE_MODIFY_GUIDE_V10.sql
pm2 restart webapp

# 3. 확인
curl -s "http://localhost:3000/api/education/curriculum?category_id=1" | jq -r '.curriculum[] | select(.id == 23) | .title'
```

### 시나리오 3: 카테고리 전체 재구성

```bash
cd /home/user/webapp

# 1. 업데이트 SQL 파일 생성
cat > UPDATE_REORGANIZE_V10.sql << 'SQL'
-- V10: 카테고리 재구성
-- 작성일: 2026-02-XX

-- 순서 재배치
UPDATE education_curriculum SET display_order = 1 WHERE id = 12;
UPDATE education_curriculum SET display_order = 2 WHERE id = 31;
UPDATE education_curriculum SET display_order = 3 WHERE id = 32;

-- 카테고리 변경
UPDATE education_curriculum SET category_id = 2 WHERE id = 15;

SELECT '✅ V10 업데이트: 카테고리 재구성 완료' as message;
SQL

# 2. 적용
npx wrangler d1 execute webapp-production --local --file=UPDATE_REORGANIZE_V10.sql
pm2 restart webapp
```

---

## 💾 백업 생성 방법

### 정기 백업 루틴

```bash
cd /home/user/webapp

# 1. 버전 번호 설정
VERSION="V10"
DATE=$(date +%Y%m%d)

# 2. 데이터베이스 백업
npx wrangler d1 export webapp-production --local --output=FULL_EXPORT_${VERSION}.sql

# 3. 교육 커리큘럼 백업
cat > MASTER_BACKUP_EDUCATION_${VERSION}.sql << EOF
-- ================================================
-- 다공(茶工) 교육 커리큘럼 마스터 백업 ${VERSION}
-- ================================================
-- 생성일: $(date +%Y-%m-%d)
-- 
-- ${VERSION} 업데이트 내용:
-- - [여기에 변경 사항 기재]
-- 
-- 복원 방법:
-- 로컬: npx wrangler d1 execute webapp-production --local --file=MASTER_BACKUP_EDUCATION_${VERSION}.sql
-- 프로덕션: npx wrangler d1 execute webapp-production --file=MASTER_BACKUP_EDUCATION_${VERSION}.sql
-- ================================================

