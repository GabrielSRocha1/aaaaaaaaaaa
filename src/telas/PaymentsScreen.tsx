import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../componentes/CustomButton';
import { useBankingStore } from '../ganchos/useBankingStore';

type PaymentsScreenProps = {
  navigation: any;
};

type PaymentMethod = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

const paymentMethods: PaymentMethod[] = [
  { id: '1', name: 'PIX', icon: '⚡', description: 'Transferência instantânea' },
  { id: '2', name: 'Boleto', icon: '📄', description: 'Pagamento via boleto' },
  { id: '3', name: 'Cartão', icon: '💳', description: 'Cartão de crédito/débito' },
  { id: '4', name: 'Crypto', icon: '₿', description: 'Pagar com criptomoedas' },
];

export const PaymentsScreen = ({ navigation }: PaymentsScreenProps) => {
  const { saldo } = useBankingStore();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [valor, setValor] = useState('');
  const [beneficiario, setBeneficiario] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handlePayment = () => {
    // Processar pagamento
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-fundo">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1 px-5 pt-4">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-textoPrimario text-2xl font-bold">Pagamentos</Text>
        </View>

        <View className="mb-6">
          <Text className="text-textoPrimario text-sm mb-3 font-semibold">Método de Pagamento</Text>
          <FlatList
            horizontal
            data={paymentMethods}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`mr-3 py-4 px-6 rounded-xl border-2 min-w-[100px] items-center ${
                  selectedMethod === item.id
                    ? 'bg-primario border-primario'
                    : 'bg-superficie border-borda'
                }`}
                onPress={() => setSelectedMethod(item.id)}
                activeOpacity={0.7}
              >
                <Text className="text-3xl mb-2">{item.icon}</Text>
                <Text
                  className={`text-sm font-semibold mb-1 ${
                    selectedMethod === item.id ? 'text-fundo' : 'text-textoPrimario'
                  }`}
                >
                  {item.name}
                </Text>
                <Text
                  className={`text-xs text-center ${
                    selectedMethod === item.id ? 'text-fundo opacity-80' : 'text-textoMuted'
                  }`}
                >
                  {item.description}
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View className="mb-6">
          <Text className="text-textoPrimario text-sm mb-3 font-semibold">Beneficiário</Text>
          <TextInput
            className="bg-superficie border border-borda rounded-xl px-4 py-4 text-textoPrimario text-base"
            placeholder="Nome do beneficiário"
            placeholderTextColor="#A1A1AA"
            value={beneficiario}
            onChangeText={setBeneficiario}
          />
        </View>

        <View className="mb-6">
          <Text className="text-textoPrimario text-sm mb-3 font-semibold">Valor</Text>
          <TextInput
            className="bg-superficie border border-borda rounded-xl px-4 py-4 text-textoPrimario text-2xl font-bold mb-2"
            placeholder="0,00"
            placeholderTextColor="#A1A1AA"
            value={valor}
            onChangeText={setValor}
            keyboardType="decimal-pad"
          />
        </View>

        <View className="bg-superficie rounded-xl p-4 mb-6 border border-borda">
          <View className="flex-row items-center justify-between">
            <Text className="text-textoMuted text-sm">Saldo Disponível</Text>
            <Text className="text-textoPrimario text-base font-semibold">
              {formatCurrency(saldo)}
            </Text>
          </View>
        </View>

        <View className="mb-8">
          <CustomButton
            title="Confirmar Pagamento"
            onPress={handlePayment}
            variant="primary"
            disabled={!selectedMethod || !valor || !beneficiario || parseFloat(valor) > saldo}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

