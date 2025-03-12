import React from "react";
import { Modal, View, ActivityIndicator } from "react-native";

interface FullScreenLoaderProps {
  visible: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ visible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
};

export default FullScreenLoader;
