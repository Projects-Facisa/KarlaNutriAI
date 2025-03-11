import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface BottomNavigationProps {
  items: {
    id: number;
    label?: string;
    icon?: React.ReactElement;
    onPress: () => void;
  }[];
  activeItem?: number;
}

const BottomNavigation = ({ items, activeItem }: BottomNavigationProps) => {
  return (
    <View className="absolute bottom-0 w-full items-center bg-white border-t border-gray-300 py-3">
      <View className="flex-row justify-around w-full max-w-sm">
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            className={`py-2 flex items-center ${
              activeItem === item.id ? "border-b-2 border-[#4CAF50]" : ""
            }`}
          >
            {item.icon && <View className="mb-1">{item.icon}</View>}
            {item.label && (
              <Text className="text-base text-black">{item.label}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomNavigation;
