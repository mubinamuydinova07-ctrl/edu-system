import { FiStar } from 'react-icons/fi'

export default function Rating({ value, reviews, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="text-sm font-bold text-amber-500">{value.toFixed(1)}</span>
      <span className="flex text-amber-400">
        {[0, 1, 2, 3, 4].map((index) => (
          <FiStar
            key={index}
            className={`text-[13px] ${index < Math.round(value) ? 'fill-amber-400' : 'fill-transparent'}`}
          />
        ))}
      </span>
      {reviews !== undefined && <span className="text-xs text-slate-400">({reviews.toLocaleString('ru-RU')})</span>}
    </span>
  )
}
