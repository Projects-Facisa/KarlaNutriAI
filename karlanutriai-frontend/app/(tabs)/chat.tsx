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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const Chat = () => {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const replacePath = (path: any): void => {
    router.replace(path);
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    const userMessage: Message = {
      id: messages.length,
      text: message,
      sender: "user",
    };

    let updatedMessages = [...messages, userMessage];

    const botMessage: Message = {
      id: messages.length + 1,
      text: "silas é gay",
      sender: "bot",
    };

    updatedMessages.push(botMessage);

    setMessages(updatedMessages);
    setMessage("");
  };

  const renderItem = ({ item }: { item: Message }) => {
    const alignment = item.sender === "user" ? "self-end" : "self-start";
    const bgColor = item.sender === "user" ? "bg-[#5d6af0]" : "bg-[#e0e0e0]";
    const textColor = item.sender === "user" ? "text-white" : "text-black";

    return (
      <View
        className={`${alignment} ${bgColor} rounded-xl p-3 mb-2 max-w-[75%]`}
      >
        <Text className={`${textColor} text-lg`}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-[#313338] p-4"
      >
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => replacePath("home")} className="p-2">
            <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
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

export default Chat;
