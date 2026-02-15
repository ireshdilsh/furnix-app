import { Chair } from '@/interfaces/Chair'
import React, { createContext, ReactNode, useContext, useState } from 'react'

export interface CartItem extends Chair {
    quantity: number
}

interface CartContextType {
    cartItems: CartItem[]
    addToCart: (item: Chair) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    isInCart: (id: string) => boolean
    getTotal: () => number
    getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const addToCart = (item: Chair) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id)
            return
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setCartItems([])
    }

    const isInCart = (id: string) => {
        return cartItems.some(item => item.id === id)
    }

    const getTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    const getItemCount = () => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0)
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isInCart,
                getTotal,
                getItemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
