# 🌐 다공 커스텀 도메인 설정 가이드

**목표**: `dagong.co.kr` 도메인을 Cloudflare Pages에 연결  
**작성일**: 2026-02-22  
**예상 소요**: 30분 (도메인 구매) + 10분 (연결) = 40분

---

## 🎯 **왜 커스텀 도메인이 필요한가?**

### **현재 상황**
- **임시 도메인**: `dagong-bi1.pages.dev`
- **문제점**:
  - ❌ 길고 복잡함
  - ❌ 전문적이지 않음 (.pages.dev)
  - ❌ 기억하기 어려움
  - ❌ 마케팅 자료에 부적합

### **커스텀 도메인 장점**
- ✅ **짧고 명확**: `dagong.co.kr`
- ✅ **브랜드 일치**: 다공(茶工)
- ✅ **전문성**: 독립 도메인
- ✅ **마케팅 친화적**: Instagram, 블로그, 명함
- ✅ **SEO 유리**: Google 검색 노출 상승
- ✅ **신뢰도**: 고객 신뢰 증가

---

## 📝 **1단계: 도메인 구매**

### **추천 도메인 등록업체**

#### **옵션 1: 가비아 (국내 1위) ⭐ 추천**
- **사이트**: https://www.gabia.com
- **가격**: `.co.kr` 약 20,000원/년
- **장점**: 
  - 한국어 지원
  - 빠른 고객 지원
  - 간편한 관리
  - 신용카드/계좌이체 가능

#### **옵션 2: Cloudflare Registrar**
- **사이트**: https://www.cloudflare.com/products/registrar/
- **가격**: `.kr` 도메인 미지원 ❌
- **장점**: 원가 판매 (마진 없음)
- **단점**: `.co.kr` 구매 불가

#### **옵션 3: 후이즈**
- **사이트**: https://www.whois.co.kr
- **가격**: `.co.kr` 약 18,000원/년
- **장점**: 저렴한 가격

---

### **도메인 구매 절차 (가비아 기준)**

#### **Step 1: 가비아 접속**
```
https://www.gabia.com
→ 상단 메뉴 "도메인"
→ "도메인 등록"
```

#### **Step 2: 도메인 검색**
```
검색창에 입력: dagong.co.kr
→ "검색" 클릭
→ ✅ "등록 가능" 확인
```

#### **Step 3: 도메인 등록**
```
"장바구니 담기" 클릭
→ 등록 기간 선택 (1년 추천)
→ 결제 진행
→ 약 20,000원
```

#### **Step 4: 도메인 소유 확인**
```
가비아 로그인
→ "My가비아"
→ "서비스 관리"
→ "도메인" 탭
→ ✅ dagong.co.kr 확인
```

**예상 소요 시간**: 10~30분

---

## 🔗 **2단계: Cloudflare Pages에 커스텀 도메인 연결**

### **방법 A: Cloudflare Dashboard 사용 (추천)**

#### **Step 1: Cloudflare Pages 접속**
```
https://dash.cloudflare.com/
→ 로그인
→ "Pages" 클릭
→ "dagong" 프로젝트 선택
```

#### **Step 2: 커스텀 도메인 추가**
```
"Custom domains" 탭 클릭
→ "Set up a custom domain" 버튼 클릭
→ 입력: dagong.co.kr
→ "Continue" 클릭
```

#### **Step 3: DNS 레코드 설정**

Cloudflare가 제공하는 DNS 레코드를 가비아에 추가:

**표시될 정보**:
```
Type: CNAME
Name: dagong.co.kr (또는 @)
Value: dagong-bi1.pages.dev
```

---

### **방법 B: 가비아 DNS 설정**

#### **Step 1: 가비아 DNS 관리**
```
My가비아 → 도메인 → dagong.co.kr
→ "관리" 버튼 클릭
→ "DNS 정보" 탭
→ "DNS 설정" 버튼
```

#### **Step 2: DNS 레코드 추가**

**레코드 1: CNAME (www 서브도메인)**
```
타입: CNAME
호스트: www
값: dagong-bi1.pages.dev
TTL: 3600
```

**레코드 2: A 레코드 (루트 도메인)**
```
타입: A
호스트: @
값: (Cloudflare가 제공하는 IP)
TTL: 3600
```

**또는 CNAME Flattening 사용**:
```
타입: CNAME
호스트: @
값: dagong-bi1.pages.dev
TTL: 3600
```

