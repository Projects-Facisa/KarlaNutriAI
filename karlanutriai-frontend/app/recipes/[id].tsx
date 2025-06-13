import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRecipes, Recipe } from "@/hooks/useRecipes";

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchAll } = useRecipes();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const all = await fetchAll();
      const found = all.find((r) => r.id.toString() === id);
      setRecipe(found || null);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading || !recipe) {
    return (
      <View className="flex-1 justify-center items-center bg-[#313338]">
        <Text className="text-white">Carregando receita...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-[#313338] p-4">
      <Image
        source={{ uri: recipe.link_imagem }}
        className="w-full h-48 rounded-lg mb-4"
        resizeMode="cover"
      />
      <Text className="text-white text-2xl font-bold mb-2">
        {recipe.receita}
      </Text>
      {recipe.ingredientes && (
        <View className="mb-4">
          <Text className="text-white text-xl font-semibold mb-1">
            Ingredientes:
          </Text>
          <Text className="text-white ml-2">{recipe.ingredientes}</Text>
        </View>
      )}
      <View>
        <Text className="text-white text-xl font-semibold mb-1">
          Modo de preparo:
        </Text>
        <Text className="text-white ml-2">{recipe.modo_preparo}</Text>
      </View>
    </ScrollView>
  );
}
