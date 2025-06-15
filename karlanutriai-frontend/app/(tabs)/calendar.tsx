import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import TouchButton from "@/components/ui/TouchButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/Card";
import { useMealContext, MealTypes, MealDays } from "@/contexts/MealContext";

const mealOrder: MealTypes[] = ["Cafe da manha", "Almoco", "Lanche", "Janta"];

const getPortugueseDay = (dateInput: string | Date): MealDays => {
  const date = new Date(dateInput);
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
  return dayMap[day];
};

export default function Calendar() {
  const { meals } = useMealContext();
  const [expandedDay, setExpandedDay] = useState<MealDays | "">("");
  const router = useRouter();

  const handleDayPress = (day: MealDays) => {
    setExpandedDay(expandedDay === day ? "" : day);
  };

  const sortedMealsForDay = (day: MealDays) =>
    meals
      .filter((m) => getPortugueseDay(m.date) === day)
      .sort((a, b) => mealOrder.indexOf(a.type) - mealOrder.indexOf(b.type));

  const days: MealDays[] = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabado",
    "Domingo",
  ];

  return (
    <View className="flex-1 items-center bg-[#313338]">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {days.map((day) => (
          <View key={day} className="w-full mb-4">
            <TouchButton text={day} onPress={() => handleDayPress(day)} />
            {expandedDay === day &&
              sortedMealsForDay(day).map((meal, idx) => (
                <Card key={meal._id || idx} className="w-[300px] my-2">
                  <CardHeader>
                    <CardTitle>{meal.type}</CardTitle>
                    <CardDescription>{meal.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => router.push("/meal")}
        className="absolute bottom-8 right-8 bg-[#1e1f22] py-2 px-6 border border-[#86898f] rounded-full"
      >
        <Text className="text-white text-xl">+</Text>
      </TouchableOpacity>
    </View>
  );
}
