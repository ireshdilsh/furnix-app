/**
 * Badge - Modern Gen Z styled status/discount badge
 */

import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';

interface BadgeProps {
    text: string;
    variant?: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
    size?: 'small' | 'medium';
    style?: StyleProp<ViewStyle>;
}

export default function Badge({
    text,
    variant = 'primary',
    size = 'small',
    style,
}: BadgeProps) {
    const getBackgroundColor = () => {
        switch (variant) {
            case 'primary':
                return Colors.primary;
            case 'accent':
                return Colors.accent;
            case 'success':
                return Colors.success;
            case 'warning':
                return Colors.warning;
            case 'error':
                return Colors.error;
            case 'info':
                return Colors.info;
            default:
                return Colors.primary;
        }
    };

    const getGradientColors = (): readonly [string, string, ...string[]] => {
        switch (variant) {
            case 'primary':
                return Colors.gradientPurple;
            case 'accent':
                return Colors.gradientCoral;
            default:
                return [getBackgroundColor(), getBackgroundColor()];
        }
    };

    const isGradient = variant === 'primary' || variant === 'accent';

    if (isGradient) {
        return (
            <LinearGradient
                colors={getGradientColors()}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.badge,
                    size === 'medium' && styles.badgeMedium,
                    style,
                ]}
            >
                <Text
                    style={[
                        styles.text,
                        size === 'medium' && styles.textMedium,
                    ]}
                >
                    {text}
                </Text>
            </LinearGradient>
        );
    }

    return (
        <View
            style={[
                styles.badge,
                size === 'medium' && styles.badgeMedium,
                { backgroundColor: getBackgroundColor() },
                style,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    size === 'medium' && styles.textMedium,
                ]}
            >
                {text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xxs,
        borderRadius: BorderRadius.sm,
        alignSelf: 'flex-start',
    },
    badgeMedium: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.md,
    },
    text: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.xxs,
        color: Colors.white,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    textMedium: {
        fontSize: Typography.fontSize.xs,
    },
});
