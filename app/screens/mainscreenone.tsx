import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'

export default function Mainscreenone() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Your{'\n'}Perfect Furniture.</Text>
      <Text style={styles.desc}>From comfort to style, find furniture{'\n'}that feels just right.</Text>
      <View style={styles.circle}/>
      <Image style={styles.img} source={require('../../assets/images/istockphoto-505973586-612x612-removebg-preview.png')}/>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    height:'100%',
    width:'100%',
    backgroundColor:'#FFFFFF'
  },

  circle:{
    height:400,
    width:400,
    borderRadius:'100%',
    position:'absolute',
    right:-150,
    top:240,
    backgroundColor:'#f1f2f4',
  },

  img:{
    transform:[{scale:1.2}],
    marginLeft:100,
    marginTop:380
  },

  title:{
    position:'absolute',
    left:30,
    top:120,
    fontFamily:'Roboto_500Medium',
    fontSize:28,
    color:'#4a5565',
    fontWeight:'700'
  },

  desc:{
    position:'absolute',
    left:30,
    top:200,
    fontFamily:'Roboto_500Medium',
    fontSize:16,
    color:'#718096',
    fontWeight:'500',
    zIndex:1
  },

  button:{
    position:'absolute',
    left:30,
    top:780,
    backgroundColor:'#4a5565',
    paddingVertical:14,
    borderRadius:5,
    width:350,
  },

  buttonText:{
    color:'#FFFFFF',
    fontSize:16.5,
    fontWeight:'600',
    textAlign:'center',
    fontFamily:'Roboto_500Medium',
  }
})