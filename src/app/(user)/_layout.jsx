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
import { useAuth } from "../../providers/AuthProvider";

const Tabss = createBottomTabNavigator();

function TabBarIcon(props) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/"} />;
  }
  // const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const segment = useSegments();
  console.log(segment);
  const disNone =
    (segment[2] === "[id]" && segment[1] === "menu") ||
    segment[1] === "payment" ||
    (segment[1] === "delivery" && segment[0] === "(user)") ||
    (segment[1] === "order" && segment[2] === "[id]");

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
      <Tabs.Screen name="index" options={{ href: null, headerShown: false }} />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color="#FFFFFF" />,
        }}
      />

      <Tabs.Screen
        name="order"
        options={{
          title: "Orders",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />

      <Tabs.Screen
        name="payment"
        options={{
          title: "Payment Screen",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="credit-card" color="#FFFFFF" />
          ),
          href: null,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          href: null,
        }}
      />

      <Tabs.Screen
        name="profile2"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />

      <Tabs.Screen
        name="delivery"
        options={{
          title: "Delivery",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          href: null,
        }}
      />
    </Tabs>
  );
}
