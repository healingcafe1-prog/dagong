# 결제 및 정산 시스템 API 테스트 가이드

## 🎯 구현 완료 현황

### ✅ 데이터베이스 (7개 테이블)
- `business_accounts` - 사업자 계좌 정보
- `payment_transactions` - 결제 트랜잭션
- `settlement_batches` - 정산 배치
- `producer_settlements` - 생산자별 정산
- `settlement_items` - 정산 항목 상세
- `platform_revenues` - 플랫폼 수익 기록
- `settlement_disputes` - 정산 분쟁 처리

### ✅ API 엔드포인트 (11개)

## 📋 API 사용 가이드

### 1. 사업자 계좌 등록

```bash
# 계좌 등록
curl -X POST http://localhost:3000/api/producers/1/business-account \
  -H "Content-Type: application/json" \
  -d '{
    "business_registration_number": "1234567890",
    "business_name": "보성차농장",
    "representative_name": "김생산",
    "business_type": "농업",
    "business_category": "차 재배",
    "bank_name": "농협은행",
    "account_number": "123-45-67890",
    "account_holder": "김생산",
    "commission_rate": 9.9,
    "settlement_cycle": "weekly"
  }'

# 응답
{
  "success": true,
  "accountId": 1,
  "message": "사업자 계좌가 등록되었습니다. 관리자 승인 후 사용 가능합니다."
}
```

### 2. 계좌 조회

```bash
curl http://localhost:3000/api/producers/1/business-account

# 응답 (계좌번호 마스킹 처리됨)
{
  "account": {
    "id": 1,
    "producer_id": 1,
    "business_name": "보성차농장",
    "bank_name": "농협은행",
    "account_number_masked": "123-****-7890",  # 마스킹됨
    "account_holder": "김생산",
    "commission_rate": 9.9,
    "settlement_cycle": "weekly",
    "verification_status": "pending"
  }
}
```

### 3. 계좌 수정

```bash
curl -X PUT http://localhost:3000/api/producers/1/business-account \
  -H "Content-Type: application/json" \
  -d '{
    "bank_name": "농협은행",
    "account_number": "123-45-67891",
    "account_holder": "김생산",
    "settlement_cycle": "weekly"
  }'
```

### 4. 결제 승인 (토스페이먼츠)

```bash
curl -X POST http://localhost:3000/api/payment/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORDER_202401_001",
    "amount": 50000,
    "paymentKey": "payment_key_from_toss"
  }'

# 응답
{
  "success": true,
  "payment": {
    "orderId": "ORDER_202401_001",
    "totalAmount": 50000,
    "method": "카드",
    "approvedAt": "2026-02-04T15:30:00",
    ...
  },
  "message": "결제가 완료되었습니다."
}
```

### 5. 결제 취소

```bash
curl -X POST http://localhost:3000/api/payment/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "paymentKey": "payment_key_from_toss",
    "cancelReason": "고객 요청"
  }'
```

### 6. 생산자 정산 내역 조회

```bash
curl http://localhost:3000/api/producers/1/settlements

# 응답
{
  "settlements": [
    {
      "id": 1,
      "producer_id": 1,
      "settlement_period_start": "2026-01-20",
      "settlement_period_end": "2026-01-26",
      "order_count": 15,
      "total_sales_amount": 1500000,
      "total_commission_amount": 148500,
      "settlement_amount": 1351500,
      "settlement_status": "completed",
      "transferred_at": "2026-01-30T10:00:00"
    }
  ]
}
```

### 7. 정산 상세 내역 (주문 목록)

```bash
curl http://localhost:3000/api/settlements/1/items

# 응답
{
  "items": [
    {
      "order_number": "ORDER_202401_001",
      "product_name": "보성 녹차 1kg",
      "order_date": "2026-01-21T14:30:00",
      "sales_amount": 100000,
      "commission_rate": 9.9,
      "commission_amount": 9900,
      "settlement_amount": 90100
    }
  ]
}
```

### 8. 정산 배치 생성 (관리자)

```bash
curl -X POST http://localhost:3000/api/admin/settlements/create-batch \
  -H "Content-Type: application/json" \
  -d '{
    "periodStart": "2026-01-20",
    "periodEnd": "2026-01-26"
  }'

# 응답
{
  "success": true,
  "batchId": 1,
  "producerCount": 10,
  "totalOrderAmount": 10000000,
  "totalCommission": 990000,
  "totalSettlement": 9010000
}
```

### 9. 정산 배치 목록 (관리자)

