import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBankingStore, CryptoType } from '../../ganchos/useBankingStore';
import { CustomButton } from '../../componentes/CustomButton';
import { cryptoApi, convertUSDtoBRL } from '../../servicos/api';

type TransferStartScreenProps = {
  navigation: any;
  route?: {
    params?: {
      tipo?: 'deposito' | 'saque';
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

const cryptos: CryptoType[] = ['BTC', 'ETH', 'USDT', 'BNB', 'ADA', 'SOL', 'XRP', 'DOGE'];

export const TransferStartScreen = ({ navigation, route }: TransferStartScreenProps) => {
  const { saldo, addTransaction, addCryptoHolding, updateCryptoPrice } = useBankingStore();
  const [tipo, setTipo] = useState<'deposito' | 'saque'>(route?.params?.tipo || 'deposito');
  const [cryptoSelecionada, setCryptoSelecionada] = useState<CryptoType>('BTC');
  const [valor, setValor] = useState('');
  const [loading, setLoading] = useState(false);
  const [precoAtual, setPrecoAtual] = useState<number>(0);
  const [variacao24h, setVariacao24h] = useState<number>(0);

  React.useEffect(() => {
    loadCryptoPrice();
  }, [cryptoSelecionada]);

  const loadCryptoPrice = async () => {
    try {
      const data = await cryptoApi.getCryptoPrice(cryptoSelecionada);
      const priceBRL = convertUSDtoBRL(data.current_price);
      setPrecoAtual(priceBRL);
      setVariacao24h(data.price_change_percentage_24h || 0);
    } catch (error) {
      console.error('Erro ao carregar preço:', error);
    }
  };

  const handleContinue = () => {
    const valorNum = parseFloat(valor);
    if (!valorNum || valorNum <= 0) {
      return;
    }

    navigation.navigate('TransferConfirm', {
      tipo,
      crypto: cryptoSelecionada,
      valor: valorNum,
      precoCrypto: precoAtual,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getQuantidadeCrypto = () => {
    const valorNum = parseFloat(valor);
    if (!valorNum || !precoAtual) return 0;
    return valorNum / precoAtual;
  };

  return (
    <SafeAreaView className="flex-1 bg-fundo">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1 px-5 pt-4">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-textoPrimario text-2xl font-bold">
            {tipo === 'deposito' ? 'Depositar' : 'Sacar'}
          </Text>
        </View>

        <View className="flex-row mb-6">
          <TouchableOpacity
            className={`flex-1 py-3 px-4 rounded-xl mr-2 ${
              tipo === 'deposito' ? 'bg-primario' : 'bg-superficie border border-borda'
            }`}
            onPress={() => setTipo('deposito')}
            activeOpacity={0.7}
          >
            <Text
              className={`text-center font-semibold ${tipo === 'deposito' ? 'text-fundo' : 'text-textoPrimario'}`}
            >
              Depositar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 px-4 rounded-xl ml-2 ${
              tipo === 'saque' ? 'bg-primario' : 'bg-superficie border border-borda'
            }`}
            onPress={() => setTipo('saque')}
            activeOpacity={0.7}
          >
            <Text
              className={`text-center font-semibold ${tipo === 'saque' ? 'text-fundo' : 'text-textoPrimario'}`}
            >
              Sacar
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <Text className="text-textoPrimario text-sm mb-3 font-semibold">Selecione a Criptomoeda</Text>
          <FlatList
            horizontal
            data={cryptos}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`mr-3 py-3 px-6 rounded-xl border-2 ${
                  cryptoSelecionada === item
                    ? 'bg-primario border-primario'
                    : 'bg-superficie border-borda'
                }`}
                onPress={() => setCryptoSelecionada(item)}
                activeOpacity={0.7}
              >
                <Text
                  className={`text-xl mb-1 text-center ${
                    cryptoSelecionada === item ? 'text-fundo' : 'text-textoPrimario'
                  }`}
                >
                  {cryptoIcons[item]}
                </Text>
                <Text
                  className={`text-xs text-center font-semibold ${
                    cryptoSelecionada === item ? 'text-fundo' : 'text-textoPrimario'
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {precoAtual > 0 && (
          <View className="bg-superficie rounded-xl p-4 mb-6 border border-borda">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-textoMuted text-sm">Preço Atual</Text>
              <Text className="text-textoPrimario text-base font-semibold">
                {formatCurrency(precoAtual)}
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-textoMuted text-sm">Variação 24h</Text>
              <Text
                className="text-base font-semibold"
                style={{ color: variacao24h >= 0 ? '#22C55E' : '#EF4444' }}
              >
                {formatPercentage(variacao24h)}
              </Text>
            </View>
          </View>
        )}

        <View className="mb-6">
          <Text className="text-textoPrimario text-sm mb-3 font-semibold">Valor em BRL</Text>
          <TextInput
            className="bg-superficie border border-borda rounded-xl px-4 py-4 text-textoPrimario text-2xl font-bold mb-2"
            placeholder="0,00"
            placeholderTextColor="#A1A1AA"
            value={valor}
            onChangeText={setValor}
            keyboardType="decimal-pad"
          />
          {valor && precoAtual > 0 && (
            <Text className="text-textoMuted text-sm">
              ≈ {getQuantidadeCrypto().toFixed(8)} {cryptoSelecionada}
            </Text>
          )}
        </View>

        <View className="bg-superficie rounded-xl p-4 mb-6 border border-borda">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-textoMuted text-sm">Saldo Disponível</Text>
            <Text className="text-textoPrimario text-base font-semibold">
              {formatCurrency(saldo)}
            </Text>
          </View>
        </View>

        <View className="mb-8">
          <CustomButton
            title="Continuar"
            onPress={handleContinue}
            variant="primary"
            disabled={!valor || parseFloat(valor) <= 0 || (tipo === 'saque' && parseFloat(valor) > saldo)}
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

