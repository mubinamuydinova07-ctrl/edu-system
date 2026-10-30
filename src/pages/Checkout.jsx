import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiCreditCard,
  FiLock,
  FiMail,
  FiShield,
  FiSmartphone,
  FiUser,
  FiShoppingBag,
} from 'react-icons/fi'
import useShop from '../hooks/useShop'
import { formatPrice } from '../utils/format'

const methods = [
  { id: 'uzcard', label: 'Uzcard', hint: '8600 ****' },
  { id: 'visa', label: 'Visa / Mastercard', hint: '**** ****' },
  { id: 'payme', label: 'Payme', hint: 'Telefon orqali' },
  { id: 'click', label: 'Click', hint: 'Tez to\'lov' },
]

export default function Checkout() {
  const { cartCourses, cartSubtotal, purchase, showToast } = useShop()
  const navigate = useNavigate()
  const [method, setMethod] = useState('uzcard')
  const [status, setStatus] = useState('idle')
  const [orderId, setOrderId] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    card: '',
    expiry: '',
    cvc: '',
  })

  const total = cartSubtotal
  const isCard = method === 'uzcard' || method === 'visa'

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const formatCard = (value) =>
    value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim()

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 3) next.name = "To'liq ismni kiriting"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Email noto'g'ri"
    if (form.phone.replace(/\D/g, '').length < 9) next.phone = "Telefon raqamini kiriting"
    if (isCard) {
      if (form.card.replace(/\s/g, '').length !== 16) next.card = '16 xonali karta raqami'
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) next.expiry = 'MM/YY'
      if (form.cvc.length !== 3) next.cvc = '3 xona'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (event) => {
    event.preventDefault()
    if (cartCourses.length === 0) return
    if (!validate()) return

    setStatus('processing')
    const ids = cartCourses.map((course) => course.id)

    setTimeout(() => {
      purchase(ids)
      setOrderId(`EN-${Date.now().toString().slice(-8)}`)
      setStatus('done')
      showToast("To'lov muvaffaqiyatli amalga oshirildi")
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1800)
  }

  if (status === 'done') {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-soft">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-4xl text-emerald-500">
            <FiCheckCircle />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold">To'lov muvaffaqiyatli!</h1>
          <p className="mt-2 text-sm text-slate-500">
            Buyurtmangiz qabul qilindi. Kurslar "Mening kurslarim" bo'limiga qo'shildi va emailingizga chek yuborildi.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-left text-sm">
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Buyurtma raqami</span>
              <span className="font-bold text-ink-900">{orderId}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">To'langan summa</span>
              <span className="font-bold text-ink-900">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">To'lov usuli</span>
              <span className="font-bold text-ink-900">
                {methods.find((item) => item.id === method)?.label}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/my-learning"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-bold text-white transition hover:bg-brand-500"
            >
              Kurslarni boshlash <FiArrowRight />
            </Link>
            <Link
              to="/courses"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-ink-900 transition hover:bg-slate-50"
            >
              Katalogga qaytish
            </Link>
          </div>
        </div>
      </section>
    )
  }

  if (cartCourses.length === 0) {
    return (
      <section className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-2xl text-slate-400">
          <FiShoppingBag />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold">Savat bo'sh</h1>
        <p className="mt-2 text-sm text-slate-500">To'lovga o'tish uchun avval kurs tanlang.</p>
        <Link
          to="/courses"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white"
        >
          Kurslarni ko'rish <FiArrowRight />
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <Link to="/cart" className="flex items-center gap-1.5 font-semibold hover:text-brand-600">
          <FiArrowLeft /> Savatga qaytish
        </Link>
        <span>·</span>
        <span>Xavfsiz to'lov</span>
      </div>
      <h1 className="mt-3 text-3xl font-extrabold">To'lovni yakunlash</h1>

      <div className="mt-7 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <form onSubmit={submit} noValidate className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="flex items-center gap-2 text-sm font-extrabold text-ink-900">
              <FiUser className="text-brand-600" /> Shaxsiy ma'lumotlar
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-500">To'liq ism</label>
                <input
                  value={form.name}
                  onChange={(event) => setField('name', event.target.value)}
                  placeholder="Aziz Rahimov"
                  className={`mt-1.5 h-11 w-full rounded-xl border px-3 text-sm outline-none transition focus:ring-4 ${
                    errors.name
                      ? 'border-rose-300 focus:ring-rose-100'
                      : 'border-slate-200 focus:border-brand-400 focus:ring-brand-100'
                  }`}
                />
                {errors.name && <p className="mt-1 text-[11px] font-medium text-rose-500">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500">Email</label>
                <div className="relative mt-1.5">
                  <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setField('email', event.target.value)}
                    placeholder="email@example.com"
                    className={`h-11 w-full rounded-xl border pl-9 pr-3 text-sm outline-none transition focus:ring-4 ${
                      errors.email
                        ? 'border-rose-300 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-brand-400 focus:ring-brand-100'
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-[11px] font-medium text-rose-500">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500">Telefon</label>
                <div className="relative mt-1.5">
                  <FiSmartphone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={form.phone}
                    onChange={(event) => setField('phone', event.target.value)}
                    placeholder="+998 90 123 45 67"
                    className={`h-11 w-full rounded-xl border pl-9 pr-3 text-sm outline-none transition focus:ring-4 ${
                      errors.phone
                        ? 'border-rose-300 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-brand-400 focus:ring-brand-100'
                    }`}
                  />
                </div>
                {errors.phone && <p className="mt-1 text-[11px] font-medium text-rose-500">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="flex items-center gap-2 text-sm font-extrabold text-ink-900">
              <FiCreditCard className="text-brand-600" /> To'lov usuli
            </h2>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {methods.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setMethod(item.id)}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                    method === item.id
                      ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-lg ${
                      method === item.id ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <FiCreditCard />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-ink-900">{item.label}</span>
                    <span className="block text-[10px] text-slate-400">{item.hint}</span>
                  </span>
                  <span
                    className={`ml-auto grid h-4 w-4 place-items-center rounded-full border ${
                      method === item.id ? 'border-brand-600 bg-brand-600' : 'border-slate-300'
                    }`}
                  >
                    {method === item.id && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                </button>
              ))}
            </div>

            {isCard ? (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500">Karta raqami</label>
                  <input
                    value={form.card}
                    onChange={(event) => setField('card', formatCard(event.target.value))}
                    placeholder="8600 0000 0000 0000"
                    inputMode="numeric"
                    className={`mt-1.5 h-11 w-full rounded-xl border px-3 text-sm tracking-wider outline-none transition focus:ring-4 ${
                      errors.card
                        ? 'border-rose-300 focus:ring-rose-100'
                        : 'border-slate-200 focus:border-brand-400 focus:ring-brand-100'
                    }`}
                  />
                  {errors.card && <p className="mt-1 text-[11px] font-medium text-rose-500">{errors.card}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500">Amal qilish muddati</label>
                    <input
                      value={form.expiry}
                      onChange={(event) => setField('expiry', formatExpiry(event.target.value))}
                      placeholder="MM/YY"
                      inputMode="numeric"
                      className={`mt-1.5 h-11 w-full rounded-xl border px-3 text-sm outline-none transition focus:ring-4 ${
                        errors.expiry
                          ? 'border-rose-300 focus:ring-rose-100'
                          : 'border-slate-200 focus:border-brand-400 focus:ring-brand-100'
                      }`}
                    />
                    {errors.expiry && <p className="mt-1 text-[11px] font-medium text-rose-500">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500">CVC</label>
                    <input
                      value={form.cvc}
                      onChange={(event) => setField('cvc', event.target.value.replace(/\D/g, '').slice(0, 3))}
                      placeholder="123"
                      inputMode="numeric"
                      type="password"
                      className={`mt-1.5 h-11 w-full rounded-xl border px-3 text-sm outline-none transition focus:ring-4 ${
                        errors.cvc
                          ? 'border-rose-300 focus:ring-rose-100'
                          : 'border-slate-200 focus:border-brand-400 focus:ring-brand-100'
                      }`}
                    />
                    {errors.cvc && <p className="mt-1 text-[11px] font-medium text-rose-500">{errors.cvc}</p>}
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
                To'lovni tasdiqlash uchun {method === 'payme' ? 'Payme' : 'Click'} ilovasiga havola yuboriladi.
              </p>
            )}

            <p className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
              <FiLock className="text-emerald-500" /> Ma'lumotlaringiz shifrlangan va saqlanmaydi.
            </p>
          </div>

          <button
            type="submit"
            disabled={status === 'processing'}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-4 text-sm font-extrabold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'processing' ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                To'lov amalga oshirilmoqda...
              </>
            ) : (
              <>
                {formatPrice(total)} to'lash <FiArrowRight />
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-slate-400">
            "To'lash" tugmasini bosish bilan siz foydalanish shartlariga rozilik bildirasiz.
          </p>
        </form>

        <aside className="lg:sticky lg:top-32">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-extrabold text-ink-900">Buyurtmangiz</h2>
            <ul className="mt-4 space-y-3">
              {cartCourses.map((course) => (
                <li key={course.id} className="flex items-center gap-3">
                  <span
                    className={`grid h-12 w-16 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${course.cover.from} ${course.cover.to} text-xl`}
                  >
                    {course.cover.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-ink-900">{course.title}</p>
                    <p className="text-[10px] text-slate-400">{course.instructor.name}</p>
                  </div>
                  <span className="text-xs font-bold text-ink-900">{formatPrice(course.price)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Kichik jami</span>
                <span className="font-semibold text-ink-900">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Xizmat haqi</span>
                <span className="font-semibold text-emerald-600">Bepul</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3">
                <span className="font-bold text-ink-900">Jami</span>
                <span className="text-base font-extrabold text-ink-900">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-[11px] font-medium text-emerald-700">
              <FiShield /> 14 kunlik pul qaytarish kafolati
            </div>
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="mt-3 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Savatni tahrirlash
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}
