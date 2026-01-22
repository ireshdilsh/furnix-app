import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useBatteryLevel } from 'expo-battery';


export default function Header() {

    const batteryLevel = useBatteryLevel();

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row', gap:8}}>
                <Text style={styles.dateText}>{new Date().toString().substring(0, 10)}</Text>
                <Text style={styles.timeText}>{new Date().toLocaleTimeString().substring(0, 4)}</Text>
            </View>
            <View style={styles.battery}>
                <Image style={styles.batteryIcon} source={{ uri: 'https://img.icons8.com/?size=100&id=cI1MyTQfFWiL&format=png&color=#4a5565' }} />
                <Text style={styles.batteryText}>{batteryLevel !== null ? `${Math.round(batteryLevel * 100)}%` : 'Unknown'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 26,
        left: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4,
        width: '88%',
    },

    battery: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2
    },

    batteryIcon: {
        width: 16,
        height: 16,
        tintColor: '#4a5565'
    },

    batteryText: {
        color: '#4a5565',
        fontFamily: 'Roboto_400Regular',
        fontSize: 13
    },

    dateText: {
        color: '#4a5565',
        fontFamily: 'Roboto_400Regular',
        fontSize: 13
    },

    timeText: {
        color: '#4a5565',
        fontFamily: 'Roboto_400Regular',
        fontSize: 13
    }
})