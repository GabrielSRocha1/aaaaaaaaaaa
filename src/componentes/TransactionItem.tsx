import React from 'react';
import { View, Text } from 'react-native';
import { cores } from '../tema/cores';

type TransactionItemProps = {
  titulo: string;
  legenda: string;
  quantidade: number;
  tipo: 'credito' | 'debito';
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  titulo,
  legenda,
  quantidade,
  tipo,
}) => {
  const isCredit = tipo === 'credito';
  const sign = isCredit ? '+' : '-';
  const cor = isCredit ? cores.sucesso : cores.perigo;

  return (
    <View className="flex-row items-center justify-between py-3">
      <View>
        <Text className="text-textoPrimario font-medium">{titulo}</Text>
        <Text className="text-textoMuted text-xs mt-0.5">{legenda}</Text>
      </View>
      <Text style={{ color: cor }} className="font-semibold">
        {sign} {Math.abs(quantidade).toFixed(2)}
      </Text>
    </View>
  );
};
