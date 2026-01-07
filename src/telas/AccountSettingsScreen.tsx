import React, { useState } from 'react';
import { View, Text, ScrollView, StatusBar, TextInput, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBankingStore } from '../ganchos/useBankingStore';
import { CustomButton } from '../componentes/CustomButton';

type AccountSettingsScreenProps = {
  navigation: any;
};

export const AccountSettingsScreen = ({ navigation }: AccountSettingsScreenProps) => {
  const { nomeUsuario } = useBankingStore();
  const [nome, setNome] = useState(nomeUsuario);
  const [email, setEmail] = useState('crypto.banking@email.com');
  const [telefone, setTelefone] = useState('+55 (11) 99999-9999');
  const [notificacoes, setNotificacoes] = useState(true);
  const [biometrica, setBiometrica] = useState(true);
  const [autenticacao2fa, setAutenticacao2fa] = useState(false);

  const handleSave = () => {
    // Salvar configurações
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-fundo">
      <StatusBar barStyle="light-content" />
      <ScrollView className="flex-1 px-5 pt-4">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-textoPrimario text-2xl font-bold">Configurações da Conta</Text>
        </View>

        <View className="mb-6">
          <Text className="text-textoPrimario text-lg font-semibold mb-4">Dados Pessoais</Text>
          
          <View className="mb-4">
            <Text className="text-textoPrimario text-sm mb-2 font-semibold">Nome</Text>
            <TextInput
              className="bg-superficie border border-borda rounded-xl px-4 py-4 text-textoPrimario text-base"
              placeholder="Seu nome"
              placeholderTextColor="#A1A1AA"
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View className="mb-4">
            <Text className="text-textoPrimario text-sm mb-2 font-semibold">E-mail</Text>
            <TextInput
              className="bg-superficie border border-borda rounded-xl px-4 py-4 text-textoPrimario text-base"
              placeholder="seu@email.com"
              placeholderTextColor="#A1A1AA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-4">
            <Text className="text-textoPrimario text-sm mb-2 font-semibold">Telefone</Text>
            <TextInput
              className="bg-superficie border border-borda rounded-xl px-4 py-4 text-textoPrimario text-base"
              placeholder="+55 (11) 99999-9999"
              placeholderTextColor="#A1A1AA"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-textoPrimario text-lg font-semibold mb-4">Segurança</Text>
          
          <View className="bg-superficie rounded-xl p-4 mb-3 border border-borda flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-textoPrimario text-base font-semibold mb-1">
                Notificações
              </Text>
              <Text className="text-textoMuted text-sm">
                Receber notificações de transações
              </Text>
            </View>
            <Switch
              value={notificacoes}
              onValueChange={setNotificacoes}
              trackColor={{ false: '#27272A', true: '#FFD700' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View className="bg-superficie rounded-xl p-4 mb-3 border border-borda flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-textoPrimario text-base font-semibold mb-1">
                Autenticação Biométrica
              </Text>
              <Text className="text-textoMuted text-sm">
                Usar Face ID ou impressão digital
              </Text>
            </View>
            <Switch
              value={biometrica}
              onValueChange={setBiometrica}
              trackColor={{ false: '#27272A', true: '#FFD700' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View className="bg-superficie rounded-xl p-4 mb-3 border border-borda flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-textoPrimario text-base font-semibold mb-1">
                Autenticação 2FA
              </Text>
              <Text className="text-textoMuted text-sm">
                Autenticação de dois fatores
              </Text>
            </View>
            <Switch
              value={autenticacao2fa}
              onValueChange={setAutenticacao2fa}
              trackColor={{ false: '#27272A', true: '#FFD700' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View className="mb-8">
          <CustomButton title="Salvar Alterações" onPress={handleSave} variant="primary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

