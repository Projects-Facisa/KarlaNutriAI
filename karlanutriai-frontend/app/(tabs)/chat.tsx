import { DarkTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";

const chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-white p-4"
      >
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="self-end bg-[#4A90E2] rounded-xl p-3 mb-2 max-w-[75%]">
              <Text className="text-white text-lg">{item}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <View className="flex-row items-center border-t border-gray-300 p-1">
          <TextInput
            className="flex-1 border border-gray-400 rounded-lg px-3 py-2"
            placeholder="Digite sua mensagem..."
            placeholderTextColor={"#9AA6B2"}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            className="bg-[#4CAF50] px-4 py-2 ml-2 rounded-lg"
            onPress={sendMessage}
          >
            <Text className="text-white font-bold">Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default chat;
