# 다공 결제 및 정산 시스템 가이드

## 📋 시스템 개요

다공 플랫폼은 생산자와 소비자를 직접 연결하는 직거래 플랫폼입니다. 
결제 및 정산 시스템은 다음과 같은 흐름으로 작동합니다:

```
소비자 → [결제] → 플랫폼 → [정산] → 생산자
          (PG사)              (수수료 차감)
```

### 핵심 개념

- **수수료율**: 기본 9.9% (생산자별 설정 가능)
- **정산 주기**: 주간/격주/월간 (생산자 선택)
- **정산 금액**: 판매금액 - 플랫폼 수수료
- **PG사**: 토스페이먼츠 또는 포트원 (PortOne) 사용

## 🔐 1. 사업자 계좌 등록

### 1.1 필수 정보

생산자(판매자)는 다음 정보를 등록해야 합니다:

#### 사업자 정보
- 사업자등록번호 (10자리)
- 상호명
- 대표자명
- 업태
- 업종

#### 계좌 정보
- 은행명
- 계좌번호
- 예금주 (대표자명과 일치 필요)

#### 정산 설정
- 수수료율 (기본 9.9%, 협의 가능)
- 정산 주기 (weekly/biweekly/monthly)
- 최소 정산 금액 (기본 10,000원)

### 1.2 등록 프로세스

```
1. 생산자 로그인
2. 마이페이지 → 사업자 정보 등록
3. 필수 정보 입력
4. 계좌 인증 (1원 입금 확인)
5. 관리자 승인 대기
6. 승인 완료 → 판매 가능
```

### 1.3 API 엔드포인트

```typescript
// 사업자 계좌 등록
POST /api/producers/:id/business-account
{
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
}

// 사업자 계좌 조회
GET /api/producers/:id/business-account

// 사업자 계좌 수정
PUT /api/producers/:id/business-account
```

## 💳 2. 결제 시스템

### 2.1 지원 결제 수단

- 신용카드 / 체크카드
- 계좌이체
- 가상계좌
- 간편결제 (카카오페이, 네이버페이, 페이코)
- 휴대폰 소액결제

### 2.2 결제 흐름

```
1. 장바구니 → 주문서 작성
2. 결제 수단 선택
3. PG사 결제창 호출
4. 결제 승인
5. 주문 완료
6. 배송 준비
```

### 2.3 토스페이먼츠 연동

#### 클라이언트 사이드 (프론트엔드)

```html
<!-- 토스페이먼츠 SDK 로드 -->
<script src="https://js.tosspayments.com/v1/payment"></script>

<script>
const clientKey = 'test_ck_YOUR_CLIENT_KEY'
const tossPayments = TossPayments(clientKey)

// 결제 요청
async function requestPayment() {
  const payment = tossPayments.payment({ customerKey: 'CUSTOMER_KEY' })
  
  await payment.requestPayment('카드', {
    amount: 50000,
    orderId: 'ORDER_202401_001',
    orderName: '보성 녹차 1kg',
    successUrl: 'https://dagong.co.kr/payment/success',
    failUrl: 'https://dagong.co.kr/payment/fail',
    customerEmail: 'customer@example.com',
    customerName: '홍길동',
  })
}
</script>
```

#### 서버 사이드 (백엔드)

```typescript
// 결제 승인 검증
app.post('/api/payment/confirm', async (c) => {
  const { orderId, amount, paymentKey } = await c.req.json()
  
  // 토스페이먼츠 API 호출
  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(SECRET_KEY + ':')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      orderId,
      amount,
      paymentKey
    })
  })
  
  const payment = await response.json()
  
  // 결제 정보 저장
  await c.env.DB.prepare(`
    INSERT INTO payment_transactions 
    (order_id, pg_provider, pg_transaction_id, payment_method, payment_amount, transaction_status)
    VALUES (?, 'tosspayments', ?, ?, ?, 'completed')
  `).bind(orderId, paymentKey, payment.method, amount).run()
  
  // 주문 상태 업데이트
  await c.env.DB.prepare(`
    UPDATE orders SET payment_status = 'completed', payment_date = CURRENT_TIMESTAMP
    WHERE order_number = ?
  `).bind(orderId).run()
  
  return c.json({ success: true })
})
```

### 2.4 환경 변수 설정

