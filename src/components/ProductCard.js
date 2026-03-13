import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  // Calcular preço com desconto
  const precoOriginal = product.price;
  const desconto = product.discountPercentage || 0;
  const precoComDesconto = (precoOriginal * (1 - desconto/100)).toFixed(2);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.brand}>{product.brand}</Text>
        
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginRight: 8,
  },
  discountBadge: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#e74c3c',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default ProductCard;
