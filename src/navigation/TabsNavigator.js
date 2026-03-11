import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
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
            })}
        >
            <Tab.Screen
                name="Masculino"
                component={ProdutosScreen}
                initialParams={{ genero: 'masculino' }}
            />
            <Tab.Screen
                name="Feminino"
                component={ProdutosScreen}
                initialParams={{ genero: 'feminino' }}
            />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
};

export default TabsNavigator;