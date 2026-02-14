import { BorderRadius, Colors, Shadows } from '@/constants/theme'
import { Chair } from '@/interfaces/Chair'
import { getAllChairs } from '@/service/ChairService'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const categories = [
    { id: '1', label: 'All', icon: '🏠' },
    { id: '2', label: 'Chairs', icon: '🪑' },
    { id: '3', label: 'Sofas', icon: '🛋️' },
    { id: '4', label: 'Tables', icon: '🪵' },
    { id: '5', label: 'Beds', icon: '🛏️' },
    { id: '6', label: 'Storage', icon: '🗄️' },
]

interface ProductCardProps {
    item: Chair
    index: number
    onPress: () => void
    onWishlistPress: () => void
    isWishlisted: boolean
}

const ProductCard = ({ item, index, onPress, onWishlistPress, isWishlisted }: ProductCardProps) => (
    <Pressable style={styles.productCard} onPress={onPress}>
        <View style={styles.productImageContainer}>
            <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                contentFit="cover"
                transition={300}
            />
            <TouchableOpacity style={styles.wishlistBtn} onPress={onWishlistPress}>
                <Ionicons
                    name={isWishlisted ? 'heart' : 'heart-outline'}
                    size={20}
                    color={isWishlisted ? '#FF7675' : '#718096'}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
            <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.productDescription} numberOfLines={1}>{item.description}</Text>
            <View style={styles.productPriceRow}>
                <Text style={styles.productPrice}>${item.price}</Text>
                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={12} color="#FFB300" />
                    <Text style={styles.ratingText}>4.5</Text>
                </View>
            </View>
        </View>
    </Pressable>
)

export default function UserDashbaord() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('1')
    const [chairs, setChairs] = useState<Chair[]>([])
    const [loading, setLoading] = useState(true)
    const [wishlist, setWishlist] = useState<string[]>([])

    useEffect(() => {
        fetchChairs()
    }, [])

    const fetchChairs = async () => {
        try {
            setLoading(true)
            const data = await getAllChairs()
            setChairs(data as Chair[])
        } catch (error) {
            console.error('Error fetching chairs:', error)
        } finally {
            setLoading(false)
        }
    }

    const toggleWishlist = (id: string) => {
        setWishlist(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const filteredChairs = chairs.filter(chair =>
        chair.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleProductPress = (chair: Chair) => {
        // Navigate to product detail
        console.log('Product pressed:', chair.id)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello, John!</Text>
                    <Text style={styles.subGreeting}>Find your perfect furniture</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="notifications-outline" size={24} color="#4a5565" />
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.avatarBtn}>
                        <Ionicons name="person" size={20} color="#2b7fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search-outline" size={20} color="#718096" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search furniture..."
                        placeholderTextColor="#9E9E9E"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color="#9E9E9E" />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <Ionicons name="options-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            >
                {categories.map(category => (
                    <TouchableOpacity
                        key={category.id}
                        onPress={() => setSelectedCategory(category.id)}
                        activeOpacity={0.7}
                    >
                        {selectedCategory === category.id ? (
                            <LinearGradient
                                colors={Colors.gradientPurpleCoral}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.categoryChipSelected}
                            >
                                <Text style={styles.categoryIcon}>{category.icon}</Text>
                                <Text style={styles.categoryLabelSelected}>{category.label}</Text>
                            </LinearGradient>
                        ) : (
                            <View style={styles.categoryChip}>
                                <Text style={styles.categoryIcon}>{category.icon}</Text>
                                <Text style={styles.categoryLabel}>{category.label}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Banner */}
            <LinearGradient
                colors={Colors.gradientPurpleCoral}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.bannerTitle}>Special Offer!</Text>
                    <Text style={styles.bannerSubtitle}>Get 25% off on all furniture</Text>
                    <TouchableOpacity style={styles.bannerBtn}>
                        <Text style={styles.bannerBtnText}>Shop Now</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bannerImageContainer}>
                    <Ionicons name="gift-outline" size={60} color="rgba(255,255,255,0.3)" />
                </View>
            </LinearGradient>

            {/* Products Section */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular Products</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#2b7fff" />
                    <Text style={styles.loadingText}>Loading products...</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredChairs}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.productRow}
                    contentContainerStyle={styles.productList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <ProductCard
                            item={item}
                            index={index}
                            onPress={() => handleProductPress(item)}
                            onWishlistPress={() => toggleWishlist(item.id)}
                            isWishlisted={wishlist.includes(item.id)}
                        />
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="cube-outline" size={60} color="#BDBDBD" />
                            <Text style={styles.emptyText}>No products found</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FF',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    greeting: {
        fontSize: 22,
        fontFamily: 'Robotslab',
        fontWeight: '700',
        color: '#4a5565',
    },

    subGreeting: {
        fontSize: 14,
        color: '#718096',
        marginTop: 2,
    },

    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    iconBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.small,
    },

    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF4444',
    },

    avatarBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#E8F4FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#2b7fff',
    },

    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 15,
    },

    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: BorderRadius.lg,
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        gap: 10,
    },

    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#4a5565',
    },

    filterBtn: {
        width: 50,
        height: 50,
        borderRadius: BorderRadius.lg,
        backgroundColor: '#2b7fff',
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.medium,
    },

    categoriesContainer: {
        paddingHorizontal: 20,
        gap: 10,
        marginBottom: 20,
    },

    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        gap: 6,
    },

    categoryChipSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        gap: 6,
    },

    categoryIcon: {
        fontSize: 16,
    },

    categoryLabel: {
        fontSize: 14,
        color: '#4a5565',
        fontWeight: '500',
    },

    categoryLabelSelected: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },

    banner: {
        marginHorizontal: 20,
        borderRadius: BorderRadius.xl,
        padding: 20,
        flexDirection: 'row',
        marginBottom: 20,
        overflow: 'hidden',
    },

    bannerContent: {
        flex: 1,
    },

    bannerTitle: {
        fontSize: 20,
        fontFamily: 'Robotslab',
        fontWeight: '700',
        color: '#fff',
    },

    bannerSubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 5,
    },

    bannerBtn: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: 12,
    },

    bannerBtnText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2b7fff',
    },

    bannerImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Robotslab',
        fontWeight: '700',
        color: '#4a5565',
    },

    seeAllText: {
        fontSize: 14,
        color: '#2b7fff',
        fontWeight: '500',
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    loadingText: {
        fontSize: 14,
        color: '#718096',
    },

    productList: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },

    productRow: {
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },

    productCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: BorderRadius.card,
        marginBottom: 15,
        overflow: 'hidden',
        ...Shadows.card,
    },

    productImageContainer: {
        width: '100%',
        height: 140,
        backgroundColor: '#F5F5F5',
        position: 'relative',
    },

    productImage: {
        width: '100%',
        height: '100%',
    },

    wishlistBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.small,
    },

    productInfo: {
        padding: 12,
    },

    productTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#4a5565',
        marginBottom: 4,
    },

    productDescription: {
        fontSize: 12,
        color: '#718096',
        marginBottom: 8,
    },

    productPriceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    productPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2b7fff',
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },

    ratingText: {
        fontSize: 12,
        color: '#718096',
        fontWeight: '500',
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
        gap: 10,
    },

    emptyText: {
        fontSize: 16,
        color: '#718096',
    },
})