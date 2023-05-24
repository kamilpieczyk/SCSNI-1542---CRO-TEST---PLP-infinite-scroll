import './style.scss'

/**
 * @param {{
 * desktopOnly: boolean;
 * mobileOnly: boolean;
 * height: string;
 * margin: string;
 * }} props
 */
export default ({ desktopOnly, height, margin, mobileOnly }) => {
  return (
    <div className={`dy-vertical-devider ${desktopOnly && 'dy-mobile-hidden'} ${mobileOnly && 'dy-desktop-hidden'}`} style={{ height: height? height : '100%', margin: margin ? '0 '+margin : '0'}}></div>
  )
}