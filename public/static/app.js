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

// 모바일 메뉴 토글
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// 검색 모달
const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    searchModal.classList.remove('hidden');
    searchInput.focus();
  });
}

if (closeSearchBtn) {
  closeSearchBtn.addEventListener('click', () => {
    searchModal.classList.add('hidden');
    searchInput.value = '';
    searchResults.innerHTML = '';
  });
}

// 검색 모달 외부 클릭 시 닫기
if (searchModal) {
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
if (searchInput) {
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
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            <i class="fas fa-leaf mr-2"></i>
            한국의 차와 공예, 직접 만나보세요
          </h1>
          <p class="text-xl mb-8">차산지와 공예산지를 직접 연결하는 신뢰의 플랫폼</p>
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
          <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <i class="fas fa-heart text-red-500 mr-3"></i>
            추천 상품
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${featuredProducts.data.products.map(product => `
              <a href="/products/${product.id}" class="block bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition">
                <div class="h-64 bg-gray-200 flex items-center justify-center">
                  <i class="fas ${product.product_type === 'tea' ? 'fa-mug-hot' : 'fa-palette'} text-gray-400 text-6xl"></i>
                </div>
                <div class="p-4">
                  <div class="text-sm text-gray-500 mb-1">${product.region_name || ''}</div>
                  <h3 class="font-bold text-lg mb-2">${product.name}</h3>
                  <div class="flex items-center justify-between">
                    <span class="text-tea-green font-bold text-xl">${formatPrice(product.price)}</span>
                    ${product.is_featured ? '<span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">인기</span>' : ''}
                  </div>
                </div>
              </a>
            `).join('')}
          </div>
          <div class="text-center mt-8">
            <a href="/products" class="inline-block bg-tea-green text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition">
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
      'gift_set': '선물세트'
    };
    
    app.innerHTML = `
      <div class="container mx-auto px-4 py-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">
            ${type ? typeNames[type] : '전체 상품'}
          </h1>
          
          <!-- 카테고리 필터 -->
          ${categories.length > 0 ? `
            <div class="flex flex-wrap gap-2 mb-6">
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
        </div>
        
        <!-- 상품 목록 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${products.map(product => `
            <a href="/products/${product.id}" class="block bg-white rounded-lg overflow-hidden hover:shadow-lg transition">
              <div class="h-64 bg-gray-200 flex items-center justify-center">
                <i class="fas ${product.product_type === 'tea' ? 'fa-mug-hot' : product.product_type === 'craft' ? 'fa-palette' : 'fa-gift'} text-gray-400 text-6xl"></i>
              </div>
              <div class="p-4">
                <div class="text-sm text-gray-500 mb-1">${product.producer_name} · ${product.region_name || ''}</div>
                <h3 class="font-bold text-lg mb-2">${product.name}</h3>
                <div class="text-gray-600 text-sm mb-3 line-clamp-2">${product.description || ''}</div>
                <div class="flex items-center justify-between">
                  <span class="text-tea-green font-bold text-xl">${formatPrice(product.price)}</span>
                  ${product.is_featured ? '<span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">인기</span>' : ''}
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
                ${product.original_price && product.discount_rate ? `
                  <div class="flex items-center gap-3 mb-2">
                    <span class="text-xl text-gray-400 line-through">${formatPrice(product.original_price)}</span>
                    <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">${product.discount_rate}% 할인</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-4xl font-bold text-tea-green">${formatPrice(product.price)}</span>
                    ${product.is_featured ? '<span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-bold">인기 상품</span>' : ''}
                  </div>
                  <div class="mt-2 text-sm text-red-600 font-medium">
                    <i class="fas fa-tag mr-1"></i>
                    직거래 특별가! ${formatPrice(product.original_price - product.price)} 절약
                  </div>
                ` : `
                  <div class="flex items-center space-x-4">
                    <span class="text-3xl font-bold text-tea-green">${formatPrice(product.price)}</span>
                    ${product.is_featured ? '<span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-bold">인기 상품</span>' : ''}
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
            
            <div class="flex gap-3">
              <button class="flex-1 bg-tea-green text-white px-6 py-4 rounded-lg font-bold hover:bg-opacity-90 transition">
                <i class="fas fa-shopping-cart mr-2"></i>
                장바구니
              </button>
              <button class="flex-1 bg-tea-brown text-white px-6 py-4 rounded-lg font-bold hover:bg-opacity-90 transition">
                <i class="fas fa-credit-card mr-2"></i>
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('상품 상세 로드 오류:', error);
    app.innerHTML = '<div class="container mx-auto px-4 py-20 text-center"><p class="text-red-500">상품을 찾을 수 없습니다.</p></div>';
  }
}

// ===== 지역 목록 페이지 =====
async function loadRegionsPage() {
  const type = searchParams.get('type');
  
  try {
    let url = '/api/regions';
    if (type) url += `?type=${type}`;
    
    const response = await axios.get(url);
    const regions = response.data.regions;
    
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
    
    // 차공부와 공예공부로 분류
    const teaCurriculum = allCurriculum.filter(c => c.category_id === 2);
    const craftCurriculum = allCurriculum.filter(c => c.category_id === 3);
    
    app.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- 헤더 -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            <i class="fas fa-graduation-cap text-tea-green mr-3"></i>
            다도교육 커리큘럼
          </h1>
          <p class="text-lg text-gray-600">
            차와 공예에 대한 체계적인 교육 프로그램을 만나보세요
          </p>
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
                    <span class="px-3 py-1 text-sm font-medium rounded-full ${
                      item.difficulty === '입문' ? 'bg-green-100 text-green-800' :
                      item.difficulty === '중급' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }">
                      ${item.difficulty}
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
                    <span class="px-3 py-1 text-sm font-medium rounded-full ${
                      item.difficulty === '입문' ? 'bg-green-100 text-green-800' :
                      item.difficulty === '중급' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }">
                      ${item.difficulty}
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
  const teaContent = document.getElementById('teaContent');
  const craftContent = document.getElementById('craftContent');
  
  if (tab === 'tea') {
    teaTab.classList.add('border-tea-green', 'text-tea-green');
    teaTab.classList.remove('border-transparent', 'text-gray-500');
    craftTab.classList.add('border-transparent', 'text-gray-500');
    craftTab.classList.remove('border-craft-blue', 'text-craft-blue');
    teaContent.classList.remove('hidden');
    craftContent.classList.add('hidden');
  } else {
    craftTab.classList.add('border-craft-blue', 'text-craft-blue');
    craftTab.classList.remove('border-transparent', 'text-gray-500');
    teaTab.classList.add('border-transparent', 'text-gray-500');
    teaTab.classList.remove('border-tea-green', 'text-tea-green');
    craftContent.classList.remove('hidden');
    teaContent.classList.add('hidden');
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
