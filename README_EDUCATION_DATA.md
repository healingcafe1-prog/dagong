# 다공 교육 커리큘럼 백업 & 복원 완벽 가이드

작성일: 2024-02-21  
현재 버전: V4 (최종 완성본)

---

## 📚 백업 파일 버전 이력

### V4 (2024-02-21) ⭐ **현재 버전**
- **파일**: `MASTER_BACKUP_EDUCATION_V4.sql`
- **변경사항**:
  - ID 23: "차 카페 창업 완벽 가이드" → **"한국 차 공예품 전문 카페 창업 완벽 가이드"**
  - 다공 플랫폼 직거래 연계 창업 모델 추가
  - 평수별 창업 모델 (5평~100평) 상세화
  - 샵인샵 모델 (학교/기업/관공서/병원) 추가
  - 지역별 오프라인 모임 활성화 전략 추가
  - 다공 플랫폼 창업 지원 시스템 체계화
- **총 커리큘럼**: 26개 (다도교육 14개 포함)

### V3 (2024-02-21)
- **파일**: `MASTER_BACKUP_EDUCATION_V3.sql`
- **변경사항**:
  - ID 13: "다도의 역사와 시대적 변천사" → "다도의 대상과 목표"
  - ID 31-35: 다도 역사 5개 항목 대폭 보강
  - ID 47: MBTI 티테라피 추가
  - ID 29: 티소믈리에 & 티마스터 업데이트
  - ID 25: 차와공예품 수출입 무역 실무 업데이트
- **총 커리큘럼**: 26개 (다도교육 14개)

### V2 (2024-02-20)
- **파일**: `MASTER_BACKUP_EDUCATION_V2.sql`
- **변경사항**:
  - 다도교육 커리큘럼 초기 구성
  - 명상교육 커리큘럼 추가
- **총 커리큘럼**: 25개

### V1 (초기 버전)
- **파일**: `MASTER_BACKUP_EDUCATION.sql`
- 기본 교육 커리큘럼 구성

---

## 🔄 복원 방법

### 방법 1: 자동 복원 스크립트 (권장) ⭐

**가장 간단하고 안전한 방법입니다!**

```bash
cd /home/user/webapp
chmod +x restore_education_data.sh
./restore_education_data.sh
```

메뉴에서 선택:
- `1` - 로컬 개발 DB 복원
- `2` - 프로덕션 DB 복원
- `3` - 백업 파일 버전 확인

### 방법 2: 수동 복원 (로컬 DB)

```bash
cd /home/user/webapp

# V4 (최신) 복원
npx wrangler d1 execute webapp-production --local \
  --file=MASTER_BACKUP_EDUCATION_V4.sql

# 또는 V3 복원
npx wrangler d1 execute webapp-production --local \
  --file=MASTER_BACKUP_EDUCATION_V3.sql
```

### 방법 3: 수동 복원 (프로덕션 DB)

```bash
cd /home/user/webapp

# Cloudflare API 토큰 설정
export CLOUDFLARE_API_TOKEN='your-token-here'

# V4 (최신) 복원
npx wrangler d1 execute webapp-production \
  --file=MASTER_BACKUP_EDUCATION_V4.sql
```

---

## 📝 부분 업데이트 방법

### 신규 항목만 추가하기

**예시: 새로운 교육 프로그램 1개 추가**

1. **SQL 파일 생성** (`add_new_program.sql`):
```sql
-- 새 프로그램 추가
INSERT INTO education_curriculum (
    id, category_id, title, description, content,
    duration, difficulty, display_order
) VALUES (
    48,  -- 새로운 ID (마지막 ID + 1)
    1,   -- 카테고리 (1=다도교육)
    '새로운 프로그램 제목',
    '프로그램 설명',
    '상세 내용',
    '4주',
    '중급',
    15   -- 표시 순서
);
```

2. **로컬 DB에 적용**:
```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --local \
  --file=add_new_program.sql
```

3. **서버 재시작**:
```bash
cd /home/user/webapp
pm2 restart webapp
```

4. **새로운 마스터 백업 생성**:
```bash
cd /home/user/webapp
./create_master_backup.sh V5
```

### 기존 항목 수정하기

**예시: ID 23 프로그램 내용 수정**

1. **SQL 파일 생성** (`update_program_23.sql`):
```sql
UPDATE education_curriculum SET
  title = '수정된 제목',
  description = '수정된 설명',
  content = '수정된 내용'
WHERE id = 23;
```

2. **적용 및 재시작** (위와 동일)

---

## 🛠️ 간편 백업 생성 스크립트

### 새 백업 생성하기

