import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/config";
import { Chair } from "../interfaces/Chair";

export interface FavouriteItem {
    id: string;
    email: string;
    productId: string;
    title: string;
    description: string;
    price: number;
    image: string;
    createdAt: Date;
}

export interface FavouriteInput {
    email: string;
    product: Chair;
}

// Add item to favourites
export const addFavourite = async (input: FavouriteInput): Promise<string> => {
    try {
        // Check if already exists
        const exists = await isFavourite(input.email, input.product.id)
        if (exists) {
            throw "Item already in favourites"
        }

        const favouriteData = {
            email: input.email.toLowerCase(),
            productId: input.product.id,
            title: input.product.title,
            description: input.product.description,
            price: input.product.price,
            image: input.product.image,
            createdAt: new Date(),
        }

        const docRef = await addDoc(collection(db, "favourites"), favouriteData)
        return docRef.id
    } catch (error) {
        console.error("Error adding favourite:", error)
        throw error
    }
}

// Remove item from favourites
export const removeFavourite = async (email: string, productId: string): Promise<void> => {
    try {
        const favouritesRef = collection(db, "favourites")
        const q = query(
            favouritesRef,
            where("email", "==", email.toLowerCase()),
            where("productId", "==", productId)
        )
        const querySnapshot = await getDocs(q)

        const deletePromises: Promise<void>[] = []
        querySnapshot.forEach((document) => {
            deletePromises.push(deleteDoc(doc(db, "favourites", document.id)))
        })

        await Promise.all(deletePromises)
    } catch (error) {
        console.error("Error removing favourite:", error)
        throw "Failed to remove from favourites"
    }
}

// Get all favourites for a user by email
export const getFavouritesByEmail = async (email: string): Promise<FavouriteItem[]> => {
    try {
        const favouritesRef = collection(db, "favourites")
        const q = query(favouritesRef, where("email", "==", email.toLowerCase()))
        const querySnapshot = await getDocs(q)

        const favourites: FavouriteItem[] = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            favourites.push({
                id: doc.id,
                email: data.email,
                productId: data.productId,
                title: data.title,
                description: data.description,
                price: data.price,
                image: data.image,
                createdAt: data.createdAt?.toDate() || new Date(),
            })
        })

        // Sort by creation date (newest first)
        favourites.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

        return favourites
    } catch (error) {
        console.error("Error getting favourites:", error)
        throw "Failed to load favourites"
    }
}

// Check if item is in favourites
export const isFavourite = async (email: string, productId: string): Promise<boolean> => {
    try {
        const favouritesRef = collection(db, "favourites")
        const q = query(
            favouritesRef,
            where("email", "==", email.toLowerCase()),
            where("productId", "==", productId)
        )
        const querySnapshot = await getDocs(q)
        return !querySnapshot.empty
    } catch (error) {
        console.error("Error checking favourite:", error)
        return false
    }
}
