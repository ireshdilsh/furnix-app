/* eslint-disable react-hooks/rules-of-hooks */
import { View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';

export default function index() {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            // @ts-ignore
            router.replace("/screens/Login");
        }, 5000);
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Image source={require('../assets/images/FURNIX-removebg-preview.png')} style={{ width: 150, height: 200 }} />
        </View>
    )
}
