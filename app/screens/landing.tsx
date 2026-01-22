import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import Header from '@/components/header';

export default function Landing() {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/screens/mainscreenone')
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <Header/>
      <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
  },

  logo:{
    width: 180,
    resizeMode: 'contain',
    marginTop:870
  },

})