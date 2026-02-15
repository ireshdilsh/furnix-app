import { Colors } from '@/constants/theme'
import { addNewChair } from '@/service/ChairService'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

export default function AddProduct() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const validateForm = () => {
        if (!title.trim()) {
            Alert.alert('Validation Error', 'Please enter a product title')
            return false
        }
        if (!description.trim()) {
            Alert.alert('Validation Error', 'Please enter a product description')
            return false
        }
        if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
            Alert.alert('Validation Error', 'Please enter a valid price')
            return false
        }
        if (!image.trim()) {
            Alert.alert('Validation Error', 'Please add a product image URL or select an image')
            return false
        }
        return true
    }

    const handleSubmit = async () => {
        if (!validateForm()) return

        try {
            setLoading(true)
            await addNewChair({
                title: title.trim(),
                description: description.trim(),
                price: Number(price),
                image: image.trim(),
            })
            Alert.alert('Success', 'Product added successfully', [
                {
                    text: 'OK',
                    onPress: () => router.back()
                }
            ])

        } catch (error) {
            console.error(error)
            Alert.alert('Error', 'Failed to add product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </Pressable>
                    <Text style={styles.headerTitle}>Add Product</Text>
                    <View style={{ width: 44 }} />
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Image Preview */}
                    <Pressable style={styles.imageContainer} onPress={pickImage}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.imagePreview} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Ionicons name="image-outline" size={50} color="#ccc" />
                                <Text style={styles.imagePlaceholderText}>Tap to select image</Text>
                            </View>
                        )}
                    </Pressable>

                    {/* Image URL Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Image URL</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter image URL or select above"
                            value={image}
                            onChangeText={setImage}
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Title Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Product Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter product title"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    {/* Description Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Enter product description"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Price Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Price ($)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter price"
                            value={price}
                            onChangeText={setPrice}
                            keyboardType="decimal-pad"
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Submit Button */}
            <View style={styles.bottomContainer}>
                <Pressable
                    style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Ionicons name="add-circle-outline" size={22} color="#fff" />
                            <Text style={styles.submitButtonText}>Add Product</Text>
                        </>
                    )}
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
    },
    backButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 10,
    },
    headerTitle: {
        fontFamily: 'Robotslab',
        fontSize: 20,
        color: '#1F2937',
    },
    form: {
        padding: 24,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 20,
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        borderStyle: 'dashed',
    },
    imagePlaceholderText: {
        marginTop: 10,
        color: '#9CA3AF',
        fontSize: 14,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    textArea: {
        height: 120,
        paddingTop: 14,
    },
    bottomContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: Colors.gradientPurpleCoral[0],
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    submitButtonDisabled: {
        opacity: 0.7,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Robotslab',
    },
})
