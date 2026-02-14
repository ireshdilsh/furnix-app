import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - Spacing.lg * 2;

interface FeaturedBannerProps {
    title: string;
    subtitle: string;
    discount?: string;
    imageUrl: string;
    onPress?: () => void;
}

export default function FeaturedBanner({
    title,
    subtitle,
    discount,
    imageUrl,
    onPress
}: FeaturedBannerProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed
            ]}
            onPress={onPress}
        >
            <LinearGradient
                colors={[Colors.primary, '#3D3A36']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <View style={styles.textContainer}>
                        {discount && (
                            <View style={styles.discountBadge}>
                                <Text style={styles.discountText}>{discount}</Text>
                            </View>
                        )}
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>

                        <View style={styles.shopButton}>
                            <Text style={styles.shopButtonText}>Shop Now</Text>
                            <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
                        </View>
                    </View>

                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        contentFit="contain"
                        transition={300}
                    />
                </View>

                {/* Decorative circles */}
                <View style={[styles.circle, styles.circle1]} />
                <View style={[styles.circle, styles.circle2]} />
            </LinearGradient>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: Spacing.lg,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        ...Shadows.large,
    },
    pressed: {
        opacity: 0.95,
        transform: [{ scale: 0.99 }],
    },
    gradient: {
        width: BANNER_WIDTH,
        height: 180,
        padding: Spacing.lg,
        position: 'relative',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        zIndex: 2,
    },
    textContainer: {
        flex: 1,
        maxWidth: '55%',
    },
    discountBadge: {
        backgroundColor: Colors.highlight,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        borderRadius: BorderRadius.sm,
        alignSelf: 'flex-start',
        marginBottom: Spacing.sm,
    },
    discountText: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.textLight,
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.textLight,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: Colors.gray400,
        marginBottom: Spacing.md,
    },
    shopButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.md,
        alignSelf: 'flex-start',
        gap: 6,
    },
    shopButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.primary,
    },
    image: {
        width: 140,
        height: 160,
        position: 'absolute',
        right: -10,
        bottom: -20,
    },
    circle: {
        position: 'absolute',
        borderRadius: BorderRadius.full,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    circle1: {
        width: 200,
        height: 200,
        top: -80,
        right: -60,
    },
    circle2: {
        width: 120,
        height: 120,
        bottom: -40,
        left: -30,
    },
});
