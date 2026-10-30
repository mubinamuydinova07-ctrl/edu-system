export function formatNumber(value) {
  return new Intl.NumberFormat('ru-RU').format(value).replace(/,/g, ' ')
}

export const fmt = formatNumber