```bash
# .dev.vars (로컬 개발)
TOSS_PAYMENTS_CLIENT_KEY=test_ck_YOUR_CLIENT_KEY
TOSS_PAYMENTS_SECRET_KEY=test_sk_YOUR_SECRET_KEY

# Cloudflare에서 시크릿 설정 (프로덕션)
wrangler secret put TOSS_PAYMENTS_CLIENT_KEY
wrangler secret put TOSS_PAYMENTS_SECRET_KEY
```

## 💰 3. 정산 시스템

### 3.1 정산 주기 및 프로세스

#### 주간 정산 (기본)
- 매주 월요일 00:00 ~ 일요일 23:59 거래 집계
- 다음 주 목요일 정산 완료
- 금요일 입금

#### 정산 계산식
```
생산자 정산금액 = 판매금액 × (1 - 수수료율)
플랫폼 수수료 = 판매금액 × 수수료율

예시:
- 판매금액: 100,000원
- 수수료율: 9.9%
- 생산자 수령: 90,100원
- 플랫폼 수익: 9,900원
```

### 3.2 정산 배치 생성 (관리자 기능)

```typescript
// 주간 정산 배치 생성
app.post('/api/admin/settlements/create-batch', async (c) => {
  const { periodStart, periodEnd } = await c.req.json()
  
  // 1. 정산 배치 생성
  const batch = await c.env.DB.prepare(`
    INSERT INTO settlement_batches 
    (settlement_period_start, settlement_period_end, settlement_status)
    VALUES (?, ?, 'calculating')
  `).bind(periodStart, periodEnd).run()
  
  const batchId = batch.meta.last_row_id
  
  // 2. 생산자별 정산 내역 계산
  const producers = await c.env.DB.prepare(`
    SELECT 
      p.id as producer_id,
      ba.id as account_id,
      ba.bank_name,
      ba.account_number,
      ba.account_holder,
      ba.commission_rate,
      COUNT(DISTINCT oi.order_id) as order_count,
      SUM(oi.item_total) as total_sales,
      SUM(oi.commission_amount) as total_commission
    FROM producers p
    JOIN business_accounts ba ON p.id = ba.producer_id
    JOIN order_items oi ON p.id = oi.producer_id
    JOIN orders o ON oi.order_id = o.id
    WHERE o.payment_status = 'completed'
      AND o.order_status NOT IN ('cancelled', 'refunded')
      AND o.payment_date BETWEEN ? AND ?
    GROUP BY p.id
  `).bind(periodStart, periodEnd).all()
  
  // 3. 각 생산자별 정산 레코드 생성
  for (const producer of producers.results) {
    const settlementAmount = producer.total_sales - producer.total_commission
    
    await c.env.DB.prepare(`
      INSERT INTO producer_settlements
      (batch_id, producer_id, account_id, period_start, period_end,
       order_count, total_sales, total_commission, settlement_amount,
       bank_name, account_number, account_holder, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `).bind(
      batchId, producer.producer_id, producer.account_id,
      periodStart, periodEnd,
      producer.order_count, producer.total_sales, 
      producer.total_commission, settlementAmount,
      producer.bank_name, producer.account_number, producer.account_holder
    ).run()
  }
  
  // 4. 배치 상태 업데이트
  await c.env.DB.prepare(`
    UPDATE settlement_batches SET settlement_status = 'ready' WHERE id = ?
  `).bind(batchId).run()
  
  return c.json({ batchId, producerCount: producers.results.length })
})
```

### 3.3 정산 내역 조회 (생산자용)

```typescript
// 생산자의 정산 내역 조회
app.get('/api/producers/:id/settlements', async (c) => {
  const producerId = c.req.param('id')
  
  const settlements = await c.env.DB.prepare(`
    SELECT 
      ps.*,
      sb.settlement_period_start,
      sb.settlement_period_end
    FROM producer_settlements ps
    JOIN settlement_batches sb ON ps.batch_id = sb.id
    WHERE ps.producer_id = ?
    ORDER BY sb.settlement_period_end DESC
  `).bind(producerId).all()
  
  return c.json({ settlements: settlements.results })
})

// 특정 정산 상세 내역 (주문 목록)
app.get('/api/settlements/:id/items', async (c) => {
  const settlementId = c.req.param('id')
  
  const items = await c.env.DB.prepare(`
    SELECT 
      o.order_number,
      o.payment_date,
      oi.product_name,
      oi.quantity,
      oi.item_total,
      oi.commission_amount,
      (oi.item_total - oi.commission_amount) as settlement_amount
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    JOIN producer_settlements ps ON oi.producer_id = ps.producer_id
    WHERE ps.id = ?
      AND o.payment_date BETWEEN ps.period_start AND ps.period_end
  `).bind(settlementId).all()
  
  return c.json({ items: items.results })
})
```

## 📊 4. 데이터베이스 스키마

### 4.1 핵심 테이블

```sql
-- 사업자 계좌
business_accounts
- id, producer_id
- business_registration_number, business_name, representative_name
- bank_name, account_number, account_holder
- commission_rate, settlement_cycle
- verification_status

-- 결제 트랜잭션
payment_transactions
- id, order_id
- pg_provider, pg_transaction_id
- payment_method, payment_amount
- transaction_status, approved_at

-- 정산 배치
settlement_batches
- id, period_start, period_end
- settlement_status
- total_order_amount, total_commission, total_settlement

-- 생산자 정산
producer_settlements
- id, batch_id, producer_id, account_id
- order_count, total_sales, total_commission, settlement_amount
- bank_name, account_number, account_holder
- settlement_status, transferred_at
```

### 4.2 주문 아이템 commission 필드 (기존)

```sql
order_items
- producer_id          -- 생산자 ID
- commission_rate      -- 수수료율 (기본 9.9)
- commission_amount    -- 수수료 금액
- producer_revenue     -- 생산자 수익
```

## 🚀 5. 구현 순서

### Phase 1: 기본 구조 (완료)
- [x] 데이터베이스 스키마 설계
- [x] 핵심 테이블 정의

### Phase 2: 사업자 등록 (다음 단계)
- [ ] 사업자 계좌 등록 API
- [ ] 계좌 인증 프로세스
- [ ] 관리자 승인 기능

### Phase 3: 결제 연동
- [ ] 토스페이먼츠 SDK 통합
- [ ] 결제 승인 API
- [ ] 결제 실패/취소 처리

### Phase 4: 정산 시스템
- [ ] 정산 배치 생성 로직
- [ ] 생산자별 정산 계산
- [ ] 정산 내역 조회 API
- [ ] 정산 완료 처리

### Phase 5: 관리자 도구
- [ ] 정산 대시보드
- [ ] 수수료 관리
- [ ] 정산 승인/거부

## 📝 6. 환경 설정

### 6.1 Cloudflare Secrets 설정

```bash
# 토스페이먼츠
wrangler secret put TOSS_PAYMENTS_CLIENT_KEY
wrangler secret put TOSS_PAYMENTS_SECRET_KEY

# 포트원 (선택)
wrangler secret put PORTONE_API_KEY
wrangler secret put PORTONE_API_SECRET
```

### 6.2 wrangler.jsonc 업데이트

```jsonc
{
  "name": "dagong",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "dagong-production",
      "database_id": "your-database-id"
    }
  ],
  // 환경 변수는 Secrets로 관리
}
```

## 🔒 7. 보안 고려사항

### 7.1 계좌 정보 보호
- 계좌번호는 마스킹 처리 (예: 123-****-7890)
- 전체 계좌번호는 서버에서만 접근 가능
- HTTPS 필수

### 7.2 결제 정보 보호
- PG사 시크릿 키는 절대 클라이언트에 노출하지 않음
- 결제 검증은 반드시 서버에서 처리
- 금액 변조 방지 로직

### 7.3 정산 검증
- 이중 정산 방지
- 정산 금액 검증
- 관리자 승인 프로세스

## 📞 8. 고객 지원

### 결제 문의
- 결제 실패 시 자동 알림
- 환불 처리 프로세스
- 고객센터 연동

### 정산 문의
- 정산 내역 문의 채널
- 정산 지연 시 알림
- 정산 분쟁 해결 프로세스

## 📚 9. 참고 자료

- [토스페이먼츠 개발 문서](https://docs.tosspayments.com/)
- [포트원 개발 문서](https://portone.gitbook.io/docs/)
- [Cloudflare D1 문서](https://developers.cloudflare.com/d1/)
- [Hono 프레임워크](https://hono.dev/)

---

**작성일**: 2026-02-04  
**버전**: 1.0  
**담당**: 다공 개발팀
