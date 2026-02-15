import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/config";

export interface Card {
    id: string;
    email: string;
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cardType: string;
    lastFourDigits: string;
    createdAt: Date;
}

export interface CardInput {
    email: string;
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
}

// Get card type from card number
const getCardType = (number: string): string => {
    const cleaned = number.replace(/\s/g, '')
    if (cleaned.startsWith('4')) return 'Visa'
    if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'Mastercard'
    if (cleaned.startsWith('3')) return 'Amex'
    return 'Card'
}

// Save a new card
export const saveCard = async (cardInput: CardInput): Promise<string> => {
    try {
        const cleanedNumber = cardInput.cardNumber.replace(/\s/g, '')
        const lastFourDigits = cleanedNumber.slice(-4)
        const cardType = getCardType(cardInput.cardNumber)

        const cardData = {
            email: cardInput.email.toLowerCase(),
            cardNumber: cleanedNumber, // In production, this should be encrypted or tokenized
            cardHolder: cardInput.cardHolder,
            expiryDate: cardInput.expiryDate,
            cardType: cardType,
            lastFourDigits: lastFourDigits,
            createdAt: new Date(),
        }

        const docRef = await addDoc(collection(db, "cards"), cardData)
        return docRef.id
    } catch (error) {
        console.error("Error saving card:", error)
        throw "Failed to save card. Please try again."
    }
}

// Get all cards for a user by email
export const getCardsByEmail = async (email: string): Promise<Card[]> => {
    try {
        const cardsRef = collection(db, "cards")
        const q = query(cardsRef, where("email", "==", email.toLowerCase()))
        const querySnapshot = await getDocs(q)

        const cards: Card[] = []
        querySnapshot.forEach((doc) => {
            cards.push({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate() || new Date(),
            } as Card)
        })

        // Sort by creation date (newest first)
        cards.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

        return cards
    } catch (error) {
        console.error("Error getting cards:", error)
        throw "Failed to load cards. Please try again."
    }
}

// Delete a card by ID
export const deleteCard = async (cardId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, "cards", cardId))
    } catch (error) {
        console.error("Error deleting card:", error)
        throw "Failed to delete card. Please try again."
    }
}

// Mask card number for display (show only last 4 digits)
export const maskCardNumber = (lastFourDigits: string): string => {
    return `•••• •••• •••• ${lastFourDigits}`
}
