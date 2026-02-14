/**
 * WishlistScreen - Modern Gen Z styled wishlist screen
 * Features: Grid layout, large images, quick add to cart
 */

import { EmptyState } from '@/components/ui';
import { BorderRadius, Colors, Layout, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - Layout.screenPadding * 2 - Spacing.md) / 2;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Mock Wishlist Data
const INITIAL_WISHLIST = [
    {
        id: '1',
        title: 'Modern Velvet Sofa',
        price: 899.99,
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
    {
        id: '5',
        title: 'Ergonomic Office Chair',
        price: 599.99,
        image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
        rating: 4.7,
    },
    {
        id: '6',
        title: 'Rattan Lounge Chair',
        price: 429.99,
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
        rating: 4.8,
    },
];

interface WishlistItemProps {
    id: string;
    title: string;
    price: number;
    image: string;
    rating: number;
    index: number;
    onRemove: () => void;
    onAddToCart: () => void;
    onPress: () => void;
}

function WishlistItem({
    id,
    title,
    price,
    image,
    rating,
    index,
    onRemove,
    onAddToCart,
    onPress,
}: WishlistItemProps) {
    const scale = useSharedValue(1);
    const cartScale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const cartButtonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: cartScale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    };

    const handleAddToCart = () => {
        cartScale.value = withSpring(1.2, { damping: 10 }, () => {
            cartScale.value = withSpring(1);
        });
        onAddToCart();
    };

    return (
        <Animated.View
            entering={FadeInUp.delay(index * 100).duration(400)}
            style={styles.cardContainer}
        >
            <AnimatedPressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[styles.card, animatedStyle]}
            >
                {/* Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                        contentFit="cover"
                        transition={300}
                    />

                    {/* Remove Button */}
                    <Pressable onPress={onRemove} style={styles.removeButton}>
                        <Ionicons name="close" size={16} color={Colors.textMuted} />
                    </Pressable>
                </View>

                {/* Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>

                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={12} color={Colors.warning} />
                        <Text style={styles.rating}>{rating}</Text>
                    </View>

                    <View style={styles.bottomRow}>
                        <Text style={styles.price}>${price.toFixed(2)}</Text>

                        {/* Add to Cart Button */}
                        <AnimatedPressable
                            onPress={handleAddToCart}
                            style={cartButtonStyle}
                        >
                            <LinearGradient
                                colors={Colors.gradientPurple}
                                style={styles.addButton}
                            >
                                <Ionicons name="add" size={18} color={Colors.white} />
                            </LinearGradient>
                        </AnimatedPressable>
                    </View>
                </View>
            </AnimatedPressable>
        </Animated.View>
    );
}

interface WishlistScreenProps {
    navigation?: any;
}

export default function WishlistScreen({ navigation }: WishlistScreenProps) {
    const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

    const handleRemove = (id: string) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id));
    };

    const handleAddToCart = (id: string) => {
        // Add to cart logic
        console.log('Added to cart:', id);
    };

    const handlePress = (id: string) => {
        navigation?.navigate('ProductDetails', { productId: id });
    };

    if (wishlist.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundLight} />

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Wishlist</Text>
                </View>

                <EmptyState
                    emoji="💜"
                    title="Your wishlist is empty"
                    subtitle="Save your favorite items here to find them later!"
                    actionTitle="Explore Products"
                    onAction={() => navigation?.navigate('Home')}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundLight} />

            {/* Header */}
            <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
                <Text style={styles.headerTitle}>Wishlist</Text>
                <Text style={styles.itemCount}>{wishlist.length} items</Text>
            </Animated.View>

            <FlatList
                data={wishlist}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={({ item, index }) => (
                    <WishlistItem
                        {...item}
                        index={index}
                        onRemove={() => handleRemove(item.id)}
                        onAddToCart={() => handleAddToCart(item.id)}
                        onPress={() => handlePress(item.id)}
                    />
                )}
            />

            {/* Microcopy */}
            <View style={styles.microcopyContainer}>
                <Text style={styles.microcopy}>Added to your vibe ✨</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Layout.screenPadding,
        paddingVertical: Spacing.lg,
    },
    headerTitle: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.h2,
        color: Colors.textPrimary,
    },
    itemCount: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
    },
    listContent: {
        paddingHorizontal: Layout.screenPadding,
        paddingBottom: Spacing.xxl,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: Spacing.md,
    },
    cardContainer: {
        width: CARD_WIDTH,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.card,
        overflow: 'hidden',
        ...Shadows.card,
    },
    imageContainer: {
        width: '100%',
        height: CARD_WIDTH * 1.1,
        backgroundColor: Colors.gray100,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    removeButton: {
        position: 'absolute',
        top: Spacing.sm,
        right: Spacing.sm,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.small,
    },
    infoContainer: {
        padding: Spacing.md,
    },
    title: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
        color: Colors.textPrimary,
        lineHeight: Typography.fontSize.sm * 1.3,
        marginBottom: Spacing.xs,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: Spacing.sm,
    },
    rating: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.xs,
        color: Colors.textSecondary,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.lg,
        color: Colors.primary,
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.glow,
    },
    microcopyContainer: {
        paddingVertical: Spacing.md,
        alignItems: 'center',
    },
    microcopy: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
    },
});
