import { Stack } from "expo-router";
import CartProvider from "../providers/CartProvider";

export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ presentation: "modal" }} />
      </Stack>
    </CartProvider>
  );
}
