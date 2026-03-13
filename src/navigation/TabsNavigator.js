import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProductsScreen from '../screens/ProductsScreen';

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

// Navegação por abas superiores para categorias masculinas
function MasculinoTabs() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6B4EFF',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: { backgroundColor: '#6B4EFF' },
        tabBarScrollEnabled: true,
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <TopTab.Screen 
        name="Camisas" 
        component={ProductsScreen}
        initialParams={{ category: 'mens-shirts', title: 'Camisas' }}
      />
      <TopTab.Screen 
        name="Tênis" 
        component={ProductsScreen}
        initialParams={{ category: 'mens-shoes', title: 'Tênis' }}
      />
      <TopTab.Screen 
        name="Relógios" 
        component={ProductsScreen}
        initialParams={{ category: 'mens-watches', title: 'Relógios' }}
      />
    </TopTab.Navigator>
  );
}

// Navegação por abas superiores para categorias femininas
function FemininoTabs() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6B4EFF',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: { backgroundColor: '#6B4EFF' },
        tabBarScrollEnabled: true,
        tabBarStyle: { backgroundColor: '#fff' },
      }}
    >
      <TopTab.Screen 
        name="Bolsas" 
        component={ProductsScreen}
        initialParams={{ category: 'womens-bags', title: 'Bolsas' }}
      />
      <TopTab.Screen 
        name="Vestidos" 
        component={ProductsScreen}
        initialParams={{ category: 'womens-dresses', title: 'Vestidos' }}
      />
      <TopTab.Screen 
        name="Jóias" 
        component={ProductsScreen}
        initialParams={{ category: 'womens-jewellery', title: 'Jóias' }}
      />
      <TopTab.Screen 
        name="Sapatos" 
        component={ProductsScreen}
        initialParams={{ category: 'womens-shoes', title: 'Sapatos' }}
      />
      <TopTab.Screen 
        name="Relógios" 
        component={ProductsScreen}
        initialParams={{ category: 'womens-watches', title: 'Relógios' }}
      />
    </TopTab.Navigator>
  );
}

// Navegação principal por abas inferiores
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
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6B4EFF',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#6B4EFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Masculino" 
        component={MasculinoTabs}
        options={{ title: 'Moda Masculina' }}
      />
      <Tab.Screen 
        name="Feminino" 
        component={FemininoTabs}
        options={{ title: 'Moda Feminina' }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
