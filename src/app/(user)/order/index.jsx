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
import LoadingP from "../../../components/LoadingP";

export default function OrderScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();
  // console.log(orders);

  if (isLoading) {
    // return <ActivityIndicator />;
    return <LoadingP />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }
  return (
    <View style={styles.ScreenContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderBar title="Order History" />
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
