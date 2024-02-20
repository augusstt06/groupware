import type React from 'react'
import { useState } from 'react'

import { REGISTER_PHONENUMBER_EN } from '@/app/constant/constant'
import { type UseInputProps } from '@/app/types/moduleTypes'

export default function useInput(state: string, title?: string, limit?: number): UseInputProps {
  const [value, setValue] = useState(state)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e

    const limitValue = limit !== undefined ? value.slice(0, limit) : value
    const formattedValue =
      title === REGISTER_PHONENUMBER_EN ? formatPhoneNumber(limitValue) : limitValue

    setValue(formattedValue)
  }

  const resetValue = () => {
    setValue('')
  }
  const setString = (data: string) => {
    setValue(data)
  }

  return { value, onChange, resetValue, setString }
}

const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/[^0-9]/g, '')
  const parts = [cleaned.slice(0, 3), cleaned.slice(3, 7), cleaned.slice(7)]

  return parts.filter(Boolean).join('-')
}
