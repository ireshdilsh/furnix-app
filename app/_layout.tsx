/**
 * Funix Furniture App - Root Layout
 * Modern Gen Z design with custom fonts and safe area
 */

import { Fonts } from '@/config/Fonts';
import { Colors } from '@/constants/theme';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts(Fonts);

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <StatusBar style="dark" backgroundColor={Colors.backgroundLight} />
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: Colors.backgroundLight },
                        animation: 'slide_from_right',
                    }}
                >
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen
                        name="product/[id]"
                        options={{
                            headerShown: false,
                            animation: 'slide_from_bottom',
                            presentation: 'card',
                        }}
                    />
                    <Stack.Screen name="screens/Signin" options={{ headerShown: false }} />
                    <Stack.Screen name="screens/Signup" options={{ headerShown: false }} />
                </Stack>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
