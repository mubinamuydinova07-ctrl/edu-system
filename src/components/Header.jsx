import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  FiChevronDown,
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
  FiZap,
} from 'react-icons/fi'
import useShop from '../hooks/useShop'
import Logo from './Logo'

const navItems = [
  { to: '/', label: 'Bosh sahifa', end: true },
  { to: '/courses', label: 'Kurslar' },
]

const languageLinks = [
  { to: '/courses?language=Koreys%20tili', label: 'Koreys tili', flag: '🇰🇷' },
  { to: '/courses?language=Xitoy%20tili', label: 'Xitoy tili', flag: '🇨🇳' },
  { to: '/courses?language=Ingliz%20tili', label: 'Ingliz tili', flag: '🇬🇧' },
]

export default function Header() {
  const { cart, wishlist, purchased } = useShop()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const submitSearch = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/courses?q=${encodeURIComponent(trimmed)}` : '/courses')
    setQuery('')
    setOpen(false)
  }

  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100 hover:text-ink-900'
    }`

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-ink-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <p className="flex items-center gap-2">
            <FiZap className="text-amber-400" />
            <span className="font-semibold text-amber-300">Chegirma:</span>
            <span className="text-slate-300">barcha kurslarga 70% gacha arzonlashuv</span>
          </p>
          <Link to="/premium" className="hidden font-semibold text-white underline decoration-brand-400 underline-offset-4 hover:text-brand-300 sm:block">
            Premium'ni sinab ko'rish →
          </Link>
        </div>
      </div>

      <div className="border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}

            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-ink-900"
              >
                Tillar <FiChevronDown className="transition group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full w-56 translate-y-2 rounded-2xl border border-slate-100 bg-white p-2 opacity-0 shadow-card transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {languageLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
                  >
                    <span className="text-lg">{item.flag}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink to="/courses?category=IT" className={navLinkClass}>
              IT kurslar
            </NavLink>
            <NavLink
              to="/premium"
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-amber-50 text-amber-700' : 'text-amber-600 hover:bg-amber-50'
                }`
              }
            >
              <span className="grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[9px] text-white">
                ★
              </span>
              Premium
            </NavLink>
          </nav>

          <form onSubmit={submitSearch} className="ml-auto hidden max-w-xs flex-1 md:block">
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Kurs qidirish..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
              />
            </div>
          </form>

          <div className="ml-auto flex items-center gap-1 md:ml-2">
            <Link
              to="/my-learning"
              className="relative hidden rounded-lg p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-brand-600 sm:block"
              aria-label="Mening kurslarim"
            >
              <FiHeart className="text-xl" />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative rounded-lg p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-brand-600"
              aria-label="Savat"
            >
              <FiShoppingCart className="text-xl" />
              {cart.length > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link
              to="/my-learning"
              className="ml-1 hidden items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-ink-900 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 sm:flex"
            >
              <FiUser />
              {purchased.length > 0 || cart.length > 0 ? 'Kabinet' : 'Kirish'}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="rounded-lg p-2.5 text-ink-900 transition hover:bg-slate-100 lg:hidden"
              aria-label="Menyu"
              aria-expanded={open}
            >
              {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-4 lg:hidden">
            <form onSubmit={submitSearch} className="mb-4">
              <div className="relative">
                <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Kurs qidirish..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-brand-400 focus:bg-white"
                />
              </div>
            </form>

            <div className="flex flex-col gap-1">
              {[
                { to: '/', label: 'Bosh sahifa' },
                { to: '/courses', label: 'Barcha kurslar' },
                ...languageLinks,
                { to: '/courses?category=IT', label: 'IT kurslar' },
                { to: '/premium', label: 'Premium' },
                { to: '/my-learning', label: 'Mening kurslarim' },
                { to: '/cart', label: 'Savat' },
              ].map((item) => (
                <Link
                  key={item.to + item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                >
                  {item.flag && <span>{item.flag}</span>}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
