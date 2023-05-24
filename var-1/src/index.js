import { render } from 'solid-js/web'
import App from './app'

setTimeout(() => {
  const container = document.querySelector('.product-load-more-container')
  const app = Object.assign(document.createElement('app-container'), { id: ['dy-app-container___infinite-scroll-container'], style: "width: 100%" });
  const isPlp = document.querySelector('.product-grid.container')

  if (isPlp && container) {
    container.parentNode.insertBefore(app, container);
    render(() => <App />, app);
  }
}, 500)

