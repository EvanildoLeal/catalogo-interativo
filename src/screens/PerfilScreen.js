import React from 'react';
import {
<<<<<<< HEAD
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';
import Icon from '../components/Icon';

const PerfilScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Icon name="person-circle" size={100} color="#007AFF" />
        </View>
        <Text style={styles.userName}>{userData?.nome || 'Usuário'}</Text>
        <Text style={styles.userEmail}>{userData?.email || 'email@exemplo.com'}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="cart-outline" size={24} color="#333" />
          <Text style={styles.menuText}>Meus Pedidos</Text>
          <Icon name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="heart-outline" size={24} color="#333" />
          <Text style={styles.menuText}>Favoritos</Text>
          <Icon name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="settings-outline" size={24} color="#333" />
          <Text style={styles.menuText}>Configurações</Text>
          <Icon name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} color="#ff4444" />
          <Text style={[styles.menuText, styles.logoutText]}>Sair</Text>
          <Icon name="chevron-forward" size={24} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  menuContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutText: {
    color: '#ff4444',
  },
});

export default PerfilScreen;
=======
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';
import Icon from 'react-native-vector-icons/Ionicons';

const PerfilScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);

    const handleLogout = () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(logout());
                        navigation.replace('Login');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Icon name="person-circle" size={100} color="#007AFF" />
                </View>
                <Text style={styles.userName}>{userData?.nome || 'Usuário'}</Text>
                <Text style={styles.userEmail}>{userData?.email || 'email@exemplo.com'}</Text>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="cart-outline" size={24} color="#333" />
                    <Text style={styles.menuText}>Meus Pedidos</Text>
                    <Icon name="chevron-forward" size={24} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="heart-outline" size={24} color="#333" />
                    <Text style={styles.menuText}>Favoritos</Text>
                    <Icon name="chevron-forward" size={24} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Icon name="settings-outline" size={24} color="#333" />
                    <Text style={styles.menuText}>Configurações</Text>
                    <Icon name="chevron-forward" size={24} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
                    <Icon name="log-out-outline" size={24} color="#ff4444" />
                    <Text style={[styles.menuText, styles.logoutText]}>Sair</Text>
                    <Icon name="chevron-forward" size={24} color="#ff4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatarContainer: {
        marginBottom: 10,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    menuContainer: {
        marginTop: 20,
        backgroundColor: '#fff',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 15,
        color: '#333',
    },
    logoutButton: {
        marginTop: 20,
    },
    logoutText: {
        color: '#ff4444',
    },
});

export default PerfilScreen;
>>>>>>> 3abcb335408a95a13cf2b1528fc96e5d5ddca6ee
