import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

interface FullScreenLoaderProps {
  visible: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ visible }) => {
  return (
    <Modal transparent={false} visible={visible} animationType="fade">
      <View style={styles.container}>
        <LottieView
          source={require("../assets/animations/Animation - 23.json")}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313338",
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default FullScreenLoader;
