# 🔐 Google Search Console 소유권 확인 완벽 가이드

## 📅 작성일: 2026-02-21

---

## 🚨 현재 오류 상태

**스크린샷 오류 메시지**:
```
속성에 URL이 없음
먼저 선택한 속성에서 URL을 찾아야서나 속성을 전환하세요.
```

**원인**: 
- Google Search Console에 속성(사이트)이 추가되지 않았거나
- 소유권 확인이 완료되지 않은 상태

---

## 📋 **올바른 순서**

### 1단계: 속성 추가 (소유권 확인)
### 2단계: 사이트맵 제출
### 3단계: URL 검사 및 색인 요청

---

## 🔐 **1단계: 속성 추가 및 소유권 확인 (상세)**

### Step 1: Google Search Console 접속
1. 브라우저에서 https://search.google.com/search-console 접속
2. Google 계정으로 로그인

### Step 2: 속성 추가
1. 왼쪽 상단 **속성 선택 드롭다운** 클릭
2. **"속성 추가"** 버튼 클릭

**또는**:
- 첫 방문 시 자동으로 "시작하기" 화면 표시

### Step 3: 속성 유형 선택

화면에 **2가지 옵션** 표시:

#### 옵션 1: 도메인 (권장하지 않음)
```
도메인
예: example.com
```
❌ **선택하지 마세요** - DNS 설정 필요 (복잡함)

#### 옵션 2: URL 접두어 (권장) ⭐
```
URL 접두어
예: https://example.com
```
✅ **이것을 선택하세요!**

**입력창에 다음 입력**:
```
https://dagong-bi1.pages.dev
```

**중요**: 
- `https://` 포함 필수
- 끝에 `/` 없이 입력
- 정확히 일치해야 함

**"계속" 버튼 클릭**

---

### Step 4: 소유권 확인 방법 선택

Google이 **여러 확인 방법** 제시:

#### 방법 1: HTML 파일 (가장 쉬움) ⭐⭐⭐

**화면 표시**:
```
HTML 파일
1. 확인 파일 다운로드
   [googleXXXXXXXXXXXXXXXX.html 다운로드]
2. 파일을 https://dagong-bi1.pages.dev/ 에 업로드
3. 브라우저에서 https://dagong-bi1.pages.dev/googleXXXXXX.html 접근 확인
4. 아래 "확인" 클릭
```

**이미 완료된 상태**:
- ✅ 파일: `/home/user/webapp/public/googleee4e97dad940b617.html`
- ✅ 배포: https://dagong-bi1.pages.dev/googleee4e97dad940b617.html (접근 가능)
- ✅ 상태: 200 OK

**조치**:
1. Google Search Console에서 **"확인"** 버튼만 클릭하면 됩니다!

---

#### 방법 2: HTML 태그 (대체 방법)

**화면 표시**:
```
HTML 태그
아래 메타 태그를 사이트 홈페이지의 <head> 섹션에 추가:
<meta name="google-site-verification" content="XXXXXXXXXXXXXX" />
```

**조치** (HTML 파일 방법 실패 시):
1. Google이 제공하는 메타 태그 복사
2. 프로젝트의 `src/index.tsx` 파일 수정
3. `<head>` 섹션에 메타 태그 추가
4. 재배포 후 "확인" 클릭

---

### Step 5: 확인 완료

**"확인" 버튼 클릭 후**:

**성공 시**:
```
✅ 소유권이 확인되었습니다
```
→ Search Console 대시보드로 이동

**실패 시**:
```
❌ 소유권을 확인할 수 없습니다
```
→ 아래 "문제 해결" 섹션 참조

---

## 🛠️ **소유권 확인 문제 해결**

### 문제 1: "확인 파일을 찾을 수 없음"

**원인**: 
- 파일이 배포되지 않음
- 파일 경로 잘못됨
- 캐시 문제

**해결**:
```bash
# 1. 현재 배포 상태 확인
curl -I https://dagong-bi1.pages.dev/googleee4e97dad940b617.html

# 2. 200 OK가 아니면 재배포
cd /home/user/webapp
git add public/googleee4e97dad940b617.html
git commit -m "Google 소유권 확인 파일 추가"
git push origin main
npm run build
npm run deploy

# 3. 5분 대기 후 다시 "확인" 클릭
```

---

