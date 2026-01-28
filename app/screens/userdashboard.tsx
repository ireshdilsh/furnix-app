import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React from 'react'
import Header from '@/components/header'

export default function Userdashboard() {
    return (
        <View style={styles.maincontainer}>
            <Header />
            <View style={styles.container}>
                <View style={styles.inputAndProfile}>
                    <Text style={styles.title}>Your Personalized Furix{'\n'}Home Experience</Text>
                    <Image source={{uri : ''}}/>
                </View>
                <TextInput style={styles.search} placeholder='Search'/>
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

    search: {
        height: 48,
        width: '100%',
        backgroundColor: '#F9FAFB',
        borderRadius: 5,
        paddingHorizontal: 15,
        marginTop:20,
        borderColor: '#E5E7EB',
        borderWidth: 0.5,
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#4a5565',
        fontFamily: 'Roboto_700Bold',
    },

    inputAndProfile: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },

    container: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        width: '100%',
        paddingTop: 80,
        paddingHorizontal: 30
    },
})