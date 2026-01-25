import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '@/components/header'

export default function Userdashboard() {
    return (
        <View style={styles.maincontainer}>
            <Header />
            <View style={styles.container}>
                <Text>Hello World</Text>
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

    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        width: '100%',
        paddingTop: 80,
        paddingHorizontal: 30
    },
})