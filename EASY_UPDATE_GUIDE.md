# 🎉 티카페알케미처럼 쉬운 업데이트!

## ✨ 이제 3단계만으로 사이트 업데이트!

### 📝 업데이트 방법

```bash
# 1단계: 코드 수정 (원하는 파일 편집)

# 2단계: Git 커밋
git add .
git commit -m "업데이트 내용"

# 3단계: GitHub 푸시
git push origin main
```

**끝! 2-3분 후 자동으로 https://dagong.co.kr에 반영됩니다!** 🚀

---

## 🖥️ 관리자 패널

### 접속 주소
**https://dagong.co.kr/admin.html**

### 제공 기능
- ✅ 자동 배포 상태 확인
- ✅ GitHub Actions 바로가기
- ✅ Cloudflare Pages 관리
- ✅ DB 콘솔 바로가기
- ✅ 환경 변수 설정 가이드
- ✅ 최근 업데이트 내역

---

## 🔧 초기 설정 (딱 1번만!)

### 1. GitHub Secrets 설정

**위치**: Settings → Secrets and variables → Actions

**추가할 값**:
- `CLOUDFLARE_API_TOKEN`: your_cloudflare_api_token_here
- `CLOUDFLARE_ACCOUNT_ID`: your_cloudflare_account_id_here

**설정 링크**: https://github.com/healingcafe1-prog/dagong/settings/secrets/actions

### 2. Cloudflare 환경 변수 (소셜 로그인용)

**위치**: Cloudflare Dashboard → Pages → dagong → Settings

**추가할 변수** (Production):
```
KAKAO_CLIENT_ID=카카오_키
KAKAO_CLIENT_SECRET=카카오_시크릿
GOOGLE_CLIENT_ID=구글_키
GOOGLE_CLIENT_SECRET=구글_시크릿
NAVER_CLIENT_ID=네이버_키
NAVER_CLIENT_SECRET=네이버_시크릿
```

---

## 📊 배포 확인

### GitHub Actions
https://github.com/healingcafe1-prog/dagong/actions

### 사이트
https://dagong.co.kr

### 관리자 패널
https://dagong.co.kr/admin.html

---

## 💡 일상적인 업데이트 예시

### 예시 1: 텍스트 수정
```bash
# 파일 수정
nano src/index.tsx

# 커밋 & 푸시
git add .
git commit -m "텍스트 수정"
git push origin main

# 끝! 2-3분 후 반영됨
```

### 예시 2: 새로운 페이지 추가
```bash
# 새 파일 생성
touch public/new-page.html

# 커밋 & 푸시
git add .
git commit -m "새 페이지 추가"
git push origin main

# 끝! 자동 배포됨
```

### 예시 3: DB 마이그레이션
```bash
# 마이그레이션 파일 생성
touch migrations/0044_new_feature.sql

# SQL 작성
echo "CREATE TABLE ..." > migrations/0044_new_feature.sql

# 커밋 & 푸시
git add .
git commit -m "DB 스키마 업데이트"
git push origin main

# 끝! DB도 자동으로 업데이트됨
```

---

## ⚡ 빠른 명령어

### 전체 업데이트 (한 줄)
```bash
git add . && git commit -m "업데이트" && git push origin main
```

### 상태 확인
```bash
git status
```

### 최근 커밋 확인
```bash
git log --oneline -5
```

---

## 🎯 이게 전부입니다!

더 이상:
- ❌ ZIP 파일 다운로드 필요 없음
- ❌ 압축 해제 필요 없음
- ❌ Cloudflare 대시보드에서 수동 업로드 필요 없음
- ❌ 복잡한 명령어 필요 없음

**단지**:
- ✅ 코드 수정
- ✅ Git 푸시
- ✅ 자동 배포! 🎉

---

**티카페알케미처럼 간편하게 업데이트하세요!** ✨
