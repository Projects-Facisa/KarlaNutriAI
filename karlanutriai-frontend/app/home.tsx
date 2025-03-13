import React from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import TouchButton from "../components/ui/TouchButton";
import "../global.css";
import BottomNavigation from "../components/ui/BottomNavigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Home = () => {
  const router = useRouter();

  const replacePath = (path: any): void => {
    router.replace(path);
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#313338]">
      <TouchButton onPress={() => replacePath("welcome")} text="Voltar" />
      <BottomNavigation
        items={[
          {
            id: 1,
            icon: (
              <MaterialCommunityIcons name="home" size={30} color="#5d6af0" />
            ),
            onPress: () => replacePath("home"),
          },
          {
            id: 2,
            icon: (
              <MaterialCommunityIcons
                name="chat-processing"
                size={30}
                color="#5d6af0"
              />
            ),
            onPress: () => replacePath("(tabs)/chat"),
          },
          {
            id: 3,
            icon: (
              <MaterialCommunityIcons
                name="food-fork-drink"
                size={30}
                color="#5d6af0"
              />
            ),
            onPress: () => replacePath("home"),
          },
          {
            id: 4,
            icon: (
              <MaterialCommunityIcons
                name="account"
                size={30}
                color="#5d6af0"
              />
            ),
            onPress: () => replacePath("(tabs)/userCard"),
          },

          {
            id: 5,
            icon: (
              <MaterialCommunityIcons
                name="account"
                size={30}
                color="#5d6af0"
              />
            ),
            onPress: () => replacePath("(tabs)/support"),
          },
        ]}
        activeItem={1}
      />
    </View>
  );
};

export default Home;
