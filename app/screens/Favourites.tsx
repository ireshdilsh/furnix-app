import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'

export default function Favourites() {
    return (
        <View style={{ backgroundColor: '#F8F9FF', flex: 1 }}>
            <ScrollView style={{ flex: 1, paddingHorizontal: 28 }} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 60, gap: 15 }}>
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#374151" />
                    </Pressable>
                    <Text style={{
                        fontFamily: 'Robotslab',
                        fontSize: 21,
                    }}>My Favourites</Text>
                </View>

                {/* Empty State */}
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 100
                }}>
                    <Ionicons name="heart-outline" size={80} color={Colors.gradientPurpleCoral[0]} />
                    <Text style={{
                        fontFamily: 'Robotslab',
                        fontSize: 18,
                        marginTop: 20,
                        color: '#374151'
                    }}>No favourites yet</Text>
                    <Text style={{
                        color: '#6B7280',
                        marginTop: 10,
                        textAlign: 'center',
                        paddingHorizontal: 40
                    }}>Start adding items to your favourites by tapping the heart icon on products you love.</Text>

                    <Pressable
                        onPress={() => router.back()}
                        style={{
                            backgroundColor: Colors.gradientPurpleCoral[0],
                            paddingHorizontal: 30,
                            paddingVertical: 12,
                            borderRadius: 8,
                            marginTop: 30
                        }}
                    >
                        <Text style={{
                            fontFamily: 'Robotslab',
                            color: '#fff',
                            fontSize: 14
                        }}>Browse Products</Text>
                    </Pressable>
                </View>

                <View style={{ height: 30 }} />
            </ScrollView>
        </View>
    )
}
