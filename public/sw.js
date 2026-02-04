// Service Worker for 다공 PWA
// Version: 1.0.0

const CACHE_NAME = 'dagong-v1';
const RUNTIME_CACHE = 'dagong-runtime';

// 캐시할 정적 파일 목록
const PRECACHE_URLS = [
  '/',
  '/static/style.css',
  '/static/app.js',
  '/static/i18n.js',
  '/static/producer-forms.js',
  '/static/icons/icon-192x192.png',
  '/static/icons/icon-512x512.png',
  '/manifest.json'
];

// 설치 이벤트: 정적 파일 캐싱
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Precaching static assets');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// 활성화 이벤트: 이전 캐시 정리
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch 이벤트: 네트워크 우선, 캐시 폴백 전략
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API 요청: 네트워크 우선
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // API 응답을 런타임 캐시에 저장
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // 네트워크 실패 시 캐시에서 가져오기
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // 캐시도 없으면 오프라인 응답
            return new Response(
              JSON.stringify({ error: '오프라인 상태입니다. 인터넷 연결을 확인해주세요.' }),
              { 
                status: 503,
                headers: { 'Content-Type': 'application/json' }
              }
            );
          });
        })
    );
    return;
  }

  // 정적 파일: 캐시 우선
  if (url.pathname.startsWith('/static/') || 
      url.pathname === '/' || 
      url.pathname.endsWith('.css') || 
      url.pathname.endsWith('.js')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // 백그라운드에서 캐시 업데이트
          fetch(request).then((response) => {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response);
            });
          }).catch(() => {});
          return cachedResponse;
        }
        
        // 캐시 미스: 네트워크에서 가져오고 캐시에 저장
        return fetch(request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // 그 외: 네트워크 우선, 캐시 폴백
  event.respondWith(
    fetch(request)
      .then((response) => {
        // 성공적인 응답을 런타임 캐시에 저장
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 가져오기
        return caches.match(request).then((cachedResponse) => {
          return cachedResponse || new Response(
            '오프라인 상태입니다. 인터넷 연결을 확인해주세요.',
            { 
              status: 503,
              headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            }
          );
        });
      })
  );
});

// 푸시 알림 이벤트 (향후 사용)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push received');
  const options = {
    body: event.data ? event.data.text() : '새로운 알림이 도착했습니다.',
    icon: '/static/icons/icon-192x192.png',
    badge: '/static/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('다공', options)
  );
});

// 알림 클릭 이벤트
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification clicked');
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// 백그라운드 동기화 (향후 사용)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
  if (event.tag === 'sync-cart') {
    event.waitUntil(syncCart());
  }
});

async function syncCart() {
  // 장바구니 동기화 로직 (향후 구현)
  console.log('[Service Worker] Syncing cart...');
}

// 메시지 이벤트 (클라이언트와 통신)
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);
  
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data.action === 'clearCache') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});
