import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import Header from '@/components/header';

export default function Landing() {

  const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.replace('/screens/mainscreenone')
  //   }, 3000);
  // });

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
      <Text style={styles.desc}>Discover furniture designed to make your{'\n'}home feel complete.</Text>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
  },

  logo: {
    width: 150,
    resizeMode: 'contain',
    position: 'absolute',
    top: 350
  },

  desc:{
    position: 'absolute',
    top: 450,
    textAlign: 'center',
    color: '#718096',
    fontWeight: '500',
    fontFamily:'Roboto_500Medium',
  }

})