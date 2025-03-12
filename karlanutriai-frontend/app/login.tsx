import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import InputField from "../components/ui/InputField";
import TouchButton from "../components/ui/TouchButton";
import "../global.css";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const replacePath = (path: any): void => {
    router.replace(path);
  };
  return (
    <View className="flex-1 justify-center align-center">
      <View className="bg-[rgba(0, 0, 0, 0.00)] p-[20px] rounded-lg items-center">
        <MaterialCommunityIcons
          name="food-apple-outline"
          size={100}
          color="#4CAF50"
          margin={5}
        />
        <Text className="text-4xl font-bold mb-[10px]">Entrar agora</Text>
        <InputField
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchButton onPress={() => replacePath("home")} text="Logar" />
        <TouchButton onPress={() => replacePath("welcome")} text="Voltar" />
      </View>
    </View>
  );
};

export default Login;
