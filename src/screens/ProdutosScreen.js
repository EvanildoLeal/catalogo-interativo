import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError } from '../store';

const ProdutosScreen = ({ route, navigation }) => {
  const { genero } = route.params;
  const dispatch = useDispatch();
  const produtos = useSelector((state) => state.products[genero]);
  const loading = useSelector((state) => state.products.loading);
  const [categoriaAtual, setCategoriaAtual] = useState(0);

  const categorias = {
    masculino: ['mens-shirts', 'mens-shoes', 'mens-watches'],
    feminino: [
      'womens-bags',
      'womens-dresses',
      'womens-jewellery',
      'womens-shoes',
      'womens-watches',
    ],
  };

  const nomesCategorias = {
    'mens-shirts': 'Camisetas',
    'mens-shoes': 'Tênis',
    'mens-watches': 'Relógios',
    'womens-bags': 'Bolsas',
    'womens-dresses': 'Vestidos',
    'womens-jewellery': 'Joias',
    'womens-shoes': 'Sapatos',
    'womens-watches': 'Relógios',
  };

  useEffect(() => {
    carregarProdutos();
  }, [categoriaAtual]);

  const carregarProdutos = async () => {
    dispatch(setLoading(true));
    try {
      const categoria = categorias[genero][categoriaAtual];
      const response = await axios.get(
        `https://dummyjson.com/products/category/${categoria}`
      );
      
      dispatch(
        setProducts({
          categoria: genero,
          data: response.data.products,
        })
      );
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError('Erro ao carregar produtos'));
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('Detalhes', { productId: item.id })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
        {item.discountPercentage > 0 && (
          <Text style={styles.productDiscount}>
            {item.discountPercentage}% OFF
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoriasContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categorias[genero]}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.categoriaButton,
                categoriaAtual === index && styles.categoriaButtonActive,
              ]}
              onPress={() => setCategoriaAtual(index)}
            >
              <Text
                style={[
                  styles.categoriaText,
                  categoriaAtual === index && styles.categoriaTextActive,
                ]}
              >
                {nomesCategorias[item]}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  categoriasContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoriaButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoriaButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoriaText: {
    fontSize: 14,
    color: '#666',
  },
  categoriaTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productsList: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  productDiscount: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
});

export default ProdutosScreen;
