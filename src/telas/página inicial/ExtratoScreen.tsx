import React, { useState } from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBankingStore } from '../../ganchos/useBankingStore';
import { TransactionItem } from '../../componentes/TransactionItem';

type ExtratoScreenProps = {
  navigation: any;
};

type FilterType = 'all' | 'credito' | 'debito';

export const ExtratoScreen = ({ navigation }: ExtratoScreenProps) => {
  const { transacoes } = useBankingStore();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTransactions = transacoes.filter((tx) => {
    if (filter === 'all') return true;
    return tx.tipo === filter;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getTotalByType = (type: 'credito' | 'debito') => {
    return transacoes
      .filter((tx) => tx.tipo === type)
      .reduce((sum, tx) => sum + tx.quantidade, 0);
  };

  return (
    <SafeAreaView className="flex-1 bg-fundo">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-5 pt-4">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-textoPrimario text-2xl font-bold">Extrato</Text>
        </View>

        <View className="flex-row mb-6">
          <TouchableOpacity
            className={`flex-1 py-3 px-4 rounded-xl mr-2 ${
              filter === 'all' ? 'bg-primario' : 'bg-superficie border border-borda'
            }`}
            onPress={() => setFilter('all')}
            activeOpacity={0.7}
          >
            <Text
              className={`text-center font-semibold ${filter === 'all' ? 'text-fundo' : 'text-textoPrimario'}`}
            >
              Todas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 px-4 rounded-xl mr-2 ${
              filter === 'credito' ? 'bg-primario' : 'bg-superficie border border-borda'
            }`}
            onPress={() => setFilter('credito')}
            activeOpacity={0.7}
          >
            <Text
              className={`text-center font-semibold ${filter === 'credito' ? 'text-fundo' : 'text-textoPrimario'}`}
            >
              Entradas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 px-4 rounded-xl ${
              filter === 'debito' ? 'bg-primario' : 'bg-superficie border border-borda'
            }`}
            onPress={() => setFilter('debito')}
            activeOpacity={0.7}
          >
            <Text
              className={`text-center font-semibold ${filter === 'debito' ? 'text-fundo' : 'text-textoPrimario'}`}
            >
              Saídas
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row mb-6">
          <View className="flex-1 bg-superficie rounded-xl p-4 mr-2 border border-borda">
            <Text className="text-textoMuted text-xs mb-1">Total Entradas</Text>
            <Text className="text-sucesso text-lg font-bold">
              {formatCurrency(getTotalByType('credito'))}
            </Text>
          </View>
          <View className="flex-1 bg-superficie rounded-xl p-4 ml-2 border border-borda">
            <Text className="text-textoMuted text-xs mb-1">Total Saídas</Text>
            <Text className="text-perigo text-lg font-bold">
              {formatCurrency(getTotalByType('debito'))}
            </Text>
          </View>
        </View>

        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="bg-superficie rounded-xl p-6 border border-borda items-center mt-4">
              <Text className="text-textoMuted text-base text-center">
                Nenhuma transação encontrada
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

