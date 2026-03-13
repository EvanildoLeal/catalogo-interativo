import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (user) => {
    setUserData(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserData(null);
    setIsLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppNavigator onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}
