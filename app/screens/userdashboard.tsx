import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Userdashboard() {
  return (
    <View style={styles.container}>
      <Text>userdashboard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:40,
        marginTop:80
    }
})