import { Stack } from "expo-router";
import CartProvider from "../providers/CartProvider";
import AuthProvider from "../providers/AuthProvider";
import QueryProvider from "../providers/QueryProvider";

export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AuthProvider>
      <QueryProvider>
        <CartProvider>
          <Stack>
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="(user)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ presentation: "modal" }} />
          </Stack>
        </CartProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
