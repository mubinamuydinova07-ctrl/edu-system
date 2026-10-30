import { Link } from 'react-router-dom'
import { FiPlay } from 'react-icons/fi'

export default function Logo({ light = false, compact = false }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="EduNova bosh sahifa">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-violet-600 text-white shadow-lg shadow-brand-600/30 transition-transform group-hover:scale-105">
        <FiPlay className="ml-0.5 text-lg" />
      </span>
      {!compact && (
        <span className={`text-xl font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink-900'}`}>
          Edu<span className="text-brand-500">Nova</span>
        </span>
      )}
    </Link>
  )
}
