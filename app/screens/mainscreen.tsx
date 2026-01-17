import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function Mainscreen() {

    const router = useRouter()

    const openSignInBottomSheet = () => {
        router.push('./signinbottomsheet')
    }

    return (
        <View>
            <Image style={styles.image} source={require('../../assets/images/hero-img.png')} />
            <Text style={styles.title}>Modern Furniture for Modern Homes</Text>
            <Text style={styles.description}>
                Find your perfect home pieces and order with just a few taps.
            </Text>
            <Pressable onPress={openSignInBottomSheet} style={styles.button}>
                <Text style={styles.buttong_text}>Get Started</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    image: {
        marginTop: -16.7
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
        paddingVertical: 17,
        marginTop: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        marginRight: 25,
        marginLeft: 25,
        borderRadius: 5
    },

    buttong_text: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 600,
        fontSize: 16
    }
})  
