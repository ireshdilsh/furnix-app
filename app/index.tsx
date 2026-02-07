/* eslint-disable react-hooks/rules-of-hooks */
import { Fonts } from '@/config/Fonts';
import MaskedView from '@react-native-masked-view/masked-view';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function index() {

    const [loaded, error] = useFonts({
        'Josefin': Fonts.Josefin,
        'Josefin-Bold': Fonts.JosefinBold,
        'Pacifico': Fonts.Pacifico,
    });

    const router = useRouter()

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    useEffect(() => {
        if (loaded || error) {
            const timer = setTimeout(() => {
                router.replace('/screens/MainScreen')
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [loaded, error, router]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View style={styles.container}>
            <MaskedView
                style={styles.maskedView}
                maskElement={
                    <View style={styles.maskContainer}>
                        <Text style={styles.appName}>Furnix</Text>
                    </View>
                }
            >
                <LinearGradient
                    colors={['#e17100', '#ff8904', '#ffb86a', '#ffedd4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                />
            </MaskedView>
            <Text style={styles.appSubtitle}>Furniture</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        // backgroundColor:'#ffedd4',
        height: '100%',
        width: '100%'
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
    appName: {
        fontFamily: 'Pacifico',
        fontSize: 48,
    },
    gradient: {
        flex: 1,
    },

    appSubtitle: {
        fontFamily: 'Josefin-Bold',
        fontSize: 17,
        marginTop: -10,
        color: '#718096',
        marginLeft: 70
    }
})