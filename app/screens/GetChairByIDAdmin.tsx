import Header from '@/components/header'
import { getChairByID } from '@/service/ChairService'
import { useSearchParams } from 'expo-router/build/hooks'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'

interface Chair {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
}

export default function GetChairByIDAdmin() {

    const params = useSearchParams()
    const id = params.get('id')

    const [chair, setChair] = useState<Chair | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChair = async () => {
            if (id) {
                setLoading(true);
                try {
                    const chairData = await getChairByID(id);
                    console.log('Loaded Chair Data:', chairData);
                    setChair(chairData as Chair);
                } catch (error) {
                    console.error('Error fetching chair by ID:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log('No ID provided in params');
                setLoading(false);
            }
        }
        fetchChair();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <Header />
                <ActivityIndicator size="large" color="#4a5565" />
                <Text style={styles.loadingText}>Loading chair details...</Text>
            </View>
        );
    }

    if (!chair) {
        return (
            <View style={styles.centerContainer}>
                <Header />
                <Text style={styles.errorText}>Chair not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollView}>
            <Header />

            <Text></Text>
            <Text></Text>

            <View style={styles.container}>
                {chair.image && (
                    <Image
                        source={{ uri: chair.image }}
                        style={styles.chairImage}
                        resizeMode="cover"
                    />
                )}
                <Text style={styles.chairTitle}>{chair.title}</Text>
                <Text style={styles.chairPrice}>${chair.price}</Text>
                <Text style={styles.chairDescription}>{chair.description}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 28,
        fontFamily: 'Josefin-Bold',
        color: '#4a5565',
        marginTop: 25
    },

    description: {
        color: '#718096',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 15
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    container: {
        paddingHorizontal: 30,
        marginTop: 70,
        paddingBottom: 40,
    },

    chairImage: {
        width: '100%',
        height: 300,
        borderRadius: 15,
        marginBottom: 20,
    },

    chairTitle: {
        fontSize: 28,
        fontFamily: 'Josefin-Bold',
        color: '#4a5565',
        marginBottom: 12,
    },

    chairPrice: {
        fontSize: 24,
        fontFamily: 'Josefin-Bold',
        color: '#4a5565',
        marginBottom: 20,
    },

    chairDescription: {
        color: '#718096',
        fontSize: 16,
        lineHeight: 24,
    },

    loadingText: {
        marginTop: 15,
        color: '#718096',
        fontSize: 16,
    },

    errorText: {
        color: '#e53e3e',
        fontSize: 18,
        fontFamily: 'Josefin-Bold',
    },
})