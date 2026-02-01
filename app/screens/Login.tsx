import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'

export default function Login() {
  return (
    <View style={{
      paddingHorizontal: 35,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <View style={{ width: '100%' }}>
        <Image source={require('../../assets/images/FURNIX-removebg-preview.png')} style={{
          height: 100,
          width: 90,
          marginBottom: 20,
          alignSelf: 'center'
        }} />

        <Text style={{
          color: '#545454',
          textAlign: 'center'
        }}>Buy modern furniture online easily with{'\n'}the Furnix mobile app.</Text>

        <Pressable style={{
          backgroundColor: '#545454',
          width: '100%',
          height: 50,
          marginTop: 50,
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
          <Text style={{
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 45,
            fontWeight: '600',
          }}>
            Get Started
          </Text>
          <Image source={{ uri: "https://img.icons8.com/?size=100&id=26138&format=png&color=ffffff" }} style={{
            width: 20,
            height: 20,
          }}
          />
        </Pressable>

      </View>

    </View>
  )
}