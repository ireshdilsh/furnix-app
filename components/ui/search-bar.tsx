import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onFilterPress?: () => void;
}

export default function SearchBar({
    value,
    onChangeText,
    placeholder = "Search furniture...",
    onFilterPress
}: SearchBarProps) {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons
                    name="search-outline"
                    size={20}
                    color={Colors.textMuted}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textMuted}
                />
                {value.length > 0 && (
                    <Pressable onPress={() => onChangeText('')} hitSlop={8}>
                        <Ionicons
                            name="close-circle"
                            size={20}
                            color={Colors.textMuted}
                        />
                    </Pressable>
                )}
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.filterButton,
                    pressed && styles.filterButtonPressed
                ]}
                onPress={onFilterPress}
            >
                <Ionicons
                    name="options-outline"
                    size={20}
                    color={Colors.textLight}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        gap: Spacing.md,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        paddingHorizontal: Spacing.md,
        height: 52,
        ...Shadows.small,
    },
    searchIcon: {
        marginRight: Spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: Colors.textPrimary,
        height: '100%',
    },
    filterButton: {
        width: 52,
        height: 52,
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.medium,
    },
    filterButtonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.95 }],
    },
});
