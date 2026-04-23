# 다공 v1.2 배포 가이드

## 📦 배포 준비 완료

### ✅ 빌드 완료
- **버전**: v1.2-final-20250423
- **빌드 파일**: `dist/_worker.js` (325.22 kB)
- **빌드 시간**: 1.35초
- **상태**: 배포 준비 완료 ✅

### 📋 배포 체크리스트
- ✅ 소스 코드 업데이트 완료
- ✅ 데이터베이스 마이그레이션 완료
- ✅ 프로덕션 빌드 완료
- ✅ Git 커밋 및 태그 생성
- ✅ 프로젝트 백업 완료
- ⏳ Cloudflare API 키 설정 필요
- ⏳ Cloudflare Pages 배포 대기

---

## 🚀 배포 방법

### **옵션 1: Cloudflare API 키 사용 (직접 배포)**

#### 1단계: API 키 설정
Cloudflare API 키가 아직 설정되지 않았습니다.

**설정 방법**:
1. Deploy 탭으로 이동
2. Cloudflare API 토큰 생성
3. API 키 입력 및 저장

#### 2단계: 배포 실행
API 키 설정 후 다음 명령어 실행:

```bash
cd /home/user/webapp
npx wrangler pages deploy dist --project-name dagong
```

---

### **옵션 2: GitHub를 통한 자동 배포 (권장)**

GitHub에 푸시하면 Cloudflare Pages가 자동으로 배포합니다.

#### 1단계: GitHub 인증 설정

```bash
# setup_github_environment 도구 실행 필요
# 또는 GitHub 탭에서 인증 완료
```

#### 2단계: GitHub에 푸시

```bash
cd /home/user/webapp
git push origin main
```

#### 3단계: Cloudflare Pages 설정

1. Cloudflare Pages 대시보드 접속
2. GitHub 저장소 연결: `healingcafe1-prog/dagong`
3. 빌드 설정:
   - **빌드 명령어**: `npm run build`
   - **빌드 출력 디렉토리**: `dist`
   - **루트 디렉토리**: `/`
4. 환경 변수 설정 (필요시)
5. 배포 시작

---

### **옵션 3: 수동 배포 (로컬 환경)**

이미 빌드된 `dist` 폴더를 수동으로 업로드합니다.

#### 방법 A: Wrangler CLI 사용

```bash
# 1. Wrangler 로그인
npx wrangler login

# 2. 프로젝트 배포
cd /home/user/webapp
npx wrangler pages deploy dist --project-name dagong
```

#### 방법 B: Cloudflare 대시보드 사용

1. Cloudflare Pages 대시보드 접속
2. 프로젝트 `dagong` 선택
3. "직접 업로드" 클릭
4. `dist` 폴더 업로드
5. 배포 완료

---

## 📊 배포 내용 (v1.2)

### 💎 **새로운 기능**
1. **포인트 시스템**
   - 구매 적립 (25-35%)
   - 추천인 보너스 (각 20,000P)
   - 추천인 구매 적립
   - 현금 전환 (600,000PV = 50,000원)

2. **모바일 최적화**
   - 친구초대 팝업 크기 조정

3. **상품 포인트 표시**
   - 모든 카드에 포인트 안내

### 🗄️ **데이터베이스 마이그레이션**

**중요**: 프로덕션 배포 후 반드시 실행해야 합니다!

```bash
# 프로덕션 DB 마이그레이션
npx wrangler d1 migrations apply webapp-production
```

**마이그레이션 파일**:
- `0034_add_point_rate.sql` - 포인트 적립률
- `0035_add_point_system.sql` - 포인트 시스템 테이블
- `0036_add_order_points.sql` - 주문 포인트 컬럼

---

## 🔍 배포 후 확인사항

### 1. 사이트 접속 확인
```
✅ https://dagong.pages.dev
✅ https://dagong.co.kr (커스텀 도메인)
```

### 2. 핵심 페이지 확인
- [ ] 메인 페이지 (`/`)
- [ ] 상품 목록 (`/products`)
- [ ] 상품 상세 (`/products/1`)
- [ ] 회사소개 (`/about`)
- [ ] 로그인 (`/login`)

### 3. 포인트 표시 확인
- [ ] 상품 카드에 포인트 표시
- [ ] 상품 상세에 적립 포인트 안내
- [ ] 모바일에서 팝업 크기 확인

### 4. API 엔드포인트 확인
```bash
# 상품 목록 (포인트 포함)
curl https://dagong.pages.dev/api/products?limit=3

# 포인트 조회 (로그인 필요)
curl -H "Authorization: Bearer {token}" \
  https://dagong.pages.dev/api/points/me
```

### 5. 데이터베이스 확인
```bash
# 포인트 테이블 존재 확인
npx wrangler d1 execute webapp-production \
  --command="SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%point%'"

# 상품 포인트 적립률 확인
npx wrangler d1 execute webapp-production \
  --command="SELECT id, name, price, point_rate FROM products LIMIT 5"
```

---

## 🐛 트러블슈팅

### 문제 1: 빌드 실패
```bash
# 의존성 재설치
cd /home/user/webapp
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 문제 2: 마이그레이션 실패
```bash
# 로컬에서 먼저 테스트
npm run db:migrate:local

# 문제 없으면 프로덕션 적용
npx wrangler d1 migrations apply webapp-production
```

### 문제 3: API 오류 (포인트 관련)
- 데이터베이스 마이그레이션 확인
- 테이블 생성 확인
- 로그 확인: `npx wrangler pages deployment tail`

### 문제 4: 이전 버전으로 복원
```bash
# v1.1로 롤백
git checkout v1.1-final-20250423
npm run build
npx wrangler pages deploy dist --project-name dagong

# v1.2로 다시 복원
git checkout v1.2-final-20250423
npm run build
npx wrangler pages deploy dist --project-name dagong
```

---

## 📝 배포 후 작업

### 1. GitHub 푸시
```bash
cd /home/user/webapp
git push origin main --force
```

### 2. 태그 푸시
```bash
git push origin v1.2-final-20250423
```

### 3. 자동 배포 확인
- GitHub Actions 로그 확인
- Cloudflare Pages 빌드 로그 확인

### 4. 모니터링 설정
- Cloudflare Analytics 확인
- 에러 로그 모니터링
- 성능 메트릭 확인

---

## 🔗 유용한 링크

- **Cloudflare 대시보드**: https://dash.cloudflare.com
- **프로젝트 설정**: https://dash.cloudflare.com/pages/dagong
- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong
- **백업 파일**: https://www.genspark.ai/api/files/s/iSXaQMZC

---

## ⏭️ 다음 단계

배포 후 다음 작업을 진행하세요:

1. **테스트**
   - 모든 기능 동작 확인
   - 포인트 시스템 테스트
   - 모바일 반응형 확인

2. **모니터링**
   - 에러 로그 확인
   - 성능 메트릭 분석
   - 사용자 피드백 수집

3. **다음 기능 개발**
   - 포인트 페이지 UI
   - 포인트 사용 기능
   - 추천인 랭킹

---

**배포 날짜**: 2025년 4월 23일  
**버전**: v1.2-final-20250423  
**프로젝트 이름**: dagong  
**빌드 상태**: ✅ 완료
