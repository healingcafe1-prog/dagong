# 커스텀 도메인 연결 가이드 (dagong.co.kr)

## 현재 상황

- **현재 URL**: https://dagong-bi1.pages.dev/
- **목표 URL**: https://dagong.co.kr/
- **Cloudflare Pages 프로젝트**: dagong

---

## 📋 사전 준비

### 도메인 소유 확인

먼저 `dagong.co.kr` 도메인을 소유하고 있어야 합니다.

**도메인 등록 업체 (예시):**
- 가비아 (gabia.com)
- 후이즈 (whois.co.kr)
- 호스팅케이알 (hosting.kr)
- AWS Route 53
- Cloudflare Registrar

---

## 🚀 Cloudflare Pages 커스텀 도메인 연결 방법

### 방법 1: Cloudflare를 DNS로 사용 (추천)

#### 1단계: Cloudflare에 도메인 추가

1. **Cloudflare Dashboard 접속**
   - https://dash.cloudflare.com/

2. **사이트 추가**
   - 왼쪽 메뉴: **Websites** 클릭
   - **Add a site** 버튼 클릭
   - 도메인 입력: `dagong.co.kr`
   - **Free** 플랜 선택

3. **네임서버 변경**
   - Cloudflare가 제공하는 네임서버 주소 복사:
     ```
     예: 
     ns1.cloudflare.com
     ns2.cloudflare.com
     ```
   - 도메인 등록 업체 사이트 접속
   - 도메인 관리 → 네임서버 변경
   - Cloudflare 네임서버로 변경
   - **전파 시간**: 최대 24-48시간 (보통 1-2시간)

#### 2단계: Pages 프로젝트에 도메인 연결

1. **Cloudflare Dashboard**
   - **Workers & Pages** → **dagong** 프로젝트 선택

2. **커스텀 도메인 추가**
   - **Custom domains** 탭 클릭
   - **Set up a custom domain** 버튼 클릭
   - 도메인 입력: `dagong.co.kr`
   - **Add custom domain** 클릭

3. **www 서브도메인 추가 (선택사항)**
   - 다시 **Set up a custom domain** 클릭
   - 도메인 입력: `www.dagong.co.kr`
   - **Add custom domain** 클릭

4. **DNS 레코드 자동 생성**
   - Cloudflare가 자동으로 DNS 레코드 생성:
     ```
     dagong.co.kr     CNAME  dagong-bi1.pages.dev
     www.dagong.co.kr CNAME  dagong-bi1.pages.dev
     ```

5. **SSL 인증서 자동 발급**
   - Cloudflare가 자동으로 SSL 인증서 발급
   - 약 5-10분 소요

#### 3단계: 확인

```bash
# DNS 전파 확인
dig dagong.co.kr

# 사이트 접속 테스트
curl -I https://dagong.co.kr
```

---

### 방법 2: 외부 DNS 사용 (다른 업체에서 DNS 관리)

Cloudflare를 DNS로 사용하지 않고, 기존 DNS 제공업체를 계속 사용하는 경우:

#### 1단계: Cloudflare Pages에 도메인 추가

1. **Cloudflare Dashboard**
   - **Workers & Pages** → **dagong** 프로젝트

2. **Custom domains** 탭
   - **Set up a custom domain** 클릭
   - `dagong.co.kr` 입력

3. **TXT 레코드로 소유권 확인**
   - Cloudflare가 TXT 레코드 제공
   - 예: `_cf-custom-hostname.dagong.co.kr TXT xxxx-xxxx-xxxx`

#### 2단계: DNS 레코드 추가 (도메인 등록 업체)

도메인 등록 업체 사이트에서 다음 레코드 추가:

**CNAME 레코드**:
```
타입: CNAME
이름: @  (또는 dagong.co.kr)
값: dagong-bi1.pages.dev
TTL: 3600 (1시간)
```

**www 서브도메인 (선택)**:
```
타입: CNAME
이름: www
값: dagong-bi1.pages.dev
TTL: 3600
```

**소유권 확인 TXT 레코드**:
```
타입: TXT
이름: _cf-custom-hostname
값: [Cloudflare가 제공한 값]
TTL: 3600
```

#### 3단계: SSL 설정

- **Cloudflare SSL/TLS 모드**: Full (strict) 권장
- **자동 HTTPS 리다이렉트**: 활성화

---

## 🔧 CLI로 도메인 추가

API 토큰이 있다면 CLI로도 가능합니다:

