# 🚨 "속성에 URL이 없음" 오류 해결 가이드

**오류 메시지**: "속성에 URL이 없음. 먼저 선택한 속성에서 URL을 찾아야서나 속성을 전환하세요."  
**발생 날짜**: 2026-02-22  
**프로젝트**: 다공(茶工)

---

## 🔍 **문제 원인**

### **현재 상태**
- ❌ **잘못 선택된 속성**: `dagong.co.kr` (도메인 속성)
- ✅ **올바른 속성**: `https://dagong-bi1.pages.dev` (URL 접두어 속성)

### **왜 이 오류가 발생했나?**
Google Search Console에는 **2가지 유형의 속성**이 있습니다:

1. **도메인 속성** (Domain Property)
   - 형식: `dagong.co.kr`, `example.com`
   - DNS 인증 필요 (TXT 레코드)
   - 모든 서브도메인, 프로토콜 포함

2. **URL 접두어 속성** (URL-prefix Property) ✅ **우리가 사용**
   - 형식: `https://dagong-bi1.pages.dev`
   - HTML 파일/메타 태그로 인증
   - 특정 URL만 포함

---

## ✅ **해결 방법 (1분 소요)**

### **Step 1: 올바른 속성 선택**

#### **화면 왼쪽 상단 확인**
```
현재 표시:
┌─────────────────────────┐
│  dagong.co.kr      ▼   │  ← 이 부분 클릭!
└─────────────────────────┘
```

#### **클릭 후 드롭다운 메뉴**
```
속성 선택
├─ dagong.co.kr                    ← 현재 선택됨 (잘못됨)
└─ https://dagong-bi1.pages.dev    ← 이것을 선택! ✅
   + 속성 추가
   ⚙ 속성 설정
```

#### **올바른 속성 클릭**
`https://dagong-bi1.pages.dev` 를 찾아서 클릭합니다.

---

### **Step 2: 속성이 목록에 없는 경우**

만약 `https://dagong-bi1.pages.dev` 가 목록에 보이지 않는다면:

#### **A. 속성 추가 필요**

1. **드롭다운 → "속성 추가" 클릭**
2. **속성 유형 선택**:
   - 왼쪽 "도메인" ❌ 선택 안 함
   - 오른쪽 **"URL 접두어"** ✅ 선택
3. **URL 입력**:
   ```
   https://dagong-bi1.pages.dev
   ```
   (https 포함, 마지막 슬래시 없음)
4. **"계속"** 클릭

#### **B. 소유권 확인 (HTML 파일 방식)**

1. **"HTML 파일"** 탭 선택
2. **파일 다운로드** 버튼 클릭
   - 파일명: `googleee4e97dad940b617.html` (또는 다른 이름)
3. **이미 배포됨 확인**:
   ```bash
   # 터미널에서 확인
   curl -s https://dagong-bi1.pages.dev/googleee4e97dad940b617.html
   ```
   - HTTP 200 반환 → 정상 ✅
4. **Google Search Console에서 "확인" 버튼 클릭**
5. **"소유권 확인됨"** 메시지 확인 ✅

---

### **Step 3: 색인 요청 재시도**

속성 선택 후:

1. **상단 검색창 클릭**
2. **URL 입력**:
   ```
   https://dagong-bi1.pages.dev/products
   ```
3. **Enter → "URL 검사" 대기**
4. **"색인 생성 요청"** 클릭
5. **"색인 생성 요청됨"** 확인 ✅

---

## 🔍 **확인 방법**

### **올바른 속성이 선택되었는지 확인**

#### **방법 1: 화면 왼쪽 상단**
```
✅ 올바른 표시:
┌──────────────────────────────────┐
│  https://dagong-bi1.pages.dev  ▼ │
└──────────────────────────────────┘
```

#### **방법 2: URL 검사 결과**
- URL 검사 시 "속성에 URL이 없음" 오류가 **사라짐**
- "URL이 Google에 등록되어 있지 않음" → 정상 (신규 페이지)

#### **방법 3: 개요 페이지**
- 왼쪽 메뉴 → "개요" 클릭
- 그래프와 "실적", "색인 생성" 섹션 표시 → 정상 ✅

---

## 📊 **속성별 차이점**

| 항목 | dagong.co.kr (도메인) | https://dagong-bi1.pages.dev (URL 접두어) |
|------|----------------------|-------------------------------------------|
| **인증 방법** | DNS TXT 레코드 | HTML 파일 / 메타 태그 ✅ |
| **포함 범위** | 모든 서브도메인, http/https | 특정 URL만 |
| **우리 상황** | 도메인 미소유 ❌ | Cloudflare Pages 사용 ✅ |
| **사용 여부** | 사용 불가 | **현재 사용 중** ✅ |

---

## 🚨 **자주 발생하는 실수**

### **실수 1: 도메인 속성 선택**
- ❌ `dagong.co.kr` 선택
- ✅ `https://dagong-bi1.pages.dev` 선택

### **실수 2: URL 형식 오류**
- ❌ `dagong-bi1.pages.dev` (http/https 누락)
- ❌ `https://dagong-bi1.pages.dev/` (마지막 슬래시)
- ✅ `https://dagong-bi1.pages.dev`

### **실수 3: 다른 프로젝트 속성 선택**
- ❌ `body-reset-28.pages.dev` (다른 프로젝트)
- ✅ `dagong-bi1.pages.dev`

---

## 💡 **추가 팁**

### **여러 속성 관리 시**
- 각 프로젝트마다 별도 속성 추가
- 속성 이름에 프로젝트명 태그 추가 (예: "다공 - Cloudflare Pages")

### **도메인 구매 후**
- `dagong.co.kr` 도메인 구매 시
- Cloudflare Pages에 커스텀 도메인 연결
- 새로운 도메인 속성 추가 가능

---

## 🔗 **관련 문서**

- **소유권 확인 가이드**: `/home/user/webapp/GOOGLE_OWNERSHIP_VERIFICATION_GUIDE.md`
- **색인 요청 가이드 (1일차)**: `/home/user/webapp/GOOGLE_REGISTRATION_STEP_BY_STEP.md`
- **색인 요청 가이드 (2일차)**: `/home/user/webapp/INDEXING_REQUEST_GUIDE_DAY2.md`
- **체크리스트**: `/home/user/webapp/INDEXING_CHECKLIST.md`

---

## 📞 **문제가 계속되면**

### **확인 사항**
1. 올바른 Google 계정으로 로그인했는지 확인
2. `https://dagong-bi1.pages.dev` 속성이 목록에 있는지 확인
3. 소유권 확인이 완료되었는지 확인

### **터미널 명령어로 확인**
```bash
# 확인 파일 상태 확인
curl -I https://dagong-bi1.pages.dev/googleee4e97dad940b617.html

# 기대 결과: HTTP/2 200
```

### **재배포 필요 시**
```bash
cd /home/user/webapp
npm run build
npm run deploy
```

---

**작성일**: 2026-02-22  
**작성자**: 다공 개발팀  
**마지막 수정**: 2026-02-22 13:40 UTC
