import { Colors } from '@/constants/theme';
import { checkEmailExists } from '@/service/AuthService';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerifyEmail = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            const exists = await checkEmailExists(email);
            if (exists) {
                router.push({
                    pathname: '/screens/CreateNewPassword',
                    params: { email: email }
                });
            } else {
                Alert.alert('Error', 'No account found with this email address');
            }
        } catch (error: any) {
            Alert.alert('Error', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBackToSignIn = () => {
        router.push('/screens/SignIn');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <Pressable style={styles.backIconButton} onPress={() => router.push('/screens/SignIn')}>
                    <AntDesign name="arrow-left" size={24} color={Colors.black} />
                </Pressable>
            </View>

            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <AntDesign name="lock" size={60} color={Colors.primary} />
                </View>

                <Text style={styles.title}>Change Password</Text>
                <Text style={styles.subtitle}>
                    Enter your email address to verify your account, then you can change your password.
                </Text>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputWrapper}>
                            <AntDesign name="mail" size={20} color={Colors.gray500} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor={Colors.gray400}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                            />
                        </View>
                    </View>

                    <Pressable
                        style={[styles.resetButton, loading && styles.resetButtonDisabled]}
                        onPress={handleVerifyEmail}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.white} />
                        ) : (
                            <Text style={styles.resetButtonText}>Verify Email</Text>
                        )}
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Remember your password? </Text>
                    <Pressable onPress={handleBackToSignIn}>
                        <Text style={styles.signInLink}>Sign In</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FF',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    backIconButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 24,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    title: {
        fontFamily: 'Robotslab',
        fontSize: 28,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.gray600,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    form: {
        gap: 24,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        fontFamily: 'Robotslab',
        fontSize: 14,
        color: Colors.gray700,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.gray200,
        paddingHorizontal: 16,
        height: 54,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.black,
    },
    resetButton: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    resetButtonDisabled: {
        opacity: 0.7,
    },
    resetButtonText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: Colors.white,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
    },
    footerText: {
        fontSize: 15,
        color: Colors.gray600,
    },
    signInLink: {
        fontFamily: 'Robotslab',
        fontSize: 15,
        color: Colors.primary,
    },
});
