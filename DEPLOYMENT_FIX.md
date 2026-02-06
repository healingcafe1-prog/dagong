# 🚀 배포 문제 해결 가이드

생성일시: 2026-02-06 10:30 UTC  
상태: **자동 배포 설정 및 오류 수정**

---

## ⚠️ 문제 확인

### **1. 자동 배포 실패**
- **증상**: Build failed - Workers 명령어 사용 오류
- **원인**: 빌드 명령어가 잘못 설정됨
- **해결**: Builds & deployments 설정 수정

### **2. 메인 페이지 오류**
- **증상**: "페이지를 불러오는 중 오류가 발생했습니다"
- **원인**: D1 Database 바인딩 미설정 또는 API 오류
- **해결**: D1 바인딩 확인 및 재배포

---

## 🔧 해결 방법

### **Step 1: Builds & deployments 설정**

#### **현재 화면에서:**

1. **왼쪽 사이드바 확인**
   - 현재: Variables and Secrets, **Bindings**, Runtime, General
   - 필요: **"Builds & deployments"** 메뉴

2. **왼쪽 사이드바를 위로 스크롤**
   - "Builds & deployments" 찾기
   - 또는 "Source" 메뉴 찾기

3. **"Builds & deployments" 클릭**

---

### **Step 2: 빌드 설정 수정**

**올바른 설정:**

```
Framework preset: None (또는 Vite)
Build command: npm run build
Build output directory: dist
Root directory: (비워둠)
Node.js version: 18 이상
```

**주의사항:**
- ❌ `npm run deploy` (X)
- ❌ `wrangler deploy` (X)
- ❌ `wrangler pages deploy` (X)
- ✅ `npm run build` (O)

---

### **Step 3: D1 바인딩 확인**

**현재 Bindings 설정 확인됨:**
- ✅ Type: D1 database
- ✅ Name: DB
- ✅ Value: webapp-production

**이 설정은 정상입니다!**

---

## 🎯 즉시 실행할 작업

### **A. Cloudflare Dashboard 설정 (필수)**

1. **왼쪽 사이드바 스크롤**
   - "Builds & deployments" 찾기

2. **빌드 설정 수정**
   ```
   Build command: npm run build
   Build output directory: dist
   ```

3. **"Save" 클릭**

4. **"Retry build" 또는 "Redeploy" 클릭**

---

### **B. 로컬에서 빌드 테스트 (옵션)**

```bash
# 로컬 빌드 테스트
cd /home/user/webapp
npm run build

# 결과 확인
ls -lh dist/

# 로컬 서버 테스트
npm run preview
```

---

## 📋 체크리스트

### **자동 배포 설정:**
- [ ] Builds & deployments 메뉴 찾기
- [ ] Build command: `npm run build` 설정
- [ ] Build output directory: `dist` 확인
- [ ] Save 클릭
- [ ] Retry build 클릭
- [ ] 배포 성공 확인

### **D1 바인딩 확인:**
- [x] D1 database 바인딩 존재 (webapp-production)
- [x] Variable name: DB
- [x] Database ID: ef76dccd-be5f-476b-851c-f9503f18dd53
- [ ] 재배포 후 API 테스트

---

## 🚨 일반적인 오류 해결

### **오류 1: "Build failed - Workers command"**

**원인:**
```
[ERROR] It looks like you've run a Workers-specific command in a Pages project.
```

**해결:**
- Builds & deployments → Build command 변경
- `wrangler deploy` → `npm run build`

---

### **오류 2: "페이지를 불러오는 중 오류"**

**원인:**
1. D1 바인딩 미설정
2. 테이블 없음
3. API 코드 오류

**해결:**
```bash
# 1. D1 바인딩 확인 (Bindings 탭)
# 2. 테이블 확인 (D1 Console)
# 3. API 테스트
curl https://dagong-bi1.pages.dev/api/products
```

---

### **오류 3: "Internal Server Error"**

**원인:**
- 로그인 필요한 API 호출
- D1 연결 실패

**해결:**
- 배포 로그 확인
- D1 바인딩 재설정

---

## 🔗 유용한 링크

- **Cloudflare Pages**: https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/workers-and-pages
- **D1 Console**: https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/workers/d1/ef76dccd-be5f-476b-851c-f9503f18dd53
- **GitHub**: https://github.com/healingcafe1-prog/dagong

---

## 💬 다음 단계

1. **Builds & deployments** 메뉴 찾기
2. 빌드 설정 수정
3. 재배포
4. 테스트: https://dagong-bi1.pages.dev

**완료하시면 "해결했어!" 라고 말씀해주세요!** 😊
