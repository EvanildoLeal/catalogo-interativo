import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from '../screens/LoginScreen';
import NovaTela from '../screens/NovaTela';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" component={NovaTela} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;