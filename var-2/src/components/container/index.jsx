import './style.scss'
import { createEffect, createSignal, Show } from 'solid-js'

export default () => {
  const [count, setCount] = createSignal(1);
  const [resultsNo, setResultsNo] = createSignal(0);
  const [tilesNo, setTilesNo] = createSignal(0);
  const [getting, setGetting] = createSignal(false);
  const [showLoader, setLoader] = createSignal(true);

  let infiniteScrollBoxRef;

  const handleClickButton = () => {
    if (infiniteScrollBoxRef && !getting()) {
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

  const getNextLink = (number) => {
    let link = ''

    const a = document.querySelector('[data-page-number="2"]');

    if (a) {
      let href = a.getAttribute('data-url')
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
          const last = products[products.length+round-1]
    
          newCards.forEach(newCard => {
            container.insertBefore(newCard, last.nextSibling)
            setTimeout(() => switchOffTileImageLoading(newCard), 1000)
            round++
          })
        }
        setGetting(false);
        getResultNumber();
      }, 1000)
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

  const getResultNumber = () => {
    const resultBox = document.querySelector('.filter-options__resultcount')
    const tiles = document.dyQuerySelectorAll('.product.product-card.product-tile--sofa')

    setTilesNo(tiles.length - 1)

    if (resultBox) {
      /**
       * @type {string | number}
       */
      let text = resultBox.textContent.replace(' results', '')
      text = Number(text)

      setResultsNo(text)
    }
  }

  getResultNumber()

  // createEffect(() => {
  //   if (getting())
  //     document.body.style.overflow = 'hidden'
  //   else
  //     document.body.style.overflow = 'auto'
  // })

  createEffect(() => {
    const max = getMaxNumber();
    if (count() >= max) {
      setLoader(false)
    }
  })

  return (
    <div className="dy-infinite-scroll-trigger" ref={ infiniteScrollBoxRef }>
      <p>
        You’ve viewed { tilesNo() } of { resultsNo().toLocaleString() } products
      </p>

      <Show when={ showLoader() || getting() }>
        <button
          onClick={ handleClickButton }
        >
          <Show
            when={ getting() }
            fallback={ () => 'load more' }
          >
            <object
              data="https://www.scs.co.uk/on/demandware.static/Sites-SFRA_SCS-Site/-/en_GB/v1684919013831/images/product-details/live-chat/cta-logo-loading.svg"
              // alt="loading"
            />
          </Show>
        </button>
      </Show>
    </div>
  )
}