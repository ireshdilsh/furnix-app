import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

export default function Mainscreen() {

    const router = useRouter()

    const openSignInBottomSheet = () => {
        console.log('press button');
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
    }
})  