#### **Step 3: 저장 및 적용**
```
"저장" 버튼 클릭
→ DNS 전파 대기 (10분~24시간)
```

---

### **방법 C: Cloudflare를 DNS 서버로 변경 (최고 성능) ⭐**

#### **장점**
- ✅ 가장 빠른 DNS
- ✅ 무료 SSL/TLS
- ✅ DDoS 보호
- ✅ 캐싱 최적화
- ✅ 자동 설정

#### **Step 1: Cloudflare에 도메인 추가**
```
https://dash.cloudflare.com/
→ "Add a site" 클릭
→ 입력: dagong.co.kr
→ "Add site" 클릭
→ 플랜 선택: "Free" (무료)
→ "Continue" 클릭
```

#### **Step 2: DNS 레코드 자동 스캔**
```
Cloudflare가 자동으로 DNS 레코드 스캔
→ "Continue" 클릭
```

#### **Step 3: 네임서버 변경**

**Cloudflare가 제공하는 네임서버** (예시):
```
네임서버 1: adrian.ns.cloudflare.com
네임서버 2: bonnie.ns.cloudflare.com
```

**가비아에서 변경**:
```
My가비아 → 도메인 → dagong.co.kr
→ "관리" 버튼
→ "네임서버 설정"
→ "다른 네임서버 사용" 선택
→ 위 네임서버 2개 입력
→ "저장" 클릭
```

#### **Step 4: Cloudflare에서 확인**
```
Cloudflare Dashboard
→ "Done, check nameservers" 클릭
→ 네임서버 전파 대기 (10분~24시간)
→ ✅ "Status: Active" 확인
```

#### **Step 5: Pages 프로젝트에 도메인 추가**
```
Cloudflare Dashboard
→ "Pages" → "dagong"
→ "Custom domains" 탭
→ "Set up a custom domain"
→ 입력: dagong.co.kr
→ 자동으로 DNS 레코드 추가됨 ✅
```

**예상 소요 시간**: 10분 (설정) + 10분~24시간 (전파)

---

## 🔧 **3단계: 소스 코드 업데이트**

도메인 연결 후 메타 태그를 다시 `dagong.co.kr`로 변경:

### **파일 수정: `src/renderer.tsx`**

```tsx
// 변경 전 (현재)
<link rel="canonical" href="https://dagong-bi1.pages.dev/" />
<meta property="og:url" content="https://dagong-bi1.pages.dev/" />
<meta property="og:image" content="https://dagong-bi1.pages.dev/static/icons/icon-512x512.png" />
<meta property="twitter:image" content="https://dagong-bi1.pages.dev/static/icons/icon-512x512.png" />
<meta property="article:publisher" content="https://dagong-bi1.pages.dev" />

// 변경 후 (도메인 연결 후)
<link rel="canonical" href="https://dagong.co.kr/" />
<meta property="og:url" content="https://dagong.co.kr/" />
<meta property="og:image" content="https://dagong.co.kr/static/icons/icon-512x512.png" />
<meta property="twitter:image" content="https://dagong.co.kr/static/icons/icon-512x512.png" />
<meta property="article:publisher" content="https://dagong.co.kr" />
```

### **빌드 및 배포**
```bash
cd /home/user/webapp
npm run build
npm run deploy
```

---

## ✅ **4단계: 확인 및 테스트**

### **DNS 전파 확인**
```bash
# 터미널에서 실행
nslookup dagong.co.kr

# 기대 결과:
# Name: dagong.co.kr
# Address: [Cloudflare IP]
```

### **웹사이트 접속 테스트**
```
브라우저에서 접속:
https://dagong.co.kr

✅ 정상 로딩 확인
```

### **SSL 인증서 확인**
```
브라우저 주소창 왼쪽 자물쇠 아이콘 클릭
→ "연결이 안전함" 확인
→ 인증서 발급자: Cloudflare
```

### **리다이렉트 설정 (옵션)**
```
www.dagong.co.kr → dagong.co.kr 자동 리다이렉트
dagong-bi1.pages.dev → dagong.co.kr 자동 리다이렉트
```

---

## 📱 **5단계: Instagram 링크 업데이트**

### **프로필 링크 변경**
```
Instagram 앱 → 프로필 → "프로필 수정"
→ "웹사이트" 필드
→ 기존: https://dagong-bi1.pages.dev
→ 새로운: https://dagong.co.kr
→ "완료" 클릭
```

