import { Colors } from '@/constants/theme';
import { updateUserPassword } from '@/service/AuthService';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

export default function CreateNewPassword() {
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCreatePassword = async () => {
        if (!currentPassword.trim()) {
            Alert.alert('Error', 'Please enter your current password');
            return;
        }
        if (!newPassword.trim()) {
            Alert.alert('Error', 'Please enter a new password');
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await updateUserPassword(email || '', currentPassword, newPassword);
            Alert.alert(
                'Success',
                'Your password has been updated successfully!',
                [
                    {
                        text: 'Sign In',
                        onPress: () => router.push('/screens/SignIn'),
                    },
                ]
            );
        } catch (error: any) {
            Alert.alert('Error', error);
        } finally {
            setLoading(false);
        }
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
                    <Pressable style={styles.backButton} onPress={() => router.back()}>
                        <AntDesign name="arrow-left" size={24} color={Colors.black} />
                    </Pressable>
                </View>

                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <AntDesign name="key" size={60} color={Colors.primary} />
                    </View>

                    <Text style={styles.title}>Change Password</Text>
                    <Text style={styles.subtitle}>
                        Enter your current password and create a new one.
                    </Text>

                    <View style={styles.emailBadge}>
                        <AntDesign name="mail" size={16} color={Colors.primary} />
                        <Text style={styles.emailText}>{email}</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Current Password</Text>
                            <View style={styles.inputWrapper}>
                                <AntDesign name="lock" size={20} color={Colors.gray500} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter current password"
                                    placeholderTextColor={Colors.gray400}
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                    secureTextEntry={!showCurrentPassword}
                                />
                                <Pressable onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                                    <AntDesign
                                        name={showCurrentPassword ? 'eye' : 'eye-invisible'}
                                        size={20}
                                        color={Colors.gray500}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>New Password</Text>
                            <View style={styles.inputWrapper}>
                                <AntDesign name="lock" size={20} color={Colors.gray500} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter new password"
                                    placeholderTextColor={Colors.gray400}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    secureTextEntry={!showNewPassword}
                                />
                                <Pressable onPress={() => setShowNewPassword(!showNewPassword)}>
                                    <AntDesign
                                        name={showNewPassword ? 'eye' : 'eye-invisible'}
                                        size={20}
                                        color={Colors.gray500}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <View style={styles.inputWrapper}>
                                <AntDesign name="lock" size={20} color={Colors.gray500} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm new password"
                                    placeholderTextColor={Colors.gray400}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <AntDesign
                                        name={showConfirmPassword ? 'eye' : 'eye-invisible'}
                                        size={20}
                                        color={Colors.gray500}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.requirements}>
                            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
                            <View style={styles.requirementItem}>
                                <AntDesign
                                    name={newPassword.length >= 6 ? 'check-circle' : 'close-circle'}
                                    size={16}
                                    color={newPassword.length >= 6 ? Colors.success : Colors.gray400}
                                />
                                <Text style={[
                                    styles.requirementText,
                                    newPassword.length >= 6 && styles.requirementMet
                                ]}>
                                    At least 6 characters
                                </Text>
                            </View>
                            <View style={styles.requirementItem}>
                                <AntDesign
                                    name={newPassword === confirmPassword && confirmPassword.length > 0 ? 'check-circle' : 'close-circle'}
                                    size={16}
                                    color={newPassword === confirmPassword && confirmPassword.length > 0 ? Colors.success : Colors.gray400}
                                />
                                <Text style={[
                                    styles.requirementText,
                                    newPassword === confirmPassword && confirmPassword.length > 0 && styles.requirementMet
                                ]}>
                                    Passwords match
                                </Text>
                            </View>
                        </View>

                        <Pressable
                            style={[styles.createButton, loading && styles.createButtonDisabled]}
                            onPress={handleCreatePassword}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={Colors.white} />
                            ) : (
                                <Text style={styles.createButtonText}>Update Password</Text>
                            )}
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
        marginBottom: 20,
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    emailBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 24,
        gap: 8,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    emailText: {
        fontSize: 14,
        color: Colors.gray700,
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
    requirements: {
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: 12,
        gap: 10,
    },
    requirementsTitle: {
        fontFamily: 'Robotslab',
        fontSize: 14,
        color: Colors.gray700,
        marginBottom: 4,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    requirementText: {
        fontSize: 14,
        color: Colors.gray500,
    },
    requirementMet: {
        color: Colors.success,
    },
    createButton: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    createButtonDisabled: {
        opacity: 0.7,
    },
    createButtonText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: Colors.white,
    },
});
