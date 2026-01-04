# 🚀 차다이렉트 (chadirect.kr) 배포 가이드

## 📋 목차
1. [도메인 설정](#1-도메인-설정)
2. [Cloudflare Pages 배포](#2-cloudflare-pages-배포)
3. [데이터베이스 설정](#3-데이터베이스-설정)
4. [환경 변수 설정](#4-환경-변수-설정)
5. [커스텀 도메인 연결](#5-커스텀-도메인-연결)
6. [배포 확인](#6-배포-확인)

---

## 1. 도메인 설정

### 도메인 등록
**선택한 도메인**: `chadirect.kr`

**추천 등록 업체**:
- **가비아**: https://www.gabia.com (국내, 한국어)
- **Cloudflare**: https://www.cloudflare.com/products/registrar/ (원가 판매)
- **후이즈**: https://www.whois.co.kr (저렴)

### 등록 절차
1. 등록 업체 사이트 접속
2. "chadirect.kr" 검색
3. 사용 가능 확인
4. 결제 (연 15,000원 ~ 20,000원)
5. 소유권 획득

---

## 2. Cloudflare Pages 배포

### 2-1. Cloudflare 계정 준비
1. https://dash.cloudflare.com 접속
2. 회원가입 (무료)
3. 이메일 인증 완료

### 2-2. API 토큰 생성
1. 대시보드 우측 상단 → 프로필 아이콘
2. "API 토큰" 클릭
3. "API 토큰 생성" 클릭
4. "Cloudflare Pages 편집" 템플릿 선택
5. 토큰 생성 → **복사해서 안전하게 보관**

### 2-3. 프로젝트 빌드
```bash
cd /home/user/webapp

# 빌드
npm run build

# dist/ 디렉토리 생성 확인
ls -la dist/
```

### 2-4. Cloudflare Pages 프로젝트 생성
```bash
# 환경 변수 설정 (API 토큰)
export CLOUDFLARE_API_TOKEN="your-api-token-here"

# Pages 프로젝트 생성
npx wrangler pages project create chadirect --production-branch main

# 프로젝트 정보 확인
npx wrangler pages project list
```

### 2-5. 첫 배포
```bash
# dist 폴더 배포
npx wrangler pages deploy dist --project-name chadirect

# 배포 완료 후 URL 확인
# 예: https://chadirect.pages.dev
```

---

## 3. 데이터베이스 설정

### 3-1. D1 프로덕션 데이터베이스 생성
```bash
# D1 데이터베이스 생성
npx wrangler d1 create chadirect-production

# 출력된 database_id 복사
# 예: database_id: "xxxx-xxxx-xxxx-xxxx"
```

### 3-2. wrangler.jsonc 업데이트
```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "chadirect-production",
      "database_id": "여기에-실제-database-id-입력"
    }
  ]
}
```

### 3-3. 마이그레이션 실행
```bash
# 프로덕션 DB에 마이그레이션 적용
npx wrangler d1 migrations apply chadirect-production --remote

# 시드 데이터 입력
npx wrangler d1 execute chadirect-production --remote --file=./seed.sql

# 확인
npx wrangler d1 execute chadirect-production --remote --command="SELECT COUNT(*) FROM products"
```

---

## 4. 환경 변수 설정

### 4-1. OAuth 키 설정 (소셜 로그인)

**Google OAuth**:
```bash
npx wrangler pages secret put GOOGLE_CLIENT_ID --project-name chadirect
# 값 입력: your-google-client-id

npx wrangler pages secret put GOOGLE_CLIENT_SECRET --project-name chadirect
# 값 입력: your-google-client-secret
```

**Naver OAuth**:
```bash
npx wrangler pages secret put NAVER_CLIENT_ID --project-name chadirect
npx wrangler pages secret put NAVER_CLIENT_SECRET --project-name chadirect
```

**Kakao OAuth**:
```bash
npx wrangler pages secret put KAKAO_CLIENT_ID --project-name chadirect
```

### 4-2. 시크릿 확인
```bash
npx wrangler pages secret list --project-name chadirect
```

---

## 5. 커스텀 도메인 연결

### 5-1. Cloudflare에 도메인 추가

**케이스 A: Cloudflare에서 도메인 구매한 경우**
- 자동으로 네임서버 설정됨
- 5-2 단계로 이동

**케이스 B: 다른 곳에서 도메인 구매한 경우 (가비아 등)**

1. **Cloudflare 대시보드**
   - "웹사이트 추가" 클릭
   - `chadirect.kr` 입력
   - 무료 플랜 선택

2. **네임서버 확인**
   - Cloudflare가 제공하는 네임서버 확인
   - 예:
     ```
     ns1.cloudflare.com
     ns2.cloudflare.com
     ```

3. **도메인 등록 업체에서 네임서버 변경**
   
   **가비아 예시**:
   - 가비아 로그인
   - "My 가비아" → "도메인 관리"
   - `chadirect.kr` 선택
   - "네임서버 설정" 클릭
   - "다른 네임서버 사용" 선택
   - Cloudflare 네임서버 2개 입력
   - 저장 (24-48시간 소요)

4. **Cloudflare에서 확인 대기**
   - 네임서버 변경이 완료될 때까지 대기
   - 이메일로 활성화 알림 수신

### 5-2. Pages에 커스텀 도메인 연결

```bash
# 커스텀 도메인 추가
npx wrangler pages domain add chadirect.kr --project-name chadirect

# www 서브도메인도 추가 (선택사항)
npx wrangler pages domain add www.chadirect.kr --project-name chadirect
```

**또는 대시보드에서**:
1. Cloudflare Pages → chadirect 프로젝트
2. "사용자 지정 도메인" 탭
3. "사용자 지정 도메인 설정" 클릭
4. `chadirect.kr` 입력
5. DNS 레코드 자동 추가됨
6. SSL 인증서 자동 발급 (수분 소요)

### 5-3. DNS 설정 확인

Cloudflare DNS 레코드가 자동으로 추가됨:
```
CNAME  chadirect.kr  →  chadirect.pages.dev
CNAME  www           →  chadirect.pages.dev
```

---

## 6. 배포 확인

### 6-1. 기본 URL 확인
```bash
# 브라우저에서 접속
https://chadirect.pages.dev
```

### 6-2. 커스텀 도메인 확인
```bash
# 도메인 설정 완료 후 (24-48시간)
https://chadirect.kr
https://www.chadirect.kr
```

### 6-3. 기능 테스트

**필수 확인 사항**:
- [ ] 홈페이지 로딩
- [ ] 상품 목록 조회
- [ ] 상품 상세 페이지
- [ ] 장바구니 담기
- [ ] 주문하기
- [ ] 소셜 로그인 (Google, Naver, Kakao)
- [ ] 마이페이지 → 주문 내역
- [ ] 생산자 관리 페이지

### 6-4. 성능 확인

**Lighthouse 테스트**:
1. Chrome DevTools → Lighthouse
2. "분석 생성" 클릭
3. 목표 점수:
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+

---

## 7. 자동 배포 설정 (GitHub Actions)

### 7-1. GitHub 저장소 연결

```bash
# GitHub 저장소 생성 (github.com)
# 저장소 이름: chadirect

# 로컬 저장소 연결
cd /home/user/webapp
git remote add origin https://github.com/YOUR_USERNAME/chadirect.git
git branch -M main
git push -u origin main
```

### 7-2. Cloudflare Pages ↔ GitHub 연동

1. Cloudflare Pages 대시보드
2. chadirect 프로젝트 → "설정"
3. "빌드 및 배포" → "Git 연결"
4. GitHub 계정 연결
5. 저장소 선택: `chadirect`
6. 빌드 설정:
   ```
   빌드 명령: npm run build
   빌드 출력 디렉토리: dist
   ```
7. 저장

### 7-3. 자동 배포 테스트

```bash
# 코드 수정 후 커밋
git add .
git commit -m "Test auto deployment"
git push

# Cloudflare Pages 대시보드에서 배포 진행 확인
# 완료 후 자동으로 배포됨
```

---

## 8. 유지보수

### 8-1. 로그 확인
```bash
# 실시간 로그
npx wrangler pages tail chadirect

# 특정 배포 로그
npx wrangler pages deployment list --project-name chadirect
```

### 8-2. 롤백
```bash
# 이전 배포로 롤백
npx wrangler pages deployment rollback --project-name chadirect
```

### 8-3. 데이터베이스 백업
```bash
# D1 데이터 내보내기
npx wrangler d1 export chadirect-production --remote --output backup.sql

# 특정 테이블만
npx wrangler d1 execute chadirect-production --remote --command="SELECT * FROM orders" > orders_backup.json
```

---

## 9. 비용 안내

### Cloudflare Pages (무료 플랜)
- ✅ 무제한 요청
- ✅ 무제한 대역폭
- ✅ 500 빌드/월
- ✅ 20,000 파일
- ✅ 무료 SSL
- ✅ DDoS 방어

### D1 데이터베이스 (무료 플랜)
- ✅ 5GB 저장공간
- ✅ 5,000,000 읽기/일
- ✅ 100,000 쓰기/일

### 도메인 비용
- `.kr` 도메인: 연 15,000원 ~ 20,000원

**예상 월 비용**: 약 1,500원 (도메인만)

---

## 10. 문제 해결

### Q1. 배포 후 404 에러
**원인**: 라우팅 설정 문제  
**해결**: `_routes.json` 확인
```bash
cat dist/_routes.json
```

### Q2. 데이터베이스 연결 실패
**원인**: D1 바인딩 오류  
**해결**: wrangler.jsonc의 database_id 확인
```bash
npx wrangler d1 list
```

### Q3. 소셜 로그인 실패
**원인**: OAuth 리디렉션 URI 불일치  
**해결**: OAuth 앱 설정에서 리디렉션 URI 추가
```
https://chadirect.kr/auth/google/callback
https://chadirect.kr/auth/naver/callback
https://chadirect.kr/auth/kakao/callback
```

### Q4. 도메인 접속 불가
**원인**: DNS 전파 대기 중  
**해결**: 24-48시간 대기 또는 DNS 확인
```bash
nslookup chadirect.kr
# 또는
dig chadirect.kr
```

---

## 11. 배포 체크리스트

### 배포 전
- [ ] `npm run build` 성공
- [ ] `.env` 파일 확인 (로컬만)
- [ ] Git 커밋 및 푸시
- [ ] 도메인 등록 완료

### 배포 중
- [ ] Cloudflare Pages 프로젝트 생성
- [ ] D1 데이터베이스 생성
- [ ] 마이그레이션 실행
- [ ] 환경 변수 설정
- [ ] 커스텀 도메인 연결

### 배포 후
- [ ] 홈페이지 접속 확인
- [ ] API 작동 확인
- [ ] 데이터베이스 쿼리 테스트
- [ ] 소셜 로그인 테스트
- [ ] Lighthouse 점수 확인
- [ ] 모바일 반응형 테스트

---

## 12. 긴급 연락처 및 문서

**Cloudflare 고객지원**: https://support.cloudflare.com  
**Wrangler 문서**: https://developers.cloudflare.com/workers/wrangler/  
**D1 문서**: https://developers.cloudflare.com/d1/  
**Pages 문서**: https://developers.cloudflare.com/pages/  

---

**배포 완료 후 이 가이드는 프로젝트 문서화를 위해 Git에 포함됩니다.**

📅 최종 업데이트: 2026-01-04  
📝 작성자: AI Assistant  
🚀 프로젝트: 차다이렉트 (chadirect.kr)
