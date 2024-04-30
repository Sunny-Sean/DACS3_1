import { Stack, useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import OrderListItem from "../../../components/OrderListItem_User";
import OrderItemListItem from "../../../components/OrderItemListItem_User";
import { useOrderDetails } from "../../../api/orders";
import HeaderBar from "../../../components/HeaderBar";
import { useUpdateOrderSubscription } from "../../../api/orders/subscriptions";

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, error, isLoading } = useOrderDetails(id);
  useUpdateOrderSubscription(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Faild to fetch data</Text>;
  }

  //   console.log(order);
  return (
    <View style={styles.ScreenContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <HeaderBar title="Order History" />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
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
