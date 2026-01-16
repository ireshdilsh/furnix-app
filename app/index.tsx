import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function index() {
    return (
        <View style={styles.container}>
            <View>

            </View>
            <Image style={styles.image} source={require('../assets/images/landing-img.png')} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        height: '100%',
        width: '100%',
        backgroundSize: 'cover'
    }
})