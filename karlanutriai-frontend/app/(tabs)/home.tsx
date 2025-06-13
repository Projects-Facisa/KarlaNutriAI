import React, { useEffect } from "react";
import { View } from "react-native";
import Recipes from "./recipes";
import Calendar from "./calendar";
import { useLoader } from "@/contexts/UseLoadingContext";
import FullScreenLoader from "@/components/FullScreenLoader";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "expo-router";

export default function Home() {
  const { loading } = useLoader();
  const { user, fetchNutritionalData } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchNutritionalData().then((hasData) => {
        if (!hasData) router.push("/userCard");
      });
    }
  }, [user]);

  if (loading || !user) {
    return <FullScreenLoader visible={true} />;
  }

  return (
    <View className="flex-1 bg-[#313338]">
      <View className="flex-1">
        <Recipes />
      </View>

      <View className="h-[2px] w-full bg-[#09090a]" />

      <View className="flex-1 items-center">
        <Calendar />
      </View>
    </View>
  );
}
