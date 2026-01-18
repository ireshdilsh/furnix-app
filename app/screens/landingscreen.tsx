import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Landingscreen() {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.replace('/screens/mainscreen')
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/images/logo.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        height: 65,
        width: 200
    }
})