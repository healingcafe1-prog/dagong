# 🌐 Cloudflare Pages 도메인 설정 완료 가이드

## ✅ 현재 완료된 작업

### 1. Cloudflare API 인증 ✅
- **Account**: Healingcafe1@gmail.com
- **Account ID**: ecc65d2ec1ecc2222db7937965158511
- **API Token**: 설정 완료 (모든 권한 포함)

### 2. Cloudflare Pages 프로젝트 생성 ✅
- **프로젝트명**: dagong
- **Production Branch**: main
- **Pages URL**: https://dagong-bi1.pages.dev/
- **상태**: 생성 완료 (배포 대기 중)

### 3. 커스텀 도메인 등록 ✅
- **도메인**: dogong.co.kr
- **상태**: pending (DNS 설정 대기 중)
- **인증서**: Google Trust Services (자동 발급 대기)
- **등록 시간**: 2026-02-05 04:36:56 UTC

---

## ⚠️ 추가 필요 작업

### 1. dogong.co.kr을 Cloudflare로 이전

**현재 문제:**
- dogong.co.kr이 Cloudflare에 등록되어 있지 않음
- 다른 DNS 서버 (121.78.117.39 등)에서 관리 중
- DNS 쿼리 거부 상태 (REFUSED)

**해결 방법 (2가지):**

#### **방법 A: Cloudflare에 도메인 추가 (추천)**

1. **Cloudflare 대시보드 접속**
   ```
   https://dash.cloudflare.com/
   ```

2. **Add a Site 클릭**
   - 오른쪽 상단의 "Add a Site" 버튼

3. **도메인 입력**
   ```
   dogong.co.kr
   ```

4. **플랜 선택**
   - Free Plan 선택 (무료)

5. **DNS 레코드 스캔**
   - Cloudflare가 기존 DNS 레코드를 자동으로 가져옴

6. **네임서버 변경**
   - Cloudflare가 제공하는 네임서버로 변경:
   ```
   예시:
   isaac.ns.cloudflare.com
   uma.ns.cloudflare.com
   ```
   
   **도메인 등록 업체에서 설정:**
   - 가비아: DNS 정보 → 네임서버 설정
   - 호스팅케이알: 도메인 관리 → 네임서버 변경
   - AWS Route53: 호스팅 영역 → NS 레코드 변경

7. **DNS 전파 대기**
   - 보통 5분~24시간 소요 (평균 1-2시간)

8. **Cloudflare에서 CNAME 레코드 추가**
   ```
   Type: CNAME
   Name: @ (또는 dogong.co.kr)
   Target: dagong-bi1.pages.dev
   Proxy status: Proxied (주황색 구름)
   TTL: Auto
   ```

9. **www 서브도메인 추가 (선택사항)**
   ```
   Type: CNAME
   Name: www
   Target: dagong-bi1.pages.dev
   Proxy status: Proxied
   ```

---

#### **방법 B: 현재 DNS에서 CNAME 설정 (임시)**

**dogong.co.kr의 현재 DNS 서버에서:**
```
Type: CNAME
Name: @ 또는 dogong.co.kr
Target: dagong-bi1.pages.dev
```

**단점:**
- Cloudflare의 보안 기능 사용 불가
- SSL/TLS 자동 관리 불가
- CDN 성능 향상 없음
- **추천하지 않음**

---

### 2. 프로젝트 배포

**현재 상태:**
- 프로젝트 생성만 완료
- 실제 코드 배포 필요

**배포 명령:**
```bash
cd /home/user/webapp

# 1. 빌드
npm run build

# 2. 환경변수 설정 후 배포
export CLOUDFLARE_API_TOKEN="iEs_pr1yc-VOt0G-6Pp7zsUycUCqqVj_SckB-8D6"
export CLOUDFLARE_ACCOUNT_ID="ecc65d2ec1ecc2222db7937965158511"

# 3. Cloudflare Pages 배포
npx wrangler pages deploy dist --project-name dagong
```

