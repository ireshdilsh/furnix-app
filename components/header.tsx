import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useBatteryLevel } from 'expo-battery';
import { useNetworkState } from 'expo-network';


export default function Header() {

    const batteryLevel = useBatteryLevel();
    const networkState = useNetworkState();

    let netWorkIcon = ''

    if (networkState?.type === 'WIFI') {
        netWorkIcon = 'https://img.icons8.com/?size=100&id=60027&format=png&color=000000'
    }

    if (networkState?.type === 'CELLULAR') {
        netWorkIcon = 'https://img.icons8.com/?size=100&id=83ir2E7qJHoB&format=png&color=000000'
    }

    if (networkState?.type === 'ETHERNET') {
        netWorkIcon = 'https://img.icons8.com/?size=100&id=P3_jnk6ErQF5&format=png&color=000000'
    }

    return (
        <View style={styles.container}>
            <View style={styles.dateTime}>
                <Text style={styles.dateText}>{new Date().toString().substring(0, 10)}</Text>
                <Text style={styles.timeText}>{new Date().toLocaleTimeString().substring(0, 5)}</Text>
            </View>
            <View style={styles.battery}>
                <View style={styles.network}>
                    <Image style={styles.networkIcon} source={{ uri: netWorkIcon }} />
                </View>
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

    network: {
        marginRight:3
    },

    networkIcon: {
        width: 16,
        height: 14,
        tintColor: '#4a5565'
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
    },

    dateTime: {
        flexDirection: 'row',
        gap: 10
    }
})