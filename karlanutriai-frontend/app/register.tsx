import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import InputField from "../components/ui/InputField";
import TouchButton from "../components/ui/TouchButton";
import "../global.css";
import httpService from "./services/httpServices";

type InputState = {
  value: string;
  dirty: boolean;
};

const Register = () => {
  const router = useRouter();
  const [registerError, setRegisterError] = useState("");
  const [nome, setNome] = useState<InputState>({ value: "", dirty: false });
  const [email, setEmail] = useState<InputState>({ value: "", dirty: false });
  const [senha, setSenha] = useState<InputState>({ value: "", dirty: false });
  const [repetirSenha, setRepetirSenha] = useState<InputState>({
    value: "",
    dirty: false,
  });
  const [telefone, setTelefone] = useState<InputState>({
    value: "",
    dirty: false,
  });

  const replacePath = (path: any): void => {
    router.replace(path);
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

  const handleInputChange = (
    field: "nome" | "email" | "senha" | "repetirSenha" | "telefone",
    value: string
  ): void => {
    // Limpa qualquer mensagem de erro ao modificar um campo
    setRegisterError("");
    if (field === "telefone") {
      setTelefone((prev) => ({
        value: formatTelefone(value),
        dirty: prev.dirty,
      }));
    } else if (field === "nome") {
      setNome((prev) => ({ value, dirty: prev.dirty }));
    } else if (field === "email") {
      setEmail((prev) => ({ value, dirty: prev.dirty }));
    } else if (field === "senha") {
      setSenha((prev) => ({ value, dirty: prev.dirty }));
    } else if (field === "repetirSenha") {
      setRepetirSenha((prev) => ({ value, dirty: prev.dirty }));
    }
  };

  const handleBlur = (
    field: "nome" | "email" | "senha" | "repetirSenha" | "telefone"
  ): void => {
    if (field === "nome") {
      setNome((prev) => ({ ...prev, dirty: true }));
    } else if (field === "email") {
      setEmail((prev) => ({ ...prev, dirty: true }));
    } else if (field === "senha") {
      setSenha((prev) => ({ ...prev, dirty: true }));
    } else if (field === "repetirSenha") {
      setRepetirSenha((prev) => ({ ...prev, dirty: true }));
    } else if (field === "telefone") {
      setTelefone((prev) => ({ ...prev, dirty: true }));
    }
  };

  const validateField = (
    data: InputState,
    type: "nome" | "email" | "telefone" | "senha" | "repetirSenha"
  ): string | null => {
    if (!data.value && data.dirty) {
      return "Campo obrigatório!";
    } else if (type === "email" && data.dirty && !regexEmail.test(data.value)) {
      return "Tente por o formato seunome@mail.com";
    } else if (
      type === "telefone" &&
      data.dirty &&
      !regexTelefone.test(data.value)
    ) {
      return "Tente por o formato (XX) (9XXXX-XXXX)";
    } else if (
      type === "repetirSenha" &&
      data.dirty &&
      data.value !== senha.value
    ) {
      return "As senhas não coincidem!";
    }
    return null;
  };

  // Função de submit que valida e extrai os valores para a requisição
  const handleSubmit = async () => {
    // Marca todos os campos como dirty para disparar as validações
    setNome((prev) => ({ ...prev, dirty: true }));
    setEmail((prev) => ({ ...prev, dirty: true }));
    setSenha((prev) => ({ ...prev, dirty: true }));
    setTelefone((prev) => ({ ...prev, dirty: true }));
    setRepetirSenha((prev) => ({ ...prev, dirty: true }));

    // Verifica se há erros de validação
    if (
      validateField(nome, "nome") ||
      validateField(email, "email") ||
      validateField(senha, "senha") ||
      validateField(telefone, "telefone") ||
      validateField(repetirSenha, "repetirSenha")
    ) {
      return;
    }

    // Extrair os valores limpos para envio
    const data = {
      name: nome.value,
      email: email.value,
      password: senha.value,
      tel: telefone.value,
    };

    try {
      const registerProductUrl = `/user`;
      await httpService.post(registerProductUrl, data);
      router.replace("/login");
    } catch (error: any) {
      if (error.response) {
        // Se a resposta do backend for um erro set o loginError com a mensagem de erro
        const errorMessage = error.response.data.error || "Erro desconhecido";
        setRegisterError(errorMessage); // Atualizando o estado com a mensagem de erro
      } else {
        // Se o erro for na url
        setRegisterError("Erro de rede. Verifique sua conexão.");
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#313338] p-5">
      <View className="bg-[#1e1f22] p-[30] rounded-lg items-center w-full max-w-[500px]">
        <MaterialCommunityIcons
          name="food-apple-outline"
          size={100}
          color="#c33c41"
        />
        <Text className="text-4xl font-bold mb-4 text-[#FFFFFF]">
          Registrar
        </Text>

        <InputField
          placeholder="Nome Completo"
          value={nome.value}
          onChangeText={(value) => handleInputChange("nome", value)}
          onBlur={() => handleBlur("nome")}
        />
        {validateField(nome, "nome") && nome.dirty && (
          <Text className="text-red-500 text-sm self-start font-poppins">
            {validateField(nome, "nome")}
          </Text>
        )}

        <InputField
          placeholder="E-mail"
          value={email.value}
          onChangeText={(value) => handleInputChange("email", value)}
          onBlur={() => handleBlur("email")}
        />
        {validateField(email, "email") && email.dirty && (
          <Text className="text-red-500 text-sm self-start font-poppins">
            {validateField(email, "email")}
          </Text>
        )}

        <InputField
          placeholder="Telefone"
          keyboardType="numeric"
          value={telefone.value}
          onChangeText={(value) => handleInputChange("telefone", value)}
          onBlur={() => handleBlur("telefone")}
        />
        {validateField(telefone, "telefone") && telefone.dirty && (
          <Text className="text-red-500 text-sm self-start font-poppins">
            {validateField(telefone, "telefone")}
          </Text>
        )}

        <InputField
          placeholder="Senha"
          secureTextEntry={true}
          value={senha.value}
          onChangeText={(value) => handleInputChange("senha", value)}
          onBlur={() => handleBlur("senha")}
        />
        {validateField(senha, "senha") && senha.dirty && (
          <Text className="text-red-500 text-sm self-start font-poppins">
            {validateField(senha, "senha")}
          </Text>
        )}

        <InputField
          placeholder="Repetir Senha"
          secureTextEntry={true}
          value={repetirSenha.value}
          onChangeText={(value) => handleInputChange("repetirSenha", value)}
          onBlur={() => handleBlur("repetirSenha")}
        />
        {validateField(repetirSenha, "repetirSenha") && repetirSenha.dirty && (
          <Text className="text-red-500 text-sm self-start font-poppins">
            {validateField(repetirSenha, "repetirSenha")}
          </Text>
        )}

        {registerError ? (
          <Text className="text-red-500 text-sm mt-2 self-start text-center font-poppins">
            {registerError}
          </Text>
        ) : null}

        <TouchButton onPress={handleSubmit} text="Registrar" />
        <TouchButton onPress={() => replacePath("welcome")} text="Voltar" />
      </View>
    </View>
  );
};

export default Register;
