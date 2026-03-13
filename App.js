import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// --- TELA DE LOGIN ATUALIZADA ---
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(true);

  const handleLogin = () => {
    console.log('Login com:', username, senha);
    onLogin();
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
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

// --- TELA DE PRODUTOS (HOME) ---
const PRODUTOS = [
  { id: '1', nome: 'Camisa Casual Blue', preco: 'R$ 89,90', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
  { id: '2', nome: 'Calça Jeans Slim', preco: 'R$ 149,00', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
  { id: '3', nome: 'Tênis Sport White', preco: 'R$ 299,00', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
  { id: '4', nome: 'Jaqueta Bomber Black', preco: 'R$ 199,90', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
];

function HomeScreen({ onLogout }) {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fcfcfc" />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Catálogo</Text>
          <Text style={styles.headerSubtitle}>Confira nossas novidades</Text>
        </View>
        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={PRODUTOS}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.cardImage} />
            <Text style={styles.cardName}>{item.nome}</Text>
            <Text style={styles.cardPrice}>{item.preco}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [telaAtual, setTelaAtual] = useState('login');

  if (telaAtual === 'login') {
    return <LoginScreen onLogin={() => setTelaAtual('home')} />;
  }

  return <HomeScreen onLogout={() => setTelaAtual('login')} />;
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  // Estilos da Tela de Login
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loginContent: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
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

  // Estilos da Tela Home
  homeContainer: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
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
  card: {
    backgroundColor: '#fff',
    width: (width / 2) - 22,
    margin: 7,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  cardPrice: {
    color: '#2ecc71',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 16,
  },
});