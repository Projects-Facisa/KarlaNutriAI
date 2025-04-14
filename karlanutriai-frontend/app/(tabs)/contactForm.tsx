// app/contact.tsx
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import InputField from "@/components/ui/InputField";
import TouchButton from "@/components/ui/TouchButton";
import "@/global.css";

export default function ContactForm() {
  const router = useRouter();
  const [tipoProblema, setTipoProblema] = useState<"aplicativo" | "conta">(
    "aplicativo"
  );
  const [descricao, setDescricao] = useState("");

  const handleSubmit = async () => {
    if (!descricao) {
      Alert.alert("Atenção", "Informe a descrição do problema.");
      return;
    }
    Alert.alert("Sucesso", "Formulário enviado com sucesso!");
    setDescricao("");
    // Após o envio, volta para a tela anterior
    router.back();
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#313338]">
      <View className="flex-1 justify-center p-4">
        <Text className="text-2xl text-center font-bold mb-4 text-[#F5F5F5]">
          Suporte
        </Text>
        <Text className="text-center text-[#F5F5F5] mb-4">
          Tipo de Problema
        </Text>
        <View className="flex-row mb-4">
          <TouchableOpacity
            onPress={() => setTipoProblema("aplicativo")}
            className={`flex-1 p-3 border rounded-md mr-2 ${
              tipoProblema === "aplicativo"
                ? "border-[#F5F5F5]"
                : "border-[#1e1f22]"
            }`}
          >
            <Text className="text-center text-[#F5F5F5]">Aplicativo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTipoProblema("conta")}
            className={`flex-1 p-3 border rounded-md ${
              tipoProblema === "conta" ? "border-[#F5F5F5]" : "border-[#1e1f22]"
            }`}
          >
            <Text className="text-center text-[#F5F5F5]">Conta</Text>
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
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-4 items-center"
        >
          <Text className="text-[#F5F5F5]">Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
