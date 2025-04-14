import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import Balloon from "@/components/ui/Balloon";

type Message = {
  text: string;
  sentBy: string;
  temp?: boolean;
};

const Chat = () => {
  const [userLogged, setUserLogged] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const navigation = useNavigation();
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync("userName").then((name) => {
      setUserLogged(name || "Anônimo");
    });

    ws.current = new WebSocket("ws://192.168.0.12:5000");

    ws.current.onopen = () => {
      console.log("Conectado ao WebSocket");
    };

    ws.current.onmessage = ({ data }) => {
      const response = JSON.parse(data);

      setMessages((prev) => prev.map((msg) => (msg.temp ? response : msg)));

      setIsThinking(false);
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msg = {
      text: message,
      sentBy: userLogged,
    };

    setMessages((prev) => [
      ...prev,
      msg,
      { text: "...", sentBy: "Karla Nutri AI", temp: true },
    ]);

    setIsThinking(true);
    ws.current?.send(JSON.stringify(msg));
    setMessage("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.chat}
        data={messages}
        renderItem={({ item }) => (
          <Balloon message={item} currentUser={userLogged} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <View style={styles.footer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#999"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#313338", padding: 16 },
  backButton: {
    marginBottom: 12,
    padding: 6,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 22,
  },
  chat: { flex: 1 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#5d6af0",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
