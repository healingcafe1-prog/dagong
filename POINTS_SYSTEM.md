# 💎 다공 포인트 시스템

## 개요
다공 포인트 시스템은 구매자와 판매자 모두에게 혜택을 제공하는 리워드 프로그램입니다.

## 포인트 적립 방법

### 1. 구매 적립 (Purchase Points)
- **적립률**: 상품 가격의 25% ~ 35% (생산자가 설정)
- **적립 시점**: 구매확정 (수령 확인) 완료 시
- **예시**: 45,500원 상품 구매 시 → 15,925P 적립 (35% 기준)

### 2. 추천인 보너스 (Referral Bonus)
- **가입 보너스**: 추천인과 피추천인 각각 20,000P 지급
- **적립 시점**: 피추천인이 추천 코드로 회원가입 완료 시
- **조건**: 1인 1회 한정, 자기 자신 추천 불가

### 3. 추천인 구매 적립 (Referral Earnings)
- **적립률**: 피추천인이 구매한 상품 포인트와 동일
- **적립 시점**: 피추천인의 주문이 구매확정될 때
- **예시**: 
  - A가 B를 추천 → B가 45,500원 상품 구매 → B는 15,925P 적립
  - 동시에 A도 15,925P 추가 적립 (추천 보너스)
- **특징**: 피추천인이 구매할 때마다 지속적으로 적립

## 포인트 사용

### 현금 전환 (Cash Withdrawal)
- **전환 비율**: 600,000PV = 50,000원
- **최소 출금**: 600,000PV 이상
- **출금 방법**: 
  1. 마이페이지 → 포인트 관리
  2. 현금 출금 신청
  3. 은행명, 계좌번호, 예금주 입력
  4. 신청 완료
- **처리 기간**: 영업일 기준 3-5일
- **상태**: pending(대기) → approved(승인) → completed(완료)

## 포인트 거래 내역

### 거래 유형 (Transaction Types)
- `earn`: 일반 적립
- `purchase_earn`: 구매 적립
- `referral_bonus`: 추천인 가입 보너스
- `referral_earn`: 추천인 구매 적립
- `use`: 포인트 사용
- `withdraw`: 현금 출금

## API 엔드포인트

### 포인트 조회
```
GET /api/points/me
Authorization: Bearer {token}
```

**응답 예시:**
```json
{
  "points": {
    "total_points": 150000,
    "available_points": 120000,
    "used_points": 30000,
    "withdrawn_points": 0
  },
  "recent_transactions": [...],
  "referral_info": {
    "referrer_id": "user_123",
    "total_referral_earnings": 50000
  },
  "referred_count": 5,
  "cash_conversion": {
    "points_required": 600000,
    "cash_amount": 50000,
    "can_withdraw": false
  }
}
```

### 포인트 거래 내역
```
GET /api/points/transactions?limit=20&offset=0&type=purchase_earn
Authorization: Bearer {token}
```

### 현금 출금 신청
```
POST /api/points/withdraw
Authorization: Bearer {token}

{
  "bank_name": "국민은행",
  "account_number": "123-456-789012",
  "account_holder": "홍길동"
}
```

### 추천인 등록
```
POST /api/referrals/register
Authorization: Bearer {token}

{
  "referrer_code": "ABC123"
}
```

### 출금 신청 내역
```
GET /api/points/withdrawals
Authorization: Bearer {token}
```

## 데이터베이스 스키마

### user_points (사용자 포인트)
- `user_id`: 사용자 ID (UNIQUE)
- `total_points`: 총 적립 포인트
- `available_points`: 사용 가능 포인트
- `used_points`: 사용한 포인트
- `withdrawn_points`: 출금한 포인트

### point_transactions (포인트 거래 내역)
- `user_id`: 사용자 ID
- `transaction_type`: 거래 유형
- `points`: 포인트 금액 (+/-)
- `balance_after`: 거래 후 잔액
- `order_id`: 주문 ID (nullable)
- `referrer_id`: 추천인 ID (nullable)
- `referred_user_id`: 피추천인 ID (nullable)
- `description`: 설명

### point_withdrawals (출금 신청)
- `user_id`: 신청자 ID
- `points`: 출금 포인트 (600,000)
- `cash_amount`: 현금 금액 (50,000)
- `bank_name`: 은행명
- `account_number`: 계좌번호
- `account_holder`: 예금주
- `status`: pending/approved/rejected/completed

### user_referrals (추천 관계)
- `referrer_id`: 추천인 ID
- `referred_user_id`: 피추천인 ID (UNIQUE)
- `signup_bonus_given`: 가입 보너스 지급 여부
- `total_referral_earnings`: 추천 총 수익

## 포인트 적립 예시

### 시나리오 1: 일반 구매
1. 사용자 A가 45,500원 상품 구매 (포인트 적립률 35%)
2. 구매확정 시 A에게 15,925P 적립
3. A의 추천인이 없으면 여기서 종료

### 시나리오 2: 추천인이 있는 구매
1. 사용자 B가 C를 추천 (B와 C 각각 20,000P 가입 보너스)
2. C가 45,500원 상품 구매 (35% 적립률)
3. 구매확정 시:
   - C에게 15,925P 적립 (구매 적립)
   - B에게 15,925P 추가 적립 (추천인 구매 적립)
4. 결과:
   - C: 20,000P (가입) + 15,925P (구매) = 35,925P
   - B: 20,000P (가입) + 15,925P (추천 구매) = 35,925P

### 시나리오 3: 현금 전환
1. 사용자 D의 포인트: 650,000P
2. 출금 신청: 600,000P → 50,000원
3. 승인 및 입금 완료
4. 남은 포인트: 50,000P

## 주의사항

### 포인트 적립
- 구매확정 전 주문 취소 시 포인트 적립 없음
- 포인트는 구매확정 즉시 사용 가능
- 추천인 구매 적립은 피추천인의 모든 구매에 적용

### 현금 전환
- 최소 600,000PV 이상 필요
- 1회 출금 시 600,000PV 고정 (50,000원)
- 출금 신청 후 포인트 즉시 차감
- 출금 거부 시 포인트 복구

### 추천인 시스템
- 1인당 추천인 1명만 등록 가능
- 가입 후에도 추천인 등록 가능 (1회 한정)
- 자기 자신을 추천인으로 등록 불가
- 추천 관계는 영구적으로 유지

## 마이그레이션

```bash
# 포인트 시스템 마이그레이션 적용
npx wrangler d1 migrations apply webapp-production --local

# 포인트 시스템 데이터 확인
npx wrangler d1 execute webapp-production --local --command="SELECT * FROM user_points LIMIT 10"
```

## 테스트

### API 테스트
```bash
# 포인트 조회 (로그인 필요)
curl -X GET http://localhost:3000/api/points/me \
  -H "Authorization: Bearer {your_token}"

# 거래 내역 조회
curl -X GET "http://localhost:3000/api/points/transactions?limit=10" \
  -H "Authorization: Bearer {your_token}"

# 현금 출금 신청
curl -X POST http://localhost:3000/api/points/withdraw \
  -H "Authorization: Bearer {your_token}" \
  -H "Content-Type: application/json" \
  -d '{"bank_name":"국민은행","account_number":"123456789","account_holder":"홍길동"}'
```

## 향후 개선 사항
- [ ] 포인트 사용 기능 (상품 구매 시 포인트 결제)
- [ ] 포인트 선물 기능
- [ ] 포인트 등급제 (VIP, Gold, Silver)
- [ ] 추천인 랭킹 시스템
- [ ] 월별 포인트 통계
- [ ] 포인트 만료 기능 (1년)
