import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// IMPORTANTE: O caminho '../screens/HomeScreen' sobe um nível (sai de navigation) 
// e entra na pasta screens para buscar o seu arquivo.
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Configurações') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        headerShown: true, // Define como true se quiser ver o título no topo
      })}
    >
      <Tab.Screen
        name="Início"
        component={HomeScreen}
        options={{ title: 'Catálogo de Produtos' }}
      />
    </Tab.Navigator>
  );
}