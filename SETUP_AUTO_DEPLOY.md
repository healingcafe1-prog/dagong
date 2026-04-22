# 🚀 자동 배포 시스템 최초 설정 가이드

## ✅ 완료된 작업

자동 배포 시스템이 구축되었습니다! 아래 설정만 완료하면 **매일 새벽 5시**에 자동으로 사이트가 업데이트됩니다.

---

## 🔧 필수 설정 (1회만)

### 1단계: GitHub에 코드 푸시

```bash
cd /home/user/webapp

# GitHub 인증 설정 (GitHub 탭에서 완료)
# 또는 setup_github_environment 도구 사용

# 코드 푸시
git push origin main --force
```

### 2단계: GitHub Secrets 설정

1. **GitHub 저장소** 접속: https://github.com/healingcafe1-prog/dagong
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** 클릭

#### 필요한 Secrets (2개):

**① CLOUDFLARE_API_TOKEN**
```
1. Cloudflare Dashboard 로그인: https://dash.cloudflare.com
2. My Profile → API Tokens
3. Create Token → "Edit Cloudflare Workers" 템플릿
4. 권한 설정:
   - Account.Cloudflare Pages: Edit
   - Account.Account Settings: Read
5. Create Token → 토큰 복사
6. GitHub Secrets에 추가
```

**② CLOUDFLARE_ACCOUNT_ID**
```
1. Cloudflare Dashboard
2. 오른쪽 사이드바에서 Account ID 복사
3. GitHub Secrets에 추가
```

### 3단계: Cloudflare Pages 프로젝트 생성

```bash
# Cloudflare에 dagong 프로젝트가 없으면 생성
npx wrangler pages project create dagong \
  --production-branch main \
  --compatibility-date 2024-01-01
```

---

## 🎯 자동 배포 스케줄

설정 완료 후 자동으로 실행됩니다:

| 작업 | 시간 (KST) | 설명 |
|------|------------|------|
| 🗄️ 자동 백업 | 매일 04:55 | Git 태그 생성, 프로젝트 압축, 30일 보관 |
| 🚀 자동 배포 | 매일 05:00 | 빌드 → Cloudflare Pages 배포 |

---

## 🧪 테스트 방법

### 수동 배포 테스트

1. **GitHub 저장소** → **Actions** 탭
2. **Auto Deploy to Cloudflare Pages** 선택
3. **Run workflow** 버튼 클릭
4. **Run workflow** 확인
5. 진행 상황 모니터링 (약 2~3분 소요)

### 배포 확인

```bash
# 사이트 접속 확인
curl https://dagong.pages.dev

# 또는 브라우저에서
https://dagong.pages.dev
https://dagong.co.kr  # 커스텀 도메인 설정 시
```

---

## 📝 일상 사용법

### 코드 수정 후 자동 배포

```bash
cd /home/user/webapp

# 1. 코드 수정
# ... 파일 편집 ...

# 2. Git 커밋
git add .
git commit -m "✨ 새로운 기능 추가"

# 3. GitHub에 푸시
git push origin main

# 4. 완료!
# - 즉시 자동 배포 시작 (푸시 트리거)
# - 또는 다음날 새벽 5시 자동 배포
```

### 긴급 배포 (수동)

GitHub Actions에서 수동 실행:
1. Actions 탭
2. Auto Deploy to Cloudflare Pages
3. Run workflow

---

## 📊 모니터링

### GitHub Actions에서 확인
- URL: https://github.com/healingcafe1-prog/dagong/actions
- 배포 성공/실패 상태 확인
- 로그 확인

### Cloudflare Dashboard에서 확인
- URL: https://dash.cloudflare.com
- Pages → dagong
- Deployments 탭

---

## 🔍 생성된 파일

자동 배포 시스템 관련 파일:

```
webapp/
├── .github/
│   └── workflows/
│       ├── auto-deploy.yml      # 자동 배포 워크플로우
│       └── auto-backup.yml      # 자동 백업 워크플로우
├── AUTO_DEPLOY_GUIDE.md         # 상세 가이드 (이 파일)
├── SETUP_AUTO_DEPLOY.md         # 최초 설정 가이드
├── DEPLOYMENT_v1.1.md           # 수동 배포 가이드
└── README.md                    # 프로젝트 문서 (업데이트됨)
```

---

## ⚠️ 주의사항

1. **Secrets 보안**
   - API 토큰을 코드에 절대 포함하지 마세요
   - GitHub Secrets에만 저장

2. **브랜치 관리**
   - `main` 브랜치에 푸시하면 자동 배포됩니다
   - 테스트는 별도 브랜치 사용 권장

3. **배포 시간**
   - 새벽 5시 = UTC 20:00 (전날)
   - GitHub Actions는 UTC 기준

---

## 🆘 문제 해결

### Q1: 워크플로우가 실행되지 않아요
**A**: 
1. GitHub에 코드가 푸시되었는지 확인
2. `.github/workflows/*.yml` 파일이 존재하는지 확인
3. GitHub Actions가 활성화되어 있는지 확인

### Q2: 배포가 실패해요
**A**:
1. Actions 탭에서 에러 로그 확인
2. GitHub Secrets 설정 확인
3. Cloudflare API 토큰 권한 확인

### Q3: 수동 배포는 어떻게 하나요?
**A**: 
- 방법 1: `git push origin main`
- 방법 2: GitHub Actions에서 "Run workflow"
- 방법 3: `npm run deploy:prod` (로컬)

---

## 📚 추가 문서

- **상세 가이드**: [AUTO_DEPLOY_GUIDE.md](./AUTO_DEPLOY_GUIDE.md)
- **수동 배포**: [DEPLOYMENT_v1.1.md](./DEPLOYMENT_v1.1.md)
- **프로젝트 README**: [README.md](./README.md)

---

## ✅ 설정 완료 체크리스트

설정을 완료했다면 체크하세요:

- [ ] GitHub에 코드 푸시 완료
- [ ] GitHub Secrets 설정 완료 (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID)
- [ ] Cloudflare Pages 프로젝트 생성 (dagong)
- [ ] 수동 배포 테스트 성공
- [ ] 배포된 사이트 접속 확인 (https://dagong.pages.dev)
- [ ] 커스텀 도메인 연결 (선택)

**모두 완료했다면 설정 끝! 🎉**

이제 코드를 수정하고 푸시하기만 하면 자동으로 배포됩니다!

---

**다음 자동 배포 시간**: 내일 새벽 05:00 (KST)
