import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';

export default function Mainscreenone() {

    const router = useRouter()

    useEffect(() => {
      
      setTimeout(() => {
          router.replace('/screens/maintwoscreen')
      }, 3000);
    }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.mainImage} source={require('../../assets/images/Furnix-removebg-preview.png')} />
      
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
    mainImage:{
        width: 150,
        height: 50,
        marginTop:450
    },

   
})