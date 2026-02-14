import { BorderRadius } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface TermsSectionProps {
    title: string;
    content: string;
    index: number;
}

const TermsSection = ({ title, content, index }: TermsSectionProps) => {
    const [expanded, setExpanded] = useState(index === 0);

    return (
        <View style={styles.sectionCard}>
            <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setExpanded(!expanded)}
                activeOpacity={0.7}
            >
                <View style={styles.sectionNumberContainer}>
                    <Text style={styles.sectionNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.sectionTitle}>{title}</Text>
                <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#718096"
                />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.sectionContent}>
                    <Text style={styles.sectionText}>{content}</Text>
                </View>
            )}
        </View>
    );
};

export default function TermsadCondition() {

    const router = useRouter();

    const gotoBack = () => {
        router.back();
    }

    const termsData = [
        {
            title: "Acceptance of Terms",
            content: "By accessing and using the Furnix app, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services. Your continued use of the app constitutes acceptance of these terms."
        },
        {
            title: "User Account",
            content: "You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information when creating an account. We reserve the right to suspend or terminate accounts that violate our policies."
        },
        {
            title: "Orders & Payments",
            content: "All orders are subject to availability and confirmation. Prices are subject to change without notice. Payment must be received in full before order processing. We accept various payment methods including credit cards and digital wallets."
        },
        {
            title: "Shipping & Delivery",
            content: "Delivery times are estimates and may vary based on location and product availability. We are not responsible for delays caused by circumstances beyond our control. Shipping costs are calculated at checkout based on delivery address and order weight."
        },
        {
            title: "Returns & Refunds",
            content: "Items may be returned within 30 days of delivery in original condition. Custom or personalized items are non-returnable. Refunds will be processed within 7-10 business days after we receive the returned item. Original shipping costs are non-refundable."
        },
        {
            title: "Privacy Policy",
            content: "We collect and use your personal information in accordance with our Privacy Policy. Your data is protected using industry-standard security measures. We do not sell your personal information to third parties."
        },
        {
            title: "Intellectual Property",
            content: "All content on the Furnix app, including images, text, logos, and designs, are owned by Furnix or its licensors. Unauthorized use or reproduction of any content is strictly prohibited and may result in legal action."
        },
        {
            title: "Limitation of Liability",
            content: "Furnix shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for the product or service in question."
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={gotoBack}>
                    <Ionicons name="arrow-back" size={24} color="#4a5565" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms & Conditions</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Hero Section */}
            <LinearGradient
                colors={['#2b7fff', '#74d4ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.heroSection}
            >
                <View style={styles.heroIconContainer}>
                    <Ionicons name="document-text" size={32} color="#fff" />
                </View>
                <Text style={styles.heroTitle}>Our Policies</Text>
                <Text style={styles.heroSubtitle}>
                    Please read these terms carefully before using Furnix
                </Text>
                <Text style={styles.lastUpdated}>Last updated: February 14, 2026</Text>
            </LinearGradient>

            {/* Terms Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.introText}>
                    Welcome to Furnix! These terms govern your use of our furniture shopping platform. By using our services, you agree to comply with these terms.
                </Text>

                {termsData.map((section, index) => (
                    <TermsSection
                        key={index}
                        title={section.title}
                        content={section.content}
                        index={index}
                    />
                ))}

                {/* Contact Section */}
                <View style={styles.contactCard}>
                    <Ionicons name="help-circle-outline" size={28} color="#74d4ff" />
                    <Text style={styles.contactTitle}>Have Questions?</Text>
                    <Text style={styles.contactText}>
                        Contact our support team at support@furnix.com
                    </Text>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },

    headerTitle: {
        fontSize: 18,
        fontFamily: 'Robotslab',
        fontWeight: '600',
        color: '#4a5565',
    },

    placeholder: {
        width: 40,
    },

    heroSection: {
        marginHorizontal: 20,
        borderRadius: BorderRadius.lg,
        padding: 25,
        alignItems: 'center',
        marginBottom: 20,
    },

    heroIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },

    heroTitle: {
        fontSize: 24,
        fontFamily: 'Robotslab',
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },

    heroSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        marginBottom: 10,
    },

    lastUpdated: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        fontStyle: 'italic',
    },

    scrollView: {
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: 20,
    },

    introText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#718096',
        marginBottom: 20,
        textAlign: 'center',
    },

    sectionCard: {
        backgroundColor: '#fff',
        borderRadius: BorderRadius.md,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },

    sectionNumberContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#74d3ffdc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    sectionNumber: {
        fontSize: 13,
        fontWeight: '600',
        color: '#fff',
    },

    sectionTitle: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#4a5565',
        fontFamily: 'Robotslab',
    },

    sectionContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 0,
    },

    sectionText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#718096',
        marginLeft: 40,
    },

    contactCard: {
        backgroundColor: '#74d3ff3b',
        borderRadius: BorderRadius.md,
        padding: 20,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#74d4ff',
    },

    contactTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4a5565',
        marginTop: 10,
        marginBottom: 5,
        fontFamily: 'Robotslab',
    },

    contactText: {
        fontSize: 13,
        color: '#718096',
        textAlign: 'center',
    },

    acceptSection: {
        marginBottom: 20,
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    checkboxChecked: {
        backgroundColor: '#f68403',
        borderColor: '#f68403',
    },

    checkboxLabel: {
        flex: 1,
        fontSize: 14,
        color: '#4a5565',
        lineHeight: 20,
    },

    acceptButton: {
        backgroundColor: '#f68403',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    acceptButtonDisabled: {
        backgroundColor: '#BDBDBD',
    },

    acceptButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Robotslab',
    },

    bottomPadding: {
        height: 30,
    },
})