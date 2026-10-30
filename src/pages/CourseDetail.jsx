import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  FiArrowLeft,
  FiAward,
  FiBookOpen,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiDownload,
  FiGlobe,
  FiHeart,
  FiPlay,
  FiShare2,
  FiShoppingCart,
  FiSmartphone,
  FiStar,
  FiUsers,
  FiVideo,
} from 'react-icons/fi'
import CourseCard from '../components/CourseCard'
import Rating from '../components/Rating'
import { CourseDetailSkeleton } from '../components/Skeletons'
import { courses, getCourseById, getRelatedCourses, testimonials } from '../data/courses'
import useFakeLoading from '../hooks/useFakeLoading'
import useShop from '../hooks/useShop'
import { discountPercent, formatCount, formatPrice } from '../utils/format'
import NotFound from './NotFound'

const tabs = [
  { id: 'overview', label: 'Umumiy ma\'lumot' },
  { id: 'curriculum', label: 'Dastur' },
  { id: 'instructor', label: 'Mentor' },
  { id: 'reviews', label: 'Sharhlar' },
]

const ratingBreakdown = [
  { stars: 5, percent: 78 },
  { stars: 4, percent: 15 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
]

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = getCourseById(id)
  const loading = useFakeLoading(650, [id])
  const { addToCart, cart, wishlist, toggleWishlist, isPurchased, showToast } = useShop()
  const [tab, setTab] = useState('overview')
  const [openSection, setOpenSection] = useState(0)

  if (!course) return <NotFound />

  if (loading) return <CourseDetailSkeleton />

  const related = getRelatedCourses(course, 4)
  const owned = isPurchased(course.id)
  const inCart = cart.includes(course.id)
  const liked = wishlist.includes(course.id)
  const discount = discountPercent(course.price, course.oldPrice)
  const totalLessons = course.curriculum.reduce((sum, section) => sum + section.lessons.length, 0)

  const buyNow = () => {
    if (!owned) addToCart(course.id)
    navigate('/checkout')
  }

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: course.title, url })
      } else {
        await navigator.clipboard.writeText(url)
        showToast('Havola nusxalandi')
      }
    } catch {
      showToast('Havolani nusxalab bo\'lmadi', 'info')
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-brand-600/30 blur-[120px]" />
          <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-600/20 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <Link to="/" className="hover:text-white">Bosh sahifa</Link>
            <FiChevronRight />
            <Link to="/courses" className="hover:text-white">Kurslar</Link>
            <FiChevronRight />
            <Link
              to={`/courses?language=${encodeURIComponent(course.language)}`}
              className="hover:text-white"
            >
              {course.language}
            </Link>
            <FiChevronRight />
            <span className="max-w-[220px] truncate text-slate-300">{course.title}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-brand-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  {course.category}
                </span>
                {course.premium && (
                  <span className="rounded-md bg-amber-400 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-900">
                    ★ Premium
                  </span>
                )}
                {course.badge && (
                  <span className="rounded-md border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {course.badge}
                  </span>
                )}
              </div>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
                {course.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-300">{course.subtitle}</p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <span className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-amber-400">{course.rating.toFixed(1)}</span>
                  <span className="flex text-amber-400">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <FiStar key={index} className={index < Math.round(course.rating) ? 'fill-amber-400' : ''} />
                    ))}
                  </span>
                  <span className="text-slate-400">({formatCount(course.reviews)} sharh)</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <FiUsers /> {formatCount(course.students)} o'quvchi
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <FiClock /> {course.hours} soat
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <FiGlobe /> O'zbek / Ingliz
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to={`/courses?language=${encodeURIComponent(course.language)}`}
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20"
                >
                  <FiArrowLeft /> {course.language}
                </Link>
                <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs text-slate-300 ring-1 ring-white/10">
                  <span className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold text-white ${course.instructor.color}`}>
                    {course.instructor.initials}
                  </span>
                  {course.instructor.name}
                </div>
              </div>
            </div>

            <div className="lg:row-span-2 lg:mt-0">
              <div className="overflow-hidden rounded-3xl border border-white/15 bg-white p-3 shadow-2xl">
                <div className={`relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${course.cover.from} ${course.cover.to}`}>
                  <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
                  <button
                    type="button"
                    onClick={() => showToast('Birinchi dars bepul — Premium bilan ochiladi', 'info')}
                    className="group relative grid h-16 w-16 place-items-center rounded-full bg-white/95 text-brand-600 shadow-xl transition hover:scale-110"
                    aria-label="Bepul darsni ko'rish"
                  >
                    <FiPlay className="ml-1 text-2xl" />
                  </button>
                  <span className="absolute bottom-3 left-3 rounded-md bg-black/40 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    Preview dars
                  </span>
                  <span className="absolute bottom-3 right-3 text-3xl">{course.cover.emoji}</span>
                </div>

                <div className="p-4">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-extrabold text-ink-900">{formatPrice(course.price)}</span>
                    {course.oldPrice > course.price && (
                      <span className="mb-1 text-sm text-slate-400 line-through">{formatPrice(course.oldPrice)}</span>
                    )}
                  </div>
                  {discount > 0 && (
                    <p className="mt-1 text-xs font-bold text-rose-600">
                      -{discount}% chegirma · {Math.ceil((course.oldPrice - course.price) / 86400 / 1000)} kun qoldi
                    </p>
                  )}

                  <div className="mt-4 space-y-2">
                    {owned ? (
                      <Link
                        to="/my-learning"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
                      >
                        <FiCheckCircle /> Davom etish
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={buyNow}
                          className="w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white transition hover:bg-brand-500"
                        >
                          Hoziroq sotib olish
                        </button>
                        <button
                          type="button"
                          onClick={() => addToCart(course.id)}
                          className={`flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition ${
                            inCart
                              ? 'border-slate-200 bg-slate-50 text-slate-500'
                              : 'border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white'
                          }`}
                        >
                          <FiShoppingCart /> {inCart ? 'Savatda bor' : "Savatga qo'shish"}
                        </button>
                      </>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(course.id)}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-xs font-semibold transition ${
                        liked ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <FiHeart className={liked ? 'fill-rose-500' : ''} /> Sevimlilar
                    </button>
                    <button
                      type="button"
                      onClick={share}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-50"
                    >
                      <FiShare2 /> Ulashish
                    </button>
                  </div>

                  <p className="mt-4 text-center text-[11px] text-slate-400">
                    14 kun ichida pul qaytarish kafolati
                  </p>

                  <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-xs text-slate-600">
                    {[
                      { icon: FiVideo, text: `${course.hours} soat video` },
                      { icon: FiBookOpen, text: `${course.lessons} dars va mashqlar` },
                      { icon: FiDownload, text: 'Yuklab olinadigan materiallar' },
                      { icon: FiSmartphone, text: 'Telefon va TV' },
                      { icon: FiAward, text: 'Tugatish sertifikati' },
                      { icon: FiGlobe, text: "Umrbod kirish huquqi" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2">
                        <Icon className="text-slate-400" /> {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid max-w-xl grid-cols-3 gap-3">
                {[
                  { label: 'Daraja', value: course.level },
                  { label: 'Yangilangan', value: course.updated },
                  { label: 'Darslar', value: `${totalLessons}+` },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">{item.label}</p>
                    <p className="mt-1 text-sm font-bold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    tab === item.id ? 'bg-ink-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {tab === 'overview' && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h2 className="text-lg font-extrabold">Kurs haqida</h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{course.description}</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h2 className="text-lg font-extrabold">Nima o'rganasiz?</h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {course.outcomes.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <FiCheck className="mt-0.5 shrink-0 text-emerald-500" /> {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                      <h3 className="text-sm font-extrabold text-ink-900">Talablar</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {course.requirements.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                      <h3 className="text-sm font-extrabold text-ink-900">Kim uchun?</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        {[
                          `${course.level} darajadagi o'quvchilar`,
                          "Natijani tez ko'rishni xohlovchilar",
                          "Mustaqil o'rganishni rejalashtirganlar",
                          'Sertifikat va portfolio kerak bo\'lganlar',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'curriculum' && (
                <div className="rounded-2xl border border-slate-200 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 p-5">
                    <h2 className="text-lg font-extrabold">Kurs dasturi</h2>
                    <p className="text-xs text-slate-400">
                      {course.curriculum.length} bo'lim · {course.lessons} dars · {course.hours} soat
                    </p>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {course.curriculum.map((section, index) => (
                      <div key={section.title}>
                        <button
                          type="button"
                          onClick={() => setOpenSection(openSection === index ? -1 : index)}
                          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
                        >
                          <span className="flex items-center gap-3">
                            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-xs font-bold text-brand-600">
                              {index + 1}
                            </span>
                            <span className="text-sm font-bold text-ink-900">{section.title}</span>
                          </span>
                          <span className="flex items-center gap-3 text-xs text-slate-400">
                            {section.lessons.length} dars
                            <FiChevronDown className={`transition ${openSection === index ? 'rotate-180' : ''}`} />
                          </span>
                        </button>
                        {openSection === index && (
                          <ul className="space-y-1 bg-slate-50/70 px-5 pb-4 pt-1">
                            {section.lessons.map((lesson) => (
                              <li
                                key={lesson.title}
                                className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm text-slate-600"
                              >
                                <span className="flex items-center gap-2">
                                  <FiPlay className="text-xs text-brand-500" /> {lesson.title}
                                  {lesson.preview && (
                                    <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                                      Preview
                                    </span>
                                  )}
                                </span>
                                <span className="text-xs text-slate-400">{lesson.duration}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'instructor' && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <span
                      className={`grid h-16 w-16 place-items-center rounded-2xl text-lg font-extrabold text-white ${course.instructor.color}`}
                    >
                      {course.instructor.initials}
                    </span>
                    <div>
                      <h2 className="text-lg font-extrabold">{course.instructor.name}</h2>
                      <p className="text-sm text-slate-500">{course.instructor.title}</p>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { label: 'Reyting', value: course.rating.toFixed(1) },
                      { label: "O'quvchilar", value: formatCount(course.students) },
                      { label: 'Kurslar', value: 6 },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl bg-slate-50 p-3 text-center">
                        <p className="text-base font-extrabold text-ink-900">{item.value}</p>
                        <p className="text-[11px] text-slate-400">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-slate-600">
                    {course.instructor.name} {course.language} va zamonaviy ta'lim metodikasi bo'yicha mutaxassis.
                    Uning darslari amaliyotga asoslangan bo'lib, har bir mavzu real misollar bilan tushuntiriladi.
                    Mentorlikda eng muhim narsa — o'quvchining mustaqil fikrlashini rivojlantirish.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {['Video darslar', 'Amaliy topshiriqlar', 'Jonli sessiyalar', 'Shaxsiy feedback'].map((item) => (
                      <span key={item} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'reviews' && (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
                      <div className="text-center">
                        <p className="text-5xl font-extrabold text-ink-900">{course.rating.toFixed(1)}</p>
                        <Rating value={course.rating} className="mt-2" />
                        <p className="mt-1 text-xs text-slate-400">{formatCount(course.reviews)} sharh</p>
                      </div>
                      <div className="space-y-2">
                        {ratingBreakdown.map((row) => (
                          <div key={row.stars} className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="w-10 shrink-0">{row.stars} yulduz</span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-amber-400"
                                style={{ width: `${row.percent}%` }}
                              />
                            </div>
                            <span className="w-8 text-right">{row.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {testimonials.map((review) => (
                    <div key={review.name} className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="flex items-center gap-3">
                        <span className={`grid h-10 w-10 place-items-center rounded-full text-xs font-bold text-white ${review.color}`}>
                          {review.initials}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-ink-900">{review.name}</p>
                          <p className="text-[11px] text-slate-400">{review.role}</p>
                        </div>
                        <div className="ml-auto flex text-amber-400">
                          {Array.from({ length: review.rating }).map((_, index) => (
                            <FiStar key={index} className="fill-amber-400 text-xs" />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside>
            <div className="sticky top-32 space-y-4">
              <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Premium imkoniyati</span>
                <p className="mt-2 text-sm font-bold text-ink-900">Bu kurs Premium obunaga kiradi</p>
                <p className="mt-1 text-xs text-slate-600">
                  119 000 so'm/oy evaziga 100+ kursga cheksiz kirish.
                </p>
                <Link
                  to="/premium"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 hover:text-amber-800"
                >
                  Batafsil <FiChevronRight />
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-extrabold text-ink-900">Kursdan natija</h3>
                <div className="mt-3 space-y-3">
                  {[
                    { label: "Tugatish darajasi", value: '87%' },
                    { label: "O'rtacha baho", value: `${course.rating}/5` },
                    { label: 'Sertifikat', value: 'Bor' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="font-bold text-ink-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold">Shu yo'nalishdagi boshqa kurslar</h2>
              <p className="mt-1 text-sm text-slate-500">
                {courses.length} kurs ichidan sizga mosini tanlang
              </p>
            </div>
            <Link to="/courses" className="hidden items-center gap-1.5 text-sm font-bold text-brand-600 sm:flex">
              Barchasi <FiChevronRight />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <CourseCard key={item.id} course={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
