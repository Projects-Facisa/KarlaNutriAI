import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavigation from "@/components/ui/BottomNavigation";
import InputField from "@/components/ui/InputField";
import TouchButton from "@/components/ui/TouchButton";
import "../../global.css";

const Support = () => {
  const router = useRouter();
  const [tipoProblema, setTipoProblema] = useState<"aplicativo" | "conta">(
    "aplicativo"
  );
  const [descricao, setDescricao] = useState("");
  const replacePath = (path: any): void => {
    router.replace(path);
  };
  const handleSubmit = async () => {
    if (!descricao) {
      Alert.alert("Atenção", "Informe a descrição do problema.");
      return;
    }
    Alert.alert("Sucesso", "Formulário enviado com sucesso!");
    setDescricao("");
    replacePath("home");
  };
  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex-1 p-4 ">
        <Text className="text-2xl text-center font-bold mb-4">Suporte</Text>
        <Text className="mb-1 text-center">Tipo de Problema</Text>
        <View className="flex-row mb-4">
          <TouchableOpacity
            onPress={() => setTipoProblema("aplicativo")}
            className={`flex-1 p-3 border rounded-md mr-2 ${
              tipoProblema === "aplicativo"
                ? "border-green-500"
                : "border-gray-300"
            }`}
          >
            <Text className="text-center">Aplicativo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTipoProblema("conta")}
            className={`flex-1 p-3 border rounded-md ${
              tipoProblema === "conta" ? "border-green-500" : "border-gray-300"
            }`}
          >
            <Text className="text-center">Conta</Text>
          </TouchableOpacity>
        </View>
        <InputField
          placeholder="Descreva seu problema..."
          value={descricao}
          onChangeText={setDescricao}
          multiline={true}
          numberOfLines={4}
        />
        <TouchButton onPress={handleSubmit} text="Enviar" />
      </View>
      <BottomNavigation
        items={[
          {
            id: 1,
            icon: (
              <MaterialCommunityIcons name="home" size={30} color="#4CAF50" />
            ),
            onPress: () => replacePath("home"),
          },
          {
            id: 2,
            icon: (
              <MaterialCommunityIcons
                name="chat-processing"
                size={30}
                color="#4CAF50"
              />
            ),
            onPress: () => replacePath("home"),
          },
          {
            id: 3,
            icon: (
              <MaterialCommunityIcons
                name="food-fork-drink"
                size={30}
                color="#4CAF50"
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
                color="#4CAF50"
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
                color="#4CAF50"
              />
            ),
            onPress: () => replacePath("(tabs)/support"),
          },
        ]}
        activeItem={5}
      />
    </View>
  );
};

export default Support;
