import { Fonts } from '@/config/Fonts';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import LandingScreen from './screens/LandingScreen';

SplashScreen.preventAutoHideAsync();

export default function Index() {  // Changed to PascalCase

    const [loaded, error] = useFonts({
        'Josefin': Fonts.Josefin,
        'Josefin-Bold': Fonts.JosefinBold,
        'Pacifico': Fonts.Pacifico
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View>
            <LandingScreen />
        </View>
    )
}