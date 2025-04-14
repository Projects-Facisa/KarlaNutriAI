// Home.tsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/Card";
import TouchButton from "@/components/ui/TouchButton";
import { useMealContext, MealTypes, MealDays } from "@/contexts/MealContext";
import "../../global.css";
import { useLoader } from "@/contexts/UseLoadingContext";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "expo-router";

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

const Home = () => {
  const { meals } = useMealContext();
  const [expandedDay, setExpandedDay] = useState<MealDays | "">("");
  const { loading } = useLoader();
  const { user, fetchNutritionalData } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchNutritionalData().then((hasData) => {
        if (!hasData) {
          router.push("/userCard");
        }
      });
    }
  }, [user, fetchNutritionalData, router]);

  if (loading || !user) {
    return <FullScreenLoader visible={true} />;
  }

  const handleDayButtonPress = (day: MealDays) => {
    setExpandedDay(expandedDay === day ? "" : day);
  };

  const sortedMealsForDay = (day: MealDays) => {
    return meals
      .filter((m) => getPortugueseDay(m.date) === day)
      .sort((a, b) => mealOrder.indexOf(a.type) - mealOrder.indexOf(b.type));
  };

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
            <TouchButton text={day} onPress={() => handleDayButtonPress(day)} />
            {expandedDay === day &&
              sortedMealsForDay(day).map((meal, index) => (
                <TouchableOpacity key={meal._id || index}>
                  <Card className="w-[300px] my-2">
                    <CardHeader>
                      <CardTitle>{meal.type}</CardTitle>
                      <CardDescription>{meal.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
