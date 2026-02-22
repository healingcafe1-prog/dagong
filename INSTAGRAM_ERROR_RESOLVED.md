# 🔧 Instagram 링크 오류 해결 완료 보고서

**날짜**: 2026-02-22  
**문제**: Instagram에서 "이 웹사이트를 읽어들이는 중 문제가 발생했습니다"  
**원인**: HTML 메타 태그에 잘못된 도메인 설정  
**해결**: 메타 태그 URL 수정 및 재배포 필요

---

## 🎯 **문제 원인 발견**

### **발견된 문제**
웹사이트 HTML의 메타 태그에 **존재하지 않는 도메인**이 하드코딩되어 있었습니다:

```html
<!-- ❌ 잘못된 설정 (기존) -->
<link rel="canonical" href="https://dagong.co.kr/" />
<meta property="og:url" content="https://dagong.co.kr/" />
<meta property="og:image" content="https://dagong.co.kr/static/icons/icon-512x512.png" />
<meta property="twitter:image" content="https://dagong.co.kr/static/icons/icon-512x512.png" />
<meta property="article:publisher" content="https://dagong.co.kr" />
```

### **문제 발생 과정**
1. Instagram이 프로필 링크 클릭 시 HTML 메타 태그 읽기
2. `og:url` 태그에서 `https://dagong.co.kr/` 발견
3. Instagram 브라우저가 `dagong.co.kr` 로 리다이렉트 시도
4. **도메인이 존재하지 않아 오류 발생** ❌

---

## ✅ **해결 방법**

### **1. 메타 태그 수정 완료**

파일: `/home/user/webapp/src/renderer.tsx`

```html
<!-- ✅ 수정 완료 (새로운 설정) -->
<link rel="canonical" href="https://dagong-bi1.pages.dev/" />
<meta property="og:url" content="https://dagong-bi1.pages.dev/" />
<meta property="og:image" content="https://dagong-bi1.pages.dev/static/icons/icon-512x512.png" />
<meta property="twitter:image" content="https://dagong-bi1.pages.dev/static/icons/icon-512x512.png" />
<meta property="article:publisher" content="https://dagong-bi1.pages.dev" />
```

### **2. 변경 사항 요약**
| 항목 | 기존 | 수정 후 |
|------|------|---------|
| canonical URL | dagong.co.kr | dagong-bi1.pages.dev ✅ |
| og:url | dagong.co.kr | dagong-bi1.pages.dev ✅ |
| og:image | dagong.co.kr | dagong-bi1.pages.dev ✅ |
| twitter:image | dagong.co.kr | dagong-bi1.pages.dev ✅ |
| article:publisher | dagong.co.kr | dagong-bi1.pages.dev ✅ |

---

## 🚀 **배포 필요**

### **현재 상태**
- ✅ 소스 코드 수정 완료
- ✅ GitHub 커밋 완료 (commit fbc5112)
- ⏳ **Cloudflare Pages 배포 필요**

### **배포 방법**

#### **방법 1: Deploy 탭에서 API 키 설정 후 배포 (추천)**

1. **Deploy 탭 열기**
   ```
   사이드바 → Deploy 탭 클릭
   ```

2. **Cloudflare API 키 설정**
   - "Create API Token" 버튼 클릭
   - 또는 기존 API 키 입력

3. **배포 실행**
   ```bash
   cd /home/user/webapp
   npm run deploy
   ```

4. **배포 완료 확인**
   - 터미널에 "✨ Deployment complete!" 메시지
   - URL: `https://dagong-bi1.pages.dev`

---

#### **방법 2: 수동 배포 (Cloudflare Dashboard)**

1. **Cloudflare Dashboard 접속**
   ```
   https://dash.cloudflare.com/
   ```

2. **Pages → dagong → Settings → Builds & deployments**

3. **"Create deployment" 클릭**

4. **GitHub 연동**
   - Branch: `main`
   - Latest commit: `fbc5112`

5. **배포 완료 대기** (2~3분)

---

## 🔍 **배포 후 확인 방법**

### **1. 메타 태그 확인**
```bash
# 터미널에서 실행
curl -s https://dagong-bi1.pages.dev | grep -i "og:url"
```

**기대 결과**:
```html
<meta property="og:url" content="https://dagong-bi1.pages.dev/" />
```

---

### **2. Instagram 링크 테스트**

#### **A. Instagram 앱에서 직접 테스트**
```
1. Instagram 프로필 → 링크 클릭
2. Instagram 인앱 브라우저에서 열림
3. ✅ 정상 로딩 확인
```

