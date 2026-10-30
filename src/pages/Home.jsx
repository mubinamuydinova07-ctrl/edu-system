import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiClock,
  FiGlobe,
  FiMonitor,
  FiPlay,
  FiSearch,
  FiStar,
  FiTrendingUp,
  FiUsers,
  FiVideo,
  FiZap,
} from 'react-icons/fi'
import CourseCard from '../components/CourseCard'
import SectionHeading from '../components/SectionHeading'
import { CourseGridSkeleton } from '../components/Skeletons'
import { categories, courses, testimonials } from '../data/courses'
import useFakeLoading from '../hooks/useFakeLoading'

const tabs = [
  { id: 'all', label: 'Barchasi' },
  { id: 'Tillar', label: 'Til kurslari' },
  { id: 'IT', label: 'IT kurslari' },
  { id: 'premium', label: 'Premium' },
]

const stats = [
  { icon: FiUsers, value: '48 000+', label: "Faol o'quvchilar" },
  { icon: FiVideo, value: '320+', label: 'Video darslar' },
  { icon: FiStar, value: '4.9/5', label: "O'rtacha reyting" },
  { icon: FiAward, value: '12', label: 'Professional mentor' },
]

const perks = [
  {
    icon: FiVideo,
    title: 'Sifatli video darslar',
    text: "4K sifat, aniq talaffuz va har dars oxirida amaliy topshiriq.",
  },
  {
    icon: FiGlobe,
    title: "O'zbek tilida tushuntirish",
    text: "Murakkab mavzular ham oddiy va tushunarli tilda, hayotiy misollar bilan.",
  },
  {
    icon: FiAward,
    title: 'Sertifikat va portfolio',
    text: "Kursni tugatgach rasmiy sertifikat va ish beruvchilarga ko'rsatadigan loyiha.",
  },
  {
    icon: FiMonitor,
    title: 'Istalgan qurilmada',
    text: "Telefon, planshet yoki noutbukda — darslarni istalgan joyda davom ettiring.",
  },
]

