# 프로덕션 DB 업데이트 - 간편 가이드

## 🚨 중요: API 토큰 권한 부족

현재 사용 중인 Cloudflare API 토큰에 D1 데이터베이스 쓰기 권한이 없습니다.
따라서 **Cloudflare Dashboard를 통한 수동 업데이트**가 필요합니다.

## 📋 업데이트 방법

### 1단계: Cloudflare 대시보드 접속
```
https://dash.cloudflare.com/
```

### 2단계: D1 데이터베이스로 이동
1. 왼쪽 메뉴에서 **Workers & Pages** 클릭
2. 상단 탭에서 **D1** 클릭
3. **webapp-production** 데이터베이스 클릭

### 3단계: Console 탭 열기
1. 데이터베이스 상세 페이지에서 **Console** 탭 클릭
2. SQL 입력창이 표시됩니다

### 4단계: SQL 파일 다운로드
아래 파일을 다운로드하세요:
```
/home/user/webapp/production_data_full.sql
```

또는 샌드박스 파일 브라우저에서 직접 열어서 복사하세요.

### 5단계: SQL 실행
1. **production_data_full.sql** 파일의 내용을 **전체 복사**
2. Cloudflare Console의 SQL 입력창에 **붙여넣기**
3. **Execute** 버튼 클릭
4. 완료될 때까지 대기 (약 1-2분)

### 6단계: 확인
브라우저에서 아래 URL을 열어 데이터를 확인하세요:

**제품 확인 (50개 예상):**
```
https://dagong-bi1.pages.dev/api/products
```

**이벤트 확인 (27개 예상):**
```
https://dagong-bi1.pages.dev/api/events
```

**체험 프로그램 확인 (12개 예상):**
```
https://dagong-bi1.pages.dev/api/experiences
```

## ⚠️ 문제 해결

### SQL 실행 오류가 발생하는 경우
1. SQL 문법 오류: Cloudflare Console에서 에러 메시지 확인
2. 타임아웃: SQL을 작은 부분으로 나누어 실행
3. 권한 오류: 계정 관리자에게 문의

### 데이터가 보이지 않는 경우
1. 브라우저 캐시 삭제 (Ctrl+Shift+R 또는 Cmd+Shift+R)
2. 5분 정도 기다린 후 다시 확인
3. API 엔드포인트를 직접 curl로 확인:
   ```bash
   curl https://dagong-bi1.pages.dev/api/products
   ```

## 🔧 대안: API 토큰 권한 업데이트

만약 API를 통해 자동화하고 싶다면:

1. Cloudflare Dashboard → Profile → API Tokens
2. 기존 토큰 편집 또는 새 토큰 생성
3. **Permissions**에 다음 권한 추가:
   - Account > D1 > Edit
   - Account > Workers Scripts > Edit
4. 새 토큰을 환경변수로 설정:
   ```bash
   export CLOUDFLARE_API_TOKEN="새토큰"
   ```

## ✅ 완료 확인 체크리스트

- [ ] Cloudflare Dashboard 접속
- [ ] webapp-production 데이터베이스 선택
- [ ] Console 탭 열기
- [ ] production_data_full.sql 내용 복사
- [ ] SQL 실행 (Execute 버튼)
- [ ] 제품 50개 확인
- [ ] 이벤트 27개 확인
- [ ] 체험 프로그램 12개 확인

## 📊 업데이트될 데이터

- **제품**: 17개 → 50개 (33개 추가)
- **이벤트**: 0개 → 27개 (27개 추가)
- **체험**: 0개 → 12개 (12개 추가)
- **지역**: 17개 유지
- **생산자**: 2개 유지

## 🕐 예상 소요 시간

- SQL 파일 복사: 1분
- SQL 실행: 1-2분
- 데이터 확인: 1분
- **총 소요 시간: 약 3-5분**

---

**도움이 더 필요하시면 언제든 말씀해주세요!** 🍵
