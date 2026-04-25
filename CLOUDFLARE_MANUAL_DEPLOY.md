# Cloudflare Pages 수동 배포 가이드

## 📦 배포 파일 위치
- **경로**: `/home/user/webapp/dagong-cloudflare-deploy.tar.gz`
- **크기**: 519KB
- **내용**: dist 폴더의 모든 파일 (_worker.js, _routes.json, static/, 등)

## 🚀 배포 방법

### 방법 1: 압축 파일 다운로드 후 업로드
1. **파일 다운로드**:
   - 파일: `/home/user/webapp/dagong-cloudflare-deploy.tar.gz`
   - 로컬로 다운로드

2. **압축 해제**:
   ```bash
   tar -xzf dagong-cloudflare-deploy.tar.gz
   ```

3. **Cloudflare Pages 업로드**:
   - Cloudflare Dashboard → Pages → dagong → Direct Upload
   - 압축 해제된 **파일들**을 모두 선택하여 업로드
   - (폴더가 아닌 파일들을 직접 선택)

### 방법 2: dist 폴더 직접 사용 (샌드박스 환경에서)
**경로**: `/home/user/webapp/dist/`

이 폴더에는 다음 파일들이 포함되어 있습니다:
```
_worker.js         (319KB) - 메인 애플리케이션
_routes.json       (97B)   - 라우팅 설정
_headers           (137B)  - HTTP 헤더 설정
static/            (폴더)  - 정적 파일들
  └─ app.js        (대용량) - 프론트엔드 JavaScript
  └─ styles.css    - 스타일
manifest.json      - PWA 설정
robots.txt         - SEO
sitemap.xml        - SEO
```

### 방법 3: wrangler CLI 사용 (이미 완료됨)
```bash
cd /home/user/webapp
export CLOUDFLARE_API_TOKEN="your_token"
npx wrangler pages deploy dist --project-name dagong
```

**현재 상태**: ✅ 이미 배포 완료됨
- 배포 URL: https://43ab0729.dagong-bi1.pages.dev
- 프로덕션 URL: https://dagong.co.kr

## 📋 배포 파일 목록
```
COPY_THIS.sql                           - DB 초기화 SQL
_headers                                - HTTP 헤더
_routes.json                            - 라우팅 규칙
_worker.js                              - 메인 Worker 코드
clear-cache.html                        - 캐시 정리 페이지
copy-sql-simple.html                    - SQL 복사 도구
deployment-guide.html                   - 배포 가이드
googleee4e97dad940b617.html             - Google Search Console
manifest.json                           - PWA 매니페스트
mobile-test.html                        - 모바일 테스트
naverf3735d7a56c13e617b246ff2b6e0da46.html - Naver Search
offline.html                            - 오프라인 페이지
robots.txt                              - 검색엔진 로봇
sitemap.xml                             - 사이트맵
static/                                 - 정적 파일 폴더
  └─ app.js                             - 프론트엔드 JavaScript
  └─ styles.css                         - CSS 스타일
```

## ⚠️ 중요 사항

### 배포 시 주의사항
1. **dist 폴더의 내용물**을 업로드해야 합니다 (dist 폴더 자체가 아님)
2. **_worker.js**가 반드시 포함되어야 합니다
3. **_routes.json**과 **_headers**도 필수입니다
4. **static/** 폴더와 그 내용물도 모두 포함되어야 합니다

### 환경 변수 설정 (필수)
배포 후 반드시 다음 환경 변수를 설정해야 소셜 로그인이 작동합니다:

**Cloudflare Dashboard → Pages → dagong → Settings → Environment variables → Production**

```
KAKAO_CLIENT_ID=카카오_REST_API_키
KAKAO_CLIENT_SECRET=카카오_시크릿_키
GOOGLE_CLIENT_ID=구글_클라이언트_ID
GOOGLE_CLIENT_SECRET=구글_클라이언트_시크릿
NAVER_CLIENT_ID=네이버_클라이언트_ID
NAVER_CLIENT_SECRET=네이버_클라이언트_시크릿
```

## 🧪 배포 후 테스트
1. https://dagong.co.kr 접속
2. 메인 페이지 로드 확인
3. 지역별 보기 → 5개 탭 확인
4. 교육 → 고급 다도 카테고리 확인
5. 체험 → 승마체험 탭 확인
6. 로그인 테스트 (환경 변수 설정 후)

## 📊 현재 배포 상태
- ✅ 프로덕션 배포 완료: https://dagong.co.kr
- ✅ DB 마이그레이션 완료 (0038~0043)
- ⏳ 환경 변수 설정 대기 중
- ⏳ GitHub 푸시 대기 중 (Secret Scanning 이슈)

---
**생성 일시**: 2026-04-25
**버전**: v2.1 (인증 시스템 수정)
