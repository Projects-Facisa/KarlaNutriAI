import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  message: {
    text: string;
    sentBy: string;
  };
  currentUser: string;
};

const Balloon = ({ message, currentUser }: Props) => {
  const isMine = message.sentBy === currentUser;

  return (
    <View
      style={[
        styles.container,
        { alignItems: isMine ? "flex-end" : "flex-start" },
      ]}
    >
      <Text style={styles.senderName}>
        {isMine ? currentUser : message.sentBy}
      </Text>

      <View
        style={[
          styles.balloon,
          isMine ? styles.myBalloon : styles.otherBalloon,
        ]}
      >
        <Text style={isMine ? styles.myText : styles.otherText}>
          {message.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  senderName: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 2,
  },
  balloon: {
    padding: 10,
    borderRadius: 12,
    maxWidth: "75%",
  },
  myBalloon: {
    backgroundColor: "#5d6af0",
    alignSelf: "flex-end",
  },
  otherBalloon: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
  },
  myText: {
    color: "#fff",
  },
  otherText: {
    color: "#000",
  },
});

export default Balloon;
