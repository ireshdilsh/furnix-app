/**
 * Avatar - Modern Gen Z styled profile avatar
 */

import { BorderRadius, Colors, Shadows } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Pressable,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

interface AvatarProps {
    source?: string;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    showBorder?: boolean;
    showBadge?: boolean;
    badgeCount?: number;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function Avatar({
    source,
    size = 'medium',
    showBorder = false,
    showBadge = false,
    badgeCount,
    onPress,
    style,
}: AvatarProps) {
    const getSize = () => {
        switch (size) {
            case 'small':
                return 32;
            case 'large':
                return 64;
            case 'xlarge':
                return 100;
            default:
                return 44;
        }
    };

    const avatarSize = getSize();
    const borderSize = showBorder ? avatarSize + 6 : avatarSize;

    const renderAvatar = () => (
        <View
            style={[
                styles.avatarContainer,
                {
                    width: avatarSize,
                    height: avatarSize,
                    borderRadius: avatarSize / 2,
                },
            ]}
        >
            {source ? (
                <Image
                    source={{ uri: source }}
                    style={[
                        styles.image,
                        {
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: avatarSize / 2,
                        },
                    ]}
                    contentFit="cover"
                    transition={300}
                />
            ) : (
                <View
                    style={[
                        styles.placeholder,
                        {
                            width: avatarSize,
                            height: avatarSize,
                            borderRadius: avatarSize / 2,
                        },
                    ]}
                >
                    <Ionicons
                        name="person"
                        size={avatarSize * 0.5}
                        color={Colors.textMuted}
                    />
                </View>
            )}
        </View>
    );

    const renderWithBorder = () => (
        <LinearGradient
            colors={Colors.gradientPurple}
            style={[
                styles.borderGradient,
                {
                    width: borderSize,
                    height: borderSize,
                    borderRadius: borderSize / 2,
                },
            ]}
        >
            <View style={styles.borderInner}>
                {renderAvatar()}
            </View>
        </LinearGradient>
    );

    const content = (
        <View style={[styles.container, style]}>
            {showBorder ? renderWithBorder() : renderAvatar()}
            {showBadge && (
                <View style={styles.badge}>
                    {badgeCount !== undefined && badgeCount > 0 && (
                        <View style={styles.badgeCount}>
                            {/* Badge content handled by parent */}
                        </View>
                    )}
                </View>
            )}
        </View>
    );

    if (onPress) {
        return (
            <Pressable onPress={onPress}>
                {content}
            </Pressable>
        );
    }

    return content;
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    avatarContainer: {
        overflow: 'hidden',
        ...Shadows.small,
    },
    image: {
        backgroundColor: Colors.gray100,
    },
    placeholder: {
        backgroundColor: Colors.gray100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderGradient: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
    },
    borderInner: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.full,
        padding: 2,
    },
    badge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.success,
        borderWidth: 2,
        borderColor: Colors.white,
    },
    badgeCount: {
        // Handled dynamically
    },
});
