import { FlatList, Platform, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "../providers/CartProvider";
// import CartListItem from "../components/CartListItem";
import Button from "../components/Button";
import { Link, Redirect, Stack } from "expo-router";
import CartIt from "../components/CartIt";

function CartScreen() {
  const { items, total } = useCart();
  return (
    <View style={{ padding: 10, flex: 1, justifyContent: "center" }}>
      <Stack.Screen options={{ title: "Cart" }} />
      <FlatList
        data={items}
        renderItem={({ item }) => <CartIt cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: 500 }}>
        Total: ${total}
      </Text>
      <Button text="Checkout" />
      {/* <Link href={"/(user)/orders"}>CLick</Link> */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

export default CartScreen;
