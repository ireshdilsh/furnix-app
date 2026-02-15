import { Colors } from '@/constants/theme'
import { getCurrentUser } from '@/service/AuthService'
import { createOrder } from '@/service/OrderService'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
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

export default function OrderPlace() {
    const params = useLocalSearchParams<{
        id: string
        title: string
        price: string
        image: string
        description: string
    }>()

    const [selectedPayment, setSelectedPayment] = useState<'card' | 'paypal' | 'apple'>('card')
    const [processing, setProcessing] = useState(false)
    const [quantity, setQuantity] = useState(1)

    // Form fields
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')

    const productPrice = parseFloat(params.price || '0')
    const subtotal = productPrice * quantity
    const shipping = 9.99
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    useEffect(() => {
        const user = getCurrentUser()
        if (user?.email) {
            setEmail(user.email)
        }
        if (user?.displayName) {
            setFullName(user.displayName)
        }
    }, [])

    const handlePlaceOrder = async () => {
        if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim() || !zipCode.trim()) {
            Alert.alert('Error', 'Please fill in all delivery details')
            return
        }

        setProcessing(true)

        try {
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
                itemCount: quantity,
            })

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

    const incrementQuantity = () => setQuantity(q => q + 1)
    const decrementQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1))

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#F8F9FF' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </Pressable>
                    <Text style={styles.headerTitle}>Place Order</Text>
                    <View style={{ width: 44 }} />
                </View>

                {/* Product Card */}
                <View style={styles.productCard}>
                    <Image
                        source={{ uri: params.image }}
                        style={styles.productImage}
                        contentFit="cover"
                    />
                    <View style={styles.productInfo}>
                        <Text style={styles.productTitle} numberOfLines={2}>{params.title}</Text>
                        <Text style={styles.productDescription} numberOfLines={1}>{params.description}</Text>
                        <Text style={styles.productPrice}>${productPrice.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Quantity Selector */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quantity</Text>
                    <View style={styles.quantityContainer}>
                        <Pressable style={styles.quantityButton} onPress={decrementQuantity}>
                            <Ionicons name="remove" size={20} color="#374151" />
                        </Pressable>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <Pressable style={styles.quantityButton} onPress={incrementQuantity}>
                            <Ionicons name="add" size={20} color="#374151" />
                        </Pressable>
                    </View>
                </View>

                {/* Delivery Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Details</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#9CA3AF"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="call-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="location-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Street Address"
                            placeholderTextColor="#9CA3AF"
                            value={address}
                            onChangeText={setAddress}
                        />
                    </View>
                    <View style={styles.rowInputs}>
                        <View style={[styles.inputContainer, { flex: 1 }]}>
                            <TextInput
                                style={styles.input}
                                placeholder="City"
                                placeholderTextColor="#9CA3AF"
                                value={city}
                                onChangeText={setCity}
                            />
                        </View>
                        <View style={[styles.inputContainer, { flex: 1 }]}>
                            <TextInput
                                style={styles.input}
                                placeholder="ZIP Code"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="number-pad"
                                value={zipCode}
                                onChangeText={setZipCode}
                            />
                        </View>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.paymentOptions}>
                        {paymentMethods.map((method) => (
                            <Pressable
                                key={method.id}
                                style={[
                                    styles.paymentOption,
                                    selectedPayment === method.id && styles.paymentOptionSelected,
                                ]}
                                onPress={() => setSelectedPayment(method.id)}
                            >
                                <Ionicons
                                    name={method.icon as any}
                                    size={24}
                                    color={selectedPayment === method.id ? Colors.primary : '#6B7280'}
                                />
                                <Text
                                    style={[
                                        styles.paymentLabel,
                                        selectedPayment === method.id && styles.paymentLabelSelected,
                                    ]}
                                >
                                    {method.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal ({quantity} item)</Text>
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
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Place Order Button */}
            <View style={styles.bottomContainer}>
                <Pressable
                    onPress={handlePlaceOrder}
                    disabled={processing}
                    style={styles.placeOrderButton}
                >
                    <LinearGradient
                        colors={Colors.gradientPurpleCoral}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.placeOrderGradient}
                    >
                        {processing ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <Ionicons name="checkmark-circle" size={22} color="#fff" />
                                <Text style={styles.placeOrderText}>Place Order</Text>
                            </>
                        )}
                    </LinearGradient>
                </Pressable>
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
        marginBottom: 20,
        paddingHorizontal: 20,
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
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 14,
        padding: 12,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    productImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        backgroundColor: '#f3f4f6',
    },
    productInfo: {
        flex: 1,
        justifyContent: 'center',
        gap: 4,
    },
    productTitle: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#1F2937',
    },
    productDescription: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    productPrice: {
        fontFamily: 'Robotslab',
        fontSize: 18,
        color: Colors.primary,
        marginTop: 4,
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    sectionTitle: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#1F2937',
        marginBottom: 12,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: '#fff',
        alignSelf: 'flex-start',
        borderRadius: 12,
        padding: 8,
    },
    quantityButton: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontFamily: 'Robotslab',
        fontSize: 18,
        color: '#1F2937',
        minWidth: 30,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        paddingHorizontal: 14,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
        color: '#1F2937',
    },
    rowInputs: {
        flexDirection: 'row',
        gap: 12,
    },
    paymentOptions: {
        flexDirection: 'row',
        gap: 12,
    },
    paymentOption: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        alignItems: 'center',
        gap: 6,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    paymentOptionSelected: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primary + '10',
    },
    paymentLabel: {
        fontSize: 11,
        color: '#6B7280',
        fontWeight: '500',
    },
    paymentLabelSelected: {
        color: Colors.primary,
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
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
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 10,
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
        padding: 20,
        paddingBottom: 34,
        backgroundColor: '#F8F9FF',
    },
    placeOrderButton: {
        borderRadius: 14,
        overflow: 'hidden',
    },
    placeOrderGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 16,
    },
    placeOrderText: {
        fontFamily: 'Robotslab',
        fontSize: 17,
        color: '#fff',
    },
})
