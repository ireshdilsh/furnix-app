/**
 * ProfileScreen - Modern Gen Z styled profile screen
 * Features: Circular profile image, editable bio, soft card sections
 */

import { BorderRadius, Colors, Layout, Shadows, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
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

// Mock User Data
const USER = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    bio: 'Interior design enthusiast 🏡✨',
    memberSince: 'January 2024',
};

interface MenuItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
    showArrow?: boolean;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    onPress?: () => void;
    danger?: boolean;
    index?: number;
}

function MenuItem({
    icon,
    label,
    value,
    showArrow = true,
    showSwitch = false,
    switchValue = false,
    onSwitchChange,
    onPress,
    danger = false,
    index = 0,
}: MenuItemProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    };

    return (
        <Animated.View entering={FadeInDown.delay(index * 50).duration(300)}>
            <AnimatedPressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[styles.menuItem, animatedStyle]}
                disabled={showSwitch}
            >
                <View
                    style={[
                        styles.menuIconContainer,
                        danger && styles.menuIconContainerDanger,
                    ]}
                >
                    <Ionicons
                        name={icon}
                        size={20}
                        color={danger ? Colors.error : Colors.primary}
                    />
                </View>
                <Text
                    style={[
                        styles.menuLabel,
                        danger && styles.menuLabelDanger,
                    ]}
                >
                    {label}
                </Text>
                {value && <Text style={styles.menuValue}>{value}</Text>}
                {showSwitch && (
                    <Switch
                        value={switchValue}
                        onValueChange={onSwitchChange}
                        trackColor={{
                            false: Colors.gray200,
                            true: Colors.primaryLight,
                        }}
                        thumbColor={switchValue ? Colors.primary : Colors.white}
                    />
                )}
                {showArrow && !showSwitch && (
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={Colors.gray400}
                    />
                )}
            </AnimatedPressable>
        </Animated.View>
    );
}

