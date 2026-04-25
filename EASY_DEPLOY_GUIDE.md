# 🚀 간편 자동 배포 시스템 설정 가이드

## ✨ 티카페알케미닷컴처럼 쉬운 배포!

이제 **GitHub에 푸시만 하면 자동으로 배포**됩니다!

---

## 📋 1회 설정 (5분)

### 1️⃣ GitHub Secrets 설정

**위치**: https://github.com/healingcafe1-prog/dagong/settings/secrets/actions

다음 2개의 Secret을 추가하세요:

#### 필수 Secret 1: `CLOUDFLARE_API_TOKEN`
```
값: your_cloudflare_api_token_here
```
- 이미 발급받으신 Cloudflare API 토큰입니다

#### 필수 Secret 2: `CLOUDFLARE_ACCOUNT_ID`
```
값: your_cloudflare_account_id_here
```
- Cloudflare Dashboard에서 확인한 Account ID입니다

### 2️⃣ GitHub Actions 활성화

1. https://github.com/healingcafe1-prog/dagong/actions 접속
2. "I understand my workflows, go ahead and enable them" 클릭
3. 완료!

---

## 🎯 이제 이렇게 사용하세요!

### 방법 1: 코드 수정 후 자동 배포 (추천! ⭐)

```bash
# 1. 코드 수정
vim src/index.tsx  # 또는 원하는 파일 편집

# 2. 커밋
git add .
git commit -m "기능 추가"

# 3. 푸시 (자동 배포 시작!)
git push origin main
```

**끝!** GitHub Actions가 자동으로:
- ✅ 코드 빌드
- ✅ Cloudflare Pages 배포
- ✅ DB 마이그레이션 실행

### 방법 2: 웹 관리자 패널 사용

**URL**: https://dagong.co.kr/admin.html

기능:
- 🚀 **지금 배포하기** 버튼 (원클릭 배포)
- 📊 배포 상태 실시간 확인
- 🔑 환경 변수 관리
- 💾 DB 상태 확인
- 📜 최근 업데이트 히스토리

### 방법 3: GitHub Actions 수동 실행

1. https://github.com/healingcafe1-prog/dagong/actions 접속
2. "Deploy to Cloudflare Pages" 워크플로 선택
3. "Run workflow" → "Run workflow" 클릭
4. 완료!

---

## 📊 배포 진행 상황 확인

### GitHub Actions에서 확인
- URL: https://github.com/healingcafe1-prog/dagong/actions
- 실시간 로그 확인 가능
- 배포 소요 시간: 약 2-3분

### 관리자 패널에서 확인
- URL: https://dagong.co.kr/admin.html
- 배포 상태, DB 버전, 최근 변경사항 확인

---

## 🔄 자동 배포 흐름

```
코드 푸시 (git push)
    ↓
GitHub Actions 자동 실행
    ↓
① npm install (의존성 설치)
    ↓
② npm run build (빌드)
    ↓
③ Cloudflare Pages 배포
    ↓
④ DB 마이그레이션 자동 적용
    ↓
✅ 배포 완료!
    ↓
https://dagong.co.kr 자동 업데이트
```

---

## ⚡ 장점

### ✅ 티카페알케미닷컴처럼 쉽게!
- **수동 작업 없음**: ZIP 다운로드, 압축 해제, 업로드 불필요
- **원클릭 배포**: git push 또는 버튼 클릭만으로 배포
- **자동화**: 빌드, 배포, DB 마이그레이션 모두 자동

### ✅ 안전하고 편리하게!
- **실시간 로그**: 배포 과정을 실시간으로 확인
- **롤백 가능**: 문제 시 이전 버전으로 즉시 복구
- **무료**: GitHub Actions 무료 제공 (월 2,000분)

---

## 🛠️ 고급 기능

### 자동 DB 마이그레이션
migrations/ 폴더에 새 SQL 파일 추가 시:
```bash
# 새 마이그레이션 생성
echo "CREATE TABLE ..." > migrations/0044_new_feature.sql

# 커밋 & 푸시
git add migrations/0044_new_feature.sql
git commit -m "새 기능 DB 추가"
git push origin main

# 자동으로 DB 마이그레이션 실행됨!
```

### 환경별 배포 (선택사항)
- **main 브랜치**: 프로덕션 자동 배포
- **dev 브랜치**: 개발/테스트 환경 배포 가능

---

## 🎉 완료!

이제 **티카페알케미닷컴처럼** 쉽게 사이트를 업데이트할 수 있습니다!

### 다음 배포부터는:
1. 코드 수정
2. `git push origin main`
3. 끝! (자동 배포)

또는

1. https://dagong.co.kr/admin.html 접속
2. "지금 배포하기" 버튼 클릭
3. 끝!

---

## 📞 문제 해결

### Q: GitHub Actions가 실행되지 않아요
**A**: 
1. GitHub Secrets이 올바르게 설정되었는지 확인
2. GitHub Actions가 활성화되었는지 확인
3. .github/workflows/deploy.yml 파일이 main 브랜치에 있는지 확인

### Q: 배포는 성공했는데 사이트가 업데이트 안돼요
**A**: 
1. 브라우저 캐시 삭제 (Ctrl+Shift+R)
2. Cloudflare 캐시 삭제 (Dashboard → Cache → Purge Everything)
3. 약 5분 정도 기다려보기 (CDN 전파 시간)

### Q: DB 마이그레이션이 실패해요
**A**: 
1. SQL 문법 오류 확인
2. Cloudflare D1 콘솔에서 수동 실행
3. GitHub Actions 로그 확인

---

**설정 완료 시간**: 5분
**다음 배포부터 소요 시간**: 0분 (자동)

🎊 **축하합니다! 이제 간편하게 배포할 수 있습니다!**
