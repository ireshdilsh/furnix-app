import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function Mainscreen() {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../../assets/images/logo.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    image:{
        width:200,
        height:65,
    }
})