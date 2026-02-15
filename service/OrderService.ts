import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/config";

export interface Order {
    id: string;
    email: string;
    amount: number;
    date: Date;
    billingAddress: {
        fullName: string;
        phone: string;
        address: string;
        city: string;
        zipCode: string;
    };
    paymentMethod: string;
    itemCount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
}

export interface OrderInput {
    email: string;
    amount: number;
    billingAddress: {
        fullName: string;
        phone: string;
        address: string;
        city: string;
        zipCode: string;
    };
    paymentMethod: string;
    itemCount: number;
}

// Create a new order
export const createOrder = async (orderInput: OrderInput): Promise<string> => {
    try {
        const orderData = {
            email: orderInput.email.toLowerCase(),
            amount: orderInput.amount,
            date: new Date(),
            billingAddress: orderInput.billingAddress,
            paymentMethod: orderInput.paymentMethod,
            itemCount: orderInput.itemCount,
            status: 'pending',
            createdAt: new Date(),
        }

        const docRef = await addDoc(collection(db, "orders"), orderData)
        return docRef.id
    } catch (error) {
        console.error("Error creating order:", error)
        throw "Failed to place order. Please try again."
    }
}

// Get all orders for a user by email
export const getOrdersByEmail = async (email: string): Promise<Order[]> => {
    try {
        const ordersRef = collection(db, "orders")
        const q = query(
            ordersRef,
            where("email", "==", email.toLowerCase())
        )
        const querySnapshot = await getDocs(q)

        const orders: Order[] = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            orders.push({
                id: doc.id,
                email: data.email,
                amount: data.amount,
                date: data.date?.toDate() || new Date(),
                billingAddress: data.billingAddress,
                paymentMethod: data.paymentMethod,
                itemCount: data.itemCount,
                status: data.status,
                createdAt: data.createdAt?.toDate() || new Date(),
            })
        })

        // Sort by date (newest first)
        orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

        return orders
    } catch (error) {
        console.error("Error getting orders:", error)
        throw "Failed to load orders. Please try again."
    }
}

// Format order date for display
export const formatOrderDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}
