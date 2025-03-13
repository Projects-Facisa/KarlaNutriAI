import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import InputField from "../components/ui/InputField";
import TouchButton from "../components/ui/TouchButton";
import "../global.css";

const Register = () => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const replacePath = (path: any): void => {
    router.replace(path);
  };
  return (
    <View className="flex-1 justify-center align-center bg-[#313338]">
      <View className="bg-[rgba(0, 0, 0, 0.00)] p-[20px] rounded-lg items-center">
        <MaterialCommunityIcons
          name="food-apple-outline"
          size={100}
          color="#c33c41"
          margin={5}
        />
        <Text className="text-5xl font-bold mb-[10] text-[#F5F5F5]">
          Registrar-se
        </Text>
        <InputField
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />
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
        <InputField
          placeholder="Repetir Senha"
          secureTextEntry={true}
          value={repetirSenha}
          onChangeText={setRepetirSenha}
        />
        <InputField
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
        />
        <TouchButton onPress={() => replacePath("login")} text="Registrar" />
        <TouchButton onPress={() => replacePath("welcome")} text="Voltar" />
      </View>
    </View>
  );
};

export default Register;
