import Header from '@/components/header';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {

    // const router = useRouter()

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={{
                flex: 1
            }}>

                <Header />

                <ScrollView
                    style={{
                        flex: 1,
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: 35,
                        paddingBottom: 30
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >

                    <Text style={{
                        fontSize: 22,
                        fontWeight: '500',
                        color: '#545454',
                        marginTop: 100
                    }}>Welcome Back to Furnix</Text>

                    <Text style={{
                        color: '#545454ba',
                        marginTop: 5
                    }}>
                        Login to your account to continue shopping quality furniture.</Text>

                    {/* Email address */}
                    <Text style={{
                        color: '#545454',
                        marginTop: 50,
                        fontSize: 15,
                    }}>
                        Email Address
                    </Text>
                    <TextInput placeholder='Enter email address' style={{
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        width: '100%',
                        height: 48,
                        marginTop: 7,
                        paddingHorizontal: 15,
                        borderRadius: 5,
                        backgroundColor: '#F9FAFB'
                    }} />

                    {/* Password */}
                    <Text style={{
                        color: '#545454',
                        marginTop: 20,
                        fontSize: 15,
                    }}>
                        Password
                    </Text>
                    <TextInput secureTextEntry={true} placeholder='Enter password' style={{
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        width: '100%',
                        height: 48,
                        marginTop: 7,
                        paddingHorizontal: 15,
                        borderRadius: 5,
                        backgroundColor: '#F9FAFB'
                    }} />

                    <TouchableOpacity style={{
                        marginTop: 12,
                        alignSelf: 'flex-end'
                    }}>
                        <Text style={{
                            color: '#545454',
                            fontSize: 14,
                            textDecorationLine: 'underline'
                        }}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width: '100%',
                        height: 48,
                        backgroundColor: '#545454',
                        marginTop: 30,
                        borderRadius: 5
                    }}>
                        <Text style={{
                            color: '#FFFFFF',
                            textAlign: 'center',
                            lineHeight: 48,
                            fontSize: 15,
                            fontWeight: '500'
                        }}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                        width: '100%',
                        height: 48,
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        marginTop: 10,
                        borderRadius: 5,
                    }}>
                        <Text style={{
                            color: '#545454',
                            fontSize: 15,
                            fontWeight: '600',
                            textAlign: 'center',
                        }}>Continue With Google</Text>

                        <Image style={{
                            height: 22,
                            width: 22,
                        }} source={{ uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000' }} />
                    </TouchableOpacity>
                    <View style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        marginTop: 28
                    }}>
                        <Text style={{
                            color: '#545454',
                            fontWeight: '400'
                        }}>Dont have an account?</Text>
                        <Text style={{
                            color: '#545454',
                            fontWeight: '500',
                            textDecorationLine: 'underline'
                        }}>Register</Text>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}