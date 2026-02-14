/**
 * ProductDetailsScreen - Modern Gen Z styled product details
 * Features: Image carousel, floating buttons, expandable description, color/size selection
 */

import { Badge } from '@/components/ui';
import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Mock Product Data
const PRODUCT = {
    id: '1',
    title: 'Modern Velvet Sofa',
    description:
        "Transform your living space with this stunning Modern Velvet Sofa. Crafted with premium velvet upholstery and a solid wood frame, this sofa combines comfort with contemporary design. The deep button tufting adds a touch of elegance, while the high-density foam cushions provide exceptional support for hours of relaxation.\n\nPerfect for modern apartments, studios, or any living room that needs a style upgrade. The compact design fits easily through standard doorways while still offering generous seating space.",
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.8,
    reviewCount: 256,
    images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
        'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600',
        'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600',
    ],
    colors: [
        { name: 'Emerald', hex: '#2E7D32' },
        { name: 'Navy', hex: '#1A237E' },
        { name: 'Burgundy', hex: '#880E4F' },
        { name: 'Gray', hex: '#616161' },
    ],
    sizes: ['Small', 'Medium', 'Large'],
    inStock: true,
};

interface ProductDetailsScreenProps {
    navigation?: any;
    route?: any;
}

export default function ProductDetailsScreen({
    navigation,
    route,
}: ProductDetailsScreenProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
    const [selectedSize, setSelectedSize] = useState(PRODUCT.sizes[1]);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const cartButtonScale = useSharedValue(1);
    const wishlistScale = useSharedValue(1);

    const cartButtonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: cartButtonScale.value }],
    }));

    const wishlistStyle = useAnimatedStyle(() => ({
        transform: [{ scale: wishlistScale.value }],
    }));

    const handleAddToCart = () => {
        cartButtonScale.value = withSpring(1.1, { damping: 10 }, () => {
            cartButtonScale.value = withSpring(1);
        });
        // Add to cart logic
    };

    const handleWishlistToggle = () => {
        wishlistScale.value = withSpring(1.3, { damping: 10 }, () => {
            wishlistScale.value = withSpring(1);
        });
        setIsWishlisted(!isWishlisted);
    };

    const discount = Math.round(
        ((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Image Carousel */}
            <Animated.View entering={FadeIn.duration(400)} style={styles.imageContainer}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                        setCurrentImageIndex(index);
                    }}
                >
                    {PRODUCT.images.map((image, index) => (
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={styles.productImage}
                            contentFit="cover"
                            transition={300}
                        />
                    ))}
                </ScrollView>

                {/* Floating Back Button */}
                <SafeAreaView style={styles.floatingHeader}>
                    <Pressable
                        onPress={() => navigation?.goBack()}
                        style={styles.floatingButton}
                    >
                        <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
                    </Pressable>

                    {/* Floating Wishlist Button */}
                    <AnimatedPressable
                        onPress={handleWishlistToggle}
                        style={[styles.floatingButton, wishlistStyle]}
                    >
                        <Ionicons
                            name={isWishlisted ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isWishlisted ? Colors.accent : Colors.textPrimary}
                        />
                    </AnimatedPressable>
                </SafeAreaView>

                {/* Image Indicators */}
                <View style={styles.imageIndicators}>
                    {PRODUCT.images.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                currentImageIndex === index && styles.indicatorActive,
                            ]}
                        />
                    ))}
                </View>
            </Animated.View>

            {/* Product Details */}
            <Animated.View
                entering={FadeInUp.delay(200).duration(400)}
                style={styles.detailsContainer}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.detailsContent}
                >
                    {/* Title & Rating */}
                    <View style={styles.titleRow}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{PRODUCT.title}</Text>
                            {discount > 0 && (
                                <Badge
                                    text={`${discount}% OFF`}
                                    variant="accent"
                                    size="small"
                                    style={styles.discountBadge}
                                />
                            )}
                        </View>
                    </View>

                    {/* Rating Row */}
                    <Animated.View
                        entering={FadeInDown.delay(300).duration(400)}
                        style={styles.ratingRow}
                    >
                        <Ionicons name="star" size={18} color={Colors.warning} />
                        <Text style={styles.rating}>{PRODUCT.rating}</Text>
                        <Text style={styles.reviewCount}>
                            ({PRODUCT.reviewCount} reviews)
                        </Text>
                    </Animated.View>

                    {/* Price */}
                    <Animated.View
                        entering={FadeInDown.delay(400).duration(400)}
                        style={styles.priceRow}
                    >
                        <Text style={styles.price}>
                            ${PRODUCT.price.toFixed(2)}
                        </Text>
                        {PRODUCT.originalPrice > PRODUCT.price && (
                            <Text style={styles.originalPrice}>
                                ${PRODUCT.originalPrice.toFixed(2)}
                            </Text>
                        )}
                    </Animated.View>

                    {/* Description */}
                    <Animated.View entering={FadeInDown.delay(500).duration(400)}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Pressable
                            onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                        >
                            <Text
                                style={styles.description}
                                numberOfLines={isDescriptionExpanded ? undefined : 3}
                            >
                                {PRODUCT.description}
                            </Text>
                            <Text style={styles.readMore}>
                                {isDescriptionExpanded ? 'Show less' : 'Read more'}
                            </Text>
                        </Pressable>
                    </Animated.View>

                    {/* Color Selection */}
                    <Animated.View entering={FadeInDown.delay(600).duration(400)}>
                        <Text style={styles.sectionTitle}>
                            Color: {selectedColor.name}
                        </Text>
                        <View style={styles.colorSelection}>
                            {PRODUCT.colors.map((color) => (
                                <Pressable
                                    key={color.hex}
                                    onPress={() => setSelectedColor(color)}
                                    style={[
                                        styles.colorOption,
                                        selectedColor.hex === color.hex &&
                                        styles.colorOptionSelected,
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.colorSwatch,
                                            { backgroundColor: color.hex },
                                        ]}
                                    />
                                </Pressable>
                            ))}
                        </View>
                    </Animated.View>

                    {/* Size Selection */}
                    <Animated.View entering={FadeInDown.delay(700).duration(400)}>
                        <Text style={styles.sectionTitle}>Size</Text>
                        <View style={styles.sizeSelection}>
                            {PRODUCT.sizes.map((size) => (
                                <Pressable
                                    key={size}
                                    onPress={() => setSelectedSize(size)}
                                    style={[
                                        styles.sizeOption,
                                        selectedSize === size && styles.sizeOptionSelected,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.sizeText,
                                            selectedSize === size && styles.sizeTextSelected,
                                        ]}
                                    >
                                        {size}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </Animated.View>

                    {/* Spacer for bottom button */}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </Animated.View>

            {/* Sticky Add to Cart Button */}
            <Animated.View
                entering={FadeInUp.delay(800).duration(400)}
                style={styles.stickyButton}
            >
                <View style={styles.stickyContent}>
                    <View style={styles.stickyPriceContainer}>
                        <Text style={styles.stickyLabel}>Total Price</Text>
                        <Text style={styles.stickyPrice}>
                            ${PRODUCT.price.toFixed(2)}
                        </Text>
                    </View>
                    <AnimatedPressable
                        onPress={handleAddToCart}
                        style={cartButtonStyle}
                    >
                        <LinearGradient
                            colors={Colors.gradientPurple}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.addToCartButton}
                        >
                            <Ionicons
                                name="bag-add-outline"
                                size={20}
                                color={Colors.white}
                            />
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </LinearGradient>
                    </AnimatedPressable>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    imageContainer: {
        height: SCREEN_WIDTH * 0.9,
        backgroundColor: Colors.gray100,
    },
    productImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 0.9,
    },
    floatingHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
    },
    floatingButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.medium,
    },
    imageIndicators: {
        position: 'absolute',
        bottom: Spacing.lg,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.xs,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    indicatorActive: {
        width: 24,
        backgroundColor: Colors.white,
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: BorderRadius.xxxl,
        borderTopRightRadius: BorderRadius.xxxl,
        marginTop: -24,
        paddingTop: Spacing.lg,
    },
    detailsContent: {
        paddingHorizontal: Spacing.lg,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.h2,
        color: Colors.textPrimary,
        lineHeight: Typography.fontSize.h2 * 1.2,
    },
    discountBadge: {
        marginTop: Spacing.sm,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.md,
    },
    rating: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.md,
        color: Colors.textPrimary,
        marginLeft: Spacing.xs,
    },
    reviewCount: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
        marginLeft: Spacing.xs,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.lg,
        gap: Spacing.md,
    },
    price: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.h2,
        color: Colors.primary,
    },
    originalPrice: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.lg,
        color: Colors.textMuted,
        textDecorationLine: 'line-through',
    },
    sectionTitle: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.lg,
        color: Colors.textPrimary,
        marginTop: Spacing.xl,
        marginBottom: Spacing.md,
    },
    description: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
        lineHeight: Typography.fontSize.md * 1.6,
    },
    readMore: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
        color: Colors.primary,
        marginTop: Spacing.sm,
    },
    colorSelection: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    colorOption: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    colorOptionSelected: {
        borderColor: Colors.primary,
    },
    colorSwatch: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    sizeSelection: {
        flexDirection: 'row',
        gap: Spacing.md,
    },
    sizeOption: {
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.gray200,
        backgroundColor: Colors.white,
    },
    sizeOptionSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    sizeText: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.md,
        color: Colors.textPrimary,
    },
    sizeTextSelected: {
        color: Colors.white,
    },
    stickyButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.lg,
        paddingBottom: Spacing.xl,
        borderTopWidth: 1,
        borderTopColor: Colors.gray100,
        ...Shadows.large,
    },
    stickyContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stickyPriceContainer: {
        flex: 1,
    },
    stickyLabel: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
    },
    stickyPrice: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.xl,
        color: Colors.textPrimary,
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.button,
        gap: Spacing.sm,
        ...Shadows.glow,
    },
    addToCartText: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.md,
        color: Colors.white,
    },
});
