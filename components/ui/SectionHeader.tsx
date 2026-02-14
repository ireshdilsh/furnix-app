/**
 * SectionHeader - Modern Gen Z styled section header
 */

import { Colors, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    showSeeAll?: boolean;
    onSeeAllPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function SectionHeader({
    title,
    subtitle,
    showSeeAll = false,
    onSeeAllPress,
    style,
}: SectionHeaderProps) {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {subtitle && (
                    <Text style={styles.subtitle}>{subtitle}</Text>
                )}
            </View>

            {showSeeAll && (
                <Pressable style={styles.seeAllButton} onPress={onSeeAllPress}>
                    <Text style={styles.seeAllText}>See All</Text>
                    <Ionicons
                        name="chevron-forward"
                        size={16}
                        color={Colors.primary}
                    />
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.xl,
        color: Colors.textPrimary,
    },
    subtitle: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textSecondary,
        marginTop: Spacing.xxs,
    },
    seeAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    seeAllText: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
        color: Colors.primary,
    },
});
