import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Singinbottomsheet() {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  overlay: {
    width: '100%',
    height: '50%',
    backgroundColor: '#fff',
  }
})