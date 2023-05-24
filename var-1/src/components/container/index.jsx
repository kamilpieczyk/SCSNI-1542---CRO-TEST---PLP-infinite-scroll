import './style.scss'
import { createEffect, createSignal, Show } from 'solid-js'

export default () => {
  const [count, setCount] = createSignal(1);
  const [getting, setGetting] = createSignal(false);
  const [showLoader, setLoader] = createSignal(true);

  let infiniteScrollBoxRef;

  const handleScrollEvent = () => {
    if (infiniteScrollBoxRef && infiniteScrollBoxRef.getBoundingClientRect().top < 500 && infiniteScrollBoxRef.getBoundingClientRect().top > -100 && !getting()) {
      handleGetMoreTiles()
    }
  }

  const getMaxNumber = () => {
    let maxNo = 1;
    const links = document.querySelectorAll('.page-link');

    if (links) {
      const maxLink = links[links.length-2];
      maxNo = Number(maxLink.getAttribute('data-page-number'));
    }

    return maxNo
  }

  const handleGetMoreTiles = async () => {
    const max = getMaxNumber();

    if (count() < max) {
      setGetting(true);
      setCount(prev => prev+1)
      const url = `https://www.scs.co.uk/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Search-UpdateGrid?cgid=fabric-sofas&page=${count()}`
  
      const data = await fetch(url)
      const text = await data.text()
      const html = new DOMParser().parseFromString(text, 'text/html')
  
      const newCards = html.querySelectorAll('.product.product-card')
  
      const container = document.querySelector('.product-grid.container')
      const products = document.querySelectorAll('.product.product-card')
  
      setTimeout(() => {
        if (container && products.length > 0) {
          let round = 0
          const last = products[products.length+round-1]
    
          newCards.forEach(newCard => {
            container.insertBefore(newCard, last.nextSibling)
            setTimeout(() => switchOffTileImageLoading(newCard), 1000)
            round++
          })
        }
        setGetting(false);
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
    const image = tile.querySelector('.tile-image img')

    if (image) {
      const src = image.getAttribute('data-src')
      image.src = src
    }
  }

  createEffect(() => {
    if (getting())
      document.body.style.overflow = 'hidden'
    else
      document.body.style.overflow = 'auto'
  })

  handleScrollEvent()
  window.addEventListener('scroll', handleScrollEvent)

  return (
    <div className="dy-infinite-scroll-trigger" ref={ infiniteScrollBoxRef }>
      <Show when={ showLoader() }>
        <img
          src="https://www.scs.co.uk/on/demandware.static/Sites-SFRA_SCS-Site/-/en_GB/v1684919013831/images/product-details/live-chat/cta-logo-loading.svg"
          alt="loading"
        />
      </Show>
    </div>
  )
}