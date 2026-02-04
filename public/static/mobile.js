// 다공 모바일 PWA 기능
// Mobile-specific features and optimizations

// ===== PWA 설치 프롬프트 =====
let deferredPrompt;
let installButton;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('[PWA] Install prompt available');
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

function showInstallPromotion() {
  const promptHTML = `
    <div class="install-prompt" id="installPrompt">
      <i class="fas fa-download text-tea-green text-2xl"></i>
      <div>
        <div class="font-bold">앱으로 설치</div>
        <div class="text-sm text-gray-600">홈 화면에 추가하고 더 빠르게 이용하세요</div>
      </div>
      <button id="installBtn" class="bg-tea-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
        설치
      </button>
      <button id="dismissBtn" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  // 이미 설치 여부 확인
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('[PWA] Already installed');
    return;
  }
  
  // 이미 설치 프롬프트가 있으면 표시 안 함
  if (localStorage.getItem('installPromptDismissed')) {
    return;
  }
  
  document.body.insertAdjacentHTML('beforeend', promptHTML);
  
  document.getElementById('installBtn').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] User response: ${outcome}`);
    
    deferredPrompt = null;
    document.getElementById('installPrompt').remove();
  });
  
  document.getElementById('dismissBtn').addEventListener('click', () => {
    document.getElementById('installPrompt').remove();
    localStorage.setItem('installPromptDismissed', 'true');
  });
}

// ===== Service Worker 등록 =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('[SW] Registered successfully:', registration.scope);
        
        // 업데이트 확인
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('[SW] New version found');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateNotification();
            }
          });
        });
      })
      .catch((err) => {
        console.error('[SW] Registration failed:', err);
      });
      
    // 업데이트 확인 (1시간마다)
    setInterval(() => {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) reg.update();
      });
    }, 60 * 60 * 1000);
  });
}

