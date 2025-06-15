import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRecipes, Recipe } from "@/hooks/useRecipes";
import { useRouter } from "expo-router";

export default function Home() {
  const { recipes, loading, fetchAll, search } = useRecipes();
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      search(query);
    } else {
      fetchAll();
    }
  };

  const openDetail = (recipe: Recipe) => {
    router.push(`../recipes/${recipe.id}`);
  };

  return (
    <View className="flex-1 w-full bg-[#313338] p-4">
      <View className="flex-row mb-4">
        <TextInput
          placeholder="Pesquisar receita..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          className="flex-1 bg-[#1e1f22] text-white px-3 py-2 rounded-l-lg border border-[#1e1f22]"
        />
        <TouchableOpacity
          onPress={handleSearch}
          className="bg-[#1e1f22] px-4 py-2 rounded-r-lg justify-center items-center"
        >
          <MaterialIcons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text className="text-white text-center">Carregando receitas...</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {recipes.map((r: Recipe) => (
            <TouchableOpacity
              key={r.id}
              onPress={() => openDetail(r)}
              className="mb-4 bg-[#2b2d31] rounded-lg overflow-hidden"
            >
              <Image
                source={{ uri: r.link_imagem }}
                className="w-full h-40"
                resizeMode="cover"
              />
              <View className="p-3">
                <Text className="text-white font-bold text-base">
                  {r.receita}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
