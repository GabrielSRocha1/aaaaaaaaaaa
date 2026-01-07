import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransferStartScreen } from '../telas/transferência/TransferStartScreen';
import { TransferConfirmScreen } from '../telas/transferência/TransferConfirmScreen';
import { PaymentsScreen } from '../telas/PaymentsScreen';

export type TransferStackParamList = {
  TransferStart: { tipo?: 'deposito' | 'saque' } | undefined;
  TransferConfirm: {
    tipo: 'deposito' | 'saque';
    crypto: string;
    valor: number;
    precoCrypto: number;
  };
  Payments: undefined;
};

const Stack = createNativeStackNavigator<TransferStackParamList>();

export const TransferStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="TransferStart" component={TransferStartScreen} />
      <Stack.Screen name="TransferConfirm" component={TransferConfirmScreen} />
      <Stack.Screen name="Payments" component={PaymentsScreen} />
    </Stack.Navigator>
  );
};