```bash
curl http://localhost:3000/api/admin/settlements/batches

# 응답
{
  "batches": [
    {
      "id": 1,
      "settlement_period_start": "2026-01-20",
      "settlement_period_end": "2026-01-26",
      "settlement_status": "completed",
      "producer_count": 10,
      "total_order_amount": 10000000,
      "total_commission_amount": 990000,
      "total_settlement_amount": 9010000,
      "completed_at": "2026-01-30T10:00:00"
    }
  ]
}
```

## 🔒 환경 변수 설정

### 로컬 개발

`.dev.vars` 파일 생성:
```bash
TOSS_PAYMENTS_CLIENT_KEY=test_ck_YOUR_CLIENT_KEY
TOSS_PAYMENTS_SECRET_KEY=test_sk_YOUR_SECRET_KEY
```

### 프로덕션 (Cloudflare)

```bash
# Cloudflare Secrets 설정
wrangler secret put TOSS_PAYMENTS_CLIENT_KEY
# 입력: live_ck_YOUR_CLIENT_KEY

wrangler secret put TOSS_PAYMENTS_SECRET_KEY
# 입력: live_sk_YOUR_SECRET_KEY
```

## 🧪 테스트 시나리오

### 시나리오 1: 신규 생산자 등록

```bash
# 1. 사업자 계좌 등록
curl -X POST http://localhost:3000/api/producers/2/business-account \
  -H "Content-Type: application/json" \
  -d '{
    "business_registration_number": "2345678901",
    "business_name": "하동야생차",
    "representative_name": "이차농",
    "bank_name": "우리은행",
    "account_number": "234-56-78901",
    "account_holder": "이차농"
  }'

# 2. 등록 확인
curl http://localhost:3000/api/producers/2/business-account

# 3. 관리자가 승인 (수동)
# DB에서 verification_status를 'verified'로 변경
```

### 시나리오 2: 결제 프로세스

```bash
# 프론트엔드에서 토스페이먼츠 SDK로 결제 진행 후
# 백엔드로 승인 요청

curl -X POST http://localhost:3000/api/payment/confirm \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORDER_202602_001",
    "amount": 85000,
    "paymentKey": "mock_payment_key_12345"
  }'
```

### 시나리오 3: 주간 정산

```bash
# 1. 정산 배치 생성 (매주 월요일 실행)
curl -X POST http://localhost:3000/api/admin/settlements/create-batch \
  -H "Content-Type: application/json" \
  -d '{
    "periodStart": "2026-01-27",
    "periodEnd": "2026-02-02"
  }'

# 2. 배치 결과 확인
curl http://localhost:3000/api/admin/settlements/batches

# 3. 생산자 정산 내역 확인
curl http://localhost:3000/api/producers/1/settlements

# 4. 실제 송금 처리 (수동 또는 API 연동)
```

## 📊 데이터 흐름

### 결제 흐름

```
소비자 결제
  ↓
토스페이먼츠 승인
  ↓
/api/payment/confirm 호출
  ↓
payment_transactions 레코드 생성
  ↓
orders.payment_status = 'completed'
  ↓
orders.order_status = 'paid'
```

### 정산 흐름

```
관리자: 정산 배치 생성
  ↓
/api/admin/settlements/create-batch
  ↓
settlement_batches 생성
  ↓
생산자별 매출 집계 (order_items)
  ↓
수수료 계산 (9.9%)
  ↓
producer_settlements 레코드 생성
  ↓
platform_revenues 기록
  ↓
실제 송금 처리
  ↓
settlement_status = 'completed'
```

## 🛡️ 보안 체크리스트

- [x] 계좌번호 마스킹 (123-****-7890)
- [x] API 키는 환경 변수로 관리
- [x] 결제 검증은 서버에서만 처리
- [x] HTTPS 필수 (프로덕션)
- [ ] 결제 금액 변조 방지 로직 추가 (다음 단계)
- [ ] 관리자 인증 미들웨어 추가 (다음 단계)
- [ ] Rate Limiting 추가 (다음 단계)

## 🚀 다음 단계

### Phase 1: 프론트엔드 구현 (우선)
1. 사업자 계좌 등록 페이지
2. 토스페이먼츠 SDK 통합
3. 결제 UI 구현
4. 생산자 정산 내역 페이지

### Phase 2: 보안 강화
1. 관리자 인증 시스템
2. API Rate Limiting
3. 결제 금액 검증 강화

### Phase 3: 자동화
1. 정산 배치 자동 실행 (Cron Job)
2. 정산 완료 알림 (이메일/SMS)
3. 송금 API 자동 연동

## 📞 문의

- 토스페이먼츠 API 문서: https://docs.tosspayments.com/
- 다공 기술 문서: /home/user/webapp/PAYMENT_SETTLEMENT_GUIDE.md

---

**마지막 업데이트**: 2026-02-04  
**버전**: 1.0  
**상태**: ✅ API 구현 완료, 테스트 성공
