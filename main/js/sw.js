// Prosty Service Worker (sw.js)
self.addEventListener('install', (event) => {
  console.log('Service Worker zainstalowany');
});

self.addEventListener('fetch', (event) => {
  // To musi być obecne, nawet jeśli nic nie robi
});