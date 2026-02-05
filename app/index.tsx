/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { View } from 'react-native'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function index() {

    const [loaded, error] = useFonts({
        'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
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

        </View>
    )
}
