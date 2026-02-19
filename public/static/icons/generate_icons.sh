#!/bin/bash

# 기본 512x512 아이콘 생성 (Node.js Canvas 사용)
cat > /tmp/generate_icon.js << 'JSEOF'
const { createCanvas } = require('canvas');
const fs = require('fs');

// 512x512 캔버스 생성
const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');

// 배경색 (#7c9473 - 차 색상)
ctx.fillStyle = '#7c9473';
ctx.fillRect(0, 0, 512, 512);

// 원형 테두리
ctx.strokeStyle = '#f5f1e8';
ctx.lineWidth = 8;
ctx.beginPath();
ctx.arc(256, 256, 240, 0, Math.PI * 2);
ctx.stroke();

// 텍스트 '茶' (차)
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 280px serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('茶', 256, 276);

// PNG 저장
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('icon-512x512.png', buffer);
console.log('✅ icon-512x512.png 생성 완료');
JSEOF

node /tmp/generate_icon.js
