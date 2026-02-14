/**
 * OrdersScreen - Modern Gen Z styled orders screen
 * Features: Order cards, status badges, timeline animation
 */

import { EmptyState, OrderCard } from '@/components/ui';
import { Colors, Layout, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
type TabFilter = 'all' | 'active' | 'completed';

// Mock Orders Data
const ORDERS = [
    {
        id: '1',
        orderNumber: '2847192',
        date: 'Feb 12, 2026',
        status: 'delivered' as OrderStatus,
        totalAmount: 1249.97,
        itemCount: 3,
        previewImages: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200',
            'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200',
            'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=200',
        ],
    },
    {
        id: '2',
        orderNumber: '2847156',
        date: 'Feb 10, 2026',
        status: 'shipped' as OrderStatus,
        totalAmount: 599.99,
        itemCount: 1,
        previewImages: [
            'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200',
        ],
    },
    {
        id: '3',
        orderNumber: '2847089',
        date: 'Feb 8, 2026',
        status: 'processing' as OrderStatus,
        totalAmount: 429.99,
        itemCount: 2,
        previewImages: [
            'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200',
            'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200',
        ],
    },
    {
        id: '4',
        orderNumber: '2846998',
        date: 'Feb 5, 2026',
        status: 'pending' as OrderStatus,
        totalAmount: 189.99,
        itemCount: 1,
        previewImages: [
            'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=200',
        ],
    },
    {
        id: '5',
        orderNumber: '2846875',
        date: 'Jan 28, 2026',
        status: 'delivered' as OrderStatus,
        totalAmount: 899.99,
        itemCount: 2,
        previewImages: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=200',
        ],
    },
];

const TABS: { key: TabFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
];

interface OrdersScreenProps {
    navigation?: any;
}

export default function OrdersScreen({ navigation }: OrdersScreenProps) {
    const [activeTab, setActiveTab] = useState<TabFilter>('all');

    const filteredOrders = ORDERS.filter((order) => {
        if (activeTab === 'all') return true;
        if (activeTab === 'active') {
            return ['pending', 'processing', 'shipped'].includes(order.status);
        }
        if (activeTab === 'completed') {
            return ['delivered', 'cancelled'].includes(order.status);
        }
        return true;
    });

    const handleOrderPress = (orderId: string) => {
        navigation?.navigate('OrderDetails', { orderId });
    };

    if (ORDERS.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundLight} />

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Orders</Text>
                </View>

                <EmptyState
                    emoji="📦"
                    title="No orders yet"
                    subtitle="When you place an order, it will appear here"
                    actionTitle="Start Shopping"
                    onAction={() => navigation?.navigate('Home')}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundLight} />

            {/* Header */}
            <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
                <Text style={styles.headerTitle}>My Orders</Text>
            </Animated.View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                {TABS.map((tab) => (
                    <Pressable
                        key={tab.key}
                        onPress={() => setActiveTab(tab.key)}
                        style={[
                            styles.tab,
                            activeTab === tab.key && styles.tabActive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab.key && styles.tabTextActive,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {filteredOrders.length === 0 ? (
                <View style={styles.emptyFilterContainer}>
                    <Ionicons
                        name="document-text-outline"
                        size={48}
                        color={Colors.gray300}
                    />
                    <Text style={styles.emptyFilterText}>
                        No {activeTab} orders
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredOrders}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item, index }) => (
                        <OrderCard
                            {...item}
                            onPress={() => handleOrderPress(item.id)}
                            index={index}
                        />
                    )}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    header: {
        paddingHorizontal: Layout.screenPadding,
        paddingVertical: Spacing.lg,
    },
    headerTitle: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.h2,
        color: Colors.textPrimary,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: Layout.screenPadding,
        marginBottom: Spacing.lg,
        gap: Spacing.sm,
    },
    tab: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.sm,
        borderRadius: 20,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gray200,
    },
    tabActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    tabText: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
        color: Colors.textSecondary,
    },
    tabTextActive: {
        color: Colors.white,
    },
    listContent: {
        paddingHorizontal: Layout.screenPadding,
        paddingBottom: Layout.tabBarHeight + Spacing.xl,
    },
    emptyFilterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    emptyFilterText: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.md,
        color: Colors.textMuted,
        marginTop: Spacing.md,
    },
});
