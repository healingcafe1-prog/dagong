// ===== 캐시 강제 제거 함수 =====
window.forceClearCache = async function() {
  console.log('🔄 강제 캐시 제거 시작...');
  
  try {
    // 1. Service Worker 언레지스터
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('✅ Service Worker 제거됨');
      }
    }
    
    // 2. 모든 캐시 제거
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('✅ 모든 캐시 제거됨:', cacheNames);
    }
    
    // 3. localStorage 제거 (필요시)
    // localStorage.clear();
    
    // 4. 강제 새로고침
    console.log('✅ 페이지 강제 새로고침...');
    window.location.reload(true);
  } catch (error) {
    console.error('❌ 캐시 제거 중 오류:', error);
    alert('캐시 제거 중 오류가 발생했습니다. 브라우저 설정에서 수동으로 캐시를 제거해주세요.');
  }
};

// ===== 유틸리티 함수 =====

// 가격 포맷팅
function formatPrice(price) {
  return new Intl.NumberFormat('ko-KR').format(price) + '원';
}

// 할인율 계산
function calculateDiscountRate(originalPrice, discountedPrice) {
  return Math.round((1 - discountedPrice / originalPrice) * 100);
}

// 할인가 계산
function calculateDiscountedPrice(originalPrice, discountRate) {
  return Math.round(originalPrice * (1 - discountRate / 100));
}

// 이미지 에러 처리
function handleImageError(img) {
  img.src = 'https://via.placeholder.com/400x300?text=No+Image';
}

// 날짜 포맷팅
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ===== 네비게이션 =====

// DOM이 준비된 후 실행
// ===== 로딩 타임아웃 설정 (Instagram 인앱 브라우저 대응) =====
let loadingTimeout = setTimeout(() => {
  const appDiv = document.getElementById('app');
  if (appDiv && appDiv.innerHTML.trim().includes('로딩')) {
    console.error('❌ 로딩 타임아웃: 10초 초과');
    appDiv.innerHTML = `
      <div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
        <i class="fas fa-exclamation-triangle text-5xl text-yellow-500 mb-4"></i>
        <h2 class="text-xl font-bold text-gray-800 mb-3">페이지 로딩 실패</h2>
        <p class="text-gray-600 mb-4 text-sm">페이지를 불러오는 중 문제가 발생했습니다.</p>
        <div class="space-y-2 text-left bg-gray-50 p-4 rounded text-sm mb-4">
          <p class="font-semibold text-gray-700">해결 방법:</p>
          <p>1️⃣ 페이지 새로고침</p>
          <p>2️⃣ Instagram 앱 재시작</p>
          <p>3️⃣ 일반 브라우저로 열기 (Chrome, Safari)</p>
        </div>
        <button onclick="window.location.reload()" class="w-full px-4 py-3 bg-tea-green text-white rounded-lg hover:bg-green-700 transition">
          <i class="fas fa-redo mr-2"></i>다시 시도
        </button>
      </div>
    `;
  }
}, 10000); // 10초 타임아웃

