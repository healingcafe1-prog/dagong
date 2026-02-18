// PWA Initialization Script
// This script registers the service worker and handles PWA installation

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/static/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// PWA Install Prompt
let deferredPrompt;
const installButton = document.getElementById('pwa-install-button');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Update UI to show install button
  if (installButton) {
    installButton.style.display = 'block';
  }
  
  // Show custom install banner
  showInstallPromotion();
});

function showInstallPromotion() {
  // Create a custom install banner
  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 16px;
    max-width: 90%;
    animation: slideUp 0.3s ease-out;
  `;
  
  banner.innerHTML = `
    <div style="flex: 1;">
      <div style="font-weight: 600; margin-bottom: 4px;">다공 앱 설치</div>
      <div style="font-size: 14px; opacity: 0.9;">홈화면에 추가하여 앱처럼 사용하세요</div>
    </div>
    <button id="pwa-install-btn" style="
      background: white;
      color: #059669;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
    ">설치</button>
    <button id="pwa-dismiss-btn" style="
      background: transparent;
      color: white;
      border: none;
      padding: 8px;
      cursor: pointer;
      font-size: 20px;
    ">&times;</button>
  `;
  
  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        transform: translateX(-50%) translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(banner);
  
  // Install button click handler
  document.getElementById('pwa-install-btn').addEventListener('click', async () => {
    banner.style.display = 'none';
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
    }
  });
  
  // Dismiss button click handler
  document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
    banner.style.display = 'none';
  });
}

// Track when PWA is installed
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  deferredPrompt = null;
  // Hide install button if it exists
  if (installButton) {
    installButton.style.display = 'none';
  }
  // Track installation (optional analytics)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'pwa_install', {
      event_category: 'engagement',
      event_label: 'PWA Installation'
    });
  }
});

// Detect if app is running in standalone mode
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
  console.log('Running in standalone mode (PWA)');
  document.body.classList.add('pwa-mode');
  
  // Hide browser UI elements
  const browserElements = document.querySelectorAll('.browser-only');
  browserElements.forEach(el => el.style.display = 'none');
}

// Handle online/offline status
window.addEventListener('online', () => {
  console.log('App is online');
  document.body.classList.remove('offline');
  showNotification('연결됨', '인터넷 연결이 복구되었습니다');
});

window.addEventListener('offline', () => {
  console.log('App is offline');
  document.body.classList.add('offline');
  showNotification('오프라인', '인터넷 연결이 끊어졌습니다');
});

function showNotification(title, message) {
  // Check if the browser supports notifications
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return;
  }
  
  // Check notification permission
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: message,
      icon: '/static/icons/icon-192x192.png',
      badge: '/static/icons/icon-72x72.png'
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(title, {
          body: message,
          icon: '/static/icons/icon-192x192.png',
          badge: '/static/icons/icon-72x72.png'
        });
      }
    });
  }
}

// Request notification permission on user interaction
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission().then((permission) => {
      console.log('Notification permission:', permission);
    });
  }
}

// Export for use in other scripts
window.PWA = {
  requestNotificationPermission,
  showNotification
};
