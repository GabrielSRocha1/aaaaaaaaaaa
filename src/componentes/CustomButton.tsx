import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type CustomButtonProps = TouchableOpacityProps & {
  title: string;
};

export const CustomButton: React.FC<CustomButtonProps> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="w-full py-3 rounded-full bg-primario items-center justify-center mt-4"
      {...rest}
    >
      <Text className="text-fundo font-semibold text-base">{title}</Text>
    </TouchableOpacity>
  );
};

