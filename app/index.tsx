import { BorderRadius, Colors } from '@/constants/theme';
import { useFonts } from '@expo-google-fonts/poppins';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

SplashScreen.preventAutoHideAsync();

export default function index() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loaded, error] = useFonts({
        'Robotslab': require('../fonts/Roboto Slab/static/RobotoSlab-Medium.ttf'),
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
        <View style={styles.container}>
            <MaskedView
                maskElement={
                    <Text style={styles.appLogo}>Furnix</Text>
                }
            >
                <LinearGradient
                    colors={Colors.gradientPurpleCoral}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={[styles.appLogo, { opacity: 0 }]}>Furnix</Text>
                </LinearGradient>
            </MaskedView>

            <Text style={styles.title}>
                Modern Living Starts Here.
            </Text>

            <Text style={styles.description}>
                Shop premium furniture for comfort and style everything your space needs in one place.
            </Text>

            <Pressable style={styles.getStartedButton}>
                <Text style={styles.getStartedButtonText}>Get Started</Text>
                <AntDesign name="right-circle" size={18} color="#fff" />
            </Pressable>

            <View style={styles.bottom}>
                <Text style={styles.bottomText}>Powered by</Text>
                <FontAwesome6 name="android" size={38} color="#00cc60" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    appLogo: {
        fontFamily: 'Pacifico',
        fontSize: 38,
        marginTop: 250
    },

    title: {
        fontFamily: 'Robotslab',
        fontSize: 23,
        marginTop: 75,
        color: '#333'
    },

    description: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10,
        color: '#333'
    },

    getStartedButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: BorderRadius.sm,
        marginTop: 30,
        width: '94%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },

    getStartedButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
        fontFamily: 'Robotslab',
        textAlign: 'center'
    },

    bottom: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        bottom: -330
    },

    bottomText: {
        fontWeight: 500,
        color: '#333'
    }

})