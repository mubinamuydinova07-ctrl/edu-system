import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiCheckCircle } from 'react-icons/fi'
import { courses } from '../data/courses'
import { ShopContext } from './shopContext'

const STORAGE_KEY = 'edunova-state-v1'

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export default function ShopProvider({ children }) {
  const [saved] = useState(readStorage)

  const [cart, setCart] = useState(() => saved?.cart ?? [])
  const [purchased, setPurchased] = useState(() => saved?.purchased ?? [])
  const [wishlist, setWishlist] = useState(() => saved?.wishlist ?? [])
  const [plan, setPlan] = useState(() => saved?.plan ?? null)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, purchased, wishlist, plan }))
  }, [cart, purchased, wishlist, plan])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const showToast = useCallback((message, tone = 'success') => {
    clearTimeout(toastTimer.current)
    setToast({ message, tone })
    toastTimer.current = setTimeout(() => setToast(null), 2800)
  }, [])

  const addToCart = useCallback(
    (courseId) => {
      if (purchased.includes(courseId)) {
        showToast("Bu kurs allaqachon sizning kutubxonangizda", 'info')
        return false
      }
      let added = false
      setCart((prev) => {
        if (prev.includes(courseId)) return prev
        added = true
        return [...prev, courseId]
      })
      showToast(added ? "Kurs savatga qo'shildi" : 'Kurs allaqachon savatda', added ? 'success' : 'info')
      return added
    },
    [purchased, showToast],
  )

  const removeFromCart = useCallback((courseId) => {
    setCart((prev) => prev.filter((id) => id !== courseId))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback((courseId) => {
    setWishlist((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]))
  }, [])

  const purchase = useCallback(
    (ids) => {
      setPurchased((prev) => [...new Set([...prev, ...ids])])
      setCart((prev) => prev.filter((id) => !ids.includes(id)))
    },
    [],
  )

  const subscribePlan = useCallback(
    (planId) => {
      setPlan(planId)
      if (planId !== 'free') {
        const allIds = courses.filter((course) => course.price > 0).map((course) => course.id)
        setPurchased((prev) => [...new Set([...prev, ...allIds])])
      }
    },
    [],
  )

  const isPurchased = useCallback((id) => purchased.includes(id) || Boolean(plan && plan !== 'free'), [purchased, plan])

  const cartCourses = useMemo(
    () => cart.map((id) => courses.find((course) => course.id === id)).filter(Boolean),
    [cart],
  )

  const cartSubtotal = useMemo(
    () => cartCourses.reduce((sum, course) => sum + course.price, 0),
    [cartCourses],
  )

  const value = useMemo(
    () => ({
      cart,
      cartCourses,
      cartSubtotal,
      purchased,
      wishlist,
      plan,
      isPurchased,
      addToCart,
      removeFromCart,
      clearCart,
      toggleWishlist,
      purchase,
      subscribePlan,
      showToast,
    }),
    [
      cart,
      cartCourses,
      cartSubtotal,
      purchased,
      wishlist,
      plan,
      isPurchased,
      addToCart,
      removeFromCart,
      clearCart,
      toggleWishlist,
      purchase,
      subscribePlan,
      showToast,
    ],
  )

  return (
    <ShopContext.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 animate-[float_0.4s_ease-out] sm:left-auto sm:right-6 sm:translate-x-0">
          <div
            className={`flex items-start gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white shadow-2xl ${
              toast.tone === 'info' ? 'bg-ink-900' : 'bg-emerald-600'
            }`}
          >
            <FiCheckCircle className="mt-0.5 shrink-0 text-lg" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </ShopContext.Provider>
  )
}
