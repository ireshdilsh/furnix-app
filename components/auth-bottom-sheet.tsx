import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT * 0.6;

type AuthBottomSheetProps = {
  onClose?: () => void;
};

export type AuthBottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const AuthBottomSheet = forwardRef<AuthBottomSheetRefProps, AuthBottomSheetProps>(
  ({ onClose }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const context = useSharedValue({ y: 0 });

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;
      translateY.value = withSpring(destination, { damping: 50 });
    }, [active, translateY]);

    const isActive = useCallback(() => {
      return active.value;
    }, [active]);

    React.useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT * 0.3) {
          scrollTo(0);
          if (onClose) {
            runOnJS(onClose)();
          }
        } else if (translateY.value < -SCREEN_HEIGHT * 0.3) {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    const rBackdropStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active.value ? 1 : 0),
      };
    }, []);

    const handleBackdropPress = () => {
      scrollTo(0);
      if (onClose) {
        onClose();
      }
    };

    return (
      <>
        <Animated.View
          style={[styles.backdrop, rBackdropStyle]}
          pointerEvents={active.value ? 'auto' : 'none'}
        >
          <TouchableOpacity 
            style={styles.backdropTouchable} 
            activeOpacity={1} 
            onPress={handleBackdropPress}
          />
        </Animated.View>
        
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
            <View style={styles.handle}>
              <View style={styles.handleBar} />
            </View>
            
            <View style={styles.content}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.iconWrapper}>
                  <Ionicons name="sparkles" size={32} color="#F59E0B" />
                </View>
                <Text style={styles.title}>Start Your Journey</Text>
                <Text style={styles.subtitle}>
                  Join our community and discover premium furniture for your perfect space
                </Text>
              </View>

              {/* Google Auth Button */}
              <TouchableOpacity style={styles.googleButton} activeOpacity={0.85}>
                <View style={styles.googleIconWrapper}>
                  <Ionicons name="logo-google" size={24} color="#DB4437" />
                </View>
                <Text style={styles.googleButtonText}>Sign in with Google</Text>
                <View style={styles.arrowWrapper}>
                  <Ionicons name="arrow-forward" size={20} color="#475569" />
                </View>
              </TouchableOpacity>

              {/* Features */}
              <View style={styles.features}>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.featureText}>No credit card required</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.featureText}>Free returns & exchanges</Text>
                </View>
                <View style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.featureText}>Exclusive member deals</Text>
                </View>
              </View>

              {/* Privacy Note */}
              <View style={styles.privacyNote}>
                <Ionicons name="shield-checkmark" size={16} color="#64748B" />
                <Text style={styles.privacyText}>
                  Your data is secure and protected
                </Text>
              </View>

              {/* Terms */}
              <Text style={styles.terms}>
                By continuing, you agree to our{' '}
                <Text style={styles.termsLink}>Terms</Text> &{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

AuthBottomSheet.displayName = 'AuthBottomSheet';

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  backdropTouchable: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    zIndex: 2,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  handle: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  googleIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 12,
  },
  arrowWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  features: {
    marginBottom: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 15,
    color: '#475569',
    fontWeight: '500',
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: 20,
  },
  privacyText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  terms: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#0F172A',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default AuthBottomSheet;
