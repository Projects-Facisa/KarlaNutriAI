import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface TouchButtonProps {
  onPress: () => void;
  text: string;
}

const TouchButton = ({ onPress, text }: TouchButtonProps) => (
  <TouchableOpacity onPress={onPress}>
    <Text className="text-white bg-[#4CAF50] w-[300px] text-center p-2 my-1 rounded-lg text-2xl">
      {text}
    </Text>
  </TouchableOpacity>
);

export default TouchButton;
