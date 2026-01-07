import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { useBankingStore } from '../../ganchos/useBankingStore';
import { BalanceCard } from '../../componentes/BalanceCard';
import { ActionIcon } from '../../componentes/ActionIcon';
import { TransactionItem } from '../../componentes/TransactionItem';
import { CustomButton } from '../../componentes/CustomButton';

const HomeScreen = () => {
  const { transacoes, nomeUsuario } = useBankingStore();

  const handlePix = () => {
    // Navegue até TransferStack > Tela Pix/Transferência
  };

  const handlePay = () => {
    // navegar até a tela de pagamento
  };

  const handleTransfer = () => {
    // navegar até TransferStack
  };

  return (
    <SafeAreaView className="flex-1 bg-fundo">
      <View className="flex-1 px-5 pt-6">
        {/* Cabeçalho */}
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-textoMuted">Boa tarde</Text>
            <Text className="text-textoPrimario text-xl font-semibold">Seu Banco</Text>
          </View>
          {/* Espaço reservado para avatar */}
          <View className="w-9 h-9 rounded-full bg-primario items-center justify-center">
            <Text className="text-fundo font-bold">{nomeUsuario.charAt(0).toUpperCase()}</Text>
          </View>
        </View>

        {/* Cartão de Saldo */}
        <BalanceCard />

        {/* Ícones de ação: Pix, Pagar, Transferir */}
        <View className="flex-row justify-between mt-6">
          <ActionIcon label="Pix" onPress={handlePix} />
          <ActionIcon label="Pagar" onPress={handlePay} />
          <ActionIcon label="Transferir" onPress={handleTransfer} />
        </View>

        {/* Botão CTA (ex.: "Nova Pix") */}
        <CustomButton title="Nova Pix" onPress={handlePix} />

        {/* Lista de Transações */}
        <View className="mt-6 flex-1">
          <Text className="text-textoPrimario font-semibold mb-2">Atividade recente</Text>
          <FlatList
            data={transacoes}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View className="border-b border-zinc-800" />
            )}
            renderItem={({ item }) => (
              <TransactionItem
                titulo={item.titulo}
                legenda={item.legenda}
                quantidade={item.quantidade}
                tipo={item.tipo}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
