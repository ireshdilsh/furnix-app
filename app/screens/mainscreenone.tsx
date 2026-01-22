import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function Mainscreenone() {
  return (
    <View>
      <View style={styles.circle_1}/>
      <Text style={styles.title}>Find Your {'\n'}Perfect Furniture</Text>
      <Image style={styles.img} source={require('../../assets/images/istockphoto-505973586-612x612.jpg')}/>
    </View>
  )
}

const styles = StyleSheet.create({

  circle_1:{
    borderRadius:250,
    height:150,
    width:150,
    borderColor:'#E5E7EB',
    borderWidth:1.2,
    position:'absolute',
    left:-50,
    top:50
  },

  img:{
    marginTop:150,
    height:'75%',
    width:330,
    marginLeft:80
  },

  title:{
    position:'absolute',
    left:30,
    top:100,
    fontFamily:'Roboto_500Medium',
    fontSize:30,
    zIndex:1
  }


})