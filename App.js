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
  Dimensions
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

// --- TELA DE LOGIN ---
function LoginScreen({ onLogin }) {
  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.loginContent}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>M</Text>
        </View>

        <Text style={styles.loginTitle}>Bem-vindo de volta</Text>
        <Text style={styles.loginSubtitle}>Acesse sua conta para conferir o catálogo.</Text>

        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={20} color="#666" />
            <TextInput placeholder="seu@email.com" style={styles.textInput} />
          </View>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Senha</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" />
            <TextInput placeholder="Sua senha" secureTextEntry style={styles.textInput} />
            <Ionicons name="eye-outline" size={20} color="#666" />
          </View>
        </View>

        <TouchableOpacity
          style={styles.mainButton}
          onPress={onLogin}
        >
          <Text style={styles.mainButtonText}>Entrar</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>

        <View style={styles.loginFooter}>
          <Text style={{ color: '#666' }}>Não tem conta? </Text>
          <Text style={{ fontWeight: 'bold' }}>Cadastre-se</Text>
        </View>
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
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Nova Coleção</Text>
          <Text style={styles.headerSubtitle}>Estilo e Conforto</Text>
        </View>
        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={24} color="black" />
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
            <TouchableOpacity style={styles.addBtn}>
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// --- NAVEGADOR PRINCIPAL ---
export default function App() {
  const [logado, setLogado] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!logado ? (
          <Stack.Screen name="Login">
            {props => <LoginScreen {...props} onLogin={() => setLogado(true)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} onLogout={() => setLogado(false)} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Estilos Login
  loginContainer: { flex: 1, backgroundColor: '#fff' },
  loginContent: { flex: 1, padding: 30, justifyContent: 'center' },
  logoBadge: { width: 50, height: 50, backgroundColor: '#000', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  logoText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  loginTitle: { fontSize: 26, fontWeight: 'bold', marginBottom: 5 },
  loginSubtitle: { color: '#666', marginBottom: 30 },
  inputBox: { marginBottom: 20 },
  inputLabel: { fontWeight: '600', marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', paddingHorizontal: 15, borderRadius: 12, height: 55 },
  textInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  mainButton: { backgroundColor: '#000', height: 55, borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  mainButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  loginFooter: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },

  // Estilos Home
  homeContainer: { flex: 1, backgroundColor: '#f9f9f9' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { color: '#888' },
  logoutBtn: { padding: 8 },
  card: { backgroundColor: '#fff', width: (width / 2) - 22, margin: 7, borderRadius: 15, padding: 10, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  cardImage: { width: '100%', height: 150, borderRadius: 12, marginBottom: 10 },
  cardName: { fontWeight: 'bold', fontSize: 14 },
  cardPrice: { color: '#666', marginTop: 4 },
  addBtn: { position: 'absolute', bottom: 10, right: 10, backgroundColor: '#000', borderRadius: 10, padding: 5 }
});