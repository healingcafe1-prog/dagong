// 동적 사이트맵 생성 스크립트
const fs = require('fs');
const path = require('path');

// 기본 URL 설정
const baseUrl = 'https://dagong.co.kr';
const today = new Date().toISOString().split('T')[0];

// 사이트맵 헤더
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- 메인 페이지 -->
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- 상품 페이지 -->
  <url>
    <loc>${baseUrl}/products</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- 상품 카테고리 -->
  <url>
    <loc>${baseUrl}/products?type=tea</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <url>
    <loc>${baseUrl}/products?type=craft</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <url>
    <loc>${baseUrl}/products?type=gift_set</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <url>
    <loc>${baseUrl}/products?type=local</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- 선물추천 -->
  <url>
    <loc>${baseUrl}/gift-recommendation.html</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- 체험/교육 -->
  <url>
    <loc>${baseUrl}/experiences</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- 지역 -->
  <url>
    <loc>${baseUrl}/regions</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- 생산자 -->
  <url>
    <loc>${baseUrl}/producers</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- 펀딩 상품 -->
  <url>
    <loc>${baseUrl}/funding</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- 셀러 대시보드 -->
  <url>
    <loc>${baseUrl}/seller-dashboard.html</loc>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
    <lastmod>${today}</lastmod>
  </url>
  
  <!-- 로그인/회원가입 (노출용, robots.txt에서 크롤링 제한) -->
  <url>
    <loc>${baseUrl}/login</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/signup</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  
</urlset>
`;

// 파일 저장
const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

console.log(`✅ 사이트맵이 생성되었습니다: ${outputPath}`);
console.log(`📊 총 URL 개수: ${(sitemap.match(/<url>/g) || []).length}개`);
