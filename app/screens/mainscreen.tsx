import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function Mainscreen() {
    return (
        <View>
            <Image style={styles.image} source={require('../../assets/images/hero-img.png')} />
            <Text style={styles.title}>Modern Furniture for Modern Homes</Text>
            <Text style={styles.description}>
                Find your perfect home pieces and order with just a few taps.</Text>
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
    }
})  