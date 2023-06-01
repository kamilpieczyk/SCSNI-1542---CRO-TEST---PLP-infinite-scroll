function onLocationChange() {
  location.old = location.href;

  setInterval(() => {
    if (location.old !== location.href) {
      window.dispatchEvent(new Event('location-change'))
      location.old = location.href
    }
  },500)
}

export default onLocationChange