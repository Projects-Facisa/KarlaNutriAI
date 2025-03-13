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
import BottomNavigation from "@/components/ui/BottomNavigation";
import InputField from "@/components/ui/InputField";
import "../../global.css";

type MetaOption = "Manter peso" | "Perder peso" | "Ganhar peso";

const UserCard = () => {
  const router = useRouter();
  const replacePath = (path: any): void => {
    router.replace(path);
  };

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [percentualGordura, setPercentualGordura] = useState("");
  const [taxaMetabolica, setTaxaMetabolica] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [profissao, setProfissao] = useState("");
  const [meta, setMeta] = useState<MetaOption>("Manter peso");
  const [alergia, setAlergia] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveCardData = () => {
    Alert.alert("Sucesso", "Dados do card salvos!");
    setModalVisible(false);
  };

  const handleSaveProfile = () => {
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
            <Text className="text-2xl font-bold mb-4 self-center">
              Editar Perfil
            </Text>
            <View className="w-full max-w-[300px]">
              <InputField
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
              />
              <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <InputField
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
              />
              <InputField
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
              />
              <TouchableOpacity onPress={handleSaveProfile}>
                <Text className="text-white bg-[#1e1f22] w-[300px] text-center p-2 my-1 rounded-lg text-2xl">
                  Salvar Perfil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsEditing(false)}
                className="p-4 items-center"
              >
                <Text>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="items-center px-4">
            <Text className="text-2xl font-bold mb-4 self-center text-[#F5F5F5]">
              Perfil
            </Text>
            <View className="w-full max-w-[300px]">
              <Text className="text-2xl border border-[#1e1f22] rounded-lg w-[300] p-2 my-1 text-[#F5F5F5]">
                {nome || "Nome"}
              </Text>
              <Text className="text-2xl border border-[#1e1f22] rounded-lg w-[300] p-2 my-1 text-[#F5F5F5]">
                {email || "email@exemplo.com"}
              </Text>
              <Text className="text-2xl border border-[#1e1f22] rounded-lg w-[300] p-2 my-1 text-[#F5F5F5]">
                {senha ? "••••••" : "Senha"}
              </Text>
              <Text className="text-2xl border border-[#1e1f22] rounded-lg w-[300] p-2 my-1 text-[#F5F5F5]">
                {telefone || "(XX) XXXXX-XXXX"}
              </Text>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text className="text-white bg-[#1e1f22] w-[300px] text-center p-2 my-1 rounded-lg text-2xl">
                  Editar Perfil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="border border-[#1e1f22] rounded-md p-4 my-1 w-full items-center"
              >
                <Text className="text-xl font-bold mb-2 text-[#F5F5F5]">
                  Dados do Card
                </Text>
                <Text className="text-[#F5F5F5]">
                  Toque para ver/editar os dados do seu card
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
              <Text className="text-lg text-center mb-4 w-[300] text-[#F5F5F5]">
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
                    <Text className="text-2xl text-[#F5F5F5] border border-[#1e1f22] rounded-lg w-[300] p-2 my-1">
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
                  onPress={() => setModalVisible(false)}
                  className="p-4 items-center"
                >
                  <Text className="text-[#F5F5F5]">Voltar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <BottomNavigation
        items={[
          {
            id: 1,
            icon: (
              <MaterialCommunityIcons name="home" size={30} color="#5d6af0" />
            ),
            onPress: () => replacePath("home"),
          },
          {
            id: 2,
            icon: (
              <MaterialCommunityIcons
                name="chat-processing"
                size={30}
                color="#5d6af0"
              />
            ),
            onPress: () => replacePath("(tabs)/chat"),
          },
          {
            id: 3,
            icon: (
              <MaterialCommunityIcons
                name="food-fork-drink"
                size={30}
                color="#5d6af0"
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
                color="#5d6af0"
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
                color="#5d6af0"
              />
            ),
            onPress: () => replacePath("(tabs)/support"),
          },
        ]}
        activeItem={4}
      />
    </View>
  );
};

export default UserCard;
