import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native'
import React from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons';

export default function Dashboard() {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.title}>Everything You Need{'\n'}in One Place</Text>
                <Text style={styles.description}>
                    Manage your account and control
                    settings from one dashboard.
                </Text>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.searchInput} placeholder="Search..." />
                    <Pressable style={styles.searchBtn}>
                        <EvilIcons name="search" size={24} color="white" />
                    </Pressable>
                </View>

                {/* Discount Coupen */}
                <View style={styles.coupenContainer}>
                    <Text style={styles.couponTitle}>WELCOME DEAL</Text>
                    <Text style={styles.couponDescription}>Enjoy instant savings on your next purchase
                        and make the most of this special offer before it expires soon.</Text>
                    <Pressable style={styles.couponBtn}>
                        <Text style={styles.couponBtnText}>10% Off Discount</Text>
                    </Pressable>
                    <Image style={styles.couponImg} source={require('../../assets/images/bg-img.png')} />
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    couponImg: {
        height: 65,
        width: 65,
        position: 'absolute',
        right: 25,
        top: 90
    },

    couponBtn: {
        backgroundColor: '#4a5565',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 25,
        alignSelf: 'flex-start',
        marginTop: 15
    },

    couponBtnText: {
        color: '#fff',
        fontFamily: 'Josefin',
    },

    couponTitle: {
        fontFamily: 'Josefin-Bold',
        fontSize: 15.5,
        color: '#4a5565',
    },

    couponDescription: {
        color: '#718096',
        marginTop: 5
    },

    coupenContainer: {
        marginTop: 25,
        padding: 15,
        backgroundColor: '#F9FAFB',
        borderRadius: 10,
        position: 'relative',
        boxShadow: 'rgba(141, 146, 151, 0.2) 0px 8px 24px',
    },

    container: {
        paddingHorizontal: 30
    },

    subContainer: {
        marginTop: 60
    },

    title: {
        fontFamily: 'Josefin-Bold',
        fontSize: 20,
        color: '#4a5565',
    },

    description: {
        color: '#718096',
        marginTop: 10
    },

    searchInput: {
        backgroundColor: '#F9FAFB',
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 25,
        width: 300,
    },

    searchContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },

    searchBtn: {
        backgroundColor: '#4a5565',
        height: 50,
        width: 50,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})