### 문제 2: "다른 사용자가 이미 소유권 확인함"

**원인**: 
- 이전에 다른 Google 계정으로 확인함

**해결**:
1. 올바른 Google 계정으로 로그인 확인
2. 또는 다른 확인 방법 시도 (HTML 태그 방식)

---

### 문제 3: "확인이 만료되었습니다"

**원인**: 
- 확인 파일이 삭제됨

**해결**:
1. 확인 파일이 여전히 존재하는지 확인:
   ```bash
   ls -la /home/user/webapp/public/google*.html
   ```
2. 파일 있으면 Search Console에서 "소유권 다시 확인"
3. 파일 없으면 처음부터 다시 시작

---

## 🎯 **지금 즉시 실행할 단계**

### 현재 상황 확인
```bash
# 소유권 확인 파일 존재 여부
ls -la /home/user/webapp/public/google*.html

# 배포 상태 확인
curl -I https://dagong-bi1.pages.dev/googleee4e97dad940b617.html
```

**예상 결과**:
```
-rw-r--r-- 1 user user 73 Feb 21 12:00 /home/user/webapp/public/googleee4e97dad940b617.html

HTTP/2 200
content-type: text/html; charset=utf-8
```

✅ **이미 파일이 배포되어 있습니다!**

---

### 즉시 실행 (순서대로)

#### 1️⃣ Google Search Console 속성 추가
1. https://search.google.com/search-console 접속
2. **왼쪽 상단 속성 드롭다운** → **"속성 추가"**
3. **"URL 접두어"** 선택
4. 입력: `https://dagong-bi1.pages.dev`
5. **"계속"** 클릭

#### 2️⃣ 소유권 확인
1. **"HTML 파일"** 방법 선택
2. Google이 제공하는 파일명 확인:
   - 예: `googleee4e97dad940b617.html`
3. **이미 배포되어 있으므로** "확인" 버튼만 클릭
4. "소유권이 확인되었습니다" 메시지 확인 ✅

#### 3️⃣ 사이트맵 제출
소유권 확인 완료 후:
1. 왼쪽 메뉴 → **"Sitemaps"**
2. **"새 사이트맵 추가"** 입력란에:
   ```
   https://dagong-bi1.pages.dev/sitemap.xml
   ```
3. **"제출"** 클릭

#### 4️⃣ URL 검사 (이제 작동함!)
1. 상단 검색창에 입력:
   ```
   https://dagong-bi1.pages.dev/
   ```
2. **"URL 검사"** 클릭
3. **"색인 생성 요청"** 클릭
4. 주요 페이지 반복

---

## 📊 **진행 상황 체크리스트**

### 소유권 확인 단계
- [ ] Google Search Console 접속
- [ ] "속성 추가" 클릭
- [ ] "URL 접두어" 선택 및 `https://dagong-bi1.pages.dev` 입력
- [ ] "HTML 파일" 확인 방법 선택
- [ ] "확인" 버튼 클릭
- [ ] ✅ "소유권이 확인되었습니다" 메시지 확인

### 사이트맵 제출 단계
- [ ] 왼쪽 메뉴 "Sitemaps" 클릭
- [ ] `https://dagong-bi1.pages.dev/sitemap.xml` 입력
- [ ] "제출" 클릭
- [ ] 상태 "성공" 또는 "처리 중..." 확인

### URL 검사 단계
- [ ] 상단 검색창에 URL 입력
- [ ] "색인 생성 요청" 클릭 (주요 3개 페이지)
- [ ] 3시간 후 `site:dagong-bi1.pages.dev` 검색 확인

---

## ⏱️ **예상 소요 시간**

- **소유권 확인**: 즉시 (1~2분)
- **사이트맵 제출**: 즉시 (1분)
- **사이트맵 처리**: 1~24시간
- **URL 색인 생성**: 1~3시간 (긴급 요청 시)

---

## 📞 **추가 지원**

**Google Search Console 고객센터**:
- 소유권 확인: https://support.google.com/webmasters/answer/9008080

**다공 프로젝트 확인 파일**:
- 로컬 경로: `/home/user/webapp/public/googleee4e97dad940b617.html`
- 배포 URL: https://dagong-bi1.pages.dev/googleee4e97dad940b617.html

---

**작성자**: 다공 개발팀  
**최종 수정**: 2026-02-21
