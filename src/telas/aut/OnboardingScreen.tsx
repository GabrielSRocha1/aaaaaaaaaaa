import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../componentes/CustomButton';

type OnboardingScreenProps = {
  navigation: any;
};

export const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  return (
    <SafeAreaView className="flex-1 bg-fundo">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1 px-5 pt-12">
        <View className="flex-1 justify-center items-center mb-8">
          <Text className="text-primario text-6xl mb-4">₿</Text>
          <Text className="text-textoPrimario text-4xl font-bold text-center mb-4">
            Crypto Banking
          </Text>
          <Text className="text-textoMuted text-lg text-center mb-8">
            Gerencie suas criptomoedas de forma simples e segura
          </Text>
        </View>

        <View className="mb-8">
          <View className="flex-row items-center mb-6">
            <View className="w-12 h-12 rounded-full bg-primario items-center justify-center mr-4">
              <Text className="text-2xl">🔒</Text>
            </View>
            <View className="flex-1">
              <Text className="text-textoPrimario text-lg font-semibold mb-1">Segurança</Text>
              <Text className="text-textoMuted text-sm">
                Suas criptomoedas protegidas com criptografia de nível bancário
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-6">
            <View className="w-12 h-12 rounded-full bg-primario items-center justify-center mr-4">
              <Text className="text-2xl">📊</Text>
            </View>
            <View className="flex-1">
              <Text className="text-textoPrimario text-lg font-semibold mb-1">Acompanhamento</Text>
              <Text className="text-textoMuted text-sm">
                Visualize preços em tempo real e acompanhe seus investimentos
              </Text>
            </View>
          </View>

          <View className="flex-row items-center mb-6">
            <View className="w-12 h-12 rounded-full bg-primario items-center justify-center mr-4">
              <Text className="text-2xl">⚡</Text>
            </View>
            <View className="flex-1">
              <Text className="text-textoPrimario text-lg font-semibold mb-1">
                Transações Rápidas
              </Text>
              <Text className="text-textoMuted text-sm">
                Envie e receba criptomoedas instantaneamente
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-8">
          <CustomButton
            title="Começar"
            onPress={() => navigation.navigate('Login')}
            variant="primary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

