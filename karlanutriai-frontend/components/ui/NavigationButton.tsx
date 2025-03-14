import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";

interface NavigationButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  accessibilityState?: { selected?: boolean };
  children: React.ReactNode;
}

export default function NavigationButton({
  onPress = (e: GestureResponderEvent) => {},
  accessibilityState,
  children,
}: NavigationButtonProps) {
  const focused = accessibilityState?.selected;
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`py-2 flex items-center ${
        focused ? "border-b-2 border-[#1e1f22]" : ""
      }`}
    >
      {children}
    </TouchableOpacity>
  );
}
