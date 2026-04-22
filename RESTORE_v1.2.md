# 다공 v1.2 최종본 복원 가이드

## 📦 백업 정보

- **버전**: v1.2-final-20250423
- **백업 날짜**: 2025년 4월 23일
- **백업 파일**: `dagong-final-v1.2-20250423.tar.gz`
- **파일 크기**: 14.98 MB
- **다운로드 URL**: https://www.genspark.ai/api/files/s/iSXaQMZC
- **Git 태그**: `v1.2-final-20250423`
- **총 커밋 수**: 339개

## ⭐ v1.2 주요 기능

### 💎 포인트 시스템 (신규)
1. **구매 적립**
   - 적립률: 25% ~ 35% (생산자가 상품별로 설정)
   - 적립 시점: 구매확정 완료 시
   - 예시: 45,500원 × 35% = 15,925P

2. **추천인 보너스**
   - 가입 보너스: 추천인과 가입자 각각 20,000P
   - 1회 한정

3. **추천인 구매 적립** ⭐
   - 피추천인이 구매할 때마다 추천인도 동일 포인트 적립
   - 지속적 수익 구조

4. **현금 전환**
   - 전환 비율: 600,000PV = 50,000원
   - 최소 출금: 600,000PV
   - 처리 기간: 영업일 3-5일

### 📱 모바일 최적화
- 친구초대 팝업 크기 조정 (화면의 50%)
- 아이콘, 텍스트, 패딩 모바일 최적화

### 💰 포인트 표시
- 모든 상품 카드에 포인트 적립 정보 표시
- 상품 상세 페이지에 구매 시 적립 포인트 안내

### 🏷️ 상품 관리
- 샘플 상품 60개 모두 품절 처리
- 신상품 우선 정렬 (is_featured DESC, created_at DESC)

## 🗄️ 데이터베이스 구조

### 포인트 시스템 테이블
```sql
-- 사용자 포인트
user_points (
  user_id, total_points, available_points, 
  used_points, withdrawn_points
)

-- 포인트 거래 내역
point_transactions (
  user_id, transaction_type, points, balance_after,
  order_id, referrer_id, referred_user_id, description
)

-- 포인트 출금 신청
point_withdrawals (
  user_id, points, cash_amount, bank_name,
  account_number, account_holder, status
)

-- 추천인 관계
user_referrals (
  referrer_id, referred_user_id, signup_bonus_given,
  total_referral_earnings
)
```

### 기존 테이블 업데이트
```sql
-- 상품 테이블
products ADD COLUMN point_rate INTEGER DEFAULT 35

-- 주문 테이블
orders ADD COLUMN points_earned INTEGER DEFAULT 0
orders ADD COLUMN points_used INTEGER DEFAULT 0
```

## 🔗 API 엔드포인트

### 포인트 API (5개)
1. `GET /api/points/me` - 내 포인트 조회
2. `GET /api/points/transactions` - 거래 내역 조회
3. `POST /api/points/withdraw` - 현금 출금 신청
4. `GET /api/points/withdrawals` - 출금 신청 내역
5. `POST /api/referrals/register` - 추천인 등록

## 📊 데이터 현황

- **상품**: 60개 (모두 품절)
- **카테고리**: 31개
- **생산자**: 5개 (샘플)
- **지역**: 17개
- **체험 프로그램**: 25개
- **교육 커리큘럼**: 30개
- **제휴사**: 6개
- **포인트 시스템**: DB 테이블 4개, API 5개

## 🔄 복원 방법

### 방법 1: 백업 파일에서 복원

```bash
# 1. 백업 파일 다운로드
wget https://www.genspark.ai/api/files/s/iSXaQMZC -O dagong-final-v1.2-20250423.tar.gz

# 2. 압축 해제
tar -xzf dagong-final-v1.2-20250423.tar.gz

# 3. 프로젝트 디렉토리로 이동
cd /home/user/webapp

# 4. 의존성 설치 (이미 설치되어 있음)
npm install

# 5. 데이터베이스 마이그레이션
npm run db:migrate:local

# 6. 빌드
npm run build

# 7. 서버 시작
pm2 start ecosystem.config.cjs
```

### 방법 2: Git 태그에서 복원

