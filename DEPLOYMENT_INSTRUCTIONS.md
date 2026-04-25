# 🚀 dagong.co.kr 프로덕션 배포 안내

## 📋 현재 상황

**로컬 변경사항**: 63개 커밋이 GitHub에 푸시되지 않음  
**영향**: dagong.co.kr에 업데이트가 반영되지 않음

---

## ✅ 해결 방법 (선택)

### 방법 1: GitHub를 통한 자동 배포 (권장) 🤖

**장점**: 
- 한 번 푸시하면 자동으로 배포됨
- 매일 새벽 5시 자동 배포
- 백업 자동 생성

**단계**:

1. **GitHub 인증 설정**
   - GenSpark AI 인터페이스에서 **#github** 탭으로 이동
   - GitHub 연동 완료

2. **코드 푸시**
   ```bash
   cd /home/user/webapp
   git push origin main
   ```

3. **자동 배포 확인**
   - GitHub Actions 탭에서 워크플로우 실행 확인
   - 약 2-3분 후 dagong.co.kr에 반영됨

---

### 방법 2: Cloudflare API를 통한 직접 배포 ⚡

**장점**: 
- 즉시 배포 가능
- GitHub 없이 배포

**단계**:

1. **Cloudflare API 키 설정**
   - GenSpark AI 인터페이스에서 **Deploy** 탭으로 이동
   - Cloudflare API 토큰 입력

2. **직접 배포**
   ```bash
   cd /home/user/webapp
   npm run build
   npx wrangler pages deploy dist --project-name dagong
   ```

3. **프로덕션 데이터베이스 마이그레이션**
   ```bash
   npx wrangler d1 migrations apply webapp-production
   ```

---

### 방법 3: 로컬 Git 푸시 (Git CLI) 🔧

**GitHub Personal Access Token이 있는 경우**:

```bash
cd /home/user/webapp

# 원격 저장소 확인
git remote -v

# GitHub Personal Access Token으로 푸시
git push https://[TOKEN]@github.com/healingcafe1-prog/dagong.git main
```

---

## 📊 배포 후 확인 사항

### 1. 프로덕션 사이트 확인
- **URL**: https://dagong.co.kr
- **확인 페이지**:
  - 지역별 보기 → 박람회 탭 (`/#/regions?type=fair`)
  - 지역별 보기 → 프리마켓 탭 (`/#/regions?type=freemarket`)
  - 교육 커리큘럼 → 다도교육 탭 (`/#/education`)
  - 체험&교육 → 승마체험 탭 (`/#/experiences?type=horse_riding`)

### 2. API 테스트
```bash
# 전체 지역 (20개여야 함)
curl -s https://dagong.co.kr/api/regions | jq '.regions | length'

# 박람회 확인
curl -s https://dagong.co.kr/api/regions?type=fair | jq '.regions[0].name'

# 프리마켓 확인
curl -s https://dagong.co.kr/api/regions?type=freemarket | jq '.regions[0].name'
```

### 3. 데이터베이스 확인
프로덕션 D1 데이터베이스에 마이그레이션이 적용되었는지 확인:
```bash
npx wrangler d1 execute webapp-production --command="SELECT COUNT(*) FROM regions"
```

---

## 🗂️ 배포될 변경사항

### 신규 추가 (v2.0)
1. **지역별 보기**:
   - 한국차공예품박람회 (ID: 19)
   - 프리마켓 (ID: 20)

2. **교육 커리큘럼**:
   - 다도교육 카테고리 (ID: 6)
   - 5개 신규 프로그램 (훈민정음 다도/명상, 직지심경 다도/명상, 블렌딩티 컨설팅)

3. **체험&교육 프로그램**:
   - 승마체험 탭
   - 괴산 네이쳐승마장 외승 (ID: 11)

### 마이그레이션 파일 (5개)
- 0038_remove_tea_professional_programs.sql
- 0039_update_experience_programs.sql
- 0040_update_horse_riding_details.sql
- 0041_add_dado_education_programs.sql
- 0042_add_fair_and_freemarket_regions.sql

---

## ⚠️ 중요 참고사항

### 데이터베이스 마이그레이션
- **로컬 환경**: 이미 적용됨 (--local)
- **프로덕션 환경**: 아직 적용 안됨 (수동 실행 필요)

프로덕션 배포 후 **반드시** 데이터베이스 마이그레이션을 실행하세요:
```bash
cd /home/user/webapp
npm run db:migrate:prod
```

### 자동 배포 시스템
- **매일 새벽 5시** (KST) 자동 배포
- GitHub main 브랜치에 푸시되면 자동 실행
- 단, 데이터베이스 마이그레이션은 **수동 실행 필요**

---

## 📞 문제 발생 시

1. **배포 실패**: GitHub Actions 로그 확인
2. **페이지 오류**: 브라우저 콘솔 확인
3. **데이터 오류**: 프로덕션 D1 데이터베이스 확인

---

**작성일**: 2026-04-25  
**버전**: v2.0  
**상태**: 배포 대기 (63개 커밋)
