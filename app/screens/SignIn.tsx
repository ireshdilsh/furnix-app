import { Colors } from '@/constants/theme';
// import AntDesign from '@expo/vector-icons/AntDesign';
import { loginUser } from '@/service/AuthService';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
} from 'react-native';

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }
        if (!password.trim()) {
            Alert.alert('Error', 'Please enter your password');
            return;
        }

        setLoading(true);
        try {
            await loginUser(email, password);
            // Check if admin credentials
            if (email.toLowerCase() === 'admin@gmail.com') {
                router.push('/screens/AdminProducts');
            } else {
                router.push('/screens/UserProduct');
            }
        } catch (error: any) {
            Alert.alert('Sign In Failed', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = () => {
        router.push('/screens/SignUp');
    };

    const handleForgotPassword = () => {
        router.push('/screens/ForgotPassword');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Pressable style={styles.backButton} onPress={() => router.push('/screens/MainScreen')}>
                        <AntDesign name="arrow-left" size={24} color={Colors.black} />
                    </Pressable>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Welcome Back!</Text>
                    <Text style={styles.subtitle}>
                        Sign in to continue shopping for your dream furniture
                    </Text>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
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
                                />
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <AntDesign name="lock" size={20} color={Colors.gray500} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    placeholderTextColor={Colors.gray400}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <Pressable onPress={() => setShowPassword(!showPassword)}>
                                    <AntDesign
                                        name={showPassword ? 'eye' : 'eye-invisible'}
                                        size={20}
                                        color={Colors.gray500}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.optionsRow}>
                            <Pressable
                                style={styles.rememberMe}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                    {rememberMe && (
                                        <AntDesign name="check" size={14} color={Colors.white} />
                                    )}
                                </View>
                                <Text style={styles.rememberMeText}>Remember me</Text>
                            </Pressable>

                            <Pressable onPress={handleForgotPassword}>
                                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            </Pressable>
                        </View>

                        <Pressable style={styles.signInButton} onPress={handleSignIn} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color={Colors.white} />
                            ) : (
                                <Text style={styles.signInButtonText}>Sign In</Text>
                            )}
                        </Pressable>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <Pressable style={styles.googleButton}>
                            <AntDesign name="google" size={20} color={Colors.black} />
                            <Text style={styles.googleButtonText}>Continue with Google</Text>
                        </Pressable>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Dont have an account? </Text>
                        <Pressable onPress={handleSignUp}>
                            <Text style={styles.signUpLink}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FF',
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    backButton: {
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
    title: {
        fontFamily: 'Robotslab',
        fontSize: 28,
        color: Colors.black,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.gray600,
        marginBottom: 32,
        lineHeight: 22,
    },
    form: {
        gap: 20,
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
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Colors.gray300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    rememberMeText: {
        fontFamily: 'Robotslab',
        fontSize: 14,
        color: Colors.gray600,
    },
    forgotPassword: {
        fontFamily: 'Robotslab',
        fontSize: 14,
        color: Colors.primary,
    },
    signInButton: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    signInButtonText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: Colors.white,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.gray200,
    },
    dividerText: {
        fontFamily: 'Robotslab',
        fontSize: 14,
        color: Colors.gray500,
        marginHorizontal: 16,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gray300,
        borderRadius: 12,
        paddingVertical: 16,
        gap: 12,
    },
    googleButtonText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: Colors.black,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 40,
    },
    footerText: {
        fontSize: 15,
        color: Colors.gray600,
    },
    signUpLink: {
        fontFamily: 'Robotslab',
        fontSize: 15,
        color: Colors.primary,
    },
});
