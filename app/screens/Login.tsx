import Header from '@/components/header';
import { Checkbox } from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {

    const router = useRouter()

    const gotoBack = () => {
        router.back()
    }

    const [isChecked, setChecked] = useState(false);

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
                }}>Access Your Furnix Account</Text>

                <Text style={{
                    color: '#545454ba',
                    marginTop: 5
                }}>
                    Login or create an account to start shopping quality furniture.</Text>

                {/* Full Name */}
                <Text style={{
                    color: '#545454',
                    marginTop: 50,
                    fontSize: 15,
                }}>
                    Full Name
                </Text>
                <TextInput placeholder='Enter full name' style={{
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    width: '100%',
                    height: 48,
                    marginTop: 7,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    backgroundColor: '#F9FAFB'
                }} />

                {/* Email address */}
                <Text style={{
                    color: '#545454',
                    marginTop: 20,
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

                {/* Create Password */}
                <Text style={{
                    color: '#545454',
                    marginTop: 20,
                    fontSize: 15,
                }}>
                    Create Password
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

                {/* Re-Enter Password */}
                <Text style={{
                    color: '#545454',
                    marginTop: 20,
                    fontSize: 15,
                }}>
                    Re-enter Password
                </Text>
                <TextInput secureTextEntry={true} placeholder='Re-enter password' style={{
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    width: '100%',
                    height: 48,
                    marginTop: 7,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    backgroundColor: '#F9FAFB'
                }} />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 25,
                    marginTop: 12
                }}>
                    <Checkbox
                        style={{
                            marginVertical: 20,
                        }}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#545454' : undefined}
                    />
                    <Text style={{
                        color: '#545454',
                        fontSize: 15
                    }}>I have read and agree to the Terms and Conditions.</Text>
                </View>

                <TouchableOpacity style={{
                    width: '100%',
                    height: 48,
                    backgroundColor: '#545454',
                    marginTop: 20,
                    borderRadius: 5
                }}>
                    <Text style={{
                        color: '#FFFFFF',
                        textAlign: 'center',
                        lineHeight: 48,
                        fontSize: 15,
                        fontWeight: '500'
                    }}>Create Account</Text>
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
                    }}>Already have an account?</Text>
                    <Text style={{
                        color: '#545454',
                        fontWeight: '500',
                        textDecorationLine: 'underline'
                    }}>Login</Text>
                </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}