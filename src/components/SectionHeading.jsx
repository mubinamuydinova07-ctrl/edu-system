export default function SectionHeading({ eyebrow, title, description, action, light = false, center = false }) {
  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-end ${
        center ? 'items-center text-center sm:flex-col sm:items-center' : 'sm:justify-between'
      }`}
    >
      <div className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && (
          <span className="mb-2 inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600 ring-1 ring-brand-100">
            {eyebrow}
          </span>
        )}
        <h2 className={`text-2xl font-extrabold sm:text-3xl lg:text-[2rem] ${light ? 'text-white' : ''}`}>{title}</h2>
        {description && (
          <p className={`mt-2 text-sm leading-relaxed sm:text-base ${light ? 'text-slate-300' : 'text-slate-500'}`}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
