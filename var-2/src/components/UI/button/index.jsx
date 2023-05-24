import { createSignal } from 'solid-js'
import './style.scss'

/**
 * @param {{
 * text: string;
 * onClick: Function;
 * }} props
 */
export default ({ children, onClick }) => {
  return (
    <button className='dy-ui-button' onClick={onClick}>
      { children }
    </button>
  )
}