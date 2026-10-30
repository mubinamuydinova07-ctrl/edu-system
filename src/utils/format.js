export function formatPrice(value) {
  if (value === 0) return 'Bepul'
  return `${new Intl.NumberFormat('ru-RU').format(value).replace(/,/g, ' ')} so'm`
}

export function discountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

export function formatCount(value) {
  if (value >= 1000) {
    const rounded = value / 1000
    return `${rounded % 1 === 0 ? rounded : rounded.toFixed(1)}k`
  }
  return String(value)
}