---

## 📊 최종 URL 구조

**배포 완료 후 접속 가능한 URL:**

1. **Cloudflare Pages 기본 URL**
   ```
   https://dagong-bi1.pages.dev/
   ```

2. **커스텀 도메인 (DNS 설정 후)**
   ```
   https://dogong.co.kr/
   https://www.dogong.co.kr/ (설정 시)
   ```

3. **샌드박스 개발 URL (임시)**
   ```
   https://3000-i1cjrhuxghhqe7nryfah2-18e660f9.sandbox.novita.ai/
   ```

---

## 🔍 도메인 설정 확인 방법

### DNS 전파 확인:
```bash
# 방법 1: DNS Checker
https://dnschecker.org/
→ dogong.co.kr 입력

# 방법 2: Google DNS API
curl "https://dns.google/resolve?name=dogong.co.kr&type=CNAME"

# 방법 3: 직접 접속
https://dogong.co.kr/
```

### Cloudflare Pages 도메인 상태 확인:
```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/ecc65d2ec1ecc2222db7937965158511/pages/projects/dagong/domains" \
  -H "Authorization: Bearer iEs_pr1yc-VOt0G-6Pp7zsUycUCqqVj_SckB-8D6" \
  | python3 -m json.tool
```

**status 필드 확인:**
- `pending`: DNS 설정 대기
- `active`: 정상 작동
- `pending_deletion`: 삭제 대기

---

## ⏱️ 타임라인

### 즉시 (0분):
- ✅ Cloudflare 계정 인증
- ✅ Pages 프로젝트 생성 (dagong)
- ✅ 커스텀 도메인 등록 (dogong.co.kr)

### 5-10분:
- 🔄 Cloudflare에 dogong.co.kr 도메인 추가
- 🔄 네임서버 변경 (도메인 등록 업체)

### 1-2시간:
- 🔄 DNS 전파 완료
- 🔄 SSL 인증서 자동 발급

### 완료 후:
- ✅ https://dogong.co.kr/ 접속 가능
- ✅ 자동 HTTPS 리다이렉트
- ✅ CDN 가속 활성화

---

## 🚀 빠른 시작 체크리스트

- [ ] 1. Cloudflare에 dogong.co.kr 도메인 추가
- [ ] 2. 네임서버를 Cloudflare로 변경
- [ ] 3. DNS 전파 대기 (1-2시간)
- [ ] 4. CNAME 레코드 확인: @ → dagong-bi1.pages.dev
- [ ] 5. npm run build 실행
- [ ] 6. wrangler pages deploy dist --project-name dagong
- [ ] 7. https://dogong.co.kr/ 접속 테스트

---

## 📞 다음 단계

**지금 바로:**
1. https://dash.cloudflare.com/ 접속
2. "Add a Site" 클릭
3. "dogong.co.kr" 입력
4. Free Plan 선택
5. 네임서버 정보 받기
6. 도메인 등록 업체에서 네임서버 변경

**네임서버 변경 완료 후:**
- 저에게 "네임서버 변경 완료"라고 알려주세요
- DNS 전파 확인 및 배포 진행하겠습니다

---

## 🎯 요약

**현재 상태:**
```
✅ Cloudflare 인증 완료
✅ Pages 프로젝트 생성 (dagong)
✅ 도메인 등록 (dogong.co.kr) - pending 상태
⏳ DNS 설정 대기 중
⏳ 실제 배포 대기 중
```

**필요한 작업:**
```
1. dogong.co.kr을 Cloudflare에 추가
2. 네임서버 변경
3. npm run build && wrangler pages deploy
```

**예상 완료 시간:**
```
DNS 설정: 5-10분
DNS 전파: 1-2시간
배포: 5분
총: 약 2시간
```

---

생성 시간: 2026-02-05 04:37 UTC
프로젝트: 다공 (dagong)
도메인: dogong.co.kr
