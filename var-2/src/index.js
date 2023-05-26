import { render } from 'solid-js/web'
import App from './app'

setTimeout(() => {
  const container = document.querySelector('.product-load-more-container')
  const app = Object.assign(document.createElement('app-container'), { id: ['dy-app-container___infinite-scroll-container'], style: "width: 100%" });
  const isPlp = document.querySelector('.product-grid.container')
  let isMobile = window.matchMedia('(max-width: 768px)').matches

  function renderApp() {
    if (isPlp && container && isMobile) {
      container.parentNode.insertBefore(app, container);
      render(() => <App />, app);
    }
  }

  renderApp();

  window.addEventListener('resize', () => {
    isMobile = window.matchMedia('(max-width: 768px)').matches

    if (!isMobile) {
      window.location.reload();
    }
  });
}, 1000)

