import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiPlay,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CourseCard from '../components/CourseCard'
import { courses } from '../data/courses'
import useFakeLoading from '../hooks/useFakeLoading'
import useShop from '../hooks/useShop'
import { formatPrice } from '../utils/format'

const tabs = [
  { id: 'all', label: 'Barcha kurslar' },
  { id: 'Tillar', label: 'Til kurslari' },
  { id: 'IT', label: 'IT kurslari' },
  { id: 'wishlist', label: 'Sevimlilar' },
]

export default function MyLearning() {
  const { purchased, wishlist, plan, isPurchased, showToast } = useShop()
  const [tab, setTab] = useState('all')
  const loading = useFakeLoading(600, [tab])

  const myCourses = useMemo(() => courses.filter((course) => isPurchased(course.id) || purchased.includes(course.id)), [purchased, isPurchased])
  const wishCourses = useMemo(() => courses.filter((course) => wishlist.includes(course.id)), [wishlist])

  const visible = useMemo(() => {
    if (tab === 'wishlist') return wishCourses
    if (tab === 'all') return myCourses
    return myCourses.filter((course) => course.category === tab)
  }, [tab, myCourses, wishCourses])

  const totalHours = myCourses.reduce((sum, course) => sum + course.hours, 0)

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold">Mening kurslarim</h1>
              <p className="mt-1 text-sm text-slate-500">
                Xarid qilgan kurslaringiz, progress va sertifikatlar shu yerda.
              </p>
            </div>
            {plan && plan !== 'free' ? (
              <span className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                ★ {plan === 'pro' ? 'Pro' : 'Plus'} obuna faol
              </span>
            ) : (
              <Link
                to="/premium"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-brand-500"
              >
                Premium'ga o'tish
              </Link>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: FiBookOpen, value: myCourses.length, label: 'Kurslar' },
              { icon: FiClock, value: `${totalHours} soat`, label: 'Video' },
              { icon: FiAward, value: 2, label: 'Sertifikat' },
              { icon: FiTrendingUp, value: '64%', label: "O'rtacha progress" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-ink-900">{value}</p>
                  <p className="text-[11px] text-slate-400">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === item.id ? 'bg-ink-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
              }`}
            >
              {item.label}
              {item.id === 'wishlist' && wishCourses.length > 0 && (
                <span className="ml-2 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {wishCourses.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <Skeleton height={130} borderRadius={12} baseColor="#e9edf6" highlightColor="#f5f8ff" />
                  <div className="mt-4">
                    <Skeleton height={16} baseColor="#e9edf6" highlightColor="#f5f8ff" />
                  </div>
                  <div className="mt-3">
                    <Skeleton width="60%" height={12} baseColor="#e9edf6" highlightColor="#f5f8ff" />
                  </div>
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-2xl text-brand-500">
                {tab === 'wishlist' ? <FiHeart /> : <FiPlay />}
              </div>
              <h2 className="mt-4 text-lg font-bold">
                {tab === 'wishlist' ? "Sevimlilar ro'yxati bo'sh" : "Hali kurs sotib olmadingiz"}
              </h2>
              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                {tab === 'wishlist'
                  ? "Yoqqan kurslarni yurakcha belgisi bilan saqlab qo'ying."
                  : "Katalogdan kurs tanlang yoki Premium obuna orqali barcha kurslarni oching."}
              </p>
              <Link
                to="/courses"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
              >
                Kurslarni ko'rish
              </Link>
            </div>
          ) : tab === 'wishlist' ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visible.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((course, index) => {
                const progress = Math.min(88, 14 + ((index * 23) % 70))
                return (
                  <article
                    key={course.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-card"
                  >
                    <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${course.cover.from} ${course.cover.to}`}>
                      <span className="text-5xl drop-shadow">{course.cover.emoji}</span>
                      <span className="absolute left-3 top-3 rounded-md bg-black/30 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
                        {course.language}
                      </span>
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold text-ink-900">
                        <FiCheckCircle className="text-emerald-500" /> Sotib olingan
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold text-ink-900">{course.title}</h3>
                      <p className="mt-1 text-xs text-slate-400">{course.instructor.name}</p>

                      <div className="mt-3">
                        <div className="flex justify-between text-[11px] font-semibold">
                          <span className="text-slate-500">{progress}% tugatildi</span>
                          <span className="text-brand-600">{course.lessons} dars</span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <FiClock /> {course.hours} soat
                        </span>
                        <span className="flex items-center gap-1">
                          <FiUsers /> {course.students.toLocaleString('ru-RU')}
                        </span>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Link
                          to={`/courses/${course.id}`}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-600 py-2.5 text-xs font-bold text-white transition hover:bg-brand-500"
                        >
                          <FiPlay /> Davom etish
                        </Link>
                        <button
                          type="button"
                          onClick={() => showToast('Sertifikat kursni 100% tugatgach ochiladi', 'info')}
                          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                          aria-label="Sertifikat"
                        >
                          <FiAward />
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-8 sm:px-10">
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-brand-600/40 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-300">Keyingi qadam</p>
              <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                Yangi til yoki IT yo'nalishini qo'shing
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {myCourses.length > 0
                  ? `Sizda ${myCourses.length} ta kurs bor. Premium bilan 100+ kursga kirish ochiladi.`
                  : "Premium obuna bilan barcha kurslar bir zumda ochiladi."}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/courses"
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-ink-900 transition hover:bg-slate-100"
              >
                Katalog
              </Link>
              <Link
                to="/premium"
                className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
              >
                Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {myCourses.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 pb-10 text-xs text-slate-400 sm:px-6 lg:px-8">
          Jami xarid: {formatPrice(myCourses.reduce((sum, course) => sum + course.price, 0))} · {myCourses.length} kurs
        </div>
      )}
    </>
  )
}
