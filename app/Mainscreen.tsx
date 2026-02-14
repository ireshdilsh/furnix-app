import BottomSheet from '@/components/ui/BottomSheet';
import { BorderRadius, Colors } from '@/constants/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Mainscreen() {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const handleGetStarted = () => {
        setIsBottomSheetVisible(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetVisible(false);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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

                <Pressable style={styles.getStartedButton} onPress={handleGetStarted}>
                    <Text style={styles.getStartedButtonText}>Get Started</Text>
                    <AntDesign name="right-circle" size={16} color="#fff" />
                </Pressable>
            </View>

            <BottomSheet
                isVisible={isBottomSheetVisible}
                onClose={handleCloseBottomSheet}
                snapPoints={[0.5]}
            >
                <Text style={styles.bottomSheetTitle}>Let’s Get You Started</Text>
                <Text style={styles.bottomSheetDescription}>
                    Sign up to unlock exclusive deals, save your style, and manage your orders easily.
                </Text>
            </BottomSheet>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
    },

    appLogo: {
        fontFamily: 'Pacifico',
        fontSize: 30,
    },

    title: {
        fontFamily: 'Robotslab',
        fontSize: 23,
        marginTop: 75,
        color: Colors.textPrimary
    },

    description: {
        fontSize: 14.5,
        textAlign: 'center',
        marginTop: 10,
        color: Colors.textSecondary,
    },

    getStartedButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
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

    bottomSheetTitle: {
        fontSize: 22,
        fontFamily: 'Robotslab',
        color: Colors.textPrimary,
        marginTop: 10,
        marginBottom: 10,
    },

    bottomSheetDescription: {
        color: Colors.textSecondary,
        lineHeight: 22,
    },

})