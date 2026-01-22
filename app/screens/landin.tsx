import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import Header from '@/components/header';

export default function Landing() {

  const router = useRouter();

  useEffect(() => {
    
    return () => {
      
    };
  }, []);

  return (
    <View>
      <Header/>
      <Image source={require('../../assets/images/logo.png')} />
    </View>
  )
}