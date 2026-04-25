# 📥 다운로드 및 배포 가이드

## ✅ 다운로드할 파일

### 📦 파일 위치
**경로**: `/home/user/webapp/dagong-deploy.zip`
**크기**: 538KB

## 🚀 배포 방법

### 1단계: ZIP 파일 다운로드
1. 파일 브라우저에서 `/home/user/webapp/` 폴더로 이동
2. `dagong-deploy.zip` 파일 찾기
3. 파일 다운로드 (우클릭 → 다운로드 또는 다운로드 버튼)

### 2단계: ZIP 파일 압축 해제
**Windows**:
- ZIP 파일 우클릭 → "압축 풀기" 또는 "Extract All"

**Mac**:
- ZIP 파일 더블클릭

**Linux**:
```bash
unzip dagong-deploy.zip
```

압축 해제하면 `dist/` 폴더가 생성됩니다.

### 3단계: Cloudflare Pages에 업로드
1. Cloudflare Dashboard 접속: https://dash.cloudflare.com
2. **Pages** → **dagong** 프로젝트 선택
3. 화면에서 **"Create a deployment"** 또는 **직접 업로드** 선택
4. **"folder"** 클릭
5. 압축 해제한 **`dist` 폴더** 선택
6. **"Save and deploy"** 클릭

### ⚠️ 주의사항
- **dist 폴더 자체**를 선택하세요 (dist 폴더 안의 파일들이 아닙니다)
- Cloudflare가 dist 폴더 내용을 자동으로 인식합니다

## 📋 dist 폴더에 포함된 파일

### 필수 파일 (반드시 포함되어야 함)
```
✓ _worker.js       (326KB) - Cloudflare Workers 코드 ⭐
✓ _routes.json     (97B)   - 라우팅 규칙
✓ _headers         (137B)  - HTTP 헤더 설정
```

### 정적 파일
```
✓ static/
  ├─ app.js        (238KB) - 프론트엔드 JavaScript
  ├─ style.css     - CSS 스타일
  ├─ icons/        - PWA 아이콘들
  ├─ images/       - 이미지 파일들
  └─ 기타 JS 파일들
```

### 기타 파일
```
✓ manifest.json    - PWA 매니페스트
✓ robots.txt       - SEO 설정
✓ sitemap.xml      - 사이트맵
✓ sw.js            - Service Worker
✓ offline.html     - 오프라인 페이지
+ 기타 HTML 파일들
```

## 🔑 환경 변수 설정 (필수!)

배포 후 **반드시** 환경 변수를 설정해야 합니다:

**위치**: Cloudflare Dashboard → Pages → dagong → Settings → Environment variables → **Production** 탭

```
KAKAO_CLIENT_ID=카카오_REST_API_키
KAKAO_CLIENT_SECRET=카카오_시크릿_키
GOOGLE_CLIENT_ID=구글_클라이언트_ID
GOOGLE_CLIENT_SECRET=구글_클라이언트_시크릿
NAVER_CLIENT_ID=네이버_클라이언트_ID
NAVER_CLIENT_SECRET=네이버_클라이언트_시크릿
```

### 환경 변수를 설정하지 않으면:
- ❌ 카카오 로그인 작동하지 않음
- ❌ 구글 로그인 작동하지 않음
- ❌ 네이버 로그인 작동하지 않음
- ❌ 친구초대 기능 작동하지 않음

## 🧪 배포 확인

배포 완료 후 다음 URL에서 확인:
1. **프로덕션**: https://dagong.co.kr
2. **Cloudflare**: https://[배포ID].dagong.pages.dev

### 테스트 항목
- [ ] 메인 페이지 로드
- [ ] 지역별 보기 → 5개 탭 (전체, 차 산지, 공예, 박람회, 프리마켓)
- [ ] 교육 프로그램 → 고급 다도
- [ ] 체험 프로그램 → 승마체험
- [ ] 로그인 버튼 클릭 (환경 변수 설정 후)
- [ ] 카카오/구글/네이버 로그인
- [ ] 친구초대 팝업

## 🔧 문제 해결

### Q: ZIP 파일이 어디 있나요?
**A**: `/home/user/webapp/dagong-deploy.zip` 경로에 있습니다.

### Q: dist 폴더가 보이지 않아요
**A**: ZIP 파일 압축을 해제하면 `dist/` 폴더가 생성됩니다.

### Q: 업로드 후 사이트가 작동하지 않아요
**A**: 
1. dist 폴더의 **내용물**이 아닌 **dist 폴더 자체**를 업로드했는지 확인
2. _worker.js 파일이 포함되었는지 확인
3. Cloudflare Dashboard에서 배포 로그 확인

### Q: 로그인이 작동하지 않아요
**A**: 환경 변수를 설정했는지 확인하세요 (위의 "환경 변수 설정" 참조)

## 📞 추가 지원

- **배포 가이드**: `CLOUDFLARE_MANUAL_DEPLOY.md`
- **인증 설정**: `KAKAO_AUTH_SETUP.md`
- **최종 보고서**: `FINAL_DEPLOYMENT_REPORT.md`

---
**생성 일시**: 2026-04-25
**버전**: v2.1
