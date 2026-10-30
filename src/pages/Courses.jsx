import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiChevronRight, FiFilter, FiSearch, FiSliders, FiX } from 'react-icons/fi'
import CourseCard from '../components/CourseCard'
import { CourseGridSkeleton } from '../components/Skeletons'
import { courses } from '../data/courses'
import useFakeLoading from '../hooks/useFakeLoading'

const categoryOptions = [
  { value: '', label: 'Barchasi' },
  { value: 'Tillar', label: 'Til kurslari' },
  { value: 'IT', label: 'IT kurslari' },
]

const languageOptions = ['Koreys tili', 'Xitoy tili', 'Ingliz tili']
const levelOptions = ["Boshlang'ich", "O'rta", 'Yuqori']

export default function Courses() {
  const [params, setParams] = useSearchParams()
  const [mobileFilters, setMobileFilters] = useState(false)

  const q = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const languages = (params.get('language') ?? '').split(',').filter(Boolean)
  const levels = (params.get('level') ?? '').split(',').filter(Boolean)
  const price = params.get('price') ?? ''
  const premiumOnly = params.get('premium') === '1'
  const sort = params.get('sort') ?? 'popular'
  const [searchInput, setSearchInput] = useState(q)

  const loading = useFakeLoading(700, [params.toString()])

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value === '' || value === null || (Array.isArray(value) && value.length === 0)) {
      next.delete(key)
    } else {
      next.set(key, Array.isArray(value) ? value.join(',') : value)
    }
    setParams(next)
  }

  const toggleInList = (key, value, list) => {
    const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
    update(key, next)
  }

  const clearAll = () => {
    setParams(new URLSearchParams())
    setSearchInput('')
  }

  const filtered = useMemo(() => {
    let result = courses.filter((course) => {
      if (q) {
        const haystack = `${course.title} ${course.subtitle} ${course.language} ${course.instructor.name}`.toLowerCase()
        if (!haystack.includes(q.toLowerCase())) return false
      }
      if (category && course.category !== category) return false
      if (languages.length && !languages.includes(course.language)) return false
      if (levels.length && !levels.includes(course.level)) return false
      if (premiumOnly && !course.premium) return false
      if (price === 'free' && course.price !== 0) return false
      if (price === 'low' && !(course.price > 0 && course.price <= 300000)) return false
      if (price === 'mid' && !(course.price > 300000 && course.price <= 400000)) return false
      if (price === 'high' && course.price <= 400000) return false
      return true
    })

    if (sort === 'rating') result = result.sort((a, b) => b.rating - a.rating)
    else if (sort === 'price-low') result = result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-high') result = result.sort((a, b) => b.price - a.price)
    else if (sort === 'newest') result = result.sort((a, b) => b.updated.localeCompare(a.updated))
    else result = result.sort((a, b) => b.students - a.students)

    return result
  }, [q, category, languages, levels, price, premiumOnly, sort])

  const activeCount =
    (category ? 1 : 0) + languages.length + levels.length + (price ? 1 : 0) + (premiumOnly ? 1 : 0) + (q ? 1 : 0)

  const heading = q
    ? `"${q}" bo'yicha natijalar`
    : category === 'IT'
      ? 'IT va dizayn kurslari'
      : languages.length === 1
        ? `${languages[0]} kurslari`
        : 'Barcha kurslar'

  const filtersPanel = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-900">
          <FiSliders /> Yo'nalish
        </h3>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => update('category', option.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                category === option.value
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-900">Til</h3>
        <div className="space-y-2">
          {languageOptions.map((language) => (
            <label key={language} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={languages.includes(language)}
                onChange={() => toggleInList('language', language, languages)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 accent-brand-600"
              />
              {language}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-900">Daraja</h3>
        <div className="space-y-2">
          {levelOptions.map((level) => (
            <label key={level} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={levels.includes(level)}
                onChange={() => toggleInList('level', level, levels)}
                className="h-4 w-4 rounded border-slate-300 accent-brand-600"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-900">Narx</h3>
        <div className="space-y-2">
          {[
            { value: '', label: 'Barchasi' },
            { value: 'free', label: 'Faqat bepul' },
            { value: 'low', label: "300 000 so'mgacha" },
            { value: 'mid', label: "300 000 – 400 000 so'm" },
            { value: 'high', label: "400 000 so'mdan yuqori" },
          ].map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
              <input
                type="radio"
                name="price"
                checked={price === option.value}
                onChange={() => update('price', option.value)}
                className="h-4 w-4 accent-brand-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center justify-between rounded-xl bg-amber-50 px-3 py-2.5 ring-1 ring-amber-100">
        <span className="flex items-center gap-2 text-xs font-bold text-amber-700">★ Premium kurslar</span>
        <input
          type="checkbox"
          checked={premiumOnly}
          onChange={() => update('premium', premiumOnly ? '' : '1')}
          className="h-4 w-4 accent-amber-500"
        />
      </label>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 text-xs font-bold text-slate-500 transition hover:bg-slate-50"
        >
          <FiX /> Filtrlarni tozalash ({activeCount})
        </button>
      )}
    </div>
  )

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400">
            <Link to="/" className="hover:text-brand-600">
              Bosh sahifa
            </Link>
            <FiChevronRight />
            <span className="font-semibold text-slate-600">Kurslar</span>
          </nav>
          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{heading}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            {filtered.length} ta kurs topildi. Filtrlar orqali o'zingizga mosini tanlang yoki qidiruvdan foydalaning.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              update('q', searchInput.trim())
            }}
            className="mt-5 flex gap-2"
          >
            <div className="relative flex-1 max-w-lg">
              <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Kurs nomi yoki mentor..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-ink-900 px-5 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              Qidirish
            </button>
            <button
              type="button"
              onClick={() => setMobileFilters(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-ink-900 lg:hidden"
            >
              <FiFilter /> Filtr
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-32 rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-extrabold text-ink-900">
                <FiSliders className="text-brand-600" /> Filtrlar
              </h2>
              {filtersPanel}
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                <span className="font-bold text-ink-900">{filtered.length}</span> natija
                {activeCount > 0 && <span className="ml-1">· {activeCount} filtr faol</span>}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Saralash:</span>
                <select
                  value={sort}
                  onChange={(event) => update('sort', event.target.value)}
                  className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold text-ink-900 outline-none focus:border-brand-400"
                >
                  <option value="popular">Mashhurlik</option>
                  <option value="rating">Reyting</option>
                  <option value="newest">Yangi qo'shilgan</option>
                  <option value="price-low">Narx: arzondan</option>
                  <option value="price-high">Narx: qimmatdan</option>
                </select>
              </div>
            </div>

            {loading ? (
              <CourseGridSkeleton count={9} />
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-2xl text-slate-400">
                  <FiSearch />
                </div>
                <h3 className="mt-4 text-lg font-bold">Hech narsa topilmadi</h3>
                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                  Qidiruv so'zini o'zgartiring yoki filtrlarni tozalab, barcha kurslarni ko'ring.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-5 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-500"
                >
                  Filtrlarni tozalash
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {mobileFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Yopish"
            onClick={() => setMobileFilters(false)}
            className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-extrabold text-ink-900">
                <FiFilter className="text-brand-600" /> Filtrlar
              </h2>
              <button
                type="button"
                onClick={() => setMobileFilters(false)}
                className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600"
              >
                <FiX />
              </button>
            </div>
            {filtersPanel}
            <button
              type="button"
              onClick={() => setMobileFilters(false)}
              className="mt-6 w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white"
            >
              Natijalarni ko'rish ({filtered.length})
            </button>
          </div>
        </div>
      )}
    </>
  )
}
