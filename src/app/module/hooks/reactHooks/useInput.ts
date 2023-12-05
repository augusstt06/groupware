import type React from 'react'
import { useEffect, useState } from 'react'

import { REGISTER_PHONENUMBER } from '@/app/constant/constant'
import { type UseInputProps } from '@/app/types/moduleTypes'

export default function useInput(
  state: string,
  isPersist: boolean,
  title?: string,
  limit?: number,
): UseInputProps {
  const initialValue = ''
  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    if (isPersist) {
      const storedValue = localStorage.getItem(title as string)
      if (storedValue?.length !== 0) {
        setValue(storedValue as string)
      }
    }
  }, [])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e

    const limitValue = limit !== undefined ? value.slice(0, limit) : value
    const formattedValue =
      title === REGISTER_PHONENUMBER ? formatPhoneNumber(limitValue) : limitValue

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
