import { Colors, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface SectionHeaderProps {
    title: string;
    actionText?: string;
    onActionPress?: () => void;
}

export default function SectionHeader({
    title,
    actionText = "See All",
    onActionPress
}: SectionHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {onActionPress && (
                <Pressable
                    style={({ pressed }) => [
                        styles.actionButton,
                        pressed && styles.actionButtonPressed
                    ]}
                    onPress={onActionPress}
                    hitSlop={8}
                >
                    <Text style={styles.actionText}>{actionText}</Text>
                    <Ionicons name="chevron-forward" size={16} color={Colors.secondary} />
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
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionButtonPressed: {
        opacity: 0.7,
    },
    actionText: {
        fontSize: 13,
        fontWeight: '500',
        color: Colors.secondary,
    },
});
