import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'

export default function index() {
  return (
    <View style={styles.container}>
      <Text style={{
        fontFamily:Platform.OS === 'android' ? 'NunitoSans_500Medium_Italic' : 'NunitoSans_500Medium_Italic',
        fontSize:36,
      }}>Everyone</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

})

