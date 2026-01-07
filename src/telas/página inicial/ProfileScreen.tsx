import React from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBankingStore } from '../../ganchos/useBankingStore';

type ProfileScreenProps = {
  navigation: any;
};

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { nomeUsuario, saldo } = useBankingStore();

  const menuItems = [
    { icon: '👤', title: 'Dados Pessoais', screen: 'AccountSettings' },
    { icon: '🔒', title: 'Segurança', screen: null },
    { icon: '💳', title: 'Cartões', screen: 'Cards' },
    { icon: '📊', title: 'Extrato', screen: 'Extrato' },
    { icon: '❓', title: 'Ajuda e Suporte', screen: null },
    { icon: '⚙️', title: 'Configurações', screen: 'AccountSettings' },
    { icon: '🚪', title: 'Sair', screen: 'Login', action: 'logout' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-fundo">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1 px-5 pt-4">
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-primario items-center justify-center mb-4">
            <Text className="text-5xl">{nomeUsuario.charAt(0).toUpperCase()}</Text>
          </View>
          <Text className="text-textoPrimario text-2xl font-bold mb-1">{nomeUsuario}</Text>
          <Text className="text-textoMuted text-base">crypto.banking@email.com</Text>
        </View>

        <View className="mb-6">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-superficie rounded-xl p-4 mb-3 border border-borda flex-row items-center"
              onPress={() => {
                if (item.action === 'logout') {
                  // Navegar de volta para a tela de login
                  navigation.getParent()?.reset({
                    index: 0,
                    routes: [{ name: 'Auth', params: { screen: 'Login' } }],
                  });
                } else if (item.screen) {
                  // Navegar para telas no mesmo stack
                  if (item.screen === 'AccountSettings' || item.screen === 'Payments') {
                    navigation.getParent()?.navigate(item.screen);
                  } else {
                    navigation.navigate(item.screen);
                  }
                }
              }}
              activeOpacity={0.7}
            >
              <Text className="text-2xl mr-4">{item.icon}</Text>
              <Text className="text-textoPrimario text-base font-semibold flex-1">
                {item.title}
              </Text>
              <Text className="text-textoMuted">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="bg-superficie rounded-xl p-4 mb-8 border border-borda">
          <Text className="text-textoMuted text-xs mb-2">Versão do App</Text>
          <Text className="text-textoPrimario text-sm">1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

