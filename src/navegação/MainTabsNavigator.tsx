import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../telas/página inicial/HomeScreen';
import { ExtratoScreen } from '../telas/página inicial/ExtratoScreen';
import { CardsScreen } from '../telas/página inicial/CardsScreen';
import { ProfileScreen } from '../telas/página inicial/ProfileScreen';
import { TransferStackNavigator } from './TransferStackNavigator';
import { AccountSettingsScreen } from '../telas/AccountSettingsScreen';
import { PaymentsScreen } from '../telas/PaymentsScreen';
import { cores } from '../tema/cores';

export type MainTabsParamList = {
  Home: undefined;
  Extrato: undefined;
  Cards: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();
const Stack = createNativeStackNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: cores.backgroundAlt,
          borderTopColor: cores.borda,
        },
        tabBarActiveTintColor: cores.primario,
        tabBarInactiveTintColor: cores.textoMuted,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Extrato"
        component={ExtratoScreen}
        options={{
          tabBarLabel: 'Extrato',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📊</Text>,
        }}
      />
      <Tab.Screen
        name="TransferStack"
        component={TransferStackNavigator}
        options={{
          tabBarLabel: 'Transferir',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>💸</Text>,
        }}
      />
      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          tabBarLabel: 'Cartões',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>💳</Text>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export const MainTabsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: cores.superficie },
          headerTintColor: cores.textoPrimario,
          headerTitle: 'Configurações',
          headerTitleStyle: { color: cores.textoPrimario },
        }}
      />
      <Stack.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: cores.superficie },
          headerTintColor: cores.textoPrimario,
          headerTitle: 'Pagamentos',
          headerTitleStyle: { color: cores.textoPrimario },
        }}
      />
    </Stack.Navigator>
  );
};

