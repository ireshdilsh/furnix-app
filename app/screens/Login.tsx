import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '@/components/header'
import { useRouter } from 'expo-router'
import { Checkbox } from 'expo-checkbox';

export default function Login() {

    const router = useRouter()

    const gotoBack = () => {
        router.back()
    }

    const [isChecked, setChecked] = useState(false);

    return (
        <View style={{
            flex: 1
        }}>

            <Header />

            <View style={{
                width: '100%',
                paddingHorizontal: 35,
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
            }}>

                <Pressable onPress={gotoBack} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 100
                }}>
                    <Image style={{
                        height: 20,
                        width: 20,
                    }}
                        source={{ uri: "https://img.icons8.com/?size=100&id=26144&format=png&color=#545454" }} />

                    <Text style={{
                        fontWeight: '500',
                        color: '#545454',
                        fontSize: 14
                    }}>
                        Back</Text>
                </Pressable>

                <Text style={{
                    fontSize: 22,
                    fontWeight: '500',
                    color: '#545454',
                    marginTop: 20
                }}>Access Your Furnix Account</Text>

                <Text style={{
                    color: '#545454ba',
                    marginTop: 5
                }}>
                    Login or create an account to start shopping quality furniture.</Text>

                {/* Full Name */}
                <Text style={{
                    color: '#545454',
                    marginTop: 30,
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
                            marginTop: 10,
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
                    flexDirection:'row',
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                    gap:10,
                    width: '100%',
                    height: 48,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    marginTop: 20,
                    borderRadius: 5,
                }}>
                    <Text style={{
                        color: '#545454',
                        fontSize: 15,
                        fontWeight: '600',
                        textAlign: 'center',
                    }}>Continue With Google
                    </Text>
                    <Image style={{
                            height: 22,
                            width: 22,
                        }} source={{ uri: 'https://img.icons8.com/?size=100&id=17949&format=png&color=000000' }} />
                </TouchableOpacity>

            </View>
        </View>
    )
}