import React from "react";
import { Redirect, Tabs } from "expo-router";
import { Platform } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import NavigationButton from "@/components/ui/NavigationButton";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import FullScreenLoader from "@/components/FullScreenLoader";
import useAuthToken from "@/hooks/useAuthToken";

import { MealProvider } from "@/contexts/MealContext";
import { UserProvider } from "@/contexts/UserContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { userToken, loading } = useAuthToken();

  if (loading) {
    return <FullScreenLoader visible />;
  }

  if (!userToken) {
    return <Redirect href="/welcome" />;
  }

  return (
    <UserProvider>
      <MealProvider>
        <Tabs
          backBehavior="history"
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
            name="calendar"
            options={{
              title: "Calendar",
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
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="settings" size={30} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="userCard"
            options={{ href: null, tabBarStyle: { display: "none" } }}
          />
          <Tabs.Screen
            name="userProfile"
            options={{ href: null, tabBarStyle: { display: "none" } }}
          />
          <Tabs.Screen
            name="contactForm"
            options={{ href: null, tabBarStyle: { display: "none" } }}
          />
          <Tabs.Screen
            name="meal"
            options={{ href: null, tabBarStyle: { display: "none" } }}
          />
        </Tabs>
      </MealProvider>
    </UserProvider>
  );
}
