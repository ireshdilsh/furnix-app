import { Colors } from '@/constants/theme'
import { useCart } from '@/context/CartContext'
import { getCurrentUser } from '@/service/AuthService'
import { createOrder } from '@/service/OrderService'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

export default function Checkout() {
    const { getTotal, clearCart, getItemCount } = useCart()
    const [selectedPayment, setSelectedPayment] = useState<'card' | 'paypal' | 'apple'>('card')
    const [processing, setProcessing] = useState(false)

    // Form fields
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')

    useEffect(() => {
        // Pre-fill email from logged in user
        const user = getCurrentUser()
        if (user?.email) {
            setEmail(user.email)
        }
        if (user?.displayName) {
            setFullName(user.displayName)
        }
    }, [])

    const subtotal = getTotal()
    const shipping = subtotal > 0 ? 9.99 : 0
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    const handlePlaceOrder = async () => {
        if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim() || !zipCode.trim()) {
            Alert.alert('Error', 'Please fill in all delivery details')
            return
        }

        setProcessing(true)

        try {
            // Save order to database
            await createOrder({
                email: email,
                amount: total,
                billingAddress: {
                    fullName: fullName,
                    phone: phone,
                    address: address,
                    city: city,
                    zipCode: zipCode,
                },
                paymentMethod: selectedPayment,
                itemCount: getItemCount(),
            })

            clearCart()
            Alert.alert(
                'Order Placed!',
                'Your order has been successfully placed. You will receive a confirmation email shortly.',
                [
                    {
                        text: 'OK',
                        onPress: () => router.replace('/screens/UserProduct' as any)
                    }
                ]
            )
        } catch (error: any) {
            Alert.alert('Error', error.toString())
        } finally {
            setProcessing(false)
        }
    }

    const paymentMethods = [
        { id: 'card', icon: 'card', label: 'Credit Card' },
        { id: 'paypal', icon: 'logo-paypal', label: 'PayPal' },
        { id: 'apple', icon: 'logo-apple', label: 'Apple Pay' },
    ] as const

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#F8F9FF' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 140 }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </Pressable>
                    <Text style={styles.headerTitle}>Checkout</Text>
                    <View style={{ width: 44 }} />
                </View>

                {/* Progress Steps */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressStep}>
                        <View style={[styles.progressDot, styles.progressDotActive]}>
                            <Ionicons name="checkmark" size={14} color="#fff" />
                        </View>
                        <Text style={styles.progressLabel}>Cart</Text>
                    </View>
                    <View style={[styles.progressLine, styles.progressLineActive]} />
                    <View style={styles.progressStep}>
                        <View style={[styles.progressDot, styles.progressDotActive]}>
                            <Text style={styles.progressNumber}>2</Text>
                        </View>
                        <Text style={styles.progressLabel}>Checkout</Text>
                    </View>
                    <View style={styles.progressLine} />
                    <View style={styles.progressStep}>
                        <View style={styles.progressDot}>
                            <Text style={styles.progressNumberInactive}>3</Text>
                        </View>
                        <Text style={styles.progressLabelInactive}>Done</Text>
                    </View>
                </View>

                {/* Delivery Details */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="location" size={20} color={Colors.primary} />
                        <Text style={styles.sectionTitle}>Delivery Details</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John Doe"
                            placeholderTextColor="#9CA3AF"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="email@example.com"
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="+1 234 567 8900"
                            placeholderTextColor="#9CA3AF"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="123 Main Street, Apt 4B"
                            placeholderTextColor="#9CA3AF"
                            value={address}
                            onChangeText={setAddress}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.label}>City</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="New York"
                                placeholderTextColor="#9CA3AF"
                                value={city}
                                onChangeText={setCity}
                            />
                        </View>
                        <View style={{ width: 12 }} />
                        <View style={[styles.inputGroup, { flex: 0.6 }]}>
                            <Text style={styles.label}>ZIP Code</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="10001"
                                placeholderTextColor="#9CA3AF"
                                value={zipCode}
                                onChangeText={setZipCode}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="card" size={20} color={Colors.primary} />
                        <Text style={styles.sectionTitle}>Payment Method</Text>
                    </View>

                    <View style={styles.paymentOptions}>
                        {paymentMethods.map(method => (
                            <Pressable
                                key={method.id}
                                style={[
                                    styles.paymentOption,
                                    selectedPayment === method.id && styles.paymentOptionSelected
                                ]}
                                onPress={() => setSelectedPayment(method.id)}
                            >
                                <Ionicons
                                    name={method.icon}
                                    size={24}
                                    color={selectedPayment === method.id ? Colors.primary : '#6B7280'}
                                />
                                <Text style={[
                                    styles.paymentLabel,
                                    selectedPayment === method.id && styles.paymentLabelSelected
                                ]}>
                                    {method.label}
                                </Text>
                                {selectedPayment === method.id && (
                                    <View style={styles.paymentCheck}>
                                        <Ionicons name="checkmark" size={14} color="#fff" />
                                    </View>
                                )}
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="receipt" size={20} color={Colors.primary} />
                        <Text style={styles.sectionTitle}>Order Summary</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Items ({getItemCount()})</Text>
                        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping</Text>
                        <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tax</Text>
                        <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Place Order Button */}
            <View style={styles.bottomContainer}>
                <Pressable
                    onPress={handlePlaceOrder}
                    style={[styles.placeOrderButton, processing && styles.placeOrderButtonDisabled]}
                    disabled={processing}
                >
                    <LinearGradient
                        colors={Colors.gradientPurpleCoral}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.placeOrderGradient}
                    >
                        {processing ? (
                            <Text style={styles.placeOrderText}>Processing...</Text>
                        ) : (
                            <>
                                <Ionicons name="lock-closed" size={20} color="#fff" />
                                <Text style={styles.placeOrderText}>Place Order</Text>
                                <Text style={styles.placeOrderTotal}>${total.toFixed(2)}</Text>
                            </>
                        )}
                    </LinearGradient>
                </Pressable>

                <View style={styles.securityBadge}>
                    <Ionicons name="shield-checkmark" size={16} color="#22c55e" />
                    <Text style={styles.securityText}>Secure checkout powered by Stripe</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 60,
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
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 8,
    },
    progressStep: {
        alignItems: 'center',
    },
    progressDot: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressDotActive: {
        backgroundColor: Colors.primary,
    },
    progressNumber: {
        fontFamily: 'Robotslab',
        fontSize: 12,
        color: '#fff',
    },
    progressNumberInactive: {
        fontFamily: 'Robotslab',
        fontSize: 12,
        color: '#9CA3AF',
    },
    progressLabel: {
        fontSize: 11,
        color: Colors.primary,
        marginTop: 4,
    },
    progressLabelInactive: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 4,
    },
    progressLine: {
        width: 40,
        height: 2,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 8,
        marginBottom: 18,
    },
    progressLineActive: {
        backgroundColor: Colors.primary,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginTop: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
    },
    sectionTitle: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#1F2937',
    },
    inputGroup: {
        marginBottom: 12,
    },
    label: {
        fontFamily: 'Robotslab',
        fontSize: 13,
        color: '#374151',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#1F2937',
    },
    row: {
        flexDirection: 'row',
    },
    paymentOptions: {
        gap: 10,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        gap: 12,
    },
    paymentOptionSelected: {
        borderColor: Colors.primary,
        backgroundColor: '#F0EFFF',
    },
    paymentLabel: {
        flex: 1,
        fontFamily: 'Robotslab',
        fontSize: 15,
        color: '#6B7280',
    },
    paymentLabelSelected: {
        color: Colors.primary,
    },
    paymentCheck: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
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
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 28,
        paddingBottom: 30,
        paddingTop: 12,
        backgroundColor: '#F8F9FF',
    },
    placeOrderButton: {
        borderRadius: 14,
        overflow: 'hidden',
    },
    placeOrderButtonDisabled: {
        opacity: 0.7,
    },
    placeOrderGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        gap: 10,
    },
    placeOrderText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#fff',
        flex: 1,
    },
    placeOrderTotal: {
        fontFamily: 'Robotslab',
        fontSize: 18,
        color: '#fff',
    },
    securityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 12,
    },
    securityText: {
        fontSize: 12,
        color: '#6B7280',
    },
})
