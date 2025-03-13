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
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-[#313338] p-4"
      >
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="self-end bg-[#5d6af0] rounded-xl p-3 mb-2 max-w-[75%]">
              <Text className="text-white text-lg">{item}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <View className="flex-row items-center border-t border-[#1e1f22] pt-2">
          <TextInput
            className="flex-1 border text-[#F5F5F5] border-[#1e1f22] rounded-lg px-3 py-2"
            placeholder="Digite sua mensagem..."
            placeholderTextColor={"#F5F5F5"}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            className="bg-[#1e1f22] px-4 py-2 ml-2 rounded-lg"
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
