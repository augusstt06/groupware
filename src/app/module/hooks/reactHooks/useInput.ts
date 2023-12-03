import type React from 'react'
import { useState } from 'react'

import { REGISTER_PHONENUMBER } from '@/app/constant/constant'
import { type UseInputProps } from '@/app/types/moduleTypes'

export default function useInput(state: string, title?: string): UseInputProps {
  const initialValue = title === REGISTER_PHONENUMBER ? '010' : '' // 초기값 변경
  const [value, setValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    const formattedValue = title === REGISTER_PHONENUMBER ? formatPhoneNumber(value) : value

    setValue(formattedValue)
  }

  const resetValue = () => {
    setValue(initialValue)
  }

  return { value, onChange, resetValue }
}

const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/[^0-9]/g, '')
  const parts = [cleaned.slice(0, 3), cleaned.slice(3, 7), cleaned.slice(7)]

  return parts.filter(Boolean).join('-')
}
