import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api/api';
import ProductCard from '../components/ProductCard';

const ProductsScreen = ({ navigation, route }) => {
  const { category, title } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const loadProducts = async (refresh = false) => {
    try {
      const currentPage = refresh ? 0 : page;
      const skip = currentPage * 10;
      
      const response = await api.get(`/products/category/${category}?limit=10&skip=${skip}`);
      
      if (refresh) {
        setProducts(response.data.products);
        setPage(1);
      } else {
        setProducts([...products, ...response.data.products]);
        setPage(currentPage + 1);
      }
      
      setTotal(response.data.total);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducts(true);
  }, [category]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadProducts(true);
  };

  const handleLoadMore = () => {
    if (products.length < total && !loading) {
      loadProducts();
    }
  };

  const handleProductPress = (productId) => {
    navigation.navigate('Detail', { productId });
  };

  if (loading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B4EFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => handleProductPress(item.id)} />
        )}
        contentContainerStyle={styles.list}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          products.length < total ? (
            <ActivityIndicator style={styles.footer} color="#6B4EFF" />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingVertical: 8,
  },
  footer: {
    paddingVertical: 20,
  },
});

export default ProductsScreen;
