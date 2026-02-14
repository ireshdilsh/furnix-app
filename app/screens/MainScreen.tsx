import BottomSheet from '@/components/ui/BottomSheet'
import { Colors } from '@/constants/theme'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

// Colored Google Icon Component
// const GoogleIcon = ({ size = 24 }: { size?: number }) => (
//     // <Svg width={size} height={size} viewBox="0 0 48 48">
//     //     <Path
//     //         fill="#FFC107"
//     //         d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
//     //     />
//     //     <Path
//     //         fill="#FF3D00"
//     //         d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
//     //     />
//     //     <Path
//     //         fill="#4CAF50"
//     //         d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
//     //     />
//     //     <Path
//     //         fill="#1976D2"
//     //         d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
//     //     />
//     // </Svg>
// )

export default function MainScreen() {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)

    const handleGetStarted = () => {
        setIsBottomSheetVisible(true)
    }

    const handleCloseBottomSheet = () => {
        setIsBottomSheetVisible(false)
    }

    const handleGoogleSignIn = () => {
        // Handle Google sign in logic here
        console.log('Continue with Google pressed')
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 ,backgroundColor:'#F8F9FF'}}>
            <Image source={require('../../assets/images/bg-img.png')} style={{ width: 265, height: 260, marginBottom: 30 }} />
            <Text style={styles.title}>Design Your Dream Space</Text>
            <Text style={styles.description}>Shop aesthetic, high-quality furniture designed to make your home feel warm, modern, and uniquely yours.</Text>
            <Pressable
                style={{ marginTop: 30, backgroundColor: Colors.primary, paddingVertical: 14, borderRadius: 5, width: '94%' }}
                onPress={handleGetStarted}
            >
                <Text style={{ color: Colors.white, fontFamily: 'Robotslab', fontSize: 16, textAlign: 'center' }}>Get Started</Text>
            </Pressable>
            <View style={{height:100,width:'100%',backgroundColor:Colors.primary, filter:'blur(200px)',position:'absolute',top:0}}/>
            <BottomSheet
                isVisible={isBottomSheetVisible}
                onClose={handleCloseBottomSheet}
                snapPoints={[0.25]}
            >
                <View style={styles.bottomSheetContent}>
                    <Text style={styles.bottomSheetTitle}>Start Your Home Journey.</Text>
                    <Text style={styles.bottomSheetSubtitle}>Join us to discover stylish furniture, exclusive deals, and personalized recommendations.</Text>

                    <Pressable style={styles.googleButton} onPress={handleGoogleSignIn}>
                        {/* <GoogleIcon size={24} /> */}
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                        <AntDesign name="google" size={20} color="black" />
                    </Pressable>
                </View>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Robotslab',
        fontSize: 23,
        marginTop: 50
    },
    description: {
        color: Colors.gray600,
        marginTop: 10,
        textAlign: 'center',
    },
    bottomSheetContent: {
        padding: 24,
        alignItems: 'center',
    },
    bottomSheetTitle: {
        fontFamily: 'Robotslab',
        fontSize: 22,
        color: Colors.black,
        marginBottom: 8,
        marginTop: 10
    },
    bottomSheetSubtitle: {
        fontSize: 14,
        color: Colors.gray600,
        marginBottom: 24,
        textAlign: 'center',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gray300,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 24,
        width: '100%',
        gap: 12,
    },
    googleButtonText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: Colors.black,
    },
})