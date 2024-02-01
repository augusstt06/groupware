/**
 * 버튼에서 필요한것
 * 1. 버튼 내용 => string과 jsx 모두 가능해야한다.
 * 2. css
 * 3. 클릭시 작동할 기능
 * 4. dom조작시 ref가 필요
 * 을 토대로 재사용성 높은 컴포넌트 제작
 */

import { type ForwardedRef, forwardRef } from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonContent: React.ReactNode
}
const Button = forwardRef((props: ButtonProps, fowardRef: ForwardedRef<HTMLButtonElement>) => {
  const { buttonContent, ...rest } = props
  return (
    <button ref={fowardRef} {...rest}>
      {buttonContent}
    </button>
  )
})
Button.displayName = 'Button'
export default Button
