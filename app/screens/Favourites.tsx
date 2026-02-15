import { Colors } from '@/constants/theme'
import { useFavourites } from '@/context/FavouritesContext'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function Favourites() {
    const { favourites, loading, removeFromFavourites } = useFavourites()

    const handleRemove = (productId: string, title: string) => {
        Alert.alert(
            'Remove from Favourites',
            `Remove "${title}" from your favourites?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await removeFromFavourites(productId)
                        } catch (error) {
                            console.error('Error removing:', error)
                        }
                    },
                },
            ]
        )
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Loading favourites...</Text>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: '#F8F9FF', flex: 1 }}>
            <ScrollView style={{ flex: 1, paddingHorizontal: 28 }} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </Pressable>
                    <Text style={styles.headerTitle}>My Favourites</Text>
                    <View style={{ width: 44 }} />
                </View>

                {favourites.length === 0 ? (
                    /* Empty State */
                    <View style={styles.emptyContainer}>
                        <Ionicons name="heart-outline" size={80} color={Colors.gradientPurpleCoral[0]} />
                        <Text style={styles.emptyTitle}>No favourites yet</Text>
                        <Text style={styles.emptyText}>
                            Start adding items to your favourites by tapping the heart icon on products you love.
                        </Text>
                        <Pressable
                            onPress={() => router.push('/screens/UserProduct' as any)}
                            style={styles.shopButton}
                        >
                            <LinearGradient
                                colors={Colors.gradientPurpleCoral}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.shopButtonGradient}
                            >
                                <Text style={styles.shopButtonText}>Browse Products</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
                ) : (
                    /* Favourites List */
                    <View style={styles.listContainer}>
                        <Text style={styles.countText}>{favourites.length} item(s)</Text>
                        {favourites.map((item) => (
                            <View key={item.id} style={styles.favouriteCard}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.itemImage}
                                    contentFit="cover"
                                />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                                    <Text style={styles.itemDescription} numberOfLines={1}>{item.description}</Text>
                                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                                </View>
                                <Pressable
                                    style={styles.removeButton}
                                    onPress={() => handleRemove(item.productId, item.title)}
                                >
                                    <Ionicons name="heart" size={22} color={Colors.error} />
                                </Pressable>
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: 30 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: '#F8F9FF',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    loadingText: {
        fontSize: 14,
        color: '#6B7280',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 60,
        marginBottom: 20,
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'Robotslab',
        fontSize: 20,
        color: '#1F2937',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    emptyTitle: {
        fontFamily: 'Robotslab',
        fontSize: 20,
        color: '#374151',
        marginTop: 20,
    },
    emptyText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
        lineHeight: 22,
    },
    shopButton: {
        marginTop: 30,
        borderRadius: 12,
        overflow: 'hidden',
    },
    shopButtonGradient: {
        paddingVertical: 14,
        paddingHorizontal: 32,
    },
    shopButtonText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#fff',
    },
    listContainer: {
        gap: 12,
    },
    countText: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 4,
    },
    favouriteCard: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: '#f3f4f6',
    },
    itemDetails: {
        flex: 1,
        gap: 4,
    },
    itemTitle: {
        fontFamily: 'Robotslab',
        fontSize: 15,
        color: '#1F2937',
    },
    itemDescription: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    itemPrice: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: Colors.primary,
        marginTop: 4,
    },
    removeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
