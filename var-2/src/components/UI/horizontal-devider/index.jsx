import './style.scss'

/**
 * @param {{
 * desktopOnly: boolean;
 * mobileOnly: boolean;
 * width: string;
 * margin: string;
 * }} props
 */
export default ({ desktopOnly, mobileOnly, width, margin }) => {
  return (
    <div className={`dy-horizontal-devider ${desktopOnly && 'dy-mobile-hidden'} ${mobileOnly && 'dy-desktop-hidden'}`} style={{ width: width? width : '100%', margin: margin ? margin+' auto' : '0'}}></div>
  )
}