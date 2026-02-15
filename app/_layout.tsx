import { CartProvider } from '@/context/CartContext';
import { FavouritesProvider } from '@/context/FavouritesContext';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <CartProvider>
                <FavouritesProvider>
                    <Stack screenOptions={{ headerShown: false }} />
                </FavouritesProvider>
            </CartProvider>
        </GestureHandlerRootView>
    );
}
