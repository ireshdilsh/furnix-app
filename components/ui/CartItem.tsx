/**
 * CartItem - Modern Gen Z styled cart item card
 */

import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
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
    SlideInRight,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CartItemProps {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    color?: string;
    onIncrease?: () => void;
    onDecrease?: () => void;
    onRemove?: () => void;
    style?: StyleProp<ViewStyle>;
    index?: number;
}

export default function CartItem({
    id,
    title,
    price,
    image,
    quantity,
    color,
    onIncrease,
    onDecrease,
    onRemove,
    style,
    index = 0,
}: CartItemProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    };

    return (
        <Animated.View
            entering={SlideInRight.delay(index * 100).duration(400)}
            style={[styles.container, style]}
        >
            <AnimatedPressable
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
                </View>

                {/* Product Info */}
                <View style={styles.infoContainer}>
                    <View style={styles.topRow}>
                        <Text style={styles.title} numberOfLines={2}>
                            {title}
                        </Text>
                        <Pressable
                            onPress={onRemove}
                            style={styles.removeButton}
                        >
                            <Ionicons
                                name="trash-outline"
                                size={18}
                                color={Colors.textMuted}
                            />
                        </Pressable>
                    </View>

                    {color && (
                        <View style={styles.colorRow}>
                            <View
                                style={[
                                    styles.colorSwatch,
                                    { backgroundColor: color },
                                ]}
                            />
                            <Text style={styles.colorText}>Color</Text>
                        </View>
                    )}

                    <View style={styles.bottomRow}>
                        <Text style={styles.price}>
                            ${(price * quantity).toFixed(2)}
                        </Text>

                        {/* Quantity Selector */}
                        <View style={styles.quantityContainer}>
                            <Pressable
                                onPress={onDecrease}
                                style={styles.quantityButton}
                            >
                                <Ionicons
                                    name="remove"
                                    size={18}
                                    color={Colors.textPrimary}
                                />
                            </Pressable>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <Pressable
                                onPress={onIncrease}
                                style={[styles.quantityButton, styles.quantityButtonActive]}
                            >
                                <Ionicons
                                    name="add"
                                    size={18}
                                    color={Colors.white}
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </AnimatedPressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.card,
        padding: Spacing.md,
        ...Shadows.card,
    },
    imageContainer: {
        width: 90,
        height: 90,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        backgroundColor: Colors.gray100,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        flex: 1,
        marginLeft: Spacing.md,
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        flex: 1,
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.md,
        color: Colors.textPrimary,
        lineHeight: Typography.fontSize.md * 1.3,
        marginRight: Spacing.sm,
    },
    removeButton: {
        padding: Spacing.xs,
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.xs,
    },
    colorSwatch: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: Spacing.xs,
        borderWidth: 1,
        borderColor: Colors.gray200,
    },
    colorText: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.xs,
        color: Colors.textMuted,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.sm,
    },
    price: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.lg,
        color: Colors.primary,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.gray100,
        borderRadius: BorderRadius.lg,
        padding: 4,
    },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    quantityButtonActive: {
        backgroundColor: Colors.primary,
    },
    quantityText: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.md,
        color: Colors.textPrimary,
        marginHorizontal: Spacing.md,
        minWidth: 24,
        textAlign: 'center',
    },
});
