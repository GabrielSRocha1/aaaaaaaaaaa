import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBankingStore } from '../../ganchos/useBankingStore';
import { CustomButton } from '../../componentes/CustomButton';

type CardsScreenProps = {
  navigation: any;
};

export const CardsScreen = ({ navigation }: CardsScreenProps) => {
  const { nomeUsuario } = useBankingStore();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <SafeAreaView className="flex-1 bg-fundo">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1 px-5 pt-4">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-textoPrimario text-2xl font-bold">Meus Cartões</Text>
        </View>

        <View className="bg-primario rounded-cartao p-6 mb-6 h-56 justify-between">
          <View>
            <Text className="text-fundo text-sm mb-4">CRYPTO CARD</Text>
            <Text className="text-fundo text-xs mb-2">TITULAR</Text>
            <Text className="text-fundo text-lg font-bold">{nomeUsuario.toUpperCase()}</Text>
          </View>
          <View>
            <Text className="text-fundo text-xs mb-2">LIMITE DISPONÍVEL</Text>
            <Text className="text-fundo text-2xl font-bold">{formatCurrency(10000)}</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-fundo text-xs">•••• •••• •••• 1234</Text>
            <Text className="text-fundo text-xs">12/25</Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-textoPrimario text-lg font-semibold mb-4">Ações Rápidas</Text>
          <View className="flex-row mb-4">
            <View className="flex-1 bg-superficie rounded-xl p-4 mr-2 border border-borda items-center">
              <Text className="text-3xl mb-2">🔒</Text>
              <Text className="text-textoPrimario text-sm">Bloquear</Text>
            </View>
            <View className="flex-1 bg-superficie rounded-xl p-4 ml-2 border border-borda items-center">
              <Text className="text-3xl mb-2">🔓</Text>
              <Text className="text-textoPrimario text-sm">Desbloquear</Text>
            </View>
          </View>
          <View className="flex-row">
            <View className="flex-1 bg-superficie rounded-xl p-4 mr-2 border border-borda items-center">
              <Text className="text-3xl mb-2">📊</Text>
              <Text className="text-textoPrimario text-sm">Limites</Text>
            </View>
            <View className="flex-1 bg-superficie rounded-xl p-4 ml-2 border border-borda items-center">
              <Text className="text-3xl mb-2">⚙️</Text>
              <Text className="text-textoPrimario text-sm">Configurar</Text>
            </View>
          </View>
        </View>

        <View className="mb-8">
          <CustomButton
            title="Solicitar Novo Cartão"
            onPress={() => {}}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

