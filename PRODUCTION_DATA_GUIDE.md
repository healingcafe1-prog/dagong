# 프로덕션 D1 샘플 데이터 추가 가이드

## 현재 상황

프로덕션 D1 데이터베이스에는 테이블만 생성되어 있고, 데이터가 비어있습니다.

## 해결 방법

로컬 환경에는 이미 샘플 데이터가 있으므로, 이를 프로덕션으로 복사해야 합니다.

---

## 🔧 옵션 1: 수동으로 기본 데이터만 추가 (추천)

프로덕션 환경은 실제 데이터를 사용하는 것이 좋으므로, 샘플 데이터 대신 **실제 데이터를 입력**하는 것을 권장합니다.

현재 프로덕션 D1은 **비어있지만 정상 작동**하고 있습니다:
- ✅ API는 빈 배열 `[]` 반환
- ✅ 페이지는 "데이터가 없습니다" 메시지 표시
- ✅ 오류 없이 정상 작동

실제 운영 시에는:
1. 관리자 페이지를 통해 데이터 입력
2. 또는 CMS를 통해 데이터 관리
3. 또는 API를 통해 데이터 업로드

---

## 🔧 옵션 2: CLI로 데이터 추가 (API 키 필요)

CLI를 사용하여 로컬 데이터를 프로덕션으로 복사할 수 있습니다.

### 1단계: 로컬 데이터 export

```bash
cd /home/user/webapp

# 상품 데이터 export
npx wrangler d1 execute webapp-production --local \
  --command="SELECT * FROM products" --json > products_export.json

# 생산자 데이터 export  
npx wrangler d1 execute webapp-production --local \
  --command="SELECT * FROM producers" --json > producers_export.json

# 지역 데이터 export
npx wrangler d1 execute webapp-production --local \
  --command="SELECT * FROM regions" --json > regions_export.json
```

### 2단계: SQL 생성 스크립트 작성

`generate_insert_sql.js`:
```javascript
const fs = require('fs');

// Export 파일 읽기
const products = JSON.parse(fs.readFileSync('products_export.json'));
const producers = JSON.parse(fs.readFileSync('producers_export.json'));
const regions = JSON.parse(fs.readFileSync('regions_export.json'));

// INSERT SQL 생성
let sql = '';

// Producers (외래키 선)
producers.results.forEach(p => {
  sql += `INSERT INTO producers VALUES (${p.id}, '${p.name}', ...);\n`;
});

// Regions
regions.results.forEach(r => {
  sql += `INSERT INTO regions VALUES (${r.id}, '${r.name}', ...);\n`;
});

// Products
products.results.forEach(p => {
  sql += `INSERT INTO products VALUES (${p.id}, '${p.name}', ...);\n`;
});

fs.writeFileSync('production_data_insert.sql', sql);
```

### 3단계: 프로덕션에 적용

```bash
# API 토큰 설정
export CLOUDFLARE_API_TOKEN="U7FtTc6Eh3aGNP9mlgZZf8lhlyFBV4QLPDnSxBjo"

# SQL 실행
npx wrangler d1 execute webapp-production \
  --remote \
  --file=production_data_insert.sql
```

---

## 🔧 옵션 3: Dashboard에서 수동 입력 (가장 간단)

Cloudflare Dashboard의 D1 콘솔에서 직접 INSERT 문을 실행할 수 있습니다.

### 1. D1 콘솔 접속:
- https://dash.cloudflare.com/
- Workers & Pages → D1 → webapp-production
- Console 탭 클릭

### 2. 기본 데이터 삽입 예시:

```sql
-- 지역 데이터
INSERT INTO regions (name, description) VALUES 
('제주도', '제주 녹차의 고장'),
('보성', '한국 최대 차 생산지'),
('하동', '천년 역사의 차 시배지'),
('이천', '한국 도자기의 메카');

-- 생산자 데이터  
INSERT INTO producers (name, description, region_id) VALUES
('제주 오설록', '제주 대표 차 생산자', 1),
('보성 녹차마을', '보성 유기농 녹차', 2),
('하동 야생차', '하동 야생 차나무', 3),
('이천 도자기공방', '전통 도자기 제작', 4);

-- 상품 데이터 (예시)
INSERT INTO products (name, description, price, producer_id, region_id, category) VALUES
('제주 청정 녹차 50g', '제주 청정 지역에서 자란 녹차', 17500, 1, 1, 'tea'),
('보성 유기농 녹차 100g', '유기농 인증 받은 프리미엄 녹차', 21000, 2, 2, 'tea'),
('하동 야생 백모단 30g', '야생 차나무의 어린 순', 35000, 3, 3, 'tea'),
('청자 주전자', '전통 청자 기법의 주전자', 105000, 4, 4, 'craft');
```

### 3. Execute 클릭

---

## 💡 추천 방법

**현재 상황**: 프로덕션 사이트가 정상 작동하고 있으므로, 샘플 데이터 추가는 **선택 사항**입니다.

**추천**:
1. ✅ **지금은 그대로 두기** - 사이트가 정상 작동 중
2. 🔜 **실제 운영 시** - 관리자 페이지나 API로 실제 데이터 입력
3. 🧪 **테스트가 필요하면** - Dashboard에서 몇 개만 수동 입력

---

## 🎯 다음 단계로 이동

샘플 데이터는 선택 사항이므로, **3번 Android 앱 빌드**로 진행하시겠습니까?

또는 Dashboard에서 간단히 몇 개의 데이터만 추가하고 싶으시면 말씀해주세요!
