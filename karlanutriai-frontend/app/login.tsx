import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import InputField from "../components/ui/InputField";
import TouchButton from "../components/ui/TouchButton";

const Login = () => {
  const router = useRouter();

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

        <InputField placeholder="E-mail" />
        <InputField placeholder="Senha" secureTextEntry={true} />

        <TouchButton onPress={() => replacePath("home")} text="Logar" />
        <TouchButton onPress={() => replacePath("welcome")} text="Voltar" />
      </View>
    </View>
  );
};

export default Login;
