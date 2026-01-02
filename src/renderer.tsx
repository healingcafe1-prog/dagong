import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>차茶공예 - 한국 차산지와 공예산지 직거래 플랫폼</title>
        <meta name="description" content="한국 전통 차와 공예품을 생산자와 직거래하는 플랫폼. 지역 문화관광과 다도 체험까지." />
        
        {/* TailwindCSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom CSS */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Tailwind 커스텀 설정 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'tea-green': '#7c9473',
                    'tea-brown': '#8b6f47',
                    'tea-cream': '#f5f1e8',
                    'craft-blue': '#5b7c99',
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body class="bg-tea-cream min-h-screen">
        {/* 네비게이션 바 */}
        <nav class="bg-white shadow-md sticky top-0 z-50">
          <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-16">
              {/* 로고 */}
              <a href="/" class="flex items-center space-x-2">
                <i class="fas fa-leaf text-tea-green text-2xl"></i>
                <span class="text-xl font-bold text-gray-800">차茶공예</span>
              </a>
              
              {/* 메인 메뉴 */}
              <div class="hidden md:flex items-center space-x-6">
                <a href="/products?type=tea" class="text-gray-700 hover:text-tea-green transition">
                  <i class="fas fa-mug-hot mr-1"></i>차 직거래
                </a>
                <a href="/products?type=craft" class="text-gray-700 hover:text-craft-blue transition">
                  <i class="fas fa-palette mr-1"></i>공예품
                </a>
                <a href="/products?type=gift_set" class="text-gray-700 hover:text-tea-brown transition">
                  <i class="fas fa-gift mr-1"></i>선물세트
                </a>
                <a href="/regions" class="text-gray-700 hover:text-tea-green transition">
                  <i class="fas fa-map-marked-alt mr-1"></i>지역별 보기
                </a>
                <a href="/experiences" class="text-gray-700 hover:text-tea-green transition">
                  <i class="fas fa-users mr-1"></i>체험·교육
                </a>
                <a href="/events" class="text-gray-700 hover:text-tea-brown transition">
                  <i class="fas fa-star mr-1"></i>이벤트
                </a>
              </div>
              
              {/* 검색 & 모바일 메뉴 */}
              <div class="flex items-center space-x-4">
                <button id="searchBtn" class="text-gray-700 hover:text-tea-green">
                  <i class="fas fa-search text-xl"></i>
                </button>
                <button id="mobileMenuBtn" class="md:hidden text-gray-700">
                  <i class="fas fa-bars text-xl"></i>
                </button>
              </div>
            </div>
            
            {/* 모바일 메뉴 */}
            <div id="mobileMenu" class="hidden md:hidden pb-4">
              <a href="/products?type=tea" class="block py-2 text-gray-700 hover:text-tea-green">차 직거래</a>
              <a href="/products?type=craft" class="block py-2 text-gray-700 hover:text-craft-blue">공예품</a>
              <a href="/products?type=gift_set" class="block py-2 text-gray-700 hover:text-tea-brown">선물세트</a>
              <a href="/regions" class="block py-2 text-gray-700 hover:text-tea-green">지역별 보기</a>
              <a href="/experiences" class="block py-2 text-gray-700 hover:text-tea-green">체험·교육</a>
              <a href="/events" class="block py-2 text-gray-700 hover:text-tea-brown">이벤트</a>
            </div>
          </div>
        </nav>
        
        {/* 검색 모달 */}
        <div id="searchModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-800">검색</h3>
                <button id="closeSearchBtn" class="text-gray-500 hover:text-gray-700">
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>
              <input 
                type="text" 
                id="searchInput" 
                placeholder="상품, 생산자, 지역을 검색하세요..." 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
              />
              <div id="searchResults" class="mt-4"></div>
            </div>
          </div>
        </div>
        
        {/* 메인 콘텐츠 */}
        <main class="min-h-screen">
          {children}
        </main>
        
        {/* 푸터 */}
        <footer class="bg-gray-800 text-white mt-20">
          <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 class="text-lg font-bold mb-4">차茶공예</h4>
                <p class="text-gray-400 text-sm">
                  한국의 아름다운 차산지와 공예산지를<br />
                  직접 연결하는 플랫폼입니다.
                </p>
              </div>
              <div>
                <h4 class="text-lg font-bold mb-4">상품</h4>
                <ul class="space-y-2 text-sm">
                  <li><a href="/products?type=tea" class="text-gray-400 hover:text-white">차 직거래</a></li>
                  <li><a href="/products?type=craft" class="text-gray-400 hover:text-white">공예품</a></li>
                  <li><a href="/products?type=gift_set" class="text-gray-400 hover:text-white">선물세트</a></li>
                </ul>
              </div>
              <div>
                <h4 class="text-lg font-bold mb-4">지역</h4>
                <ul class="space-y-2 text-sm">
                  <li><a href="/regions?type=tea" class="text-gray-400 hover:text-white">차 산지</a></li>
                  <li><a href="/regions?type=craft" class="text-gray-400 hover:text-white">공예 산지</a></li>
                  <li><a href="/producers" class="text-gray-400 hover:text-white">생산자</a></li>
                </ul>
              </div>
              <div>
                <h4 class="text-lg font-bold mb-4">체험·이벤트</h4>
                <ul class="space-y-2 text-sm">
                  <li><a href="/experiences" class="text-gray-400 hover:text-white">체험 프로그램</a></li>
                  <li><a href="/events" class="text-gray-400 hover:text-white">이달의 이벤트</a></li>
                </ul>
              </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2024 차茶공예. All rights reserved.</p>
            </div>
          </div>
        </footer>
        
        {/* Axios */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        
        {/* 앱 스크립트 */}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
