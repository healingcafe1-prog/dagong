# Play Store 자산 준비 가이드

**차다이렉트 앱 스토어 등록을 위한 모든 자산**

---

## 📋 필수 자산 체크리스트

### 1. 앱 아이콘 (App Icon)
- [x] **크기:** 512 x 512 픽셀
- [x] **형식:** PNG (32비트, 투명 배경 가능)
- [x] **위치:** `/static/icons/icon-512x512.png`
- [x] **상태:** ✅ 준비 완료

### 2. Feature Graphic ⚠️
- [ ] **크기:** 1024 x 500 픽셀
- [ ] **형식:** JPG 또는 PNG
- [ ] **상태:** 🔨 생성 필요

### 3. 스크린샷
- [x] **휴대폰:** 최소 2개 (권장 4-8개)
- [x] **위치:** `/static/screenshots/screenshot-mobile.png`
- [ ] **7인치 태블릿:** 최소 2개 (선택)
- [ ] **10인치 태블릿:** 최소 2개 (선택)
- [x] **상태:** ⚠️ 추가 스크린샷 권장

### 4. 텍스트 콘텐츠
- [x] **앱 이름:** 차다이렉트
- [x] **짧은 설명:** 80자 이내
- [x] **전체 설명:** 4000자 이내
- [x] **상태:** ✅ 준비 완료

### 5. 법적 문서
- [ ] **개인정보처리방침:** URL 필요
- [ ] **이용약관:** URL 필요 (선택)
- [ ] **상태:** 🔨 생성 필요

---

## 🎨 Feature Graphic 디자인 가이드

### 디자인 요구사항
```
크기: 1024 x 500 픽셀
포맷: JPG 또는 PNG
최대 파일 크기: 1MB
해상도: 72 DPI 이상
```

### 디자인 콘셉트

#### 옵션 1: 미니멀 디자인 (추천)
```
배경: 그라데이션 (#7c9473 → #8b6f47)
왼쪽: 앱 아이콘 (300x300)
중앙: 
  - "차다이렉트" (굵은 글씨, 60pt, 흰색)
  - "한국 차 문화, 우리가 함께 쓰는 새로운 문화 혁명" (30pt, 흰색)
오른쪽: 차/찻잔 일러스트
```

#### 옵션 2: 사진 기반
```
배경: 전통 차밭 또는 다도 이미지 (어둡게 처리)
오버레이: 반투명 검정 (opacity: 0.5)
중앙:
  - 앱 로고
  - "생산자 직거래 플랫폼"
  - "평균 30% 할인"
```

#### 옵션 3: 일러스트
```
배경: #f5f1e8 (차공예 크림)
왼쪽: 차, 찻잔, 공예품 아이콘
중앙: 브랜드 메시지
오른쪽: 스마트폰 목업 (앱 화면)
```

### Canva 템플릿 사용

1. **Canva 접속**
   - https://www.canva.com
   - "Google Play 그래픽" 검색

2. **커스텀 크기 설정**
   ```
   너비: 1024 px
   높이: 500 px
   ```

3. **디자인 요소 추가**
   - 텍스트: "차다이렉트"
   - 서브텍스트: 슬로건
   - 배경색: #7c9473
   - 아이콘/이미지 배치

4. **다운로드**
   - 형식: PNG 또는 JPG
   - 파일명: `feature-graphic.png`

---

## 📱 스크린샷 가이드

### 필수 스크린샷 (최소 2개)

#### 1번: 홈 화면
```
내용:
  - 히어로 섹션
  - "한국 차 문화, 우리가 함께 쓰는 새로운 문화 혁명"
  - 이달의 이벤트
  - 추천 상품

촬영 방법:
  - URL: https://chadirect.kr/
  - 해상도: 1080 x 1920 (9:16)
  - Chrome DevTools → 모바일 시뮬레이터
```

#### 2번: 상품 목록
```
내용:
  - 차 직거래 상품 목록
  - 필터 (지역, 가격)
  - 할인가 표시

촬영 방법:
  - URL: https://chadirect.kr/products?type=tea
  - 해상도: 1080 x 1920
```

### 권장 추가 스크린샷 (4-6개)

#### 3번: 상품 상세
```
URL: https://chadirect.kr/products/1
내용: 상품 이미지, 가격, 장바구니 담기
```

#### 4번: 장바구니
```
URL: https://chadirect.kr/cart
내용: 장바구니 아이템, 총 금액, 주문하기
```

#### 5번: 체험 예약
```
URL: https://chadirect.kr/experiences
내용: 다도 체험, 차 만들기, 공예 체험
```

