/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function index() {

    const [loaded, error] = useFonts({
        'Josefin': require('../fonts/josefin/static/JosefinSans-Medium.ttf'),
        'Josefin-Bold': require('../fonts/josefin/static/JosefinSans-Bold.ttf'),
        'Pacifico': require('../fonts/pacifico/Pacifico-Regular.ttf'),
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
        <View style={styles.container}>
            <Text style={styles.appName}>Furnix</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    appName: {
        fontFamily: 'Pacifico',
        fontSize: 48,
        color: '#545454'
    }
})