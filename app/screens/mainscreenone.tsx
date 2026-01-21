import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
// import { useRoute } from '@react-navigation/native';

export default function Mainscreenone() {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.replace('/screens/mainscreentwo')
        }, 3500);       
    });

  return (
    <View>
      <Image style={styles.mainImage} source={require('../../assets/images/Furnix-removebg-preview.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
    mainImage:{
        width: 150,
        height: 50,
    }
})