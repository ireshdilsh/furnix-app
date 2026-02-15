import { Colors } from '@/constants/theme';
import { getCurrentUser, logoutUser } from '@/service/AuthService';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface ProfileDropdownProps {
    style?: object;
    isAdmin?: boolean;
}

export default function ProfileDropdown({ style, isAdmin = false }: ProfileDropdownProps) {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setUserName(user.displayName || 'User');
            setUserEmail(user.email || '');
        }
    }, []);

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logoutUser();
                            setIsVisible(false);
                            router.replace('/screens/MainScreen');
                        } catch (error: any) {
                            Alert.alert('Error', error);
                        }
                    },
                },
            ]
        );
    };

    const getInitials = (name: string) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return name[0].toUpperCase();
    };

    return (
        <>
            <Pressable
                style={[styles.profileButton, style]}
                onPress={() => setIsVisible(true)}
            >
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{getInitials(userName)}</Text>
                </View>
            </Pressable>

            <Modal
                visible={isVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsVisible(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setIsVisible(false)}
                >
                    <View style={styles.dropdown}>
                        <View style={styles.userInfo}>
                            <View style={styles.avatarLarge}>
                                <Text style={styles.avatarLargeText}>{getInitials(userName)}</Text>
                            </View>
                            <Text style={styles.userName}>{userName}</Text>
                            <Text style={styles.userEmail}>{userEmail}</Text>
                        </View>

                        <View style={styles.divider} />

                        {!isAdmin && (
                            <>
                                <Pressable
                                    style={styles.menuItem}
                                    onPress={() => {
                                        setIsVisible(false);
                                        router.push('/screens/AddNewCard' as any);
                                    }}
                                >
                                    <Ionicons name="card-outline" size={20} color={Colors.primary} />
                                    <Text style={styles.menuItemText}>Add New Card</Text>
                                </Pressable>

                                <View style={styles.divider} />
                            </>
                        )}

                        <Pressable style={styles.menuItem} onPress={handleLogout}>
                            <AntDesign name="logout" size={20} color={Colors.error} />
                            <Text style={styles.logoutText}>Logout</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'Robotslab',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 100,
        paddingRight: 20,
    },
    dropdown: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        width: 260,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        overflow: 'hidden',
    },
    userInfo: {
        alignItems: 'center',
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
    avatarLarge: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarLargeText: {
        color: Colors.white,
        fontSize: 26,
        fontFamily: 'Robotslab',
    },
    userName: {
        fontFamily: 'Robotslab',
        fontSize: 18,
        color: Colors.black,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: Colors.gray500,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.gray200,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 12,
    },
    menuItemText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: Colors.textPrimary,
    },
    logoutText: {
        fontFamily: 'Robotslab',
        fontSize: 16,
        color: Colors.error,
    },
});
