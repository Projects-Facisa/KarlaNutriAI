import React from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import TouchButton from "../components/ui/TouchButton";
import "../global.css";

const Home = () => {
  const router = useRouter();

  const replacePath = (path: any): void => {
    router.replace(path);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <TouchButton onPress={() => replacePath("welcome")} text="Voltar" />
      <TouchButton
        onPress={() => replacePath("(tabs)/suporte")}
        text="Suporte"
      />
      <TouchButton onPress={() => replacePath("(tabs)/card")} text="Card" />
    </View>
  );
};

export default Home;
