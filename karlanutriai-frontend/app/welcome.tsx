import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import InputField from "../components/ui/InputField";
import TouchButton from "../components/ui/TouchButton";
import "../global.css";

const Welcome = () => {
  const router = useRouter();

  const replacePath = (path: any): void => {
    router.replace(path);
  };

  return (
    <View className="flex-1 justify-center align-center">
      <View className="bg-[rgba(0, 0, 0, 0.00)] p-[20] rounded-lg items-center">
        <MaterialCommunityIcons
          name="food-apple-outline"
          size={200}
          color="#4CAF50"
          margin={5}
        />
        <Text className="text-4xl font-bold">Bem-vindo ao </Text>
        <Text className="text-2xl m-[15]">KarlaNutriAI</Text>

        <InputField placeholder="Email" />
        <InputField placeholder="Senha" secureTextEntry={true} />

        <TouchButton onPress={() => replacePath("login")} text="Logar" />
        <TouchButton
          onPress={() => replacePath("register")}
          text="Registrar-se"
        />
      </View>
    </View>
  );
};

export default Welcome;
