import React from 'react';
import { View, Text } from 'react-native';
import { useBankingStore } from '../ganchos/useBankingStore';

export const BalanceCard = () => {
  const { saldo, nomeUsuario } = useBankingStore();

  return (
    <View className="w-full rounded-cartao bg-superficie p-5 mt-4">
      <Text className="text-textoMuted text-xs">Saldo atual</Text>
      <Text className="text-textoPrimario text-3xl font-semibold mt-1">
        {saldo.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </Text>
      <Text className="text-textoMuted text-xs mt-3">
        Bem-vindo(a) de volta, {nomeUsuario}!
      </Text>
    </View>
  );
};

