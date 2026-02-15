import { Colors } from '@/constants/theme'
import { Chair } from '@/interfaces/Chair'
import { deleteChair, getChairByID } from '@/service/ChairService'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function AdminProductDetail() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const [product, setProduct] = useState<Chair | null>(null)
    const [loading, setLoading] = useState(true)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        if (id) {
            getProductById()
        }
    }, [id])

    const getProductById = async () => {
        try {
            const resp = await getChairByID(id!)
            setProduct(resp)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            setDeleting(true)
            await deleteChair(id!)
            setDeleteModalVisible(false)
            Alert.alert('Success', 'Product deleted successfully', [
                { text: 'OK', onPress: () => router.back() }
            ])
        } catch (error) {
            console.error(error)
            Alert.alert('Error', 'Failed to delete product')
        } finally {
            setDeleting(false)
        }
    }

    const gotoUpdate = () => {
        router.push({
            pathname: '/screens/UpdateProduct',
            params: { id }
        })
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.gradientPurpleCoral[0]} />
            </View>
        )
    }

    if (!product) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Product not found</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Back Button */}
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </Pressable>

                {/* Product Image */}
                <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                    contentFit="cover"
                />

                {/* Product Details */}
                <View style={styles.detailsContainer}>
                    <View style={styles.labelRow}>
                        <Text style={styles.label}>Product ID</Text>
                        <Text style={styles.productId}>{product.id}</Text>
                    </View>

                    <View style={styles.labelRow}>
                        <Text style={styles.label}>Title</Text>
                        <Text style={styles.title}>{product.title}</Text>
                    </View>

                    <View style={styles.labelRow}>
                        <Text style={styles.label}>Price</Text>
                        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    </View>

                    <View style={styles.labelRow}>
                        <Text style={styles.label}>Description</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.bottomContainer}>
                <Pressable style={styles.updateButton} onPress={gotoUpdate}>
                    <Ionicons name="create-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Update</Text>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={() => setDeleteModalVisible(true)}>
                    <Ionicons name="trash-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
            </View>

            {/* Delete Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalIconContainer}>
                            <Ionicons name="warning-outline" size={50} color="#EF4444" />
                        </View>
                        <Text style={styles.modalTitle}>Delete Product?</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to delete {product.title}? This action cannot be undone.
                        </Text>
                        <View style={styles.modalButtons}>
                            <Pressable
                                style={styles.cancelButton}
                                onPress={() => setDeleteModalVisible(false)}
                                disabled={deleting}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={styles.confirmDeleteButton}
                                onPress={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? (
                                    <ActivityIndicator color="#fff" size="small" />
                                ) : (
                                    <Text style={styles.confirmDeleteText}>Delete</Text>
                                )}
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FF',
    },
    errorText: {
        fontSize: 16,
        color: '#6B7280',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 25,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 10,
    },
    productImage: {
        width: '92%',
        marginLeft: 17,
        marginTop: 40,
        height: 300,
        borderRadius: 10,
    },
    detailsContainer: {
        padding: 24,
    },
    labelRow: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        color: '#9CA3AF',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    productId: {
        fontSize: 14,
        color: '#6B7280',
        fontFamily: 'monospace',
    },
    title: {
        fontFamily: 'Robotslab',
        fontSize: 24,
        color: '#1F2937',
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.gradientPurpleCoral[0],
    },
    description: {
        fontSize: 15,
        color: '#6B7280',
        lineHeight: 24,
    },
    bottomContainer: {
        flexDirection: 'row',
        padding: 20,
        paddingBottom: 40,
        gap: 12,
    },
    updateButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.gradientPurpleCoral[0],
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    deleteButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EF4444',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Robotslab',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 340,
        alignItems: 'center',
    },
    modalIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontFamily: 'Robotslab',
        fontSize: 20,
        color: '#1F2937',
        marginBottom: 8,
    },
    modalMessage: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#6B7280',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmDeleteButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#EF4444',
        alignItems: 'center',
    },
    confirmDeleteText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})
