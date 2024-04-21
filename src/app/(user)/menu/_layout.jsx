import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

import Colors from "../../../constants/Colors";

import { FontAwesome, AntDesign } from "@expo/vector-icons";

export default function MenuStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/" asChild>
            <Pressable>
              {({ pressed }) => (
                <AntDesign
                  name="shoppingcart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Stack.Screen
        name="home"
        options={{ title: "Menu", headerShown: false }}
      />
    </Stack>
  );
}