```bash
cd /home/user/webapp

# 커스텀 도메인 추가
export CLOUDFLARE_API_TOKEN="U7FtTc6Eh3aGNP9mlgZZf8lhlyFBV4QLPDnSxBjo"

npx wrangler pages domain add dagong.co.kr --project-name dagong

# www 서브도메인 추가
npx wrangler pages domain add www.dagong.co.kr --project-name dagong
```

---

## ✅ 설정 완료 후 확인 사항

### 1. DNS 전파 확인

```bash
# Linux/Mac
dig dagong.co.kr

# Windows
nslookup dagong.co.kr

# 온라인 툴
# https://dnschecker.org
```

### 2. SSL 인증서 확인

```bash
curl -I https://dagong.co.kr

# HTTP/2 200 응답 확인
```

### 3. 리다이렉트 테스트

```bash
# HTTP → HTTPS 리다이렉트
curl -I http://dagong.co.kr

# www → non-www 리다이렉트 (설정한 경우)
curl -I https://www.dagong.co.kr
```

---

## 🔄 리다이렉트 설정 (선택사항)

### www → non-www 리다이렉트

Cloudflare Dashboard에서:
1. **Rules** → **Page Rules** 또는 **Redirect Rules**
2. **Create Page Rule** 클릭
3. URL 패턴: `www.dagong.co.kr/*`
4. Setting: **Forwarding URL** → **301 Permanent Redirect**
5. Destination: `https://dagong.co.kr/$1`
6. **Save and Deploy**

---

## 🐛 문제 해결

### 1. "This site can't be reached"

**원인**: DNS 전파 중 또는 DNS 레코드 오류

**해결**:
```bash
# DNS 전파 상태 확인
dig dagong.co.kr +short

# 24-48시간 대기
```

### 2. "SSL handshake failed"

**원인**: SSL 인증서 발급 중

**해결**:
- 5-10분 대기
- Cloudflare Dashboard → SSL/TLS → Edge Certificates 확인

### 3. "522 Connection timed out"

**원인**: Origin server (Cloudflare Pages) 응답 없음

**해결**:
```bash
# Pages 프로젝트 상태 확인
# Cloudflare Dashboard → dagong 프로젝트 확인
```

### 4. DNS 레코드 충돌

**원인**: 기존 A 레코드나 CNAME 레코드와 충돌

**해결**:
- 기존 레코드 삭제
- CNAME 레코드만 유지

---

## 📊 도메인 연결 체크리스트

### 사전 준비:
- [ ] dagong.co.kr 도메인 소유 확인
- [ ] 도메인 등록 업체 로그인 정보 확보
- [ ] Cloudflare 계정 로그인

### Cloudflare 설정:
- [ ] Cloudflare에 사이트 추가 (방법 1)
- [ ] 네임서버 변경 (방법 1) 또는 DNS 레코드 추가 (방법 2)
- [ ] Pages 프로젝트에 커스텀 도메인 연결
- [ ] SSL/TLS 모드 설정 (Full 또는 Full (strict))

### DNS 전파 대기:
- [ ] DNS 전파 확인 (최대 24-48시간)
- [ ] SSL 인증서 발급 확인 (5-10분)

### 확인:
- [ ] https://dagong.co.kr 접속 확인
- [ ] HTTP → HTTPS 리다이렉트 확인
- [ ] SSL 인증서 유효성 확인

---

## 🔗 유용한 링크

- **Cloudflare Pages 도메인 가이드**: https://developers.cloudflare.com/pages/configuration/custom-domains/
- **DNS 전파 확인**: https://dnschecker.org
- **SSL 테스트**: https://www.ssllabs.com/ssltest/
- **Cloudflare Dashboard**: https://dash.cloudflare.com/

---

## 💡 핵심 요약

1. **Cloudflare를 DNS로 사용** (방법 1 추천)
   - 네임서버 변경 → 자동 DNS 설정
   - SSL 인증서 자동 발급

2. **외부 DNS 사용** (방법 2)
   - CNAME 레코드 수동 추가
   - TXT 레코드로 소유권 확인

3. **CLI로도 가능** (API 토큰 필요)
   - `npx wrangler pages domain add dagong.co.kr`

4. **전파 시간**: 최대 24-48시간
5. **SSL 자동**: 5-10분

---

**도메인 소유자만 진행 가능합니다!**

`dagong.co.kr` 도메인을 소유하고 계시다면, 위 가이드를 따라 진행하시면 됩니다.