```bash
cd /home/user/webapp

# 자동으로 다음 버전 번호 생성 (V5, V6, ...)
npx wrangler d1 execute webapp-production --local \
  --command="SELECT * FROM education_curriculum ORDER BY category_id, display_order" \
  --json > /tmp/curriculum_new.json

# Python 스크립트로 SQL 생성
python3 create_backup.py > MASTER_BACKUP_EDUCATION_V5.sql
```

또는 간단히:
```bash
./create_master_backup.sh
```

---

## 📊 백업 파일 확인

### 현재 DB 상태 확인

```bash
cd /home/user/webapp

# 카테고리별 개수 확인
npx wrangler d1 execute webapp-production --local \
  --command="SELECT category_id, COUNT(*) as count FROM education_curriculum GROUP BY category_id"

# 특정 항목 확인
npx wrangler d1 execute webapp-production --local \
  --command="SELECT id, title FROM education_curriculum WHERE category_id=1 ORDER BY display_order"
```

### 백업 파일 목록 확인

```bash
cd /home/user/webapp
ls -lh MASTER_BACKUP_EDUCATION_*.sql
```

---

## 🔍 문제 해결

### 복원 실패 시

**증상**: "table education_curriculum already has data" 오류

**해결**:
```bash
# 1. 테이블 초기화
npx wrangler d1 execute webapp-production --local \
  --command="DELETE FROM education_curriculum"

# 2. 다시 복원
npx wrangler d1 execute webapp-production --local \
  --file=MASTER_BACKUP_EDUCATION_V4.sql
```

### 서버에 반영되지 않을 때

```bash
# 1. 서버 재시작
cd /home/user/webapp
pm2 restart webapp

# 2. 빌드 후 재시작
cd /home/user/webapp
npm run build
pm2 restart webapp

# 3. 완전 재시작
cd /home/user/webapp
fuser -k 3000/tcp 2>/dev/null || true
pm2 delete all 2>/dev/null || true
npm run build
pm2 start ecosystem.config.cjs
```

### DB 파일 손상 시

```bash
# .wrangler 디렉토리 초기화
cd /home/user/webapp
rm -rf .wrangler/state/v3/d1

# 마이그레이션 재실행
npx wrangler d1 migrations apply webapp-production --local

# 백업 복원
npx wrangler d1 execute webapp-production --local \
  --file=MASTER_BACKUP_EDUCATION_V4.sql
```

---

## 📋 체크리스트

### 백업 전 체크리스트
- [ ] 현재 DB 상태 확인
- [ ] 중요 변경사항 Git 커밋
- [ ] 버전 번호 결정 (V4 → V5)

### 복원 전 체크리스트
- [ ] 백업 파일 존재 확인
- [ ] 올바른 버전 선택
- [ ] 로컬/프로덕션 환경 확인

### 복원 후 체크리스트
- [ ] DB 데이터 개수 확인
- [ ] 서버 재시작
- [ ] 웹사이트에서 실제 확인
- [ ] 변경사항 Git 커밋

---

## 🚀 배포 워크플로우

### 로컬 개발 → 프로덕션 배포

1. **로컬에서 개발 및 테스트**
```bash
# 로컬 DB 업데이트
npx wrangler d1 execute webapp-production --local --file=update.sql

# 서버 재시작 및 테스트
pm2 restart webapp
curl http://localhost:3000/api/education/curriculum
```

2. **백업 생성**
```bash
./create_master_backup.sh V5
```

3. **Git 커밋**
```bash
git add -A
git commit -m "✨ 새로운 교육 프로그램 추가 (V5)"
git push origin main
```

4. **프로덕션 DB 업데이트**
```bash
export CLOUDFLARE_API_TOKEN='your-token'
npx wrangler d1 execute webapp-production --file=update.sql
```

5. **프로덕션 배포**
```bash
npm run build
npx wrangler pages deploy dist --project-name dagong-bi1
```

---

## 📞 도움말

**문제 발생 시**:
1. 먼저 이 문서의 "문제 해결" 섹션 확인
2. Git 로그로 최근 변경사항 확인: `git log --oneline -10`
3. 백업 파일로 롤백: `./restore_education_data.sh`

**추가 질문**:
- GitHub: https://github.com/healingcafe1-prog/dagong
- Issues: https://github.com/healingcafe1-prog/dagong/issues

---

## 📂 관련 파일

- `MASTER_BACKUP_EDUCATION_V4.sql` - 현재 버전 백업
- `MASTER_BACKUP_EDUCATION_V3.sql` - 이전 버전 백업
- `restore_education_data.sh` - 자동 복원 스크립트
- `UPDATE_CAFE_STARTUP_GUIDE.sql` - 카페 창업 가이드 업데이트
- `UPDATE_DADO_HISTORY_FINAL.sql` - 다도 역사 업데이트
- `README_EDUCATION_DATA.md` - 이 파일

---

**마지막 업데이트**: 2024-02-21  
**현재 버전**: V4  
**다음 버전**: V5 (필요 시)
