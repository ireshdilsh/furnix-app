import ProductCard from '@/components/ui/ProductCard'
import ProfileDropdown from '@/components/ui/ProfileDropdown'
import { Colors } from '@/constants/theme'
import { Chair } from '@/interfaces/Chair'
import { getAllChairs } from '@/service/ChairService'
import { Ionicons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function AdminProducts() {
    const [chairs, setChairs] = useState<Chair[]>([])
    const [loading, setLoading] = useState(true)

    const loadChairs = useCallback(async () => {
        try {
            setLoading(true)
            const data = await getAllChairs()
            setChairs(data)
        } catch (error) {
            console.error('Error loading chairs:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    // Reload chairs every time the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadChairs()
        }, [loadChairs])
    )

    const gotoProductWithID = (id: string) => {
        router.push({
            pathname: '/screens/AdminProductDetail',
            params: { id }
        })
    }

    const gotoAddProduct = () => {
        router.push('/screens/AddProduct')
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Admin Panel</Text>
                        <Text style={styles.subtitle}>Manage your products inventory</Text>
                    </View>
                    <ProfileDropdown />
                </View>

                {/* Add Product Button */}
                <Pressable style={styles.addButton} onPress={gotoAddProduct}>
                    <Ionicons name="add-circle" size={24} color="#fff" />
                    <Text style={styles.addButtonText}>Add New Product</Text>
                </Pressable>

                {/* Product Count */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Ionicons name="cube-outline" size={28} color={Colors.gradientPurpleCoral[0]} />
                        <Text style={styles.statNumber}>{chairs.length}</Text>
                        <Text style={styles.statLabel}>Total Products</Text>
                    </View>
                </View>

                {/* Products Section */}
                <Text style={styles.sectionTitle}>All Products</Text>

                {loading ? (
                    <ActivityIndicator size="large" color={Colors.gradientPurpleCoral[0]} style={styles.loader} />
                ) : chairs.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="cube-outline" size={60} color="#ccc" />
                        <Text style={styles.emptyText}>No products found</Text>
                        <Text style={styles.emptySubtext}>Add your first product to get started</Text>
                    </View>
                ) : (
                    <View style={styles.productsGrid}>
                        {chairs.map((chair, index) => (
                            <ProductCard
                                key={chair.id}
                                id={chair.id}
                                title={chair.title}
                                description={chair.description}
                                price={chair.price}
                                image={chair.image}
                                onPress={() => gotoProductWithID(chair.id)}
                                index={index}
                                style={styles.productCard}
                            />
                        ))}
                    </View>
                )}

                <View style={{ height: 30 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F9FF',
        flex: 1,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 28,
    },
    header: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Robotslab',
        fontSize: 28,
        color: '#1F2937',
    },
    subtitle: {
        color: '#6B7280',
        marginTop: 8,
        fontSize: 15,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.gradientPurpleCoral[0],
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 20,
        gap: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Robotslab',
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statNumber: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1F2937',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    sectionTitle: {
        fontFamily: 'Robotslab',
        fontSize: 20,
        marginTop: 25,
        color: '#1F2937',
    },
    loader: {
        marginTop: 30,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#6B7280',
        marginTop: 15,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#9CA3AF',
        marginTop: 5,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    productCard: {
        width: '48%',
        marginBottom: 15,
    },
})
