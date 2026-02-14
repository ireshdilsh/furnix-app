import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function LandingScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>Furnix</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName: {
        fontFamily: 'Pacifico',
        fontSize: 38,
    }
})