import AuthBottomSheet, { AuthBottomSheetRefProps } from '@/components/auth-bottom-sheet';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useRef } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Login() {
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
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <LinearGradient
          colors={['#1F2937', '#374151', '#4B5563']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <MaterialCommunityIcons name="sofa" size={48} color="#FFFFFF" />
              </View>
              <Text style={styles.logoText}>Furnix</Text>
              <Text style={styles.tagline}>Elevate Your Living Space</Text>
            </View>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text style={styles.featureText}>Premium Quality Furniture</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text style={styles.featureText}>Fast & Secure Delivery</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                <Text style={styles.featureText}>Affordable Prices</Text>
              </View>
            </View>

            {/* CTA Button */}
            <TouchableOpacity style={styles.ctaButton} onPress={onPress}>
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text style={styles.ctaButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text style={styles.footer}>
              Trusted by thousands of furniture enthusiasts worldwide
            </Text>
          </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoText: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: '#D1D5DB',
    fontWeight: '400',
  },
  featuresContainer: {
    marginBottom: 50,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#F3F4F6',
    fontWeight: '500',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 14,
    gap: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  ctaButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  footer: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
});