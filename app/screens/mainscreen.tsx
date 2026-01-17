import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Mainscreen() {

    const router = useRouter()

    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)
    const [isSignUpSheetVisible, setIsSignUpSheetVisible] = useState(false)

    const openSignInBottomSheet = () => {
        setIsBottomSheetVisible(true)
    }

    const closeBottomSheet = () => {
        setIsBottomSheetVisible(false)
    }

    const openSignUpBottomSheet = () => {
        setIsBottomSheetVisible(false)
        setIsSignUpSheetVisible(true)
    }

    const closeSignUpSheet = () => {
        setIsSignUpSheetVisible(false)
    }

    const switchToSignIn = () => {
        setIsSignUpSheetVisible(false)
        setIsBottomSheetVisible(true)
    }

    return (
        <View>
            <Image style={styles.image} source={require('../../assets/images/hero-img.png')} />
            <Text style={styles.title}>Modern Furniture for Modern Homes</Text>
            <Text style={styles.description}>
                Find your perfect home pieces and order with just a few taps.
            </Text>
            <Pressable onPress={openSignInBottomSheet} style={styles.button}>
                <Text style={styles.buttong_text}>Get Start</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isBottomSheetVisible}
                onRequestClose={closeBottomSheet}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    activeOpacity={1} 
                    onPress={closeBottomSheet}
                >
                    <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
                        <View style={styles.bottomSheet}>
                            <View style={styles.handleBar} />
                            <Text style={styles.sheetTitle}>Welcome Back</Text>
                            <Text style={styles.sheetDescription}>Sign in to continue shopping with Furnix.</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry
                            />
                            
                            <Pressable style={styles.signInButton}>
                                <Text style={styles.signInButtonText}>Authenticate me</Text>
                            </Pressable>
                            
                            <View style={styles.dividerContainer}>
                                <View style={styles.divider} />
                                <Text style={styles.dividerText}>OR</Text>
                                <View style={styles.divider} />
                            </View>
                            
                            <Pressable style={styles.googleButton}>
                                <Image 
                                    source={{ uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000' }} 
                                    style={styles.googleIcon}
                                />
                                <Text style={styles.googleButtonText}>Continue with Google</Text>
                            </Pressable>
                            
                            <Text style={styles.signUpText}>
                                Dont have an account? <Text style={styles.signUpLink} onPress={openSignUpBottomSheet}>Sign Up</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isSignUpSheetVisible}
                onRequestClose={closeSignUpSheet}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    activeOpacity={1} 
                    onPress={closeSignUpSheet}
                >
                    <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
                        <View style={styles.bottomSheet}>
                            <View style={styles.handleBar} />
                            <ScrollView 
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                            >
                                <Text style={styles.sheetTitle}>Create Account</Text>
                                <Text style={styles.sheetDescription}>Join Furnix and start shopping furniture easily.</Text>
                                
                                <TextInput
                                    style={styles.input}
                                    placeholder="Full Name"
                                    placeholderTextColor="#9CA3AF"
                                    autoCapitalize="words"
                                />
                                
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry
                                />
                                
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry
                                />
                                
                                <Pressable style={styles.signInButton}>
                                    <Text style={styles.signInButtonText}>Create Account</Text>
                                </Pressable>
                                
                                <View style={styles.dividerContainer}>
                                    <View style={styles.divider} />
                                    <Text style={styles.dividerText}>OR</Text>
                                    <View style={styles.divider} />
                                </View>
                                
                                <Pressable style={styles.googleButton}>
                                    <Image 
                                        source={{ uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000' }} 
                                        style={styles.googleIcon}
                                    />
                                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                                </Pressable>
                                
                                <Text style={styles.signUpText}>
                                    Already have an account? <Text style={styles.signUpLink} onPress={switchToSignIn}>Sign In</Text>
                                </Text>
                            </ScrollView>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({

    image: {
        marginTop: -16.7,
    },

    title: {
        color: '#4a5565',
        fontSize: 28,
        marginRight: 25,
        marginLeft: 25,
        marginTop: -110,
    },

    description: {
        color: '#718096',
        marginRight: 25,
        marginLeft: 25,
        marginTop: 10,
        fontSize: 16
    },

    button: {
        backgroundColor: '#4a5565',
        paddingVertical: 13,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: '86%',
        marginHorizontal: 25,
        borderRadius: 5
    },

    buttong_text: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '500'
    },

    modalOverlay: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'flex-end',
    },

    bottomSheet: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 25,
        paddingBottom: 40,
        paddingTop: 10,
    },

    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: '#D1D5DB',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },

    sheetTitle: {
        fontSize: 24,
        color: '#4a5565',
    },

    sheetDescription:{
        color:'#718096',
        marginBottom:40
    },

    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#4a5565',
        marginBottom: 15,
        backgroundColor: '#F9FAFB',
    },

    signInButton: {
        backgroundColor: '#4a5565',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },

    signInButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },

    signUpText: {
        textAlign: 'center',
        color: '#718096',
        fontSize: 14,
    },

    signUpLink: {
        color: '#4a5565',
        fontWeight: '600',
    },

    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },

    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },

    dividerText: {
        marginHorizontal: 15,
        color: '#9CA3AF',
        fontSize: 14,
        fontWeight: '500',
    },

    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 20,
    },

    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },

    googleButtonText: {
        color: '#4a5565',
        fontSize: 16,
        fontWeight: '500',
    }
})  
