/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

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
            {/* <Text style={styles.appName}>Furnix</Text>
            <Text style={styles.appSubtitle}>Furniture</Text> */}
            <MaskedView
                style={{ height: 24 }}
                maskElement={<Text style={styles.appName}>Furnix</Text>}
            >
                <LinearGradient
                    colors={['cadetblue', '#fabada']}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0.33 }}
                    style={{ flex: 1 }}
                />
            </MaskedView>
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
        color: '#333'
    },

    appSubtitle: {
        fontFamily: 'Josefin-Bold',
        fontSize: 20,
        marginTop: -22,
        color: '#333',
        marginLeft: 55
    }
})