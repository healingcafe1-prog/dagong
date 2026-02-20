# 빠른 복구 가이드 (Quick Recovery Guide)

## 🎯 목적
프로덕션 데이터를 안전하게 완전히 복구합니다.

---

## ⚡ 방법 1: 자동 복구 (CLI) - 권장

### 실행 명령어
```bash
cd /home/user/webapp
bash restore_production.sh
```

**또는**

```bash
cd /home/user/webapp
npx wrangler d1 execute webapp-production --remote --file=SAFE_INSERT_ONLY.sql
```

**소요 시간**: 약 30초  
**필요 조건**: CLOUDFLARE_API_TOKEN

---

## 📋 방법 2: 수동 복구 (Cloudflare 콘솔)

### Step 1: 콘솔 접속
https://dash.cloudflare.com/ → Workers & Pages → D1 → webapp-production → Console

### Step 2: SQL 복사
1. **GitHub Raw 파일 열기**:  
   https://github.com/healingcafe1-prog/dagong/blob/main/SAFE_INSERT_ONLY.sql
   
2. **Raw 버튼 클릭** (중요!)

3. **전체 선택 (Ctrl+A)** 후 **복사 (Ctrl+C)**

### Step 3: 실행
1. Cloudflare D1 콘솔에 **붙여넣기 (Ctrl+V)**
2. **Execute** 버튼 클릭

**소요 시간**: 약 2분  
**필요 조건**: Cloudflare 계정 로그인

---

## ✅ 복구 후 검증

### 빠른 확인
```bash
cd /home/user/webapp
bash check_and_recover.sh
```

### 웹 브라우저 확인
- 프로덕션: https://dagong-bi1.pages.dev

---

## 📦 복구되는 데이터

| 항목 | 개수 |
|-----|------|
| 지역 | 17개 |
| 카테고리 | 27개 |
| 생산자 | 13개 |
| 차 제품 | 20개 |
| 공예품 | 23개 |
| 선물세트 | 15개 |
| 지역특산품 | 33개 |
| 체험 프로그램 | 14개 |

**총 제품**: 78개  
**총 체험**: 14개

---

## 🔒 안전성

- ✅ **DELETE 없음** - 기존 데이터 삭제하지 않음
- ✅ **INSERT OR IGNORE** - 중복 방지
- ✅ **순서 보장** - FOREIGN KEY 에러 방지
- ✅ **올바른 스키마** - 프로덕션 DB와 100% 일치

---

## 📖 상세 가이드

자세한 내용은 다음 파일을 참조하세요:
- **FINAL_COMPLETE_GUIDE.md** - 전체 가이드
- **SAFE_INSERT_ONLY.sql** - 복구 SQL 파일

---

## 🔗 링크

- **GitHub**: https://github.com/healingcafe1-prog/dagong
- **프로덕션**: https://dagong-bi1.pages.dev
- **Cloudflare**: https://dash.cloudflare.com/

---

**작성일**: 2026-02-20  
**버전**: 1.0
