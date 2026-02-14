import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Signin() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Signin</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Josefin-Bold',
  }
})