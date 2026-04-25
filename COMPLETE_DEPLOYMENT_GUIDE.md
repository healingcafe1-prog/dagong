# 🚀 완전한 배포 가이드

## 📋 현재 상황

### ✅ 완료된 작업
1. **PC 버전 상품등록 버튼** - 완료
2. **모바일 버전 상품등록 버튼** - 완료  
3. **선물추천 시스템** (16개 이벤트 + 8개 수신자) - 완료
4. **빌드 스크립트 수정** - 완료
5. **Git 커밋 및 푸시** - 완료 (157개 커밋)

### ❌ 미완료 작업
- **프로덕션 배포** - GitHub Secrets 미설정으로 실패 중

## 🔧 배포 완료를 위한 필수 단계

### 1단계: Cloudflare API Token 생성 (5분)

#### 1-1. Cloudflare 대시보드 접속
```
https://dash.cloudflare.com/profile/api-tokens
```

#### 1-2. "Create Token" 클릭

#### 1-3. "Edit Cloudflare Workers" 템플릿 선택
- 또는 "Custom token" 선택

#### 1-4. 권한 설정
**필수 권한:**
- Account → Cloudflare Pages → Edit
- Zone → All zones (또는 특정 Zone)

**설정 예시:**
```
Permissions:
  Account - Cloudflare Pages: Edit
  Zone - All zones: Edit (optional)

Account Resources:
  Include - All accounts

Zone Resources:
  Include - All zones
```

#### 1-5. "Continue to summary" 클릭

#### 1-6. "Create Token" 클릭

#### 1-7. 토큰 복사
⚠️ **중요**: 토큰은 한 번만 표시됩니다!
```
예시: cfut_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890
```

### 2단계: GitHub Secrets 설정 (3분)

#### 2-1. GitHub Secrets 페이지 접속
```
https://github.com/healingcafe1-prog/dagong/settings/secrets/actions
```

#### 2-2. "New repository secret" 클릭

#### 2-3. 첫 번째 Secret 추가
- **Name**: `CLOUDFLARE_API_TOKEN`
- **Secret**: [1단계에서 복사한 토큰 붙여넣기]
- "Add secret" 클릭

#### 2-4. 두 번째 Secret 확인/추가
- **Name**: `CLOUDFLARE_ACCOUNT_ID`
- **Secret**: `ecc65d2ec1ecc2222db7937965158511`
- "Add secret" 클릭

#### 2-5. Secrets 확인
설정된 Secrets 목록:
- ✅ `CLOUDFLARE_API_TOKEN`
- ✅ `CLOUDFLARE_ACCOUNT_ID`

### 3단계: 배포 재실행 (2분)

#### 3-1. GitHub Actions 페이지 접속
```
https://github.com/healingcafe1-prog/dagong/actions
```

#### 3-2. 최신 실패한 워크플로우 클릭
- "Deploy to Cloudflare Pages" 선택

#### 3-3. "Re-run jobs" 클릭
- "Re-run all jobs" 선택

#### 3-4. 배포 진행 확인
- 약 2~3분 소요
- ✅ 녹색 체크마크 확인

### 4단계: 배포 확인 (1분)

#### 4-1. 프로덕션 사이트 접속
```
https://dagong.co.kr
```

#### 4-2. PC 버전 확인
**메인 페이지 히어로 섹션:**
```
[차 둘러보기] [공예품 보기] [체험 예약하기] [📝 상품 등록하기] ✅
```

#### 4-3. 선물추천 페이지 확인
```
https://dagong.co.kr/gift-recommendation.html
```

**확인 사항:**
- 어떤 선물을 하나요? (16개 카테고리)
- 누구에게 선물하나요? (8개 카테고리)
- 각 카테고리 클릭 시 필터링된 상품 목록

## 🔍 문제 해결

### 배포가 여전히 실패하는 경우

#### 원인 1: API Token 권한 부족
**해결:**
1. Cloudflare → API Tokens
2. 토큰 삭제
3. 새 토큰 생성 (Account - Cloudflare Pages: Edit 권한 확인)
4. GitHub Secrets 업데이트

