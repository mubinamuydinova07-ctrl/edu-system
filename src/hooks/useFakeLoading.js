import { useEffect, useState } from 'react'

/**
 * Ko'rinish uchun "yuklanmoqda" holatini beradi.
 * delay o'zgarsa (masalan filtr almashsa) qayta yuklaydi.
 */
export default function useFakeLoading(delay = 650, deps = []) {
  const [loading, setLoading] = useState(true)
  const key = JSON.stringify(deps)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, key])

  return loading
}
