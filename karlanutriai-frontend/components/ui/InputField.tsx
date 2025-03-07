import React from "react";
import { TextInput } from "react-native";

interface InputFieldProps {
  placeholder: string;
  secureTextEntry?: boolean;
}

const InputField = ({
  placeholder,
  secureTextEntry = false,
}: InputFieldProps) => (
  <TextInput
    className="text-2xl text-[#4CAF50] border-2 border-[#4CAF50] rounded-lg w-[300px] p-2 my-1"
    placeholderTextColor="#4CAF50"
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
  />
);

export default InputField;
