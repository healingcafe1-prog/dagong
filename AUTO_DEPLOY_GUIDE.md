# 🚀 다공 자동 배포 시스템

## ✨ 이제 GitHub에 푸시만 하면 자동으로 배포됩니다!

### 📝 사용 방법

#### 1. 코드 수정
```bash
# 파일 수정 후
cd /home/user/webapp
```

#### 2. Git 커밋
```bash
git add .
git commit -m "업데이트 내용 설명"
```

#### 3. GitHub 푸시
```bash
git push origin main
```

#### 4. 자동 배포 시작! (2-3분 소요)
- GitHub Actions가 자동으로 빌드 및 배포
- 배포 상태: https://github.com/healingcafe1-prog/dagong/actions

---

## 🔧 초기 설정 (1회만)

### 1️⃣ GitHub Secrets 설정

**위치**: https://github.com/healingcafe1-prog/dagong/settings/secrets/actions

**필요한 Secrets**:
```
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id_here
```

**설정 방법**:
1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. 위 값들을 각각 추가

### 2️⃣ Cloudflare 환경 변수 설정

**위치**: https://dash.cloudflare.com → Pages → dagong → Settings → Environment variables

**필요한 변수** (Production):
```
KAKAO_CLIENT_ID=카카오_REST_API_키
KAKAO_CLIENT_SECRET=카카오_시크릿_키
GOOGLE_CLIENT_ID=구글_클라이언트_ID
GOOGLE_CLIENT_SECRET=구글_클라이언트_시크릿
NAVER_CLIENT_ID=네이버_클라이언트_ID
NAVER_CLIENT_SECRET=네이버_클라이언트_시크릿
```

---

## 📊 배포 확인

### GitHub Actions에서 확인
https://github.com/healingcafe1-prog/dagong/actions

### 사이트 확인
- **프로덕션**: https://dagong.co.kr
- **관리자 패널**: https://dagong.co.kr/admin.html

---

## 🎯 배포 프로세스

```
코드 수정
    ↓
Git 커밋 & 푸시
    ↓
GitHub Actions 시작
    ↓
의존성 설치 (npm ci)
    ↓
빌드 (npm run build)
    ↓
Cloudflare Pages 배포
    ↓
DB 마이그레이션 (자동)
    ↓
배포 완료! 🎉
```

---

## ⚠️ 문제 해결

### Q: 배포가 실패했어요
**A**: GitHub Actions 로그 확인
1. https://github.com/healingcafe1-prog/dagong/actions 접속
2. 실패한 워크플로우 클릭
3. 로그에서 오류 메시지 확인

### Q: 환경 변수가 작동하지 않아요
**A**: Cloudflare Pages에서 환경 변수 확인
1. https://dash.cloudflare.com 접속
2. Pages → dagong → Settings → Environment variables
3. Production 탭에서 변수 확인

### Q: 로그인이 작동하지 않아요
**A**: 환경 변수가 설정되어 있는지 확인하세요

---

## 📚 관련 링크

- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong
- **GitHub Actions**: https://github.com/healingcafe1-prog/dagong/actions
- **Cloudflare Pages**: https://dash.cloudflare.com/pages
- **사이트**: https://dagong.co.kr
- **관리자 패널**: https://dagong.co.kr/admin.html

---

## 🎉 완료!

이제 GitHub에 푸시만 하면 2-3분 후 사이트가 자동으로 업데이트됩니다!

**더 이상 수동 배포가 필요 없습니다!** ✨
