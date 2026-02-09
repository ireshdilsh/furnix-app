import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Header from '@/components/header'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';

export default function Admin() {

    const router = useRouter();

    const gotoAddChair = () => {
        router.replace('/screens/AddChair')
    }

    return (
        <View>
            <Header />
            <View style={styles.container}>
                <Text style={styles.title}>Furnix App{'\n'}Administration Center</Text>
                <Text style={styles.description}>A centralized hub to manage operations,
                    track growth, and optimize your business.</Text>

                <Pressable style={styles.addProductBtn} onPress={gotoAddChair}>
                    <Text style={styles.addProductText}>Add New Chair</Text>
                    <FontAwesome6 name="add" size={16} color="#4a5565" />
                </Pressable>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    addProductText: {
        fontSize: 16,
        color: '#4a5565',
        fontFamily: 'Josefin-Bold',
    },

    addProductBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginTop: 20,
        borderColor: '#4a5565',
        borderWidth: 0.5,
        paddingVertical: 10,
        borderRadius: 25,
    },

    container: {
        paddingHorizontal: 30,
        marginTop: 70,
    },
    title: {
        fontSize: 22,
        fontFamily: 'Josefin-Bold',
        color: '#4a5565',
    },

    description: {
        marginTop: 10,
        color: '#718096',
        // fontSize: 16,
    },
})