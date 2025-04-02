import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import InputField from "@/components/ui/InputField";
import "../global.css";
import httpService from "@/app/services/httpServices";
import { useLoader } from "@/contexts/UseLoadingContext";

type UserProfileProps = {
  onClose: () => void;
};

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

const UserProfile = ({ onClose }: UserProfileProps) => {
  const [nome, setNome] = useState({ value: "", dirty: false });
  const [email, setEmail] = useState({ value: "", dirty: false });
  const [senha, setSenha] = useState({ value: "", dirty: false });
  const [telefone, setTelefone] = useState({ value: "", dirty: false });
  const [profileError, setProfileError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { loading, loadingIsTrue, loadingIsFalse } = useLoader();

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
      setTelefone((prev) => ({
        value: formatTelefone(value),
        dirty: prev.dirty,
      }));
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
    if (type === "email" && data.dirty && !regexEmail.test(data.value)) {
      return "Tente por o formato seunome@mail.com";
    } else if (
      type === "telefone" &&
      data.dirty &&
      !regexTelefone.test(data.value)
    ) {
      return "Tente por o formato (XX) (9XXXX-XXXX)";
    }
    return null;
  };

  // Função GET para carregar os dados do perfil
  const handleGetProfile = async () => {
    try {
      const getProfileUrl = `/users`;
      const response = await httpService.get(getProfileUrl);
      const { name, email, tel } = response.data.user;

      setNome({ value: name, dirty: false });
      setEmail({ value: email, dirty: false });
      setTelefone({ value: tel ? formatTelefone(tel) : "", dirty: false });
    } catch (error: any) {
      console.error("Erro ao buscar perfil:", error);
      if (error.response) {
        setProfileError(error.response.data.error || "Erro desconhecido");
      } else {
        setProfileError("Erro de rede. Verifique sua conexão.");
      }
    }
  };

  // Carrega os dados do perfil ao montar o componente para visualização
  useEffect(() => {
    if (!isEditing) {
      handleGetProfile();
    }
  }, [isEditing]);

  const handleSaveProfile = async () => {
    const data = {
      name: nome.value,
      email: email.value,
      password: senha.value,
      tel: telefone.value,
    };

    try {
      loadingIsTrue();
      const updateProfileUrl = "/users";
      await httpService.put(updateProfileUrl, data);
      alert("Perfil salvo com sucesso!");
      setIsEditing(false);
      loadingIsFalse();
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.error || "Erro desconhecido";
        setProfileError(errorMessage);
        loadingIsFalse();
      } else {
        setProfileError("Erro de rede. Verifique sua conexão.");
        loadingIsFalse();
      }
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
                <Text className="text-red-500 text-sm mt-1 ml-2 self-start text-center font-poppins">
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
                {telefone.value || "(XX) XXXXX-XXXX"}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // Ao entrar no editar perfil, reseta os campos para exibir apenas os placeholders
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
              <TouchableOpacity onPress={onClose} className="p-4 items-center">
                <Text className="text-[#F5F5F5]">Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default UserProfile;
