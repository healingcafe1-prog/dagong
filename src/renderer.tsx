import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <title>한국 차 공예 - 한국 차산지와 공예산지 직거래 플랫폼</title>
        <meta name="description" content="한국 전통 차와 공예품을 생산자와 직거래하는 플랫폼. 지역 문화관광과 다도 체험까지." />
        
        {/* PWA 설정 */}
        <meta name="theme-color" content="#7c9473" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="한국 차 공예" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/static/icons/icon-192x192.png" />
        
        {/* SEO */}
        <meta name="keywords" content="한국차, 전통차, 공예품, 직거래, 차산지, 공예산지, 다도, 지역특산품, Korean tea, Korean craft" />
        <meta name="author" content="한국 차 공예" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="한국 차 공예 - 한국 차산지와 공예산지 직거래 플랫폼" />
        <meta property="og:description" content="한국 전통 차와 공예품을 생산자와 직거래하는 플랫폼" />
        <meta property="og:image" content="/static/icons/icon-512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="한국 차 공예" />
        <meta name="twitter:description" content="한국 전통 차와 공예품을 생산자와 직거래하는 플랫폼" />
        <meta name="twitter:image" content="/static/icons/icon-512x512.png" />
        
        {/* TailwindCSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom CSS */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c9473" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="한국 차 공예" />
        <link rel="apple-touch-icon" href="/static/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/static/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/static/icons/icon-512x512.png" />
        
        {/* i18n 다국어 지원 */}
        <script src="/static/i18n.js"></script>
        
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
            <div class="flex items-center justify-between h-20">
              {/* 로고 */}
              <a href="/" class="flex items-center space-x-2">
                <i class="fas fa-leaf text-tea-green text-2xl"></i>
                <span class="text-xl font-bold text-gray-800" id="siteName">한국 차 공예</span>
              </a>
              
              {/* 메인 메뉴 */}
              <div class="hidden md:flex items-center space-x-8">
                <a href="/products?type=tea" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition group">
                  <i class="fas fa-mug-hot text-xl mb-1"></i>
                  <span class="text-sm">차 직거래</span>
                </a>
                <a href="/products?type=craft" class="flex flex-col items-center text-gray-700 hover:text-craft-blue transition group">
                  <i class="fas fa-palette text-xl mb-1"></i>
                  <span class="text-sm">공예품</span>
                </a>
                <a href="/products?type=gift_set" class="flex flex-col items-center text-gray-700 hover:text-tea-brown transition group">
                  <i class="fas fa-gift text-xl mb-1"></i>
                  <span class="text-sm">선물세트</span>
                </a>
                <a href="/products?type=local" class="flex flex-col items-center text-gray-700 hover:text-green-600 transition group">
                  <i class="fas fa-seedling text-xl mb-1"></i>
                  <span class="text-sm">지역 특산품</span>
                </a>
                <a href="/regions" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition group">
                  <i class="fas fa-map-marked-alt text-xl mb-1"></i>
                  <span class="text-sm">지역별 보기</span>
                </a>
                <a href="/experiences" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition group">
                  <i class="fas fa-users text-xl mb-1"></i>
                  <span class="text-sm">체험·교육</span>
                </a>
                <div class="relative group">
                  <a href="/education/curriculum" class="flex flex-col items-center text-gray-700 hover:text-tea-green transition">
                    <i class="fas fa-graduation-cap text-xl mb-1"></i>
                    <span class="text-sm">다도교육</span>
                  </a>
                  <div class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <a href="/education/curriculum" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <i class="fas fa-book mr-2"></i>교육 커리큘럼
                    </a>
                    <a href="/education/apply" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <i class="fas fa-pencil-alt mr-2"></i>교육 신청
                    </a>
                    <a href="/education/status" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <i class="fas fa-list-check mr-2"></i>교육 현황
                    </a>
                  </div>
                </div>
                <a href="/events" class="flex flex-col items-center text-gray-700 hover:text-tea-brown transition group">
                  <i class="fas fa-star text-xl mb-1"></i>
                  <span class="text-sm">이벤트</span>
                </a>
              </div>
              
              {/* 검색, 언어선택, 로그인 & 모바일 메뉴 */}
              <div class="flex items-center space-x-4">
                <button id="searchBtn" class="text-gray-700 hover:text-tea-green">
                  <i class="fas fa-search text-xl"></i>
                </button>
                
                {/* 언어 선택 */}
                <div class="relative hidden md:block">
                  <button id="langBtn" class="flex items-center space-x-1 text-gray-700 hover:text-tea-green transition">
                    <i class="fas fa-globe text-xl"></i>
                    <span id="currentLang" class="text-sm font-medium">KO</span>
                    <i class="fas fa-chevron-down text-xs"></i>
                  </button>
                  <div id="langDropdown" class="hidden absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <button onclick="window.i18n.setLanguage('ko')" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                      <span class="flex items-center">
                        <span class="mr-2">🇰🇷</span> 한국어
                      </span>
                      <span class="text-xs text-gray-500">KO</span>
                    </button>
                    <button onclick="window.i18n.setLanguage('en')" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                      <span class="flex items-center">
                        <span class="mr-2">🇺🇸</span> English
                      </span>
                      <span class="text-xs text-gray-500">EN</span>
                    </button>
                    <button onclick="window.i18n.setLanguage('zh')" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                      <span class="flex items-center">
                        <span class="mr-2">🇨🇳</span> 中文
                      </span>
                      <span class="text-xs text-gray-500">ZH</span>
                    </button>
                    <button onclick="window.i18n.setLanguage('ja')" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-tea-cream transition flex items-center justify-between">
                      <span class="flex items-center">
                        <span class="mr-2">🇯🇵</span> 日本語
                      </span>
                      <span class="text-xs text-gray-500">JA</span>
                    </button>
                  </div>
                </div>
                
                {/* 로그인/사용자 메뉴 */}
                <div id="userMenu" class="hidden md:block">
                  <a href="/login" id="loginBtn" class="text-gray-700 hover:text-tea-green">
                    <i class="fas fa-user text-xl"></i>
                  </a>
                  <div id="userDropdown" class="hidden relative">
                    <button id="userMenuBtn" class="flex items-center space-x-2 text-gray-700 hover:text-tea-green">
                      <img id="userAvatar" src="" alt="프로필" class="w-8 h-8 rounded-full" />
                      <span id="userName"></span>
                    </button>
                    <div id="dropdownMenu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                      <a href="/mypage" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-user mr-2"></i>마이페이지
                      </a>
                      <button id="logoutBtn" class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-sign-out-alt mr-2"></i>로그아웃
                      </button>
                    </div>
                  </div>
                </div>
                
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
              <a href="/products?type=local" class="block py-2 text-gray-700 hover:text-green-600">지역 특산품</a>
              <a href="/regions" class="block py-2 text-gray-700 hover:text-tea-green">지역별 보기</a>
              <a href="/experiences" class="block py-2 text-gray-700 hover:text-tea-green">체험·교육</a>
              <div class="py-2">
                <div class="font-medium text-gray-900 mb-1">다도교육</div>
                <a href="/education/curriculum" class="block py-1 pl-4 text-gray-700 hover:text-tea-green">교육 커리큘럼</a>
                <a href="/education/apply" class="block py-1 pl-4 text-gray-700 hover:text-tea-green">교육 신청</a>
                <a href="/education/status" class="block py-1 pl-4 text-gray-700 hover:text-tea-green">교육 현황</a>
              </div>
              <a href="/events" class="block py-2 text-gray-700 hover:text-tea-brown">이벤트</a>
              
              {/* 모바일 언어 선택 */}
              <div class="py-2 border-t border-gray-200 mt-2">
                <div class="font-medium text-gray-900 mb-2 flex items-center">
                  <i class="fas fa-globe mr-2"></i>
                  언어 선택
                </div>
                <button onclick="window.i18n.setLanguage('ko')" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                  <span class="mr-2">🇰🇷</span> 한국어 (Korean)
                </button>
                <button onclick="window.i18n.setLanguage('en')" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                  <span class="mr-2">🇺🇸</span> English
                </button>
                <button onclick="window.i18n.setLanguage('zh')" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                  <span class="mr-2">🇨🇳</span> 中文 (Chinese)
                </button>
                <button onclick="window.i18n.setLanguage('ja')" class="block w-full text-left py-2 pl-4 text-gray-700 hover:text-tea-green hover:bg-tea-cream rounded">
                  <span class="mr-2">🇯🇵</span> 日本語 (Japanese)
                </button>
              </div>
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
        <script src="/static/producer-forms.js"></script>
        
        {/* Service Worker 등록 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                  .then((registration) => {
                    console.log('ServiceWorker registration successful:', registration.scope);
                  })
                  .catch((err) => {
                    console.log('ServiceWorker registration failed:', err);
                  });
              });
            }
          `
        }} />
      </body>
    </html>
  )
})
