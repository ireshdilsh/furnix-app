import Header from '@/components/header';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddChair() {

    const router = useRouter();

    const gotoDashboard = () => {
        router.replace('/screens/Admin')
    }

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setprice] = useState<Number>(0);
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library.
        // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
        // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
        // so the app users aren't surprised by a system dialog after picking a video.
        // See "Invoke permissions for videos" sub section for more details.
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <Header />
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <Pressable onPress={gotoDashboard}>
                        <Ionicons name="arrow-back-circle" size={25} color="#4a5565" />
                    </Pressable>
                    <Text style={styles.title}>Add New Chair to Inventory</Text>
                    <Text style={styles.description}>Easily add new chair products
                        to your inventory with this simple form.</Text>

                    <View style={styles.form}>
                        <Text>Chair Name</Text>
                        <TextInput style={styles.input} onChangeText={setTitle} value={title} placeholder="Enter chair name" />

                        <Text style={{ marginTop: 15 }}>Chair Description</Text>
                        <TextInput
                            style={styles.textArea}
                            onChangeText={setDescription}
                            value={description}
                            placeholder="Enter chair description..."
                            multiline={true}
                            numberOfLines={50}
                            textAlignVertical="top" // Android fix
                        />

                        <Text style={{ marginTop: 15 }}>Chair Price</Text>
                        <TextInput style={styles.input} onChangeText={text => setprice(Number(text))} value={price.toString()} placeholder="Enter chair price" keyboardType="numeric" />

                        <Text style={{ marginTop: 15 }}>Chair Image</Text>
                        <Pressable onPress={pickImage} style={styles.imagePicker}>
                            <Text style={styles.imagePickerText}>Pick an image</Text>
                        </Pressable>
                        {image && <Image source={{ uri: image }} style={styles.image} />}

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Add New Chair</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#4a5565',
        width: '100%',
        height: 48,
        marginTop: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Josefin-Bold',
        textAlign: 'center',
        lineHeight: 48
    },

    imagePicker: {
        width: '100%',
        height: 150,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#4a5565',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },

    imagePickerText: {
        color: '#4a5565',
        fontSize: 16,
        fontFamily: 'Josefin-Bold'
    },

    image: {
        width: '100%',
        height: 200,
        borderRadius: 25,
        marginTop: 8
    },

    form: {
        marginTop: 40
    },

    textArea: {
        width: '100%',
        backgroundColor: '#F9FAFB',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginTop: 8,
        height: 150,
    },

    input: {
        width: '100%',
        height: 48,
        backgroundColor: '#F9FAFB',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginTop: 8
    },

    title: {
        fontSize: 22,
        fontFamily: 'Josefin-Bold',
        color: '#4a5565',
        marginTop: 10
    },

    description: {
        marginTop: 5,
        color: '#718096',
        fontSize: 15,
    },

    container: {
        paddingHorizontal: 30,
        marginTop: 70,
    },

    scrollView: {
        flex: 1,
    },

    scrollContent: {
        paddingBottom: 240,
    },
})