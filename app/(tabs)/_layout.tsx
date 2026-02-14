/**
 * Funix Furniture App - Main Layout
 * Modern Gen Z styled navigation with bottom tabs
 */

import { BorderRadius, Colors, Layout, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.gray500,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="wishlist"
                options={{
                    title: 'Wishlist',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'heart' : 'heart-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.cartIconContainer}>
                            <LinearGradient
                                colors={Colors.gradientPurple}
                                style={styles.cartIconGradient}
                            >
                                <Ionicons
                                    name={focused ? 'bag' : 'bag-outline'}
                                    size={24}
                                    color={Colors.white}
                                />
                            </LinearGradient>
                            <View style={styles.cartBadge}>
                                <Ionicons name="ellipse" size={8} color={Colors.accent} />
                            </View>
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: 'Orders',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'receipt' : 'receipt-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: Spacing.lg,
        left: Spacing.lg,
        right: Spacing.lg,
        height: Layout.tabBarHeight,
        borderRadius: BorderRadius.xxl,
        backgroundColor: Colors.white,
        borderTopWidth: 0,
        paddingBottom: 0,
        paddingTop: Spacing.sm,
        ...Shadows.large,
    },
    tabBarLabel: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.xxs,
        marginTop: Spacing.xxs,
    },
    cartIconContainer: {
        position: 'relative',
        marginTop: -20,
    },
    cartIconGradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.floatingButton,
    },
    cartBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});
