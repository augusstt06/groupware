import type React from 'react'
import { useState } from 'react'

export const useInput = (state: string) => {
  const [value, setValue] = useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setValue(value)
  }

  return { value, onChange }
}
