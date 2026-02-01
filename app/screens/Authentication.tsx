import Header from '@/components/header'
import { useRouter } from 'expo-router';
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

export default function Authentication() {

  const router = useRouter();

  const gotoLoginScreen = () => {
    router.push('/screens/Register');
  }

  return (
    <View style={{
      flex: 1,
    }}>

      <Header />

      <View style={{
        width: '100%',
        paddingHorizontal: 35,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={require('../../assets/images/FURNIX-removebg-preview.png')} style={{
          height: 110,
          width: 100,
          marginBottom: 20,
          alignSelf: 'center'
        }} />

        <Text style={{
          color: '#545454',
          textAlign: 'center'
        }}>Furnix makes furniture shopping simple, fast, and convenient online.</Text>

        <Pressable style={{
          backgroundColor: '#545454',
          width: '100%',
          height: 46,
          marginTop: 40,
          borderRadius: 5,
        }}
          onPress={gotoLoginScreen}>

          <Text style={{
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 45,
            fontWeight: '600',
          }}>
            Get Started
          </Text>
        </Pressable>

      </View>

    </View>
  )
}