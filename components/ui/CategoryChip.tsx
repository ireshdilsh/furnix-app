/**
 * CategoryChip - Modern Gen Z styled category pill
 */

import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CategoryChipProps {
    label: string;
    icon?: string;
    isSelected?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function CategoryChip({
    label,
    icon,
    isSelected = false,
    onPress,
    style,
}: CategoryChipProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    };

    if (isSelected) {
        return (
            <AnimatedPressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[animatedStyle, style]}
            >
                <LinearGradient
                    colors={Colors.gradientPurple}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.chipSelected}
                >
                    {icon && <Text style={styles.iconSelected}>{icon}</Text>}
                    <Text style={styles.labelSelected}>{label}</Text>
                </LinearGradient>
            </AnimatedPressable>
        );
    }

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.chip, animatedStyle, style]}
        >
            {icon && <Text style={styles.icon}>{icon}</Text>}
            <Text style={styles.label}>{label}</Text>
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.chip,
        borderWidth: 1,
        borderColor: Colors.gray200,
        gap: Spacing.sm,
        ...Shadows.small,
    },
    chipSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.chip,
        gap: Spacing.sm,
        ...Shadows.glow,
    },
    icon: {
        fontSize: 16,
    },
    iconSelected: {
        fontSize: 16,
    },
    label: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
        color: Colors.textPrimary,
    },
    labelSelected: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.sm,
        color: Colors.white,
    },
});
