import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ContactForm from "@/components/ContactForm";
import UserProfile from "@/components/UserProfile";
import UserCard from "@/components/UserCard";
import { useRouter } from "expo-router";
import "../../global.css";

const Settings = () => {
  const router = useRouter();

  const [modalProfileVisible, setModalProfileVisible] = useState(false);
  const [modalCardVisible, setModalCardVisible] = useState(false);
  const [modalContactVisible, setModalContactVisible] = useState(false);

  return (
    <View className="flex-1 justify-center items-center bg-[#313338]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="flex-1 w-full"
      >
        <View className="px-4">
          <Text className="text-2xl font-bold mb-4 self-center text-[#F5F5F5]">
            Configurações
          </Text>
          <TouchableOpacity
            onPress={() => setModalProfileVisible(true)}
            className="border-2 border-[#1e1f22] rounded-md p-4 my-1 w-full items-center"
          >
            <Text className="text-xl font-bold mb-2 text-[#F5F5F5]">
              Perfil do Usuário
            </Text>
            <Text className="text-[#F5F5F5]">
              Toque para ver/editar seu perfil
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalCardVisible(true)}
            className="border-2 border-[#1e1f22] rounded-md p-4 my-1 w-full items-center"
          >
            <Text className="text-xl font-bold mb-2 text-[#F5F5F5]">
              Dados do Card
            </Text>
            <Text className="text-[#F5F5F5]">
              Toque para ver/editar os dados do seu card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalContactVisible(true)}
            className="border-2 border-[#1e1f22] rounded-md p-4 my-1 w-full items-center"
          >
            <Text className="text-xl font-bold mb-2 text-[#F5F5F5]">
              Suporte
            </Text>
            <Text className="text-[#F5F5F5]">
              Entre em contato com o suporte técnico
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        visible={modalProfileVisible}
        onRequestClose={() => setModalProfileVisible(false)}
      >
        <UserProfile onClose={() => setModalProfileVisible(false)} />
      </Modal>

      <Modal
        animationType="slide"
        visible={modalCardVisible}
        onRequestClose={() => setModalCardVisible(false)}
      >
        <UserCard onClose={() => setModalCardVisible(false)} />
      </Modal>

      <Modal
        animationType="slide"
        visible={modalContactVisible}
        onRequestClose={() => setModalContactVisible(false)}
      >
        <ContactForm onClose={() => setModalContactVisible(false)} />
      </Modal>
    </View>
  );
};

export default Settings;
