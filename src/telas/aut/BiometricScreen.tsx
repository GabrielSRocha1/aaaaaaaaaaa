import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as LocalAuthentication from 'expo-local-authentication';
import { CustomButton } from '../../componentes/CustomButton';

type BiometricScreenProps = {
  navigation: any;
};

export const BiometricScreen = ({ navigation }: BiometricScreenProps) => {
  const [isSupported, setIsSupported] = useState(false);
  const [biometricType, setBiometricType] = useState<string>('');

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsSupported(compatible);

    if (compatible) {
      const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
        setBiometricType('Face ID');
      } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        setBiometricType('Fingerprint');
      } else {
        setBiometricType('Biometric');
      }
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Autentique usando ${biometricType}`,
        fallbackLabel: 'Usar senha',
        cancelLabel: 'Cancelar',
      });

      if (result.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      }
    } catch (error) {
      console.error('Erro na autenticação biométrica:', error);
    }
  };

  const skipBiometric = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-fundo">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-5 pt-12 items-center justify-center">
        <View className="mb-8">
          <View className="w-24 h-24 rounded-full bg-primario items-center justify-center mb-6">
            <Text className="text-5xl">👆</Text>
          </View>
          <Text className="text-textoPrimario text-3xl font-bold text-center mb-4">
            Autenticação Biométrica
          </Text>
          <Text className="text-textoMuted text-base text-center mb-2">
            {isSupported
              ? `Configure ${biometricType} para um acesso rápido e seguro`
              : 'Seu dispositivo não suporta autenticação biométrica'}
          </Text>
        </View>

        {isSupported && (
          <View className="w-full mb-6">
            <CustomButton
              title={`Usar ${biometricType}`}
              onPress={handleBiometricAuth}
              variant="primary"
            />
          </View>
        )}

        <TouchableOpacity onPress={skipBiometric} activeOpacity={0.7}>
          <Text className="text-textoMuted text-base">Pular por enquanto</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
