import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRecipes, Recipe } from "@/hooks/useRecipes";
import { useRouter } from "expo-router";

export default function Recipes() {
  const { recipes, loading, fetchRandomThree, search } = useRecipes();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      search(query);
    } else {
      fetchRandomThree();
    }
  };

  const openDetail = (recipe: Recipe) => {
    router.push(`../recipes/${recipe.id}`);
  };

  return (
    <View className="flex-1 w-full bg-[#313338] p-4">
      {/* Barra de pesquisa */}
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
          className="bg-[#1e1f22] px-4 py-2 rounded-r-lg justify-center"
        >
          <Text className="text-white font-semibold">OK</Text>
        </TouchableOpacity>
      </View>

      {/* Estado de carregamento */}
      {loading && (
        <Text className="text-white text-center">Carregando receitas...</Text>
      )}

      {/* Lista de receitas */}
      {!loading && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recipes.map((r: Recipe) => (
            <View
              key={r.id}
              className="w-60 mr-4 bg-[#1e1f22] rounded-lg overflow-hidden"
            >
              <Image
                source={{ uri: r.link_imagem }}
                className="w-full h-32"
                resizeMode="cover"
              />
              <View className="p-2">
                <Text className="text-white font-bold text-lg">
                  {r.receita}
                </Text>
                <TouchableOpacity
                  onPress={() => openDetail(r)}
                  className="mt-2 bg-[#1e1f22] py-1 rounded-lg"
                >
                  <Text className="text-center text-white font-semibold">
                    Ver Receita
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
