self.addEventListener('install', (event) => {
  self.skipWaiting(); // Wymusza aktywację od razu
});

self.addEventListener('fetch', (event) => {
  // Musi być, by Chrome uznał PWA
});