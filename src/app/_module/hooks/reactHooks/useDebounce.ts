import { useEffect, useState } from 'react'

export default function useDebounce(value: string, delay: number): string {
  const [debounce, setDebounce] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(value)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value])
  return debounce
}
