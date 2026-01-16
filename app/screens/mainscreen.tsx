import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';

export default function Mainscreen() {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.replace('/screens/secondscreen');
        }, 3000);
    });

  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../../assets/images/logo.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },

    image:{
        width:200,
        height:65,
    }
})