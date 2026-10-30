import { Link, useLocation } from 'react-router-dom'
import { FiArrowLeft, FiCompass, FiSearch } from 'react-icons/fi'

export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-brand-600/30 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-violet-600/25 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 75%)',
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <p className="bg-gradient-to-r from-brand-300 via-violet-300 to-cyan-300 bg-clip-text text-[7rem] font-extrabold leading-none text-transparent sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Sahifa topilmadi</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
          {pathname} manzili mavjud emas yoki o'chirilgan bo'lishi mumkin. Keling, sizni to'g'ri yo'nalishga
          qaytaramiz.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-500"
          >
            <FiArrowLeft /> Bosh sahifaga
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
          >
            <FiCompass /> Kurslarni ko'rish
          </Link>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            const value = new FormData(event.currentTarget).get('q')
            window.location.href = `/courses?q=${encodeURIComponent(value ?? '')}`
          }}
          className="mt-8 w-full max-w-sm"
        >
          <div className="flex overflow-hidden rounded-xl bg-white/10 p-1 ring-1 ring-white/15 focus-within:ring-brand-400">
            <div className="relative flex-1">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="q"
                placeholder="Kurs qidirish..."
                className="h-10 w-full bg-transparent pl-9 pr-2 text-sm text-white outline-none placeholder:text-slate-400"
              />
            </div>
            <button type="submit" className="rounded-lg bg-white px-4 text-xs font-bold text-ink-900">
              Qidirish
            </button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[
            { label: 'Koreys tili', to: '/courses?language=Koreys%20tili' },
            { label: 'Xitoy tili', to: '/courses?language=Xitoy%20tili' },
            { label: 'Ingliz tili', to: '/courses?language=Ingliz%20tili' },
            { label: 'IT kurslar', to: '/courses?category=IT' },
            { label: 'Premium', to: '/premium' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-brand-400 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
