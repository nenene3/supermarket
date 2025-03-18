import { ProductCardProps } from '@/components/Card';
import React, { createContext, useState, useContext } from 'react';

type Props = {
  children: React.ReactNode
}

type CartItem = ProductCardProps

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
})

export function useCart() {

  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

const CartProvider = (props: Props) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => [...prevCart, product])
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const value: CartContextType  = { cart, addToCart, removeFromCart, clearCart }

  return (
    <CartContext.Provider value={value}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider