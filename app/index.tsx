import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Mainscreen from './screens/mainscreen'

export default function index() {
  return (
    <View style={styles.container}>
     <Mainscreen/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})