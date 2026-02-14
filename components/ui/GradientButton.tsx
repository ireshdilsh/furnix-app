/**
 * GradientButton - Modern Gen Z styled button with gradient
 */

import { BorderRadius, Colors, Layout, Shadows, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    ActivityIndicator,
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

interface GradientButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    icon?: keyof typeof Ionicons.glyphMap;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    fullWidth?: boolean;
}

export default function GradientButton({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    style,
    fullWidth = false,
}: GradientButtonProps) {
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

    const getGradientColors = (): readonly [string, string, ...string[]] => {
        switch (variant) {
            case 'primary':
                return Colors.gradientPurple;
            case 'accent':
                return Colors.gradientCoral;
            case 'secondary':
                return ['#A29BFE', '#C4B5FD'];
            default:
                return Colors.gradientPurple;
        }
    };

    const getHeight = () => {
        switch (size) {
            case 'small':
                return Layout.buttonHeightSmall;
            case 'large':
                return Layout.buttonHeightLarge;
            default:
                return Layout.buttonHeightMedium;
        }
    };

    const getFontSize = () => {
        switch (size) {
            case 'small':
                return Typography.fontSize.sm;
            case 'large':
                return Typography.fontSize.lg;
            default:
                return Typography.fontSize.md;
        }
    };

    const getIconSize = () => {
        switch (size) {
            case 'small':
                return 16;
            case 'large':
                return 24;
            default:
                return 20;
        }
    };

    const isOutlineOrGhost = variant === 'outline' || variant === 'ghost';

    const renderContent = () => (
        <>
            {loading ? (
                <ActivityIndicator
                    color={isOutlineOrGhost ? Colors.primary : Colors.white}
                    size="small"
                />
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <Ionicons
                            name={icon}
                            size={getIconSize()}
                            color={isOutlineOrGhost ? Colors.primary : Colors.white}
                            style={styles.iconLeft}
                        />
                    )}
                    <Text
                        style={[
                            styles.text,
                            {
                                fontSize: getFontSize(),
                                color: isOutlineOrGhost ? Colors.primary : Colors.white,
                            },
                        ]}
                    >
                        {title}
                    </Text>
                    {icon && iconPosition === 'right' && (
                        <Ionicons
                            name={icon}
                            size={getIconSize()}
                            color={isOutlineOrGhost ? Colors.primary : Colors.white}
                            style={styles.iconRight}
                        />
                    )}
                </>
            )}
        </>
    );

    if (isOutlineOrGhost) {
        return (
            <AnimatedPressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled || loading}
                style={[
                    animatedStyle,
                    styles.button,
                    variant === 'outline' && styles.outlineButton,
                    variant === 'ghost' && styles.ghostButton,
                    { height: getHeight() },
                    fullWidth && styles.fullWidth,
                    disabled && styles.disabled,
                    style,
                ]}
            >
                {renderContent()}
            </AnimatedPressable>
        );
    }

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || loading}
            style={[
                animatedStyle,
                fullWidth && styles.fullWidth,
                disabled && styles.disabled,
                style,
            ]}
        >
            <LinearGradient
                colors={getGradientColors()}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.gradient,
                    { height: getHeight() },
                    fullWidth && styles.fullWidth,
                ]}
            >
                {renderContent()}
            </LinearGradient>
        </AnimatedPressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        borderRadius: BorderRadius.button,
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        borderRadius: BorderRadius.button,
        ...Shadows.glow,
    },
    outlineButton: {
        borderWidth: 2,
        borderColor: Colors.primary,
        backgroundColor: 'transparent',
    },
    ghostButton: {
        backgroundColor: 'transparent',
    },
    text: {
        fontFamily: Typography.fontFamily.semiBold,
        letterSpacing: Typography.letterSpacing.wide,
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },
});
