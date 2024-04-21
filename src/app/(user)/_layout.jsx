import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../../constants/Colors";
import { useColorScheme } from "../../components/useColorScheme";

const Tabss = createBottomTabNavigator();

function TabBarIcon(props) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#EEDCC6",
        tabBarStyle: {
          backgroundColor: "#4d3429",
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cutlery" color="#FFFFFF" />
          ),
        }}
      />
    </Tabs>
  );
}
