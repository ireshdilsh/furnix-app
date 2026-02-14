/**
 * ProductCard - Modern Gen Z styled product card
 */

import { BorderRadius, Colors, Layout, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ProductCardProps {
    id: string;
    title: string;
    description?: string;
    price: number;
    image: string;
    originalPrice?: number;
    rating?: number;
    isWishlisted?: boolean;
    onPress?: () => void;
    onWishlistPress?: () => void;
    style?: StyleProp<ViewStyle>;
    index?: number;
}

export default function ProductCard({
    id,
    title,
    description,
    price,
    image,
    originalPrice,
    rating,
    isWishlisted = false,
    onPress,
    onWishlistPress,
    style,
    index = 0,
}: ProductCardProps) {
    const scale = useSharedValue(1);
    const heartScale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const heartAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: heartScale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    };

    const handleWishlistPress = () => {
        heartScale.value = withSpring(1.3, { damping: 10, stiffness: 400 }, () => {
            heartScale.value = withSpring(1, { damping: 10, stiffness: 400 });
        });
        onWishlistPress?.();
    };

    const discount = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    return (
        <Animated.View
            entering={FadeIn.delay(index * 100).duration(400)}
            style={[styles.container, style]}
        >
            <AnimatedPressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[styles.card, animatedStyle]}
            >
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                        contentFit="cover"
                        transition={300}
                    />

                    {/* Wishlist Button */}
                    <AnimatedPressable
                        onPress={handleWishlistPress}
                        style={[styles.wishlistButton, heartAnimatedStyle]}
                    >
                        <Ionicons
                            name={isWishlisted ? 'heart' : 'heart-outline'}
                            size={20}
                            color={isWishlisted ? Colors.accent : Colors.gray600}
                        />
                    </AnimatedPressable>

                    {/* Discount Badge */}
                    {discount > 0 && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>-{discount}%</Text>
                        </View>
                    )}
                </View>

                {/* Product Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>

                    {description && (
                        <Text style={styles.description} numberOfLines={2}>
                            {description}
                        </Text>
                    )}

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>
                            ${price.toFixed(2)}
                        </Text>
                        {originalPrice && (
                            <Text style={styles.originalPrice}>
                                ${originalPrice.toFixed(2)}
                            </Text>
                        )}
                    </View>

                    {rating && (
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={12} color={Colors.warning} />
                            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
                        </View>
                    )}
                </View>
            </AnimatedPressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Layout.productCardWidth,
    },
    card: {
        backgroundColor: '#F8F9FF',
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.gray200,
    },
    imageContainer: {
        width: '100%',
        height: Layout.productImageHeight,
        backgroundColor: Colors.gray100,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    wishlistButton: {
        position: 'absolute',
        top: Spacing.sm,
        right: Spacing.sm,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.small,
    },
    discountBadge: {
        position: 'absolute',
        top: Spacing.sm,
        left: Spacing.sm,
        backgroundColor: Colors.accent,
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xxs,
        borderRadius: BorderRadius.sm,
    },
    discountText: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.xs,
        color: Colors.white,
    },
    infoContainer: {
        padding: Spacing.md,
    },
    title: {
        fontFamily: 'Robotslab',
        fontSize: Typography.fontSize.lg,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
        lineHeight: Typography.fontSize.sm * 1.3,
    },
    description: {
        fontFamily: Typography.fontFamily.regular,
        // fontSize: Typography.fontSize.xs,
        marginTop: 8,
        color: Colors.textSecondary,
        marginBottom: Spacing.xs,
        lineHeight: Typography.fontSize.xs * 1.4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    price: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.lg,
        color: Colors.primary,
    },
    originalPrice: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
        textDecorationLine: 'line-through',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.xs,
        gap: 4,
    },
    ratingText: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.xs,
        color: Colors.textSecondary,
    },
});
