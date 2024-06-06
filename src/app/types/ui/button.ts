import type React from 'react'

// basic
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonContent: React.ReactNode
}
