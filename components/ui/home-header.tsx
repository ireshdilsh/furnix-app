import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HomeHeaderProps {
    userName?: string;
    userAvatar?: string;
    onNotificationPress?: () => void;
    onCartPress?: () => void;
    cartItemCount?: number;
}

export default function HomeHeader({
    userName = "there",
    userAvatar,
    onNotificationPress,
    onCartPress,
    cartItemCount = 0,
}: HomeHeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
            <View style={styles.leftSection}>
                <View style={styles.avatarContainer}>
                    {userAvatar ? (
                        <Image
                            source={{ uri: userAvatar }}
                            style={styles.avatar}
                            contentFit="cover"
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Ionicons name="person" size={20} color={Colors.textLight} />
                        </View>
                    )}
                </View>
                <View style={styles.greetingContainer}>
                    <Text style={styles.greeting}>Hello, {userName} 👋</Text>
                    <Text style={styles.subtitle}>Find your perfect furniture</Text>
                </View>
            </View>

            <View style={styles.rightSection}>
                <Pressable
                    style={({ pressed }) => [
                        styles.iconButton,
                        pressed && styles.iconButtonPressed
                    ]}
                    onPress={onNotificationPress}
                >
                    <Ionicons name="notifications-outline" size={22} color={Colors.textPrimary} />
                    <View style={styles.notificationDot} />
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.iconButton,
                        pressed && styles.iconButtonPressed
                    ]}
                    onPress={onCartPress}
                >
                    <Ionicons name="bag-outline" size={22} color={Colors.textPrimary} />
                    {cartItemCount > 0 && (
                        <View style={styles.cartBadge}>
                            <Text style={styles.cartBadgeText}>
                                {cartItemCount > 9 ? '9+' : cartItemCount}
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.md,
        backgroundColor: Colors.background,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    avatarContainer: {
        ...Shadows.small,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.full,
    },
    avatarPlaceholder: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greetingContainer: {
        gap: 2,
    },
    greeting: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    subtitle: {
        fontSize: 13,
        color: Colors.textMuted,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.small,
    },
    iconButtonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.95 }],
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.highlight,
        borderWidth: 1.5,
        borderColor: Colors.surface,
    },
    cartBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        minWidth: 18,
        height: 18,
        borderRadius: BorderRadius.full,
        backgroundColor: Colors.highlight,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    cartBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: Colors.textLight,
    },
});
