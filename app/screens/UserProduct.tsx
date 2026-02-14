import BottomBar from '@/components/ui/BottomBar'
import { Colors } from '@/constants/theme'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'

export default function UserProduct() {
    const [activeTab, setActiveTab] = useState('home')

    return (
        <View style={{ backgroundColor: '#F8F9FF', flex: 1 }}>
            <View style={{ paddingHorizontal: 28, flex: 1 }}>

                <Text style={{
                    fontFamily: 'Robotslab',
                    fontSize: 21,
                    marginTop: 80
                }}>Discover What’s New</Text>

                <Text style={{
                    color: '#6B7280',
                    marginTop: 10,
                    fontSize: 15
                }}>Browse the latest arrivals and transform your space with timeless modern designs.</Text>

                <TextInput placeholder='search here ...' style={{
                    backgroundColor: '#e5e7eb98',
                    borderRadius: 5,
                    paddingHorizontal: 15,
                    width: '100%',
                    marginTop: 15,
                    height: 48
                }} />

                {/* Discount Card */}
                <LinearGradient
                    colors={Colors.gradientPurpleCoral}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 10,
                        padding: 20,
                        marginTop: 20
                    }}
                >
                    <Text style={{
                        fontFamily: 'Robotslab',
                        fontSize: 18,
                        marginTop: 30,
                        color: '#fff'
                    }}>Exclusive 20% Off</Text>
                    <Text style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        marginTop: 10,
                    }}>Use code FURNIX20 at checkout to enjoy 20% off your entire purchase. Hurry, offer ends soon!</Text>
                </LinearGradient>

            </View>

            <BottomBar activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
    )
}