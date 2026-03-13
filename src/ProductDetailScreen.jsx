import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Dimensions
} from 'react-native';
import { ChevronLeft, ShoppingCart, Star, ShieldCheck, Truck } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ product, onBack }) => {
    if (!product) return null;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header Fixo */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <ChevronLeft color="#fff" size={28} />
                </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>{product.title}</Text>
                <View style={{ width: 40 }} /> {/* Espaçador para centralizar título */}
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Imagem de Destaque */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.images?.[0] || product.thumbnail }}
                        style={styles.mainImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.contentCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.brandText}>{product.brand || 'Premium Selection'}</Text>
                        <View style={styles.ratingBadge}>
                            <Star color="#FFD700" size={14} fill="#FFD700" />
                            <Text style={styles.ratingText}>{product.rating}</Text>
                        </View>
                    </View>

                    <Text style={styles.title}>{product.title}</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                        {product.discountPercentage && (
                            <View style={styles.discountTag}>
                                <Text style={styles.discountText}>{Math.round(product.discountPercentage)}% OFF</Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.sectionTitle}>Descrição</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {/* Benefícios */}
                    <View style={styles.benefitsContainer}>
                        <View style={styles.benefitItem}>
                            <Truck color="#4CAF50" size={20} />
                            <Text style={styles.benefitText}>Entrega Grátis</Text>
                        </View>
                        <View style={styles.benefitItem}>
                            <ShieldCheck color="#4CAF50" size={20} />
                            <Text style={styles.benefitText}>Garantia Original</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Barra de Compra Inferior */}
            <View style={styles.bottomBar}>
                <View>
                    <Text style={styles.totalLabel}>Preço Total</Text>
                    <Text style={styles.totalPrice}>${product.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.buyButton}>
                    <ShoppingCart color="#000" size={20} />
                    <Text style={styles.buyButtonText}>Adicionar ao Carrinho</Text>
                </TouchableOpacity>
            </View>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 60,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        maxWidth: width * 0.6,
    },
    backButton: {
        padding: 5,
    },
    imageContainer: {
        width: width,
        height: width,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainImage: {
        width: '90%',
        height: '90%',
    },
    contentCard: {
        flex: 1,
        backgroundColor: '#111',
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        paddingBottom: 100,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    brandText: {
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontSize: 12,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 12,
        fontWeight: 'bold',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    price: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '900',
        marginRight: 15,
    },
    discountTag: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
    },
    discountText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    description: {
        color: '#aaa',
        lineHeight: 22,
        fontSize: 15,
        marginBottom: 25,
    },
    benefitsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderColor: '#222',
        paddingTop: 20,
    },
    benefitItem: {
        alignItems: 'center',
    },
    benefitText: {
        color: '#fff',
        fontSize: 11,
        marginTop: 5,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        backgroundColor: '#1a1a1a',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingBottom: 15,
        borderTopWidth: 1,
        borderColor: '#333',
    },
    totalLabel: {
        color: '#666',
        fontSize: 12,
    },
    totalPrice: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    buyButton: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 15,
    },
    buyButtonText: {
        color: '#000',
        fontWeight: 'bold',
        marginLeft: 10,
    }
});

export default ProductDetailScreen;