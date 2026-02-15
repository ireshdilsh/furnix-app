import { Colors } from '@/constants/theme'
import { CartItem, useCart } from '@/context/CartContext'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

function CartItemCard({ item, onIncrease, onDecrease, onRemove }: {
    item: CartItem
    onIncrease: () => void
    onDecrease: () => void
    onRemove: () => void
}) {
    return (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} contentFit="cover" />
            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <View style={styles.quantityRow}>
                    <Pressable style={styles.quantityButton} onPress={onDecrease}>
                        <Ionicons name="remove" size={18} color="#374151" />
                    </Pressable>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <Pressable style={styles.quantityButton} onPress={onIncrease}>
                        <Ionicons name="add" size={18} color="#374151" />
                    </Pressable>
                </View>
            </View>
            <View style={styles.itemRight}>
                <Pressable onPress={onRemove} style={styles.removeButton}>
                    <Ionicons name="trash-outline" size={20} color={Colors.error} />
                </Pressable>
                <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
        </View>
    )
}

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, getTotal, getItemCount } = useCart()

    const subtotal = getTotal()
    const shipping = subtotal > 0 ? 9.99 : 0
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    if (cartItems.length === 0) {
        return (
            <View style={{ backgroundColor: '#F8F9FF', flex: 1 }}>
                <ScrollView style={{ flex: 1, paddingHorizontal: 28 }} showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 60, gap: 15 }}>
                        <Pressable onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={24} color="#374151" />
                        </Pressable>
                        <Text style={{
                            fontFamily: 'Robotslab',
                            fontSize: 21,
                        }}>My Cart</Text>
                    </View>

                    {/* Empty State */}
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 100
                    }}>
                        <Ionicons name="cart-outline" size={80} color={Colors.gradientPurpleCoral[0]} />
                        <Text style={{
                            fontFamily: 'Robotslab',
                            fontSize: 18,
                            marginTop: 20,
                            color: '#374151'
                        }}>Your cart is empty</Text>
                        <Text style={{
                            color: '#6B7280',
                            marginTop: 10,
                            textAlign: 'center',
                            paddingHorizontal: 40
                        }}>Looks like you haven&apos;t added anything to your cart yet. Start shopping now!</Text>

                        <Pressable
                            onPress={() => router.back()}
                            style={{
                                backgroundColor: Colors.gradientPurpleCoral[0],
                                paddingHorizontal: 30,
                                paddingVertical: 12,
                                borderRadius: 8,
                                marginTop: 30
                            }}
                        >
                            <Text style={{
                                fontFamily: 'Robotslab',
                                color: '#fff',
                                fontSize: 14
                            }}>Start Shopping</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: '#F8F9FF', flex: 1 }}>
            <ScrollView style={{ flex: 1, paddingHorizontal: 28 }} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </Pressable>
                    <Text style={styles.headerTitle}>My Cart</Text>
                    <Text style={styles.itemCount}>{getItemCount()} items</Text>
                </View>

                {/* Cart Items */}
                <View style={styles.itemsContainer}>
                    {cartItems.map(item => (
                        <CartItemCard
                            key={item.id}
                            item={item}
                            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                            onRemove={() => removeFromCart(item.id)}
                        />
                    ))}
                </View>

                {/* Order Summary */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Order Summary</Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tax (8%)</Text>
                        <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            {/* Checkout Button */}
            <View style={styles.checkoutContainer}>
                <Pressable
                    onPress={() => router.push('/screens/Checkout' as any)}
                    style={styles.checkoutButton}
                >
                    <LinearGradient
                        colors={Colors.gradientPurpleCoral}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.checkoutGradient}
                    >
                        <Ionicons name="card" size={22} color="#fff" />
                        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                        <Text style={styles.checkoutTotal}>${total.toFixed(2)}</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
        gap: 15,
    },
    headerTitle: {
        fontFamily: 'Robotslab',
        fontSize: 21,
        flex: 1,
    },
    itemCount: {
        fontSize: 14,
        color: '#6B7280',
    },
    itemsContainer: {
        marginTop: 20,
        gap: 12,
    },
    cartItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        gap: 12,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemTitle: {
        fontFamily: 'Robotslab',
        fontSize: 14,
        color: '#1F2937',
    },
    itemPrice: {
        fontSize: 13,
        color: '#6B7280',
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#1F2937',
        minWidth: 24,
        textAlign: 'center',
    },
    itemRight: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    removeButton: {
        padding: 4,
    },
    itemTotal: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: Colors.primary,
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginTop: 24,
    },
    summaryTitle: {
        fontFamily: 'Robotslab',
        fontSize: 18,
        color: '#1F2937',
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    summaryValue: {
        fontSize: 14,
        color: '#374151',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },
    totalLabel: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#1F2937',
    },
    totalValue: {
        fontFamily: 'Robotslab',
        fontSize: 20,
        color: Colors.primary,
    },
    checkoutContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 28,
        paddingBottom: 30,
        paddingTop: 15,
        backgroundColor: '#F8F9FF',
    },
    checkoutButton: {
        borderRadius: 14,
        overflow: 'hidden',
    },
    checkoutGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        gap: 10,
    },
    checkoutText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#fff',
        flex: 1,
    },
    checkoutTotal: {
        fontFamily: 'Robotslab',
        fontSize: 18,
        color: '#fff',
    },
})
