import React, { useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "@/components/ui/InputField";
import ContactForm from "@/components/ContactForm";
import "../../global.css";
import TouchButton from "@/components/ui/TouchButton";
import * as SecureStore from "expo-secure-store";

type MetaOption = "Manter peso" | "Perder peso" | "Ganhar peso";

const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

const Profile = () => {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    router.replace("/welcome");
  };

  const router = useRouter();
  const replacePath = (path: any): void => {
    router.replace(path);
  };

  const [nome, setNome] = useState({ value: "", dirty: false });
  const [email, setEmail] = useState({ value: "", dirty: false });
  const [senha, setSenha] = useState({ value: "", dirty: false });
  const [telefone, setTelefone] = useState({ value: "", dirty: false });

  const [profileError, setProfileError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [modalCardVisible, setModalCardVisible] = useState(false);
  const [modalContactVisible, setModalContactVisible] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [percentualGordura, setPercentualGordura] = useState("");
  const [taxaMetabolica, setTaxaMetabolica] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [profissao, setProfissao] = useState("");
  const [meta, setMeta] = useState<MetaOption>("Manter peso");
  const [alergia, setAlergia] = useState("");

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

  const handleSaveCardData = () => {
    setModalCardVisible(false);
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
              <Text className="text-2xl border border-[#1e1f22] rounded-lg w-[300px] p-2 my-1 text-[#F5F5F5]">
                {nome.value || "Nome"}
              </Text>
              <Text className="text-2xl border border-[#1e1f22] rounded-lg w-[300px] p-2 my-1 text-[#F5F5F5]">
                {email.value || "email@exemplo.com"}
              </Text>
              <Text className="text-2xl border border-[#1e1f22] rounded-lg w-[300px] p-2 my-1 text-[#F5F5F5]">
                {senha.value ? "••••••" : "Senha"}
              </Text>
              <Text className="text-2xl border border-[#1e1f22] rounded-lg w-[300px] p-2 my-1 text-[#F5F5F5]">
                {telefone.value || "(XX) XXXXX-XXXX"}
              </Text>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text className="text-white bg-[#1e1f22] w-[300px] text-center p-2 my-1 rounded-lg text-2xl">
                  Editar Perfil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalCardVisible(true)}
                className="border border-[#1e1f22] rounded-md p-4 my-1 w-full items-center"
              >
                <Text className="text-xl font-bold mb-2 text-[#F5F5F5]">
                  Dados do Card
                </Text>
                <Text className="text-[#F5F5F5]">
                  Toque para ver/editar os dados do seu card
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalContactVisible(true)}
                className="border border-[#1e1f22] rounded-md p-4 my-1 w-full items-center"
              >
                <Text className="text-xl font-bold mb-2 text-[#F5F5F5]">
                  Suporte
                </Text>
                <Text className="text-[#F5F5F5]">
                  Entre em contato com o suporte técnico
                </Text>
              </TouchableOpacity>
              <TouchButton onPress={handleLogout} text="Logout" />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Modal para dados do card */}
      <Modal
        animationType="slide"
        visible={modalCardVisible}
        onRequestClose={() => setModalCardVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-[#313338]">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            className="flex-1 w-full"
          >
            <View className="items-center px-4">
              <Text className="text-2xl font-bold mb-4 text-[#F5F5F5]">
                Dados do Card
              </Text>
              <Text className="text-lg text-center mb-4 w-[300px] text-[#F5F5F5]">
                Preencha levando em consideração seu tipo de corpo
              </Text>
              <View className="w-full max-w-[300px]">
                <InputField
                  placeholder="Percentual de Gordura (%)"
                  value={percentualGordura}
                  onChangeText={setPercentualGordura}
                  keyboardType="numeric"
                />
                <InputField
                  placeholder="Taxa Metabólica Basal"
                  value={taxaMetabolica}
                  onChangeText={setTaxaMetabolica}
                  keyboardType="numeric"
                />
                <InputField
                  placeholder="Data de Nascimento"
                  value={dataNascimento}
                  onChangeText={setDataNascimento}
                />
                <InputField
                  placeholder="Altura (m)"
                  value={altura}
                  onChangeText={setAltura}
                  keyboardType="numeric"
                />
                <InputField
                  placeholder="Peso (kg)"
                  value={peso}
                  onChangeText={setPeso}
                  keyboardType="numeric"
                />
                <InputField
                  placeholder="Sua profissão"
                  value={profissao}
                  onChangeText={setProfissao}
                />
                <InputField
                  placeholder="Alergias se houver"
                  value={alergia}
                  onChangeText={setAlergia}
                />
                <View>
                  <TouchableOpacity
                    onPress={() => setDropdownVisible(!dropdownVisible)}
                    className="flex-row justify-between items-center"
                  >
                    <Text className="text-2xl text-[#F5F5F5] border border-[#1e1f22] rounded-lg w-[300px] p-2 my-1">
                      {meta || "O que planeja?"}
                    </Text>
                    <MaterialCommunityIcons
                      name={dropdownVisible ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#F5F5F5"
                    />
                  </TouchableOpacity>
                  {dropdownVisible && (
                    <View className="border border-gray-300 rounded-md mt-1">
                      {(
                        [
                          "Manter peso",
                          "Perder peso",
                          "Ganhar peso",
                        ] as MetaOption[]
                      ).map((option) => (
                        <TouchableOpacity
                          key={option}
                          onPress={() => {
                            setMeta(option);
                            setDropdownVisible(false);
                          }}
                          className={`p-3 border-b last:border-b-0 ${
                            meta === option ? "bg-[#1e1f22]" : ""
                          }`}
                        >
                          <Text
                            className={
                              meta === option ? "text-white" : "text-white"
                            }
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
                <TouchableOpacity onPress={handleSaveCardData}>
                  <Text className="text-white bg-[#1e1f22] w-[300px] text-center p-2 my-1 rounded-lg text-2xl">
                    Salvar Dados do Card
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalCardVisible(false)}
                  className="p-4 items-center"
                >
                  <Text className="text-[#F5F5F5]">Voltar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Modal para contato/suporte */}
      <Modal
        animationType="slide"
        visible={modalContactVisible}
        onRequestClose={() => setModalContactVisible(false)}
      >
        <ContactForm onClose={() => setModalContactVisible(false)} />
      </Modal>
    </View>
  );
};

export default Profile;
