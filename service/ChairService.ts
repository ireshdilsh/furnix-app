import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/config";
import { Chair } from "../interfaces/Chair";
// const auth = getAuth()

const tasksCollection = collection(db, 'chairs')

export const addNewChair = async (chairData: { title: string; description: string; price: number; image: string }) => {
    try {
        return await addDoc(tasksCollection, chairData);
    } catch (error) {
        throw error;
    }
}

export const getAllChairs = async (): Promise<Chair[]> => {
    try {
        const querySnapshot = await getDocs(tasksCollection);
        const chairs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Chair[];
        return chairs;
    } catch (error) {
        throw error;
    }
}

export const getChairByID = async (id: string): Promise<Chair | null> => {
    try {
        const docRef = doc(tasksCollection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Chair;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting chair: ", error);
        throw error;
    }
};

// 3. Update Chair
export const updateChair = async (id: string, updatedData: Partial<{ title: string; description: string; price: number; image: string }>) => {
    try {
        const docRef = doc(tasksCollection, id);
        await updateDoc(docRef, updatedData);
        return id;
    } catch (error) {
        console.error("Error updating chair: ", error);
        throw error;
    }
};

// 4. Delete Chair
export const deleteChair = async (id: string) => {
    try {
        const docRef = doc(tasksCollection, id);
        await deleteDoc(docRef);
        return id;
    } catch (error) {
        console.error("Error deleting chair: ", error);
        throw error;
    }
};