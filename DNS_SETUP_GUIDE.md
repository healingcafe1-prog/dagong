# 🌐 dagong.co.kr DNS 설정 가이드

## ✅ 현재 상태

### Pages 프로젝트:
- ✅ 프로젝트명: dagong
- ✅ 배포 완료: https://285fea02.dagong-bi1.pages.dev/
- ✅ dagong.co.kr 커스텀 도메인 등록됨
- ⚠️ 상태: pending (CNAME record not set)

### Cloudflare Zone:
- ✅ 도메인: dagong.co.kr
- ✅ Zone ID: 9bde88dec4e7d52c28ef96d9a5e33e50
- ✅ 네임서버: bjorn.ns.cloudflare.com, sara.ns.cloudflare.com
- ✅ DNS 전파 완료

---

## 🎯 필요한 작업: DNS CNAME 레코드 추가

### Cloudflare 대시보드에서 설정하기:

#### **1단계: Cloudflare DNS 페이지 열기**

**URL:**
```
https://dash.cloudflare.com/9bde88dec4e7d52c28ef96d9a5e33e50/dagong.co.kr/dns/records
```

또는:
1. https://dash.cloudflare.com/ 접속
2. **dagong.co.kr** 도메인 클릭
3. 왼쪽 메뉴에서 **DNS** → **Records** 클릭

---

#### **2단계: CNAME 레코드 추가**

**"Add record" 버튼 클릭**

**설정값:**
```
Type: CNAME
Name: @ (또는 dagong.co.kr)
Target: dagong-bi1.pages.dev
TTL: Auto
Proxy status: Proxied (주황색 구름 아이콘 켜기)
```

**화면 예시:**
```
┌──────────────────────────────────────────┐
│ Add DNS record                            │
├──────────────────────────────────────────┤
│ Type: [CNAME ▼]                          │
│                                           │
│ Name: [@] (or dagong.co.kr)              │
│                                           │
│ Target: [dagong-bi1.pages.dev]           │
│                                           │
│ TTL: [Auto ▼]                            │
│                                           │
│ Proxy status: [🟠] Proxied               │
│                                           │
│ [Cancel]  [Save]                         │
└──────────────────────────────────────────┘
```

---

#### **3단계: www 서브도메인 추가 (선택사항)**

같은 방법으로 하나 더 추가:

```
Type: CNAME
Name: www
Target: dagong-bi1.pages.dev
TTL: Auto
Proxy status: Proxied
```

---

## ⏱️ DNS 전파 및 SSL 발급

### 예상 시간:
- **CNAME 레코드 저장**: 즉시
- **DNS 전파**: 1-5분 (이미 네임서버가 설정되어 있어 빠름)
- **SSL 인증서 발급**: 5-10분 (자동)
- **도메인 상태 active**: 10-15분

### 진행 상황 확인:

**1. DNS 전파 확인:**
```bash
# Google DNS로 확인
curl "https://dns.google/resolve?name=dagong.co.kr&type=CNAME"

# 직접 접속
https://dagong.co.kr/
```

**2. Pages 도메인 상태 확인:**
```
https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/pages/view/dagong
```

**상태 변화:**
```
pending (CNAME record not set) 
    ↓ (CNAME 추가 후)
pending (SSL 발급 중)
    ↓ (5-10분 후)
active (정상 작동)
```

---

## 🚀 완료 후 접속 가능한 URL

### 즉시 접속 가능 (현재):
```
✅ https://dagong-bi1.pages.dev/
✅ https://285fea02.dagong-bi1.pages.dev/
```

### DNS 설정 후 접속 가능 (10-15분 후):
```
🔄 https://dagong.co.kr/
🔄 https://www.dagong.co.kr/ (www 설정 시)
```

---

## 🔍 문제 해결

### CNAME 추가가 안 되는 경우:

**문제 1: "A record already exists"**
- 기존 A 레코드를 삭제하고 CNAME 추가
- 또는 A 레코드를 Cloudflare Pages IP로 변경

**문제 2: "CNAME and other records conflict"**
- @ 이름으로 다른 레코드(MX, TXT 등)가 있는지 확인
- CNAME은 다른 레코드와 함께 사용 불가
- 다른 레코드를 삭제하거나 subdomain으로 변경

**문제 3: 권한 오류**
- Cloudflare 계정에 dagong.co.kr 편집 권한 확인
- 다른 계정으로 로그인되어 있는지 확인

---

## ✅ 완료 체크리스트

- [ ] Cloudflare DNS 페이지 접속
- [ ] "Add record" 클릭
- [ ] CNAME 레코드 추가:
  - [ ] Type: CNAME
  - [ ] Name: @
  - [ ] Target: dagong-bi1.pages.dev
  - [ ] Proxy: Proxied (켜기)
- [ ] "Save" 클릭
- [ ] (선택) www CNAME 추가
- [ ] 5-10분 대기
- [ ] https://dagong.co.kr/ 접속 테스트

---

## 📞 다음 단계

**CNAME 레코드를 추가하셨으면:**
1. 저에게 "DNS 설정 완료"라고 알려주세요
2. 5-10분 후 도메인 상태 확인
3. https://dagong.co.kr/ 접속 테스트

**도움이 필요하시면:**
- 스크린샷을 공유해주세요
- 에러 메시지를 알려주세요
- 제가 다른 방법을 찾아드리겠습니다

---

생성 시간: 2026-02-05 04:48 UTC
도메인: dagong.co.kr
Target: dagong-bi1.pages.dev
Zone ID: 9bde88dec4e7d52c28ef96d9a5e33e50
