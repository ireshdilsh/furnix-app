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
        <View style={styles.container}>
            <Text style={styles.title}>Where Style{'\n'}Meets Comfort</Text>
            <Text style={styles.description}>Create beautiful spaces with designs that feel as good as they look.</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 45,
    },

    title: {
        fontFamily: 'Josefin-Bold',
        fontSize: 25,
        color: '#4a5565',
        marginTop: 50,
    },

    description: {
        marginTop: 5,
        color: '#718096',
        fontSize: 15
    }
})