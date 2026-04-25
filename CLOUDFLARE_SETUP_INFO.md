# 📝 Cloudflare 설정 정보

## 🔑 입력할 정보

### 1. Cloudflare API 키
**필요한 정보**: Cloudflare API Token

**생성 방법**:
1. https://dash.cloudflare.com/profile/api-tokens 접속
2. "Create Token" 클릭
3. "Edit Cloudflare Workers" 템플릿 선택
4. 권한 추가:
   - ✅ Account > Cloudflare Pages: **Edit**
   - ✅ Account > Account Settings: **Read**
   - ✅ Zone > Workers Routes: **Edit** (선택사항)
5. "Continue to summary" → "Create Token"
6. **토큰 복사** (⚠️ 다시 볼 수 없으니 반드시 저장!)

**입력란**: "Cloudflare API 키를 입력하세요"
**입력 값**: `복사한 API 토큰 붙여넣기`

---

### 2. Cloudflare 계정 ID
**필요한 정보**: Cloudflare Account ID

**확인 방법**:
1. https://dash.cloudflare.com 접속
2. 왼쪽 사이드바 또는 오른쪽 사이드바에서 "Account ID" 확인
3. 또는 아무 사이트 선택 → 오른쪽 사이드바 → "Account ID" 복사

**입력란**: "Cloudflare 계정 ID를 입력하세요 (선택 사항)"
**입력 값**: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (32자리 16진수)

---

## 📋 현재 프로젝트 정보

### 프로젝트 이름
- **이름**: `dagong`
- **Cloudflare Pages 프로젝트**: https://dash.cloudflare.com/pages/view/dagong

### 데이터베이스
- **D1 Database 이름**: `webapp-production`
- **마이그레이션 파일**: 42개 (최근 5개 신규 추가)

---

## ✅ 설정 완료 후 확인사항

1. **API 키 저장 클릭**
2. ✅ 표시가 나타나면 성공
3. 터미널에서 테스트:
   ```bash
   cd /home/user/webapp
   ./APPLY_PRODUCTION_MIGRATIONS.sh
   ```

---

## 🚨 주의사항

1. **API 토큰은 절대 공개하지 마세요**
   - GitHub에 커밋하지 마세요
   - 스크린샷 공유 시 가리세요

2. **토큰 권한 확인**
   - "Edit Cloudflare Workers" 권한 필수
   - "Account.Cloudflare Pages: Edit" 권한 필수

3. **토큰 분실 시**
   - 다시 확인 불가
   - 새로 생성해야 함

---

## 💡 빠른 설정 체크리스트

- [ ] Cloudflare 대시보드 로그인
- [ ] API 토큰 생성 (Edit Cloudflare Workers)
- [ ] 토큰 복사 및 안전한 곳에 저장
- [ ] Account ID 확인
- [ ] GenSpark "Publish" 탭 → "Cloudflare 설정" 열기
- [ ] API 키 입력
- [ ] Account ID 입력 (선택)
- [ ] "API 키 저장" 클릭
- [ ] 녹색 체크 표시 확인
- [ ] 프로덕션 마이그레이션 실행

---

**작성일**: 2026-04-25
**프로젝트**: dagong.co.kr
