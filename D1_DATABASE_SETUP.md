# 🔧 D1 Database 설정 문제 해결 가이드

생성일시: 2026-02-06 09:35 UTC  
상태: **Bindings Add 버튼 작동 안 함 - D1 Database 미생성**

---

## ⚠️ 문제 상황

**Cloudflare Pages 배포 성공했지만 페이지 오류 발생**

### **오류 원인:**
- API 요청 500 에러
- D1 Database 바인딩 누락
- Bindings "Add" 버튼 작동 안 함 (Database가 없어서)

### **콘솔 에러:**
```
❌ Failed to load resource: the server responded with a status of 500
❌ 홈 페이지 로드 오류: M
❌ 장바구니 개수 업데이트 오류: SyntaxError
```

---

## 🔧 해결 방법: D1 Database 생성

### **1단계: D1 Database 생성 페이지 접속**

**직접 링크로 이동:**

#### **옵션 A: Storage & Databases**
1. https://dash.cloudflare.com 접속
2. 왼쪽 사이드바에서 **"Storage & Databases"** 클릭
3. **"D1"** 클릭
4. **"Create database"** 클릭

#### **옵션 B: Workers & Pages에서**
1. https://dash.cloudflare.com 접속
2. **"Workers & Pages"** 클릭
3. 상단 탭에서 **"D1"** 찾기
4. **"Create database"** 클릭

#### **옵션 C: 직접 URL (가장 빠름!)**
```
https://dash.cloudflare.com/<ACCOUNT_ID>/workers/d1
```
Account ID: `ecc65d2ec1ecc2222db7937965158511`

**즉시 접속:** 
👉 https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/workers/d1

---

### **2단계: Database 생성**

1. **"Create database"** 버튼 클릭

2. **Database name**: 
   ```
   webapp-production
   ```

3. **"Create"** 클릭

4. **✅ Database ID 복사** (중요!)
   - 형식: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

---

### **3단계: Bindings 설정**

Database 생성 후:

1. **Workers & Pages → dagong** 돌아가기

2. **Settings → Bindings**

3. **"Add" 버튼** 다시 클릭 (이제 작동할 것!)

4. **Binding 설정**:
   ```
   Type: D1 Database
   Variable name: DB
   D1 database: webapp-production (선택)
   ```

5. **"Save"** 클릭

---

### **4단계: 재배포**

Bindings 설정 후:

1. **Settings → Builds & deployments**

2. **"Retrigger deployment"** 클릭
   - 또는 자동으로 재배포됨

3. **배포 완료 대기** (2-3분)

4. **테스트**: https://dagong-bi1.pages.dev

---

## 🗄️ Database 마이그레이션 (선택사항)

D1 Database가 비어있으므로 초기 테이블을 생성해야 할 수 있습니다.

### **방법 A: 로컬 마이그레이션 파일 사용**

프로젝트에 `migrations/` 폴더가 있다면:

1. **Cloudflare Dashboard → D1 → webapp-production**

2. **"Console"** 탭 클릭

3. **마이그레이션 SQL 실행**:
   ```sql
   -- migrations/0001_initial_schema.sql 내용 복사
   -- 또는 필요한 테이블 생성 SQL
   ```

### **방법 B: 간단한 테스트 데이터**

```sql
-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 상품 테이블
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📊 설정 완료 체크리스트

- [ ] D1 Database 생성 (`webapp-production`)
- [ ] Database ID 확인 및 복사
- [ ] Bindings 추가 (Variable: `DB`, Database: `webapp-production`)
- [ ] 재배포 트리거
- [ ] 배포 완료 확인
- [ ] https://dagong-bi1.pages.dev 테스트
- [ ] API 엔드포인트 테스트 (예: `/api/products`)
- [ ] 콘솔 에러 사라짐 확인

---

## 🔗 유용한 링크

- **D1 Database 생성**: https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/workers/d1
- **dagong 프로젝트 설정**: https://dash.cloudflare.com/ecc65d2ec1ecc2222db7937965158511/pages/view/dagong/settings
- **배포된 사이트**: https://dagong-bi1.pages.dev

---

## 🎯 다음 단계

1. ✅ **D1 Database 생성** (위 링크 사용)
2. ✅ **Bindings 설정** (DB 바인딩 추가)
3. ✅ **재배포** (자동 또는 수동)
4. ✅ **테스트** (페이지 정상 작동 확인)
5. ✅ **GitHub 자동 배포 연동** (마지막 단계)

---

## 💬 진행 상황 공유

완료하시면:
- "D1 생성했어"
- "Bindings 설정 완료"
- "재배포 완료"

알려주시면 다음 단계를 안내해드리겠습니다! 😊

---

**빠른 시작: 위의 D1 생성 링크를 클릭하여 Database를 먼저 만들어주세요!** 🚀
