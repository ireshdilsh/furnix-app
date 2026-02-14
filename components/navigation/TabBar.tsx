/**
 * TabBar - Custom Modern Gen Z bottom tab bar
 * Features: Floating center cart button, minimal outline icons, animated indicator
 */

import { BorderRadius, Colors, Layout, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TabBarProps {
    state: any;
    descriptors: any;
    navigation: any;
}

const TAB_ICONS: Record<string, { outline: keyof typeof Ionicons.glyphMap; filled: keyof typeof Ionicons.glyphMap }> = {
    Home: { outline: 'home-outline', filled: 'home' },
    Wishlist: { outline: 'heart-outline', filled: 'heart' },
    Cart: { outline: 'bag-outline', filled: 'bag' },
    Orders: { outline: 'receipt-outline', filled: 'receipt' },
    Profile: { outline: 'person-outline', filled: 'person' },
};

export default function TabBar({ state, descriptors, navigation }: TabBarProps) {
    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel ?? route.name;
                    const isFocused = state.index === index;
                    const isCart = route.name === 'Cart';

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const iconName = isFocused
                        ? TAB_ICONS[route.name]?.filled
                        : TAB_ICONS[route.name]?.outline;

                    // Render floating cart button
                    if (isCart) {
                        return (
                            <FloatingCartButton
                                key={route.key}
                                isFocused={isFocused}
                                onPress={onPress}
                                cartCount={3}
                            />
                        );
                    }

                    return (
                        <TabButton
                            key={route.key}
                            label={label}
                            iconName={iconName || 'ellipse'}
                            isFocused={isFocused}
                            onPress={onPress}
                        />
                    );
                })}
            </View>
        </View>
    );
}

interface TabButtonProps {
    label: string;
    iconName: keyof typeof Ionicons.glyphMap;
    isFocused: boolean;
    onPress: () => void;
}

function TabButton({ label, iconName, isFocused, onPress }: TabButtonProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    };

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.tabButton, animatedStyle]}
        >
            <Ionicons
                name={iconName}
                size={24}
                color={isFocused ? Colors.primary : Colors.gray500}
            />
            <Text
                style={[
                    styles.tabLabel,
                    isFocused && styles.tabLabelActive,
                ]}
            >
                {label}
            </Text>
            {isFocused && <View style={styles.activeIndicator} />}
        </AnimatedPressable>
    );
}

interface FloatingCartButtonProps {
    isFocused: boolean;
    onPress: () => void;
    cartCount?: number;
}

function FloatingCartButton({ isFocused, onPress, cartCount = 0 }: FloatingCartButtonProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    };

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.floatingCartContainer, animatedStyle]}
        >
            <LinearGradient
                colors={Colors.gradientPurple}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.floatingCart}
            >
                <Ionicons
                    name={isFocused ? 'bag' : 'bag-outline'}
                    size={24}
                    color={Colors.white}
                />
                {cartCount > 0 && (
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{cartCount}</Text>
                    </View>
                )}
            </LinearGradient>
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.lg,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.xxl,
        height: Layout.tabBarHeight,
        paddingHorizontal: Spacing.sm,
        ...Shadows.large,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.sm,
    },
    tabLabel: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.xxs,
        color: Colors.gray500,
        marginTop: Spacing.xxs,
    },
    tabLabelActive: {
        color: Colors.primary,
    },
    activeIndicator: {
        position: 'absolute',
        top: 0,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Colors.primary,
    },
    floatingCartContainer: {
        position: 'relative',
        marginTop: -30,
    },
    floatingCart: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.floatingButton,
    },
    cartBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: Colors.accent,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    cartBadgeText: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: 10,
        color: Colors.white,
    },
});
