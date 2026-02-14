/**
 * SignUp Screen - Modern Gen Z styled registration
 */

import { BorderRadius, Colors, Layout, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Signup() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmFocused, setConfirmFocused] = useState(false);

    const buttonScale = useSharedValue(1);
    const checkboxScale = useSharedValue(1);

    const buttonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: buttonScale.value }],
    }));

    const checkboxAnimStyle = useAnimatedStyle(() => ({
        transform: [{ scale: checkboxScale.value }],
    }));

    const handleSignUp = () => {
        buttonScale.value = withSpring(0.95, { damping: 15 }, () => {
            buttonScale.value = withSpring(1);
        });
        // Navigate to main app
        router.replace('/' as const);
    };

    const handleSignIn = () => {
        router.back();
    };

    const toggleTerms = () => {
        checkboxScale.value = withSpring(0.8, { damping: 10 }, () => {
            checkboxScale.value = withSpring(1);
        });
        setAgreeTerms(!agreeTerms);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Logo/App Name */}
                    <Animated.View
                        entering={FadeIn.duration(600)}
                        style={styles.logoContainer}
                    >
                        <MaskedView
                            maskElement={<Text style={styles.appName}>Funix</Text>}
                        >
                            <LinearGradient
                                colors={Colors.gradientPurple}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={[styles.appName, { opacity: 0 }]}>Funix</Text>
                            </LinearGradient>
                        </MaskedView>
                        <Text style={styles.tagline}>Join the furniture fam 🏠</Text>
                    </Animated.View>

                    {/* Welcome Text */}
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(400)}
                        style={styles.headerContainer}
                    >
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Sign up to get started</Text>
                    </Animated.View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        {/* Full Name Input */}
                        <Animated.View
                            entering={FadeInDown.delay(300).duration(400)}
                            style={[
                                styles.inputContainer,
                                nameFocused && styles.inputFocused,
                            ]}
                        >
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color={nameFocused ? Colors.primary : Colors.textMuted}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Full name"
                                placeholderTextColor={Colors.textMuted}
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                                onFocus={() => setNameFocused(true)}
                                onBlur={() => setNameFocused(false)}
                            />
                        </Animated.View>

                        {/* Email Input */}
                        <Animated.View
                            entering={FadeInDown.delay(400).duration(400)}
                            style={[
                                styles.inputContainer,
                                emailFocused && styles.inputFocused,
                            ]}
                        >
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color={emailFocused ? Colors.primary : Colors.textMuted}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email address"
                                placeholderTextColor={Colors.textMuted}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                            />
                        </Animated.View>

                        {/* Password Input */}
                        <Animated.View
                            entering={FadeInDown.delay(500).duration(400)}
                            style={[
                                styles.inputContainer,
                                passwordFocused && styles.inputFocused,
                            ]}
                        >
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={passwordFocused ? Colors.primary : Colors.textMuted}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor={Colors.textMuted}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                            />
                            <Pressable onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color={Colors.textMuted}
                                />
                            </Pressable>
                        </Animated.View>

                        {/* Confirm Password Input */}
                        <Animated.View
                            entering={FadeInDown.delay(600).duration(400)}
                            style={[
                                styles.inputContainer,
                                confirmFocused && styles.inputFocused,
                            ]}
                        >
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={20}
                                color={confirmFocused ? Colors.primary : Colors.textMuted}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm password"
                                placeholderTextColor={Colors.textMuted}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showConfirmPassword}
                                onFocus={() => setConfirmFocused(true)}
                                onBlur={() => setConfirmFocused(false)}
                            />
                            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons
                                    name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color={Colors.textMuted}
                                />
                            </Pressable>
                        </Animated.View>

                        {/* Terms Checkbox */}
                        <Animated.View entering={FadeInDown.delay(700).duration(400)}>
                            <Pressable style={styles.termsContainer} onPress={toggleTerms}>
                                <Animated.View
                                    style={[
                                        styles.checkbox,
                                        agreeTerms && styles.checkboxChecked,
                                        checkboxAnimStyle,
                                    ]}
                                >
                                    {agreeTerms && (
                                        <Ionicons name="checkmark" size={14} color={Colors.white} />
                                    )}
                                </Animated.View>
                                <Text style={styles.termsText}>
                                    I agree to the{' '}
                                    <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                                    <Text style={styles.termsLink}>Privacy Policy</Text>
                                </Text>
                            </Pressable>
                        </Animated.View>

                        {/* Sign Up Button */}
                        <Animated.View entering={FadeInDown.delay(800).duration(400)}>
                            <AnimatedPressable onPress={handleSignUp} style={buttonStyle}>
                                <LinearGradient
                                    colors={Colors.gradientPurple}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradientButton}
                                >
                                    <Text style={styles.signUpButtonText}>Create Account</Text>
                                    <Ionicons name="rocket-outline" size={20} color={Colors.white} />
                                </LinearGradient>
                            </AnimatedPressable>
                        </Animated.View>

                        {/* Divider */}
                        <Animated.View
                            entering={FadeInDown.delay(900).duration(400)}
                            style={styles.dividerContainer}
                        >
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>or sign up with</Text>
                            <View style={styles.divider} />
                        </Animated.View>

                        {/* Social Login */}
                        <Animated.View
                            entering={FadeInDown.delay(1000).duration(400)}
                            style={styles.socialContainer}
                        >
                            <Pressable style={styles.socialButton}>
                                <Ionicons name="logo-google" size={24} color="#DB4437" />
                            </Pressable>
                            <Pressable style={styles.socialButton}>
                                <Ionicons name="logo-apple" size={24} color={Colors.textPrimary} />
                            </Pressable>
                            <Pressable style={styles.socialButton}>
                                <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                            </Pressable>
                        </Animated.View>
                    </View>

                    {/* Sign In Link */}
                    <Animated.View
                        entering={FadeInDown.delay(1100).duration(400)}
                        style={styles.signInContainer}
                    >
                        <Text style={styles.signInText}>Already have an account? </Text>
                        <Pressable onPress={handleSignIn}>
                            <Text style={styles.signInLink}>Sign In</Text>
                        </Pressable>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: Layout.screenPadding,
        paddingTop: Spacing.xl,
        paddingBottom: Spacing.xl,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    appName: {
        fontFamily: 'Pacifico',
        fontSize: 42,
    },
    tagline: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
        marginTop: Spacing.sm,
    },
    headerContainer: {
        marginBottom: Spacing.lg,
    },
    title: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.h1,
        color: Colors.textPrimary,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
    },
    formContainer: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gray200,
        borderRadius: BorderRadius.input,
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.md,
        height: Layout.inputHeight,
        ...Shadows.small,
    },
    inputFocused: {
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    inputIcon: {
        marginRight: Spacing.md,
    },
    input: {
        flex: 1,
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.md,
        color: Colors.textPrimary,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.lg,
        paddingRight: Spacing.md,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: Colors.gray300,
        marginRight: Spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    termsText: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textSecondary,
        flex: 1,
        lineHeight: 20,
    },
    termsLink: {
        fontFamily: Typography.fontFamily.semiBold,
        color: Colors.primary,
    },
    gradientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: Layout.buttonHeightLarge,
        borderRadius: BorderRadius.button,
        gap: Spacing.sm,
        ...Shadows.glow,
    },
    signUpButtonText: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.lg,
        color: Colors.white,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.lg,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.gray200,
    },
    dividerText: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
        marginHorizontal: Spacing.md,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    socialButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gray200,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.small,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Spacing.md,
    },
    signInText: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
    },
    signInLink: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.md,
        color: Colors.primary,
    },
});