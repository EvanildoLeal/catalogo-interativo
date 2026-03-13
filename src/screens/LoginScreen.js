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
    StatusBar,
    Dimensions
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/store';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const LoginScreen = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (email.trim() === '' || password.trim() === '') {
            return;
        }

        const mockUserData = {
            name: 'Usuário Teste',
            email: email,
            id: '12345'
        };

        dispatch(login(mockUserData));

        if (onLogin) {
            onLogin();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>M</Text>
                    </View>
                    <Text style={styles.title}>Bem-vindo de volta</Text>
                    <Text style={styles.subtitle}>Acesse sua conta para conferir as novas tendências.</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.label}>E-mail</Text>
                    <View style={styles.inputWrapper}>
                        <Mail color="#999" size={18} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="exemplo@email.com"
                            placeholderTextColor="#BBB"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.inputWrapper}>
                        <Lock color="#999" size={18} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Sua senha secreta"
                            placeholderTextColor="#BBB"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <EyeOff color="#999" size={18} />
                            ) : (
                                <Eye color="#999" size={18} />
                            )}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Entrar</Text>
                        <ArrowRight color="#FFF" size={20} />
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Não tem uma conta? </Text>
                        <TouchableOpacity>
                            <Text style={styles.signUpText}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'center'
    },
    header: {
        marginBottom: 40,
        alignItems: 'flex-start'
    },
    logoPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#000',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    logoText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '900'
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 8
    },
    subtitle: {
        fontSize: 15,
        color: '#777',
        lineHeight: 22
    },
    form: {
        width: '100%'
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
        marginLeft: 4
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 14,
        paddingHorizontal: 15,
        marginBottom: 18,
        height: 58,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    icon: {
        marginRight: 12
    },
    input: {
        flex: 1,
        color: '#1A1A1A',
        fontSize: 16
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 30
    },
    forgotPasswordText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500'
    },
    loginButton: {
        backgroundColor: '#000',
        borderRadius: 14,
        height: 58,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        marginRight: 10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    footerText: {
        color: '#777',
        fontSize: 14
    },
    signUpText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '700'
    }
});

export default LoginScreen;