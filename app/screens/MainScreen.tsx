import { Fonts } from '@/config/Fonts';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function MainScreen() {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

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
            {/* <Header /> */}
            <View style={styles.container}>
                <Image style={styles.bgImg} source={require('../../assets/images/bg-img.png')} />
                <Text style={styles.title}>Where Style{'\n'}Meets Comfort</Text>
                <Text style={styles.description}>Create beautiful spaces with designs that feel as good as they look.</Text>
                <Pressable style={styles.button} onPress={() => setIsBottomSheetVisible(true)}>
                    <Text style={styles.buttonText}>Get Started</Text>
                    <AntDesign style={styles.buttonIcon} name="right-circle" size={15} color="white" />
                </Pressable>
            </View>
            <View style={styles.blur_1}></View>
            <View style={styles.blur_2}></View>

            <Modal
                visible={isBottomSheetVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsBottomSheetVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsBottomSheetVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.bottomSheetContainer}>
                                <View style={styles.bottomSheetHandle} />
                                <Text style={styles.bottomSheetTitle}>Continue to Furnix</Text>
                                <Text style={styles.bottomSheetDescription}>
                                    Log in or sign up to manage your profile and explore all features seamlessly.
                                </Text>

                                <Pressable style={styles.googleBtn}>
                                    <Text style={styles.googleBtnText}>Continue With Google</Text>
                                    <AntDesign style={styles.googleIcn} name="google" size={18} color="white" />
                                </Pressable>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
        backgroundColor: '#4a5565',
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
        gap: 15,
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
        backgroundColor: '#4a5565',
        position: 'absolute',
        filter: 'blur(200px)',
        zIndex: 1,
    },

    blur_2: {
        height: 200,
        width: 200,
        backgroundColor: '#4a5565',
        position: 'absolute',
        right: 0,
        top: 0,
        filter: 'blur(200px)',
        zIndex: 1,
    },

    bgImg: {
        height: 300,
        width: 320,
        position: 'absolute',
        top: 230,
        left: 43,
        zIndex: 0,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.025)',
        justifyContent: 'flex-end',
    },

    bottomSheetContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 40,
        minHeight: 300,
        // shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    bottomSheetHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#d1d5db',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },

    bottomSheetTitle: {
        fontFamily: 'Josefin-Bold',
        fontSize: 26,
        color: '#4a5565',
        textAlign: 'center',
        marginBottom: 15,
    },

    bottomSheetDescription: {
        // fontFamily: 'Josefin',
        fontSize: 16,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
    },

    bottomSheetButton: {
        backgroundColor: '#4a5565',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignSelf: 'center',
        width: '100%',
    },

    bottomSheetButtonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Josefin',
        textAlign: 'center',
    },

    googleBtn: {
        backgroundColor: '#4a5565',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    googleBtnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Josefin',
        textAlign: 'center',
    },

    googleIcn:{
        marginTop:5
    }

})