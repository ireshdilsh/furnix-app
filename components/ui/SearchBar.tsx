/**
 * SearchBar - Modern Gen Z styled search bar
 */

import { BorderRadius, Colors, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Pressable,
    StyleProp,
    StyleSheet,
    TextInput,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onFilterPress?: () => void;
    showFilter?: boolean;
    style?: StyleProp<ViewStyle>;
}

export default function SearchBar({
    value,
    onChangeText,
    placeholder = 'Search furniture...',
    onFocus,
    onBlur,
    onFilterPress,
    showFilter = true,
    style,
}: SearchBarProps) {
    const scale = useSharedValue(1);
    const borderColor = useSharedValue(Colors.gray200);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        borderColor: borderColor.value,
    }));

    const handleFocus = () => {
        scale.value = withSpring(1.02, { damping: 15, stiffness: 400 });
        borderColor.value = Colors.primary;
        onFocus?.();
    };

    const handleBlur = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
        borderColor.value = Colors.gray200;
        onBlur?.();
    };

    return (
        <Animated.View style={[styles.container, animatedStyle, style]}>
            <View style={styles.searchSection}>
                <Ionicons
                    name="search-outline"
                    size={20}
                    color={Colors.textSecondary}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textMuted}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {value.length > 0 && (
                    <Pressable onPress={() => onChangeText('')}>
                        <Ionicons
                            name="close-circle"
                            size={20}
                            color={Colors.textMuted}
                        />
                    </Pressable>
                )}
            </View>

            {showFilter && (
                <Pressable style={styles.filterButton} onPress={onFilterPress}>
                    <Ionicons
                        name="options-outline"
                        size={20}
                        color={Colors.white}
                    />
                </Pressable>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.md,
        height: 52,
        borderWidth: 1,
        borderColor: Colors.gray200,
        ...Shadows.small,
    },
    searchIcon: {
        marginRight: Spacing.sm,
    },
    input: {
        flex: 1,
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.md,
        color: Colors.textPrimary,
    },
    filterButton: {
        width: 52,
        height: 52,
        borderRadius: BorderRadius.lg,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.glow,
    },
});
