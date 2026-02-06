# 🔧 dagong.co.kr 접속 불가 문제 해결

## ⚠️ 현재 문제

### 증상:
- ❌ https://dagong.co.kr/ 접속 시 HTTP 406 에러
- ❌ Pages 도메인 상태: pending (CNAME record not set)

### 원인 분석:
1. **DNS CNAME 레코드 미전파**
   - Google DNS 조회 결과: CNAME 레코드 없음
   - A 레코드만 있음 (172.67.144.119, 104.21.47.48)
   
2. **가능한 원인:**
   - CNAME 레코드 저장이 제대로 되지 않음
   - 기존 A 레코드와 충돌
   - CNAME이 A 레코드로 자동 변환되었지만 Pages 연결 안됨

---

## ✅ 해결 방법

### 방법 1: CNAME 레코드 재확인 및 수정

#### 1단계: Cloudflare DNS 페이지 열기
```
https://dash.cloudflare.com/9bde88dec4e7d52c28ef96d9a5e33e50/dagong.co.kr/dns/records
```

#### 2단계: 현재 @ 레코드 확인

**확인할 것:**
```
Type: CNAME 또는 A?
Name: @ 또는 dagong.co.kr
Content: 무엇으로 설정되어 있나?
Proxy: Proxied (주황색 구름)?
```

#### 3단계: 문제별 해결

**Case A: CNAME이 @ → dagong-bi1.pages.dev로 제대로 설정된 경우**
→ Cloudflare가 감지하는데 시간이 더 필요함 (최대 24시간)

**Case B: CNAME이 여전히 "다공.코.크"인 경우**
→ 다시 수정:
```
Type: CNAME
Name: @
Content: dagong-bi1.pages.dev
Proxy: Proxied (주황색)
```

**Case C: A 레코드로 되어 있는 경우**
→ A 레코드 삭제 후 CNAME 추가:
1. @ A 레코드 삭제
2. 새 CNAME 레코드 추가:
   - Type: CNAME
   - Name: @
   - Content: dagong-bi1.pages.dev
   - Proxy: Proxied

---

### 방법 2: Pages에서 도메인 재등록

#### 1단계: 기존 도메인 삭제

**Cloudflare Pages 대시보드:**
```
https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/pages/view/dagong
```

1. **Settings** → **Custom domains** 클릭
2. `dagong.co.kr` 찾기
3. **Remove** 클릭

#### 2단계: DNS CNAME 확인

DNS에 올바른 CNAME이 있는지 확인:
```
Type: CNAME
Name: @
Content: dagong-bi1.pages.dev
Proxy: Proxied
```

#### 3단계: 도메인 다시 추가

**Pages Settings → Custom domains:**
1. **Add domain** 클릭
2. `dagong.co.kr` 입력
3. **Continue** 클릭
4. 자동으로 CNAME 검증

---

### 방법 3: A 레코드 + CNAME Flattening 사용

Cloudflare는 root domain (@)에서 CNAME을 자동으로 A 레코드로 변환합니다 (CNAME Flattening).

#### 이 경우 확인할 것:

1. **Pages 프로젝트 설정 확인:**
   ```
   https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/pages/view/dagong
   ```
   
2. **Custom domains에 dagong.co.kr이 추가되어 있는지 확인**

3. **없다면 수동으로 추가:**
   - Add domain → `dagong.co.kr` 입력

---

## 🔍 진단 명령어

### DNS 레코드 확인:
```bash
# CNAME 확인
curl "https://dns.google/resolve?name=dagong.co.kr&type=CNAME"

# A 레코드 확인
curl "https://dns.google/resolve?name=dagong.co.kr&type=A"

# 전체 레코드 확인
curl "https://dns.google/resolve?name=dagong.co.kr&type=ANY"
```

### Pages 도메인 상태 확인:
```bash
curl -s -X GET \
  "https://api.cloudflare.com/client/v4/accounts/ecc65d2ec1ecc2222db7937965158511/pages/projects/dagong/domains" \
  -H "Authorization: Bearer iEs_pr1yc-VOt0G-6Pp7zsUycUCqqVj_SckB-8D6" \
  | python3 -m json.tool | grep -A 20 "dagong.co.kr"
```

### 접속 테스트:
```bash
# 상태 코드 확인
curl -sI https://dagong.co.kr/ | head -1

# 전체 헤더
curl -sI https://dagong.co.kr/
```

---

## ⚡ 빠른 해결 (추천)

### 지금 바로 확인할 것:

1. **Cloudflare DNS 페이지 열기:**
   ```
   https://dash.cloudflare.com/9bde88dec4e7d52c28ef96d9a5e33e50/dagong.co.kr/dns/records
   ```

2. **@ 레코드 찾기**
   - Type이 CNAME인지 확인
   - Content가 `dagong-bi1.pages.dev`인지 확인
   - Proxy가 Proxied (주황색)인지 확인

3. **잘못되어 있다면:**
   - 수정 또는 삭제 후 재생성
   - **Save** 클릭
   - 5-10분 대기

4. **스크린샷 공유**
   - DNS Records 페이지 스크린샷을 보내주시면
   - 정확한 문제를 파악할 수 있습니다

---

## 📊 정상 상태 예시

### DNS 레코드:
```
┌──────────┬────────┬──────────────────────┬──────────┬────────┐
│ Type     │ Name   │ Content              │ Proxy    │ TTL    │
├──────────┼────────┼──────────────────────┼──────────┼────────┤
│ CNAME    │ @      │ dagong-bi1.pages.dev │ Proxied  │ Auto   │
│ CNAME    │ www    │ dagong-bi1.pages.dev │ Proxied  │ Auto   │
└──────────┴────────┴──────────────────────┴──────────┴────────┘
```

### Pages 도메인 상태:
```json
{
  "name": "dagong.co.kr",
  "status": "active",
  "verification_data": {
    "status": "active"
  },
  "validation_data": {
    "status": "active"
  }
}
```

### 접속 테스트:
```bash
$ curl -sI https://dagong.co.kr/ | head -1
HTTP/2 200
```

---

## 🚀 임시 해결책

**현재 사용 가능한 URL:**
```
✅ https://dagong-bi1.pages.dev/
✅ https://285fea02.dagong-bi1.pages.dev/
```

이 URL들은 정상 작동합니다. dagong.co.kr 문제가 해결될 때까지 이 URL을 사용하세요.

---

생성 시간: 2026-02-05 12:54 UTC
