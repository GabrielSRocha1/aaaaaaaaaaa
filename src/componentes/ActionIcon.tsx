import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type ActionIconProps = {
  label: string;
  onPress?: () => void;
};

export const ActionIcon: React.FC<ActionIconProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="items-center mx-2"
      activeOpacity={0.8}
    >
      <TouchableOpacity className="w-14 h-14 rounded-full bg-primario items-center justify-center mb-1">
        {/* Substituir pelo ícone de src/assets */}
        <Text className="text-fundo font-bold">{label.charAt(0)}</Text>
      </TouchableOpacity>
      <Text className="text-textoPrimario text-xs">{label}</Text>
    </TouchableOpacity>
  );
};

