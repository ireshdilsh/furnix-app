/**
 * BottomBar - Reusable bottom navigation bar component
 */

import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Pressable, View } from 'react-native'

interface BottomBarProps {
    activeTab: string
    onTabChange: (tab: string) => void
}

const tabs = [
    { name: 'home', icon: 'home' },
    { name: 'search', icon: 'search' },
    { name: 'cart', icon: 'cart' },
    { name: 'heart', icon: 'heart' },
    { name: 'person', icon: 'person' },
]

export default function BottomBar({ activeTab, onTabChange }: BottomBarProps) {
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: Colors.white,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderTopWidth: 1,
            borderTopColor: Colors.gray200,
        }}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.name
                const iconName = isActive ? tab.icon : `${tab.icon}-outline`

                return (
                    <Pressable
                        key={tab.name}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => onTabChange(tab.name)}
                    >
                        <View style={{
                            padding: 8,
                            borderRadius: 12,
                            backgroundColor: isActive ? `${Colors.primary}15` : 'transparent'
                        }}>
                            <Ionicons
                                name={iconName as any}
                                size={24}
                                color={isActive ? Colors.primary : Colors.gray500}
                            />
                        </View>
                    </Pressable>
                )
            })}
        </View>
    )
}