document.addEventListener('DOMContentLoaded', () => {
  // 로딩 성공 시 타임아웃 취소
  clearTimeout(loadingTimeout);
  console.log('✅ 페이지 로드 완료');
  
  // ===== 모바일 네비게이션 =====
  
  // 현재 페이지 활성화 표시
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.mobile-nav-item');
  navItems.forEach(item => {
    const page = item.getAttribute('data-page');
    if (
      (page === 'home' && currentPath === '/') ||
      (page === 'mypage' && currentPath.startsWith('/mypage')) ||
      (page === 'category' && currentPath.startsWith('/products')) ||
      (page === 'search' && currentPath.startsWith('/search'))
    ) {
      item.classList.add('active');
    }
  });
  
  // 모바일 카테고리 버튼
  const mobileCategoryBtn = document.getElementById('mobileCategoryBtn');
  const mobileCategoryBar = document.getElementById('mobileCategoryBar');
  
  if (mobileCategoryBtn && mobileCategoryBar) {
    let categoryBarVisible = false;
    
    mobileCategoryBtn.addEventListener('click', () => {
      categoryBarVisible = !categoryBarVisible;
      
      if (categoryBarVisible) {
        mobileCategoryBar.style.display = 'block';
        mobileCategoryBar.classList.add('show');
        mobileCategoryBar.classList.remove('hide');
        mobileCategoryBtn.classList.add('active');
      } else {
        mobileCategoryBar.classList.add('hide');
        mobileCategoryBar.classList.remove('show');
        mobileCategoryBtn.classList.remove('active');
        setTimeout(() => {
          mobileCategoryBar.style.display = 'none';
        }, 300);
      }
    });
  }
  
  // 모바일 검색 버튼
  const mobileSearchBtn = document.getElementById('mobileSearchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  
  if (mobileSearchBtn && searchModal && searchInput) {
    mobileSearchBtn.addEventListener('click', () => {
      searchModal.classList.remove('hidden');
      searchInput.focus();
      mobileSearchBtn.classList.add('active');
    });
  }
  
  // 모바일 메뉴 토글
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 모바일 언어 선택 버튼
  const mobileLangButtons = document.querySelectorAll('button[data-lang-mobile]');
  mobileLangButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const lang = button.getAttribute('data-lang-mobile');
      console.log('Mobile language button clicked:', lang);
      if (window.i18n && window.i18n.setLanguage) {
        window.i18n.setLanguage(lang);
      } else {
        console.error('i18n not available');
      }
    });
  });

  // 언어 선택 드롭다운
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  const currentLang = document.getElementById('currentLang');

  if (langBtn && langDropdown) {
    // 언어 버튼 클릭
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('hidden');
    });
    
    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', (e) => {
      if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.add('hidden');
      }
    });
    
    // 언어 선택 버튼들에 이벤트 리스너 추가
    const langButtons = langDropdown.querySelectorAll('button[data-lang]');
    console.log('Found language buttons:', langButtons.length);
    
    langButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const lang = button.getAttribute('data-lang');
        console.log('Desktop language button clicked:', lang);
        
        if (window.i18n && window.i18n.setLanguage) {
          window.i18n.setLanguage(lang);
        } else {
          console.error('i18n not available');
        }
      });
    });
    
    // 현재 언어 표시 업데이트
    const updateCurrentLangDisplay = () => {
      const lang = localStorage.getItem('language') || 'ko';
      const langMap = {
        'ko': 'KO',
        'en': 'EN',
        'zh': 'ZH',
        'ja': 'JA'
      };
      if (currentLang) {
        currentLang.textContent = langMap[lang] || 'KO';
      }
    };
    
    // 페이지 로드 시 현재 언어 표시
    updateCurrentLangDisplay();
  }

  // 검색 모달
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  if (searchBtn && searchModal && searchInput) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.remove('hidden');
      searchInput.focus();
    });
  }

  if (closeSearchBtn && searchModal && searchInput && searchResults) {
    closeSearchBtn.addEventListener('click', () => {
      searchModal.classList.add('hidden');
      searchInput.value = '';
      searchResults.innerHTML = '';
    });
  }

  // 검색 모달 외부 클릭 시 닫기
  if (searchModal && searchInput && searchResults) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.add('hidden');
        searchInput.value = '';
        searchResults.innerHTML = '';
      }
    });
  }

  // 검색 기능
  let searchTimeout;
  if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    clearTimeout(searchTimeout);
    
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }
    
    searchTimeout = setTimeout(async () => {
      try {
        const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}`);
        const { results } = response.data;
        
        let html = '';
        
        // 상품 결과
        if (results.products && results.products.length > 0) {
          html += '<div class="mb-4"><h4 class="font-bold text-gray-700 mb-2">상품</h4>';
          results.products.forEach(product => {
            html += `
              <a href="/products/${product.id}" class="block p-3 hover:bg-gray-50 rounded">
                <div class="flex items-center space-x-3">
                  <i class="fas fa-box text-tea-green"></i>
                  <div>
                    <div class="font-medium">${product.name}</div>
                    <div class="text-sm text-gray-500">${formatPrice(product.price)}</div>
                  </div>
                </div>
              </a>
            `;
          });
          html += '</div>';
        }
        
        // 생산자 결과
        if (results.producers && results.producers.length > 0) {
          html += '<div class="mb-4"><h4 class="font-bold text-gray-700 mb-2">생산자</h4>';
          results.producers.forEach(producer => {
            html += `
              <a href="/producers/${producer.id}" class="block p-3 hover:bg-gray-50 rounded">
                <div class="flex items-center space-x-3">
                  <i class="fas fa-user text-craft-blue"></i>
                  <div>
                    <div class="font-medium">${producer.name}</div>
                    <div class="text-sm text-gray-500">${producer.description || ''}</div>
                  </div>
                </div>
              </a>
            `;
          });
          html += '</div>';
        }
        
        // 지역 결과
        if (results.regions && results.regions.length > 0) {
          html += '<div><h4 class="font-bold text-gray-700 mb-2">지역</h4>';
          results.regions.forEach(region => {
            html += `
              <a href="/regions/${region.id}" class="block p-3 hover:bg-gray-50 rounded">
                <div class="flex items-center space-x-3">
                  <i class="fas fa-map-marker-alt text-tea-brown"></i>
                  <div>
                    <div class="font-medium">${region.name}</div>
                    <div class="text-sm text-gray-500">${region.description || ''}</div>
                  </div>
                </div>
              </a>
            `;
          });
          html += '</div>';
        }
        
        if (html === '') {
          html = '<div class="text-center text-gray-500 py-4">검색 결과가 없습니다.</div>';
        }
        
        searchResults.innerHTML = html;
      } catch (error) {
        console.error('검색 오류:', error);
        searchResults.innerHTML = '<div class="text-center text-red-500 py-4">검색 중 오류가 발생했습니다.</div>';
      }
    }, 300);
    });
  }
});

// ===== 페이지별 로직 =====

const app = document.getElementById('app');
const path = window.location.pathname;
const searchParams = new URLSearchParams(window.location.search);

// 로그인 페이지
if (path === '/login') {
  loadLoginPage();
}
// 홈 페이지
else if (path === '/') {
  loadHomePage();
}
// 상품 목록 페이지
else if (path === '/products') {
  loadProductsPage();
}
// 상품 상세 페이지
else if (path.startsWith('/products/')) {
  const productId = path.split('/')[2];
  loadProductDetailPage(productId);
}
// 지역 목록 페이지
else if (path === '/regions') {
  loadRegionsPage();
}
// 지역 상세 페이지
else if (path.startsWith('/regions/')) {
  const regionId = path.split('/')[2];
  loadRegionDetailPage(regionId);
}
// 생산자 목록 페이지
else if (path === '/producers') {
  loadProducersPage();
}
// 생산자 상세 페이지
else if (path.startsWith('/producers/')) {
  const producerId = path.split('/')[2];
  loadProducerDetailPage(producerId);
}
// 체험 목록 페이지
else if (path === '/experiences') {
  loadExperiencesPage();
}
// 체험 상세 페이지
else if (path.startsWith('/experiences/')) {
  const experienceId = path.split('/')[2];
  loadExperienceDetailPage(experienceId);
}
// 이벤트 목록 페이지
else if (path === '/events') {
  loadEventsPage();
}
// 교육 신청 페이지
else if (path === '/education/apply') {
  loadEducationApplicationPage();
}
// 교육 현황 페이지
else if (path === '/education/status') {
  loadEducationStatusPage();
}
// 교육 커리큘럼 페이지
else if (path === '/education/curriculum') {
  loadEducationCurriculumPage();
}
// 교육 커리큘럼 상세 페이지
else if (path.startsWith('/education/curriculum/')) {
  const curriculumId = path.split('/')[3];
  loadEducationCurriculumDetailPage(curriculumId);
}
// 장바구니
else if (path === '/cart') {
  loadCartPage();
}
// 주문서 작성
else if (path === '/checkout') {
  loadCheckoutPage();
}
// 마이페이지 - 주문 상세
else if (path.startsWith('/mypage/orders/')) {
  const orderId = path.split('/')[3];
  loadOrderDetailPage(orderId);
}
// 마이페이지 - 주문 내역
else if (path === '/mypage/orders') {
  loadOrderListPage();
}
// 마이페이지 메인
else if (path === '/mypage') {
  loadMyPage();
}
// 생산자 관리 페이지
else if (path.startsWith('/producer/manage/')) {
  const producerId = path.split('/')[3];
  loadProducerManagePage(producerId);
}
// 상품 등록/수정 페이지
else if (path.startsWith('/producer/') && path.includes('/product/')) {
  const parts = path.split('/');
  const producerId = parts[2];
  const productId = parts[4];
  if (productId === 'new') {
    loadProductFormPage(producerId, null);
  } else {
    loadProductFormPage(producerId, productId);
  }
}
// 체험 등록/수정 페이지
else if (path.startsWith('/producer/') && path.includes('/experience/')) {
  const parts = path.split('/');
  const producerId = parts[2];
  const experienceId = parts[4];
  if (experienceId === 'new') {
    loadExperienceFormPage(producerId, null);
  } else {
    loadExperienceFormPage(producerId, experienceId);
  }
}

// ===== 홈 페이지 =====
async function loadHomePage() {
  try {
    // 병렬로 데이터 가져오기
    const [featuredProducts, events, teaRegions, craftRegions] = await Promise.all([
      axios.get('/api/products?featured=true&limit=8'),
      axios.get('/api/events'),
      axios.get('/api/regions?type=tea'),
      axios.get('/api/regions?type=craft')
    ]);
    
    app.innerHTML = `
      <!-- 히어로 섹션 -->
      <section class="bg-gradient-to-r from-tea-green to-craft-blue text-white py-20">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <i class="fas fa-leaf mr-2"></i>
            한국 차 문화,
            <br class="md:hidden">
            우리가 함께 쓰는 새로운 문화 혁명
          </h1>
          <p class="text-xl md:text-2xl mb-3 font-light">생산자와 소비자, 함께 만드는 천년의 가치</p>
          <p class="text-base md:text-lg mb-8 text-white/90">당신의 선택이 한국 차 문화를 살립니다</p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/products?type=tea" class="bg-white text-tea-green px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
              차 둘러보기
            </a>
            <a href="/products?type=craft" class="bg-white text-craft-blue px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
              공예품 보기
            </a>
            <a href="/experiences" class="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-tea-green transition">
              체험 예약하기
            </a>
          </div>
        </div>
      </section>
      
      <!-- 이달의 이벤트 -->
      ${events.data.events.length > 0 ? `
        <section class="container mx-auto px-4 py-16">
          <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <i class="fas fa-star text-tea-brown mr-3"></i>
            이달의 이벤트
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${events.data.events.slice(0, 3).map(event => `
              <a href="/events" class="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div class="h-48 bg-gradient-to-br from-tea-green to-craft-blue flex items-center justify-center">
                  <i class="fas fa-gift text-white text-6xl"></i>
                </div>
                <div class="p-6">
                  <div class="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold mb-3">
                    ${event.discount_rate > 0 ? event.discount_rate + '% 할인' : '특별 이벤트'}
                  </div>
                  <h3 class="text-xl font-bold mb-2">${event.title}</h3>
                  <p class="text-gray-600 text-sm mb-3">${event.description}</p>
                  <div class="text-sm text-gray-500">
                    ${formatDate(event.start_date)} ~ ${formatDate(event.end_date)}
                  </div>
                </div>
              </a>
            `).join('')}
          </div>
        </section>
      ` : ''}
      
      <!-- 추천 상품 -->
      <section class="bg-white py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 flex items-center">
            <i class="fas fa-heart text-red-500 mr-2 md:mr-3"></i>
            추천 상품
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            ${featuredProducts.data.products.map(product => `
              <a href="/products/${product.id}" class="block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition">
                <div class="aspect-square bg-gray-200 flex items-center justify-center">
                  <i class="fas ${product.product_type === 'tea' ? 'fa-mug-hot' : 'fa-palette'} text-gray-400 text-4xl md:text-6xl"></i>
                </div>
                <div class="p-3 md:p-4">
                  <div class="text-xs text-gray-500 mb-1 line-clamp-1">${product.region_name || ''}</div>
                  <h3 class="font-bold text-sm md:text-lg mb-1 md:mb-2 line-clamp-2">${product.name}</h3>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-tea-green font-bold text-base md:text-xl">${formatPrice(product.price)}</span>
                    ${product.is_featured ? '<span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded hidden md:inline">인기</span>' : ''}
                  </div>
                </div>
              </a>
            `).join('')}
          </div>
          <div class="text-center mt-6 md:mt-8">
            <a href="/products" class="inline-block bg-tea-green text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-bold text-sm md:text-base hover:bg-opacity-90 transition">
              모든 상품 보기
            </a>
          </div>
        </div>
      </section>
      
      <!-- 차 산지 -->
      <section class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <i class="fas fa-map-marked-alt text-tea-green mr-3"></i>
          차 산지 둘러보기
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          ${teaRegions.data.regions.map(region => `
            <a href="/regions/${region.id}" class="text-center p-4 bg-white rounded-lg hover:shadow-md transition">
              <div class="w-16 h-16 mx-auto mb-3 bg-tea-green rounded-full flex items-center justify-center">
                <i class="fas fa-leaf text-white text-2xl"></i>
              </div>
              <div class="font-bold text-gray-800">${region.name}</div>
            </a>
          `).join('')}
        </div>
      </section>
      
      <!-- 공예 산지 -->
      <section class="bg-white py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <i class="fas fa-palette text-craft-blue mr-3"></i>
            공예 산지 둘러보기
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            ${craftRegions.data.regions.map(region => `
              <a href="/regions/${region.id}" class="text-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition">
                <div class="w-16 h-16 mx-auto mb-3 bg-craft-blue rounded-full flex items-center justify-center">
                  <i class="fas fa-palette text-white text-2xl"></i>
                </div>
                <div class="font-bold text-gray-800">${region.name}</div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>
      
      <!-- CTA 섹션 -->
      <section class="bg-gradient-to-r from-tea-brown to-tea-green text-white py-20">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            전통 차문화를 체험해보세요
          </h2>
          <p class="text-xl mb-8">다도 교육, 공예 체험, 산지 투어까지</p>
          <a href="/experiences" class="inline-block bg-white text-tea-green px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
            체험 프로그램 보기
          </a>
        </div>
      </section>
    `;
  } catch (error) {
    console.error('홈 페이지 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">페이지를 불러오는 중 오류가 발생했습니다.</p></div>';
  }
}

// ===== 상품 목록 페이지 =====
async function loadProductsPage() {
  const type = searchParams.get('type');
  const categoryId = searchParams.get('category_id');
  
  try {
    let url = '/api/products?limit=20';
    if (type) url += `&type=${type}`;
    if (categoryId) url += `&category_id=${categoryId}`;
    
    const [productsRes, categoriesRes] = await Promise.all([
      axios.get(url),
      axios.get(`/api/categories${type ? `?type=${type}` : ''}`)
    ]);
    
    const products = productsRes.data.products;
    const categories = categoriesRes.data.categories;
    
    const typeNames = {
      'tea': '차',
      'craft': '공예품',
      'gift_set': '선물세트',
      'local': '지역특산물'
    };
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">
            ${type ? typeNames[type] : '전체 상품'}
          </h1>
          
          <!-- 카테고리 필터 (Desktop) -->
          ${categories.length > 0 ? `
            <div class="hidden md:flex flex-wrap gap-2 mb-6">
              <a href="/products${type ? `?type=${type}` : ''}" 
                 class="px-4 py-2 rounded-full ${!categoryId ? 'bg-tea-green text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
                전체
              </a>
              ${categories.map(cat => `
                <a href="/products?type=${type}&category_id=${cat.id}" 
                   class="px-4 py-2 rounded-full ${categoryId == cat.id ? 'bg-tea-green text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
                  ${cat.name}
                </a>
              `).join('')}
            </div>
          ` : ''}
          
          <!-- 카테고리 필터 (Mobile - Horizontal Scroll) -->
          ${categories.length > 0 ? `
            <div class="md:hidden mb-6">
              <div class="horizontal-scroll flex gap-2 pb-2">
                <a href="/products${type ? `?type=${type}` : ''}" 
                   class="flex-shrink-0 px-4 py-2 rounded-full ${!categoryId ? 'bg-tea-green text-white' : 'bg-white text-gray-700'} text-sm font-medium whitespace-nowrap">
                  전체
                </a>
                ${categories.map(cat => `
                  <a href="/products?type=${type}&category_id=${cat.id}" 
                     class="flex-shrink-0 px-4 py-2 rounded-full ${categoryId == cat.id ? 'bg-tea-green text-white' : 'bg-white text-gray-700'} text-sm font-medium whitespace-nowrap">
                    ${cat.name}
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
        
        <!-- 상품 목록 (모바일 2열, 데스크탑 4열) -->
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          ${products.map(product => `
            <a href="/products/${product.id}" class="block bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
              <div class="aspect-square bg-gray-200 flex items-center justify-center">
                <i class="fas ${product.product_type === 'tea' ? 'fa-mug-hot' : product.product_type === 'craft' ? 'fa-palette' : 'fa-gift'} text-gray-400 text-4xl md:text-6xl"></i>
              </div>
              <div class="p-3 md:p-4">
                <div class="text-xs md:text-sm text-gray-500 mb-1 line-clamp-1">${product.producer_name}</div>
                <h3 class="font-bold text-sm md:text-lg mb-1 md:mb-2 line-clamp-2">${product.name}</h3>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-tea-green font-bold text-base md:text-xl">${formatPrice(product.price)}</span>
                  ${product.is_featured ? '<span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded hidden md:inline">인기</span>' : ''}
                </div>
              </div>
            </a>
          `).join('')}
        </div>
        
        ${products.length === 0 ? '<div class="text-center py-20 text-gray-500">상품이 없습니다.</div>' : ''}
      </div>
    `;
  } catch (error) {
    console.error('상품 목록 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">페이지를 불러오는 중 오류가 발생했습니다.</p></div>';
  }
}

// ===== 상품 상세 페이지 =====
async function loadProductDetailPage(productId) {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    const { product, images, giftSetItems } = response.data;
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- 상품 이미지 -->
          <div>
            <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-4">
              <i class="fas ${product.product_type === 'tea' ? 'fa-mug-hot' : product.product_type === 'craft' ? 'fa-palette' : 'fa-gift'} text-gray-400 text-8xl"></i>
            </div>
            ${images && images.length > 0 ? `
              <div class="grid grid-cols-4 gap-2">
                ${images.map(img => `
                  <div class="bg-gray-200 rounded h-20"></div>
                `).join('')}
              </div>
            ` : ''}
          </div>
          
          <!-- 상품 정보 -->
          <div>
            <div class="mb-4">
              <div class="text-sm text-gray-500 mb-2">
                <a href="/producers/${product.producer_id}" class="hover:text-tea-green">${product.producer_name}</a>
                <span class="mx-2">·</span>
                <span>${product.region_name}</span>
              </div>
              <h1 class="text-3xl font-bold text-gray-800 mb-4">${product.name}</h1>
              <div class="mb-4">
                ${(product.consumer_price || product.original_price) && product.discount_rate ? `
                  <div class="mb-3">
                    <div class="text-sm text-gray-500 mb-1">소비자가</div>
                    <div class="flex items-center gap-3">
                      <span class="text-xl text-gray-400 line-through">${formatPrice(product.consumer_price || product.original_price)}</span>
                      <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">${product.discount_rate}% 할인</span>
                    </div>
                  </div>
                  <div class="mb-3">
                    <div class="text-sm text-red-600 font-semibold mb-1">
                      <i class="fas fa-handshake mr-1"></i>
                      직거래가
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-4xl font-bold text-red-600">${formatPrice(product.direct_price || product.price)}</span>
                      ${product.is_featured ? '<span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-bold">인기 상품</span>' : ''}
                    </div>
                  </div>
                  <div class="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div class="flex items-center text-red-600 font-medium">
                      <i class="fas fa-tag mr-2"></i>
                      <span>직거래 특별 혜택! <strong>${formatPrice((product.consumer_price || product.original_price) - (product.direct_price || product.price))} 절약</strong></span>
                    </div>
                  </div>
                ` : `
                  <div class="mb-3">
                    <div class="text-sm text-red-600 font-semibold mb-1">
                      <i class="fas fa-handshake mr-1"></i>
                      직거래가
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="text-4xl font-bold text-red-600">${formatPrice(product.direct_price || product.price)}</span>
                      ${product.is_featured ? '<span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-bold">인기 상품</span>' : ''}
                    </div>
                  </div>
                `}
              </div>
            </div>
            
            <div class="border-t border-b border-gray-200 py-4 mb-6">
              <div class="grid grid-cols-2 gap-4 text-sm">
                ${product.weight ? `
                  <div>
                    <div class="text-gray-500 mb-1">중량/용량</div>
                    <div class="font-medium">${product.weight}</div>
                  </div>
                ` : ''}
                ${product.origin ? `
                  <div>
                    <div class="text-gray-500 mb-1">원산지</div>
                    <div class="font-medium">${product.origin}</div>
                  </div>
                ` : ''}
                <div>
                  <div class="text-gray-500 mb-1">배송비</div>
                  <div class="font-medium">${formatPrice(product.shipping_fee || 3000)}</div>
                </div>
                <div>
                  <div class="text-gray-500 mb-1">재고</div>
                  <div class="font-medium">${product.stock > 0 ? '구매 가능' : '품절'}</div>
                </div>
              </div>
            </div>
            
            <div class="mb-6">
              <h3 class="font-bold text-lg mb-3">상품 설명</h3>
              <p class="text-gray-600 leading-relaxed">${product.description || '상품 설명이 없습니다.'}</p>
            </div>
            
            ${giftSetItems && giftSetItems.length > 0 ? `
              <div class="mb-6">
                <h3 class="font-bold text-lg mb-3">선물세트 구성</h3>
                <div class="space-y-2">
                  ${giftSetItems.map(item => `
                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span>${item.name}</span>
                      <span class="text-gray-500">x ${item.quantity}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
            
            <div class="mb-6">
              <h3 class="font-bold text-lg mb-3">생산자 정보</h3>
              <div class="p-4 bg-gray-50 rounded-lg">
                <div class="font-medium mb-2">${product.producer_name}</div>
                <p class="text-gray-600 text-sm">${product.producer_description || ''}</p>
                <a href="/producers/${product.producer_id}" class="inline-block mt-3 text-tea-green hover:underline">
                  생산자 페이지 보기 <i class="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
            
            <!-- 수량 선택 -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">수량</label>
              <div class="flex items-center border rounded-lg w-32">
                <button id="decreaseQty" class="px-4 py-2 hover:bg-gray-100">
                  <i class="fas fa-minus"></i>
                </button>
                <input type="number" id="productQuantity" value="1" min="1" max="${product.stock}" 
                       class="w-16 text-center border-x py-2">
                <button id="increaseQty" class="px-4 py-2 hover:bg-gray-100">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            
            <div class="flex gap-3">
              <button onclick="addToCart(${product.id}, document.getElementById('productQuantity').value)" 
                      class="flex-1 bg-tea-green text-white px-6 py-4 rounded-lg font-bold hover:bg-opacity-90 transition ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                      ${product.stock <= 0 ? 'disabled' : ''}>
                <i class="fas fa-shopping-cart mr-2"></i>
                장바구니
              </button>
              <button onclick="buyNow(${product.id}, document.getElementById('productQuantity').value)" 
                      class="flex-1 bg-tea-brown text-white px-6 py-4 rounded-lg font-bold hover:bg-opacity-90 transition ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                      ${product.stock <= 0 ? 'disabled' : ''}>
                <i class="fas fa-credit-card mr-2"></i>
                구매하기
              </button>
            </div>
            
            ${product.stock <= 0 ? `
              <p class="mt-3 text-center text-red-600">
                <i class="fas fa-exclamation-circle"></i> 현재 품절된 상품입니다
              </p>
            ` : product.stock < 10 ? `
              <p class="mt-3 text-center text-orange-600 text-sm">
                <i class="fas fa-fire"></i> 남은 수량 ${product.stock}개
              </p>
            ` : ''}
          </div>
        </div>
      </div>
    `;
    
    // 수량 조절 버튼 이벤트
    const qtyInput = document.getElementById('productQuantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    
    if (qtyInput && decreaseBtn && increaseBtn) {
      decreaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(qtyInput.value);
        if (currentValue > 1) {
          qtyInput.value = currentValue - 1;
        }
      });
      
      increaseBtn.addEventListener('click', () => {
        const currentValue = parseInt(qtyInput.value);
        const maxStock = parseInt(qtyInput.getAttribute('max'));
        if (currentValue < maxStock) {
          qtyInput.value = currentValue + 1;
        } else {
          alert('재고가 부족합니다');
        }
      });
    }
    
  } catch (error) {
    console.error('상품 상세 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">상품을 찾을 수 없습니다.</p></div>';
  }
}

// 바로 구매
window.buyNow = async function(productId, quantity = 1) {
  try {
    // 임시로 세션 스토리지에 저장하고 주문서 작성 페이지로 이동
    const buyNowItems = [{
      product_id: productId,
      quantity: parseInt(quantity)
    }];
    
    sessionStorage.setItem('checkout_items', JSON.stringify(buyNowItems));
    sessionStorage.setItem('checkout_type', 'direct'); // 바로구매
    
    window.location.href = '/checkout';
  } catch (error) {
    console.error('바로 구매 오류:', error);
    alert('주문서 작성 페이지로 이동 중 오류가 발생했습니다');
  }
};

// ===== 지역 목록 페이지 =====
async function loadRegionsPage() {
  const type = searchParams.get('type');
  
  try {
    let url = '/api/regions';
    if (type) url += `?type=${type}`;
    
    const response = await axios.get(url);
    // API가 배열 또는 { regions: [...] } 형식으로 반환 가능
    const regions = Array.isArray(response.data) ? response.data : response.data.regions;
    
    const typeNames = {
      'tea': '차 산지',
      'craft': '공예 산지'
    };
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">
          ${type ? typeNames[type] : '전체 지역'}
        </h1>
        
        <div class="flex gap-4 mb-8">
          <a href="/regions" class="px-4 py-2 rounded-full ${!type ? 'bg-tea-green text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            전체
          </a>
          <a href="/regions?type=tea" class="px-4 py-2 rounded-full ${type === 'tea' ? 'bg-tea-green text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            차 산지
          </a>
          <a href="/regions?type=craft" class="px-4 py-2 rounded-full ${type === 'craft' ? 'bg-craft-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            공예 산지
          </a>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${regions.map(region => `
            <a href="/regions/${region.id}" class="block bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
              <div class="h-48 bg-gradient-to-br ${region.type === 'tea' ? 'from-tea-green to-green-600' : 'from-craft-blue to-blue-600'} flex items-center justify-center">
                <i class="fas ${region.type === 'tea' ? 'fa-leaf' : 'fa-palette'} text-white text-6xl"></i>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${region.name}</h3>
                <p class="text-gray-600 text-sm">${region.description || ''}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  } catch (error) {
    console.error('지역 목록 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">페이지를 불러오는 중 오류가 발생했습니다.</p></div>';
  }
}

// ===== 지역 상세 페이지 =====
async function loadRegionDetailPage(regionId) {
  try {
    const response = await axios.get(`/api/regions/${regionId}`);
    const { region, producers, attractions } = response.data;
    
    // 관광지를 타입별로 분류
    const touristSpots = attractions.filter(a => a.attraction_type === 'tourist_spot');
    const restaurants = attractions.filter(a => a.attraction_type === 'restaurant');
    const workshops = attractions.filter(a => a.attraction_type === 'workshop');
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <!-- 지역 헤더 -->
        <div class="bg-gradient-to-r ${region.type === 'tea' ? 'from-tea-green to-green-600' : 'from-craft-blue to-blue-600'} text-white rounded-lg p-12 mb-8">
          <h1 class="text-4xl font-bold mb-4">
            <i class="fas ${region.type === 'tea' ? 'fa-leaf' : 'fa-palette'} mr-3"></i>
            ${region.name}
          </h1>
          <p class="text-xl">${region.description || ''}</p>
        </div>
        
        <!-- 생산자 -->
        ${producers.length > 0 ? `
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
              <i class="fas fa-users mr-2"></i>
              생산자
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${producers.map(producer => `
                <a href="/producers/${producer.id}" class="block bg-white rounded-lg p-6 hover:shadow-lg transition">
                  <div class="flex items-center space-x-4 mb-4">
                    <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <i class="fas fa-user text-gray-400 text-2xl"></i>
                    </div>
                    <div>
                      <h3 class="font-bold text-lg">${producer.name}</h3>
                      <div class="text-sm text-gray-500">${producer.producer_type === 'tea' ? '차 생산' : '공예 제작'}</div>
                    </div>
                  </div>
                  <p class="text-gray-600 text-sm">${producer.description || ''}</p>
                </a>
              `).join('')}
            </div>
          </section>
        ` : ''}
        
        <!-- 관광 명소 -->
        ${touristSpots.length > 0 ? `
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
              <i class="fas fa-map-marked-alt mr-2"></i>
              가볼만한 곳
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${touristSpots.map(spot => `
                <div class="bg-white rounded-lg overflow-hidden shadow-md">
                  <div class="h-48 bg-gray-200 flex items-center justify-center">
                    <i class="fas fa-camera text-gray-400 text-6xl"></i>
                  </div>
                  <div class="p-6">
                    <h3 class="font-bold text-lg mb-2">${spot.name}</h3>
                    <p class="text-gray-600 text-sm mb-3">${spot.description || ''}</p>
                    ${spot.address ? `<div class="text-sm text-gray-500 mb-1"><i class="fas fa-map-marker-alt mr-1"></i>${spot.address}</div>` : ''}
                    ${spot.opening_hours ? `<div class="text-sm text-gray-500"><i class="fas fa-clock mr-1"></i>${spot.opening_hours}</div>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
        
        <!-- 맛집 -->
        ${restaurants.length > 0 ? `
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
              <i class="fas fa-utensils mr-2"></i>
              맛집
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${restaurants.map(restaurant => `
                <div class="bg-white rounded-lg p-6 shadow-md">
                  <h3 class="font-bold text-lg mb-2">${restaurant.name}</h3>
                  <p class="text-gray-600 text-sm mb-3">${restaurant.description || ''}</p>
                  ${restaurant.address ? `<div class="text-sm text-gray-500 mb-1"><i class="fas fa-map-marker-alt mr-1"></i>${restaurant.address}</div>` : ''}
                  ${restaurant.phone ? `<div class="text-sm text-gray-500 mb-1"><i class="fas fa-phone mr-1"></i>${restaurant.phone}</div>` : ''}
                  ${restaurant.opening_hours ? `<div class="text-sm text-gray-500"><i class="fas fa-clock mr-1"></i>${restaurant.opening_hours}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
        
        <!-- 공방/체험 -->
        ${workshops.length > 0 ? `
          <section class="mb-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
              <i class="fas fa-hammer mr-2"></i>
              공방 · 체험장
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${workshops.map(workshop => `
                <div class="bg-white rounded-lg p-6 shadow-md">
                  <h3 class="font-bold text-lg mb-2">${workshop.name}</h3>
                  <p class="text-gray-600 text-sm mb-3">${workshop.description || ''}</p>
                  ${workshop.address ? `<div class="text-sm text-gray-500 mb-1"><i class="fas fa-map-marker-alt mr-1"></i>${workshop.address}</div>` : ''}
                  ${workshop.phone ? `<div class="text-sm text-gray-500 mb-1"><i class="fas fa-phone mr-1"></i>${workshop.phone}</div>` : ''}
                  ${workshop.opening_hours ? `<div class="text-sm text-gray-500"><i class="fas fa-clock mr-1"></i>${workshop.opening_hours}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}
      </div>
    `;
  } catch (error) {
    console.error('지역 상세 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">지역을 찾을 수 없습니다.</p></div>';
  }
}

// ===== 생산자 목록 페이지 =====
async function loadProducersPage() {
  const type = searchParams.get('type');
  
  try {
    let url = '/api/producers';
    if (type) url += `?type=${type}`;
    
    const response = await axios.get(url);
    const producers = response.data.producers;
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">생산자</h1>
        
        <div class="flex gap-4 mb-8">
          <a href="/producers" class="px-4 py-2 rounded-full ${!type ? 'bg-tea-green text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            전체
          </a>
          <a href="/producers?type=tea" class="px-4 py-2 rounded-full ${type === 'tea' ? 'bg-tea-green text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            차 생산자
          </a>
          <a href="/producers?type=craft" class="px-4 py-2 rounded-full ${type === 'craft' ? 'bg-craft-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            공예 작가
          </a>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${producers.map(producer => `
            <a href="/producers/${producer.id}" class="block bg-white rounded-lg p-6 hover:shadow-lg transition">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-20 h-20 bg-gradient-to-br ${producer.producer_type === 'tea' ? 'from-tea-green to-green-600' : 'from-craft-blue to-blue-600'} rounded-full flex items-center justify-center">
                  <i class="fas fa-user text-white text-3xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-xl">${producer.name}</h3>
                  <div class="text-sm text-gray-500">${producer.region_name}</div>
                </div>
              </div>
              <p class="text-gray-600 text-sm">${producer.description || ''}</p>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  } catch (error) {
    console.error('생산자 목록 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">페이지를 불러오는 중 오류가 발생했습니다.</p></div>';
  }
}

// ===== 생산자 상세 페이지 =====
async function loadProducerDetailPage(producerId) {
  try {
    const response = await axios.get(`/api/producers/${producerId}`);
    const { producer, products } = response.data;
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <!-- 생산자 프로필 -->
        <div class="bg-white rounded-lg p-8 mb-8 shadow-md">
          <div class="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div class="w-32 h-32 bg-gradient-to-br ${producer.producer_type === 'tea' ? 'from-tea-green to-green-600' : 'from-craft-blue to-blue-600'} rounded-full flex items-center justify-center">
              <i class="fas fa-user text-white text-5xl"></i>
            </div>
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-gray-800 mb-2">${producer.name}</h1>
              <div class="text-gray-600 mb-4">
                <i class="fas fa-map-marker-alt mr-2"></i>${producer.region_name}
              </div>
              <p class="text-gray-700 mb-4">${producer.description || ''}</p>
              ${producer.story ? `
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-bold mb-2">생산자 스토리</h3>
                  <p class="text-gray-600 text-sm">${producer.story}</p>
                </div>
              ` : ''}
            </div>
          </div>
          
          ${producer.contact_email || producer.contact_phone || producer.address ? `
            <div class="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              ${producer.address ? `
                <div>
                  <div class="text-gray-500 mb-1">주소</div>
                  <div class="font-medium">${producer.address}</div>
                </div>
              ` : ''}
              ${producer.contact_phone ? `
                <div>
                  <div class="text-gray-500 mb-1">연락처</div>
                  <div class="font-medium">${producer.contact_phone}</div>
                </div>
              ` : ''}
              ${producer.contact_email ? `
                <div>
                  <div class="text-gray-500 mb-1">이메일</div>
                  <div class="font-medium">${producer.contact_email}</div>
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>
        
        <!-- 생산자의 상품 -->
        ${products.length > 0 ? `
          <div>
            <h2 class="text-2xl font-bold text-gray-800 mb-6">${producer.name}의 상품</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              ${products.map(product => `
                <a href="/products/${product.id}" class="block bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div class="h-64 bg-gray-200 flex items-center justify-center">
                    <i class="fas ${product.product_type === 'tea' ? 'fa-mug-hot' : product.product_type === 'craft' ? 'fa-palette' : 'fa-gift'} text-gray-400 text-6xl"></i>
                  </div>
                  <div class="p-4">
                    <h3 class="font-bold text-lg mb-2">${product.name}</h3>
                    <div class="flex items-center justify-between">
                      <span class="text-tea-green font-bold text-xl">${formatPrice(product.price)}</span>
                      ${product.is_featured ? '<span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">인기</span>' : ''}
                    </div>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>
        ` : '<div class="text-center py-12 text-gray-500">등록된 상품이 없습니다.</div>'}
      </div>
    `;
  } catch (error) {
    console.error('생산자 상세 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">생산자를 찾을 수 없습니다.</p></div>';
  }
}

// ===== 체험 목록 페이지 =====
async function loadExperiencesPage() {
  const type = searchParams.get('type');
  
  try {
    let url = '/api/experiences';
    if (type) url += `?type=${type}`;
    
    const response = await axios.get(url);
    const experiences = response.data.experiences;
    
    const typeNames = {
      'tea_ceremony': '다도교육',
      'tea_experience': '차체험',
      'craft_workshop': '공예 체험',
      'farm_tour': '농장 투어',
      'workshop_visit': '공방 견학'
    };
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">체험 & 교육 프로그램</h1>
        
        <div class="flex flex-wrap gap-2 mb-8">
          <a href="/experiences" class="px-4 py-2 rounded-full ${!type ? 'bg-tea-green text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            전체
          </a>
          <a href="/experiences?type=tea_ceremony" class="px-4 py-2 rounded-full ${type === 'tea_ceremony' ? 'bg-tea-green text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            다도교육
          </a>
          <a href="/experiences?type=tea_experience" class="px-4 py-2 rounded-full ${type === 'tea_experience' ? 'bg-tea-green text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            차체험
          </a>
          <a href="/experiences?type=craft_workshop" class="px-4 py-2 rounded-full ${type === 'craft_workshop' ? 'bg-craft-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            공예 체험
          </a>
          <a href="/experiences?type=farm_tour" class="px-4 py-2 rounded-full ${type === 'farm_tour' ? 'bg-tea-green text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            농장 투어
          </a>
          <a href="/experiences?type=workshop_visit" class="px-4 py-2 rounded-full ${type === 'workshop_visit' ? 'bg-craft-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-100'} transition">
            공방 견학
          </a>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${experiences.map(exp => `
            <a href="/experiences/${exp.id}" class="block bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
              <div class="h-48 bg-gradient-to-br ${exp.experience_type.includes('tea') ? 'from-tea-green to-green-600' : 'from-craft-blue to-blue-600'} flex items-center justify-center">
                <i class="fas ${exp.experience_type === 'tea_ceremony' ? 'fa-yin-yang' : exp.experience_type === 'tea_experience' ? 'fa-mug-hot' : exp.experience_type === 'craft_workshop' ? 'fa-palette' : exp.experience_type === 'farm_tour' ? 'fa-tractor' : 'fa-door-open'} text-white text-6xl"></i>
              </div>
              <div class="p-6">
                <div class="text-sm text-gray-500 mb-2">
                  <span class="inline-block px-2 py-1 bg-gray-100 rounded text-xs font-medium">${typeNames[exp.experience_type]}</span>
                  ${exp.region_name ? `<span class="ml-2">${exp.region_name}</span>` : ''}
                </div>
                <h3 class="font-bold text-xl mb-2">${exp.title}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${exp.description || ''}</p>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">
                    <i class="fas fa-clock mr-1"></i>${exp.duration}
                  </span>
                  <span class="text-tea-green font-bold text-lg">${formatPrice(exp.price)}</span>
                </div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  } catch (error) {
    console.error('체험 목록 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">페이지를 불러오는 중 오류가 발생했습니다.</p></div>';
  }
}

// ===== 체험 상세 페이지 =====
async function loadExperienceDetailPage(experienceId) {
  try {
    const response = await axios.get(`/api/experiences/${experienceId}`);
    const { experience, schedules } = response.data;
    
    const typeNames = {
      'tea_ceremony': '다도교육',
      'tea_experience': '차체험',
      'craft_workshop': '공예 체험',
      'farm_tour': '농장 투어',
      'workshop_visit': '공방 견학'
    };
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg overflow-hidden shadow-md mb-6">
              <div class="h-96 bg-gradient-to-br ${experience.experience_type.includes('tea') ? 'from-tea-green to-green-600' : 'from-craft-blue to-blue-600'} flex items-center justify-center">
                <i class="fas ${experience.experience_type === 'tea_ceremony' ? 'fa-yin-yang' : experience.experience_type === 'tea_experience' ? 'fa-mug-hot' : experience.experience_type === 'craft_workshop' ? 'fa-palette' : experience.experience_type === 'farm_tour' ? 'fa-tractor' : 'fa-door-open'} text-white text-8xl"></i>
              </div>
              <div class="p-8">
                <div class="mb-4">
                  <span class="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium mr-2">${typeNames[experience.experience_type]}</span>
                  ${experience.region_name ? `<span class="text-gray-600">${experience.region_name}</span>` : ''}
                </div>
                <h1 class="text-3xl font-bold text-gray-800 mb-4">${experience.title}</h1>
                <p class="text-gray-700 leading-relaxed mb-6">${experience.description || ''}</p>
                
                <div class="grid grid-cols-2 gap-4 py-6 border-t border-b border-gray-200">
                  <div>
                    <div class="text-gray-500 text-sm mb-1">소요 시간</div>
                    <div class="font-bold text-lg">${experience.duration}</div>
                  </div>
                  <div>
                    <div class="text-gray-500 text-sm mb-1">참가 인원</div>
                    <div class="font-bold text-lg">최대 ${experience.max_participants}명</div>
                  </div>
                  ${experience.producer_name ? `
                    <div class="col-span-2">
                      <div class="text-gray-500 text-sm mb-1">진행</div>
                      <div class="font-medium">${experience.producer_name}</div>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
          
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg p-6 shadow-md sticky top-24">
              ${experience.original_price && experience.discount_rate ? `
                <div class="mb-6">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-lg text-gray-400 line-through">${formatPrice(experience.original_price)}</span>
                    <span class="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">${experience.discount_rate}%</span>
                  </div>
                  <div class="text-3xl font-bold text-craft-blue mb-1">${formatPrice(experience.price)}</div>
                  <div class="text-sm text-red-600 font-medium">
                    <i class="fas fa-tag mr-1"></i>
                    ${formatPrice(experience.original_price - experience.price)} 절약
                  </div>
                </div>
              ` : `
                <div class="text-3xl font-bold text-tea-green mb-6">${formatPrice(experience.price)}</div>
              `}
              
              ${schedules.length > 0 ? `
                <div class="mb-6">
                  <h3 class="font-bold mb-3">예약 가능한 일정</h3>
                  <div class="space-y-2 max-h-96 overflow-y-auto">
                    ${schedules.map(schedule => `
                      <button class="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-tea-green hover:bg-tea-cream transition">
                        <div class="font-medium">${formatDate(schedule.schedule_date)}</div>
                        <div class="text-sm text-gray-600 mt-1">
                          ${schedule.start_time} 시작 · 잔여 ${schedule.available_slots - schedule.booked_slots}석
                        </div>
                      </button>
                    `).join('')}
                  </div>
                </div>
                
                <button class="w-full bg-tea-green text-white px-6 py-4 rounded-lg font-bold hover:bg-opacity-90 transition">
                  <i class="fas fa-calendar-check mr-2"></i>
                  예약하기
                </button>
              ` : `
                <div class="text-center py-6 text-gray-500">
                  <i class="fas fa-calendar-times text-4xl mb-3"></i>
                  <div>현재 예약 가능한 일정이 없습니다</div>
                </div>
              `}
              
              <div class="mt-6 pt-6 border-t border-gray-200">
                <div class="text-sm text-gray-600">
                  <div class="flex items-start mb-2">
                    <i class="fas fa-info-circle text-tea-green mt-1 mr-2"></i>
                    <div>예약은 최소 3일 전까지 가능합니다</div>
                  </div>
                  <div class="flex items-start">
                    <i class="fas fa-info-circle text-tea-green mt-1 mr-2"></i>
                    <div>취소 및 환불 규정은 예약 후 안내됩니다</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('체험 상세 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">체험을 찾을 수 없습니다.</p></div>';
  }
}

// ===== 이벤트 목록 페이지 =====
async function loadEventsPage() {
  try {
    const response = await axios.get('/api/events');
    const events = response.data.events;
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">
          <i class="fas fa-star text-tea-brown mr-2"></i>
          이달의 이벤트
        </h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${events.map(event => `
            <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div class="h-64 bg-gradient-to-br from-tea-brown to-tea-green flex items-center justify-center">
                <i class="fas ${event.event_type === 'discount' ? 'fa-percentage' : event.event_type === 'new_product' ? 'fa-gift' : event.event_type === 'season' ? 'fa-calendar-alt' : 'fa-flag'} text-white text-7xl"></i>
              </div>
              <div class="p-6">
                <div class="mb-3">
                  ${event.discount_rate > 0 ? `
                    <span class="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                      ${event.discount_rate}% 할인
                    </span>
                  ` : `
                    <span class="inline-block px-3 py-1 bg-tea-brown bg-opacity-20 text-tea-brown rounded-full text-sm font-bold">
                      특별 이벤트
                    </span>
                  `}
                </div>
                <h3 class="text-xl font-bold mb-3">${event.title}</h3>
                <p class="text-gray-600 text-sm mb-4">${event.description}</p>
                <div class="text-sm text-gray-500 mb-4">
                  <i class="fas fa-clock mr-1"></i>
                  ${formatDate(event.start_date)} ~ ${formatDate(event.end_date)}
                </div>
                <a href="/products" class="inline-block w-full text-center bg-tea-brown text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                  이벤트 상품 보기
                </a>
              </div>
            </div>
          `).join('')}
        </div>
        
        ${events.length === 0 ? '<div class="text-center py-20 text-gray-500">진행 중인 이벤트가 없습니다.</div>' : ''}
      </div>
    `;
  } catch (error) {
    console.error('이벤트 목록 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">페이지를 불러오는 중 오류가 발생했습니다.</p></div>';
  }
}

// ===== 교육 신청 페이지 =====
async function loadEducationApplicationPage() {
  app.innerHTML = `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          <i class="fas fa-graduation-cap text-tea-green mr-2"></i>
          다도교육 신청
        </h1>
        <p class="text-gray-600 mb-8">어린이집, 학교, 기업, 관공서를 대상으로 다도교육 프로그램을 운영합니다.</p>
        
        <form id="educationApplicationForm" class="bg-white rounded-lg shadow-md p-8">
          <!-- 기관 유형 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-bold mb-2">
              기관 유형 <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-tea-green transition">
                <input type="radio" name="organization_type" value="kindergarten" required class="mr-2">
                <span>어린이집</span>
              </label>
              <label class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-tea-green transition">
                <input type="radio" name="organization_type" value="school" required class="mr-2">
                <span>학교</span>
              </label>
              <label class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-tea-green transition">
                <input type="radio" name="organization_type" value="company" required class="mr-2">
                <span>기업</span>
              </label>
              <label class="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-tea-green transition">
                <input type="radio" name="organization_type" value="government" required class="mr-2">
                <span>관공서</span>
              </label>
            </div>
          </div>
          
          <!-- 기관명 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-bold mb-2">
              기관명 <span class="text-red-500">*</span>
            </label>
            <input type="text" name="organization_name" required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
              placeholder="예: 햇살 어린이집">
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- 담당자명 -->
            <div>
              <label class="block text-gray-700 font-bold mb-2">
                담당자명 <span class="text-red-500">*</span>
              </label>
              <input type="text" name="contact_person" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                placeholder="예: 김미영">
            </div>
            
            <!-- 연락처 -->
            <div>
              <label class="block text-gray-700 font-bold mb-2">
                연락처 <span class="text-red-500">*</span>
              </label>
              <input type="tel" name="contact_phone" required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                placeholder="예: 02-123-4567">
            </div>
          </div>
          
          <!-- 이메일 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-bold mb-2">
              이메일
            </label>
            <input type="email" name="contact_email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
              placeholder="예: contact@example.com">
          </div>
          
          <!-- 주소 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-bold mb-2">
              주소 <span class="text-red-500">*</span>
            </label>
            <input type="text" name="address" required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
              placeholder="예: 서울시 강남구 테헤란로 123">
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <!-- 참가 인원 -->
            <div>
              <label class="block text-gray-700 font-bold mb-2">
                참가 인원 <span class="text-red-500">*</span>
              </label>
              <input type="number" name="participant_count" required min="1"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                placeholder="예: 25">
            </div>
            
            <!-- 희망 날짜 -->
            <div>
              <label class="block text-gray-700 font-bold mb-2">
                희망 날짜
              </label>
              <input type="date" name="preferred_date"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green">
            </div>
            
            <!-- 희망 시간 -->
            <div>
              <label class="block text-gray-700 font-bold mb-2">
                희망 시간
              </label>
              <input type="time" name="preferred_time"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green">
            </div>
          </div>
          
          <!-- 교육 유형 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-bold mb-2">
              교육 유형 <span class="text-red-500">*</span>
            </label>
            <select name="education_type" required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green">
              <option value="">선택하세요</option>
              <option value="tea_ceremony">다도교육</option>
              <option value="tea_tasting">차 시음</option>
              <option value="craft_workshop">공예 체험</option>
            </select>
          </div>
          
          <!-- 문의 사항 -->
          <div class="mb-6">
            <label class="block text-gray-700 font-bold mb-2">
              문의 사항
            </label>
            <textarea name="message" rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
              placeholder="교육에 대한 문의사항이나 특별한 요청사항을 적어주세요."></textarea>
          </div>
          
          <div class="flex gap-4">
            <button type="submit"
              class="flex-1 bg-tea-green text-white px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition">
              <i class="fas fa-paper-plane mr-2"></i>
              신청하기
            </button>
            <a href="/education/status"
              class="flex-1 bg-gray-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition text-center">
              <i class="fas fa-list mr-2"></i>
              진행현황 보기
            </a>
          </div>
        </form>
      </div>
    </div>
  `;
  
  // 폼 제출 처리
  const form = document.getElementById('educationApplicationForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    try {
      const response = await axios.post('/api/education-applications', data);
      
      if (response.data.success) {
        alert(response.data.message);
        window.location.href = '/education/status';
      }
    } catch (error) {
      console.error('신청 오류:', error);
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  });
}

// ===== 교육 현황 페이지 =====
async function loadEducationStatusPage() {
  try {
    const [applicationsRes, statsRes] = await Promise.all([
      axios.get('/api/education-applications?limit=100'),
      axios.get('/api/education-statistics')
    ]);
    
    const applications = applicationsRes.data.applications;
    const stats = statsRes.data;
    
    // 기관 유형 이름 매핑
    const orgTypeNames = {
      'kindergarten': '어린이집',
      'school': '학교',
      'company': '기업',
      'government': '관공서'
    };
    
    // 상태 이름 매핑
    const statusNames = {
      'pending': '승인 대기',
      'approved': '승인됨',
      'in_progress': '진행 중',
      'completed': '완료',
      'cancelled': '취소됨'
    };
    
    // 상태별 색상
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-600',
      'approved': 'bg-blue-100 text-blue-600',
      'in_progress': 'bg-green-100 text-green-600',
      'completed': 'bg-gray-100 text-gray-600',
      'cancelled': 'bg-red-100 text-red-600'
    };
    
    // 교육 타입 이름 매핑
    const eduTypeNames = {
      'tea_ceremony': '다도교육',
      'tea_tasting': '차 시음',
      'craft_workshop': '공예 체험'
    };
    
    // 진행 중인 교육만 필터링
    const inProgressApps = applications.filter(app => app.status === 'in_progress');
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">
            <i class="fas fa-clipboard-list text-tea-green mr-2"></i>
            다도교육 진행 현황
          </h1>
          <a href="/education/apply" class="bg-tea-green text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
            <i class="fas fa-plus mr-2"></i>
            교육 신청하기
          </a>
        </div>
        
        <!-- 통계 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-gray-500 text-sm mb-2">전체 신청</div>
            <div class="text-3xl font-bold text-gray-800">${applications.length}</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-gray-500 text-sm mb-2">진행 중</div>
            <div class="text-3xl font-bold text-green-600">${inProgressApps.length}</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-gray-500 text-sm mb-2">승인 대기</div>
            <div class="text-3xl font-bold text-yellow-600">${applications.filter(a => a.status === 'pending').length}</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-gray-500 text-sm mb-2">완료</div>
            <div class="text-3xl font-bold text-gray-600">${applications.filter(a => a.status === 'completed').length}</div>
          </div>
        </div>
        
        <!-- 진행 중인 교육 -->
        ${inProgressApps.length > 0 ? `
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">
              <i class="fas fa-chalkboard-teacher text-tea-green mr-2"></i>
              현재 진행 중인 교육
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${inProgressApps.map(app => `
                <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                  <div class="flex justify-between items-start mb-3">
                    <span class="inline-block px-3 py-1 ${statusColors[app.status]} rounded-full text-sm font-bold">
                      진행 중
                    </span>
                    <span class="text-sm text-gray-500">${orgTypeNames[app.organization_type]}</span>
                  </div>
                  <h3 class="text-xl font-bold mb-2">${app.organization_name}</h3>
                  <div class="space-y-2 text-sm text-gray-600 mb-4">
                    <div><i class="fas fa-user mr-2"></i>${app.contact_person}</div>
                    <div><i class="fas fa-users mr-2"></i>${app.participant_count}명</div>
                    <div><i class="fas fa-book mr-2"></i>${eduTypeNames[app.education_type]}</div>
                    ${app.education_start_date ? `
                      <div><i class="fas fa-calendar mr-2"></i>${formatDate(app.education_start_date)} ~ ${formatDate(app.education_end_date)}</div>
                    ` : ''}
                    ${app.instructor_name ? `
                      <div><i class="fas fa-chalkboard-teacher mr-2"></i>${app.instructor_name}</div>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- 전체 신청 목록 -->
        <div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">전체 신청 목록</h2>
          
          <!-- 필터 -->
          <div class="bg-white rounded-lg shadow-md p-4 mb-4">
            <div class="flex flex-wrap gap-2">
              <button onclick="filterApplications('all')" class="px-4 py-2 rounded-full bg-tea-green text-white font-medium">
                전체 (${applications.length})
              </button>
              <button onclick="filterApplications('pending')" class="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium">
                승인 대기 (${applications.filter(a => a.status === 'pending').length})
              </button>
              <button onclick="filterApplications('in_progress')" class="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium">
                진행 중 (${inProgressApps.length})
              </button>
              <button onclick="filterApplications('completed')" class="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium">
                완료 (${applications.filter(a => a.status === 'completed').length})
              </button>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">기관</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">담당자</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">인원</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">교육</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신청일</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200" id="applicationsTableBody">
                  ${applications.map(app => `
                    <tr class="hover:bg-gray-50 application-row" data-status="${app.status}">
                      <td class="px-6 py-4">
                        <span class="inline-block px-2 py-1 ${statusColors[app.status]} rounded text-xs font-medium">
                          ${statusNames[app.status]}
                        </span>
                      </td>
                      <td class="px-6 py-4">
                        <div class="font-medium">${app.organization_name}</div>
                        <div class="text-sm text-gray-500">${orgTypeNames[app.organization_type]}</div>
                      </td>
                      <td class="px-6 py-4">
                        <div>${app.contact_person}</div>
                        <div class="text-sm text-gray-500">${app.contact_phone}</div>
                      </td>
                      <td class="px-6 py-4">${app.participant_count}명</td>
                      <td class="px-6 py-4">${eduTypeNames[app.education_type]}</td>
                      <td class="px-6 py-4 text-sm text-gray-500">${formatDate(app.created_at)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 필터 함수를 전역으로 등록
    window.filterApplications = (status) => {
      const rows = document.querySelectorAll('.application-row');
      rows.forEach(row => {
        if (status === 'all' || row.dataset.status === status) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    };
    
  } catch (error) {
    console.error('교육 현황 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">페이지를 불러오는 중 오류가 발생했습니다.</p></div>';
  }
}

// ===== 생산자 관리 페이지 =====
async function loadProducerManagePage(producerId) {
  try {
    const [producerRes, productsRes, experiencesRes] = await Promise.all([
      axios.get(`/api/producers/${producerId}`),
      axios.get(`/api/producers/${producerId}/products`),
      axios.get(`/api/producers/${producerId}/experiences`)
    ]);
    
    const producer = producerRes.data;
    const products = productsRes.data.products;
    const experiences = experiencesRes.data.experiences;
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <!-- 헤더 -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-800 mb-2">${producer.name}</h1>
              <p class="text-gray-600">${producer.description}</p>
            </div>
            <img src="${producer.profile_image}" alt="${producer.name}" 
                 class="w-24 h-24 rounded-full object-cover" 
                 onerror="this.src='https://via.placeholder.com/100'">
          </div>
        </div>
        
        <!-- 상품 관리 -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-800 flex items-center">
              <i class="fas fa-box text-tea-green mr-2"></i>
              내 상품 관리
            </h2>
            <a href="/producer/${producerId}/product/new" 
               class="bg-tea-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
              <i class="fas fa-plus mr-2"></i>상품 등록
            </a>
          </div>
          
          ${products.length === 0 ? `
            <div class="text-center py-12 text-gray-500">
              <i class="fas fa-box-open text-6xl mb-4"></i>
              <p>등록된 상품이 없습니다</p>
            </div>
          ` : `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              ${products.map(product => `
                <div class="border rounded-lg p-4 hover:shadow-md transition">
                  <img src="${product.main_image}" alt="${product.name}" 
                       class="w-full h-40 object-cover rounded-lg mb-3"
                       onerror="this.src='https://via.placeholder.com/400x300'">
                  <h3 class="font-bold text-gray-800 mb-2">${product.name}</h3>
                  <div class="mb-3">
                    ${product.original_price ? `
                      <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-400 line-through">${formatPrice(product.original_price)}</span>
                        <span class="text-xs bg-red-500 text-white px-2 py-1 rounded">${product.discount_rate}%</span>
                      </div>
                      <div class="text-lg font-bold text-tea-green">${formatPrice(product.price)}</div>
                    ` : `
                      <div class="text-lg font-bold text-tea-green">${formatPrice(product.price)}</div>
                    `}
                  </div>
                  <div class="flex gap-2">
                    <a href="/producer/${producerId}/product/${product.id}" 
                       class="flex-1 bg-blue-500 text-white py-2 px-4 rounded text-center hover:bg-blue-600">
                      <i class="fas fa-edit"></i> 수정
                    </a>
                    <button onclick="deleteProduct(${product.id}, ${producerId})" 
                            class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
        
        <!-- 체험 관리 -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-800 flex items-center">
              <i class="fas fa-users text-craft-blue mr-2"></i>
              내 체험 관리
            </h2>
            <a href="/producer/${producerId}/experience/new" 
               class="bg-craft-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
              <i class="fas fa-plus mr-2"></i>체험 등록
            </a>
          </div>
          
          ${experiences.length === 0 ? `
            <div class="text-center py-12 text-gray-500">
              <i class="fas fa-calendar-alt text-6xl mb-4"></i>
              <p>등록된 체험이 없습니다</p>
            </div>
          ` : `
            <div class="space-y-4">
              ${experiences.map(exp => `
                <div class="border rounded-lg p-4 hover:shadow-md transition">
                  <div class="flex gap-4">
                    <img src="${exp.image_url}" alt="${exp.name}" 
                         class="w-32 h-32 object-cover rounded-lg"
                         onerror="this.src='https://via.placeholder.com/200'">
                    <div class="flex-1">
                      <h3 class="font-bold text-gray-800 mb-2">${exp.name}</h3>
                      <p class="text-sm text-gray-600 mb-2">${exp.description}</p>
                      <div class="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span><i class="fas fa-clock mr-1"></i>${exp.duration_hours}시간</span>
                        <span><i class="fas fa-users mr-1"></i>최대 ${exp.max_participants}명</span>
                      </div>
                      <div class="mb-2">
                        ${exp.original_price ? `
                          <span class="text-sm text-gray-400 line-through mr-2">${formatPrice(exp.original_price)}</span>
                          <span class="text-xs bg-red-500 text-white px-2 py-1 rounded mr-2">${exp.discount_rate}%</span>
                        ` : ''}
                        <span class="text-lg font-bold text-craft-blue">${formatPrice(exp.price)}</span>
                      </div>
                      <div class="flex gap-2">
                        <a href="/producer/${producerId}/experience/${exp.id}" 
                           class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                          <i class="fas fa-edit"></i> 수정
                        </a>
                        <button onclick="deleteExperience(${exp.id}, ${producerId})" 
                                class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                          <i class="fas fa-trash"></i> 삭제
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
    
  } catch (error) {
    console.error('생산자 관리 페이지 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">페이지를 불러오는 중 오류가 발생했습니다.</p></div>';
  }
}

// 상품 삭제
async function deleteProduct(productId, producerId) {
  if (!confirm('정말 이 상품을 삭제하시겠습니까?')) return;
  
  try {
    await axios.delete(`/api/products/${productId}`);
    alert('상품이 삭제되었습니다.');
    window.location.href = `/producer/manage/${producerId}`;
  } catch (error) {
    console.error('상품 삭제 오류:', error);
    alert('상품 삭제 중 오류가 발생했습니다.');
  }
}

// 체험 삭제
async function deleteExperience(experienceId, producerId) {
  if (!confirm('정말 이 체험을 삭제하시겠습니까?')) return;
  
  try {
    await axios.delete(`/api/experiences/${experienceId}`);
    alert('체험이 삭제되었습니다.');
    window.location.href = `/producer/manage/${producerId}`;
  } catch (error) {
    console.error('체험 삭제 오류:', error);
    alert('체험 삭제 중 오류가 발생했습니다.');
  }
}

// ===== 사용자 인증 =====

// 현재 로그인 사용자 정보 전역 변수
let currentUser = null;

// 로그인 사용자 정보 가져오기
async function fetchCurrentUser() {
  try {
    const response = await axios.get('/api/auth/me');
    currentUser = response.data.user;
    updateNavigation();
    return currentUser;
  } catch (error) {
    console.error('사용자 정보 가져오기 오류:', error);
    return null;
  }
}

// 네비게이션 업데이트 (로그인/로그아웃 버튼)
function updateNavigation() {
  const loginBtn = document.getElementById('loginBtn');
  const userDropdown = document.getElementById('userDropdown');
  const userName = document.getElementById('userName');
  const userAvatar = document.getElementById('userAvatar');
  const logoutBtn = document.getElementById('logoutBtn');
  const userMenuBtn = document.getElementById('userMenuBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  
  if (!loginBtn || !userDropdown) return;
  
  if (currentUser) {
    // 로그인 상태
    loginBtn.classList.add('hidden');
    userDropdown.classList.remove('hidden');
    userName.textContent = currentUser.name;
    userAvatar.src = currentUser.profile_image || 'https://via.placeholder.com/32';
    
    // 드롭다운 토글
    if (userMenuBtn && dropdownMenu) {
      userMenuBtn.onclick = () => {
        dropdownMenu.classList.toggle('hidden');
      };
      
      // 외부 클릭 시 드롭다운 닫기
      document.addEventListener('click', (e) => {
        if (!userDropdown.contains(e.target)) {
          dropdownMenu.classList.add('hidden');
        }
      });
    }
    
    // 로그아웃 버튼
    if (logoutBtn) {
      logoutBtn.onclick = logout;
    }
  } else {
    // 로그아웃 상태
    loginBtn.classList.remove('hidden');
    userDropdown.classList.add('hidden');
  }
}

// 로그아웃
async function logout() {
  try {
    await axios.post('/api/auth/logout');
    currentUser = null;
    alert('로그아웃되었습니다.');
    window.location.href = '/';
  } catch (error) {
    console.error('로그아웃 오류:', error);
    alert('로그아웃 중 오류가 발생했습니다.');
  }
}

// ===== 로그인 페이지 =====
function loadLoginPage() {
  const error = searchParams.get('error');
  let errorMessage = '';
  
  if (error === 'no_code') {
    errorMessage = '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">로그인 코드를 받지 못했습니다. 다시 시도해주세요.</div>';
  } else if (error === 'auth_failed') {
    errorMessage = '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">로그인에 실패했습니다. 다시 시도해주세요.</div>';
  }
  
  app.innerHTML = `
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">
          <i class="fas fa-leaf text-tea-green"></i>
          차茶공예
        </h1>
        <p class="text-center text-gray-600 mb-8">
          간편하게 로그인하고 더 많은 혜택을 누리세요
        </p>
        
        ${errorMessage}
        
        <div class="space-y-3">
          <!-- 구글 로그인 -->
          <a href="/auth/google" 
             class="flex items-center justify-center w-full bg-white border-2 border-gray-300 rounded-lg px-6 py-3 hover:bg-gray-50 transition group">
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="font-medium text-gray-700">구글로 시작하기</span>
          </a>
          
          <!-- 네이버 로그인 -->
          <a href="/auth/naver" 
             class="flex items-center justify-center w-full bg-[#03C75A] rounded-lg px-6 py-3 hover:bg-[#02B350] transition">
            <svg class="w-5 h-5 mr-3 fill-white" viewBox="0 0 24 24">
              <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
            </svg>
            <span class="font-medium text-white">네이버로 시작하기</span>
          </a>
          
          <!-- 카카오 로그인 -->
          <a href="/auth/kakao" 
             class="flex items-center justify-center w-full bg-[#FEE500] rounded-lg px-6 py-3 hover:bg-[#FDD835] transition">
            <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.678l-1.928 1.866V9.282a.472.472 0 0 0-.944 0v2.557a.471.471 0 0 0 0 .222V13.5a.472.472 0 0 0 .944 0v-1.363l.427-.413 1.428 2.033a.472.472 0 1 0 .773-.543l-1.514-2.155zm-2.958 1.924h-1.46V9.297a.472.472 0 0 0-.943 0v4.159c0 .26.21.472.471.472h1.932a.472.472 0 1 0 0-.944zm-5.857-1.092l.696-1.707.638 1.707H9.092zm2.523.488l.002-.016a.469.469 0 0 0-.127-.32l-1.046-2.8a.69.69 0 0 0-.627-.474.696.696 0 0 0-.653.447l-1.661 4.075a.472.472 0 0 0 .874.357l.33-.813h2.07l.299.8a.472.472 0 1 0 .884-.33l-.345-.926zM8.293 9.302a.472.472 0 0 0-.471-.472H4.577a.472.472 0 1 0 0 .944h1.16v3.736a.472.472 0 0 0 .944 0V9.774h1.14c.261 0 .472-.212.472-.472z"/>
            </svg>
            <span class="font-medium text-gray-800">카카오로 시작하기</span>
          </a>
        </div>
        
        <div class="mt-8 text-center text-sm text-gray-600">
          <p>로그인하시면 <a href="/terms" class="text-tea-green hover:underline">이용약관</a> 및</p>
          <p><a href="/privacy" class="text-tea-green hover:underline">개인정보처리방침</a>에 동의하는 것으로 간주됩니다.</p>
        </div>
        
        <div class="mt-6 text-center">
          <a href="/" class="text-gray-600 hover:text-tea-green">
            <i class="fas fa-home mr-1"></i>
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  `;
}

// ===== 교육 커리큘럼 페이지 =====

// 교육 커리큘럼 목록 페이지
async function loadEducationCurriculumPage() {
  const app = document.getElementById('app');
  
  try {
    // 카테고리 및 커리큘럼 데이터 가져오기
    const [categoriesRes, curriculumRes] = await Promise.all([
      axios.get('/api/education/categories'),
      axios.get('/api/education/curriculum')
    ]);
    
    const categories = categoriesRes.data.categories;
    const allCurriculum = curriculumRes.data.curriculum;
    
    // 난이도 변환 함수
    const getDifficultyLabel = (difficulty) => {
      const map = {
        'beginner': '입문',
        'intermediate': '중급',
        'advanced': '심화'
      };
      return map[difficulty] || difficulty;
    };
    
    // 난이도 색상 함수
    const getDifficultyColor = (difficulty) => {
      if (difficulty === 'beginner' || difficulty === '입문') {
        return 'bg-green-100 text-green-800';
      } else if (difficulty === 'intermediate' || difficulty === '중급') {
        return 'bg-blue-100 text-blue-800';
      } else {
        return 'bg-purple-100 text-purple-800';
      }
    };
    
    // 차공부, 공예공부, 다도교육, 명상교육으로 분류
    const teaCurriculum = allCurriculum.filter(c => c.category_id === 2);
    const craftCurriculum = allCurriculum.filter(c => c.category_id === 3);
    const dadoCurriculum = allCurriculum.filter(c => c.category_id === 1);  // 다도교육 = category_id 1
    const meditationCurriculum = allCurriculum.filter(c => c.category_id === 4);  // 명상교육 = category_id 4
    
    app.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- 헤더 -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            <i class="fas fa-graduation-cap text-tea-green mr-3"></i>
            다도교육 커리큘럼
          </h1>
          <p class="text-lg text-gray-600 mb-4">
            차와 공예에 대한 체계적인 교육 프로그램을 만나보세요
          </p>
          <button onclick="window.forceClearCache()" class="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-md transition-colors">
            <i class="fas fa-sync-alt mr-2"></i>
            🔄 최신 데이터 불러오기
          </button>
        </div>

        <!-- 탭 네비게이션 -->
        <div class="flex justify-center mb-8 border-b border-gray-200">
          <button onclick="showTab('tea')" id="teaTab" class="px-8 py-4 text-lg font-medium border-b-2 border-tea-green text-tea-green focus:outline-none">
            <i class="fas fa-mug-hot mr-2"></i>
            차공부
          </button>
          <button onclick="showTab('craft')" id="craftTab" class="px-8 py-4 text-lg font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 focus:outline-none">
            <i class="fas fa-palette mr-2"></i>
            공예공부
          </button>
          <button onclick="showTab('dado')" id="dadoTab" class="px-8 py-4 text-lg font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 focus:outline-none">
            <i class="fas fa-spa mr-2"></i>
            다도교육
          </button>
          <button onclick="showTab('meditation')" id="meditationTab" class="px-8 py-4 text-lg font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 focus:outline-none">
            <i class="fas fa-om mr-2"></i>
            명상교육
          </button>
        </div>

        <!-- 차공부 탭 내용 -->
        <div id="teaContent" class="tab-content">
          <div class="mb-8 p-6 bg-tea-cream rounded-lg border-l-4 border-tea-green">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              <i class="fas fa-mug-hot text-tea-green mr-2"></i>
              차공부
            </h2>
            <p class="text-gray-700">
              차의 역사와 문화, 종류와 우리는 방법을 배웁니다
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${teaCurriculum.map((item, index) => `
              <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div class="p-6">
                  <div class="flex items-start justify-between mb-4">
                    <div class="bg-tea-green/10 p-3 rounded-lg">
                      <i class="fas fa-book-open text-2xl text-tea-green"></i>
                    </div>
                    <span class="px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(item.difficulty)}">
                      ${getDifficultyLabel(item.difficulty)}
                    </span>
                  </div>
                  
                  <h3 class="text-xl font-bold text-gray-900 mb-2">
                    ${item.title}
                  </h3>
                  
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    ${item.description}
                  </p>
                  
                  <div class="flex items-center text-sm text-gray-500 mb-4">
                    <i class="fas fa-clock mr-2"></i>
                    <span>약 ${item.duration_minutes}분</span>
                  </div>
                  
                  <a href="/education/curriculum/${item.id}" 
                     class="block w-full text-center bg-tea-green text-white py-2 rounded-lg hover:bg-tea-green/90 transition-colors">
                    자세히 보기
                    <i class="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 공예공부 탭 내용 -->
        <div id="craftContent" class="tab-content hidden">
          <div class="mb-8 p-6 bg-craft-blue/10 rounded-lg border-l-4 border-craft-blue">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              <i class="fas fa-palette text-craft-blue mr-2"></i>
              공예공부
            </h2>
            <p class="text-gray-700">
              한국 전통 공예의 역사와 제작 기법을 배웁니다
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${craftCurriculum.map((item, index) => `
              <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div class="p-6">
                  <div class="flex items-start justify-between mb-4">
                    <div class="bg-craft-blue/10 p-3 rounded-lg">
                      <i class="fas fa-hammer text-2xl text-craft-blue"></i>
                    </div>
                    <span class="px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(item.difficulty)}">
                      ${getDifficultyLabel(item.difficulty)}
                    </span>
                  </div>
                  
                  <h3 class="text-xl font-bold text-gray-900 mb-2">
                    ${item.title}
                  </h3>
                  
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    ${item.description}
                  </p>
                  
                  <div class="flex items-center text-sm text-gray-500 mb-4">
                    <i class="fas fa-clock mr-2"></i>
                    <span>약 ${item.duration_minutes}분</span>
                  </div>
                  
                  <a href="/education/curriculum/${item.id}" 
                     class="block w-full text-center bg-craft-blue text-white py-2 rounded-lg hover:bg-craft-blue/90 transition-colors">
                    자세히 보기
                    <i class="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 다도교육 탭 내용 -->
        <div id="dadoContent" class="tab-content hidden">
          <div class="mb-8 p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              <i class="fas fa-spa text-purple-500 mr-2"></i>
              다도교육
            </h2>
            <p class="text-gray-700">
              다도의 의미와 역사, 방법을 배우며 다도가 인성교육에 도움이 되는 가치를 배웁니다
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${dadoCurriculum.map((item, index) => `
              <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div class="p-6">
                  <div class="flex items-start justify-between mb-4">
                    <div class="bg-purple-100 p-3 rounded-lg">
                      <i class="fas fa-om text-2xl text-purple-500"></i>
                    </div>
                    <span class="px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(item.difficulty)}">
                      ${getDifficultyLabel(item.difficulty)}
                    </span>
                  </div>
                  
                  <h3 class="text-xl font-bold text-gray-900 mb-2">
                    ${item.title}
                  </h3>
                  
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    ${item.description}
                  </p>
                  
                  <div class="flex items-center text-sm text-gray-500 mb-4">
                    <i class="fas fa-clock mr-2"></i>
                    <span>약 ${item.duration_minutes}분</span>
                  </div>
                  
                  <a href="/education/curriculum/${item.id}" 
                     class="block w-full text-center bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                    자세히 보기
                    <i class="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 명상교육 탭 내용 -->
        <div id="meditationContent" class="tab-content hidden">
          <div class="mb-8 p-6 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              <i class="fas fa-om text-indigo-500 mr-2"></i>
              명상교육
            </h2>
            <p class="text-gray-700">
              명상의 기초와 실천, 요가와 마음챙김을 배웁니다
            </p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${meditationCurriculum.map((item, index) => `
              <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div class="p-6">
                  <div class="flex items-start justify-between mb-4">
                    <div class="bg-indigo-100 p-3 rounded-lg">
                      <i class="fas fa-praying-hands text-2xl text-indigo-500"></i>
                    </div>
                    <span class="px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(item.difficulty)}">
                      ${getDifficultyLabel(item.difficulty)}
                    </span>
                  </div>
                  
                  <h3 class="text-xl font-bold text-gray-900 mb-2">
                    ${item.title}
                  </h3>
                  
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    ${item.description}
                  </p>
                  
                  <div class="flex items-center text-sm text-gray-500 mb-4">
                    <i class="fas fa-clock mr-2"></i>
                    <span>${item.duration || '60분'}</span>
                  </div>
                  
                  <a href="/education/curriculum/${item.id}" 
                     class="block w-full text-center bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                    자세히 보기
                    <i class="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- CTA 섹션 -->
        <div class="mt-16 text-center p-8 bg-gradient-to-r from-tea-green to-craft-blue rounded-lg text-white">
          <h2 class="text-3xl font-bold mb-4">다도교육 신청하기</h2>
          <p class="text-lg mb-6 opacity-90">
            기관 단체 교육을 원하시나요? 지금 바로 신청해보세요
          </p>
          <a href="/education/apply" 
             class="inline-block bg-white text-tea-green font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            <i class="fas fa-pencil-alt mr-2"></i>
            교육 신청하기
          </a>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('커리큘럼 로드 오류:', error);
    app.innerHTML = `
      <div class="max-w-4xl mx-auto px-4 py-16 text-center">
        <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">페이지를 불러올 수 없습니다</h2>
        <p class="text-gray-600 mb-6">잠시 후 다시 시도해주세요.</p>
        <a href="/" class="text-tea-green hover:underline">홈으로 돌아가기</a>
      </div>
    `;
  }
}

// 탭 전환 함수
window.showTab = function(tab) {
  const teaTab = document.getElementById('teaTab');
  const craftTab = document.getElementById('craftTab');
  const dadoTab = document.getElementById('dadoTab');
  const meditationTab = document.getElementById('meditationTab');
  const teaContent = document.getElementById('teaContent');
  const craftContent = document.getElementById('craftContent');
  const dadoContent = document.getElementById('dadoContent');
  const meditationContent = document.getElementById('meditationContent');
  
  // 모든 탭 초기화
  teaTab.classList.add('border-transparent', 'text-gray-500');
  teaTab.classList.remove('border-tea-green', 'text-tea-green');
  craftTab.classList.add('border-transparent', 'text-gray-500');
  craftTab.classList.remove('border-craft-blue', 'text-craft-blue');
  dadoTab.classList.add('border-transparent', 'text-gray-500');
  dadoTab.classList.remove('border-purple-500', 'text-purple-500');
  meditationTab.classList.add('border-transparent', 'text-gray-500');
  meditationTab.classList.remove('border-indigo-500', 'text-indigo-500');
  teaContent.classList.add('hidden');
  craftContent.classList.add('hidden');
  dadoContent.classList.add('hidden');
  meditationContent.classList.add('hidden');
  
  // 선택된 탭 활성화
  if (tab === 'tea') {
    teaTab.classList.add('border-tea-green', 'text-tea-green');
    teaTab.classList.remove('border-transparent', 'text-gray-500');
    teaContent.classList.remove('hidden');
  } else if (tab === 'craft') {
    craftTab.classList.add('border-craft-blue', 'text-craft-blue');
    craftTab.classList.remove('border-transparent', 'text-gray-500');
    craftContent.classList.remove('hidden');
  } else if (tab === 'dado') {
    dadoTab.classList.add('border-purple-500', 'text-purple-500');
    dadoTab.classList.remove('border-transparent', 'text-gray-500');
    dadoContent.classList.remove('hidden');
  } else if (tab === 'meditation') {
    meditationTab.classList.add('border-indigo-500', 'text-indigo-500');
    meditationTab.classList.remove('border-transparent', 'text-gray-500');
    meditationContent.classList.remove('hidden');
  }
}

// 교육 커리큘럼 상세 페이지
async function loadEducationCurriculumDetailPage(curriculumId) {
  const app = document.getElementById('app');
  
  try {
    const response = await axios.get(`/api/education/curriculum/${curriculumId}`);
    const curriculum = response.data.curriculum;
    
    const isTeaCurriculum = curriculum.category_id === 2;
    const themeColor = isTeaCurriculum ? 'tea-green' : 'craft-blue';
    const themeIcon = isTeaCurriculum ? 'fa-mug-hot' : 'fa-palette';
    
    app.innerHTML = `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- 뒤로 가기 버튼 -->
        <div class="mb-6">
          <a href="/education/curriculum" class="inline-flex items-center text-gray-600 hover:text-${themeColor}">
            <i class="fas fa-arrow-left mr-2"></i>
            커리큘럼 목록으로
          </a>
        </div>

        <!-- 헤더 -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div class="bg-gradient-to-r from-${themeColor} to-${themeColor}/80 text-white p-8">
            <div class="flex items-center mb-4">
              <div class="bg-white/20 p-4 rounded-lg mr-4">
                <i class="fas ${themeIcon} text-4xl"></i>
              </div>
              <div>
                <p class="text-sm opacity-90 mb-1">${curriculum.category_name}</p>
                <h1 class="text-3xl font-bold">${curriculum.title}</h1>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-4 mt-6">
              <span class="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                <i class="fas fa-signal mr-2"></i>
                ${curriculum.difficulty}
              </span>
              <span class="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                <i class="fas fa-clock mr-2"></i>
                약 ${curriculum.duration_minutes}분
              </span>
            </div>
          </div>
        </div>

        <!-- 내용 -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-${themeColor} pb-2">
            <i class="fas fa-book-reader text-${themeColor} mr-2"></i>
            과정 소개
          </h2>
          <p class="text-lg text-gray-700 mb-8 leading-relaxed">
            ${curriculum.description}
          </p>
          
          <h2 class="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-${themeColor} pb-2">
            <i class="fas fa-clipboard-list text-${themeColor} mr-2"></i>
            학습 내용
          </h2>
          <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            ${curriculum.content}
          </div>
        </div>

        <!-- 액션 버튼 -->
        <div class="grid md:grid-cols-2 gap-4">
          <a href="/education/apply" 
             class="block text-center bg-${themeColor} text-white py-4 rounded-lg hover:bg-${themeColor}/90 transition-colors font-semibold">
            <i class="fas fa-pencil-alt mr-2"></i>
            교육 신청하기
          </a>
          <a href="/education/curriculum" 
             class="block text-center bg-gray-100 text-gray-700 py-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
            <i class="fas fa-list mr-2"></i>
            다른 과정 보기
          </a>
        </div>

        <!-- 관련 정보 -->
        <div class="mt-8 p-6 bg-${themeColor}/10 rounded-lg">
          <h3 class="text-lg font-bold text-gray-900 mb-3">
            <i class="fas fa-info-circle text-${themeColor} mr-2"></i>
            참고 사항
          </h3>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <i class="fas fa-check text-${themeColor} mr-2 mt-1"></i>
              <span>본 과정은 기관 단체 교육 신청 시 선택할 수 있습니다</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check text-${themeColor} mr-2 mt-1"></i>
              <span>실제 교육 시간은 참가자 수와 현장 상황에 따라 조정될 수 있습니다</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-check text-${themeColor} mr-2 mt-1"></i>
              <span>교육 문의: 교육 신청 페이지를 통해 문의해주세요</span>
            </li>
          </ul>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('커리큘럼 상세 로드 오류:', error);
    app.innerHTML = `
      <div class="max-w-4xl mx-auto px-4 py-16 text-center">
        <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">페이지를 불러올 수 없습니다</h2>
        <p class="text-gray-600 mb-6">요청하신 커리큘럼을 찾을 수 없습니다.</p>
        <a href="/education/curriculum" class="text-tea-green hover:underline">커리큘럼 목록으로 돌아가기</a>
      </div>
    `;
  }
}

// 페이지 로드 시 사용자 정보 가져오기
fetchCurrentUser();

// ===== 다국어 적용 =====
function applyTranslations() {
  // i18n이 로드되지 않았으면 기본 한국어 사용
  if (!window.i18n) {
    console.warn('i18n not loaded yet');
    return;
  }
  
  const t = window.i18n.t;
  const currentLang = window.i18n.getCurrentLanguage();
  
  console.log('Applying translations for language:', currentLang);
  
  // 로고 텍스트 변경
  const logoText = document.getElementById('logoText');
  if (logoText) {
    if (currentLang === 'ko') {
      logoText.innerHTML = '<span class="text-xl font-bold text-gray-800">한국 차</span><span class="logo-hanja text-lg mx-1">茶</span><span class="text-xl font-bold text-gray-800">공예</span>';
    } else if (currentLang === 'en') {
      logoText.innerHTML = '<span class="text-xl font-bold text-gray-800">Korean Tea</span><span class="logo-hanja text-lg mx-1">茶</span><span class="text-xl font-bold text-gray-800">Craft</span>';
    } else if (currentLang === 'zh') {
      logoText.innerHTML = '<span class="text-xl font-bold text-gray-800">韩国茶</span><span class="logo-hanja text-lg mx-1">茶</span><span class="text-xl font-bold text-gray-800">工艺</span>';
    } else if (currentLang === 'ja') {
      logoText.innerHTML = '<span class="text-xl font-bold text-gray-800">韓国茶</span><span class="logo-hanja text-lg mx-1">茶</span><span class="text-xl font-bold text-gray-800">工芸</span>';
    }
  }
  
  // 페이지 타이틀
  document.title = `${t('siteName')} - ${t('siteDescription')}`;
  
  // 메타 설명
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.content = t('siteDescription');
  
  // 네비게이션 메뉴 번역
  const navItems = {
    'teaDirect': t('nav.teaDirect'),
    'craft': t('nav.craft'),
    'giftSet': t('nav.giftSet'),
    'localProducts': t('nav.localProducts'),
    'regions': t('nav.regions'),
    'experiences': t('nav.experiences'),
    'education': t('nav.education'),
    'events': t('nav.events')
  };
  
  // 각 메뉴 항목 번역 (data-i18n 속성 사용)
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = t(key);
  });
}

// 페이지 로드 완료 시 번역 적용
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyTranslations);
} else {
  applyTranslations();
}

// ===== 마이페이지 & 주문 관리 =====

// 마이페이지 메인
async function loadMyPage() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        <i class="fas fa-user-circle text-tea-green mr-3"></i>
        마이페이지
      </h1>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <a href="/mypage/orders" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <div class="text-center">
            <i class="fas fa-shopping-bag text-4xl text-tea-green mb-4"></i>
            <h3 class="text-lg font-bold text-gray-900 mb-2">주문 내역</h3>
            <p class="text-sm text-gray-600">구매한 상품 확인</p>
          </div>
        </a>
        
        <a href="/mypage/profile" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <div class="text-center">
            <i class="fas fa-user-edit text-4xl text-craft-blue mb-4"></i>
            <h3 class="text-lg font-bold text-gray-900 mb-2">회원 정보</h3>
            <p class="text-sm text-gray-600">내 정보 수정</p>
          </div>
        </a>
        
        <a href="/mypage/reviews" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <div class="text-center">
            <i class="fas fa-star text-4xl text-yellow-500 mb-4"></i>
            <h3 class="text-lg font-bold text-gray-900 mb-2">리뷰 관리</h3>
            <p class="text-sm text-gray-600">작성한 리뷰 보기</p>
          </div>
        </a>
        
        <a href="/mypage/wishlist" class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <div class="text-center">
            <i class="fas fa-heart text-4xl text-red-500 mb-4"></i>
            <h3 class="text-lg font-bold text-gray-900 mb-2">찜 목록</h3>
            <p class="text-sm text-gray-600">관심 상품 보기</p>
          </div>
        </a>
      </div>
    </div>
  `;
}

// 주문 내역 페이지
async function loadOrderListPage() {
  const app = document.getElementById('app');
  
  try {
    const response = await axios.get('/api/orders');
    const orders = response.data.orders;
    
    const getStatusBadge = (status) => {
      const statusMap = {
        'pending': { label: '결제대기', class: 'bg-gray-100 text-gray-800' },
        'paid': { label: '결제완료', class: 'bg-blue-100 text-blue-800' },
        'preparing': { label: '상품준비중', class: 'bg-yellow-100 text-yellow-800' },
        'shipping': { label: '배송중', class: 'bg-purple-100 text-purple-800' },
        'delivered': { label: '배송완료', class: 'bg-green-100 text-green-800' },
        'cancelled': { label: '취소됨', class: 'bg-red-100 text-red-800' },
        'refunded': { label: '환불완료', class: 'bg-red-100 text-red-800' }
      };
      return statusMap[status] || { label: status, class: 'bg-gray-100 text-gray-800' };
    };
    
    app.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            <i class="fas fa-shopping-bag text-tea-green mr-3"></i>
            주문 내역
          </h1>
          <p class="text-gray-600">총 ${orders.length}개의 주문</p>
        </div>
        
        ${orders.length === 0 ? `
          <div class="text-center py-16">
            <i class="fas fa-shopping-cart text-gray-300 text-6xl mb-4"></i>
            <p class="text-xl text-gray-600 mb-4">주문 내역이 없습니다</p>
            <a href="/products" class="inline-block bg-tea-green text-white px-6 py-3 rounded-lg hover:bg-tea-green/90 transition">
              <i class="fas fa-shopping-bag mr-2"></i>
              쇼핑하러 가기
            </a>
          </div>
        ` : `
          <div class="space-y-6">
            ${orders.map(order => {
              const status = getStatusBadge(order.order_status);
              const orderDate = new Date(order.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric', month: 'long', day: 'numeric'
              });
              
              return `
                <div class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                  <div class="p-6">
                    <div class="flex items-start justify-between mb-4">
                      <div>
                        <div class="text-sm text-gray-500 mb-1">${orderDate}</div>
                        <h3 class="text-lg font-bold text-gray-900">
                          주문번호: ${order.order_number}
                        </h3>
                      </div>
                      <span class="px-3 py-1 rounded-full text-sm font-medium ${status.class}">
                        ${status.label}
                      </span>
                    </div>
                    
                    <div class="border-t border-gray-200 pt-4 mt-4">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-sm text-gray-600">
                            <i class="fas fa-box mr-2"></i>
                            ${order.item_count}개 상품
                          </p>
                          <p class="text-lg font-bold text-gray-900 mt-2">
                            ${formatPrice(order.final_amount)}
                          </p>
                        </div>
                        
                        <div class="space-x-2">
                          <a href="/mypage/orders/${order.id}" 
                             class="inline-block bg-tea-green text-white px-4 py-2 rounded-lg hover:bg-tea-green/90 transition text-sm">
                            <i class="fas fa-search mr-1"></i>
                            상세보기
                          </a>
                          ${order.order_status === 'delivered' ? `
                            <button onclick="confirmOrder(${order.id})" 
                                    class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition text-sm">
                              <i class="fas fa-check mr-1"></i>
                              수령확인
                            </button>
                          ` : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;
  } catch (error) {
    console.error('주문 내역 로드 오류:', error);
    app.innerHTML = `
      <div class="max-w-4xl mx-auto px-4 py-16 text-center">
        <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">페이지를 불러올 수 없습니다</h2>
        <p class="text-gray-600 mb-6">잠시 후 다시 시도해주세요.</p>
        <a href="/" class="text-tea-green hover:underline">홈으로 돌아가기</a>
      </div>
    `;
  }
}

// 주문 상세 페이지
async function loadOrderDetailPage(orderId) {
  const app = document.getElementById('app');
  
  try {
    const response = await axios.get(`/api/orders/${orderId}`);
    const { order, items, shipment, confirmation, history } = response.data;
    
    const getStatusBadge = (status) => {
      const statusMap = {
        'pending': { label: '결제대기', class: 'bg-gray-100 text-gray-800' },
        'paid': { label: '결제완료', class: 'bg-blue-100 text-blue-800' },
        'preparing': { label: '상품준비중', class: 'bg-yellow-100 text-yellow-800' },
        'shipping': { label: '배송중', class: 'bg-purple-100 text-purple-800' },
        'delivered': { label: '배송완료', class: 'bg-green-100 text-green-800' },
        'cancelled': { label: '취소됨', class: 'bg-red-100 text-red-800' },
        'refunded': { label: '환불완료', class: 'bg-red-100 text-red-800' }
      };
      return statusMap[status] || { label: status, class: 'bg-gray-100 text-gray-800' };
    };
    
    const status = getStatusBadge(order.order_status);
    const orderDate = new Date(order.created_at).toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    
    app.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- 헤더 -->
        <div class="mb-8">
          <a href="/mypage/orders" class="text-gray-600 hover:text-tea-green mb-4 inline-block">
            <i class="fas fa-arrow-left mr-2"></i>
            주문 목록으로
          </a>
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">
                주문 상세 정보
              </h1>
              <p class="text-gray-600">주문번호: ${order.order_number}</p>
              <p class="text-sm text-gray-500">${orderDate}</p>
            </div>
            <span class="px-4 py-2 rounded-full text-lg font-medium ${status.class}">
              ${status.label}
            </span>
          </div>
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- 주문 정보 -->
          <div class="lg:col-span-2 space-y-6">
            <!-- 주문 상품 -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">
                <i class="fas fa-box text-tea-green mr-2"></i>
                주문 상품
              </h2>
              <div class="space-y-4">
                ${items.map(item => `
                  <div class="flex items-center justify-between border-b pb-4">
                    <div class="flex-1">
                      <h3 class="font-bold text-gray-900">${item.product_name}</h3>
                      <p class="text-sm text-gray-600 mt-1">
                        ${formatPrice(item.product_price)} × ${item.quantity}개
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-gray-900">${formatPrice(item.item_total)}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
              
              <div class="mt-6 pt-6 border-t space-y-2">
                <div class="flex justify-between text-gray-600">
                  <span>상품 금액</span>
                  <span>${formatPrice(order.total_amount)}</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>배송비</span>
                  <span>${formatPrice(order.shipping_fee)}</span>
                </div>
                ${order.discount_amount > 0 ? `
                  <div class="flex justify-between text-red-600">
                    <span>할인</span>
                    <span>-${formatPrice(order.discount_amount)}</span>
                  </div>
                ` : ''}
                <div class="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                  <span>총 결제 금액</span>
                  <span class="text-tea-green">${formatPrice(order.final_amount)}</span>
                </div>
              </div>
            </div>
            
            <!-- 배송 정보 -->
            ${shipment ? `
              <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  <i class="fas fa-truck text-tea-green mr-2"></i>
                  배송 정보
                </h2>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">택배사</span>
                    <span class="font-medium">${shipment.courier_company}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">송장번호</span>
                    <span class="font-mono font-medium">${shipment.tracking_number}</span>
                  </div>
                  ${shipment.shipped_date ? `
                    <div class="flex items-center justify-between">
                      <span class="text-gray-600">발송일</span>
                      <span>${new Date(shipment.shipped_date).toLocaleDateString('ko-KR')}</span>
                    </div>
                  ` : ''}
                  ${shipment.delivery_completed_date ? `
                    <div class="flex items-center justify-between">
                      <span class="text-gray-600">배송완료일</span>
                      <span>${new Date(shipment.delivery_completed_date).toLocaleDateString('ko-KR')}</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            ` : ''}
            
            <!-- 수령 확인 -->
            ${confirmation ? `
              <div class="bg-green-50 rounded-lg border border-green-200 p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  <i class="fas fa-check-circle text-green-600 mr-2"></i>
                  수령 확인 완료
                </h2>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <span class="text-gray-600 mr-2">평점:</span>
                    <span class="text-yellow-500">
                      ${'★'.repeat(confirmation.rating)}${'☆'.repeat(5 - confirmation.rating)}
                    </span>
                  </div>
                  ${confirmation.review_comment ? `
                    <div>
                      <p class="text-gray-600 mb-1">리뷰:</p>
                      <p class="text-gray-900">${confirmation.review_comment}</p>
                    </div>
                  ` : ''}
                  <p class="text-sm text-gray-500">
                    확인일: ${new Date(confirmation.confirmed_date).toLocaleString('ko-KR')}
                  </p>
                </div>
              </div>
            ` : order.order_status === 'delivered' ? `
              <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-4">
                  <i class="fas fa-clipboard-check text-tea-green mr-2"></i>
                  수령 확인
                </h2>
                <p class="text-gray-600 mb-4">상품을 받으셨나요? 수령 확인 후 리뷰를 작성해주세요.</p>
                <button onclick="showConfirmModal(${orderId})" 
                        class="w-full bg-tea-green text-white py-3 rounded-lg font-bold hover:bg-tea-green/90 transition">
                  <i class="fas fa-check mr-2"></i>
                  수령 확인하기
                </button>
              </div>
            ` : ''}
          </div>
          
          <!-- 사이드바 -->
          <div class="space-y-6">
            <!-- 주문자 정보 -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-bold text-gray-900 mb-4">
                <i class="fas fa-user text-tea-green mr-2"></i>
                주문자 정보
              </h2>
              <div class="space-y-2 text-sm">
                <p><span class="text-gray-600">이름:</span> ${order.buyer_name}</p>
                <p><span class="text-gray-600">이메일:</span> ${order.buyer_email}</p>
                <p><span class="text-gray-600">연락처:</span> ${order.buyer_phone}</p>
              </div>
            </div>
            
            <!-- 배송지 정보 -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-bold text-gray-900 mb-4">
                <i class="fas fa-map-marker-alt text-tea-green mr-2"></i>
                배송지 정보
              </h2>
              <div class="space-y-2 text-sm">
                <p><span class="text-gray-600">수령인:</span> ${order.recipient_name}</p>
                <p><span class="text-gray-600">연락처:</span> ${order.recipient_phone}</p>
                <p><span class="text-gray-600">주소:</span><br/>${order.delivery_address}</p>
                ${order.delivery_zipcode ? `<p><span class="text-gray-600">우편번호:</span> ${order.delivery_zipcode}</p>` : ''}
                ${order.delivery_memo ? `<p class="mt-3 p-2 bg-gray-50 rounded"><span class="text-gray-600">배송 메모:</span><br/>${order.delivery_memo}</p>` : ''}
              </div>
            </div>
            
            <!-- 결제 정보 -->
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-lg font-bold text-gray-900 mb-4">
                <i class="fas fa-credit-card text-tea-green mr-2"></i>
                결제 정보
              </h2>
              <div class="space-y-2 text-sm">
                <p><span class="text-gray-600">결제 상태:</span> 
                  <span class="font-medium ${order.payment_status === 'completed' ? 'text-green-600' : 'text-gray-900'}">
                    ${order.payment_status === 'completed' ? '결제완료' : order.payment_status}
                  </span>
                </p>
                ${order.payment_method ? `<p><span class="text-gray-600">결제 수단:</span> ${order.payment_method}</p>` : ''}
                ${order.payment_date ? `<p><span class="text-gray-600">결제일:</span> ${new Date(order.payment_date).toLocaleString('ko-KR')}</p>` : ''}
              </div>
            </div>
            
            <!-- 주문 취소 -->
            ${order.order_status === 'pending' || order.order_status === 'paid' ? `
              <button onclick="cancelOrder(${orderId})" 
                      class="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition">
                <i class="fas fa-times mr-2"></i>
                주문 취소
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('주문 상세 로드 오류:', error);
    app.innerHTML = `
      <div class="max-w-4xl mx-auto px-4 py-16 text-center">
        <i class="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">주문 정보를 불러올 수 없습니다</h2>
        <p class="text-gray-600 mb-6">주문번호를 확인해주세요.</p>
        <a href="/mypage/orders" class="text-tea-green hover:underline">주문 목록으로 돌아가기</a>
      </div>
    `;
  }
}

// 수령 확인 모달 표시
window.showConfirmModal = function(orderId) {
  const modal = document.createElement('div');
  modal.id = 'confirmModal';
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-4">수령 확인 및 리뷰 작성</h3>
      
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">별점</label>
        <div class="flex space-x-2">
          ${[1,2,3,4,5].map(i => `
            <button onclick="setRating(${i})" class="rating-star text-3xl text-gray-300 hover:text-yellow-500 transition">
              ☆
            </button>
          `).join('')}
        </div>
        <input type="hidden" id="rating" value="0">
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-700 font-medium mb-2">리뷰 (선택)</label>
        <textarea id="reviewComment" rows="4" 
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-tea-green"
                  placeholder="상품은 어떠셨나요? 리뷰를 남겨주세요."></textarea>
      </div>
      
      <div class="flex space-x-3">
        <button onclick="submitConfirmation(${orderId})" 
                class="flex-1 bg-tea-green text-white py-3 rounded-lg font-bold hover:bg-tea-green/90 transition">
          확인
        </button>
        <button onclick="closeConfirmModal()" 
                class="flex-1 bg-gray-500 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition">
          취소
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

// 별점 설정
window.setRating = function(rating) {
  document.getElementById('rating').value = rating;
  const stars = document.querySelectorAll('.rating-star');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.textContent = '★';
      star.classList.add('text-yellow-500');
      star.classList.remove('text-gray-300');
    } else {
      star.textContent = '☆';
      star.classList.add('text-gray-300');
      star.classList.remove('text-yellow-500');
    }
  });
};

// 수령 확인 제출
window.submitConfirmation = async function(orderId) {
  const rating = parseInt(document.getElementById('rating').value);
  const reviewComment = document.getElementById('reviewComment').value;
  
  if (rating === 0) {
    alert('별점을 선택해주세요.');
    return;
  }
  
  try {
    await axios.post(`/api/orders/${orderId}/confirm`, {
      rating,
      review_comment: reviewComment || null
    });
    
    alert('수령 확인이 완료되었습니다!');
    closeConfirmModal();
    loadOrderDetailPage(orderId);
  } catch (error) {
    console.error('수령 확인 오류:', error);
    alert('수령 확인 중 오류가 발생했습니다.');
  }
};

// 모달 닫기
window.closeConfirmModal = function() {
  const modal = document.getElementById('confirmModal');
  if (modal) {
    modal.remove();
  }
};

// 주문 취소
window.cancelOrder = async function(orderId) {
  if (!confirm('정말로 주문을 취소하시겠습니까?')) {
    return;
  }
  
  const reason = prompt('취소 사유를 입력해주세요 (선택)');
  
  try {
    await axios.post(`/api/orders/${orderId}/cancel`, {
      cancel_reason: reason || '구매자 요청'
    });
    
    alert('주문이 취소되었습니다.');
    loadOrderDetailPage(orderId);
  } catch (error) {
    console.error('주문 취소 오류:', error);
    alert(error.response?.data?.error || '주문 취소 중 오류가 발생했습니다.');
  }
};

// ===== 장바구니 관리 =====

// 세션 ID 가져오기 (비로그인 사용자용)
function getSessionId() {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

// 장바구니 개수 업데이트
async function updateCartCount() {
  try {
    const userId = localStorage.getItem('user_id');
    const sessionId = getSessionId();
    
    // 새로운 /api/cart/count 엔드포인트 사용
    const params = userId ? `user_id=${userId}` : sessionId ? `session_id=${sessionId}` : '';
    const response = await fetch(`/api/cart/count${params ? '?' + params : ''}`);
    const data = await response.json();
    
    const cartCount = data.count || 0;
    const cartBadge = document.getElementById('cartCount');
    
    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.style.display = cartCount > 0 ? 'inline-block' : 'none';
    }
  } catch (error) {
    console.error('장바구니 개수 업데이트 오류:', error);
  }
}

// 장바구니에 추가
window.addToCart = async function(productId, quantity = 1) {
  try {
    const userId = localStorage.getItem('user_id');
    const sessionId = getSessionId();
    
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId || null,
        session_id: sessionId,
        product_id: productId,
        quantity: quantity
      })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      alert(result.message || '장바구니에 추가되었습니다');
      await updateCartCount();
    } else {
      alert(result.error || '장바구니 추가 실패');
    }
  } catch (error) {
    console.error('장바구니 추가 오류:', error);
    alert('장바구니 추가 중 오류가 발생했습니다');
  }
};

// 장바구니 페이지 로드
window.loadCartPage = async function() {
  const app = document.getElementById('app');
  
  try {
    const userId = localStorage.getItem('user_id');
    const sessionId = getSessionId();
    
    const response = await fetch(`/api/cart?${userId ? `user_id=${userId}` : `session_id=${sessionId}`}`);
    const data = await response.json();
    const cartItems = data.cart_items || [];
    
    if (cartItems.length === 0) {
      app.innerHTML = `
        <div class="max-w-4xl mx-auto px-4 py-12">
          <div class="bg-white rounded-lg shadow-sm p-8 text-center">
            <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">장바구니가 비어있습니다</h2>
            <p class="text-gray-600 mb-6">관심있는 상품을 장바구니에 담아보세요</p>
            <a href="/products" class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
              상품 보러가기
            </a>
          </div>
        </div>
      `;
      return;
    }
    
    // 선택된 상품들의 총액 계산
    const calculateTotal = () => {
      const selectedItems = cartItems.filter(item => item.is_selected);
      const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shippingFee = subtotal >= 30000 ? 0 : 3000; // 3만원 이상 무료배송
      const total = subtotal + shippingFee;
      
      return { subtotal, shippingFee, total, itemCount: selectedItems.length };
    };
    
    const renderCart = () => {
      const { subtotal, shippingFee, total, itemCount } = calculateTotal();
      
      app.innerHTML = `
        <div class="max-w-6xl mx-auto px-4 py-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-8">
            <i class="fas fa-shopping-cart mr-2"></i>
            장바구니
          </h1>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- 장바구니 항목 -->
            <div class="lg:col-span-2">
              <div class="bg-white rounded-lg shadow-sm">
                <!-- 전체 선택 -->
                <div class="p-4 border-b flex items-center">
                  <input type="checkbox" id="selectAll" class="mr-2 w-4 h-4" ${cartItems.every(item => item.is_selected) ? 'checked' : ''}>
                  <label for="selectAll" class="font-medium text-gray-700 cursor-pointer">전체 선택</label>
                  <button onclick="deleteSelectedItems()" class="ml-auto text-red-600 hover:text-red-700 text-sm">
                    <i class="fas fa-trash mr-1"></i>선택 삭제
                  </button>
                </div>
                
                <!-- 상품 목록 -->
                <div id="cartItemsList">
                  ${cartItems.map(item => `
                    <div class="p-4 border-b flex items-start gap-4" data-item-id="${item.id}">
                      <input type="checkbox" class="item-checkbox mt-2 w-4 h-4" data-id="${item.id}" ${item.is_selected ? 'checked' : ''}>
                      
                      <img src="${item.main_image || '/static/images/no-image.jpg'}" 
                           alt="${item.product_name}"
                           class="w-24 h-24 object-cover rounded"
                           onerror="this.src='https://via.placeholder.com/100x100?text=No+Image'">
                      
                      <div class="flex-1">
                        <h3 class="font-bold text-gray-800 mb-1">${item.product_name}</h3>
                        <p class="text-sm text-gray-600 mb-2">${item.producer_name || '생산자 정보 없음'}</p>
                        <p class="text-lg font-bold text-green-600">${formatPrice(item.price)}</p>
                        
                        ${!item.is_available ? `
                          <p class="text-sm text-red-600 mt-2">
                            <i class="fas fa-exclamation-circle"></i> 품절된 상품입니다
                          </p>
                        ` : item.stock_quantity < item.quantity ? `
                          <p class="text-sm text-orange-600 mt-2">
                            <i class="fas fa-exclamation-triangle"></i> 재고 부족 (현재 재고: ${item.stock_quantity}개)
                          </p>
                        ` : ''}
                      </div>
                      
                      <div class="flex flex-col items-end gap-2">
                        <!-- 수량 조절 -->
                        <div class="flex items-center border rounded">
                          <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" 
                                  class="px-3 py-1 hover:bg-gray-100 ${item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                                  ${item.quantity <= 1 ? 'disabled' : ''}>
                            <i class="fas fa-minus text-sm"></i>
                          </button>
                          <input type="number" value="${item.quantity}" 
                                 class="w-12 text-center border-x py-1" 
                                 min="1" max="${item.stock_quantity}"
                                 onchange="updateCartQuantity(${item.id}, this.value)">
                          <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" 
                                  class="px-3 py-1 hover:bg-gray-100 ${item.quantity >= item.stock_quantity ? 'opacity-50 cursor-not-allowed' : ''}"
                                  ${item.quantity >= item.stock_quantity ? 'disabled' : ''}>
                            <i class="fas fa-plus text-sm"></i>
                          </button>
                        </div>
                        
                        <!-- 삭제 버튼 -->
                        <button onclick="removeCartItem(${item.id})" 
                                class="text-gray-500 hover:text-red-600 text-sm">
                          <i class="fas fa-times"></i> 삭제
                        </button>
                        
                        <!-- 소계 -->
                        <p class="font-bold text-gray-800 mt-2">${formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
            
            <!-- 주문 요약 -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 class="text-xl font-bold text-gray-800 mb-4">주문 요약</h2>
                
                <div class="space-y-3 mb-4">
                  <div class="flex justify-between text-gray-700">
                    <span>상품금액 (${itemCount}개)</span>
                    <span>${formatPrice(subtotal)}</span>
                  </div>
                  <div class="flex justify-between text-gray-700">
                    <span>배송비</span>
                    <span>${shippingFee === 0 ? '무료' : formatPrice(shippingFee)}</span>
                  </div>
                  ${subtotal > 0 && subtotal < 30000 ? `
                    <p class="text-xs text-orange-600">
                      <i class="fas fa-info-circle"></i> ${formatPrice(30000 - subtotal)} 더 담으면 무료배송
                    </p>
                  ` : ''}
                </div>
                
                <div class="border-t pt-4 mb-6">
                  <div class="flex justify-between text-xl font-bold text-gray-800">
                    <span>총 결제금액</span>
                    <span class="text-green-600">${formatPrice(total)}</span>
                  </div>
                </div>
                
                <button onclick="proceedToCheckout()" 
                        class="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-bold text-lg ${itemCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
                        ${itemCount === 0 ? 'disabled' : ''}>
                  ${itemCount > 0 ? '주문하기' : '상품을 선택해주세요'}
                </button>
                
                <button onclick="window.location.href='/products'" 
                        class="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  계속 쇼핑하기
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // 전체 선택 체크박스 이벤트
      document.getElementById('selectAll').addEventListener('change', async (e) => {
        const checkboxes = document.querySelectorAll('.item-checkbox');
        const isChecked = e.target.checked;
        
        for (const checkbox of checkboxes) {
          checkbox.checked = isChecked;
          const itemId = checkbox.getAttribute('data-id');
          const item = cartItems.find(i => i.id == itemId);
          if (item) item.is_selected = isChecked;
          
          await fetch(`/api/cart/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_selected: isChecked })
          });
        }
        
        renderCart();
      });
      
      // 개별 체크박스 이벤트
      document.querySelectorAll('.item-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', async (e) => {
          const itemId = e.target.getAttribute('data-id');
          const isChecked = e.target.checked;
          
          const item = cartItems.find(i => i.id == itemId);
          if (item) item.is_selected = isChecked;
          
          await fetch(`/api/cart/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ is_selected: isChecked })
          });
          
          renderCart();
        });
      });
    };
    
    renderCart();
    
  } catch (error) {
    console.error('장바구니 로드 오류:', error);
    app.innerHTML = `
      <div class="max-w-4xl mx-auto px-4 py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <i class="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
          <h2 class="text-xl font-bold text-red-700 mb-2">오류가 발생했습니다</h2>
          <p class="text-red-600">${error.message}</p>
        </div>
      </div>
    `;
  }
};

// 장바구니 수량 변경
window.updateCartQuantity = async function(itemId, newQuantity) {
  if (newQuantity < 1) return;
  
  try {
    const response = await fetch(`/api/cart/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: parseInt(newQuantity) })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      await loadCartPage();
      await updateCartCount();
    } else {
      alert(result.error || '수량 변경 실패');
    }
  } catch (error) {
    console.error('수량 변경 오류:', error);
    alert('수량 변경 중 오류가 발생했습니다');
  }
};

// 장바구니 항목 삭제
window.removeCartItem = async function(itemId) {
  if (!confirm('이 상품을 장바구니에서 삭제하시겠습니까?')) return;
  
  try {
    const response = await fetch(`/api/cart/${itemId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      await loadCartPage();
      await updateCartCount();
    }
  } catch (error) {
    console.error('장바구니 삭제 오류:', error);
    alert('삭제 중 오류가 발생했습니다');
  }
};

// 선택 항목 삭제
window.deleteSelectedItems = async function() {
  const checkboxes = document.querySelectorAll('.item-checkbox:checked');
  
  if (checkboxes.length === 0) {
    alert('삭제할 상품을 선택해주세요');
    return;
  }
  
  if (!confirm(`선택한 ${checkboxes.length}개 상품을 삭제하시겠습니까?`)) return;
  
  try {
    for (const checkbox of checkboxes) {
      const itemId = checkbox.getAttribute('data-id');
      await fetch(`/api/cart/${itemId}`, { method: 'DELETE' });
    }
    
    await loadCartPage();
    await updateCartCount();
  } catch (error) {
    console.error('일괄 삭제 오류:', error);
    alert('삭제 중 오류가 발생했습니다');
  }
};

// 주문하기로 이동
window.proceedToCheckout = function() {
  // 선택된 상품들을 세션에 저장하고 주문서 작성 페이지로 이동
  sessionStorage.setItem('checkout_type', 'cart'); // 장바구니에서 주문
  window.location.href = '/checkout';
};

// 주문서 작성 페이지
window.loadCheckoutPage = async function() {
  const app = document.getElementById('app');
  
  try {
    const checkoutType = sessionStorage.getItem('checkout_type'); // 'cart' or 'direct'
    let checkoutItems = [];
    
    if (checkoutType === 'direct') {
      // 바로 구매
      const items = JSON.parse(sessionStorage.getItem('checkout_items') || '[]');
      
      // 상품 정보 가져오기
      for (const item of items) {
        const response = await fetch(`/api/products/${item.product_id}`);
        const data = await response.json();
        checkoutItems.push({
          product_id: item.product_id,
          product_name: data.product.name,
          price: data.product.price,
          quantity: item.quantity,
          main_image: data.product.main_image,
          producer_id: data.product.producer_id,
          producer_name: data.product.producer_name,
          shipping_fee: data.product.shipping_fee || 3000
        });
      }
    } else {
      // 장바구니에서 주문
      const userId = localStorage.getItem('user_id');
      const sessionId = getSessionId();
      
      const response = await fetch(`/api/cart?${userId ? `user_id=${userId}` : `session_id=${sessionId}`}`);
      const data = await response.json();
      
      // 선택된 상품만 필터링
      checkoutItems = (data.cart_items || [])
        .filter(item => item.is_selected)
        .map(item => ({
          cart_item_id: item.id,
          product_id: item.product_id,
          product_name: item.product_name,
          price: item.price,
          quantity: item.quantity,
          main_image: item.main_image,
          producer_id: item.producer_id,
          producer_name: item.producer_name,
          shipping_fee: 3000
        }));
      
      if (checkoutItems.length === 0) {
        app.innerHTML = `
          <div class="max-w-4xl mx-auto px-4 py-12">
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <i class="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
              <h2 class="text-xl font-bold text-yellow-700 mb-2">선택된 상품이 없습니다</h2>
              <p class="text-yellow-600 mb-4">주문할 상품을 선택해주세요</p>
              <a href="/cart" class="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700">
                장바구니로 돌아가기
              </a>
            </div>
          </div>
        `;
        return;
      }
    }
    
    // 가격 계산
    const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = subtotal >= 30000 ? 0 : 3000;
    const total = subtotal + shippingFee;
    
    // 사용자 정보 가져오기 (있으면)
    const savedBuyerName = localStorage.getItem('buyer_name') || '';
    const savedBuyerEmail = localStorage.getItem('buyer_email') || '';
    const savedBuyerPhone = localStorage.getItem('buyer_phone') || '';
    const savedAddress = localStorage.getItem('delivery_address') || '';
    const savedZipcode = localStorage.getItem('delivery_zipcode') || '';
    
    app.innerHTML = `
      <div class="max-w-6xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">
          <i class="fas fa-file-invoice mr-2"></i>
          주문서 작성
        </h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 주문 정보 입력 -->
          <div class="lg:col-span-2 space-y-6">
            <!-- 주문 상품 -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">주문 상품</h2>
              <div class="space-y-4">
                ${checkoutItems.map(item => `
                  <div class="flex items-center gap-4 pb-4 border-b last:border-0">
                    <img src="${item.main_image || '/static/images/no-image.jpg'}" 
                         alt="${item.product_name}"
                         class="w-20 h-20 object-cover rounded"
                         onerror="this.src='https://via.placeholder.com/80x80?text=No+Image'">
                    <div class="flex-1">
                      <h3 class="font-bold text-gray-800">${item.product_name}</h3>
                      <p class="text-sm text-gray-600">${item.producer_name}</p>
                      <p class="text-sm text-gray-600">수량: ${item.quantity}개</p>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-gray-800">${formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <!-- 주문자 정보 -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">주문자 정보</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
                  <input type="text" id="buyerName" value="${savedBuyerName}"
                         class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                         placeholder="홍길동">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                  <input type="email" id="buyerEmail" value="${savedBuyerEmail}"
                         class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                         placeholder="example@email.com">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">전화번호 *</label>
                  <input type="tel" id="buyerPhone" value="${savedBuyerPhone}"
                         class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                         placeholder="010-1234-5678">
                </div>
              </div>
            </div>
            
            <!-- 배송 정보 -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-gray-800">배송 정보</h2>
                <label class="flex items-center text-sm text-gray-600 cursor-pointer">
                  <input type="checkbox" id="sameAsBuyer" class="mr-2">
                  주문자 정보와 동일
                </label>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">수령인 이름 *</label>
                  <input type="text" id="recipientName" value="${savedBuyerName}"
                         class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                         placeholder="홍길동">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">수령인 전화번호 *</label>
                  <input type="tel" id="recipientPhone" value="${savedBuyerPhone}"
                         class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                         placeholder="010-1234-5678">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">우편번호 *</label>
                  <div class="flex gap-2">
                    <input type="text" id="deliveryZipcode" value="${savedZipcode}" readonly
                           class="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                           placeholder="우편번호">
                    <button onclick="searchAddress()" 
                            class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      주소 검색
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">기본 주소 *</label>
                  <input type="text" id="deliveryAddress" value="${savedAddress}" readonly
                         class="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                         placeholder="주소 검색 버튼을 클릭하세요">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">상세 주소</label>
                  <input type="text" id="deliveryAddressDetail"
                         class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                         placeholder="상세 주소 입력 (예: 101동 202호)">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">배송 메모</label>
                  <textarea id="deliveryMemo" rows="3"
                            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="배송 시 요청사항을 입력해주세요 (예: 부재 시 문앞에 놓아주세요)"></textarea>
                </div>
              </div>
            </div>
            
            <!-- 결제 수단 -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-xl font-bold text-gray-800 mb-4">결제 수단</h2>
              <div class="space-y-3">
                <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="card" checked class="mr-3">
                  <i class="fas fa-credit-card mr-2 text-blue-600"></i>
                  <span>신용/체크카드</span>
                </label>
                <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="transfer" class="mr-3">
                  <i class="fas fa-university mr-2 text-green-600"></i>
                  <span>계좌이체</span>
                </label>
                <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="kakao_pay" class="mr-3">
                  <i class="fas fa-comment mr-2 text-yellow-500"></i>
                  <span>카카오페이</span>
                </label>
                <label class="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="paymentMethod" value="naver_pay" class="mr-3">
                  <i class="fas fa-n mr-2 text-green-500"></i>
                  <span>네이버페이</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- 결제 금액 -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 class="text-xl font-bold text-gray-800 mb-4">결제 금액</h2>
              
              <div class="space-y-3 mb-4">
                <div class="flex justify-between text-gray-700">
                  <span>상품금액</span>
                  <span>${formatPrice(subtotal)}</span>
                </div>
                <div class="flex justify-between text-gray-700">
                  <span>배송비</span>
                  <span>${shippingFee === 0 ? '무료' : formatPrice(shippingFee)}</span>
                </div>
                ${subtotal > 0 && subtotal < 30000 ? `
                  <p class="text-xs text-orange-600">
                    <i class="fas fa-info-circle"></i> ${formatPrice(30000 - subtotal)} 더 담으면 무료배송
                  </p>
                ` : ''}
              </div>
              
              <div class="border-t pt-4 mb-6">
                <div class="flex justify-between text-xl font-bold text-gray-800">
                  <span>총 결제금액</span>
                  <span class="text-green-600">${formatPrice(total)}</span>
                </div>
              </div>
              
              <button onclick="submitOrder(${JSON.stringify(checkoutItems).replace(/"/g, '&quot;')}, ${subtotal}, ${shippingFee}, ${total})" 
                      class="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-bold text-lg">
                ${formatPrice(total)} 결제하기
              </button>
              
              <div class="mt-4 text-xs text-gray-500 space-y-1">
                <p>· 주문 완료 후 취소는 상품 준비 전까지 가능합니다</p>
                <p>· 배송은 주문 확정 후 2-3일 소요됩니다</p>
                <p>· 30,000원 이상 주문 시 배송비 무료</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // 주문자 정보와 동일 체크박스
    document.getElementById('sameAsBuyer').addEventListener('change', (e) => {
      if (e.target.checked) {
        document.getElementById('recipientName').value = document.getElementById('buyerName').value;
        document.getElementById('recipientPhone').value = document.getElementById('buyerPhone').value;
      }
    });
    
  } catch (error) {
    console.error('주문서 로드 오류:', error);
    app.innerHTML = `
      <div class="max-w-4xl mx-auto px-4 py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <i class="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
          <h2 class="text-xl font-bold text-red-700 mb-2">오류가 발생했습니다</h2>
          <p class="text-red-600">${error.message}</p>
        </div>
      </div>
    `;
  }
};

// 주소 검색 (다음 우편번호 API - 실제로는 API 키 필요)
window.searchAddress = function() {
  alert('주소 검색 기능은 카카오 우편번호 서비스 연동이 필요합니다.\n\n데모 버전에서는 직접 입력해주세요.');
  
  // 임시로 입력 가능하게
  document.getElementById('deliveryZipcode').readOnly = false;
  document.getElementById('deliveryAddress').readOnly = false;
};

// 주문 제출
window.submitOrder = async function(items, subtotal, shippingFee, total) {
  try {
    // 유효성 검사
    const buyerName = document.getElementById('buyerName').value.trim();
    const buyerEmail = document.getElementById('buyerEmail').value.trim();
    const buyerPhone = document.getElementById('buyerPhone').value.trim();
    const recipientName = document.getElementById('recipientName').value.trim();
    const recipientPhone = document.getElementById('recipientPhone').value.trim();
    const deliveryZipcode = document.getElementById('deliveryZipcode').value.trim();
    const deliveryAddress = document.getElementById('deliveryAddress').value.trim();
    const deliveryAddressDetail = document.getElementById('deliveryAddressDetail').value.trim();
    const deliveryMemo = document.getElementById('deliveryMemo').value.trim();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (!buyerName) {
      alert('주문자 이름을 입력해주세요');
      document.getElementById('buyerName').focus();
      return;
    }
    
    if (!buyerEmail) {
      alert('주문자 이메일을 입력해주세요');
      document.getElementById('buyerEmail').focus();
      return;
    }
    
    if (!buyerPhone) {
      alert('주문자 전화번호를 입력해주세요');
      document.getElementById('buyerPhone').focus();
      return;
    }
    
    if (!recipientName) {
      alert('수령인 이름을 입력해주세요');
      document.getElementById('recipientName').focus();
      return;
    }
    
    if (!recipientPhone) {
      alert('수령인 전화번호를 입력해주세요');
      document.getElementById('recipientPhone').focus();
      return;
    }
    
    if (!deliveryZipcode || !deliveryAddress) {
      alert('배송지 주소를 입력해주세요');
      return;
    }
    
    // 정보 저장 (다음 주문 시 편의를 위해)
    localStorage.setItem('buyer_name', buyerName);
    localStorage.setItem('buyer_email', buyerEmail);
    localStorage.setItem('buyer_phone', buyerPhone);
    localStorage.setItem('delivery_zipcode', deliveryZipcode);
    localStorage.setItem('delivery_address', deliveryAddress);
    
    // 주문 생성
    const fullAddress = deliveryAddressDetail 
      ? `${deliveryAddress} ${deliveryAddressDetail}` 
      : deliveryAddress;
    
    const orderData = {
      user_id: localStorage.getItem('user_id') || null,
      buyer_name: buyerName,
      buyer_email: buyerEmail,
      buyer_phone: buyerPhone,
      recipient_name: recipientName,
      recipient_phone: recipientPhone,
      delivery_address: fullAddress,
      delivery_zipcode: deliveryZipcode,
      delivery_memo: deliveryMemo,
      total_amount: subtotal,
      discount_amount: 0,
      shipping_fee: shippingFee,
      final_amount: total,
      payment_method: paymentMethod,
      items: items.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        price: item.price,
        producer_id: item.producer_id
      }))
    };
    
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      // 주문 성공
      alert(`주문이 완료되었습니다!\n주문번호: ${result.order_number}`);
      
      // 장바구니에서 주문한 경우 장바구니 비우기
      const checkoutType = sessionStorage.getItem('checkout_type');
      if (checkoutType === 'cart') {
        const userId = localStorage.getItem('user_id');
        const sessionId = getSessionId();
        
        // 선택된 항목만 삭제
        for (const item of items) {
          if (item.cart_item_id) {
            await fetch(`/api/cart/${item.cart_item_id}`, { method: 'DELETE' });
          }
        }
      }
      
      // 세션 스토리지 정리
      sessionStorage.removeItem('checkout_items');
      sessionStorage.removeItem('checkout_type');
      
      // 장바구니 개수 업데이트
      await updateCartCount();
      
      // 주문 상세 페이지로 이동
      window.location.href = `/mypage/orders/${result.order_id}`;
    } else {
      alert(result.error || '주문 처리 중 오류가 발생했습니다');
    }
  } catch (error) {
    console.error('주문 제출 오류:', error);
    alert('주문 처리 중 오류가 발생했습니다');
  }
};

// ===== 생산자 관리 페이지 =====

// 생산자 관리 페이지 로드
window.loadProducerManagePage = async function(producerId) {
  const app = document.getElementById('app');
  
  try {
    // 생산자 정보 조회
    const producerResponse = await fetch(`/api/producers/${producerId}`);
    const producerData = await producerResponse.json();
    const producer = producerData.producer;
    
    // 생산자의 주문 목록 조회
    const ordersResponse = await fetch(`/api/orders/producer/${producerId}`);
    const ordersData = await ordersResponse.json();
    const orders = ordersData.orders || [];
    
    // 상태별 통계
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.order_status === 'pending').length,
      paid: orders.filter(o => o.order_status === 'paid').length,
      preparing: orders.filter(o => o.order_status === 'preparing').length,
      shipping: orders.filter(o => o.order_status === 'shipping').length,
      delivered: orders.filter(o => o.order_status === 'delivered').length,
    };
    
    // 총 매출 (완료된 주문만)
    const totalRevenue = orders
      .filter(o => ['delivered', 'shipping'].includes(o.order_status))
      .reduce((sum, o) => sum + (o.final_amount || 0), 0);
    
    // 생산자 수령액 (플랫폼 수수료 9.9% 제외)
    const producerRevenue = Math.round(totalRevenue * 0.901);
    
    app.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- 생산자 정보 헤더 -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-tea-green rounded-full flex items-center justify-center text-white text-2xl font-bold">
                ${producer.name?.charAt(0) || '생'}
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-800">${producer.name}</h1>
                <p class="text-gray-600">${producer.region_name || ''} · ${producer.producer_type === 'tea' ? '차' : '공예'} 생산자</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">총 매출</p>
              <p class="text-2xl font-bold text-green-600">${formatPrice(totalRevenue)}</p>
              <p class="text-xs text-gray-500 mt-1">수령액: ${formatPrice(producerRevenue)} (수수료 9.9% 제외)</p>
            </div>
          </div>
        </div>
        
        <!-- 주문 상태 통계 -->
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <p class="text-sm text-gray-600 mb-1">전체</p>
            <p class="text-2xl font-bold text-gray-800">${stats.total}</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <p class="text-sm text-gray-600 mb-1">결제대기</p>
            <p class="text-2xl font-bold text-orange-600">${stats.pending}</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <p class="text-sm text-gray-600 mb-1">결제완료</p>
            <p class="text-2xl font-bold text-blue-600">${stats.paid}</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <p class="text-sm text-gray-600 mb-1">준비중</p>
            <p class="text-2xl font-bold text-purple-600">${stats.preparing}</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <p class="text-sm text-gray-600 mb-1">배송중</p>
            <p class="text-2xl font-bold text-indigo-600">${stats.shipping}</p>
          </div>
          <div class="bg-white rounded-lg shadow-sm p-4 text-center">
            <p class="text-sm text-gray-600 mb-1">배송완료</p>
            <p class="text-2xl font-bold text-green-600">${stats.delivered}</p>
          </div>
        </div>
        
        <!-- 주문 목록 -->
        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6 border-b flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-800">
              <i class="fas fa-box mr-2"></i>
              주문 관리
            </h2>
            <div class="flex gap-2">
              <select id="statusFilter" class="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="all">전체 상태</option>
                <option value="pending">결제대기</option>
                <option value="paid">결제완료</option>
                <option value="preparing">준비중</option>
                <option value="shipping">배송중</option>
                <option value="delivered">배송완료</option>
              </select>
            </div>
          </div>
          
          <div id="ordersList" class="divide-y">
            ${orders.length === 0 ? `
              <div class="p-12 text-center text-gray-500">
                <i class="fas fa-inbox text-6xl mb-4"></i>
                <p class="text-lg">아직 받은 주문이 없습니다</p>
              </div>
            ` : orders.map(order => `
              <div class="p-6 hover:bg-gray-50 cursor-pointer transition" onclick="loadProducerOrderDetail('${order.order_id}')">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <div class="flex items-center gap-3 mb-2">
                      <span class="font-bold text-gray-800">${order.order_number}</span>
                      <span class="px-3 py-1 rounded-full text-xs font-bold ${getOrderStatusStyle(order.order_status)}">
                        ${getOrderStatusText(order.order_status)}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600">구매자: ${order.buyer_name}</p>
                    <p class="text-xs text-gray-500">주문일시: ${formatDate(order.created_at)}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-gray-800">${formatPrice(order.final_amount)}</p>
                    <p class="text-xs text-gray-500">수령액: ${formatPrice(Math.round(order.final_amount * 0.901))}</p>
                  </div>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-600">
                    상품 ${order.item_count}개
                  </div>
                  <div class="flex gap-2">
                    ${order.order_status === 'paid' ? `
                      <button onclick="event.stopPropagation(); updateProducerOrderStatus('${order.order_id}', 'preparing')" 
                              class="px-4 py-2 bg-purple-600 text-white rounded text-xs hover:bg-purple-700">
                        <i class="fas fa-box-open mr-1"></i>준비 시작
                      </button>
                    ` : order.order_status === 'preparing' ? `
                      <button onclick="event.stopPropagation(); showShipmentModal('${order.order_id}')" 
                              class="px-4 py-2 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700">
                        <i class="fas fa-shipping-fast mr-1"></i>배송 등록
                      </button>
                    ` : order.order_status === 'shipping' ? `
                      <button onclick="event.stopPropagation(); updateProducerOrderStatus('${order.order_id}', 'delivered')" 
                              class="px-4 py-2 bg-green-600 text-white rounded text-xs hover:bg-green-700">
                        <i class="fas fa-check mr-1"></i>배송 완료
                      </button>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <!-- 배송 등록 모달 -->
      <div id="shipmentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 class="text-xl font-bold text-gray-800 mb-4">배송 정보 등록</h3>
          
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">택배사</label>
              <select id="courierCompany" class="w-full border border-gray-300 rounded-lg px-4 py-2">
                <option value="CJ대한통운">CJ대한통운</option>
                <option value="로젠택배">로젠택배</option>
                <option value="한진택배">한진택배</option>
                <option value="우체국택배">우체국택배</option>
                <option value="롯데택배">롯데택배</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">송장번호</label>
              <input type="text" id="trackingNumber" 
                     class="w-full border border-gray-300 rounded-lg px-4 py-2"
                     placeholder="송장번호를 입력하세요">
            </div>
          </div>
          
          <div class="flex gap-3">
            <button onclick="closeShipmentModal()" 
                    class="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              취소
            </button>
            <button onclick="submitShipment()" 
                    class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              등록
            </button>
          </div>
        </div>
      </div>
    `;
    
    // 상태 필터링
    document.getElementById('statusFilter').addEventListener('change', (e) => {
      const status = e.target.value;
      const orderCards = document.querySelectorAll('#ordersList > div[onclick]');
      
      orderCards.forEach(card => {
        if (status === 'all') {
          card.style.display = 'block';
        } else {
          const statusBadge = card.querySelector('.px-3.py-1');
          const cardStatus = statusBadge.textContent.trim();
          const shouldShow = 
            (status === 'pending' && cardStatus === '결제대기') ||
            (status === 'paid' && cardStatus === '결제완료') ||
            (status === 'preparing' && cardStatus === '준비중') ||
            (status === 'shipping' && cardStatus === '배송중') ||
            (status === 'delivered' && cardStatus === '배송완료');
          
          card.style.display = shouldShow ? 'block' : 'none';
        }
      });
    });
    
  } catch (error) {
    console.error('생산자 관리 페이지 로드 오류:', error);
    app.innerHTML = `
      <div class="max-w-4xl mx-auto px-4 py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <i class="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
          <h2 class="text-xl font-bold text-red-700 mb-2">오류가 발생했습니다</h2>
          <p class="text-red-600">${error.message}</p>
        </div>
      </div>
    `;
  }
};

// 생산자 주문 상태 변경
window.updateProducerOrderStatus = async function(orderId, newStatus) {
  try {
    const response = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    
    if (response.ok) {
      alert('주문 상태가 업데이트되었습니다');
      window.location.reload();
    } else {
      const result = await response.json();
      alert(result.error || '상태 업데이트 실패');
    }
  } catch (error) {
    console.error('상태 업데이트 오류:', error);
    alert('상태 업데이트 중 오류가 발생했습니다');
  }
};

// 배송 등록 모달
let currentOrderIdForShipment = null;

window.showShipmentModal = function(orderId) {
  currentOrderIdForShipment = orderId;
  document.getElementById('shipmentModal').classList.remove('hidden');
};

window.closeShipmentModal = function() {
  document.getElementById('shipmentModal').classList.add('hidden');
  currentOrderIdForShipment = null;
  document.getElementById('trackingNumber').value = '';
};

window.submitShipment = async function() {
  const courierCompany = document.getElementById('courierCompany').value;
  const trackingNumber = document.getElementById('trackingNumber').value.trim();
  
  if (!trackingNumber) {
    alert('송장번호를 입력해주세요');
    return;
  }
  
  try {
    const response = await fetch(`/api/orders/${currentOrderIdForShipment}/shipment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courier_company: courierCompany,
        tracking_number: trackingNumber
      })
    });
    
    if (response.ok) {
      alert('배송 정보가 등록되었습니다');
      closeShipmentModal();
      window.location.reload();
    } else {
      const result = await response.json();
      alert(result.error || '배송 등록 실패');
    }
  } catch (error) {
    console.error('배송 등록 오류:', error);
    alert('배송 등록 중 오류가 발생했습니다');
  }
};

// 생산자 주문 상세 페이지
window.loadProducerOrderDetail = function(orderId) {
  // 일반 주문 상세 페이지로 이동
  window.location.href = `/mypage/orders/${orderId}`;
};

// 주문 상태 스타일
function getOrderStatusStyle(status) {
  const styles = {
    pending: 'bg-orange-100 text-orange-700',
    paid: 'bg-blue-100 text-blue-700',
    preparing: 'bg-purple-100 text-purple-700',
    shipping: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-gray-100 text-gray-700',
    refunded: 'bg-red-100 text-red-700'
  };
  return styles[status] || 'bg-gray-100 text-gray-700';
}

// 주문 상태 텍스트
function getOrderStatusText(status) {
  const texts = {
    pending: '결제대기',
    paid: '결제완료',
    preparing: '준비중',
    shipping: '배송중',
    delivered: '배송완료',
    cancelled: '취소됨',
    refunded: '환불됨'
  };
  return texts[status] || status;
}

// 페이지 로드 시 장바구니 개수 업데이트
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});

// ===== PWA Service Worker - DISABLED =====
// Service Worker 완전 비활성화 - 캐시 문제 해결
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    // 모든 Service Worker 제거
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
      console.log('🧹 Service Worker 제거:', registration.scope);
    }
    
    // 모든 캐시 제거
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      for (const name of cacheNames) {
        await caches.delete(name);
        console.log('🧹 캐시 제거:', name);
      }
    }
    console.log('✅ 캐시 제거 완료');
  });
}
