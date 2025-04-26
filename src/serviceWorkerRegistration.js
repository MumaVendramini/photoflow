// src/serviceWorkerRegistration.js

// Este código registra um service worker básico
// Ele é necessário para a funcionalidade de PWA
export function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Service Worker registrado:', registration);
          })
          .catch((error) => {
            console.error('Erro ao registrar o Service Worker:', error);
          });
      });
    }
  }
  
  // A função unregister é usada para remover o service worker
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
      });
    }
  }
  