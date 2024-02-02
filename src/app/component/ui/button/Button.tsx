import { type ForwardedRef, forwardRef } from 'react'

import { type ButtonProps } from '@/app/types/ui/btnTypes'

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
