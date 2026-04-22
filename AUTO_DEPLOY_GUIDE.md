# 🤖 자동 배포 및 백업 시스템 가이드

## 📋 개요

다공 프로젝트는 GitHub Actions를 사용하여 **매일 새벽 5시**에 자동으로 Cloudflare Pages에 배포됩니다.

---

## ⏰ 자동화 스케줄

### 1. **자동 백업** (매일 04:55 KST)
- **실행 시간**: 한국 시간 매일 새벽 4시 55분
- **작업 내용**:
  - Git 태그 생성 (`backup-YYYYMMDD`)
  - 프로젝트 압축 (node_modules 제외)
  - GitHub Artifacts에 30일간 보관
  - 총 커밋 수 기록

### 2. **자동 배포** (매일 05:00 KST)
- **실행 시간**: 한국 시간 매일 새벽 5시
- **작업 내용**:
  - 최신 코드 체크아웃
  - 의존성 설치 (`npm ci`)
  - 프로젝트 빌드 (`npm run build`)
  - Cloudflare Pages에 배포
  - 배포 태그 생성 (`auto-deploy-YYYYMMDDHHmmss`)

### 3. **수동 배포** (언제든지)
- **트리거**: 
  - `main` 브랜치에 푸시
  - GitHub Actions 수동 실행

---

## 🔧 초기 설정 (1회만 필요)

### 1. GitHub Secrets 설정

GitHub 저장소에서 다음 Secrets를 설정해야 합니다:

1. **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

2. 필요한 Secrets:

| Secret 이름 | 설명 | 획득 방법 |
|-------------|------|-----------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API 토큰 | Cloudflare Dashboard → My Profile → API Tokens → Create Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 계정 ID | Cloudflare Dashboard → 오른쪽 사이드바 |

#### Cloudflare API Token 생성 방법:
```
1. Cloudflare Dashboard 로그인
2. My Profile → API Tokens
3. Create Token → "Edit Cloudflare Workers" 템플릿 사용
4. 권한 추가:
   - Account.Cloudflare Pages: Edit
   - Account.Account Settings: Read
5. Continue to summary → Create Token
6. 토큰 복사 (다시 볼 수 없음!)
```

#### Cloudflare Account ID 확인:
```
1. Cloudflare Dashboard
2. 오른쪽 사이드바에서 Account ID 복사
   (또는 Workers & Pages 페이지에서 확인)
```

### 2. Cloudflare Pages 프로젝트 생성 (최초 1회)

```bash
# 로컬 또는 샌드박스에서 실행
npx wrangler pages project create dagong \
  --production-branch main \
  --compatibility-date 2024-01-01
```

---

## 📊 자동화 워크플로우 상세

### **auto-deploy.yml** (자동 배포)

```yaml
트리거:
- 매일 UTC 20:00 (KST 05:00 다음날)
- main 브랜치 푸시
- 수동 실행

작업:
1. 코드 체크아웃
2. Node.js 20 설정
3. npm ci로 의존성 설치
4. npm run build로 빌드
5. Cloudflare Pages에 배포
6. 성공 시 배포 태그 생성
7. 상태 알림
```

### **auto-backup.yml** (자동 백업)

```yaml
트리거:
- 매일 UTC 19:55 (KST 04:55 다음날)
- 수동 실행

작업:
1. 코드 체크아웃
2. backup-YYYYMMDD 태그 생성
3. 프로젝트 압축 (node_modules 제외)
4. GitHub Artifacts에 업로드 (30일 보관)
5. 백업 요약 출력
```

---

## 🚀 사용 방법

### 자동 배포 (권장)

1. **코드 수정**
2. **Git에 커밋**:
   ```bash
   cd /home/user/webapp
   git add .
   git commit -m "✨ 새로운 기능 추가"
   ```
3. **GitHub에 푸시**:
   ```bash
   git push origin main
   ```
4. **자동 배포 대기**: 
   - 즉시 배포 (푸시 시)
   - 또는 다음 날 새벽 5시 자동 배포

### 수동 배포 (긴급)

GitHub 웹사이트에서:
1. **Actions** 탭 클릭
2. **Auto Deploy to Cloudflare Pages** 선택
3. **Run workflow** 버튼 클릭
4. **Run workflow** 확인

---

## 📦 백업 확인 및 복원

