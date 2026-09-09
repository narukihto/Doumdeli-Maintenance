// ==========================================
// 1. CONFIGURATION DU NOYAU DE CACHE - NETTOYAGE & MAINTENANCE
// ==========================================
// تم تحديث اسم الكاش والإصدار لضمان تنظيف الملفات القديمة وتفعيل النظام الجديد فوراً
const CACHE_NAME = 'doumdeli-nettoyage-v1';

// الأصول الثابتة التي تضمن عمل موقع الصيانة والنظافة بالكامل دون إنترنت
const STATIC_ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './style.css',

  // --- IMAGES DE NETTOYAGE & MAINTENANCE (Trajectoires locales) ---
  './images/nettoyage-house.jpg',
  './images/hygiene-generale.jpg',
  './images/maintenance-batiment.jpg',
  './images/bureaux-commerces.jpg',
  './images/deratisation-nuisibles.jpg',
  './images/espaces-verts.jpg'
];

// ==========================================
// 2. ÉVÉNEMENT 'INSTALL' : MISE EN CACHE DES RESSOURCES
// ==========================================
self.addEventListener('install', (e) => {
  console.log('🧹 [Service Worker] Installation du noyau de nettoyage et mise en cache...');
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
        .then(() => console.log('✅ [Service Worker] Tous les actifs de nettoyage sont sécurisés !'))
        .catch(err => console.log('⚠️ [Service Worker] Note: Certaines ressources locales seront indexées au premier chargement.', err));
    })
  );
  self.skipWaiting();
});

// ==========================================
// 3. ÉVÉNEMENT 'ACTIVATE' : PURGE DE L'ANCIEN CACHE
// ==========================================
self.addEventListener('activate', (e) => {
  console.log('⚡ [Service Worker] Activation et purge des anciens caches obsolètes...');
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          // مسح الكاش القديم تلقائياً ومطابقة الكاش الجديد
          if (key !== CACHE_NAME) {
            console.log(`🗑️ [Service Worker] Suppression de l'ancien cache : ${key}`);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// ==========================================
// 4. ÉVÉNEMENT 'FETCH' : STRATÉGIE DE REPLI HORS-LIGNE (OFFLINE SYSTEM)
// ==========================================
self.addEventListener('fetch', (e) => {
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // تخزين ديناميكي للصور الملتقطة من الـ API العام لضمان بقائها سريعة
        if (response.status === 200) {
          const isServiceRequest = e.request.url.includes('images') || e.request.destination === 'image';
          const isUnsplashApi = e.request.url.includes('unsplash.com');

          if (isServiceRequest || isUnsplashApi) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseClone);
              console.log(`📥 [Service Worker] Image de service mise à jour : ${e.request.url}`);
            });
          }
        }
        return response;
      })
      .catch((error) => {
        // تشغيل وضع الـ Offline التلقائي للمحافظة على تصفح العميل للخدمات وطلبات الحجز
        console.log(`📡 [Service Worker] Mode Offline Nettoyage activé pour : ${e.request.url}`);
        return caches.match(e.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // صورة بديلة عالية الجودة تظهر تلقائياً في حال فقدان الصور أو الشبكة
          if (e.request.destination === 'image') {
            return caches.match('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600')
              .then(fallbackResponse => fallbackResponse || new Response('', { status: 404, statusText: 'Not Found' }));
          }
        });
      })
  );
});