function Hero() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const submit = (event) => {
    event.preventDefault()
    navigate(query.trim() ? `/courses?q=${encodeURIComponent(query.trim())}` : '/courses')
  }

  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-brand-600/30 blur-[120px]" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />
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

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8 lg:py-24">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            O'zbekistondagi №1 til va IT platformasi
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
            Koreys, xitoy va ingliz tilini{' '}
            <span className="bg-gradient-to-r from-brand-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              bugun boshlang
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
            320+ video dars, jonli speaking club va IT yo'nalishlari. O'zingizga mos kursni tanlang, mutaxassis
            mentorlar bilan noldan natijagacha boring.
          </p>

          <form
            onSubmit={submit}
            className="mt-7 flex flex-col gap-2 rounded-2xl bg-white/10 p-2 ring-1 ring-white/15 backdrop-blur-md sm:flex-row"
          >
            <div className="relative flex-1">
              <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nima o'rganmoqchisiz? Masalan: Koreys tili"
                className="h-12 w-full rounded-xl border border-transparent bg-ink-900/60 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-brand-400/60 focus:bg-ink-900"
              />
            </div>
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-bold text-white transition hover:bg-brand-500"
            >
              Qidirish <FiArrowRight />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>Mashhur:</span>
            {[
              { label: 'Koreys tili', to: '/courses?language=Koreys%20tili' },
              { label: 'IELTS 7+', to: '/courses?q=IELTS' },
              { label: 'React', to: '/courses?q=React' },
              { label: 'Xitoy tili', to: '/courses?language=Xitoy%20tili' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-medium text-slate-200 transition hover:border-brand-400 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex -space-x-3">
              {[
                { initials: 'DK', color: 'bg-rose-500' },
                { initials: 'JT', color: 'bg-sky-500' },
                { initials: 'AR', color: 'bg-brand-500' },
                { initials: 'MY', color: 'bg-amber-500' },
              ].map((person) => (
                <span
                  key={person.initials}
                  className={`grid h-10 w-10 place-items-center rounded-full border-2 border-ink-950 text-[11px] font-bold text-white ${person.color}`}
                >
                  {person.initials}
                </span>
              ))}
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink-950 bg-white text-[10px] font-extrabold text-ink-900">
                +48k
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[0, 1, 2, 3, 4].map((index) => (
                  <FiStar key={index} className="fill-amber-400" />
                ))}
                <span className="ml-1 text-sm font-bold text-white">4.9</span>
              </div>
              <p className="text-xs text-slate-400">3 200+ o'quvchi sharhi</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto hidden w-full max-w-md lg:block">
          <div className="absolute -left-8 top-24 z-20 animate-float rounded-2xl bg-white p-3 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
                <FiAward />
              </span>
              <div>
                <p className="text-xs font-bold text-ink-900">Sertifikat</p>
                <p className="text-[10px] text-slate-400">Kurs yakunida</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 bottom-16 z-20 animate-float-slow rounded-2xl bg-white p-3 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-100 text-brand-600">
                <FiUsers />
              </span>
              <div>
                <p className="text-xs font-bold text-ink-900">+12 480</p>
                <p className="text-[10px] text-slate-400">bu oyda qo'shildi</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 p-6">
              <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/20 blur-xl" />
              <span className="text-5xl">🇰🇷</span>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-white/80">Bestseller kurs</p>
              <h3 className="mt-1 text-lg font-extrabold text-white">Koreys tili: 0 dan erkin suhbatgacha</h3>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-white/90">
                <FiPlay /> 148 dars · 32 soat
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {[
                { title: 'Hangul alifbosi', meta: '12 dars', done: true },
                { title: 'Kundalik suhbat', meta: '24 dars', done: true },
                { title: 'TOPIK I tayyorlov', meta: '18 dars', done: false },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl bg-white/95 px-3 py-2.5 shadow-sm"
                >
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-lg text-xs ${
                      item.done ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {item.done ? <FiCheckCircle /> : <FiPlay />}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-ink-900">{item.title}</p>
                    <p className="text-[10px] text-slate-400">{item.meta}</p>
                  </div>
                  {item.done && <span className="text-[10px] font-bold text-emerald-600">Tugatildi</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-300">
                <Icon />
              </span>
              <div>
                <p className="text-lg font-extrabold text-white">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Yo'nalishlar"
        title="O'zingizga mos yo'nalishni tanlang"
        description="Uch til va IT sohalari bo'yicha tizimli o'quv dasturlari — boshlang'ichdan mutaxassis darajasigacha."
        action={
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-900 transition hover:border-brand-300 hover:text-brand-600"
          >
            Barcha yo'nalishlar <FiArrowRight />
          </Link>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const to = category.query.language
            ? `/courses?language=${encodeURIComponent(category.query.language)}`
            : '/courses?category=IT'
          return (
            <Link
              key={category.id}
              to={to}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-transparent hover:shadow-card"
            >
              <div
                className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${category.gradient} opacity-10 blur-2xl transition group-hover:opacity-30`}
              />
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${category.gradient} text-2xl shadow-lg`}
                >
                  {category.emoji}
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink-900">{category.title}</h3>
                  <p className="text-xs text-slate-400">{category.subtitle}</p>
                </div>
                <span className="ml-auto rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-500">
                  {category.count} kurs
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-brand-600">
                <span>Kurslarni ko'rish</span>
                <FiArrowRight className="transition group-hover:translate-x-1" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function PopularCourses() {
  const [tab, setTab] = useState('all')
  const loading = useFakeLoading(600, [tab])

  const list = useMemo(() => {
    let result = [...courses]
    if (tab === 'Tillar' || tab === 'IT') result = result.filter((course) => course.category === tab)
    if (tab === 'premium') result = result.filter((course) => course.premium)
    return result
      .sort((a, b) => b.students - a.students)
      .slice(0, 8)
  }, [tab])

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Top kurslar"
          title="Eng ko'p tanlanayotgan kurslar"
          description="Minglab o'quvchilar tanlagan va yuqori baholangan kurslar to'plami."
        />

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === item.id
                  ? 'bg-ink-900 text-white shadow-lg shadow-ink-900/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
          <Link
            to="/courses"
            className="ml-auto hidden items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 sm:flex"
          >
            Barchasi <FiArrowRight />
          </Link>
        </div>

        <div className="mt-7">
          {loading ? (
            <CourseGridSkeleton count={8} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function PremiumBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-amber-400/25 blur-[100px]" />
          <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-brand-600/40 blur-[110px]" />
        </div>

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 ring-1 ring-amber-400/30">
              <FiZap /> EduNova Premium
            </span>
            <h2 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Barcha kurslarga <span className="text-amber-300">cheksiz kirish</span> — bitta obuna bilan
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
              Til kurslari, IT yo'nalishlari, jonli speaking club, shaxsiy mentor va sertifikatlar. Istalgan vaqtda
              bekor qilish imkoniyati bilan.
            </p>

            <ul className="mt-6 grid gap-2.5 text-sm text-slate-200 sm:grid-cols-2">
              {[
                'Koreys · Xitoy · Ingliz tillari',
                'Barcha IT kurslari',
                'Haftalik jonli darslar',
                'Shaxsiy mentor sessiyalari',
                'Sertifikat va portfolio',
                '14 kun pul qaytarish',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <FiCheckCircle className="shrink-0 text-emerald-400" /> {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/premium"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-extrabold text-ink-900 transition hover:bg-amber-300"
              >
                Premium'ni sinash <FiArrowRight />
              </Link>
              <div className="text-sm text-slate-300">
                <span className="text-xl font-extrabold text-white">119 000</span> so'm/oy
                <span className="ml-2 text-xs text-slate-400">7 kun bepul</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Obuna holati</span>
                <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                  Faol
                </span>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-white">Premium Plus</p>
              <p className="text-xs text-slate-400">Keyingi to'lov: 30-noyabr, 2026</p>

              <div className="mt-5 space-y-3">
                {[
                  { label: "Til kurslari", value: 78 },
                  { label: 'IT kurslar', value: 64 },
                  { label: 'Jonli darslar', value: 42 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-400 to-violet-400"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-ink-900/70 p-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-400/20 text-amber-300">
                  <FiAward />
                </span>
                <p className="text-xs text-slate-300">
                  <span className="block font-bold text-white">Sertifikat tayyor</span>
                  Koreys tili · Boshlang'ich
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Perks() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Nega EduNova?"
              title="Natijaga yo'naltirilgan ta'lim tizimi"
              description="Har bir kurs amaliyotga asoslangan. Siz shunchaki video ko'rmaysiz — real loyiha va mashqlar orqali o'rganasiz."
            />
            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-brand-600 shadow-sm">
                <FiTrendingUp className="text-xl" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink-900">87% o'quvchi natijaga erishadi</p>
                <p className="text-xs text-slate-500">Kursni tugatganlar orasida so'rovnoma natijasi</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {perks.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-200 hover:shadow-soft"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon />
                </span>
                <h3 className="mt-3 text-sm font-bold text-ink-900">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Sharhlar"
        title="O'quvchilarimiz nima deydi"
        description="Haqiqiy natijalar — imtihon ballari, ishga joylashish va erkin suhbat."
        center
      />

      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <figure
            key={item.name}
            className="relative rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-soft"
          >
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: item.rating }).map((_, index) => (
                <FiStar key={index} className="fill-amber-400 text-sm" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-slate-600">"{item.text}"</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
              <span
                className={`grid h-10 w-10 place-items-center rounded-full text-xs font-bold text-white ${item.color}`}
              >
                {item.initials}
              </span>
              <div>
                <p className="text-sm font-bold text-ink-900">{item.name}</p>
                <p className="text-xs text-slate-400">{item.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 px-6 py-12 text-center sm:px-12">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
            <FiClock /> Bugun boshlang — 14 kun kafolat
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
            Kelajagingiz uchun birinchi qadamni hoziroq qo'ying
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100">
            48 000+ o'quvchi allaqachon biz bilan o'qimoqda. Siz ham bugun bepul darslar bilan boshlang.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-brand-700 transition hover:bg-brand-50"
            >
              Kurslarni ko'rish <FiArrowRight />
            </Link>
            <Link
              to="/premium"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              Premium tariflar
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <PopularCourses />
      <PremiumBanner />
      <Perks />
      <Testimonials />
      <FinalCta />
    </>
  )
}
