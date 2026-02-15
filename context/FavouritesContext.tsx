import { Chair } from '@/interfaces/Chair'
import { getCurrentUser } from '@/service/AuthService'
import { addFavourite, FavouriteItem, getFavouritesByEmail, removeFavourite } from '@/service/FavouriteService'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface FavouritesContextType {
    favourites: FavouriteItem[]
    loading: boolean
    addToFavourites: (product: Chair) => Promise<void>
    removeFromFavourites: (productId: string) => Promise<void>
    isFavourite: (productId: string) => boolean
    refreshFavourites: () => Promise<void>
    getFavouritesCount: () => number
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined)

export function FavouritesProvider({ children }: { children: ReactNode }) {
    const [favourites, setFavourites] = useState<FavouriteItem[]>([])
    const [loading, setLoading] = useState(true)
    const [userEmail, setUserEmail] = useState<string | null>(null)

    useEffect(() => {
        const user = getCurrentUser()
        if (user?.email) {
            setUserEmail(user.email)
            loadFavourites(user.email)
        } else {
            setLoading(false)
        }
    }, [])

    const loadFavourites = async (email: string) => {
        try {
            setLoading(true)
            const items = await getFavouritesByEmail(email)
            setFavourites(items)
        } catch (error) {
            console.error('Error loading favourites:', error)
        } finally {
            setLoading(false)
        }
    }

    const addToFavourites = async (product: Chair) => {
        if (!userEmail) return

        try {
            await addFavourite({ email: userEmail, product })
            await loadFavourites(userEmail)
        } catch (error) {
            console.error('Error adding to favourites:', error)
            throw error
        }
    }

    const removeFromFavourites = async (productId: string) => {
        if (!userEmail) return

        try {
            await removeFavourite(userEmail, productId)
            setFavourites(prev => prev.filter(item => item.productId !== productId))
        } catch (error) {
            console.error('Error removing from favourites:', error)
            throw error
        }
    }

    const isFavouriteCheck = (productId: string): boolean => {
        return favourites.some(item => item.productId === productId)
    }

    const refreshFavourites = async () => {
        if (userEmail) {
            await loadFavourites(userEmail)
        }
    }

    const getFavouritesCount = (): number => {
        return favourites.length
    }

    return (
        <FavouritesContext.Provider
            value={{
                favourites,
                loading,
                addToFavourites,
                removeFromFavourites,
                isFavourite: isFavouriteCheck,
                refreshFavourites,
                getFavouritesCount,
            }}
        >
            {children}
        </FavouritesContext.Provider>
    )
}

export function useFavourites() {
    const context = useContext(FavouritesContext)
    if (context === undefined) {
        throw new Error('useFavourites must be used within a FavouritesProvider')
    }
    return context
}
