import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Header from '@/components/header'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function AddChair() {

    const router = useRouter();

    const gotoDashboard = () => {
        router.canGoBack() && router.canGoBack();
    }

    return (
        <View>
            <Header />
            <View style={styles.container}>
                <Pressable onPress={gotoDashboard}>
                    <Ionicons name="arrow-back-circle" size={25} color="#4a5565" />
                </Pressable>
                <Text style={styles.title}>Add New Chair to Inventory</Text>
                <Text style={styles.description}>Easily add new chair products
                    to your inventory with this simple form.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    title: {
        fontSize: 22,
        fontFamily: 'Josefin-Bold',
        color: '#4a5565',
        marginTop: 10
    },

    description: {
        marginTop: 5,
        color: '#718096',
        fontSize: 15,
    },

    container: {
        paddingHorizontal: 30,
        marginTop: 70,
    },
})