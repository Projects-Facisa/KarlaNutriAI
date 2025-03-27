import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import TouchButton from "../../components/ui/TouchButton";
import "../../global.css";
import InputField from "@/components/ui/InputField";
import * as SecureStore from "expo-secure-store";

type MealTypes = "Cafe da manha" | "Almoco" | "Lanche" | "Janta";
type MealDays =
  | "Segunda-feira"
  | "Terça-feira"
  | "Quarta-feira"
  | "Quinta-feira"
  | "Sexta-feira"
  | "Sabado"
  | "Domingo";

const mealOrder: MealTypes[] = ["Cafe da manha", "Almoco", "Lanche", "Janta"];

const Home = () => {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    router.replace("/welcome");
  };

  const router = useRouter();
  const [meals, setMeals] = useState<
    { type: MealTypes; date: MealDays; description: string }[]
  >([]);
  const [expandedDay, setExpandedDay] = useState<MealDays | "">("");
  const [selectedMealType, setSelectedMealType] = useState<MealTypes | "">("");
  const [modalVisible, setModalVisible] = useState(false);
  const [mealType, setMealType] = useState<MealTypes | "">("");
  const [mealDescription, setMealDescription] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [mealTypeDropdownVisible, setMealTypeDropdownVisible] = useState(false);

  const handleDayButtonPress = (day: MealDays) => {
    if (expandedDay === day) {
      setExpandedDay("");
      setSelectedMealType("");
    } else {
      setExpandedDay(day);
      setSelectedMealType("");
    }
  };

  const handleCreate = () => {
    if (!expandedDay) return;
    setMealType("");
    setMealDescription("");
    setIsUpdateMode(false);
    setModalVisible(true);
  };

  const handleUpdate = () => {
    if (!selectedMealType) return;
    const meal = meals.find(
      (m) => m.date === expandedDay && m.type === selectedMealType
    );
    if (!meal) return;
    setMealType(meal.type);
    setMealDescription(meal.description);
    setIsUpdateMode(true);
    setModalVisible(true);
  };

  const handleDelete = () => {
    if (!selectedMealType) return;
    setMeals((prev) =>
      prev.filter(
        (m) => !(m.date === expandedDay && m.type === selectedMealType)
      )
    );
    setSelectedMealType("");
  };

  const handleSaveMeal = () => {
    if (!mealType || !mealDescription || !expandedDay) return;
    if (!isUpdateMode) {
      const exists = meals.some(
        (m) => m.date === expandedDay && m.type === mealType
      );
      if (exists) {
        Alert.alert("Erro", "Já existe uma refeição desse tipo para este dia.");
        return;
      }
      setMeals((prev) => [
        ...prev,
        { type: mealType, date: expandedDay, description: mealDescription },
      ]);
    } else {
      setMeals((prev) =>
        prev.map((m) =>
          m.date === expandedDay && m.type === mealType
            ? {
                type: mealType,
                date: expandedDay,
                description: mealDescription,
              }
            : m
        )
      );
    }
    setModalVisible(false);
    setMealType("");
    setMealDescription("");
    setIsUpdateMode(false);
    setSelectedMealType("");
  };

  const sortedMealsForDay = (day: MealDays) => {
    return meals
      .filter((m) => m.date === day)
      .sort((a, b) => mealOrder.indexOf(a.type) - mealOrder.indexOf(b.type));
  };

  return (
    <View className="flex-1 bg-[#313338]">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TouchButton
          text="Segunda-feira"
          onPress={() => handleDayButtonPress("Segunda-feira")}
        />
        {expandedDay === "Segunda-feira" &&
          sortedMealsForDay("Segunda-feira").map((meal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedMealType(meal.type)}
            >
              <Card
                className={`w-[300px] ${
                  selectedMealType === meal.type
                    ? "border-2 border-[#5d6af0]"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>{meal.type}</CardTitle>
                  <CardDescription>{meal.description}</CardDescription>
                </CardHeader>
              </Card>
            </TouchableOpacity>
          ))}
        <TouchButton
          text="Terça-feira"
          onPress={() => handleDayButtonPress("Terça-feira")}
        />
        {expandedDay === "Terça-feira" &&
          sortedMealsForDay("Terça-feira").map((meal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedMealType(meal.type)}
            >
              <Card
                className={`w-[300px] ${
                  selectedMealType === meal.type
                    ? "border-2 border-[#5d6af0]"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>{meal.type}</CardTitle>
                  <CardDescription>{meal.description}</CardDescription>
                </CardHeader>
              </Card>
            </TouchableOpacity>
          ))}
        <TouchButton
          text="Quarta-feira"
          onPress={() => handleDayButtonPress("Quarta-feira")}
        />
        {expandedDay === "Quarta-feira" &&
          sortedMealsForDay("Quarta-feira").map((meal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedMealType(meal.type)}
            >
              <Card
                className={`w-[300px] ${
                  selectedMealType === meal.type
                    ? "border-2 border-[#5d6af0]"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>{meal.type}</CardTitle>
                  <CardDescription>{meal.description}</CardDescription>
                </CardHeader>
              </Card>
            </TouchableOpacity>
          ))}
        <TouchButton
          text="Quinta-feira"
          onPress={() => handleDayButtonPress("Quinta-feira")}
        />
        {expandedDay === "Quinta-feira" &&
          sortedMealsForDay("Quinta-feira").map((meal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedMealType(meal.type)}
            >
              <Card
                className={`w-[300px] ${
                  selectedMealType === meal.type
                    ? "border-2 border-[#5d6af0]"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>{meal.type}</CardTitle>
                  <CardDescription>{meal.description}</CardDescription>
                </CardHeader>
              </Card>
            </TouchableOpacity>
          ))}
        <TouchButton
          text="Sexta-feira"
          onPress={() => handleDayButtonPress("Sexta-feira")}
        />
        {expandedDay === "Sexta-feira" &&
          sortedMealsForDay("Sexta-feira").map((meal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedMealType(meal.type)}
            >
              <Card
                className={`w-[300px] ${
                  selectedMealType === meal.type
                    ? "border-2 border-[#5d6af0]"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>{meal.type}</CardTitle>
                  <CardDescription>{meal.description}</CardDescription>
                </CardHeader>
              </Card>
            </TouchableOpacity>
          ))}
        <TouchButton
          text="Sabado"
          onPress={() => handleDayButtonPress("Sabado")}
        />
        {expandedDay === "Sabado" &&
          sortedMealsForDay("Sabado").map((meal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedMealType(meal.type)}
            >
              <Card
                className={`w-[300px] ${
                  selectedMealType === meal.type
                    ? "border-2 border-[#5d6af0]"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>{meal.type}</CardTitle>
                  <CardDescription>{meal.description}</CardDescription>
                </CardHeader>
              </Card>
            </TouchableOpacity>
          ))}
        <TouchButton
          text="Domingo"
          onPress={() => handleDayButtonPress("Domingo")}
        />
        {expandedDay === "Domingo" &&
          sortedMealsForDay("Domingo").map((meal, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedMealType(meal.type)}
            >
              <Card
                className={`w-[300px] ${
                  selectedMealType === meal.type
                    ? "border-2 border-[#5d6af0]"
                    : ""
                }`}
              >
                <CardHeader>
                  <CardTitle>{meal.type}</CardTitle>
                  <CardDescription>{meal.description}</CardDescription>
                </CardHeader>
              </Card>
            </TouchableOpacity>
          ))}
        <View className="w-[300px] p-2 flex-row justify-between space-x-2">
          <TouchableOpacity
            onPress={handleCreate}
            className="w-[30%] bg-green-500 p-2 rounded"
          >
            <Text className="text-center text-white font-bold">Criar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleUpdate}
            className="w-[30%] bg-yellow-500 p-2 rounded"
          >
            <Text className="text-center text-white font-bold">Atualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            className="w-[30%] bg-red-500 p-2 rounded"
          >
            <Text className="text-center text-white font-bold">Deletar</Text>
          </TouchableOpacity>
          <TouchButton onPress={handleLogout} text="logout" />
          {/* PARA TESTES */}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-[#313338]">
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View className="items-center px-4">
              <Text className="text-2xl font-bold mb-4 text-[#F5F5F5]">
                Dados da Refeição
              </Text>
              <Text className="text-lg text-center mb-4 w-[300px] text-[#F5F5F5]">
                Dia: {expandedDay}
              </Text>
              <View className="w-full max-w-[300px]">
                <TouchableOpacity
                  onPress={() =>
                    setMealTypeDropdownVisible(!mealTypeDropdownVisible)
                  }
                  className="flex-row justify-between items-center border border-[#1e1f22] rounded-lg w-[300px] p-2 my-1"
                >
                  <Text className="text-2xl text-[#F5F5F5]">
                    {mealType || "Selecione o tipo"}
                  </Text>
                  <MaterialCommunityIcons
                    name={
                      mealTypeDropdownVisible ? "chevron-up" : "chevron-down"
                    }
                    size={20}
                    color="#F5F5F5"
                  />
                </TouchableOpacity>
                {mealTypeDropdownVisible && (
                  <View className="border border-gray-300 rounded-md mt-1">
                    {(
                      [
                        "Cafe da manha",
                        "Almoco",
                        "Lanche",
                        "Janta",
                      ] as MealTypes[]
                    ).map((option) => (
                      <TouchableOpacity
                        key={option}
                        onPress={() => {
                          setMealType(option);
                          setMealTypeDropdownVisible(false);
                        }}
                        className={`p-3 border-b last:border-b-0 ${
                          mealType === option ? "bg-[#1e1f22]" : ""
                        }`}
                      >
                        <Text className="text-white">{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                <InputField
                  placeholder="Descrição da Refeição"
                  value={mealDescription}
                  onChangeText={setMealDescription}
                />
                <TouchableOpacity onPress={handleSaveMeal}>
                  <Text className="text-white bg-[#1e1f22] w-[300px] text-center p-2 my-1 rounded-lg text-2xl">
                    Salvar Refeição
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
    </View>
  );
};

export default Home;
