import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../components/Icon';
import ProdutosScreen from '../screens/ProdutosScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Masculino') {
            iconName = focused ? 'man' : 'man-outline';
          } else if (route.name === 'Feminino') {
            iconName = focused ? 'woman' : 'woman-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen 
        name="Masculino" 
        component={ProdutosScreen} 
        initialParams={{ genero: 'masculino' }}
        options={{ title: 'Moda Masculina' }}
      />
      <Tab.Screen 
        name="Feminino" 
        component={ProdutosScreen} 
        initialParams={{ genero: 'feminino' }}
        options={{ title: 'Moda Feminina' }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        options={{ title: 'Meu Perfil' }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
