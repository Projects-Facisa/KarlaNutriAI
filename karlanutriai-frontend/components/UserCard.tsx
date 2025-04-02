import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "@/components/ui/InputField";
import httpService from "@/app/services/httpServices";
import "../global.css";

type MetaOption = "Manter peso" | "Perder peso" | "Ganhar peso";
type BodyFatOption =
  | "Alto percentual de massa muscular"
  | "Equilíbrio entre massa muscular e gordura"
  | "Alto percentual de gordura corporal"
  | "Não sei";
type MetabolicRateOption =
  | "Metabolismo acelerado (perco peso facilmente)"
  | "Metabolismo moderado (peso estável com facilidade)"
  | "Metabolismo mais lento (tenho tendência a ganhar peso)";

type UserCardProps = {
  onClose: () => void;
  onSave?: (data: any) => void;
};

const formatDateInput = (text: string) => {
  const cleaned = text.replace(/\D/g, "");
  const day = cleaned.slice(0, 2);
  const month = cleaned.slice(2, 4);
  const year = cleaned.slice(4, 8);

  let formatted = day;
  if (month) formatted += `/${month}`;
  if (year) formatted += `/${year}`;
  return formatted;
};

const parseFormattedDate = (formatted: string): Date | null => {
  const [day, month, year] = formatted.split("/");
  if (!day || !month || !year) return null;
  return new Date(`${year}-${month}-${day}`);
};

const parseFloatFlexible = (value: string): number =>
  parseFloat(value.replace(",", "."));

const UserCard = ({ onClose, onSave }: UserCardProps) => {
  const [dropdownMeta, setDropdownMeta] = useState(false);
  const [dropdownGordura, setDropdownGordura] = useState(false);
  const [dropdownMetabolismo, setDropdownMetabolismo] = useState(false);

  const [bodyFatPercentage, setBodyFatPercentage] = useState<BodyFatOption>(
    "Alto percentual de massa muscular"
  );
  const [metabolicRate, setMetabolicRate] = useState<MetabolicRateOption>(
    "Metabolismo acelerado (perco peso facilmente)"
  );
  const [birthDate, setBirthDate] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [profession, setProfession] = useState("");
  const [meta, setMeta] = useState<MetaOption>("Manter peso");
  const [allergy, setAllergy] = useState("");

  const handleSaveCardData = async () => {
    const formattedData = {
      birthDate: parseFormattedDate(birthDate),
      height: parseFloatFlexible(height),
      weight: parseFloatFlexible(weight),
      allergy: allergy
        ? allergy.split(",").map((a) => a.trim())
        : ["Sem alergias alimentares"],
      profession,
      bodyFatPercentage,
      metabolicRate,
      goal: meta,
    };

    try {
      await httpService.post("/datas", formattedData);
      if (onSave) {
        onSave(formattedData);
      }
      Alert.alert("Sucesso", "Dados salvos com sucesso!");
      onClose();
    } catch (error: any) {
      console.error(
        "Erro ao salvar dados:",
        error.response?.data || error.message
      );
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
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
              placeholder="Data de Nascimento (dd/mm/aaaa)"
              value={birthDate}
              onChangeText={(text) => setBirthDate(formatDateInput(text))}
            />

            <InputField
              placeholder="Altura (m)"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />

            <InputField
              placeholder="Peso (kg)"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />

            <InputField
              placeholder="Sua profissão"
              value={profession}
              onChangeText={setProfession}
            />

            <InputField
              placeholder="Alergias (separadas por vírgula)"
              value={allergy}
              onChangeText={setAllergy}
            />

            <TouchableOpacity
              onPress={() => setDropdownGordura(!dropdownGordura)}
              className="flex-row justify-between items-center"
            >
              <Text className="text-2xl text-[#F5F5F5] border border-[#1e1f22] rounded-lg w-[300px] p-2 my-1">
                {bodyFatPercentage}
              </Text>
              <MaterialCommunityIcons
                name={dropdownGordura ? "chevron-up" : "chevron-down"}
                size={20}
                color="#F5F5F5"
              />
            </TouchableOpacity>
            {dropdownGordura && (
              <View className="border border-gray-300 rounded-md mt-1">
                {(
                  [
                    "Alto percentual de massa muscular",
                    "Equilíbrio entre massa muscular e gordura",
                    "Alto percentual de gordura corporal",
                    "Não sei",
                  ] as BodyFatOption[]
                ).map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      setBodyFatPercentage(option);
                      setDropdownGordura(false);
                    }}
                    className={`p-3 border-b last:border-b-0 ${
                      bodyFatPercentage === option ? "bg-[#1e1f22]" : ""
                    }`}
                  >
                    <Text className="text-white">{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity
              onPress={() => setDropdownMetabolismo(!dropdownMetabolismo)}
              className="flex-row justify-between items-center"
            >
              <Text className="text-2xl text-[#F5F5F5] border border-[#1e1f22] rounded-lg w-[300px] p-2 my-1">
                {metabolicRate}
              </Text>
              <MaterialCommunityIcons
                name={dropdownMetabolismo ? "chevron-up" : "chevron-down"}
                size={20}
                color="#F5F5F5"
              />
            </TouchableOpacity>
            {dropdownMetabolismo && (
              <View className="border border-gray-300 rounded-md mt-1">
                {(
                  [
                    "Metabolismo acelerado (perco peso facilmente)",
                    "Metabolismo moderado (peso estável com facilidade)",
                    "Metabolismo mais lento (tenho tendência a ganhar peso)",
                  ] as MetabolicRateOption[]
                ).map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      setMetabolicRate(option);
                      setDropdownMetabolismo(false);
                    }}
                    className={`p-3 border-b last:border-b-0 ${
                      metabolicRate === option ? "bg-[#1e1f22]" : ""
                    }`}
                  >
                    <Text className="text-white">{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity
              onPress={() => setDropdownMeta(!dropdownMeta)}
              className="flex-row justify-between items-center"
            >
              <Text className="text-2xl text-[#F5F5F5] border border-[#1e1f22] rounded-lg w-[300px] p-2 my-1">
                {meta}
              </Text>
              <MaterialCommunityIcons
                name={dropdownMeta ? "chevron-up" : "chevron-down"}
                size={20}
                color="#F5F5F5"
              />
            </TouchableOpacity>
            {dropdownMeta && (
              <View className="border border-gray-300 rounded-md mt-1">
                {(
                  ["Manter peso", "Perder peso", "Ganhar peso"] as MetaOption[]
                ).map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      setMeta(option);
                      setDropdownMeta(false);
                    }}
                    className={`p-3 border-b last:border-b-0 ${
                      meta === option ? "bg-[#1e1f22]" : ""
                    }`}
                  >
                    <Text className="text-white">{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity onPress={handleSaveCardData}>
              <Text className="text-white bg-[#1e1f22] w-[300px] text-center p-2 my-3 rounded-lg text-2xl">
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
