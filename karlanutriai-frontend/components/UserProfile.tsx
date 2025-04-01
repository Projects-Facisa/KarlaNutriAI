import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import InputField from "@/components/ui/InputField";
import "../global.css";
import TouchButton from "./ui/TouchButton";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

type UserProfileProps = {
  onClose: () => void;
};

const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

const UserProfile = ({ onClose }: UserProfileProps) => {
  const [nome, setNome] = useState({ value: "", dirty: false });
  const [email, setEmail] = useState({ value: "", dirty: false });
  const [senha, setSenha] = useState({ value: "", dirty: false });
  const [telefone, setTelefone] = useState({ value: "", dirty: false });
  const [profileError, setProfileError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    router.replace("/welcome");
  };

  const handleInputChange = (
    field: "nome" | "email" | "senha" | "telefone",
    value: string
  ) => {
    setProfileError("");
    if (field === "nome") {
      setNome((prev) => ({ value, dirty: prev.dirty }));
    } else if (field === "email") {
      setEmail((prev) => ({ value, dirty: prev.dirty }));
    } else if (field === "senha") {
      setSenha((prev) => ({ value, dirty: prev.dirty }));
    } else if (field === "telefone") {
      setTelefone((prev) => ({ value, dirty: prev.dirty }));
    }
  };

  const handleBlur = (field: "nome" | "email" | "senha" | "telefone") => {
    if (field === "nome") {
      setNome((prev) => ({ ...prev, dirty: true }));
    } else if (field === "email") {
      setEmail((prev) => ({ ...prev, dirty: true }));
    } else if (field === "senha") {
      setSenha((prev) => ({ ...prev, dirty: true }));
    } else if (field === "telefone") {
      setTelefone((prev) => ({ ...prev, dirty: true }));
    }
  };

  const validateField = (
    data: { value: string; dirty: boolean },
    type: string
  ) => {
    if (!data.value && data.dirty) {
      return "Campo obrigatório!";
    }
    if (type === "email" && !regexEmail.test(data.value) && data.dirty) {
      return "Tente por o formato seunome@mail.com";
    }
    return null;
  };

  const handleSaveProfile = () => {
    if (!nome.value || !email.value || !senha.value || !telefone.value) {
      setProfileError("Preencha todos os campos obrigatórios!");
      return;
    }
    if (!regexEmail.test(email.value)) {
      setProfileError("E-mail inválido!");
      return;
    }
    Alert.alert("Perfil", "Dados do perfil salvos!");
    setIsEditing(false);
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#313338]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="flex-1 w-full"
      >
        {isEditing ? (
          <View className="items-center px-4">
            <Text className="text-[#F5F5F5] text-2xl font-bold mb-4 self-center">
              Editar Perfil
            </Text>
            <View className="w-full max-w-[300px]">
              <InputField
                placeholder="Nome"
                value={nome.value}
                onChangeText={(value) => handleInputChange("nome", value)}
                onBlur={() => handleBlur("nome")}
              />
              {validateField(nome, "nome") && nome.dirty && (
                <Text className="text-red-500 text-sm self-start ml-2 mt-1 font-poppins">
                  {validateField(nome, "nome")}
                </Text>
              )}

              <InputField
                placeholder="Email"
                value={email.value}
                onChangeText={(value) => handleInputChange("email", value)}
                onBlur={() => handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {validateField(email, "email") && email.dirty && (
                <Text className="text-red-500 text-sm self-start ml-2 mt-1 font-poppins">
                  {validateField(email, "email")}
                </Text>
              )}

              <InputField
                placeholder="Senha"
                value={senha.value}
                onChangeText={(value) => handleInputChange("senha", value)}
                onBlur={() => handleBlur("senha")}
                secureTextEntry={true}
              />
              {validateField(senha, "senha") && senha.dirty && (
                <Text className="text-red-500 text-sm self-start ml-2 mt-1 font-poppins">
                  {validateField(senha, "senha")}
                </Text>
              )}

              <InputField
                placeholder="Telefone"
                value={telefone.value}
                onChangeText={(value) => handleInputChange("telefone", value)}
                onBlur={() => handleBlur("telefone")}
              />
              {validateField(telefone, "telefone") && telefone.dirty && (
                <Text className="text-red-500 text-sm self-start ml-2 mt-1 font-poppins">
                  {validateField(telefone, "telefone")}
                </Text>
              )}

              {profileError ? (
                <Text className="text-red-500 text-sm mt-2 self-start text-center font-poppins">
                  {profileError}
                </Text>
              ) : null}

              <TouchableOpacity onPress={handleSaveProfile}>
                <Text className="text-white bg-[#1e1f22] w-[300px] text-center p-2 my-1 rounded-lg text-2xl">
                  Salvar Perfil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsEditing(false)}
                className="p-4 items-center"
              >
                <Text className="text-[#F5F5F5]">Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="items-center px-4">
            <Text className="text-2xl font-bold mb-4 self-center text-[#F5F5F5]">
              Perfil
            </Text>
            <View className="w-full max-w-[300px]">
              <Text className="text-2xl border-2 border-[#1e1f22] rounded-lg w-[300px] p-2 my-1 text-[#F5F5F5]">
                {nome.value || "Nome"}
              </Text>
              <Text className="text-2xl border-2 border-[#1e1f22] rounded-lg w-[300px] p-2 my-1 text-[#F5F5F5]">
                {email.value || "email@exemplo.com"}
              </Text>
              <Text className="text-2xl border-2 border-[#1e1f22] rounded-lg w-[300px] p-2 my-1 text-[#F5F5F5]">
                {senha.value ? "••••••" : "Senha"}
              </Text>
              <Text className="text-2xl border-2 border-[#1e1f22] rounded-lg w-[300px] p-2 my-1 text-[#F5F5F5]">
                {telefone.value || "(XX) XXXXX-XXXX"}
              </Text>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text className="text-white bg-[#1e1f22] w-[300px] text-center p-2 my-1 rounded-lg text-2xl">
                  Editar Perfil
                </Text>
              </TouchableOpacity>
              <TouchButton onPress={handleLogout} text="Logout" />
              <TouchableOpacity onPress={onClose} className="p-4 items-center">
                <Text className="text-[#F5F5F5]">Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default UserProfile;
