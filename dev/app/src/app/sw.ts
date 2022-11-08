export const register = () => {
  navigator.serviceWorker.register('sw.js')
    .then(registration => {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
      // registration.unregister(); // debug...
    });
};
