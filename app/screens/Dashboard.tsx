import Header from '@/components/header';
import { Chair } from '@/interfaces/Chair';
import { getAllChairs } from '@/service/ChairService';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

import React, { useEffect, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Dashboard() {

    const router = useRouter();
    const [chairs, setChairs] = useState<Chair[]>([]);
    const [loading, setLoading] = useState(true);

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
        <View>
            <Header />
            <View style={styles.container}>
                <ScrollView
                    style={styles.subContainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text style={styles.title}>Everything You Need{'\n'}in One Place</Text>
                    <Text style={styles.description}>
                        Manage your account and control
                        settings from one dashboard.
                    </Text>
                    <View style={styles.searchContainer}>
                        <TextInput style={styles.searchInput} placeholder="Search..." />
                        <Pressable style={styles.searchBtn}>
                            <EvilIcons name="search" size={24} color="white" />
                        </Pressable>
                    </View>

                    {/* Discount Coupen */}
                    <View style={styles.coupenContainer}>
                        <Text style={styles.couponTitle}>WELCOME DEAL</Text>
                        <Text style={styles.couponDescription}>Enjoy instant savings on your next purchase
                            and make the most of this special offer before it expires soon.</Text>
                        <Pressable style={styles.couponBtn}>
                            <Text style={styles.couponBtnText}>10% Off Discount</Text>
                        </Pressable>
                        <Image style={styles.couponImg} source={require('../../assets/images/bg-img.png')} />
                    </View>

                    {/* Product Card */}
                    <View style={styles.productCard}>
                        <Image
                            style={styles.productImage}
                            source={require('../../assets/images/bg-img.png')}
                        />
                        <Pressable style={styles.favoriteBtn}>
                            <MaterialIcons name="favorite" size={18} color="#4a5565" />
                        </Pressable>
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>Modern Armchair</Text>
                            <Text style={styles.productDescription}>Comfortable & Stylish Seating</Text>
                            <View style={styles.productFooter}>
                                <Text style={styles.productPrice}>$299.99</Text>
                                <Pressable style={styles.addToCartBtn}>
                                    <Text style={styles.addToCartText}>Add to Cart</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>



                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    couponImg: {
        height: 65,
        width: 65,
        position: 'absolute',
        right: 25,
        top: 90
    },

    couponBtn: {
        backgroundColor: '#4a5565',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 25,
        alignSelf: 'flex-start',
        marginTop: 15
    },

    couponBtnText: {
        color: '#fff',
        fontFamily: 'Josefin',
    },

    couponTitle: {
        fontFamily: 'Josefin-Bold',
        fontSize: 15.5,
        color: '#4a5565',
    },

    couponDescription: {
        color: '#718096',
        marginTop: 5
    },

    coupenContainer: {
        marginTop: 25,
        padding: 15,
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        position: 'relative',
        boxShadow: 'rgba(141, 146, 151, 0.2) 0px 8px 24px',
    },

    container: {
        paddingHorizontal: 30,
        marginTop: 25
    },

    subContainer: {
        marginTop: 60
    },

    scrollContent: {
        paddingBottom: 100,
    },

    title: {
        fontFamily: 'Josefin-Bold',
        fontSize: 20,
        color: '#4a5565',
    },

    description: {
        color: '#718096',
        marginTop: 10
    },

    searchInput: {
        backgroundColor: '#F9FAFB',
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 25,
        width: 300,
    },

    searchContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },

    searchBtn: {
        backgroundColor: '#4a5565',
        height: 50,
        width: 50,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    productCard: {
        marginTop: 25,
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
        boxShadow: 'rgba(141, 146, 151, 0.15) 0px 8px 24px',
        position: 'relative',
    },

    productImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#F9FAFB',
        resizeMode: 'cover',
    },

    favoriteBtn: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: '#fff',
        width: 35,
        height: 35,
        borderRadius: 17.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'rgba(141, 146, 151, 0.2) 0px 4px 12px',
    },

    productInfo: {
        padding: 15,
    },

    productName: {
        fontFamily: 'Josefin-Bold',
        fontSize: 18,
        color: '#4a5565',
    },

    productDescription: {
        color: '#718096',
        fontSize: 14,
        marginTop: 5,
    },

    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },

    productPrice: {
        fontFamily: 'Josefin-Bold',
        fontSize: 20,
        color: '#4a5565',
    },

    addToCartBtn: {
        backgroundColor: '#4a5565',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },

    addToCartText: {
        color: '#fff',
        fontFamily: 'Josefin',
        fontSize: 14,
    },

})