# ✅ dagong.co.kr 도메인 연결 작업 현황

**날짜:** 2026-02-23  
**프로젝트:** 다공 (dagong)  
**작업자:** AI Assistant  
**Git 커밋:** aa3a8a7

---

## 🎯 작업 목표

Instagram, 블로그, 카페 등에서 사용할 수 있는 **짧고 전문적인 도메인**을 웹사이트에 연결

**변경:**
- ❌ 기존: `dagong-bi1.pages.dev` (임시 도메인)
- ✅ 목표: `dagong.co.kr` (커스텀 도메인)

---

## ✅ 완료된 작업

### 1. **Cloudflare API 인증 설정** ✅
- API 토큰 수신: `LXGOucsvl4mhyD8_WGhe_icWYUkyWkDwN4wZKjN8`
- 계정 확인: `healingcafe1@gmail.com`
- Account ID: `ecc65d2ec1ecc2222db7937965158511`

### 2. **도메인 상태 확인** ✅
- **dagong.co.kr**: 이미 Cloudflare에 등록됨
- **네임서버**: `sara.ns.cloudflare.com`, `bjorn.ns.cloudflare.com`
- **www.dagong.co.kr**: IP 할당됨 (172.67.144.119, 104.21.47.48)
- **Pages 프로젝트**: `dagong` 존재 확인
- **커스텀 도메인**: `dagong.co.kr` 이미 추가되었으나 **"deactivated" 상태**

### 3. **메타 태그 업데이트** ✅ (이전 작업)
- `src/renderer.tsx` 파일에서 메타 태그 수정 완료
- canonical, og:url, og:image, twitter:image 모두 `dagong-bi1.pages.dev`로 변경
- Git 커밋: b8a449c

### 4. **문서 생성** ✅
생성된 가이드 문서:
1. `CLOUDFLARE_API_TOKEN_GUIDE.md` - API 토큰 생성 가이드
2. `DAGONG_DOMAIN_ACTIVATION_GUIDE.md` - 도메인 활성화 가이드 ⭐

---

## ⏳ 진행 중인 작업

### **dagong.co.kr 도메인 활성화 대기 중**

**현재 상태:**
```json
{
  "name": "dagong.co.kr",
  "status": "deactivated",
  "verification_data": {"status": "deactivated"},
  "validation_data": {"status": "active", "method": "http"}
}
```

**문제:**
- Cloudflare Pages에 도메인이 추가되어 있지만 비활성화 상태
- API를 통한 활성화 시도 실패 (권한 문제)

**해결 방법:**
👉 **Cloudflare 대시보드에서 수동 설정 필요**

---

## 🚀 다음 단계 (수동 작업 필요)

### **단계 1: Cloudflare 대시보드 접속**
```
https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/pages/view/dagong
```

### **단계 2: Custom domains 탭 이동**
1. "Custom domains" 클릭
2. `dagong.co.kr` 찾기

### **단계 3: 도메인 재설정**
- **Option A**: 기존 도메인 제거 → 다시 추가
- **Option B**: 직접 "Add a custom domain" → `dagong.co.kr` 입력

### **단계 4: DNS 자동 설정 확인**
Cloudflare가 자동으로 CNAME 레코드 생성:
```
Type: CNAME
Name: @
Target: dagong-bi1.pages.dev
Proxy: ON
```

### **단계 5: SSL 인증서 대기**
- 1~5분 소요
- Status: "Pending" → "Active"

### **단계 6: 접속 테스트**
```bash
# 브라우저에서
https://dagong.co.kr

# 또는 터미널에서
curl -I https://dagong.co.kr
```

---

## 📋 완료 후 추가 작업

### **1. 메타 태그 재변경 필요 ⚠️**

현재 메타 태그는 `dagong-bi1.pages.dev`로 설정되어 있습니다.  
도메인 활성화 후 `dagong.co.kr`로 다시 변경해야 합니다:

**변경 필요 파일:** `src/renderer.tsx`

**변경할 내용:**
```typescript
// 현재 (임시)
<link rel="canonical" href="https://dagong-bi1.pages.dev/" />
<meta property="og:url" content="https://dagong-bi1.pages.dev/" />

// 변경 후
<link rel="canonical" href="https://dagong.co.kr/" />
<meta property="og:url" content="https://dagong.co.kr/" />
```

### **2. 사이트 재배포**
```bash
cd /home/user/webapp
export CLOUDFLARE_API_TOKEN="LXGOucsvl4mhyD8_WGhe_icWYUkyWkDwN4wZKjN8"
npm run deploy
```

### **3. Instagram 링크 업데이트**
- Instagram 앱 → 프로필 → 프로필 수정
- 웹사이트: `https://dagong.co.kr` 또는 `dagong.co.kr`

