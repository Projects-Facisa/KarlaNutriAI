import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import "../../global.css";
import * as SecureStore from "expo-secure-store";

export default function Settings() {
  const router = useRouter();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    router.replace("/welcome");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#313338]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="flex-1 w-full"
      >
        <View className="px-4">
          <Text className="text-2xl font-bold mb-4 self-center text-[#F5F5F5]">
            Configurações
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/userProfile")}
            className="border-2 border-[#1e1f22] rounded-md p-4 my-1 w-full items-center"
          >
            <Text className="text-xl font-bold mb-2 text-[#F5F5F5]">
              Perfil do Usuário
            </Text>
            <Text className="text-[#F5F5F5]">
              Toque para ver/editar seu perfil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/userCard")}
            className="border-2 border-[#1e1f22] rounded-md p-4 my-1 w-full items-center"
          >
            <Text className="text-xl font-bold mb-2 text-[#F5F5F5]">
              Dados do Card
            </Text>
            <Text className="text-[#F5F5F5]">
              Toque para ver/editar os dados do seu card
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/contactForm")}
            className="border-2 border-[#1e1f22] rounded-md p-4 my-1 w-full items-center"
          >
            <Text className="text-xl font-bold mb-2 text-[#F5F5F5]">
              Suporte
            </Text>
            <Text className="text-[#F5F5F5]">
              Entre em contato com o suporte técnico
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} className="p-4 items-center">
            <Text className="text-[#F5F5F5]">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
