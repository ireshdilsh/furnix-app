/**
 * CartScreen - Modern Gen Z styled cart screen
 * Features: Clean list layout, quantity selector, swipe to delete, animated total
 */

import { CartItem, EmptyState } from '@/components/ui';
import { BorderRadius, Colors, Layout, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
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
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Mock Cart Data
const INITIAL_CART = [
    {
        id: '1',
        title: 'Modern Velvet Sofa',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        quantity: 1,
        color: '#2E7D32',
    },
    {
        id: '2',
        title: 'Minimalist Oak Chair',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
        quantity: 2,
        color: '#8D6E63',
    },
    {
        id: '3',
        title: 'Scandinavian Coffee Table',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400',
        quantity: 1,
        color: '#A1887F',
    },
];

interface CartScreenProps {
    navigation?: any;
}

export default function CartScreen({ navigation }: CartScreenProps) {
    const [cartItems, setCartItems] = useState(INITIAL_CART);
    const checkoutScale = useSharedValue(1);

    const checkoutStyle = useAnimatedStyle(() => ({
        transform: [{ scale: checkoutScale.value }],
    }));

    const handleIncrease = (id: string) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrease = (id: string) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemove = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleCheckout = () => {
        checkoutScale.value = withSpring(0.95, { damping: 15 }, () => {
            checkoutScale.value = withSpring(1);
        });
        // Navigate to checkout
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = subtotal > 0 ? 29.99 : 0;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundLight} />

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Cart</Text>
                </View>

                <EmptyState
                    emoji="🥺"
                    title="Your cart feels lonely"
                    subtitle="Add some amazing furniture to your cart and make it happy!"
                    actionTitle="Start Shopping"
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
                <Text style={styles.headerTitle}>My Cart</Text>
                <Text style={styles.itemCount}>{cartItems.length} items</Text>
            </Animated.View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Cart Items */}
                {cartItems.map((item, index) => (
                    <CartItem
                        key={item.id}
                        {...item}
                        onIncrease={() => handleIncrease(item.id)}
                        onDecrease={() => handleDecrease(item.id)}
                        onRemove={() => handleRemove(item.id)}
                        index={index}
                    />
                ))}

                {/* Promo Code */}
                <Animated.View
                    entering={FadeInDown.delay(300).duration(400)}
                    style={styles.promoContainer}
                >
                    <View style={styles.promoInputContainer}>
                        <Ionicons
                            name="pricetag-outline"
                            size={20}
                            color={Colors.textMuted}
                        />
                        <Text style={styles.promoPlaceholder}>Enter promo code</Text>
                    </View>
                    <Pressable style={styles.promoButton}>
                        <Text style={styles.promoButtonText}>Apply</Text>
                    </Pressable>
                </Animated.View>

                {/* Order Summary */}
                <Animated.View
                    entering={FadeInDown.delay(400).duration(400)}
                    style={styles.summaryContainer}
                >
                    <Text style={styles.summaryTitle}>Order Summary</Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                    </View>
                </Animated.View>

                {/* Spacer for checkout button */}
                <View style={{ height: 120 }} />
            </ScrollView>

            {/* Floating Checkout Button */}
            <Animated.View
                entering={FadeInDown.delay(500).duration(400)}
                style={styles.checkoutContainer}
            >
                <AnimatedPressable onPress={handleCheckout} style={checkoutStyle}>
                    <LinearGradient
                        colors={Colors.gradientPurple}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.checkoutButton}
                    >
                        <View style={styles.checkoutLeft}>
                            <Text style={styles.checkoutTotal}>${total.toFixed(2)}</Text>
                            <Text style={styles.checkoutItemCount}>
                                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                            </Text>
                        </View>
                        <View style={styles.checkoutRight}>
                            <Text style={styles.checkoutText}>Checkout</Text>
                            <Ionicons name="arrow-forward" size={20} color={Colors.white} />
                        </View>
                    </LinearGradient>
                </AnimatedPressable>
                <Text style={styles.microcopy}>Almost yours... ✨</Text>
            </Animated.View>
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
    scrollContent: {
        paddingHorizontal: Layout.screenPadding,
    },
    promoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xs,
        marginTop: Spacing.lg,
        ...Shadows.small,
    },
    promoInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        gap: Spacing.sm,
    },
    promoPlaceholder: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.md,
        color: Colors.textMuted,
    },
    promoButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    promoButtonText: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.sm,
        color: Colors.white,
    },
    summaryContainer: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.card,
        padding: Spacing.xl,
        marginTop: Spacing.xl,
        ...Shadows.card,
    },
    summaryTitle: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.lg,
        color: Colors.textPrimary,
        marginBottom: Spacing.lg,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.md,
    },
    summaryLabel: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
    },
    summaryValue: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.md,
        color: Colors.textPrimary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.gray100,
        marginVertical: Spacing.md,
    },
    totalLabel: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.lg,
        color: Colors.textPrimary,
    },
    totalValue: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.xl,
        color: Colors.primary,
    },
    checkoutContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Layout.screenPadding,
        paddingBottom: Spacing.xl,
        paddingTop: Spacing.lg,
        backgroundColor: Colors.backgroundLight,
    },
    checkoutButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        borderRadius: BorderRadius.button,
        ...Shadows.floatingButton,
    },
    checkoutLeft: {
        alignItems: 'flex-start',
    },
    checkoutTotal: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.lg,
        color: Colors.white,
    },
    checkoutItemCount: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.xs,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    checkoutRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    checkoutText: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.md,
        color: Colors.white,
    },
    microcopy: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
        textAlign: 'center',
        marginTop: Spacing.sm,
    },
});
