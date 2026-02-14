/**
 * Input - Modern Gen Z styled text input
 */

import { BorderRadius, Colors, Layout, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

interface InputProps extends TextInputProps {
    label?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    error?: string;
    containerStyle?: StyleProp<ViewStyle>;
    isPassword?: boolean;
}

export default function Input({
    label,
    icon,
    error,
    containerStyle,
    isPassword = false,
    ...props
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const borderWidth = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        borderWidth: borderWidth.value,
        borderColor: error
            ? Colors.error
            : isFocused
                ? Colors.primary
                : Colors.gray200,
    }));

    const handleFocus = () => {
        setIsFocused(true);
        borderWidth.value = withSpring(2, { damping: 15, stiffness: 400 });
    };

    const handleBlur = () => {
        setIsFocused(false);
        borderWidth.value = withSpring(1, { damping: 15, stiffness: 400 });
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <Animated.View style={[styles.inputContainer, animatedStyle]}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={isFocused ? Colors.primary : Colors.textMuted}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholderTextColor={Colors.textMuted}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={isPassword && !showPassword}
                    {...props}
                />
                {isPassword && (
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                            size={20}
                            color={Colors.textMuted}
                        />
                    </Pressable>
                )}
            </Animated.View>

            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    label: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.input,
        paddingHorizontal: Spacing.md,
        height: Layout.inputHeight,
        ...Shadows.small,
    },
    icon: {
        marginRight: Spacing.md,
    },
    input: {
        flex: 1,
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.md,
        color: Colors.textPrimary,
    },
    errorText: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.xs,
        color: Colors.error,
        marginTop: Spacing.xs,
    },
});
