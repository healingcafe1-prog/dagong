// Service Worker for 다공 PWA
const CACHE_NAME = 'dagong-v1';
const RUNTIME_CACHE = 'dagong-runtime-v1';

// 오프라인 시 보여줄 기본 페이지
const OFFLINE_PAGE = '/offline.html';

// 캐시할 정적 리소스
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/static/app.js',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js'
];

// Service Worker 설치
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('[SW] Cache installation failed:', error);
      })
  );
  
  // 즉시 활성화
  self.skipWaiting();
});

// Service Worker 활성화
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // 오래된 캐시 삭제
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  
  // 모든 클라이언트를 즉시 제어
  return self.clients.claim();
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event) => {
  // POST 요청은 캐시하지 않음
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 캐시된 응답이 있으면 반환, 동시에 네트워크에서 업데이트
        if (cachedResponse) {
          // Background fetch to update cache
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(RUNTIME_CACHE).then((cache) => {
                  cache.put(event.request, networkResponse.clone());
                });
              }
            })
            .catch(() => {
              // Network error, use cached version
            });
          
          return cachedResponse;
        }

        // 캐시에 없으면 네트워크에서 가져오기
        return fetch(event.request)
          .then((networkResponse) => {
            // 유효한 응답이면 캐시에 저장
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            
            return networkResponse;
          })
          .catch(() => {
            // 네트워크 오류 시 오프라인 페이지 반환
            if (event.request.destination === 'document') {
              return caches.match(OFFLINE_PAGE);
            }
          });
      })
  );
});

// 백그라운드 동기화
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // 백그라운드에서 데이터 동기화
      syncData()
    );
  }
});

// 푸시 알림
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : '새로운 알림이 있습니다',
    icon: '/static/icons/icon-192x192.png',
    badge: '/static/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'dagong-notification',
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification('다공', options)
  );
});

// 알림 클릭
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// 데이터 동기화 함수
async function syncData() {
  try {
    // 백그라운드에서 필요한 데이터 동기화
    console.log('[SW] Syncing data...');
    // 여기에 동기화 로직 추가
  } catch (error) {
    console.error('[SW] Sync failed:', error);
  }
}
