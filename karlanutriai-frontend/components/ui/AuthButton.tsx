import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface AuthButtonProps {
  onPress?: () => void;
  text: string;
  disabled?: boolean;
  className?: string;
}

const AuthButton = ({ onPress, text, disabled = false }: AuthButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    className={`w-[300px] p-2 my-1 rounded-lg border border-[#313338] ${
      disabled ? "bg-gray-600 opacity-50" : "bg-transparent"
    }`}
  >
    <Text className="text-[#F5F5F5] text-2xl text-center">{text}</Text>
  </TouchableOpacity>
);

export default AuthButton;
