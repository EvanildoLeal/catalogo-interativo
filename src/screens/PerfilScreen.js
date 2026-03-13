import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PerfilScreen = () => {
  const user = {
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123 - São Paulo, SP',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  const pedidos = [
    { id: 1, data: '10/03/2026', total: 'R$ 89,90', status: 'Entregue' },
    { id: 2, data: '05/03/2026', total: 'R$ 149,00', status: 'Em trânsito' },
    { id: 3, data: '28/02/2026', total: 'R$ 299,00', status: 'Entregue' },
  ];

  const handleLogout = () => {
    console.log('Logout');
    // Implementar logout
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perfil</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        {/* Avatar e Informações do Usuário */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user.foto }} style={styles.avatar} />
          <Text style={styles.userName}>{user.nome}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Informações de Contato */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informações de Contato</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={22} color="#666" />
            <Text style={styles.infoText}>{user.email}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={22} color="#666" />
            <Text style={styles.infoText}>{user.telefone}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={22} color="#666" />
            <Text style={styles.infoText}>{user.endereco}</Text>
          </View>
        </View>

        {/* Histórico de Pedidos */}
        <View style={styles.ordersSection}>
          <Text style={styles.sectionTitle}>Histórico de Pedidos</Text>
          
          {pedidos.map((pedido) => (
            <View key={pedido.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderDate}>Pedido #{pedido.id}</Text>
                <Text style={[
                  styles.orderStatus,
                  pedido.status === 'Entregue' ? styles.statusEntregue : styles.statusTransito
                ]}>
                  {pedido.status}
                </Text>
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderDateText}>Data: {pedido.data}</Text>
                <Text style={styles.orderTotal}>Total: {pedido.total}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={22} color="#666" />
            <Text style={styles.actionText}>Meus Favoritos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={22} color="#666" />
            <Text style={styles.actionText}>Configurações</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle-outline" size={22} color="#666" />
            <Text style={styles.actionText}>Ajuda</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 15,
    flex: 1,
  },
  ordersSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statusEntregue: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  statusTransito: {
    backgroundColor: '#FFF3E0',
    color: '#F57C00',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDateText: {
    fontSize: 14,
    color: '#666',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  actionsSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
});

export default PerfilScreen;
