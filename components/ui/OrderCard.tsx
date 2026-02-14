/**
 * OrderCard - Modern Gen Z styled order card
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
} from 'react-native-reanimated';
import Badge from './Badge';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderCardProps {
    id: string;
    orderNumber: string;
    date: string;
    status: OrderStatus;
    totalAmount: number;
    itemCount: number;
    previewImages: string[];
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    index?: number;
}

export default function OrderCard({
    id,
    orderNumber,
    date,
    status,
    totalAmount,
    itemCount,
    previewImages,
    onPress,
    style,
    index = 0,
}: OrderCardProps) {
    const getStatusVariant = () => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'processing':
                return 'info';
            case 'shipped':
                return 'primary';
            case 'delivered':
                return 'success';
            case 'cancelled':
                return 'error';
            default:
                return 'primary';
        }
    };

    const getStatusText = () => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'processing':
                return 'Processing';
            case 'shipped':
                return 'Shipped';
            case 'delivered':
                return 'Delivered';
            case 'cancelled':
                return 'Cancelled';
            default:
                return status;
        }
    };

    const getBackgroundColor = () => {
        switch (status) {
            case 'delivered':
                return 'rgba(0, 200, 81, 0.05)';
            case 'pending':
                return 'rgba(255, 179, 0, 0.05)';
            case 'cancelled':
                return 'rgba(255, 68, 68, 0.05)';
            default:
                return Colors.white;
        }
    };

    return (
        <Animated.View
            entering={SlideInRight.delay(index * 100).duration(400)}
            style={[styles.container, style]}
        >
            <Pressable
                onPress={onPress}
                style={[
                    styles.card,
                    { backgroundColor: getBackgroundColor() },
                ]}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.orderNumber}>Order #{orderNumber}</Text>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                    <Badge
                        text={getStatusText()}
                        variant={getStatusVariant() as 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info'}
                        size="small"
                    />
                </View>

                {/* Preview Images */}
                <View style={styles.imagesContainer}>
                    {previewImages.slice(0, 3).map((image, idx) => (
                        <View
                            key={idx}
                            style={[
                                styles.imageWrapper,
                                { marginLeft: idx > 0 ? -20 : 0, zIndex: 3 - idx },
                            ]}
                        >
                            <Image
                                source={{ uri: image }}
                                style={styles.previewImage}
                                contentFit="cover"
                                transition={300}
                            />
                        </View>
                    ))}
                    {previewImages.length > 3 && (
                        <View style={[styles.imageWrapper, styles.moreItems]}>
                            <Text style={styles.moreItemsText}>
                                +{previewImages.length - 3}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <View>
                        <Text style={styles.itemCount}>{itemCount} items</Text>
                        <Text style={styles.totalAmount}>
                            ${totalAmount.toFixed(2)}
                        </Text>
                    </View>
                    <View style={styles.viewDetails}>
                        <Text style={styles.viewDetailsText}>View Details</Text>
                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color={Colors.primary}
                        />
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.card,
        padding: Spacing.lg,
        ...Shadows.card,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    orderNumber: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.md,
        color: Colors.textPrimary,
    },
    date: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
        marginTop: Spacing.xxs,
    },
    imagesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    imageWrapper: {
        width: 50,
        height: 50,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: Colors.gray100,
        borderWidth: 2,
        borderColor: Colors.white,
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    moreItems: {
        marginLeft: -20,
        backgroundColor: Colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreItemsText: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.xs,
        color: Colors.white,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.gray100,
    },
    itemCount: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
    },
    totalAmount: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.lg,
        color: Colors.primary,
        marginTop: Spacing.xxs,
    },
    viewDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    viewDetailsText: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
        color: Colors.primary,
    },
});
