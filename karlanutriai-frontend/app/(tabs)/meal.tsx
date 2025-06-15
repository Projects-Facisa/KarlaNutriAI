import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputField from "@/components/ui/InputField";
import TouchButton from "@/components/ui/TouchButton";
import {
  useMealContext,
  Meal,
  MealTypes,
  MealDays,
} from "@/contexts/MealContext";
import "../../global.css";

const getDateFromMealDay = (mealDay: MealDays): Date => {
  const dayMap: { [key in MealDays]: number } = {
    Domingo: 0,
    "Segunda-feira": 1,
    "Terça-feira": 2,
    "Quarta-feira": 3,
    "Quinta-feira": 4,
    "Sexta-feira": 5,
    Sabado: 6,
  };
  const today = new Date();
  const currentDay = today.getDay();
  let diff = dayMap[mealDay] - currentDay;
  if (diff < 0) diff += 7;
  const result = new Date(today);
  result.setDate(today.getDate() + diff);
  return result;
};

export default function MealView() {
  const { meals, addMeal, updateMeal, deleteMeal } = useMealContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [selectedDay, setSelectedDay] = useState<MealDays>("Segunda-feira");
  const [mealType, setMealType] = useState<MealTypes | "">("");
  const [mealDescription, setMealDescription] = useState("");
  const [mealTypeDropdownVisible, setMealTypeDropdownVisible] = useState(false);
  const [dayDropdownVisible, setDayDropdownVisible] = useState(false);
  const mealTypes: MealTypes[] = ["Cafe da manha", "Almoco", "Lanche", "Janta"];
  const mealDays: MealDays[] = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabado",
    "Domingo",
  ];

  useEffect(() => {}, [meals]);

  const openModalForCreate = () => {
    setIsUpdateMode(false);
    setSelectedMeal(null);
    setMealType("");
    setMealDescription("");
    setModalVisible(true);
  };

  const openModalForUpdate = (meal: Meal) => {
    setIsUpdateMode(true);
    setSelectedMeal(meal);
    setMealType(meal.type);
    setMealDescription(meal.description);
    const date = new Date(meal.date);
    const day = date.getDay();
    const dayMap: { [key: number]: MealDays } = {
      0: "Domingo",
      1: "Segunda-feira",
      2: "Terça-feira",
      3: "Quarta-feira",
      4: "Quinta-feira",
      5: "Sexta-feira",
      6: "Sabado",
    };
    setSelectedDay(dayMap[day]);
    setModalVisible(true);
  };

  const handleSaveMeal = async () => {
    if (!mealType || !mealDescription || !selectedDay) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    const mealData = {
      type: mealType,
      description: mealDescription,
      date: getDateFromMealDay(selectedDay),
    };
    try {
      if (!isUpdateMode) {
        await addMeal(mealData);
      } else if (selectedMeal && selectedMeal._id) {
        const updatedMealData = { ...selectedMeal, ...mealData };
        await updateMeal(selectedMeal._id, updatedMealData);
      }
      setModalVisible(false);
      resetForm();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    }
  };

  const handleDeleteMeal = async (meal: Meal) => {
    Alert.alert("Confirmação", "Deseja realmente deletar a refeição?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: async () => {
          if (meal._id) {
            try {
              await deleteMeal(meal._id);
            } catch (error) {
              Alert.alert("Erro", "Não foi possível deletar a refeição.");
            }
          }
        },
      },
    ]);
  };

  const resetForm = () => {
    setMealType("");
    setMealDescription("");
    setIsUpdateMode(false);
    setSelectedMeal(null);
    setSelectedDay("Segunda-feira");
  };

  const groupedMeals = meals
    .sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    )
    .reduce((acc: { date: string; meals: Meal[] }[], meal) => {
      const dateStr = new Date(meal.creationDate).toLocaleDateString("pt-BR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
      });
      if (acc.length === 0 || acc[acc.length - 1].date !== dateStr) {
        acc.push({ date: dateStr, meals: [meal] });
      } else {
        acc[acc.length - 1].meals.push(meal);
      }
      return acc;
    }, []);

  return (
    <View className="flex-1 bg-[#313338]">
      <View className="flex-row justify-around p-4">
        <TouchButton onPress={openModalForCreate} text="Criar" />
      </View>
      <ScrollView className="flex-1 p-4">
        {groupedMeals.map((group, index) => (
          <View key={index} className="mb-4">
            <Text className="text-white text-lg font-bold">{group.date}</Text>
            {group.meals.map((meal) => (
              <View
                key={meal._id}
                className="p-4 mb-2 border rounded bg-[#1e1f22]"
              >
                <View className="flex-row justify-between items-center">
                  <Text className="text-white font-bold">
                    {meal.type} -{" "}
                    {new Date(meal.date).toLocaleDateString("pt-BR", {
                      weekday: "long",
                    })}
                  </Text>
                  <View className="flex-row">
                    <TouchableOpacity
                      onPress={() => openModalForUpdate(meal)}
                      className="mr-2"
                    >
                      <MaterialCommunityIcons
                        name="pencil"
                        size={20}
                        color="#F5F5F5"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteMeal(meal)}>
                      <MaterialCommunityIcons
                        name="trash-can"
                        size={20}
                        color="#F5F5F5"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text className="text-white mt-1">{meal.description}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-[#313338] p-4"
        >
          <Text className="text-2xl font-bold text-white mb-4">
            {isUpdateMode ? "Atualizar Refeição" : "Criar Refeição"}
          </Text>
          <TouchableOpacity
            onPress={() => setDayDropdownVisible(!dayDropdownVisible)}
            className="flex-row justify-between items-center border rounded p-2 mb-4"
          >
            <Text className="text-white text-2xl">
              {selectedDay || "Selecione o dia"}
            </Text>
            <MaterialCommunityIcons
              name={dayDropdownVisible ? "chevron-up" : "chevron-down"}
              size={20}
              color="#F5F5F5"
            />
          </TouchableOpacity>
          {dayDropdownVisible && (
            <View className="border rounded mb-4">
              {mealDays.map((day) => (
                <TouchableOpacity
                  key={day}
                  onPress={() => {
                    setSelectedDay(day);
                    setDayDropdownVisible(false);
                  }}
                  className={`p-3 border-b last:border-b-0 ${
                    selectedDay === day ? "bg-[#1e1f22]" : ""
                  }`}
                >
                  <Text className="text-white">{day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            onPress={() => setMealTypeDropdownVisible(!mealTypeDropdownVisible)}
            className="flex-row justify-between items-center border rounded p-2 mb-4"
          >
            <Text className="text-white text-2xl">
              {mealType || "Selecione o tipo"}
            </Text>
            <MaterialCommunityIcons
              name={mealTypeDropdownVisible ? "chevron-up" : "chevron-down"}
              size={20}
              color="#F5F5F5"
            />
          </TouchableOpacity>
          {mealTypeDropdownVisible && (
            <View className="border rounded mb-4">
              {mealTypes.map((option) => (
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
            className="text-2xl border-2 border-[#1e1f22] rounded-lg w-[330] p-2 my-1 text-[#F5F5F5] bg-[#313338] "
            placeholder="Descrição da Refeição"
            value={mealDescription}
            onChangeText={setMealDescription}
          />
          <TouchableOpacity
            onPress={handleSaveMeal}
            className="bg-[#1e1f22] p-2 rounded mt-4"
          >
            <Text className="text-white text-center text-2xl">
              Salvar Refeição
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="p-4 items-center"
          >
            <Text className="text-white">Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}
