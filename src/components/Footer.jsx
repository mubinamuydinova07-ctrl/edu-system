import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
  FiCreditCard,
} from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaYoutube } from 'react-icons/fa'
import Logo from './Logo'

const currentYear = new Date().getFullYear()

const columns = [
  {
    title: 'Kurslar',
    links: [
      { label: 'Koreys tili', to: '/courses?language=Koreys%20tili' },
      { label: 'Xitoy tili', to: '/courses?language=Xitoy%20tili' },
      { label: 'Ingliz tili', to: '/courses?language=Ingliz%20tili' },
      { label: 'IT kurslar', to: '/courses?category=IT' },
      { label: 'Barcha kurslar', to: '/courses' },
    ],
  },
  {
    title: 'Platforma',
    links: [
      { label: "Premium obuna", to: '/premium' },
      { label: 'Mening kurslarim', to: '/my-learning' },
      { label: 'Savat', to: '/cart' },
      { label: 'Sertifikatlar', to: '/premium' },
    ],
  },
  {
    title: 'Yordam',
    links: [
      { label: 'Savol-javob', to: '/premium' },
      { label: "To'lov usullari", to: '/premium' },
      { label: 'Qaytarish siyosati', to: '/premium' },
      { label: 'Bog\'lanish', to: '/premium' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const subscribe = (event) => {
    event.preventDefault()
    if (!email.includes('@')) return
    setSent(true)
    setEmail('')
  }

  return (
    <footer className="mt-20 bg-ink-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,1fr)_1.5fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Koreys, xitoy, ingliz tillari va IT yo'nalishlari bo'yicha O'zbekistondagi eng zamonaviy onlayn ta'lim
              platformasi.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: FaInstagram, label: 'Instagram' },
                { icon: FaTelegramPlane, label: 'Telegram' },
                { icon: FaYoutube, label: 'YouTube' },
                { icon: FaFacebookF, label: 'Facebook' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-slate-300 transition hover:bg-brand-600 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-bold text-white">{column.title}</h4>
              <ul className="space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">Yangiliklarga obuna</h4>
            <p className="text-sm">Yangi kurslar va chegirmalar haqida birinchi bo'lib xabar oling.</p>
            <form onSubmit={subscribe} className="mt-4">
              <div className="flex overflow-hidden rounded-xl bg-white/5 p-1 ring-1 ring-white/10 focus-within:ring-brand-500">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email manzilingiz"
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-600 text-white transition hover:bg-brand-500"
                  aria-label="Obuna bo'lish"
                >
                  <FiArrowRight />
                </button>
              </div>
              {sent && <p className="mt-2 text-xs font-medium text-emerald-400">Rahmat! Obuna faollashtirildi.</p>}
            </form>

            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FiPhone className="text-brand-400" /> +998 71 200 00 00
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-brand-400" /> hello@edunova.uz
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="text-brand-400" /> Toshkent, Amir Temur 108
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>© {currentYear} EduNova. Barcha huquqlar himoyalangan.</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['UZCARD', 'HUMO', 'VISA', 'Mastercard'].map((method) => (
              <span
                key={method}
                className="flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1.5 font-semibold text-slate-300 ring-1 ring-white/10"
              >
                <FiCreditCard /> {method}
              </span>
            ))}
            <span className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1.5 font-semibold text-emerald-300 ring-1 ring-emerald-500/20">
              <FiShield /> Xavfsiz to'lov
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
