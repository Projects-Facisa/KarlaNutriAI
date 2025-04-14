import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import InputField from "@/components/ui/InputField";
import "@/global.css";
import httpService from "@/app/services/httpServices";
import { useUser } from "@/contexts/UserContext";
import { useLoader } from "@/contexts/UseLoadingContext";
import { useRouter } from "expo-router";

const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const regexTelefone = /^\(?[1-9]{2}\)?\s?[9]{0,1}[0-9]{4}-?[0-9]{4}$/;

const formatTelefone = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 2) {
    return `(${cleaned}`;
  } else if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
      7,
      11
    )}`;
  }
};

export default function UserProfile() {
  const router = useRouter();
  const { loading, loadingIsTrue, loadingIsFalse } = useLoader();
  const { user, fetchUser } = useUser();
  const [nome, setNome] = useState({ value: "", dirty: false });
  const [email, setEmail] = useState({ value: "", dirty: false });
  const [senha, setSenha] = useState({ value: "", dirty: false });
  const [telefone, setTelefone] = useState({ value: "", dirty: false });
  const [profileError, setProfileError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user && !isEditing) {
      setNome({ value: user.name, dirty: false });
      setEmail({ value: user.email, dirty: false });
      setTelefone({
        value: user.tel ? formatTelefone(user.tel) : "",
        dirty: false,
      });
    }
  }, [user, isEditing]);

  const handleInputChange = (
    field: "nome" | "email" | "senha" | "telefone",
    value: string
  ) => {
    setProfileError("");

    if (field === "nome") {
      setNome((prev) => ({ value, dirty: prev.dirty }));
    } else if (field === "email") {
      setEmail((prev) => ({ value, dirty: prev.dirty }));
      if (!regexEmail.test(value)) {
        setProfileError("Tente por o formato seunome@mail.com");
      }
    } else if (field === "telefone") {
      const formattedValue = formatTelefone(value);
      setTelefone((prev) => ({ value: formattedValue, dirty: prev.dirty }));
      if (!regexTelefone.test(formattedValue)) {
        setProfileError("Tente por o formato (XX) (9XXXX-XXXX)");
      }
    } else if (field === "senha") {
      setSenha((prev) => ({ value, dirty: prev.dirty }));
    }
  };

  const handleBlur = (field: "nome" | "email" | "senha" | "telefone"): void => {
    if (field === "nome") {
      setNome((prev) => ({ ...prev, dirty: true }));
    } else if (field === "email") {
      setEmail((prev) => ({ ...prev, dirty: true }));
    } else if (field === "telefone") {
      setTelefone((prev) => ({ ...prev, dirty: true }));
    } else if (field === "senha") {
      setSenha((prev) => ({ ...prev, dirty: true }));
    }
  };

  const handleSaveProfile = async () => {
    const data = {
      name: nome.value,
      email: email.value,
      password: senha.value,
      tel: telefone.value,
    };

    try {
      loadingIsTrue();
      await httpService.put("/users", data);
      setIsEditing(false);
      await fetchUser();
      loadingIsFalse();
      alert("Perfil salvo com sucesso!");
    } catch (error: any) {
      setProfileError(error.response?.data?.error || "Erro desconhecido");
      loadingIsFalse();
    }
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
              <InputField
                placeholder="Email"
                value={email.value}
                onChangeText={(value) => handleInputChange("email", value)}
                onBlur={() => handleBlur("email")}
              />
              <InputField
                placeholder="Senha"
                value={senha.value}
                onChangeText={(value) => handleInputChange("senha", value)}
                secureTextEntry
                onBlur={() => handleBlur("senha")}
              />
              <InputField
                placeholder="Telefone"
                value={telefone.value}
                onChangeText={(value) => handleInputChange("telefone", value)}
                onBlur={() => handleBlur("telefone")}
              />
              {profileError ? (
                <Text className="text-red-500 text-sm mt-1 ml-2 self-start">
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
                {user?.name || "Nome"}
              </Text>
              <Text className="text-2xl border-2 border-[#1e1f22] rounded-lg w-[300px] p-2 my-1 text-[#F5F5F5]">
                {user?.email || "email@exemplo.com"}
              </Text>
              <Text className="text-2xl border-2 border-[#1e1f22] rounded-lg w-[300px] p-2 my-1 text-[#F5F5F5]">
                {user?.tel || "(XX) XXXXX-XXXX"}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(true);
                  setNome({ value: "", dirty: false });
                  setEmail({ value: "", dirty: false });
                  setSenha({ value: "", dirty: false });
                  setTelefone({ value: "", dirty: false });
                }}
              >
                <Text className="text-white bg-[#1e1f22] w-[300px] text-center p-2 my-1 rounded-lg text-2xl">
                  Editar Perfil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.back()}
                className="p-4 items-center"
              >
                <Text className="text-[#F5F5F5]">Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
