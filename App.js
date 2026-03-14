import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const { width } = Dimensions.get('window');

// --- CONFIGURAÇÃO DA API ---
const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// --- TELA DE LOGIN ---
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(true);

  const handleLogin = () => {
    if (!username.trim()) {
      Alert.alert('Erro', 'Por favor, digite seu username');
      return;
    }
    
    if (!senha.trim()) {
      Alert.alert('Erro', 'Por favor, digite sua senha');
      return;
    }
    
    onLogin({ username: username.trim() });
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#6B4EFF" />
      <View style={styles.headerGradient}>
        <View style={styles.headerContent}>
          <Ionicons name="cart-outline" size={40} color="#fff" />
          <Text style={styles.headerText}>Catálogo Interativo</Text>
        </View>
      </View>

      <View style={styles.loginContent}>
        <Text style={styles.loginTitle}>Bem-vindo de volta!</Text>
        <Text style={styles.loginSubtitle}>Insira seus dados para entrar na sua conta.</Text>

        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Username</Text>
          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={20} color="#999" />
            <TextInput
              placeholder="Digite seu username"
              placeholderTextColor="#999"
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Senha</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" />
            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              secureTextEntry={mostrarSenha}
              style={styles.textInput}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Ionicons
                name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
          <Text style={styles.mainButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- CATEGORIAS ---
const CATEGORIAS = {
  masculino: [
    { id: 'mens-shirts', nome: 'Camisas', icon: 'shirt' },
    { id: 'mens-shoes', nome: 'Tênis', icon: 'football' },
    { id: 'mens-watches', nome: 'Relógios', icon: 'watch' },
  ],
  feminino: [
    { id: 'womens-bags', nome: 'Bolsas', icon: 'bag' },
    { id: 'womens-dresses', nome: 'Vestidos', icon: 'woman' },
    { id: 'womens-jewellery', nome: 'Jóias', icon: 'diamond' },
    { id: 'womens-shoes', nome: 'Sapatos', icon: 'football' },
    { id: 'womens-watches', nome: 'Relógios', icon: 'watch' },
  ],
};

// --- TELA PRINCIPAL COM TABS ---
function HomeTabsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('masculino');

  const renderCategoria = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoriaCard}
      onPress={() => navigation.navigate('Produtos', { 
        categoria: item.id,
        nome: item.nome 
      })}
    >
      <Ionicons name={item.icon} size={40} color="#6B4EFF" />
      <Text style={styles.categoriaNome}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fcfcfc" />
      
      {/* Header com logout */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Catálogo</Text>
          <Text style={styles.headerSubtitle}>Escolha uma categoria</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'masculino' && styles.activeTab]}
          onPress={() => setActiveTab('masculino')}
        >
          <Ionicons 
            name="man" 
            size={20} 
            color={activeTab === 'masculino' ? '#6B4EFF' : '#999'} 
          />
          <Text style={[styles.tabText, activeTab === 'masculino' && styles.activeTabText]}>
            Masculino
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'feminino' && styles.activeTab]}
          onPress={() => setActiveTab('feminino')}
        >
          <Ionicons 
            name="woman" 
            size={20} 
            color={activeTab === 'feminino' ? '#6B4EFF' : '#999'} 
          />
          <Text style={[styles.tabText, activeTab === 'feminino' && styles.activeTabText]}>
            Feminino
          </Text>
        </TouchableOpacity>
      </View>

      {/* Grid de categorias */}
      <FlatList
        data={CATEGORIAS[activeTab]}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.categoriasList}
        renderItem={renderCategoria}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma categoria encontrada</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// --- TELA DE LISTA DE PRODUTOS ---
