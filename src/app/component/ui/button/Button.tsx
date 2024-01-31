/**
 * 버튼에서 필요한것
 * 1. 버튼 내용
 * 2. css
 * 3. 클릭시 작동할 기능
 */

import { type ForwardedRef, forwardRef, type ReactNode } from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  content: string | ReactNode
}
const Button = forwardRef((props: ButtonProps, fowardRef: ForwardedRef<HTMLButtonElement>) => {
  const { content } = props
  return (
    <button ref={fowardRef} className={props.className} onClick={props.onClick}>
      {content}
    </button>
  )
})
Button.displayName = 'Button'
export default Button
