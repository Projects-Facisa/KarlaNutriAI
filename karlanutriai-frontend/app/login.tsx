import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import InputField from "../components/ui/InputField";
import TouchButton from "../components/ui/TouchButton";
import AuthButton from "../components/ui/AuthButton";
import "../global.css";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState({ value: "", dirty: false });
  const [senha, setSenha] = useState({ value: "", dirty: false });
  const [loginError, setLoginError] = useState("");

  const isButtonDisabled = !email.value || !senha.value;
  const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = (path: any): void => {
    if (!isButtonDisabled) {
      if (!regexEmail.test(email.value)) {
        setLoginError("E-mail ou senha incorretos");
        return;
      }
      router.replace(path);
    }
  };

  const handleBack = (path: any): void => {
    router.replace(path);
  };

  const handleInputChange = (field: "email" | "senha", value: string) => {
    setLoginError("");
    if (field === "email") {
      setEmail((prev) => ({ value, dirty: prev.dirty }));
    } else {
      setSenha((prev) => ({ value, dirty: prev.dirty }));
    }
  };

  const handleBlur = (field: "email" | "senha") => {
    if (field === "email") {
      setEmail((prev) => ({ ...prev, dirty: true }));
    } else {
      setSenha((prev) => ({ ...prev, dirty: true }));
    }
  };

  const validateField = (
    data: { value: string; dirty: boolean },
    type: string
  ) => {
    if (!data.value && data.dirty) {
      return "Campo obrigatório!";
    }
    return null;
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#313338] p-5">
      <View className="bg-[#1e1f22] p-[30] rounded-lg items-center w-full max-w-[500px]">
        <MaterialCommunityIcons
          name="food-apple-outline"
          size={100}
          color="#c33c41"
        />
        <Text className="text-4xl font-bold mb-4 text-[#FFFFFF] font-inter">
          Entrar
        </Text>

        <InputField
          placeholder="E-mail"
          value={email.value}
          onChangeText={(value) => handleInputChange("email", value)}
          onBlur={() => handleBlur("email")}
        />
        {validateField(email, "email") && email.dirty && (
          <Text className="text-red-500 text-sm self-start ml-2 mt-1 font-poppins">
            {validateField(email, "email")}
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
          <Text className="text-red-500 text-sm self-start ml-2 mt-1 font-poppins">
            {validateField(senha, "senha")}
          </Text>
        )}

        {loginError ? (
          <Text className="text-red-500 text-sm mt-2 self-start text-center font-poppins">
            {loginError}
          </Text>
        ) : null}
        <AuthButton
          onPress={() => handleLogin("home")}
          text="Logar"
          disabled={isButtonDisabled}
          className="mt-4"
        />
        <TouchButton onPress={() => handleBack("welcome")} text="Voltar" />
      </View>
    </View>
  );
};

export default Login;