function ProdutosScreen({ route, navigation }) {
  const { categoria, nome } = route.params;
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarProdutos = async () => {
    try {
      console.log('Carregando categoria:', categoria); // Para debug
      const response = await api.get(`/products/category/${categoria}`);
      console.log('Produtos carregados:', response.data.products.length); // Para debug
      setProdutos(response.data.products);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    carregarProdutos();
  }, [categoria]);

  const handleRefresh = () => {
    setRefreshing(true);
    carregarProdutos();
  };

  const formatPreco = (preco) => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const renderProduto = ({ item }) => {
    const precoComDesconto = item.price * (1 - (item.discountPercentage || 0) / 100);
    
    return (
      <TouchableOpacity 
        style={styles.produtoCard}
        onPress={() => navigation.navigate('Detalhes', { produtoId: item.id })}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.produtoImage} />
        <View style={styles.produtoInfo}>
          <Text style={styles.produtoNome} numberOfLines={2}>{item.title}</Text>
          
          {item.discountPercentage > 0 ? (
            <View>
              <Text style={styles.produtoPrecoOriginal}>
                {formatPreco(item.price)}
              </Text>
              <View style={styles.produtoPrecoContainer}>
                <Text style={styles.produtoPreco}>
                  {formatPreco(precoComDesconto)}
                </Text>
                <Text style={styles.produtoDesconto}>
                  {Math.round(item.discountPercentage)}%
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.produtoPreco}>
              {formatPreco(item.price)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B4EFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fcfcfc" />
      
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{nome}</Text>
            <Text style={styles.headerSubtitle}>{produtos.length} produtos</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={produtos}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.produtosList}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        renderItem={renderProduto}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// --- TELA DE DETALHES DO PRODUTO ---
function DetalhesScreen({ route, navigation }) {
  const { produtoId } = route.params;
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDetalhes();
  }, []);

  const carregarDetalhes = async () => {
    try {
      console.log('Carregando produto ID:', produtoId); // Para debug
      const response = await api.get(`/products/${produtoId}`);
      setProduto(response.data);
    } catch (error) {
      console.error('Erro ao carregar detalhes:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do produto');
    } finally {
      setLoading(false);
    }
  };

  const formatPreco = (preco) => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  if (loading || !produto) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6B4EFF" />
      </View>
    );
  }

  const precoComDesconto = produto.price * (1 - (produto.discountPercentage || 0) / 100);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fcfcfc" />
      
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes</Text>
          <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: produto.thumbnail }} style={styles.detalhesImage} />
        
        <View style={styles.detalhesContent}>
          <Text style={styles.detalhesNome}>{produto.title}</Text>
          <Text style={styles.detalhesMarca}>{produto.brand}</Text>
          
          <View style={styles.detalhesAvaliacao}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.detalhesRating}>{produto.rating}</Text>
            <Text style={styles.detalhesEstoque}>Estoque: {produto.stock} unidades</Text>
          </View>

          <View style={styles.detalhesPrecoContainer}>
            {produto.discountPercentage > 0 ? (
              <>
                <Text style={styles.detalhesPrecoOriginal}>
                  {formatPreco(produto.price)}
                </Text>
                <Text style={styles.detalhesPreco}>
                  {formatPreco(precoComDesconto)}
                </Text>
                <Text style={styles.detalhesDesconto}>
                  {Math.round(produto.discountPercentage)}% OFF
                </Text>
              </>
            ) : (
              <Text style={styles.detalhesPreco}>
                {formatPreco(produto.price)}
              </Text>
            )}
          </View>

          <View style={styles.separador} />

          <Text style={styles.detalhesSectionTitle}>Descrição</Text>
          <Text style={styles.detalhesDescricao}>{produto.description}</Text>

          <View style={styles.separador} />

          <Text style={styles.detalhesSectionTitle}>Informações Adicionais</Text>
          <Text style={styles.detalhesInfo}>• Marca: {produto.brand || 'N/A'}</Text>
          <Text style={styles.detalhesInfo}>• Categoria: {produto.category}</Text>
          {produto.tags && produto.tags.map((tag, index) => (
            <Text key={index} style={styles.detalhesInfo}>• {tag}</Text>
          ))}

          {produto.images && produto.images.length > 1 && (
            <>
              <View style={styles.separador} />
              <Text style={styles.detalhesSectionTitle}>Mais Imagens</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {produto.images.map((img, index) => (
                  <Image key={index} source={{ uri: img }} style={styles.detalhesThumb} />
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState({ screen: 'Home', params: null });

  const navigation = {
    navigate: (screen, params) => {
      console.log('Navegando para:', screen, params); // Para debug
      setCurrentScreen({ screen, params });
    },
    goBack: () => {
      console.log('Voltando para Home'); // Para debug
      setCurrentScreen({ screen: 'Home', params: null });
    },
    replace: (screen) => {
      console.log('Replace para:', screen); // Para debug
      if (screen === 'Login') {
        setUser(null);
      }
    },
  };

  if (!user) {
    return <LoginScreen onLogin={(userData) => setUser(userData)} />;
  }

  if (currentScreen.screen === 'Produtos') {
    return <ProdutosScreen route={{ params: currentScreen.params }} navigation={navigation} />;
  }

  if (currentScreen.screen === 'Detalhes') {
    return <DetalhesScreen route={{ params: currentScreen.params }} navigation={navigation} />;
  }

  return <HomeTabsScreen navigation={navigation} />;
}

// --- ESTILOS (COMPLETO) ---
const styles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
  logoutBtn: {
    padding: 10,
  },

  // Login
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerGradient: {
    backgroundColor: '#6B4EFF',
    height: 180,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  loginContent: {
    flex: 1,
    padding: 30,
    marginTop: -30,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  loginSubtitle: {
    color: '#666',
    marginBottom: 40,
    fontSize: 16,
  },
  inputBox: {
    marginBottom: 24,
  },
  inputLabel: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 55,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  mainButton: {
    backgroundColor: '#007AFF',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#f0ebff',
  },
  tabText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#6B4EFF',
    fontWeight: 'bold',
  },

  // Categorias
  categoriasList: {
    padding: 15,
  },
  categoriaCard: {
    backgroundColor: '#fff',
    width: (width / 2) - 22,
    margin: 7,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoriaNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },

  // Produtos
  produtosList: {
    padding: 15,
  },
  produtoCard: {
    backgroundColor: '#fff',
    width: (width / 2) - 22,
    margin: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  produtoImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  produtoInfo: {
    padding: 12,
  },
  produtoNome: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    height: 40,
  },
  produtoPrecoOriginal: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  produtoPrecoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  produtoPreco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  produtoDesconto: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#e74c3c',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },

  // Detalhes
  detalhesImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  detalhesContent: {
    padding: 20,
  },
  detalhesNome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detalhesMarca: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  detalhesAvaliacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detalhesRating: {
    fontSize: 16,
    color: '#333',
    marginLeft: 4,
    marginRight: 12,
  },
  detalhesEstoque: {
    fontSize: 14,
    color: '#666',
  },
  detalhesPrecoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detalhesPrecoOriginal: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  detalhesPreco: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginRight: 10,
  },
  detalhesDesconto: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#e74c3c',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  separador: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  detalhesSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detalhesDescricao: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detalhesInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  detalhesThumb: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
});
