import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = ({ onLogout }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Tabs" 
        options={{ headerShown: false }}
      >
        {props => <TabsNavigator {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ 
          title: 'Detalhes do Produto',
          headerStyle: {
            backgroundColor: '#6B4EFF',
          },
          headerTintColor: '#fff',
          headerBackTitle: 'Voltar',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
