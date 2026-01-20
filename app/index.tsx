import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function index() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'NunitoSans_500Medium', fontSize: 36 }}>Hello, Furnix!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

