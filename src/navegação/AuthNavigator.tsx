import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../telas/aut/OnboardingScreen';
import { LoginScreen } from '../telas/aut/LoginScreen';
import { BiometricScreen } from '../telas/aut/BiometricScreen';
import { MainTabsNavigator } from './MainTabsNavigator';

export type AuthStackParamList = {
  Login: undefined;
  Biometric: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Biometric" component={BiometricScreen} />
      <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
    </Stack.Navigator>
  );
};

