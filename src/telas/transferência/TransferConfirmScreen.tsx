import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBankingStore, CryptoType } from '../../ganchos/useBankingStore';
import { CustomButton } from '../../componentes/CustomButton';

type TransferConfirmScreenProps = {
  navigation: any;
  route: {
    params: {
      tipo: 'deposito' | 'saque';
      crypto: CryptoType;
      valor: number;
      precoCrypto: number;
    };
  };
};

const cryptoIcons: Record<CryptoType, string> = {
  BTC: '₿',
  ETH: 'Ξ',
  USDT: '₮',
  BNB: 'B',
  ADA: '₳',
  SOL: '◎',
  XRP: '✕',
  DOGE: 'Ð',
};

export const TransferConfirmScreen = ({ navigation, route }: TransferConfirmScreenProps) => {
  const { tipo, crypto, valor, precoCrypto } = route.params;
  const { addTransaction, addCryptoHolding, setBalance, saldo } = useBankingStore();
  const [loading, setLoading] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getQuantidadeCrypto = () => {
    return valor / precoCrypto;
  };

  const handleConfirm = () => {
    setLoading(true);

    // Simular processamento
    setTimeout(() => {
      const quantidade = getQuantidadeCrypto();
      const valorTransacao = tipo === 'deposito' ? valor : -valor;

      // Adicionar transação
      addTransaction({
        id: Date.now().toString(),
        titulo: `${tipo === 'deposito' ? 'Depósito' : 'Saque'} de ${crypto}`,
        legenda: `Hoje • ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
        quantidade: valorTransacao,
        tipo: tipo === 'deposito' ? 'credito' : 'debito',
        data: new Date().toISOString(),
        crypto,
        precoCrypto,
      });

      // Atualizar saldo
      setBalance(saldo + valorTransacao);

      // Se for depósito, adicionar/atualizar holding
      if (tipo === 'deposito') {
        addCryptoHolding(crypto, quantidade, valor);
      }

      setLoading(false);
      navigation.navigate('MainTabs', { screen: 'Home' });
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-fundo">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1 px-5 pt-4">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-textoPrimario text-2xl font-bold">Confirmar Transação</Text>
        </View>

        <View className="bg-superficie rounded-cartao p-6 mb-6 border border-borda items-center">
          <View className="w-20 h-20 rounded-full bg-primario items-center justify-center mb-4">
            <Text className="text-4xl">{cryptoIcons[crypto]}</Text>
          </View>
          <Text className="text-textoPrimario text-xl font-bold mb-1">{crypto}</Text>
          <Text
            className={`text-2xl font-bold mb-4 ${tipo === 'deposito' ? 'text-sucesso' : 'text-perigo'}`}
          >
            {tipo === 'deposito' ? '+' : '-'}
            {formatCurrency(valor)}
          </Text>
          <Text className="text-textoMuted text-sm">
            {getQuantidadeCrypto().toFixed(8)} {crypto}
          </Text>
        </View>

        <View className="bg-superficie rounded-xl p-4 mb-4 border border-borda">
          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-borda">
            <Text className="text-textoMuted text-sm">Tipo de Transação</Text>
            <Text className="text-textoPrimario text-base font-semibold">
              {tipo === 'deposito' ? 'Depósito' : 'Saque'}
            </Text>
          </View>
          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-borda">
            <Text className="text-textoMuted text-sm">Criptomoeda</Text>
            <Text className="text-textoPrimario text-base font-semibold">{crypto}</Text>
          </View>
          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-borda">
            <Text className="text-textoMuted text-sm">Valor</Text>
            <Text className="text-textoPrimario text-base font-semibold">
              {formatCurrency(valor)}
            </Text>
          </View>
          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-borda">
            <Text className="text-textoMuted text-sm">Quantidade</Text>
            <Text className="text-textoPrimario text-base font-semibold">
              {getQuantidadeCrypto().toFixed(8)} {crypto}
            </Text>
          </View>
          <View className="flex-row items-center justify-between mb-3 pb-3 border-b border-borda">
            <Text className="text-textoMuted text-sm">Preço Unitário</Text>
            <Text className="text-textoPrimario text-base font-semibold">
              {formatCurrency(precoCrypto)}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-textoMuted text-sm">Novo Saldo</Text>
            <Text className="text-primario text-base font-semibold">
              {formatCurrency(saldo + (tipo === 'deposito' ? valor : -valor))}
            </Text>
          </View>
        </View>

        <View className="mb-8">
          <CustomButton
            title="Confirmar Transação"
            onPress={handleConfirm}
            variant="primary"
            loading={loading}
          />
          <View className="mt-4">
            <CustomButton
              title="Cancelar"
              onPress={() => navigation.goBack()}
              variant="outline"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

