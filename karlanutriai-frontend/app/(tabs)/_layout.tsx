import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NavigationButton from "@/components/ui/NavigationButton";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#2b2d31",
          borderTopColor: "#1e1f22",
          paddingVertical: 12,
          ...(Platform.OS === "ios"
            ? { position: "absolute", bottom: 0, width: "100%" }
            : {}),
        },
        tabBarButton: (props) => <NavigationButton {...props} />,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-processing"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="meal"
        options={{
          title: "Meal",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="userCard"
        options={{
          title: "UserCard",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: "Support",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
