import { Link } from 'react-router-dom'
import { FiBookOpen, FiCheck, FiClock, FiHeart, FiShoppingCart, FiUsers } from 'react-icons/fi'
import useShop from '../hooks/useShop'
import { formatCount, formatPrice, discountPercent } from '../utils/format'
import Rating from './Rating'

export default function CourseCard({ course }) {
  const { addToCart, cart, wishlist, toggleWishlist, isPurchased } = useShop()
  const inCart = cart.includes(course.id)
  const liked = wishlist.includes(course.id)
  const owned = isPurchased(course.id)
  const discount = discountPercent(course.price, course.oldPrice)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card">
      <Link to={`/courses/${course.id}`} className="relative block aspect-[16/10] overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${course.cover.from} ${course.cover.to}`} />
        <div className="absolute -right-6 -top-8 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
        <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-black/10 blur-2xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl drop-shadow-lg transition duration-500 group-hover:scale-110">
            {course.cover.emoji}
          </span>
        </div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {course.badge && (
            <span className="rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-900 shadow-sm">
              {course.badge}
            </span>
          )}
          {course.premium && (
            <span className="rounded-md bg-amber-400 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-900 shadow-sm">
              Premium
            </span>
          )}
        </div>
        {discount > 0 && (
          <span className="absolute bottom-3 left-3 rounded-md bg-rose-600 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            -{discount}%
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-md bg-black/35 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          {course.level}
        </span>
      </Link>

      <button
        type="button"
        onClick={() => toggleWishlist(course.id)}
        aria-label="Sevimlilarga qo'shish"
        aria-pressed={liked}
        className={`absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full backdrop-blur-md transition ${
          liked ? 'bg-rose-500 text-white' : 'bg-black/25 text-white hover:bg-white hover:text-rose-500'
        }`}
      >
        <FiHeart className={`text-sm ${liked ? 'fill-white' : ''}`} />
      </button>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide">
          <span className="text-brand-600">{course.category}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400">{course.language}</span>
        </div>

        <Link to={`/courses/${course.id}`}>
          <h3 className="mt-2 line-clamp-2 min-h-[2.75rem] text-[15px] font-bold leading-snug text-ink-900 transition group-hover:text-brand-600">
            {course.title}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-slate-400">{course.instructor.name}</p>

        <div className="mt-2 flex items-center gap-3">
          <Rating value={course.rating} reviews={course.reviews} />
        </div>

        <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <FiClock /> {course.hours} soat
          </span>
          <span className="flex items-center gap-1">
            <FiBookOpen /> {course.lessons} dars
          </span>
          <span className="flex items-center gap-1">
            <FiUsers /> {formatCount(course.students)}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <div className="text-lg font-extrabold text-ink-900">{formatPrice(course.price)}</div>
            {course.oldPrice > course.price && (
              <div className="text-xs text-slate-400 line-through">{formatPrice(course.oldPrice)}</div>
            )}
          </div>

          {owned ? (
            <Link
              to={`/courses/${course.id}`}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-100"
            >
              <FiCheck /> Davom etish
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(course.id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
                inCart
                  ? 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  : 'bg-ink-900 text-white hover:bg-brand-600'
              }`}
            >
              <FiShoppingCart /> {inCart ? 'Savatda' : "Savatga"}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
