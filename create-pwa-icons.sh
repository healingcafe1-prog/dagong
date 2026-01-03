#!/bin/bash

# PWA 아이콘 생성 스크립트
# ImageMagick이 필요합니다: apt-get install imagemagick

# 아이콘 디렉토리 생성
mkdir -p public/static/icons
mkdir -p public/static/screenshots

# SVG로 기본 아이콘 생성
cat > /tmp/tea-icon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- 배경 -->
  <rect width="512" height="512" fill="#7c9473" rx="80"/>
  
  <!-- 차잔 -->
  <g transform="translate(256, 256)">
    <!-- 잔 몸체 -->
    <path d="M-80 -20 L-90 60 Q-90 80 -70 90 L70 90 Q90 80 90 60 L80 -20 Z" 
          fill="#f5f1e8" stroke="#8b6f47" stroke-width="6"/>
    
    <!-- 잔 손잡이 -->
    <path d="M90 0 Q120 0 120 30 Q120 60 90 60" 
          fill="none" stroke="#8b6f47" stroke-width="6"/>
    
    <!-- 차 -->
    <ellipse cx="0" cy="-10" rx="75" ry="15" fill="#a8c69f" opacity="0.7"/>
    
    <!-- 김 (증기) -->
    <path d="M-40 -40 Q-35 -60 -40 -80" 
          fill="none" stroke="#f5f1e8" stroke-width="4" opacity="0.6"/>
    <path d="M0 -45 Q5 -65 0 -85" 
          fill="none" stroke="#f5f1e8" stroke-width="4" opacity="0.6"/>
    <path d="M40 -40 Q45 -60 40 -80" 
          fill="none" stroke="#f5f1e8" stroke-width="4" opacity="0.6"/>
    
    <!-- 차잎 -->
    <ellipse cx="-20" cy="30" rx="15" ry="25" fill="#7c9473" transform="rotate(-20 -20 30)"/>
    <ellipse cx="20" cy="35" rx="12" ry="20" fill="#8b9684" transform="rotate(15 20 35)"/>
  </g>
  
  <!-- 텍스트 -->
  <text x="256" y="420" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
        text-anchor="middle" fill="#f5f1e8">차茶공예</text>
</svg>
EOF

# 다양한 크기의 아이콘 생성
echo "PWA 아이콘 생성 중..."

sizes=(72 96 128 144 152 192 384 512)

for size in "${sizes[@]}"; do
  echo "생성 중: icon-${size}x${size}.png"
  convert -background none /tmp/tea-icon.svg -resize ${size}x${size} public/static/icons/icon-${size}x${size}.png
done

# 스크린샷 플레이스홀더 생성
echo "스크린샷 플레이스홀더 생성 중..."

# 모바일 스크린샷 (540x720)
convert -size 540x720 xc:#f5f1e8 \
  -pointsize 40 -fill '#7c9473' -gravity center \
  -annotate +0-50 '한국 차 공예' \
  -pointsize 20 -fill '#666666' \
  -annotate +0+50 '전통 차와 공예품 직거래 플랫폼' \
  public/static/screenshots/screenshot-mobile.png

# 데스크톱 스크린샷 (1920x1080)
convert -size 1920x1080 xc:#f5f1e8 \
  -pointsize 60 -fill '#7c9473' -gravity center \
  -annotate +0-80 '한국 차 공예' \
  -pointsize 30 -fill '#666666' \
  -annotate +0+80 '한국 전통 차와 공예품을 생산자와 직거래하는 플랫폼' \
  public/static/screenshots/screenshot-desktop.png

echo "✅ PWA 아이콘 생성 완료!"
echo "📁 생성된 파일:"
ls -lh public/static/icons/
ls -lh public/static/screenshots/
