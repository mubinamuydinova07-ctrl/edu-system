import { useContext } from 'react'
import { ShopContext } from '../context/shopContext'

export default function useShop() {
  const value = useContext(ShopContext)
  if (!value) {
    throw new Error('useShop faqat ShopProvider ichida ishlatiladi')
  }
  return value
}
