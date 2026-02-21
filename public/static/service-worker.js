// Service Worker - DISABLED (캐시 문제 해결을 위해 임시 비활성화)
// 이전 Service Worker를 언레지스터하고 캐시를 제거

self.addEventListener('install', (event) => {
  console.log('🚫 Service Worker 비활성화 모드 - 즉시 활성화');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('🧹 Service Worker 활성화 - 모든 캐시 제거 중...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('❌ 캐시 삭제:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('✅ 모든 캐시 제거 완료');
      // 모든 클라이언트를 새로고침
      return self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          console.log('🔄 클라이언트 새로고침:', client.url);
          client.navigate(client.url);
        });
      });
    })
  );
  return self.clients.claim();
});

// Fetch 이벤트 - 모든 요청을 네트워크로 전달 (캐시 사용 안 함)
self.addEventListener('fetch', (event) => {
  console.log('🌐 네트워크 요청:', event.request.url);
  // 캐시를 사용하지 않고 직접 네트워크에서 가져오기
  event.respondWith(fetch(event.request));
});
