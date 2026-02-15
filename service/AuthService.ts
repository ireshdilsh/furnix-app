import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/config";

export interface UserData {
    uid: string;
    email: string;
    displayName: string;
    createdAt: Date;
}

// Register new user
export const registerUser = async (
    email: string,
    password: string,
    displayName: string
): Promise<User> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user profile with display name
        await updateProfile(user, { displayName });

        // Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: displayName,
            createdAt: new Date(),
        });

        return user;
    } catch (error: any) {
        throw getAuthErrorMessage(error.code);
    }
};

// Sign in user
export const loginUser = async (
    email: string,
    password: string
): Promise<User> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: any) {
        throw getAuthErrorMessage(error.code);
    }
};

// Sign out user
export const logoutUser = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error: any) {
        throw getAuthErrorMessage(error.code);
    }
};

// Send password reset email
export const resetPassword = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        throw getAuthErrorMessage(error.code);
    }
};

// Get current user
export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};

// Get user data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as UserData;
        }
        return null;
    } catch (error) {
        console.error("Error getting user data:", error);
        throw error;
    }
};

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case "auth/email-already-in-use":
            return "This email is already registered. Please sign in instead.";
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/operation-not-allowed":
            return "Email/password accounts are not enabled.";
        case "auth/weak-password":
            return "Password should be at least 6 characters.";
        case "auth/user-disabled":
            return "This account has been disabled.";
        case "auth/user-not-found":
            return "No account found with this email.";
        case "auth/wrong-password":
            return "Incorrect password. Please try again.";
        case "auth/invalid-credential":
            return "Invalid email or password.";
        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";
        case "auth/network-request-failed":
            return "Network error. Please check your connection.";
        default:
            return "An error occurred. Please try again.";
    }
};
