import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { Chair } from '@/interfaces/Chair';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.lg * 2 - Spacing.md) / 2;

interface ProductCardProps {
    product: Chair;
    onPress?: () => void;
    onFavorite?: () => void;
    isFavorite?: boolean;
}

export default function ProductCard({
    product,
    onPress,
    onFavorite,
    isFavorite = false
}: ProductCardProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed
            ]}
            onPress={onPress}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.image}
                    contentFit="cover"
                    transition={300}
                />
                <Pressable
                    style={styles.favoriteButton}
                    onPress={onFavorite}
                    hitSlop={8}
                >
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={20}
                        color={isFavorite ? Colors.highlight : Colors.textSecondary}
                    />
                </Pressable>
            </View>

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {product.title}
                </Text>
                <Text style={styles.description} numberOfLines={1}>
                    {product.description}
                </Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>
                        ${product.price.toLocaleString()}
                    </Text>
                    <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color={Colors.secondary} />
                        <Text style={styles.ratingText}>4.8</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        ...Shadows.medium,
    },
    pressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    imageContainer: {
        width: '100%',
        height: CARD_WIDTH * 1.1,
        borderTopLeftRadius: BorderRadius.lg,
        borderTopRightRadius: BorderRadius.lg,
        overflow: 'hidden',
        backgroundColor: Colors.surfaceVariant,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    favoriteButton: {
        position: 'absolute',
        top: Spacing.sm,
        right: Spacing.sm,
        width: 32,
        height: 32,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.small,
    },
    content: {
        padding: Spacing.md,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: Colors.textMuted,
        marginBottom: Spacing.sm,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.primary,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.textSecondary,
    },
});
