import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '@/components/header'

export default function Userdashboard() {
    return (
        <View style={styles.maincontainer}>
            <Header />
            <View style={styles.container}>
                <Text style={styles.title}>Your Personalized Furix{'\n'}Home Experience</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    maincontainer: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        width: '100%',
    },

    title: {
        fontSize: 25,
        fontWeight: '700',
        color: '#4a5565',
        fontFamily: 'Roboto_700Bold',
        marginBottom: 20,
    },

    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        width: '100%',
        paddingTop: 80,
        paddingHorizontal: 30
    },
})