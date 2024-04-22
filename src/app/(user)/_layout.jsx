import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Link,
  Redirect,
  Tabs,
  useLocalSearchParams,
  useSegments,
} from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../../constants/Colors";
import { useColorScheme } from "../../components/useColorScheme";

const Tabss = createBottomTabNavigator();

function TabBarIcon(props) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  // const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const segment = useSegments();
  // console.log(segment);
  // console.log(segment[2]);
  const disNone = segment[2] === "[id]";
  // const disNone3 = segment == ["(user)", "menu", "[id]"];
  // const disNone2 = `/${segment[0]}/menu/${id}`;
  // console.log(disNone3);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#EEDCC6",
        tabBarStyle: {
          backgroundColor: "#4d3429",
          display: disNone ? "none" : "flex",
          // display: "flex",
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color="#FFFFFF" />,
        }}
      />
    </Tabs>
  );
}
