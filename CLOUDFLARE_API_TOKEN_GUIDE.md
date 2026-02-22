# 🔑 Cloudflare API 토큰 생성 가이드

## 📌 목적
dagong.co.kr 도메인을 Cloudflare Pages에 연결하고 배포하기 위한 API 토큰 생성

---

## 🚀 빠른 링크

### **즉시 생성 페이지**
👉 https://dash.cloudflare.com/profile/api-tokens

### **Cloudflare 대시보드**
👉 https://dash.cloudflare.com/

---

## 📋 단계별 가이드

### **1단계: API Tokens 페이지 접근**

**방법 A - 직접 링크 (추천)**
```
https://dash.cloudflare.com/profile/api-tokens
```

**방법 B - 대시보드에서 접근**
1. https://dash.cloudflare.com/ 로그인
2. 우측 상단 **프로필 아이콘** 클릭
3. **"My Profile"** 선택
4. 좌측 메뉴 **"API Tokens"** 클릭

---

### **2단계: Create Token**

1. **"Create Token"** 버튼 클릭 (파란색 버튼, 우측 상단)

---

### **3단계: 템플릿 선택 (권장)**

**Option 1 - 기존 템플릿 사용 (빠름)**
1. **"Edit Cloudflare Workers"** 템플릿 찾기
2. **"Use template"** 버튼 클릭
3. 자동으로 필요한 권한 설정됨

**Option 2 - 커스텀 토큰 생성 (세밀한 제어)**
1. **"Create Custom Token"** 클릭

---

### **4단계: 토큰 설정 (Option 2 선택 시)**

#### **Token name**
```
dagong-pages-deploy
```

#### **Permissions (권한 설정)**

| 리소스 | 권한 | 설정값 |
|--------|------|--------|
| **Account** | Cloudflare Pages | **Edit** |
| **Account** | Account Settings | **Read** (선택사항) |
| **Zone** | DNS | **Edit** (도메인 설정용) |
| **Zone** | Zone | **Read** |

**설정 방법:**
1. **"+ Add more"** 클릭
2. **Account → Cloudflare Pages → Edit** 선택
3. **"+ Add more"** 다시 클릭
4. **Zone → DNS → Edit** 선택

#### **Account Resources**
```
Include → [Your Account Name]
```
- 계정 선택 (보통 하나만 있음)

#### **Zone Resources**
```
Include → Specific zone → dagong.co.kr
```
- "All zones" 선택 가능 (편리함)
- 또는 "Specific zone" → `dagong.co.kr` 입력 (보안 강화)

#### **Client IP Address Filtering** (선택사항)
```
비워두기 (모든 IP 허용)
```

#### **TTL (Time to Live)**
```
Start: Now
End: No end date
```
- 또는 1년 후로 설정 가능

---

### **5단계: 토큰 생성 확인**

1. **"Continue to summary"** 클릭
2. 설정 내용 확인:
   ```
   ✓ Edit Cloudflare Pages
   ✓ Edit DNS
   ✓ Account: [Your Account]
   ✓ Zone: dagong.co.kr
   ```
3. **"Create Token"** 클릭 (최종 확인)

---

### **6단계: 토큰 복사 및 보관**

⚠️ **중요: 토큰은 한 번만 표시됩니다!**

1. 표시된 토큰 전체 복사:
   ```
   예시: A1b2C3d4E5f6G7h8I9j0K1L2M3N4O5P6Q7R8S9T0
   ```

2. **안전하게 보관** (다음 중 하나):
   - 비밀번호 관리자 (1Password, Bitwarden 등)
   - 로컬 암호화 파일
   - Deploy 탭에 즉시 입력

3. ❌ **절대 하지 말 것:**
   - GitHub에 커밋
   - 공개 문서에 기록
   - 스크린샷 공유

---

### **7단계: 토큰 테스트 (선택사항)**

Cloudflare에서 제공하는 테스트 명령어:
```bash
curl -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
     -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -H "Content-Type:application/json"
```

**성공 응답:**
```json
{
  "result": {
    "id": "...",
    "status": "active"
  },
  "success": true
}
```

---

## 🎯 **다음 단계: Deploy 탭에서 설정**

1. **왼쪽 사이드바 "Deploy" 탭** 클릭
2. **Cloudflare API Token 입력 필드**에 복사한 토큰 붙여넣기
3. **"Save"** 버튼 클릭
4. ✅ "API key configured successfully" 메시지 확인

---

## 🚀 **완료 후 작업**

토큰 설정 완료를 알려주시면:

1. ✅ `dagong.co.kr` 도메인을 Cloudflare Pages에 연결
2. ✅ `www.dagong.co.kr` 서브도메인 설정
3. ✅ 사이트 재배포
4. ✅ 5~10분 내 `https://dagong.co.kr` 접속 가능

---

## 🔧 **문제 해결**

### **"Invalid token" 오류**
- 토큰을 정확히 복사했는지 확인
- 공백이나 줄바꿈이 포함되지 않았는지 확인
- 토큰 만료일 확인

### **"Insufficient permissions" 오류**
- Account → Cloudflare Pages → **Edit** 권한 확인
- Zone → DNS → **Edit** 권한 확인
- Account Resources에 올바른 계정 선택 확인

### **토큰을 분실한 경우**
- 기존 토큰 삭제 후 새로 생성
- 이전 토큰은 자동 무효화됨

---

## 📞 **도움이 필요하시면**

1. 스크린샷과 함께 오류 메시지 공유
2. 토큰 생성 중 막힌 단계 알려주기
3. Deploy 탭 설정 화면 스크린샷

---

**생성일:** 2026-02-23  
**프로젝트:** 다공 (dagong.co.kr)  
**목적:** Cloudflare Pages 배포 및 커스텀 도메인 연결
