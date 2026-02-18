# PWA/Android 앱 아이콘 생성 가이드

## 📱 필요한 아이콘 크기

### PWA (웹 앱)
- 72x72px
- 96x96px
- 128x128px
- 144x144px
- 152x152px
- 192x192px (필수 - Android)
- 384x384px
- 512x512px (필수 - Android, Splash Screen)

### Android App (TWA)
- 48x48dp (mdpi)
- 72x72dp (hdpi)
- 96x96dp (xhdpi)
- 144x144dp (xxhdpi)
- 192x192dp (xxxhdpi)

---

## 🎨 디자인 가이드라인

### 아이콘 디자인 권장사항
1. **심플하고 명확한 디자인**: 작은 크기에서도 식별 가능
2. **Safe Zone**: 아이콘 주변 10% 여백 확보
3. **단색 배경**: 투명 배경보다 단색 추천
4. **고대비**: 명확한 색상 대비로 가시성 확보
5. **브랜드 일관성**: 로고와 일치하는 디자인

### 다공 앱 아이콘 컨셉
- **메인 컬러**: #059669 (녹색)
- **아이콘**: 차잎 (🍃) 또는 찻잔 (☕)
- **스타일**: 모던하고 깔끔한 플랫 디자인

---

## 🛠️ 아이콘 생성 방법

### Option 1: 온라인 도구 사용 (가장 간단)

#### 1. PWA Builder (추천)
https://www.pwabuilder.com/imageGenerator

1. 512x512px PNG 파일 업로드
2. "Generate" 클릭
3. 모든 크기의 아이콘 자동 생성
4. ZIP 다운로드 후 `/public/static/icons/` 에 배치

#### 2. RealFaviconGenerator
https://realfavicongenerator.net/

1. 마스터 이미지 업로드
2. iOS, Android, Web 옵션 설정
3. 생성 후 다운로드

#### 3. App Icon Generator
https://appicon.co/

1. 1024x1024px 이미지 업로드
2. 플랫폼 선택 (Android, iOS, Web)
3. 자동 생성

---

### Option 2: ImageMagick 사용 (CLI)

```bash
# ImageMagick 설치
# macOS: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# 512x512 마스터 이미지에서 자동 생성
cd /home/user/webapp/public/static/icons

# 모든 크기 생성
convert master-icon.png -resize 72x72 icon-72x72.png
convert master-icon.png -resize 96x96 icon-96x96.png
convert master-icon.png -resize 128x128 icon-128x128.png
convert master-icon.png -resize 144x144 icon-144x144.png
convert master-icon.png -resize 152x152 icon-152x152.png
convert master-icon.png -resize 192x192 icon-192x192.png
convert master-icon.png -resize 384x384 icon-384x384.png
convert master-icon.png -resize 512x512 icon-512x512.png
```

---

### Option 3: Node.js Script 사용

아래 스크립트로 자동 생성:

```bash
cd /home/user/webapp
npm install sharp --save-dev
```

```javascript
// generate-icons.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputFile = 'master-icon.png'; // 512x512 이상
const outputDir = 'public/static/icons';

// 디렉토리 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 모든 크기 생성
Promise.all(
  sizes.map(size => 
    sharp(inputFile)
      .resize(size, size)
      .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
  )
).then(() => {
  console.log('✅ All icons generated successfully!');
}).catch(err => {
  console.error('❌ Error generating icons:', err);
});
```

```bash
node generate-icons.js
```

---

## 🎨 임시 아이콘 생성 (개발용)

개발 단계에서는 단색 배경 + 텍스트로 빠르게 생성:

```bash
cd /home/user/webapp/public/static/icons

# 녹색 배경 + 흰색 텍스트 "茶"
convert -size 512x512 xc:'#059669' \
  -font Arial -pointsize 300 -fill white \
  -gravity center -annotate +0+0 '茶' \
  icon-512x512.png

# 다른 크기 생성
for size in 72 96 128 144 152 192 384; do
  convert icon-512x512.png -resize ${size}x${size} icon-${size}x${size}.png
done
```

---

## 📂 파일 구조

```
/home/user/webapp/
└── public/
    └── static/
        └── icons/
            ├── icon-72x72.png
            ├── icon-96x96.png
            ├── icon-128x128.png
            ├── icon-144x144.png
            ├── icon-152x152.png
            ├── icon-192x192.png (필수)
            ├── icon-384x384.png
            └── icon-512x512.png (필수)
```

---

## ✅ 검증

### 로컬 테스트
```bash
# 서버 재시작
cd /home/user/webapp && pm2 restart webapp

# manifest.json 확인
curl http://localhost:3000/manifest.json

# 아이콘 확인
curl -I http://localhost:3000/static/icons/icon-192x192.png
curl -I http://localhost:3000/static/icons/icon-512x512.png
```

### Lighthouse PWA 검사
1. Chrome DevTools 열기 (F12)
2. Lighthouse 탭 선택
3. Progressive Web App 체크
4. "Generate report" 클릭
5. PWA 점수 확인

---

## 🚀 다음 단계

1. ✅ 아이콘 파일 생성 (위 방법 중 선택)
2. ✅ `/public/static/icons/` 디렉토리에 배치
3. ✅ 서버 재시작 및 확인
4. ✅ Lighthouse PWA 검사
5. ⚠️ Android TWA 앱 생성 (ANDROID_TWA_GUIDE.md 참고)

---

## 📋 체크리스트

- [ ] 512x512px 마스터 아이콘 준비
- [ ] 모든 크기 아이콘 생성 (72, 96, 128, 144, 152, 192, 384, 512)
- [ ] `/public/static/icons/` 디렉토리에 배치
- [ ] manifest.json에서 아이콘 경로 확인
- [ ] 브라우저에서 아이콘 로드 확인
- [ ] PWA 설치 배너 동작 확인
- [ ] Lighthouse PWA 점수 90+ 달성

---

## 💡 Tips

1. **Maskable Icons**: Android Adaptive Icons를 위해 여백 추가
   - Safe zone: 중앙 80% 영역에만 중요 요소 배치
   
2. **Favicon도 함께 생성**:
   ```bash
   convert icon-512x512.png -resize 32x32 favicon-32x32.png
   convert icon-512x512.png -resize 16x16 favicon-16x16.png
   ```

3. **최적화**:
   ```bash
   # PNG 최적화
   pngquant icon-*.png --quality=80-95 --ext=.png --force
   ```

---

## 🔗 유용한 리소스

- PWA Builder: https://www.pwabuilder.com/imageGenerator
- RealFaviconGenerator: https://realfavicongenerator.net/
- App Icon Generator: https://appicon.co/
- Maskable.app: https://maskable.app/ (Maskable Icon 테스트)
- Icon Kitchen: https://icon.kitchen/ (Android Adaptive Icons)
