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
            <View style={styles.line} />
            
            <View style={styles.content}>
              <Text style={styles.title}>Welcome to Furnix</Text>
              <Text style={styles.subtitle}>
                Sign in to explore and shop quality furniture
              </Text>

              <TouchableOpacity style={styles.googleButton}>
                <Ionicons name="logo-google" size={24} color="#DB4437" />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity style={styles.emailButton}>
                <Ionicons name="mail-outline" size={24} color="#1F2937" />
                <Text style={styles.emailButtonText}>Continue with Email</Text>
              </TouchableOpacity>

              <Text style={styles.terms}>
                By continuing, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: '#D1D5DB',
    marginVertical: 15,
    alignSelf: 'center',
    borderRadius: 2,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 20,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F2937',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 24,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  terms: {
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  termsLink: {
    color: '#1F2937',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default AuthBottomSheet;
