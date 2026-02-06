/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

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
            <MaskedView
                style={styles.maskedView}
                maskElement={
                    <View style={styles.maskContainer}>
                        <Text style={styles.text}>FURNIX</Text>
                    </View>
                }
            >
                <LinearGradient
                    colors={['#00f2fe', '#4facfe']} // Cyan to Blue gradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                />
            </MaskedView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    maskedView: {
        height: 80, // Adjust based on your font size
        width: '100%',
        flexDirection: 'row',
    },
    maskContainer: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 60,
        fontWeight: '900', // Heavy weight looks best with gradients
        color: 'black',   // This color doesn't matter, it just needs to be solid
    },
    gradient: {
        flex: 1,
    },

    appSubtitle: {
        fontFamily: 'Josefin-Bold',
        fontSize: 20,
        marginTop: -22,
        color: '#718096',
        marginLeft: 55
    }
})