#### 원인 2: Account ID 오류
**확인:**
```
Cloudflare Dashboard → 우측 상단 → Account ID 복사
```
**업데이트:**
GitHub Secrets에서 `CLOUDFLARE_ACCOUNT_ID` 수정

#### 원인 3: 프로젝트 이름 불일치
**확인:**
```bash
# wrangler.jsonc 파일 확인
cat wrangler.jsonc | grep "name"
```
**수정:**
- GitHub Actions 워크플로우의 `projectName` 확인
- Cloudflare Pages 프로젝트 이름과 일치 확인

### GitHub Actions 로그 확인

#### 로그 접속
```
https://github.com/healingcafe1-prog/dagong/actions
```

#### 상세 로그 보기
1. 실패한 워크플로우 클릭
2. "deploy" 잡 클릭
3. 각 단계별 로그 확인

#### 일반적인 오류 메시지

**오류 1:**
```
Error: Input required and not supplied: apiToken
```
**해결:** GitHub Secrets에 `CLOUDFLARE_API_TOKEN` 추가

**오류 2:**
```
Error: Authentication error
```
**해결:** API Token 권한 확인 및 재생성

**오류 3:**
```
Error: Project not found
```
**해결:** Cloudflare Pages에서 프로젝트 이름 확인

## 📊 배포 후 확인 체크리스트

### ✅ 메인 페이지
- [ ] PC: 상품등록 버튼 표시
- [ ] 모바일: 상품등록 버튼 표시
- [ ] 히어로 섹션 정상 표시
- [ ] 카테고리 그리드 정상 표시

### ✅ 선물추천 페이지
- [ ] `/gift-recommendation.html` 접속 가능
- [ ] 16개 이벤트 카테고리 표시
- [ ] 8개 수신자 카테고리 표시
- [ ] Hover 애니메이션 작동
- [ ] 클릭 시 필터링 작동

### ✅ 기능 테스트
- [ ] 상품등록 버튼 클릭 → `/products/new` 이동
- [ ] 생일 카테고리 클릭 → 필터링된 목록
- [ ] 여성 카테고리 클릭 → 필터링된 목록

## 🎯 완료 기준

### 모든 항목 ✅ 확인:
1. ✅ GitHub Secrets 설정 완료
2. ✅ GitHub Actions 배포 성공
3. ✅ 프로덕션 사이트 접속 가능
4. ✅ PC 상품등록 버튼 표시
5. ✅ 모바일 상품등록 버튼 표시
6. ✅ 선물추천 페이지 접속 가능
7. ✅ 모든 카테고리 정상 작동

## 📞 지원

### 추가 도움이 필요한 경우

#### 참고 문서
- `URGENT_SETUP_GUIDE.md` - Secrets 설정 상세 가이드
- `PC_BUTTON_FIX_COMPLETE.md` - PC 버튼 수정 내역
- `GIFT_RECOMMENDATION_COMPLETE.md` - 선물추천 시스템 상세

#### 유용한 링크
- **GitHub Secrets**: https://github.com/healingcafe1-prog/dagong/settings/secrets/actions
- **Cloudflare API Tokens**: https://dash.cloudflare.com/profile/api-tokens
- **GitHub Actions**: https://github.com/healingcafe1-prog/dagong/actions
- **Cloudflare Dashboard**: https://dash.cloudflare.com/pages
- **프로덕션 사이트**: https://dagong.co.kr

## ⏱️ 예상 소요 시간

- **Cloudflare Token 생성**: 5분
- **GitHub Secrets 설정**: 3분
- **배포 재실행**: 2분
- **배포 대기**: 2~3분
- **확인**: 1분

**총 소요 시간: 약 13~15분**

---

## 🎉 배포 완료 후

### 다음 단계
1. **데이터 추가**: 실제 선물 상품 등록
2. **DB 마이그레이션**: 0044번 마이그레이션 실행
3. **소셜 로그인**: 환경 변수 설정
4. **테스트**: 전체 기능 QA

### 성공 메시지
```
✅ 배포 성공!

🌐 사이트: https://dagong.co.kr
📝 상품등록: ✅ PC/모바일 모두 표시
🎁 선물추천: ✅ 16개 이벤트 + 8개 수신자

모든 기능이 정상 작동합니다!
```