### **4. Google Search Console 재설정**
1. 새 속성 추가: `https://dagong.co.kr`
2. 소유권 확인: HTML 파일 (`googleee4e97dad940b617.html`)
3. Sitemap 제출: `https://dagong.co.kr/sitemap.xml`

### **5. 기존 색인 요청 (2026-02-23 이후)**
- 할당량 초과했던 페이지들 색인 재요청
- 새 도메인으로 색인 제출

---

## 🔗 주요 링크

### **Cloudflare 대시보드**
- **Pages 프로젝트:** https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/pages/view/dagong
- **DNS 설정:** https://dash.cloudflare.com/9bde88dec4e7d52c28ef96d9a5e33e50/dagong.co.kr/dns
- **SSL/TLS 설정:** https://dash.cloudflare.com/9bde88dec4e7d52c28ef96d9a5e33e50/dagong.co.kr/ssl-tls

### **프로젝트 링크**
- **현재 사이트:** https://dagong-bi1.pages.dev/
- **목표 사이트:** https://dagong.co.kr/ (활성화 대기 중)
- **GitHub:** https://github.com/healingcafe1-prog/dagong
- **Instagram:** https://www.instagram.com/korea_teacraft/

### **Google Search Console**
- **현재 속성:** https://search.google.com/search-console (dagong-bi1.pages.dev)
- **추가 필요:** https://dagong.co.kr (도메인 활성화 후)

---

## 📊 예상 타임라인

| 작업 | 소요 시간 | 상태 |
|------|----------|------|
| Cloudflare 대시보드 로그인 | 1분 | ⏳ 대기 |
| Custom domains 도메인 재설정 | 2분 | ⏳ 대기 |
| DNS 자동 설정 확인 | 1분 | ⏳ 대기 |
| SSL 인증서 발급 대기 | 1~5분 | ⏳ 대기 |
| 도메인 접속 테스트 | 1분 | ⏳ 대기 |
| 메타 태그 수정 | 2분 | ⏳ 대기 |
| 사이트 재배포 | 2~3분 | ⏳ 대기 |
| Instagram 링크 업데이트 | 1분 | ⏳ 대기 |
| **총 소요 시간** | **15~20분** | **진행 예정** |

---

## ✅ 체크리스트

### **즉시 수행 (사용자)**
- [ ] Cloudflare 대시보드 로그인
- [ ] dagong Pages 프로젝트 → Custom domains 이동
- [ ] dagong.co.kr 도메인 재설정 (제거 후 재추가)
- [ ] DNS 자동 설정 확인
- [ ] SSL 인증서 발급 대기 (1~5분)
- [ ] 브라우저에서 https://dagong.co.kr 접속 테스트
- [ ] "도메인 활성화 완료" 알림

### **이후 작업 (AI Assistant)**
- [ ] 메타 태그를 dagong.co.kr로 변경
- [ ] 사이트 재배포
- [ ] Instagram 링크 테스트 안내
- [ ] Google Search Console 재설정 안내
- [ ] 마케팅 자료 업데이트 (블로그, 카페 링크)

---

## 🎁 완료 시 혜택

### **브랜딩**
- ✅ 짧고 기억하기 쉬운 도메인
- ✅ 전문적인 이미지
- ✅ 신뢰도 향상

### **마케팅**
- ✅ Instagram 프로필 링크: `dagong.co.kr`
- ✅ 네이버 블로그 링크: `dagong.co.kr`
- ✅ 카카오톡 공유 링크: `dagong.co.kr`
- ✅ 명함, 전단지 등 인쇄물에 사용 가능

### **SEO**
- ✅ 도메인 권위 향상
- ✅ Google 검색 순위 개선
- ✅ 백링크 집중화

### **분석**
- ✅ 트래픽 추적 용이
- ✅ 링크 클릭 통계 수집
- ✅ 마케팅 ROI 측정

---

## 📞 다음 단계

**도메인 활성화 완료 후 알려주세요!**

스크린샷 또는 메시지:
- "dagong.co.kr 활성화 완료했습니다"
- Custom domains 탭 스크린샷 (Status: Active)
- 브라우저에서 https://dagong.co.kr 접속 스크린샷

그러면 즉시:
1. 메타 태그 수정
2. 사이트 재배포
3. Instagram 링크 테스트
4. 최종 확인 및 마무리

작업을 진행하겠습니다! 🚀

---

**생성 파일:**
- `/home/user/webapp/CLOUDFLARE_API_TOKEN_GUIDE.md`
- `/home/user/webapp/DAGONG_DOMAIN_ACTIVATION_GUIDE.md`
- `/home/user/webapp/DAGONG_DOMAIN_STATUS.md` (이 파일)

**Git 커밋:** aa3a8a7  
**GitHub:** https://github.com/healingcafe1-prog/dagong
