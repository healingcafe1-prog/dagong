# 프로덕션 DB 데이터 복원 요약

## 현재 상황
- **이벤트: ✅ 완료** (27개 모두 정상)
- **지역특산품**: 부족 (17개 → 78개 필요)
- **체험**: 거의 완료 (4개 → 5개 필요)
- **교육과정**: 부족 (16개 → 30개 필요)

## 문제 원인
로컬 DB와 프로덕션 DB의 스키마가 다릅니다:
- 로컬: `image` 컬럼 사용
- 프로덕션: `featured_image`, `main_image`, `profile_image` 등 사용
- 로컬: `unit` 컬럼 있음
- 프로덕션: `weight` 컬럼 사용

## 해결 방법

### 방법 1: Cloudflare 대시보드에서 직접 실행 (권장)
1. https://dash.cloudflare.com/ 로그인
2. **Workers & Pages** → **D1** → **webapp-production** → **Console**
3. 아래 SQL을 복사하여 실행

SQL 파일이 너무 커서 대시보드에서 한번에 실행 불가하므로, **단계별로 나눠서 실행**해야 합니다.

### 방법 2: wrangler CLI 사용
로컬에서 wrangler를 사용하여 DB를 직접 조작합니다.

```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --command="실행할 SQL"
```

## 다음 단계
1. 프로덕션 스키마에 맞춰 SQL 재작성
2. producers, products, experiences, education 데이터 추가
3. 최종 검증

## 참고 링크
- 프로덕션 사이트: https://dagong-bi1.pages.dev
- GitHub 저장소: https://github.com/healingcafe1-prog/dagong
- MASTER_SEED.sql: https://raw.githubusercontent.com/healingcafe1-prog/dagong/main/MASTER_SEED.sql
