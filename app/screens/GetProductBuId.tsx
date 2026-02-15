import { Colors } from '@/constants/theme'
import { Chair } from '@/interfaces/Chair'
import { getChairByID } from '@/service/ChairService'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function GetProductBuId() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const [product, setProduct] = useState<Chair | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            getProductById()
        }
    }, [id])

    const getProductById = async () => {
        try {
            const resp = await getChairByID(id!)
            setProduct(resp)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.gradientPurpleCoral[0]} />
            </View>
        )
    }

    if (!product) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Product not found</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Back Button */}
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </Pressable>

                {/* Product Image */}
                <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                    contentFit="cover"
                />

                {/* Product Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    <Text style={styles.descriptionLabel}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>

            {/* Add to Cart Button */}
            <View style={styles.bottomContainer}>
                <Pressable style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FF',
    },
    errorText: {
        fontSize: 16,
        color: '#6B7280',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 10,
    },
    productImage: {
        width: '92%',
        marginLeft:17,
        marginTop:40,
        height: 340,
        borderRadius:10
    },
    detailsContainer: {
        padding: 24,
    },
    title: {
        fontFamily: 'Robotslab',
        fontSize: 24,
        color: '#1F2937',
        marginBottom: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.gradientPurpleCoral[0],
        marginBottom: 20,
    },
    descriptionLabel: {
        fontFamily: 'Robotslab',
        fontSize: 18,
        color: '#1F2937',
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        color: '#6B7280',
        lineHeight: 24,
    },
    bottomContainer: {
        padding: 20,
        paddingBottom: 80,
    },
    addToCartButton: {
        backgroundColor: Colors.gradientPurpleCoral[0],
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 16,
        // fontWeight: '600',
        fontFamily:'Robotslab'
    },
})
