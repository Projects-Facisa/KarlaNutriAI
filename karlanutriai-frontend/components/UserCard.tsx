import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "@/components/ui/InputField";
import "../global.css";

type MetaOption = "Manter peso" | "Perder peso" | "Ganhar peso";

type UserCardProps = {
  onClose: () => void;
};

const UserCard = ({ onClose }: UserCardProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [percentualGordura, setPercentualGordura] = useState("");
  const [taxaMetabolica, setTaxaMetabolica] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [profissao, setProfissao] = useState("");
  const [meta, setMeta] = useState<MetaOption>("Manter peso");
  const [alergia, setAlergia] = useState("");

  const handleSaveCardData = () => {
    onClose();
  };

  return (
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
            <TouchableOpacity onPress={onClose} className="p-4 items-center">
              <Text className="text-[#F5F5F5]">Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserCard;
