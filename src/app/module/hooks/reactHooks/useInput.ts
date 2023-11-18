import type React from 'react'
import { useState } from 'react'

import { REGISTER_PHONENUMBER } from '@/app/constant/constant'
import { type UseInputProps } from '@/app/types/moduleTypes'

export default function useInput(state: string, title?: string): UseInputProps {
  const [value, setValue] = useState(title === REGISTER_PHONENUMBER ? '010-' : '')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setValue(value)
  }
  const resetValue = () => {
    setValue('')
  }

  return { value, onChange, resetValue }
}
