import './style.scss'
import { createEffect, createSignal, Show } from 'solid-js'

export default () => {
  const [count, setCount] = createSignal(1);
  const [getting, setGetting] = createSignal(false);
  const [showLoader, setLoader] = createSignal(true);

  let infiniteScrollBoxRef;

  const handleScrollEvent = () => {
    let top = window.innerHeight-30;

    if (infiniteScrollBoxRef && infiniteScrollBoxRef.getBoundingClientRect().top < top && infiniteScrollBoxRef.getBoundingClientRect().top > -100 && !getting()) {
      handleGetMoreTiles()
    }
  }

  const getMaxNumber = () => {
    let maxNo = 1;
    const links = document.querySelectorAll('.page-link');
    let minusLength = 0

    if (links.length > 3)
      minusLength = 2;

    if (links) {
      const maxLink = links[links.length-minusLength];
      maxNo = maxLink ? Number(maxLink.getAttribute('data-page-number')) : maxNo;
    }

    return maxNo
  }

  const getNextLink = (number) => {
    let link = ''

    const a = document.querySelector('[data-page-number="2"]');

    if (a) {
      let href = a.getAttribute('href')
      href = href.replace('page=2', `page=${number}`)
      link = href
    }

    return link
  }

  const handleGetMoreTiles = async () => {
    const max = getMaxNumber();

    if (count() < max) {
      setGetting(true);
      setCount(prev => prev+1)
      const url = getNextLink(count())
  
      const data = await fetch(url)
      const text = await data.text()
      const html = new DOMParser().parseFromString(text, 'text/html')
  
      const newCards = html.querySelectorAll('.product.product-card')
  
      const container = document.querySelector('.product-grid.container')
      const products = document.querySelectorAll('.product.product-card')
  
      setTimeout(() => {
        if (container && products.length > 0) {
          let round = 0
    
          newCards.forEach(newCard => {
            const last = document.querySelector('#dy-app-container___infinite-scroll-container')
            container.insertBefore(newCard, last)
            setTimeout(() => switchOffTileImageLoading(newCard), 2000)
            round++
          })
        }
        setTimeout(() => setGetting(false), 1000)
      }, 1000)
    }
    else {
      setLoader(false)
    }
  }

  /**
   * 
   * @param {Element} tile 
   */
  const switchOffTileImageLoading = (tile) => {
    const images = tile.querySelectorAll('img.lozad')

    if (images.length > 0) {
      images.forEach(image => {
        const src = image.getAttribute('data-src')
        image.src = src
      })
    }
  }

  handleScrollEvent()
  window.addEventListener('scroll', handleScrollEvent)

  return (
    <div className="dy-infinite-scroll-trigger" ref={ infiniteScrollBoxRef }>
      <Show when={ showLoader() }>
        <object
          data="https://www.scs.co.uk/on/demandware.static/Sites-SFRA_SCS-Site/-/en_GB/v1684919013831/images/product-details/live-chat/cta-logo-loading.svg"
          // alt="loading"
        />
      </Show>
    </div>
  )
}