interface ProfileScreenProps {
    navigation?: any;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundLight} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <Animated.View
                    entering={FadeIn.duration(400)}
                    style={styles.header}
                >
                    <Text style={styles.headerTitle}>Profile</Text>
                    <Pressable style={styles.settingsButton}>
                        <Ionicons
                            name="settings-outline"
                            size={24}
                            color={Colors.textPrimary}
                        />
                    </Pressable>
                </Animated.View>

                {/* Profile Card */}
                <Animated.View
                    entering={FadeInDown.delay(100).duration(400)}
                    style={styles.profileCard}
                >
                    <LinearGradient
                        colors={Colors.gradientPurple}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.avatarBorder}
                    >
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: USER.avatar }}
                                style={styles.avatar}
                                contentFit="cover"
                                transition={300}
                            />
                        </View>
                    </LinearGradient>

                    <Pressable style={styles.editAvatarButton}>
                        <Ionicons name="camera" size={14} color={Colors.white} />
                    </Pressable>

                    <Text style={styles.userName}>{USER.name}</Text>
                    <Text style={styles.userEmail}>{USER.email}</Text>
                    <Text style={styles.userBio}>{USER.bio}</Text>

                    <Pressable style={styles.editProfileButton}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </Pressable>
                </Animated.View>

                {/* Stats Row */}
                <Animated.View
                    entering={FadeInDown.delay(200).duration(400)}
                    style={styles.statsContainer}
                >
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>15</Text>
                        <Text style={styles.statLabel}>Orders</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>8</Text>
                        <Text style={styles.statLabel}>Wishlist</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>3</Text>
                        <Text style={styles.statLabel}>Reviews</Text>
                    </View>
                </Animated.View>

                {/* Menu Sections */}
                <Animated.View
                    entering={FadeInDown.delay(300).duration(400)}
                    style={styles.menuSection}
                >
                    <Text style={styles.sectionTitle}>My Account</Text>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon="bag-outline"
                            label="My Orders"
                            onPress={() => navigation?.navigate('Orders')}
                            index={0}
                        />
                        <MenuItem
                            icon="heart-outline"
                            label="Wishlist"
                            onPress={() => navigation?.navigate('Wishlist')}
                            index={1}
                        />
                        <MenuItem
                            icon="location-outline"
                            label="Saved Addresses"
                            value="3 addresses"
                            onPress={() => { }}
                            index={2}
                        />
                        <MenuItem
                            icon="card-outline"
                            label="Payment Methods"
                            onPress={() => { }}
                            index={3}
                        />
                    </View>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(400).duration(400)}
                    style={styles.menuSection}
                >
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon="notifications-outline"
                            label="Notifications"
                            showSwitch
                            switchValue={notifications}
                            onSwitchChange={setNotifications}
                            showArrow={false}
                            index={0}
                        />
                        <MenuItem
                            icon="moon-outline"
                            label="Dark Mode"
                            showSwitch
                            switchValue={darkMode}
                            onSwitchChange={setDarkMode}
                            showArrow={false}
                            index={1}
                        />
                        <MenuItem
                            icon="language-outline"
                            label="Language"
                            value="English"
                            onPress={() => { }}
                            index={2}
                        />
                    </View>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(500).duration(400)}
                    style={styles.menuSection}
                >
                    <Text style={styles.sectionTitle}>Support</Text>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon="help-circle-outline"
                            label="Help Center"
                            onPress={() => { }}
                            index={0}
                        />
                        <MenuItem
                            icon="chatbubble-outline"
                            label="Contact Us"
                            onPress={() => { }}
                            index={1}
                        />
                        <MenuItem
                            icon="document-text-outline"
                            label="Terms & Privacy"
                            onPress={() => { }}
                            index={2}
                        />
                    </View>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(600).duration(400)}
                    style={styles.menuSection}
                >
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon="log-out-outline"
                            label="Log Out"
                            danger
                            showArrow={false}
                            onPress={() => { }}
                            index={0}
                        />
                    </View>
                </Animated.View>

                {/* App Version */}
                <Animated.View
                    entering={FadeInDown.delay(700).duration(400)}
                    style={styles.versionContainer}
                >
                    <Text style={styles.versionText}>Funix Furniture v1.0.0</Text>
                    <Text style={styles.memberSince}>
                        Member since {USER.memberSince}
                    </Text>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundLight,
    },
    scrollContent: {
        paddingBottom: Layout.tabBarHeight + Spacing.xxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Layout.screenPadding,
        paddingVertical: Spacing.lg,
    },
    headerTitle: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.h2,
        color: Colors.textPrimary,
    },
    settingsButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.small,
    },
    profileCard: {
        alignItems: 'center',
        marginHorizontal: Layout.screenPadding,
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.xxl,
        padding: Spacing.xl,
        ...Shadows.card,
    },
    avatarBorder: {
        width: 110,
        height: 110,
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.white,
        padding: 3,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    editAvatarButton: {
        position: 'absolute',
        top: 90,
        right: '35%',
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    userName: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.xl,
        color: Colors.textPrimary,
        marginTop: Spacing.md,
    },
    userEmail: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
        marginTop: Spacing.xs,
    },
    userBio: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
        marginTop: Spacing.sm,
    },
    editProfileButton: {
        marginTop: Spacing.lg,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.lg,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    editProfileText: {
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.sm,
        color: Colors.primary,
    },
    statsContainer: {
        flexDirection: 'row',
        marginHorizontal: Layout.screenPadding,
        marginTop: Spacing.lg,
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        ...Shadows.small,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontFamily: Typography.fontFamily.bold,
        fontSize: Typography.fontSize.xl,
        color: Colors.primary,
    },
    statLabel: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
        marginTop: Spacing.xxs,
    },
    statDivider: {
        width: 1,
        backgroundColor: Colors.gray200,
    },
    menuSection: {
        marginTop: Spacing.xl,
        paddingHorizontal: Layout.screenPadding,
    },
    sectionTitle: {
        fontFamily: Typography.fontFamily.semiBold,
        fontSize: Typography.fontSize.md,
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
        marginLeft: Spacing.xs,
    },
    menuCard: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        ...Shadows.small,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray100,
    },
    menuIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: Colors.primaryLight + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    menuIconContainerDanger: {
        backgroundColor: Colors.error + '15',
    },
    menuLabel: {
        flex: 1,
        fontFamily: Typography.fontFamily.medium,
        fontSize: Typography.fontSize.md,
        color: Colors.textPrimary,
    },
    menuLabelDanger: {
        color: Colors.error,
    },
    menuValue: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
        marginRight: Spacing.sm,
    },
    versionContainer: {
        alignItems: 'center',
        marginTop: Spacing.xxl,
        paddingBottom: Spacing.xl,
    },
    versionText: {
        fontFamily: Typography.fontFamily.regular,
        fontSize: Typography.fontSize.sm,
        color: Colors.textMuted,
    },
    memberSince: {
        fontFamily: Typography.fontFamily.light,
        fontSize: Typography.fontSize.xs,
        color: Colors.textMuted,
        marginTop: Spacing.xs,
    },
});
