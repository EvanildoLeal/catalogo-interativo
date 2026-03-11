import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const DetalhesScreen = ({ route, navigation }) => {
    const { productId } = route.params;
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imagemAtual, setImagemAtual] = useState(0);

    useEffect(() => {
        carregarProduto();
    }, []);

    const carregarProduto = async () => {
        try {
            const response = await axios.get(
                `https://dummyjson.com/products/${productId}`
            );
            setProduto(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (!produto) {
        return (
            <View style={styles.errorContainer}>
                <Text>Produto não encontrado</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: produto.images[imagemAtual] }} style={styles.image} />

                {produto.images.length > 1 && (
                    <View style={styles.thumbnailsContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {produto.images.map((img, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setImagemAtual(index)}
                                >
                                    <Image
                                        source={{ uri: img }}
                                        style={[
                                            styles.thumbnail,
                                            imagemAtual === index && styles.thumbnailActive,
                                        ]}
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{produto.title}</Text>

                <View style={styles.priceContainer}>
                    <Text style={styles.price}>
                        R$ {produto.price.toFixed(2)}
                    </Text>
                    {produto.discountPercentage > 0 && (
                        <View style={styles.discountContainer}>
                            <Text style={styles.discount}>
                                {produto.discountPercentage}% OFF
                            </Text>
                        </View>
                    )}
                </View>

                <View style={styles.ratingContainer}>
                    <Icon name="star" size={20} color="#FFD700" />
                    <Text style={styles.rating}>{produto.rating}</Text>
                </View>

                <Text style={styles.sectionTitle}>Descrição</Text>
                <Text style={styles.description}>{produto.description}</Text>

                <Text style={styles.sectionTitle}>Informações Adicionais</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Marca:</Text>
                    <Text style={styles.infoValue}>{produto.brand}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Categoria:</Text>
                    <Text style={styles.infoValue}>{produto.category}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Estoque:</Text>
                    <Text style={styles.infoValue}>{produto.stock} unidades</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    thumbnailsContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    thumbnailActive: {
        borderColor: '#007AFF',
    },
    infoContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#007AFF',
        marginRight: 10,
    },
    discountContainer: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    discount: {
        color: '#fff',
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    rating: {
        fontSize: 18,
        marginLeft: 5,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 120,
        color: '#333',
    },
    infoValue: {
        fontSize: 16,
        color: '#666',
    },
});

export default DetalhesScreen;