#### 6번: 마이페이지
```
URL: https://chadirect.kr/mypage
내용: 주문 내역, 프로필
```

### 스크린샷 촬영 도구

#### Chrome DevTools 사용
```javascript
// 1. F12 → DevTools 열기
// 2. Toggle device toolbar (Ctrl+Shift+M)
// 3. 해상도 설정: Custom (375 x 812)
// 4. 스크린샷: Ctrl+Shift+P → "Capture screenshot"
```

#### 온라인 도구
- **Screely:** https://www.screely.com (배경 추가)
- **MockUPhone:** https://mockuphone.com (디바이스 프레임)
- **Shots:** https://shots.so (이미지 자동 꾸미기)

### 스크린샷 요구사항
```
형식: JPG 또는 PNG
최소 크기: 320 x 320
최대 크기: 3840 x 3840
종횡비: 16:9 또는 9:16
최대 파일 크기: 8MB
```

---

## 📄 법적 문서 템플릿

### 개인정보처리방침 (Privacy Policy)

파일 생성: `/home/user/webapp/public/privacy-policy.html`

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>개인정보처리방침 - 차다이렉트</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Noto Sans KR', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.8;
        }
        h1 { color: #7c9473; }
        h2 { color: #333; margin-top: 30px; }
        .update-date { color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <h1>개인정보처리방침</h1>
    <p class="update-date">최종 업데이트: 2026년 1월 4일</p>

    <h2>1. 개인정보의 수집 및 이용 목적</h2>
    <p>차다이렉트("회사")는 다음의 목적을 위해 개인정보를 처리합니다:</p>
    <ul>
        <li>회원 가입 및 관리</li>
        <li>상품 주문 및 배송</li>
        <li>고객 상담 및 불만 처리</li>
        <li>마케팅 및 광고 (동의 시)</li>
    </ul>

    <h2>2. 수집하는 개인정보 항목</h2>
    <p><strong>필수 항목:</strong></p>
    <ul>
        <li>이메일 주소</li>
        <li>이름</li>
        <li>휴대전화번호</li>
        <li>배송지 주소</li>
    </ul>
    <p><strong>선택 항목:</strong></p>
    <ul>
        <li>생년월일</li>
        <li>프로필 사진</li>
    </ul>

    <h2>3. 개인정보의 보유 및 이용 기간</h2>
    <p>회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.</p>
    <ul>
        <li>회원 정보: 회원 탈퇴 시까지</li>
        <li>주문/배송 정보: 5년 (전자상거래법)</li>
        <li>결제 정보: 5년 (전자금융거래법)</li>
    </ul>

    <h2>4. 개인정보의 제3자 제공</h2>
    <p>회사는 원칙적으로 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>

    <h2>5. 정보주체의 권리·의무 및 행사 방법</h2>
    <p>정보주체는 다음과 같은 권리를 행사할 수 있습니다:</p>
    <ul>
        <li>개인정보 열람 요구</li>
        <li>개인정보 정정·삭제 요구</li>
        <li>개인정보 처리 정지 요구</li>
    </ul>

    <h2>6. 개인정보 보호책임자</h2>
    <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및 피해구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
    <ul>
        <li>이메일: privacy@chadirect.kr</li>
        <li>전화: 1234-5678</li>
    </ul>

    <h2>7. 개인정보 처리방침 변경</h2>
    <p>이 개인정보 처리방침은 2026년 1월 4일부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>

    <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="text-align: center; color: #999;">
            © 2026 차다이렉트. All rights reserved.
        </p>
    </footer>
</body>
</html>
```

### 이용약관 (Terms of Service)

파일 생성: `/home/user/webapp/public/terms.html`

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>이용약관 - 차다이렉트</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Noto Sans KR', sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.8;
        }
        h1 { color: #7c9473; }
        h2 { color: #333; margin-top: 30px; }
        .update-date { color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <h1>이용약관</h1>
    <p class="update-date">최종 업데이트: 2026년 1월 4일</p>

    <h2>제1조 (목적)</h2>
    <p>본 약관은 차다이렉트(이하 "회사")가 제공하는 전자상거래 관련 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>

    <h2>제2조 (정의)</h2>
    <ul>
        <li>"서비스"란 회사가 제공하는 한국 차 및 공예품 직거래 플랫폼을 의미합니다.</li>
        <li>"회원"이란 본 약관에 동의하고 회사와 서비스 이용계약을 체결한 자를 의미합니다.</li>
        <li>"생산자"란 회사의 플랫폼을 통해 상품을 판매하는 개인 또는 사업자를 의미합니다.</li>
    </ul>

    <h2>제3조 (약관의 효력 및 변경)</h2>
    <p>본 약관은 회원이 동의함으로써 효력이 발생합니다. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 공지합니다.</p>

    <h2>제4조 (회원가입)</h2>
    <p>회원가입은 이용자가 본 약관에 동의하고 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 회사가 이를 승낙함으로써 완료됩니다.</p>

    <h2>제5조 (서비스의 제공)</h2>
    <p>회사는 다음과 같은 서비스를 제공합니다:</p>
    <ul>
        <li>한국 차 및 공예품 판매</li>
        <li>체험 프로그램 예약</li>
        <li>교육 커리큘럼 제공</li>
        <li>주문 및 배송 관리</li>
        <li>고객 상담</li>
    </ul>

    <h2>제6조 (구매 및 결제)</h2>
    <p>회원은 회사가 제공하는 절차에 따라 상품을 구매하고 결제할 수 있습니다. 회사는 신용카드, 계좌이체, 간편결제 등 다양한 결제 수단을 제공합니다.</p>

    <h2>제7조 (배송)</h2>
    <p>회사는 주문 확정 후 영업일 기준 3-5일 이내에 상품을 배송합니다. 천재지변, 생산자 사정 등 불가항력적인 사유로 배송이 지연될 수 있습니다.</p>

    <h2>제8조 (취소 및 환불)</h2>
    <p>회원은 상품 수령 후 7일 이내에 청약 철회를 할 수 있습니다. 단, 상품의 내용이 표시·광고 내용과 다르거나 계약 내용과 다르게 이행된 경우에는 3개월 이내 청약 철회가 가능합니다.</p>

    <h2>제9조 (면책)</h2>
    <p>회사는 천재지변, 전쟁, 파업 등 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 책임이 면제됩니다.</p>

    <h2>제10조 (분쟁 해결)</h2>
    <p>회사와 회원 간 발생한 분쟁에 대해 소송이 제기될 경우 회사의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.</p>

    <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="text-align: center; color: #999;">
            © 2026 차다이렉트. All rights reserved.
        </p>
    </footer>
</body>
</html>
```

---

## 🚀 자산 생성 워크플로우

### 1단계: Feature Graphic 생성
```bash
# Canva 또는 Figma에서 생성 후 다운로드
# 파일명: feature-graphic.png
# 저장 위치: /home/user/webapp/assets/
```

### 2단계: 추가 스크린샷 촬영
```bash
# Chrome DevTools로 촬영
# 각 주요 화면별로 촬영
# 파일명: screenshot-01.png ~ screenshot-08.png
```

### 3단계: 법적 문서 생성
```bash
cd /home/user/webapp

# 개인정보처리방침 생성
cat > public/privacy-policy.html << 'EOF'
[위 템플릿 내용]
EOF

# 이용약관 생성
cat > public/terms.html << 'EOF'
[위 템플릿 내용]
EOF

# 빌드 및 배포
npm run build
npx wrangler pages deploy dist
```

### 4단계: URL 확인
```bash
# 개인정보처리방침
curl https://chadirect.kr/privacy-policy.html

# 이용약관
curl https://chadirect.kr/terms.html
```

---

## 📊 자산 준비 상태

### ✅ 준비 완료
- [x] 앱 아이콘 (512x512)
- [x] 모바일 스크린샷 (1개)
- [x] 앱 설명 텍스트
- [x] 브랜드 가이드

### 🔨 작업 필요
- [ ] Feature Graphic (1024x500)
- [ ] 추가 스크린샷 (3-7개)
- [ ] 개인정보처리방침 페이지
- [ ] 이용약관 페이지

### ⏱️ 예상 소요 시간
- Feature Graphic: 30-60분
- 스크린샷: 30분
- 법적 문서: 1-2시간
- **총 예상 시간: 2-4시간**

---

## 💡 빠른 시작 가이드

### 최소 요구사항으로 시작하기

현재 가진 자산만으로도 Play Store 제출이 가능합니다:

1. **앱 아이콘:** ✅ 준비 완료
2. **Feature Graphic:** 🔨 Canva로 30분 내 제작
3. **스크린샷:** ✅ 1개 있음 (최소 요구사항 충족)
4. **법적 문서:** 🔨 템플릿 사용하여 1시간 내 생성

**결론:** 약 2시간이면 Play Store 제출 준비 완료! 🎉

---

## 📞 지원

자산 생성 중 문제가 있거나 디자인 도움이 필요하면 언제든지 알려주세요!
