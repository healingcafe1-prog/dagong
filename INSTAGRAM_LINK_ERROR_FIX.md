# Instagram 링크 오류 해결 가이드

**오류**: "웹사이트를 불러오지 못하고 있습니다"  
**날짜**: 2026-02-22  
**웹사이트**: https://dagong-bi1.pages.dev

---

## ✅ **웹사이트 상태: 정상**

- HTTP 상태: 200 OK ✅
- DNS: 정상 ✅
- robots.txt: 모든 크롤러 허용 ✅
- 일반 브라우저: 정상 작동 ✅

**결론**: Instagram 인앱 브라우저 관련 문제

---

## 🚀 **즉시 해결 방법**

### **✅ 방법 1: 링크 재입력 (1분) - 최우선**

#### **실행**
1. Instagram 앱 → 프로필 → "프로필 수정"
2. "웹사이트" 필드 **모두 삭제**
3. **정확히 복사 & 붙여넣기**:
   ```
   https://dagong-bi1.pages.dev
   ```
4. "완료" 클릭
5. 프로필 링크 다시 테스트

#### **주의사항**
❌ 끝에 슬래시 없음: `https://dagong-bi1.pages.dev/`  
❌ http 사용 금지: `http://dagong-bi1.pages.dev`  
✅ 정확한 형식: `https://dagong-bi1.pages.dev`

---

### **📱 방법 2: Instagram 캐시 삭제 (2분)**

#### **iOS (iPhone)**
```
설정 → 일반 → iPhone 저장 공간 → Instagram
→ "앱 오프로드" 클릭
→ App Store에서 Instagram 재설치
→ 로그인 후 링크 테스트
```

#### **Android**
```
설정 → 앱 → Instagram → 저장공간
→ "캐시 삭제" 클릭
→ Instagram 재실행
→ 링크 테스트
```

---

### **🌐 방법 3: 외부 브라우저에서 열기 (즉시)**

Instagram 인앱 브라우저를 우회:

```
프로필 링크 길게 누르기 (Long Press)
↓
"Safari에서 열기" 또는 "Chrome에서 열기"
↓
외부 브라우저에서 정상 작동 ✅
```

---

### **⏰ 방법 4: 대기 후 재시도 (5~10분)**

```
1. 링크 저장 완료
2. 5~10분 대기 (Instagram 캐싱 시간)
3. Instagram 앱 완전 종료
4. Instagram 재실행
5. 링크 다시 클릭
```

---

### **🔧 방법 5: 단축 URL 사용 (대안)**

Instagram이 직접 링크를 싫어할 경우 단축 URL 사용:

#### **옵션 A: bit.ly**
```
1. https://bitly.com/ 접속
2. "Create Link" 클릭
3. 원본: https://dagong-bi1.pages.dev
4. 단축 URL 생성: https://bit.ly/dagong-tea
5. Instagram에 단축 URL 입력
```

#### **옵션 B: Linktree (무료)**
```
1. https://linktr.ee/ 가입
2. "Add New Link" 클릭
3. 제목: "다공 공식 웹사이트"
4. URL: https://dagong-bi1.pages.dev
5. Linktree URL을 Instagram에 추가
   예: https://linktr.ee/korea_teacraft
```

---

## 🔍 **문제 원인 분석**

### **1. Instagram 인앱 브라우저 캐시**
- **원인**: 오래된 캐시 데이터
- **해결**: 캐시 삭제 또는 앱 재설치

### **2. URL 형식 오류**
- **원인**: 끝에 슬래시, http 사용 등
- **해결**: 정확한 URL 재입력

### **3. Cloudflare Bot Protection**
- **원인**: Instagram User-Agent 차단
- **해결**: Cloudflare 보안 규칙 완화 (고급)

### **4. Instagram 링크 캐싱 지연**
- **원인**: 새 링크 처리 시간 필요
- **해결**: 5~10분 대기

### **5. 일시적 네트워크 오류**
- **원인**: Instagram 서버 일시 장애
- **해결**: 나중에 재시도

---

## 📊 **테스트 결과**

### **브라우저별 테스트**

| 브라우저 | 상태 | 비고 |
|----------|------|------|
| Safari (iPhone) | ✅ 정상 | - |
| Chrome (Android) | ✅ 정상 | - |
| Instagram 인앱 | ❌ 오류 | 캐시 문제 |
| PC 브라우저 | ✅ 정상 | - |

### **결론**
웹사이트는 정상이며, Instagram 앱 특정 문제입니다.

---

## 🎯 **권장 해결 순서**

### **1단계: 링크 재입력 (1분)**
```
Instagram → 프로필 수정 → 웹사이트 삭제
→ https://dagong-bi1.pages.dev 복사 & 붙여넣기
→ 저장 → 테스트
```

### **2단계: 실패 시 캐시 삭제 (2분)**
```
설정 → 앱 → Instagram → 캐시 삭제
→ 재실행 → 테스트
```

### **3단계: 여전히 실패 시 외부 브라우저 (즉시)**
```
링크 길게 누르기 → "Safari에서 열기"
→ 정상 작동 확인
```

### **4단계: 최종 대안 - 단축 URL (5분)**
```
bit.ly 또는 Linktree 사용
→ 단축 URL을 Instagram에 추가
```

---

## 💡 **임시 해결책**

Instagram 링크가 작동할 때까지:

### **스토리에서 직접 URL 공유**
```
스토리 작성 시:
텍스트로 URL 명시

"웹사이트 방문하세요!
dagong-bi1.pages.dev

(링크 복사 후 브라우저에 붙여넣기)"
```

### **DM 자동 응답 설정**
```
Instagram DM 자동 응답:
"안녕하세요! 다공입니다 🍵
웹사이트: https://dagong-bi1.pages.dev"
```

---

## 🔗 **대체 링크 옵션**

### **옵션 1: Linktree (무료)**
```
장점:
✅ 여러 링크 관리 가능
✅ 클릭 통계 제공
✅ Instagram 친화적

예시:
https://linktr.ee/korea_teacraft
├─ 공식 웹사이트
├─ 온라인 쇼핑
├─ 교육 신청
└─ 협동조합 카페 창업
```

### **옵션 2: bit.ly (무료)**
```
장점:
✅ 짧은 URL
✅ 클릭 통계
✅ 커스텀 가능

예시:
https://bit.ly/dagong-tea
→ https://dagong-bi1.pages.dev
```

---

## 📞 **추가 지원**

### **여전히 작동하지 않으면**

1. **스크린샷 공유**:
   - Instagram 오류 메시지
   - 프로필 편집 화면 (웹사이트 필드)

2. **확인 사항**:
   - Instagram 계정 유형 (개인 / 비즈니스)
   - 앱 버전 (설정 → 정보 → 버전)
   - 운영체제 (iOS / Android)

3. **임시 해결책**:
   - Linktree 또는 bit.ly 단축 URL 사용
   - 스토리/피드에서 직접 URL 공유

---

## ✅ **체크리스트**

- [ ] 웹사이트 정상 작동 확인 (브라우저)
- [ ] Instagram 링크 재입력 (슬래시 제거)
- [ ] Instagram 캐시 삭제
- [ ] 5~10분 대기 후 재시도
- [ ] 외부 브라우저에서 테스트
- [ ] (필요시) 단축 URL 생성
- [ ] (대안) Linktree 설정

---

**작성일**: 2026-02-22  
**작성자**: 다공 개발팀  
**최종 수정**: 2026-02-22 23:30 UTC
