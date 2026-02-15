import { CartProvider } from '@/context/CartContext';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <CartProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </CartProvider>
        </GestureHandlerRootView>
    );
}
