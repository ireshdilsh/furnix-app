import AuthBottomSheet, { AuthBottomSheetRefProps } from '@/components/auth-bottom-sheet';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useRef } from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Register() {
  const ref = useRef<AuthBottomSheetRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-SCREEN_HEIGHT * 0.6);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <LinearGradient
          colors={['#0F172A', '#1E293B', '#334155']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Background Pattern */}
            <View style={styles.backgroundPattern}>
              <View style={[styles.circle, styles.circle1]} />
              <View style={[styles.circle, styles.circle2]} />
            </View>

            {/* Header */}
            <Animated.View 
              entering={FadeInDown.delay(200).duration(1000)}
              style={styles.header}
            >
              <View style={styles.logoContainer}>
                <View style={styles.logoWrapper}>
                  <LinearGradient
                    colors={['#F59E0B', '#EF4444']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.logoGradient}
                  >
                    <MaterialCommunityIcons name="sofa-outline" size={40} color="#FFFFFF" />
                  </LinearGradient>
                </View>
              </View>
              <Text style={styles.brandName}>Furnix</Text>
              <Text style={styles.subtitle}>Transform Your Space</Text>
            </Animated.View>

            {/* Hero Section */}
            <Animated.View 
              entering={FadeInUp.delay(400).duration(1000)}
              style={styles.heroSection}
            >
              <Text style={styles.heroTitle}>Welcome to{'\n'}<Text style={styles.heroTitleBold}>Premium Furniture</Text></Text>
              <Text style={styles.heroDescription}>
                Discover curated collections of modern, elegant furniture designed to elevate your living experience
              </Text>
            </Animated.View>

            {/* Features Grid */}
            <Animated.View 
              entering={FadeInUp.delay(600).duration(1000)}
              style={styles.featuresGrid}
            >
              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="shield-checkmark" size={28} color="#10B981" />
                </View>
                <Text style={styles.featureTitle}>Quality</Text>
                <Text style={styles.featureDesc}>Premium materials</Text>
              </View>
              
              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="flash" size={28} color="#F59E0B" />
                </View>
                <Text style={styles.featureTitle}>Fast</Text>
                <Text style={styles.featureDesc}>Quick delivery</Text>
              </View>
              
              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <FontAwesome5 name="award" size={24} color="#EF4444" />
                </View>
                <Text style={styles.featureTitle}>Warranty</Text>
                <Text style={styles.featureDesc}>5-year guarantee</Text>
              </View>
              
              <View style={styles.featureCard}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="pricetag" size={28} color="#3B82F6" />
                </View>
                <Text style={styles.featureTitle}>Affordable</Text>
                <Text style={styles.featureDesc}>Best prices</Text>
              </View>
            </Animated.View>

            {/* CTA Section */}
            <Animated.View 
              entering={FadeInUp.delay(800).duration(1000)}
              style={styles.ctaSection}
            >
              <Text style={styles.ctaText}>Get Started</Text>
              <TouchableOpacity 
                style={styles.googleButton}
                onPress={onPress}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#FFFFFF', '#F3F4F6']}
                  style={styles.buttonGradient}
                >
                  <Ionicons name="logo-google" size={24} color="#DB4437" />
                  <Text style={styles.googleButtonText}>Continue with Google</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Quick & Secure</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.trustBadges}>
                <View style={styles.badge}>
                  <Ionicons name="lock-closed" size={16} color="#64748B" />
                  <Text style={styles.badgeText}>Secure</Text>
                </View>
                <View style={styles.badge}>
                  <Ionicons name="time" size={16} color="#64748B" />
                  <Text style={styles.badgeText}>2-Min Setup</Text>
                </View>
                <View style={styles.badge}>
                  <Ionicons name="people" size={16} color="#64748B" />
                  <Text style={styles.badgeText}>50K+ Users</Text>
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </LinearGradient>

        <AuthBottomSheet ref={ref} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: StatusBar.currentHeight || 50,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.05,
  },
  circle1: {
    width: 400,
    height: 400,
    backgroundColor: '#F59E0B',
    top: -200,
    right: -100,
  },
  circle2: {
    width: 300,
    height: 300,
    backgroundColor: '#3B82F6',
    bottom: -150,
    left: -100,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  logoGradient: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  heroSection: {
    marginBottom: 36,
  },
  heroTitle: {
    fontSize: 32,
    color: '#E2E8F0',
    fontWeight: '400',
    marginBottom: 16,
    lineHeight: 40,
  },
  heroTitleBold: {
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroDescription: {
    fontSize: 16,
    color: '#94A3B8',
    lineHeight: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
    gap: 12,
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIconContainer: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#94A3B8',
  },
  ctaSection: {
    marginTop: 10,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  googleButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  googleButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  trustBadges: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
