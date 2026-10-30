import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiArrowRight,
  FiAward,
  FiCheck,
  FiChevronDown,
  FiCreditCard,
  FiHelpCircle,
  FiShield,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import { faqs, plans } from '../data/courses'
import useShop from '../hooks/useShop'
import { formatPrice } from '../utils/format'

const compareRows = [
  { label: 'Til kurslari', free: false, plus: true, pro: true },
  { label: 'IT kurslari', free: false, plus: false, pro: true },
  { label: 'Bepul kurslar', free: true, plus: true, pro: true },
  { label: 'Sertifikat', free: false, plus: true, pro: true },
  { label: 'Jonli darslar', free: false, plus: true, pro: true },
  { label: '1:1 mentor', free: false, plus: false, pro: true },
  { label: 'Mock intervyu', free: false, plus: false, pro: true },
  { label: 'Ustuvor yordam', free: false, plus: '24/48 soat', pro: '24/7' },
]

export default function Premium() {
  const [billing, setBilling] = useState('yearly')
  const [openFaq, setOpenFaq] = useState(0)
  const { subscribePlan, plan: currentPlan, showToast } = useShop()
  const navigate = useNavigate()

  const choosePlan = (plan) => {
    if (plan.id === currentPlan) {
      showToast('Bu tarif allaqachon faol', 'info')
      return
    }
    subscribePlan(plan.id)
    showToast(`${plan.name} tarifi faollashtirildi`)
    navigate('/my-learning')
  }

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-amber-400/20 blur-[120px]" />
          <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-brand-600/30 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 ring-1 ring-amber-400/30">
            <FiZap /> EduNova Premium
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Bir obuna — <span className="text-amber-300">barcha kurslar</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
            Koreys, xitoy, ingliz tillari va IT yo'nalishlaridagi 100+ kurs. Mentor yordami, jonli darslar va
            sertifikat — hammasi bitta tarifda.
          </p>

          <div className="mt-8 inline-flex items-center rounded-xl border border-white/15 bg-white/5 p-1 backdrop-blur">
            {[
              { id: 'monthly', label: 'Oylik' },
              { id: 'yearly', label: 'Yillik' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setBilling(option.id)}
                className={`relative rounded-lg px-5 py-2 text-sm font-bold transition ${
                  billing === option.id ? 'bg-white text-ink-900' : 'text-slate-300 hover:text-white'
                }`}
              >
                {option.label}
                {option.id === 'yearly' && (
                  <span className="ml-2 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-300">
                    -30%
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            {[
              { icon: FiShield, text: '14 kun pul qaytarish' },
              { icon: FiCreditCard, text: 'Istalgan vaqtda bekor qilish' },
              { icon: FiUsers, text: '48 000+ o\'quvchi' },
              { icon: FiAward, text: 'Rasmiy sertifikat' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-2">
                <Icon className="text-brand-300" /> {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = billing === 'yearly' ? plan.yearly : plan.monthly
            const active = currentPlan === plan.id
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border bg-white p-6 transition ${
                  plan.highlight
                    ? 'border-brand-600 shadow-[0_24px_60px_-24px_rgba(37,73,232,0.5)] lg:-translate-y-3'
                    : 'border-slate-200 hover:shadow-soft'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                    Eng mashhur
                  </span>
                )}
                {active && (
                  <span className="absolute right-5 top-5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                    Faol
                  </span>
                )}

                <h2 className="text-lg font-extrabold">{plan.name}</h2>
                <p className="mt-1 text-xs text-slate-500">{plan.description}</p>

                <div className="mt-5 flex items-end gap-1">
                  <span className="text-3xl font-extrabold text-ink-900">
                    {price === 0 ? 'Bepul' : formatPrice(price)}
                  </span>
                  {price > 0 && <span className="mb-1 text-xs text-slate-400">/{billing === 'yearly' ? 'yil' : 'oy'}</span>}
                </div>
                {billing === 'yearly' && plan.monthly > 0 && (
                  <p className="mt-1 text-[11px] font-semibold text-emerald-600">
                    Oyiga {formatPrice(Math.round(plan.yearly / 12))} — 2 oy bepul
                  </p>
                )}

                <ul className="mt-5 flex-1 space-y-2.5 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <FiCheck className="mt-0.5 shrink-0 text-emerald-500" /> {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => choosePlan(plan)}
                  className={`mt-6 w-full rounded-xl py-3 text-sm font-extrabold transition ${
                    plan.highlight
                      ? 'bg-brand-600 text-white hover:bg-brand-500'
                      : 'border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white'
                  }`}
                >
                  {active ? 'Faol tarif' : plan.cta}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-extrabold">Tariflarni solishtirish</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-3 font-semibold">Imkoniyat</th>
                  <th className="pb-3 text-center font-semibold">Bepul</th>
                  <th className="pb-3 text-center font-semibold text-brand-600">Plus</th>
                  <th className="pb-3 text-center font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {compareRows.map((row) => (
                  <tr key={row.label}>
                    <td className="py-3 font-medium text-slate-600">{row.label}</td>
                    {['free', 'plus', 'pro'].map((key) => {
                      const value = row[key]
                      return (
                        <td key={key} className="py-3 text-center">
                          {value === true ? (
                            <FiCheck className="mx-auto text-emerald-500" />
                          ) : value === false ? (
                            <span className="text-slate-300">—</span>
                          ) : (
                            <span className="text-xs font-semibold text-slate-600">{value}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-600">
            <FiHelpCircle /> Savol-javob
          </span>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">Ko'p beriladigan savollar</h2>
        </div>

        <div className="mt-6 space-y-3">
          {faqs.map((faq, index) => (
            <div key={faq.q} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-bold text-ink-900">{faq.q}</span>
                <FiChevronDown
                  className={`shrink-0 text-slate-400 transition ${openFaq === index ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === index && (
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-brand-600 p-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-extrabold text-white">Hali ham savolingiz bormi?</p>
            <p className="mt-1 text-xs text-brand-100">Jamoamiz 24/7 yordamga tayyor.</p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
          >
            Kurslarni ko'rish <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  )
}
