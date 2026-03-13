import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    ScrollView
} from 'react-native';
import { ShoppingBag, Search, Heart, Filter } from 'lucide-react-native';

const PRODUCTS = [
    {
        id: '1',
        name: 'Camiseta Premium Cotton',
        price: 'R$ 129,00',
        category: 'Essenciais',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: '2',
        name: 'Calça Alfaiataria Modern',
        price: 'R$ 299,00',
        category: 'Casual',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: '3',
        name: 'Jaqueta Bomber Couro',
        price: 'R$ 459,00',
        category: 'Inverno',
        image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5bab3?auto=format&fit=crop&q=80&w=500',
    },
    {
        id: '4',
        name: 'Tênis Urban White',
        price: 'R$ 389,00',
        category: 'Calçados',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=500',
    }
];

const CATEGORIES = ['Tudo', 'Roupas', 'Sapatos', 'Acessórios'];

const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tudo');

    const renderProduct = ({ item }) => (
        <TouchableOpacity style={styles.productCard}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.favoriteButton}>
                    <Heart size={18} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.productInfo}>
                <Text style={styles.categoryLabel}>{item.category}</Text>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Olá, Indonês</Text>
                    <Text style={styles.headerTitle}>Nova Coleção</Text>
                </View>
                <TouchableOpacity style={styles.cartButton}>
                    <ShoppingBag color="#000" size={24} />
                    <View style={styles.cartBadge} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search color="#999" size={20} />
                    <Text style={styles.searchText}>Buscar tendências...</Text>
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Filter color="#FFF" size={20} />
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={styles.categoriesSection}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesList}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.categoryItem,
                                selectedCategory === cat && styles.categoryItemActive
                            ]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === cat && styles.categoryTextActive
                            ]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Products Grid */}
            <FlatList
                data={PRODUCTS}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.productList}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 20
    },
    welcomeText: {
        fontSize: 14,
        color: '#888',
        fontWeight: '500'
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#000'
    },
    cartButton: {
        width: 45,
        height: 45,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 8,
        height: 8,
        backgroundColor: '#FF3B30',
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#FFF'
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 25,
        gap: 12
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    searchText: {
        color: '#999',
        marginLeft: 10,
        fontSize: 15
    },
    filterButton: {
        width: 50,
        height: 50,
        backgroundColor: '#000',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoriesSection: {
        marginBottom: 20
    },
    categoriesList: {
        paddingHorizontal: 20,
        gap: 10
    },
    categoryItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#F5F5F5'
    },
    categoryItemActive: {
        backgroundColor: '#000'
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666'
    },
    categoryTextActive: {
        color: '#FFF'
    },
    productList: {
        paddingHorizontal: 15,
        paddingBottom: 20
    },
    productCard: {
        flex: 1,
        margin: 5,
        backgroundColor: '#FFF',
        borderRadius: 16,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: 180,
        backgroundColor: '#F0F0F0',
        position: 'relative'
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 6,
        borderRadius: 10
    },
    productInfo: {
        padding: 12
    },
    categoryLabel: {
        fontSize: 10,
        textTransform: 'uppercase',
        color: '#999',
        fontWeight: '700',
        marginBottom: 4
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4
    },
    productPrice: {
        fontSize: 15,
        fontWeight: '800',
        color: '#000'
    }
});

export default HomeScreen;