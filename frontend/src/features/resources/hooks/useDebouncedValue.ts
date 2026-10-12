import { useEffect, useState } from 'react'

/** Returns `value` delayed by `delay` ms; used to avoid a request per keystroke. */
export const useDebouncedValue = <T>(value: T, delay = 300): T => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
