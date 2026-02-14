/**
 * SignIn Screen - Modern Gen Z styled authentication
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

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const buttonScale = useSharedValue(1);

    const buttonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: buttonScale.value }],
    }));

    const handleSignIn = () => {
        buttonScale.value = withSpring(0.95, { damping: 15 }, () => {
            buttonScale.value = withSpring(1);
        });
        // Navigate to main app
        router.replace('/' as const);
    };

    const handleSignUp = () => {
        router.push('/screens/Signup');
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
                        <Text style={styles.tagline}>Furniture for your vibe ✨</Text>
                    </Animated.View>

                    {/* Welcome Text */}
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(400)}
                        style={styles.headerContainer}
                    >
                        <Text style={styles.title}>Welcome Back!</Text>
                        <Text style={styles.subtitle}>Sign in to continue shopping</Text>
                    </Animated.View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        {/* Email Input */}
                        <Animated.View
                            entering={FadeInDown.delay(300).duration(400)}
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
                            entering={FadeInDown.delay(400).duration(400)}
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

                        {/* Forgot Password */}
                        <Animated.View entering={FadeInDown.delay(500).duration(400)}>
                            <Pressable style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </Pressable>
                        </Animated.View>

                        {/* Sign In Button */}
                        <Animated.View entering={FadeInDown.delay(600).duration(400)}>
                            <AnimatedPressable onPress={handleSignIn} style={buttonStyle}>
                                <LinearGradient
                                    colors={Colors.gradientPurple}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradientButton}
                                >
                                    <Text style={styles.signInButtonText}>Sign In</Text>
                                    <Ionicons name="arrow-forward" size={20} color={Colors.white} />
                                </LinearGradient>
                            </AnimatedPressable>
                        </Animated.View>

                        {/* Divider */}
                        <Animated.View
                            entering={FadeInDown.delay(700).duration(400)}
                            style={styles.dividerContainer}
                        >
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>or continue with</Text>
                            <View style={styles.divider} />
                        </Animated.View>

                        {/* Social Login */}
                        <Animated.View
                            entering={FadeInDown.delay(800).duration(400)}
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

                    {/* Sign Up Link */}
                    <Animated.View
                        entering={FadeInDown.delay(900).duration(400)}
                        style={styles.signUpContainer}
                    >
                        <Text style={styles.signUpText}>Don&apos;t have an account? </Text>
                        <Pressable onPress={handleSignUp}>
                            <Text style={styles.signUpLink}>Sign Up</Text>
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
        paddingTop: Spacing.xxl,
        paddingBottom: Spacing.xl,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    appName: {
        fontFamily: 'Pacifico',
        fontSize: 48,
    },
    tagline: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
        marginTop: Spacing.sm,
    },
    headerContainer: {
        marginBottom: Spacing.xl,
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: Spacing.xl,
    },
    forgotPasswordText: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
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
    signInButtonText: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.lg,
        color: Colors.white,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.xl,
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
        marginBottom: Spacing.xl,
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
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Spacing.lg,
    },
    signUpText: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
    },
    signUpLink: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.md,
        color: Colors.primary,
    },
});