### 백업 확인
1. GitHub 저장소 → **Actions** 탭
2. **Auto Backup and Tag** 워크플로우 선택
3. 최근 실행 클릭
4. **Artifacts** 섹션에서 백업 파일 다운로드

### 백업 복원
```bash
# 1. Artifacts에서 다운로드한 파일 압축 해제
tar -xzf dagong-backup-YYYYMMDD.tar.gz

# 2. 의존성 설치
npm install

# 3. 빌드
npm run build

# 4. 배포
npx wrangler pages deploy dist --project-name dagong
```

### Git 태그로 복원
```bash
# 특정 날짜의 백업 태그로 복원
git checkout backup-20250423

# 또는 특정 자동 배포 시점으로 복원
git checkout auto-deploy-20250423-050015
```

---

## 🔍 배포 상태 모니터링

### GitHub Actions에서 확인
1. **GitHub 저장소** → **Actions** 탭
2. 최근 워크플로우 실행 상태 확인:
   - ✅ 녹색 체크: 성공
   - ❌ 빨간 X: 실패
   - 🟡 노란 점: 실행 중

### Cloudflare Dashboard에서 확인
1. **Cloudflare Dashboard** → **Pages**
2. **dagong** 프로젝트 선택
3. **Deployments** 탭에서 최근 배포 확인

### 배포 URL
- **프로덕션**: https://dagong.pages.dev
- **커스텀 도메인**: https://dagong.co.kr (설정 시)

---

## 🛠️ 문제 해결

### 배포 실패 시

1. **GitHub Actions 로그 확인**:
   - Actions 탭 → 실패한 워크플로우 클릭
   - 빨간색 에러 메시지 확인

2. **일반적인 문제**:

   **빌드 실패**:
   ```bash
   # 로컬에서 빌드 테스트
   npm install
   npm run build
   ```

   **Secrets 오류**:
   - GitHub Secrets 설정 확인
   - CLOUDFLARE_API_TOKEN 유효성 확인
   - CLOUDFLARE_ACCOUNT_ID 정확성 확인

   **권한 오류**:
   - Cloudflare API Token 권한 재확인
   - Cloudflare Pages 프로젝트 존재 확인

3. **수동 재시도**:
   ```bash
   # Actions 탭에서 "Re-run all jobs" 클릭
   ```

### 백업 실패 시

1. **저장소 크기 확인**:
   ```bash
   # 대용량 파일 확인
   git ls-files | xargs -I{} du -h {} | sort -hr | head -20
   ```

2. **불필요한 파일 제거**:
   ```bash
   # .gitignore에 추가
   echo "*.log" >> .gitignore
   echo ".wrangler/" >> .gitignore
   ```

---

## 📈 배포 히스토리

모든 자동 배포는 Git 태그로 기록됩니다:

```bash
# 모든 자동 배포 태그 확인
git tag -l "auto-deploy-*"

# 모든 백업 태그 확인
git tag -l "backup-*"

# 특정 기간의 배포 확인
git tag -l "auto-deploy-202504*"
```

---

## 🔒 보안 주의사항

1. **Secrets 관리**:
   - GitHub Secrets에만 저장
   - 절대 코드에 하드코딩 금지
   - 정기적으로 API 토큰 갱신

2. **브랜치 보호**:
   - `main` 브랜치에 직접 푸시 제한 (선택)
   - Pull Request를 통한 코드 리뷰 (선택)

3. **워크플로우 권한**:
   - 최소 권한 원칙
   - 필요한 권한만 부여

---

## 📞 지원

자동 배포 관련 문제 발생 시:

1. **GitHub Actions 로그** 확인
2. **DEPLOYMENT_v1.1.md** 수동 배포 가이드 참고
3. **백업 파일**로 복원: https://www.genspark.ai/api/files/s/F2VbznS8

---

## ✅ 설정 완료 체크리스트

- [ ] GitHub Secrets 설정 (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`)
- [ ] Cloudflare Pages 프로젝트 생성 (`dagong`)
- [ ] 워크플로우 파일 푸시 (`.github/workflows/*.yml`)
- [ ] 첫 자동 배포 테스트 (수동 실행)
- [ ] 배포 성공 확인 (https://dagong.pages.dev)
- [ ] 커스텀 도메인 연결 (선택)

---

**설정 완료 후 매일 새벽 5시에 자동으로 최신 코드가 배포됩니다! 🎉**
