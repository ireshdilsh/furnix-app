import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function LandingScreen() {
    return (
        <View style={styles.container}>
            <MaskedView
                maskElement={
                    <Text style={styles.appName}>Furnix</Text>
                }
            >
                <LinearGradient
                    colors={['#2b7fff', '#00bcff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={[styles.appName, { opacity: 0 }]}>Furnix</Text>
                </LinearGradient>
            </MaskedView>
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
        fontSize: 42,
    }
})