import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiArrowRight,
  FiCheckCircle,
  FiGift,
  FiShoppingBag,
  FiShield,
  FiTag,
  FiTrash2,
  FiX,
  FiZap,
} from 'react-icons/fi'
import CourseCard from '../components/CourseCard'
import { courses } from '../data/courses'
import useShop from '../hooks/useShop'
import { discountPercent, formatPrice } from '../utils/format'

const coupons = {
  EDU10: 0.1,
  NOVA20: 0.2,
}

export default function Cart() {
  const { cartCourses, cartSubtotal, removeFromCart, showToast } = useShop()
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState(null)
  const navigate = useNavigate()

  const discountRate = applied ? coupons[applied] : 0
  const discount = Math.round(cartSubtotal * discountRate)
  const total = cartSubtotal - discount
  const saved = cartCourses.reduce((sum, course) => sum + Math.max(course.oldPrice - course.price, 0), 0)
  const recommended = courses
    .filter((course) => !cartCourses.some((item) => item.id === course.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

  const applyCoupon = (event) => {
    event.preventDefault()
    const normalized = code.trim().toUpperCase()
    if (coupons[normalized]) {
      setApplied(normalized)
      showToast(`${normalized} kuponi qo'llanildi: -${coupons[normalized] * 100}%`)
    } else {
      setApplied(null)
      showToast('Kupon kodi noto\'g\'ri yoki muddati tugagan', 'info')
    }
  }

  if (cartCourses.length === 0) {
    return (
      <>
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand-50 text-3xl text-brand-500">
            <FiShoppingBag />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold">Savatingiz hozircha bo'sh</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Kurslar katalogidan o'zingizga mosini tanlang va savatga qo'shing. Tanlangan kurslar shu yerda saqlanadi.
          </p>
          <Link
            to="/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            Kurslarni ko'rish <FiArrowRight />
          </Link>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <h2 className="text-xl font-extrabold">Sizga yoqishi mumkin</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold">Savat</h1>
      <p className="mt-1 text-sm text-slate-500">{cartCourses.length} ta kurs tanlangan</p>

      <div className="mt-7 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="space-y-4">
          {cartCourses.map((course) => {
            const discountPct = discountPercent(course.price, course.oldPrice)
            return (
              <div
                key={course.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row"
              >
                <Link
                  to={`/courses/${course.id}`}
                  className={`relative grid h-24 w-full shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br ${course.cover.from} ${course.cover.to} sm:h-24 sm:w-36`}
                >
                  <span className="text-4xl">{course.cover.emoji}</span>
                </Link>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to={`/courses/${course.id}`} className="text-sm font-bold text-ink-900 hover:text-brand-600">
                        {course.title}
                      </Link>
                      <p className="mt-1 text-xs text-slate-400">
                        {course.instructor.name} · {course.hours} soat · {course.level}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        removeFromCart(course.id)
                        showToast('Kurs savatdan olib tashlandi', 'info')
                      }}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                      aria-label="Olib tashlash"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {course.badge && (
                      <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-600">
                        {course.badge}
                      </span>
                    )}
                    {discountPct > 0 && (
                      <span className="rounded bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                        -{discountPct}%
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <span className="text-lg font-extrabold text-ink-900">{formatPrice(course.price)}</span>
                      {course.oldPrice > course.price && (
                        <span className="ml-2 text-xs text-slate-400 line-through">{formatPrice(course.oldPrice)}</span>
                      )}
                    </div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="text-xs font-bold text-brand-600 hover:text-brand-700"
                    >
                      Batafsil
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            ← Xaridni davom ettirish
          </Link>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-32">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-extrabold text-ink-900">Buyurtma xulosasi</h2>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Kurslar narxi</span>
                <span className="font-semibold text-ink-900">{formatPrice(cartSubtotal)}</span>
              </div>
              {saved > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Chegirma tejadi</span>
                  <span className="font-semibold text-emerald-600">-{formatPrice(saved)}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span className="flex items-center gap-1.5">
                    Kupon <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">{applied}</span>
                  </span>
                  <span className="font-semibold text-emerald-600">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-100 pt-3 text-base">
                <span className="font-bold text-ink-900">Jami</span>
                <span className="font-extrabold text-ink-900">{formatPrice(total)}</span>
              </div>
            </div>

            <form onSubmit={applyCoupon} className="mt-4">
              <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <FiTag /> Kupon kodi
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="EDU10"
                  className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 text-sm uppercase outline-none focus:border-brand-400"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-slate-100 px-4 text-xs font-bold text-ink-900 transition hover:bg-slate-200"
                >
                  Qo'llash
                </button>
              </div>
            </form>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="mt-4 w-full rounded-xl bg-brand-600 py-3 text-sm font-extrabold text-white transition hover:bg-brand-500"
            >
              To'lovga o'tish
            </button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <FiShield className="text-emerald-500" /> 256-bit shifrlangan xavfsiz to'lov
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
            <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-700">
              <FiZap /> Tejash imkoniyati
            </span>
            <p className="mt-2 text-sm font-bold text-ink-900">Premium obuna bilan 100+ kurs ochiladi</p>
            <p className="mt-1 text-xs text-slate-600">
              Bitta obuna narxi — 119 000 so'm/oy. Alohida sotib olishdan ancha arzon.
            </p>
            <Link
              to="/premium"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 hover:text-amber-800"
            >
              Tariflarni ko'rish <FiArrowRight />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <FiGift className="text-brand-500" /> Sovg'a qilish
            </p>
            <p className="mt-1 text-xs text-slate-400">Kursni do'stingizga sovg'a qilishingiz mumkin.</p>
          </div>
        </aside>
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-extrabold">Savatga qo'shishingiz mumkin</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {applied && (
        <div className="fixed bottom-5 left-5 hidden items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-emerald-600 shadow-card xl:flex">
          <FiCheckCircle /> {applied} faol
          <button type="button" onClick={() => setApplied(null)} aria-label="Kuponni olib tashlash">
            <FiX />
          </button>
        </div>
      )}
    </section>
  )
}
