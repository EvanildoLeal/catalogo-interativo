import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import { ShoppingBag, Search, Heart, Menu } from 'lucide-react-native';
import { getProducts } from './api';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.log("Erro na vitrine");
        } finally {
            setLoading(false);
        }
    };

    const ProductCard = ({ item }) => (
        <TouchableOpacity style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
                <TouchableOpacity style={styles.wishlistButton}>
                    <Heart color="#fff" size={18} />
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.category}>{item.category.toUpperCase()}</Text>
                <Text numberOfLines={1} style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header Customizado */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Menu color="#fff" size={24} />
                </TouchableOpacity>
                <Text style={styles.logoText}>LUXURY</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Search color="#fff" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <ShoppingBag color="#fff" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Categorias Rápidas */}
            <View style={styles.categoriesRow}>
                <Text style={[styles.categoryLink, styles.activeCategory]}>Tudo</Text>
                <Text style={styles.categoryLink}>Novo</Text>
                <Text style={styles.categoryLink}>Popular</Text>
                <Text style={styles.categoryLink}>Ofertas</Text>
            </View>

            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    renderItem={ProductCard}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    logoText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: 4,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 15,
    },
    categoriesRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 10,
    },
    categoryLink: {
        color: '#666',
        marginRight: 25,
        fontSize: 14,
        fontWeight: '600',
    },
    activeCategory: {
        color: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        paddingBottom: 4,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    card: {
        flex: 1,
        margin: 10,
        backgroundColor: '#111',
        borderRadius: 15,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: 180,
        backgroundColor: '#fff', // Fundo branco para imagens de produtos com fundo transparente
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImage: {
        width: '80%',
        height: '80%',
    },
    wishlistButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    infoContainer: {
        padding: 12,
    },
    category: {
        color: '#888',
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    price: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;