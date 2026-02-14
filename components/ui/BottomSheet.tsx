/**
 * BottomSheet - Reusable bottom sheet component with gesture support
 */

import { BorderRadius, Colors } from '@/constants/theme';
import React, { useCallback, useEffect } from 'react';
import {
    BackHandler,
    Dimensions,
    Pressable,
    StyleSheet,
    View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    snapPoints?: number[];
    initialSnapIndex?: number;
}

export default function BottomSheet({
    isVisible,
    onClose,
    children,
    snapPoints = [0.5],
    initialSnapIndex = 0,
}: BottomSheetProps) {
    const translateY = useSharedValue(SCREEN_HEIGHT);
    const context = useSharedValue({ y: 0 });
    const backdropOpacity = useSharedValue(0);

    const maxTranslateY = -SCREEN_HEIGHT * snapPoints[snapPoints.length - 1];

    const scrollTo = useCallback((destination: number) => {
        'worklet';
        translateY.value = withSpring(destination, {
            damping: 50,
            stiffness: 400,
        });
    }, [translateY]);

    const closeSheet = useCallback(() => {
        translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 });
        backdropOpacity.value = withTiming(0, { duration: 300 });
        setTimeout(onClose, 300);
    }, [translateY, backdropOpacity, onClose]);

    useEffect(() => {
        if (isVisible) {
            const destination = -SCREEN_HEIGHT * snapPoints[initialSnapIndex];
            translateY.value = withSpring(destination, {
                damping: 50,
                stiffness: 400,
            });
            backdropOpacity.value = withTiming(1, { duration: 300 });
        } else {
            translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 });
            backdropOpacity.value = withTiming(0, { duration: 300 });
        }
    }, [isVisible, translateY, backdropOpacity, snapPoints, initialSnapIndex]);

    // Handle back button on Android
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (isVisible) {
                closeSheet();
                return true;
            }
            return false;
        });

        return () => backHandler.remove();
    }, [isVisible, closeSheet]);

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value };
        })
        .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, maxTranslateY);
        })
        .onEnd((event) => {
            // If dragged down more than 100px or velocity is high, close
            if (event.translationY > 100 || event.velocityY > 500) {
                runOnJS(closeSheet)();
            } else {
                // Snap to nearest point
                const currentPosition = -translateY.value / SCREEN_HEIGHT;
                let closestSnapPoint = snapPoints[0];
                let minDistance = Math.abs(currentPosition - snapPoints[0]);

                for (const point of snapPoints) {
                    const distance = Math.abs(currentPosition - point);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestSnapPoint = point;
                    }
                }

                scrollTo(-SCREEN_HEIGHT * closestSnapPoint);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const backdropAnimatedStyle = useAnimatedStyle(() => ({
        opacity: backdropOpacity.value,
    }));

    if (!isVisible) return null;

    return (
        <View style={styles.overlay}>
            <Animated.View style={[styles.backdrop, backdropAnimatedStyle]}>
                <Pressable style={StyleSheet.absoluteFill} onPress={closeSheet} />
            </Animated.View>

            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.container, animatedStyle]}>
                    <View style={styles.handle} />
                    <View style={styles.content}>{children}</View>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        position: 'absolute',
        top: SCREEN_HEIGHT,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT,
        backgroundColor: Colors.surface,
        borderTopLeftRadius: BorderRadius.xl,
        borderTopRightRadius: BorderRadius.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 10,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: Colors.textMuted,
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
});
