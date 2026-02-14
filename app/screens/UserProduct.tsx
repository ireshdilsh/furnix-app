import ProductCard from '@/components/ui/ProductCard'
import { Colors } from '@/constants/theme'
import { Chair } from '@/interfaces/Chair'
import { getAllChairs } from '@/service/ChairService'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native'

export default function UserProduct() {
    const [chairs, setChairs] = useState<Chair[]>([])
    const [loading, setLoading] = useState(true)
    const [wishlist, setWishlist] = useState<string[]>([])

    useEffect(() => {
        loadChairs()
    }, [])

    const loadChairs = async () => {
        try {
            const data = await getAllChairs()
            setChairs(data)
        } catch (error) {
            console.error('Error loading chairs:', error)
        } finally {
            setLoading(false)
        }
    }

    const toggleWishlist = (id: string) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    return (
        <View style={{ backgroundColor: '#F8F9FF', flex: 1 }}>
            <ScrollView style={{ flex: 1, paddingHorizontal: 28 }} showsVerticalScrollIndicator={false}>

                <Text style={{
                    fontFamily: 'Robotslab',
                    fontSize: 21,
                    marginTop: 80
                }}>Discover What&apos;s New</Text>

                <Text style={{
                    color: '#6B7280',
                    marginTop: 10,
                    fontSize: 15
                }}>Browse the latest arrivals and transform your space with timeless modern designs.</Text>

                <TextInput placeholder='search here ...' style={{
                    backgroundColor: '#e5e7eb98',
                    borderRadius: 5,
                    paddingHorizontal: 15,
                    width: '100%',
                    marginTop: 15,
                    height: 48
                }} />

                {/* Discount Card */}
                <LinearGradient
                    colors={Colors.gradientPurpleCoral}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 10,
                        padding: 20,
                        marginTop: 20
                    }}
                >
                    <Text style={{
                        fontFamily: 'Robotslab',
                        fontSize: 18,
                        marginTop: 30,
                        color: '#fff'
                    }}>Exclusive 20% Off</Text>
                    <Text style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        marginTop: 10,
                    }}>Use code FURNIX20 at checkout to enjoy 20% off your entire purchase. Hurry, offer ends soon!</Text>
                </LinearGradient>

                {/* Product Cards */}
                <Text style={{
                    fontFamily: 'Robotslab',
                    fontSize: 18,
                    marginTop: 25
                }}>Popular Products</Text>

                {loading ? (
                    <ActivityIndicator size="large" color={Colors.gradientPurpleCoral[0]} style={{ marginTop: 30 }} />
                ) : (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 15 }}>
                        {chairs.map((chair, index) => (
                            <ProductCard
                                key={chair.id}
                                id={chair.id}
                                title={chair.title}
                                description={chair.description}
                                price={chair.price}
                                image={chair.image}
                                isWishlisted={wishlist.includes(chair.id)}
                                onWishlistPress={() => toggleWishlist(chair.id)}
                                onPress={() => console.log('Chair pressed:', chair.id)}
                                index={index}
                                style={{ width: '48%', marginBottom: 15 }}
                            />
                        ))}
                    </View>
                )}

                <View style={{ height: 30 }} />
            </ScrollView>
        </View>
    )
}
