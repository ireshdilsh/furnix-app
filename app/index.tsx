import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import LandingScreen from './screens/LandingScreen'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function index() {

    // import fonts
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loaded, error] = useFonts({
        'Josefin-medium': require('../fonts/josefin/static/JosefinSans-Medium.ttf'),
        'Pacifico': require('../fonts/pacifico/Pacifico-Regular.ttf')
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
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