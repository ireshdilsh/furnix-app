import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function Secondscreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>Find your perfect home pieces and order with just a few taps.</Text>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    description: {
        textAlign: 'center',
        fontSize: 17,
        color: '#333',
        fontWeight: 'medium',
        paddingLeft: 40,
        paddingRight: 40,
    },

    button: {
        backgroundColor: '#333',
        width: '80%',
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 5,
        marginTop: 30,
    },

    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    }
})