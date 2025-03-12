import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputFieldProps extends TextInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const InputField = ({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  ...rest
}: InputFieldProps) => (
  <TextInput
    className="text-2xl border border-[#4CAF50] rounded-lg w-[300] p-2 my-1"
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    value={value}
    onChangeText={onChangeText}
    {...rest}
  />
);

export default InputField;
