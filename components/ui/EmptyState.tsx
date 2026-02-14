/**
 * EmptyState - Modern Gen Z styled empty state component
 */

import { Colors, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import Animated, { BounceIn, FadeIn } from 'react-native-reanimated';
import GradientButton from './GradientButton';

interface EmptyStateProps {
    icon?: keyof typeof Ionicons.glyphMap;
    emoji?: string;
    title: string;
    subtitle?: string;
    actionTitle?: string;
    onAction?: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function EmptyState({
    icon,
    emoji,
    title,
    subtitle,
    actionTitle,
    onAction,
    style,
}: EmptyStateProps) {
    return (
        <Animated.View
            entering={FadeIn.duration(500)}
            style={[styles.container, style]}
        >
            {emoji ? (
                <Animated.Text
                    entering={BounceIn.delay(200).duration(500)}
                    style={styles.emoji}
                >
                    {emoji}
                </Animated.Text>
            ) : icon ? (
                <Animated.View
                    entering={BounceIn.delay(200).duration(500)}
                    style={styles.iconContainer}
                >
                    <Ionicons
                        name={icon}
                        size={64}
                        color={Colors.primaryLight}
                    />
                </Animated.View>
            ) : null}

            <Text style={styles.title}>{title}</Text>

            {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
            )}

            {actionTitle && onAction && (
                <View style={styles.buttonContainer}>
                    <GradientButton
                        title={actionTitle}
                        onPress={onAction}
                        size="medium"
                    />
                </View>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    iconContainer: {
        marginBottom: Spacing.lg,
    },
    emoji: {
        fontSize: 80,
        marginBottom: Spacing.lg,
    },
    title: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.xl,
        color: Colors.textPrimary,
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: Typography.fontSize.md * 1.5,
        maxWidth: 280,
    },
    buttonContainer: {
        marginTop: Spacing.xl,
    },
});