#### **B. Instagram URL Debugger 사용**
```
1. https://developers.facebook.com/tools/debug/ 접속
2. URL 입력: https://dagong-bi1.pages.dev
3. "Debug" 클릭
4. Preview 확인:
   - Title: "다공 - 차와 공예의 직거래 플랫폼"
   - Description: "전통 차와 공예품을 생산자와 직거래..."
   - Image: /static/icons/icon-512x512.png
   - ✅ "No errors found" 확인
```

---

### **3. 외부 브라우저 테스트**
```
Safari/Chrome에서 직접 접속:
https://dagong-bi1.pages.dev

✅ 정상 로딩 확인
```

---

## ⏱️ **예상 소요 시간**

| 단계 | 소요 시간 |
|------|----------|
| 배포 실행 | 2~3분 |
| Cloudflare 캐시 갱신 | 5~10분 |
| Instagram 캐시 갱신 | 10~30분 |
| **총 예상 시간** | **15~45분** |

---

## 🚨 **중요 주의사항**

### **Instagram 캐시 문제**
배포 후에도 Instagram 캐시가 남아있을 수 있습니다:

#### **해결 방법**
```
1. Instagram 앱 캐시 삭제
   - iOS: 설정 → 일반 → iPhone 저장 공간 → Instagram → 앱 오프로드
   - Android: 설정 → 앱 → Instagram → 저장공간 → 캐시 삭제

2. Instagram 앱 재실행

3. 프로필 링크 다시 클릭
```

---

### **Facebook Sharing Debugger 사용**
Instagram은 Facebook과 같은 서버를 사용하므로:

```
1. https://developers.facebook.com/tools/debug/ 접속
2. URL 입력: https://dagong-bi1.pages.dev
3. "Scrape Again" 버튼 클릭 (강제 캐시 갱신)
4. 10~30분 대기
5. Instagram에서 다시 테스트
```

---

## 📊 **문제 해결 타임라인**

### **완료된 작업** ✅
- [x] 문제 원인 진단 (메타 태그 잘못된 도메인)
- [x] 소스 코드 수정 (5개 메타 태그 URL 변경)
- [x] 빌드 성공 (dist/_worker.js 263 KB)
- [x] GitHub 커밋 (fbc5112)

### **대기 중인 작업** ⏳
- [ ] Cloudflare API 키 설정
- [ ] Cloudflare Pages 배포
- [ ] 배포 후 메타 태그 확인
- [ ] Instagram 캐시 삭제
- [ ] Instagram 링크 테스트

---

## 🎯 **다음 단계**

### **즉시 실행 (5분)**
1. **Deploy 탭**에서 Cloudflare API 키 설정
2. **배포 실행**:
   ```bash
   cd /home/user/webapp
   npm run deploy
   ```
3. **배포 완료 확인** (2~3분 대기)

### **배포 후 (15~30분)**
1. Instagram 앱 캐시 삭제
2. Instagram 재실행
3. 프로필 링크 테스트
4. ✅ 정상 작동 확인

---

## 📝 **GitHub 커밋 정보**

```
Commit: fbc5112
Message: 🔧 Instagram 링크 오류 수정 - 메타 태그 URL 변경

Changes:
- canonical URL: dagong.co.kr → dagong-bi1.pages.dev
- og:url: dagong.co.kr → dagong-bi1.pages.dev  
- og:image: dagong.co.kr → dagong-bi1.pages.dev
- twitter:image: dagong.co.kr → dagong-bi1.pages.dev
- article:publisher: dagong.co.kr → dagong-bi1.pages.dev

Files Changed:
- src/renderer.tsx (5 insertions, 5 deletions)

Branch: main
Push: https://github.com/healingcafe1-prog/dagong.git
```

---

## 🔗 **관련 링크**

- **웹사이트**: https://dagong-bi1.pages.dev
- **GitHub**: https://github.com/healingcafe1-prog/dagong
- **Instagram**: https://www.instagram.com/korea_teacraft/
- **Facebook Debug Tool**: https://developers.facebook.com/tools/debug/
- **Cloudflare Dashboard**: https://dash.cloudflare.com/

---

## ✅ **체크리스트**

### **코드 수정**
- [x] 메타 태그 URL 수정
- [x] 빌드 성공
- [x] GitHub 커밋 & 푸시

### **배포**
- [ ] Cloudflare API 키 설정
- [ ] npm run deploy 실행
- [ ] 배포 완료 확인

### **테스트**
- [ ] 메타 태그 확인 (curl)
- [ ] Instagram 캐시 삭제
- [ ] Instagram 링크 테스트
- [ ] 정상 작동 확인

---

**작성일**: 2026-02-22  
**작성자**: 다공 개발팀  
**상태**: 코드 수정 완료, 배포 대기 중  
**다음 작업**: Cloudflare Pages 배포
