import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import OrderListItem from "../../../components/OrderListItem_User";
import { useMyOrderList } from "../../../api/orders";
import HeaderBar from "../../../components/HeaderBar";
import { Stack } from "expo-router";

export default function OrderScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }
  return (
    <View style={styles.ScreenContainer}>
      <HeaderBar title="Order History" />
      <Stack.Screen options={{ headerShown: false }} />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: "#EEDCC6",
  },
});
