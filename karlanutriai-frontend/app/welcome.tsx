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
    <View className="flex-1 justify-center align-center bg-[#313338]">
      <View className="bg-[rgba(0, 0, 0, 0.00)] p-[20] rounded-lg items-center">
        <MaterialCommunityIcons
          name="food-apple-outline"
          size={150}
          color="#c33c41"
          margin={5}
        />
        <Text className="text-4xl font-bold text-[#F5F5F5]">Bem-vindo ao </Text>
        <Text className="text-2xl m-[15] text-[#F5F5F5]">KarlaNutriAI</Text>

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
