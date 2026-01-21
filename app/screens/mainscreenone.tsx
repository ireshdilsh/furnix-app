import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
// import { useRoute } from '@react-navigation/native';

export default function Mainscreenone() {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.replace('/screens/mainscreentwo')
        }, 3000);       
    });

  return (
    <View>
      <Image style={styles.mainImage} source={require('../../assets/images/Furnix.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
    mainImage:{
        width: 180,
        height: 80,
    }
})