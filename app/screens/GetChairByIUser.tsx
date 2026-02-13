import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '@/components/header'

export default function GetChairByIUser() {
  return (
    <View>
      <Header />
      <View style={styles.container}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 30,
    marginTop: 70,
  }

})