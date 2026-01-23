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
      <Header />
      <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
      <Text style={styles.desc}>Discover furniture designed to make your{'\n'}home feel complete.</Text>
      <View style={styles.footer}>
        <Text style={styles.poweredBy}>Powered by</Text>
        <Text style={styles.android}>Android</Text>
        <Image style={styles.androidIcon} source={{ uri: 'https://img.icons8.com/?size=100&id=P2AnGyiJxMpp&format=png&color=000000' }} />
      </View>
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
  },

  footer:{
    position: 'absolute',
    top: 700,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  android:{
    fontWeight: '700',
    fontFamily:'Roboto_700Bold',
    fontSize:20,
    color:'#4a5565'
  },

  poweredBy:{
    fontSize:13,
    fontFamily:'Roboto_400Regular',
    color:'#718096',
  },

  androidIcon:{
    width: 60, 
    height: 60,
    marginTop:-5
  }

})