import Header from '@/components/header';
import { getAllChairs } from '@/service/ChairService';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Chair {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
}

export default function Admin() {

    const router = useRouter();
    const [chairs, setChairs] = useState<Chair[]>([]);
    const [loading, setLoading] = useState(true);

    const gotoAddChair = () => {
        router.replace('/screens/AddChair')
    }

    const gotoChairByID = (id: string) => {
        router.push({
            pathname: '/screens/GetChairByIDAdmin',
            params: { id }
        })
    }

    // Load All Chairs on component mount
    useEffect(() => {
        const fetchChairs = async () => {
            setLoading(true);
            try {
                const chairsData = await getAllChairs();
                setChairs(chairsData as Chair[]);
            } catch (error) {
                console.error('Error fetching chairs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchChairs();
    }, []);

    // Skeleton Loader Component
    const SkeletonCard = () => {
        const shimmerAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shimmerAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(shimmerAnim, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }, []);

        const opacity = shimmerAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 0.7],
        });

        return (
            <Animated.View style={[styles.skeletonCard, { opacity }]}>
                <View style={styles.skeletonImage} />
                <View style={styles.skeletonContent}>
                    <View style={styles.skeletonTitle} />
                    <View style={styles.skeletonDescription} />
                    <View style={styles.skeletonPrice} />
                </View>
            </Animated.View>
        );
    };

    return (
        <ScrollView style={styles.scrollView}>
            <Header />
            <View style={styles.container}>
                <Text style={styles.title}>Furnix App{'\n'}Administration Center</Text>
                <Text style={styles.description}>A centralized hub to manage operations,
                    track growth, and optimize your business.</Text>

                <Pressable style={styles.addProductBtn} onPress={gotoAddChair}>
                    <Text style={styles.addProductText}>Add New Chair</Text>
                    <FontAwesome6 name="add" size={16} color="#4a5565" />
                </Pressable>

                {/* Chair cards */}
                <View style={styles.chairsContainer}>
                    {loading ? (
                        // Show skeleton loaders while loading
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    ) : chairs.length > 0 ? (
                        chairs.map((chair) => (
                            <Pressable onPress={() => gotoChairByID(chair.id)} key={chair.id} style={styles.chairCard}>
                                <Text style={styles.chairTitle}>{chair.title}</Text>
                                <Image source={{ uri: chair.image }} style={styles.chairCardImage} />
                                <Text style={styles.chairDescription}>{chair.description}</Text>
                                <Text style={styles.chairPrice}>${chair.price}</Text>
                            </Pressable>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>No chairs available</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    scrollView: {
        backgroundColor: '#fff',
    },

    chairCardImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 15
    },

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
        marginTop: 40,
        borderColor: '#4a5565',
        borderWidth: 0.5,
        paddingVertical: 10,
        borderRadius: 25,
    },

    container: {
        paddingHorizontal: 30,
        marginTop: 90,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontFamily: 'Josefin-Bold',
        color: '#4a5565',
    },

    description: {
        marginTop: 10,
        color: '#718096',
    },

    // Chair cards styles
    chairsContainer: {
        marginTop: 40,
        gap: 15,
    },

    chairCard: {
        backgroundColor: '#f7fafc',
        borderRadius: 15,
        padding: 20,
        borderWidth: 0.5,
        borderColor: '#e2e8f0',
    },

    chairTitle: {
        fontSize: 18,
        fontFamily: 'Josefin-Bold',
        color: '#4a5565',
        marginBottom: 8,
    },

    chairDescription: {
        color: '#718096',
        marginBottom: 12,
        lineHeight: 20,
    },

    chairPrice: {
        fontSize: 20,
        fontFamily: 'Josefin-Bold',
        color: '#4a5565',
    },

    emptyText: {
        textAlign: 'center',
        color: '#718096',
        marginTop: 20,
        fontSize: 16,
    },

    // Skeleton loader styles
    skeletonCard: {
        backgroundColor: '#f7fafc',
        borderRadius: 15,
        padding: 20,
        borderWidth: 0.5,
        borderColor: '#e2e8f0',
        marginBottom: 15,
    },

    skeletonImage: {
        width: '100%',
        height: 120,
        backgroundColor: '#e2e8f0',
        borderRadius: 10,
        marginBottom: 15,
    },

    skeletonContent: {
        gap: 10,
    },

    skeletonTitle: {
        width: '60%',
        height: 20,
        backgroundColor: '#e2e8f0',
        borderRadius: 5,
    },

    skeletonDescription: {
        width: '90%',
        height: 16,
        backgroundColor: '#e2e8f0',
        borderRadius: 5,
    },

    skeletonPrice: {
        width: '30%',
        height: 24,
        backgroundColor: '#e2e8f0',
        borderRadius: 5,
        marginTop: 5,
    },
})