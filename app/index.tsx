/* eslint-disable react-hooks/rules-of-hooks */
import { View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import Header from '@/components/header';

export default function index() {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            // @ts-ignore
            router.replace("/screens/Authentication");
        }, 5000);
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Header />
            <Image source={require('../assets/images/FURNIX-removebg-preview.png')} style={{ width: 150, height: 200 }} />
        </View>
    )
}
