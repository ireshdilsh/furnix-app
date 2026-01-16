import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Landingscreen from './screens/landingscreen'

export default function index() {
  return (
    <View style={styles.container}>
      <Landingscreen/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})