### **테스트**
```
프로필 링크 클릭
→ ✅ https://dagong.co.kr 정상 접속
→ ✅ 짧고 전문적인 URL!
```

---

## 💰 **비용 요약**

| 항목 | 비용 | 주기 |
|------|------|------|
| `.co.kr` 도메인 (가비아) | 약 20,000원 | 연간 |
| Cloudflare Pages | **무료** | - |
| Cloudflare DNS | **무료** | - |
| SSL 인증서 | **무료** | - |
| **총 비용** | **약 20,000원/년** | - |

**월 비용**: 약 1,667원 🎉

---

## ⏱️ **소요 시간**

| 단계 | 소요 시간 |
|------|----------|
| 도메인 구매 | 10~30분 |
| DNS 설정 | 5~10분 |
| DNS 전파 대기 | 10분~24시간 |
| 소스 코드 수정 | 5분 |
| 빌드 & 배포 | 3분 |
| Instagram 업데이트 | 1분 |
| **총 예상 시간** | **20~30분 (작업) + 10분~24시간 (전파)** |

**실제 작업 시간**: 약 30분  
**대기 시간**: 대부분 10분~1시간 내 완료

---

## 🚀 **권장 실행 순서**

### **즉시 실행 (30분)**
1. ✅ 가비아에서 `dagong.co.kr` 도메인 구매
2. ✅ Cloudflare에 사이트 추가
3. ✅ 가비아에서 네임서버 변경
4. ✅ Cloudflare Pages에 커스텀 도메인 추가

### **10분~1시간 대기**
- DNS 전파 대기
- `https://dagong.co.kr` 접속 테스트

### **도메인 작동 확인 후 (5분)**
1. ✅ `src/renderer.tsx` 메타 태그 수정
2. ✅ `npm run build && npm run deploy`
3. ✅ Instagram 프로필 링크 업데이트

---

## 📊 **도메인 vs 임시 URL 비교**

| 항목 | dagong-bi1.pages.dev | dagong.co.kr |
|------|---------------------|--------------|
| **길이** | 23자 | 13자 ✅ |
| **기억하기** | 어려움 | 쉬움 ✅ |
| **전문성** | 낮음 (.pages.dev) | 높음 (.co.kr) ✅ |
| **브랜딩** | 불일치 | 일치 ✅ |
| **마케팅** | 부적합 | 적합 ✅ |
| **SEO** | 보통 | 우수 ✅ |
| **비용** | 무료 | 20,000원/년 |

---

## 🎯 **즉시 시작 체크리스트**

- [ ] 가비아 회원가입 (https://www.gabia.com)
- [ ] `dagong.co.kr` 도메인 검색
- [ ] 도메인 구매 (약 20,000원)
- [ ] Cloudflare에 사이트 추가
- [ ] 네임서버 변경
- [ ] DNS 전파 대기 (10분~1시간)
- [ ] Cloudflare Pages 커스텀 도메인 추가
- [ ] 소스 코드 메타 태그 수정
- [ ] 빌드 & 배포
- [ ] Instagram 프로필 링크 변경
- [ ] 모든 마케팅 자료 URL 업데이트

---

## 🔗 **관련 링크**

- **가비아**: https://www.gabia.com
- **후이즈**: https://www.whois.co.kr
- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **Cloudflare Pages 문서**: https://developers.cloudflare.com/pages/
- **DNS 전파 확인**: https://www.whatsmydns.net/

---

## 💡 **추가 팁**

### **도메인 보호**
- ✅ WHOIS 정보 비공개 (가비아 기본 제공)
- ✅ 도메인 잠금 설정
- ✅ 자동 갱신 활성화

### **SEO 최적화**
- ✅ Google Search Console에 `dagong.co.kr` 추가
- ✅ Naver Webmaster에 `dagong.co.kr` 추가
- ✅ 기존 `dagong-bi1.pages.dev` → `dagong.co.kr` 301 리다이렉트

### **마케팅 활용**
- ✅ 명함에 `dagong.co.kr` 인쇄
- ✅ Instagram, 블로그, 카페에 `dagong.co.kr` 공유
- ✅ 이메일 서명에 `dagong.co.kr` 추가

---

**작성일**: 2026-02-22  
**작성자**: 다공 개발팀  
**예상 비용**: 20,000원/년  
**예상 시간**: 30분 (작업) + 10분~1시간 (DNS 전파)