```bash
# 1. 프로젝트 디렉토리로 이동
cd /home/user/webapp

# 2. Git 태그로 체크아웃
git checkout v1.2-final-20250423

# 3. 데이터베이스 마이그레이션
npm run db:migrate:local

# 4. 빌드 및 서버 시작
npm run build
pm2 restart webapp
```

## 📁 프로젝트 구조

```
webapp/
├── src/
│   └── index.tsx              # 메인 애플리케이션 (포인트 API 포함)
├── public/
│   └── static/
│       └── app.js             # 프론트엔드 (포인트 표시)
├── migrations/
│   ├── 0034_add_point_rate.sql          # 포인트 적립률
│   ├── 0035_add_point_system.sql        # 포인트 시스템 테이블
│   └── 0036_add_order_points.sql        # 주문 포인트 컬럼
├── README.md                  # 프로젝트 문서 (v1.2)
├── POINTS_SYSTEM.md           # 포인트 시스템 완전 가이드
├── package.json               # 의존성
├── wrangler.jsonc             # Cloudflare 설정
└── ecosystem.config.cjs       # PM2 설정
```

## 🧪 테스트

### 서버 테스트
```bash
# 서버 상태 확인
curl http://localhost:3000

# 상품 목록 확인 (포인트 포함)
curl http://localhost:3000/api/products?limit=3

# 포인트 조회 (로그인 필요)
curl -H "Authorization: Bearer {token}" http://localhost:3000/api/points/me
```

### 데이터베이스 확인
```bash
# 포인트 테이블 확인
npx wrangler d1 execute webapp-production --local \
  --command="SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%point%'"

# 상품 포인트 적립률 확인
npx wrangler d1 execute webapp-production --local \
  --command="SELECT id, name, price, point_rate FROM products LIMIT 5"

# 추천인 관계 확인
npx wrangler d1 execute webapp-production --local \
  --command="SELECT * FROM user_referrals LIMIT 5"
```

## 📝 주요 변경 파일 (v1.1 → v1.2)

### 새로 추가된 파일
- `migrations/0034_add_point_rate.sql` - 포인트 적립률 컬럼
- `migrations/0035_add_point_system.sql` - 포인트 시스템 테이블
- `migrations/0036_add_order_points.sql` - 주문 포인트 컬럼
- `POINTS_SYSTEM.md` - 포인트 시스템 문서

### 수정된 파일
- `src/index.tsx` - 포인트 API 추가, 구매확정 시 포인트 적립
- `public/static/app.js` - 모든 상품 카드에 포인트 표시
- `README.md` - v1.2 정보로 업데이트

## 🎯 포인트 시스템 작동 예시

### 시나리오 1: 추천인 없는 일반 구매
```
1. 사용자 A가 45,500원 상품 구매 (35% 적립)
2. 구매확정 시 A에게 15,925P 적립
```

### 시나리오 2: 추천인이 있는 구매
```
1. B가 C를 추천
   → B: 20,000P (가입 보너스)
   → C: 20,000P (가입 보너스)

2. C가 45,500원 상품 구매
   → C: 15,925P 적립 (구매)
   → B: 15,925P 적립 (추천인 보너스)

3. C가 10번 구매
   → C: 159,250P 누적
   → B: 159,250P 누적
```

### 시나리오 3: 현금 전환
```
1. 사용자 D의 포인트: 650,000P
2. 출금 신청: 600,000P → 50,000원
3. 남은 포인트: 50,000P
```

## 🔐 보안 주의사항

- 포인트 API는 모두 `authMiddleware` 필요
- 출금 신청 시 포인트 즉시 차감 (이중 출금 방지)
- 추천인 자기 자신 등록 불가
- 포인트 거래 내역 모두 기록

## 📞 지원

문제 발생 시:
1. 이 문서의 복원 방법 참고
2. Git 태그 `v1.2-final-20250423`로 복원
3. 백업 파일 URL: https://www.genspark.ai/api/files/s/iSXaQMZC

## 📅 다음 업데이트 계획

- [ ] 포인트 페이지 프론트엔드 UI
- [ ] 상품 구매 시 포인트 사용 기능
- [ ] 포인트 선물하기
- [ ] 추천인 랭킹 시스템
- [ ] 월별 포인트 통계

---

**마지막 업데이트**: 2025년 4월 23일  
**버전**: v1.2-final-20250423  
**Git 커밋**: eef790e  
**총 커밋 수**: 339개
