import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import LoginScreen from './src/screens/LoginScreen';
import TabsNavigator from './src/navigation/TabsNavigator';
import DetalhesScreen from './src/screens/DetalhesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
<<<<<<< HEAD
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Main" 
            component={TabsNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Detalhes" 
            component={DetalhesScreen} 
            options={{ 
              title: 'Detalhes do Produto',
              headerStyle: {
                backgroundColor: '#007AFF',
              },
              headerTintColor: '#fff',
            }}
=======
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detalhes"
            component={DetalhesScreen}
            options={{ title: 'Detalhes do Produto' }}
>>>>>>> 3abcb335408a95a13cf2b1528fc96e5d5ddca6ee
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 3abcb335408a95a13cf2b1528fc96e5d5ddca6ee
