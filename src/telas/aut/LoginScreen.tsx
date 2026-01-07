import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../../componentes/CustomButton';

type LoginScreenProps = {
  navigation: any;
};

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simular login
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Biometric');
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-fundo">
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-5 pt-12">
          <View className="mb-12">
            <Text className="text-primario text-5xl mb-4">₿</Text>
            <Text className="text-textoPrimario text-3xl font-bold mb-2">
              Bem-vindo de volta
            </Text>
            <Text className="text-textoMuted text-base">
              Entre na sua conta para continuar
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-textoPrimario text-sm mb-2 font-semibold">E-mail</Text>
            <TextInput
              className="bg-superficie border border-borda rounded-xl px-4 py-4 text-textoPrimario text-base"
              placeholder="seu@email.com"
              placeholderTextColor="#A1A1AA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View className="mb-8">
            <Text className="text-textoPrimario text-sm mb-2 font-semibold">Senha</Text>
            <TextInput
              className="bg-superficie border border-borda rounded-xl px-4 py-4 text-textoPrimario text-base"
              placeholder="••••••••"
              placeholderTextColor="#A1A1AA"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View className="mb-6">
            <CustomButton
              title="Entrar"
              onPress={handleLogin}
              variant="primary"
              loading={loading}
              disabled={!email || !senha}
            />
          </View>

          <Text
            className="text-primario text-center text-sm"
            onPress={() => {
              /* Esqueci minha senha */
            }}
          >
            Esqueci minha senha
          </Text>

          <View className="mt-auto mb-6">
            <Text className="text-textoMuted text-center text-sm">
              Não tem uma conta?{' '}
              <Text className="text-primario" onPress={() => {}}>
                Cadastre-se
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

