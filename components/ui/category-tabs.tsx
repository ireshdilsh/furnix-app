import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Category {
    id: string;
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
}

const categories: Category[] = [
    { id: 'all', name: 'All', icon: 'grid-outline', color: Colors.primary },
    { id: 'living', name: 'Living', icon: 'home-outline', color: Colors.categoryLiving },
    { id: 'bedroom', name: 'Bedroom', icon: 'bed-outline', color: Colors.categoryBedroom },
    { id: 'office', name: 'Office', icon: 'desktop-outline', color: Colors.categoryOffice },
    { id: 'outdoor', name: 'Outdoor', icon: 'leaf-outline', color: Colors.categoryOutdoor },
    { id: 'kitchen', name: 'Kitchen', icon: 'restaurant-outline', color: Colors.categoryKitchen },
];

interface CategoryTabsProps {
    selectedCategory: string;
    onSelectCategory: (categoryId: string) => void;
}

export default function CategoryTabs({
    selectedCategory,
    onSelectCategory
}: CategoryTabsProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                return (
                    <Pressable
                        key={category.id}
                        style={[
                            styles.tab,
                            isSelected && styles.selectedTab,
                        ]}
                        onPress={() => onSelectCategory(category.id)}
                    >
                        <View style={[
                            styles.iconContainer,
                            isSelected && { backgroundColor: Colors.primary },
                            !isSelected && { backgroundColor: category.color },
                        ]}>
                            <Ionicons
                                name={category.icon}
                                size={20}
                                color={isSelected ? Colors.textLight : Colors.primary}
                            />
                        </View>
                        <Text style={[
                            styles.tabText,
                            isSelected && styles.selectedTabText,
                        ]}>
                            {category.name}
                        </Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        gap: Spacing.sm,
    },
    tab: {
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.lg,
        minWidth: 72,
    },
    selectedTab: {
        backgroundColor: Colors.surfaceVariant,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    tabText: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.textSecondary,
    },
    selectedTabText: {
        color: Colors.primary,
        fontWeight: '600',
    },
});
