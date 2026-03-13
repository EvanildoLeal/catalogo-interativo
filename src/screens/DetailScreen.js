import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api/api';

const DetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B4EFF" />
      </View>
    );
  }

  const precoOriginal = product.price;
  const desconto = product.discountPercentage || 0;
  const precoComDesconto = (precoOriginal * (1 - desconto/100)).toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header com botão voltar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Imagem principal */}
        <Image source={{ uri: product.images?.[selectedImage] || product.thumbnail }} style={styles.mainImage} />

        {/* Miniaturas das imagens */}
        {product.images && product.images.length > 1 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailContainer}>
            {product.images.map((img, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedImage(index)}>
                <Image
                  source={{ uri: img }}
                  style={[
                    styles.thumbnail,
                    selectedImage === index && styles.selectedThumbnail
                  ]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Informações do produto */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.brand}>{product.brand}</Text>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.rating}>{product.rating}</Text>
            <Text style={styles.stock}>Estoque: {product.stock} unidades</Text>
          </View>

          <View style={styles.priceContainer}>
            {desconto > 0 ? (
              <>
                <Text style={styles.originalPrice}>R$ {precoOriginal}</Text>
                <Text style={styles.discountedPrice}>R$ {precoComDesconto}</Text>
                <Text style={styles.discountBadge}>{Math.round(desconto)}% OFF</Text>
              </>
            ) : (
              <Text style={styles.price}>R$ {precoOriginal}</Text>
            )}
          </View>

          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  header: {
    padding: 16,
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnail: {
    borderColor: '#6B4EFF',
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  brand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rating: {
    fontSize: 16,
    color: '#333',
    marginLeft: 4,
    marginRight: 12,
  },
  stock: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginRight: 10,
  },
  discountBadge: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#e74c3c',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default DetailScreen;
