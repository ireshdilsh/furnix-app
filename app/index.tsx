import { Colors } from '@/constants/theme';
import { useFonts } from '@expo-google-fonts/poppins';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function index() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setTimeout(() => {
            router.replace('/(auth)/Login' as any)
        }, 3500);
    }, [router]);


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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    appLogo: {
        fontFamily: 'Pacifico',
        fontSize: 40,
    },

    bottom: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 22
    },

    bottomText: {
        fontWeight: 500,
        color: '#333',
        width: '100%'
    }

})