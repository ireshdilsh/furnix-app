import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function Maintwoscreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.heroImg} source={require('../../assets/images/hero-img (2).png')}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    heroImg:{
        transform: [{ scale: 2 }],
        marginLeft:100
    }
})