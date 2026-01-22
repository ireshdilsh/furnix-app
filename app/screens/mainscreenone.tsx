import Header from '@/components/header'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

export default function Mainscreenone() {
  return (
    <View style={styles.container}>
      <Header/>
      <Text style={styles.title}>Find Your{'\n'}Perfect Furniture.</Text>
      <Text style={styles.desc}>From comfort to style, find furniture{'\n'}that feels just right.</Text>
      <View style={styles.circle}/>
       <View style={styles.circle_1}/>
       <View style={styles.circle_2}/>
      <Image style={styles.img} source={require('../../assets/images/istockphoto-505973586-612x612-removebg-preview.png')}/>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
        <Image 
          style={{width: 22, height: 22, tintColor: '#FFFFFF'}}
          source={{uri: 'https://img.icons8.com/?size=100&id=15823&format=png&color=FFFFFF'}}
        />
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

  circle_1:{
    height:150,
    width:150,
    borderRadius:75,
    position:'absolute',
    left:-100,
    top:500,
    borderColor:'#f1f2f4',
    borderWidth:2.5
  },

    circle_2:{
    height:150,
    width:150,
    borderRadius:75,
    position:'absolute',
    right:-50,
    top:-50,
    borderColor:'#f1f2f4',
    borderWidth:2.5
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
    top:205,
    fontFamily:'Roboto_500Medium',
    fontSize:16,
    color:'#718096',
    fontWeight:'600',
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
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap:15
  },

  buttonText:{
    color:'#FFFFFF',
    fontSize:16.5,
    fontWeight:'600',
    textAlign:'center',
    fontFamily:'Roboto_500Medium',
  }
})

