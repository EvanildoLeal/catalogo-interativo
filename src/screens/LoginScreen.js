import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    StatusBar
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from './store'; // Ajuste o caminho conforme sua estrutura
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = () => {
        // Simulação de login - aqui você chamaria sua API no futuro
        if (email && password) {
            const mockUserData = {
                name: 'Usuário Exemplo',
                email: email,
                id: '12345'
            };

            dispatch(login(mockUserData));
            // navigation.navigate('Home'); // Descomente quando tiver as rotas
            console.log('Login realizado com sucesso!');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Bem-vindo</Text>
                    <Text style={styles.subtitle}>Faça login para continuar sua jornada na moda.</Text>
                </View>

                <View style={styles.form}>
                    {/* Campo de Email */}
                    <View style={styles.inputContainer}>
                        <Mail color="#666" size={20} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Campo de Senha */}
                    <View style={styles.inputContainer}>
                        <Lock color="#666" size={20} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor="#666"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <EyeOff color="#666" size={20} />
                            ) : (
                                <Eye color="#666" size={20} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Não tem uma conta? </Text>
                    <TouchableOpacity onPress={() => console.log('Ir para Cadastro')}>
                        <Text style={styles.signUpText}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Fundo preto como nos prints
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        lineHeight: 22,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 20,
        height: 55,
        borderWidth: 1,
        borderColor: '#333',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: '#999',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#fff',
        borderRadius: 12,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
    },
    loginButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    footerText: {
        color: '#888',
        fontSize: 14,
    },
    signUpText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LoginScreen;