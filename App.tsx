import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BankingProvider } from './src/ganchos/useBankingStore';
import { AppNavigator } from './src/navegação/AppNavigator';
import { cores } from './src/tema/cores';
import './global.css';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: cores.fundo,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <BankingProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar barStyle="light-content" />
          <AppNavigator />
        </NavigationContainer>
      </BankingProvider>
    </SafeAreaProvider>
  );
}
