# 🚀 Cloudflare Pages GitHub 자동 배포 설정 가이드

생성일시: 2026-02-06 10:15 UTC  
상태: **Git 연동 대기 중**

---

## 🎯 목표

**기존 dagong 프로젝트**는 수동 업로드 방식입니다.  
**GitHub 자동 배포**를 위해 새 프로젝트를 Git 연동으로 생성합니다!

---

## 📋 설정 방법

### **1단계: Cloudflare Dashboard 접속**

👉 **https://dash.cloudflare.com**

---

### **2단계: Workers & Pages로 이동**

1. 왼쪽 사이드바에서 **"Workers & Pages"** 클릭
2. 또는 직접 링크: https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/workers-and-pages

---

### **3단계: Create application 클릭**

**Workers & Pages** 메인 페이지에서:
1. **"Create application"** 버튼 클릭 (파란색 버튼)

---

### **4단계: Connect to Git 선택**

1. **"Pages"** 탭 선택
2. **"Connect to Git"** 클릭 ⬅️ **중요!**

---

### **5단계: GitHub 연동**

1. **"Connect GitHub"** 클릭
2. **GitHub 로그인** (팝업 창)
3. **권한 허용** (Cloudflare Pages 앱 승인)
4. **저장소 선택**: `healingcafe1-prog/dagong` 찾아서 선택

---

### **6단계: 프로젝트 설정**

```
Project name: dagong-git (또는 dagong)
Production branch: main

Build settings:
Framework preset: None (또는 Vite)
Build command: npm run build
Build output directory: dist
Root directory: (비워둠)
```

---

### **7단계: Environment Variables 설정**

**중요: D1 Database 바인딩 추가**

1. **"Add binding"** 클릭
2. **Type**: D1 Database
3. **Variable name**: `DB` (대문자!)
4. **D1 database**: `webapp-production` 선택
5. **"Save"** 클릭

---

### **8단계: Save and Deploy**

1. **"Save and Deploy"** 클릭
2. 배포 진행 상황 확인 (약 2-3분)
3. 배포 완료 시 URL 표시됨

---

## ✅ 배포 완료 후

### **새 프로젝트 URL:**
```
✅ https://dagong-git.pages.dev (또는 선택한 이름)
```

### **테스트:**
```bash
curl https://dagong-git.pages.dev/api/products
```

### **자동 배포 테스트:**
```bash
# 코드 수정
git add .
git commit -m "테스트 커밋"
git push

# Cloudflare가 자동으로 배포! 🚀
```

---

## 🔄 기존 프로젝트 처리

### **옵션 A: 기존 프로젝트 삭제 (권장)**

1. 새 프로젝트 배포 확인
2. **dagong** (수동 업로드) 삭제
3. 새 프로젝트 이름을 **dagong**으로 변경

### **옵션 B: 도메인 이전**

1. 기존 **dagong.co.kr** 도메인을 새 프로젝트로 연결
2. Custom domains → Add domain → `dagong.co.kr`
3. 기존 프로젝트는 백업용으로 유지

---

## 📊 설정 비교

| 항목 | 기존 dagong (수동) | 새 dagong-git (자동) |
|------|-------------------|---------------------|
| 배포 방식 | 수동 업로드 | Git 자동 배포 ✅ |
| GitHub 연동 | ❌ 없음 | ✅ 있음 |
| 배포 히스토리 | ❌ 제한적 | ✅ 완전 추적 |
| 롤백 | ❌ 어려움 | ✅ 쉬움 |
| 팀 협업 | ❌ 불편 | ✅ 편리 |

---

## 🎯 다음 단계

1. **Workers & Pages** 메인으로 이동
2. **"Create application"** 클릭
3. **"Connect to Git"** 선택
4. GitHub 연동 완료
5. 자동 배포 테스트! 🚀

---

## 🔗 유용한 링크

- **GitHub 저장소**: https://github.com/healingcafe1-prog/dagong
- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **Workers & Pages**: https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/workers-and-pages

---

## 💬 도움말

**진행 중 문제가 생기면:**
1. 스크린샷 공유
2. 오류 메시지 전달
3. 제가 단계별로 안내해드립니다! 😊

**완료하시면:**
- "완료했어!" 라고 말씀해주세요!
- 자동 배포 테스트를 진행하겠습니다!
