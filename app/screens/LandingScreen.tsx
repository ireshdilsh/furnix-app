import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function LandingScreen() {
    return (
        <View>
            <Text style={styles.appName}>LandingScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    appName: {
        fontFamily: 'Pacifico',
        fontSize: 32,
        // Don't use fontWeight with custom fonts - use the Bold variant instead
    }
})