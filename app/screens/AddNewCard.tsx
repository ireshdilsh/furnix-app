import { Colors } from '@/constants/theme'
import { getCurrentUser } from '@/service/AuthService'
import { Card, deleteCard, getCardsByEmail, maskCardNumber, saveCard } from '@/service/CardService'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
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

export default function AddNewCard() {
    const [cardNumber, setCardNumber] = useState('')
    const [cardHolder, setCardHolder] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [saving, setSaving] = useState(false)
    const [savedCards, setSavedCards] = useState<Card[]>([])
    const [loadingCards, setLoadingCards] = useState(true)
    const [userEmail, setUserEmail] = useState('')

    useEffect(() => {
        loadSavedCards()
    }, [])

    const loadSavedCards = async () => {
        try {
            const user = getCurrentUser()
            if (user?.email) {
                setUserEmail(user.email)
                const cards = await getCardsByEmail(user.email)
                setSavedCards(cards)
            }
        } catch (error) {
            console.error('Error loading cards:', error)
        } finally {
            setLoadingCards(false)
        }
    }

    const formatCardNumber = (text: string) => {
        const cleaned = text.replace(/\s/g, '').replace(/\D/g, '')
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
        return formatted.substring(0, 19)
    }

    const formatExpiryDate = (text: string) => {
        const cleaned = text.replace(/\D/g, '')
        if (cleaned.length >= 2) {
            return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`
        }
        return cleaned
    }

    const getCardType = (number: string) => {
        const cleaned = number.replace(/\s/g, '')
        if (cleaned.startsWith('4')) return 'Visa'
        if (cleaned.startsWith('5') || cleaned.startsWith('2')) return 'Mastercard'
        if (cleaned.startsWith('3')) return 'Amex'
        return ''
    }

    const handleSaveCard = async () => {
        if (!userEmail) {
            Alert.alert('Error', 'Please sign in to save a card')
            return
        }
        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
            Alert.alert('Error', 'Please enter a valid card number')
            return
        }
        if (!cardHolder.trim()) {
            Alert.alert('Error', 'Please enter the cardholder name')
            return
        }
        if (!expiryDate || expiryDate.length < 5) {
            Alert.alert('Error', 'Please enter a valid expiry date')
            return
        }
        if (!cvv || cvv.length < 3) {
            Alert.alert('Error', 'Please enter a valid CVV')
            return
        }

        setSaving(true)
        try {
            await saveCard({
                email: userEmail,
                cardNumber,
                cardHolder,
                expiryDate,
                cvv,
            })
            // Clear form
            setCardNumber('')
            setCardHolder('')
            setExpiryDate('')
            setCvv('')
            // Reload cards
            await loadSavedCards()
            Alert.alert('Success', 'Card saved successfully!')
        } catch (error: any) {
            Alert.alert('Error', error.toString())
        } finally {
            setSaving(false)
        }
    }

    const handleDeleteCard = (card: Card) => {
        Alert.alert(
            'Delete Card',
            `Are you sure you want to delete the card ending in ${card.lastFourDigits}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteCard(card.id)
                            await loadSavedCards()
                        } catch (error: any) {
                            Alert.alert('Error', error.toString())
                        }
                    },
                },
            ]
        )
    }

    const cardType = getCardType(cardNumber)

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#F8F9FF' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 40 }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </Pressable>
                    <Text style={styles.headerTitle}>My Cards</Text>
                    <View style={{ width: 44 }} />
                </View>

                {/* Saved Cards Section */}
                {loadingCards ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color={Colors.primary} />
                        <Text style={styles.loadingText}>Loading your cards...</Text>
                    </View>
                ) : savedCards.length > 0 ? (
                    <View style={styles.savedCardsSection}>
                        <Text style={styles.sectionTitle}>Saved Cards</Text>
                        {savedCards.map((card) => (
                            <View key={card.id} style={styles.savedCardItem}>
                                <LinearGradient
                                    colors={card.cardType === 'Visa' ? ['#1a1f71', '#4b5ccc'] :
                                        card.cardType === 'Mastercard' ? ['#eb001b', '#f79e1b'] :
                                            Colors.gradientPurpleCoral}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.savedCardGradient}
                                >
                                    <View style={styles.savedCardHeader}>
                                        <Ionicons name="card" size={24} color="#fff" />
                                        <Text style={styles.savedCardType}>{card.cardType}</Text>
                                    </View>
                                    <Text style={styles.savedCardNumber}>
                                        {maskCardNumber(card.lastFourDigits)}
                                    </Text>
                                    <View style={styles.savedCardFooter}>
                                        <View>
                                            <Text style={styles.savedCardLabel}>HOLDER</Text>
                                            <Text style={styles.savedCardValue}>{card.cardHolder.toUpperCase()}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.savedCardLabel}>EXPIRES</Text>
                                            <Text style={styles.savedCardValue}>{card.expiryDate}</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                                <Pressable
                                    style={styles.deleteCardButton}
                                    onPress={() => handleDeleteCard(card)}
                                >
                                    <Ionicons name="trash-outline" size={18} color={Colors.error} />
                                </Pressable>
                            </View>
                        ))}
                        <View style={styles.divider} />
                        <Text style={styles.sectionTitle}>Add New Card</Text>
                    </View>
                ) : (
                    <View style={styles.noCardsContainer}>
                        <Text style={styles.noCardsText}>No saved cards yet</Text>
                    </View>
                )}

                {/* Card Preview */}
                <LinearGradient
                    colors={Colors.gradientPurpleCoral}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.cardPreview}
                >
                    <View style={styles.cardHeader}>
                        <Ionicons name="card" size={32} color="#fff" />
                        <Text style={styles.cardType}>{cardType}</Text>
                    </View>

                    <Text style={styles.cardNumberPreview}>
                        {cardNumber || '•••• •••• •••• ••••'}
                    </Text>

                    <View style={styles.cardFooter}>
                        <View>
                            <Text style={styles.cardLabel}>CARD HOLDER</Text>
                            <Text style={styles.cardValue}>
                                {cardHolder.toUpperCase() || 'YOUR NAME'}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.cardLabel}>EXPIRES</Text>
                            <Text style={styles.cardValue}>
                                {expiryDate || 'MM/YY'}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Form */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Card Number</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="card-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="1234 5678 9012 3456"
                                placeholderTextColor="#9CA3AF"
                                value={cardNumber}
                                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                                keyboardType="numeric"
                                maxLength={19}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Cardholder Name</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="John Doe"
                                placeholderTextColor="#9CA3AF"
                                value={cardHolder}
                                onChangeText={setCardHolder}
                                autoCapitalize="words"
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.label}>Expiry Date</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="calendar-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="MM/YY"
                                    placeholderTextColor="#9CA3AF"
                                    value={expiryDate}
                                    onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                                    keyboardType="numeric"
                                    maxLength={5}
                                />
                            </View>
                        </View>

                        <View style={{ width: 16 }} />

                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.label}>CVV</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="123"
                                    placeholderTextColor="#9CA3AF"
                                    value={cvv}
                                    onChangeText={(text) => setCvv(text.replace(/\D/g, '').substring(0, 4))}
                                    keyboardType="numeric"
                                    maxLength={4}
                                    secureTextEntry
                                />
                            </View>
                        </View>
                    </View>

                    {/* Save Button */}
                    <Pressable
                        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                        onPress={handleSaveCard}
                        disabled={saving}
                    >
                        <LinearGradient
                            colors={Colors.gradientPurpleCoral}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.saveButtonGradient}
                        >
                            {saving ? (
                                <Text style={styles.saveButtonText}>Saving...</Text>
                            ) : (
                                <>
                                    <Ionicons name="add-circle-outline" size={20} color="#fff" />
                                    <Text style={styles.saveButtonText}>Add Card</Text>
                                </>
                            )}
                        </LinearGradient>
                    </Pressable>

                    {/* Security Note */}
                    <View style={styles.securityNote}>
                        <Ionicons name="shield-checkmark" size={18} color="#22c55e" />
                        <Text style={styles.securityText}>
                            Your card information is encrypted and secure
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 60,
        marginBottom: 30,
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
    cardPreview: {
        borderRadius: 16,
        padding: 24,
        height: 200,
        marginBottom: 30,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardType: {
        fontFamily: 'Robotslab',
        fontSize: 18,
        color: '#fff',
    },
    cardNumberPreview: {
        fontFamily: 'Robotslab',
        fontSize: 22,
        color: '#fff',
        letterSpacing: 2,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardLabel: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 4,
    },
    cardValue: {
        fontFamily: 'Robotslab',
        fontSize: 14,
        color: '#fff',
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontFamily: 'Robotslab',
        fontSize: 14,
        color: '#374151',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#1F2937',
    },
    row: {
        flexDirection: 'row',
    },
    saveButton: {
        marginTop: 20,
        borderRadius: 12,
        overflow: 'hidden',
    },
    saveButtonDisabled: {
        opacity: 0.7,
    },
    saveButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        gap: 8,
    },
    saveButtonText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#fff',
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 16,
    },
    securityText: {
        fontSize: 13,
        color: '#6B7280',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 20,
    },
    loadingText: {
        fontSize: 14,
        color: '#6B7280',
    },
    savedCardsSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: '#374151',
        marginBottom: 16,
    },
    savedCardItem: {
        marginBottom: 16,
        position: 'relative',
    },
    savedCardGradient: {
        borderRadius: 14,
        padding: 18,
        height: 140,
        justifyContent: 'space-between',
    },
    savedCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    savedCardType: {
        fontFamily: 'Robotslab',
        fontSize: 14,
        color: '#fff',
    },
    savedCardNumber: {
        fontFamily: 'Robotslab',
        fontSize: 18,
        color: '#fff',
        letterSpacing: 2,
    },
    savedCardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    savedCardLabel: {
        fontSize: 9,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 2,
    },
    savedCardValue: {
        fontFamily: 'Robotslab',
        fontSize: 12,
        color: '#fff',
    },
    deleteCardButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 20,
    },
    noCardsContainer: {
        alignItems: 'center',
        paddingVertical: 16,
        marginBottom: 10,
    },
    noCardsText: {
        fontSize: 14,
        color: '#9CA3AF',
    },
})
