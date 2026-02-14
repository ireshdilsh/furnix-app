import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { BorderRadius, Colors } from '@/constants/theme';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

export default function Mainscreen() {
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
        </View>
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

})