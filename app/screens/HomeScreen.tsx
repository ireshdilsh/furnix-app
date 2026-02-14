/**
 * HomeScreen - Modern Gen Z styled home screen
 * Features: Search bar, category chips, trending products, personalized sections
 */

import {
    Avatar,
    CategoryChip,
    ProductCard,
    SearchBar,
    SectionHeader,
} from '@/components/ui';
import { BorderRadius, Colors, Layout, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    FlatList,
    Pressable,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data
const CATEGORIES = [
    { id: '1', label: 'All', icon: '🏠' },
    { id: '2', label: 'Living', icon: '🛋️' },
    { id: '3', label: 'Bedroom', icon: '🛏️' },
    { id: '4', label: 'Office', icon: '💼' },
    { id: '5', label: 'Outdoor', icon: '🌿' },
    { id: '6', label: 'Kitchen', icon: '🍳' },
];

const TRENDING_PRODUCTS = [
    {
        id: '1',
        title: 'Modern Velvet Sofa',
        price: 899.99,
        originalPrice: 1199.99,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        rating: 4.8,
    },
    {
        id: '2',
        title: 'Minimalist Oak Chair',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
        rating: 4.5,
    },
    {
        id: '3',
        title: 'Scandinavian Coffee Table',
        price: 349.99,
        originalPrice: 449.99,
        image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400',
        rating: 4.9,
    },
    {
        id: '4',
        title: 'Luxury Bedside Lamp',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
        rating: 4.6,
    },
];

const FOR_YOUR_ROOM = [
    {
        id: '5',
        title: 'Ergonomic Office Chair',
        price: 599.99,
        originalPrice: 799.99,
        image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
        rating: 4.7,
    },
    {
        id: '6',
        title: 'Floating Wall Shelf',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1597072689227-8882273e8f6a?w=400',
        rating: 4.4,
    },
    {
        id: '7',
        title: 'Rattan Lounge Chair',
        price: 429.99,
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
        rating: 4.8,
    },
    {
        id: '8',
        title: 'Modern Floor Lamp',
        price: 189.99,
        originalPrice: 249.99,
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
        rating: 4.5,
    },
];

interface HomeScreenProps {
    navigation?: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('1');
    const [refreshing, setRefreshing] = useState(false);
    const [wishlist, setWishlist] = useState<string[]>([]);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    };

    const toggleWishlist = (id: string) => {
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const navigateToProduct = (id: string) => {
        navigation?.navigate('ProductDetails', { productId: id });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundLight} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={Colors.primary}
                        colors={[Colors.primary]}
                    />
                }
            >
                {/* Header */}
                <Animated.View
                    entering={FadeIn.duration(400)}
                    style={styles.header}
                >
                    <View style={styles.headerLeft}>
                        <Text style={styles.greeting}>Hello, there 👋</Text>
                        <Text style={styles.headerTitle}>Find your perfect furniture</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Pressable style={styles.notificationButton}>
                            <Ionicons
                                name="notifications-outline"
                                size={24}
                                color={Colors.textPrimary}
                            />
                            <View style={styles.notificationBadge} />
                        </Pressable>
                        <Avatar
                            source="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                            size="medium"
                            showBorder
                            onPress={() => navigation?.navigate('Profile')}
                        />
                    </View>
                </Animated.View>

                {/* Search Bar */}
                <Animated.View
                    entering={FadeInDown.delay(100).duration(400)}
                    style={styles.searchContainer}
                >
                    <SearchBar
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search furniture..."
                        onFilterPress={() => { }}
                    />
                </Animated.View>

                {/* Category Chips */}
                <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContainer}
                    >
                        {CATEGORIES.map((category) => (
                            <CategoryChip
                                key={category.id}
                                label={category.label}
                                icon={category.icon}
                                isSelected={selectedCategory === category.id}
                                onPress={() => setSelectedCategory(category.id)}
                                style={styles.categoryChip}
                            />
                        ))}
                    </ScrollView>
                </Animated.View>

                {/* Featured Banner */}
                <Animated.View
                    entering={FadeInDown.delay(300).duration(400)}
                    style={styles.bannerContainer}
                >
                    <LinearGradient
                        colors={Colors.gradientPurple}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.banner}
                    >
                        <View style={styles.bannerContent}>
                            <Text style={styles.bannerSubtitle}>New Collection</Text>
                            <Text style={styles.bannerTitle}>Up to 40% Off</Text>
                            <Text style={styles.bannerDescription}>
                                Discover our latest furniture collection
                            </Text>
                            <Pressable style={styles.bannerButton}>
                                <Text style={styles.bannerButtonText}>Shop Now</Text>
                                <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
                            </Pressable>
                        </View>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300' }}
                            style={styles.bannerImage}
                            contentFit="cover"
                        />
                    </LinearGradient>
                </Animated.View>

                {/* Trending Now Section */}
                <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                    <SectionHeader
                        title="Trending Now"
                        subtitle="Most popular this week"
                        showSeeAll
                        onSeeAllPress={() => { }}
                        style={styles.sectionHeader}
                    />
                    <FlatList
                        horizontal
                        data={TRENDING_PRODUCTS}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.productsContainer}
                        renderItem={({ item, index }) => (
                            <ProductCard
                                {...item}
                                isWishlisted={wishlist.includes(item.id)}
                                onWishlistPress={() => toggleWishlist(item.id)}
                                onPress={() => navigateToProduct(item.id)}
                                style={styles.productCard}
                                index={index}
                            />
                        )}
                    />
                </Animated.View>

                {/* For Your Room Section */}
                <Animated.View entering={FadeInDown.delay(500).duration(400)}>
                    <SectionHeader
                        title="For Your Room"
                        subtitle="Personalized picks for you"
                        showSeeAll
                        onSeeAllPress={() => { }}
                        style={styles.sectionHeader}
                    />
                    <FlatList
                        horizontal
                        data={FOR_YOUR_ROOM}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.productsContainer}
                        renderItem={({ item, index }) => (
                            <ProductCard
                                {...item}
                                isWishlisted={wishlist.includes(item.id)}
                                onWishlistPress={() => toggleWishlist(item.id)}
                                onPress={() => navigateToProduct(item.id)}
                                style={styles.productCard}
                                index={index}
                            />
                        )}
                    />
                </Animated.View>

                {/* Looks Good Text */}
                <Animated.View
                    entering={FadeInDown.delay(600).duration(400)}
                    style={styles.footerText}
                >
                    <Text style={styles.microcopy}>
                        Looks good in your space 👀
                    </Text>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    scrollContent: {
        paddingBottom: Layout.tabBarHeight + Spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Layout.screenPadding,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.lg,
    },
    headerLeft: {
        flex: 1,
    },
    greeting: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textSecondary,
        marginBottom: Spacing.xxs,
    },
    headerTitle: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.xxl,
        color: Colors.textPrimary,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.small,
    },
    notificationBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.accent,
        borderWidth: 2,
        borderColor: Colors.white,
    },
    searchContainer: {
        paddingHorizontal: Layout.screenPadding,
        marginBottom: Spacing.lg,
    },
    categoriesContainer: {
        paddingHorizontal: Layout.screenPadding,
        paddingBottom: Spacing.lg,
        gap: Spacing.sm,
    },
    categoryChip: {
        marginRight: Spacing.sm,
    },
    bannerContainer: {
        paddingHorizontal: Layout.screenPadding,
        marginBottom: Spacing.xl,
    },
    banner: {
        borderRadius: BorderRadius.xxl,
        overflow: 'hidden',
        flexDirection: 'row',
        minHeight: 180,
        ...Shadows.large,
    },
    bannerContent: {
        flex: 1,
        padding: Spacing.xl,
        justifyContent: 'center',
    },
    bannerSubtitle: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: Spacing.xs,
    },
    bannerTitle: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.h2,
        color: Colors.white,
        marginBottom: Spacing.xs,
    },
    bannerDescription: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: Spacing.md,
    },
    bannerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.lg,
        alignSelf: 'flex-start',
        gap: Spacing.xs,
    },
    bannerButtonText: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.sm,
        color: Colors.primary,
    },
    bannerImage: {
        width: 140,
        height: '100%',
    },
    sectionHeader: {
        paddingHorizontal: Layout.screenPadding,
    },
    productsContainer: {
        paddingHorizontal: Layout.screenPadding,
        paddingBottom: Spacing.lg,
        gap: Spacing.md,
    },
    productCard: {
        marginRight: Spacing.md,
    },
    footerText: {
        alignItems: 'center',
        paddingVertical: Spacing.xl,
    },
    microcopy: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
    },
});
