import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Fonts } from '@/config/Fonts';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Header from '@/components/header';
import AntDesign from '@expo/vector-icons/AntDesign';

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
            <Header />
            <View style={styles.container}>
                <Image style={styles.bgImg} source={require('../../assets/images/bg-img.png')} />
                <Text style={styles.title}>Where Style{'\n'}Meets Comfort</Text>
                <Text style={styles.description}>Create beautiful spaces with designs that feel as good as they look.</Text>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Get Started</Text>
                    <AntDesign style={styles.buttonIcon} name="right-circle" size={15} color="white" />
                </Pressable>
            </View>
            <View style={styles.blur_1}></View>
            <View style={styles.blur_2}></View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 40,
    },

    title: {
        fontFamily: 'Josefin-Bold',
        fontSize: 30,
        color: '#4a5565',
        marginTop: 580,
        textAlign: 'center'
    },

    description: {
        marginTop: 7,
        color: '#718096',
        fontSize: 16,
        textAlign: 'center',
    },

    button: {
        backgroundColor: '#f68403',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        marginTop: 60,
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Josefin',
        textAlign: 'center',
    },

    buttonIcon: {
        marginTop: 6
    },

    blur_1: {
        height: 200,
        width: 200,
        backgroundColor: '#f68403',
        position: 'absolute',
        filter: 'blur(350px)',
        zIndex: 1,
    },

    blur_2: {
        height: 200,
        width: 200,
        backgroundColor: '#f68403',
        position: 'absolute',
        right: 0,
        filter: 'blur(350px)',
        zIndex: 1,
    },

    bgImg: {
        height: 300,
        width: 320,
        position: 'absolute',
        top: 230,
        left: 43,
        zIndex: 0,
    }

})