function showUpdateNotification() {
  const updateHTML = `
    <div class="install-prompt" id="updatePrompt">
      <i class="fas fa-sync text-tea-green text-2xl"></i>
      <div>
        <div class="font-bold">새 버전 사용 가능</div>
        <div class="text-sm text-gray-600">새로고침하여 최신 버전을 사용하세요</div>
      </div>
      <button id="refreshBtn" class="bg-tea-green text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
        새로고침
      </button>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', updateHTML);
  
  document.getElementById('refreshBtn').addEventListener('click', () => {
    window.location.reload();
  });
}

// ===== 모바일 하단 네비게이션 =====
function createMobileBottomNav() {
  if (window.innerWidth > 768) return;
  
  const navHTML = `
    <div class="mobile-bottom-nav">
      <a href="/" class="nav-item" data-page="home">
        <i class="fas fa-home"></i>
        <span>홈</span>
      </a>
      <a href="/products?type=tea" class="nav-item" data-page="tea">
        <i class="fas fa-mug-hot"></i>
        <span>차</span>
      </a>
      <a href="/products?type=craft" class="nav-item" data-page="craft">
        <i class="fas fa-palette"></i>
        <span>공예</span>
      </a>
      <a href="/cart" class="nav-item" data-page="cart">
        <i class="fas fa-shopping-cart"></i>
        <span>장바구니</span>
      </a>
      <a href="/mypage" class="nav-item" data-page="mypage">
        <i class="fas fa-user"></i>
        <span>내정보</span>
      </a>
    </div>
  `;
  
  // 기존 하단 네비가 없으면 추가
  if (!document.querySelector('.mobile-bottom-nav')) {
    document.body.insertAdjacentHTML('beforeend', navHTML);
    updateActiveNav();
  }
}

function updateActiveNav() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
  
  navItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (currentPath === href || currentPath.startsWith(href.split('?')[0])) {
      item.classList.add('active');
    }
  });
}

// ===== Pull to Refresh =====
let startY = 0;
let currentY = 0;
let pulling = false;

function initPullToRefresh() {
  if (!('serviceWorker' in navigator)) return;
  
  document.addEventListener('touchstart', (e) => {
    if (window.scrollY === 0) {
      startY = e.touches[0].pageY;
      pulling = true;
    }
  }, { passive: true });
  
  document.addEventListener('touchmove', (e) => {
    if (!pulling) return;
    
    currentY = e.touches[0].pageY;
    const distance = currentY - startY;
    
    if (distance > 0 && distance < 150) {
      showPullIndicator(distance);
    }
  }, { passive: true });
  
  document.addEventListener('touchend', () => {
    if (!pulling) return;
    
    const distance = currentY - startY;
    if (distance > 100) {
      performRefresh();
    }
    
    hidePullIndicator();
    pulling = false;
    startY = 0;
    currentY = 0;
  });
}

function showPullIndicator(distance) {
  let indicator = document.getElementById('pullIndicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'pullIndicator';
    indicator.className = 'pull-to-refresh';
    indicator.innerHTML = '<i class="fas fa-arrow-down text-tea-green text-2xl"></i>';
    document.body.appendChild(indicator);
  }
  
  indicator.style.opacity = Math.min(distance / 100, 1);
  indicator.style.transform = `translateY(${Math.min(distance / 2, 60)}px)`;
}

function hidePullIndicator() {
  const indicator = document.getElementById('pullIndicator');
  if (indicator) {
    indicator.style.opacity = 0;
    indicator.style.transform = 'translateY(-100%)';
  }
}

async function performRefresh() {
  console.log('[Refresh] Pull to refresh triggered');
  const indicator = document.getElementById('pullIndicator');
  if (indicator) {
    indicator.innerHTML = '<div class="spinner"></div>';
  }
  
  try {
    // 캐시 업데이트
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ action: 'clearCache' });
    }
    
    // 페이지 새로고침
    await new Promise(resolve => setTimeout(resolve, 500));
    window.location.reload();
  } catch (error) {
    console.error('[Refresh] Error:', error);
    hidePullIndicator();
  }
}

// ===== 터치 제스처 (스와이프) =====
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function initSwipeGestures() {
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  
  // 수평 스와이프가 수직보다 클 때만 처리
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      // 오른쪽 스와이프 (뒤로 가기)
      if (window.history.length > 1) {
        window.history.back();
      }
    } else {
      // 왼쪽 스와이프 (앞으로 가기)
      // 필요시 구현
    }
  }
}

// ===== 햅틱 피드백 (진동) =====
function hapticFeedback(pattern = [10]) {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
}

// 버튼 클릭 시 햅틱 피드백 추가
function addHapticToButtons() {
  document.addEventListener('click', (e) => {
    const button = e.target.closest('button, a, .btn');
    if (button && !button.classList.contains('no-haptic')) {
      hapticFeedback([5]);
      button.classList.add('haptic-feedback');
      setTimeout(() => {
        button.classList.remove('haptic-feedback');
      }, 200);
    }
  });
}

// ===== 오프라인 감지 =====
function initOfflineDetection() {
  window.addEventListener('online', () => {
    console.log('[Network] Online');
    showToast('인터넷 연결됨', 'success');
  });
  
  window.addEventListener('offline', () => {
    console.log('[Network] Offline');
    showToast('오프라인 모드', 'warning');
  });
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 ${
    type === 'success' ? 'bg-green-500' :
    type === 'warning' ? 'bg-yellow-500' :
    type === 'error' ? 'bg-red-500' :
    'bg-blue-500'
  } text-white font-medium`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== 뷰포트 높이 조정 (모바일 주소창 대응) =====
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

// ===== 이미지 지연 로딩 =====
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// ===== 초기화 =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('[Mobile] Initializing mobile features...');
  
  createMobileBottomNav();
  initPullToRefresh();
  initSwipeGestures();
  addHapticToButtons();
  initOfflineDetection();
  setViewportHeight();
  initLazyLoading();
  
  console.log('[Mobile] Mobile features initialized');
});

// 페이지 네비게이션 시 하단 네비 업데이트
window.addEventListener('popstate', updateActiveNav);

// Export functions for external use
window.dagongMobile = {
  hapticFeedback,
  showToast,
  updateActiveNav
};
