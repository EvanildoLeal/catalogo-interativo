import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ onLogin }) => {
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
    
    // Salvar dados do usuário (pode ser no Redux ou Context)
    const userData = {
      username: username.trim(),
      loginTime: new Date().toISOString(),
    };
    
    // Passar dados para o componente principal
    onLogin(userData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6B4EFF" />
      
      <View style={styles.header}>
        <Ionicons name="cart-outline" size={50} color="#fff" />
        <Text style={styles.headerText}>Catálogo Interativo</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>Insira seus dados para entrar na sua conta.</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={20} color="#999" />
            <TextInput
              placeholder="Digite seu username"
              placeholderTextColor="#999"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" />
            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              secureTextEntry={mostrarSenha}
              style={styles.input}
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#6B4EFF',
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    flex: 1,
    padding: 30,
    marginTop: -30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    color: '#666',
    marginBottom: 40,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
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
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
