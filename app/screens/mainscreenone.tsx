import Header from '@/components/header'
import React, { useState } from 'react'
import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'

export default function Mainscreenone() {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Find Your{'\n'}Perfect Furniture.</Text>
      <Text style={styles.desc}>From comfort to style, find furniture{'\n'}that feels just right.</Text>
      <View style={styles.circle} />
      <View style={styles.circle_1} />
      <View style={styles.circle_2} />
      <Image style={styles.img} source={require('../../assets/images/hero.png')} />
      <Pressable
        style={styles.button}
        onPress={() => setIsBottomSheetVisible(true)}
      >
        <Text style={styles.buttonText}>Get Started</Text>
        <Image
          style={{ width: 22, height: 22, tintColor: '#FFFFFF' }}
          source={{ uri: 'https://img.icons8.com/?size=100&id=15823&format=png&color=FFFFFF' }}
        />
      </Pressable>

      {/* Bottom Sheet Modal */}
      <Modal
        visible={isBottomSheetVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsBottomSheetVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsBottomSheetVisible(false)}
        >
        </TouchableOpacity>
        <View
          style={styles.bottomSheet}>
          <View style={styles.bottomSheetHandle} />
          <Text style={styles.bottomSheetTitle}>Welcome to Furnix!</Text>
          <Text style={styles.bottomSheetText}>
            Discover amazing furniture collections and find the perfect pieces for your home.
          </Text>

          {/* register form */}
          <TextInput placeholder='Name' />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF'
  },

  circle: {
    height: 400,
    width: 400,
    borderRadius: 360,
    position: 'absolute',
    right: -150,
    top: 240,
    backgroundColor: '#f1f2f4',
  },

  circle_2: {
    height: 400,
    width: 400,
    borderRadius: 360,
    position: 'absolute',
    right: -110,
    top: 270,
    borderColor: '#dfe2e7',
    borderWidth: 1
  },

  circle_1: {
    height: 150,
    width: 150,
    borderRadius: 75,
    position: 'absolute',
    right: -50,
    top: -50,
    borderColor: '#dfe2e7',
    borderWidth: 1
  },

  img: {
    transform: [{ scale: 1.2 }],
    marginLeft: 100,
    marginTop: 380
  },

  title: {
    position: 'absolute',
    left: 30,
    top: 120,
    fontFamily: 'Roboto_500Medium',
    fontSize: 28,
    color: '#4a5565',
    fontWeight: '700'
  },

  desc: {
    position: 'absolute',
    left: 30,
    top: 205,
    fontFamily: 'Roboto_500Medium',
    fontSize: 15,
    color: '#718096',
    fontWeight: '600',
    zIndex: 1
  },

  // bottomsheet styles

  button: {
    position: 'absolute',
    left: 30,
    top: 780,
    backgroundColor: '#4a5565',
    paddingVertical: 14,
    borderRadius: 5,
    width: 350,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Roboto_500Medium',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 25,
    paddingBottom: 40,
    minHeight: 300,
  },

  bottomSheetHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },

  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4a5565',
    fontFamily: 'Roboto_500Medium',
    marginBottom: 15,
  },

  bottomSheetText: {
    fontSize: 16,
    color: '#718096',
    fontFamily: 'Roboto_500Medium',
    lineHeight: 24,
    marginBottom: 30,
  },

  bottomSheetButton: {
    backgroundColor: '#4a5565',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  bottomSheetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Roboto_500Medium',
  }
})

