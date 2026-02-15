import { Colors } from '@/constants/theme'
import { getCurrentUser } from '@/service/AuthService'
import { formatOrderDate, getOrdersByEmail, Order } from '@/service/OrderService'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'

const getStatusColor = (status: Order['status']) => {
    switch (status) {
        case 'pending':
            return '#f59e0b'
        case 'processing':
            return '#3b82f6'
        case 'shipped':
            return '#8b5cf6'
        case 'delivered':
            return '#22c55e'
        case 'cancelled':
            return '#ef4444'
        default:
            return '#6b7280'
    }
}

const getStatusIcon = (status: Order['status']): keyof typeof Ionicons.glyphMap => {
    switch (status) {
        case 'pending':
            return 'time-outline'
        case 'processing':
            return 'cog-outline'
        case 'shipped':
            return 'airplane-outline'
        case 'delivered':
            return 'checkmark-circle-outline'
        case 'cancelled':
            return 'close-circle-outline'
        default:
            return 'ellipse-outline'
    }
}

export default function MyOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = async () => {
        try {
            const user = getCurrentUser()
            if (user?.email) {
                const userOrders = await getOrdersByEmail(user.email)
                setOrders(userOrders)
            }
        } catch (error) {
            console.error('Error loading orders:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Loading your orders...</Text>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: '#F8F9FF', flex: 1 }}>
            <ScrollView
                style={{ flex: 1, paddingHorizontal: 28 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </Pressable>
                    <Text style={styles.headerTitle}>My Orders</Text>
                    <View style={{ width: 44 }} />
                </View>

                {orders.length === 0 ? (
                    /* Empty State */
                    <View style={styles.emptyContainer}>
                        <Ionicons name="receipt-outline" size={80} color={Colors.gradientPurpleCoral[0]} />
                        <Text style={styles.emptyTitle}>No orders yet</Text>
                        <Text style={styles.emptyText}>
                            When you place an order, it will appear here. Start shopping to see your order history!
                        </Text>
                        <Pressable
                            onPress={() => router.push('/screens/UserProduct' as any)}
                            style={styles.shopButton}
                        >
                            <LinearGradient
                                colors={Colors.gradientPurpleCoral}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.shopButtonGradient}
                            >
                                <Text style={styles.shopButtonText}>Start Shopping</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
                ) : (
                    /* Orders List */
                    <View style={styles.ordersContainer}>
                        {orders.map((order) => (
                            <View key={order.id} style={styles.orderCard}>
                                <View style={styles.orderHeader}>
                                    <View style={styles.orderIdContainer}>
                                        <Ionicons name="document-text" size={18} color={Colors.primary} />
                                        <Text style={styles.orderId}>#{order.id.substring(0, 8).toUpperCase()}</Text>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                                        <Ionicons name={getStatusIcon(order.status)} size={14} color={getStatusColor(order.status)} />
                                        <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.orderDetails}>
                                    <View style={styles.detailRow}>
                                        <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                                        <Text style={styles.detailLabel}>Date</Text>
                                        <Text style={styles.detailValue}>{formatOrderDate(order.date)}</Text>
                                    </View>

                                    <View style={styles.detailRow}>
                                        <Ionicons name="cube-outline" size={16} color="#6B7280" />
                                        <Text style={styles.detailLabel}>Items</Text>
                                        <Text style={styles.detailValue}>{order.itemCount} item(s)</Text>
                                    </View>

                                    <View style={styles.detailRow}>
                                        <Ionicons name="card-outline" size={16} color="#6B7280" />
                                        <Text style={styles.detailLabel}>Payment</Text>
                                        <Text style={styles.detailValue}>
                                            {order.paymentMethod === 'card' ? 'Credit Card' :
                                                order.paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.orderFooter}>
                                    <View>
                                        <Text style={styles.totalLabel}>Total Amount</Text>
                                        <Text style={styles.totalAmount}>${order.amount.toFixed(2)}</Text>
                                    </View>
                                    <View style={styles.addressPreview}>
                                        <Ionicons name="location-outline" size={14} color="#9CA3AF" />
                                        <Text style={styles.addressText} numberOfLines={1}>
                                            {order.billingAddress.city}, {order.billingAddress.zipCode}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: 30 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: '#F8F9FF',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    loadingText: {
        fontSize: 14,
        color: '#6B7280',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 60,
        marginBottom: 24,
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'Robotslab',
        fontSize: 20,
        color: '#1F2937',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
    },
    emptyTitle: {
        fontFamily: 'Robotslab',
        fontSize: 20,
        color: '#374151',
        marginTop: 20,
    },
    emptyText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
        lineHeight: 22,
    },
    shopButton: {
        marginTop: 30,
        borderRadius: 12,
        overflow: 'hidden',
    },
    shopButtonGradient: {
        paddingVertical: 14,
        paddingHorizontal: 32,
    },
    shopButtonText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#fff',
    },
    ordersContainer: {
        gap: 16,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    orderIdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    orderId: {
        fontFamily: 'Robotslab',
        fontSize: 14,
        color: '#1F2937',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    orderDetails: {
        gap: 10,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailLabel: {
        fontSize: 13,
        color: '#6B7280',
        flex: 1,
    },
    detailValue: {
        fontSize: 13,
        color: '#374151',
        fontWeight: '500',
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 16,
    },
    totalLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 2,
    },
    totalAmount: {
        fontFamily: 'Robotslab',
        fontSize: 22,
        color: Colors.primary,
    },
    addressPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        maxWidth: 140,
    },
    addressText: {
        fontSize: 12,
        color: '#9CA3AF',
    },
})
