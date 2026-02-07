import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Fonts } from '@/config/Fonts';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function MainScreen() {

    const [loaded, error] = useFonts({
        'Josefin': Fonts.Josefin,
        'Josefin-Bold': Fonts.JosefinBold,
        'Pacifico': Fonts.Pacifico,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    return (
        <View>
            <Text style={styles.title}>MainScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Josefin-Bold',
        fontSize: 24,
        color: '#333',
        marginTop: 50,
        marginLeft: 150
    }
})